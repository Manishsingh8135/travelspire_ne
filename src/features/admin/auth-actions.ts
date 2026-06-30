"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/auth";

const SignInSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type AuthState = { error?: string };

export async function signInAdmin(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = SignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Enter a valid email and password." };
  if (!isAdminEmail(parsed.data.email)) {
    return { error: "This email is not on the admin allowlist." };
  }

  const sb = await createSupabaseServerClient();
  const { error } = await sb.auth.signInWithPassword(parsed.data);
  if (error) return { error: error.message };

  redirect("/admin");
}

export async function signOutAdmin(): Promise<void> {
  const sb = await createSupabaseServerClient();
  await sb.auth.signOut();
  redirect("/admin/login");
}
