import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { getPlacesInRegion, getRegions } from "@/server/atlas";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.NEXT_PUBLIC_SITE_URL;

  const entries: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
  ];

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
