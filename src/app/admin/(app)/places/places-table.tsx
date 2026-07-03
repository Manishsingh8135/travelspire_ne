"use client";

import { CircleCheck, Circle, Archive, Trash2, Lock } from "lucide-react";
import { Badge } from "@/components/ui";
import type { AdminPlace } from "@/server/admin/places";
import { PLACE_KINDS } from "@/features/admin/schemas";
import {
  AdminTable,
  type AdminColumn,
  type TableFilter,
  type BulkAction,
} from "@/features/admin/ui/data-table";
import { StatusBadge } from "@/features/admin/ui/status-badge";
import { RowActions } from "@/features/admin/ui/row-actions";
import { useLifecycle } from "@/features/admin/ui/use-lifecycle";
import { formatRelative, formatElevation, formatCoords } from "@/features/admin/ui/format";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function PlacesTable({
  rows,
  total,
  pageSize,
  regionOptions,
}: {
  rows: AdminPlace[];
  total: number;
  pageSize: number;
  regionOptions: { id: string; name: string }[];
}) {
  const lc = useLifecycle("places", "place");

  const columns: AdminColumn<AdminPlace>[] = [
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
    { id: "status", header: "Status", sortable: true, cell: (r) => <StatusBadge status={r.status} /> },
    {
      id: "kind",
      header: "Kind",
      sortable: true,
      cell: (r) => <span className="capitalize text-muted-foreground">{r.kind}</span>,
    },
    {
      id: "region",
      header: "Region",
      cell: (r) => <span className="text-muted-foreground">{r.region_name ?? "—"}</span>,
    },
    {
      id: "elevation",
      header: "Elev.",
      sortable: true,
      align: "right",
      cell: (r) => (
        <span className="font-mono tabular-nums text-muted-foreground">
          {formatElevation(r.elevation_m)}
        </span>
      ),
    },
    {
      id: "coords",
      header: "Coords",
      cell: (r) => {
        const c = formatCoords(r.lat, r.lng);
        return c ? (
          <span className="font-mono text-xs text-muted-foreground tabular-nums">{c}</span>
        ) : (
          <Badge variant="warning">no coords</Badge>
        );
      },
    },
    {
      id: "flags",
      header: "",
      width: "w-0",
      cell: (r) =>
        r.is_secret || r.exclusivity_tier > 0 ? (
          <Badge variant="outline" className="gap-1">
            <Lock className="size-3" />
            {r.exclusivity_tier > 0 ? `tier ${r.exclusivity_tier}` : "secret"}
          </Badge>
        ) : null,
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
    { id: "kind", label: "Kind", options: PLACE_KINDS.map((k) => ({ value: k, label: capitalize(k) })) },
    { id: "region", label: "Region", options: regionOptions.map((r) => ({ value: r.id, label: r.name })) },
    {
      id: "secret",
      label: "Secret",
      options: [
        { value: "yes", label: "Secret only" },
        { value: "no", label: "Public only" },
      ],
    },
  ];

  const ids = (rows: AdminPlace[]) => rows.map((r) => r.id);
  const bulkActions: BulkAction<AdminPlace>[] = [
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
      searchPlaceholder="Search places…"
      entityPlural="places"
      getEditHref={(r) => `/admin/places/${r.id}`}
      bulkActions={bulkActions}
      rowActions={(r) => (
        <RowActions
          editHref={`/admin/places/${r.id}`}
          published={r.status === "published"}
          onPublishToggle={() =>
            r.status === "published" ? lc.unpublish([r.id]) : lc.publish([r.id])
          }
          onArchive={() => lc.archive([r.id])}
        />
      )}
      emptyState={
        <div className="flex flex-col items-center gap-2 p-12 text-center">
          <p className="font-display text-lg">No places yet</p>
          <p className="text-sm text-muted-foreground">Add the first destination to the atlas.</p>
        </div>
      }
    />
  );
}
