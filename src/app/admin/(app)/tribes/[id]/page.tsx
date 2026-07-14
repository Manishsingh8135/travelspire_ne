import { notFound } from "next/navigation";
import { getTribeForAdmin } from "@/server/admin/content";
import { updateTribe } from "@/features/admin/tribes-actions";
import { TribeComposer } from "@/features/admin/tribe-composer";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditTribePage({ params }: Params) {
  const { id } = await params;
  const tribe = await getTribeForAdmin(id);
  if (!tribe) notFound();

  const action = updateTribe.bind(null, tribe.id);

  return <TribeComposer tribe={tribe} action={action} />;
}
