"use client";

import { Textarea, Field, Label } from "@/components/ui";
import type { FormState } from "./db-error";
import type { AdminTribe } from "@/server/admin/content";
import { NameSlugFields } from "./ui/name-slug-fields";
import { EditorShell, TabPanel, useEditorForm } from "./ui/editor-shell";
import { Section } from "./ui/form-section";
import { PipelinePanel } from "./ui/pipeline-panel";
import { PublishButton } from "./ui/publish-button";
import { SeoFields } from "./festival-composer";

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

export function TribeComposer({ tribe, action }: { tribe: AdminTribe; action: Action }) {
  const body = (tribe.body ?? {}) as Record<string, unknown>;

  return (
    <EditorShell
      action={action}
      backHref="/admin/tribes"
      backLabel="Tribes"
      kicker="Tribe · culture layer"
      title={tribe.name}
      slug={tribe.slug}
      status={tribe.status}
      actions={<PublishButton table="tribes" noun="tribe" id={tribe.id} status={tribe.status} />}
      tabs={[
        { id: "basics", label: "Basics" },
        { id: "seo", label: "SEO" },
      ]}
      rail={<PipelinePanel body={tribe.body} ownedKeys={["who"]} />}
    >
      <TabPanel id="basics">
        <BasicsTab tribe={tribe} body={body} />
      </TabPanel>
      <TabPanel id="seo">
        <Section title="SEO">
          <SeoFields seo={tribe.seo} />
        </Section>
        <div className="xl:hidden">
          <PipelinePanel body={tribe.body} ownedKeys={["who"]} />
        </div>
      </TabPanel>
    </EditorShell>
  );
}

function BasicsTab({ tribe, body }: { tribe: AdminTribe; body: Record<string, unknown> }) {
  const { state } = useEditorForm();
  return (
    <Section title="Identity">
      <div className="sm:col-span-12">
        <NameSlugFields
          sourceField="name"
          sourceLabel="Name"
          defaultSource={tribe.name}
          defaultSlug={tribe.slug}
          sourceError={state.fieldErrors?.name}
          slugError={state.fieldErrors?.slug}
          slugPlaceholder="apatani"
        />
      </div>
      <Field className="sm:col-span-12">
        <Label htmlFor="who">Who — the one-paragraph bio</Label>
        <Textarea
          id="who"
          name="who"
          rows={5}
          defaultValue={typeof body.who === "string" ? body.who : ""}
          placeholder="The valley people of Ziro, famous for wet-rice fields that double as fish ponds…"
        />
      </Field>
    </Section>
  );
}
