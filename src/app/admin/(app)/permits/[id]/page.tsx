import { notFound } from "next/navigation";
import { getPermitForAdmin } from "@/server/admin/content";
import { updatePermit } from "@/features/admin/permits-actions";
import { PermitComposer } from "@/features/admin/permit-composer";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditPermitPage({ params }: Params) {
  const { id } = await params;
  const permit = await getPermitForAdmin(id);
  if (!permit) notFound();

  const action = updatePermit.bind(null, permit.id);

  return <PermitComposer permit={permit} action={action} />;
}
