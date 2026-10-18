import "server-only";

import { absoluteUrl, support, supportWhatsAppURL } from "@/lib/bookings/after-payment";
import { getBookingProduct } from "@/lib/bookings/catalog";
import { tripUrl } from "@/lib/bookings/signing";
import { currentStage, stageIndex, stageLabel, type TripMessageKey, type TripRecord } from "@/lib/bookings/trip";
import { listPaidDepartingFrom, listUnpaidSince, tripOf, updateTrip, type BookingRow } from "@/lib/bookings/trip-store";
import { button, emailShell, formatDate, heading } from "@/lib/email/layout";
import { escapeHtml, getEmailSettings, sendEmail } from "@/lib/email/resend";
import { indiaToday } from "@/lib/dates";

// The daily job: decides which automatic email each paid booking is due,
// sends it once, and sends the team a morning summary. Run by Vercel Cron
// through /api/cron/daily.
//
// When each customer email goes out (days are India calendar days):
//   details-reminder        2+ days after booking, traveller details missing
//   details-reminder-final  within 7 days of departure, still missing, and
//                           3+ days after the first reminder
//   pre-trip                2–7 days before departure ("one week to go")
//   after-trip              1–7 days after the last day of the trip
// A booking gets at most one of these a day, and none while it is on hold.

const DAY = 24 * 60 * 60 * 1000;

/** Whole days from `from` to `to`, both ISO dates. */
function daysBetween(from: string, to: string) {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY);
}

function addDays(iso: string, days: number) {
  return new Date(Date.parse(`${iso}T00:00:00Z`) + days * DAY).toISOString().slice(0, 10);
}

function tripDays(booking: BookingRow) {
  return getBookingProduct(booking.tour_slug)?.tiers.find((t) => t.id === booking.package_tier_id)?.days ?? 1;
}

/** The one message due today for this booking, if any. Exported for checks. */
export function dueMessage(booking: BookingRow, today: string): TripMessageKey | null {
  const trip = tripOf(booking);
  if (currentStage(trip) === "on_hold") return null;
  const sent = trip.sent ?? {};
  const untilDeparture = daysBetween(today, booking.departure_date);
  const sinceEnd = daysBetween(addDays(booking.departure_date, tripDays(booking) - 1), today);
  const sinceBooking = daysBetween(indiaToday(new Date(booking.created_at)), today);

  if (sinceEnd >= 1 && sinceEnd <= 7) return sent["after-trip"] ? null : "after-trip";
  if (untilDeparture < 1) return null;
  if (untilDeparture >= 2 && untilDeparture <= 7 && sinceBooking >= 2 && !sent["pre-trip"]) return "pre-trip";
  if (trip.details) return null;
  if (!sent["details-reminder"]) return sinceBooking >= 2 ? "details-reminder" : null;
  const sinceFirst = daysBetween(indiaToday(new Date(sent["details-reminder"])), today);
  if (untilDeparture <= 7 && sinceFirst >= 3 && !sent["details-reminder-final"]) return "details-reminder-final";
  return null;
}

/* ── Customer emails ──────────────────────────────────────────── */

function contactLine() {
  return `<p style="margin:24px 0 0;padding-top:18px;border-top:1px solid #E6E8EC;font-size:13px;line-height:1.7;color:#4B5260">Questions? WhatsApp or call <strong style="color:#0B0D10">${support.phoneDisplay}</strong>, or email <a href="mailto:${support.email}" style="color:#0B0D10">${support.email}</a>.</p>`;
}

const paragraph = (text: string) => `<p style="margin:14px 0 0;font-size:15px;line-height:1.65;color:#4B5260">${text}</p>`;

function packingList() {
  const items = [
    "Warm layers: nights in the hills get cold.",
    "The original photo ID of every traveller, for permit checks.",
    "Some cash: ATMs are few once you leave the towns.",
    "A power bank, and any medicines you take.",
  ];
  return `<ul style="margin:10px 0 0;padding-left:20px;font-size:14px;line-height:1.8;color:#4B5260">${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`;
}

