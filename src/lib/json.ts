/** Safely read a string field from an unknown JSON value (our jsonb columns). */
export function readString(value: unknown, key: string): string | undefined {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const v = (value as Record<string, unknown>)[key];
    if (typeof v === "string" && v.length > 0) return v;
  }
  return undefined;
}
