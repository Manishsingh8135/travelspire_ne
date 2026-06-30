// Create (or reset the password of) a Supabase Auth admin user via the
// service-role key. The email must also be in ADMIN_EMAILS to access /admin.
// Usage:
//   node --env-file=.env.local scripts/create-admin.mjs <email> <password>

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

const { data: created, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (!error) {
  console.log(`✓ Admin user created: ${created.user?.email} (id: ${created.user?.id})`);
} else if (/already|registered|exists/i.test(error.message)) {
  // User exists — reset the password instead.
  const { data: list, error: listErr } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });
  if (listErr) {
    console.error("Lookup failed:", listErr.message);
    process.exit(1);
  }
  const user = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (!user) {
    console.error("User exists but was not found on the first page of results.");
    process.exit(1);
  }
  const { error: updErr } = await supabase.auth.admin.updateUserById(user.id, {
    password,
    email_confirm: true,
  });
  if (updErr) {
    console.error("Password update failed:", updErr.message);
    process.exit(1);
  }
  console.log(`✓ Admin password reset: ${email} (id: ${user.id})`);
} else {
  console.error("Failed:", error.message);
  process.exit(1);
}

console.log("Ensure this email is in ADMIN_EMAILS, then sign in at /admin/login.");
