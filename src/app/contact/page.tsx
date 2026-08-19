// app/contact/page.tsx
import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactMethods } from "@/components/contact/contact-methods";
import { ContactForm } from "@/components/contact/contact-form";
import { OfficeLocations } from "@/components/contact/contact-location";

export const metadata: Metadata = {
  title: { absolute: "Contact Travelspire NE — Plan Your Northeast India Trip" },
  description:
    "Talk to the Travelspire North-East team in Dibrugarh. WhatsApp, phone and email — trip planning, ILP assistance, fleet bookings and custom itineraries across Northeast India.",
  alternates: { canonical: "/contact" },
};

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