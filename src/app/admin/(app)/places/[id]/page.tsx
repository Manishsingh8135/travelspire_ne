import { notFound } from "next/navigation";
import { getPlaceForAdmin, getRegionOptions } from "@/server/admin/places";
import { getRegionForAdmin } from "@/server/admin/regions";
import { updatePlace } from "@/features/admin/places-actions";
import { PlaceForm } from "@/features/admin/place-form";
import { HeroUploader } from "@/features/admin/hero-uploader";
import { EditHeader } from "@/features/admin/ui/edit-header";
import { MediaImage } from "@/components/media/media-image";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditPlacePage({ params }: Params) {
  const { id } = await params;
  const [place, regions] = await Promise.all([getPlaceForAdmin(id), getRegionOptions()]);
  if (!place) notFound();

  const region = place.region_id ? await getRegionForAdmin(place.region_id) : null;
  const liveHref = region ? `/${region.slug}/${place.slug}` : undefined;
  const action = updatePlace.bind(null, place.id);

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <EditHeader title={place.name} slug={place.slug} status={place.status} liveHref={liveHref} />

      <section className="flex flex-col gap-4 rounded-lg border border-border-subtle p-5">
        <h2 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Hero image
        </h2>
        {place.hero ? (
          <div className="relative aspect-[16/9] w-72 overflow-hidden rounded-md border border-border-subtle bg-muted">
            <MediaImage media={place.hero} sizes="288px" />
          </div>
        ) : null}
        <HeroUploader entity="places" id={place.id} hasHero={!!place.hero_media_id} />
      </section>

      <PlaceForm action={action} place={place} regions={regions} submitLabel="Save changes" />
    </div>
  );
}
