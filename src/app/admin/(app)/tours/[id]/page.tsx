import { notFound } from "next/navigation";
import { getRegionOptions, getTourForAdmin } from "@/server/admin/tours";
import { updateTour } from "@/features/admin/tours-actions";
import { TourForm } from "@/features/admin/tour-form";
import { HeroUploader } from "@/features/admin/hero-uploader";
import { MediaImage } from "@/components/media/media-image";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditTourPage({ params }: Params) {
  const { id } = await params;
  const [tour, regions] = await Promise.all([getTourForAdmin(id), getRegionOptions()]);
  if (!tour) notFound();

  const action = updateTour.bind(null, tour.id);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-medium">Edit tour</h1>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{tour.slug}</p>
      </div>

      <section className="flex flex-col gap-4 rounded-lg border border-border-subtle p-5">
        <h2 className="font-display text-xl font-medium">Hero image</h2>
        {tour.hero ? (
          <div className="relative aspect-[16/9] w-72 overflow-hidden rounded-md border border-border-subtle bg-muted">
            <MediaImage media={tour.hero} sizes="288px" />
          </div>
        ) : null}
        <HeroUploader entity="tours" id={tour.id} hasHero={!!tour.hero_media_id} />
      </section>

      <TourForm action={action} tour={tour} regions={regions} submitLabel="Save changes" />
    </div>
  );
}
