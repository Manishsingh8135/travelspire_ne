import { notFound } from "next/navigation";
import { getPlaceForAdmin, getRegionOptions } from "@/server/admin/places";
import { updatePlace } from "@/features/admin/places-actions";
import { PlaceForm } from "@/features/admin/place-form";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditPlacePage({ params }: Params) {
  const { id } = await params;
  const [place, regions] = await Promise.all([getPlaceForAdmin(id), getRegionOptions()]);
  if (!place) notFound();

  const action = updatePlace.bind(null, place.id);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl font-medium">Edit place</h1>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{place.slug}</p>
      </div>
      <PlaceForm action={action} place={place} regions={regions} submitLabel="Save changes" />
    </div>
  );
}
