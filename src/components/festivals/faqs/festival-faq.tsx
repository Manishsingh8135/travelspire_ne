"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { createContext, useContext, useState, useRef } from "react";
import type { FAQItem, FAQSection } from "@/types/faqs/faq";
import { useInView } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { FestivalSectionHeader } from "../common/festival-section-header";

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

export function FestivalFAQ({
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
          // Festival theme background with amber/orange gradients
          "bg-gradient-to-b from-slate-950/50 via-slate-900/30 to-slate-950/50",
          className
        )}
      >
        {/* Background Pattern - Festival themed */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(251,191,36,0.05),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.05),transparent_50%),radial-gradient(circle_at_40%_80%,rgba(239,68,68,0.05),transparent_50%)]" />
          
          {/* Glow effects */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Header using our reusable component */}
          <FestivalSectionHeader
            badge={{
              emoji: "❓",
              text: "FESTIVAL FAQ"
            }}
            title={section.title}
            description={section.description}
          />

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
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ 
        duration: 0.3,
        delay: index * 0.03
      }}
      onClick={() => setActiveIndex(isActive ? null : faq.id)}
      className={cn(
        "group relative cursor-pointer rounded-2xl overflow-hidden",
        // Festival theme styling with amber/orange colors
        "bg-gradient-to-br from-slate-800/90 via-slate-900/70 to-slate-950/90",
        "backdrop-blur-xl shadow-xl hover:shadow-2xl",
        "border border-slate-600/50 hover:border-amber-400/50",
        "transition-all duration-200",
        "hover:bg-gradient-to-br hover:from-slate-700/90 hover:via-slate-800/70 hover:to-slate-900/90"
      )}
    >
      {/* Subtle Glow Effect on Hover */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-amber-400/10 via-orange-400/10 to-red-400/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
      />

      {/* Hover gradient line */}
      <div className={cn(
        "absolute bottom-0 left-0 w-full h-0.5",
        "bg-gradient-to-r from-transparent via-amber-400/50 to-transparent",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        "scale-x-[2] group-hover:scale-x-100 transition-transform duration-500"
      )} />

      {/* Content */}
      <div className="relative px-6 py-5 sm:p-8">
        {/* Question */}
        <div className="flex justify-between items-center gap-4">
          <h3 className={cn(
            "font-medium text-lg md:text-xl",
            "text-white",
            "group-hover:text-amber-200",
            "transition-colors duration-200"
          )}>
            {faq.question}
          </h3>
          <motion.div
            initial={false}
            animate={{
              rotate: isActive ? 45 : 0,
              scale: isActive ? 1.05 : 1,
            }}
            transition={{ duration: 0.15 }}
            className="relative flex-shrink-0 w-6 h-6 text-amber-400"
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
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className={cn(
                "pt-4 text-base md:text-lg",
                "text-slate-200",
                "bg-gradient-to-r from-transparent via-amber-500/10 to-transparent",
                "rounded-lg px-4 py-3 mt-3",
                "border-l-2 border-amber-400/30"
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
