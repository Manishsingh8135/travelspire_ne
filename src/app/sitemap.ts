// app/sitemap.ts
import { MetadataRoute } from "next";
import { allTours } from "@/data/tours";
import { statePermitPages } from "@/data/permits";
import { SITE_URL } from "@/lib/site";

// Every URL here must return 200 and be one we want indexed.
//
// No `lastModified`: stamping every page with the build time told search
// engines everything changed on every deploy, which teaches them to ignore
// the field. Add a real date per entry only when we track one.

type Entry = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

const staticPages: Entry[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/all-tours", changeFrequency: "weekly", priority: 0.9 },
  { path: "/permits", changeFrequency: "monthly", priority: 0.9 },
  { path: "/places/anini", changeFrequency: "monthly", priority: 0.9 },
  { path: "/places/dibang-valley", changeFrequency: "monthly", priority: 0.9 },
  { path: "/places/dambuk", changeFrequency: "monthly", priority: 0.8 },
  { path: "/places/roing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/guides/dibrugarh-to-anini", changeFrequency: "monthly", priority: 0.9 },
  // Evergreen festival hub: one URL that collects every year's searches.
  { path: "/hornbill-festival", changeFrequency: "weekly", priority: 0.95 },
  // Festival pages stay indexed after their edition: they carry the
  // next-edition searches and hand visitors to the evergreen guides.
  { path: "/anini-winter-fest-2026", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ziro-music-festival-2026", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.6 },
  { path: "/booking-policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
];

const flagshipTours = new Set([
  "anini-pomo-grassland-expedition",
  "mechuka-dong-anini-tour-package",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Every tour lives at /tours/<slug>, finished festival editions included.
  const tourPages: MetadataRoute.Sitemap = allTours.map((tour) => ({
    url: `${SITE_URL}/tours/${tour.slug}`,
    changeFrequency: "monthly",
    priority: flagshipTours.has(tour.slug) ? 0.95 : 0.8,
  }));

  const permitPages: MetadataRoute.Sitemap = statePermitPages.map((permit) => ({
    url: `${SITE_URL}/permits/${permit.slug}`,
    changeFrequency: "monthly",
    priority: permit.priority,
  }));

  return [...pages, ...tourPages, ...permitPages];
}
