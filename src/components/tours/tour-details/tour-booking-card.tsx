"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  CreditCard,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { createTourWhatsAppURL } from "@/lib/whatsapp";
import { getTourPrice, isRegularTour, type Tour } from "@/types/tours/tour";
import { cn } from "@/lib/utils";

interface TourBookingCardProps {
  tour: Tour;
  className?: string;
}

const priceFormatter = new Intl.NumberFormat("en-IN");

export function TourBookingCard({ tour, className }: TourBookingCardProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const price = getTourPrice(tour).min;

  const handleInquiry = () => {
    const url = createTourWhatsAppURL(tour, {
      customerName: customerName || undefined,
      customerEmail: customerEmail || undefined,
      customerPhone: customerPhone || undefined,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <aside
      aria-label={`Enquire about ${tour.title}`}
      className={cn(
        "overflow-hidden rounded-[16px] bg-[#111c16] p-6 text-[#f5f0e5] shadow-[12px_22px_48px_-27px_rgba(8,16,11,0.9)] sm:p-7",
        className,
      )}
    >
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#cdb783]">
        {isRegularTour(tour) ? "Price per person" : "Packages from"}
      </p>
      <p className="mt-2 text-[2.65rem] font-medium leading-none tracking-[-0.055em] text-white">
        ₹{priceFormatter.format(price)}
      </p>
      <p className="mt-4 text-sm leading-6 text-white/[0.52]">
        Share a few details and continue the conversation directly with our
        Northeast travel team.
      </p>

      <div className="mt-6 space-y-2.5">
        <BookingInput
          id="tour-booking-name"
          label="Your name"
          value={customerName}
          onChange={setCustomerName}
        />
        <BookingInput
          id="tour-booking-email"
          label="Email address"
          type="email"
          value={customerEmail}
          onChange={setCustomerEmail}
        />
        <BookingInput
          id="tour-booking-phone"
          label="Phone number"
          type="tel"
          value={customerPhone}
          onChange={setCustomerPhone}
        />
      </div>

      <Link
        href={`/book/${tour.slug}`}
        className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[#eadfc8] px-5 text-[10px] font-bold uppercase tracking-[0.13em] text-[#09110d] shadow-[7px_12px_26px_-16px_rgba(0,0,0,0.9)] transition-colors duration-200 hover:bg-[#f8f1e4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eadfc8] focus-visible:ring-offset-3 focus-visible:ring-offset-[#111c16]"
      >
        <CreditCard aria-hidden="true" className="h-4 w-4" />
        Book and pay securely
      </Link>
      <button
        type="button"
        onClick={handleInquiry}
        className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[9px] text-[10px] font-bold uppercase tracking-[0.12em] text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
      >
        <MessageCircle aria-hidden="true" className="h-4 w-4" />
        Ask before booking
      </button>

      <div className="mt-6 grid gap-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/[0.46]">
        <p className="flex items-center gap-2.5">
          <CalendarCheck
            aria-hidden="true"
            className="h-4 w-4 text-[#cdb783]"
          />
          Complete package payment
        </p>
        <p className="flex items-center gap-2.5">
          <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#cdb783]" />
          Permit guidance included
        </p>
      </div>
    </aside>
  );
}

function BookingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: "text" | "email" | "tel";
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={`${label} (optional)`}
        className="h-12 w-full rounded-[9px] bg-white/[0.07] px-4 text-sm text-white outline-none placeholder:text-white/[0.32] transition-colors focus:bg-white/[0.1] focus:ring-2 focus:ring-[#b99c65]"
      />
    </div>
  );
}
