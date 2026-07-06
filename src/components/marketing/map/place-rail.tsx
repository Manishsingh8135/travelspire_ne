"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Home, Compass, Bike, PartyPopper, Mountain, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Category = "Stays" | "Experiences" | "Rides" | "Festivals" | "Trails";

const CATEGORY_ICON: Record<Category, LucideIcon> = {
  Stays: Home,
  Experiences: Compass,
  Rides: Bike,
  Festivals: PartyPopper,
  Trails: Mountain,
};

const CHIPS: ("All" | Category)[] = ["All", "Stays", "Experiences", "Rides", "Festivals", "Trails"];

type Place = {
  name: string;
  region: string;
  category: Category;
  src: string;
  alt: string;
};

// Real, correctly-labelled places, each tagged with the category the chips filter.
const PLACES: Place[] = [
  {
    name: "Hillside Homestay",
    region: "Tawang, Arunachal",
    category: "Stays",
    src: "/images/places/tawang/Tawang_4.PNG",
    alt: "Wooden homestay cottages on a green hillside near Tawang, Arunachal Pradesh",
  },
  {
    name: "Tawang Monastery",
    region: "Arunachal Pradesh",
    category: "Experiences",
    src: "/images/places/tawang/Tawang_1.PNG",
    alt: "Tawang Monastery on a ridge below a bank of cloud, Arunachal Pradesh",
  },
  {
    name: "Sela Pass",
    region: "Arunachal Pradesh",
    category: "Rides",
    src: "/images/places/tawang/Tawang_2.JPG",
    alt: "Snow and prayer flags at Sela Pass near Tawang, Arunachal Pradesh",
  },
  {
    name: "Hornbill Festival",
    region: "Kohima, Nagaland",
    category: "Festivals",
    src: "/images/places/hornbill/Hornbill_2.WEBP",
    alt: "Naga warriors in traditional dress leaping mid-dance at the Hornbill Festival, Nagaland",
  },
  {
    name: "Dzükou Valley",
    region: "Nagaland",
    category: "Trails",
    src: "/images/places/hornbill/Dzoku_2.jpg",
    alt: "The emerald rolling hills and winding stream of Dzükou Valley, Nagaland",
  },
  {
    name: "Mechuka Bridge",
    region: "Arunachal Pradesh",
    category: "Trails",
    src: "/images/places/mechuka-new/mechuka-new-portrait-4.jpg",
    alt: "Travellers crossing a prayer-flag-draped suspension bridge near Mechuka, Arunachal Pradesh",
  },
  {
    name: "Dambuk Trail",
    region: "Arunachal Pradesh",
    category: "Rides",
    src: "/images/places/dambuk/Dambuk_2.jpg",
    alt: "A motorcycle traveller at a riverside adventure camp in Dambuk, Arunachal Pradesh",
  },
  {
    name: "Ziro Valley",
    region: "Arunachal Pradesh",
    category: "Experiences",
    src: "/images/places/ziro-new/ziro-new-portrait-5.JPG",
    alt: "Pink cosmos flowers over golden paddy fields and bamboo huts in Ziro Valley, Arunachal Pradesh",
  },
];

/**
 * "Explore what's around you" — a filterable rail of real places. The category
 * chips genuinely filter the rail (honest interactivity), previewing how the
 * full map at /explore lets you slice the region by what you're after.
 */
export function PlaceRail() {
  const [active, setActive] = useState<"All" | Category>("All");
  const shown = active === "All" ? PLACES : PLACES.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-xl font-medium text-mist-50 sm:text-2xl">
            Explore what&apos;s around you
          </p>
          <p className="mt-1 text-muted-foreground">Pick a category — the region rearranges itself.</p>
        </div>
        {/* filter chips */}
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
          {CHIPS.map((chip) => {
            const on = active === chip;
            return (
              <button
                key={chip}
                type="button"
                onClick={() => setActive(chip)}
                aria-pressed={on}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  on
                    ? "border-transparent bg-secondary text-secondary-foreground"
                    : "border-border-default text-muted-foreground hover:bg-muted/60",
                )}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="-mx-5 mt-6 flex gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {shown.map((place) => {
          const Icon = CATEGORY_ICON[place.category];
          return (
            <li key={place.name} className="shrink-0 snap-start">
              <Link
                href={"/explore" as Route}
                aria-label={`${place.name} — ${place.region}`}
                className="group relative block aspect-[5/4] w-[15rem] overflow-hidden rounded-2xl ring-1 ring-white/10 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-[16rem]"
              >
                <Image
                  src={place.src}
                  alt={place.alt}
                  fill
                  sizes="(min-width: 640px) 16rem, 15rem"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-charcoal-950/55 px-2.5 py-1 font-mono text-[10px] tracking-wider text-mist-100 uppercase ring-1 ring-white/15 backdrop-blur-sm [&_svg]:size-3">
                  <Icon />
                  {place.category}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-lg leading-tight font-medium text-mist-50">
                    {place.name}
                  </p>
                  <p className="mt-0.5 text-xs text-mist-200/80">{place.region}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
