import type { Metadata } from "next";
import { AdvancedFAQ } from "@/components/faqs/faq-base";
import { StructuredData } from "@/components/seo/structured-data";
import { RoingExperiences, RoingHero } from "@/components/places/roing/roing-sections";
import { RoingFrames, RoingGo, RoingSeasons } from "@/components/places/roing/roing-plan";
import { roingFaqSection } from "@/data/places/roing";

export const metadata: Metadata = {
  title: {
    absolute:
      "Roing Travel Guide 2026 — Gateway to Anini & NH-313 Mile Zero",
  },
  description:
    "The definitive Roing guide by the team that stages here weekly. Mehao Lake, Bhishmaknagar ruins, the last fuel and network before the 235 km climb to Anini, ILP permits, and honest seasons.",
  keywords: [
    "roing travel guide",
    "roing arunachal pradesh",
    "roing to anini",
    "lower dibang valley",
    "mehao lake",
    "bhishmaknagar",
    "nh-313",
    "dibrugarh to roing",
    "travelspire northeast",
  ],
  alternates: { canonical: "/places/roing" },
  openGraph: {
    title: "Roing — where every Anini journey begins | Travelspire NE",
    description:
      "Mile zero of the NH-313 climb. Lakes, old fort walls, foothill light — and the last full stop before the high valley.",
    url: "https://travelspirene.com/places/roing",
    type: "article",
    images: [
      {
        url: "/images/places/anini/Anini_2.JPG",
        width: 3024,
        height: 4032,
        alt: "Foothill road through Lower Dibang Valley near Roing",
      },
    ],
  },
  twitter: {
    title: "Roing — where every Anini journey begins | Travelspire NE",
    description:
      "The gateway town of Lower Dibang Valley — lakes, ruins, and the last full stop before the climb to Anini.",
  },
};

const placeSchema = {
  "@type": "TouristAttraction",
  "@id": "https://travelspirene.com/places/roing#place",
  name: "Roing",
  description:
    "Gateway town of Lower Dibang Valley, Arunachal Pradesh — mile zero of the NH-313 climb to Anini. Known for Mehao Lake, the Bhishmaknagar fort ruins, and as the last reliable stop for fuel, cash and network before the high valley.",
  url: "https://travelspirene.com/places/roing",
  image: ["https://travelspirene.com/images/places/anini/Anini_2.JPG"],
  sameAs: ["https://en.wikipedia.org/wiki/Roing"],
  containedInPlace: {
    "@type": "AdministrativeArea",
    name: "Lower Dibang Valley district, Arunachal Pradesh, India",
    sameAs: "https://en.wikipedia.org/wiki/Lower_Dibang_Valley_district",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Roing",
    addressRegion: "Arunachal Pradesh",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.14278,
    longitude: 95.84278,
  },
  touristType: ["Nature travelers", "Road trippers", "History travelers", "Photographers"],
};

const webPageSchema = {
  "@type": "WebPage",
  "@id": "https://travelspirene.com/places/roing#webpage",
  url: "https://travelspirene.com/places/roing",
  name: "Roing Travel Guide 2026 — Gateway to Anini, Mehao Lake & NH-313 Mile Zero",
  isPartOf: { "@id": "https://travelspirene.com/#website" },
  about: { "@id": "https://travelspirene.com/places/roing#place" },
  breadcrumb: { "@id": "https://travelspirene.com/places/roing#breadcrumb" },
  primaryImageOfPage: "https://travelspirene.com/images/places/anini/Anini_2.JPG",
  datePublished: "2026-08-19",
  dateModified: "2026-08-19",
  inLanguage: "en-IN",
};

const faqSchema = {
  "@type": "FAQPage",
  mainEntity: roingFaqSection.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  "@id": "https://travelspirene.com/places/roing#breadcrumb",
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
      name: "Roing",
      item: "https://travelspirene.com/places/roing",
    },
  ],
};

const roingGraph = {
  "@context": "https://schema.org",
  "@graph": [webPageSchema, placeSchema, faqSchema, breadcrumbSchema],
};

export default function RoingPlacePage() {
  return (
    <div className="min-h-screen bg-[#050d0f]">
      <StructuredData data={roingGraph} />

      <RoingHero />
      <RoingExperiences />
      <RoingFrames />
      <RoingSeasons />
      <AdvancedFAQ section={roingFaqSection} />
      <RoingGo />
    </div>
  );
}
