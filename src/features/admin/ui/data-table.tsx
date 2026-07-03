"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";
import {
  Search,
  X,
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui";

export type AdminColumn<Row> = {
  id: string;
  header: string;
  /** When true, the header toggles server-side sort keyed by `id`. */
  sortable?: boolean;
  align?: "left" | "right";
  /** Tailwind width class, e.g. "w-0" (shrink) or "w-40". */
  width?: string;
  cell: (row: Row) => React.ReactNode;
};

export type TableFilter = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
};

export type BulkAction<Row> = {
  id: string;
  label: string;
  icon?: LucideIcon;
  danger?: boolean;
  run: (rows: Row[]) => void | Promise<void>;
};

type Props<Row extends { id: string }> = {
  rows: Row[];
  total: number;
  pageSize: number;
  columns: AdminColumn<Row>[];
  filters?: TableFilter[];
  searchPlaceholder?: string;
  entityPlural: string;
  getEditHref: (row: Row) => string;
  rowActions?: (row: Row) => React.ReactNode;
  bulkActions?: BulkAction<Row>[];
  emptyState?: React.ReactNode;
};

const CORE = {
  q: parseAsString.withDefault(""),
  sort: parseAsString.withDefault(""),
  dir: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
};

const NUQS_OPTS = { shallow: false, history: "push" as const, clearOnDefault: true, scroll: false };

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
}

