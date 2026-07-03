import { describe, expect, it } from "vitest";
import { formatRelative, formatINR, formatElevation, formatCoords } from "./format";

describe("formatRelative", () => {
  const ago = (ms: number) => new Date(Date.now() - ms).toISOString();

  it("renders em dash for null/invalid", () => {
    expect(formatRelative(null)).toBe("—");
    expect(formatRelative(undefined)).toBe("—");
    expect(formatRelative("not-a-date")).toBe("—");
  });

  it("buckets recent times", () => {
    expect(formatRelative(ago(30 * 1000))).toBe("now");
    expect(formatRelative(ago(5 * 60 * 1000))).toBe("5m");
    expect(formatRelative(ago(3 * 60 * 60 * 1000))).toBe("3h");
    expect(formatRelative(ago(4 * 24 * 60 * 60 * 1000))).toBe("4d");
  });

  it("falls back to an absolute date beyond 30 days", () => {
    const out = formatRelative(ago(200 * 24 * 60 * 60 * 1000));
    expect(out).not.toMatch(/[hmd]$/);
    expect(out.length).toBeGreaterThan(4);
  });
});

describe("formatINR", () => {
  it("formats with the Indian grouping and a rupee sign", () => {
    expect(formatINR(16499)).toBe("₹16,499");
    expect(formatINR(0)).toBe("₹0");
  });
  it("renders em dash for null", () => {
    expect(formatINR(null)).toBe("—");
    expect(formatINR(undefined)).toBe("—");
  });
});

describe("formatElevation", () => {
  it("appends a metre suffix", () => {
    expect(formatElevation(2134)).toBe("2,134 m");
  });
  it("renders em dash for null", () => {
    expect(formatElevation(null)).toBe("—");
  });
});

describe("formatCoords", () => {
  it("rounds to three decimals", () => {
    expect(formatCoords(28.61, 94.1167)).toBe("28.610, 94.117");
  });
  it("returns null unless both are present", () => {
    expect(formatCoords(28.61, null)).toBeNull();
    expect(formatCoords(null, 94.11)).toBeNull();
    expect(formatCoords(null, null)).toBeNull();
  });
});
