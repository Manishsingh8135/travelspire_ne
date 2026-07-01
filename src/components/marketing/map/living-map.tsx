import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { Button, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";
import { MapCanvas } from "./map-canvas";

/**
 * Section 5 — The Living Map. Near-fullscreen dark "chapter" where the map
 * canvas dominates and the header is a slim strip (content-forward proportions).
 * A cinematic *teaser*: real place names, glowing pins and the five intelligence
 * layers, with a CTA into the real interactive map at /explore (new.md §5 —
 * "this section alone can sell the platform").
 */
export function LivingMap() {
  return (
    <Section
      tone="forest"
      padded={false}
      id="map"
      aria-labelledby="map-heading"
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        {/* slim header — title left, dek + CTA right */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <Eyebrow tone="onDark" ornament className="text-pine-300">
              The Living Map
            </Eyebrow>
            <h2
              id="map-heading"
              className="mt-4 font-display text-4xl leading-[1.03] font-medium text-balance text-mist-50 sm:text-5xl lg:text-[3.5rem]"
            >
              Northeast, mapped by the people who live here.
            </h2>
          </div>
          <div className="lg:max-w-xs lg:shrink-0 lg:text-right">
            <p className="text-base text-pretty text-mist-200/75">
              Weather, road status, permits, hidden spots and local scouts — one living map
              that actually knows the ground.
            </p>
            <Button asChild variant="secondary" size="lg" className="mt-5 rounded-full">
              <Link href={"/explore" as Route}>
                Open the Living Map
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>

        {/* the canvas dominates */}
        <Reveal className="mt-8 sm:mt-10" amount={0.1}>
          <MapCanvas />
        </Reveal>
      </div>
    </Section>
  );
}
