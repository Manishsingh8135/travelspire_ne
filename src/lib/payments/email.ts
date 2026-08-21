import "server-only";

import { getBookingProduct } from "@/lib/bookings/catalog";
import { getPaymentReceipt } from "@/lib/payments/payu/store";

const DEFAULT_FROM = "Travelspire North-East <info@travelspirene.com>";
const DEFAULT_INTERNAL_RECIPIENTS = [
  "travelspirene82@gmail.com",
  "singhatwork55@gmail.com",
];

export class PaymentEmailError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PaymentEmailError";
  }
}

function escapeHtml(value: string | number) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new PaymentEmailError("RESEND_API_KEY is not configured");
  }

  const recipients =
    process.env.PAYMENT_NOTIFICATION_EMAILS?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? DEFAULT_INTERNAL_RECIPIENTS;

  return {
    apiKey,
    from: process.env.PAYMENT_EMAIL_FROM?.trim() || DEFAULT_FROM,
    recipients: recipients.length ? recipients : DEFAULT_INTERNAL_RECIPIENTS,
  };
}

async function sendEmail(input: {
  idempotencyKey: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const config = getEmailConfig();
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": input.idempotencyKey,
    },
    body: JSON.stringify({
      from: config.from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      reply_to: input.replyTo,
    }),
  });

  if (!response.ok) {
    throw new PaymentEmailError(`Email provider returned ${response.status}`);
  }
}

function emailShell(content: string) {
  return `<!doctype html><html><body style="margin:0;background:#f3ead9;color:#14221c;font-family:Arial,sans-serif"><div style="display:none;max-height:0;overflow:hidden">Travelspire booking payment verified.</div><div style="max-width:640px;margin:0 auto;padding:32px 18px"><div style="background:#102019;color:#f6efe2;padding:26px;border-radius:14px 14px 0 0"><p style="margin:0;color:#d7b978;font-size:11px;letter-spacing:1.5px;text-transform:uppercase">Travelspire North-East</p><h1 style="margin:10px 0 0;font-size:28px">Payment verified</h1></div><div style="background:#fffaf0;padding:26px;border-radius:0 0 14px 14px">${content}<p style="margin:26px 0 0;padding-top:20px;border-top:1px solid #ded4c2;color:#66756d;font-size:12px;line-height:1.7">Questions? Reply to this email or contact Travelspire North-East. Never share card, UPI PIN or banking credentials by email.</p></div></div></body></html>`;
}

export async function sendVerifiedPaymentEmails(transactionId: string) {
  const receipt = await getPaymentReceipt(transactionId);
  if (!receipt || receipt.status !== "success") {
    throw new PaymentEmailError("A verified successful receipt was not found");
  }

  const booking = Array.isArray(receipt.tour_bookings)
    ? receipt.tour_bookings[0]
    : receipt.tour_bookings;
  if (!booking) throw new PaymentEmailError("The receipt has no booking");

  const config = getEmailConfig();
  const product = getBookingProduct(booking.tour_slug);
  const packageName =
    product?.tiers.find((tier) => tier.id === booking.package_tier_id)?.name ??
    booking.package_tier_id;
  const amount = formatMoney(receipt.expected_amount_paise);
  const details = [
    ["Booking", booking.reference],
    ["Tour", booking.tour_name],
    ["Package", packageName],
    ["Departure", formatDate(booking.departure_date)],
    ["Travellers", booking.travellers],
    ["Amount paid", amount],
    ["PayU transaction", receipt.txnid],
  ] as const;
  const rows = details
    .map(
      ([label, value]) =>
        `<tr><td style="padding:9px 0;color:#68756e;font-size:13px">${escapeHtml(label)}</td><td style="padding:9px 0;text-align:right;font-weight:600;font-size:13px">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  const plainDetails = details
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  await Promise.all([
    sendEmail({
      idempotencyKey: `travelspire-${transactionId}-customer-receipt`,
      to: [booking.customer_email],
      subject: `Payment received · ${booking.reference}`,
      replyTo: "info@travelspirene.com",
      html: emailShell(
        `<p style="margin:0 0 18px;line-height:1.7">Hi ${escapeHtml(booking.customer_first_name)}, your complete package payment has been securely verified. Keep this email as your payment receipt.</p><table style="width:100%;border-collapse:collapse">${rows}</table><p style="margin:20px 0 0;color:#526158;font-size:13px;line-height:1.7">Our team will contact you with the final coordination details for your departure.</p>`,
      ),
      text: `Hi ${booking.customer_first_name},\n\nYour complete package payment has been verified.\n\n${plainDetails}\n\nTravelspire North-East`,
    }),
    sendEmail({
      idempotencyKey: `travelspire-${transactionId}-internal-booking`,
      to: config.recipients,
      subject: `PAID booking · ${booking.reference} · ${booking.tour_name}`,
      replyTo: booking.customer_email,
      html: emailShell(
        `<p style="margin:0 0 18px;line-height:1.7"><strong>New fully paid booking.</strong> Contact the customer to confirm operational details.</p><table style="width:100%;border-collapse:collapse">${rows}<tr><td style="padding:9px 0;color:#68756e;font-size:13px">Customer</td><td style="padding:9px 0;text-align:right;font-weight:600;font-size:13px">${escapeHtml(booking.customer_first_name)}</td></tr><tr><td style="padding:9px 0;color:#68756e;font-size:13px">Email</td><td style="padding:9px 0;text-align:right;font-weight:600;font-size:13px">${escapeHtml(booking.customer_email)}</td></tr><tr><td style="padding:9px 0;color:#68756e;font-size:13px">Phone</td><td style="padding:9px 0;text-align:right;font-weight:600;font-size:13px">${escapeHtml(booking.customer_phone)}</td></tr></table>`,
      ),
      text: `New fully paid booking.\n\n${plainDetails}\nCustomer: ${booking.customer_first_name}\nEmail: ${booking.customer_email}\nPhone: ${booking.customer_phone}`,
    }),
  ]);
}
