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

/** A place reduced to what the Living Map needs (coords + linkable slugs). */
export type MapPlace = {
  slug: string;
  name: string;
  kind: string;
  elevation_m: number | null;
  lat: number;
  lng: number;
  regionSlug: string;
};

/** Published places that have coordinates, with their region slug, for the map. */
export async function getMappablePlaces(): Promise<MapPlace[]> {
  const regions = await getRegions();
  const slugByRegionId = new Map(regions.map((r) => [r.id, r.slug]));

  const sb = createSupabasePublicClient();
  const { data, error } = await sb
    .from("places")
    .select("slug, name, kind, elevation_m, lat, lng, region_id")
    .eq("status", "published");
  if (error) throw error;

  const places: MapPlace[] = [];
  for (const p of data ?? []) {
    if (p.lat == null || p.lng == null || !p.region_id) continue;
    const regionSlug = slugByRegionId.get(p.region_id);
    if (!regionSlug) continue;
    places.push({
      slug: p.slug,
      name: p.name,
      kind: p.kind,
      elevation_m: p.elevation_m,
      lat: p.lat,
      lng: p.lng,
      regionSlug,
    });
  }
  return places;
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
