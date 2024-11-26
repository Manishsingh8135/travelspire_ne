// components/contact/contact-hero.tsx
"use client";

import { motion } from "framer-motion";
import { DotPattern, GlowEffect } from '@/components/ui/background-patterns';
import { Mail } from "lucide-react";

export function ContactHero() {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <DotPattern className="opacity-20" />
        <GlowEffect 
          color="primary"
          size="lg"
          opacity="low"
          className="absolute -top-40 -right-40"
        />
        <GlowEffect
          color="secondary"
          size="lg"
          opacity="low"
          className="absolute -bottom-40 -left-40"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <div className="rounded-full p-4 bg-primary-100 dark:bg-primary-900">
                <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>

            <h1 className="heading-1">
              <span className="block text-foreground dark:text-white">
                Get in touch
              </span>
              <span className="block bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 dark:from-primary-400 dark:via-primary-500 dark:to-secondary-400 bg-clip-text text-transparent">
                We&apos;d love to hear from you
              </span>
            </h1>

            <p className="mt-6 text-xl text-muted-foreground dark:text-neutral-300 max-w-3xl mx-auto">
              Have questions about our tours? Want to customize your adventure? 
              Our team is here to help make your Northeast India journey unforgettable.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}