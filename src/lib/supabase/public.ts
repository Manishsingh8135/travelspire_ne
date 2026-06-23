import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseEnv } from "@/lib/env";
import type { Database } from "@/db/database.types";

let cached: SupabaseClient<Database> | null = null;

/**
 * Anonymous, cookie-less Supabase client for PUBLIC reads (atlas, SEO pages).
 * No session = pages stay statically renderable / ISR-cacheable. RLS still
 * applies (anon role → published rows only).
 */
export function createSupabasePublicClient(): SupabaseClient<Database> {
  if (cached) return cached;
  const { url, key } = requireSupabaseEnv();
  cached = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
