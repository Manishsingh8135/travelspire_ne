/**
 * Import the 5 legacy state permit guides into `permit_zones` (as drafts).
 *
 *   node --env-file=.env.local --import tsx scripts/import-legacy-permits.ts
 *
 * - Structured scalars (portal, helpline, on-arrival, fee) → first-class columns;
 *   the rich guide (whoNeeds, entryPoints, applicationSteps, documents, tips…) → body jsonb;
 *   faqs → faqs jsonb; seo (minus the old-domain canonical) → seo jsonb.
 * - region_id resolves by matching the state name to an existing region (null until seeded).
 * - Idempotent: skips slugs that already exist. Requires the permit_zones migration applied.
 */
import { createClient } from "@supabase/supabase-js";
import {
  arunachalPermitData,
  nagalandPermitData,
  mizoramPermitData,
  manipurPermitData,
  sikkimPermitData,
  statePermitPages,
} from "../legacy/v1/data/permits";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !secret) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY.");
  process.exit(1);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PERMITS: any[] = [
  arunachalPermitData,
  nagalandPermitData,
  mizoramPermitData,
  manipurPermitData,
  sikkimPermitData,
];

function permitType(slug: string): "ILP" | "PAP" | "RAP" | "none" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meta = (statePermitPages as any[]).find((p) => p.slug === slug);
  const t = String(meta?.permitType ?? "ILP").toUpperCase();
  if (t === "PAP") return "PAP";
  if (t === "RAP") return "RAP";
  if (t === "NONE") return "none";
  return "ILP";
}

const asText = (v: unknown) => (typeof v === "string" ? v : null);

async function main() {
  const sb = createClient(url!, secret!, { auth: { persistSession: false } });
  const { data: regions, error: rErr } = await sb.from("regions").select("id, name");
  if (rErr) throw rErr;
  const regionByName = new Map(
    (regions ?? []).map((r) => [String(r.name).toLowerCase(), r.id as string]),
  );

  let inserted = 0;
  let skipped = 0;
  for (const p of PERMITS) {
    const existing = await sb.from("permit_zones").select("id").eq("slug", p.slug).maybeSingle();
    if (existing.data) {
      console.log(`${String(p.slug).padEnd(26)} — already exists, skipped`);
      skipped += 1;
      continue;
    }
    const qs = p.quickStats ?? {};
    const row = {
      slug: p.slug,
      name: p.state,
      region_id: regionByName.get(String(p.state).toLowerCase()) ?? null,
      permit_type: permitType(p.slug),
      indians_allowed: true,
      foreigners_allowed: true,
      on_arrival: Boolean(qs.onArrival),
      fee: qs.fee ?? {},
      processing_time: asText(qs.processingTime),
      validity: asText(qs.validity),
      official_portal: asText(qs.officialPortal),
      helpline: asText(qs.helpline),
      body: {
        title: p.title ?? null,
        tagline: p.tagline ?? null,
        quickStats: qs,
        whoNeeds: p.whoNeeds ?? null,
        entryPoints: p.entryPoints ?? null,
        applicationSteps: p.applicationSteps ?? null,
        documents: p.documents ?? null,
        specialPermits: p.specialPermits ?? null,
        destinations: p.destinations ?? null,
        tips: p.tips ?? null,
        bestTime: p.bestTime ?? null,
        contact: p.contact ?? null,
      },
      faqs: p.faqs ?? [],
      seo: {
        ...(p.seo?.title ? { title: p.seo.title } : {}),
        ...(p.seo?.description ? { description: p.seo.description } : {}),
        ...(p.seo?.keywords ? { keywords: p.seo.keywords } : {}),
      },
      status: "draft",
    };
    const { error } = await sb.from("permit_zones").insert(row);
    if (error) {
      console.log(`${String(p.slug).padEnd(26)} ✗ ${error.message}`);
      continue;
    }
    console.log(`${String(p.slug).padEnd(26)} ✓ ${row.permit_type}  (region: ${row.region_id ? "linked" : "—"})`);
    inserted += 1;
  }
  console.log(`\nDone — ${inserted} imported, ${skipped} skipped.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
