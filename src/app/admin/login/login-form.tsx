"use client";

import { useActionState } from "react";
import { signInAdmin, type AuthState } from "@/features/admin/auth-actions";
import { Button, Field, FieldMessage, Input, Label } from "@/components/ui";

const initialState: AuthState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signInAdmin, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Field>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </Field>
      <Field>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </Field>
      {state.error ? <FieldMessage>{state.error}</FieldMessage> : null}
      <Button type="submit" loading={pending} className="w-full">
        Sign in
      </Button>
    </form>
  );
}
