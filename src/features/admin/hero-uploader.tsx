"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { uploadHeroImage, type HeroEntity, type UploadState } from "./media-actions";
import { Button, Field, FieldMessage, Input, Label } from "@/components/ui";

/**
 * Form-less hero uploader — it lives INSIDE the composer's <form>, so it must
 * not render a nested <form> (invalid HTML → hydration error). The action is
 * invoked directly from the click handler; inputs are nameless so the image
 * never rides along in the composer's own Save submission.
 */
export function HeroUploader({
  entity,
  id,
  hasHero,
}: {
  entity: HeroEntity;
  id: string;
  hasHero?: boolean;
}) {
  const router = useRouter();
  const fileRef = React.useRef<HTMLInputElement>(null);
  const altRef = React.useRef<HTMLInputElement>(null);
  const [state, setState] = React.useState<UploadState>({});
  const [pending, startTransition] = React.useTransition();

  const upload = () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setState({ error: "Choose an image." });
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("alt", altRef.current?.value ?? "");
    startTransition(async () => {
      const result = await uploadHeroImage(entity, id, {}, formData);
      setState(result);
      if (result.ok) {
        toast.success("Hero image uploaded");
        if (fileRef.current) fileRef.current.value = "";
        router.refresh();
      }
    });
  };

  return (
    <div className="flex max-w-md flex-col gap-4">
      <Field>
        <Label htmlFor={`hero-file-${id}`}>{hasHero ? "Replace hero image" : "Hero image"}</Label>
        {/* Nameless on purpose — must not submit with the surrounding editor form. */}
        <input
          id={`hero-file-${id}`}
          ref={fileRef}
          type="file"
          accept="image/*"
          className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-sm file:border file:border-border file:bg-card file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-foreground hover:file:bg-muted"
        />
      </Field>
      <Field>
        <Label htmlFor={`hero-alt-${id}`}>Alt text</Label>
        <Input
          id={`hero-alt-${id}`}
          ref={altRef}
          placeholder="Describe the image (SEO + accessibility)"
          onKeyDown={(e) => {
            // Enter here should upload, not save the whole editor.
            if (e.key === "Enter") {
              e.preventDefault();
              upload();
            }
          }}
        />
      </Field>
      {state.error ? <FieldMessage>{state.error}</FieldMessage> : null}
      <Button type="button" variant="outline" loading={pending} className="w-fit" onClick={upload}>
        Upload
      </Button>
    </div>
  );
}
