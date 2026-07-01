import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";

type Feature = {
  kicker: string;
  title: string;
  story: string;
  src: string;
  alt: string;
};

// Magazine cards, not product cards (new.md §10) — real, honestly-labelled NE
// experiences we have photography for.
const FEATURES: Feature[] = [
  {
    kicker: "Arunachal · Ride",
    title: "Ride the Sela Pass",
    story: "Snow, prayer flags and one of the highest motorable roads on earth.",
    src: "/images/places/tawang/Tawang_2.JPG",
    alt: "Snow and prayer flags at Sela Pass near Tawang, Arunachal Pradesh",
  },
  {
    kicker: "Nagaland · Festival",
    title: "Live the Hornbill Festival",
    story: "A thousand years of tribes, songs and colour gathered into one field.",
    src: "/images/places/hornbill/Hornbill_2.WEBP",
    alt: "Naga warriors in traditional dress leaping mid-dance at the Hornbill Festival, Nagaland",
  },
  {
    kicker: "Arunachal · Valley",
    title: "Chase the Mechuka Sunrise",
    story: "A hidden Himalayan valley where the road runs out and the view begins.",
    src: "/images/places/mechuka-new/mechuka-new-portrait-2.jpg",
    alt: "A tall waterfall beside a mountain road near Mechuka, Arunachal Pradesh",
  },
  {
    kicker: "Nagaland · Trek",
    title: "Trek into Dzükou Valley",
    story: "Rolling emerald hills and rare lilies that only a few ever witness.",
    src: "/images/places/hornbill/Dzoku_2.jpg",
    alt: "The emerald rolling hills and winding stream of Dzükou Valley, Nagaland",
  },
  {
    kicker: "Arunachal · Culture",
    title: "Ziro & the Apatani Way",
    story: "Golden rice fields, bamboo homes and a culture like nowhere else.",
    src: "/images/places/ziro-new/ziro-new-portrait-5.JPG",
    alt: "Pink cosmos flowers over golden paddy fields and bamboo huts in Ziro Valley, Arunachal Pradesh",
  },
  {
    kicker: "Arunachal · Camp",
    title: "Nights Under Dambuk Skies",
    story: "Orange groves, river camps and a sky thick with stars at the frontier.",
    src: "/images/places/dambuk/Dambuk_1.jpg",
    alt: "Tents beneath a star-filled night sky at a valley campsite in Dambuk, Arunachal Pradesh",
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <Link
      href={"/explore" as Route}
      aria-label={feature.title}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl ring-1 ring-white/10 outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Image
        src={feature.src}
        alt={feature.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        loading={index < 3 ? undefined : "lazy"}
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-charcoal-950/92 via-charcoal-950/25 to-charcoal-950/5"
      />
      <div className="relative p-6 sm:p-7">
        <p className="font-mono text-[11px] tracking-[0.18em] text-pine-300 uppercase">
          {feature.kicker}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight font-medium text-balance text-mist-50 sm:text-[1.75rem]">
          {feature.title}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-pretty text-mist-200/80">{feature.story}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-mist-100 uppercase">
          Explore
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/**
 * Section 10 — Featured Experiences. Magazine cards, not product cards (new.md
 * §10): huge imagery, editorial type, a one-line story, a quiet CTA. The
 * handful of moments worth crossing the country for.
 */
export function Featured() {
  return (
    <Section
      tone="forest"
      padded={false}
      id="featured"
      aria-labelledby="featured-heading"
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <Eyebrow tone="onDark" ornament className="text-pine-300">
            Featured Experiences
          </Eyebrow>
          <h2
            id="featured-heading"
            className="mt-4 font-display text-4xl leading-[1.04] font-medium text-balance text-mist-50 sm:text-5xl"
          >
            Moments you&apos;ll talk about <span className="italic text-pine-300">for years.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-pretty text-mist-200/75">
            Not a checklist of sights — a handful of experiences worth crossing the country for.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 0.07} amount={0.15}>
              <FeatureCard feature={feature} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
