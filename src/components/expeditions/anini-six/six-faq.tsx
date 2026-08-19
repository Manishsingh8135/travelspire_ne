"use client";

import { useState } from "react";
import { sixFaqSection } from "@/data/expeditions/anini-six-days";
import { createAniniSixInquiryURL } from "@/lib/whatsapp";

export function SixFaq() {
  const [activeId, setActiveId] = useState(sixFaqSection.faqs[0]?.id ?? "");
  const active =
    sixFaqSection.faqs.find((faq) => faq.id === activeId) ?? sixFaqSection.faqs[0];

  if (!active) return null;

  return (
    <section
      aria-labelledby="six-faq-title"
      className="relative overflow-hidden bg-[#F3EEE2] py-20 text-[#111C18] sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-5 sm:px-8 md:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16 xl:px-24">
        <header className="lg:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9A5B36]">
            Field notes
          </p>
          <h2
            id="six-faq-title"
            className="mt-4 max-w-[12ch] text-[clamp(2.3rem,5vw,3.8rem)] font-medium leading-[0.95] tracking-[-0.05em]"
          >
            Before you{" "}
            <span className="font-serif font-normal italic text-[#7A4E2E]">
              commit
            </span>
          </h2>
          <p className="mt-6 max-w-[28rem] text-[1.02rem] leading-8 text-[#3D4B44]">
            {sixFaqSection.description}
          </p>
        </header>

        <div className="lg:col-span-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <ol className="lg:col-span-5">
              {sixFaqSection.faqs.map((faq, index) => {
                const selected = faq.id === activeId;
                return (
                  <li key={faq.id} className="border-t border-[#111C18]/10 first:border-t-0">
                    <button
                      type="button"
                      onClick={() => setActiveId(faq.id)}
                      aria-pressed={selected}
                      aria-controls="six-faq-answer"
                      className={`flex w-full gap-3 py-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9683A] ${
                        selected ? "text-[#111C18]" : "text-[#111C18]/45 hover:text-[#111C18]/80"
                      }`}
                    >
                      <span className="font-mono text-[10px] text-[#9A5B36]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.95rem] leading-6 tracking-[-0.02em]">
                        {faq.question}
                      </span>
                    </button>
                    {selected && (
                      <div className="pb-6 pl-[1.65rem] lg:hidden">
                        <p className="text-[1.02rem] leading-8 text-[#3D4B44]">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>

            <article
              id="six-faq-answer"
              aria-live="polite"
              className="hidden lg:col-span-7 lg:block lg:border-l lg:border-[#111C18]/10 lg:pl-10"
            >
              <h3 className="font-serif text-[1.7rem] italic leading-[1.15] tracking-[-0.02em] text-[#111C18] sm:text-[1.9rem]">
                {active.question}
              </h3>
              <p className="mt-5 text-[1.02rem] leading-8 text-[#3D4B44]">
                {active.answer}
              </p>
              <a
                href={createAniniSixInquiryURL({ kind: "general" })}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block text-[13px] font-medium text-[#7A4E2E] underline decoration-[#7A4E2E]/40 underline-offset-4 hover:text-[#111C18] hover:decoration-[#111C18]"
              >
                Still unsure — write to us
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
