"use client";

import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button, Input, Textarea } from "@/components/ui";
import { cn } from "@/lib/cn";
import { useEditorForm } from "./editor-shell";

/**
 * PairList — a generic two-field repeater (FAQ q/a, fee label/value,
 * what-to-expect title/note). Serializes [{a, b}] to a hidden JSON input;
 * the action maps a/b onto the entity's real keys.
 */

export type PairRow = { a: string; b: string };
type Row = PairRow & { key: string };

export function PairList({
  name,
  defaultRows,
  aLabel,
  bLabel,
  aPlaceholder,
  bPlaceholder,
  bTextarea = false,
}: {
  name: string;
  defaultRows: PairRow[];
  aLabel: string;
  bLabel: string;
  aPlaceholder?: string;
  bPlaceholder?: string;
  bTextarea?: boolean;
}) {
  const counter = React.useRef(defaultRows.length);
  const [rows, setRows] = React.useState<Row[]>(() =>
    defaultRows.map((r, i) => ({ ...r, key: `r-${i}` })),
  );
  const { markDirty } = useEditorForm();

  const mutate = (next: Row[]) => {
    setRows(next);
    markDirty();
  };
  const patch = (key: string, field: "a" | "b", value: string) =>
    mutate(rows.map((r) => (r.key === key ? { ...r, [field]: value } : r)));

  const serialized = JSON.stringify(
    rows.map(({ a, b }) => ({ a: a.trim(), b: b.trim() })).filter((r) => r.a || r.b),
  );

  return (
    <div className="flex flex-col gap-2.5">
      <input type="hidden" name={name} value={serialized} readOnly />
      <div className="hidden grid-cols-[minmax(0,2fr)_minmax(0,3fr)_36px] gap-2 sm:grid">
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          {aLabel}
        </span>
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          {bLabel}
        </span>
        <span />
      </div>
      {rows.map((r) => (
        <div
          key={r.key}
          className="grid grid-cols-1 gap-2 rounded-md border border-border-subtle p-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_36px] sm:border-0 sm:p-0"
        >
          <Input
            value={r.a}
            onChange={(e) => patch(r.key, "a", e.target.value)}
            placeholder={aPlaceholder ?? aLabel}
            className={cn("h-9 px-2.5 text-sm", !bTextarea && "sm:self-start")}
          />
          {bTextarea ? (
            <Textarea
              value={r.b}
              onChange={(e) => patch(r.key, "b", e.target.value)}
              placeholder={bPlaceholder ?? bLabel}
              rows={2}
            />
          ) : (
            <Input
              value={r.b}
              onChange={(e) => patch(r.key, "b", e.target.value)}
              placeholder={bPlaceholder ?? bLabel}
              className="h-9 px-2.5 text-sm"
            />
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-9 w-fit px-2 text-muted-foreground hover:text-danger sm:w-auto"
            aria-label="Remove row"
            onClick={() => mutate(rows.filter((x) => x.key !== r.key))}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => {
          counter.current += 1;
          mutate([...rows, { key: `n-${counter.current}`, a: "", b: "" }]);
        }}
      >
        <Plus /> Add row
      </Button>
    </div>
  );
}
