// Create a Supabase Auth admin user (email confirmed) via the service-role key.
// Usage:
//   node --env-file=.env.local scripts/create-admin.mjs <email> <password>
// The email must also be present in ADMIN_EMAILS to be allowed into /admin.

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
const [, , email, password] = process.argv;

if (!url || !secret) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in env.");
  process.exit(1);
}
if (!email || !password) {
  console.error("Usage: node --env-file=.env.local scripts/create-admin.mjs <email> <password>");
  process.exit(1);
}

const supabase = createClient(url, secret, { auth: { persistSession: false } });

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (error) {
  console.error("Failed to create admin:", error.message);
  process.exit(1);
}

console.log(`✓ Admin user created: ${data.user?.email} (id: ${data.user?.id})`);
console.log("Ensure this email is in ADMIN_EMAILS, then sign in at /admin/login.");
