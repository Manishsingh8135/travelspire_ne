// app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Accent, Accordion, Breadcrumbs, Container, Heading, Lead, Section, SectionHeader, buttonVariants } from "@/components/ds";
import {
  IconArrowUpRight,
  IconChevronRight,
  IconExternal,
  IconInstagram,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
} from "@/components/icons";
import { ContactForm } from "@/components/company/contact-form";
import { officeLocation } from "@/data/contact/office";
import { contactInfo } from "@/data/social/social-links";
import { createTripPlanningURL } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: "Contact Travelspire NE — Plan Your Northeast India Trip" },
  description:
    "Talk to the Travelspire North-East team in Dibrugarh. WhatsApp, phone and email — trip planning, ILP assistance, fleet bookings and custom itineraries across Northeast India.",
  alternates: { canonical: "/contact" },
};

const faqs = [
  {
    question: "How quickly will I hear back?",
    answer:
      "WhatsApp and phone are fastest — usually within a few hours. Messages sent through the form are answered by email, usually within a day.",
  },
  {
    question: "Can you arrange my Inner Line Permit?",
    answer:
      "Yes. Permit help is included on our tours. If you are travelling on your own, our permit guides explain each state's process, and you can ask us about anything that isn't clear.",
  },
  {
    question: "Do you plan private or custom trips?",
    answer:
      "Yes — route, vehicle, stays and permits shaped around your dates. Tell us roughly what you want and we will confirm the details and send a private payment link.",
  },
  {
    question: "How do I pay for a tour?",
    answer:
      "Ready-made packages are paid online in full through PayU's hosted checkout; a verified receipt arrives by email. Custom journeys are paid through a private payment link once the details are confirmed.",
  },
  {
    question: "Where are you based?",
    answer:
      "In Dibrugarh, Assam — the usual starting point for Arunachal's eastern roads. Most of our Arunachal tours begin and end here.",
  },
];

export default function ContactPage() {
  const phoneHref = `tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`;
  const whatsapp = createTripPlanningURL();
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeLocation.address)}`;

  const channels = [
    {
      Icon: IconWhatsApp,
      title: "WhatsApp",
      value: contactInfo.phone,
      note: "Fastest — usually a reply within a few hours",
      href: whatsapp,
      external: true,
    },
    {
      Icon: IconPhone,
      title: "Call",
      value: contactInfo.phone,
      note: "Talk to the team in Dibrugarh",
      href: phoneHref,
      external: false,
    },
    {
      Icon: IconMail,
      title: "Email",
      value: contactInfo.email,
      note: "For detailed plans and documents",
      href: `mailto:${contactInfo.email}`,
      external: false,
    },
  ];

  return (
    <>
      <Section spacing="none" className="pb-14 pt-6 md:pb-20 md:pt-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact", href: "/contact" },
            ]}
          />
          <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <Heading as="h1" size="h1" className="max-w-[14ch]">
                Talk to a person <Accent>in Dibrugarh.</Accent>
              </Heading>
              <Lead className="mt-5 max-w-[46ch]">
                Trip planning, permits, vehicles or a question about a tour — reach the team directly. No call centre,
                no ticket queue.
              </Lead>

              <ul className="mt-10 border-t border-line">
                {channels.map(({ Icon, title, value, note, href, external }) => (
                  <li key={title} className="border-b border-line">
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 py-5 font-ui focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                        <Icon size={22} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-small text-fg-subtle">{title}</span>
                        <span className="block truncate text-h4 text-fg group-hover:text-brand">{value}</span>
                        <span className="block text-small text-fg-muted">{note}</span>
                      </span>
                      {external ? (
                        <IconArrowUpRight size={20} className="shrink-0 text-fg-subtle" />
                      ) : (
                        <IconChevronRight size={20} className="shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-ui text-small font-medium text-fg-muted hover:text-fg"
              >
                <IconInstagram size={18} />
                Follow the road on Instagram — @travelspire_ne
              </a>
            </div>

            <div className="rounded-panel border border-line bg-surface p-6 shadow-e2 sm:p-8">
              <h2 className="font-ui text-h3 text-fg">Send us a message</h2>
              <p className="mt-1.5 font-ui text-body text-fg-muted">
                Tell us what you have in mind. The more we know, the more useful our first reply.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="subtle" spacing="compact">
        <Container className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="flex gap-4 font-ui">
            <IconPin size={24} className="mt-1 shrink-0 text-brand" />
            <div>
              <h2 className="text-h3 text-fg">{officeLocation.title}</h2>
              <p className="mt-1 text-body text-fg-muted">{officeLocation.address}</p>
            </div>
          </div>
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "secondary", className: "justify-self-start md:justify-self-end" })}
          >
            <IconExternal />
            Open in Google Maps
          </a>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <SectionHeader
            className="md:grid-cols-1 md:gap-5"
            eyebrow="Before you write"
            title="Common questions"
            intro={
              <>
                Planning on your own? Start with the{" "}
                <Link href="/permits" className="font-medium text-brand underline underline-offset-4">
                  permit guides
                </Link>{" "}
                or{" "}
                <Link href="/all-tours" className="font-medium text-brand underline underline-offset-4">
                  browse our tours
                </Link>
                .
              </>
            }
          />
          <Accordion items={faqs} schema />
        </Container>
      </Section>
    </>
  );
}
