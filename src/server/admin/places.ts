import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { HeroMedia } from "@/lib/media";
import type { Place } from "@/lib/supabase/types";
import { type TableQuery, pageRange } from "@/features/admin/ui/table-state";
import { sanitizeTerm } from "./query";

export type AdminPlace = Place & { region_name: string | null };
export type AdminPlaceDetail = Place & { hero: HeroMedia | null };
export type RegionOption = { id: string; name: string };

const PLACE_SORT: Record<string, string> = {
  name: "name",
  status: "status",
  kind: "kind",
  elevation: "elevation_m",
  updated: "updated_at",
};

export async function listPlacesForAdmin(
  query: TableQuery,
): Promise<{ rows: AdminPlace[]; total: number }> {
  const sb = createSupabaseAdminClient();
  let q = sb
    .from("places")
    .select("*, region:regions(name)", { count: "exact" })
    .is("deleted_at", null);

  if (query.q) {
    const t = sanitizeTerm(query.q);
    if (t) q = q.or(`name.ilike.%${t}%,slug.ilike.%${t}%`);
  }
  if (query.filters.status)
    q = q.eq("status", query.filters.status as "draft" | "published" | "archived");
  if (query.filters.kind) q = q.eq("kind", query.filters.kind as Place["kind"]);
  if (query.filters.region) q = q.eq("region_id", query.filters.region);
  if (query.filters.secret === "yes") q = q.eq("is_secret", true);
  else if (query.filters.secret === "no") q = q.eq("is_secret", false);

  const col = query.sort ? PLACE_SORT[query.sort] : undefined;
  q = q.order(col ?? "created_at", { ascending: col ? query.dir === "asc" : false });

  const [from, to] = pageRange(query.page, query.pageSize);
  const { data, error, count } = await q.range(from, to);
  if (error) throw error;

  const rows = ((data ?? []) as (Place & { region: { name: string } | null })[]).map((p) => {
    const { region, ...rest } = p;
    return { ...rest, region_name: region?.name ?? null };
  });
  return { rows, total: count ?? 0 };
}

export async function getPlaceForAdmin(id: string): Promise<AdminPlaceDetail | null> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb
    .from("places")
    .select("*, hero:media!hero_media_id(storage_path, alt)")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as unknown as AdminPlaceDetail | null;
}

export async function getRegionOptions(): Promise<RegionOption[]> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb
    .from("regions")
    .select("id, name")
    .is("deleted_at", null)
    .order("name");
  if (error) throw error;
  return data ?? [];
}
