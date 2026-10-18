import "server-only";

import { paymentDatabaseFetch, PaymentStoreError } from "@/lib/payments/payu/store";
import type { TripRecord } from "./trip";

// Reads bookings for the My Trip page and the admin, and writes the `trip`
// key of `tour_bookings.metadata`. Payment columns are only ever read here.

export type BookingRow = {
  id: string;
  reference: string;
  tour_slug: string;
  tour_name: string;
  package_tier_id: string;
  travellers: number;
  departure_date: string;
  customer_first_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount_paise: number;
  paid_amount_paise: number;
  status: string;
  created_at: string;
  updated_at: string;
  metadata: { trip?: TripRecord } & Record<string, unknown>;
  payment_attempts: { txnid: string; status: string; updated_at: string }[];
};

const COLUMNS =
  "id,reference,tour_slug,tour_name,package_tier_id,travellers,departure_date,customer_first_name,customer_email,customer_phone,total_amount_paise,paid_amount_paise,status,created_at,updated_at,metadata,payment_attempts(txnid,status,updated_at)";

export const tripOf = (booking: BookingRow): TripRecord => booking.metadata?.trip ?? {};

export async function getBooking(reference: string) {
  const params = new URLSearchParams({
    reference: `eq.${reference.trim().toUpperCase()}`,
    select: COLUMNS,
    limit: "1",
  });
  const rows = await paymentDatabaseFetch<BookingRow[]>(`/rest/v1/tour_bookings?${params}`);
  return rows[0] ?? null;
}

export type BookingView = "upcoming" | "unpaid" | "past";

function indiaToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
}

export async function listBookings(view: BookingView) {
  const today = indiaToday();
  const params = new URLSearchParams({ select: COLUMNS, limit: "200" });

  if (view === "upcoming") {
    params.set("status", "eq.paid");
    params.set("departure_date", `gte.${today}`);
    params.set("order", "departure_date.asc,created_at.asc");
  } else if (view === "past") {
    params.set("status", "eq.paid");
    params.set("departure_date", `lt.${today}`);
    params.set("order", "departure_date.desc");
  } else {
    // Checkouts that never completed: worth a WhatsApp follow-up for a month.
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    params.set("status", "in.(confirmed,payment_pending)");
    params.set("paid_amount_paise", "eq.0");
    params.set("created_at", `gte.${since}`);
    params.set("order", "created_at.desc");
  }

  return paymentDatabaseFetch<BookingRow[]>(`/rest/v1/tour_bookings?${params}`);
}

/** Paid bookings departing on or after `fromDate`, for the daily job. */
export async function listPaidDepartingFrom(fromDate: string) {
  const params = new URLSearchParams({
    select: COLUMNS,
    status: "eq.paid",
    departure_date: `gte.${fromDate}`,
    order: "departure_date.asc",
    limit: "500",
  });
  return paymentDatabaseFetch<BookingRow[]>(`/rest/v1/tour_bookings?${params}`);
}

/** Checkouts started since `since` (ISO time) that were never paid. */
export async function listUnpaidSince(since: string) {
  const params = new URLSearchParams({
    select: COLUMNS,
    status: "in.(confirmed,payment_pending)",
    paid_amount_paise: "eq.0",
    created_at: `gte.${since}`,
    order: "created_at.desc",
  });
  return paymentDatabaseFetch<BookingRow[]>(`/rest/v1/tour_bookings?${params}`);
}

/**
 * Applies `change` to the booking's trip record. The write only lands if the
 * row is unchanged since it was read (its `updated_at` is bumped by a trigger
 * on every update), so a customer's form and a team edit can't overwrite each
 * other; on a clash it re-reads and tries again.
 */
export async function updateTrip(reference: string, change: (trip: TripRecord) => TripRecord) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const booking = await getBooking(reference);
    if (!booking) throw new PaymentStoreError("BOOKING_NOT_FOUND", "Booking not found");

    const metadata = { ...booking.metadata, trip: change(tripOf(booking)) };
    const params = new URLSearchParams({
      id: `eq.${booking.id}`,
      updated_at: `eq.${booking.updated_at}`,
      select: "id",
    });
    const updated = await paymentDatabaseFetch<{ id: string }[]>(`/rest/v1/tour_bookings?${params}`, {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({ metadata }),
    });
    if (updated.length) return;
  }
  throw new PaymentStoreError("BOOKING_BUSY", "The booking changed while saving. Try again.");
}
