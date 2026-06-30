import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser, isAdminEmail } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const user = await getCurrentUser();
  if (user && isAdminEmail(user.email)) redirect("/admin");

  return (
    <main className="grid min-h-dvh place-items-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col gap-2 text-center">
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
            Travelspire
          </p>
          <h1 className="font-display text-3xl font-medium">Admin</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage content.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
