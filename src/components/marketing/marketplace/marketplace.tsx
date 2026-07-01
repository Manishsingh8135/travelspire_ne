import Link from "next/link";
import type { Route } from "next";
import {
  Home,
  Bike,
  Compass,
  Map,
  Route as RouteIcon,
  ShieldCheck,
  Umbrella,
  Download,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";

const OFFERINGS: { icon: LucideIcon; label: string; note: string }[] = [
  { icon: Home, label: "Stay", note: "Homestays, camps and boutique lodges." },
  { icon: Bike, label: "Ride", note: "Bikes, cars and drivers you can trust." },
  { icon: Compass, label: "Experience", note: "Curated things to do, run by locals." },
  { icon: Map, label: "Guide", note: "Vetted local guides and scouts." },
  { icon: RouteIcon, label: "Tour", note: "Ready-made journeys, or build your own." },
  { icon: ShieldCheck, label: "Permits", note: "ILP / PAP sorted before you go." },
  { icon: Umbrella, label: "Insurance", note: "Cover for the mountains and the road." },
  { icon: Download, label: "Offline", note: "Maps and guides that work off-grid." },
];

/**
 * Section 13 — Marketplace. Not "services" — one ecosystem (new.md §13). Stays,
 * rides, guides, permits, insurance, offline maps: the whole trip in one place.
 */
export function Marketplace() {
  return (
    <Section
      tone="paper"
      padded={false}
      id="marketplace"
      aria-labelledby="marketplace-heading"
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="muted" ornament className="justify-center">
            Marketplace
          </Eyebrow>
          <h2
            id="marketplace-heading"
            className="mt-4 font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl"
          >
            Everything you need.{" "}
            <span className="italic text-secondary">One ecosystem.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            Stays, rides, guides, permits, insurance, offline maps — the whole trip, sorted in one
            place. No fifteen tabs, no dead ends.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {OFFERINGS.map(({ icon: Icon, label, note }, i) => (
            <Reveal key={label} delay={(i % 4) * 0.05} amount={0.2}>
              <Link
                href={"/explore" as Route}
                className="group flex h-full min-h-[9.5rem] flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-colors duration-200 outline-none hover:border-secondary/40 hover:bg-secondary/[0.04] focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary ring-1 ring-secondary/15 [&_svg]:size-5">
                  <Icon />
                </span>
                <span className="mt-4">
                  <span className="block font-display text-lg font-medium">{label}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{note}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
