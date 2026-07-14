"use client";

import { Field, FieldMessage, Input, Label, Textarea } from "@/components/ui";
import { MediaImage } from "@/components/media/media-image";
import type { FormState } from "./db-error";
import type { AdminPlaceDetail } from "@/server/admin/places";
import { PLACE_KINDS } from "./schemas";
import { NameSlugFields } from "./ui/name-slug-fields";
import { EditorShell, TabPanel, useEditorForm } from "./ui/editor-shell";
import { Section } from "./ui/form-section";
import { PairList, type PairRow } from "./ui/pair-list";
import { MultiFieldList } from "./ui/multi-field-list";
import { PipelinePanel } from "./ui/pipeline-panel";
import { PublishButton } from "./ui/publish-button";
import { ReviewSection } from "./ui/review-page";
import { HeroUploader } from "./hero-uploader";
import { SeoFields } from "./festival-composer";

/**
 * The Place Composer — the field entry becomes editable (07-place-vertical):
 * the friend-intel field note, the story, the approach legs, the practical
 * vitals. Ground-truth flags stay pipeline-owned and visible.
 */

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;
type Option = { id: string; name: string };

const selectClass =
  "h-11 w-full rounded-sm border border-input bg-card px-3.5 text-sm text-foreground capitalize outline-none transition-colors focus-visible:border-ring";

const OWNED_BODY_KEYS = ["intro", "field_note", "story", "approach", "vitals_extra"];

function legRows(body: Record<string, unknown>): Record<string, string>[] {
  const approach = body.approach as { legs?: unknown } | undefined;
  if (!Array.isArray(approach?.legs)) return [];
  return approach.legs.map((l) => {
    const leg = l as Record<string, unknown>;
    return {
      from: String(leg.from ?? ""),
      to: String(leg.to ?? ""),
      km: leg.km != null ? String(leg.km) : "",
      time: String(leg.time ?? ""),
      note: String(leg.note ?? ""),
    };
  });
}

function vitalsRows(body: Record<string, unknown>): PairRow[] {
  const v = body.vitals_extra;
  if (!v || typeof v !== "object" || Array.isArray(v)) return [];
  return Object.entries(v as Record<string, unknown>).map(([k, val]) => ({
    a: k,
    b: String(val ?? ""),
  }));
}

export function PlaceComposer({
  place,
  regions,
  tribes,
  liveHref,
  action,
}: {
  place: AdminPlaceDetail;
  regions: Option[];
  tribes: Option[];
  liveHref?: string;
  action: Action;
}) {
  const body = (place.body ?? {}) as Record<string, unknown>;
  const approach = (body.approach ?? {}) as { from_gateway?: unknown };

  return (
    <EditorShell
      action={action}
      backHref="/admin/places"
      backLabel="Places"
      kicker={`Place · ${place.kind}`}
      title={place.name}
      slug={place.slug}
      status={place.status}
      liveHref={liveHref}
      actions={<PublishButton table="places" noun="place" id={place.id} status={place.status} />}
      tabs={[
        { id: "basics", label: "Basics" },
        { id: "entry", label: "Field entry" },
        { id: "media", label: "Media & SEO" },
      ]}
      summary={
        <>
          {place.entry_no != null ? <span>Entry Nº {place.entry_no}</span> : <span>no entry Nº</span>}
          {place.elevation_m != null ? <span>{place.elevation_m.toLocaleString("en-IN")} m</span> : null}
        </>
      }
      rail={<PipelinePanel body={place.body} ownedKeys={OWNED_BODY_KEYS} />}
    >
      <TabPanel id="basics">
        <BasicsTab place={place} regions={regions} tribes={tribes} />
      </TabPanel>

      <TabPanel id="entry">
        <Section
          title="Field note"
          hint="The friend-intel paragraph — fuel, cash, network, timing. The highest-value text on the page."
        >
          <Textarea
            id="fieldNote"
            name="fieldNote"
            rows={4}
            defaultValue={typeof body.field_note === "string" ? body.field_note : ""}
            placeholder="Gravel after Tato; carry cash — no ATM past Aalo…"
          />
        </Section>
        <Section title="The story" hint="2–3 editorial paragraphs; specific, no filler.">
          <Textarea
            id="story"
            name="story"
            rows={8}
            defaultValue={typeof body.story === "string" ? body.story : ""}
          />
        </Section>
        <Section title="The approach" hint="Gateway + legs — renders as the RouteRibbon.">
          <Field className="sm:col-span-6">
            <Label htmlFor="approachGateway">From gateway</Label>
            <Input
              id="approachGateway"
              name="approachGateway"
              defaultValue={typeof approach.from_gateway === "string" ? approach.from_gateway : ""}
              placeholder="Dibrugarh (Assam), via the Bogibeel bridge"
            />
          </Field>
          <div className="sm:col-span-12">
            <MultiFieldList
              name="approachLegs"
              addLabel="Add leg"
              fields={[
                { key: "from", label: "From", span: 2 },
                { key: "to", label: "To", span: 2 },
                { key: "km", label: "Km", span: 1, mono: true },
                { key: "time", label: "Time", span: 2, placeholder: "2.5–3 h" },
                { key: "note", label: "Road note", span: 4 },
              ]}
              defaultRows={legRows(body)}
            />
          </div>
        </Section>
        <Section title="Practical vitals" hint="ATM · fuel · network · anything a traveller must know.">
          <PairList
            name="vitalsExtra"
            defaultRows={vitalsRows(body)}
            aLabel="Label"
            bLabel="Reality"
            aPlaceholder="fuel"
            bPlaceholder="None beyond Roing — fill full + reserve"
          />
        </Section>
        <ReviewSection title="Ground-truth flags — pipeline-owned" value={body.ground_truth_flags} />
      </TabPanel>

      <TabPanel id="media">
        <Section title="Hero image">
          {place.hero ? (
            <div className="relative aspect-[16/9] w-full max-w-96 overflow-hidden rounded-md border border-border-subtle bg-muted">
              <MediaImage media={place.hero} sizes="384px" />
            </div>
          ) : null}
          <HeroUploader entity="places" id={place.id} hasHero={!!place.hero_media_id} />
        </Section>
        <Section title="SEO">
          <SeoFields seo={place.seo} />
        </Section>
        <div className="xl:hidden">
          <PipelinePanel body={place.body} ownedKeys={OWNED_BODY_KEYS} />
        </div>
      </TabPanel>
    </EditorShell>
  );
}

