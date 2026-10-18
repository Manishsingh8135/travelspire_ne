import "server-only";

import {
  absoluteUrl,
  customerWhatsAppURL,
  internationalDigits,
  nextSteps,
  REPLY_WINDOW,
  support,
  supportWhatsAppURL,
} from "@/lib/bookings/after-payment";
import { getBookingProduct } from "@/lib/bookings/catalog";
import { tripUrl } from "@/lib/bookings/signing";
import { getPaymentReceipt, type PaymentReceipt } from "@/lib/payments/payu/store";
import { escapeHtml, getEmailSettings, sendEmail } from "@/lib/email/resend";

export class PaymentEmailError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PaymentEmailError";
  }
}

function formatMoney(amountPaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amountPaise / 100);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
    timeZone: "Asia/Kolkata",
  }).format(new Date(`${date}T00:00:00+05:30`));
}

/* Email clients ignore stylesheets and most layout CSS, so everything below is
   tables with inline styles. Colours are the site's light tokens: fg #0B0D10,
   muted #4B5260, subtle #656C78, line #E6E8EC, subtle canvas #F6F7F9, brand
   #0F6B4B. */
const font = "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif";

function emailShell(preheader: string, content: string, forCustomer = true) {
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head><body style="margin:0;padding:0;background:#F6F7F9;color:#0B0D10;${font}"><div style="display:none;max-height:0;overflow:hidden">${escapeHtml(preheader)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F7F9"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px"><tr><td style="padding:0 4px 18px;font-size:12px;font-weight:600;letter-spacing:2.4px;text-transform:uppercase;color:#0B0D10">Travelspire <span style="color:#656C78;font-weight:500">Northeast</span></td></tr><tr><td style="background:#FFFFFF;border:1px solid #E6E8EC;border-radius:16px;padding:32px 28px">${content}</td></tr><tr><td style="padding:18px 4px 0;font-size:12px;line-height:1.7;color:#656C78">Travelspire Northeast · Dibrugarh, Assam · <a href="${absoluteUrl("/booking-policy")}" style="color:#656C78">Booking policy</a> · <a href="${absoluteUrl("/terms-and-conditions")}" style="color:#656C78">Terms</a>${forCustomer ? "<br>We will never ask for your card details, UPI PIN or OTP." : ""}</td></tr></table></td></tr></table></body></html>`;
}

function detailRows(details: ReadonlyArray<readonly [string, string | number]>) {
  return details
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 0;border-top:1px solid #E6E8EC;color:#4B5260;font-size:14px">${escapeHtml(label)}</td><td style="padding:10px 0;border-top:1px solid #E6E8EC;text-align:right;font-weight:600;font-size:14px">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
}

function button(href: string, label: string, primary = true) {
  const style = primary
    ? "background:#0F6B4B;color:#FFFFFF;border:1px solid #0F6B4B"
    : "background:#FFFFFF;color:#0B0D10;border:1px solid #D2D6DD";
  return `<a href="${escapeHtml(href)}" style="display:inline-block;${style};border-radius:10px;padding:12px 20px;font-size:15px;font-weight:600;text-decoration:none;margin:0 8px 8px 0">${escapeHtml(label)}</a>`;
}

function heading(text: string) {
  return `<h2 style="margin:32px 0 14px;font-size:17px;line-height:1.3;color:#0B0D10">${escapeHtml(text)}</h2>`;
}

/** Both emails for a verified payment, without sending them. */
export function buildPaymentEmails(receipt: PaymentReceipt) {
  const booking = Array.isArray(receipt.tour_bookings)
    ? receipt.tour_bookings[0]
    : receipt.tour_bookings;
  if (!booking) throw new PaymentEmailError("The receipt has no booking");

  const product = getBookingProduct(booking.tour_slug);
  const packageName =
    product?.tiers.find((tier) => tier.id === booking.package_tier_id)?.name ??
    booking.package_tier_id;
  const amount = formatMoney(receipt.expected_amount_paise);
  const departure = formatDate(booking.departure_date);
  const summary = {
    reference: booking.reference,
    tourName: booking.tour_name,
    firstName: booking.customer_first_name,
    departure,
  };
  const details = [
    ["Booking reference", booking.reference],
    ["Tour", booking.tour_name],
    ["Package", packageName],
    ["Departure", departure],
    ["Travellers", booking.travellers],
    ["Amount paid", amount],
    ["PayU transaction", receipt.txnid],
  ] as const;
  const plainDetails = details
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  const chatUrl = supportWhatsAppURL(summary);
  const tourUrl = product ? absoluteUrl(product.sourceUrl) : null;
  const myTrip = tripUrl(booking.reference);

  const steps = nextSteps
    .map(
      (step, i) =>
        `<tr><td valign="top" style="width:36px;padding:0 0 16px"><div style="width:26px;height:26px;border-radius:13px;background:#E9F5EF;color:#0F6B4B;font-size:13px;font-weight:700;line-height:26px;text-align:center">${i + 1}</div></td><td valign="top" style="padding:2px 0 16px"><div style="font-size:15px;font-weight:600;color:#0B0D10">${escapeHtml(step.title)}</div><div style="margin-top:3px;font-size:14px;line-height:1.6;color:#4B5260">${escapeHtml(step.body)}</div></td></tr>`,
    )
    .join("");

  const contactRow = (label: string, value: string, href: string) =>
    `<tr><td style="padding:6px 0;color:#4B5260;font-size:14px;width:96px">${escapeHtml(label)}</td><td style="padding:6px 0;font-size:14px;font-weight:600"><a href="${escapeHtml(href)}" style="color:#0B0D10;text-decoration:none">${escapeHtml(value)}</a></td></tr>`;

  const customerHtml = emailShell(
    `Payment received for ${booking.tour_name}. Here's what happens next and how to reach us.`,
    `<p style="margin:0;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#0F6B4B">Payment verified</p>
<h1 style="margin:8px 0 0;font-size:26px;line-height:1.25;color:#0B0D10">You're booked, ${escapeHtml(booking.customer_first_name)}.</h1>
<p style="margin:14px 0 0;font-size:15px;line-height:1.65;color:#4B5260">We've received ${escapeHtml(amount)} for ${escapeHtml(booking.tour_name)} and PayU has confirmed it. Keep this email: it's your receipt.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;border-collapse:collapse;border-bottom:1px solid #E6E8EC">${detailRows(details)}</table>
${heading("What happens next")}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${steps}</table>
<div style="margin-top:8px">${myTrip ? `${button(myTrip, "Open your trip page")}${button(chatUrl, "WhatsApp us", false)}` : `${button(chatUrl, "WhatsApp us")}${tourUrl ? button(tourUrl, "See the itinerary", false) : ""}`}</div>
${myTrip ? `<p style="margin:6px 0 0;font-size:13px;line-height:1.6;color:#656C78">Your trip page shows your progress, traveller details, driver and pickup. It's private to you: keep this link.</p>` : ""}
${heading("Questions? Talk to a person")}
<p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:#4B5260">Our team in Dibrugarh answers. Quote your booking reference, ${escapeHtml(booking.reference)}, and we'll find everything.</p>
<table role="presentation" cellpadding="0" cellspacing="0">${contactRow("WhatsApp", support.phoneDisplay, chatUrl)}${contactRow("Call", support.phoneDisplay, support.phoneHref)}${contactRow("Email", support.email, `mailto:${support.email}`)}${contactRow("Instagram", support.instagramHandle, support.instagramUrl)}</table>`,
  );

  const customerText = [
    `Hi ${booking.customer_first_name},`,
    "",
    `You're booked. We've received ${amount} for ${booking.tour_name} and PayU has confirmed it. Keep this email: it's your receipt.`,
    "",
    plainDetails,
    "",
    "WHAT HAPPENS NEXT",
    ...nextSteps.map((step, i) => `${i + 1}. ${step.title}: ${step.body}`),
    "",
    "QUESTIONS? TALK TO A PERSON",
    `WhatsApp: ${chatUrl}`,
    `Call: ${support.phoneDisplay}`,
    `Email: ${support.email}`,
    `Instagram: ${support.instagramUrl}`,
    ...(myTrip ? ["", `Your trip page (private to you): ${myTrip}`] : []),
    ...(tourUrl ? ["", `Itinerary: ${tourUrl}`] : []),
    "",
    "Travelspire Northeast",
  ].join("\n");

  const customerChat = customerWhatsAppURL(booking.customer_phone, summary);
  const teamDetails = [
    ...details,
    ["Customer", booking.customer_first_name],
    ["Email", booking.customer_email],
    ["Phone", booking.customer_phone],
  ] as const;

  const teamHtml = emailShell(
    `New paid booking: ${booking.tour_name}, ${departure}.`,
    `<p style="margin:0;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#0F6B4B">New paid booking</p>
<h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;color:#0B0D10">${escapeHtml(booking.customer_first_name)} · ${escapeHtml(booking.tour_name)}</h1>
<p style="margin:14px 0 0;font-size:15px;line-height:1.65;color:#4B5260">The customer was told we'll message them on WhatsApp ${escapeHtml(REPLY_WINDOW)}. The first button opens the chat with a greeting and the permit request already typed.</p>
<div style="margin-top:20px">${button(customerChat, `WhatsApp ${booking.customer_first_name}`)}${button(`tel:+${internationalDigits(booking.customer_phone)}`, "Call", false)}${button(`mailto:${booking.customer_email}`, "Email", false)}${button(absoluteUrl(`/admin/bookings/${booking.reference}`), "Open in admin", false)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;border-collapse:collapse;border-bottom:1px solid #E6E8EC">${detailRows(teamDetails)}</table>
${heading("To do")}
<p style="margin:0;font-size:14px;line-height:1.9;color:#4B5260">☐ Message the customer on WhatsApp<br>☐ Collect name, age and photo ID for every traveller<br>☐ Apply for permits<br>☐ Assign the vehicle and driver<br>☐ Send driver details and the final plan before departure</p>`,
    false,
  );

  return {
    customer: {
      to: [booking.customer_email],
      subject: `You're booked · ${booking.tour_name} · ${booking.reference}`,
      replyTo: support.email,
      html: customerHtml,
      text: customerText,
    },
    team: {
      subject: `PAID booking · ${booking.reference} · ${booking.tour_name}`,
      replyTo: booking.customer_email,
      html: teamHtml,
      text: `New paid booking. Message the customer on WhatsApp ${REPLY_WINDOW}.\n\n${plainDetails}\nCustomer: ${booking.customer_first_name}\nEmail: ${booking.customer_email}\nPhone: ${booking.customer_phone}\n\nWhatsApp the customer: ${customerChat}\nOpen in admin: ${absoluteUrl(`/admin/bookings/${booking.reference}`)}`,
    },
  };
}

export async function sendVerifiedPaymentEmails(transactionId: string) {
  const receipt = await getPaymentReceipt(transactionId);
  if (!receipt || receipt.status !== "success") {
    throw new PaymentEmailError("A verified successful receipt was not found");
  }

  const config = getEmailSettings();
  const { customer, team } = buildPaymentEmails(receipt);

  await Promise.all([
    sendEmail({
      idempotencyKey: `travelspire-${transactionId}-customer-receipt`,
      ...customer,
    }),
    sendEmail({
      idempotencyKey: `travelspire-${transactionId}-internal-booking`,
      to: config.internalRecipients,
      ...team,
    }),
  ]);
}
