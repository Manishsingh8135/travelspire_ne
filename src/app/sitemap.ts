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
    },
    {
      url: `${baseUrl}/anini-winter-fest-2026`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/places/anini`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/places/dibang-valley`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/places/dambuk`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/places/roing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/dibrugarh-to-anini`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    }
  ]

  // Dynamic tour pages — every tour (regular + festival) lives at /tours/<slug>;
  // there is no /festivals/* route, so never emit one.
  const tourPages: MetadataRoute.Sitemap = [...regularTours, ...festivalTours].map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: tour.slug === 'anini-pomo-grassland-expedition' ? 0.95 : 0.8,
  }))

  // NOTE: /festivals/* pages don't exist as routes — festival cards link to
  // /tours/<slug> instead. Never list URLs here that don't return 200.

  // State-specific permit pages (high priority for SEO)
  const permitPages: MetadataRoute.Sitemap = statePermitPages.map((permit) => ({
    url: `${baseUrl}/permits/${permit.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: permit.priority,
  }))

  return [...staticPages, ...tourPages, ...permitPages]
}
