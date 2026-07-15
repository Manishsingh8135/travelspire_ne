import type { ArrangeRow } from "@/lib/tours/read";
import { PermitStamp, Jeep, Compass, HomestayHut } from "@/components/icons/field-icons";

/**
 * The "what we arrange" stamped ledger (08-blueprint/05 §3.6) — the moat made
 * visible. Field Icon + mono label + dotted leader + status, one ruled row per
 * arrangement. Rows come from body.arrange (seeded from the tour's REAL
 * inclusions — never invented).
 */

const ICONS = { permit: PermitStamp, vehicle: Jeep, guide: Compass, stay: HomestayHut } as const;

export function ArrangeLedger({ rows, className }: { rows: ArrangeRow[]; className?: string }) {
  if (rows.length === 0) return null;
  return (
    <ul className={className}>
      {rows.map((row) => {
        const Icon = ICONS[row.icon];
        return (
          <li
            key={`${row.icon}-${row.label}`}
            className="flex items-center gap-3.5 border-b border-dotted border-border-default py-4 last:border-0"
          >
            <Icon aria-hidden className="size-5 shrink-0 text-secondary" />
            <span className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase">
              {row.label}
            </span>
            <span
              aria-hidden
              className="mx-1 flex-1 -translate-y-1 border-b border-dotted border-border-strong"
            />
            <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-success uppercase">
              {row.status}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
