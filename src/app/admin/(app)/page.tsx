import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight, Plus, Route as RouteIcon, MapPin, Map, ImagePlus } from "lucide-react";
import { getAdminCounts } from "@/server/admin/regions";
import type { EntityCounts } from "@/server/admin/query";

export const dynamic = "force-dynamic";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 5) return "Late night";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function StatTile({
  label,
  base,
  counts,
}: {
  label: string;
  base: string;
  counts: EntityCounts;
}) {
  return (
    <Link
      href={base as Route}
      className="group flex flex-col rounded-lg border border-border-subtle bg-card p-4 transition-colors hover:border-border-strong"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <p className="mt-3 font-display text-4xl font-medium tabular-nums">{counts.total}</p>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-xs text-muted-foreground">
        <span className="text-success">{counts.published} live</span>
        <span>{counts.draft} draft</span>
        {counts.archived > 0 ? <span>{counts.archived} archived</span> : null}
      </div>
    </Link>
  );
}

const QUICK = [
  { label: "New tour", href: "/admin/tours/new", icon: RouteIcon },
  { label: "New place", href: "/admin/places/new", icon: MapPin },
  { label: "New region", href: "/admin/regions/new", icon: Map },
];

export default async function AdminDashboard() {
  const counts = await getAdminCounts();
  const drafts = [
    { label: "tours", n: counts.tours.draft, href: "/admin/tours?status=draft" },
    { label: "places", n: counts.places.draft, href: "/admin/places?status=draft" },
    { label: "regions", n: counts.regions.draft, href: "/admin/regions?status=draft" },
  ].filter((d) => d.n > 0);
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="flex max-w-5xl flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-medium">{greeting()}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{today}</p>
      </div>

      {/* Needs attention */}
      <section className="flex flex-col gap-2">
        <h2 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Needs attention
        </h2>
        {drafts.length ? (
          <div className="flex flex-wrap gap-2">
            {drafts.map((d) => (
              <Link
                key={d.label}
                href={d.href as Route}
                className="flex items-center gap-2 rounded-md border border-border-subtle bg-card px-3 py-2 text-sm transition-colors hover:border-border-strong"
              >
                <span className="grid size-6 place-items-center rounded-full bg-warning/15 font-mono text-xs tabular-nums text-warning">
                  {d.n}
                </span>
                Finish {d.label} {d.n === 1 ? "draft" : "drafts"}
                <ArrowUpRight className="size-3.5 text-muted-foreground" />
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-md border border-border-subtle bg-card px-3 py-2.5 text-sm text-muted-foreground">
            All clear — nothing waiting to be finished.
          </p>
        )}
      </section>

      {/* Content pulse */}
      <section className="flex flex-col gap-2">
        <h2 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Content
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <StatTile label="Tours" base="/admin/tours" counts={counts.tours} />
          <StatTile label="Places" base="/admin/places" counts={counts.places} />
          <StatTile label="Regions" base="/admin/regions" counts={counts.regions} />
        </div>
      </section>

      {/* Quick actions */}
      <section className="flex flex-col gap-2">
        <h2 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Quick create
        </h2>
        <div className="flex flex-wrap gap-2">
          {QUICK.map((q) => (
            <Link
              key={q.href}
              href={q.href as Route}
              className="flex items-center gap-2 rounded-md border border-border-subtle bg-card px-3.5 py-2.5 text-sm font-medium transition-colors hover:border-border-strong"
            >
              <q.icon className="size-4 text-muted-foreground" />
              {q.label}
            </Link>
          ))}
          <span className="flex cursor-default items-center gap-2 rounded-md border border-dashed border-border-subtle px-3.5 py-2.5 text-sm text-muted-foreground/60">
            <ImagePlus className="size-4" />
            Upload media
            <span className="font-mono text-[0.5625rem] tracking-wide uppercase">soon</span>
          </span>
        </div>
      </section>

      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Plus className="size-3" />
        Press <kbd className="rounded-xs border border-border-subtle bg-muted px-1 font-mono">⌘K</kbd>{" "}
        anywhere to search or jump.
      </p>
    </div>
  );
}
