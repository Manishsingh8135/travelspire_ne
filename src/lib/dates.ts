// Calendar-date helpers for everything that expires: festival editions,
// bookable departures, seasonal homepage blocks.
//
// Dates are compared as ISO `YYYY-MM-DD` strings in India time. Our travellers
// and our departures live in IST, and a UTC "today" would flip a festival to
// "over" at 5:30 am instead of midnight.

const indiaDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Today's date in India as `YYYY-MM-DD`. */
export function indiaToday(now: Date = new Date()): string {
  return indiaDateFormatter.format(now);
}

/** True once the given ISO date is entirely in the past (India time). */
export function isPastDate(isoDate: string, today: string = indiaToday()): boolean {
  return isoDate < today;
}

/**
 * How often date-driven pages re-render, in seconds. Six hours keeps a
 * finished festival from lingering past breakfast without rebuilding pages on
 * every request.
 */
export const DATE_DRIVEN_REVALIDATE_SECONDS = 21600;
