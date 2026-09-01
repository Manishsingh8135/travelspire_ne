import { anini2026Src } from "@/data/seo/image-seo-data";

// Seasonal system for the homepage.
//
// Two exports:
//  1. `getSeasonalFeature` — one large editorial feature, chosen by date
//     window. Festivals win their windows; trekking season fills the gap.
//     The homepage feature is only the invitation — the festival page
//     remains the detailed destination.
//  2. `getActiveDepartures` — the compact departures rail. Items carry an
//     `expiresOn` date and automatically disappear once past it.
//
// Same operational pattern as `awfEdition`: windows are evaluated at render
// time, so a redeploy refreshes what is in season.

export interface SeasonalFeature {
  id: string;
  label: string;
  headline: string;
  highlightedHeadline?: string;
  body: string;
  ctaLabel: string;
  href: string;
  image: string;
  imageAlt: string;
  featureFrom: string;
  featureUntil: string;
}

export const seasonalFeatures: SeasonalFeature[] = [
  // Anini Winter Fest is deliberately absent here: it has its own dedicated
  // homepage section, and running it in both places was the same offer twice.
  {
    id: "ziro-festival-2026",
    label: "This season · 25–28 September 2026",
    headline: "Four days in the",
    highlightedHeadline: "rice fields.",
    body: "The Ziro Festival of Music in Apatani country — camping, all-inclusive packages and transfers into the valley.",
    ctaLabel: "See Ziro packages",
    href: "/ziro-music-festival-2026",
    image: "/images/places/ziro-new/ziro-new-landscape-1.jpeg",
    imageAlt: "Rice fields and pine ridges of Ziro Valley during festival season",
    featureFrom: "2026-01-01",
    featureUntil: "2026-09-29",
  },
  {
    id: "hornbill-festival-2026",
    label: "This season · 1–10 December 2026",
    headline: "Ten days of",
    highlightedHeadline: "Naga heritage.",
    body: "The Hornbill Festival at Kisama, with the Dzukou Valley trek on the side. Camping, transport and permits arranged.",
    ctaLabel: "See Hornbill packages",
    href: "/tours/hornbill-festival-2026",
    image: "/images/places/hornbill/Hornbill_3.PNG",
    imageAlt: "Traditional Naga performers at the Hornbill Festival, Kisama",
    featureFrom: "2026-09-30",
    featureUntil: "2026-12-11",
  },
  {
    id: "orange-festival-2026",
    label: "This season · 13–15 December 2026",
    headline: "Music in the",
    highlightedHeadline: "orange country.",
    body: "The Orange Festival in Dambuk — pair it with Anini, the Golden Pagoda or Dong Valley on our OFAM circuits.",
    ctaLabel: "See OFAM packages",
    href: "/tours/orange-festival-2026",
    image: "/images/places/dambuk/Dambuk_4.JPG",
    imageAlt: "Orange orchards along the riverine plains of Dambuk",
    featureFrom: "2026-12-12",
    featureUntil: "2026-12-16",
  },
  {
    id: "dibang-trekking-season",
    label: "This season · October to April",
    headline: "The high valleys",
    highlightedHeadline: "are open.",
    body: "Clear skies over Dibang — the season for the Pomo Grassland trek, Dong sunrises and the long Mechuka road.",
    ctaLabel: "Explore expeditions",
    href: "/all-tours",
    image: anini2026Src.rainbowGlamping,
    imageAlt: "Double rainbow over forested mountains and glamping tents at Anini, Dibang Valley",
    featureFrom: "2026-12-17",
    featureUntil: "2026-12-31",
  },
];

export function getSeasonalFeature(now: Date = new Date()): SeasonalFeature {
  const today = now.toISOString().slice(0, 10);
  return (
    seasonalFeatures.find(
      (feature) =>
        today >= feature.featureFrom && today <= feature.featureUntil,
    ) ?? seasonalFeatures[seasonalFeatures.length - 1]
  );
}

