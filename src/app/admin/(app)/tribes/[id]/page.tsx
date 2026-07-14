import { notFound } from "next/navigation";
import { getTribeForAdmin } from "@/server/admin/content";
import { ReviewPage, ReviewSection } from "@/features/admin/ui/review-page";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function ReviewTribePage({ params }: Params) {
  const { id } = await params;
  const tribe = await getTribeForAdmin(id);
  if (!tribe) notFound();
  const body = (tribe.body ?? {}) as Record<string, unknown>;

  return (
    <ReviewPage
      table="tribes"
      noun="tribe"
      id={tribe.id}
      backHref="/admin/tribes"
      backLabel="Tribes"
      kicker="Tribe · culture layer"
      title={tribe.name}
      slug={tribe.slug}
      status={tribe.status}
    >
      <ReviewSection title="Who" value={body.who} />
      <ReviewSection title="Everything else" value={Object.fromEntries(Object.entries(body).filter(([k]) => k !== "who"))} />
    </ReviewPage>
  );
}
