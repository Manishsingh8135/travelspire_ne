#!/usr/bin/env node
/**
 * SEO smoke test — validates structured data, canonicals and internal links
 * across the key pages of travelspirene.com.
 *
 * Usage:
 *   1. Start the dev server:  pnpm dev
 *   2. Run:                   node scripts/test-seo.mjs
 *      (or against another origin: BASE=http://localhost:3002 node scripts/test-seo.mjs)
 *
 * Checks per page:
 *   - HTTP 200
 *   - <title> present and reasonable length (20–70 chars warned)
 *   - meta description present (70–170 chars warned)
 *   - exactly one canonical, absolute, self-referencing
 *   - every JSON-LD block parses; required fields per schema type
 *   - every BreadcrumbList item URL returns 200
 *   - every internal link on the page returns 200
 * Also validates every URL in /sitemap.xml returns 200.
 */

const BASE = process.env.BASE || "http://localhost:3000";
const ORIGIN = "https://travelspirene.com";

const PAGES = [
  "/",
  "/about",
  "/contact",
  "/all-tours",
  "/gallery",
  "/permits",
  "/permits/arunachal-pradesh-ilp",
  "/anini-winter-fest-2026",
  "/ziro-music-festival-2026",
  "/places/anini",
  "/places/dibang-valley",
  "/places/dambuk",
  "/places/roing",
  "/guides/dibrugarh-to-anini",
  "/tours/anini-expedition",
  "/tours/dambuk-anini-ofam",
];

const REQUIRED = {
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
  MusicEvent: ["name", "startDate", "location"],
  TouristAttraction: ["name", "description", "url"],
  Article: ["headline", "author", "datePublished"],
  WebPage: ["url", "name"],
  WebSite: ["url", "name"],
  Organization: ["name", "url"],
  TravelAgency: ["name", "url"],
  LocalBusiness: ["name", "address"],
  Service: ["name", "provider"],
  TourPackage: ["name", "offers"],
};

let failures = 0;
let warnings = 0;
const fail = (page, msg) => { failures += 1; console.log(`  FAIL  ${msg}`); };
const warn = (page, msg) => { warnings += 1; console.log(`  warn  ${msg}`); };
const ok = (msg) => console.log(`  ok    ${msg}`);

async function get(url) {
  const res = await fetch(url, { redirect: "follow" });
  return { status: res.status, body: await res.text() };
}

function flattenGraphs(blocks) {
  const nodes = [];
  for (const b of blocks) {
    if (Array.isArray(b["@graph"])) nodes.push(...b["@graph"]);
    else nodes.push(b);
  }
  return nodes;
}

function nodeTypes(node) {
  const t = node["@type"];
  return Array.isArray(t) ? t : [t];
}

async function checkUrl200(url, context) {
  try {
    const target = url.startsWith("http") ? url.replace(ORIGIN, BASE) : BASE + url;
    const res = await fetch(target, { method: "GET", redirect: "follow" });
    if (res.status !== 200) fail(context, `${url} → HTTP ${res.status}`);
  } catch (e) {
    fail(context, `${url} → fetch error: ${e.message}`);
  }
}

async function checkPage(path) {
  console.log(`\n${path}`);
  let status, body;
  try {
    ({ status, body } = await get(BASE + path));
  } catch (e) {
    fail(path, `unreachable: ${e.message}`);
    return new Set();
  }
  if (status !== 200) { fail(path, `HTTP ${status}`); return new Set(); }
  ok(`HTTP 200 (${(body.length / 1024).toFixed(0)} KB)`);

  // Title
  const title = (body.match(/<title>([^<]*)<\/title>/) || [])[1];
  if (!title) fail(path, "missing <title>");
  else {
    if (title.length < 20 || title.length > 70) warn(path, `title length ${title.length} ("${title.slice(0, 50)}…")`);
  }

  // Meta description
  const desc = (body.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!desc) fail(path, "missing meta description");
  else if (desc.length < 70 || desc.length > 200) warn(path, `description length ${desc.length}`);

  // Canonical — exactly one, absolute, self-referencing
  const canonicals = [...body.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map(m => m[1]);
  if (canonicals.length !== 1) fail(path, `expected 1 canonical, found ${canonicals.length}`);
  else {
    const expected = ORIGIN + (path === "/" ? "/" : path);
    const strip = (u) => u.replace(/\/$/, "");
    if (strip(canonicals[0]) !== strip(expected)) fail(path, `canonical "${canonicals[0]}" ≠ "${expected}"`);
    else ok(`canonical ✓`);
  }

  // JSON-LD
  const rawBlocks = [...body.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  if (rawBlocks.length === 0) fail(path, "no JSON-LD blocks found");
  const parsed = [];
  for (const raw of rawBlocks) {
    try { parsed.push(JSON.parse(raw)); }
    catch { fail(path, "JSON-LD block does not parse"); }
  }
  const nodes = flattenGraphs(parsed);
  const typeSet = new Set(nodes.flatMap(nodeTypes));
  ok(`JSON-LD: ${rawBlocks.length} block(s) → ${[...typeSet].join(", ")}`);

  for (const node of nodes) {
    for (const type of nodeTypes(node)) {
      const req = REQUIRED[type];
      if (!req) continue;
      for (const field of req) {
        if (node[field] === undefined) fail(path, `${type} missing required field "${field}"`);
      }
    }
    // Breadcrumb targets must resolve
    if (nodeTypes(node).includes("BreadcrumbList")) {
      for (const item of node.itemListElement || []) {
        if (item.item) await checkUrl200(item.item, `${path} breadcrumb`);
      }
    }
  }

  // Internal links
  const hrefs = new Set(
    [...body.matchAll(/href="(\/[^"#?]*)"/g)]
      .map(m => m[1])
      .filter(h => !h.startsWith("//") && !/\.(png|jpe?g|webp|svg|ico|css|js|json|xml|woff2?)$/i.test(h))
  );
  return hrefs;
}

async function checkSitemap() {
  console.log(`\n/sitemap.xml`);
  const { status, body } = await get(BASE + "/sitemap.xml");
  if (status !== 200) { fail("sitemap", `HTTP ${status}`); return; }
  const urls = [...body.matchAll(/<loc>([^<]*)<\/loc>/g)].map(m => m[1]);
  ok(`${urls.length} URLs listed`);
  for (const url of urls) {
    await checkUrl200(url, "sitemap");
  }
}

console.log(`SEO smoke test against ${BASE}`);
const allLinks = new Set();
for (const page of PAGES) {
  const links = await checkPage(page);
  for (const l of links) allLinks.add(l);
}

console.log(`\nInternal links discovered across all pages: ${allLinks.size}`);
for (const link of [...allLinks].sort()) {
  await checkUrl200(link, "internal link");
}

await checkSitemap();

console.log(`\n${"=".repeat(48)}`);
console.log(failures === 0 ? `ALL CHECKS PASSED (${warnings} warnings)` : `${failures} FAILURES, ${warnings} warnings`);
process.exit(failures === 0 ? 0 : 1);
