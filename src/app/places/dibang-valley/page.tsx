import type { Metadata } from "next";
import { AdvancedFAQ } from "@/components/faqs/faq-base";
import { StructuredData } from "@/components/seo/structured-data";
import { ValleyChapters, ValleyHero, ValleyRiver } from "@/components/places/dibang-valley/valley-sections";
import { ValleyGo, ValleySeasons } from "@/components/places/dibang-valley/valley-plan";
import { valleyFaqSection } from "@/data/places/dibang-valley";

export const metadata: Metadata = {
  title: {
    absolute:
      "Dibang Valley Travel Guide 2026 — Anini, Dambuk, Roing & the Whole Frontier | Travelspire NE",
  },
  description:
    "The complete Dibang Valley guide by the team that drives NH-313 weekly. India's largest and emptiest district — Anini's high plateau, Dambuk's orange orchards, Roing the gateway, Mayodia's cloud pass, ILP permits, honest seasons and how to sequence the whole region in one journey.",
  keywords: [
    "dibang valley travel guide",
    "dibang valley arunachal pradesh",
    "anini dambuk roing",
    "lower dibang valley",
    "nh-313 road trip",
    "mayodia pass",
    "idu mishmi",
    "dibang river",
    "travelspire northeast",
  ],
  alternates: { canonical: "/places/dibang-valley" },
  openGraph: {
    title: "Dibang Valley — one river, two worlds | Travelspire NE",
    description:
      "India's largest district and its emptiest. Orange country below, cloud passes above — the complete guide to the whole frontier.",
    url: "https://travelspirene.com/places/dibang-valley",
    type: "article",
    images: [
      {
        url: "/images/places/pomo/pomo1.JPG",
        width: 3024,
        height: 4032,
        alt: "Vast grasslands and ridgelines of the Dibang region",
      },
    ],
  },
  twitter: {
    title: "Dibang Valley — one river, two worlds | Travelspire NE",
    description:
      "Anini, Dambuk, Roing, Mayodia — the complete guide to India's emptiest frontier.",
  },
};

const placeSchema = {
  "@type": "TouristAttraction",
  "@id": "https://travelspirene.com/places/dibang-valley#place",
  name: "Dibang Valley",
  description:
    "Two districts sharing one river in eastern Arunachal Pradesh: Lower Dibang Valley (Roing, Dambuk) in the foothills and Dibang Valley district (Anini and beyond) in the high mountains. India's largest district by area, with fewer than one person per square kilometre.",
  url: "https://travelspirene.com/places/dibang-valley",
  image: ["https://travelspirene.com/images/places/pomo/pomo1.JPG"],
  address: {
    "@type": "PostalAddress",
    addressRegion: "Arunachal Pradesh",
    addressCountry: "IN",
  },
  containsPlace: [
    { "@type": "TouristAttraction", name: "Anini", url: "https://travelspirene.com/places/anini" },
    { "@type": "TouristAttraction", name: "Dambuk", url: "https://travelspirene.com/places/dambuk" },
  ],
  touristType: ["Nature travelers", "Road trippers", "Photographers", "Cultural travelers"],
};

const faqSchema = {
  "@type": "FAQPage",
  mainEntity: valleyFaqSection.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://travelspirene.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Places",
      item: "https://travelspirene.com/places",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Dibang Valley",
      item: "https://travelspirene.com/places/dibang-valley",
    },
  ],
};

const valleyGraph = {
  "@context": "https://schema.org",
  "@graph": [placeSchema, faqSchema, breadcrumbSchema],
};

export default function DibangValleyPlacePage() {
  return (
    <div className="min-h-screen bg-[#050d0f]">
      <StructuredData data={valleyGraph} />

      <ValleyHero />
      <ValleyChapters />
      <ValleyRiver />
      <ValleySeasons />
      <AdvancedFAQ section={valleyFaqSection} />
      <ValleyGo />
    </div>
  );
}
