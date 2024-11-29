// app/contact/page.tsx
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactMethods } from "@/components/contact/contact-methods";
import { ContactForm } from "@/components/contact/contact-form";
import { OfficeLocations } from "@/components/contact/contact-location";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <ContactHero />
      <ContactMethods />
      <ContactForm />
      <OfficeLocations />
    </main>
  );
}