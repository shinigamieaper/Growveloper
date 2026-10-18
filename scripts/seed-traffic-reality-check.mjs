/**
 * Load The Traffic Reality Check as a Sanity resource.
 *
 * Uploads the cover, the guide PDF and the AI skill file (SKILL.md), then writes the resource document.
 * Default is a DRAFT (drafts.resource-traffic-reality-check): visible in Studio and in a local
 * preview with SANITY_PREVIEW_DRAFTS=1, not on the live site.
 *
 * Usage:
 *   node scripts/seed-traffic-reality-check.mjs <pack-folder> [--dry-run] [--publish]
 *
 *   <pack-folder>  marketing-ops accounts/growveloper/resources/traffic-reality-check
 *   --publish      write the published document instead of the draft (only on Juwon's yes)
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

dotenv.config({ path: ".env.local", quiet: true });

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const publish = args.includes("--publish");
const pack = args.find((a) => !a.startsWith("--"));
if (!pack) {
  console.error("usage: node scripts/seed-traffic-reality-check.mjs <pack-folder> [--dry-run] [--publish]");
  process.exit(1);
}

const files = {
  cover: path.join(pack, "design/final/cover-web@2x.png"),
  pdf: path.join(pack, "design/final/traffic-reality-check.pdf"),
  helper: path.join(pack, "skill/SKILL.md"),
};
for (const f of Object.values(files)) if (!fs.existsSync(f)) throw new Error(`missing ${f}`);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-03-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
});

const block = (text, key) => ({
  _type: "block",
  _key: key,
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
});

const doc = {
  _id: `${publish ? "" : "drafts."}resource-traffic-reality-check`,
  _type: "resource",
  title: "The Traffic Reality Check",
  slug: { _type: "slug", current: "traffic-reality-check" },
  resourceType: "Guide",
  category: "Analytics",
  accessType: "free",
  description: [
    block(
      "Three checks to run on your own Google Analytics before you spend more on traffic: are your visitors people, is some of it you, and which number actually tells you to spend.",
      "d1"
    ),
    block(
      "A step-by-step guide with a one-page checklist, plus an AI skill file that walks you through each check on your own screen.",
      "d2"
    ),
  ],
  whatsIncluded: [
    "The step-by-step guide (PDF), with a one-page checklist at the end",
    "The AI skill file: load it in Claude, ChatGPT or any AI to be walked through the checks",
  ],
  whoItIsFor: [
    "You run a business with a website and Google Analytics 4",
    "You can sign in to your Google Analytics (Check 2 needs Editor access)",
    "You are about to spend more on ads or traffic and want to know what you are paying for",
  ],
  deliveryEmailLine:
    "Set aside one sitting with Google Analytics open. One fix in Check 2 then takes Google 24 to 36 hours to show.",
  publishedAt: new Date().toISOString(),
  showPreview: false,
};

if (dryRun) {
  console.log(JSON.stringify({ ...doc, files }, null, 2));
  process.exit(0);
}

const upload = (kind, file, contentType) =>
  client.assets.upload(kind, fs.createReadStream(file), { filename: path.basename(file), contentType });

const [cover, pdf, helper] = await Promise.all([
  upload("image", files.cover, "image/png"),
  upload("file", files.pdf, "application/pdf"),
  upload("file", files.helper, "text/markdown"),
]);
doc.coverImage = { _type: "image", asset: { _type: "reference", _ref: cover._id } };
doc.fileAsset = { _type: "file", asset: { _type: "reference", _ref: pdf._id } };
doc.helperFile = { _type: "file", asset: { _type: "reference", _ref: helper._id } };

const written = await client.createOrReplace(doc);
console.log(JSON.stringify({ written: written._id, cover: cover._id, pdf: pdf._id, helper: helper._id }));
