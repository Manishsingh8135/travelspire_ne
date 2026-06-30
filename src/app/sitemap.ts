import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { getPlacesInRegion, getRegions } from "@/server/atlas";
import { getPublishedTours } from "@/server/tours";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.NEXT_PUBLIC_SITE_URL;

  const entries: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tours`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const tours = await getPublishedTours();
  for (const tour of tours) {
    entries.push({
      url: `${base}/tours/${tour.slug}`,
      lastModified: tour.updated_at,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  const regions = await getRegions();
  for (const region of regions) {
    entries.push({
      url: `${base}/${region.slug}`,
      lastModified: region.updated_at,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    const places = await getPlacesInRegion(region.id);
    for (const place of places) {
      entries.push({
        url: `${base}/${region.slug}/${place.slug}`,
        lastModified: place.updated_at,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
