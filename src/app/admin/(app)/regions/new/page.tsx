import { createRegion } from "@/features/admin/regions-actions";
import { RegionForm } from "@/features/admin/region-form";

export const dynamic = "force-dynamic";

export default function NewRegionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl font-medium">New region</h1>
        <p className="mt-1 text-muted-foreground">Saved as a draft — publish it from the list.</p>
      </div>
      <RegionForm action={createRegion} submitLabel="Create region" />
    </div>
  );
}
