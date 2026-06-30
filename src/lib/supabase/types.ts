import type { Database } from "@/db/database.types";

/** Convenience aliases over the generated DB types. Regenerate types with:
 *  `supabase gen types typescript --linked --schema public > src/db/database.types.ts`
 */
export type { Database };

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertRow<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateRow<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Region = Tables<"regions">;
export type Place = Tables<"places">;
export type Media = Tables<"media">;
export type Tour = Tables<"tours">;
