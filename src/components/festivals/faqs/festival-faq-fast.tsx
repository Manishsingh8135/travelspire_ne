// components/festivals/faqs/festival-faq-fast.tsx
"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import type { FAQItem, FAQSection } from "@/types/faqs/faq";
import { FestivalSectionHeader } from "../common/festival-section-header";

interface FAQItemFastProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItemFast({ faq, isOpen, onToggle }: FAQItemFastProps) {
  return (
    <div className={cn(
      "group relative cursor-pointer rounded-2xl overflow-hidden",
      "bg-gradient-to-br from-slate-800/90 via-slate-900/70 to-slate-950/90",
      "backdrop-blur-xl shadow-xl hover:shadow-2xl",
      "border border-slate-600/50 hover:border-amber-400/50",
      "transition-all duration-200",
      "hover:bg-gradient-to-br hover:from-slate-700/90 hover:via-slate-800/70 hover:to-slate-900/90"
    )}>
      {/* Subtle Glow Effect on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/10 via-orange-400/10 to-red-400/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-200" />

      {/* Hover gradient line */}
      <div className={cn(
        "absolute bottom-0 left-0 w-full h-0.5",
        "bg-gradient-to-r from-transparent via-amber-400/50 to-transparent",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      )} />

      {/* Question */}
      <button 
        onClick={onToggle}
        className="relative w-full px-6 py-5 sm:p-8 text-left"
      >
        <div className="flex justify-between items-center gap-4">
          <h3 className={cn(
            "font-medium text-lg md:text-xl",
            "text-white",
            "group-hover:text-amber-200",
            "transition-colors duration-200"
          )}>
            {faq.question}
          </h3>
          <div className={cn(
            "relative flex-shrink-0 w-6 h-6 text-amber-400 transition-transform duration-200",
            isOpen && "rotate-45 scale-105"
          )}>
            <PlusIcon />
          </div>
        </div>
      </button>

      {/* Answer */}
      <div className={cn(
        "overflow-hidden transition-all duration-200 ease-out",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="relative px-6 pb-5 sm:px-8 sm:pb-8">
          <div className={cn(
            "text-base md:text-lg",
            "text-slate-200",
            "bg-gradient-to-r from-transparent via-amber-500/10 to-transparent",
            "rounded-lg px-4 py-3",
            "border-l-2 border-amber-400/30"
          )}>
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
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

export function FestivalFAQFast({
  section,
  className,
}: {
  section: FAQSection;
  className?: string;
}) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section 
      className={cn(
        "relative w-full overflow-hidden py-20 md:py-32",
        "bg-gradient-to-b from-slate-950/50 via-slate-900/30 to-slate-950/50",
        className
      )}
    >
      {/* Background Pattern - Festival themed */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(251,191,36,0.05),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.05),transparent_50%),radial-gradient(circle_at_40%_80%,rgba(239,68,68,0.05),transparent_50%)]" />
        
        {/* Static glow effects */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <FestivalSectionHeader
          badge={{
            emoji: "❓",
            text: "FESTIVAL FAQ"
          }}
          title={section.title}
          description={section.description}
        />

        {/* FAQ Items - Lightning Fast */}
        <div className="grid gap-6 relative">
          {section.faqs.map((faq) => (
            <FAQItemFast 
              key={faq.id} 
              faq={faq} 
              isOpen={openItems.has(faq.id)}
              onToggle={() => toggleItem(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
