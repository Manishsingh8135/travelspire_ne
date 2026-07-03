/**
 * Shared table query model. Pure + server-safe so the RSC list page can parse
 * incoming searchParams with the exact same contract the client AdminTable
 * writes to the URL. Every table state is a URL → saved views are just links.
 */

export type SortDir = "asc" | "desc";

export type TableQuery = {
  q: string;
  sort: string | null;
  dir: SortDir;
  page: number;
  pageSize: number;
  /** Filter id → selected value (empty string = "all", omitted from the query). */
  filters: Record<string, string>;
};

export type ParseTableOpts = {
  filterIds?: readonly string[];
  defaultSort?: string;
  defaultDir?: SortDir;
  pageSize?: number;
};

type RawParams = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

/** Reserved core query keys; anything else in a table URL is a filter. */
export const CORE_KEYS = ["q", "sort", "dir", "page"] as const;

export function parseTableQuery(sp: RawParams, opts: ParseTableOpts = {}): TableQuery {
  const pageSize = opts.pageSize ?? 50;
  const rawPage = Number.parseInt(first(sp.page) ?? "", 10);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const dirRaw = first(sp.dir);
  const dir: SortDir = dirRaw === "asc" || dirRaw === "desc" ? dirRaw : (opts.defaultDir ?? "desc");

  const sort = first(sp.sort) || opts.defaultSort || null;

  const filters: Record<string, string> = {};
  for (const id of opts.filterIds ?? []) {
    const val = first(sp[id]);
    if (val) filters[id] = val;
  }

  return {
    q: (first(sp.q) ?? "").trim(),
    sort,
    dir,
    page,
    pageSize,
    filters,
  };
}

/** 0-based [from, to] inclusive range for a Supabase `.range()` call. */
export function pageRange(page: number, pageSize: number): [number, number] {
  const from = (page - 1) * pageSize;
  return [from, from + pageSize - 1];
}
