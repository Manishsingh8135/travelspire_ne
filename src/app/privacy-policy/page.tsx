import { LegalPage } from "@/components/company/legal-page";

const sections = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    items: [
      "Name, email address, and phone number",
      "Government-issued ID details for permits",
      "Travel preferences and requirements",
      "Emergency contact information",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    items: [
      "Process tour bookings and payments",
      "Obtain necessary travel permits (ILP/PAP)",
      "Communicate tour details and updates",
      "Handle emergencies during tours",
    ],
  },
  {
    id: "information-sharing",
    title: "Information sharing",
    items: [
      "Local tour operators and guides",
      "Accommodation providers",
      "Government authorities for permits",
      "Emergency services when needed",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    items: [
      "Access your personal data",
      "Correct inaccurate information",
      "Request data deletion",
      "Opt-out of marketing communications",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      path="/privacy-policy"
      updated="27 November 2024"
      intro="What personal information we collect for enquiries, bookings and permits, how we use it, who we share it with, and the rights you have over it."
      sections={sections.map((s) => ({
        id: s.id,
        title: s.title,
        body: (
          <ul>
            {s.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ),
      }))}
    />
  );
}
