/**
 * The festival countdown state machine — one pure function used identically by
 * the CountdownStamp on festival pages, hubs, SeasonBands and /calendar.
 * The four states: docs-new/08-blueprint/08 §2.
 */

export interface EventDates {
  /** ISO date, e.g. "2026-12-01". */
  startsOn: string;
  /** ISO date; defaults to startsOn for one-day events. */
  endsOn?: string | null;
  label?: string | null;
}

export interface Recurrence {
  /** 1–12; the month the festival typically happens. */
  month?: number | null;
}

export type FestivalTimeState =
  | { state: "counting"; daysUntil: number; event: EventDates }
  | { state: "live"; dayOf: number; totalDays: number; event: EventDates }
  | { state: "between"; expectedMonth: number | null; expectedYear: number | null }
  | { state: "month_only"; month: number | null };

const DAY_MS = 86_400_000;

/** Parse an ISO date as a UTC day number (date-only — no timezone drift). */
function utcDay(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y!, m! - 1, d!) / DAY_MS;
}

function todayUtcDay(today: Date): number {
  return Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()) / DAY_MS;
}

export function festivalTimeState(
  recurrence: Recurrence | null | undefined,
  events: EventDates[],
  today: Date,
): FestivalTimeState {
  const now = todayUtcDay(today);
  const sorted = [...events].sort((a, b) => utcDay(a.startsOn) - utcDay(b.startsOn));

  // Live — today inside an event window (boundaries inclusive).
  for (const event of sorted) {
    const start = utcDay(event.startsOn);
    const end = utcDay(event.endsOn ?? event.startsOn);
    if (now >= start && now <= end) {
      return { state: "live", dayOf: now - start + 1, totalDays: end - start + 1, event };
    }
  }

  // Counting — the soonest future event.
  const next = sorted.find((e) => utcDay(e.startsOn) > now);
  if (next) return { state: "counting", daysUntil: utcDay(next.startsOn) - now, event: next };

  // Between — editions exist but none scheduled; expect the recurrence month.
  if (sorted.length > 0) {
    const month = recurrence?.month ?? null;
    if (month == null) return { state: "between", expectedMonth: null, expectedYear: null };
    // All events are past, so this year's month is gone or going — expect next occurrence.
    const year = today.getUTCFullYear();
    const expectedYear = month > today.getUTCMonth() + 1 ? year : year + 1;
    return { state: "between", expectedMonth: month, expectedYear };
  }

  // Month-only — no editions recorded yet.
  return { state: "month_only", month: recurrence?.month ?? null };
}
