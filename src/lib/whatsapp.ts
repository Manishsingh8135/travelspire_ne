// lib/whatsapp.ts
import { Tour, isRegularTour, isFestivalTour } from "@/types/tours/tour";

const WHATSAPP_BASE_URL = "https://wa.me/c/919864141211";

export interface WhatsAppMessageOptions {
  tourName?: string;
  tourType?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customMessage?: string;
}

export function createWhatsAppURL(options: WhatsAppMessageOptions = {}): string {
  const {
    tourName,
    tourType,
    customerName,
    customerEmail,
    customerPhone,
    customMessage
  } = options;

  let message = "";

  if (customMessage) {
    message = customMessage;
  } else {
    // Default booking inquiry message
    message = "Hi TravelSpire NE! 👋\n\n";
    
    if (tourName) {
      message += `I'm interested in booking the *${tourName}*`;
      if (tourType) {
        message += ` (${tourType})`;
      }
      message += ".\n\n";
    } else {
      message += "I'm interested in booking a tour with you.\n\n";
    }

    message += "Could you please provide me with:\n";
    message += "• Available dates\n";
    message += "• Detailed itinerary\n";
    message += "• Pricing information\n";
    message += "• Permit assistance details\n\n";

    if (customerName || customerEmail || customerPhone) {
      message += "My contact details:\n";
      if (customerName) message += `Name: ${customerName}\n`;
      if (customerEmail) message += `Email: ${customerEmail}\n`;
      if (customerPhone) message += `Phone: ${customerPhone}\n`;
      message += "\n";
    }

    message += "Looking forward to an amazing Northeast India experience! 🏔️✨";
  }

  const encodedMessage = encodeURIComponent(message);
  return `${WHATSAPP_BASE_URL}?text=${encodedMessage}`;
}

// Helper function for tour-specific WhatsApp links
export function createTourWhatsAppURL(tour: Tour, customerDetails?: Partial<WhatsAppMessageOptions>): string {
  let tourType = "";
  
  if (isRegularTour(tour)) {
    tourType = tour.type;
  } else if (isFestivalTour(tour)) {
    tourType = "Festival Tour";
  } else {
    tourType = "Special Activity";
  }

  return createWhatsAppURL({
    tourName: tour.title,
    tourType,
    ...customerDetails
  });
}

// Quick booking message for general inquiries
export function createQuickBookingURL(): string {
  return createWhatsAppURL({
    customMessage: "Hi TravelSpire NE! 👋\n\nI'd like to explore your Northeast India tour packages. Could you help me plan my adventure? 🏔️✨"
  });
}

// Festival-specific booking message
export function createFestivalBookingURL(festivalName: string): string {
  return createWhatsAppURL({
    customMessage: `Hi TravelSpire NE! 🎵\n\nI'm interested in the *${festivalName}* package. Could you share:\n\n• Available accommodation options\n• Festival itinerary\n• Pricing details\n• What's included in the package\n\nLooking forward to this cultural experience! 🎭✨`
  });
}
