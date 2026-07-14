import { notFound } from "next/navigation";
import { getPermitForAdmin } from "@/server/admin/content";
import { ReviewPage, ReviewSection } from "@/features/admin/ui/review-page";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function ReviewPermitPage({ params }: Params) {
  const { id } = await params;
  const permit = await getPermitForAdmin(id);
  if (!permit) notFound();
  const body = (permit.body ?? {}) as Record<string, unknown>;

  return (
    <ReviewPage
      table="permit_zones"
      noun="permit guide"
      id={permit.id}
      backHref="/admin/permits"
      backLabel="Permit guides"
      kicker={`Permit · ${permit.permit_type}`}
      title={permit.name}
      slug={permit.slug}
      status={permit.status}
      meta={
        <>
          {permit.last_verified_at ? (
            <span>
              Verified{" "}
              {new Date(permit.last_verified_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          ) : (
            <span>Never verified</span>
          )}
          {permit.official_portal ? <span>{permit.official_portal}</span> : null}
        </>
      }
    >
      <ReviewSection title="Fees" value={permit.fee} />
      <ReviewSection title="Processing" value={permit.processing_time} />
      <ReviewSection title="Validity" value={permit.validity} />
      <ReviewSection title="2026 corrections — review before publish" value={body.corrections_2026} />
      <ReviewSection title="Who needs it" value={body.whoNeeds} />
      <ReviewSection title="Entry points" value={body.entryPoints} />
      <ReviewSection title="Application steps" value={body.applicationSteps} />
      <ReviewSection title="Documents" value={body.documents} />
      <ReviewSection title="FAQs" value={permit.faqs} />
    </ReviewPage>
  );
}
