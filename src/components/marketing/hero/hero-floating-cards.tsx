"use client";

import { m, useReducedMotion } from "motion/react";
import { Cloud, Route as RouteIcon, FileText, CalendarDays } from "lucide-react";
import { cn } from "@/lib/cn";

// Placeholder live signals — wire to real weather / road / permit / festival
// feeds later. The point of the section is "the world is alive."
const ITEMS = [
  { Icon: Cloud, title: "18°C", lines: ["Guwahati", "Cloudy"] },
  { Icon: RouteIcon, title: "NH-13", lines: ["Roads open", "Safe to travel"] },
  { Icon: FileText, title: "ILP / PAP", lines: ["Check permit", "requirements"] },
  { Icon: CalendarDays, title: "Hornbill Festival", lines: ["1–10 Dec 2025", "Kohima, Nagaland"] },
] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};
const itemUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const itemFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

/**
 * The hero's right-side "living" timeline: weather, road, permit, festival —
 * connected by a dotted field-journal line. Animates in on mount (above the
 * fold, secondary chrome — never the LCP). Opacity-only under reduced motion.
 */
export function HeroFloatingCards({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const item = reduce ? itemFade : itemUp;

  return (
    <m.ul
      aria-label="Live across Northeast India"
      className={cn(
        "flex w-64 flex-col [text-shadow:0_1px_12px_oklch(0.15_0.01_60/0.55)]",
        className,
      )}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {ITEMS.map(({ Icon, title, lines }, i) => (
        <m.li key={title} variants={item} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-mist-50/30 bg-charcoal-950/25 text-mist-50 backdrop-blur-sm">
              <Icon className="size-5" />
            </span>
            {i < ITEMS.length - 1 ? (
              <span
                aria-hidden
                className="my-1.5 w-px flex-1 border-l border-dotted border-mist-50/30"
              />
            ) : null}
          </div>
          <div className="pt-1.5 pb-7">
            <p className="leading-tight font-medium text-mist-50">{title}</p>
            {lines.map((l) => (
              <p key={l} className="mt-0.5 text-sm leading-snug text-mist-200/85">
                {l}
              </p>
            ))}
          </div>
        </m.li>
      ))}
    </m.ul>
  );
}
