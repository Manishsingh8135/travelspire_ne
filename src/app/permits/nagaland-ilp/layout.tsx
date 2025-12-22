import { Metadata } from "next";
import { nagalandPermitData } from "@/data/permits/nagaland-data";

const data = nagalandPermitData;

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
        url: "https://travelspirene.com/images/permits/nagaland-ilp-og.jpg",
        width: 1200,
        height: 630,
        alt: "Nagaland ILP Guide - TravelSpire NE",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: data.seo.title,
    description: data.seo.description,
    images: ["https://travelspirene.com/images/permits/nagaland-ilp-og.jpg"],
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
    {
      "@type": "Article",
      "@id": `${data.seo.canonical}#article`,
      headline: data.seo.title,
      description: data.seo.description,
      image: "https://travelspirene.com/images/permits/nagaland-ilp-og.jpg",
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
    {
      "@type": "HowTo",
      "@id": `${data.seo.canonical}#howto`,
      name: "How to Apply for Nagaland ILP Online",
      description: "Step-by-step guide to apply for Inner Line Permit for Nagaland",
      totalTime: "PT2D",
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "INR",
        value: "200",
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
          name: "Nagaland ILP",
          item: data.seo.canonical,
        },
      ],
    },
    {
      "@type": "GovernmentService",
      "@id": `${data.seo.canonical}#service`,
      name: "Nagaland Inner Line Permit",
      serviceType: "Travel Permit",
      provider: {
        "@type": "GovernmentOrganization",
        name: "Government of Nagaland",
        url: "https://nagaland.gov.in",
      },
      areaServed: {
        "@type": "State",
        name: "Nagaland",
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
    // Event Schema for Hornbill Festival
    {
      "@type": "Event",
      "@id": `${data.seo.canonical}#hornbill`,
      name: "Hornbill Festival 2025",
      description: data.hornbillFestival.description,
      startDate: "2025-12-01",
      endDate: "2025-12-10",
      location: {
        "@type": "Place",
        name: "Kisama Heritage Village",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kohima",
          addressRegion: "Nagaland",
          addressCountry: "India",
        },
      },
      organizer: {
        "@type": "GovernmentOrganization",
        name: "Government of Nagaland",
      },
    },
  ],
};

export default function NagalandILPLayout({
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
