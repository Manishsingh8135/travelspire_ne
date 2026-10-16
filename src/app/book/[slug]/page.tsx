import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Callout, Container, Eyebrow, Heading, Lead, Section } from "@/components/ds";
import { IconArrowLeft } from "@/components/icons";
import { BookingCheckoutForm } from "@/components/bookings/booking-checkout-form";
import { getPlaceImageAlt } from "@/data/seo/image-seo-data";
import { awfHeroImages } from "@/data/festivals/anini-winter-fest";
import { allTours } from "@/data/tours";
import { earliestSellableDate, getBookingProduct, isOnSale } from "@/lib/bookings/catalog";
import { createWhatsAppURL } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Book Your Tour Securely",
  description: "Choose your Travelspire package and continue to PayU secure checkout.",
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};

export default async function BookTourPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tier?: string | string[] }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const product = getBookingProduct(slug);
  if (!product) notFound();
  // Off-sale products (a finished festival) send people back to the tour page,
  // which explains what happened and what's open instead.
  if (!isOnSale(product)) redirect(product.sourceUrl);
  const initialTierId = typeof query.tier === "string" ? query.tier : undefined;
  const isTestMode = process.env.PAYU_ENVIRONMENT !== "production";

  const tour = allTours.find((t) => t.slug === slug);
  const image = tour?.heroImage ?? (product.sourceUrl === "/anini-winter-fest-2026" ? awfHeroImages.desktop.src : undefined);
  const imageAlt = tour ? getPlaceImageAlt(tour.heroImage, `${tour.title}, ${tour.location}`) : product.name;
  const whatsappHref = createWhatsAppURL({
    customMessage: `Hi Travelspire, I have a question before booking ${product.name}.`,
  });

  return (
    <Section spacing="none" className="pb-20 pt-6 md:pb-28 md:pt-8">
      <Container>
        <Link
          href={product.sourceUrl}
          className="inline-flex items-center gap-2 font-ui text-small font-medium text-fg-muted transition-colors hover:text-fg"
        >
          <IconArrowLeft size={18} />
          Back to {product.name}
        </Link>

        {isTestMode ? (
          <Callout tone="caution" title="Test mode — no real money moves" className="mt-6 max-w-3xl">
            This site is connected to the PayU sandbox. Use PayU&apos;s test card or UPI details; nothing will be
            charged.
          </Callout>
        ) : null}

        <header className="mt-8 max-w-3xl space-y-3">
          <Eyebrow>Book directly</Eyebrow>
          <Heading as="h1" size="h1">
            {product.name}
          </Heading>
          <Lead>Choose your package and date, pay the full amount on PayU, and your receipt arrives by email.</Lead>
        </header>

        <BookingCheckoutForm
          className="mt-10 md:mt-12"
          product={product}
          minDepartureDate={earliestSellableDate(product)}
          initialTierId={initialTierId}
          isTestMode={isTestMode}
          image={image}
          imageAlt={imageAlt}
          whatsappHref={whatsappHref}
        />
      </Container>
    </Section>
  );
}
