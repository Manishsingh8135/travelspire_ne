"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, Select, TourCard, type TourCardProps } from "@/components/ds";
import { IconSearch } from "@/components/icons";
import { cn } from "@/lib/utils";

/* The catalogue browser. Tours arrive pre-shaped from the server (card props
   plus the few fields we filter on), so no tour objects ship to the client.
   Filters are honest controls — pills here are allowed, they are filters. */

export type CatalogueItem = {
  card: TourCardProps;
  kind: "expedition" | "festival";
  days: number;
  price: number;
  search: string;
  rank: number;
};

const kinds = [
  { value: "all", label: "All tours" },
  { value: "expedition", label: "Expeditions" },
  { value: "festival", label: "Festivals" },
] as const;

const lengths = [
  { value: "all", label: "Any length" },
  { value: "short", label: "Up to 4 days", test: (d: number) => d <= 4 },
  { value: "week", label: "5 – 7 days", test: (d: number) => d >= 5 && d <= 7 },
  { value: "long", label: "8 days or more", test: (d: number) => d >= 8 },
] as const;

const sorts = {
  recommended: (a: CatalogueItem, b: CatalogueItem) => a.rank - b.rank,
  "price-asc": (a: CatalogueItem, b: CatalogueItem) => a.price - b.price,
  "price-desc": (a: CatalogueItem, b: CatalogueItem) => b.price - a.price,
  shortest: (a: CatalogueItem, b: CatalogueItem) => a.days - b.days,
} as const;

type Kind = (typeof kinds)[number]["value"];
type Length = (typeof lengths)[number]["value"];
type Sort = keyof typeof sorts;

export function TourCatalogue({ items, initialKind = "all" }: { items: CatalogueItem[]; initialKind?: Kind }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [kind, setKind] = useState<Kind>(initialKind);
  const [length, setLength] = useState<Length>("all");
  const [sort, setSort] = useState<Sort>("recommended");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const lengthTest = lengths.find((l) => l.value === length);
    return items
      .filter((i) => kind === "all" || i.kind === kind)
      .filter((i) => !lengthTest || !("test" in lengthTest) || lengthTest.test(i.days))
      .filter((i) => !q || i.search.includes(q))
      .sort(sorts[sort]);
  }, [items, kind, length, sort, query]);

  const chooseKind = (next: Kind) => {
    setKind(next);
    // Keep the old ?category=Festival links working, and shareable.
    const qs = new URLSearchParams(params.toString());
    if (next === "festival") qs.set("category", "Festival");
    else qs.delete("category");
    router.replace(qs.size ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const reset = () => {
    chooseKind("all");
    setLength("all");
    setQuery("");
  };

  return (
    <div className="font-ui">
      <div className="flex flex-col gap-4 border-y border-line py-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="radiogroup" aria-label="Type of tour" className="flex flex-wrap gap-2">
          {kinds.map((k) => (
            <button
              key={k.value}
              type="button"
              role="radio"
              aria-checked={kind === k.value}
              onClick={() => chooseKind(k.value)}
              className={cn(
                "h-10 rounded-full border px-4 text-small font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                kind === k.value
                  ? "border-fg bg-fg text-canvas"
                  : "border-line-strong text-fg-muted hover:border-fg/40 hover:text-fg",
              )}
            >
              {k.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
          <label className="relative col-span-2 block sm:col-span-1">
            <span className="sr-only">Search tours</span>
            <IconSearch size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-subtle" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search places or tours"
              className="h-11 w-full rounded-control border border-line-strong bg-surface pl-10 pr-3 text-body text-fg placeholder:text-fg-subtle focus:border-brand focus:outline-none focus:ring-[3px] focus:ring-focus/25 lg:w-64"
            />
          </label>
          <label>
            <span className="sr-only">Trip length</span>
            <Select value={length} onChange={(e) => setLength(e.target.value as Length)}>
              {lengths.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </Select>
          </label>
          <label>
            <span className="sr-only">Sort</span>
            <Select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="shortest">Shortest first</option>
            </Select>
          </label>
        </div>
      </div>

      <p className="mt-6 text-small text-fg-subtle" aria-live="polite">
        {results.length === items.length ? `${items.length} tours` : `${results.length} of ${items.length} tours`}
      </p>

      {results.length ? (
        <ul className="mt-6 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <li key={item.card.href}>
              <TourCard {...item.card} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-panel border border-dashed border-line-strong px-6 py-14 text-center">
          <p className="text-h4 text-fg">No tours match those filters.</p>
          <p className="mx-auto mt-2 max-w-[40ch] text-body text-fg-muted">
            Try a different length, or tell us what you have in mind — most of our trips are planned around you anyway.
          </p>
          <Button variant="secondary" className="mt-6" onClick={reset}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
