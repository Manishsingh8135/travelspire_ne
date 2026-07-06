import Link from "next/link";
import type { Route } from "next";
import {
  Bike,
  Home,
  UtensilsCrossed,
  PartyPopper,
  Mountain,
  Waves,
  PawPrint,
  Landmark,
  Camera,
  Tent,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Sprout,
} from "lucide-react";
import { Button, Eyebrow, StampBadge } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";
import { LeafSprig } from "@/components/marketing/decor/leaf-sprig";
import { CompassRose } from "@/components/marketing/decor/compass-rose";
import { ExperienceCard, type Experience } from "./experience-card";

// Ten "ways to experience" the Northeast — the product's experience taxonomy
// (new.md §4). Real, correctly-labelled photography; the icon states the
// category, the photo sets the mood. `href` → /explore for now (swap to real
// category routes as they land).
const EXPERIENCES: Experience[] = [
  {
    title: "Rides & Road Trips",
    blurb: "Iconic routes and the freedom of the road.",
    src: "/images/places/dambuk/Dambuk_2.jpg",
    alt: "A motorcycle traveller at a riverside adventure camp in Dambuk, Arunachal Pradesh",
    href: "/explore",
    icon: <Bike />,
  },
  {
    title: "Stays with Soul",
    blurb: "Handpicked homestays that feel like home.",
    src: "/images/places/tawang/Tawang_4.PNG",
    alt: "Wooden homestay cottages on a green hillside near Tawang, Arunachal Pradesh",
    href: "/explore",
    icon: <Home />,
  },
  {
    title: "Taste the Real",
    blurb: "Traditional meals and bold local flavours.",
    src: "/images/places/ziro-new/ziro-new-landscape-2.JPG",
    alt: "Terraced rice paddies at harvest time in Ziro Valley, Arunachal Pradesh",
    href: "/explore",
    icon: <UtensilsCrossed />,
  },
  {
    title: "Festivals & Culture",
    blurb: "Living traditions you can be part of.",
    src: "/images/places/hornbill/Hornbill_2.WEBP",
    alt: "Naga warriors in traditional dress leaping mid-dance at the Hornbill Festival, Nagaland",
    href: "/explore",
    icon: <PartyPopper />,
  },
  {
    title: "Treks & Trails",
    blurb: "Backcountry trails and high ridge views.",
    src: "/images/places/mechuka-new/mechuka-new-portrait-4.jpg",
    alt: "Travellers crossing a prayer-flag-draped suspension bridge below snow peaks near Mechuka, Arunachal Pradesh",
    href: "/explore",
    icon: <Mountain />,
  },
  {
    title: "Lakes & Rivers",
    blurb: "Serene waters and timeless valleys.",
    src: "/images/places/anini-new/anini-new-landscape-11.jpeg",
    alt: "A river winding past a forested valley and riverside camp near Anini, Arunachal Pradesh",
    href: "/explore",
    icon: <Waves />,
  },
  {
    title: "Wildlife & Wild Blooms",
    blurb: "Rare species and moments in the wild.",
    src: "/images/places/hornbill/Dzoku_1.webp",
    alt: "Rare pink Dzükou lilies blooming across the emerald hills of Dzükou Valley, Nagaland",
    href: "/explore",
    icon: <PawPrint />,
  },
  {
    title: "Spiritual Journeys",
    blurb: "Ancient monasteries and sacred paths.",
    src: "/images/places/tawang/Tawang_6.PNG",
    alt: "A gilded Buddha statue inside a richly painted monastery shrine at Tawang, Arunachal Pradesh",
    href: "/explore",
    icon: <Landmark />,
  },
  {
    title: "Photography Spots",
    blurb: "Picture-perfect light and scenes.",
    src: "/images/places/ziro-new/ziro-new-portrait-5.JPG",
    alt: "Pink cosmos flowers over golden paddy fields and bamboo huts in Ziro Valley, Arunachal Pradesh",
    href: "/explore",
    icon: <Camera />,
  },
  {
    title: "Camp & Unwind",
    blurb: "Sleep under the stars, wake to the view.",
    src: "/images/places/dambuk/Dambuk_1.jpg",
    alt: "Tents beneath a star-filled night sky at a valley campsite in Dambuk, Arunachal Pradesh",
    href: "/explore",
    icon: <Tent />,
  },
];

// Honest trust signals — values, not fabricated counts (we don't invent a host
// number the platform doesn't have yet; swap in real figures when they're real).
const TRUST = [
  { icon: <HeartHandshake />, label: "Curated with locals" },
  { icon: <ShieldCheck />, label: "Vetted for quality & safety" },
  { icon: <Sprout />, label: "Supporting local communities" },
];

/**
 * Section 4 — Experience Northeast. Reframes "destinations" as "ways to feel
 * alive" (new.md §4): a paper "chapter" with a 5×2 grid of experience tiles and
 * a forest-green "curated by locals" trust band. Built entirely on the reusable
 * Section / Eyebrow / StampBadge / GlassPanel primitives.
 */
export function Experience() {
  return (
    <Section
      id="experiences"
      aria-labelledby="experience-heading"
      tone="paper"
    >
      {/* marginalia */}
      <StampBadge
        topText="AUTHENTIC · LOCAL"
        bottomText="MEANINGFUL"
        className="absolute top-20 left-6 hidden size-24 text-pine-700/35 lg:block xl:left-12"
      />
      <LeafSprig className="pointer-events-none absolute -top-2 right-0 hidden w-52 text-pine-700/25 lg:block xl:w-64" />

      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="muted" ornament className="justify-center">
            Experience Northeast
          </Eyebrow>
          <h2
            id="experience-heading"
            className="mt-4 font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl"
          >
            <span className="block">More than places.</span>
            <span className="italic text-secondary">A thousand ways to feel alive.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            From misty mountains to living traditions, from thrilling rides to quiet mornings —
            discover experiences that connect you to the soul of Northeast India.
          </p>
          <Link
            href={"/explore" as Route}
            className="group mt-5 inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.18em] text-foreground uppercase underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
          >
            Explore All Experiences
            <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </Link>
        </div>

        {/* grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {EXPERIENCES.map((exp, i) => (
            <Reveal key={exp.title} delay={(i % 5) * 0.05} amount={0.15}>
              <ExperienceCard exp={exp} index={i} />
            </Reveal>
          ))}
        </div>

        {/* curated-by-locals trust band */}
        <Reveal className="mt-12 sm:mt-14" amount={0.2}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pine-900 to-pine-950 px-6 py-8 text-mist-50 sm:px-10">
            <CompassRose className="pointer-events-none absolute -bottom-6 -left-6 hidden w-40 text-pine-300/15 sm:block" />
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <p className="max-w-md font-display text-xl leading-snug font-medium text-balance sm:text-2xl sm:leading-snug">
                Every experience is thoughtfully curated with{" "}
                <span className="italic text-pine-200">locals who call it home.</span>
              </p>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
                <ul className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                  {TRUST.map((t) => (
                    <li key={t.label} className="flex items-center gap-2.5 text-sm text-mist-100">
                      <span
                        aria-hidden
                        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-mist-50/10 text-pine-200 ring-1 ring-white/10 [&_svg]:size-4"
                      >
                        {t.icon}
                      </span>
                      {t.label}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="lg"
                  className="shrink-0 rounded-full bg-mist-50 text-charcoal-950 hover:bg-mist-100"
                >
                  <Link href={"/explore" as Route}>
                    Discover More
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
