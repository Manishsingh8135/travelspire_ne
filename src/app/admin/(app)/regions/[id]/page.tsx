import { notFound } from "next/navigation";
import { getRegionForAdmin } from "@/server/admin/regions";
import { updateRegion } from "@/features/admin/regions-actions";
import { RegionForm } from "@/features/admin/region-form";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditRegionPage({ params }: Params) {
  const { id } = await params;
  const region = await getRegionForAdmin(id);
  if (!region) notFound();

  const action = updateRegion.bind(null, region.id);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl font-medium">Edit region</h1>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{region.slug}</p>
      </div>
      <RegionForm action={action} region={region} submitLabel="Save changes" />
    </div>
  );
}