export function buildTripMessage(key: TripMessageKey, booking: BookingRow) {
  const trip = tripOf(booking);
  const name = escapeHtml(booking.customer_first_name);
  const tour = escapeHtml(booking.tour_name);
  const departure = formatDate(booking.departure_date);
  const link = tripUrl(booking.reference);
  const chat = supportWhatsAppURL({
    reference: booking.reference,
    tourName: booking.tour_name,
    firstName: booking.customer_first_name,
    departure,
  });
  const tripButton = (label: string) => (link ? button(link, label) : button(chat, "WhatsApp us"));
  const eyebrow = (text: string) =>
    `<p style="margin:0;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#0F6B4B">${escapeHtml(text)}</p>`;
  const h1 = (text: string) => `<h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;color:#0B0D10">${text}</h1>`;

  let subject: string;
  let preheader: string;
  let body: string;
  let text: string;

  if (key === "details-reminder" || key === "details-reminder-final") {
    const final = key === "details-reminder-final";
    subject = final ? `Action needed: traveller details for ${booking.tour_name}` : `Add your traveller details · ${booking.tour_name}`;
    preheader = "We need these to apply for your permits.";
    body = `${eyebrow(final ? "Action needed" : "One thing to do")}${h1(`${name}, we need your traveller details`)}
${paragraph(`To apply for the permits for ${tour} on ${escapeHtml(departure)}, we need the name, age and ID type of each of the ${booking.travellers} ${booking.travellers === 1 ? "traveller" : "travellers"}. It takes two minutes on your trip page. Please also send their photo IDs on WhatsApp.`)}
${final ? paragraph("Permits take a few days to come through, so please send them today if you can.") : ""}
<div style="margin-top:22px">${tripButton("Add traveller details")}${button(chat, "Send IDs on WhatsApp", false)}</div>${contactLine()}`;
    text = `Hi ${booking.customer_first_name},\n\nTo apply for the permits for ${booking.tour_name} on ${departure}, we need the name, age and ID type of each traveller.${final ? " Permits take a few days, so please send them today if you can." : ""}\n\n${link ? `Add them on your trip page: ${link}\n` : ""}Send photo IDs on WhatsApp: ${chat}\n\nTravelspire Northeast`;
  } else if (key === "pre-trip") {
    const days = daysBetween(indiaToday(), booking.departure_date);
    const permitsReady = stageIndex(currentStage(trip)) >= stageIndex("permits_done");
    subject = `${days} days to go · ${booking.tour_name}`;
    preheader = "What to pack, and what happens next.";
    body = `${eyebrow(`${days} days to go`)}${h1(`${name}, ${tour} is almost here`)}
${paragraph(`You leave on <strong style="color:#0B0D10">${escapeHtml(departure)}</strong>. Here's where things stand.`)}
${heading("Where we are")}
<ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.8;color:#4B5260">
<li>${trip.details ? "Traveller details: received, thank you." : "<strong style=\"color:#0B0D10\">Traveller details: still needed.</strong> Please add them on your trip page today."}</li>
<li>${permitsReady ? "Permits: ready." : "Permits: we're on it and will tell you when they're through."}</li>
<li>${trip.driver ? `Driver: ${escapeHtml(trip.driver.name)}, ${escapeHtml(trip.driver.phone)}. Pickup ${escapeHtml(trip.driver.pickupTime)} at ${escapeHtml(trip.driver.pickupPlace)}.` : "Driver: you'll get their name, number and vehicle a couple of days before you leave."}</li>
</ul>
${heading("What to pack")}${packingList()}
<div style="margin-top:22px">${tripButton("Open your trip page")}${button(absoluteUrl(getBookingProduct(booking.tour_slug)?.sourceUrl ?? "/all-tours"), "Day-by-day plan", false)}</div>${contactLine()}`;
    text = `Hi ${booking.customer_first_name},\n\n${booking.tour_name} leaves on ${departure}.\n\nTraveller details: ${trip.details ? "received" : "still needed"}\nPermits: ${permitsReady ? "ready" : "in progress"}\nDriver: ${trip.driver ? `${trip.driver.name}, ${trip.driver.phone}` : "details coming a couple of days before you leave"}\n\nPack warm layers, everyone's original photo ID, some cash, a power bank and any medicines.\n\n${link ? `Your trip page: ${link}\n` : ""}Questions? WhatsApp or call ${support.phoneDisplay}.\n\nTravelspire Northeast`;
  } else {
    subject = `Thank you for travelling with us, ${booking.customer_first_name}`;
    preheader = "How was it? We'd love to hear.";
    body = `${eyebrow("Welcome back")}${h1(`Thank you, ${name}`)}
${paragraph(`We hope ${tour} was everything you hoped for. We'd really like to hear how it went, what was great and what we should do better. Just reply to this email, or send us a WhatsApp.`)}
${paragraph(`Posting photos? Tag <a href="${support.instagramUrl}" style="color:#0B0D10;font-weight:600">${support.instagramHandle}</a> and we'll share our favourites.`)}
<div style="margin-top:22px">${button(chat, "Tell us how it went")}${button(absoluteUrl("/all-tours"), "Where next?", false)}</div>${contactLine()}`;
    text = `Hi ${booking.customer_first_name},\n\nThank you for travelling ${booking.tour_name} with us. We'd love to hear how it went: just reply to this email or WhatsApp ${support.phoneDisplay}.\n\nPosting photos? Tag ${support.instagramHandle}.\n\nTravelspire Northeast`;
  }

  return { subject, html: emailShell(preheader, body), text };
}

