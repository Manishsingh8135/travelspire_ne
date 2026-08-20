"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { sixMeta, sixPricing } from "@/data/expeditions/anini-six-days";
import { createAniniSixInquiryURL } from "@/lib/whatsapp";

const topTier = sixPricing.tiers[0];

export function SixBookBar() {
  const [past, setPast] = useState(false);
  const [onCta, setOnCta] = useState(false);

  // Show the bar once the hero is behind you.
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // And stand down over the pricing desk and the closing CTA — the bar exists
  // to reach those, not to sit on top of them.
  useEffect(() => {
    const targets = ["desk", "six-close"]
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (targets.length === 0) return;

    const showing = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) showing.add(entry.target);
          else showing.delete(entry.target);
        }
        setOnCta(showing.size > 0);
      },
      { threshold: 0, rootMargin: "-10% 0px -25% 0px" },
    );

    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const visible = past && !onCta;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="border-t border-[#F3EEE2]/12 bg-[#070E0D]/95 backdrop-blur-md">
        {/* Right padding keeps clear of the floating WhatsApp button. */}
        <div className="mx-auto flex w-full max-w-[1600px] items-center gap-3 px-4 py-2.5 pr-[4.5rem] sm:gap-6 sm:px-8 sm:py-3 sm:pr-[5.75rem] md:px-10 lg:px-16 xl:px-24">
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-[9px] uppercase tracking-[0.18em] text-[#C9683A] sm:text-[10px]">
              <span className="hidden sm:inline">
                Six Days in the Dibang ·{" "}
              </span>
              {sixMeta.duration} · {topTier.label}
            </p>
            <p className="mt-0.5 font-mono text-[1.05rem] leading-tight tracking-[-0.03em] text-[#F7F3E9] sm:text-[1.25rem]">
              ₹{sixMeta.fromPrice.toLocaleString("en-IN")}
              <span className="ml-1.5 font-sans text-[11px] tracking-normal text-[#F3EEE2]/50">
                per person
              </span>
            </p>
          </div>

          <a
            href={createAniniSixInquiryURL({ kind: "dates" })}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 flex-none items-center rounded-[10px] border border-[#F3EEE2]/25 px-4 text-[12.5px] font-medium text-[#F3EEE2] transition-colors hover:border-[#F3EEE2]/50 hover:bg-[#F3EEE2]/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9683A] sm:inline-flex"
          >
            Check dates
          </a>

          <a
            href="#desk"
            className="inline-flex min-h-11 flex-none items-center gap-2 rounded-[10px] bg-[#C9683A] px-4 text-[12.5px] font-semibold text-[#08110F] transition-colors hover:bg-[#D9784A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3EEE2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070E0D] sm:px-5 sm:text-[13px]"
          >
            <span className="sm:hidden">Pricing</span>
            <span className="hidden sm:inline">Price your party</span>
            <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
