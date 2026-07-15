"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { Photo } from "@/components/ui/photo";
import { Eyebrow } from "@/components/ui";
import { Section } from "@/components/marketing/section";
import { WaxStamp } from "@/components/marketing/decor/wax-stamp";
import { cn } from "@/lib/cn";

/**
 * Section 7 — THE LOOP (rebuilt per 08-blueprint/14 §7 + the de-shadcn law).
 * No cards, no boxes: one sticky night stage where full-bleed photography
 * crossfades through the five movements while a route line literally draws
 * itself down a rail of wax stamps — DREAM → PLAN → GO → REMEMBER → SHARE —
 * and then curls home, because the loop is the whole point. Stamps navigate.
 * Dark done as photography (the founder's law): the night here is an image
 * and a scrim, never flat paint. Reduced motion gets a paged stack.
 */

type Stage = {
  n: string;
  key: string;
  title: string;
  body: string;
  note: string;
  place: string;
  src: string;
  alt: string;
};

const STAGES: Stage[] = [
  {
    n: "01",
    key: "Dream",
    title: "It starts with a spark.",
    body: "A reel at midnight, a photo from a friend — and the Northeast lodges itself in your head and refuses to leave.",
    note: "Where every journey is born",
    place: "Dzükou Valley · Nagaland",
    src: "/images/places/hornbill/Dzoku_1.webp",
    alt: "Rare pink Dzükou lilies blooming across the emerald hills of Dzükou Valley, Nagaland",
  },
  {
    n: "02",
    key: "Plan",
    title: "Shape it into a plan.",
    body: "Routes, permits, stays, weather, timing — the chaos becomes a single clear line on the map, with Mei and the living map doing the heavy lifting.",
    note: "Chaos, made simple",
    place: "Dong · Arunachal Pradesh",
    src: "/images/places/dong-new/dong-new-portrait-2.jpg",
    alt: "A traveller looking out over green mountains from a tent at Dong, Arunachal Pradesh",
  },
  {
    n: "03",
    key: "Go",
    title: "Hit the road.",
    body: "Offline maps, live road alerts and local scouts keep you moving — through the passes, the fog and the places the highway forgot.",
    note: "Where it gets real",
    place: "Dambuk · Arunachal Pradesh",
    src: "/images/places/dambuk/Dambuk_2.jpg",
    alt: "A motorcycle traveller at a riverside adventure camp in Dambuk, Arunachal Pradesh",
  },
  {
    n: "04",
    key: "Remember",
    title: "Keep the light.",
    body: "Every sunrise, every stranger-turned-friend, every wrong turn that became the best part — gathered into a memory book that's yours to keep.",
    note: "The trip, made permanent",
    place: "Dzükou Valley · Nagaland",
    src: "/images/places/hornbill/Dzoku_3.jpg",
    alt: "Golden sunrise over the rolling hills of Dzükou Valley with tents in the foreground, Nagaland",
  },
  {
    n: "05",
    key: "Share",
    title: "Pass the spark on.",
    body: "You post one photo. A friend in a distant city stops scrolling. And somewhere, quietly, the next journey begins.",
    note: "And the loop closes",
    place: "Hornbill Festival · Nagaland",
    src: "/images/places/hornbill/Hornbill_women.PNG",
    alt: "Naga women in traditional attire and beaded jewellery at the Hornbill Festival, Kohima, Nagaland",
  },
];

/* Rail geometry — SVG coords; stamps are HTML positioned on the same fractions. */
const RAIL_VB_H = 640;
const NODE_YS = [72, 196, 320, 444, 568];

