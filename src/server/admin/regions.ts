import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Region } from "@/lib/supabase/types";

/** Admin reads use the service-role client, so they see drafts too. */

export async function listRegionsForAdmin(): Promise<Region[]> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb
    .from("regions")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getRegionForAdmin(id: string): Promise<Region | null> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb.from("regions").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

type Counts = { total: number; published: number; draft: number };

function tally(rows: { status: string }[] | null): Counts {
  const r = rows ?? [];
  const published = r.filter((x) => x.status === "published").length;
  return { total: r.length, published, draft: r.length - published };
}

export async function getAdminCounts(): Promise<{ regions: Counts; places: Counts }> {
  const sb = createSupabaseAdminClient();
  const [regions, places] = await Promise.all([
    sb.from("regions").select("status"),
    sb.from("places").select("status"),
  ]);
  if (regions.error) throw regions.error;
  if (places.error) throw places.error;
  return { regions: tally(regions.data), places: tally(places.data) };
}
