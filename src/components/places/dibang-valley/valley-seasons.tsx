"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { valleySeasons } from "@/data/places/dibang-valley";

const SEASON_TONES: Record<string, string> = {
  best: "bg-[#274435]",
  good: "bg-[#5f7a4d]",
  caution: "bg-[#c1993f]",
  avoid: "bg-[#b06b52]",
};

const TONE_LABELS: Record<string, string> = {
  best: "Best window",
  good: "Good",
  caution: "Possible with care",
  avoid: "Monsoon — avoid",
};

const FULL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function ValleySeasons() {
  const nowMonth = new Date().getMonth(); // 0 = Jan
  const [active, setActive] = useState(nowMonth);
  const season = valleySeasons[active];

  return (
    <section aria-labelledby="valley-seasons-title" className="bg-[#f1ebdf] py-20 text-[#17221b] sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
            The whole valley, month by month
          </p>
          <h2
            id="valley-seasons-title"
            className="text-[clamp(2.75rem,6vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.055em]"
          >
            One calendar,{" "}
            <span className="font-serif font-normal italic text-[#76533e]">two altitudes</span>
          </h2>
          <p className="mt-5 max-w-[32rem] text-[15px] leading-7 text-[#5a5344]">
            Rest on any month — the strip below reads it for you, foothills and
            high valley side by side.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[16px] border border-[#d5c9ae] bg-[#faf7f0] shadow-[0_30px_70px_-40px_rgba(23,34,27,0.35)] lg:mt-14">
          {/* The twelve-month strip */}
          <ol className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12" role="tablist" aria-label="Months of the year">
            {valleySeasons.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.month} className="border-[#e2d9c3] odd:border-r sm:border-r">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="valley-season-detail"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`flex min-h-[7.5rem] w-full flex-col justify-between p-3.5 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#274435] sm:min-h-[9rem] ${
                      isActive ? "bg-[#efe8d6]" : "hover:bg-[#f4efe2]"
                    }`}
                  >
                    <span
                      className={`h-1.5 rounded-full transition-all duration-500 ${SEASON_TONES[s.tone]} ${
                        isActive ? "w-full" : "w-6"
                      }`}
                      aria-hidden="true"
                    />
                    <span>
                      <span className="flex items-center gap-1.5 text-base font-semibold tracking-[-0.02em]">
                        {s.month}
                        {i === nowMonth && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#87543a]" aria-label="current month" />
                        )}
                      </span>
                      <span className="mt-1 block text-[10.5px] font-medium leading-4 text-[#6c6552]">
                        {s.label}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* The reading panel */}
          <div
            id="valley-season-detail"
            role="tabpanel"
            aria-live="polite"
            className="border-t border-[#e2d9c3] bg-[#f6f1e5]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={season.month}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10"
              >
                {/* Month headline */}
                <div className="lg:col-span-3">
                  <p className="font-serif text-[clamp(2rem,3.5vw,2.75rem)] font-normal italic leading-none tracking-[-0.02em] text-[#17221b]">
                    {FULL_MONTHS[active]}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d5c9ae] bg-[#faf7f0] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#5a5344]">
                    <span className={`h-2 w-2 rounded-full ${SEASON_TONES[season.tone]}`} aria-hidden="true" />
                    {TONE_LABELS[season.tone]}
                  </p>
                  {active === nowMonth && (
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#87543a]">
                      ← this is now
                    </p>
                  )}
                </div>

                {/* Two altitudes */}
                <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
                  <div className="rounded-[12px] border border-[#e2d9c3] bg-[#faf7f0] p-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#87543a]">
                      The low valley · Dambuk & Roing
                    </p>
                    <p className="mt-2.5 font-mono text-sm font-semibold text-[#274435]">
                      {season.low.temp}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-6 text-[#4c4638]">{season.low.state}</p>
                  </div>
                  <div className="rounded-[12px] border border-[#e2d9c3] bg-[#faf7f0] p-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#87543a]">
                      The high valley · Anini & Mayodia
                    </p>
                    <p className="mt-2.5 font-mono text-sm font-semibold text-[#274435]">
                      {season.high.temp}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-6 text-[#4c4638]">{season.high.state}</p>
                  </div>
                </div>

                {/* What we say */}
                <div className="flex lg:col-span-3">
                  <div className="flex w-full items-start gap-3 rounded-[12px] bg-[#17221b] p-5 text-[#f3ecdc]">
                    <span aria-hidden="true" className="mt-2 h-px w-4 flex-none bg-[#d8c59d]" />
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#d8c59d]">
                        What we say
                      </p>
                      <p className="mt-1.5 text-[13px] leading-6 text-[#ece4d0]/85">{season.weSay}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[#e2d9c3] px-4 py-3.5">
            {(Object.keys(TONE_LABELS) as (keyof typeof TONE_LABELS)[]).map((tone) => (
              <span key={tone} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5a5344]">
                <span className={`h-2 w-2 rounded-full ${SEASON_TONES[tone]}`} aria-hidden="true" />
                {TONE_LABELS[tone]}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-6 text-[#5a5344]">
          The low valley and the high valley run on the same clock but different weather:
          when Mayodia is buried in snow, Dambuk is in harvest. We sequence every route
          so you get both at their best.
        </p>
      </div>
    </section>
  );
}
