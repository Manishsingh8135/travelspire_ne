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
import { Button, Input, Textarea } from "@/components/ui";

export type ItineraryDay = { title: string; description: string };
type Row = ItineraryDay & { key: string };

/**
 * Day-by-day itinerary editor. Owns the day list, serializes it to a hidden
 * input (`name`) as JSON so the existing FormData server action can read it.
 * Drag to reorder (pointer + keyboard); days renumber automatically.
 */
export function ItineraryEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue: ItineraryDay[];
}) {
  const counter = React.useRef(defaultValue.length);
  const [rows, setRows] = React.useState<Row[]>(() =>
    defaultValue.map((d, i) => ({ ...d, key: `init-${i}` })),
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const addDay = () => {
    counter.current += 1;
    setRows((r) => [...r, { key: `new-${counter.current}`, title: "", description: "" }]);
  };
  const removeDay = (key: string) => setRows((r) => r.filter((d) => d.key !== key));
  const patch = (key: string, field: keyof ItineraryDay, value: string) =>
    setRows((r) => r.map((d) => (d.key === key ? { ...d, [field]: value } : d)));

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    setRows((r) => {
      const from = r.findIndex((d) => d.key === active.id);
      const to = r.findIndex((d) => d.key === over.id);
      return from < 0 || to < 0 ? r : arrayMove(r, from, to);
    });
  };

  const serialized = JSON.stringify(rows.map(({ title, description }) => ({ title, description })));

  return (
    <div className="flex flex-col gap-3">
      <input type="hidden" name={name} value={serialized} readOnly />

      {rows.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border-subtle p-6 text-center text-sm text-muted-foreground">
          No days yet — add the first day of the itinerary.
        </p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={rows.map((r) => r.key)} strategy={verticalListSortingStrategy}>
            <ol className="flex flex-col gap-2.5">
              {rows.map((row, i) => (
                <DayCard
                  key={row.key}
                  row={row}
                  index={i}
                  onPatch={patch}
                  onRemove={() => removeDay(row.key)}
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
  onPatch: (key: string, field: keyof ItineraryDay, value: string) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: row.key,
  });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex gap-2 rounded-lg border border-border-subtle bg-card p-3 data-[dragging]:shadow-lg"
      data-dragging={isDragging || undefined}
    >
      <button
        type="button"
        className="mt-1 h-fit cursor-grab touch-none rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground active:cursor-grabbing"
        aria-label={`Reorder day ${index + 1}`}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4" />
      </button>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="shrink-0 font-mono text-xs tracking-wider text-muted-foreground uppercase">
            Day {index + 1}
          </span>
          <Input
            value={row.title}
            onChange={(e) => onPatch(row.key, "title", e.target.value)}
            placeholder="Arrive in Tawang"
            className="h-9"
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
        <Textarea
          value={row.description}
          onChange={(e) => onPatch(row.key, "description", e.target.value)}
          placeholder="What happens on this day…"
          rows={2}
        />
      </div>
    </li>
  );
}
