import type { Metadata } from "next";
import { HomeExperience } from "@/components/home/home-experience";
import { homeHero } from "@/data/home/homepage";

const pageUrl = "https://travelspirene.com";
const heroImageUrl = `${pageUrl}${homeHero.images.desktop.src}`;

export const metadata: Metadata = {
  title: {
    absolute: "Northeast India Tours & Local Travel Experiences | Travelspire NE",
  },
  description:
    "Explore Northeast India with locally guided tours, Arunachal expeditions, festival journeys, permit assistance and custom travel planning from Travelspire North-East.",
  keywords: [
    "Northeast India tours",
    "Arunachal Pradesh tour packages",
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
    title: "Northeast India Tours & Local Travel Experiences | Travelspire NE",
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
    title: "Northeast India Tours & Local Travel Experiences | Travelspire NE",
    description:
      "Locally guided tours, Arunachal expeditions, festival journeys and permit assistance — from a Dibrugarh-based team.",
    images: [heroImageUrl],
    site: "@TravelSpireNE",
  },
};

export default function Home() {
  return <HomeExperience />;
}
