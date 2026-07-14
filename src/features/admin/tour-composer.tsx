"use client";

import * as React from "react";
import { Field, FieldMessage, Input, Label, Textarea } from "@/components/ui";
import { MediaImage } from "@/components/media/media-image";
import { readString } from "@/lib/json";
import { PricingSchema, fromPrice, durationLabel } from "@/lib/tours/pricing";
import type { ItineraryDay } from "@/lib/tours/itinerary";
import type { FormState } from "./db-error";
import { TOUR_DIFFICULTIES, TOUR_TYPES } from "./schemas";
import { NameSlugFields } from "./ui/name-slug-fields";
import { EditorShell, TabPanel, useEditorForm } from "./ui/editor-shell";
import { Section } from "./ui/form-section";
import { PipelinePanel } from "./ui/pipeline-panel";
import { ItineraryComposer } from "./itinerary-composer";
import { PricingEditor } from "./pricing-editor";
import { HeroUploader } from "./hero-uploader";
import type { AdminTour } from "@/server/admin/tours";

/**
 * The Tour Composer — the flagship editor (13-admin-editor-system §5).
 * Five tabs over one form; edits the REAL rich data: tour_days + the pricing
 * matrix. Composes only the shared editor primitives.
 */

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

const selectClass =
  "h-11 w-full rounded-sm border border-input bg-card px-3.5 text-sm text-foreground capitalize outline-none transition-colors focus-visible:border-ring";

const OWNED_BODY_KEYS = ["overview", "highlights", "inclusions", "exclusions", "itinerary"];

function joinLines(v: unknown): string {
  return Array.isArray(v) ? v.filter((x) => typeof x === "string").join("\n") : "";
}

const TABS = [
  { id: "basics", label: "Basics" },
  { id: "itinerary", label: "Itinerary" },
  { id: "pricing", label: "Pricing" },
  { id: "content", label: "Content" },
  { id: "media", label: "Media & SEO" },
];

export function TourComposer({
  tour,
  days,
  regions,
  action,
}: {
  tour: AdminTour;
  days: ItineraryDay[];
  regions: { id: string; name: string }[];
  action: Action;
}) {
  const body = (tour.body ?? {}) as Record<string, unknown>;
  const pricingParsed = PricingSchema.safeParse(tour.pricing ?? {});
  const from =
    (pricingParsed.success ? fromPrice(pricingParsed.data) : null) ?? tour.price_inr ?? null;

  return (
    <EditorShell
      action={action}
      backHref="/admin/tours"
      backLabel="Tours"
      kicker={`Tour · ${tour.type}`}
      title={tour.title}
      slug={tour.slug}
      status={tour.status}
      liveHref={`/tours/${tour.slug}`}
      tabs={TABS}
      summary={
        <>
          <span>{days.length} days</span>
          <span>{durationLabel(tour.duration_days, tour.nights) ?? "—"}</span>
          <span>{from != null ? `from ₹${from.toLocaleString("en-IN")}` : "unpriced"}</span>
        </>
      }
      rail={<PipelinePanel body={tour.body} ownedKeys={OWNED_BODY_KEYS} />}
    >
      <TabPanel id="basics">
        <BasicsTab tour={tour} regions={regions} />
      </TabPanel>

      <TabPanel id="itinerary">
        <Section
          title="Day by day"
          hint="The real itinerary — route, timings, sightseeing tokens, where you sleep. Drag to reorder."
        >
          <ItineraryComposer name="itineraryRich" defaultValue={days} />
        </Section>
      </TabPanel>

      <TabPanel id="pricing">
        <Section
          title="Pricing matrix"
          hint="Group tiers, private rate, festival variants — the catalogue price is computed."
        >
          <PricingEditor name="pricing" defaultValue={tour.pricing} />
        </Section>
        <Section
          title="Fallback price"
          hint="Used only when no matrix exists (legacy single price)."
        >
          <PriceFallbackField defaultValue={tour.price_inr} />
        </Section>
      </TabPanel>

      <TabPanel id="content">
        <Section title="Overview">
          <Textarea
            id="overview"
            name="overview"
            rows={4}
            defaultValue={readString(tour.body, "overview") ?? ""}
          />
        </Section>
        <Section title="Lists" hint="One item per line — they render as checklists and chips.">
          <Field className="sm:col-span-6">
            <Label htmlFor="highlights">Highlights</Label>
            <Textarea id="highlights" name="highlights" rows={5} defaultValue={joinLines(body.highlights)} />
          </Field>
          <Field className="sm:col-span-6">
            <Label htmlFor="inclusions">Inclusions</Label>
            <Textarea id="inclusions" name="inclusions" rows={5} defaultValue={joinLines(body.inclusions)} />
          </Field>
          <Field className="sm:col-span-6">
            <Label htmlFor="exclusions">Exclusions</Label>
            <Textarea id="exclusions" name="exclusions" rows={5} defaultValue={joinLines(body.exclusions)} />
          </Field>
        </Section>
      </TabPanel>

      <TabPanel id="media">
        <Section title="Hero image">
          {tour.hero ? (
            <div className="relative aspect-[16/9] w-full max-w-96 overflow-hidden rounded-md border border-border-subtle bg-muted">
              <MediaImage media={tour.hero} sizes="384px" />
            </div>
          ) : null}
          <HeroUploader entity="tours" id={tour.id} hasHero={!!tour.hero_media_id} />
        </Section>
        <Section title="SEO" hint="Empty fields fall back to strong auto-generated defaults.">
          <Field className="sm:col-span-6">
            <Label htmlFor="seoTitle">SEO title</Label>
            <Input
              id="seoTitle"
              name="seoTitle"
              defaultValue={readString(tour.seo, "title") ?? ""}
              placeholder="Defaults to the title"
            />
          </Field>
          <Field className="sm:col-span-6">
            <Label htmlFor="seoDescription">SEO description</Label>
            <Textarea
              id="seoDescription"
              name="seoDescription"
              rows={3}
              defaultValue={readString(tour.seo, "description") ?? ""}
            />
          </Field>
        </Section>
        {/* Context rail only exists on xl — surface the pipeline panel here for smaller screens. */}
        <div className="xl:hidden">
          <PipelinePanel body={tour.body} ownedKeys={OWNED_BODY_KEYS} />
        </div>
      </TabPanel>
    </EditorShell>
  );
}

