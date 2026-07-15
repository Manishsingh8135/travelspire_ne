import { describe, expect, it } from "vitest";
import type { ItineraryDay } from "./itinerary";
import {
  arrangeRows,
  difficultyTicks,
  overnightNodes,
  parseDay,
  parsePricing,
  routeLine,
  shortDuration,
  testimonialsOf,
  tourFromPrice,
} from "./read";

/** A day with just enough shape — mirrors real tour_days.body rows. */
function day(partial: Partial<ItineraryDay> & { dayNo: number }): ItineraryDay {
  return { title: `Day ${partial.dayNo}`, sightseeing: [], tags: [], ...partial };
}

describe("parsePricing / tourFromPrice", () => {
  const matrix = {
    currency: "INR",
    per: "pax",
    modes: [
      {
        mode: "group",
        label: "Group trip",
        tiers: [
          { groupSize: 6, pricePax: 18999 },
          { groupSize: 4, pricePax: 26699 },
        ],
      },
      { mode: "private", label: "Private (couple/twin)", pricePax: 51999 },
    ],
  };

  it("parses the real matrix shape and computes from-price as the matrix min", () => {
    const pricing = parsePricing(matrix);
    expect(pricing?.modes).toHaveLength(2);
    expect(tourFromPrice({ pricing: matrix, price_inr: 99999 })).toBe(18999);
  });

  it("empty modes → null → falls back to the flat column", () => {
    expect(parsePricing({ currency: "INR", per: "pax", modes: [] })).toBeNull();
    expect(tourFromPrice({ pricing: { modes: [] }, price_inr: 16499 })).toBe(16499);
  });

  it("junk and absent pricing degrade to the flat column, never throw", () => {
    expect(parsePricing("nonsense")).toBeNull();
    expect(tourFromPrice({ pricing: null, price_inr: null })).toBeNull();
  });
});

describe("parseDay", () => {
  it("passes a valid ItineraryDay through untouched", () => {
    const body = {
      dayNo: 2,
      title: "Aalo - Mechukha",
      route: { from: "Aalo", to: "Mechukha" },
      sightseeing: [{ name: "Local market" }],
      overnight: { name: "Mechukha", type: null, raw: "Overnight stay in Mechukha" },
      tags: ["market"],
    };
    expect(parseDay({ day_no: 2, title: "Aalo - Mechukha", body })).toMatchObject({
      dayNo: 2,
      overnight: { name: "Mechukha" },
    });
  });

  it("degrades a malformed row to a minimal day — the journal stays continuous", () => {
    const parsed = parseDay({
      day_no: 3,
      title: "Explore Anini",
      body: { description: "Old flat shape" },
    });
    expect(parsed).toMatchObject({ dayNo: 3, title: "Explore Anini", summary: "Old flat shape" });
    expect(parsed.sightseeing).toEqual([]);
  });
});

describe("legacyDays — the prose-era fallback", () => {
  it("lifts {title, description} rows into minimal days and skips empties", async () => {
    const { legacyDays } = await import("./read");
    const body = {
      itinerary: [
        { title: "Dibrugarh to Aalo", description: "Cross the Bogibeel bridge." },
        { title: "", description: "" },
        "junk",
      ],
    };
    expect(legacyDays(body)).toEqual([
      {
        dayNo: 1,
        title: "Dibrugarh to Aalo",
        summary: "Cross the Bogibeel bridge.",
        sightseeing: [],
        tags: [],
      },
    ]);
    expect(legacyDays({})).toEqual([]);
  });
});

describe("overnightNodes — the ribbon spine", () => {
  it("gateway first, consecutive overnights grouped with night counts", () => {
    const days = [
      day({ dayNo: 1, route: { from: "Dibrugarh", to: "Anini" }, overnight: { name: "Anini" } }),
      day({ dayNo: 2, overnight: { name: "Anini" } }),
      day({ dayNo: 3, overnight: { name: "anini" } }), // case-insensitive grouping
      day({ dayNo: 4, overnight: { name: "Chigu camp" } }),
      day({ dayNo: 5 }), // drop-off day: no overnight, skipped
    ];
    expect(overnightNodes(days)).toEqual([
      { name: "Dibrugarh", nights: 0 },
      { name: "Anini", nights: 3 },
      { name: "Chigu camp", nights: 1 },
    ]);
  });

  it("hides (returns []) below two nodes", () => {
    expect(overnightNodes([day({ dayNo: 1 })])).toEqual([]);
    expect(overnightNodes([])).toEqual([]);
  });
});

describe("facts vocabulary", () => {
  it("routeLine truncates the middle past max names", () => {
    expect(routeLine(["Dibrugarh", "Aalo", "Mechuka"])).toBe("DIBRUGARH → AALO → MECHUKA");
    expect(routeLine(["Dibrugarh", "Aalo", "Mechuka", "Dong", "Anini"])).toBe(
      "DIBRUGARH → AALO → ‥ → ANINI",
    );
    expect(routeLine(["Solo stop"])).toBeNull();
  });

  it("difficulty ticks and short duration read like field notation", () => {
    expect(difficultyTicks("moderate")).toBe("▲▲△");
    expect(difficultyTicks("extreme")).toBe("EXTREME");
    expect(shortDuration(6, 5)).toBe("6D/5N");
    expect(shortDuration(3)).toBe("3D");
    expect(shortDuration(null)).toBeNull();
  });
});

describe("editorial body blocks", () => {
  it("testimonialsOf keeps only well-formed quotes", () => {
    const body = {
      testimonials: [
        { quote: "Worth every kilometre.", name: "Meera Desai", location: "Mumbai" },
        { quote: 42, name: "Broken" },
        "junk",
      ],
    };
    expect(testimonialsOf(body)).toEqual([
      { quote: "Worth every kilometre.", name: "Meera Desai", location: "Mumbai", date: null },
    ]);
  });

  it("arrangeRows validates icons and drops malformed rows", () => {
    const body = {
      arrange: [
        { icon: "permit", label: "INNER LINE PERMIT", status: "HANDLED" },
        { icon: "spaceship", label: "UNKNOWN ICON", status: "INCLUDED" },
        { label: "NO STATUS" },
      ],
    };
    expect(arrangeRows(body)).toEqual([
      { icon: "permit", label: "INNER LINE PERMIT", status: "HANDLED" },
      { icon: "stay", label: "UNKNOWN ICON", status: "INCLUDED" },
    ]);
  });
});
