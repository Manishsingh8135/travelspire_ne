import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { getAdminCounts } from "@/server/admin/regions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export const dynamic = "force-dynamic";

type Counts = { total: number; published: number; draft: number };

function StatCard({ label, href, counts }: { label: string; href: Route; counts: Counts }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          {label}
          <Link
            href={href}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Manage ${label}`}
          >
            <ArrowRight className="size-4" />
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-end gap-6">
        <div>
          <p className="font-display text-4xl font-medium tabular-nums">{counts.total}</p>
          <p className="text-xs text-muted-foreground">total</p>
        </div>
        <div className="flex gap-4 pb-1 font-mono text-xs text-muted-foreground">
          <span className="tabular-nums">{counts.published} published</span>
          <span className="tabular-nums">{counts.draft} draft</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function AdminDashboard() {
  const counts = await getAdminCounts();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-medium">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Manage what people see across the atlas.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard label="Regions" href={"/admin/regions" as Route} counts={counts.regions} />
        <StatCard label="Places" href={"/admin/places" as Route} counts={counts.places} />
        <StatCard label="Tours" href={"/admin/tours" as Route} counts={counts.tours} />
      </div>
    </div>
  );
}
