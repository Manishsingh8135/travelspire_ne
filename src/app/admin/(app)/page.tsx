import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAdminCounts } from "@/server/admin/regions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export const dynamic = "force-dynamic";

function StatCard({
  label,
  href,
  counts,
}: {
  label: string;
  href: "/admin/regions";
  counts: { total: number; published: number; draft: number };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          {label}
          <Link href={href} className="text-muted-foreground transition-colors hover:text-foreground">
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
      <div className="grid gap-5 sm:grid-cols-2">
        <StatCard label="Regions" href="/admin/regions" counts={counts.regions} />
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Places</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-6">
            <div>
              <p className="font-display text-4xl font-medium tabular-nums">
                {counts.places.total}
              </p>
              <p className="text-xs text-muted-foreground">total</p>
            </div>
            <div className="flex gap-4 pb-1 font-mono text-xs text-muted-foreground">
              <span className="tabular-nums">{counts.places.published} published</span>
              <span className="tabular-nums">{counts.places.draft} draft</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
