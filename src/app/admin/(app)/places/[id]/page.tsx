import { notFound } from "next/navigation";
import { getPlaceForAdmin, getRegionOptions } from "@/server/admin/places";
import { getRegionForAdmin } from "@/server/admin/regions";
import { getTribeOptions } from "@/server/admin/content";
import { updatePlace } from "@/features/admin/places-actions";
import { PlaceComposer } from "@/features/admin/place-composer";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditPlacePage({ params }: Params) {
  const { id } = await params;
  const [place, regions, tribes] = await Promise.all([
    getPlaceForAdmin(id),
    getRegionOptions(),
    getTribeOptions(),
  ]);
  if (!place) notFound();

  const region = place.region_id ? await getRegionForAdmin(place.region_id) : null;
  const liveHref = region ? `/${region.slug}/${place.slug}` : undefined;
  const action = updatePlace.bind(null, place.id);

  return (
    <PlaceComposer
      place={place}
      regions={regions}
      tribes={tribes}
      liveHref={liveHref}
      action={action}
    />
  );
}
