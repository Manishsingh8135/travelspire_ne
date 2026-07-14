import { describe, expect, it } from "vitest";
import { festivalTimeState, type EventDates } from "./time-state";

/** Hornbill: Dec 1–10, 2026 — the real edition from the imported data. */
const hornbill2026: EventDates = { startsOn: "2026-12-01", endsOn: "2026-12-10", label: "Hornbill 2026" };
const recurrence = { month: 12 };
const utc = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d));

describe("festivalTimeState — the four states and their boundaries", () => {
  it("counting: before the edition", () => {
    const s = festivalTimeState(recurrence, [hornbill2026], utc(2026, 7, 14));
    expect(s).toMatchObject({ state: "counting", daysUntil: 140 });
  });

  it("counting → live boundary: the day before is 1 day out", () => {
    expect(festivalTimeState(recurrence, [hornbill2026], utc(2026, 11, 30))).toMatchObject({
      state: "counting",
      daysUntil: 1,
    });
  });

  it("live: first day, mid-festival, last day", () => {
    expect(festivalTimeState(recurrence, [hornbill2026], utc(2026, 12, 1))).toMatchObject({
      state: "live",
      dayOf: 1,
      totalDays: 10,
    });
    expect(festivalTimeState(recurrence, [hornbill2026], utc(2026, 12, 4))).toMatchObject({
      state: "live",
      dayOf: 4,
    });
    expect(festivalTimeState(recurrence, [hornbill2026], utc(2026, 12, 10))).toMatchObject({
      state: "live",
      dayOf: 10,
    });
  });

  it("between: the day after it ends, expecting next December", () => {
    expect(festivalTimeState(recurrence, [hornbill2026], utc(2026, 12, 11))).toEqual({
      state: "between",
      expectedMonth: 12,
      expectedYear: 2027,
    });
  });

  it("between: expected year rolls forward only when the month has passed", () => {
    // Ziro (Sep), seen from July of the next year → this year's September.
    const ziro2026: EventDates = { startsOn: "2026-09-24", endsOn: "2026-09-27" };
    expect(festivalTimeState({ month: 9 }, [ziro2026], utc(2027, 7, 1))).toEqual({
      state: "between",
      expectedMonth: 9,
      expectedYear: 2027,
    });
  });

  it("between with no recurrence: honest nulls", () => {
    expect(festivalTimeState(null, [hornbill2026], utc(2027, 1, 1))).toEqual({
      state: "between",
      expectedMonth: null,
      expectedYear: null,
    });
  });

  it("month_only: no editions recorded yet", () => {
    expect(festivalTimeState({ month: 2 }, [], utc(2026, 7, 14))).toEqual({
      state: "month_only",
      month: 2,
    });
    expect(festivalTimeState(null, [], utc(2026, 7, 14))).toEqual({
      state: "month_only",
      month: null,
    });
  });

  it("multiple editions: live wins over a future one; soonest future wins the countdown", () => {
    const h2027: EventDates = { startsOn: "2027-12-01", endsOn: "2027-12-10" };
    expect(festivalTimeState(recurrence, [h2027, hornbill2026], utc(2026, 12, 5))).toMatchObject({
      state: "live",
      dayOf: 5,
    });
    expect(festivalTimeState(recurrence, [h2027, hornbill2026], utc(2027, 6, 1))).toMatchObject({
      state: "counting",
      event: h2027,
    });
  });
});
