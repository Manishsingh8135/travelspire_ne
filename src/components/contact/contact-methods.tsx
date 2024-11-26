// components/contact/contact-methods.tsx
"use client";

import { motion } from "framer-motion";
import { contactMethods } from "@/data/contact/contact-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ContactMethods() {
  return (
    <section className="relative py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative p-8 rounded-2xl",
                "bg-white dark:bg-accent-900",
                "border border-primary-100/20 dark:border-primary-900/20",
                "hover:border-primary-500/20 dark:hover:border-primary-500/20",
                "shadow-sm hover:shadow-xl",
                "transition-all duration-300"
              )}
            >
              <div className="space-y-4">
                <div className="inline-flex p-3 rounded-xl bg-primary-100/50 dark:bg-primary-900/50">
                  <method.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground dark:text-white">
                    {method.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground dark:text-neutral-400">
                    {method.description}
                  </p>
                </div>

                <Link
                  href={method.action.href}
                  className={cn(
                    "inline-flex items-center justify-center",
                    "px-4 py-2 rounded-lg",
                    "text-sm font-medium",
                    "text-primary-600 dark:text-primary-400",
                    "hover:bg-primary-50 dark:hover:bg-primary-900/50",
                    "transition-colors duration-200"
                  )}
                >
                  {method.action.text}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}