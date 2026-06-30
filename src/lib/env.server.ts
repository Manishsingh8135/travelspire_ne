import "server-only";
import { z } from "zod";

/**
 * Server-only secrets. Kept separate from `@/lib/env` (which is client-safe,
 * NEXT_PUBLIC only) so the service-role key and admin allowlist can never be
 * pulled into a client bundle.
 */
const ServerEnvSchema = z.object({
  SUPABASE_SECRET_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(), // legacy fallback
  ADMIN_EMAILS: z.string().optional(),
});

const serverEnv = ServerEnvSchema.parse({
  SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  ADMIN_EMAILS: process.env.ADMIN_EMAILS,
});

/** Server-only secret key (admin writes, seeding; bypasses RLS). */
export function requireSupabaseSecretKey(): string {
  const secret = serverEnv.SUPABASE_SECRET_KEY ?? serverEnv.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) {
    throw new Error(
      "SUPABASE_SECRET_KEY missing — the server-only admin key (sb_secret_…). Never prefix with NEXT_PUBLIC.",
    );
  }
  return secret;
}

/** Parsed admin allowlist (lowercased emails). */
export const ADMIN_EMAILS: string[] = (serverEnv.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);
