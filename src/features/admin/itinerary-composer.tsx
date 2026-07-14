"use client";

import * as React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Plus } from "lucide-react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  DAY_TAGS,
  OVERNIGHT_TYPES,
  type DayTag,
  type ItineraryDay,
  type OvernightType,
  type SightseeingItem,
} from "@/lib/tours/itinerary";
import { TokenInput } from "./ui/token-input";
import { useEditorForm } from "./ui/editor-shell";

/**
 * ItineraryComposer — edits the REAL ItineraryDay shape (route, timings,
 * sightseeing tokens, overnight, tags), not flattened prose. Serializes the
 * full rich array to a hidden input validated server-side by ItinerarySchema.
 * Sightseeing stays tokens (the no-flatten law as UI); items keep their
 * placeId links as long as the token text is unchanged.
 */

type Row = ItineraryDay & { _key: string };

const selectClass =
  "h-9 rounded-sm border border-input bg-card px-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring";
const compactInput = "h-9 px-2.5 text-sm";
const miniLabel = "font-mono text-[10px] tracking-wider text-muted-foreground uppercase";

function toRows(days: ItineraryDay[]): Row[] {
  return days.map((d, i) => ({ ...d, _key: `d-${i}` }));
}

function serialize(rows: Row[]): string {
  return JSON.stringify(
    rows.map(
      (d, i): ItineraryDay => ({
        dayNo: i + 1,
        title: d.title ?? "",
        route: d.route?.from?.trim() && d.route?.to?.trim() ? d.route : null,
        distanceKm: d.distanceKm ?? null,
        driveTime: d.driveTime ?? null,
        tripTime: d.tripTime ?? null,
        summary: d.summary ?? null,
        sightseeing: d.sightseeing ?? [],
        overnight: d.overnight?.name?.trim() ? d.overnight : null,
        tags: d.tags ?? [],
      }),
    ),
  );
}

