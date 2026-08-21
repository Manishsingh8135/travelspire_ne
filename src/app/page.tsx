import type { Metadata } from "next";
import { AwfPageExperience } from "@/components/festivals/anini/awf-page-experience";
import { awfEdition, awfHeroImages } from "@/data/festivals/anini-winter-fest";

const pageUrl = "https://travelspirene.com";
const heroImageUrl = `${pageUrl}${awfHeroImages.desktop.src}`;
const isPast = awfEdition.status === "past";

export const metadata: Metadata = {
  title: {
    absolute: isPast
      ? `Anini Winter Fest ${awfEdition.nextYear} — Dates Soon | Travelspire NE`
      : "Anini Winter Fest 2026 — Official Travel & Taxi Partner | Travelspire NE",
  },
  description: isPast
    ? "Plan the next Anini Winter Fest with Travelspire Northeast, and explore the complete Anini and Dibang Valley travel guides."
    : "Travel to Anini Winter Fest 2026 with the Official Travel & Taxi Partner. Shared Dibrugarh–Anini convoy ₹5,499/person, private SUVs, ILP assistance and stays.",
  keywords: [
    "Anini Winter Fest 2026",
    "Anini Winter Festival",
    "Anini Winter Fest travel partner",
    "Dibrugarh to Anini festival transport",
    "Anini shared cab",
    "Dibang Valley music festival",
    "Arunachal Pradesh festival September 2026",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Anini Winter Fest 2026 | Official Travel Partner — Travelspire NE",
    description:
      "Music at the edge of the map. Shared convoy, private SUVs, ILP assistance and stays for 19–20 September in Dibang Valley.",
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
    title: "Anini Winter Fest 2026 · Official Travel & Taxi Partner",
    description:
      "Shared convoy ₹5,499, private SUVs, ILP assistance and stays for Anini Winter Fest 2026.",
    images: [heroImageUrl],
    site: "@TravelSpireNE",
  },
};

export default function Home() {
  return <AwfPageExperience pageUrl={pageUrl} isHomepage />;
}
