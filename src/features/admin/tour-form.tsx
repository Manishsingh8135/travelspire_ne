"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { FormState } from "./db-error";
import { TOUR_DIFFICULTIES, TOUR_TYPES } from "./schemas";
import { Button, Field, FieldMessage, Input, Label, Textarea } from "@/components/ui";
import { NameSlugFields } from "./ui/name-slug-fields";
import { readString } from "@/lib/json";
import type { Tour } from "@/lib/supabase/types";

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

const selectClass =
  "h-11 w-full rounded-sm border border-input bg-card px-3.5 text-sm text-foreground capitalize outline-none transition-colors focus-visible:border-ring";

function joinLines(v: unknown): string {
  return Array.isArray(v) ? v.filter((x) => typeof x === "string").join("\n") : "";
}

export function TourForm({
  action,
  tour,
  regions,
  submitLabel,
}: {
  action: Action;
  tour?: Tour;
  regions: { id: string; name: string }[];
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});
  const body = (tour?.body ?? {}) as Record<string, unknown>;

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <NameSlugFields
        sourceField="title"
        sourceLabel="Title"
        defaultSource={tour?.title ?? ""}
        defaultSlug={tour?.slug ?? ""}
        sourceError={state.fieldErrors?.title}
        slugError={state.fieldErrors?.slug}
        slugPlaceholder="tawang-winter-expedition"
      />
      <Field>
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input id="subtitle" name="subtitle" defaultValue={tour?.subtitle ?? ""} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <Label htmlFor="type">Type</Label>
          <select id="type" name="type" defaultValue={tour?.type ?? "adventure"} className={selectClass}>
            {TOUR_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field>
          <Label htmlFor="difficulty">Difficulty</Label>
          <select
            id="difficulty"
            name="difficulty"
            defaultValue={tour?.difficulty ?? "moderate"}
            className={selectClass}
          >
            {TOUR_DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field>
        <Label htmlFor="regionId">Region (optional)</Label>
        <select
          id="regionId"
          name="regionId"
          defaultValue={tour?.region_id ?? ""}
          className={selectClass}
        >
          <option value="">— none —</option>
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field>
          <Label htmlFor="durationDays">Duration (days)</Label>
          <Input
            id="durationDays"
            name="durationDays"
            type="number"
            min="1"
            inputMode="numeric"
            defaultValue={tour?.duration_days ?? ""}
          />
          {state.fieldErrors?.durationDays ? (
            <FieldMessage>{state.fieldErrors.durationDays}</FieldMessage>
          ) : null}
        </Field>
        <Field>
          <Label htmlFor="priceInr">Price (₹)</Label>
          <Input
            id="priceInr"
            name="priceInr"
            type="number"
            min="0"
            inputMode="numeric"
            defaultValue={tour?.price_inr ?? ""}
          />
          {state.fieldErrors?.priceInr ? (
            <FieldMessage>{state.fieldErrors.priceInr}</FieldMessage>
          ) : null}
        </Field>
        <Field>
          <Label htmlFor="bestTime">Best time</Label>
          <Input id="bestTime" name="bestTime" defaultValue={tour?.best_time ?? ""} placeholder="Oct–Apr" />
        </Field>
      </div>

      <Field>
        <Label htmlFor="overview">Overview</Label>
        <Textarea id="overview" name="overview" defaultValue={readString(tour?.body, "overview") ?? ""} />
      </Field>
      <Field>
        <Label htmlFor="highlights">Highlights (one per line)</Label>
        <Textarea id="highlights" name="highlights" defaultValue={joinLines(body.highlights)} />
      </Field>
      <Field>
        <Label htmlFor="inclusions">Inclusions (one per line)</Label>
        <Textarea id="inclusions" name="inclusions" defaultValue={joinLines(body.inclusions)} />
      </Field>

      <fieldset className="flex flex-col gap-4 rounded-lg border border-border-subtle p-5">
        <legend className="px-1 font-mono text-xs tracking-wider text-muted-foreground uppercase">
          SEO
        </legend>
        <Field>
          <Label htmlFor="seoTitle">SEO title</Label>
          <Input
            id="seoTitle"
            name="seoTitle"
            defaultValue={readString(tour?.seo, "title") ?? ""}
            placeholder="Defaults to the title"
          />
        </Field>
        <Field>
          <Label htmlFor="seoDescription">SEO description</Label>
          <Textarea
            id="seoDescription"
            name="seoDescription"
            defaultValue={readString(tour?.seo, "description") ?? ""}
          />
        </Field>
      </fieldset>

      {state.error ? <FieldMessage>{state.error}</FieldMessage> : null}

      <div className="flex items-center gap-3">
        <Button type="submit" loading={pending}>
          {submitLabel}
        </Button>
        <Button type="button" variant="ghost" asChild>
          <Link href="/admin/tours">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
