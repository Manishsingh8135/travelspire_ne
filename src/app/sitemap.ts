// app/sitemap.ts
import { MetadataRoute } from 'next'
import { regularTours } from '@/data/tours/tour-data'
import { festivalTours } from '@/data/tours/festival-data'
import { statePermitPages } from '@/data/permits'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://travelspirene.com'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/all-tours`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/permits`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/booking-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/ziro-music-festival-2026`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ]

  // Dynamic tour pages
  const tourPages: MetadataRoute.Sitemap = regularTours.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Dynamic festival pages  
  const festivalPages: MetadataRoute.Sitemap = festivalTours.map((festival) => ({
    url: `${baseUrl}/festivals/${festival.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // State-specific permit pages (high priority for SEO)
  const permitPages: MetadataRoute.Sitemap = statePermitPages.map((permit) => ({
    url: `${baseUrl}/permits/${permit.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: permit.priority,
  }))

  return [...staticPages, ...tourPages, ...festivalPages, ...permitPages]
}
