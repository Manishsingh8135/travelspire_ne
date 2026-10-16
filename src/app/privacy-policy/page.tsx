import { LegalPage } from "@/components/company/legal-page";

const sections = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    intro: "Only what we need to plan, book and run your trip:",
    items: [
      "Name, email address and phone number when you enquire, book or message us on WhatsApp",
      "Travel dates, group size, package choice and any requirements you tell us about",
      "Government-issued ID details, when we apply for an Inner Line Permit or Protected Area Permit on your behalf",
      "An emergency contact, for trips into remote areas",
      "Booking and payment records: amount, status and the reference numbers PayU returns. We never see or store your card, UPI or bank details",
      "Basic usage data from Google Analytics: pages visited, device type and approximate location, collected through cookies",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    items: [
      "To confirm bookings, take payments and send receipts",
      "To obtain the permits your itinerary needs",
      "To share trip details, timings and changes with you",
      "To handle emergencies while you travel with us",
      "To understand which pages help travellers, so we can improve the site. We do not sell your data or use it for third-party advertising",
    ],
  },
  {
    id: "services-we-use",
    title: "Services that process data for us",
    intro: "These providers handle data only to deliver their service to us:",
    items: [
      "PayU, for online payments. Card, UPI and bank details go directly to PayU",
      "Supabase, to store booking and payment records",
      "Resend, to deliver emails from our contact form and booking confirmations",
      "Google Analytics, for anonymous site usage statistics",
      "Vercel, which hosts this website",
    ],
  },
  {
    id: "information-sharing",
    title: "Who else we share it with",
    items: [
      "Drivers, guides and homestays on your trip, limited to what they need, such as your name and pickup time",
      "Government permit authorities, for ILP and PAP applications",
      "Emergency services, when someone's safety requires it",
      "Authorities, when the law requires us to",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    items: [
      "Booking and payment records: as long as Indian tax and accounting law requires",
      "ID copies for permits: deleted once your trip is complete",
      "Enquiries that don't become a booking: deleted within 12 months",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    intro: "Write to info@travelspirene.com to:",
    items: [
      "Access the personal data we hold about you",
      "Correct anything inaccurate",
      "Ask us to delete your data, unless the law requires us to keep it",
      "Stop any marketing messages",
      "Raise a grievance. We reply within 7 working days",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    items: [
      "Google Analytics sets cookies to count visits. You can block them in your browser settings without affecting bookings",
      "Your light or dark theme choice is saved in your own browser",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      path="/privacy-policy"
      updated="16 October 2026"
      intro="What personal information we collect for enquiries, bookings and permits, how we use it, who processes it, and the rights you have over it."
      sections={sections.map((s) => ({
        id: s.id,
        title: s.title,
        body: (
          <>
            {s.intro ? <p>{s.intro}</p> : null}
            <ul>
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        ),
      }))}
    />
  );
}
