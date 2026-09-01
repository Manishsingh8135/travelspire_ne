import type { Metadata } from "next";
import { AdvancedFAQ } from "@/components/faqs/faq-base";
import { StructuredData } from "@/components/seo/structured-data";
import { ValleyChapters, ValleyHero, ValleyRiver } from "@/components/places/dibang-valley/valley-sections";
import { ValleyGo } from "@/components/places/dibang-valley/valley-plan";
import { ValleySeasons } from "@/components/places/dibang-valley/valley-seasons";
import { valleyFaqSection, valleyHeroImages } from "@/data/places/dibang-valley";
import { ImageSEO } from "@/components/seo/image-seo";
import { anini2026Images } from "@/data/seo/image-seo-data";

export const metadata: Metadata = {
  title: {
    absolute:
      "Dibang Valley Travel Guide 2026 — Anini, Dambuk, Roing & More",
  },
  description:
    "The complete Dibang Valley guide by the team that drives NH-313 weekly. Anini's plateau, Dambuk's orange orchards, Roing the gateway, Mayodia's cloud pass — ILP, seasons, one journey.",
  keywords: [
    "dibang valley travel guide",
    "dibang valley arunachal pradesh",
    "anini dambuk roing",
    "pomo grassland trek",
    "seven lakes trek anini",
    "emuli grassland",
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
        url: valleyHeroImages.desktop.src,
        width: valleyHeroImages.desktop.width,
        height: valleyHeroImages.desktop.height,
        alt: valleyHeroImages.alt,
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
  image: [`https://travelspirene.com${valleyHeroImages.desktop.src}`],
  sameAs: [
    "https://en.wikipedia.org/wiki/Dibang_Valley_district",
    "https://en.wikipedia.org/wiki/Lower_Dibang_Valley_district",
  ],
  address: {
    "@type": "PostalAddress",
    addressRegion: "Arunachal Pradesh",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.7,
    longitude: 95.7,
  },
  containsPlace: [
    { "@type": "TouristAttraction", "@id": "https://travelspirene.com/places/anini#place", name: "Anini", url: "https://travelspirene.com/places/anini" },
    { "@type": "TouristAttraction", "@id": "https://travelspirene.com/places/dambuk#place", name: "Dambuk", url: "https://travelspirene.com/places/dambuk" },
    { "@type": "TouristAttraction", "@id": "https://travelspirene.com/places/roing#place", name: "Roing", url: "https://travelspirene.com/places/roing" },
  ],
  touristType: ["Nature travelers", "Road trippers", "Photographers", "Cultural travelers"],
};

const webPageSchema = {
  "@type": "WebPage",
  "@id": "https://travelspirene.com/places/dibang-valley#webpage",
  url: "https://travelspirene.com/places/dibang-valley",
  name: "Dibang Valley Travel Guide 2026 — Anini, Dambuk, Roing & the Whole Frontier",
  isPartOf: { "@id": "https://travelspirene.com/#website" },
  about: { "@id": "https://travelspirene.com/places/dibang-valley#place" },
  breadcrumb: { "@id": "https://travelspirene.com/places/dibang-valley#breadcrumb" },
  primaryImageOfPage: "https://travelspirene.com/images/places/pomo/pomo1.JPG",
  datePublished: "2026-08-19",
  dateModified: "2026-08-19",
  inLanguage: "en-IN",
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
  "@id": "https://travelspirene.com/places/dibang-valley#breadcrumb",
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
      name: "Dibang Valley",
      item: "https://travelspirene.com/places/dibang-valley",
    },
  ],
};

const valleyGraph = {
  "@context": "https://schema.org",
  "@graph": [webPageSchema, placeSchema, faqSchema, breadcrumbSchema],
};

export default function DibangValleyPlacePage() {
  return (
    <div className="min-h-screen bg-[#050d0f]">
      <StructuredData data={valleyGraph} />
      <ImageSEO images={anini2026Images} limit={14} />

      <ValleyHero />
      <ValleyChapters />
      <ValleyRiver />
      <ValleySeasons />
      <AdvancedFAQ section={valleyFaqSection} />
      <ValleyGo />
    </div>
  );
}
