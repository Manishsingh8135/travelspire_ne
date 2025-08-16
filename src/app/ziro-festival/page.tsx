// app/ziro-festival/page.tsx
import { Metadata } from "next";
import { ZiroFestivalPage } from "@/components/festivals/ziro-festival-page";

export const metadata: Metadata = {
  title: "Ziro Festival of Music 2025 | TravelSpire NE",
  description: "Experience India's premier eco-friendly outdoor music festival in UNESCO Tentative World Heritage Site Ziro Valley. 33+ artists, sustainable practices, Apatani culture.",
  keywords: "Ziro Festival, music festival, Arunachal Pradesh, eco-friendly festival, Apatani tribe, UNESCO heritage, indie music, outdoor festival",
  openGraph: {
    title: "Ziro Festival of Music 2025 | TravelSpire NE",
    description: "Experience India's premier eco-friendly outdoor music festival in UNESCO Tentative World Heritage Site Ziro Valley.",
    images: ["/images/places/ziro-new/ziro-new-landscape-1.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziro Festival of Music 2025 | TravelSpire NE",
    description: "Experience India's premier eco-friendly outdoor music festival in UNESCO Tentative World Heritage Site Ziro Valley.",
    images: ["/images/places/ziro-new/ziro-new-landscape-1.jpeg"],
  },
};

export default function ZiroFestivalPageRoute() {
  return <ZiroFestivalPage />;
}
