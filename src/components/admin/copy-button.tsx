"use client";

import { useState } from "react";
import { Button } from "@/components/ds";
import { IconCheck, IconCopy } from "@/components/icons";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          window.prompt("Copy this link:", value);
        }
      }}
    >
      {copied ? <IconCheck /> : <IconCopy />}
      {copied ? "Copied" : label}
    </Button>
  );
}
