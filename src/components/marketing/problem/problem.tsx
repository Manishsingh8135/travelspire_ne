import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";
import { ProblemIntro } from "./problem-intro";
import { BeforeCollage } from "./before-collage";
import { AfterPanel } from "./after-panel";
import { ProblemStats } from "./problem-stats";

/** Circular Before→After connector. Points right between side-by-side panels,
 *  down between the stacked panels on mobile. */
function Connector({ className, down = false }: { className?: string; down?: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex size-11 items-center justify-center rounded-full bg-pine-800 text-mist-50 shadow-lg ring-4 ring-background ${className ?? ""}`}
    >
      <ArrowRight className={`size-5 ${down ? "rotate-90" : ""}`} />
    </span>
  );
}

/**
 * Section 2 — The Problem. Make people *feel* why Travelspire exists: the
 * scattered, desaturated chaos of planning Northeast today (Before) resolving
 * into one calm, trusted guide (After). First light "chapter" after the dark
 * hero — the palette change is the rhythm break (new.md §"chapters, not sections").
 */
export function Problem() {
  return (
    <Section
      id="problem"
      aria-labelledby="problem-heading"
      tone="paper"
      padded={false}
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="lg:col-span-4 lg:pt-1">
            <ProblemIntro headingId="problem-heading" />
          </Reveal>

          {/* Before / After diptych */}
          <div className="relative lg:col-span-8">
            <div className="relative grid gap-5 sm:grid-cols-2 sm:gap-4">
              <BeforeCollage />

              {/* mobile inline connector (between stacked panels) */}
              <div className="flex justify-center sm:hidden">
                <Connector down />
              </div>

              <AfterPanel />

              {/* desktop connector — centered over the seam */}
              <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden -translate-x-1/2 items-center sm:flex">
                <Connector />
              </div>
            </div>
          </div>
        </div>

        <Reveal className="mt-14 sm:mt-16">
          <ProblemStats />
        </Reveal>
      </div>
    </Section>
  );
}
