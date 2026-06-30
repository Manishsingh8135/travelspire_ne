import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseEnv } from "@/lib/env";
import { requireSupabaseSecretKey } from "@/lib/env.server";
import type { Database } from "@/db/database.types";

let cached: SupabaseClient<Database> | null = null;

/**
 * Service-role client — **BYPASSES RLS**. Server-only, for admin writes and
 * seeding after the caller has authorized (see requireAdmin). Never expose to
 * the client or use it for unauthenticated requests.
 */
export function createSupabaseAdminClient(): SupabaseClient<Database> {
  if (cached) return cached;
  const { url } = requireSupabaseEnv();
  const secret = requireSupabaseSecretKey();
  cached = createClient<Database>(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
