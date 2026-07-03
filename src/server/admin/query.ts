import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type ContentTable = "tours" | "places" | "regions";

export type EntityCounts = {
  total: number;
  published: number;
  draft: number;
  archived: number;
};

/** Neutralize PostgREST `.or()` syntax chars in a user search term. */
export function sanitizeTerm(q: string): string {
  return q.replace(/[,()*%]/g, " ").trim().slice(0, 80);
}

/** Head-only status counts for one content table (no rows pulled). */
export async function countByStatus(table: ContentTable): Promise<EntityCounts> {
  const sb = createSupabaseAdminClient();
  const live = () =>
    sb.from(table).select("*", { count: "exact", head: true }).is("deleted_at", null);
  const [total, published, draft, archived] = await Promise.all([
    live(),
    live().eq("status", "published"),
    live().eq("status", "draft"),
    live().eq("status", "archived"),
  ]);
  const err = total.error ?? published.error ?? draft.error ?? archived.error;
  if (err) throw err;
  return {
    total: total.count ?? 0,
    published: published.count ?? 0,
    draft: draft.count ?? 0,
    archived: archived.count ?? 0,
  };
}
