import type { Metadata } from "next";
import { AwfPageExperience } from "@/components/festivals/anini/awf-page-experience";
import { awfEdition, awfHeroImages } from "@/data/festivals/anini-winter-fest";

const pageUrl = "https://travelspirene.com/anini-winter-fest-2026";
const heroImageUrl = `https://travelspirene.com${awfHeroImages.desktop.src}`;
const isPast = awfEdition.status === "past";

export const metadata: Metadata = {
  title: {
    absolute: isPast
      ? `Anini Winter Fest ${awfEdition.nextYear} — Dates Soon · 2026 Recap | Travelspire NE`
      : "Anini Winter Fest 2026 (Sep 19–20) — Official Travel Partner",
  },
  description: isPast
    ? `Anini Winter Fest 2026 has wrapped — ${awfEdition.nextYear} dates will be announced on the festival's official channels. Explore Anini, the road through Dibang Valley, and year-round journeys.`
    : "Official Travel & Taxi Partner of Anini Winter Fest 2026 (19–20 Sep, Dibang Valley). Shared convoy ₹5,499/person, private SUVs from ₹5,599/day, ILP help and stays.",
  keywords: [
    "Anini Winter Fest 2026",
    "Anini Winter Festival",
    "Anini festival September 2026",
    "Dibang Valley music festival",
    "Dibrugarh to Anini taxi",
    "Anini festival transport",
    "Anini shared cab",
    "Anini Winter Fest official travel partner",
  ],
  openGraph: {
    title:
      "Anini Winter Fest 2026 (Sep 19–20) | Official Travel Partner — Travelspire NE",
    description:
      "Two days of music in Dibang Valley. Shared convoy ₹5,499, private SUVs, ILP help and stays from the Official Travel & Taxi Partner.",
    url: pageUrl,
    siteName: "Travelspire NE",
    images: [
      {
        url: heroImageUrl,
        width: 1200,
        height: 675,
        alt: "Dibang Valley mountains around Anini — venue of Anini Winter Fest 2026",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anini Winter Fest 2026 · Sep 19–20 · Official Travel Partner",
    description:
      "Shared convoy ₹5,499, private SUVs, ILP assistance and stays for Anini Winter Fest 2026.",
    images: [heroImageUrl],
    site: "@TravelSpireNE",
  },
  alternates: { canonical: pageUrl },
};

export default function AniniWinterFest2026Page() {
  return <AwfPageExperience pageUrl={pageUrl} />;
}
