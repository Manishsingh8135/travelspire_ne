"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button, Field, Input, Select, Textarea } from "@/components/ds";
import { IconAlert, IconSpinner } from "@/components/icons";
import { genders, idTypes, tripDetailsSchema, type TripDetails } from "@/lib/bookings/trip";
import { cn } from "@/lib/utils";

/* Who is travelling, for permits and the trip. Validates with the same schema
   as the API so the two can't disagree; the server re-checks everything. */

type Draft = {
  travellers: { name: string; age: string; gender: string; idType: string }[];
  arrival: string;
  food: string;
  emergencyName: string;
  emergencyPhone: string;
};

function toDraft(count: number, initial?: TripDetails): Draft {
  return {
    travellers: Array.from({ length: count }, (_, i) => {
      const t = initial?.travellers[i];
      return { name: t?.name ?? "", age: t ? String(t.age) : "", gender: t?.gender ?? "", idType: t?.idType ?? "" };
    }),
    arrival: initial?.arrival ?? "",
    food: initial?.food ?? "",
    emergencyName: initial?.emergencyName ?? "",
    emergencyPhone: initial?.emergencyPhone ?? "",
  };
}

export function TravellerForm({
  reference,
  token,
  travellerCount,
  initial,
  onDone,
  className,
}: {
  reference: string;
  token: string;
  travellerCount: number;
  initial?: TripDetails;
  onDone?: () => void;
  className?: string;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState(() => toDraft(travellerCount, initial));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const setTraveller = (i: number, key: keyof Draft["travellers"][number], value: string) =>
    setDraft((d) => ({ ...d, travellers: d.travellers.map((t, j) => (j === i ? { ...t, [key]: value } : t)) }));
  const setField = (key: Exclude<keyof Draft, "travellers">, value: string) => setDraft((d) => ({ ...d, [key]: value }));

  async function submit(event: FormEvent) {
    event.preventDefault();
    setFormError("");
    const parsed = tripDetailsSchema.safeParse(draft);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[issue.path.join(".")] ??= issue.message;
      setErrors(next);
      document.getElementById(`trip-${Object.keys(next)[0]?.replaceAll(".", "-")}`)?.focus();
      return;
    }
    setErrors({});
    setSaving(true);
    try {
      const response = await fetch("/api/trip/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, k: token, details: parsed.data }),
      });
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setFormError(body.error ?? "We couldn't save that. Please try again.");
        return;
      }
      onDone?.();
      router.refresh();
    } catch {
      setFormError("No connection. Check your internet and try again.");
    } finally {
      setSaving(false);
    }
  }

  const fieldProps = (path: string) => ({
    id: `trip-${path.replaceAll(".", "-")}`,
    "aria-invalid": errors[path] ? true : undefined,
    "aria-describedby": errors[path] ? `trip-${path.replaceAll(".", "-")}-error` : undefined,
  });

  return (
    <form onSubmit={submit} noValidate className={cn("space-y-8 font-ui", className)}>
      <div className="space-y-6">
        {draft.travellers.map((t, i) => (
          <fieldset key={i} className="rounded-card border border-line p-4 sm:p-5">
            <legend className="px-1 text-small font-semibold text-fg">
              Traveller {i + 1}
              {i === 0 ? <span className="font-normal text-fg-subtle"> · lead</span> : null}
            </legend>
            <div className="grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <Field label="Full name, as on the ID" htmlFor={`trip-travellers-${i}-name`} error={errors[`travellers.${i}.name`]}>
                <Input
                  {...fieldProps(`travellers.${i}.name`)}
                  autoComplete={i === 0 ? "name" : "off"}
                  value={t.name}
                  onChange={(e) => setTraveller(i, "name", e.target.value)}
                />
              </Field>
              <Field label="Age" htmlFor={`trip-travellers-${i}-age`} error={errors[`travellers.${i}.age`]}>
                <Input
                  {...fieldProps(`travellers.${i}.age`)}
                  inputMode="numeric"
                  value={t.age}
                  onChange={(e) => setTraveller(i, "age", e.target.value.replace(/\D/g, "").slice(0, 3))}
                />
              </Field>
              <Field label="Gender" htmlFor={`trip-travellers-${i}-gender`} error={errors[`travellers.${i}.gender`]}>
                <Select {...fieldProps(`travellers.${i}.gender`)} value={t.gender} onChange={(e) => setTraveller(i, "gender", e.target.value)}>
                  <option value="">Choose</option>
                  {genders.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </Select>
              </Field>
              <Field label="ID they'll carry" htmlFor={`trip-travellers-${i}-idType`} error={errors[`travellers.${i}.idType`]}>
                <Select {...fieldProps(`travellers.${i}.idType`)} value={t.idType} onChange={(e) => setTraveller(i, "idType", e.target.value)}>
                  <option value="">Choose</option>
                  {idTypes.map((id) => (
                    <option key={id}>{id}</option>
                  ))}
                </Select>
              </Field>
            </div>
          </fieldset>
        ))}
      </div>

      <div className="space-y-5">
        <Field
          label="How are you arriving?"
          htmlFor="trip-arrival"
          optional
          hint="Train or flight and time, or where you'd like to be picked up. You can tell us later too."
        >
          <Textarea {...fieldProps("arrival")} className="min-h-20" value={draft.arrival} onChange={(e) => setField("arrival", e.target.value)} />
        </Field>
        <Field label="Food needs" htmlFor="trip-food" optional hint="Vegetarian, Jain, allergies…">
          <Input {...fieldProps("food")} value={draft.food} onChange={(e) => setField("food", e.target.value)} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Emergency contact" htmlFor="trip-emergencyName" error={errors.emergencyName} hint="Someone not on the trip.">
            <Input {...fieldProps("emergencyName")} value={draft.emergencyName} onChange={(e) => setField("emergencyName", e.target.value)} />
          </Field>
          <Field label="Their phone" htmlFor="trip-emergencyPhone" error={errors.emergencyPhone}>
            <Input
              {...fieldProps("emergencyPhone")}
              type="tel"
              inputMode="tel"
              value={draft.emergencyPhone}
              onChange={(e) => setField("emergencyPhone", e.target.value)}
            />
          </Field>
        </div>
      </div>

      {formError ? (
        <p role="alert" className="flex gap-3 rounded-r-card border-l-[3px] border-critical bg-critical-soft px-4 py-3 text-small text-fg">
          <IconAlert size={18} className="mt-0.5 shrink-0 text-critical" />
          {formError}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={saving}>
          {saving ? <IconSpinner className="animate-spin" /> : null}
          {initial ? "Save changes" : "Send details"}
        </Button>
        {onDone && initial ? (
          <Button type="button" variant="secondary" onClick={onDone}>
            Cancel
          </Button>
        ) : null}
        <p className="text-caption text-fg-subtle sm:ml-2">We use these only to arrange your permits and trip.</p>
      </div>
    </form>
  );
}