export function AdminTable<Row extends { id: string }>({
  rows,
  total,
  pageSize,
  columns,
  filters = [],
  searchPlaceholder = "Search…",
  entityPlural,
  getEditHref,
  rowActions,
  bulkActions = [],
  emptyState,
}: Props<Row>) {
  const router = useRouter();

  const filterKey = filters.map((f) => f.id).join(",");
  const filterParsers = React.useMemo(
    () => Object.fromEntries(filters.map((f) => [f.id, parseAsString.withDefault("")])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterKey],
  );

  const [core, setCore] = useQueryStates(CORE, NUQS_OPTS);
  const [fstate, setFstate] = useQueryStates(filterParsers, NUQS_OPTS);
  const fval = (id: string): string => (fstate[id] as string | undefined) ?? "";
  const filterSig = filters.map((f) => fval(f.id)).join("|");

  // ── Search (debounced) ────────────────────────────────────────────────
  const searchRef = React.useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = React.useState(core.q);
  React.useEffect(() => {
    // Keep the input mirror in sync when the URL query changes (back/forward, clear).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchInput(core.q);
  }, [core.q]);
  React.useEffect(() => {
    if (searchInput === core.q) return;
    const id = window.setTimeout(() => void setCore({ q: searchInput || null, page: 1 }), 220);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  // ── Selection ─────────────────────────────────────────────────────────
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const rowSignature = rows.map((r) => r.id).join(",");
  React.useEffect(() => {
    // Selection is page-scoped: reset whenever the result set changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelected(new Set());
  }, [core.page, core.q, core.sort, core.dir, filterSig]);
  const toggleOne = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const allOnPage = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const someOnPage = rows.some((r) => selected.has(r.id));
  const toggleAll = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (rows.every((r) => prev.has(r.id))) for (const r of rows) next.delete(r.id);
      else for (const r of rows) next.add(r.id);
      return next;
    });

  // ── Keyboard: j/k focus, x select, enter open, / search, esc clear ─────
  const [focus, setFocus] = React.useState(-1);
  React.useEffect(() => {
    // Clear keyboard focus when the visible rows change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFocus(-1);
  }, [rowSignature]);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (document.querySelector("[cmdk-input]")) return; // palette open
      if (e.key === "/" && !isTypingTarget(e.target)) {
        e.preventDefault();
        searchRef.current?.focus();
        return;
      }
      if (isTypingTarget(e.target)) return;
      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        setFocus((f) => Math.min(rows.length - 1, f + 1));
      } else if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        setFocus((f) => Math.max(0, (f < 0 ? 0 : f) - 1));
      } else if (e.key === "x" && focus >= 0 && rows[focus]) {
        e.preventDefault();
        toggleOne(rows[focus].id);
      } else if (e.key === "Enter" && focus >= 0 && rows[focus]) {
        e.preventDefault();
        router.push(getEditHref(rows[focus]) as Route);
      } else if (e.key === "Escape") {
        if (selected.size) setSelected(new Set());
        else setFocus(-1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, focus, selected.size]);

  // ── Sort ──────────────────────────────────────────────────────────────
  const toggleSort = (colId: string) => {
    if (core.sort !== colId) void setCore({ sort: colId, dir: "asc", page: 1 });
    else if (core.dir === "asc") void setCore({ dir: "desc" });
    else void setCore({ sort: null, dir: null, page: 1 });
  };

  // ── Pagination ────────────────────────────────────────────────────────
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (core.page - 1) * pageSize + 1;
  const to = Math.min(total, core.page * pageSize);
  const goPage = (p: number) => void setCore({ page: Math.min(pageCount, Math.max(1, p)) });

  const hasActiveFilters = Boolean(core.q) || filters.some((f) => fval(f.id));
  const clearFilters = () => {
    void setCore({ q: null, page: 1 });
    void setFstate(Object.fromEntries(filters.map((f) => [f.id, null])));
  };

  // ── Bulk ──────────────────────────────────────────────────────────────
  const selectedRows = rows.filter((r) => selected.has(r.id));
  const runBulk = async (action: BulkAction<Row>) => {
    const chosen = selectedRows;
    setSelected(new Set());
    await action.run(chosen);
    router.refresh();
  };

  const colCount = columns.length + 1 + (rowActions ? 1 : 0);

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-56 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={searchRef}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-9 w-full rounded-sm border border-input bg-card pr-8 pl-9 text-sm text-foreground shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring"
          />
          {searchInput ? (
            <button
              type="button"
              onClick={() => setSearchInput("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-xs p-0.5 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>

        {filters.map((f) => (
          <select
            key={f.id}
            value={fval(f.id)}
            onChange={(e) => {
              void setFstate({ [f.id]: e.target.value || null });
              void setCore({ page: 1 });
            }}
            className={cn(
              "h-9 rounded-sm border bg-card px-2.5 text-sm outline-none transition-colors focus-visible:border-ring",
              fval(f.id) ? "border-ring/60 text-foreground" : "border-input text-muted-foreground",
            )}
          >
            <option value="">{f.label}: all</option>
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ))}

        {hasActiveFilters ? (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X /> Clear
          </Button>
        ) : null}

        <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">
          {total} {entityPlural}
        </span>
      </div>

      {/* Table */}
      <div className="admin-scroll overflow-x-auto rounded-lg border border-border-subtle">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-subtle bg-muted/40 text-left">
              <th className="w-0 px-3">
                <Checkbox
                  checked={allOnPage}
                  indeterminate={someOnPage && !allOnPage}
                  onChange={toggleAll}
                  aria-label="Select all on page"
                />
              </th>
              {columns.map((col) => {
                const active = core.sort === col.id;
                return (
                  <th
                    key={col.id}
                    className={cn(
                      "px-3 py-2.5 font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase",
                      col.align === "right" && "text-right",
                      col.width,
                    )}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(col.id)}
                        className={cn(
                          "inline-flex items-center gap-1 transition-colors hover:text-foreground",
                          active && "text-foreground",
                          col.align === "right" && "flex-row-reverse",
                        )}
                      >
                        {col.header}
                        {active ? (
                          core.dir === "asc" ? (
                            <ArrowUp className="size-3" />
                          ) : (
                            <ArrowDown className="size-3" />
                          )
                        ) : (
                          <ChevronsUpDown className="size-3 opacity-40" />
                        )}
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                );
              })}
              {rowActions ? <th className="w-0 px-3" /> : null}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={colCount} className="p-0">
                  {hasActiveFilters ? (
                    <div className="flex flex-col items-center gap-3 p-12 text-center">
                      <p className="text-sm text-muted-foreground">
                        No {entityPlural} match these filters.
                      </p>
                      <Button variant="outline" size="sm" onClick={clearFilters}>
                        Clear filters
                      </Button>
                    </div>
                  ) : (
                    (emptyState ?? (
                      <div className="p-12 text-center text-sm text-muted-foreground">
                        Nothing here yet.
                      </div>
                    ))
                  )}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={row.id}
                  onClick={() => router.push(getEditHref(row) as Route)}
                  onMouseEnter={() => setFocus(i)}
                  data-focused={i === focus || undefined}
                  data-selected={selected.has(row.id) || undefined}
                  className={cn(
                    "group h-[var(--admin-row-h)] cursor-pointer border-b border-border-subtle transition-colors last:border-0",
                    "hover:bg-muted/40 data-[focused]:bg-muted/40 data-[selected]:bg-accent-subtle/40",
                  )}
                >
                  <td className="px-3" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selected.has(row.id)}
                      onChange={() => toggleOne(row.id)}
                      aria-label="Select row"
                    />
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col.id}
                      className={cn("px-3 py-2 align-middle", col.align === "right" && "text-right")}
                    >
                      {col.cell(row)}
                    </td>
                  ))}
                  {rowActions ? (
                    <td className="px-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-data-[focused]:opacity-100 focus-within:opacity-100">
                        {rowActions(row)}
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > 0 ? (
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="font-mono tabular-nums">
            {from}–{to} of {total}
          </span>
          <div className="flex items-center gap-1">
            <PageBtn onClick={() => goPage(1)} disabled={core.page <= 1} label="First page">
              <ChevronsLeft className="size-4" />
            </PageBtn>
            <PageBtn onClick={() => goPage(core.page - 1)} disabled={core.page <= 1} label="Previous page">
              <ChevronLeft className="size-4" />
            </PageBtn>
            <span className="px-2 font-mono tabular-nums">
              {core.page} / {pageCount}
            </span>
            <PageBtn
              onClick={() => goPage(core.page + 1)}
              disabled={core.page >= pageCount}
              label="Next page"
            >
              <ChevronRight className="size-4" />
            </PageBtn>
            <PageBtn onClick={() => goPage(pageCount)} disabled={core.page >= pageCount} label="Last page">
              <ChevronsRight className="size-4" />
            </PageBtn>
          </div>
        </div>
      ) : null}

      {/* Floating bulk-action bar */}
      {selected.size > 0 && bulkActions.length > 0 ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[1200] flex justify-center px-4">
          <div className="pointer-events-auto flex items-center gap-2 rounded-lg border border-border-subtle bg-card px-2.5 py-2 shadow-xl">
            <span className="px-1.5 font-mono text-xs tabular-nums text-muted-foreground">
              {selected.size} selected
            </span>
            <span className="h-5 w-px bg-border-subtle" />
            {bulkActions.map((action) => (
              <Button
                key={action.id}
                size="sm"
                variant="ghost"
                className={cn("h-8", action.danger && "text-danger hover:bg-danger/10")}
                onClick={() => void runBulk(action)}
              >
                {action.icon ? <action.icon /> : null}
                {action.label}
              </Button>
            ))}
            <span className="h-5 w-px bg-border-subtle" />
            <Button size="sm" variant="ghost" className="h-8" onClick={() => setSelected(new Set())}>
              <X /> Clear
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PageBtn({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex size-8 items-center justify-center rounded-sm border border-border-subtle bg-card text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function Checkbox({
  checked,
  indeterminate,
  onChange,
  "aria-label": ariaLabel,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  "aria-label": string;
}) {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = Boolean(indeterminate) && !checked;
  }, [indeterminate, checked]);
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={ariaLabel}
      className="size-4 cursor-pointer rounded-xs border-border-strong accent-[var(--accent)]"
    />
  );
}
