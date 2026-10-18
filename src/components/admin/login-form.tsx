"use client";

import { useState, type FormEvent } from "react";
import { Button, Field, Input } from "@/components/ds";
import { IconSpinner } from "@/components/icons";
import { cn } from "@/lib/utils";

export function AdminLoginForm({ expired, className }: { expired: boolean; className?: string }) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(expired ? "That link has expired. Ask for a new one." : "");
  const [sent, setSent] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSending(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = (await response.json().catch(() => ({}))) as { message?: string; error?: string };
      setSent(response.ok);
      setMessage(body.message ?? body.error ?? "Something went wrong. Try again.");
    } catch {
      setMessage("No connection. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} className={cn("space-y-5", className)}>
      <Field label="Team email" htmlFor="admin-email">
        <Input id="admin-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>
      <Button type="submit" disabled={sending || !email}>
        {sending ? <IconSpinner className="animate-spin" /> : null}
        Email me a sign-in link
      </Button>
      {message ? (
        <p role="status" className={cn("text-small", sent ? "text-fg" : "text-fg-muted")}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