function BasicsTab({
  place,
  regions,
  tribes,
}: {
  place: AdminPlaceDetail;
  regions: Option[];
  tribes: Option[];
}) {
  const { state } = useEditorForm();
  return (
    <>
      <Section title="Identity">
        <div className="sm:col-span-12">
          <NameSlugFields
            sourceField="name"
            sourceLabel="Name"
            defaultSource={place.name}
            defaultSlug={place.slug}
            sourceError={state.fieldErrors?.name}
            slugError={state.fieldErrors?.slug}
            slugPlaceholder="mechuka"
          />
        </div>
        <Field className="sm:col-span-4">
          <Label htmlFor="kind">Kind</Label>
          <select id="kind" name="kind" defaultValue={place.kind} className={selectClass}>
            {PLACE_KINDS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </Field>
        <Field className="sm:col-span-4">
          <Label htmlFor="regionId">Region</Label>
          <select id="regionId" name="regionId" defaultValue={place.region_id ?? ""} className={selectClass}>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
          {state.fieldErrors?.regionId ? <FieldMessage>{state.fieldErrors.regionId}</FieldMessage> : null}
        </Field>
        <Field className="sm:col-span-4">
          <Label htmlFor="tribeId">Tribe</Label>
          <select id="tribeId" name="tribeId" defaultValue={place.tribe_id ?? ""} className={selectClass}>
            <option value="">— none —</option>
            {tribes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </Field>
      </Section>

      <Section title="Geography" hint="Coordinates drive the map pin; elevation renders in the vitals.">
        <Field className="sm:col-span-4">
          <Label htmlFor="elevation">Elevation (m)</Label>
          <Input
            id="elevation"
            name="elevation"
            type="number"
            min="0"
            inputMode="numeric"
            defaultValue={place.elevation_m ?? ""}
            className="font-mono"
          />
        </Field>
        <Field className="sm:col-span-4">
          <Label htmlFor="lat">Latitude</Label>
          <Input id="lat" name="lat" defaultValue={place.lat ?? ""} className="font-mono" />
          {state.fieldErrors?.lat ? <FieldMessage>{state.fieldErrors.lat}</FieldMessage> : null}
        </Field>
        <Field className="sm:col-span-4">
          <Label htmlFor="lng">Longitude</Label>
          <Input id="lng" name="lng" defaultValue={place.lng ?? ""} className="font-mono" />
        </Field>
      </Section>

      <Section title="Access & the exclusive layer">
        <Field className="sm:col-span-8">
          <Label htmlFor="permitNote">Permit note</Label>
          <Input
            id="permitNote"
            name="permitNote"
            defaultValue={place.permit_note ?? ""}
            placeholder="ILP; Bum La needs a DC+Army day permit…"
          />
        </Field>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:col-span-4">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              name="isSecret"
              defaultChecked={place.is_secret}
              className="size-4 accent-[var(--accent)]"
            />
            Secret spot
          </label>
          <Field>
            <Label htmlFor="exclusivityTier">Tier</Label>
            <Input
              id="exclusivityTier"
              name="exclusivityTier"
              type="number"
              min="0"
              max="2"
              inputMode="numeric"
              defaultValue={place.exclusivity_tier}
              className="w-16 font-mono"
            />
          </Field>
        </div>
      </Section>

      <Section title="Atlas intro" hint="The short paragraph on the current public place page.">
        <Textarea
          id="intro"
          name="intro"
          rows={3}
          defaultValue={typeof (place.body as Record<string, unknown> | null)?.intro === "string" ? String((place.body as Record<string, unknown>).intro) : ""}
        />
      </Section>
    </>
  );
}
