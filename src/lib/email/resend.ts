import "server-only";

// The one place we talk to Resend. Payment receipts and contact enquiries both
// send through here, so sender, recipients and failure handling stay
// consistent.

const DEFAULT_FROM = "Travelspire North-East <info@travelspirene.com>";
export const DEFAULT_INTERNAL_RECIPIENTS = [
  "travelspirene82@gmail.com",
  "singhatwork55@gmail.com",
];

export class EmailDeliveryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmailDeliveryError";
  }
}

export function escapeHtml(value: string | number) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Sender and team inbox settings. The env names predate the contact form
 * (they were added for payment receipts) and are kept so production config
 * keeps working.
 */
export function getEmailSettings() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new EmailDeliveryError("RESEND_API_KEY is not configured");
  }

  const recipients =
    process.env.PAYMENT_NOTIFICATION_EMAILS?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? DEFAULT_INTERNAL_RECIPIENTS;

  return {
    apiKey,
    from: process.env.PAYMENT_EMAIL_FROM?.trim() || DEFAULT_FROM,
    internalRecipients: recipients.length
      ? recipients
      : DEFAULT_INTERNAL_RECIPIENTS,
  };
}

export async function sendEmail(input: {
  /** Resend de-duplicates retries carrying the same key for ~24 hours. */
  idempotencyKey?: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const settings = getEmailSettings();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${settings.apiKey}`,
    "Content-Type": "application/json",
  };
  if (input.idempotencyKey) headers["Idempotency-Key"] = input.idempotencyKey;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers,
    body: JSON.stringify({
      from: settings.from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      reply_to: input.replyTo,
    }),
  });

  if (!response.ok) {
    throw new EmailDeliveryError(`Email provider returned ${response.status}`);
  }
}
