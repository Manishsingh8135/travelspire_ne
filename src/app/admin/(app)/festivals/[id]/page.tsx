import { notFound } from "next/navigation";
import { getFestivalForAdmin } from "@/server/admin/content";
import { ReviewPage, ReviewSection } from "@/features/admin/ui/review-page";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

const MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default async function ReviewFestivalPage({ params }: Params) {
  const { id } = await params;
  const result = await getFestivalForAdmin(id);
  if (!result) notFound();
  const { festival, events } = result;
  const rec = festival.recurrence as { month?: number; rule_note?: string } | null;
  const body = (festival.body ?? {}) as Record<string, unknown>;

  return (
    <ReviewPage
      table="festivals"
      noun="festival"
      id={festival.id}
      backHref="/admin/festivals"
      backLabel="Festivals"
      kicker="Festival · evergreen"
      title={festival.name}
      slug={festival.slug}
      status={festival.status}
      meta={
        <>
          {rec?.month ? <span>Every {MONTHS[rec.month]}</span> : null}
          {rec?.rule_note ? <span>{rec.rule_note}</span> : null}
          {festival.tribe?.name ? <span>{festival.tribe.name}</span> : null}
          {festival.place?.name ? <span>{festival.place.name}</span> : null}
        </>
      }
    >
      <ReviewSection title="Significance" value={body.significance} />
      <ReviewSection title="What to expect" value={body.what_to_expect} />
      <ReviewSection title="Attend" value={body.attend} />
      <ReviewSection title="FAQs" value={body.faqs} />
      <ReviewSection title="Ground-truth flags — needs the founder" value={body.ground_truth_flags} />
      <ReviewSection
        title="Editions"
        value={
          events.length
            ? events.map((e) => `${e.label ?? e.starts_on}: ${e.starts_on} → ${e.ends_on ?? e.starts_on} (${e.status})`)
            : null
        }
      />
      <ReviewSection title="Verified" value={body.verified} />
    </ReviewPage>
  );
}
