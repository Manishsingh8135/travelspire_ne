// Image Sitemap Generator for Better SEO
import {
  getAllPlaceImages,
  mechuka2026Images,
  anini2026Images,
  type PlaceImage,
} from "@/data/seo/image-seo-data";
import {
  circuitMeta,
  circuitSeoImages,
} from "@/data/expeditions/mechuka-dong-anini";
import { sixMeta } from "@/data/expeditions/anini-six-days";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function imageEntry(
  pageUrl: string,
  image: { src: string; title: string; alt: string },
): string {
  return `
  <url>
    <loc>${escapeXml(pageUrl)}</loc>
    <image:image>
      <image:loc>${escapeXml(`https://travelspirene.com${image.src}`)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.alt)}</image:caption>
    </image:image>
  </url>`;
}

function fromPlaceImage(image: PlaceImage): {
  src: string;
  title: string;
  alt: string;
} {
  return { src: image.src, title: image.title, alt: image.alt };
}

export function generateImageSitemap() {
  const images = getAllPlaceImages();
  const mechukaExpeditionUrl =
    "https://travelspirene.com/tours/mechuka-expedition";
  const aniniPlaceUrl = "https://travelspirene.com/places/anini";
  const dibangUrl = "https://travelspirene.com/places/dibang-valley";
  const pomoTrekUrl = "https://travelspirene.com/tours/pomo-trek-expedition";
  const aniniTourUrl = "https://travelspirene.com/tours/anini-expedition";
  const galleryUrl = "https://travelspirene.com/gallery";

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images.map((image) => imageEntry(galleryUrl, fromPlaceImage(image))).join("")}
${mechuka2026Images
  .map((image) => imageEntry(mechukaExpeditionUrl, fromPlaceImage(image)))
  .join("")}
${anini2026Images
  .map((image) => imageEntry(aniniPlaceUrl, fromPlaceImage(image)))
  .join("")}
${anini2026Images
  .map((image) => imageEntry(dibangUrl, fromPlaceImage(image)))
  .join("")}
${anini2026Images
  .map((image) => imageEntry(sixMeta.url, fromPlaceImage(image)))
  .join("")}
${anini2026Images
  .map((image) => imageEntry(pomoTrekUrl, fromPlaceImage(image)))
  .join("")}
${anini2026Images
  .map((image) => imageEntry(aniniTourUrl, fromPlaceImage(image)))
  .join("")}
${circuitSeoImages
  .map((image) => imageEntry(circuitMeta.url, image))
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
