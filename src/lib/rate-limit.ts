import "server-only";

// A small fixed-window limiter for public form endpoints (booking checkout,
// contact). State lives in this server instance's memory, so it slows
// scripted abuse from a single client rather than enforcing a hard global
// quota: Vercel reuses warm instances, but separate instances don't share
// counts. For a hard limit, add a Vercel WAF rate-limit rule on the route.

type Window = { startedAt: number; count: number };

const windows = new Map<string, Window>();
const MAX_TRACKED_KEYS = 5000;

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Counts one hit for `key` and reports whether it is still within `limit`
 * hits per `windowMs`.
 */
export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
  now: number = Date.now(),
): { ok: boolean; retryAfterSeconds: number } {
  const current = windows.get(key);

  if (!current || now - current.startedAt >= windowMs) {
    if (windows.size >= MAX_TRACKED_KEYS) pruneExpired(windowMs, now);
    windows.set(key, { startedAt: now, count: 1 });
    return { ok: true, retryAfterSeconds: 0 };
  }

  current.count += 1;
  const retryAfterSeconds = Math.ceil(
    (current.startedAt + windowMs - now) / 1000,
  );
  return { ok: current.count <= limit, retryAfterSeconds };
}

function pruneExpired(windowMs: number, now: number) {
  for (const [key, window] of windows) {
    if (now - window.startedAt >= windowMs) windows.delete(key);
  }
  // Still full of live windows: drop the oldest rather than grow unbounded.
  if (windows.size >= MAX_TRACKED_KEYS) {
    const oldest = windows.keys().next().value;
    if (oldest !== undefined) windows.delete(oldest);
  }
}
