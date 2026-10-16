import * as React from "react";
import { cn } from "@/lib/utils";

/* A reference table that stays one DOM on every screen: a real <table> from
   md up; below that each row becomes a labelled block (the column label is
   drawn from data-label), so nothing scrolls sideways on a phone. */

export type Column<Row> = {
  key: string;
  label: string;
  render: (row: Row) => React.ReactNode;
  /** The row's title on phones: shown first, without its label. */
  primary?: boolean;
  className?: string;
};

export function DataTable<Row>({
  columns,
  rows,
  rowKey,
  caption,
  className,
}: {
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  caption?: string;
  className?: string;
}) {
  return (
    <table className={cn("w-full border-collapse font-ui text-small", className)}>
      {caption ? <caption className="sr-only">{caption}</caption> : null}
      <thead className="max-md:sr-only">
        <tr className="border-b border-line-strong">
          {columns.map((col) => (
            <th key={col.key} scope="col" className="px-3 pb-3 text-left text-eyebrow font-semibold uppercase text-fg-subtle first:pl-0 last:pr-0">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={rowKey(row)} className="border-b border-line max-md:block max-md:py-4">
            {columns.map((col) =>
              col.primary ? (
                <th
                  key={col.key}
                  scope="row"
                  className={cn(
                    "px-3 py-4 text-left align-top text-body font-semibold text-fg first:pl-0 last:pr-0 max-md:block max-md:p-0 max-md:pb-2",
                    col.className,
                  )}
                >
                  {col.render(row)}
                </th>
              ) : (
                <td
                  key={col.key}
                  data-label={col.label}
                  className={cn(
                    "px-3 py-4 align-top text-fg-muted first:pl-0 last:pr-0",
                    "max-md:grid max-md:grid-cols-[7.5rem_minmax(0,1fr)] max-md:gap-3 max-md:px-0 max-md:py-1",
                    "max-md:before:text-fg-subtle max-md:before:content-[attr(data-label)]",
                    col.className,
                  )}
                >
                  <span>{col.render(row)}</span>
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
