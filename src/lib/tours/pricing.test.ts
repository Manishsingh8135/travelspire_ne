import { describe, expect, it } from "vitest";
import { fromPrice, durationLabel, parseDurationNotation, type Pricing } from "./pricing";

describe("fromPrice", () => {
  it("is the min across group tiers and private", () => {
    const pricing: Pricing = {
      currency: "INR",
      per: "pax",
      modes: [
        {
          mode: "group",
          label: "Group trip",
          tiers: [
            { groupSize: 6, pricePax: 18999 },
            { groupSize: 5, pricePax: 21699 },
            { groupSize: 4, pricePax: 26699 },
          ],
        },
        { mode: "private", label: "Private (couple/twin)", pricePax: 51999 },
      ],
    };
    expect(fromPrice(pricing)).toBe(18999);
  });

  it("covers festival variant tiers (Hornbill ₹1,799 camping)", () => {
    const pricing: Pricing = {
      currency: "INR",
      per: "pax",
      modes: [
        { mode: "variant", label: "Hornbill Camping", pricePax: 1799, inclusions: [] },
        { mode: "variant", label: "Hornbill Premium", pricePax: 9299, inclusions: [] },
      ],
    };
    expect(fromPrice(pricing)).toBe(1799);
  });

  it("is null when unpriced", () => {
    expect(fromPrice(null)).toBeNull();
    expect(fromPrice({ currency: "INR", per: "pax", modes: [] })).toBeNull();
  });
});

describe("duration notation", () => {
  it("parses 5N/6D and 12N/13D", () => {
    expect(parseDurationNotation("Anini 5N/6D")).toEqual({ nights: 5, days: 6 });
    expect(parseDurationNotation("MENCHUKHA + DONG + ANINI (12N/13D)")).toEqual({
      nights: 12,
      days: 13,
    });
    expect(parseDurationNotation("no duration here")).toBeNull();
  });

  it("renders the display label", () => {
    expect(durationLabel(6, 5)).toBe("6 days · 5 nights");
    expect(durationLabel(1, null)).toBe("1 day");
    expect(durationLabel(null, null)).toBeNull();
  });
});
