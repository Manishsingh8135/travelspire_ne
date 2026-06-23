import "server-only";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import type { Place, Region } from "@/lib/supabase/types";

/**
 * Read layer for the public atlas (regions + places). Anonymous client, so RLS
 * returns only published rows. Components call these — never the DB directly.
 */

export async function getRegions(): Promise<Region[]> {
  const sb = createSupabasePublicClient();
  const { data, error } = await sb
    .from("regions")
    .select("*")
    .eq("status", "published")
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export async function getRegionBySlug(slug: string): Promise<Region | null> {
  const sb = createSupabasePublicClient();
  const { data, error } = await sb
    .from("regions")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getPlacesInRegion(regionId: string): Promise<Place[]> {
  const sb = createSupabasePublicClient();
  const { data, error } = await sb
    .from("places")
    .select("*")
    .eq("region_id", regionId)
    .eq("status", "published")
    .order("elevation_m", { ascending: false, nullsFirst: false });
  if (error) throw error;
  return data ?? [];
}

export async function getPlaceBySlug(slug: string): Promise<Place | null> {
  const sb = createSupabasePublicClient();
  const { data, error } = await sb
    .from("places")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  return data;
}

/** All published (region, place) slug pairs — for generateStaticParams. */
export async function getPlaceParams(): Promise<
  { regionSlug: string; placeSlug: string }[]
> {
  const regions = await getRegions();
  const params: { regionSlug: string; placeSlug: string }[] = [];
  for (const region of regions) {
    const places = await getPlacesInRegion(region.id);
    for (const place of places) {
      params.push({ regionSlug: region.slug, placeSlug: place.slug });
    }
  }
  return params;
}
