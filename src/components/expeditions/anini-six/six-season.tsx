"use client";

import { useState } from "react";
import { sixSeason } from "@/data/expeditions/anini-six-days";

const TONE = {
  best: {
    fill: "bg-[#C9683A]",
    label: "text-[#C9683A]",
    word: "Open · best",
  },
  good: {
    fill: "bg-[#D8BE8B]",
    label: "text-[#D8BE8B]",
    word: "Open",
  },
  closed: {
    fill: "bg-[#F3EEE2]/20",
    label: "text-[#F3EEE2]/40",
    word: "Closed",
  },
} as const;

export function SixSeason() {
  const defaultIndex = sixSeason.months.findIndex((m) => m.tone === "best");
  const [active, setActive] = useState(defaultIndex === -1 ? 0 : defaultIndex);
  const month = sixSeason.months[active];

  return (
    <section
      aria-labelledby="six-season-title"
      className="relative overflow-hidden bg-[#0A1210] py-20 text-[#F3EEE2] sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9683A]">
              {sixSeason.kicker}
            </p>
            <h2
              id="six-season-title"
              className="mt-4 text-[clamp(2.4rem,6vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.05em]"
            >
              The{" "}
              <span className="font-serif font-normal italic text-[#D8BE8B]">
                window
              </span>
            </h2>
          </div>
          <p className="max-w-[36rem] text-[1.02rem] leading-8 text-[#F3EEE2]/[0.62] lg:col-span-7">
            {sixSeason.standfirst}
          </p>
        </div>

        <div
          role="group"
          aria-label="Season calendar"
          className="mt-14 grid grid-cols-6 gap-px overflow-hidden rounded-[14px] bg-[#F3EEE2]/10 sm:mt-16 sm:grid-cols-12"
        >
          {sixSeason.months.map((entry, index) => {
            const selected = index === active;
            const tone = TONE[entry.tone];
            return (
              <button
                key={entry.month}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={selected}
                className={`relative flex min-h-[5.5rem] flex-col justify-between px-2.5 py-3 text-left transition-colors sm:min-h-[7.5rem] sm:px-3 sm:py-4 ${
                  selected ? "bg-[#15201C]" : "bg-[#070E0D] hover:bg-[#0F1916]"
                }`}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] sm:text-[12px]">
                  {entry.month}
                </span>
                <span
                  aria-hidden="true"
                  className={`h-1 w-full ${tone.fill} ${
                    entry.tone === "closed" ? "opacity-40" : ""
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-8">
          <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${TONE[month.tone].label}`}>
            {TONE[month.tone].word}
          </p>
          <p className="font-serif text-[1.6rem] italic leading-snug tracking-[-0.02em] text-[#F7F3E9] sm:text-[1.9rem]">
            {month.month} — {month.note}
          </p>
        </div>
      </div>
    </section>
  );
}
