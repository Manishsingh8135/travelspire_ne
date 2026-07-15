"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { WaxStamp } from "@/components/marketing/decor/wax-stamp";
import { cn } from "@/lib/cn";

/**
 * THE LOOP — the sticky night stage (client half of section 7).
 * No cards, no boxes: full-bleed photography crossfades through the five
 * movements while a route line draws itself down a rail of wax stamps —
 * DREAM → PLAN → GO → REMEMBER → SHARE — then curls home. Stamps navigate.
 * The night is an image + warm scrim, never flat paint (the founder's law).
 * Reduced motion renders the movements as honest full-height pages.
 */

export type LoopStage = {
  n: string;
  key: string;
  title: string;
  body: string;
  note: string;
  place: string;
  src: string;
  alt: string;
  /** Resolved server-side from the server-only blur map. */
  blur?: string;
};

/* Rail geometry — SVG coords; stamps are HTML positioned on the same fractions. */
const RAIL_VB_H = 640;
const NODE_YS = [72, 196, 320, 444, 568];
const ROUTE =
  "M60 72 C 44 112, 78 152, 60 196 C 44 236, 76 276, 60 320 C 44 360, 78 404, 60 444 C 46 482, 74 528, 60 568";
const HOME = "M60 568 C 18 540, 10 300, 14 160 C 16 108, 34 84, 52 74";

function StageImage({
  stage,
  priority,
  className,
}: {
  stage: LoopStage;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={stage.src}
      alt={stage.alt}
      fill
      sizes="100vw"
      priority={priority}
      className={className}
      {...(stage.blur ? { placeholder: "blur" as const, blurDataURL: stage.blur } : {})}
    />
  );
}

export function JourneyLoop({ stages }: { stages: LoopStage[] }) {
  const reduced = useReducedMotion();
  if (reduced) return <LoopStatic stages={stages} />;
  return <LoopSticky stages={stages} />;
}

