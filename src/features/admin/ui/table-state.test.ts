import { describe, expect, it } from "vitest";
import { parseTableQuery, pageRange } from "./table-state";

describe("parseTableQuery", () => {
  it("returns sensible defaults for empty params", () => {
    expect(parseTableQuery({})).toEqual({
      q: "",
      sort: null,
      dir: "desc",
      page: 1,
      pageSize: 50,
      filters: {},
    });
  });

  it("reads core params and trims the search term", () => {
    const q = parseTableQuery({ q: "  mechuka ", sort: "name", dir: "asc", page: "3" });
    expect(q.q).toBe("mechuka");
    expect(q.sort).toBe("name");
    expect(q.dir).toBe("asc");
    expect(q.page).toBe(3);
  });

  it("only surfaces declared filter ids that have a value", () => {
    const q = parseTableQuery(
      { status: "published", kind: "", region: "abc", ghost: "x" },
      { filterIds: ["status", "kind", "region"] },
    );
    expect(q.filters).toEqual({ status: "published", region: "abc" });
    expect(q.filters).not.toHaveProperty("ghost");
    expect(q.filters).not.toHaveProperty("kind");
  });

  it("falls back to defaults for invalid page and dir", () => {
    expect(parseTableQuery({ page: "-2" }).page).toBe(1);
    expect(parseTableQuery({ page: "notanumber" }).page).toBe(1);
    expect(parseTableQuery({ dir: "sideways" }).dir).toBe("desc");
  });

  it("honors opts (defaultSort, defaultDir, pageSize)", () => {
    const q = parseTableQuery({}, { defaultSort: "updated", defaultDir: "asc", pageSize: 25 });
    expect(q.sort).toBe("updated");
    expect(q.dir).toBe("asc");
    expect(q.pageSize).toBe(25);
  });

  it("takes the first value when a param is an array", () => {
    expect(parseTableQuery({ q: ["a", "b"], page: ["2", "9"] })).toMatchObject({ q: "a", page: 2 });
  });

  it("lets an explicit param override the default sort", () => {
    const q = parseTableQuery({ sort: "price" }, { defaultSort: "updated" });
    expect(q.sort).toBe("price");
  });
});

describe("pageRange", () => {
  it("computes an inclusive 0-based range", () => {
    expect(pageRange(1, 50)).toEqual([0, 49]);
    expect(pageRange(2, 50)).toEqual([50, 99]);
    expect(pageRange(3, 20)).toEqual([40, 59]);
  });
});
