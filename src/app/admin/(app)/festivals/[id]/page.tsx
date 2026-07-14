import { notFound } from "next/navigation";
import { getFestivalForAdmin, getTribeOptions, getPlaceOptions } from "@/server/admin/content";
import { getRegionOptions } from "@/server/admin/tours";
import { updateFestival } from "@/features/admin/festivals-actions";
import { FestivalComposer } from "@/features/admin/festival-composer";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditFestivalPage({ params }: Params) {
  const { id } = await params;
  const [result, tribes, places, regions] = await Promise.all([
    getFestivalForAdmin(id),
    getTribeOptions(),
    getPlaceOptions(),
    getRegionOptions(),
  ]);
  if (!result) notFound();

  const action = updateFestival.bind(null, result.festival.id);

  return (
    <FestivalComposer
      festival={result.festival}
      events={result.events}
      tribes={tribes}
      places={places}
      regions={regions}
      action={action}
    />
  );
}
