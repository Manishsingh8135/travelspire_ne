import { createBrowserClient } from "@supabase/ssr";
import { requireSupabaseEnv } from "@/lib/env";
import type { Database } from "@/db/database.types";

/** Supabase client for browser/client components. RLS applies (anon/authed). */
export function createSupabaseBrowserClient() {
  const { url, key } = requireSupabaseEnv();
  return createBrowserClient<Database>(url, key);
}
