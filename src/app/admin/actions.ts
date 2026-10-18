"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/auth";
import { support } from "@/lib/bookings/after-payment";
import { tripUrl } from "@/lib/bookings/signing";
import { stageIds, stageIndex, stageLabel, type TripNote, type TripRecord } from "@/lib/bookings/trip";
import { getBooking, updateTrip } from "@/lib/bookings/trip-store";
import { escapeHtml, sendEmail } from "@/lib/email/resend";

// Team edits to a booking's trip record. Each action re-checks the session:
// a server action is a public endpoint like any other.

const note = (by: string, text: string): TripNote => ({ at: new Date().toISOString(), by, text });
const withNote = (trip: TripRecord, entry: TripNote) => [...(trip.notes ?? []), entry];
const field = (form: FormData, key: string) => String(form.get(key) ?? "").trim();

export async function setStage(reference: string, form: FormData) {
  const admin = await requireAdmin();
  const stage = z.enum(stageIds).parse(form.get("stage"));
  await updateTrip(reference, (trip) => ({
    ...trip,
    stage,
    stageUpdatedAt: new Date().toISOString(),
    notes: withNote(trip, note(admin, `Stage set to ${stageLabel(stage)}`)),
  }));
  revalidatePath(`/admin/bookings/${reference}`);
}

const driverSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(10).max(20),
  vehicle: z.string().min(2).max(80),
  pickupTime: z.string().min(2).max(80),
  pickupPlace: z.string().min(2).max(160),
});

export async function saveDriver(reference: string, form: FormData) {
  const admin = await requireAdmin();
  const driver = driverSchema.parse({
    name: field(form, "name"),
    phone: field(form, "phone"),
    vehicle: field(form, "vehicle"),
    pickupTime: field(form, "pickupTime"),
    pickupPlace: field(form, "pickupPlace"),
  });
  const notify = form.get("notify") === "on";

  await updateTrip(reference, (trip) => {
    const advance = trip.stage !== "on_hold" && stageIndex(trip.stage ?? "paid") < stageIndex("driver_assigned");
    return {
      ...trip,
      driver,
      ...(advance ? { stage: "driver_assigned", stageUpdatedAt: new Date().toISOString() } : {}),
      notes: withNote(trip, note(admin, `Driver saved: ${driver.name}, ${driver.vehicle}${notify ? " (customer emailed)" : ""}`)),
    };
  });

  if (notify) {
    const booking = await getBooking(reference);
    const link = tripUrl(reference);
    if (booking) {
      const lines = [
        `Driver: ${driver.name}, ${driver.phone}`,
        `Vehicle: ${driver.vehicle}`,
        `Pickup: ${driver.pickupTime}, ${driver.pickupPlace}`,
      ];
      await sendEmail({
        to: [booking.customer_email],
        replyTo: support.email,
        subject: `Your driver for ${booking.tour_name} · ${reference}`,
        text: `Hi ${booking.customer_first_name},\n\nHere are your pickup details.\n\n${lines.join("\n")}\n\n${link ? `Your trip page: ${link}\n\n` : ""}Questions? WhatsApp or call ${support.phoneDisplay}.\n\nTravelspire Northeast`,
        html: `<p>Hi ${escapeHtml(booking.customer_first_name)},</p><p>Here are your pickup details.</p><p>${lines.map(escapeHtml).join("<br>")}</p>${link ? `<p><a href="${escapeHtml(link)}">Open your trip page</a></p>` : ""}<p>Questions? WhatsApp or call ${support.phoneDisplay}.</p><p>Travelspire Northeast</p>`,
      });
    }
  }
  revalidatePath(`/admin/bookings/${reference}`);
}

export async function addNote(reference: string, form: FormData) {
  const admin = await requireAdmin();
  const text = z.string().trim().min(1).max(2000).parse(form.get("text"));
  await updateTrip(reference, (trip) => ({ ...trip, notes: withNote(trip, note(admin, text)) }));
  revalidatePath(`/admin/bookings/${reference}`);
}
