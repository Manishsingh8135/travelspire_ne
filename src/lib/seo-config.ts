// lib/seo-config.ts
import { Metadata } from 'next'

export const siteConfig = {
  name: "Travelspire North-East",
  description: "Experience authentic travel experiences in North-East India. Discover hidden gems, local culture, and breathtaking landscapes with expert local guides.",
  url: "https://travelspirene.com",
  ogImage: "/images/logo/Travelspire_ne_logo_new.png",
  creator: "Travelspire North-East",
  keywords: [
    "North East India travel",
    "Arunachal Pradesh tours", 
    "Assam tourism",
    "Meghalaya trips",
    "Nagaland tours", 
    "Manipur travel",
    "Mizoram tours",
    "Tripura tourism",
    "authentic travel experiences",
    "local culture",
    "adventure tourism",
    "eco tourism",
    "heritage tourism",
    "trekking Northeast India",
    "wildlife tours",
    "festival tours",
    "offbeat destinations",
    "responsible tourism",
    "Travelspire NE"
  ]
}

export function generateSEOMetadata({
  title,
  description, 
  path = '',
  image,
  noIndex = false,
  keywords = []
}: {
  title?: string
  description?: string 
  path?: string
  image?: string
  noIndex?: boolean
  keywords?: string[]
}): Metadata {
  const seo = {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    canonical: `${siteConfig.url}${path}`,
    image: image || siteConfig.ogImage
  }

  return {
    title: seo.title,
    description: seo.description,
    keywords: [...siteConfig.keywords, ...keywords],
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    alternates: {
      canonical: seo.canonical
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large", 
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      siteName: siteConfig.name,
      images: [
        {
          url: seo.image.startsWith('http') ? seo.image : `${siteConfig.url}${seo.image}`,
          width: 1200,
          height: 630,
          alt: seo.title
        }
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      creator: "@travelspire_ne",
      images: [seo.image.startsWith('http') ? seo.image : `${siteConfig.url}${seo.image}`],
    },
    manifest: "/manifest.json",
  }
}
