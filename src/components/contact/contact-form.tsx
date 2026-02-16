// components/contact/contact-form.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { ContactFormData } from "@/types/contact/contact";

const formSchema = z.object({
  name: z.string().min(2, "Name is too short").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject is too short").max(100),
  message: z.string().min(10, "Message is too short").max(1000)
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Log form data (in production, this would be sent to an API)
    console.log('Contact form submitted:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();

    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={cn(
              "relative p-8 rounded-[2.5rem] md:p-12",
              "bg-white dark:bg-accent-900",
              "border border-primary-100/20 dark:border-primary-900/20",
              "shadow-xl"
            )}
          >
            <h2 className="text-2xl font-semibold text-foreground dark:text-white mb-8">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl",
                    "bg-primary-50/50 dark:bg-primary-900/50",
                    "border border-primary-100/20 dark:border-primary-900/20",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500",
                    "text-foreground dark:text-white",
                    "placeholder:text-muted-foreground dark:placeholder:text-neutral-500"
                  )}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl",
                    "bg-primary-50/50 dark:bg-primary-900/50",
                    "border border-primary-100/20 dark:border-primary-900/20",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500",
                    "text-foreground dark:text-white",
                    "placeholder:text-muted-foreground dark:placeholder:text-neutral-500"
                  )}
                  placeholder="your-email@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-white mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl",
                    "bg-primary-50/50 dark:bg-primary-900/50",
                    "border border-primary-100/20 dark:border-primary-900/20",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500",
                    "text-foreground dark:text-white",
                    "placeholder:text-muted-foreground dark:placeholder:text-neutral-500"
                  )}
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  {...register("subject")}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl",
                    "bg-primary-50/50 dark:bg-primary-900/50",
                    "border border-primary-100/20 dark:border-primary-900/20",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500",
                    "text-foreground dark:text-white",
                    "placeholder:text-muted-foreground dark:placeholder:text-neutral-500"
                  )}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-white mb-2">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl",
                    "bg-primary-50/50 dark:bg-primary-900/50",
                    "border border-primary-100/20 dark:border-primary-900/20",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500",
                    "text-foreground dark:text-white",
                    "placeholder:text-muted-foreground dark:placeholder:text-neutral-500"
                  )}
                  placeholder="Tell us what you need..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full flex items-center justify-center gap-2",
                  "px-8 py-4 rounded-xl",
                  "text-lg font-medium",
                  "bg-gradient-to-r from-primary-500 to-secondary-500",
                  "hover:from-primary-400 hover:to-secondary-400",
                  "text-white",
                  "shadow-xl shadow-primary-500/25 dark:shadow-primary-500/10",
                  "transition-all duration-300",
                  isSubmitting && "opacity-50 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              {/* Success Message */}
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-500 font-medium"
                >
                  Message sent successfully!
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Right Column - Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <MailboxIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MailboxIllustration() {
  return (
    <div className="relative w-full h-full min-h-[400px] rounded-[2.5rem] overflow-hidden">
      {/* We'll add a nice SVG illustration here */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Add your mailbox SVG paths here */}
      </svg>
    </div>
  );
}