/* ── The daily run ─────────────────────────────────────────────── */

export type DailyRunResult = {
  today: string;
  sent: { reference: string; key: TripMessageKey }[];
  failed: { reference: string; key: TripMessageKey }[];
  digestSent: boolean;
};

/** Marks `key` as sent before sending, so two overlapping runs can't both send. */
async function claim(reference: string, key: TripMessageKey) {
  let claimed = false;
  await updateTrip(reference, (trip): TripRecord => {
    if (trip.sent?.[key]) return trip;
    claimed = true;
    const completes = key === "after-trip" && currentStage(trip) !== "completed";
    return {
      ...trip,
      sent: { ...trip.sent, [key]: new Date().toISOString() },
      ...(completes ? { stage: "completed", stageUpdatedAt: new Date().toISOString() } : {}),
    };
  });
  return claimed;
}

async function release(reference: string, key: TripMessageKey) {
  await updateTrip(reference, (trip) => {
    const sent = { ...trip.sent };
    delete sent[key];
    return { ...trip, sent };
  });
}

export async function runDaily({ dryRun = false } = {}): Promise<DailyRunResult> {
  const today = indiaToday();
  // Wide enough to catch trips that ended up to a week ago, even long ones.
  const bookings = await listPaidDepartingFrom(addDays(today, -30));
  const result: DailyRunResult = { today, sent: [], failed: [], digestSent: false };

  for (const booking of bookings) {
    const key = dueMessage(booking, today);
    if (!key) continue;
    if (dryRun) {
      result.sent.push({ reference: booking.reference, key });
      continue;
    }
    if (!(await claim(booking.reference, key))) continue;
    try {
      const message = buildTripMessage(key, booking);
      await sendEmail({
        idempotencyKey: `travelspire-${booking.reference}-${key}`,
        to: [booking.customer_email],
        replyTo: support.email,
        ...message,
      });
      result.sent.push({ reference: booking.reference, key });
    } catch (error) {
      console.error(`Trip message ${key} for ${booking.reference} failed`, error);
      await release(booking.reference, key).catch(() => undefined);
      result.failed.push({ reference: booking.reference, key });
    }
  }

  const unpaid = await listUnpaidSince(new Date(Date.now() - DAY).toISOString());
  const digest = buildTeamDigest(today, bookings, unpaid, result);
  if (digest && !dryRun) {
    await sendEmail({
      idempotencyKey: `travelspire-digest-${today}`,
      to: getEmailSettings().internalRecipients,
      ...digest,
    });
    result.digestSent = true;
  }
  return result;
}

/* ── Team morning summary ─────────────────────────────────────── */

