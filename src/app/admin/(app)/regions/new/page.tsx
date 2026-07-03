import { createRegion } from "@/features/admin/regions-actions";
import { RegionForm } from "@/features/admin/region-form";
import { getRegionOptions } from "@/server/admin/regions";

export const dynamic = "force-dynamic";

export default async function NewRegionPage() {
  const regions = await getRegionOptions();

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight">New region</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Saved as a draft — publish it from the list.
        </p>
      </div>
      <RegionForm action={createRegion} regions={regions} submitLabel="Create region" />
    </div>
  );
}
