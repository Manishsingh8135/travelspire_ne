import type { Metadata } from "next";
import { AdvancedFAQ } from "@/components/faqs/faq-base";
import { StructuredData } from "@/components/seo/structured-data";
import { DambukExperiences, DambukHero } from "@/components/places/dambuk/dambuk-sections";
import { DambukFrames, DambukGo, DambukSeasons } from "@/components/places/dambuk/dambuk-plan";
import { dambukFaqSection, dambukMeta } from "@/data/places/dambuk";

export const metadata: Metadata = {
  title: {
    absolute:
      "Dambuk Travel Guide 2026 — Orange Orchards, Dibang Riverbanks & How to Reach | Travelspire NE",
  },
  description:
    "The definitive Dambuk guide by the team that drives this road weekly. Orange harvest season (Nov–Jan), the Dibang riverbanks, the bridge that ended the ferry era, ILP permits, and how to pair Dambuk with Roing and Anini — planned end-to-end by Travelspire NE.",
  keywords: [
    "dambuk travel guide",
    "dambuk oranges",
    "dambuk arunachal pradesh",
    "lower dibang valley",
    "dambuk orange season",
    "dibang river",
    "dambuk to anini",
    "dambuk tour package",
    "travelspire northeast",
  ],
  alternates: { canonical: "/places/dambuk" },
  openGraph: {
    title: "Dambuk — where the river grows oranges | Travelspire NE",
    description:
      "Orange country on the banks of the Dibang. Harvest season, riverbank sunsets, and the honest road onward to Anini — the complete guide.",
    url: "https://travelspirene.com/places/dambuk",
    type: "article",
    images: [
      {
        url: "/images/places/dambuk/Dambuk_1.jpg",
        width: 3024,
        height: 4032,
        alt: "Golden light over the Dibang riverbanks at Dambuk",
      },
    ],
  },
  twitter: {
    title: "Dambuk — where the river grows oranges | Travelspire NE",
    description:
      "Orange orchards, the Dibang riverbanks, and the road onward to Anini — the complete Dambuk guide.",
  },
};

const placeSchema = {
  "@type": "TouristAttraction",
  "@id": "https://travelspirene.com/places/dambuk#place",
  name: "Dambuk",
  description:
    "Riverside town in Lower Dibang Valley, Arunachal Pradesh, famous for its orange orchards, the Dibang riverbanks, and the bridge that ended decades of ferry crossings. Best visited November to January during harvest.",
  url: "https://travelspirene.com/places/dambuk",
  image: ["https://travelspirene.com/images/places/dambuk/Dambuk_1.jpg"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dambuk",
    addressRegion: "Arunachal Pradesh",
    addressCountry: "IN",
  },
  touristType: ["Nature travelers", "Road trippers", "Food and farm travelers", "Photographers"],
};

const faqSchema = {
  "@type": "FAQPage",
  mainEntity: dambukFaqSection.faqs.map((faq) => ({
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
      name: "Dambuk",
      item: "https://travelspirene.com/places/dambuk",
    },
  ],
};

const dambukGraph = {
  "@context": "https://schema.org",
  "@graph": [placeSchema, faqSchema, breadcrumbSchema],
};

export default function DambukPlacePage() {
  return (
    <div className="min-h-screen bg-[#050d0f]">
      <StructuredData data={dambukGraph} />

      <DambukHero />
      <DambukExperiences />
      <DambukFrames />
      <DambukSeasons />
      <AdvancedFAQ section={dambukFaqSection} />
      <DambukGo />
    </div>
  );
}
