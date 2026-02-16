// app/image-sitemap.xml/route.ts
import { generateImageSitemap } from '@/lib/image-sitemap';

export async function GET() {
  const sitemap = generateImageSitemap();

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}
