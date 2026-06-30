import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Place } from "@/lib/supabase/types";

export type AdminPlace = Place & { regionName: string | null };
export type RegionOption = { id: string; name: string };

export async function listPlacesForAdmin(): Promise<AdminPlace[]> {
  const sb = createSupabaseAdminClient();
  const [placesRes, regionsRes] = await Promise.all([
    sb.from("places").select("*").order("created_at", { ascending: false }),
    sb.from("regions").select("id, name"),
  ]);
  if (placesRes.error) throw placesRes.error;
  if (regionsRes.error) throw regionsRes.error;

  const nameById = new Map((regionsRes.data ?? []).map((r) => [r.id, r.name]));
  return (placesRes.data ?? []).map((p) => ({
    ...p,
    regionName: p.region_id ? (nameById.get(p.region_id) ?? null) : null,
  }));
}

export async function getPlaceForAdmin(id: string): Promise<Place | null> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb.from("places").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getRegionOptions(): Promise<RegionOption[]> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb.from("regions").select("id, name").order("name");
  if (error) throw error;
  return data ?? [];
}
