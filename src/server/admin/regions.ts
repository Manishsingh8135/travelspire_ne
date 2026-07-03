import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Region } from "@/lib/supabase/types";
import { type TableQuery, pageRange } from "@/features/admin/ui/table-state";
import { sanitizeTerm, countByStatus, type EntityCounts } from "./query";

const REGION_SORT: Record<string, string> = {
  name: "name",
  level: "level",
  status: "status",
  updated: "updated_at",
};

export async function listRegionsForAdmin(
  query: TableQuery,
): Promise<{ rows: Region[]; total: number }> {
  const sb = createSupabaseAdminClient();
  let q = sb.from("regions").select("*", { count: "exact" }).is("deleted_at", null);

  if (query.q) {
    const t = sanitizeTerm(query.q);
    if (t) q = q.or(`name.ilike.%${t}%,slug.ilike.%${t}%`);
  }
  if (query.filters.status)
    q = q.eq("status", query.filters.status as "draft" | "published" | "archived");
  if (query.filters.level) q = q.eq("level", query.filters.level);

  const col = query.sort ? REGION_SORT[query.sort] : undefined;
  q = q.order(col ?? "created_at", { ascending: col ? query.dir === "asc" : false });

  const [from, to] = pageRange(query.page, query.pageSize);
  const { data, error, count } = await q.range(from, to);
  if (error) throw error;
  return { rows: data ?? [], total: count ?? 0 };
}

export async function getRegionForAdmin(id: string): Promise<Region | null> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb.from("regions").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export type AdminCounts = {
  regions: EntityCounts;
  places: EntityCounts;
  tours: EntityCounts;
};

/** Real head-count aggregates for the dashboard + rail badges. */
export async function getAdminCounts(): Promise<AdminCounts> {
  const [regions, places, tours] = await Promise.all([
    countByStatus("regions"),
    countByStatus("places"),
    countByStatus("tours"),
  ]);
  return { regions, places, tours };
}
