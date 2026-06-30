"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { FormState } from "./db-error";
import { Button, Field, FieldMessage, Input, Label, Textarea } from "@/components/ui";
import { readString } from "@/lib/json";
import type { Region } from "@/lib/supabase/types";

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

const selectClass =
  "h-11 w-full rounded-sm border border-input bg-card px-3.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring";

export function RegionForm({
  action,
  region,
  submitLabel,
}: {
  action: Action;
  region?: Region;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <Field>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={region?.name ?? ""} required />
        {state.fieldErrors?.name ? <FieldMessage>{state.fieldErrors.name}</FieldMessage> : null}
      </Field>

      <Field>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          defaultValue={region?.slug ?? ""}
          placeholder="arunachal-pradesh"
          required
        />
        {state.fieldErrors?.slug ? (
          <FieldMessage>{state.fieldErrors.slug}</FieldMessage>
        ) : null}
      </Field>

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
