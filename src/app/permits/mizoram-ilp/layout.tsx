import { Metadata } from "next";
import { mizoramPermitData } from "@/data/permits/mizoram-data";

const data = mizoramPermitData;

export const metadata: Metadata = {
  title: data.seo.title,
  description: data.seo.description,
  keywords: data.seo.keywords,
  authors: [{ name: "TravelSpire NE", url: "https://travelspirene.com" }],
  alternates: { canonical: data.seo.canonical },
  openGraph: {
    type: "article",
    locale: "en_IN",
    url: data.seo.canonical,
    siteName: "TravelSpire NE",
    title: data.seo.title,
    description: data.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: data.seo.title,
    description: data.seo.description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: data.seo.title,
      description: data.seo.description,
      dateModified: new Date().toISOString(),
      author: { "@type": "Organization", name: "TravelSpire NE" },
    },
    {
      "@type": "FAQPage",
      mainEntity: data.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://travelspirene.com" },
        { "@type": "ListItem", position: 2, name: "Permits", item: "https://travelspirene.com/permits" },
        { "@type": "ListItem", position: 3, name: "Mizoram ILP", item: data.seo.canonical },
      ],
    },
  ],
};

export default function MizoramILPLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
