// components/seo/structured-data.tsx
import Script from 'next/script';

interface StructuredDataProps {
  data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// components/seo/page-seo.tsx  
import { Metadata } from 'next';
import { StructuredData } from './structured-data';

interface PageSEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: Record<string, unknown>;
  breadcrumbs?: Array<{name: string, url: string}>;
}

export function generatePageMetadata({
  title,
  description,
  canonical,
  ogImage = '/images/logo/Travelspire_ne_logo_new.png',
}: Omit<PageSEOProps, 'structuredData' | 'breadcrumbs'>): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: canonical || undefined,
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export function PageSEO({ 
  structuredData, 
  breadcrumbs 
}: Pick<PageSEOProps, 'structuredData' | 'breadcrumbs'>) {
  return (
    <>
      {structuredData && <StructuredData data={structuredData} />}
      
      {breadcrumbs && (
        <StructuredData 
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "item": item.url
            }))
          }} 
        />
      )}
    </>
  );
}
