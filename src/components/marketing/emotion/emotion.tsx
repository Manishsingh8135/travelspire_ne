import { Photo } from "@/components/ui/photo";
import Link from "next/link";
import type { Route } from "next";
import {
  Moon,
  Mountain,
  Bike,
  Snowflake,
  Drama,
  PartyPopper,
  Sparkles,
  Droplets,
  Bird,
  Camera,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";
import { cn } from "@/lib/cn";

type Mood = {
  label: string;
  icon: LucideIcon;
  span: string;
  feature?: boolean;
  src: string;
  alt: string;
};

// A photographic mood board — each feeling backed by a real NE photograph that
// evokes it. Bento spans give the editorial rhythm (distinct from the §4 grid).
const MOODS: Mood[] = [
  {
    label: "Stillness",
    icon: Moon,
    span: "col-span-2 row-span-2",
    feature: true,
    src: "/images/places/dong-new/dong-new-portrait-2.jpg",
    alt: "A traveller sitting quietly, looking out over green mountains from a tent at Dong, Arunachal Pradesh",
  },
  {
    label: "Culture",
    icon: Drama,
    span: "col-span-2",
    src: "/images/places/hornbill/Hornbill_women.PNG",
    alt: "Naga women in traditional attire at the Hornbill Festival, Kohima, Nagaland",
  },
  {
    label: "Motorcycle",
    icon: Bike,
    span: "col-span-1",
    src: "/images/places/dambuk/Dambuk_2.jpg",
    alt: "A motorcycle traveller at a riverside adventure camp in Dambuk, Arunachal Pradesh",
  },
  {
    label: "Snow",
    icon: Snowflake,
    span: "col-span-1",
    src: "/images/places/tawang/Tawang_2.JPG",
    alt: "Snow and prayer flags at Sela Pass near Tawang, Arunachal Pradesh",
  },
  {
    label: "Adventure",
    icon: Mountain,
    span: "col-span-2",
    src: "/images/places/mechuka-new/mechuka-new-portrait-4.jpg",
    alt: "Travellers crossing a prayer-flag-draped suspension bridge near Mechuka, Arunachal Pradesh",
  },
  {
    label: "Festivals",
    icon: PartyPopper,
    span: "col-span-1",
    src: "/images/places/hornbill/Hornbill_2.WEBP",
    alt: "Naga warriors leaping mid-dance at the Hornbill Festival, Nagaland",
  },
  {
    label: "Spirituality",
    icon: Sparkles,
    span: "col-span-1",
    src: "/images/places/tawang/Tawang_1.PNG",
    alt: "Tawang Monastery on a ridge below a bank of cloud, Arunachal Pradesh",
  },
  {
    label: "Waterfalls",
    icon: Droplets,
    span: "col-span-1",
    src: "/images/places/mechuka-new/mechuka-new-portrait-2.jpg",
    alt: "A tall waterfall beside a mountain road near Mechuka, Arunachal Pradesh",
  },
  {
    label: "Wild blooms",
    icon: Bird,
    span: "col-span-1",
    src: "/images/places/hornbill/Dzoku_1.webp",
    alt: "Rare pink Dzükou lilies across the emerald hills of Dzükou Valley, Nagaland",
  },
  {
    label: "Photography",
    icon: Camera,
    span: "col-span-1",
    src: "/images/places/ziro-new/ziro-new-portrait-5.JPG",
    alt: "Pink cosmos over golden paddy fields in Ziro Valley, Arunachal Pradesh",
  },
  {
    label: "Romance",
    icon: Heart,
    span: "col-span-1",
    src: "/images/places/hornbill/Dzoku_3.jpg",
    alt: "Golden sunrise over the rolling hills of Dzükou Valley, Nagaland",
  },
];

function MoodTile({ mood, index }: { mood: Mood; index: number }) {
  const Icon = mood.icon;
  return (
    <Link
      href={"/explore" as Route}
      aria-label={mood.label}
      className={cn(
        "group relative overflow-hidden rounded-2xl ring-1 ring-black/5 outline-none focus-visible:ring-2 focus-visible:ring-ring",
        mood.span,
      )}
    >
      <Photo
        src={mood.src}
        alt={mood.alt}
        fill
        sizes={mood.feature ? "(min-width: 1024px) 44vw, 100vw" : "(min-width: 1024px) 22vw, 50vw"}
        loading={index < 4 ? undefined : "lazy"}
        className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/20 to-charcoal-950/5"
      />
      <span
        aria-hidden
        className="absolute top-3.5 left-3.5 inline-flex size-8 items-center justify-center rounded-full bg-charcoal-950/45 text-mist-50 ring-1 ring-white/15 backdrop-blur-sm [&_svg]:size-4"
      >
        <Icon />
      </span>
      <h3
        className={cn(
          "absolute right-4 bottom-4 left-4 font-display font-medium text-mist-50",
          mood.feature ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl",
        )}
      >
        {mood.label}
      </h3>
    </Link>
  );
}

/**
 * Section 9 — Explore by Emotion. People don't choose a place, they choose a
 * feeling (new.md §9). A photographic mood board — start from how you want to
 * feel, and the tile carries you into explore.
 */
export function Emotion() {
  return (
    <Section
      tone="paper"
      id="emotion"
      aria-labelledby="emotion-heading"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <Eyebrow tone="muted" ornament>
            Explore by Emotion
          </Eyebrow>
          <h2
            id="emotion-heading"
            className="mt-4 font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl"
          >
            What are you <span className="italic text-secondary">looking for?</span>
          </h2>
          <p className="mt-5 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            Most people don&apos;t choose a place — they choose a feeling. Start with yours, and
            we&apos;ll carry you into the Northeast that fits.
          </p>
        </div>

        <Reveal amount={0.1} className="mt-12">
          <div className="grid auto-rows-[10.5rem] grid-flow-row-dense grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 lg:grid-cols-4">
            {MOODS.map((mood, i) => (
              <MoodTile key={mood.label} mood={mood} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
