import { listToursForAdmin, getRegionOptions } from "@/server/admin/tours";
import { parseTableQuery } from "@/features/admin/ui/table-state";
import { PageHeader } from "@/features/admin/ui/page-header";
import { ToursTable } from "./tours-table";

export const dynamic = "force-dynamic";

const FILTER_IDS = ["status", "type", "difficulty", "region"] as const;
const PAGE_SIZE = 50;

type SP = Record<string, string | string[] | undefined>;

export default async function AdminToursPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const query = parseTableQuery(sp, { filterIds: FILTER_IDS, pageSize: PAGE_SIZE });
  const [{ rows, total }, regionOptions] = await Promise.all([
    listToursForAdmin(query),
    getRegionOptions(),
  ]);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Tours"
        subtitle="Guided departures across the region."
        newHref="/admin/tours/new"
        newLabel="New tour"
      />
      <ToursTable rows={rows} total={total} pageSize={PAGE_SIZE} regionOptions={regionOptions} />
    </div>
  );
}
