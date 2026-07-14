"use client";

import { Field, Input, Label, Textarea } from "@/components/ui";
import { MediaImage } from "@/components/media/media-image";
import type { FormState } from "./db-error";
import type { AdminRegionDetail } from "@/server/admin/regions";
import { REGION_LEVELS } from "./schemas";
import { NameSlugFields } from "./ui/name-slug-fields";
import { EditorShell, TabPanel, useEditorForm } from "./ui/editor-shell";
import { Section } from "./ui/form-section";
import { PairList, type PairRow } from "./ui/pair-list";
import { MultiFieldList } from "./ui/multi-field-list";
import { TokenInput } from "./ui/token-input";
import { SeasonEditor } from "./ui/season-editor";
import { PipelinePanel } from "./ui/pipeline-panel";
import { PublishButton } from "./ui/publish-button";
import { HeroUploader } from "./hero-uploader";
import { SeoFields } from "./festival-composer";

/**
 * The Region Composer — the state hub's content becomes editable
 * (06-state-hub-vertical §1 body contract): soul line, vitals, answers,
 * signature moments, getting-there, the 12-month season band, FAQs.
 */

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;
type Option = { id: string; name: string };

const selectClass =
  "h-11 w-full rounded-sm border border-input bg-card px-3.5 text-sm text-foreground capitalize outline-none transition-colors focus-visible:border-ring";

const OWNED_BODY_KEYS = [
  "intro",
  "soul_line",
  "vitals",
  "answers",
  "signature_moments",
  "getting_there",
  "season",
  "faqs",
];

function pairRowsFrom(v: unknown, aKey: string, bKey: string): PairRow[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => {
    const r = x as Record<string, unknown>;
    return { a: String(r?.[aKey] ?? ""), b: String(r?.[bKey] ?? "") };
  });
}

function recordRowsFrom(v: unknown, keys: string[]): Record<string, string>[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => {
    const r = x as Record<string, unknown>;
    return Object.fromEntries(keys.map((k) => [k, String(r?.[k] ?? "")]));
  });
}

