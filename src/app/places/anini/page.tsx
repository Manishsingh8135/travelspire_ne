import type { Metadata } from "next";
import { AdvancedFAQ } from "@/components/faqs/faq-base";
import { AniniExperiences } from "@/components/places/anini/anini-experiences";
import { AniniFrames, AniniStatsBand } from "@/components/places/anini/anini-explore";
import { AniniHero, AniniManifesto } from "@/components/places/anini/anini-hero";
import { AniniGo, AniniSeasons } from "@/components/places/anini/anini-plan";
import { AniniRoute } from "@/components/places/anini/anini-route";
import { StructuredData } from "@/components/seo/structured-data";
import { aniniFaqSection, aniniHeroImages, aniniMeta } from "@/data/places/anini";

const pageUrl = "https://travelspirene.com/places/anini";
const heroImageUrl = `https://travelspirene.com${aniniHeroImages.desktop.src}`;

export const metadata: Metadata = {
  title: {
    absolute:
      "Anini, Dibang Valley: 2026 Travel Guide — How to Reach, ILP, Stays & Things to Do",
  },
  description:
    "The definitive Anini travel guide by the team that drives NH-313 weekly. How to reach Anini from Dibrugarh via the Mayodia Pass, ILP permits, honest month-by-month weather, stays, Dri Valley, Pomo Grassland, waterfalls and Idu Mishmi villages — planned end-to-end by Travelspire NE.",
  keywords: [
    "Anini",
    "Anini Arunachal Pradesh",
    "Anini Dibang Valley",
    "how to reach Anini",
    "Dibrugarh to Anini",
    "Roing to Anini",
    "Mayodia Pass",
    "Anini weather",
    "best time to visit Anini",
    "Anini ILP permit",
    "things to do in Anini",
    "places to visit in Anini",
    "Dri Valley",
    "Pomo Grassland",
    "Idu Mishmi",
    "Dibang Valley travel guide",
    "Anini homestay",
  ].join(", "),
  openGraph: {
    title: "Anini, Dibang Valley — India's quietest headquarters | Travelspire NE",
    description:
      "A plateau at 1,970 m between the Dri and Mathun rivers. The complete guide: the road, the permits, the seasons, the stays — by the people who drive it weekly.",
    url: pageUrl,
    siteName: "Travelspire NE",
    images: [
      {
        url: heroImageUrl,
        width: 1200,
        height: 675,
        alt: "Cloud over the Anini plateau in Dibang Valley, Arunachal Pradesh",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anini, Dibang Valley — the complete 2026 guide",
    description:
      "How to reach, ILP permits, honest seasons, stays and the valley's signature experiences — by the team that drives NH-313 weekly.",
    images: [heroImageUrl],
    site: "@TravelSpireNE",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const placeSchema = {
  "@type": "TouristAttraction",
  "@id": `${pageUrl}#place`,
  name: "Anini, Dibang Valley",
  description:
    "Headquarters of Dibang Valley district in Arunachal Pradesh — a plateau at 1,970 m between the Dri and Mathun rivers, home of the Idu Mishmi, reached via NH-313 over the 2,655 m Mayodia Pass. One of India's least-visited and most biodiverse regions.",
  url: pageUrl,
  image: [heroImageUrl],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Anini",
    addressRegion: "Arunachal Pradesh",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: Number(aniniMeta.coordinates.lat),
    longitude: Number(aniniMeta.coordinates.lng),
  },
  touristType: ["Adventure travellers", "Nature photographers", "Culture travellers"],
  isAccessibleForFree: true,
  publicAccess: true,
};

const faqSchema = {
  "@type": "FAQPage",
  "@id": `${pageUrl}#faq`,
  mainEntity: aniniFaqSection.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  "@id": `${pageUrl}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://travelspirene.com" },
    { "@type": "ListItem", position: 2, name: "Places", item: "https://travelspirene.com/places/anini" },
    { "@type": "ListItem", position: 3, name: "Anini", item: pageUrl },
  ],
};

const aniniGraph = {
  "@context": "https://schema.org",
  "@graph": [placeSchema, faqSchema, breadcrumbSchema],
};

export default function AniniPlacePage() {
  return (
    <div className="min-h-screen bg-[#050d0f]">
      <StructuredData data={aniniGraph} />

      <AniniHero />
      <AniniManifesto />
      <AniniExperiences />
      <AniniRoute />
      <AniniStatsBand />
      <AniniFrames />
      <AniniSeasons />
      <AdvancedFAQ section={aniniFaqSection} />
      <AniniGo />
    </div>
  );
}
