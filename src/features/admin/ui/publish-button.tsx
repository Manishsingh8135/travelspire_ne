"use client";

import { CircleCheck, Circle } from "lucide-react";
import { Button } from "@/components/ui";
import type { ContentTable } from "../lifecycle-actions";
import { useLifecycle } from "./use-lifecycle";

/** Publish/unpublish from an editor header — instant, with the undo toast. */
export function PublishButton({
  table,
  noun,
  id,
  status,
}: {
  table: ContentTable;
  noun: string;
  id: string;
  status: string;
}) {
  const lc = useLifecycle(table, noun);
  const published = status === "published";
  return (
    <Button
      type="button"
      size="sm"
      variant={published ? "outline" : "primary"}
      onClick={() => (published ? lc.unpublish([id]) : lc.publish([id]))}
    >
      {published ? (
        <>
          <Circle /> Unpublish
        </>
      ) : (
        <>
          <CircleCheck /> Publish
        </>
      )}
    </Button>
  );
}
