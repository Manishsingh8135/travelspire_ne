"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { FormState } from "./db-error";
import { PLACE_KINDS } from "./schemas";
import { Button, Field, FieldMessage, Input, Label, Textarea } from "@/components/ui";
import { NameSlugFields } from "./ui/name-slug-fields";
import { readString } from "@/lib/json";
import type { Place } from "@/lib/supabase/types";

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

const selectClass =
  "h-11 w-full rounded-sm border border-input bg-card px-3.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring";

export function PlaceForm({
  action,
  place,
  regions,
  submitLabel,
}: {
  action: Action;
  place?: Place;
  regions: { id: string; name: string }[];
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <NameSlugFields
        sourceField="name"
        sourceLabel="Name"
        defaultSource={place?.name ?? ""}
        defaultSlug={place?.slug ?? ""}
        sourceError={state.fieldErrors?.name}
        slugError={state.fieldErrors?.slug}
        slugPlaceholder="mechuka"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <Label htmlFor="regionId">Region</Label>
          <select
            id="regionId"
            name="regionId"
            defaultValue={place?.region_id ?? ""}
            className={selectClass}
            required
          >
            <option value="" disabled>
              Select a region…
            </option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
          {state.fieldErrors?.regionId ? (
            <FieldMessage>{state.fieldErrors.regionId}</FieldMessage>
          ) : null}
        </Field>

        <Field>
          <Label htmlFor="kind">Kind</Label>
          <select
            id="kind"
            name="kind"
            defaultValue={place?.kind ?? "village"}
            className={selectClass}
          >
            {PLACE_KINDS.map((k) => (
              <option key={k} value={k} className="capitalize">
                {k}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field>
          <Label htmlFor="elevation">Elevation (m)</Label>
          <Input
            id="elevation"
            name="elevation"
            type="number"
            inputMode="numeric"
            defaultValue={place?.elevation_m ?? ""}
          />
        </Field>
        <Field>
          <Label htmlFor="lat">Latitude</Label>
          <Input
            id="lat"
            name="lat"
            type="number"
            step="any"
            defaultValue={place?.lat ?? ""}
            placeholder="28.6100"
          />
          {state.fieldErrors?.lat ? <FieldMessage>{state.fieldErrors.lat}</FieldMessage> : null}
        </Field>
        <Field>
          <Label htmlFor="lng">Longitude</Label>
          <Input
            id="lng"
            name="lng"
            type="number"
            step="any"
            defaultValue={place?.lng ?? ""}
            placeholder="94.1167"
          />
        </Field>
      </div>

      <Field>
        <Label htmlFor="intro">Intro</Label>
        <Textarea
          id="intro"
          name="intro"
          defaultValue={readString(place?.body, "intro") ?? ""}
          placeholder="What makes this place worth the journey…"
        />
      </Field>

      <fieldset className="flex flex-col gap-4 rounded-lg border border-border-subtle p-5">
        <legend className="px-1 font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Visibility &amp; access
        </legend>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="isSecret"
            defaultChecked={place?.is_secret ?? false}
            className="mt-0.5 size-4 rounded-xs border-border-strong accent-[var(--accent)]"
          />
          <span>
            <span className="text-sm font-medium">Secret spot</span>
            <span className="block text-xs text-muted-foreground">
              Hidden from anonymous visitors and search engines — protects fragile places.
            </span>
          </span>
        </label>
        <Field>
          <Label htmlFor="exclusivityTier">Exclusivity</Label>
          <select
            id="exclusivityTier"
            name="exclusivityTier"
            defaultValue={String(place?.exclusivity_tier ?? 0)}
            className={selectClass}
          >
            <option value="0">Public — anyone can view</option>
            <option value="1">Member — members only</option>
            <option value="2">Premium — premium members only</option>
          </select>
          <p className="text-xs text-muted-foreground">
            Gated tiers keep crown-jewel intel behind membership.
          </p>
        </Field>
      </fieldset>

      <fieldset className="flex flex-col gap-4 rounded-lg border border-border-subtle p-5">
        <legend className="px-1 font-mono text-xs tracking-wider text-muted-foreground uppercase">
          SEO
        </legend>
        <Field>
          <Label htmlFor="seoTitle">SEO title</Label>
          <Input
            id="seoTitle"
            name="seoTitle"
            defaultValue={readString(place?.seo, "title") ?? ""}
            placeholder="Defaults to the name"
          />
        </Field>
        <Field>
          <Label htmlFor="seoDescription">SEO description</Label>
          <Textarea
            id="seoDescription"
            name="seoDescription"
            defaultValue={readString(place?.seo, "description") ?? ""}
          />
        </Field>
      </fieldset>

      {state.error ? <FieldMessage>{state.error}</FieldMessage> : null}

      <div className="flex items-center gap-3">
        <Button type="submit" loading={pending}>
          {submitLabel}
        </Button>
        <Button type="button" variant="ghost" asChild>
          <Link href="/admin/places">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
