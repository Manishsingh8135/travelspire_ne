import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    // AVIF first, then WebP — see docs-new/04-content-seo/02-image-seo.md
    formats: ["image/avif", "image/webp"],
    // Next 16 requires an explicit allowlist; an Image `quality` prop must match.
    qualities: [60, 75, 90],
    // Media is immutable / content-hashed — cache optimized variants 31 days.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      // Supabase Storage (public + transformed). Project ref filled in via env at deploy.
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/**" },
      { protocol: "https", hostname: "*.supabase.in", pathname: "/storage/v1/object/**" },
    ],
  },
};

export default nextConfig;
