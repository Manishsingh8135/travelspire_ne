import { createPlace } from "@/features/admin/places-actions";
import { PlaceForm } from "@/features/admin/place-form";
import { getRegionOptions } from "@/server/admin/places";

export const dynamic = "force-dynamic";

export default async function NewPlacePage() {
  const regions = await getRegionOptions();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl font-medium">New place</h1>
        <p className="mt-1 text-muted-foreground">Saved as a draft — publish it from the list.</p>
      </div>
      <PlaceForm action={createPlace} regions={regions} submitLabel="Create place" />
    </div>
  );
}
