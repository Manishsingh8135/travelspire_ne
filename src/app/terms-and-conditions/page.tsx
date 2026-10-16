import { LegalPage } from "@/components/company/legal-page";

const List = ({ items }: { items: readonly string[] }) => (
  <ul>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms and conditions"
      path="/terms-and-conditions"
      updated="21 August 2026"
      intro="Please read these terms carefully before using our services. They apply to every Travelspire tour, booking and travel service."
      sections={[
        {
          id: "travel-services",
          title: "Travel services",
          body: (
            <List
              items={[
                "Customized Northeast India tours",
                "Adventure treks and expeditions",
                "Cultural and photography tours",
                "Local experiences and homestays",
              ]}
            />
          ),
        },
        {
          id: "service-areas",
          title: "Service areas",
          body: <List items={["Arunachal Pradesh", "Assam", "Meghalaya", "Nagaland"]} />,
        },
        {
          id: "payment-terms",
          title: "Payment terms",
          body: (
            <List
              items={[
                "Complete package payment required at checkout",
                "Secure payment processing",
                "Multiple payment options",
                "Transparent pricing",
              ]}
            />
          ),
        },
        {
          id: "cancellation-policy",
          title: "Cancellation policy",
          body: (
            <List
              items={[
                "90% refund: 30+ days before",
                "50% refund: 15–29 days before",
                "25% refund: 7–14 days before",
                "No refund: less than 7 days",
              ]}
            />
          ),
        },
        {
          id: "documentation",
          title: "Documentation requirements",
          body: (
            <p>
              Valid government ID, Inner Line Permits, and travel insurance are required for all tours. Medical
              declarations may be necessary for high-altitude treks.
            </p>
          ),
        },
        {
          id: "photography",
          title: "Photography guidelines",
          body: (
            <p>
              Respect local photography restrictions. Commercial photography requires special permission. We retain
              rights to use tour photos for promotion.
            </p>
          ),
        },
        {
          id: "group-conduct",
          title: "Group conduct",
          body: (
            <p>
              Participants must follow guide instructions, respect local customs, and maintain punctuality. We reserve
              the right to modify itineraries for safety.
            </p>
          ),
        },
        {
          id: "legal-compliance",
          title: "Legal compliance",
          body: (
            <p>All tours operate under Indian tourism regulations. Disputes are subject to jurisdiction in Assam courts.</p>
          ),
        },
      ]}
    />
  );
}
