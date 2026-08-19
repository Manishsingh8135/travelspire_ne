// lib/whatsapp.ts
import { Tour, isRegularTour, isFestivalTour } from "@/types/tours/tour";

// WhatsApp URLs
const WHATSAPP_CHAT_URL = "https://wa.me/919864141211"; // For direct chat/messaging
const WHATSAPP_CATALOG_URL = "https://wa.me/c/919864141211"; // For business catalog

export interface WhatsAppMessageOptions {
  tourName?: string;
  tourType?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customMessage?: string;
  useCatalog?: boolean; // Optional flag to use catalog instead of chat
}

export function createWhatsAppURL(options: WhatsAppMessageOptions = {}): string {
  const {
    tourName,
    tourType,
    customerName,
    customerEmail,
    customerPhone,
    customMessage,
    useCatalog = false // Default to chat URL
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
  const baseUrl = useCatalog ? WHATSAPP_CATALOG_URL : WHATSAPP_CHAT_URL;
  return `${baseUrl}?text=${encodedMessage}`;
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

// General trip planning (most common use case)
export function createTripPlanningURL(details?: {
  destination?: string;
  dates?: string;
  groupSize?: number;
}): string {
  let message = "Hi TravelSpire NE! 👋\n\nI'd like to plan a trip to Northeast India.\n\n";
  
  if (details?.destination) {
    message += `📍 Interested in: ${details.destination}\n`;
  }
  if (details?.dates) {
    message += `📅 Preferred dates: ${details.dates}\n`;
  }
  if (details?.groupSize) {
    message += `👥 Group size: ${details.groupSize} people\n`;
  }
  
  message += "\nCan you help me with:\n";
  message += "• Tour recommendations\n";
  message += "• Pricing & availability\n";
  message += "• Permit assistance\n";
  message += "• Best time to visit\n\n";
  message += "Looking forward to an amazing adventure! 🏔️✨";
  
  return createWhatsAppURL({ customMessage: message });
}

// Anini Winter Fest 2026 — Travelspire is the Official Travel & Taxi Partner
export type AwfInquiryTopic =
  | { kind: "general" }
  | { kind: "shared-transfer" }
  | { kind: "vehicle"; vehicleName: string; pricePerDay: number }
  | { kind: "package"; plan: string };

export function createAwfInquiryURL(topic: AwfInquiryTopic = { kind: "general" }): string {
  let message: string;

  switch (topic.kind) {
    case "shared-transfer":
      message =
        "Hi TravelSpire NE! 👋\n\nI'd like to reserve seats on the *Anini Winter Fest Shared Transfer* (₹5,499/person).\n\n• Pickup: 18 Sept 2026 (Dibrugarh 7:00 AM)\n• Drop: 21 Sept 2026\n\nTravellers:\nRough pickup point (Dibrugarh/Tinsukia/Roing):\n\nPlease confirm availability. 🏔️";
      break;
    case "vehicle":
      message = `Hi TravelSpire NE! 👋\n\nI'd like to book the *${topic.vehicleName}* (₹${topic.pricePerDay.toLocaleString("en-IN")}/day, all-inclusive) for Anini Winter Fest 2026.\n\n• Dates needed:\n• Group size:\n\nPlease confirm availability.`;
      break;
    case "package":
      message = `Hi TravelSpire NE! 👋\n\nI'm interested in the *${topic.plan} Anini Winter Fest package* (stay + transport + permits + festival logistics).\n\n• Travellers:\n• Dates:\n\nCould you share the plan and pricing?`;
      break;
    default:
      message =
        "Hi TravelSpire NE! 👋\n\nI'm planning for *Anini Winter Fest 2026* (19–20 Sept, Dibang Valley).\n\nCan you help me with:\n• Transport (shared transfer / private vehicle)\n• Stay & festival packages\n• ILP permit assistance\n\nLooking forward to it! 🏔️✨";
  }

  return createWhatsAppURL({ customMessage: message });
}

// Permit assistance (unique value prop)
export function createPermitAssistanceURL(): string {
  return createWhatsAppURL({
    customMessage: "Hi TravelSpire NE! 🎫\n\nI need assistance with travel permits for Northeast India:\n\n• Inner Line Permit (ILP)\n• Protected Area Permit (PAP)\n• Documentation requirements\n• Processing timeline\n\nCan you guide me through the process? Thank you! 🙏"
  });
}

// Availability check
export function createAvailabilityCheckURL(dates?: string): string {
  const message = dates 
    ? `Hi! I'd like to check tour availability for ${dates}. Can you share what's available and recommend the best options?`
    : "Hi! I'd like to check tour availability for my preferred dates. Can you help me find the best time to visit?";
    
  return createWhatsAppURL({ customMessage: message });
}

// Custom itinerary request
export function createCustomItineraryURL(): string {
  return createWhatsAppURL({
    customMessage: "Hi TravelSpire NE! ✨\n\nI'd like a custom itinerary planned for Northeast India based on:\n\n• My interests & preferences\n• Budget range\n• Travel dates\n• Special requirements\n\nCan we discuss the possibilities? 🗺️"
  });
}