/** The route ahead (dashed, faint) + the travelled line (solid, drawn by scroll). */
function RouteRail({
  progress,
  curl,
}: {
  progress: ReturnType<typeof useTransform<number, number>>;
  curl: ReturnType<typeof useTransform<number, number>>;
}) {
  const route =
    "M60 72 C 44 112, 78 152, 60 196 C 44 236, 76 276, 60 320 C 44 360, 78 404, 60 444 C 46 482, 74 528, 60 568";
  const home =
    "M60 568 C 18 540, 10 300, 14 160 C 16 108, 34 84, 52 74";
  return (
    <svg
      viewBox={`0 0 120 ${RAIL_VB_H}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      className="absolute inset-0 h-full w-full"
    >
      {/* the road ahead */}
      <path d={route} stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="3 6" strokeLinecap="round" />
      <path d={home} stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.2" strokeDasharray="2 7" strokeLinecap="round" />
      {/* the road travelled */}
      <motion.path
        d={route}
        stroke="var(--color-marigold-400)"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />
      <motion.path
        d={home}
        stroke="var(--color-marigold-400)"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={{ pathLength: curl }}
      />
    </svg>
  );
}

export function Journey() {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);
  const [looped, setLooped] = React.useState(false);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });
  const lineProgress = useTransform(scrollYProgress, [0.04, 0.86], [0, 1]);
  const curlProgress = useTransform(scrollYProgress, [0.88, 0.995], [0, 1]);
  const mobileBar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(STAGES.length - 1, Math.max(0, Math.floor(v * STAGES.length))));
    setLooped(v > 0.93);
  });

  const jumpTo = (i: number) => {
    const el = stageRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (i / STAGES.length) * span + 2, behavior: "smooth" });
  };

  return (
    <Section tone="paper" padded={false} id="journey" aria-labelledby="journey-heading">
      {/* Intro strip — compact, content-dominant (title left · dek right). */}
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow tone="muted" ornament>
              The Journey
            </Eyebrow>
            <h2
              id="journey-heading"
              className="mt-4 font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl"
            >
              Every great trip is <span className="italic text-secondary">a loop.</span>
            </h2>
          </div>
          <p className="max-w-md text-base text-pretty text-muted-foreground sm:text-lg lg:pb-2 lg:text-right">
            Five movements, one circle — and at the end, someone else&apos;s spark catches.
            <span className="mt-2 block font-mono text-[11px] tracking-[0.25em] uppercase">
              Scroll the route ↓
            </span>
          </p>
        </div>
      </div>

      {reduced ? (
        <LoopStatic />
      ) : (
        /* ── The sticky night stage — 5 movements × 100svh of travel ── */
        <div ref={stageRef} data-tone="forest" className="relative h-[520svh]">
          <div className="sticky top-0 h-svh overflow-hidden">
            {/* Photography — the night IS an image, never paint. */}
            {STAGES.map((stage, i) => (
              <div
                key={stage.key}
                aria-hidden={active !== i}
                className={cn(
                  "absolute inset-0 transition-opacity duration-[900ms] ease-out",
                  active === i ? "opacity-100" : "opacity-0",
                )}
              >
                <Photo
                  src={stage.src}
                  alt={stage.alt}
                  fill
                  sizes="100vw"
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
              className="absolute inset-0 bg-gradient-to-r from-charcoal-950/85 via-charcoal-950/35 to-charcoal-950/20 max-lg:bg-gradient-to-t max-lg:from-charcoal-950/90 max-lg:via-charcoal-950/40 max-lg:to-charcoal-950/30"
            />

            {/* ── Desktop rail: the route + its stamps ── */}
            <div className="absolute inset-y-0 left-6 hidden w-[120px] lg:block xl:left-12">
              <div className="relative h-full text-mist-50">
                <RouteRail progress={lineProgress} curl={curlProgress} />
                {STAGES.map((stage, i) => (
                  <button
                    key={stage.key}
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-label={`Go to ${stage.key}`}
                    aria-current={active === i ? "step" : undefined}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                    style={{ top: `${(NODE_YS[i]! / RAIL_VB_H) * 100}%` }}
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
                {STAGES.map((stage, i) => (
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
                        "size-11 transition-all duration-400",
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
                  {STAGES.map((stage, i) => (
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
      )}
    </Section>
  );
}

/** Reduced-motion fallback: the five movements as full-height pages, no tricks. */
function LoopStatic() {
  return (
    <div data-tone="forest">
      {STAGES.map((stage) => (
        <article key={stage.key} className="relative flex min-h-svh items-end overflow-hidden">
          <Photo src={stage.src} alt={stage.alt} fill sizes="100vw" className="object-cover" />
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
