"use client";

import { useActionState } from "react";
import { uploadHeroImage, type HeroEntity, type UploadState } from "./media-actions";
import { Button, Field, FieldMessage, Input, Label } from "@/components/ui";

export function HeroUploader({
  entity,
  id,
  hasHero,
}: {
  entity: HeroEntity;
  id: string;
  hasHero?: boolean;
}) {
  const action = uploadHeroImage.bind(null, entity, id);
  const [state, formAction, pending] = useActionState<UploadState, FormData>(action, {});

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4">
      <Field>
        <Label htmlFor="file">{hasHero ? "Replace hero image" : "Hero image"}</Label>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          required
          className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-sm file:border file:border-border file:bg-card file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-foreground hover:file:bg-muted"
        />
      </Field>
      <Field>
        <Label htmlFor="alt">Alt text</Label>
        <Input id="alt" name="alt" placeholder="Describe the image (SEO + accessibility)" />
      </Field>
      {state.error ? <FieldMessage>{state.error}</FieldMessage> : null}
      {state.ok ? <p className="text-sm font-medium text-success">Uploaded ✓</p> : null}
      <Button type="submit" variant="outline" loading={pending} className="w-fit">
        Upload
      </Button>
    </form>
  );
}
