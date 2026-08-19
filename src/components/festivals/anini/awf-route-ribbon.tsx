"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { awfMilestones, awfRouteGems } from "@/data/festivals/anini-winter-fest";

const TOTAL_KM = awfMilestones[awfMilestones.length - 1].km;
const kmPct = (km: number) => (km / TOTAL_KM) * 100;
const fmtAlt = (m: number) => `${m.toLocaleString("en-IN")} m`;

function MilestonePreview({ index }: { index: number }) {
  const m = awfMilestones[index];
  const [frame, setFrame] = useState(0);

  return (
    <motion.div
      key={m.name}
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.985 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="w-[19rem] overflow-hidden rounded-[16px] border border-[#e8dcc0]/[0.12] bg-[#0b1512]/95 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(243,236,220,0.07)] backdrop-blur-md sm:w-[21rem]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={m.images[frame].src}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={m.images[frame].src}
              alt={m.images[frame].alt}
              fill
              sizes="336px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1512]/70 via-transparent to-transparent" />
        {m.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {m.images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                aria-label={`Frame ${i + 1} of ${m.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setFrame(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === frame ? "w-5 bg-[#e8dcc0]" : "w-1.5 bg-[#e8dcc0]/40 hover:bg-[#e8dcc0]/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h4 className="font-serif text-xl font-normal italic tracking-[-0.01em] text-[#f3ecdc]">
            {m.name}
          </h4>
          <p className="font-mono text-[10px] tracking-[0.14em] text-[#d8c59d]">
            {m.km === 0 ? "KM 0" : `KM ${m.km}`} · {fmtAlt(m.alt)}
          </p>
        </div>
        <p className="mt-2 text-[13px] leading-6 text-[#ece4d0]/70">{m.note}</p>
        <p className="mt-3 flex items-start gap-2.5 border-t border-[#e8dcc0]/[0.09] pt-3 text-[12px] leading-5 text-[#ece4d0]/55">
          <span aria-hidden="true" className="mt-[7px] h-px w-4 flex-none bg-[#d8c59d]" />
          {m.protocol}
        </p>
      </div>
    </motion.div>
  );
}

function GemTip({ km }: { km: number }) {
  const gem = awfRouteGems.find((g) => g.km === km)!;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-56 rounded-[12px] border border-[#e8dcc0]/[0.1] bg-[#0b1512]/95 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md"
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#d8c59d]">
        ~km {gem.km}
      </p>
      <p className="mt-1 text-[13px] font-semibold text-[#f3ecdc]">{gem.name}</p>
      <p className="mt-1 text-[12px] leading-5 text-[#ece4d0]/60">{gem.note}</p>
    </motion.div>
  );
}

export function AwfRouteRibbon() {
  // active: { type: "m" | "g", i } — m = milestone index, g = gem km
  const [active, setActive] = useState<{ type: "m" | "g"; i: number } | null>(null);
  const [pinned, setPinned] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((a: { type: "m" | "g"; i: number }) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActive(a);
  }, []);

  const scheduleHide = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      setActive(null);
      setPinned(false);
    }, 220);
  }, []);

  const togglePin = useCallback((a: { type: "m" | "g"; i: number }) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActive((cur) => {
      const same = cur && cur.type === a.type && cur.i === a.i;
      setPinned(!same);
      return same ? null : a;
    });
  }, []);

  return (
    <section
      aria-labelledby="awf-route-title"
      className="border-t border-[#e8dcc0]/[0.07] bg-[#050d0f] py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8c59d]">
            Dibrugarh → Anini · {TOTAL_KM} km · one long day
          </p>
          <h2
            id="awf-route-title"
            className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#f3ecdc]"
          >
            The way there,{" "}
            <span className="font-serif font-normal italic text-[#dfcfab]">
              stop by stop
            </span>
          </h2>
          <p className="mt-6 max-w-[34rem] text-base leading-7 text-[#ece4d0]/60 sm:text-lg sm:leading-8">
            Trace the route. Rest on a dot — the big ones are milestones with
            frames from the road; the small ones are the moments in between.
          </p>
        </div>

        {/* Desktop: horizontal ribbon */}
        <div
          className="relative mt-24 hidden pb-4 pt-56 md:block"
          onMouseLeave={scheduleHide}
        >
          {/* Floating preview */}
          <AnimatePresence mode="wait">
            {active && (
              <div
                className="pointer-events-auto absolute top-0 z-20"
                style={{
                  left: `clamp(11rem, ${active.type === "m" ? kmPct(awfMilestones[active.i].km) : kmPct(active.i)}%, calc(100% - 11rem))`,
                  transform: "translateX(-50%)",
                }}
              >
                {active.type === "m" ? (
                  <MilestonePreview index={active.i} />
                ) : (
                  <GemTip km={active.i} />
                )}
              </div>
            )}
          </AnimatePresence>

          {/* The line */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[#e8dcc0]/[0.05] via-[#e8dcc0]/[0.22] to-[#d8c59d]/60"
            />
            {/* altitude ticks at ends */}
            <div className="relative flex justify-between">
              {awfMilestones.map((m, i) => (
                <div key={m.name} className="relative flex flex-col items-center">
                  <button
                    type="button"
                    aria-label={`${m.name}, kilometre ${m.km}, altitude ${m.alt} metres`}
                    aria-expanded={active?.type === "m" && active.i === i}
                    onMouseEnter={() => show({ type: "m", i })}
                    onFocus={() => show({ type: "m", i })}
                    onClick={() => togglePin({ type: "m", i })}
                    className="group relative flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8dcc0]"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute h-full w-full rounded-full bg-[#d8c59d]/25 transition-transform duration-300 ${
                        active?.type === "m" && active.i === i ? "scale-100 opacity-100" : "scale-50 opacity-0 group-hover:scale-75 group-hover:opacity-60"
                      }`}
                    />
                    <span
                      aria-hidden="true"
                      className={`h-[11px] w-[11px] rounded-full border transition-all duration-300 ${
                        active?.type === "m" && active.i === i
                          ? "border-[#e8dcc0] bg-[#d8c59d] shadow-[0_0_16px_rgba(216,197,157,0.6)]"
                          : "border-[#e8dcc0]/50 bg-[#0b1512] group-hover:border-[#e8dcc0]"
                      }`}
                    />
                  </button>
                  {/* alternating labels above/below */}
                  <div
                    className={`pointer-events-none absolute whitespace-nowrap text-center ${
                      i % 2 === 0 ? "bottom-full mb-3" : "top-full mt-3"
                    }`}
                  >
                    <p className="text-[12px] font-semibold tracking-[-0.01em] text-[#f3ecdc]/90">
                      {m.name}
                    </p>
                    <p className="font-mono text-[9px] tracking-[0.12em] text-[#ece4d0]/40">
                      {m.km === 0 ? "KM 0" : `${m.km}K`} · {fmtAlt(m.alt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Gems — positioned by true km */}
            {awfRouteGems.map((g) => (
              <button
                key={g.name}
                type="button"
                aria-label={`${g.name}, around kilometre ${g.km}`}
                onMouseEnter={() => show({ type: "g", i: g.km })}
                onFocus={() => show({ type: "g", i: g.km })}
                onClick={() => togglePin({ type: "g", i: g.km })}
                className="group absolute top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8dcc0]"
                style={{ left: `${kmPct(g.km)}%` }}
              >
                <span
                  aria-hidden="true"
                  className={`h-[5px] w-[5px] rounded-full transition-all duration-300 ${
                    active?.type === "g" && active.i === g.km
                      ? "bg-[#d8c59d] shadow-[0_0_10px_rgba(216,197,157,0.7)]"
                      : "bg-[#e8dcc0]/35 group-hover:bg-[#d8c59d]"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="mt-16 flex justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-[#ece4d0]/35">
            <span>Assam plains</span>
            <span>The climb · NH-313</span>
            <span>The plateau</span>
          </div>
        </div>

        {/* Mobile: vertical list */}
        <ol className="mt-14 md:hidden">
          {awfMilestones.map((m, i) => {
            const open = active?.type === "m" && active.i === i;
            return (
              <li key={m.name} className="relative pl-10">
                {i < awfMilestones.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-6 h-full w-px bg-[#e8dcc0]/[0.12]"
                  />
                )}
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => togglePin({ type: "m", i })}
                  className="flex w-full items-baseline gap-3 py-3.5 text-left"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-[1.15rem] h-[15px] w-[15px] rounded-full border transition-colors ${
                      open ? "border-[#e8dcc0] bg-[#d8c59d]" : "border-[#e8dcc0]/40 bg-[#0b1512]"
                    }`}
                  />
                  <span className="text-[15px] font-semibold text-[#f3ecdc]">{m.name}</span>
                  <span className="ml-auto font-mono text-[9px] tracking-[0.12em] text-[#ece4d0]/40">
                    {m.km === 0 ? "KM 0" : `${m.km}K`} · {fmtAlt(m.alt)}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 pr-1">
                        <MilestonePreview index={i} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
