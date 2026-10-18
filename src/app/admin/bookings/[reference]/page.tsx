import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Button, Container, Field, Heading, Input, Section, Select, Textarea, buttonVariants, formatInr } from "@/components/ds";
import { IconArrowLeft, IconExternal, IconMail, IconPhone, IconWhatsApp } from "@/components/icons";
import { AdminBar } from "@/components/admin/admin-bar";
import { CopyButton } from "@/components/admin/copy-button";
import { addNote, saveDriver, setStage } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { customerWhatsAppURL, followUpWhatsAppURL, internationalDigits } from "@/lib/bookings/after-payment";
import { getBookingProduct } from "@/lib/bookings/catalog";
import { tripUrl } from "@/lib/bookings/signing";
import { currentStage, stageIds, stageLabel } from "@/lib/bookings/trip";
import { getBooking, tripOf } from "@/lib/bookings/trip-store";

export const metadata: Metadata = {
  title: "Booking",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

const longDate = new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
const stamp = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-panel border border-line bg-surface p-5 sm:p-6">
      <h2 className="text-h4 text-fg">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-2 text-small">
      <dt className="text-fg-subtle">{label}</dt>
      <dd className="text-right font-medium text-fg">{children}</dd>
    </div>
  );
}

export default async function AdminBookingPage({ params }: { params: Promise<{ reference: string }> }) {
  const admin = await requireAdmin();
  const { reference: raw } = await params;
  const reference = decodeURIComponent(raw).toUpperCase();
  const booking = await getBooking(reference);
  if (!booking) notFound();

  const trip = tripOf(booking);
  const stage = currentStage(trip);
  const paid = booking.status === "paid";
  const product = getBookingProduct(booking.tour_slug);
  const packageName = product?.tiers.find((t) => t.id === booking.package_tier_id)?.name ?? booking.package_tier_id;
  const departure = longDate.format(new Date(`${booking.departure_date}T00:00:00+05:30`));
  const summary = { reference, tourName: booking.tour_name, firstName: booking.customer_first_name, departure };
  const chat = paid ? customerWhatsAppURL(booking.customer_phone, summary) : followUpWhatsAppURL(booking.customer_phone, summary);
  const myTrip = paid ? tripUrl(reference) : null;

  return (
    <Section spacing="none" className="pb-24 pt-8">
      <Container className="font-ui">
        <AdminBar email={admin} />
        <Link href="/admin" className="mt-6 inline-flex items-center gap-2 text-small font-medium text-fg-muted hover:text-fg">
          <IconArrowLeft size={18} />
          All bookings
        </Link>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge>{reference}</Badge>
          <Badge tone={paid ? "positive" : "caution"}>{paid ? "Paid" : "Not paid"}</Badge>
          {paid ? <Badge tone="brand">{stageLabel(stage)}</Badge> : null}
        </div>
        <Heading as="h1" size="h2" className="mt-3">
          {booking.customer_first_name} — {booking.tour_name}
        </Heading>
        <p className="mt-2 text-body text-fg-muted">
          {departure} · {booking.travellers} {booking.travellers === 1 ? "person" : "people"} · {packageName}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <a href={chat} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "sm" })}>
            <IconWhatsApp />
            WhatsApp {booking.customer_first_name}
          </a>
          <a href={`tel:+${internationalDigits(booking.customer_phone)}`} className={buttonVariants({ size: "sm", variant: "secondary" })}>
            <IconPhone />
            Call
          </a>
          <a href={`mailto:${booking.customer_email}`} className={buttonVariants({ size: "sm", variant: "secondary" })}>
            <IconMail />
            Email
          </a>
          {myTrip ? (
            <>
              <CopyButton value={myTrip} label="Copy My Trip link" />
              <a href={myTrip} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                <IconExternal />
                Open My Trip
              </a>
            </>
          ) : null}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-6">
            <Panel title="Travellers">
              {trip.details ? (
                <>
                  <ul className="divide-y divide-line border-y border-line">
                    {trip.details.travellers.map((t, i) => (
                      <li key={i} className="flex flex-wrap justify-between gap-x-4 py-2.5 text-small">
                        <span className="font-medium text-fg">{t.name}</span>
                        <span className="text-fg-muted">
                          {t.age} · {t.gender} · {t.idType}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-3 divide-y divide-line">
                    <Row label="Arriving">{trip.details.arrival || "—"}</Row>
                    <Row label="Food">{trip.details.food || "—"}</Row>
                    <Row label="Emergency">
                      {trip.details.emergencyName} · <a href={`tel:${trip.details.emergencyPhone}`}>{trip.details.emergencyPhone}</a>
                    </Row>
                    {trip.detailsSubmittedAt ? <Row label="Sent">{stamp.format(new Date(trip.detailsSubmittedAt))}</Row> : null}
                  </dl>
                </>
              ) : (
                <p className="text-small text-fg-muted">
                  {paid ? "Not sent yet. The customer fills these in on their My Trip page; nudge them on WhatsApp." : "Not paid, so no details yet."}
                </p>
              )}
            </Panel>

            {paid ? (
              <Panel title="Driver and pickup">
                <form key={JSON.stringify(trip.driver ?? null)} action={saveDriver.bind(null, reference)} className="grid gap-4 sm:grid-cols-2">
                  <Field label="Driver name" htmlFor="d-name">
                    <Input id="d-name" name="name" required defaultValue={trip.driver?.name} />
                  </Field>
                  <Field label="Driver phone" htmlFor="d-phone">
                    <Input id="d-phone" name="phone" type="tel" required defaultValue={trip.driver?.phone} />
                  </Field>
                  <Field label="Vehicle" htmlFor="d-vehicle" hint="Model and number plate">
                    <Input id="d-vehicle" name="vehicle" required defaultValue={trip.driver?.vehicle} />
                  </Field>
                  <Field label="Pickup time" htmlFor="d-time" hint="e.g. 2 Dec, 7:00 am">
                    <Input id="d-time" name="pickupTime" required defaultValue={trip.driver?.pickupTime} />
                  </Field>
                  <Field label="Pickup place" htmlFor="d-place" className="sm:col-span-2">
                    <Input id="d-place" name="pickupPlace" required defaultValue={trip.driver?.pickupPlace} />
                  </Field>
                  <label className="flex items-center gap-3 text-small text-fg sm:col-span-2">
                    <input
                      type="checkbox"
                      name="notify"
                      defaultChecked={!trip.driver}
                      className="size-5 rounded-[0.3rem] border-line-strong text-brand focus:ring-2 focus:ring-focus"
                    />
                    Email these details to {booking.customer_first_name}
                  </label>
                  <div className="sm:col-span-2">
                    <Button type="submit" size="sm">
                      Save driver
                    </Button>
                  </div>
                </form>
              </Panel>
            ) : null}

            <Panel title="Notes">
              <form key={trip.notes?.length ?? 0} action={addNote.bind(null, reference)} className="space-y-3">
                <Textarea name="text" required className="min-h-20" placeholder="Calls, changes, anything the team should know" aria-label="New note" />
                <Button type="submit" size="sm" variant="secondary">
                  Add note
                </Button>
              </form>
              {trip.notes?.length ? (
                <ol className="mt-5 space-y-3 border-t border-line pt-4">
                  {[...trip.notes].reverse().map((n) => (
                    <li key={n.at + n.text} className="text-small">
                      <p className="whitespace-pre-line text-fg">{n.text}</p>
                      <p className="mt-0.5 text-caption text-fg-subtle">
                        {n.by} · {stamp.format(new Date(n.at))}
                      </p>
                    </li>
                  ))}
                </ol>
              ) : null}
            </Panel>
          </div>

          <div className="space-y-6">
            {paid ? (
              <Panel title="Stage">
                <form key={stage} action={setStage.bind(null, reference)} className="flex gap-2">
                  <Select name="stage" defaultValue={stage} aria-label="Stage" className="h-9 text-small">
                    {stageIds.map((id) => (
                      <option key={id} value={id}>
                        {stageLabel(id)}
                      </option>
                    ))}
                  </Select>
                  <Button type="submit" size="sm">
                    Save
                  </Button>
                </form>
                <p className="mt-3 text-caption text-fg-subtle">The customer sees this progress on their My Trip page.</p>
              </Panel>
            ) : null}

            <Panel title="Customer">
              <dl className="divide-y divide-line">
                <Row label="Name">{booking.customer_first_name}</Row>
                <Row label="Phone">{booking.customer_phone}</Row>
                <Row label="Email">
                  <span className="break-all">{booking.customer_email}</span>
                </Row>
              </dl>
            </Panel>

            <Panel title="Payment">
              <dl className="divide-y divide-line">
                <Row label="Total">{formatInr(booking.total_amount_paise / 100)}</Row>
                <Row label="Paid">{formatInr(booking.paid_amount_paise / 100)}</Row>
                <Row label="Booked">{stamp.format(new Date(booking.created_at))}</Row>
              </dl>
              {booking.payment_attempts.length ? (
                <ul className="mt-3 space-y-1 border-t border-line pt-3 text-caption text-fg-muted">
                  {booking.payment_attempts.map((a) => (
                    <li key={a.txnid} className="flex justify-between gap-3">
                      <span className="tabular-nums">{a.txnid}</span>
                      <span>{a.status}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Panel>
          </div>
        </div>
      </Container>
    </Section>
  );
}
