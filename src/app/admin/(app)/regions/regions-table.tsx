"use client";

import { CircleCheck, Circle, Archive, Trash2 } from "lucide-react";
import type { Region } from "@/lib/supabase/types";
import {
  AdminTable,
  type AdminColumn,
  type TableFilter,
  type BulkAction,
} from "@/features/admin/ui/data-table";
import { StatusBadge } from "@/features/admin/ui/status-badge";
import { RowActions } from "@/features/admin/ui/row-actions";
import { useLifecycle } from "@/features/admin/ui/use-lifecycle";
import { formatRelative } from "@/features/admin/ui/format";

export function RegionsTable({
  rows,
  total,
  pageSize,
}: {
  rows: Region[];
  total: number;
  pageSize: number;
}) {
  const lc = useLifecycle("regions", "region");

  const columns: AdminColumn<Region>[] = [
    {
      id: "name",
      header: "Name",
      sortable: true,
      cell: (r) => (
        <div className="min-w-0">
          <div className="truncate font-medium text-foreground">{r.name}</div>
          <div className="truncate font-mono text-xs text-muted-foreground">{r.slug}</div>
        </div>
      ),
    },
    {
      id: "level",
      header: "Level",
      sortable: true,
      cell: (r) => <span className="capitalize text-muted-foreground">{r.level}</span>,
    },
    { id: "status", header: "Status", sortable: true, cell: (r) => <StatusBadge status={r.status} /> },
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
    {
      id: "level",
      label: "Level",
      options: [
        { value: "state", label: "State" },
        { value: "district", label: "District" },
        { value: "valley", label: "Valley" },
      ],
    },
  ];

  const ids = (rows: Region[]) => rows.map((r) => r.id);
  const bulkActions: BulkAction<Region>[] = [
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
      searchPlaceholder="Search regions…"
      entityPlural="regions"
      getEditHref={(r) => `/admin/regions/${r.id}`}
      bulkActions={bulkActions}
      rowActions={(r) => (
        <RowActions
          editHref={`/admin/regions/${r.id}`}
          published={r.status === "published"}
          onPublishToggle={() =>
            r.status === "published" ? lc.unpublish([r.id]) : lc.publish([r.id])
          }
          onArchive={() => lc.archive([r.id])}
        />
      )}
      emptyState={
        <div className="flex flex-col items-center gap-2 p-12 text-center">
          <p className="font-display text-lg">No regions yet</p>
          <p className="text-sm text-muted-foreground">
            States, districts and valleys — the atlas backbone.
          </p>
        </div>
      }
    />
  );
}
