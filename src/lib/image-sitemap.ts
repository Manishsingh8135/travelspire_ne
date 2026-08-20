// Image Sitemap Generator for Better SEO
import { getAllPlaceImages } from "@/data/seo/image-seo-data";
import {
  circuitMeta,
  circuitSeoImages,
} from "@/data/expeditions/mechuka-dong-anini";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function generateImageSitemap() {
  const images = getAllPlaceImages();

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images
  .map(
    (image) => `
  <url>
    <loc>https://travelspirene.com/tours</loc>
    <image:image>
      <image:loc>${escapeXml(`https://travelspirene.com${image.src}`)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.alt)}</image:caption>
    </image:image>
  </url>`,
  )
  .join("")}
${circuitSeoImages
  .map(
    (image) => `
  <url>
    <loc>${escapeXml(circuitMeta.url)}</loc>
    <image:image>
      <image:loc>${escapeXml(`https://travelspirene.com${image.src}`)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.alt)}</image:caption>
    </image:image>
  </url>`,
  )
  .join("")}
</urlset>`;

  return sitemapContent;
}

// Generate robots.txt entry for image sitemap
export function generateRobotsImageEntry() {
  return `
# Image Sitemap
Sitemap: https://travelspirene.com/image-sitemap.xml
`;
}
