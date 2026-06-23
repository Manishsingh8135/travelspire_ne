import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("resolves conflicting tailwind utilities (last wins)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("drops falsy values and joins the rest", () => {
    expect(cn("text-sm", false && "hidden", undefined, "font-medium")).toBe(
      "text-sm font-medium",
    );
  });

  it("merges conditional class maps", () => {
    expect(cn("rounded-md", { "bg-primary": true, "bg-danger": false })).toBe(
      "rounded-md bg-primary",
    );
  });
});
