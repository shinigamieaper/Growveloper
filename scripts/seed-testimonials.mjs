/**
 * One-off seed script — creates 3 testimonial documents,
 * wires them to 2 case study documents via the single `testimonial` ref,
 * and patches 6 page documents' `featuredTestimonials` arrays.
 *
 * Run with: node scripts/seed-testimonials.mjs
 *
 * Safe to re-run: uses createOrReplace for testimonials and patch.set for pages.
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import https from "node:https";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

/* ── Look up page document IDs ── */

async function findDocId(type, identifier) {
  let query;
  if (!identifier) {
    query = `*[_type == "${type}"][0]._id`;
  } else if (type === "servicePage") {
    query = `*[_type == "${type}" && pageId == "${identifier}"][0]._id`;
  } else {
    query = `*[_type == "${type}" && slug.current == "${identifier}"][0]._id`;
  }
  const id = await client.fetch(query);
  if (!id) console.warn(`  ⚠ ${type}${identifier ? ` (${identifier})` : ""} not found`);
  return id;
}

/* ── Download image and upload to Sanity ── */

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadBuffer(res.headers.location).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(15000, () => req.destroy(new Error("timeout")));
  });
}

async function uploadFemiAvatar() {
  const url =
    "https://www.jotform.com/uploads/oyekolaobajuwon/260976829277072/6515400986435369740/IMG_5049.jpg";
  try {
    const buf = await downloadBuffer(url);
    const asset = await client.assets.upload("image", buf, {
      filename: "femi-oni-avatar.jpg",
      contentType: "image/jpeg",
    });
    return {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
  } catch (err) {
    console.warn(`  ⚠ Femi avatar download failed (${err.message}). Manual upload needed in Sanity Studio.`);
    return null;
  }
}

/* ═══════════════════════════════════════════════════════════
   TESTIMONIAL IDs (deterministic for referencing)
   ═══════════════════════════════════════════════════════════ */

const T_VICTOR_MKT = "testimonial-victor-marketing";
const T_VICTOR_WEB = "testimonial-victor-webdev";
const T_FEMI = "testimonial-femi";

/* ═══════════════════════════════════════════════════════════
   CASE STUDY IDs (must match existing docs in Sanity)
   ═══════════════════════════════════════════════════════════ */

const CS_VIP = "caseStudy-vip-creative-studio";
const CS_RIDEON = "caseStudy-rideon-nigeria";

/* ═══════════════════════════════════════════════════════════
   TESTIMONIAL DOCUMENTS
   ═══════════════════════════════════════════════════════════ */

function buildVictorMarketing() {
  return {
    _id: T_VICTOR_MKT,
    _type: "testimonial",
    quote:
      "A lot of marketers can run ads. Juwon understands how to connect strategy, targeting, and performance in a way that produces qualified leads. We moved from volume-driven tactics to an intentional, high-intent approach: better targeting, cleaner campaign structure, and a sharper focus on conversion quality. He doesn't need constant direction. He understands the objective, builds a plan, and executes. If you want someone who actually cares about outcomes and not just platform metrics, he's who you call.",
    name: "Victor Provencio",
    role: "CEO",
    company: "VIP Creative Studio",
    rating: 5,
    industry: "Financial Services Marketing",
    service: "Growth Marketing",
    featured: true,
  };
}

function buildVictorWebdev() {
  return {
    _id: T_VICTOR_WEB,
    _type: "testimonial",
    quote:
      "The website went from a single landing page to a full platform we control entirely. Every headline, testimonial, and service description is editable from the CMS without touching code. What sets Juwon apart is that he understands positioning and audience behavior, not just development. In financial services, where precision matters, that makes all the difference.",
    name: "Victor Provencio",
    role: "CEO",
    company: "VIP Creative Studio",
    rating: 5,
    industry: "Financial Services Marketing",
    service: "Web Development",
    featured: true,
  };
}

function buildFemi(avatar) {
  return {
    _id: T_FEMI,
    _type: "testimonial",
    quote:
      "I had an idea for a premium chauffeur platform but no way to bring it to life beyond WhatsApp bookings. Juwon built the entire system: customer booking, driver management, partner portal, admin dashboard. Four separate portals from scratch. He also shaped the brand strategy and helped us position as a professional mobility service instead of another ride-hailing app. He listens, he finds solutions fast, and he's always available when something needs to change.",
    name: "Femi Oni",
    role: "Managing Director",
    company: "RideOn Nigeria",
    rating: 5,
    industry: "Premium Mobility / Transport",
    service: "Web Development",
    featured: true,
    ...(avatar ? { avatar } : {}),
  };
}

/* ═══════════════════════════════════════════════════════════
   PATCH: wire testimonials onto case studies + pages
   ═══════════════════════════════════════════════════════════ */

async function buildPatches() {
  const patches = [];

  /* ─── Case studies (single `testimonial` ref field) ─── */
  patches.push({
    id: CS_VIP,
    label: "caseStudy (VIP Creative)",
    fields: {
      testimonial: { _type: "reference", _ref: T_VICTOR_MKT },
    },
  });
  patches.push({
    id: CS_RIDEON,
    label: "caseStudy (RideOn)",
    fields: {
      testimonial: { _type: "reference", _ref: T_FEMI },
    },
  });

  /* ─── homePage ─── */
  const homeId = await findDocId("homePage");
  if (homeId) {
    patches.push({
      id: homeId,
      label: "homePage",
      fields: {
        featuredTestimonials: [
          { _type: "reference", _ref: T_VICTOR_MKT, _key: "tv1" },
          { _type: "reference", _ref: T_FEMI, _key: "tf1" },
        ],
      },
    });
  }

  /* ─── servicePage: development ─── */
  const devId = await findDocId("servicePage", "development");
  if (devId) {
    patches.push({
      id: devId,
      label: "servicePage (development)",
      fields: {
        featuredTestimonials: [
          { _type: "reference", _ref: T_VICTOR_WEB, _key: "tv2" },
          { _type: "reference", _ref: T_FEMI, _key: "tf2" },
        ],
      },
    });
  }

  /* ─── servicePage: marketing ─── */
  const mktId = await findDocId("servicePage", "marketing");
  if (mktId) {
    patches.push({
      id: mktId,
      label: "servicePage (marketing)",
      fields: {
        featuredTestimonials: [
          { _type: "reference", _ref: T_VICTOR_MKT, _key: "tv3" },
        ],
      },
    });
  }

  /* ─── industryPage: b2b ─── */
  const b2bId = await findDocId("industryPage", "b2b");
  if (b2bId) {
    patches.push({
      id: b2bId,
      label: "industryPage (b2b)",
      fields: {
        featuredTestimonials: [
          { _type: "reference", _ref: T_VICTOR_MKT, _key: "tv4" },
        ],
      },
    });
  }

  /* ─── industryPage: ai-tech ─── */
  const aiTechId = await findDocId("industryPage", "ai-tech");
  if (aiTechId) {
    patches.push({
      id: aiTechId,
      label: "industryPage (ai-tech)",
      fields: {
        featuredTestimonials: [
          { _type: "reference", _ref: T_FEMI, _key: "tf3" },
        ],
      },
    });
  }

  /* ─── industryPage: fintech ─── */
  const fintechId = await findDocId("industryPage", "fintech");
  if (fintechId) {
    patches.push({
      id: fintechId,
      label: "industryPage (fintech)",
      fields: {
        featuredTestimonials: [
          { _type: "reference", _ref: T_VICTOR_MKT, _key: "tv5" },
        ],
      },
    });
  }

  return patches;
}

/* ═══════════════════════════════════════════════════════════
   RUN
   ═══════════════════════════════════════════════════════════ */

async function seed() {
  console.log("Step 1 — Uploading Femi's avatar from Jotform...");
  const femiAvatar = await uploadFemiAvatar();
  if (femiAvatar) console.log(`  ✓ avatar uploaded (${femiAvatar.asset._ref})`);

  console.log("\nStep 2 — Seeding 3 testimonial documents...");
  const tx1 = client.transaction();
  tx1.createOrReplace(buildVictorMarketing());
  tx1.createOrReplace(buildVictorWebdev());
  tx1.createOrReplace(buildFemi(femiAvatar));
  const r1 = await tx1.commit();
  console.log(`  ✓ 3 testimonials created (tx: ${r1.transactionId})`);
  console.log(`    - ${T_VICTOR_MKT}`);
  console.log(`    - ${T_VICTOR_WEB}`);
  console.log(`    - ${T_FEMI}`);

  console.log("\nStep 3 — Wiring testimonials to case studies + pages...");
  const patches = await buildPatches();

  const tx2 = client.transaction();
  for (const p of patches) {
    tx2.patch(p.id, (patch) => patch.set(p.fields));
  }
  const r2 = await tx2.commit();
  console.log(`  ✓ ${patches.length} documents patched (tx: ${r2.transactionId})`);
  for (const p of patches) {
    const fieldCount = Object.keys(p.fields).length;
    console.log(`    - ${p.label}: ${fieldCount} field(s)`);
  }

  console.log("\n✅ All done. Testimonials wired across the site.");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
