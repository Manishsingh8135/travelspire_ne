import type { Metadata } from "next";
import { SixDaysPage } from "@/components/expeditions/six-days-page";
import { StructuredData } from "@/components/seo/structured-data";
import { ImageSEO } from "@/components/seo/image-seo";
import { anini2026Images, anini2026Src } from "@/data/seo/image-seo-data";
import {
  sixDays,
  sixFaqSection,
  sixHeroImages,
  sixIncluded,
  sixMeta,
  sixPricing,
} from "@/data/expeditions/anini-six-days";
import { tierPerPerson } from "@/lib/expedition-tiers";

const pageUrl = sixMeta.url;
const heroImageUrl = `https://travelspirene.com${sixHeroImages.desktop.src}`;
const description =
  "Six days in Dibang Valley: Mayodia Pass, Anini homestays, Chigu camp, a 12-hour Pomo Grassland trek, Gipulin & the glass bridge, Emuli and Karu. From ₹25,999 pp. ILP and forest pass included.";

export const metadata: Metadata = {
  title: {
    absolute:
      "Anini 6 Days / 5 Nights — Pomo Grassland Trek Expedition | Travelspire NE",
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
    "Anini waterfall tour",
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
      "Five nights inside India's emptiest district, built around one 3 AM start onto Pomo grassland. Group from ₹25,999 · private from ₹51,999.",
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
      "5N/6D from Dibrugarh. Mayodia, Anini, Chigu camp, Pomo trek, Gipulin, Emuli & Karu. From ₹25,999 pp.",
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
        lowPrice: Math.min(...sixPricing.tiers.map(tierPerPerson)),
        highPrice: Math.max(...sixPricing.tiers.map(tierPerPerson)),
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
            ...("minSize" in tier ? { minValue: tier.minSize, maxValue: tier.size } : { value: tier.size }),
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

const sixFieldSrcs = new Set<string>([
  anini2026Src.pomoRidgeTrail,
  anini2026Src.emuliSign,
  anini2026Src.cascadeFalls,
  anini2026Src.mistyFalls,
  anini2026Src.riverbankFalls,
  anini2026Src.aFrameCabins,
  anini2026Src.rainbowGlamping,
  anini2026Src.meadowRest,
]);

const sixFieldImages = anini2026Images.filter((image) =>
  sixFieldSrcs.has(image.src),
);

export default function AniniPomoSixPage() {
  return (
    <>
      <StructuredData data={sixGraph} />
      <ImageSEO images={sixFieldImages} limit={8} />
      <SixDaysPage />
    </>
  );
}
