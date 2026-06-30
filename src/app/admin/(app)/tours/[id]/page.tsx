import { notFound } from "next/navigation";
import { getRegionOptions, getTourForAdmin } from "@/server/admin/tours";
import { updateTour } from "@/features/admin/tours-actions";
import { TourForm } from "@/features/admin/tour-form";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditTourPage({ params }: Params) {
  const { id } = await params;
  const [tour, regions] = await Promise.all([getTourForAdmin(id), getRegionOptions()]);
  if (!tour) notFound();

  const action = updateTour.bind(null, tour.id);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl font-medium">Edit tour</h1>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{tour.slug}</p>
      </div>
      <TourForm action={action} tour={tour} regions={regions} submitLabel="Save changes" />
    </div>
  );
}
