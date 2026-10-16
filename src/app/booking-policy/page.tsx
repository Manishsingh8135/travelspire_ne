import Link from "next/link";
import { LegalPage } from "@/components/company/legal-page";

const steps = [
  ["Select your tour", "Browse our curated tours and choose your preferred dates."],
  ["Pay the complete amount", "Pay the server-confirmed package total securely through PayU."],
  ["Submit documents", "Provide necessary documents for permits and verification."],
  ["Confirmation", "Receive your booking confirmation and tour details."],
] as const;

const inclusions = [
  "Professional guide services",
  "Accommodations as per itinerary",
  "Transportation during tour",
  "Meals as specified",
  "Inner Line Permit processing",
  "Basic first aid support",
];

const groupBookings = [
  "Special rates for 6+ participants",
  "Group leader benefits",
  "Customization options",
  "Exclusive vehicle arrangements",
  "Coordinated logistics",
  "Group-specific amenities",
];

const specialRequirements = [
  "Dietary preferences",
  "Medical considerations",
  "Accessibility needs",
  "Special equipment requests",
  "Language preferences",
  "Cultural accommodations",
];

const refunds = [
  "90% refund: 30+ days before",
  "50% refund: 15–29 days before",
  "25% refund: 7–14 days before",
  "No refund: less than 7 days",
];

const List = ({ items }: { items: readonly string[] }) => (
  <ul>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

export default function BookingPolicyPage() {
  return (
    <LegalPage
      title="Booking policy"
      path="/booking-policy"
      updated="21 August 2026"
      intro="How booking works for Travelspire tours — paying in full, documents, what a tour includes, group and special requests, and what to expect on the ground."
      sections={[
        {
          id: "how-booking-works",
          title: "How booking works",
          body: (
            <ol className="mt-5 list-decimal space-y-3 pl-5 marker:font-semibold marker:text-fg">
              {steps.map(([title, text]) => (
                <li key={title} className="pl-1">
                  <strong>{title}.</strong> {text}
                </li>
              ))}
            </ol>
          ),
        },
        {
          id: "inclusions",
          title: "What our tours include",
          body: <List items={inclusions} />,
        },
        {
          id: "group-bookings",
          title: "Group bookings",
          body: <List items={groupBookings} />,
        },
        {
          id: "special-requirements",
          title: "Special requirements",
          body: <List items={specialRequirements} />,
        },
        {
          id: "camping",
          title: "Camping and equipment",
          body: (
            <p>
              We provide essential camping gear for adventure tours. Personal items and specialized equipment
              requirements will be communicated in advance.
            </p>
          ),
        },
        {
          id: "weather",
          title: "Weather considerations",
          body: (
            <p>
              Tours may be modified based on weather conditions. Safety is our priority, and alternative arrangements
              will be made when necessary.
            </p>
          ),
        },
        {
          id: "gear",
          title: "Required gear",
          body: (
            <p>
              A detailed packing list will be provided. Some items may be available for rent, subject to availability.
            </p>
          ),
        },
        {
          id: "communication",
          title: "Communication",
          body: (
            <p>
              Stay updated with pre-tour briefings and daily updates during the tour. Emergency contacts are provided
              upon booking.
            </p>
          ),
        },
        {
          id: "cancellations",
          title: "Cancellations and refunds",
          body: (
            <>
              <p>
                Refunds follow the cancellation schedule in our{" "}
                <Link href="/terms-and-conditions#cancellation-policy">terms and conditions</Link>:
              </p>
              <List items={refunds} />
            </>
          ),
        },
      ]}
    />
  );
}
