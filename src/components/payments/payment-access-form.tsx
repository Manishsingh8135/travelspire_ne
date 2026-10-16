"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button, Field, Input } from "@/components/ds";
import { IconAlert, IconArrowUpRight, IconLock, IconShield, IconSpinner } from "@/components/icons";
import { postToPayU, type HostedCheckoutResponse } from "@/lib/payments/payu/browser";

/* Private payment for a confirmed custom booking: reference + code, then the
   PayU hand-off. Request payload unchanged; presentation only. */
export function PaymentAccessForm() {
  const [reference, setReference] = useState("");
  const [paymentCode, setPaymentCode] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/payments/payu/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, paymentCode, termsAccepted }),
      });
      const payload = (await response.json()) as HostedCheckoutResponse;

      if (!response.ok) {
        throw new Error(payload.error || "We could not open secure checkout.");
      }

      postToPayU(payload);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "We could not open secure checkout.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-panel border border-line bg-surface p-5 font-ui shadow-e2 sm:p-7">
      <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="text-eyebrow uppercase text-fg-subtle">Private payment</p>
          <h2 className="mt-1.5 text-h3 text-fg">Open your confirmed booking</h2>
        </div>
        <IconLock size={22} className="mt-1 shrink-0 text-brand" />
      </div>

      <div className="mt-6 space-y-5">
        <Field label="Booking reference" htmlFor="pay-reference">
          <Input
            id="pay-reference"
            name="reference"
            value={reference}
            onChange={(event) => setReference(event.target.value.toUpperCase())}
            required
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            placeholder="TSBK-8F2C14A90D7B"
            className="uppercase tabular-nums tracking-[0.04em]"
          />
        </Field>
        <Field
          label="Payment code"
          htmlFor="pay-code"
          hint="32 characters. We send it with your reference once dates, rooms, vehicle and the final amount are agreed."
        >
          <Input
            id="pay-code"
            name="paymentCode"
            value={paymentCode}
            onChange={(event) => setPaymentCode(event.target.value.replace(/[\s-]/g, "").toUpperCase())}
            required
            minLength={32}
            maxLength={32}
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            placeholder="Paste the code from our message"
            aria-describedby="pay-code-hint"
            className="tracking-[0.04em]"
          />
        </Field>

        <label className="flex cursor-pointer items-start gap-3 text-small text-fg-muted">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(event) => setTermsAccepted(event.target.checked)}
            required
            className="mt-0.5 size-5 shrink-0 rounded-[0.3rem] border-line-strong bg-surface text-brand focus:ring-2 focus:ring-focus focus:ring-offset-0"
          />
          <span>
            I&apos;ve reviewed the confirmed quote and accept the{" "}
            <Link href="/booking-policy" target="_blank" className="font-medium text-brand underline underline-offset-4">
              booking and refund policy
            </Link>{" "}
            and{" "}
            <Link href="/terms-and-conditions" target="_blank" className="font-medium text-brand underline underline-offset-4">
              terms
            </Link>
            .
          </span>
        </label>
      </div>

      {error ? (
        <p
          role="alert"
          aria-live="assertive"
          className="mt-5 flex gap-3 rounded-r-card border-l-[3px] border-critical bg-critical-soft px-4 py-3 text-small text-fg"
        >
          <IconAlert size={18} className="mt-0.5 shrink-0 text-critical" />
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={isSubmitting || !termsAccepted} className="mt-6 w-full">
        {isSubmitting ? <IconSpinner className="animate-spin" /> : null}
        {isSubmitting ? "Opening secure checkout…" : "Continue to PayU"}
        {isSubmitting ? null : <IconArrowUpRight />}
      </Button>

      <p className="mt-4 flex items-start gap-2.5 text-small text-fg-subtle">
        <IconShield size={18} className="mt-px shrink-0 text-positive" />
        You enter card or UPI details on PayU&apos;s own page. We never see or store them.
      </p>
    </form>
  );
}
