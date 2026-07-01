import Link from "next/link";
import type { Route } from "next";
import {
  Moon,
  Mountain,
  Drama,
  Bike,
  Camera,
  Heart,
  Bird,
  Sparkles,
  UtensilsCrossed,
  PartyPopper,
  Snowflake,
  Droplets,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";

const MOODS: { label: string; icon: LucideIcon }[] = [
  { label: "Stillness", icon: Moon },
  { label: "Adventure", icon: Mountain },
  { label: "Culture", icon: Drama },
  { label: "Motorcycle", icon: Bike },
  { label: "Photography", icon: Camera },
  { label: "Romance", icon: Heart },
  { label: "Wildlife", icon: Bird },
  { label: "Spirituality", icon: Sparkles },
  { label: "Food", icon: UtensilsCrossed },
  { label: "Festivals", icon: PartyPopper },
  { label: "Snow", icon: Snowflake },
  { label: "Waterfalls", icon: Droplets },
];

/**
 * Section 9 — Explore by Emotion. People don't choose a place, they choose a
 * feeling (new.md §9). A paper "chapter": start from a mood, not a map. Each
 * tile leads into the explore experience filtered by that feeling.
 */
export function Emotion() {
  return (
    <Section
      tone="paper"
      padded={false}
      id="emotion"
      aria-labelledby="emotion-heading"
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="muted" ornament className="justify-center">
            Explore by Emotion
          </Eyebrow>
          <h2
            id="emotion-heading"
            className="mt-4 font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl"
          >
            What are you <span className="italic text-secondary">looking for?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            Most people don&apos;t choose a place — they choose a feeling. Start with yours, and
            we&apos;ll find the Northeast that fits.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
          {MOODS.map((mood, i) => {
            const Icon = mood.icon;
            return (
              <Reveal key={mood.label} delay={(i % 6) * 0.04} amount={0.3}>
                <Link
                  href={"/explore" as Route}
                  className="group flex min-h-[7.5rem] flex-col justify-between rounded-2xl border border-border bg-card p-4 transition-colors duration-200 outline-none hover:border-secondary/40 hover:bg-secondary/[0.04] focus-visible:ring-2 focus-visible:ring-ring sm:p-5"
                >
                  <div className="flex items-start justify-between">
                    <span className="inline-flex size-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary ring-1 ring-secondary/15 [&_svg]:size-4.5">
                      <Icon />
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground/40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary" />
                  </div>
                  <span className="mt-4 font-display text-lg font-medium">{mood.label}</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
