import Link from "next/link";
import type { Route } from "next";
import { Plus } from "lucide-react";
import { listRegionsForAdmin } from "@/server/admin/regions";
import { setRegionPublished } from "@/features/admin/regions-actions";
import { Badge, Button } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function AdminRegionsPage() {
  const regions = await listRegionsForAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium">Regions</h1>
          <p className="mt-1 text-muted-foreground">States, districts and valleys.</p>
        </div>
        <Button asChild>
          <Link href={"/admin/regions/new" as Route}>
            <Plus /> New region
          </Link>
        </Button>
      </div>

      {regions.length ? (
        <div className="overflow-hidden rounded-lg border border-border-subtle">
          <table className="w-full text-sm">
            <thead className="border-b border-border-subtle bg-muted/40 text-left">
              <tr className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Level</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {regions.map((region) => {
                const published = region.status === "published";
                return (
                  <tr key={region.id} className="border-b border-border-subtle last:border-0">
                    <td className="px-4 py-3 font-medium">{region.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {region.slug}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground capitalize">{region.level}</td>
                    <td className="px-4 py-3">
                      <Badge variant={published ? "success" : "neutral"}>{region.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/admin/regions/${region.id}` as Route}>Edit</Link>
                        </Button>
                        <form action={setRegionPublished.bind(null, region.id, !published)}>
                          <Button size="sm" variant="outline" type="submit">
                            {published ? "Unpublish" : "Publish"}
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground">
          No regions yet. Create your first one.
        </div>
      )}
    </div>
  );
}
