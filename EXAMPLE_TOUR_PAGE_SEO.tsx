// Example: Enhanced tour page with full SEO implementation
// app/tours/tawang-expedition/page.tsx

import { Metadata } from 'next'
import { StructuredData } from '@/components/seo/structured-data'
import { PageSEO } from '@/components/seo/page-seo'
import { generateTourPackageSchema, generateBreadcrumbSchema } from '@/lib/structured-data'
import { regularTours } from '@/data/tours/tour-data'

// Get tour data
const tawangTour = regularTours.find(tour => tour.slug === 'tawang-expedition')!

export const metadata: Metadata = {
  title: "Tawang Expedition | 6 Days Monastery & Himalayan Adventure ₹16,499",
  description: "Explore Tawang Monastery, birthplace of 6th Dalai Lama, with our expertly curated 6-day expedition. High-altitude landscapes, Tibetan Buddhism, and authentic cultural immersion in Arunachal Pradesh.",
  keywords: [
    "Tawang tour",
    "Tawang Monastery",
    "Arunachal Pradesh tour", 
    "6th Dalai Lama birthplace",
    "Himalayan adventure",
    "Tibet border tour",
    "Buddhist monastery tour",
    "high altitude trekking",
    "Tawang War Memorial",
    "Madhuri Lake",
    "Sela Pass",
    "Bumla Pass",
    "Indo-China border",
    "Tibetan Buddhism",
    "mountain expedition India"
  ],
  openGraph: {
    title: "Tawang Expedition | 6 Days Monastery & Himalayan Adventure",
    description: "Explore the mystical land of Tawang - birthplace of 6th Dalai Lama, featuring the magnificent Tawang Monastery and breathtaking Himalayan landscapes.",
    images: ["/images/places/tawang/tawang-monastery-dawn.jpeg"],
    url: "https://travelspirene.com/tours/tawang-expedition"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tawang Expedition | Himalayan Buddhist Adventure",
    description: "6 days exploring Tawang Monastery, Sela Pass, and Indo-China border",
    images: ["/images/places/tawang/tawang-monastery-dawn.jpeg"]
  },
  alternates: {
    canonical: "https://travelspirene.com/tours/tawang-expedition"
  }
}

const breadcrumbs = [
  { name: "Home", url: "https://travelspirene.com" },
  { name: "Tours", url: "https://travelspirene.com/all-tours" },
  { name: "Tawang Expedition", url: "https://travelspirene.com/tours/tawang-expedition" }
]

export default function TawangExpeditionPage() {
  const tourSchema = generateTourPackageSchema({
    title: tawangTour.title,
    description: tawangTour.overview,
    price: tawangTour.price,
    duration: tawangTour.duration,
    difficulty: tawangTour.difficulty,
    heroImage: tawangTour.heroImage,
    itinerary: tawangTour.itinerary
  })

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

  return (
    <>
      {/* SEO Components */}
      <StructuredData data={tourSchema} />
      <StructuredData data={breadcrumbSchema} />
      <PageSEO breadcrumbs={breadcrumbs} />
      
      {/* Your existing tour page component */}
      <div className="tour-page">
        <h1>Tawang Expedition - Sacred Himalayan Journey</h1>
        <p>Experience the spiritual heart of the Eastern Himalayas...</p>
        {/* Rest of your tour content */}
      </div>
    </>
  )
}
