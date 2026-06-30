import { getRegionOptions } from "@/server/admin/tours";
import { createTour } from "@/features/admin/tours-actions";
import { TourForm } from "@/features/admin/tour-form";

export const dynamic = "force-dynamic";

export default async function NewTourPage() {
  const regions = await getRegionOptions();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl font-medium">New tour</h1>
        <p className="mt-1 text-muted-foreground">Saved as a draft — publish it from the list.</p>
      </div>
      <TourForm action={createTour} regions={regions} submitLabel="Create tour" />
    </div>
  );
}
