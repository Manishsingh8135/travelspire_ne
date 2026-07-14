/** Shared FormData helpers for the composers' server actions. */

export function emptyToUndef(v: FormDataEntryValue | null): string | undefined {
  if (v == null) return undefined;
  const s = String(v).trim();
  return s === "" ? undefined : s;
}

export function checkbox(v: FormDataEntryValue | null): boolean {
  return v === "on" || v === "true";
}

/** Parse a PairList hidden input: JSON [{a, b}] → clean rows. */
export function pairsFrom(v: string | undefined): { a: string; b: string }[] {
  if (!v) return [];
  try {
    const arr = JSON.parse(v);
    if (!Array.isArray(arr)) return [];
    return arr
      .map((r) => ({
        a: String((r as { a?: unknown })?.a ?? "").trim(),
        b: String((r as { b?: unknown })?.b ?? "").trim(),
      }))
      .filter((r) => r.a || r.b);
  } catch {
    return [];
  }
}

/** Merge helper: existing body (object or null) as a record. */
export function bodyRecord(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
}
