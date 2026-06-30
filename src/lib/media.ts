import { env } from "@/lib/env";

export type HeroMedia = {
  storage_path: string;
  alt: string | null;
  width?: number | null;
  height?: number | null;
};

/** Public URL for a file in the `media` storage bucket. */
export function mediaPublicUrl(storagePath: string): string {
  const base = env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return `${base}/storage/v1/object/public/media/${storagePath}`;
}
