"use client";

import * as React from "react";
import { Field, Input, Label, Textarea } from "@/components/ui";
import type { FormState } from "./db-error";
import type { AdminFestival, AdminEvent } from "@/server/admin/content";
import { NameSlugFields } from "./ui/name-slug-fields";
import { EditorShell, TabPanel, useEditorForm } from "./ui/editor-shell";
import { Section } from "./ui/form-section";
import { PairList, type PairRow } from "./ui/pair-list";
import { PipelinePanel } from "./ui/pipeline-panel";
import { PublishButton } from "./ui/publish-button";

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

const selectClass =
  "h-11 w-full rounded-sm border border-input bg-card px-3.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring";
const MONTHS = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const OWNED_BODY_KEYS = ["significance", "what_to_expect", "attend", "faqs"];

type Option = { id: string; name: string };

function expectRows(body: Record<string, unknown>): PairRow[] {
  const v = body.what_to_expect;
  if (!Array.isArray(v)) return [];
  return v.map((x) => {
    const r = x as { title?: unknown; note?: unknown };
    return { a: String(r?.title ?? ""), b: String(r?.note ?? "") };
  });
}

function faqRows(body: Record<string, unknown>): PairRow[] {
  const v = body.faqs;
  if (!Array.isArray(v)) return [];
  return v.map((x) => {
    const r = x as { q?: unknown; a?: unknown; question?: unknown; answer?: unknown };
    return { a: String(r?.q ?? r?.question ?? ""), b: String(r?.a ?? r?.answer ?? "") };
  });
}

