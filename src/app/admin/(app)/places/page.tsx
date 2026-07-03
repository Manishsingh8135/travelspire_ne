import { listPlacesForAdmin, getRegionOptions } from "@/server/admin/places";
import { parseTableQuery } from "@/features/admin/ui/table-state";
import { PageHeader } from "@/features/admin/ui/page-header";
import { PlacesTable } from "./places-table";

export const dynamic = "force-dynamic";

const FILTER_IDS = ["status", "kind", "region", "secret"] as const;
const PAGE_SIZE = 50;

type SP = Record<string, string | string[] | undefined>;

export default async function AdminPlacesPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const query = parseTableQuery(sp, { filterIds: FILTER_IDS, pageSize: PAGE_SIZE });
  const [{ rows, total }, regionOptions] = await Promise.all([
    listPlacesForAdmin(query),
    getRegionOptions(),
  ]);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Places"
        subtitle="Destinations across the atlas."
        newHref="/admin/places/new"
        newLabel="New place"
      />
      <PlacesTable rows={rows} total={total} pageSize={PAGE_SIZE} regionOptions={regionOptions} />
    </div>
  );
}
