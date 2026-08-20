import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
