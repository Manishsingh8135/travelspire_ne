import "server-only";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import type { HeroMedia } from "@/lib/media";
import type { Tour } from "@/lib/supabase/types";

export type TourWithHero = Tour & { hero: HeroMedia | null };

const HERO_SELECT = "*, hero:media!hero_media_id(storage_path, alt, width, height)";

/** Public reads — anon client, RLS returns published tours only (+ their hero). */

export async function getPublishedTours(): Promise<TourWithHero[]> {
  const sb = createSupabasePublicClient();
  const { data, error } = await sb
    .from("tours")
    .select(HERO_SELECT)
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as TourWithHero[];
}

export async function getTourBySlug(slug: string): Promise<TourWithHero | null> {
  const sb = createSupabasePublicClient();
  const { data, error } = await sb
    .from("tours")
    .select(HERO_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as unknown as TourWithHero | null;
}
