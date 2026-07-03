"use client";

import Link from "next/link";
import type { Route } from "next";
import { Archive } from "lucide-react";
import { Button } from "@/components/ui";

/**
 * Standard per-row action cluster: Edit, publish toggle, archive. Rendered inside
 * AdminTable's actions cell (which already stops row-click propagation).
 */
export function RowActions({
  editHref,
  published,
  onPublishToggle,
  onArchive,
}: {
  editHref: string;
  published: boolean;
  onPublishToggle: () => void;
  onArchive: () => void;
}) {
  return (
    <>
      <Button asChild size="sm" variant="ghost" className="h-8">
        <Link href={editHref as Route}>Edit</Link>
      </Button>
      <Button size="sm" variant="ghost" className="h-8" onClick={onPublishToggle}>
        {published ? "Unpublish" : "Publish"}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="h-8 px-2 text-muted-foreground hover:text-foreground"
        onClick={onArchive}
        aria-label="Archive"
        title="Archive"
      >
        <Archive className="size-4" />
      </Button>
    </>
  );
}
