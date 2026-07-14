import { notFound } from "next/navigation";
import { getRegionOptions, getTourDaysForAdmin, getTourForAdmin } from "@/server/admin/tours";
import { updateTour } from "@/features/admin/tours-actions";
import { TourComposer } from "@/features/admin/tour-composer";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditTourPage({ params }: Params) {
  const { id } = await params;
  const [tour, regions] = await Promise.all([getTourForAdmin(id), getRegionOptions()]);
  if (!tour) notFound();
  const days = await getTourDaysForAdmin(tour.id);

  const action = updateTour.bind(null, tour.id);

  return <TourComposer tour={tour} days={days} regions={regions} action={action} />;
}
