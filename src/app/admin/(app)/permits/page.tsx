import { listPermitsForAdmin } from "@/server/admin/content";
import { parseTableQuery } from "@/features/admin/ui/table-state";
import { PageHeader } from "@/features/admin/ui/page-header";
import { PermitsTable } from "./permits-table";

export const dynamic = "force-dynamic";

const FILTER_IDS = ["status"] as const;
const PAGE_SIZE = 50;

type SP = Record<string, string | string[] | undefined>;

export default async function AdminPermitsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const query = parseTableQuery(sp, { filterIds: FILTER_IDS, pageSize: PAGE_SIZE });
  const { rows, total } = await listPermitsForAdmin(query);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Permit guides"
        subtitle="ILP & PAP state guides — the highest-intent SEO pillar."
      />
      <PermitsTable rows={rows} total={total} pageSize={PAGE_SIZE} />
    </div>
  );
}
