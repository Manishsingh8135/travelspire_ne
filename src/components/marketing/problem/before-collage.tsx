"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { m, useReducedMotion, type Variants } from "motion/react";
import { Search, MessageCircle, FileText, Download, Star } from "lucide-react";
import { cn } from "@/lib/cn";

/* The scattered pile settles in with a jittery stagger = the feeling of chaos.
   Rotation lives on an inner element (stable CSS) so motion only drives
   opacity / lift / scale on the wrapper. */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const scrap: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const scrapReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

/** One pinned fragment. `pos` is percentage-anchored so the whole pile scales as
 *  a unit across breakpoints; `rot` tilts it for the field-desk-clutter look. */
function Scrap({
  pos,
  rot,
  z,
  variants,
  className,
  children,
}: {
  pos: CSSProperties;
  rot: number;
  z?: number;
  variants: Variants;
  className?: string;
  children: ReactNode;
}) {
  return (
    <m.div className="absolute" style={{ ...pos, zIndex: z }} variants={variants}>
      <div
        style={{ rotate: `${rot}deg` }}
        className={cn(
          "rounded-md bg-mist-50 text-basalt-900 shadow-[0_8px_24px_-10px_oklch(0.2_0.02_60/0.35)] ring-1 ring-black/5",
          className,
        )}
      >
        {children}
      </div>
    </m.div>
  );
}

const TAGS = ["Outdated", "Unreliable", "Fragmented", "Overwhelming"] as const;

