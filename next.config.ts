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
    ];
  },
  images: {
    // The photography is shot at 3–12 MP; AVIF roughly halves WebP again on
    // these large landscape frames.
    formats: ['image/avif', 'image/webp'],
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
