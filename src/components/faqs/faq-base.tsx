"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { createContext, useContext, useState, useRef } from "react";
import type { FAQItem, FAQSection } from "@/types/faqs/faq";
import { useInView } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { DotPattern, GlowEffect } from '@/components/ui/background-patterns';

interface FAQContextType {
  activeIndex: string | null;
  setActiveIndex: (id: string | null) => void;
}

const FAQContext = createContext<FAQContextType | null>(null);

function useFAQ() {
  const context = useContext(FAQContext);
  if (!context) throw new Error("useFAQ must be used within FAQProvider");
  return context;
}

export function AdvancedFAQ({
  section,
  className,
}: {
  section: FAQSection;
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <FAQContext.Provider value={{ activeIndex, setActiveIndex }}>
      <section 
        ref={containerRef}
        className={cn(
          "relative w-full overflow-hidden py-20 md:py-32",
          // Enhanced light mode gradient with more depth
          "bg-gradient-to-b from-primary-100/40 via-primary-50/60 to-background",
          "dark:from-accent-950 dark:via-accent-900/50 dark:to-accent-950",
          className
        )}
      >
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

        {/* Decorative gradient bands - Light mode only */}
        <div className="absolute inset-0 opacity-30 dark:opacity-0">
          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-primary-200/20 via-transparent to-primary-100/10" />
          <div className="absolute top-0 right-1/3 w-1/3 h-full bg-gradient-to-b from-secondary-200/20 via-transparent to-secondary-100/10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16 md:mb-24"
          >
            <div className="mb-6 flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className={cn(
                  "p-4 rounded-2xl",
                  // Enhanced light mode styling
                  "bg-gradient-to-br from-primary-100 to-primary-50",
                  "dark:bg-primary-950/50",
                  "shadow-glow dark:shadow-glow-lg",
                  "border border-primary-200/50 dark:border-primary-800/20"
                )}
              >
                <HelpCircle className="w-12 h-12 text-primary-600 dark:text-primary-400" />
              </motion.div>
            </div>

            <h2 className="heading-1 mb-6">
              <span className="block text-foreground dark:text-white">
                {section.title}
              </span>
            </h2>
            {section.description && (
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground dark:text-neutral-300">
                {section.description}
              </p>
            )}
          </motion.div>

          {/* FAQ Items */}
          <div className="grid gap-6 relative">
            {section.faqs.map((faq, index) => (
              <FAQItem 
                key={faq.id} 
                faq={faq} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </FAQContext.Provider>
  );
}

function FAQItem({ 
  faq,
  index 
}: { 
  faq: FAQItem; 
  index: number;
}) {
  const { activeIndex, setActiveIndex } = useFAQ();
  const isActive = activeIndex === faq.id;
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      onClick={() => setActiveIndex(isActive ? null : faq.id)}
      className={cn(
        "group relative cursor-pointer rounded-2xl overflow-hidden hover-lift",
        // Enhanced light mode styling with gradients
        "bg-gradient-to-br from-white via-primary-50/50 to-white",
        "dark:bg-accent-900/50 dark:from-accent-900/50 dark:to-accent-900/50",
        "border border-primary-200/50 dark:border-primary-900/20",
        "hover:shadow-lg hover:shadow-primary-500/5",
        "dark:hover:shadow-primary-500/10",
        "transition-all duration-300"
      )}
    >
      {/* Hover gradient line */}
      <div className={cn(
        "absolute bottom-0 left-0 w-full h-0.5",
        "bg-gradient-to-r from-transparent via-primary-500/50 to-transparent dark:via-primary-400/50",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        "scale-x-[2] group-hover:scale-x-100 transition-transform duration-500"
      )} />

      {/* Content */}
      <div className="px-6 py-5 sm:p-8">
        {/* Question */}
        <div className="flex justify-between items-center gap-4">
          <h3 className={cn(
            "font-medium text-lg md:text-xl",
            "text-foreground dark:text-white",
            "group-hover:text-primary-700 dark:group-hover:text-primary-300",
            "transition-colors duration-300"
          )}>
            {faq.question}
          </h3>
          <motion.div
            initial={false}
            animate={{
              rotate: isActive ? 45 : 0,
              scale: isActive ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="relative flex-shrink-0 w-6 h-6 text-primary-600 dark:text-primary-400"
          >
            <PlusIcon />
          </motion.div>
        </div>

        {/* Answer */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className={cn(
                "pt-4 text-base md:text-lg",
                "text-muted-foreground dark:text-neutral-300",
                "bg-gradient-to-r from-transparent via-primary-50/50 to-transparent",
                "dark:from-transparent dark:via-primary-900/20 dark:to-transparent",
                "rounded-lg px-4 py-2 mt-2"
              )}>
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function PlusIcon() {
  return (
    <>
      <div className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 rounded-full bg-current" />
      <div className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 rounded-full bg-current" />
    </>
  );
}