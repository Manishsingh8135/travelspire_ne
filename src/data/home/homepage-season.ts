import { anini2026Src, mechuka2026Src } from "@/data/seo/image-seo-data";
import { indiaToday } from "@/lib/dates";

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
// Windows are evaluated at render time in India time. The homepage
// revalidates every few hours, so nothing here needs a redeploy to rotate.

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
    label: "This season · 24–27 September 2026",
    headline: "Four days in the",
    highlightedHeadline: "rice fields.",
    body: "The Ziro Festival of Music in Apatani country — camping, all-inclusive packages and transfers into the valley.",
    ctaLabel: "See Ziro packages",
    href: "/ziro-music-festival-2026",
    image: "/images/places/ziro-new/ziro-new-landscape-1.jpeg",
    imageAlt: "Rice fields and pine ridges of Ziro Valley during festival season",
    featureFrom: "2026-01-01",
    featureUntil: "2026-09-27",
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
    featureFrom: "2026-09-28",
    featureUntil: "2026-12-11",
  },
  {
    id: "orange-festival-2026",
    label: "This season · mid-December 2026, dates TBA",
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
  {
    id: "winter-tawang-2027",
    label: "This season · January to February",
    headline: "Tawang under",
    highlightedHeadline: "snow.",
    body: "Since the Sela Tunnel opened in 2024, the Tawang road stays open all winter — the monastery in snow, frozen lakes when the passes allow, and a buffer day built in.",
    ctaLabel: "See the Tawang journey",
    href: "/tours/tawang-expedition",
    image: "/images/places/tawang/Tawang_2.JPG",
    imageAlt: "Tawang Valley panoramic view with snow-capped Himalayan mountains",
    featureFrom: "2027-01-01",
    featureUntil: "2027-02-28",
  },
  {
    id: "spring-mechuka-2027",
    label: "This season · March to mid-April",
    headline: "Spring in the",
    highlightedHeadline: "high valleys.",
    body: "The thaw, the rhododendrons and the clearest skies of the year — the season for Mechuka's meadows and the long road through Aalo.",
    ctaLabel: "See the Mechuka journey",
    href: "/tours/mechuka-expedition",
    image: mechuka2026Src.ridgeViewpoint,
    imageAlt: "Mechuka town and valley seen from a ridge viewpoint, Arunachal Pradesh",
    featureFrom: "2027-03-01",
    featureUntil: "2027-04-15",
  },
];

// Shown whenever no dated window is open — the brand, not a season.
export const evergreenSeasonalFeature: SeasonalFeature = {
  id: "arunachal-year-round",
  label: "Planned around the season",
  headline: "Arunachal, by the team",
  highlightedHeadline: "that drives it.",
  body: "Tawang, Mechuka, Anini, Dong and the valleys beyond — routes, permits, stays and the right month for each, from our base in Dibrugarh.",
  ctaLabel: "Explore all journeys",
  href: "/all-tours",
  image: mechuka2026Src.ridgeViewpoint,
  imageAlt: "Mechuka town and valley seen from a ridge viewpoint, Arunachal Pradesh",
  featureFrom: "2026-01-01",
  featureUntil: "9999-12-31",
};

export function getSeasonalFeature(today: string = indiaToday()): SeasonalFeature {
  return (
    seasonalFeatures.find(
      (feature) =>
        today >= feature.featureFrom && today <= feature.featureUntil,
    ) ?? evergreenSeasonalFeature
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
    windowLabel: "24–27 Sep 2026",
    location: "Ziro Valley",
    duration: "4 days",
    priceHook: "from ₹1,999",
    href: "/ziro-music-festival-2026",
    image: "/images/places/ziro-new/ziro-new-landscape-1.jpeg",
    imageAlt: "Rice fields and pine ridges of Ziro Valley during festival season",
    state: "booking",
    expiresOn: "2026-09-24",
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
    // Last sensible start for a 2–4 day package inside the 1–10 Dec window.
    expiresOn: "2026-12-08",
  },
  {
    id: "ofam-2026",
    title: "Orange Festival, Dambuk",
    windowLabel: "Mid-Dec 2026 · TBA",
    location: "Dambuk",
    duration: "3 days",
    priceHook: "from ₹1,899",
    href: "/tours/orange-festival-2026",
    image: "/images/places/dambuk/Dambuk_4.JPG",
    imageAlt: "Orange orchards along the riverine plains of Dambuk",
    state: "booking",
    expiresOn: "2026-12-14",
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
  {
    id: "tawang",
    title: "Tawang Expedition",
    windowLabel: "Year-round",
    location: "Tawang · via the Sela Tunnel",
    duration: "4N / 5D",
    priceHook: "from ₹16,499",
    href: "/tours/tawang-expedition",
    image: "/images/places/tawang/Tawang_1.PNG",
    imageAlt: "Tawang Monastery - Largest Buddhist monastery in India, Arunachal Pradesh",
    state: "booking",
    expiresOn: null,
  },
  {
    id: "mechuka",
    title: "Mechuka Expedition",
    windowLabel: "Oct – May",
    location: "Mechuka · from Dibrugarh",
    duration: "5N / 6D",
    priceHook: "from ₹19,999",
    href: "/tours/mechuka-expedition",
    image: mechuka2026Src.winterSnow,
    imageAlt: "Snow-covered pine forest and misty mountain slopes in Mechuka Valley during winter, Arunachal Pradesh",
    state: "booking",
    expiresOn: null,
  },
];

export function getActiveDepartures(today: string = indiaToday()): HomeDeparture[] {
  return homeDepartures.filter(
    (departure) => departure.expiresOn === null || today <= departure.expiresOn,
  );
}
