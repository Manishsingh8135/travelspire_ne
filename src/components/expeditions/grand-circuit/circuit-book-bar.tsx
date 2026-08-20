"use client";

import { useEffect, useState } from "react";
import { ArrowDown, CalendarDays } from "lucide-react";
import { circuitMeta } from "@/data/expeditions/mechuka-dong-anini";
import { createGrandCircuitInquiryURL } from "@/lib/whatsapp";

export function CircuitBookBar() {
  const [pastHero, setPastHero] = useState(false);
  const [overDecisionArea, setOverDecisionArea] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      setPastHero(window.scrollY > window.innerHeight * 0.72);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const targets = ["pricing", "circuit-close"]
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (targets.length === 0) return;

    const visibleTargets = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleTargets.add(entry.target);
          else visibleTargets.delete(entry.target);
        });
        setOverDecisionArea(visibleTargets.size > 0);
      },
      { threshold: 0, rootMargin: "-8% 0px -20% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !overDecisionArea;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="border-t border-white/10 bg-[#08130f]/95 text-[#f7f0e4] shadow-[0_-18px_35px_-28px_rgba(0,0,0,0.9)] backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1600px] items-center gap-3 px-4 py-2.5 pr-[4.5rem] sm:gap-5 sm:px-8 sm:py-3 sm:pr-[5.75rem] md:px-10 lg:px-16 xl:px-24">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[9px] font-bold uppercase tracking-[0.15em] text-[#d8ba7b] sm:text-[10px]">
              <span className="hidden sm:inline">
                Mechuka · Dong · Anini ·{" "}
              </span>
              {circuitMeta.duration}
            </p>
            <p className="mt-0.5 font-mono text-[1.05rem] leading-tight tracking-[-0.04em] sm:text-xl">
              ₹{circuitMeta.fromPrice.toLocaleString("en-IN")}
              <span className="ml-1.5 font-sans text-[10px] tracking-normal text-white/[0.45] sm:text-[11px]">
                from / person
              </span>
            </p>
          </div>

          <a
            href={createGrandCircuitInquiryURL({ kind: "dates" })}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center justify-center gap-2 rounded-[10px] bg-white/[0.07] px-4 text-[12px] font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] transition-colors hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ba7b] sm:inline-flex"
          >
            <CalendarDays aria-hidden="true" className="h-4 w-4" />
            Check dates
          </a>

          <a
            href="#pricing"
            className="inline-flex min-h-11 min-w-[7.5rem] items-center justify-center gap-2 rounded-[10px] bg-[#e8d8b8] px-4 text-[12px] font-bold text-[#102019] shadow-[0_14px_26px_-19px_rgba(0,0,0,0.95)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:min-w-[10rem]"
          >
            See prices
            <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