export function ItineraryComposer({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue: ItineraryDay[];
}) {
  const counter = React.useRef(defaultValue.length);
  const [rows, setRows] = React.useState<Row[]>(() => toRows(defaultValue));
  const { markDirty } = useEditorForm();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const mutate = (fn: (prev: Row[]) => Row[]) => {
    setRows(fn);
    markDirty();
  };
  const patch = (key: string, updates: Partial<ItineraryDay>) =>
    mutate((prev) => prev.map((r) => (r._key === key ? { ...r, ...updates } : r)));

  const addDay = () => {
    counter.current += 1;
    mutate((prev) => [
      ...prev,
      { _key: `new-${counter.current}`, dayNo: prev.length + 1, title: "", sightseeing: [], tags: [] },
    ]);
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    mutate((prev) => {
      const from = prev.findIndex((r) => r._key === active.id);
      const to = prev.findIndex((r) => r._key === over.id);
      return from < 0 || to < 0 ? prev : arrayMove(prev, from, to);
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <input type="hidden" name={name} value={serialize(rows)} readOnly />

      {rows.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border-subtle p-6 text-center text-sm text-muted-foreground">
          No days yet — add day 1 of the itinerary.
        </p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={rows.map((r) => r._key)} strategy={verticalListSortingStrategy}>
            <ol className="flex flex-col gap-3">
              {rows.map((row, i) => (
                <DayCard
                  key={row._key}
                  row={row}
                  index={i}
                  onPatch={patch}
                  onRemove={() => mutate((prev) => prev.filter((r) => r._key !== row._key))}
                />
              ))}
            </ol>
          </SortableContext>
        </DndContext>
      )}

      <Button type="button" variant="outline" size="sm" className="w-fit" onClick={addDay}>
        <Plus /> Add day
      </Button>
    </div>
  );
}

function DayCard({
  row,
  index,
  onPatch,
  onRemove,
}: {
  row: Row;
  index: number;
  onPatch: (key: string, updates: Partial<ItineraryDay>) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: row._key,
  });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
  };

  // Token edits map back onto existing items so placeId links survive renames-free edits.
  const onTokens = (tokens: string[]) => {
    const byName = new Map((row.sightseeing ?? []).map((s) => [s.name, s]));
    onPatch(row._key, {
      sightseeing: tokens.map((t): SightseeingItem => byName.get(t) ?? { name: t }),
    });
  };

  const toggleTag = (tag: DayTag) => {
    const tags = row.tags ?? [];
    onPatch(row._key, {
      tags: tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag],
    });
  };

  const setOvernight = (updates: { name?: string; type?: string }) => {
    const prev = row.overnight ?? null;
    const nextName = updates.name ?? prev?.name ?? "";
    const sameName = !!prev && nextName === prev.name;
    onPatch(row._key, {
      overnight: nextName.trim()
        ? {
            name: nextName,
            type: (updates.type ?? prev?.type ?? null) as OvernightType | null,
            // placeId/raw survive only while the name is unchanged.
            ...(sameName ? { placeId: prev?.placeId, raw: prev?.raw } : {}),
          }
        : null,
    });
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="rounded-lg border border-border-subtle bg-card p-3 sm:p-4 data-[dragging]:shadow-lg"
      data-dragging={isDragging || undefined}
    >
      {/* Header: grip · DAY n · title · tags · remove */}
      <div className="flex items-start gap-2">
        <button
          type="button"
          className="mt-2 h-fit cursor-grab touch-none rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground active:cursor-grabbing"
          aria-label={`Reorder day ${index + 1}`}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4" />
        </button>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="shrink-0 font-mono text-xs tracking-wider text-muted-foreground uppercase">
              Day {index + 1}
            </span>
            <Input
              value={row.title}
              onChange={(e) => onPatch(row._key, { title: e.target.value })}
              placeholder="Dibrugarh to Anini"
              className={compactInput}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-9 shrink-0 px-2 text-muted-foreground hover:text-danger"
              onClick={onRemove}
              aria-label={`Remove day ${index + 1}`}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>

          {/* Route + timing grid */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            <div className="flex flex-col gap-1">
              <Label className={miniLabel}>From</Label>
              <Input
                value={row.route?.from ?? ""}
                onChange={(e) =>
                  onPatch(row._key, {
                    route: { from: e.target.value, to: row.route?.to ?? "" },
                  })
                }
                placeholder="Dibrugarh"
                className={compactInput}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className={miniLabel}>To</Label>
              <Input
                value={row.route?.to ?? ""}
                onChange={(e) =>
                  onPatch(row._key, {
                    route: { from: row.route?.from ?? "", to: e.target.value },
                  })
                }
                placeholder="Anini"
                className={compactInput}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className={miniLabel}>Distance km</Label>
              <Input
                type="number"
                min="0"
                inputMode="numeric"
                value={row.distanceKm ?? ""}
                onChange={(e) =>
                  onPatch(row._key, {
                    distanceKm: e.target.value === "" ? null : Number(e.target.value),
                  })
                }
                className={cn(compactInput, "font-mono")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className={miniLabel}>Drive time</Label>
              <Input
                value={row.driveTime ?? ""}
                onChange={(e) => onPatch(row._key, { driveTime: e.target.value || null })}
                placeholder="6 hours approx"
                className={compactInput}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-1 sm:col-span-1">
              <Label className={miniLabel}>Trip time</Label>
              <Input
                value={row.tripTime ?? ""}
                onChange={(e) => onPatch(row._key, { tripTime: e.target.value || null })}
                placeholder="05:00–06:30"
                className={cn(compactInput, "font-mono")}
              />
            </div>
          </div>

          {/* Summary */}
          <Textarea
            value={row.summary ?? ""}
            onChange={(e) => onPatch(row._key, { summary: e.target.value || null })}
            placeholder="What happens on this day (optional prose)…"
            rows={2}
          />

          {/* Sightseeing tokens — the bullets stay tokens */}
          <div className="flex flex-col gap-1">
            <Label className={miniLabel}>Sightseeing (Enter to add)</Label>
            <TokenInput
              defaultTokens={(row.sightseeing ?? []).map((s) => s.name)}
              onTokensChange={onTokens}
              placeholder="Mayodia pass, Dree afra, Chigu camp…"
            />
          </div>

          {/* Overnight + tags */}
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex min-w-44 flex-1 flex-col gap-1">
              <Label className={miniLabel}>Night at</Label>
              <Input
                value={row.overnight?.name ?? ""}
                onChange={(e) => setOvernight({ name: e.target.value })}
                placeholder="Anini · leave empty for drop-off days"
                className={compactInput}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className={miniLabel}>Stay type</Label>
              <select
                value={row.overnight?.type ?? ""}
                onChange={(e) => setOvernight({ type: e.target.value || undefined })}
                className={selectClass}
              >
                <option value="">—</option>
                {OVERNIGHT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DAY_TAGS.map((tag) => {
                const on = (row.tags ?? []).includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    aria-pressed={on}
                    className={cn(
                      "rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase transition-colors",
                      on
                        ? "border-accent/50 bg-accent/10 font-medium text-foreground"
                        : "border-border-subtle text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
