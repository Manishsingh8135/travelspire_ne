import { listRegionsForAdmin } from "@/server/admin/regions";
import { parseTableQuery } from "@/features/admin/ui/table-state";
import { PageHeader } from "@/features/admin/ui/page-header";
import { RegionsTable } from "./regions-table";

export const dynamic = "force-dynamic";

const FILTER_IDS = ["status", "level"] as const;
const PAGE_SIZE = 50;

type SP = Record<string, string | string[] | undefined>;

export default async function AdminRegionsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const query = parseTableQuery(sp, { filterIds: FILTER_IDS, pageSize: PAGE_SIZE });
  const { rows, total } = await listRegionsForAdmin(query);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Regions"
        subtitle="States, districts and valleys — the atlas backbone."
        newHref="/admin/regions/new"
        newLabel="New region"
      />
      <RegionsTable rows={rows} total={total} pageSize={PAGE_SIZE} />
    </div>
  );
}
