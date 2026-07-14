"use client";

import * as React from "react";
import Link from "next/link";
import type { Route } from "next";
import { ArrowLeft, Archive, CircleCheck, Circle } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { ContentTable } from "../lifecycle-actions";
import { useLifecycle } from "./use-lifecycle";
import { StatusBadge } from "./status-badge";

/**
 * ReviewPage — the lightweight draft-review surface for entities that don't
 * have a full composer yet (festivals, tribes, permits). Renders the entity's
 * complete body content read-only + publish/unpublish/archive controls, so
 * drafts can be reviewed and shipped from the admin (13-admin-editor-system §6).
 */

function Value({ v, depth = 0 }: { v: unknown; depth?: number }) {
  if (v == null) return <span className="text-muted-foreground">—</span>;
  if (typeof v === "string")
    return <span className="text-sm whitespace-pre-wrap text-foreground">{v}</span>;
  if (typeof v === "number" || typeof v === "boolean")
    return <span className="font-mono text-sm text-foreground">{String(v)}</span>;
  if (Array.isArray(v)) {
    if (v.length === 0) return <span className="text-muted-foreground">empty</span>;
    return (
      <ul className={cn("flex flex-col gap-1.5", depth > 0 && "mt-1")}>
        {v.map((item, i) => (
          <li key={i} className="border-l-2 border-border-subtle pl-3">
            <Value v={item} depth={depth + 1} />
          </li>
        ))}
      </ul>
    );
  }
  if (typeof v === "object") {
    return (
      <dl className={cn("flex flex-col gap-1.5", depth > 0 && "mt-1")}>
        {Object.entries(v as Record<string, unknown>).map(([k, val]) => (
          <div key={k} className="grid grid-cols-1 gap-x-3 sm:grid-cols-[140px_minmax(0,1fr)]">
            <dt className="font-mono text-[11px] leading-6 tracking-wider text-muted-foreground uppercase">
              {k.replace(/_/g, " ")}
            </dt>
            <dd className="min-w-0">
              <Value v={val} depth={depth + 1} />
            </dd>
          </div>
        ))}
      </dl>
    );
  }
  return <span className="text-sm">{String(v)}</span>;
}

export function ReviewSection({ title, value }: { title: string; value: unknown }) {
  if (value == null) return null;
  return (
    <section className="rounded-lg border border-border-subtle p-4 sm:p-5">
      <h2 className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">
        {title}
      </h2>
      <Value v={value} />
    </section>
  );
}

export function ReviewPage({
  table,
  noun,
  id,
  backHref,
  backLabel,
  kicker,
  title,
  slug,
  status,
  meta,
  children,
}: {
  table: ContentTable;
  noun: string;
  id: string;
  backHref: string;
  backLabel: string;
  kicker: string;
  title: string;
  slug?: string | null;
  status: string;
  /** Mono facts row under the title (month, type, verified date…). */
  meta?: React.ReactNode;
  children: React.ReactNode;
}) {
  const lc = useLifecycle(table, noun);
  const published = status === "published";

  return (
    <div className="flex max-w-3xl flex-col gap-5">
      <header className="flex flex-col gap-2 border-b border-border-subtle pb-4">
        <Link
          href={backHref as Route}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> {backLabel}
        </Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="min-w-0">
            <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              {kicker}
            </p>
            <h1 className="truncate text-xl font-semibold text-foreground">{title}</h1>
            {slug ? <p className="font-mono text-xs text-muted-foreground">{slug}</p> : null}
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <StatusBadge status={status} />
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
            <Button type="button" size="sm" variant="ghost" onClick={() => lc.archive([id])}>
              <Archive /> Archive
            </Button>
          </div>
        </div>
        {meta ? (
          <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            {meta}
          </div>
        ) : null}
      </header>
      {children}
      <p className="text-[11px] text-muted-foreground/80">
        Read-only review — content is managed by the pipeline until this entity gets its composer.
        Publishing applies instantly with a 10-second undo.
      </p>
    </div>
  );
}
