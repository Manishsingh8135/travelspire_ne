import type { Metadata } from "next";
import { Container, Eyebrow, Heading, Lead, Section, buttonVariants } from "@/components/ds";
import { IconWhatsApp } from "@/components/icons";
import { Steps } from "@/components/site/content-blocks";
import { PaymentAccessForm } from "@/components/payments/payment-access-form";
import { createWhatsAppURL } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Secure Tour Payment",
  description: "Open a confirmed Travelspire North-East booking and continue to secure PayU Hosted Checkout.",
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};

const steps = [
  {
    title: "We confirm the trip together",
    body: "Departure date, rooms, vehicle, number of travellers and what's included — agreed in writing first.",
  },
  {
    title: "You receive private payment details",
    body: "One booking reference and one payment code, for exactly the amount we agreed.",
  },
  {
    title: "You pay on PayU",
    body: "Enter them here and PayU opens with the amount already set. Your receipt arrives by email.",
  },
];

export default function SecurePaymentPage() {
  const confirmFirst = createWhatsAppURL({
    customMessage: "Hi Travelspire, I'd like to confirm my trip details and receive private payment access.",
  });

  return (
    <Section spacing="none" className="pb-20 pt-10 md:pb-28 md:pt-14">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-start lg:gap-16">
        <div>
          <Eyebrow>Custom &amp; private journeys</Eyebrow>
          <Heading as="h1" size="h1" className="mt-3 max-w-[16ch]">
            Pay for a trip we&apos;ve already confirmed.
          </Heading>
          <Lead className="mt-5 max-w-[48ch]">
            This page is for journeys planned with our team. It opens only with the reference and payment code we send
            you once everything is agreed — so you always pay the exact amount you expect.
          </Lead>
          <Steps items={steps} className="mt-10 max-w-xl" />
        </div>

        <div className="space-y-4">
          <PaymentAccessForm />
          <div className="flex flex-col gap-4 rounded-panel bg-canvas-subtle p-5 font-ui sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-body font-semibold text-fg">No payment details yet?</p>
              <p className="mt-0.5 text-small text-fg-muted">Confirm your dates and final quote with us first.</p>
            </div>
            <a
              href={confirmFirst}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "secondary", className: "shrink-0" })}
            >
              <IconWhatsApp />
              Confirm first
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