export function FestivalComposer({
  festival,
  events,
  tribes,
  places,
  regions,
  action,
}: {
  festival: AdminFestival;
  events: AdminEvent[];
  tribes: Option[];
  places: Option[];
  regions: Option[];
  action: Action;
}) {
  const body = (festival.body ?? {}) as Record<string, unknown>;
  const rec = (festival.recurrence ?? {}) as {
    month?: number;
    typical_start_day?: number;
    duration_days?: number;
    rule_note?: string;
  };
  const attend = (body.attend ?? {}) as Record<string, unknown>;

  return (
    <EditorShell
      action={action}
      backHref="/admin/festivals"
      backLabel="Festivals"
      kicker="Festival · evergreen"
      title={festival.name}
      slug={festival.slug}
      status={festival.status}
      actions={
        <PublishButton table="festivals" noun="festival" id={festival.id} status={festival.status} />
      }
      tabs={[
        { id: "identity", label: "Identity" },
        { id: "story", label: "Story" },
        { id: "time", label: "Time & editions" },
        { id: "seo", label: "SEO" },
      ]}
      summary={
        <>
          <span>{rec.month ? MONTHS[rec.month] : "no month"}</span>
          <span>{events.length} edition{events.length === 1 ? "" : "s"}</span>
        </>
      }
      rail={<PipelinePanel body={festival.body} ownedKeys={OWNED_BODY_KEYS} />}
    >
      <TabPanel id="identity">
        <IdentityTab festival={festival} tribes={tribes} places={places} regions={regions} />
      </TabPanel>

      <TabPanel id="story">
        <Section title="Significance" hint="What the festival means — the page's editorial heart.">
          <Textarea
            id="significance"
            name="significance"
            rows={6}
            defaultValue={typeof body.significance === "string" ? body.significance : ""}
          />
        </Section>
        <Section title="What to expect" hint="3–4 sensory blocks — title + one-line note.">
          <PairList
            name="whatToExpect"
            defaultRows={expectRows(body)}
            aLabel="Title"
            bLabel="Note"
            aPlaceholder="The torma burning"
            bPlaceholder="Monks carry the torma out and cast it into fire…"
            bTextarea
          />
        </Section>
        <Section title="FAQs" hint="Question → answer; rendered as FAQ accordion + FAQPage schema.">
          <PairList
            name="faqs"
            defaultRows={faqRows(body)}
            aLabel="Question"
            bLabel="Answer"
            bTextarea
          />
        </Section>
      </TabPanel>

      <TabPanel id="time">
        <Section title="Recurrence" hint="Movable dates stay honest — the countdown handles the rest.">
          <Field className="sm:col-span-3">
            <Label htmlFor="month">Month</Label>
            <select id="month" name="month" defaultValue={rec.month ?? ""} className={selectClass}>
              <option value="">—</option>
              {MONTHS.slice(1).map((m, i) => (
                <option key={m} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
          </Field>
          <Field className="sm:col-span-3">
            <Label htmlFor="typicalStartDay">Typical start day</Label>
            <Input
              id="typicalStartDay"
              name="typicalStartDay"
              type="number"
              min="1"
              max="31"
              inputMode="numeric"
              defaultValue={rec.typical_start_day ?? ""}
              className="font-mono"
            />
          </Field>
          <Field className="sm:col-span-3">
            <Label htmlFor="durationDays">Duration (days)</Label>
            <Input
              id="durationDays"
              name="durationDays"
              type="number"
              min="1"
              max="30"
              inputMode="numeric"
              defaultValue={rec.duration_days ?? ""}
              className="font-mono"
            />
          </Field>
          <Field className="sm:col-span-12">
            <Label htmlFor="ruleNote">Rule note</Label>
            <Input
              id="ruleNote"
              name="ruleNote"
              defaultValue={rec.rule_note ?? ""}
              placeholder="Days 28–30 of the 11th Tibetan month — mid/late January, movable"
            />
          </Field>
        </Section>
        <Section
          title="Editions"
          hint="Dated instances powering countdowns and /calendar. Managed by the pipeline for now."
        >
          {events.length ? (
            <ul className="flex flex-col gap-1.5">
              {events.map((e) => (
                <li
                  key={e.id}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-border-subtle px-3 py-2"
                >
                  <span className="text-sm font-medium text-foreground">{e.label ?? e.starts_on}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {e.starts_on} → {e.ends_on ?? e.starts_on}
                  </span>
                  <span className="ml-auto font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                    {e.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No editions yet.</p>
          )}
        </Section>
      </TabPanel>

      <TabPanel id="seo">
        <Section title="Attend" hint="Where it happens + honesty notes — renders on the festival page.">
          <Field className="sm:col-span-6">
            <Label htmlFor="attendWhere">Where</Label>
            <Input
              id="attendWhere"
              name="attendWhere"
              defaultValue={typeof attend.where === "string" ? attend.where : ""}
            />
          </Field>
          <Field className="sm:col-span-6">
            <Label htmlFor="attendWhenNote">When note</Label>
            <Input
              id="attendWhenNote"
              name="attendWhenNote"
              defaultValue={typeof attend.when_note === "string" ? attend.when_note : ""}
            />
          </Field>
          <Field className="sm:col-span-12">
            <Label htmlFor="attendScarcity">Scarcity honesty</Label>
            <Input
              id="attendScarcity"
              name="attendScarcity"
              defaultValue={typeof attend.scarcity_note === "string" ? attend.scarcity_note : ""}
              placeholder="Kisama-area stays sell out by October"
            />
          </Field>
        </Section>
        <Section title="SEO">
          <SeoFields seo={festival.seo} />
        </Section>
        <div className="xl:hidden">
          <PipelinePanel body={festival.body} ownedKeys={OWNED_BODY_KEYS} />
        </div>
      </TabPanel>
    </EditorShell>
  );
}

function IdentityTab({
  festival,
  tribes,
  places,
  regions,
}: {
  festival: AdminFestival;
  tribes: Option[];
  places: Option[];
  regions: Option[];
}) {
  const { state } = useEditorForm();
  return (
    <Section title="Identity">
      <div className="sm:col-span-12">
        <NameSlugFields
          sourceField="name"
          sourceLabel="Name"
          defaultSource={festival.name}
          defaultSlug={festival.slug}
          sourceError={state.fieldErrors?.name}
          slugError={state.fieldErrors?.slug}
          slugPlaceholder="hornbill"
        />
      </div>
      <Field className="sm:col-span-4">
        <Label htmlFor="tribeId">Tribe</Label>
        <select id="tribeId" name="tribeId" defaultValue={festival.tribe_id ?? ""} className={selectClass}>
          <option value="">— none —</option>
          {tribes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </Field>
      <Field className="sm:col-span-4">
        <Label htmlFor="placeId">Place</Label>
        <select id="placeId" name="placeId" defaultValue={festival.place_id ?? ""} className={selectClass}>
          <option value="">— none —</option>
          {places.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </Field>
      <Field className="sm:col-span-4">
        <Label htmlFor="regionId">Region</Label>
        <select id="regionId" name="regionId" defaultValue={festival.region_id ?? ""} className={selectClass}>
          <option value="">— none —</option>
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </Field>
    </Section>
  );
}

export function SeoFields({ seo }: { seo: unknown }) {
  const s = (seo ?? {}) as { title?: string; description?: string };
  return (
    <>
      <Field className="sm:col-span-6">
        <Label htmlFor="seoTitle">SEO title</Label>
        <Input id="seoTitle" name="seoTitle" defaultValue={s.title ?? ""} placeholder="Defaults to the name" />
      </Field>
      <Field className="sm:col-span-6">
        <Label htmlFor="seoDescription">SEO description</Label>
        <Textarea id="seoDescription" name="seoDescription" rows={3} defaultValue={s.description ?? ""} />
      </Field>
    </>
  );
}
