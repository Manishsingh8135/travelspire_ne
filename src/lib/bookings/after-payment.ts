import { contactInfo } from "@/data/social/social-links";
import { SITE_URL } from "@/lib/site";
import { createWhatsAppURL } from "@/lib/whatsapp";

// What a customer is told once their payment is verified, and how they reach
// us. The receipt email and the /pay/status page both read from here so the
// promise ("we'll message you within 24 hours") never differs between them.

export const REPLY_WINDOW = "within 24 hours";

export const support = {
  phoneDisplay: "+91 98641 41211",
  phoneHref: `tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`,
  email: contactInfo.email,
  instagramHandle: "@travelspire_ne",
  instagramUrl: contactInfo.instagram,
} as const;

export const nextSteps = [
  {
    title: "We message you on WhatsApp",
    body: `From ${support.phoneDisplay}, ${REPLY_WINDOW}, to go over your arrival, pickup and the plan.`,
  },
  {
    title: "Add traveller details for permits",
    body: "Name, age and ID type for each traveller on your trip page, and their photo IDs on WhatsApp. We apply for the permits your route needs.",
  },
  {
    title: "Get your final plan before you go",
    body: "Itinerary, packing list, and your driver's name, number and vehicle a couple of days before departure.",
  },
] as const;

type BookingSummary = {
  reference: string;
  tourName: string;
  firstName: string;
  departure: string;
};

/** The customer's chat to us, opened with their booking already quoted. */
export function supportWhatsAppURL(booking?: BookingSummary) {
  return createWhatsAppURL({
    customMessage: booking
      ? `Hi Travelspire, this is ${booking.firstName}. I've booked ${booking.tourName} for ${booking.departure}.\n\nBooking reference: ${booking.reference}`
      : "Hi Travelspire, I have a question about my booking.",
  });
}

/** Checkout stores phones as digits only; a bare 10-digit number is Indian. */
export function internationalDigits(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `91${digits.slice(1)}`;
  return digits;
}

function chatWith(phone: string, message: string) {
  return `https://wa.me/${internationalDigits(phone)}?text=${encodeURIComponent(message)}`;
}

/** Our chat to the customer, for the team's "PAID booking" email. */
export function customerWhatsAppURL(phone: string, booking: BookingSummary) {
  return chatWith(
    phone,
    `Hi ${booking.firstName}, this is Travelspire Northeast 👋\n\nThank you for booking ${booking.tourName} for ${booking.departure} (ref ${booking.reference}). We'll take you through the plan here.\n\nTo apply for your permits, please send the full name, age and a photo ID for each traveller.`,
  );
}

/** Our chat to someone who started checkout but didn't pay. */
export function followUpWhatsAppURL(phone: string, booking: BookingSummary) {
  return chatWith(
    phone,
    `Hi ${booking.firstName}, this is Travelspire Northeast 👋\n\nWe saw you were booking ${booking.tourName} for ${booking.departure}. Can we help with anything, or answer a question before you go ahead?`,
  );
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
