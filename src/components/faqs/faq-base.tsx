"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import type { FAQSection } from "@/types/faqs/faq";
import { cn } from "@/lib/utils";

export function AdvancedFAQ({
  section,
  className,
}: {
  section: FAQSection;
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(
    section.faqs[0]?.id ?? null,
  );

  return (
    <section
      aria-labelledby="faq-title"
      className={cn(
        "bg-[#f6f1e7] py-20 text-[#152019] sm:py-24 lg:py-32",
        className,
      )}
    >
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-5 sm:px-8 md:px-10 lg:grid-cols-12 lg:gap-12 lg:px-16 xl:px-24">
        <header className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
            Before you travel
          </p>
          <h2
            id="faq-title"
            className="max-w-[10ch] text-[clamp(2.75rem,5vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em]"
          >
            Common travel{" "}
            <span className="font-serif font-normal italic text-[#76533e]">
              questions
            </span>
          </h2>
          <p className="mt-6 max-w-[28rem] text-base leading-7 text-[#5a655e]">
            {section.description}
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-[#17241d] px-5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#f5efe2] shadow-[7px_12px_26px_-16px_rgba(9,18,12,0.8)] transition-colors duration-200 hover:bg-[#2b3a31] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87543a]"
          >
            Ask our team
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </header>

        <div className="grid gap-3 lg:col-span-8">
          {section.faqs.map((faq, index) => {
            const isActive = faq.id === activeId;

            return (
              <article
                key={faq.id}
                className={cn(
                  "overflow-hidden rounded-[14px] bg-[#ebe4d6] shadow-[6px_12px_26px_-22px_rgba(37,46,39,0.5)] transition-[background-color,box-shadow] duration-200",
                  isActive &&
                    "bg-[#e4dac8] shadow-[9px_16px_32px_-22px_rgba(37,46,39,0.62)]",
                )}
              >
                <button
                  type="button"
                  onClick={() => setActiveId(isActive ? null : faq.id)}
                  aria-expanded={isActive}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                >
                  <span className="w-7 flex-none text-[10px] font-bold tracking-[0.12em] text-[#8a715f]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[1.05rem] font-semibold leading-6 tracking-[-0.015em] sm:text-lg">
                    {faq.question}
                  </span>
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-[9px] bg-[#17241d] text-[#f6f0e5] shadow-[4px_8px_18px_-12px_rgba(0,0,0,0.9)]">
                    {isActive ? (
                      <Minus aria-hidden="true" className="h-4 w-4" />
                    ) : (
                      <Plus aria-hidden="true" className="h-4 w-4" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.24,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[52rem] px-5 pb-6 pl-16 text-sm leading-6 text-[#526057] sm:px-7 sm:pb-7 sm:pl-[5.75rem] sm:text-base sm:leading-7">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