export function RegionComposer({
  region,
  regions,
  action,
}: {
  region: AdminRegionDetail;
  regions: Option[];
  action: Action;
}) {
  const body = (region.body ?? {}) as Record<string, unknown>;
  const vitals = (body.vitals ?? {}) as Record<string, unknown>;
  const gettingThere = (body.getting_there ?? {}) as Record<string, unknown>;
  const season = (body.season ?? {}) as Record<string, unknown>;
  const gatewayCities = Array.isArray(vitals.gateway_cities)
    ? (vitals.gateway_cities as unknown[]).map(String)
    : [];

  return (
    <EditorShell
      action={action}
      backHref="/admin/regions"
      backLabel="Regions"
      kicker={`Region · ${region.level}`}
      title={region.name}
      slug={region.slug}
      status={region.status}
      liveHref={`/${region.slug}`}
      actions={<PublishButton table="regions" noun="region" id={region.id} status={region.status} />}
      tabs={[
        { id: "basics", label: "Basics" },
        { id: "hub", label: "Hub content" },
        { id: "season", label: "Season" },
        { id: "media", label: "Media & SEO" },
      ]}
      summary={
        <>
          <span>{region.level}</span>
          {typeof body.soul_line === "string" ? <span>hub authored</span> : <span>hub empty</span>}
        </>
      }
      rail={<PipelinePanel body={region.body} ownedKeys={OWNED_BODY_KEYS} />}
    >
      <TabPanel id="basics">
        <BasicsTab region={region} regions={regions} />
      </TabPanel>

      <TabPanel id="hub">
        <Section title="Soul line" hint="One sentence — the cover line under the state name.">
          <Input
            id="soulLine"
            name="soulLine"
            defaultValue={typeof body.soul_line === "string" ? body.soul_line : ""}
            placeholder="Where India’s day begins."
          />
        </Section>
        <Section title="Vitals strip" hint="The mono facts bar — computed counts are added automatically.">
          <Field className="sm:col-span-4">
            <Label htmlFor="vitalsCapital">Capital</Label>
            <Input id="vitalsCapital" name="vitalsCapital" defaultValue={String(vitals.capital ?? "")} />
          </Field>
          <Field className="sm:col-span-4">
            <Label htmlFor="vitalsPermit">Permit chip</Label>
            <Input id="vitalsPermit" name="vitalsPermit" defaultValue={String(vitals.permit_chip ?? "")} placeholder="ILP" className="font-mono" />
          </Field>
          <Field className="sm:col-span-4">
            <Label htmlFor="vitalsBestWindow">Best window</Label>
            <Input id="vitalsBestWindow" name="vitalsBestWindow" defaultValue={String(vitals.best_window ?? "")} placeholder="Oct–Nov · Mar–Apr" className="font-mono" />
          </Field>
          <Field className="sm:col-span-4">
            <Label htmlFor="vitalsElevation">Elevation range</Label>
            <Input id="vitalsElevation" name="vitalsElevation" defaultValue={String(vitals.elevation_range ?? "")} placeholder="~100 m – 7,042 m" className="font-mono" />
          </Field>
          <Field className="sm:col-span-4">
            <Label htmlFor="vitalsTribes">Tribes line</Label>
            <Input id="vitalsTribes" name="vitalsTribes" defaultValue={String(vitals.tribes ?? "")} placeholder="26 major tribes · 100+ sub-tribes" />
          </Field>
          <Field className="sm:col-span-4">
            <Label>Gateway cities</Label>
            <TokenInput
              name="gatewayCities"
              defaultTokens={gatewayCities}
              placeholder="Guwahati, Dibrugarh…"
            />
          </Field>
        </Section>
        <Section title="Answer block" hint="The extractable Q→A rows — FAQPage schema + AI-Overview bait.">
          <PairList
            name="answers"
            defaultRows={pairRowsFrom(body.answers, "q", "a")}
            aLabel="Question"
            bLabel="Answer (≤40 words)"
            bTextarea
          />
        </Section>
        <Section title="Signature moments" hint="3–4 cinematic why-this-state blocks (photos attach later).">
          <PairList
            name="signatureMoments"
            defaultRows={pairRowsFrom(body.signature_moments, "title", "prose")}
            aLabel="Title"
            bLabel="Prose"
            bTextarea
          />
        </Section>
        <Section title="Getting there">
          <div className="sm:col-span-12">
            <p className="mb-2 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">Airports</p>
            <MultiFieldList
              name="airports"
              addLabel="Add airport"
              fields={[
                { key: "name", label: "Airport", span: 4 },
                { key: "note", label: "Note", span: 7 },
              ]}
              defaultRows={recordRowsFrom(gettingThere.airports, ["name", "note"])}
            />
          </div>
          <div className="sm:col-span-12">
            <p className="mb-2 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">Railheads</p>
            <MultiFieldList
              name="railheads"
              addLabel="Add railhead"
              fields={[
                { key: "name", label: "Railhead", span: 4 },
                { key: "note", label: "Note", span: 7 },
              ]}
              defaultRows={recordRowsFrom(gettingThere.railheads, ["name", "note"])}
            />
          </div>
          <div className="sm:col-span-12">
            <p className="mb-2 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">Road gates</p>
            <MultiFieldList
              name="roadGates"
              addLabel="Add gate"
              fields={[
                { key: "gate", label: "Gate", span: 3 },
                { key: "from", label: "From", span: 4 },
                { key: "opens", label: "Opens", span: 4 },
              ]}
              defaultRows={recordRowsFrom(gettingThere.road_gates, ["gate", "from", "opens"])}
            />
          </div>
          <Field className="sm:col-span-12">
            <Label htmlFor="gettingThereNote">Note</Label>
            <Input
              id="gettingThereNote"
              name="gettingThereNote"
              defaultValue={String(gettingThere.note ?? "")}
              placeholder="Your permit is checked at every gate — keep the eILP PDF offline."
            />
          </Field>
        </Section>
        <Section title="FAQs">
          <PairList
            name="faqs"
            defaultRows={pairRowsFrom(body.faqs, "q", "a")}
            aLabel="Question"
            bLabel="Answer"
            bTextarea
          />
        </Section>
      </TabPanel>

      <TabPanel id="season">
        <Section title="The 12-month band" hint="Weather glyph · road risk · one honest line per month.">
          <SeasonEditor name="season" defaultValue={season.months} />
        </Section>
        <Section title="Season notes">
          <Field className="sm:col-span-6">
            <Label htmlFor="seasonBestWindow">Best window</Label>
            <Input
              id="seasonBestWindow"
              name="seasonBestWindow"
              defaultValue={String(season.best_window ?? "")}
              className="font-mono"
            />
          </Field>
          <Field className="sm:col-span-12">
            <Label htmlFor="seasonMonsoonNote">Monsoon honesty</Label>
            <Textarea
              id="seasonMonsoonNote"
              name="seasonMonsoonNote"
              rows={2}
              defaultValue={String(season.monsoon_note ?? "")}
            />
          </Field>
        </Section>
      </TabPanel>

      <TabPanel id="media">
        <Section title="Hero image">
          {region.hero ? (
            <div className="relative aspect-[16/9] w-full max-w-96 overflow-hidden rounded-md border border-border-subtle bg-muted">
              <MediaImage media={region.hero} sizes="384px" />
            </div>
          ) : null}
          <HeroUploader entity="regions" id={region.id} hasHero={!!region.hero_media_id} />
        </Section>
        <Section title="SEO">
          <SeoFields seo={region.seo} />
        </Section>
        <div className="xl:hidden">
          <PipelinePanel body={region.body} ownedKeys={OWNED_BODY_KEYS} />
        </div>
      </TabPanel>
    </EditorShell>
  );
}

function BasicsTab({ region, regions }: { region: AdminRegionDetail; regions: Option[] }) {
  const { state } = useEditorForm();
  return (
    <>
      <Section title="Identity">
        <div className="sm:col-span-12">
          <NameSlugFields
            sourceField="name"
            sourceLabel="Name"
            defaultSource={region.name}
            defaultSlug={region.slug}
            sourceError={state.fieldErrors?.name}
            slugError={state.fieldErrors?.slug}
            slugPlaceholder="arunachal-pradesh"
          />
        </div>
        <Field className="sm:col-span-4">
          <Label htmlFor="level">Level</Label>
          <select id="level" name="level" defaultValue={region.level} className={selectClass}>
            {REGION_LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Field>
        <Field className="sm:col-span-8">
          <Label htmlFor="parentId">Parent region</Label>
          <select
            id="parentId"
            name="parentId"
            defaultValue={region.parent_id ?? ""}
            className={selectClass}
          >
            <option value="">— none —</option>
            {regions
              .filter((r) => r.id !== region.id)
              .map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
          </select>
        </Field>
      </Section>
      <Section title="Intro" hint="The short paragraph on the current public region page.">
        <Textarea
          id="intro"
          name="intro"
          rows={3}
          defaultValue={
            typeof (region.body as Record<string, unknown> | null)?.intro === "string"
              ? String((region.body as Record<string, unknown>).intro)
              : ""
          }
        />
      </Section>
    </>
  );
}
