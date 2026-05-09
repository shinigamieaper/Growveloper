/**
 * One-off migration — converts FAQ documents whose `page` field is a string
 * ("home", "audit", "ai", "marketing") into proper Sanity references.
 *
 * Run: node scripts/migrate-faq-page-references.mjs
 *
 * Idempotent: only patches docs whose page is currently a string.
 */
import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const STRING_TO_REF = {
  home: "homePage",
  audit: "auditPage",
  ai: "bab2c5d6-854d-41d1-90aa-9a707c46d8e7",
  marketing: "68fcc14a-2373-4c27-b846-ad67385464c1",
};

const docs = await client.fetch(`*[_type == "faq"]{ _id, question, page }`);
const targets = docs.filter((d) => typeof d.page === "string");

console.log(`Found ${targets.length} FAQ doc(s) with string page values to migrate.`);

if (targets.length === 0) {
  console.log("✅ Nothing to do.");
  process.exit(0);
}

const tx = client.transaction();
let queued = 0;

for (const d of targets) {
  const ref = STRING_TO_REF[d.page];
  if (!ref) {
    console.warn(`  ⚠ Skipping ${d._id} — unknown string value "${d.page}".`);
    continue;
  }
  tx.patch(d._id, (p) =>
    p.set({ page: { _type: "reference", _ref: ref } })
  );
  queued++;
  console.log(`  → ${d._id}  page: "${d.page}"  →  ref:${ref}`);
}

if (queued === 0) {
  console.log("Nothing to commit.");
  process.exit(0);
}

const result = await tx.commit();
console.log(`\n✅ Patched ${queued} doc(s) (tx: ${result.transactionId}).`);
