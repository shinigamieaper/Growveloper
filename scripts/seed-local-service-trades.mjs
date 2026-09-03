/**
 * Seed script — publishes the local service trade pages under
 * /industries/local-services/<trade> from a research JSON file, plus each
 * page's FAQ documents.
 *
 * Run with: node scripts/seed-local-service-trades.mjs [path/to/trades.json]
 * Default input: scripts/assets/local-service-trades.json
 *
 * Safe to re-run: createOrReplace on deterministic ids.
 * All copy is editable in Sanity Studio after seeding (Local Service Trade Page).
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config({ path: ".env.local" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT = process.argv[2] ?? path.join(__dirname, "assets", "local-service-trades.json");
const PARENT_ID = "industryPage-local-services";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const ICONS = {
  "cleaning-companies": "refresh-cw",
  "solar-installers": "zap",
  "roofing-contractors": "building",
  "hvac-companies": "gauge",
  "private-clinics": "calendar",
  "personal-trainers": "users",
};

const SERVICE_LINKS = ["/services/development", "/services/marketing", "/services/ai"];
const SERVICE_ICONS = ["smartphone", "search", "bot"];

function assertNoEmDash(label, text) {
  if (typeof text === "string" && /—/.test(text)) {
    throw new Error(`Em-dash found in ${label}: ${text.slice(0, 80)}`);
  }
}

function walk(obj, label = "root") {
  if (typeof obj === "string") return assertNoEmDash(label, obj);
  if (Array.isArray(obj)) return obj.forEach((v, i) => walk(v, `${label}[${i}]`));
  if (obj && typeof obj === "object") return Object.entries(obj).forEach(([k, v]) => walk(v, `${label}.${k}`));
}

function buildPage(t) {
  const slug = t.slug;
  const stats = (t.stats ?? []).filter((s) => s.sourceUrl && s.sourceName);
  return {
    _id: `localServicePage-${slug}`,
    _type: "localServicePage",
    tradeName: t.tradeName,
    slug: { _type: "slug", current: slug },
    parent: { _type: "reference", _ref: PARENT_ID },
    icon: t.icon ?? ICONS[slug] ?? "map-pin",
    hookLine: t.hookLine ?? t.heroSubStatement?.split(". ")[0] ?? "",

    seoTitle: t.seoTitle,
    seoDescription: t.seoDescription,

    heroHeadline: t.heroHeadline,
    heroHighlightedWord: t.heroHighlightedWord,
    heroSubStatement: t.heroSubStatement,
    primaryCtaLabel: "Book a Free Consultation",
    primaryCtaUrl: "/start",
    secondaryCtaLabel: "See the work",
    secondaryCtaUrl: "/work",

    problemHeadline: t.problemHeadline ?? "Sound familiar?",
    problemHighlightedWord: t.problemHighlightedWord ?? "familiar",
    painPoints: t.painPoints ?? [],

    howWeHelpHeadline: t.howWeHelpHeadline ?? "Three services. One front door.",
    howWeHelpHighlightedWord: t.howWeHelpHighlightedWord ?? "front door",
    howWeHelpDescription:
      t.howWeHelpDescription ??
      "One studio builds the site, brings the right searches to it, and answers the enquiry the moment it lands.",
    serviceCardCtaLabel: "See how it works",
    serviceCards: (t.serviceCards ?? []).slice(0, 3).map((c, i) => ({
      _key: `sc-${i + 1}`,
      _type: "object",
      title: c.title,
      description: c.description,
      linkUrl: c.linkUrl ?? SERVICE_LINKS[i],
      icon: c.icon ?? SERVICE_ICONS[i],
    })),

    statsHeadline: t.statsHeadline ?? "The numbers behind the problem",
    statsHighlightedWord: t.statsHighlightedWord ?? "numbers",
    statsDescription: t.statsDescription ?? "Every figure links to its source below.",
    stats: stats.map((s, i) => ({
      _key: `st-${i + 1}`,
      _type: "object",
      label: s.label,
      value: Number(s.value),
      prefix: s.prefix || undefined,
      suffix: s.suffix || undefined,
      decimals: s.decimals ?? undefined,
      sourceName: s.sourceName,
      sourceUrl: s.sourceUrl,
      year: s.year ? Number(s.year) : undefined,
    })),

    ctaInlineHeadline: t.ctaInlineHeadline,
    ctaInlineHighlightedWord: t.ctaInlineHighlightedWord,
    ctaInlineLabel: "Book a Free Consultation",
    ctaInlineDestination: "/start",
    ctaSectionHeadline: t.ctaSectionHeadline,
    ctaSectionHighlightedWord: t.ctaSectionHighlightedWord,
    ctaSectionLabel: "Book a Free Consultation",
    ctaSectionDestination: "/start",

    faqHeadline: t.faqHeadline ?? "Questions from owners",
    faqHighlightedWord: t.faqHighlightedWord ?? "Questions",
    faqDescription: t.faqDescription,
    faqCtaHeadline: "Got a question that's not here?",
    faqCtaDescription: "Every engagement starts with a free consultation. Ask us anything.",
    faqCtaLabel: "Get in touch",
    faqCtaUrl: "/start",

    targetQueries: (t.queries ?? []).map((q) => (typeof q === "string" ? q : `${q.query} [${q.intent}]`)),
  };
}

function buildFaqs(t) {
  return (t.faqs ?? []).slice(0, 8).map((f, i) => ({
    _id: `faq-lst-${t.slug}-q${i + 1}`,
    _type: "faq",
    question: f.question,
    answer: f.answer,
    order: i + 1,
    page: { _type: "reference", _ref: `localServicePage-${t.slug}` },
  }));
}

async function main() {
  const raw = fs.readFileSync(INPUT, "utf8");
  const trades = JSON.parse(raw);
  if (!Array.isArray(trades) || trades.length === 0) throw new Error("input must be a non-empty JSON array");
  walk(trades);

  const parent = await client.fetch(`*[_id == $id][0]{ _id }`, { id: PARENT_ID });
  if (!parent) throw new Error(`parent ${PARENT_ID} not found; run seed-local-services-industry.mjs first`);

  const tx = client.transaction();
  const slugs = [];
  for (const t of trades) {
    if (!t.slug || !t.tradeName || !t.heroHeadline) throw new Error(`trade missing slug/tradeName/heroHeadline: ${JSON.stringify(t).slice(0, 80)}`);
    tx.createOrReplace(buildPage(t));
    for (const f of buildFaqs(t)) tx.createOrReplace(f);
    slugs.push(t.slug);
  }
  await tx.commit();
  console.log(`  ✓ ${slugs.length} trade pages + FAQs`);
  for (const s of slugs) console.log(`    https://growveloper.com/industries/local-services/${s}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
