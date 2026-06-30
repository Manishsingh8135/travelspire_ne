import Link from "next/link";
import type { Route } from "next";
import { Plus } from "lucide-react";
import { listPlacesForAdmin } from "@/server/admin/places";
import { setPlacePublished } from "@/features/admin/places-actions";
import { Badge, Button } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function AdminPlacesPage() {
  const places = await listPlacesForAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium">Places</h1>
          <p className="mt-1 text-muted-foreground">Destinations across the atlas.</p>
        </div>
        <Button asChild>
          <Link href={"/admin/places/new" as Route}>
            <Plus /> New place
          </Link>
        </Button>
      </div>

      {places.length ? (
        <div className="overflow-hidden rounded-lg border border-border-subtle">
          <table className="w-full text-sm">
            <thead className="border-b border-border-subtle bg-muted/40 text-left">
              <tr className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Region</th>
                <th className="px-4 py-3 font-medium">Kind</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {places.map((place) => {
                const published = place.status === "published";
                return (
                  <tr key={place.id} className="border-b border-border-subtle last:border-0">
                    <td className="px-4 py-3 font-medium">{place.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {place.regionName ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground capitalize">{place.kind}</td>
                    <td className="px-4 py-3">
                      <Badge variant={published ? "success" : "neutral"}>{place.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/admin/places/${place.id}` as Route}>Edit</Link>
                        </Button>
                        <form action={setPlacePublished.bind(null, place.id, !published)}>
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
          No places yet. Create your first one.
        </div>
      )}
    </div>
  );
}
