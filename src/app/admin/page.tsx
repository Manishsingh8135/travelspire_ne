import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Container, Heading, Section, formatInr } from "@/components/ds";
import { IconWhatsApp } from "@/components/icons";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminBar } from "@/components/admin/admin-bar";
import { followUpWhatsAppURL } from "@/lib/bookings/after-payment";
import { currentStage, stageLabel, type TripStage } from "@/lib/bookings/trip";
import { listBookings, tripOf, type BookingView } from "@/lib/bookings/trip-store";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bookings",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

const views: { id: BookingView; label: string; empty: string }[] = [
  { id: "upcoming", label: "Upcoming", empty: "No paid trips coming up." },
  { id: "unpaid", label: "Didn't pay", empty: "No unfinished checkouts in the last 30 days." },
  { id: "past", label: "Past", empty: "No past trips yet." },
];

const shortDate = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
const dateOf = (iso: string) => shortDate.format(new Date(iso.length === 10 ? `${iso}T00:00:00+05:30` : iso));

const stageTone: Record<TripStage, "neutral" | "caution" | "brand" | "positive" | "critical"> = {
  paid: "caution",
  details_received: "brand",
  permits_done: "brand",
  driver_assigned: "positive",
  completed: "neutral",
  on_hold: "critical",
};

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const admin = await requireAdmin();
  const { view: rawView } = await searchParams;
  const view = views.find((v) => v.id === rawView) ?? views[0];

  let bookings: Awaited<ReturnType<typeof listBookings>> = [];
  let failed = false;
  try {
    bookings = await listBookings(view.id);
  } catch {
    failed = true;
  }

  return (
    <Section spacing="none" className="pb-24 pt-8">
      <Container className="font-ui">
        <AdminBar email={admin} />
        <Heading as="h1" size="h2" className="mt-8">
          Bookings
        </Heading>

        <nav aria-label="Booking views" className="mt-6 flex gap-1 border-b border-line">
          {views.map((v) => (
            <Link
              key={v.id}
              href={`/admin?view=${v.id}`}
              aria-current={v.id === view.id ? "page" : undefined}
              className={cn(
                "-mb-px border-b-2 px-3 py-2.5 text-small font-medium",
                v.id === view.id ? "border-brand text-fg" : "border-transparent text-fg-muted hover:text-fg",
              )}
            >
              {v.label}
            </Link>
          ))}
        </nav>

        {failed ? (
          <p className="mt-8 text-body text-critical">Couldn&apos;t load bookings. Refresh to try again.</p>
        ) : bookings.length === 0 ? (
          <p className="mt-8 text-body text-fg-muted">{view.empty}</p>
        ) : (
          <ul className="mt-2 divide-y divide-line">
            {bookings.map((b) => {
              const stage = currentStage(tripOf(b));
              const paid = view.id !== "unpaid";
              return (
                <li key={b.id} className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:items-center">
                  <span className="text-small font-medium text-fg tabular-nums">
                    {paid ? dateOf(b.departure_date) : `Tried ${dateOf(b.created_at)}`}
                  </span>
                  <Link href={`/admin/bookings/${b.reference}`} className="group min-w-0">
                    <span className="block truncate text-body font-medium text-fg group-hover:text-brand">
                      {b.customer_first_name} — {b.tour_name}
                    </span>
                    <span className="block text-small text-fg-muted">
                      {b.travellers} {b.travellers === 1 ? "person" : "people"} · {formatInr(b.total_amount_paise / 100)} · {b.reference}
                      {paid ? null : ` · trip ${dateOf(b.departure_date)}`}
                    </span>
                  </Link>
                  <span className="flex items-center gap-3">
                    {paid ? (
                      <Badge tone={stageTone[stage]}>{stageLabel(stage)}</Badge>
                    ) : (
                      <a
                        href={followUpWhatsAppURL(b.customer_phone, {
                          reference: b.reference,
                          tourName: b.tour_name,
                          firstName: b.customer_first_name,
                          departure: dateOf(b.departure_date),
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-small font-medium text-brand underline underline-offset-4"
                      >
                        <IconWhatsApp size={16} />
                        WhatsApp
                      </a>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </Section>
  );
}
