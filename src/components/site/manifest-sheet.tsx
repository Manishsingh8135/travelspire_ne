import { cn } from "@/lib/cn";

/**
 * THE EXPEDITION MANIFEST (08-blueprint/05 §3.7) — included / not included /
 * carry as ONE document object (a packing manifest), not three sibling cards.
 * Column marks are mono characters, not icons; facilities sign off as a
 * footnote row. Mobile: the columns stack under hairline rules.
 */

type Column = { heading: string; mark: string; markClass: string; items: string[] };

export function ManifestSheet({
  code,
  inclusions,
  exclusions,
  carry,
  facilities,
  className,
}: {
  /** Derived mono document code, e.g. "TSNE-MECHUKA-6D". */
  code?: string | null;
  inclusions: string[];
  exclusions: string[];
  carry: string[];
  facilities?: string[];
  className?: string;
}) {
  const columns: Column[] = [
    { heading: "Included", mark: "✓", markClass: "text-success", items: inclusions },
    { heading: "Not included", mark: "✕", markClass: "text-danger", items: exclusions },
    { heading: "Carry this", mark: "○", markClass: "text-muted-foreground", items: carry },
  ].filter((c) => c.items.length > 0);
  if (columns.length === 0) return null;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border-subtle bg-card shadow-panel",
        className,
      )}
    >
      <div className="flex items-baseline justify-between gap-4 border-b border-border-subtle px-5 py-3.5 sm:px-6">
        <p className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase">
          Expedition manifest
        </p>
        {code ? (
          <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            {code}
          </p>
        ) : null}
      </div>

      <div
        className={cn(
          "grid divide-y divide-border-subtle lg:divide-y-0 lg:divide-x",
          columns.length === 3 && "lg:grid-cols-3",
          columns.length === 2 && "lg:grid-cols-2",
        )}
      >
        {columns.map((col) => (
          <section key={col.heading} aria-label={col.heading} className="px-5 py-5 sm:px-6">
            <h3 className="flex items-center gap-2 font-mono text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
              <span aria-hidden className={cn("text-xs", col.markClass)}>
                {col.mark}
              </span>
              {col.heading}
            </h3>
            <ul className="mt-3">
              {col.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 border-b border-dotted border-border-subtle py-2 text-sm leading-relaxed text-pretty last:border-0"
                >
                  <span aria-hidden className={cn("shrink-0 font-mono text-xs", col.markClass)}>
                    {col.mark}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {facilities?.length ? (
        <p className="border-t border-border-subtle px-5 py-3 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:px-6">
          Facilities — {facilities.join(" · ")}
        </p>
      ) : null}
    </div>
  );
}
