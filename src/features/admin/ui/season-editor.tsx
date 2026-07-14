"use client";

import * as React from "react";
import { Input } from "@/components/ui";
import { cn } from "@/lib/cn";
import { useEditorForm } from "./editor-shell";

/**
 * SeasonEditor — the 12-month band (06-state-hub-vertical §2 §7): per month a
 * weather glyph, a road-risk level and a one-line note. Rows are fixed (always
 * exactly Jan–Dec); serializes [{m, glyph, road_risk, note}] to a hidden input.
 */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const GLYPHS = ["sun", "mist", "rain", "snow"] as const;
const RISKS = [
  { value: 0, label: "clear" },
  { value: 1, label: "caution" },
  { value: 2, label: "serious" },
] as const;

type MonthRow = { m: number; glyph: string; road_risk: number; note: string };

const selectClass =
  "h-9 rounded-sm border border-input bg-card px-2 text-sm text-foreground outline-none transition-colors focus-visible:border-ring";

function normalize(defaultValue: unknown): MonthRow[] {
  const byMonth = new Map<number, MonthRow>();
  if (Array.isArray(defaultValue)) {
    for (const raw of defaultValue) {
      const r = raw as { m?: unknown; glyph?: unknown; road_risk?: unknown; note?: unknown };
      const m = Number(r?.m);
      if (m >= 1 && m <= 12)
        byMonth.set(m, {
          m,
          glyph: String(r?.glyph ?? "sun"),
          road_risk: Number(r?.road_risk ?? 0),
          note: String(r?.note ?? ""),
        });
    }
  }
  return Array.from({ length: 12 }, (_, i) => {
    return byMonth.get(i + 1) ?? { m: i + 1, glyph: "sun", road_risk: 0, note: "" };
  });
}

export function SeasonEditor({ name, defaultValue }: { name: string; defaultValue: unknown }) {
  const [months, setMonths] = React.useState<MonthRow[]>(() => normalize(defaultValue));
  const { markDirty } = useEditorForm();

  const patch = (m: number, updates: Partial<MonthRow>) => {
    setMonths((prev) => prev.map((row) => (row.m === m ? { ...row, ...updates } : row)));
    markDirty();
  };

  return (
    <div className="flex flex-col gap-1.5">
      <input type="hidden" name={name} value={JSON.stringify(months)} readOnly />
      {months.map((row) => (
        <div
          key={row.m}
          className="grid grid-cols-[44px_88px_100px_minmax(0,1fr)] items-center gap-2"
        >
          <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            {MONTHS[row.m - 1]}
          </span>
          <select
            aria-label={`${MONTHS[row.m - 1]} weather`}
            value={row.glyph}
            onChange={(e) => patch(row.m, { glyph: e.target.value })}
            className={selectClass}
          >
            {GLYPHS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <select
            aria-label={`${MONTHS[row.m - 1]} road risk`}
            value={row.road_risk}
            onChange={(e) => patch(row.m, { road_risk: Number(e.target.value) })}
            className={cn(
              selectClass,
              row.road_risk === 2 && "text-danger",
              row.road_risk === 1 && "text-warning",
            )}
          >
            {RISKS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <Input
            value={row.note}
            onChange={(e) => patch(row.m, { note: e.target.value })}
            placeholder="One-line reality for this month"
            className="h-9 px-2.5 text-sm"
          />
        </div>
      ))}
    </div>
  );
}