function BasicsTab({
  tour,
  regions,
}: {
  tour: AdminTour;
  regions: { id: string; name: string }[];
}) {
  const { state } = useEditorForm();
  return (
    <>
      <Section title="Identity">
        <div className="sm:col-span-12">
          <NameSlugFields
            sourceField="title"
            sourceLabel="Title"
            defaultSource={tour.title}
            defaultSlug={tour.slug}
            sourceError={state.fieldErrors?.title}
            slugError={state.fieldErrors?.slug}
            slugPlaceholder="tawang-winter-expedition"
          />
        </div>
        <Field className="sm:col-span-12">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input id="subtitle" name="subtitle" defaultValue={tour.subtitle ?? ""} />
        </Field>
      </Section>

      <Section title="Classification">
        <Field className="sm:col-span-4">
          <Label htmlFor="type">Type</Label>
          <select id="type" name="type" defaultValue={tour.type} className={selectClass}>
            {TOUR_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field className="sm:col-span-4">
          <Label htmlFor="difficulty">Difficulty</Label>
          <select
            id="difficulty"
            name="difficulty"
            defaultValue={tour.difficulty}
            className={selectClass}
          >
            {TOUR_DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Field>
        <Field className="sm:col-span-4">
          <Label htmlFor="regionId">Region</Label>
          <select
            id="regionId"
            name="regionId"
            defaultValue={tour.region_id ?? ""}
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
      </Section>

      <Section title="Trip numbers" hint="Days · nights · group cap — shown in the dossier facts bar.">
        <Field className="sm:col-span-3">
          <Label htmlFor="durationDays">Days</Label>
          <Input
            id="durationDays"
            name="durationDays"
            type="number"
            min="1"
            inputMode="numeric"
            defaultValue={tour.duration_days ?? ""}
            className="font-mono"
          />
          {state.fieldErrors?.durationDays ? (
            <FieldMessage>{state.fieldErrors.durationDays}</FieldMessage>
          ) : null}
        </Field>
        <Field className="sm:col-span-3">
          <Label htmlFor="nights">Nights</Label>
          <Input
            id="nights"
            name="nights"
            type="number"
            min="0"
            inputMode="numeric"
            defaultValue={tour.nights ?? ""}
            className="font-mono"
          />
        </Field>
        <Field className="sm:col-span-3">
          <Label htmlFor="maxGroupSize">Max group</Label>
          <Input
            id="maxGroupSize"
            name="maxGroupSize"
            type="number"
            min="1"
            inputMode="numeric"
            defaultValue={tour.max_group_size ?? ""}
            className="font-mono"
          />
        </Field>
        <Field className="sm:col-span-3">
          <Label htmlFor="bestTime">Best time</Label>
          <Input id="bestTime" name="bestTime" defaultValue={tour.best_time ?? ""} placeholder="Oct–Apr" />
        </Field>
      </Section>
    </>
  );
}

function PriceFallbackField({ defaultValue }: { defaultValue: number | null }) {
  const { state } = useEditorForm();
  return (
    <Field className="sm:col-span-4">
      <Label htmlFor="priceInr">Price (₹ / pax)</Label>
      <Input
        id="priceInr"
        name="priceInr"
        type="number"
        min="0"
        inputMode="numeric"
        defaultValue={defaultValue ?? ""}
        className="font-mono"
      />
      {state.fieldErrors?.priceInr ? <FieldMessage>{state.fieldErrors.priceInr}</FieldMessage> : null}
    </Field>
  );
}
