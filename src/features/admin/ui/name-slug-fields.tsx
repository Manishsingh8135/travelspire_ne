"use client";

import * as React from "react";
import { Field, FieldMessage, Input, Label } from "@/components/ui";
import { slugify } from "./slugify";

/**
 * Name/Title + Slug pair. The slug auto-derives from the source field until the
 * user edits it (or when editing an entity that already has a slug), then it
 * stays put. Normalizes to a valid slug on blur.
 */
export function NameSlugFields({
  sourceField = "name",
  sourceLabel = "Name",
  defaultSource = "",
  defaultSlug = "",
  sourceError,
  slugError,
  slugPlaceholder,
}: {
  sourceField?: string;
  sourceLabel?: string;
  defaultSource?: string;
  defaultSlug?: string;
  sourceError?: string;
  slugError?: string;
  slugPlaceholder?: string;
}) {
  const [source, setSource] = React.useState(defaultSource);
  const [slug, setSlug] = React.useState(defaultSlug);
  const [locked, setLocked] = React.useState(Boolean(defaultSlug));

  return (
    <>
      <Field>
        <Label htmlFor={sourceField}>{sourceLabel}</Label>
        <Input
          id={sourceField}
          name={sourceField}
          value={source}
          onChange={(e) => {
            const v = e.target.value;
            setSource(v);
            if (!locked) setSlug(slugify(v));
          }}
          required
        />
        {sourceError ? <FieldMessage>{sourceError}</FieldMessage> : null}
      </Field>

      <Field>
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="slug">Slug</Label>
          <span className="truncate font-mono text-xs text-muted-foreground">
            /{slug || "…"}
          </span>
        </div>
        <Input
          id="slug"
          name="slug"
          value={slug}
          placeholder={slugPlaceholder}
          onChange={(e) => {
            setLocked(true);
            setSlug(e.target.value);
          }}
          onBlur={(e) => setSlug(slugify(e.target.value))}
          required
        />
        {slugError ? <FieldMessage>{slugError}</FieldMessage> : null}
      </Field>
    </>
  );
}
