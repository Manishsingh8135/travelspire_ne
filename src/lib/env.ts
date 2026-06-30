import { z } from "zod";

/**
 * Client-safe environment — NEXT_PUBLIC_* only, so this module is safe to import
 * from the browser. Server-only secrets (service-role key, admin allowlist) live
 * in `@/lib/env.server` and must never be imported by client code.
 *
 * Supabase key system: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (sb_publishable_…,
 * browser-safe, replaces the old anon key). Legacy anon name accepted as fallback.
 */
const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),

  NEXT_PUBLIC_SUPABASE_URL: z.url().optional(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(), // legacy fallback

  NEXT_PUBLIC_MAPBOX_TOKEN: z.string().min(1).optional(),
});

export const env = EnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
});

/** Browser/anon-tier Supabase credentials (publishable key; RLS applies). */
export function requireSupabaseEnv(): { url: string; key: string } {
  const key =
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !key) {
    throw new Error(
      "Supabase env missing — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (see .env.example).",
    );
  }
  return { url: env.NEXT_PUBLIC_SUPABASE_URL, key };
}
