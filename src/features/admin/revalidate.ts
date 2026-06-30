import { revalidatePath } from "next/cache";

/**
 * Invalidate every public surface that depends on the regions/places graph.
 * Shared by region + place actions so coverage can't drift.
 */
export function revalidatePublicAtlas() {
  revalidatePath("/");
  revalidatePath("/explore");
  revalidatePath("/[regionSlug]", "page");
  revalidatePath("/[regionSlug]/[placeSlug]", "page");
  revalidatePath("/sitemap.xml");
}
