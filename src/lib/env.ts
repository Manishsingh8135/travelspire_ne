import { z } from "zod";

/**
 * Validated environment. Keys are optional at import time so the app builds
 * without secrets; helpers below fail fast when a feature actually needs them.
 * See .env.example for the full list.
 *
 * Supabase's new key system: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (sb_publishable_…,
 * browser-safe, replaces the old anon key) and SUPABASE_SECRET_KEY (sb_secret_…,
 * server-only, replaces service_role). Legacy names are still accepted as fallback.
 */
const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),

  NEXT_PUBLIC_SUPABASE_URL: z.url().optional(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(), // legacy fallback
  SUPABASE_SECRET_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(), // legacy fallback
});

export const env = EnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
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

/** Server-only secret key (admin writes, seeding; bypasses RLS). Never expose to the client. */
export function requireSupabaseSecretKey(): string {
  const secret = env.SUPABASE_SECRET_KEY ?? env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) {
    throw new Error(
      "SUPABASE_SECRET_KEY missing — the server-only admin key (sb_secret_…). Never prefix with NEXT_PUBLIC.",
    );
  }
  return secret;
}
