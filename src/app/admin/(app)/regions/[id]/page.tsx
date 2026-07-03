import { notFound } from "next/navigation";
import { getRegionForAdmin, getRegionOptions } from "@/server/admin/regions";
import { updateRegion } from "@/features/admin/regions-actions";
import { RegionForm } from "@/features/admin/region-form";
import { HeroUploader } from "@/features/admin/hero-uploader";
import { EditHeader } from "@/features/admin/ui/edit-header";
import { MediaImage } from "@/components/media/media-image";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditRegionPage({ params }: Params) {
  const { id } = await params;
  const [region, regions] = await Promise.all([getRegionForAdmin(id), getRegionOptions()]);
  if (!region) notFound();

  const action = updateRegion.bind(null, region.id);

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <EditHeader
        title={region.name}
        slug={region.slug}
        status={region.status}
        liveHref={`/${region.slug}`}
      />

      <section className="flex flex-col gap-4 rounded-lg border border-border-subtle p-5">
        <h2 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Hero image
        </h2>
        {region.hero ? (
          <div className="relative aspect-[16/9] w-72 overflow-hidden rounded-md border border-border-subtle bg-muted">
            <MediaImage media={region.hero} sizes="288px" />
          </div>
        ) : null}
        <HeroUploader entity="regions" id={region.id} hasHero={!!region.hero_media_id} />
      </section>

      <RegionForm action={action} region={region} regions={regions} submitLabel="Save changes" />
    </div>
  );
}
