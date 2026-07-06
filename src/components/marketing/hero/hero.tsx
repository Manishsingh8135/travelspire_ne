import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero/ziro-valley.jpg";
import { Button } from "@/components/ui";
import { HeroFloatingCards } from "./hero-floating-cards";
import { HeroDestinations } from "./hero-destinations";
import { HeroExplorers } from "./hero-explorers";

/**
 * Section 1 — Hero. A movie, not a search box (new.md §1).
 * The LCP image + H1 + CTAs render server-side and never animate (perf/motion
 * docs); only the floating "living" timeline moves. Warm scrims (not decorative
 * color gradients) carry text legibility over the photograph.
 */
export function Hero() {
  return (
    <section id="top" data-tone="forest" className="relative flex min-h-svh flex-col overflow-hidden bg-charcoal-950">
      {/* LCP background — static import gives intrinsic dims + blur placeholder (zero CLS) */}
      <Image
        src={heroImage}
        alt="The Ziro valley at harvest — golden Apatani rice fields ringed by forested mountains under a dramatic sky, Arunachal Pradesh"
        placeholder="blur"
        priority
        sizes="100vw"
        className="absolute inset-0 size-full object-cover object-center"
      />
      {/* Warm legibility scrims */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-charcoal-950/85 via-charcoal-950/40 to-charcoal-950/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-transparent to-charcoal-950/45"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 md:px-10">
        {/* Upper — headline + living timeline */}
        <div className="flex flex-1 flex-col justify-center gap-10 pt-24 pb-10 md:pt-28 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl min-w-0">
            <h1 className="font-display text-4xl leading-[1.05] font-medium text-balance text-mist-50 sm:text-5xl lg:text-6xl">
              The Northeast isn&apos;t far.{" "}
              <span className="text-secondary italic">It&apos;s unforgettable.</span>
            </h1>

            <div aria-hidden className="mt-7 flex items-center gap-3">
              <span className="h-px w-16 bg-mist-50/40" />
              <span className="size-1.5 rotate-45 bg-secondary/70" />
            </div>

            <p className="mt-7 max-w-xl text-lg text-pretty text-mist-200/90">
              Eight states. Hundreds of tribes. Infinite stories. Discover a land of raw
              beauty, warm hearts, and journeys that stay with you forever.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link href={"/tours" as Route}>
                  Start Your Journey
                  <ArrowRight />
                </Link>
              </Button>

              <button
                type="button"
                className="group inline-flex items-center justify-center gap-3 text-mist-50 sm:justify-start"
              >
                <span className="flex size-12 items-center justify-center rounded-full border border-mist-50/40 transition-colors duration-200 ease-out group-hover:bg-mist-50/10">
                  <Play className="size-4 translate-x-px fill-current" />
                </span>
                <span className="text-sm font-medium">Watch the Journey</span>
              </button>
            </div>

            {/* Mobile-only social proof (full card shows ≥ md) */}
            <p className="mt-7 font-mono text-xs tracking-wide text-mist-300/80 md:hidden">
              10K+ explorers and counting
            </p>
          </div>

          <HeroFloatingCards className="hidden shrink-0 lg:block" />
        </div>

        {/* Lower — destinations strip + explorers */}
        <div className="flex items-end justify-between gap-4 pb-8">
          <HeroDestinations className="min-w-0 flex-1 lg:max-w-2xl" />
          <HeroExplorers className="hidden shrink-0 md:flex" />
        </div>
      </div>

      {/* Quiet scroll cue — no bounce */}
      <p
        aria-hidden
        className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-mist-200/50 lg:block"
      >
        Scroll to begin
      </p>
    </section>
  );
}
