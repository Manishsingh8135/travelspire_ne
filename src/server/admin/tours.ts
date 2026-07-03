import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { HeroMedia } from "@/lib/media";
import type { Tour } from "@/lib/supabase/types";
import { type TableQuery, pageRange } from "@/features/admin/ui/table-state";
import { sanitizeTerm } from "./query";

export type AdminTour = Tour & { hero: HeroMedia | null };

const TOUR_SORT: Record<string, string> = {
  title: "title",
  status: "status",
  type: "type",
  difficulty: "difficulty",
  days: "duration_days",
  price: "price_inr",
  updated: "updated_at",
};

export async function listToursForAdmin(
  query: TableQuery,
): Promise<{ rows: AdminTour[]; total: number }> {
  const sb = createSupabaseAdminClient();
  let q = sb
    .from("tours")
    .select("*, hero:media!hero_media_id(storage_path, alt)", { count: "exact" })
    .is("deleted_at", null);

  if (query.q) {
    const t = sanitizeTerm(query.q);
    if (t) q = q.or(`title.ilike.%${t}%,slug.ilike.%${t}%`);
  }
  if (query.filters.status)
    q = q.eq("status", query.filters.status as "draft" | "published" | "archived");
  if (query.filters.type) q = q.eq("type", query.filters.type as Tour["type"]);
  if (query.filters.difficulty)
    q = q.eq("difficulty", query.filters.difficulty as Tour["difficulty"]);
  if (query.filters.region) q = q.eq("region_id", query.filters.region);

  const col = query.sort ? TOUR_SORT[query.sort] : undefined;
  q = q.order(col ?? "created_at", { ascending: col ? query.dir === "asc" : false });

  const [from, to] = pageRange(query.page, query.pageSize);
  const { data, error, count } = await q.range(from, to);
  if (error) throw error;
  return { rows: (data ?? []) as unknown as AdminTour[], total: count ?? 0 };
}

export async function getTourForAdmin(id: string): Promise<AdminTour | null> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb
    .from("tours")
    .select("*, hero:media!hero_media_id(storage_path, alt)")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as unknown as AdminTour | null;
}

export async function getRegionOptions(): Promise<{ id: string; name: string }[]> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb
    .from("regions")
    .select("id, name")
    .is("deleted_at", null)
    .order("name");
  if (error) throw error;
  return data ?? [];
}
