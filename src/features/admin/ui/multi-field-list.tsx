"use client";

import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button, Input, Textarea } from "@/components/ui";
import { cn } from "@/lib/cn";
import { useEditorForm } from "./editor-shell";

/**
 * MultiFieldList — an N-column repeater (approach legs, road gates, airports,
 * signature moments…). Column config drives the desktop grid (12 cols, +1 for
 * the remove button); mobile stacks each row into a bordered card. Serializes
 * an array of records to a hidden JSON input.
 */

export type MultiField = {
  key: string;
  label: string;
  placeholder?: string;
  textarea?: boolean;
  /** Desktop col-span on the row's 12-col grid. Field spans should sum to ≤11. */
  span?: number;
  mono?: boolean;
};

// Literal classes so Tailwind sees them.
const SPAN: Record<number, string> = {
  1: "sm:col-span-1",
  2: "sm:col-span-2",
  3: "sm:col-span-3",
  4: "sm:col-span-4",
  5: "sm:col-span-5",
  6: "sm:col-span-6",
  7: "sm:col-span-7",
  8: "sm:col-span-8",
  9: "sm:col-span-9",
  10: "sm:col-span-10",
  11: "sm:col-span-11",
};

type Row = { _key: string; values: Record<string, string> };

export function MultiFieldList({
  name,
  fields,
  defaultRows,
  addLabel = "Add row",
}: {
  name: string;
  fields: MultiField[];
  defaultRows: Record<string, string>[];
  addLabel?: string;
}) {
  const counter = React.useRef(defaultRows.length);
  const [rows, setRows] = React.useState<Row[]>(() =>
    defaultRows.map((values, i) => ({ _key: `r-${i}`, values })),
  );
  const { markDirty } = useEditorForm();

  const fallbackSpan = Math.max(1, Math.floor(11 / fields.length));
  const spanClass = (f: MultiField) => SPAN[f.span ?? fallbackSpan] ?? "sm:col-span-2";

  const mutate = (next: Row[]) => {
    setRows(next);
    markDirty();
  };
  const patch = (key: string, field: string, value: string) =>
    mutate(
      rows.map((r) => (r._key === key ? { ...r, values: { ...r.values, [field]: value } } : r)),
    );

  const serialized = JSON.stringify(
    rows
      .map((r) => Object.fromEntries(fields.map((f) => [f.key, (r.values[f.key] ?? "").trim()])))
      .filter((r) => Object.values(r).some(Boolean)),
  );

  return (
    <div className="flex flex-col gap-2.5">
      <input type="hidden" name={name} value={serialized} readOnly />
      {/* Desktop column headers */}
      <div className="hidden gap-2 sm:grid sm:grid-cols-12">
        {fields.map((f) => (
          <span
            key={f.key}
            className={cn(
              "font-mono text-[10px] tracking-wider text-muted-foreground uppercase",
              spanClass(f),
            )}
          >
            {f.label}
          </span>
        ))}
      </div>
      {rows.map((r) => (
        <div
          key={r._key}
          className="grid grid-cols-1 gap-2 rounded-md border border-border-subtle p-2.5 sm:grid-cols-12 sm:items-start sm:border-0 sm:p-0"
        >
          {fields.map((f) => (
            <div key={f.key} className={spanClass(f)}>
              {/* Mobile-only field label (columns headers are desktop-only) */}
              <span className="mb-1 block font-mono text-[10px] tracking-wider text-muted-foreground uppercase sm:hidden">
                {f.label}
              </span>
              {f.textarea ? (
                <Textarea
                  rows={2}
                  value={r.values[f.key] ?? ""}
                  placeholder={f.placeholder ?? f.label}
                  onChange={(e) => patch(r._key, f.key, e.target.value)}
                />
              ) : (
                <Input
                  value={r.values[f.key] ?? ""}
                  placeholder={f.placeholder ?? f.label}
                  onChange={(e) => patch(r._key, f.key, e.target.value)}
                  className={cn("h-9 px-2.5 text-sm", f.mono && "font-mono")}
                />
              )}
            </div>
          ))}
          <div className="sm:col-span-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-9 px-2 text-muted-foreground hover:text-danger"
              aria-label="Remove row"
              onClick={() => mutate(rows.filter((x) => x._key !== r._key))}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => {
          counter.current += 1;
          mutate([...rows, { _key: `n-${counter.current}`, values: {} }]);
        }}
      >
        <Plus /> {addLabel}
      </Button>
    </div>
  );
}
