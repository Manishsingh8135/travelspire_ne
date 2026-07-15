import { cn } from "@/lib/cn";

export type ManifestCell = {
  label: string;
  value: string;
  /** In-page anchor ("#route") — the whole cell becomes a jump link. */
  href?: string;
  /** Marigold emphasis — reserved for the one accent moment (countdown). */
  accent?: boolean;
};

/**
 * THE MANIFEST BAR (08-blueprint/05 §3.1) — the dossier's signature object.
 * Docked half-over the cover's bottom edge (the deliberate grid break), a
 * paper strip of mono fact cells, each an anchor into the document. Desktop:
 * one ruled row. Mobile: a 2-column ledger grid. Every value computed.
 */
export function ManifestBar({ cells, className }: { cells: ManifestCell[]; className?: string }) {
  if (cells.length === 0) return null;
  return (
    <div
      className={cn(
        "relative z-10 overflow-hidden rounded-xl border border-border-subtle bg-card shadow-lift",
        className,
      )}
    >
      <div className="grid grid-cols-2 gap-px bg-border-subtle sm:flex sm:gap-0 sm:divide-x sm:divide-border-subtle sm:bg-transparent">
        {cells.map((cell) => {
          const inner = (
            <>
              <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                {cell.label}
              </span>
              <span
                className={cn(
                  "font-mono text-[13px] font-semibold tracking-[0.06em] tabular-nums uppercase",
                  cell.accent ? "text-accent" : "text-foreground",
                )}
              >
                {cell.value}
              </span>
            </>
          );
          const cellClass =
            "flex min-w-0 flex-col gap-1 bg-card px-4 py-3.5 sm:flex-1 sm:px-5 sm:py-4";
          return cell.href ? (
            <a
              key={cell.label}
              href={cell.href}
              className={cn(
                cellClass,
                "transition-colors duration-150 outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
              )}
              aria-label={`${cell.label}: ${cell.value} — jump to section`}
            >
              {inner}
            </a>
          ) : (
            <div key={cell.label} className={cellClass}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
