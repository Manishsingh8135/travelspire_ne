// Image Sitemap Generator for Better SEO
import { getAllPlaceImages } from '@/data/seo/image-seo-data';

export function generateImageSitemap() {
  const images = getAllPlaceImages();
  
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images.map(image => `
  <url>
    <loc>https://travelspirene.com/tours</loc>
    <image:image>
      <image:loc>https://travelspirene.com${image.src}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.alt}</image:caption>
    </image:image>
  </url>`).join('')}
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
