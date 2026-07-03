import { Photo } from "@/components/ui/photo";
import Link from "next/link";
import type { Route } from "next";
import {
  Home,
  Bike,
  Compass,
  Route as RouteIcon,
  Map,
  ShieldCheck,
  Umbrella,
  Download,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow, StampBadge } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";
import { cn } from "@/lib/cn";

type PhotoCard = {
  kind: "photo";
  icon: LucideIcon;
  label: string;
  note: string;
  span: string;
  feature?: boolean;
  src: string;
  alt: string;
};
type UtilityCard = {
  kind: "utility";
  icon: LucideIcon;
  label: string;
  note: string;
  span: string;
};

// Experiences up top (photographic), the logistics handled below (crafted
// utility cards) — the whole trip, one ecosystem (new.md §13).
const CARDS: (PhotoCard | UtilityCard)[] = [
  {
    kind: "photo",
    icon: Home,
    label: "Stays",
    note: "Homestays, camps & boutique lodges.",
    span: "col-span-2 row-span-2",
    feature: true,
    src: "/images/places/tawang/Tawang_4.PNG",
    alt: "Wooden homestay cottages on a green hillside near Tawang, Arunachal Pradesh",
  },
  {
    kind: "photo",
    icon: Bike,
    label: "Rides",
    note: "Bikes, cars & drivers you can trust.",
    span: "col-span-2",
    src: "/images/places/dambuk/Dambuk_2.jpg",
    alt: "A motorcycle traveller at a riverside adventure camp in Dambuk, Arunachal Pradesh",
  },
  {
    kind: "photo",
    icon: Compass,
    label: "Experiences",
    note: "Curated, run by locals.",
    span: "col-span-1",
    src: "/images/places/mechuka-new/mechuka-new-portrait-4.jpg",
    alt: "Travellers crossing a prayer-flag-draped suspension bridge near Mechuka, Arunachal Pradesh",
  },
  {
    kind: "photo",
    icon: RouteIcon,
    label: "Tours",
    note: "Ready-made, or build your own.",
    span: "col-span-1",
    src: "/images/places/ziro-new/ziro-new-landscape-2.JPG",
    alt: "A road winding through the terraced paddy fields of Ziro Valley, Arunachal Pradesh",
  },
  { kind: "utility", icon: Map, label: "Guides", note: "Vetted local guides & scouts.", span: "col-span-1" },
  { kind: "utility", icon: ShieldCheck, label: "Permits", note: "ILP / PAP handled before you go.", span: "col-span-1" },
  { kind: "utility", icon: Umbrella, label: "Insurance", note: "Cover for the mountains & the road.", span: "col-span-1" },
  { kind: "utility", icon: Download, label: "Offline", note: "Maps & guides that work off-grid.", span: "col-span-1" },
];

function PhotoTile({ card, index }: { card: PhotoCard; index: number }) {
  const Icon = card.icon;
  return (
    <Link
      href={"/explore" as Route}
      aria-label={card.label}
      className={cn(
        "group relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 outline-none focus-visible:ring-2 focus-visible:ring-ring",
        card.span,
      )}
    >
      <Photo
        src={card.src}
        alt={card.alt}
        fill
        sizes={card.feature ? "(min-width: 1024px) 44vw, 100vw" : "(min-width: 1024px) 22vw, 50vw"}
        loading={index < 2 ? undefined : "lazy"}
        className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-charcoal-950/88 via-charcoal-950/25 to-charcoal-950/5"
      />
      <span
        aria-hidden
        className="absolute top-3.5 left-3.5 inline-flex size-8 items-center justify-center rounded-full bg-charcoal-950/45 text-mist-50 ring-1 ring-white/15 backdrop-blur-sm [&_svg]:size-4"
      >
        <Icon />
      </span>
      <div className="absolute right-4 bottom-4 left-4">
        <h3
          className={cn(
            "font-display font-medium text-mist-50",
            card.feature ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          {card.label}
        </h3>
        <p className="mt-1 text-sm text-mist-200/80">{card.note}</p>
      </div>
    </Link>
  );
}

function UtilityTile({ card }: { card: UtilityCard }) {
  const Icon = card.icon;
  return (
    <Link
      href={"/explore" as Route}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 outline-none hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring",
        card.span,
      )}
    >
      <div className="flex items-start justify-between">
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary ring-1 ring-secondary/15 [&_svg]:size-5">
          <Icon />
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-wider text-secondary/70 uppercase">
          <Check className="size-3" />
          Included
        </span>
      </div>
      <div className="mt-4">
        <h3 className="font-display text-lg font-medium">{card.label}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{card.note}</p>
      </div>
    </Link>
  );
}

/**
 * Section 13 — Marketplace. Not "services" — one ecosystem (new.md §13). A
 * layered bento: the experiences up top as photographic cards, the logistics
 * (guides, permits, insurance, offline) handled in a crafted row below. The
 * whole trip, one place.
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
      <div className="relative mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <StampBadge
          topText="ONE ECOSYSTEM"
          bottomText="ONE PLACE"
          className="pointer-events-none absolute top-0 right-5 hidden size-16 text-secondary/20 sm:right-8 sm:block lg:right-12 lg:size-20"
        />
        <div className="max-w-2xl">
          <Eyebrow tone="muted" ornament>
            Marketplace
          </Eyebrow>
          <h2
            id="marketplace-heading"
            className="mt-4 font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl"
          >
            Everything you need.{" "}
            <span className="italic text-secondary">One ecosystem.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            Stays, rides, guides, permits, insurance, offline maps — the whole trip, sorted in one
            place. No fifteen tabs, no dead ends.
          </p>
        </div>

        <Reveal amount={0.1} className="mt-12">
          <div className="grid auto-rows-[12rem] grid-cols-2 gap-3 sm:auto-rows-[13.5rem] sm:gap-4 lg:grid-cols-4">
            {CARDS.map((card, i) =>
              card.kind === "photo" ? (
                <PhotoTile key={card.label} card={card} index={i} />
              ) : (
                <UtilityTile key={card.label} card={card} />
              ),
            )}
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-8 flex items-center justify-center">
          <Link
            href={"/explore" as Route}
            className="group inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.18em] text-foreground uppercase underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
          >
            Explore the marketplace
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
