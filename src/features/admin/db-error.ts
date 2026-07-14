import type { PostgrestError } from "@supabase/supabase-js";

export type FormState = {
  /** Set on successful update — the editor stays on the page and toasts. */
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

/** Map a Postgres/PostgREST error to a friendly form state. */
export function dbErrorToState(error: PostgrestError): FormState {
  // 23505 = unique_violation (our only unique user-facing field is slug).
  if (error.code === "23505") {
    return { fieldErrors: { slug: "That slug is already taken." } };
  }
  return { error: "Couldn't save — please try again." };
}
