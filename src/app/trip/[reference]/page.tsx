import type { Metadata } from "next";
import Link from "next/link";
import { Badge, ButtonLink, Callout, Container, Eyebrow, Heading, Section, formatInr } from "@/components/ds";
import { IconArrowRight, IconCalendar, IconCheck, IconTicket, IconUsers, IconVehicle, IconWhatsApp } from "@/components/icons";
import { SupportContacts } from "@/components/bookings/support-contacts";
import { TripDetailsSection } from "@/components/trip/trip-details-section";
import { supportWhatsAppURL } from "@/lib/bookings/after-payment";
import { getBookingProduct } from "@/lib/bookings/catalog";
import { verifyTripToken } from "@/lib/bookings/signing";
import { currentStage, detailsLocked, stageIndex, tripStages } from "@/lib/bookings/trip";
import { getBooking, tripOf } from "@/lib/bookings/trip-store";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Your Trip",
  description: "Your Travelspire booking: details, permits, driver and contacts.",
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};

export const dynamic = "force-dynamic";

const longDate = new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
const formatDeparture = (iso: string) => longDate.format(new Date(`${iso}T00:00:00+05:30`));

function Card({ title, aside, children, className }: { title: string; aside?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-panel border border-line bg-surface p-5 font-ui sm:p-7", className)}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-h4 text-fg">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

function Unavailable({ title, body }: { title: string; body: string }) {
  return (
    <Section spacing="none" className="pb-20 pt-10 md:pb-28 md:pt-14">
      <Container size="prose" className="font-ui">
        <div className="rounded-panel border border-line bg-surface p-6 sm:p-8">
          <Heading as="h1" size="h2">
            {title}
          </Heading>
          <p className="mt-3 text-body text-fg-muted">{body}</p>
          <SupportContacts whatsappHref={supportWhatsAppURL()} className="mt-8 border-t border-line pt-6" />
        </div>
      </Container>
    </Section>
  );
}

export default async function TripPage({
  params,
  searchParams,
}: {
  params: Promise<{ reference: string }>;
  searchParams: Promise<{ k?: string | string[] }>;
}) {
  const { reference: rawReference } = await params;
  const { k } = await searchParams;
  const reference = decodeURIComponent(rawReference).toUpperCase();
  const token = typeof k === "string" ? k : "";

  if (!verifyTripToken(reference, token)) {
    return <Unavailable title="This link doesn't open a trip." body="Use the link in your booking email, or send us your booking reference and we'll help." />;
  }

  let booking;
  try {
    booking = await getBooking(reference);
  } catch {
    return <Unavailable title="We couldn't load your trip just now." body="Please refresh in a minute. Your booking is safe." />;
  }
  if (!booking || booking.status !== "paid") {
    return <Unavailable title="This booking isn't confirmed yet." body="Once your payment is verified, this page fills in. If you've paid, message us and we'll check." />;
  }

  const trip = tripOf(booking);
  const stage = currentStage(trip);
  const reached = stageIndex(stage);
  const product = getBookingProduct(booking.tour_slug);
  const packageName = product?.tiers.find((t) => t.id === booking.package_tier_id)?.name ?? booking.package_tier_id;
  const departure = formatDeparture(booking.departure_date);
  const paidAttempt = booking.payment_attempts.find((a) => a.status === "success");
  const chat = supportWhatsAppURL({ reference, tourName: booking.tour_name, firstName: booking.customer_first_name, departure });
  const idsChat = `${chat}${encodeURIComponent("\n\nSending the photo IDs for our permits.")}`;

  return (
    <Section spacing="none" className="pb-20 pt-10 md:pb-28 md:pt-14">
      <Container size="prose" className="font-ui">
        <div className="flex flex-wrap items-center gap-3">
          <Eyebrow>Your trip</Eyebrow>
          <Badge>{reference}</Badge>
        </div>
        <Heading as="h1" size="h1" className="mt-3">
          {booking.tour_name}
        </Heading>
        <p className="mt-2 text-lead text-fg-muted">Hi {booking.customer_first_name}, everything about your trip is on this page.</p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-small text-fg">
          <li className="flex items-center gap-2">
            <IconCalendar size={18} className="text-fg-subtle" />
            {departure}
          </li>
          <li className="flex items-center gap-2">
            <IconUsers size={18} className="text-fg-subtle" />
            {booking.travellers} {booking.travellers === 1 ? "traveller" : "travellers"}
          </li>
          <li className="flex items-center gap-2">
            <IconTicket size={18} className="text-fg-subtle" />
            {packageName}
          </li>
        </ul>

        {/* Progress: done, current and still to come. */}
        <ol aria-label="Trip progress" className="mt-10 grid gap-3 sm:grid-cols-5 sm:gap-2">
          {tripStages.map((s, i) => {
            const done = stage !== "on_hold" && i <= reached;
            return (
              <li key={s.id} className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full border text-caption font-semibold",
                    done ? "border-brand bg-brand text-on-brand" : "border-line-strong text-fg-subtle",
                  )}
                >
                  {done ? <IconCheck size={14} /> : i + 1}
                </span>
                <span className={cn("text-small", done ? "font-medium text-fg" : "text-fg-subtle")}>
                  {s.customer}
                  {done && i === reached ? <span className="sr-only"> (current step)</span> : null}
                </span>
              </li>
            );
          })}
        </ol>

        {stage === "on_hold" ? (
          <Callout tone="caution" title="We're looking into something on your booking" className="mt-8">
            Nothing for you to do. We&apos;ll message you on WhatsApp, or message us any time.
          </Callout>
        ) : null}

        <div className="mt-10 space-y-6">
          <Card
            title="Traveller details"
            aside={trip.details ? <Badge tone="positive">Received</Badge> : <Badge tone="caution">Needed</Badge>}
          >
            <p className="mt-2 text-small text-fg-muted">
              We need these to apply for the permits your route needs. Also send each traveller&apos;s photo ID on WhatsApp.
            </p>
            <a
              href={idsChat}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-small font-medium text-brand underline underline-offset-4"
            >
              <IconWhatsApp size={16} />
              Send photo IDs on WhatsApp
            </a>
            <TripDetailsSection
              reference={reference}
              token={token}
              travellerCount={booking.travellers}
              details={trip.details}
              locked={detailsLocked(stage)}
            />
          </Card>

          <Card title="Driver and pickup" aside={trip.driver ? <Badge tone="positive">Assigned</Badge> : null}>
            {trip.driver ? (
              <dl className="mt-4 grid gap-4 text-small sm:grid-cols-2">
                <div>
                  <dt className="text-fg-subtle">Driver</dt>
                  <dd className="mt-0.5 text-body font-medium text-fg">{trip.driver.name}</dd>
                  <dd className="mt-1 flex gap-4">
                    <a href={`tel:${trip.driver.phone}`} className="font-medium text-brand underline underline-offset-4">
                      Call {trip.driver.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-fg-subtle">Vehicle</dt>
                  <dd className="mt-0.5 text-body font-medium text-fg">{trip.driver.vehicle}</dd>
                </div>
                <div>
                  <dt className="text-fg-subtle">Pickup time</dt>
                  <dd className="mt-0.5 text-body text-fg">{trip.driver.pickupTime}</dd>
                </div>
                <div>
                  <dt className="text-fg-subtle">Pickup place</dt>
                  <dd className="mt-0.5 text-body text-fg">{trip.driver.pickupPlace}</dd>
                </div>
              </dl>
            ) : (
              <p className="mt-2 flex gap-3 text-small text-fg-muted">
                <IconVehicle size={20} className="shrink-0 text-fg-subtle" />
                Your driver&apos;s name, number and vehicle, with the pickup time and place, appear here a couple of days before {departure}.
              </p>
            )}
          </Card>

          <Card title="Itinerary and payment">
            <dl className="mt-4 grid gap-x-6 gap-y-3 text-small sm:grid-cols-2">
              <div className="flex justify-between gap-4 sm:block">
                <dt className="text-fg-subtle">Amount paid</dt>
                <dd className="font-medium text-fg tabular-nums">{formatInr(booking.paid_amount_paise / 100)}</dd>
              </div>
              <div className="flex justify-between gap-4 sm:block">
                <dt className="text-fg-subtle">Package</dt>
                <dd className="font-medium text-fg">{packageName}</dd>
              </div>
              {paidAttempt ? (
                <div className="flex justify-between gap-4 sm:block">
                  <dt className="text-fg-subtle">PayU transaction</dt>
                  <dd className="break-all font-medium text-fg tabular-nums">{paidAttempt.txnid}</dd>
                </div>
              ) : null}
            </dl>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              {product ? (
                <ButtonLink href={product.sourceUrl} variant="secondary" size="sm">
                  See the day-by-day plan
                  <IconArrowRight />
                </ButtonLink>
              ) : null}
              <Link href="/booking-policy" className="text-small font-medium text-fg-muted underline underline-offset-4 hover:text-fg">
                Booking and cancellation policy
              </Link>
            </div>
          </Card>

          <SupportContacts whatsappHref={chat} className="rounded-panel border border-line bg-surface p-5 sm:p-7" />
        </div>
      </Container>
    </Section>
  );
}
