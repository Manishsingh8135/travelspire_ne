import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { Button, Eyebrow, StampBadge } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";
import { RidgeMotif } from "@/components/marketing/decor/ridge-motif";
import { StoryFeed } from "./story-feed";
import type { Story } from "./story-card";

// Real Northeast photography, correctly labelled. Each line is an honest hook,
// not a claim. (Swap href → real story/place routes as they land.)
const STORIES: Story[] = [
  {
    region: "Nagaland",
    headline: "Celebrations that echo generations.",
    location: "Hornbill Festival, Kohima",
    src: "/images/places/hornbill/Hornbill_1.PNG",
    alt: "Naga women in traditional attire and beaded jewellery at the Hornbill Festival, Kohima, Nagaland",
    href: "/explore",
  },
  {
    region: "Nagaland",
    headline: "Where the hills bloom in silence.",
    location: "Dzükou Valley",
    src: "/images/places/hornbill/Dzoku_2.jpg",
    alt: "The emerald rolling hills and a winding stream of Dzükou Valley, Nagaland",
    href: "/explore",
  },
  {
    region: "Arunachal Pradesh",
    headline: "Where the road becomes the reward.",
    location: "Mechuka",
    src: "/images/places/mechuka-new/mechuka-new-portrait-2.jpg",
    alt: "A tall waterfall tumbling beside a mountain road near Mechuka, Arunachal Pradesh",
    href: "/explore",
  },
  {
    region: "Arunachal Pradesh",
    headline: "Rice, mist, and the Apatani way.",
    location: "Ziro Valley",
    src: "/images/places/ziro-new/ziro-new-landscape-1.jpeg",
    alt: "Golden Apatani rice fields and fish ponds ringed by forested hills, Ziro Valley, Arunachal Pradesh",
    href: "/explore",
  },
  {
    region: "Arunachal Pradesh",
    headline: "When the road turns to snow.",
    location: "Tawang",
    src: "/images/places/tawang/Tawang_9.JPG",
    alt: "Snow falling over prayer flags and a mountain road at Tawang, Arunachal Pradesh",
    href: "/explore",
  },
  {
    region: "Arunachal Pradesh",
    headline: "Ride to where the map ends.",
    location: "Dambuk",
    src: "/images/places/dambuk/Dambuk_2.jpg",
    alt: "A motorcycle traveller at a riverside adventure camp in Dambuk, Arunachal Pradesh",
    href: "/explore",
  },
];

/** Small twin-chevron "ridge" ornament under the header (field-journal mark). */
function ChevronOrnament() {
  return (
    <svg width="36" height="12" viewBox="0 0 36 12" fill="none" aria-hidden className="text-secondary">
      <path d="M2 9 L9 3 L16 9 M20 9 L27 3 L34 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    </svg>
  );
}

/**
 * Section 3 — The Dream Feed. Stories, not destinations: an addictive,
 * National-Geographic-grade horizontal scroll where every card is a dream
 * (new.md §3). Stays in the dark "chapter"; the feed is the centrepiece.
 */
export function Dream() {
  return (
    <Section
      tone="forest"
      id="stories"
      aria-labelledby="dream-heading"
    >
      {/* decorative seal — sits in the top-left margin like a journal stamp */}
      <StampBadge
        topText="REAL STORIES"
        bottomText="REAL NORTHEAST"
        className="absolute top-24 left-6 hidden size-28 text-pine-300/55 lg:block xl:left-12"
      />
      {/* dotted "journey path" in the top-right margin */}
      <svg
        aria-hidden
        viewBox="0 0 220 120"
        className="pointer-events-none absolute top-16 right-0 hidden w-64 text-pine-300/35 lg:block"
        fill="none"
      >
        <path d="M4 96 C 60 88, 92 40, 150 36 S 206 20, 216 8" stroke="currentColor" strokeWidth="1.25" strokeDasharray="2 7" strokeLinecap="round" />
        <circle cx="216" cy="8" r="2.5" fill="currentColor" />
      </svg>

      <div className="mx-auto mb-12 max-w-3xl px-5 text-center md:px-10">
        <Eyebrow tone="onDark" ornament className="justify-center text-pine-300">
          Dream
        </Eyebrow>
        <h2
          id="dream-heading"
          className="mt-5 font-display text-4xl leading-[1.04] font-medium text-balance text-mist-50 sm:text-5xl lg:text-6xl"
        >
          Stories that stay with you.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-pretty text-mist-200/75 sm:text-lg">
          Real places. Real people. Real stories from the Northeast. Let your next journey
          begin here.
        </p>
        <div className="mt-5 flex justify-center">
          <ChevronOrnament />
        </div>
      </div>

      <Reveal amount={0.15}>
        <StoryFeed stories={STORIES} />
      </Reveal>

      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="relative mt-16 overflow-hidden rounded-2xl border border-white/8 bg-charcoal-900/70 px-6 py-8 sm:px-10">
          <RidgeMotif className="pointer-events-none absolute -top-2 right-4 w-40 text-pine-300/10" />
          <div className="relative z-10 flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:gap-10 md:text-left">
            <div>
              <p className="font-display text-2xl leading-tight font-medium text-mist-50 sm:text-[1.75rem]">
                Every story is a doorway.
              </p>
              <p className="mt-1.5 text-mist-200/75">You dream it. We&apos;ll help you live it.</p>
            </div>
            <Button asChild variant="secondary" size="lg" className="shrink-0 rounded-full">
              <Link href={"/explore" as Route}>
                Explore All Stories
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
