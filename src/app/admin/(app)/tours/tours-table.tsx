"use client";

import { CircleCheck, Circle, Archive, Trash2 } from "lucide-react";
import { mediaPublicUrl } from "@/lib/media";
import type { AdminTour } from "@/server/admin/tours";
import { TOUR_TYPES, TOUR_DIFFICULTIES } from "@/features/admin/schemas";
import {
  AdminTable,
  type AdminColumn,
  type TableFilter,
  type BulkAction,
} from "@/features/admin/ui/data-table";
import { StatusBadge } from "@/features/admin/ui/status-badge";
import { RowActions } from "@/features/admin/ui/row-actions";
import { useLifecycle } from "@/features/admin/ui/use-lifecycle";
import { formatRelative, formatINR } from "@/features/admin/ui/format";

function Thumb({ hero }: { hero: AdminTour["hero"] }) {
  if (!hero?.storage_path) return <div className="h-6 w-9 rounded-xs bg-muted" aria-hidden />;
  return (
    <div
      className="h-6 w-9 rounded-xs bg-muted bg-cover bg-center"
      style={{ backgroundImage: `url(${mediaPublicUrl(hero.storage_path)})` }}
      aria-hidden
    />
  );
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function ToursTable({
  rows,
  total,
  pageSize,
  regionOptions,
}: {
  rows: AdminTour[];
  total: number;
  pageSize: number;
  regionOptions: { id: string; name: string }[];
}) {
  const lc = useLifecycle("tours", "tour");

  const columns: AdminColumn<AdminTour>[] = [
    { id: "thumb", header: "", width: "w-0", cell: (r) => <Thumb hero={r.hero} /> },
    {
      id: "title",
      header: "Title",
      sortable: true,
      cell: (r) => (
        <div className="min-w-0">
          <div className="truncate font-medium text-foreground">{r.title}</div>
          <div className="truncate font-mono text-xs text-muted-foreground">{r.slug}</div>
        </div>
      ),
    },
    { id: "status", header: "Status", sortable: true, cell: (r) => <StatusBadge status={r.status} /> },
    {
      id: "type",
      header: "Type",
      sortable: true,
      cell: (r) => <span className="capitalize">{r.type}</span>,
    },
    {
      id: "difficulty",
      header: "Difficulty",
      sortable: true,
      cell: (r) => <span className="capitalize text-muted-foreground">{r.difficulty}</span>,
    },
    {
      id: "days",
      header: "Days",
      sortable: true,
      align: "right",
      cell: (r) => (
        <span className="font-mono tabular-nums text-muted-foreground">{r.duration_days ?? "—"}</span>
      ),
    },
    {
      id: "price",
      header: "Price",
      sortable: true,
      align: "right",
      cell: (r) => <span className="font-mono tabular-nums">{formatINR(r.price_inr)}</span>,
    },
    {
      id: "updated",
      header: "Updated",
      sortable: true,
      align: "right",
      cell: (r) => (
        <span className="font-mono text-xs text-muted-foreground">{formatRelative(r.updated_at)}</span>
      ),
    },
  ];

  const filters: TableFilter[] = [
    {
      id: "status",
      label: "Status",
      options: [
        { value: "draft", label: "Draft" },
        { value: "published", label: "Published" },
        { value: "archived", label: "Archived" },
      ],
    },
    { id: "type", label: "Type", options: TOUR_TYPES.map((t) => ({ value: t, label: capitalize(t) })) },
    {
      id: "difficulty",
      label: "Difficulty",
      options: TOUR_DIFFICULTIES.map((d) => ({ value: d, label: capitalize(d) })),
    },
    { id: "region", label: "Region", options: regionOptions.map((r) => ({ value: r.id, label: r.name })) },
  ];

  const ids = (rows: AdminTour[]) => rows.map((r) => r.id);
  const bulkActions: BulkAction<AdminTour>[] = [
    { id: "publish", label: "Publish", icon: CircleCheck, run: (r) => lc.publish(ids(r)) },
    { id: "unpublish", label: "Unpublish", icon: Circle, run: (r) => lc.unpublish(ids(r)) },
    { id: "archive", label: "Archive", icon: Archive, run: (r) => lc.archive(ids(r)) },
    { id: "delete", label: "Delete", icon: Trash2, danger: true, run: (r) => lc.remove(ids(r)) },
  ];

  return (
    <AdminTable
      rows={rows}
      total={total}
      pageSize={pageSize}
      columns={columns}
      filters={filters}
      searchPlaceholder="Search tours…"
      entityPlural="tours"
      getEditHref={(r) => `/admin/tours/${r.id}`}
      bulkActions={bulkActions}
      rowActions={(r) => (
        <RowActions
          editHref={`/admin/tours/${r.id}`}
          published={r.status === "published"}
          onPublishToggle={() =>
            r.status === "published" ? lc.unpublish([r.id]) : lc.publish([r.id])
          }
          onArchive={() => lc.archive([r.id])}
        />
      )}
      emptyState={
        <div className="flex flex-col items-center gap-2 p-12 text-center">
          <p className="font-display text-lg">No tours yet</p>
          <p className="text-sm text-muted-foreground">
            Create your first departure — press <kbd className="font-mono">C</kbd> or use the button
            above.
          </p>
        </div>
      }
    />
  );
}
