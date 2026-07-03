/** Small display formatters shared across admin tables + cards. */

export function formatRelative(iso: string | null | undefined): string {
  if (!iso) return "—";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";
  const diff = Date.now() - then;
  if (diff < 60_000) return "now";
  const m = Math.round(diff / 60_000);
  const h = Math.round(m / 60);
  const d = Math.round(h / 24);
  if (m < 60) return `${m}m`;
  if (h < 24) return `${h}h`;
  if (d < 30) return `${d}d`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" });
}

export function formatINR(n: number | null | undefined): string {
  if (n == null) return "—";
  return `₹${n.toLocaleString("en-IN")}`;
}

export function formatElevation(m: number | null | undefined): string {
  if (m == null) return "—";
  return `${m.toLocaleString("en-IN")} m`;
}

export function formatCoords(lat: number | null | undefined, lng: number | null | undefined): string | null {
  if (lat == null || lng == null) return null;
  return `${lat.toFixed(3)}, ${lng.toFixed(3)}`;
}
