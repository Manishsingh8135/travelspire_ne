"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { FormState } from "./db-error";
import { Button, Field, FieldMessage, Input, Label, Textarea } from "@/components/ui";
import { NameSlugFields } from "./ui/name-slug-fields";
import { readString } from "@/lib/json";
import type { Region } from "@/lib/supabase/types";

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

const selectClass =
  "h-11 w-full rounded-sm border border-input bg-card px-3.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring";

export function RegionForm({
  action,
  region,
  regions = [],
  submitLabel,
}: {
  action: Action;
  region?: Region;
  /** Candidate parents (all regions); the current region is filtered out. */
  regions?: { id: string; name: string }[];
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});
  const parentOptions = regions.filter((r) => r.id !== region?.id);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <NameSlugFields
        sourceField="name"
        sourceLabel="Name"
        defaultSource={region?.name ?? ""}
        defaultSlug={region?.slug ?? ""}
        sourceError={state.fieldErrors?.name}
        slugError={state.fieldErrors?.slug}
        slugPlaceholder="arunachal-pradesh"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <Label htmlFor="level">Level</Label>
          <select
            id="level"
            name="level"
            defaultValue={region?.level ?? "state"}
            className={selectClass}
          >
            <option value="state">State</option>
            <option value="district">District</option>
            <option value="valley">Valley</option>
          </select>
        </Field>

        <Field>
          <Label htmlFor="parentId">Parent region</Label>
          <select
            id="parentId"
            name="parentId"
            defaultValue={region?.parent_id ?? ""}
            className={selectClass}
          >
            <option value="">— none (top level) —</option>
            {parentOptions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field>
        <Label htmlFor="intro">Intro</Label>
        <Textarea
          id="intro"
          name="intro"
          defaultValue={readString(region?.body, "intro") ?? ""}
          placeholder="A short, evocative introduction…"
        />
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
            defaultValue={readString(region?.seo, "title") ?? ""}
            placeholder="Defaults to the name"
          />
        </Field>
        <Field>
          <Label htmlFor="seoDescription">SEO description</Label>
          <Textarea
            id="seoDescription"
            name="seoDescription"
            defaultValue={readString(region?.seo, "description") ?? ""}
          />
        </Field>
      </fieldset>

      {state.error ? <FieldMessage>{state.error}</FieldMessage> : null}

      <div className="flex items-center gap-3">
        <Button type="submit" loading={pending}>
          {submitLabel}
        </Button>
        <Button type="button" variant="ghost" asChild>
          <Link href="/admin/regions">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
