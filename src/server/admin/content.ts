import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Tables } from "@/lib/supabase/types";
import { type TableQuery, pageRange } from "@/features/admin/ui/table-state";
import { sanitizeTerm } from "./query";

/**
 * Admin reads for the calendar/culture/permit entities (festivals, tribes,
 * permit_zones) — the same TableQuery contract the other lists use.
 */

export type AdminFestival = Tables<"festivals"> & {
  tribe: { name: string } | null;
  place: { name: string } | null;
};
export type AdminTribe = Tables<"tribes">;
export type AdminPermit = Tables<"permit_zones">;
export type AdminEvent = Tables<"events">;

const SORT: Record<string, string> = {
  name: "name",
  status: "status",
  updated: "updated_at",
  verified: "last_verified_at",
};

function applyCommon<
  Q extends {
    or: (f: string) => Q;
    eq: (c: string, v: string) => Q;
    order: (c: string, o: { ascending: boolean }) => Q;
  },
>(q: Q, query: TableQuery): Q {
  if (query.q) {
    const t = sanitizeTerm(query.q);
    if (t) q = q.or(`name.ilike.%${t}%,slug.ilike.%${t}%`);
  }
  if (query.filters.status) q = q.eq("status", query.filters.status);
  const col = query.sort ? SORT[query.sort] : undefined;
  return q.order(col ?? "updated_at", { ascending: col ? query.dir === "asc" : false });
}

export async function listFestivalsForAdmin(
  query: TableQuery,
): Promise<{ rows: AdminFestival[]; total: number }> {
  const sb = createSupabaseAdminClient();
  let q = sb
    .from("festivals")
    .select("*, tribe:tribes!tribe_id(name), place:places!place_id(name)", { count: "exact" })
    .is("deleted_at", null);
  q = applyCommon(q, query);
  const [from, to] = pageRange(query.page, query.pageSize);
  const { data, error, count } = await q.range(from, to);
  if (error) throw error;
  return { rows: (data ?? []) as unknown as AdminFestival[], total: count ?? 0 };
}

export async function getFestivalForAdmin(
  id: string,
): Promise<{ festival: AdminFestival; events: AdminEvent[] } | null> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb
    .from("festivals")
    .select("*, tribe:tribes!tribe_id(name), place:places!place_id(name)")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const { data: events, error: evErr } = await sb
    .from("events")
    .select("*")
    .eq("festival_id", id)
    .order("starts_on");
  if (evErr) throw evErr;
  return { festival: data as unknown as AdminFestival, events: events ?? [] };
}

export async function listTribesForAdmin(
  query: TableQuery,
): Promise<{ rows: AdminTribe[]; total: number }> {
  const sb = createSupabaseAdminClient();
  let q = sb.from("tribes").select("*", { count: "exact" }).is("deleted_at", null);
  q = applyCommon(q, query);
  const [from, to] = pageRange(query.page, query.pageSize);
  const { data, error, count } = await q.range(from, to);
  if (error) throw error;
  return { rows: data ?? [], total: count ?? 0 };
}

export async function getTribeForAdmin(id: string): Promise<AdminTribe | null> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb.from("tribes").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export async function listPermitsForAdmin(
  query: TableQuery,
): Promise<{ rows: AdminPermit[]; total: number }> {
  const sb = createSupabaseAdminClient();
  let q = sb.from("permit_zones").select("*", { count: "exact" }).is("deleted_at", null);
  q = applyCommon(q, query);
  const [from, to] = pageRange(query.page, query.pageSize);
  const { data, error, count } = await q.range(from, to);
  if (error) throw error;
  return { rows: data ?? [], total: count ?? 0 };
}

export async function getTribeOptions(): Promise<{ id: string; name: string }[]> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb
    .from("tribes")
    .select("id, name")
    .is("deleted_at", null)
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export async function getPlaceOptions(): Promise<{ id: string; name: string }[]> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb
    .from("places")
    .select("id, name")
    .is("deleted_at", null)
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export async function getPermitForAdmin(id: string): Promise<AdminPermit | null> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb.from("permit_zones").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ?? null;
}
