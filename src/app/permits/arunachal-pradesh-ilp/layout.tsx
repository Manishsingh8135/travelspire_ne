import { Metadata } from "next";
import { arunachalPermitData } from "@/data/permits/arunachal-data";

const data = arunachalPermitData;

export const metadata: Metadata = {
  title: data.seo.title,
  description: data.seo.description,
  keywords: data.seo.keywords,
  authors: [{ name: "TravelSpire NE", url: "https://travelspirene.com" }],
  creator: "TravelSpire NE",
  publisher: "TravelSpire NE",
  
  alternates: {
    canonical: data.seo.canonical,
  },

  openGraph: {
    type: "article",
    locale: "en_IN",
    url: data.seo.canonical,
    siteName: "TravelSpire NE",
    title: data.seo.title,
    description: data.seo.description,
    images: [
      {
        url: "https://travelspirene.com/images/permits/arunachal-ilp-og.jpg",
        width: 1200,
        height: 630,
        alt: "Arunachal Pradesh ILP Guide - TravelSpire NE",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: data.seo.title,
    description: data.seo.description,
    images: ["https://travelspirene.com/images/permits/arunachal-ilp-og.jpg"],
    creator: "@travelspire_ne",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // Article Schema
    {
      "@type": "Article",
      "@id": `${data.seo.canonical}#article`,
      headline: data.seo.title,
      description: data.seo.description,
      image: "https://travelspirene.com/images/permits/arunachal-ilp-og.jpg",
      datePublished: "2025-01-01",
      dateModified: new Date().toISOString(),
      author: {
        "@type": "Organization",
        name: "TravelSpire NE",
        url: "https://travelspirene.com",
      },
      publisher: {
        "@type": "Organization",
        name: "TravelSpire NE",
        logo: {
          "@type": "ImageObject",
          url: "https://travelspirene.com/logo.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": data.seo.canonical,
      },
    },
    // HowTo Schema for Application Process
    {
      "@type": "HowTo",
      "@id": `${data.seo.canonical}#howto`,
      name: "How to Apply for Arunachal Pradesh ILP Online",
      description: "Step-by-step guide to apply for Inner Line Permit for Arunachal Pradesh",
      totalTime: "PT30M",
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "INR",
        value: "100",
      },
      step: data.applicationSteps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.title,
        text: step.description,
        itemListElement: step.details.map((detail, i) => ({
          "@type": "HowToDirection",
          position: i + 1,
          text: detail,
        })),
      })),
    },
    // FAQ Schema
    {
      "@type": "FAQPage",
      "@id": `${data.seo.canonical}#faq`,
      mainEntity: data.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    // BreadcrumbList Schema
    {
      "@type": "BreadcrumbList",
      "@id": `${data.seo.canonical}#breadcrumb`,
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
          name: "Permits",
          item: "https://travelspirene.com/permits",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Arunachal Pradesh ILP",
          item: data.seo.canonical,
        },
      ],
    },
    // Government Service Schema
    {
      "@type": "GovernmentService",
      "@id": `${data.seo.canonical}#service`,
      name: "Arunachal Pradesh Inner Line Permit",
      serviceType: "Travel Permit",
      provider: {
        "@type": "GovernmentOrganization",
        name: "Government of Arunachal Pradesh",
        url: "https://arunachal.gov.in",
      },
      areaServed: {
        "@type": "State",
        name: "Arunachal Pradesh",
        containedInPlace: {
          "@type": "Country",
          name: "India",
        },
      },
      audience: {
        "@type": "Audience",
        audienceType: "Indian Citizens",
      },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: data.quickStats.officialPortal,
        serviceType: "Online Application",
      },
    },
  ],
};

export default function ArunachalILPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
