/**
 * The WhatsApp funnel — until Razorpay lands, WhatsApp IS the checkout.
 * Ported from legacy/v1/lib/whatsapp.ts (the v1 conversion engine): one core
 * URL builder + intent-specific message builders so every CTA opens a chat
 * that already says what the traveler wants. Voice: field-journal — warm,
 * concise, zero filler. See docs-new/07-pages/README.md §5.
 */

export const WHATSAPP_NUMBER = "919864141211";
const CHAT_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function whatsAppUrl(message: string): string {
  return `${CHAT_URL}?text=${encodeURIComponent(message)}`;
}

/** Tour booking inquiry — pre-filled with the tour so the reply is instant. */
export function tourInquiryUrl(tour: { title: string; durationDays?: number | null }): string {
  const days = tour.durationDays ? ` (${tour.durationDays} days)` : "";
  return whatsAppUrl(
    `Hi Travelspire — I'm interested in *${tour.title}*${days}.\n\n` +
      `Could you share upcoming dates, the detailed itinerary and pricing? ` +
      `Also what's needed for permits.`,
  );
}

/** Availability check for a specific window. */
export function availabilityUrl(tourTitle: string): string {
  return whatsAppUrl(
    `Hi Travelspire — is *${tourTitle}* running in the next few months? ` +
      `My dates are flexible; what departures do you have?`,
  );
}

/** Custom itinerary request (the "tell us your dates" CTA). */
export function customTripUrl(): string {
  return whatsAppUrl(
    `Hi Travelspire — I'd like help planning a custom Northeast trip.\n\n` +
      `Rough dates:\nGroup size:\nInterests (mountains / culture / festivals / riding):`,
  );
}

/** Permit assistance, optionally pre-filled per state. */
export function permitAssistUrl(state?: string): string {
  const which = state ? `the *${state}* permit` : "permits";
  return whatsAppUrl(
    `Hi Travelspire — I need help with ${which}. ` +
      `Travel dates and nationality:\n\nCould you walk me through the process?`,
  );
}

/** Festival package inquiry. */
export function festivalInquiryUrl(festival: string): string {
  return whatsAppUrl(
    `Hi Travelspire — I'm interested in *${festival}*. ` +
      `Which packages are still available, and what do they include?`,
  );
}

/** Stay inquiry for a place with no listed inventory yet (honest funnel). */
export function stayInquiryUrl(place: string): string {
  return whatsAppUrl(
    `Hi Travelspire — where would you recommend staying in *${place}*? ` +
      `Looking for a real homestay, not a hotel.`,
  );
}

/** Explorer membership interest (until accounts/membership exist). */
export function explorerUrl(): string {
  return whatsAppUrl(
    `Hi Travelspire — I want to become an *Explorer member*. ` +
      `What does it include and when does it open?`,
  );
}

/** General hello (contact page). */
export function helloUrl(): string {
  return whatsAppUrl(`Hi Travelspire — I have a question about traveling the Northeast.`);
}

/** Host / scout application (partner funnel). */
export function partnerUrl(kind: "host" | "scout"): string {
  return whatsAppUrl(
    kind === "host"
      ? `Hi Travelspire — I run a homestay and I'd like to list with you.\n\nPlace:`
      : `Hi Travelspire — I know my region well and I'm interested in becoming a scout.\n\nRegion:`,
  );
}
