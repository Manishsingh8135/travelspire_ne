import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    // AVIF first, then WebP — see docs-new/04-content-seo/02-image-seo.md
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Supabase Storage (public + transformed). Project ref filled in via env at deploy.
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/**" },
      { protocol: "https", hostname: "*.supabase.in", pathname: "/storage/v1/object/**" },
    ],
  },
};

export default nextConfig;
