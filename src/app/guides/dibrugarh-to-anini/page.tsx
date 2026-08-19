import type { Metadata } from "next";
import { AdvancedFAQ } from "@/components/faqs/faq-base";
import { StructuredData } from "@/components/seo/structured-data";
import { WayHero } from "@/components/guides/way-to-anini/way-hero";
import { WayChapters } from "@/components/guides/way-to-anini/way-chapters";
import { WayProfile } from "@/components/guides/way-to-anini/way-profile";
import { WayGo, WayTiming } from "@/components/guides/way-to-anini/way-plan";
import { wayFaqSection } from "@/data/guides/way-to-anini";

export const metadata: Metadata = {
  title: {
    absolute:
      "Dibrugarh to Anini Road Guide 2026 — NH-313 in 9 Chapters",
  },
  description:
    "The definitive Dibrugarh→Anini road guide by the team that drives NH-313 weekly. The Bhupen Hazarika Setu, Shantipur ILP gate, Roing staging, Mayodia Pass and the plateau reveal — with honest timings.",
  keywords: [
    "dibrugarh to anini",
    "how to reach anini",
    "roing to anini distance",
    "nh-313 road condition",
    "mayodia pass",
    "anini road trip",
    "dibrugarh to anini distance",
    "anini by road",
    "travelspire northeast",
  ],
  alternates: { canonical: "/guides/dibrugarh-to-anini" },
  openGraph: {
    title: "The Way to Anini — the road guide in 9 chapters | Travelspire NE",
    description:
      "From Assam's tea flats over India's longest bridge and up 235 km of mountain road. The whole drive, told the way we actually run it.",
    url: "https://travelspirene.com/guides/dibrugarh-to-anini",
    type: "article",
    images: [
      {
        url: "/images/places/anini/Anini_10.JPG",
        width: 3024,
        height: 4032,
        alt: "Cloud-wrapped ridgelines on the road to Anini",
      },
    ],
  },
  twitter: {
    title: "The Way to Anini — the road guide in 9 chapters | Travelspire NE",
    description:
      "Dibrugarh to Anini over the Mayodia Pass — nine chapters, honest timings, zero shortcuts.",
  },
};

const articleSchema = {
  "@type": "Article",
  "@id": "https://travelspirene.com/guides/dibrugarh-to-anini#article",
  headline: "The Way to Anini — Dibrugarh to Anini by Road in Nine Chapters",
  description:
    "The definitive road guide to reaching Anini, Dibang Valley: the Bhupen Hazarika Setu crossing, the ILP gate at Shantipur, staging in Roing, climbing Mayodia Pass, the slide-zone corridor, and arrival on the Anini plateau — with honest seasonal timings.",
  image: ["https://travelspirene.com/images/places/anini/Anini_10.JPG"],
  datePublished: "2026-08-19",
  dateModified: "2026-08-19",
  inLanguage: "en-IN",
  author: {
    "@type": "Organization",
    "@id": "https://travelspirene.com/#organization",
    name: "Travelspire Northeast",
    url: "https://travelspirene.com",
  },
  publisher: {
    "@type": "Organization",
    "@id": "https://travelspirene.com/#organization",
    name: "Travelspire Northeast",
    url: "https://travelspirene.com",
  },
  isPartOf: { "@id": "https://travelspirene.com/guides/dibrugarh-to-anini#webpage" },
  mainEntityOfPage: "https://travelspirene.com/guides/dibrugarh-to-anini",
  about: {
    "@type": "TouristAttraction",
    "@id": "https://travelspirene.com/places/anini#place",
    name: "Anini, Dibang Valley",
    url: "https://travelspirene.com/places/anini",
  },
};

const webPageSchema = {
  "@type": "WebPage",
  "@id": "https://travelspirene.com/guides/dibrugarh-to-anini#webpage",
  url: "https://travelspirene.com/guides/dibrugarh-to-anini",
  name: "Dibrugarh to Anini Road Guide 2026 — NH-313 in 9 Chapters",
  isPartOf: { "@id": "https://travelspirene.com/#website" },
  breadcrumb: { "@id": "https://travelspirene.com/guides/dibrugarh-to-anini#breadcrumb" },
  primaryImageOfPage: "https://travelspirene.com/images/places/anini/Anini_10.JPG",
  datePublished: "2026-08-19",
  dateModified: "2026-08-19",
  inLanguage: "en-IN",
};

const faqSchema = {
  "@type": "FAQPage",
  mainEntity: wayFaqSection.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  "@id": "https://travelspirene.com/guides/dibrugarh-to-anini#breadcrumb",
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
      name: "Dibrugarh to Anini",
      item: "https://travelspirene.com/guides/dibrugarh-to-anini",
    },
  ],
};

const wayGraph = {
  "@context": "https://schema.org",
  "@graph": [webPageSchema, articleSchema, faqSchema, breadcrumbSchema],
};

export default function WayToAniniPage() {
  return (
    <div className="min-h-screen bg-[#050d0f]">
      <StructuredData data={wayGraph} />

      <WayHero />
      <WayChapters />
      <WayProfile />
      <WayTiming />
      <AdvancedFAQ section={wayFaqSection} />
      <WayGo />
    </div>
  );
}
