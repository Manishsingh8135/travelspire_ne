import { notFound } from "next/navigation";
import { getRegionForAdmin, getRegionOptions } from "@/server/admin/regions";
import { updateRegion } from "@/features/admin/regions-actions";
import { RegionComposer } from "@/features/admin/region-composer";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditRegionPage({ params }: Params) {
  const { id } = await params;
  const [region, regions] = await Promise.all([getRegionForAdmin(id), getRegionOptions()]);
  if (!region) notFound();

  const action = updateRegion.bind(null, region.id);

  return <RegionComposer region={region} regions={regions} action={action} />;
}
