"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Field, Input, Select, Textarea } from "@/components/ds";
import { IconCheckCircle, IconSend, IconSpinner } from "@/components/icons";
import { trackEvent } from "@/lib/analytics";
import { createTripPlanningURL } from "@/lib/whatsapp";
import type { ContactFormData } from "@/types/contact/contact";

/* The enquiry form. Same contract as before with /api/contact — name,
   email, optional phone, subject, message, plus the hidden "website"
   honeypot — and the same limits, so the server schema is unchanged. The
   subject is now picked from a short list (all ≥ 5 characters), which is
   faster on a phone and routes the email at a glance. */

const topics = [
  "Plan a custom trip",
  "A tour on the website",
  "Inner Line Permit help",
  "Vehicle or transfer booking",
  "Festival travel",
  "Something else",
] as const;

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(50, "Keep it under 50 characters"),
  email: z.string().trim().email("Enter an email like name@example.com"),
  phone: z.string().trim().max(20, "That number looks too long").optional(),
  subject: z.string().min(5, "Choose what this is about").max(100),
  message: z
    .string()
    .trim()
    .min(10, "A few more words, please — at least 10 characters")
    .max(1000, "Keep it under 1,000 characters"),
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { subject: topics[0] },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypotRef.current?.value ?? "" }),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!response.ok || !result?.ok) {
        setSubmitError(result?.error ?? "We couldn't send your message right now. Please WhatsApp or call us.");
        return;
      }
      trackEvent("generate_lead", { method: "contact_form" });
      setIsSuccess(true);
      reset({ subject: topics[0] });
    } catch {
      setSubmitError("You seem to be offline. Please try again, or WhatsApp us instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6 font-ui">
        <IconCheckCircle size={32} className="text-positive" />
        <div>
          <p className="text-h3 text-fg">Message sent.</p>
          <p className="mt-1 text-body text-fg-muted">We&apos;ll reply by email, usually within a day.</p>
        </div>
        <Button variant="secondary" onClick={() => setIsSuccess(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative grid gap-5 font-ui sm:grid-cols-2">
      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <Field label="Your name" htmlFor="contact-name" error={errors.name?.message}>
        <Input
          id="contact-name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          {...register("name")}
        />
      </Field>
      <Field label="Email" htmlFor="contact-email" error={errors.email?.message}>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          {...register("email")}
        />
      </Field>
      <Field label="Phone" htmlFor="contact-phone" optional hint="Add it if you'd like a call or a WhatsApp reply." error={errors.phone?.message}>
        <Input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "contact-phone-error" : "contact-phone-hint"}
          {...register("phone")}
        />
      </Field>
      <Field label="What's it about?" htmlFor="contact-subject" error={errors.subject?.message}>
        <Select id="contact-subject" aria-invalid={Boolean(errors.subject)} {...register("subject")}>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </Field>
      <Field
        label="Message"
        htmlFor="contact-message"
        className="sm:col-span-2"
        hint="Dates, group size, the places you have in mind — whatever you know so far."
        error={errors.message?.message}
      >
        <Textarea
          id="contact-message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"}
          {...register("message")}
        />
      </Field>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? <IconSpinner className="animate-spin" /> : <IconSend />}
          {isSubmitting ? "Sending…" : "Send message"}
        </Button>
        <p className="text-small text-fg-subtle">We reply by email, usually within a day.</p>
      </div>

      {submitError ? (
        <p role="alert" className="text-small font-medium text-critical sm:col-span-2">
          {submitError}{" "}
          <a href={createTripPlanningURL()} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            WhatsApp us
          </a>
        </p>
      ) : null}
    </form>
  );
}
