import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEFAULT_INTERNAL_RECIPIENTS } from "@/lib/email/resend";
import { signEmailToken, verifyEmailToken } from "@/lib/bookings/signing";

// The team signs in with a link sent to their inbox; there are no passwords.
// Who may sign in is ADMIN_EMAILS (comma-separated), falling back to the
// inboxes that already receive PAID booking emails (PAYMENT_NOTIFICATION_EMAILS).

export const ADMIN_COOKIE = "tsne_admin";
export const SESSION_SECONDS = 7 * 24 * 60 * 60;
export const LOGIN_LINK_SECONDS = 15 * 60;

const emailList = (value: string | undefined) =>
  value?.split(",").map((email) => email.trim().toLowerCase()).filter(Boolean) ?? [];

export function adminEmails() {
  for (const list of [process.env.ADMIN_EMAILS, process.env.PAYMENT_NOTIFICATION_EMAILS]) {
    const emails = emailList(list);
    if (emails.length) return emails;
  }
  return DEFAULT_INTERNAL_RECIPIENTS.map((e) => e.toLowerCase());
}

export function isAdminEmail(email: string) {
  return adminEmails().includes(email.trim().toLowerCase());
}

export function createSessionToken(email: string) {
  return signEmailToken("admin-session", email, SESSION_SECONDS);
}

/** The signed-in team member's email, or null. */
export async function getAdmin() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  const email = verifyEmailToken("admin-session", token);
  // Re-check the list so removing someone from ADMIN_EMAILS signs them out.
  return email && isAdminEmail(email) ? email : null;
}

export async function requireAdmin() {
  const email = await getAdmin();
  if (!email) redirect("/admin/login");
  return email;
}
