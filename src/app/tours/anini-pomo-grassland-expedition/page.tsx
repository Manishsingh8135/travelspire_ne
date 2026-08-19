import type { Metadata } from "next";
import { SixClose } from "@/components/expeditions/anini-six/six-close";
import { SixDays } from "@/components/expeditions/anini-six/six-days";
import { SixFaq } from "@/components/expeditions/anini-six/six-faq";
import { SixGallery } from "@/components/expeditions/anini-six/six-gallery";
import { SixHero } from "@/components/expeditions/anini-six/six-hero";
import { SixKit } from "@/components/expeditions/anini-six/six-kit";
import { SixLedger } from "@/components/expeditions/anini-six/six-ledger";
import { SixOverture } from "@/components/expeditions/anini-six/six-overture";
import { SixProfile } from "@/components/expeditions/anini-six/six-profile";
import { SixSeason } from "@/components/expeditions/anini-six/six-season";
import { SixSummit } from "@/components/expeditions/anini-six/six-summit";
import { SixWater } from "@/components/expeditions/anini-six/six-water";
import { StructuredData } from "@/components/seo/structured-data";
import {
  sixDays,
  sixFaqSection,
  sixHeroImages,
  sixIncluded,
  sixMeta,
  sixPricing,
} from "@/data/expeditions/anini-six-days";

const pageUrl = sixMeta.url;
const heroImageUrl = `https://travelspirene.com${sixHeroImages.desktop.src}`;
const description =
  "Six days in Dibang Valley: Mayodia Pass, Anini homestays, Chigu camp, a 12-hour Pomo Grassland trek, Gipulin & the glass bridge, Emuli and Karu. From ₹18,999 pp. ILP and forest pass included.";

export const metadata: Metadata = {
  title: {
    absolute:
      "Anini 6 Days / 5 Nights — Pomo Grassland Trek Expedition 2026 | Travelspire NE",
  },
  description,
  keywords: [
    "Anini 6 days itinerary",
    "Anini 5 nights 6 days",
    "Pomo Grassland trek",
    "Pomo Anini trek",
    "Dibang Valley tour package",
    "Anini tour from Dibrugarh",
    "Dibrugarh to Anini package",
    "Mayodia Pass tour",
    "Chigu camp Anini",
    "Gipulin glass bridge",
    "Emuli grassland Anini",
    "Karu viewpoint Anini",
    "Anini homestay package",
    "Inner Line Permit Anini",
    "Dibang Valley forest pass",
    "Anini waterfall tour",
    "Deccan Falls Anini",
    "Dree Afra",
    "Idu Mishmi trek",
    "Arunachal Pradesh trekking tour",
    "Travelspire Northeast Anini",
  ],
  authors: [{ name: "Travelspire North-East", url: "https://travelspirene.com" }],
  creator: "Travelspire North-East",
  publisher: "Travelspire North-East",
  category: "travel",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Six Days in the Dibang — Anini + Pomo Grassland | Travelspire NE",
    description:
      "Five nights inside India's emptiest district, built around one 3 AM start onto Pomo grassland. Group from ₹18,999 · private from ₹51,999.",
    url: pageUrl,
    siteName: "Travelspire NE",
    locale: "en_IN",
    type: "article",
    publishedTime: "2026-08-19",
    modifiedTime: sixMeta.updated,
    authors: ["Travelspire North-East"],
    images: [
      {
        url: heroImageUrl,
        width: 1200,
        height: 900,
        alt: sixHeroImages.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Six Days in the Dibang — Anini + Pomo Grassland trek",
    description:
      "5N/6D from Dibrugarh. Mayodia, Anini, Chigu camp, Pomo trek, Gipulin, Emuli & Karu. From ₹18,999 pp.",
    images: [heroImageUrl],
    site: "@TravelSpireNE",
  },
};

const tripId = `${pageUrl}#trip`;

const sixGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Six Days in the Dibang — Anini + Pomo Grassland Expedition",
      description,
      isPartOf: { "@id": "https://travelspirene.com/#website" },
      about: { "@id": tripId },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: heroImageUrl,
      },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      datePublished: "2026-08-19",
      dateModified: sixMeta.updated,
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
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
          name: "Tours",
          item: "https://travelspirene.com/all-tours",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Six Days in the Dibang",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": ["TouristTrip", "Product"],
      "@id": tripId,
      name: "Six Days in the Dibang — Anini + Pomo Grassland Expedition",
      alternateName: [
        "Anini 5N/6D",
        "Anini Pomo Grassland Expedition",
        "Dibang Valley 6 day tour",
      ],
      description,
      url: pageUrl,
      image: [heroImageUrl, `https://travelspirene.com${sixDays[2].image}`],
      inLanguage: "en-IN",
      touristType: [
        "Adventure travellers",
        "Trekkers",
        "Small groups",
        "Couples",
      ],
      itinerary: {
        "@type": "ItemList",
        numberOfItems: sixDays.length,
        itemListElement: sixDays.map((day) => ({
          "@type": "ListItem",
          position: day.day,
          name: `Day ${day.day}: ${day.title}`,
          description: `${day.lede} ${day.story}`,
        })),
      },
      provider: { "@id": "https://travelspirene.com/#organization" },
      brand: { "@id": "https://travelspirene.com/#organization" },
      duration: "P6D",
      startLocation: {
        "@type": "Place",
        name: "Dibrugarh / Tinsukia, Assam",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dibrugarh",
          addressRegion: "Assam",
          addressCountry: "IN",
        },
      },
      offers: {
        "@type": "AggregateOffer",
        url: pageUrl,
        priceCurrency: "INR",
        lowPrice: sixPricing.tiers[0].price,
        highPrice: sixPricing.tiers[sixPricing.tiers.length - 1].price,
        offerCount: sixPricing.tiers.length,
        availability: "https://schema.org/InStock",
        offers: sixPricing.tiers.map((tier) => ({
          "@type": "Offer",
          name: tier.label,
          price: tier.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: pageUrl,
          eligibleQuantity: {
            "@type": "QuantitativeValue",
            value: tier.size,
            unitText: "travellers",
          },
        })),
      },
      includesObject: sixIncluded.map((item) => ({
        "@type": "Offer",
        name: item.name,
        description: item.note,
      })),
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Dibang Valley district, Arunachal Pradesh",
        sameAs: "https://en.wikipedia.org/wiki/Dibang_Valley_district",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: sixFaqSection.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function AniniPomoSixPage() {
  return (
    <div className="min-h-screen bg-[#070E0D]">
      <StructuredData data={sixGraph} />
      <SixHero />
      <SixOverture />
      <SixProfile />
      <SixDays />
      <SixWater />
      <SixSummit />
      <SixLedger />
      <SixKit />
      <SixSeason />
      <SixGallery />
      <SixFaq />
      <SixClose />
    </div>
  );
}
