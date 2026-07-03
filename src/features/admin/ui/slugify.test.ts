import { describe, expect, it } from "vitest";
import { slugify } from "./slugify";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Mechuka")).toBe("mechuka");
    expect(slugify("Tawang Monastery!")).toBe("tawang-monastery");
  });
  it("collapses whitespace/punctuation and trims hyphens", () => {
    expect(slugify("  Ziro   Valley  ")).toBe("ziro-valley");
    expect(slugify("--Hornbill--Festival--")).toBe("hornbill-festival");
  });
  it("folds diacritics to ASCII", () => {
    expect(slugify("Café del Río")).toBe("cafe-del-rio");
  });
  it("handles empty and symbol-only input", () => {
    expect(slugify("")).toBe("");
    expect(slugify("!!!")).toBe("");
  });
});
