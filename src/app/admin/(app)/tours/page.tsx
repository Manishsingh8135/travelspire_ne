import Link from "next/link";
import type { Route } from "next";
import { Plus } from "lucide-react";
import { listToursForAdmin } from "@/server/admin/tours";
import { setTourPublished } from "@/features/admin/tours-actions";
import { Badge, Button } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function AdminToursPage() {
  const tours = await listToursForAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium">Tours</h1>
          <p className="mt-1 text-muted-foreground">Guided trips, treks and festival tours.</p>
        </div>
        <Button asChild>
          <Link href={"/admin/tours/new" as Route}>
            <Plus /> New tour
          </Link>
        </Button>
      </div>

      {tours.length ? (
        <div className="overflow-hidden rounded-lg border border-border-subtle">
          <table className="w-full text-sm">
            <thead className="border-b border-border-subtle bg-muted/40 text-left">
              <tr className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => {
                const published = tour.status === "published";
                return (
                  <tr key={tour.id} className="border-b border-border-subtle last:border-0">
                    <td className="px-4 py-3">
                      <div className="font-medium">{tour.title}</div>
                      <div className="font-mono text-xs text-muted-foreground">{tour.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground capitalize">{tour.type}</td>
                    <td className="px-4 py-3 tabular-nums text-muted-foreground">
                      {tour.price_inr ? `₹${tour.price_inr.toLocaleString("en-IN")}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={published ? "success" : "neutral"}>{tour.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/admin/tours/${tour.id}` as Route}>Edit</Link>
                        </Button>
                        <form action={setTourPublished.bind(null, tour.id, !published)}>
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
          No tours yet. Create your first one.
        </div>
      )}
    </div>
  );
}
