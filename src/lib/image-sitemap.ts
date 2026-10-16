// Image sitemap: one <url> per page, listing every image that page shows.
// Google stopped reading image:title and image:caption in 2022, so only the
// image location is emitted; alt text on the page itself carries the meaning.
import {
  getAllPlaceImages,
  placeImagesData,
  mechuka2026Images,
  anini2026Images,
} from "@/data/seo/image-seo-data";
import {
  circuitMeta,
  circuitSeoImages,
} from "@/data/expeditions/mechuka-dong-anini";
import { sixMeta } from "@/data/expeditions/anini-six-days";
import { SITE_URL } from "@/lib/site";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function absolute(pathOrUrl: string): string {
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}

function pageEntry(page: string, images: { src: string }[]): string {
  const sources = [...new Set(images.map((image) => image.src))];
  const imageTags = sources
    .map(
      (src) => `
    <image:image>
      <image:loc>${escapeXml(absolute(src))}</image:loc>
    </image:image>`,
    )
    .join("");

  return `
  <url>
    <loc>${escapeXml(absolute(page))}</loc>${imageTags}
  </url>`;
}

export function generateImageSitemap() {
  const pages: [string, { src: string }[]][] = [
    ["/gallery", getAllPlaceImages()],
    ["/tours/mechuka-expedition", mechuka2026Images],
    ["/places/anini", anini2026Images],
    ["/places/dibang-valley", anini2026Images],
    [sixMeta.url, anini2026Images],
    ["/tours/pomo-trek-expedition", anini2026Images],
    ["/tours/anini-expedition", anini2026Images],
    [circuitMeta.url, circuitSeoImages],
    ["/hornbill-festival", placeImagesData.hornbill],
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${pages
    .map(([page, images]) => pageEntry(page, images))
    .join("")}
</urlset>
`;
}