// ─── Seasonal departures rail ───────────────────────────────────────────────

export interface HomeDeparture {
  id: string;
  title: string;
  windowLabel: string;
  location: string;
  duration: string;
  priceHook: string;
  href: string;
  image: string;
  imageAlt: string;
  /** "booking" = bookable online · "enquiry" = WhatsApp-first */
  state: "booking" | "enquiry";
  /** ISO date after which the item leaves the rail. Null = evergreen. */
  expiresOn: string | null;
}

export const homeDepartures: HomeDeparture[] = [
  {
    id: "awf-shared-convoy",
    title: "Anini Winter Fest — shared convoy",
    windowLabel: "18–21 Sep 2026",
    location: "Dibrugarh → Anini",
    duration: "Return transfer",
    priceHook: "₹5,499 / person",
    href: "/anini-winter-fest-2026",
    image: "/images/festivals/anini-winter-fest-2026/experiences/dri-valley.webp",
    imageAlt: "The Dri valley outside Anini, venue region of Anini Winter Fest",
    state: "booking",
    expiresOn: "2026-09-18",
  },
  {
    id: "ziro-2026",
    title: "Ziro Festival of Music",
    windowLabel: "25–28 Sep 2026",
    location: "Ziro Valley",
    duration: "4 days",
    priceHook: "from ₹1,999",
    href: "/ziro-music-festival-2026",
    image: "/images/places/ziro-new/ziro-new-landscape-1.jpeg",
    imageAlt: "Rice fields and pine ridges of Ziro Valley during festival season",
    state: "booking",
    expiresOn: "2026-09-25",
  },
  {
    id: "hornbill-2026",
    title: "Hornbill Festival",
    windowLabel: "1–10 Dec 2026",
    location: "Kisama, Nagaland",
    duration: "2–4 days",
    priceHook: "from ₹1,799",
    href: "/tours/hornbill-festival-2026",
    image: "/images/places/hornbill/Hornbill_3.PNG",
    imageAlt: "Traditional Naga performers at the Hornbill Festival, Kisama",
    state: "booking",
    expiresOn: "2026-12-01",
  },
  {
    id: "ofam-2026",
    title: "Orange Festival, Dambuk",
    windowLabel: "13–15 Dec 2026",
    location: "Dambuk",
    duration: "3 days",
    priceHook: "from ₹1,899",
    href: "/tours/orange-festival-2026",
    image: "/images/places/dambuk/Dambuk_4.JPG",
    imageAlt: "Orange orchards along the riverine plains of Dambuk",
    state: "booking",
    expiresOn: "2026-12-13",
  },
  {
    id: "six-days-dibang",
    title: "Six Days in the Dibang",
    windowLabel: "Oct – Apr",
    location: "Dibang Valley",
    duration: "5N / 6D",
    priceHook: "from ₹18,999",
    href: "/tours/anini-pomo-grassland-expedition",
    image: anini2026Src.pomoRidgeTrail,
    imageAlt: "Trekkers on a grassy ridge trail on the Pomo route near Anini, Dibang Valley",
    state: "enquiry",
    expiresOn: null,
  },
  {
    id: "grand-circuit",
    title: "Mechuka · Dong · Anini",
    windowLabel: "Oct – Apr",
    location: "Across Arunachal",
    duration: "12N / 13D",
    priceHook: "from ₹37,499",
    href: "/tours/mechuka-dong-anini-tour-package",
    image: "/images/places/mechuka-new/Mechuka2026/mechuka-valley-winter-snow-pine-forest.jpg",
    imageAlt: "Snow-covered pine forest and misty mountain slopes in Mechuka Valley during winter, Arunachal Pradesh",
    state: "enquiry",
    expiresOn: null,
  },
];

export function getActiveDepartures(now: Date = new Date()): HomeDeparture[] {
  const today = now.toISOString().slice(0, 10);
  return homeDepartures.filter(
    (departure) => departure.expiresOn === null || today <= departure.expiresOn,
  );
}
