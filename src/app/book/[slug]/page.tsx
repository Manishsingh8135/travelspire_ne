import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, MailCheck, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { BookingCheckoutForm } from "@/components/bookings/booking-checkout-form";
import { getBookingProduct } from "@/lib/bookings/catalog";

export const metadata: Metadata = {
  title: "Book Your Tour Securely",
  description:
    "Choose your Travelspire package and continue to PayU secure checkout.",
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
  const initialTierId = typeof query.tier === "string" ? query.tier : undefined;

  return (
    <div className="min-h-screen bg-[#07110f] px-5 pb-24 pt-32 text-[#f6efe2] sm:px-8 sm:pt-36 lg:px-16 xl:px-24">
      <main className="mx-auto w-full max-w-[1380px]">
        <Link
          href={product.sourceUrl}
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/55 transition-colors hover:text-white"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to {product.name}
        </Link>

        <div className="mt-9 grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <section className="lg:col-span-7 lg:pt-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e59a67]">
              Book directly
            </p>
            <h1 className="mt-5 max-w-[11ch] text-[clamp(3.1rem,7vw,6.7rem)] font-medium leading-[0.89] tracking-[-0.06em]">
              {product.name}
            </h1>
            <p className="mt-7 max-w-[40rem] text-base leading-7 text-white/58 sm:text-lg sm:leading-8">
              Select the package and departure date, pay the complete amount on
              PayU, and receive your verified booking receipt by email.
            </p>

            <div className="mt-12 grid gap-px overflow-hidden rounded-[14px] bg-white/10 sm:grid-cols-3">
              {[
                {
                  icon: BadgeCheck,
                  title: "Live package price",
                  text: "Read directly from the tour data",
                },
                {
                  icon: ShieldCheck,
                  title: "Server-verified total",
                  text: "Customers cannot alter the amount",
                },
                {
                  icon: MailCheck,
                  title: "Receipt by email",
                  text: "Sent after verified PayU success",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="bg-[#0d1915] p-5 sm:min-h-40 sm:p-6"
                >
                  <item.icon
                    aria-hidden="true"
                    className="h-5 w-5 text-[#d7b978]"
                  />
                  <h2 className="mt-7 text-sm font-semibold">{item.title}</h2>
                  <p className="mt-2 text-xs leading-5 text-white/42">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <div className="lg:col-span-5">
            <BookingCheckoutForm
              product={product}
              initialTierId={initialTierId}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