const messageLabels: Record<TripMessageKey, string> = {
  "details-reminder": "details reminder",
  "details-reminder-final": "final details reminder",
  "pre-trip": "one week to go",
  "after-trip": "thank-you",
};

export function buildTeamDigest(today: string, paid: BookingRow[], unpaid: BookingRow[], run: DailyRunResult) {
  const admin = (b: BookingRow) => absoluteUrl(`/admin/bookings/${b.reference}`);
  const line = (b: BookingRow, extra: string) =>
    `<li style="margin:0 0 8px"><a href="${admin(b)}" style="color:#0B0D10;font-weight:600">${escapeHtml(b.customer_first_name)} — ${escapeHtml(b.tour_name)}</a><br><span style="color:#4B5260">${escapeHtml(extra)}</span></li>`;
  const list = (items: string[]) => `<ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.5">${items.join("")}</ul>`;

  const upcoming = paid.filter((b) => {
    const until = daysBetween(today, b.departure_date);
    return until >= 0 && until <= 3;
  });
  const missingDetails = paid.filter((b) => daysBetween(today, b.departure_date) > 3 && !tripOf(b).details);

  const sections: string[] = [];
  const textSections: string[] = [];

  if (upcoming.length) {
    sections.push(
      heading("Leaving in the next 3 days") +
        list(
          upcoming.map((b) => {
            const trip = tripOf(b);
            const flags = [!trip.details && "no traveller details", !trip.driver && "no driver"].filter(Boolean);
            return line(b, `${formatDate(b.departure_date)} · ${b.travellers} people · ${stageLabel(currentStage(trip))}${flags.length ? ` · ⚠ ${flags.join(", ")}` : ""}`);
          }),
        ),
    );
    textSections.push(`LEAVING IN THE NEXT 3 DAYS\n${upcoming.map((b) => `- ${b.customer_first_name}, ${b.tour_name}, ${b.departure_date}: ${admin(b)}`).join("\n")}`);
  }
  if (missingDetails.length) {
    sections.push(heading("Paid, traveller details still missing") + list(missingDetails.map((b) => line(b, `Leaves ${formatDate(b.departure_date)} · ${b.customer_phone}`))));
    textSections.push(`DETAILS MISSING\n${missingDetails.map((b) => `- ${b.customer_first_name}, ${b.tour_name}: ${admin(b)}`).join("\n")}`);
  }
  if (unpaid.length) {
    sections.push(heading("Started booking but didn't pay (last 24 hours)") + list(unpaid.map((b) => line(b, `${b.travellers} people · ${formatDate(b.departure_date)} · ${b.customer_phone}`))));
    textSections.push(`DIDN'T PAY\n${unpaid.map((b) => `- ${b.customer_first_name}, ${b.tour_name}, ${b.customer_phone}: ${admin(b)}`).join("\n")}`);
  }
  if (run.sent.length || run.failed.length) {
    const byRef = new Map(paid.map((b) => [b.reference, b]));
    const items = [
      ...run.sent.map((s) => line(byRef.get(s.reference)!, `Sent: ${messageLabels[s.key]}`)),
      ...run.failed.map((s) => line(byRef.get(s.reference)!, `⚠ Failed to send: ${messageLabels[s.key]}. Tomorrow's run retries.`)),
    ];
    sections.push(heading("Emails sent to customers today") + list(items));
    textSections.push(`EMAILS TODAY\n${[...run.sent.map((s) => `- ${s.reference}: ${messageLabels[s.key]}`), ...run.failed.map((s) => `- ${s.reference}: FAILED ${messageLabels[s.key]}`)].join("\n")}`);
  }

  if (!sections.length) return null;
  const html = emailShell(
    "Today's trips, missing details and follow-ups.",
    `<p style="margin:0;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#0F6B4B">Morning summary</p><h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;color:#0B0D10">${escapeHtml(formatDate(today))}</h1>${sections.join("")}<div style="margin-top:24px">${button(absoluteUrl("/admin"), "Open admin")}</div>`,
    false,
  );
  return {
    subject: `Morning summary · ${formatDate(today)}`,
    html,
    text: `${textSections.join("\n\n")}\n\nAdmin: ${absoluteUrl("/admin")}`,
  };
}