export function BeforeCollage({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const item = reduce ? scrapReduced : scrap;

  return (
    <div className={cn("flex flex-col", className)}>
      {/* BEFORE badge */}
      <div className="relative z-20 mx-auto -mb-3 w-fit">
        <span className="inline-flex items-center rounded-full bg-mist-50 px-4 py-1.5 font-mono text-[0.7rem] font-medium tracking-[0.2em] uppercase text-stone-500 shadow-sm ring-1 ring-black/5">
          Before
        </span>
      </div>

      {/* Collage stage — paper-on-paper, scattered & desaturated */}
      <m.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative aspect-[4/5] w-full rounded-2xl bg-stone-100/70 ring-1 ring-black/5 sm:aspect-auto sm:min-h-[480px] sm:flex-1"
      >
        {/* faint grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.4] [background-image:radial-gradient(oklch(0.55_0.01_70/0.12)_1px,transparent_1px)] [background-size:16px_16px]"
        />

        {/* a — search field */}
        <m.div variants={item} className="absolute" style={{ top: "4%", left: "6%", width: "60%", zIndex: 6 }}>
          <div style={{ rotate: "-2deg" }} className="flex items-center gap-2 rounded-full bg-mist-50 px-3 py-2 shadow-[0_8px_24px_-10px_oklch(0.2_0.02_60/0.35)] ring-1 ring-black/5">
            <Search className="size-3.5 shrink-0 text-stone-400" />
            <span className="truncate text-[0.72rem] text-stone-500">places to visit in meghalaya</span>
          </div>
        </m.div>

        {/* b — sticky note */}
        <Scrap pos={{ top: "11%", left: "52%", width: "38%" }} rot={5} z={8} variants={item} className="bg-marigold-100 ring-marigold-300/40">
          <p className="px-3 py-3 font-display text-sm leading-snug text-basalt-800">
            Which route is open right now?
          </p>
        </Scrap>

        {/* c — chat fragment */}
        <Scrap pos={{ top: "21%", left: "44%", width: "52%" }} rot={-2} z={7} variants={item}>
          <div className="space-y-1.5 p-3">
            <div className="flex items-center gap-1.5">
              <MessageCircle className="size-3.5 text-pine-600" />
              <span className="font-mono text-[0.6rem] tracking-wide uppercase text-stone-400">
                Local guide
              </span>
            </div>
            <p className="ml-auto w-fit max-w-[85%] rounded-lg rounded-br-sm bg-pine-100 px-2.5 py-1.5 text-[0.72rem] text-basalt-800">
              Is the road from Tezpur to Tawang open?
            </p>
            <p className="w-fit max-w-[85%] rounded-lg rounded-bl-sm bg-stone-100 px-2.5 py-1.5 text-[0.72rem] text-stone-500">
              Not sure — maybe call the driver
            </p>
          </div>
        </Scrap>

        {/* d — permit / gov PDF card */}
        <Scrap pos={{ top: "37%", left: "3%", width: "47%" }} rot={1.5} z={5} variants={item} className="overflow-hidden">
          <div className="bg-pine-800 px-3 py-1.5">
            <p className="font-mono text-[0.55rem] tracking-[0.18em] uppercase text-pine-100/90">
              Permit Portal
            </p>
          </div>
          <div className="p-3">
            <p className="text-[0.78rem] font-medium text-basalt-800">Inner Line Permit (ILP)</p>
            <div className="mt-2 flex items-center justify-between border-t border-dashed border-stone-300 pt-2">
              <span className="flex items-center gap-1 text-[0.62rem] text-stone-400">
                <FileText className="size-3" /> form_v3_final.pdf
              </span>
              <Download className="size-3.5 text-stone-400" />
            </div>
          </div>
        </Scrap>

        {/* e — sticky note */}
        <Scrap pos={{ top: "47%", left: "58%", width: "34%" }} rot={-5} z={8} variants={item} className="bg-marigold-100 ring-marigold-300/40">
          <p className="px-3 py-3 font-display text-sm leading-snug text-basalt-800">
            Where to stay in Ziro Valley?
          </p>
        </Scrap>

        {/* f — desaturated photo scrap */}
        <Scrap pos={{ top: "55%", left: "4%", width: "38%" }} rot={2.5} z={6} variants={item} className="overflow-hidden p-1.5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src="/images/places/ziro-new/ziro-new-landscape-2.JPG"
              alt=""
              fill
              sizes="180px"
              className="object-cover grayscale"
            />
          </div>
          <p className="px-1 pt-1.5 text-[0.7rem] font-medium text-basalt-800">Beautiful place!</p>
          <p className="px-1 pb-1 font-mono text-[0.55rem] tracking-wide uppercase text-stone-400">
            Unknown location
          </p>
        </Scrap>

        {/* g — map / drive fragment */}
        <Scrap pos={{ top: "62%", left: "60%", width: "33%" }} rot={3} z={7} variants={item} className="overflow-hidden">
          <div className="relative h-16 bg-stone-200">
            <svg viewBox="0 0 120 60" className="absolute inset-0 size-full" fill="none" aria-hidden>
              <path d="M8 52 C 30 40, 26 24, 48 22 S 88 28, 112 8" stroke="oklch(0.55 0.06 156)" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" />
              <circle cx="8" cy="52" r="3" fill="oklch(0.55 0.06 156)" />
              <circle cx="112" cy="8" r="3" fill="oklch(0.55 0.115 43)" />
            </svg>
          </div>
          <p className="px-2.5 py-2 text-[0.72rem] font-medium text-basalt-800">
            Drive 10h 32m{" "}
            <span className="font-normal text-stone-400">· 414 km</span>
          </p>
        </Scrap>

        {/* h — stale review note */}
        <Scrap pos={{ top: "84%", left: "46%", width: "31%" }} rot={6} z={8} variants={item} className="bg-stone-50">
          <div className="px-3 py-2.5">
            <p className="font-mono text-[0.55rem] tracking-wide uppercase text-stone-400">
              Reviews from 2018
            </p>
            <div className="mt-1 flex gap-0.5 text-marigold-500">
              {[0, 1, 2].map((i) => (
                <Star key={i} className="size-3 fill-current" />
              ))}
              {[0, 1].map((i) => (
                <Star key={`o${i}`} className="size-3 text-stone-300" />
              ))}
            </div>
          </div>
        </Scrap>

        {/* i — floating message bubble */}
        <m.div variants={item} className="absolute" style={{ top: "82%", left: "80%", zIndex: 9 }}>
          <div style={{ rotate: "-4deg" }} className="flex size-11 items-center justify-center rounded-full rounded-br-md bg-pine-600 text-mist-50 shadow-lg">
            <MessageCircle className="size-5" />
          </div>
        </m.div>
      </m.div>

      {/* ✕ tag row */}
      <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {TAGS.map((t) => (
          <li key={t} className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
            <span aria-hidden className="text-stone-400">
              ✕
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
