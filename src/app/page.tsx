import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { homeHero } from "@/data/home/homepage";

const pageUrl = "https://travelspirene.com";
const heroImageUrl = `${pageUrl}${homeHero.images.desktop.src}`;

// Seasonal blocks and the departures rail are date-driven; re-render a few
// times a day so they rotate without a redeploy.
export const revalidate = 21600; // DATE_DRIVEN_REVALIDATE_SECONDS — must be a literal

export const metadata: Metadata = {
  title: {
    absolute: "Arunachal Pradesh & Northeast India Tours | Travelspire NE",
  },
  description:
    "Arunachal Pradesh tours run by a local team from Dibrugarh — Tawang, Mechuka, Anini, Dong Valley and Ziro — plus Hornbill Festival journeys, permit help and custom trips across Northeast India.",
  keywords: [
    "Arunachal Pradesh tour packages",
    "Northeast India tours",
    "Tawang tour package",
    "Northeast India travel agency",
    "Assam to Arunachal tours",
    "offbeat Northeast India travel",
    "Arunachal adventure tours",
    "Northeast India festival tours",
    "Dibrugarh travel agency",
    "Anini and Dibang Valley tours",
    "Mechuka tour packages",
    "Dong Valley sunrise tours",
    "Travelspire NE",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Arunachal Pradesh & Northeast India Tours | Travelspire NE",
    description:
      "Locally guided tours, remote expeditions, festival journeys and permit assistance across Arunachal Pradesh, Assam and the wider Northeast.",
    url: pageUrl,
    siteName: "Travelspire NE",
    images: [
      {
        url: heroImageUrl,
        width: 1200,
        height: 675,
        alt: "Mountain valley and high road through Mechuka, Arunachal Pradesh",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arunachal Pradesh & Northeast India Tours | Travelspire NE",
    description:
      "Locally guided tours, Arunachal expeditions, festival journeys and permit assistance — from a Dibrugarh-based team.",
    images: [heroImageUrl],
    site: "@TravelSpireNE",
  },
};

export default function Home() {
  return <HomePage />;
}
