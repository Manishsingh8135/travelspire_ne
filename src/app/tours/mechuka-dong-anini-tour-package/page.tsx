import type { Metadata } from "next";
import { CircuitBookBar } from "@/components/expeditions/grand-circuit/circuit-book-bar";
import { CircuitBooking } from "@/components/expeditions/grand-circuit/circuit-booking";
import { CircuitFaq } from "@/components/expeditions/grand-circuit/circuit-faq";
import { CircuitGallery } from "@/components/expeditions/grand-circuit/circuit-gallery";
import { CircuitHero } from "@/components/expeditions/grand-circuit/circuit-hero";
import { CircuitItinerary } from "@/components/expeditions/grand-circuit/circuit-itinerary";
import { CircuitStory } from "@/components/expeditions/grand-circuit/circuit-story";
import { StructuredData } from "@/components/seo/structured-data";
import { ImageSEO } from "@/components/seo/image-seo";
import { mechuka2026Images } from "@/data/seo/image-seo-data";
import {
  circuitChapters,
  circuitDays,
  circuitFaq,
  circuitHero,
  circuitIncluded,
  circuitMeta,
  circuitPricing,
} from "@/data/expeditions/mechuka-dong-anini";

const pageUrl = circuitMeta.url;
const siteUrl = "https://travelspirene.com";
const ogPath =
  "/images/tours/mechuka-dong-anini/mechuka-dong-anini-tour-package-og.jpg";
const ogImageUrl = `${siteUrl}${ogPath}`;
const description =
  "Book a 12N/13D Mechuka Dong Anini tour from Dibrugarh with Walong, Kaho, Dong sunrise, Mayodia, stays, transport, meals and permits across Arunachal Pradesh.";

export const metadata: Metadata = {
  title: {
    absolute: "Mechuka Dong Anini Tour Package – 13 Days | Travelspire NE",
  },
  description,
  keywords: [
    circuitMeta.focusKeyphrase,
    "Mechuka Dong Anini itinerary",
    "Mechuka Dong Anini 12 nights 13 days",
    "Mechuka Dong Anini tour from Dibrugarh",
    "Mechuka tour package",
    "Mechukha tour package",
    "Menchuka tour package",
    "Dong Valley sunrise tour",
    "Walong Kaho tour",
    "Anini tour package",
    "Arunachal Pradesh 13 day itinerary",
    "Arunachal Pradesh grand circuit",
    "Dibrugarh to Mechuka Dong Anini",
    "Aalo Mechuka road trip",
    "Mechuka golden Buddha",
    "Yargyap Chu Mechuka",
    "Dorjeeling Mechuka",
    "Mechuka helicopter landmark",
    "Golden Pagoda Namsai tour",
    "Mayodia Pass Anini tour",
    "Arunachal Pradesh ILP tour",
    "Travelspire Northeast",
  ],
  authors: [{ name: "Travelspire North-East", url: siteUrl }],
  creator: "Travelspire North-East",
  publisher: "Travelspire North-East",
  category: "travel",
  alternates: {
    canonical: pageUrl,
  },
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
  openGraph: {
    title: "Mechuka · Dong · Anini — 12N/13D Grand Arunachal Circuit",
    description:
      "One 13-day circuit from Dibrugarh: Mechuka, Walong, Dong sunrise, Kaho, Roing, Mayodia and three nights in Anini. From ₹37,499 pp.",
    url: pageUrl,
    siteName: "Travelspire North-East",
    locale: "en_IN",
    type: "article",
    publishedTime: circuitMeta.published,
    modifiedTime: circuitMeta.updated,
    authors: ["Travelspire North-East"],
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Mechuka mountain valley — Mechuka, Dong and Anini 13-day Arunachal tour",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mechuka · Dong · Anini — 13 Days across Arunachal",
    description:
      "Dibrugarh round trip with Mechuka, Dong sunrise, Kaho, Mayodia and Anini. 12 nights from ₹37,499 per person.",
    images: [ogImageUrl],
    creator: "@travelspire_ne",
  },
};

const tripId = `${pageUrl}#tour`;

const circuitGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Mechuka Dong Anini Tour Package – 12 Nights / 13 Days",
      description,
      inLanguage: "en-IN",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": tripId },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      primaryImageOfPage: { "@id": `${pageUrl}#primary-image` },
      datePublished: circuitMeta.published,
      dateModified: circuitMeta.updated,
    },
    {
      "@type": "ImageObject",
      "@id": `${pageUrl}#primary-image`,
      contentUrl: ogImageUrl,
      url: ogImageUrl,
      width: 1200,
      height: 630,
      caption:
        "Mechuka mountain valley on the Mechuka, Dong and Anini grand Arunachal circuit",
      representativeOfPage: true,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "All Tours",
          item: `${siteUrl}/all-tours`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Mechuka Dong Anini Tour Package",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": ["TouristTrip", "Product"],
      "@id": tripId,
      name: "Mechuka Dong Anini Tour Package – 12 Nights / 13 Days",
      alternateName: [
        "Mechuka + Dong + Anini 12N/13D",
        "Mechukha Dong Anini tour",
        "Menchuka Dong Anini tour",
        "Arunachal Pradesh grand circuit",
      ],
      description,
      url: pageUrl,
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      image: [
        ogImageUrl,
        `${siteUrl}${circuitHero.desktop.src}`,
        `${siteUrl}${circuitHero.mobile.src}`,
        ...circuitChapters.map((chapter) => `${siteUrl}${chapter.frame.src}`),
        ...mechuka2026Images.map((image) => `${siteUrl}${image.src}`),
      ].filter((url, index, list) => list.indexOf(url) === index),
      sku: "TSNE-MDA-13D",
      category: "Guided multi-day tour",
      provider: { "@id": `${siteUrl}/#organization` },
      brand: { "@id": `${siteUrl}/#organization` },
      touristType: [
        "Adventure travellers",
        "Couples",
        "Private groups",
        "Landscape and culture travellers",
      ],
      tripOrigin: {
        "@type": "Place",
        name: "Dibrugarh, Assam",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dibrugarh",
          addressRegion: "Assam",
          addressCountry: "IN",
        },
      },
      itinerary: {
        "@type": "ItemList",
        name: "13-day Mechuka, Dong and Anini itinerary",
        numberOfItems: circuitDays.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: circuitDays.map((day) => ({
          "@type": "ListItem",
          position: day.day,
          name: `Day ${day.day}: ${day.title}`,
          description: `${day.from} to ${day.to}. ${day.summary} Overnight: ${day.stay}.`,
        })),
      },
      offers: {
        "@type": "AggregateOffer",
        url: pageUrl,
        priceCurrency: "INR",
        lowPrice: circuitPricing.tiers[0].price,
        highPrice: circuitPricing.tiers[circuitPricing.tiers.length - 1].price,
        offerCount: circuitPricing.tiers.length,
        availability: "https://schema.org/LimitedAvailability",
        seller: { "@id": `${siteUrl}/#organization` },
        itemOffered: { "@id": tripId },
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "Shi Yomi district, Arunachal Pradesh",
          },
          {
            "@type": "AdministrativeArea",
            name: "Anjaw district, Arunachal Pradesh",
          },
          {
            "@type": "AdministrativeArea",
            name: "Dibang Valley district, Arunachal Pradesh",
          },
        ],
        includesObject: circuitIncluded.map((item) => ({
          "@type": "TypeAndQuantityNode",
          typeOfGood: {
            "@type": "Service",
            name: item.name,
            description: item.note,
          },
          amountOfThisGood: 1,
        })),
        offers: circuitPricing.tiers.map((tier) => ({
          "@type": "Offer",
          name: `${tier.label} — per-person tour price`,
          price: tier.price,
          priceCurrency: "INR",
          url: `${pageUrl}#pricing`,
          availability: "https://schema.org/LimitedAvailability",
          seller: { "@id": `${siteUrl}/#organization` },
          eligibleQuantity: {
            "@type": "QuantitativeValue",
            value: tier.size,
            unitText: "travellers",
          },
        })),
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Duration",
          value: circuitMeta.duration,
        },
        {
          "@type": "PropertyValue",
          name: "Starting and ending point",
          value: "Dibrugarh, Assam",
        },
        {
          "@type": "PropertyValue",
          name: "Included meals",
          value: "Breakfast and dinner",
        },
        {
          "@type": "PropertyValue",
          name: "Pomo Grassland trek",
          value: "Available only as a separately quoted extension",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq-schema`,
      mainEntity: circuitFaq.faqs.map((faq) => ({
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

export default function MechukaDongAniniTourPage() {
  return (
    <article className="min-h-screen bg-[#07110f]">
      <StructuredData data={circuitGraph} />
      <ImageSEO images={mechuka2026Images} limit={8} />
      <CircuitHero />
      <CircuitStory />
      <CircuitGallery />
      <CircuitItinerary />
      <CircuitBooking />
      <CircuitFaq />
      <CircuitBookBar />
    </article>
  );
}
