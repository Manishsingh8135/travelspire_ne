"use client";

import { Field, Input, Label } from "@/components/ui";
import type { FormState } from "./db-error";
import type { AdminPermit } from "@/server/admin/content";
import { PERMIT_TYPES } from "./schemas";
import { NameSlugFields } from "./ui/name-slug-fields";
import { EditorShell, TabPanel, useEditorForm } from "./ui/editor-shell";
import { Section } from "./ui/form-section";
import { PairList, type PairRow } from "./ui/pair-list";
import { PublishButton } from "./ui/publish-button";
import { ReviewSection } from "./ui/review-page";
import { SeoFields } from "./festival-composer";

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

const selectClass =
  "h-11 w-full rounded-sm border border-input bg-card px-3.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring";

function feeRows(fee: unknown): PairRow[] {
  if (!fee || typeof fee !== "object" || Array.isArray(fee)) return [];
  return Object.entries(fee as Record<string, unknown>).map(([k, v]) => ({
    a: k,
    b: String(v ?? ""),
  }));
}

function faqRows(faqs: unknown): PairRow[] {
  if (!Array.isArray(faqs)) return [];
  return faqs.map((x) => {
    const r = x as { question?: unknown; answer?: unknown };
    return { a: String(r?.question ?? ""), b: String(r?.answer ?? "") };
  });
}

export function PermitComposer({ permit, action }: { permit: AdminPermit; action: Action }) {
  const body = (permit.body ?? {}) as Record<string, unknown>;

  return (
    <EditorShell
      action={action}
      backHref="/admin/permits"
      backLabel="Permit guides"
      kicker={`Permit · ${permit.permit_type}`}
      title={permit.name}
      slug={permit.slug}
      status={permit.status}
      actions={
        <PublishButton
          table="permit_zones"
          noun="permit guide"
          id={permit.id}
          status={permit.status}
        />
      }
      tabs={[
        { id: "basics", label: "Basics" },
        { id: "fees", label: "Fees & FAQs" },
        { id: "guide", label: "Guide content" },
        { id: "seo", label: "SEO" },
      ]}
      summary={
        <>
          <span>{permit.permit_type}</span>
          <span>
            {permit.last_verified_at
              ? `verified ${new Date(permit.last_verified_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}`
              : "never verified"}
          </span>
        </>
      }
    >
      <TabPanel id="basics">
        <BasicsTab permit={permit} />
      </TabPanel>

      <TabPanel id="fees">
        <Section title="Fees" hint="Label → value rows; renders as the PermitSlip's fee table.">
          <PairList
            name="fee"
            defaultRows={feeRows(permit.fee)}
            aLabel="Label"
            bLabel="Value"
            aPlaceholder="tourist_upto_3_days"
            bPlaceholder="₹300"
          />
        </Section>
        <Section title="FAQs">
          <PairList
            name="faqs"
            defaultRows={faqRows(permit.faqs)}
            aLabel="Question"
            bLabel="Answer"
            bTextarea
          />
        </Section>
      </TabPanel>

      <TabPanel id="guide">
        <p className="rounded-md border border-border-subtle bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
          Structured guide content (who-needs, entry points, application steps, documents) is
          pipeline-managed — it gets its dedicated composer with the permits page build. Saves here
          never touch it.
        </p>
        <ReviewSection title="2026 corrections — review before publish" value={body.corrections_2026} />
        <ReviewSection title="Who needs it" value={body.whoNeeds} />
        <ReviewSection title="Entry points" value={body.entryPoints} />
        <ReviewSection title="Application steps" value={body.applicationSteps} />
        <ReviewSection title="Documents" value={body.documents} />
      </TabPanel>

      <TabPanel id="seo">
        <Section title="SEO">
          <SeoFields seo={permit.seo} />
        </Section>
      </TabPanel>
    </EditorShell>
  );
}

function BasicsTab({ permit }: { permit: AdminPermit }) {
  const { state } = useEditorForm();
  return (
    <>
      <Section title="Identity">
        <div className="sm:col-span-12">
          <NameSlugFields
            sourceField="name"
            sourceLabel="Name"
            defaultSource={permit.name}
            defaultSlug={permit.slug}
            sourceError={state.fieldErrors?.name}
            slugError={state.fieldErrors?.slug}
            slugPlaceholder="arunachal-pradesh-ilp"
          />
        </div>
        <Field className="sm:col-span-4">
          <Label htmlFor="permitType">Permit type</Label>
          <select
            id="permitType"
            name="permitType"
            defaultValue={permit.permit_type}
            className={selectClass}
          >
            {PERMIT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field className="sm:col-span-4">
          <Label htmlFor="lastVerified">Last verified</Label>
          <Input
            id="lastVerified"
            name="lastVerified"
            type="date"
            defaultValue={permit.last_verified_at ? permit.last_verified_at.slice(0, 10) : ""}
            className="font-mono"
          />
        </Field>
      </Section>

      <Section title="The document rows" hint="Portal, helpline, processing, validity — the PermitSlip facts.">
        <Field className="sm:col-span-6">
          <Label htmlFor="officialPortal">Official portal</Label>
          <Input
            id="officialPortal"
            name="officialPortal"
            defaultValue={permit.official_portal ?? ""}
            placeholder="https://eilp.arunachal.gov.in"
            className="font-mono text-xs"
          />
        </Field>
        <Field className="sm:col-span-6">
          <Label htmlFor="helpline">Helpline</Label>
          <Input id="helpline" name="helpline" defaultValue={permit.helpline ?? ""} className="font-mono" />
        </Field>
        <Field className="sm:col-span-6">
          <Label htmlFor="processingTime">Processing time</Label>
          <Input
            id="processingTime"
            name="processingTime"
            defaultValue={permit.processing_time ?? ""}
          />
        </Field>
        <Field className="sm:col-span-6">
          <Label htmlFor="validity">Validity</Label>
          <Input id="validity" name="validity" defaultValue={permit.validity ?? ""} />
        </Field>
        <div className="flex flex-wrap gap-x-6 gap-y-2 sm:col-span-12">
          {(
            [
              ["indiansAllowed", "Indians allowed", permit.indians_allowed],
              ["foreignersAllowed", "Foreigners allowed", permit.foreigners_allowed],
              ["onArrival", "Available on arrival", permit.on_arrival],
            ] as const
          ).map(([name, label, checked]) => (
            <label key={name} className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                name={name}
                defaultChecked={checked}
                className="size-4 accent-[var(--accent)]"
              />
              {label}
            </label>
          ))}
        </div>
      </Section>
    </>
  );
}