function LoopSticky({ stages }: { stages: LoopStage[] }) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);
  const [looped, setLooped] = React.useState(false);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });
  const lineProgress = useTransform(scrollYProgress, [0.04, 0.86], [0, 1]);
  const curlProgress = useTransform(scrollYProgress, [0.88, 0.995], [0, 1]);
  const mobileBar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(stages.length - 1, Math.max(0, Math.floor(v * stages.length))));
    setLooped(v > 0.93);
  });

  const jumpTo = (i: number) => {
    const el = stageRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (i / stages.length) * span + 2, behavior: "smooth" });
  };

  return (
    <div ref={stageRef} data-tone="forest" className="relative h-[520svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Photography — the night IS an image, never paint. */}
        {stages.map((stage, i) => (
          <div
            key={stage.key}
            aria-hidden={active !== i}
            className={cn(
              "absolute inset-0 transition-opacity duration-[900ms] ease-out",
              active === i ? "opacity-100" : "opacity-0",
            )}
          >
            <StageImage
              stage={stage}
              priority={i === 0}
              className={cn(
                "object-cover transition-transform duration-[1400ms] ease-out",
                active === i ? "scale-100" : "scale-[1.04]",
              )}
            />
          </div>
        ))}
        {/* Legibility scrim — warm night glass, heavier where the words live. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/40 to-charcoal-950/30 lg:bg-gradient-to-r lg:from-charcoal-950/85 lg:via-charcoal-950/35 lg:to-charcoal-950/20"
        />

        {/* ── Desktop rail: the route + its stamps ── */}
        <div className="absolute inset-y-0 left-6 hidden w-[120px] lg:block xl:left-12">
          <div className="relative h-full text-mist-50">
            <svg
              viewBox={`0 0 120 ${RAIL_VB_H}`}
              preserveAspectRatio="none"
              fill="none"
              aria-hidden
              className="absolute inset-0 h-full w-full"
            >
              {/* the road ahead */}
              <path
                d={ROUTE}
                stroke="currentColor"
                strokeOpacity="0.22"
                strokeWidth="1.5"
                strokeDasharray="3 6"
                strokeLinecap="round"
              />
              <path
                d={HOME}
                stroke="currentColor"
                strokeOpacity="0.14"
                strokeWidth="1.2"
                strokeDasharray="2 7"
                strokeLinecap="round"
              />
              {/* the road travelled */}
              <motion.path
                d={ROUTE}
                stroke="var(--color-marigold-400)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ pathLength: lineProgress }}
              />
              <motion.path
                d={HOME}
                stroke="var(--color-marigold-400)"
                strokeWidth="1.6"
                strokeLinecap="round"
                style={{ pathLength: curlProgress }}
              />
            </svg>
            {stages.map((stage, i) => (
              <button
                key={stage.key}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Go to ${stage.key}`}
                aria-current={active === i ? "step" : undefined}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${((NODE_YS[i] ?? 320) / RAIL_VB_H) * 100}%` }}
              >
                <WaxStamp
                  label={stage.key}
                  sub={`Stage ${stage.n}`}
                  className={cn(
                    "size-[74px] transition-all duration-500",
                    i % 2 === 0 ? "-rotate-3" : "rotate-2",
                    active === i
                      ? "scale-110 text-marigold-300 drop-shadow-[0_0_18px_oklch(0.78_0.15_75_/_0.45)]"
                      : "text-mist-50/40 hover:text-mist-50/70",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── Mobile: stamp strip + progress hairline ── */}
        <div className="absolute inset-x-0 top-0 pt-[max(theme(spacing.20),env(safe-area-inset-top))] lg:hidden">
          <div className="flex items-center justify-center gap-2 px-4">
            {stages.map((stage, i) => (
              <button
                key={stage.key}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Go to ${stage.key}`}
                aria-current={active === i ? "step" : undefined}
              >
                <WaxStamp
                  label={stage.n}
                  className={cn(
                    "size-11 transition-all duration-500",
                    active === i ? "text-marigold-300" : "text-mist-50/35",
                  )}
                />
              </button>
            ))}
          </div>
          <div className="mx-auto mt-3 h-px w-56 overflow-hidden bg-mist-50/15">
            <motion.div className="h-full bg-marigold-400" style={{ width: mobileBar }} />
          </div>
        </div>

        {/* ── The words — typography on the night, no boxes ── */}
        <div className="absolute inset-0 flex items-end lg:items-center">
          <div className="relative w-full px-5 pb-[max(theme(spacing.16),env(safe-area-inset-bottom))] sm:px-8 lg:pb-0 lg:pl-48 xl:pl-64">
            <div className="relative max-w-xl">
              {stages.map((stage, i) => (
                <div
                  key={stage.key}
                  aria-hidden={active !== i}
                  className={cn(
                    "transition-all duration-700",
                    active === i
                      ? "relative translate-y-0 opacity-100"
                      : "absolute inset-0 translate-y-3 opacity-0",
                  )}
                >
                  {/* ghost numeral */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -left-2 font-display text-[9rem] leading-none font-medium text-mist-50/[0.08] select-none lg:-top-32 lg:text-[12rem]"
                  >
                    {stage.n}
                  </span>
                  <p className="font-mono text-xs tracking-[0.3em] text-marigold-300 uppercase">
                    {stage.key} — {stage.note}
                  </p>
                  <h3 className="mt-4 font-display text-4xl leading-[1.04] font-medium text-balance text-mist-50 sm:text-5xl lg:text-6xl">
                    {stage.title}
                  </h3>
                  <p className="mt-5 max-w-md text-base text-pretty text-mist-100/85 sm:text-lg">
                    {stage.body}
                  </p>
                  <p className="mt-7 flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-mist-100/70 uppercase">
                    <span aria-hidden className="h-px w-8 bg-mist-100/40" />
                    {stage.place}
                  </p>
                </div>
              ))}
            </div>

            {/* the loop closes */}
            <p
              aria-hidden={!looped}
              className={cn(
                "absolute right-5 bottom-6 hidden max-w-[15rem] text-right font-mono text-[11px] leading-relaxed tracking-[0.18em] text-marigold-300/90 uppercase transition-opacity duration-700 lg:block xl:right-12",
                looped ? "opacity-100" : "opacity-0",
              )}
            >
              …and the route curls home.
              <br />
              The next dream is already lit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Reduced-motion fallback: the five movements as full-height pages, no tricks. */
function LoopStatic({ stages }: { stages: LoopStage[] }) {
  return (
    <div data-tone="forest">
      {stages.map((stage) => (
        <article key={stage.key} className="relative flex min-h-svh items-end overflow-hidden">
          <StageImage stage={stage} className="object-cover" />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/40 to-charcoal-950/25"
          />
          <div className="relative w-full px-5 pb-16 sm:px-8 lg:px-12">
            <div className="mx-auto flex max-w-[92rem] items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className="font-mono text-xs tracking-[0.3em] text-marigold-300 uppercase">
                  {stage.key} — {stage.note}
                </p>
                <h3 className="mt-3 font-display text-4xl leading-tight font-medium text-mist-50 sm:text-5xl">
                  {stage.title}
                </h3>
                <p className="mt-4 max-w-md text-base text-mist-100/85">{stage.body}</p>
                <p className="mt-5 font-mono text-[11px] tracking-[0.2em] text-mist-100/70 uppercase">
                  {stage.place}
                </p>
              </div>
              <WaxStamp
                label={stage.key}
                sub={`Stage ${stage.n}`}
                className="hidden size-24 shrink-0 -rotate-3 text-mist-50/50 sm:block"
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
