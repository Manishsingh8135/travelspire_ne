import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /tours was an older duplicate of the catalogue; /all-tours is the one
      // in the nav and the sitemap. Tour pages stay at /tours/[slug].
      { source: "/tours", destination: "/all-tours", permanent: true },
      // Legacy festival URL. Permanent so search engines move its signals.
      {
        source: "/ziro-festival",
        destination: "/ziro-music-festival-2026",
        permanent: true,
      },
      // The Dambuk/OFAM packages are off sale for 2026 (no Orange Festival in
      // Dambuk this year). Temporary, so the URLs keep their history for when
      // the packages come back.
      ...[
        "orange-festival-2026",
        "dambuk-anini-ofam",
        "dambuk-golden-pagoda-ofam",
        "dambuk-dong-valley-ofam",
      ].map((slug) => ({
        source: `/tours/${slug}`,
        destination: "/places/dambuk",
        permanent: false,
      })),
    ];
  },
  images: {
    // WebP only: AVIF is smaller but several times slower to encode, and on
    // a cold cache that delay is what visitors see as "broken" photos. The
    // source photographs are capped at 2560 px, and optimised copies are
    // immutable, so they can be cached for a year.
    formats: ['image/webp'],
    minimumCacheTTL: 31536000,
    // domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/**',
      },
    ]
  },
};

export default nextConfig;
