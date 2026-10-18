import { z } from "zod";

// Everything that happens to a booking after it is paid: who is travelling,
// where the team has got to, and the driver who will meet them. It is stored
// in `tour_bookings.metadata.trip` and is never read by the payment functions,
// so nothing here can change what anyone paid.
//
// Shared by the My Trip page, its form and the admin pages, so it holds no
// server-only code.

export const tripStages = [
  { id: "paid", label: "Paid", customer: "Payment received" },
  { id: "details_received", label: "Details received", customer: "Traveller details received" },
  { id: "permits_done", label: "Permits done", customer: "Permits ready" },
  { id: "driver_assigned", label: "Driver assigned", customer: "Driver assigned" },
  { id: "completed", label: "Completed", customer: "Trip completed" },
] as const;

export const stageIds = ["paid", "details_received", "permits_done", "driver_assigned", "completed", "on_hold"] as const;

export type TripStage = (typeof stageIds)[number];

export function stageLabel(stage: TripStage) {
  return stage === "on_hold" ? "On hold" : tripStages.find((s) => s.id === stage)!.label;
}

export function stageIndex(stage: TripStage) {
  return tripStages.findIndex((s) => s.id === stage);
}

/** Once permits are applied for, names and ages can only change through us. */
export function detailsLocked(stage: TripStage) {
  return stageIndex(stage) >= stageIndex("permits_done");
}

export const idTypes = ["Aadhaar", "Passport", "Voter ID", "Driving licence"] as const;
export const genders = ["Female", "Male", "Other"] as const;

const text = (max: number) => z.string().trim().max(max);

export const travellerSchema = z.object({
  name: text(80).min(2, "Enter the full name as on the ID."),
  age: z.coerce.number().int().min(0, "Enter an age.").max(110, "Enter an age."),
  gender: z.enum(genders, { errorMap: () => ({ message: "Choose one." }) }),
  idType: z.enum(idTypes, { errorMap: () => ({ message: "Choose the ID they'll carry." }) }),
});

export type Traveller = z.infer<typeof travellerSchema>;

export const tripDetailsSchema = z.object({
  travellers: z.array(travellerSchema).min(1).max(30),
  arrival: text(400),
  food: text(200),
  emergencyName: text(80).min(2, "Who should we call in an emergency?"),
  emergencyPhone: z
    .string()
    .transform((v) => v.replace(/[^0-9+]/g, ""))
    .pipe(z.string().min(10, "Enter a phone number.").max(16, "Enter a phone number.")),
});

export type TripDetails = z.infer<typeof tripDetailsSchema>;

export type TripDriver = {
  name: string;
  phone: string;
  vehicle: string;
  pickupTime: string;
  pickupPlace: string;
};

export type TripNote = { at: string; by: string; text: string };

/** The shape kept in `metadata.trip`. Every field is optional on read. */
export type TripRecord = {
  stage?: TripStage;
  stageUpdatedAt?: string;
  details?: TripDetails;
  detailsSubmittedAt?: string;
  driver?: TripDriver;
  notes?: TripNote[];
  /** Automatic messages already sent, by key, so the daily job sends each once. */
  sent?: Partial<Record<TripMessageKey, string>>;
};

export type TripMessageKey = "details-reminder" | "details-reminder-final" | "pre-trip" | "after-trip";

export function currentStage(trip: TripRecord): TripStage {
  if (trip.stage) return trip.stage;
  return trip.details ? "details_received" : "paid";
}
