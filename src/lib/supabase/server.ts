import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { requireSupabaseEnv } from "@/lib/env";
import type { Database } from "@/db/database.types";

/**
 * Supabase client for Server Components, Server Actions and Route Handlers.
 * Reads/writes the auth session via Next cookies. RLS applies (anon/authed).
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const { url, key } = requireSupabaseEnv();

  return createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component — cookies are read-only here.
          // Session refresh is handled in middleware (added in the auth phase).
        }
      },
    },
  });
}
