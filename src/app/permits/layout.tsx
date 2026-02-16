import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Permit Assistance - ILP, PAP & Travel Permits for Northeast India",
  description: "Expert assistance for Inner Line Permit (ILP) and Protected Area Permit (PAP) for Arunachal Pradesh, Nagaland, Mizoram, Manipur & Sikkim. Fast processing, 100% success rate, hassle-free documentation.",
  keywords: [
    "Inner Line Permit",
    "ILP Arunachal Pradesh",
    "ILP Nagaland",
    "ILP Mizoram",
    "ILP Manipur",
    "Protected Area Permit",
    "PAP Northeast India",
    "travel permit Northeast India",
    "Arunachal Pradesh permit",
    "Tawang permit",
    "Ziro Valley permit",
    "foreign tourist permit India",
    "Northeast India travel documents",
    "permit assistance service",
    "ILP online application",
    "PAP for foreigners",
    "Sikkim permit",
    "Nathula Pass permit",
    "restricted area permit India",
    "TravelSpire NE permit help"
  ],
  openGraph: {
    title: "Travel Permit Assistance for Northeast India | TravelSpire NE",
    description: "Don't let paperwork stop your adventure. We handle ILP, PAP, and all travel permits for Arunachal Pradesh, Nagaland, Mizoram, Manipur & more. Fast processing, 100% success rate.",
    url: "https://travelspirene.com/permits",
    type: "website",
    images: [
      {
        url: "/images/og/permits-og.jpg",
        width: 1200,
        height: 630,
        alt: "Northeast India Permit Assistance - TravelSpire NE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Permit Assistance - Northeast India | TravelSpire NE",
    description: "Expert ILP & PAP assistance for hassle-free travel to Arunachal Pradesh, Nagaland, Mizoram & more. Fast processing, 100% success rate.",
    images: ["/images/og/permits-og.jpg"],
  },
  alternates: {
    canonical: "https://travelspirene.com/permits",
  },
  other: {
    "article:section": "Travel Services",
    "article:tag": "Permit Assistance, ILP, PAP, Northeast India Travel",
  },
};

// JSON-LD Structured Data for the permits page
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Northeast India Travel Permit Assistance",
  "description": "Expert assistance for obtaining Inner Line Permits (ILP) and Protected Area Permits (PAP) for travel to restricted areas in Northeast India including Arunachal Pradesh, Nagaland, Mizoram, and Manipur.",
  "provider": {
    "@type": "TravelAgency",
    "name": "TravelSpire North-East",
    "url": "https://travelspirene.com",
    "telephone": "+91-9864141211",
    "email": "info@travelspirene.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "HSR Layout",
      "addressLocality": "Dibrugarh",
      "addressRegion": "Assam",
      "postalCode": "786001",
      "addressCountry": "IN"
    }
  },
  "serviceType": "Travel Permit Processing",
  "areaServed": [
    {
      "@type": "State",
      "name": "Arunachal Pradesh",
      "containedInPlace": {
        "@type": "Country",
        "name": "India"
      }
    },
    {
      "@type": "State",
      "name": "Nagaland",
      "containedInPlace": {
        "@type": "Country",
        "name": "India"
      }
    },
    {
      "@type": "State",
      "name": "Mizoram",
      "containedInPlace": {
        "@type": "Country",
        "name": "India"
      }
    },
    {
      "@type": "State",
      "name": "Manipur",
      "containedInPlace": {
        "@type": "Country",
        "name": "India"
      }
    },
    {
      "@type": "State",
      "name": "Sikkim",
      "containedInPlace": {
        "@type": "Country",
        "name": "India"
      }
    }
  ],
  "offers": {
    "@type": "Offer",
    "description": "Complete permit processing assistance including documentation, submission, and delivery",
    "availability": "https://schema.org/InStock"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Permit Types",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Inner Line Permit (ILP)",
          "description": "For Indian citizens visiting Arunachal Pradesh, Nagaland, Mizoram, and Manipur"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Protected Area Permit (PAP)",
          "description": "For foreign nationals visiting restricted areas in Northeast India"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Restricted Area Permit (RAP)",
          "description": "For visiting highly sensitive border areas and military zones"
        }
      }
    ]
  }
};

// FAQ Structured Data
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How early should I apply for Northeast India travel permits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For Indian citizens, apply at least 5-7 days before travel. For foreign nationals, apply 3-4 weeks in advance as PAP processing takes longer and requires additional verifications."
      }
    },
    {
      "@type": "Question",
      "name": "Can I extend my Inner Line Permit while traveling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! ILP can be extended at the district headquarters of the state you're visiting. Extensions are usually granted for valid reasons."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I travel without a permit in Northeast India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traveling without required permits is a serious offense. You can be detained, fined heavily, and deported from the protected area. There are checkpoints at all entry points."
      }
    },
    {
      "@type": "Question",
      "name": "Do children need separate permits for Northeast India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, everyone including children requires their own permit. For minors, the parent/guardian's details are included in the application along with the child's identity proof."
      }
    },
    {
      "@type": "Question",
      "name": "Can foreign nationals visit Arunachal Pradesh solo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, foreign nationals must travel in groups of minimum 2 people and must book through a registered tour operator. This is a government requirement for Protected Area Permits."
      }
    },
    {
      "@type": "Question",
      "name": "Which Northeast Indian states require travel permits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Arunachal Pradesh, Nagaland, Mizoram, and Manipur require Inner Line Permits (ILP) for Indian citizens. Meghalaya, Assam, and Tripura do not require permits. Sikkim requires permits only for restricted areas like Nathula Pass."
      }
    }
  ]
};

export default function PermitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      {children}
    </>
  );
}
