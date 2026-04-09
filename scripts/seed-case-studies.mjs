/**
 * One-off seed script — pushes 3 case study documents to Sanity,
 * patches 11 existing page documents with deferred section headings,
 * and chains nextCaseStudy references.
 *
 * Run with: node scripts/seed-case-studies.mjs
 *
 * Safe to re-run: uses createOrReplace for case studies and patch for pages.
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

/* ── Portable Text helper ── */

function block(text, key) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
  };
}

/** Convert multi-paragraph string to Portable Text blocks */
function toBlocks(paragraphs) {
  return paragraphs.map((text, i) => block(text, `b${i}`));
}

/* ── Look up toolRegistry refs by name ── */

async function resolveToolRefs(names) {
  const tools = await client.fetch(
    `*[_type == "toolRegistry" && name in $names]{ _id, name }`,
    { names }
  );
  const found = [];
  for (const name of names) {
    const match = tools.find((t) => t.name === name);
    if (match) {
      found.push({ _type: "reference", _ref: match._id, _key: `tr_${match._id}` });
    } else {
      console.warn(`  ⚠ toolRegistry "${name}" not found — skipping`);
    }
  }
  return found;
}

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

/* ═══════════════════════════════════════════════════════════
   CASE STUDY IDs (deterministic for referencing)
   ═══════════════════════════════════════════════════════════ */

const CS_VIP = "caseStudy-vip-creative-studio";
const CS_RIDEON = "caseStudy-rideon-nigeria";
const CS_BBSL = "caseStudy-baye-business-solutions";

/* ═══════════════════════════════════════════════════════════
   CASE STUDY 1: VIP Creative Studio
   ═══════════════════════════════════════════════════════════ */

async function buildVIP() {
  const techStack = await resolveToolRefs([
    "Next.js", "React", "Sanity CMS", "Vercel", "Google Ads",
    "Google Analytics", "Tailwind CSS", "TypeScript",
  ]);

  return {
    _id: CS_VIP,
    _type: "caseStudy",
    title: "From Wix Landing Page to a CMS-Driven Client Acquisition Engine",
    slug: { _type: "slug", current: "vip-creative-studio" },
    clientName: "VIP Creative Studio",
    clientIndustry: "Financial Services Marketing",
    role: "Lead Developer + Marketing",
    duration: "6 weeks (site) · Ongoing (marketing)",
    liveUrl: "https://www.vipcreative.studio/",
    services: ["web-development", "cms-architecture", "paid-media", "seo-aeo"],
    tags: ["Web Development", "CMS Architecture", "Brand Identity", "Paid Media"],
    featured: true,
    beforeState: "A single Wix landing page with no service breakdown, no case studies, no blog, and no contact form. Prospects could only reach them by email.",
    publishedAt: new Date().toISOString(),

    situation: toBlocks([
      "VIP Creative Studio is a fractional marketing agency that works with credit unions and financial institutions across the United States. Their team includes strategists, a designer, and a project manager. They operate on a month-to-month model, embedding directly into their clients' marketing departments.",
      "When they came to us, their entire web presence was a single Wix landing page. No way to understand what they offered. No service breakdown, no case studies, no blog, no contact form. For a company selling marketing services to risk-averse credit union marketing leaders, the website was actively working against them.",
    ]),
    metrics: [
      { _key: "m1", _type: "object", label: "Pages built", value: "13" },
      { _key: "m2", _type: "object", label: "Build time", value: "6 weeks" },
      { _key: "m3", _type: "object", label: "CMS-managed fields", value: "100+" },
      { _key: "m4", _type: "object", label: "Ad spend managed", value: "$16K+/mo" },
    ],
    approach: toBlocks([
      "The project started with Zach, the team's designer, who had built a full brand guideline: Satoshi typeface, orange and turquoise palette, specific spacing tokens, and interaction patterns. Our job was to translate that system into a working website the team could manage without a developer.",
      "We chose Next.js for performance and SEO. Sanity CMS as the headless backend so every headline, image, CTA, and testimonial could be changed from a visual editor. The site structure followed a deliberate conversion funnel. Homepage builds trust in five seconds. Partnership Model explains the fractional approach. Individual service pages go deep on SEO, paid media, analytics, email, and creative. Success Stories provide proof. Every page pushes toward one action: Book a Discovery Call.",
      "We worked with the full team in weekly Tuesday meetings. Victor (owner), Lyndsie (marketing lead), Michael (project management), and Zach (designer) all contributed.",
    ]),
    buildSection: toBlocks([
      "13 pages across 5 service verticals, plus legal pages, a content hub, and a contact form.",
      "Every service page features micro-UI cards. Instead of stock photos, each card shows a simulated dashboard, content calendar, or analytics display relevant to that service. These interactive elements make the services tangible before a prospect ever gets on a call.",
      "The Sanity CMS integration goes deep. Over 100 fields are editable from the Studio. The team can change hero headlines, swap testimonials, add team members, publish blog posts, and manage FAQ content. We wrote a full CMS guide so non-technical team members could manage everything independently.",
      "On the marketing side, we managed Google Ads campaigns for their client Securityplus Federal Credit Union. Personal loan campaigns on Google Display, membership campaigns on YouTube. We built 500+ negative keyword lists, wrote all ad copy, and managed budgets exceeding $16,000 per month. Securityplus saw 28,800+ page views and 250 credit card application events in a two-month window.",
    ]),
    result: toBlocks([
      "VIP Creative went from a static Wix page to a 13-page, CMS-driven platform that the team controls entirely.",
      "For the first time, the agency can publish case studies, add testimonials, and update service offerings without touching code. Prospects can evaluate capabilities across five dedicated service pages, each with interactive demos.",
      "The team closed a new client shortly after launch. The engagement is still active. We continue managing paid media for their credit union clients and supporting the website as it evolves.",
    ]),

    techStack,
    nextCaseStudy: { _type: "reference", _ref: CS_RIDEON },

    seoTitle: "VIP Creative Studio | From Wix to a CMS-Driven Platform | Growveloper",
    seoDescription: "How we rebuilt a fractional marketing agency's web presence from a Wix landing page to a 13-page CMS-driven platform on Next.js and Sanity.",
  };
}

/* ═══════════════════════════════════════════════════════════
   CASE STUDY 2: RideOn Nigeria
   ═══════════════════════════════════════════════════════════ */

async function buildRideOn() {
  const techStack = await resolveToolRefs([
    "Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel",
    "Google Analytics", "Supabase",
  ]);

  return {
    _id: CS_RIDEON,
    _type: "caseStudy",
    title: "Building a Full-Stack Mobility Platform From WhatsApp Bookings",
    slug: { _type: "slug", current: "rideon-nigeria" },
    clientName: "RideOn Nigeria",
    clientIndustry: "Premium Mobility / Transport",
    role: "Brand Strategist + Lead Developer",
    duration: "4 months (platform) · Ongoing (strategy)",
    liveUrl: "https://www.rideonnigeria.com/",
    services: ["web-development", "brand-strategy", "product-strategy", "content-strategy", "seo-aeo", "analytics-setup"],
    tags: ["Full-Stack Development", "Brand Strategy", "Product Design", "SEO"],
    featured: true,
    beforeState: "WhatsApp-based bookings, no centralized system. Drivers onboarded through a static form. The owner managed a Nigerian business from Canada with no digital tools.",
    publishedAt: new Date().toISOString(),

    situation: toBlocks([
      "RideOn Nigeria is a premium chauffeur and car rental service in Lagos. Three service lines: pre-booked rides with professional drivers, a \"Drive My Car\" service, and full-time driver placement. The owner is based in Canada, managing the business remotely.",
      "Before we started, there was no application. Customers booked through WhatsApp. Drivers onboarded through a basic form on a static website. Partners who supplied vehicles had no portal. The admin team operated from spreadsheets and chat threads.",
      "We originally came on board for an assistant role. During the interview, a conversation about marketing and development capabilities turned into a pitch. The role changed from assistant to brand strategist and lead developer.",
    ]),
    metrics: [
      { _key: "m1", _type: "object", label: "User portals", value: "4" },
      { _key: "m2", _type: "object", label: "Service flows", value: "3" },
      { _key: "m3", _type: "object", label: "Build time", value: "4 months" },
      { _key: "m4", _type: "object", label: "Engagement", value: "Ongoing" },
    ],
    approach: toBlocks([
      "Four distinct user types, each needing separate experiences: customers booking rides, drivers accepting work, partners listing vehicles, and administrators managing everything.",
      "We mapped the entire customer flow in Figma before writing a line of code. Every interaction from account creation to booking confirmation. Same for drivers and partners.",
      "The decision to go web-first (not native mobile) was deliberate: faster deployment, cheaper maintenance, no app store approval cycles. For a pre-booking model, this works. Brand strategy ran parallel to development. We defined the identity, built a content strategy, and repositioned from \"ride-hailing\" (competing with Bolt) to \"professional mobility\" (a different category entirely).",
    ]),
    buildSection: toBlocks([
      "The public site includes homepage, three service pages, Drive With Us, Partner With Us, About, Support hub, and legal pages.",
      "Behind it sits the full application. Customer dashboard with booking history, upcoming trips, and messaging. Driver portal with availability management and earnings. Partner portal for fleet management. Admin dashboard with full oversight of all users, bookings, vehicles, and configuration.",
      "Dark/light theme switching, notification system, booking status tracking, and responsive design that works as a mobile web app.",
    ]),
    result: toBlocks([
      "RideOn went from WhatsApp bookings and spreadsheets to a complete digital platform with four dedicated portals.",
      "When the app launched, drivers and customers started using it immediately without any marketing push. Instagram grew to over 5,700 followers with nearly 400 posts. Facebook reviews sit at 100% positive. The owner can now manage the entire operation from Canada through the admin dashboard.",
    ]),

    techStack,
    nextCaseStudy: { _type: "reference", _ref: CS_BBSL },

    seoTitle: "RideOn Nigeria | Full-Stack Mobility Platform | Growveloper",
    seoDescription: "How we built a full-stack mobility platform with 4 user portals, replacing WhatsApp-based bookings with a centralized web application.",
  };
}

/* ═══════════════════════════════════════════════════════════
   CASE STUDY 3: Baye Business Solutions
   ═══════════════════════════════════════════════════════════ */

async function buildBBSL() {
  const techStack = await resolveToolRefs([
    "Next.js", "React", "TypeScript", "MongoDB",
    "Google Analytics", "Vercel", "Tailwind CSS",
  ]);

  return {
    _id: CS_BBSL,
    _type: "caseStudy",
    title: "Rebuilding a Cloud Services Company's Digital Presence From Scratch",
    slug: { _type: "slug", current: "baye-business-solutions" },
    clientName: "Baye Business Solutions",
    clientIndustry: "Cloud Services / IT",
    role: "Developer + Marketing (Internal)",
    duration: "6 months",
    liveUrl: "https://bayebusinesssolutions.com/",
    services: ["web-development", "seo-aeo", "content-strategy", "email-marketing", "analytics-setup"],
    tags: ["Web Development", "Admin Dashboard", "Content Strategy", "SEO", "Email Marketing"],
    featured: true,
    beforeState: "A broken website with misspelled links, no analytics, no blog, no SEO, and no intake forms. Customer outreach was cold email with no strategy.",
    publishedAt: new Date().toISOString(),

    situation: toBlocks([
      "Baye Business Solutions is a cloud services and IT solutions company in Lagos. About 25 employees. Microsoft Cloud Solutions Provider with partnerships across Microsoft, Adobe, Kaspersky, Sophos, HP, Dell, Lenovo, Cisco, and more.",
      "The business had real clients and real expertise. None of it showed up online. Their website had broken links. \"Microsft365\" was misspelled in the navigation. The Backup and Recovery link pointed to an unrelated domain. No pages for individual services despite offering eight categories. No blog. No analytics. No Google tracking. No intake forms.",
    ]),
    metrics: [
      { _key: "m1", _type: "object", label: "Service pages", value: "8+" },
      { _key: "m2", _type: "object", label: "Admin operations", value: "Full CRUD" },
      { _key: "m3", _type: "object", label: "Content calendar", value: "12-week plan" },
      { _key: "m4", _type: "object", label: "Build time", value: "3-4 months" },
    ],
    approach: toBlocks([
      "Started with a full audit. Documented every broken link, every missing page, every gap. The audit covered the website, analytics, SEO, email, content, and social media.",
      "Next.js with React and TypeScript for the frontend. MongoDB Atlas for the backend after initially planning PostgreSQL (too complex for the timeline). The design took direct inspiration from the business: sky blue backgrounds and cloud imagery that communicate \"cloud\" before you read a word.",
      "Parallel to the website: GA4, Microsoft Clarity, SEO keyword research, a 12-week content calendar, and email marketing flow through Zoho Marketing Plus.",
    ]),
    buildSection: toBlocks([
      "Customer-facing site: homepage, about, contact, 8+ service pages, sub-service pages, solutions hub, blog with individual post pages, industry pages, and a partners showcase.",
      "Admin dashboard: full CRUD for blog posts and user management. Content editors could create, publish, and manage posts independently.",
      "Beyond the website: trained the marketing team on analytics, helped structure outreach emails, taught JavaScript to the IT team, managed Meta ads for BBSL's clients.",
    ]),
    result: toBlocks([
      "BBSL went from a broken website to a comprehensive platform with dedicated pages for every service, a functioning blog, analytics tracking, and an admin dashboard.",
      "For the first time, the company had visibility into who visited their site and where they dropped off. The marketing team had a content calendar, an email strategy, and the tools to execute independently.",
      "Every system we built for BBSL became a template we refined on later projects.",
    ]),

    techStack,
    nextCaseStudy: { _type: "reference", _ref: CS_VIP },

    seoTitle: "Baye Business Solutions | Cloud Services Digital Rebuild | Growveloper",
    seoDescription: "How we rebuilt a Lagos-based cloud services company's website, admin dashboard, and marketing infrastructure from a broken PHP site.",
  };
}

/* ═══════════════════════════════════════════════════════════
   PATCH: Deferred section headings on existing pages
   ═══════════════════════════════════════════════════════════ */

async function patchPages() {
  const patches = [];

  /* Helper: ref array for featuredCaseStudies */
  const refAll3 = [
    { _type: "reference", _ref: CS_VIP, _key: "fc_vip" },
    { _type: "reference", _ref: CS_RIDEON, _key: "fc_rideon" },
    { _type: "reference", _ref: CS_BBSL, _key: "fc_bbsl" },
  ];
  const refVipBbsl = [
    { _type: "reference", _ref: CS_VIP, _key: "fc_vip" },
    { _type: "reference", _ref: CS_BBSL, _key: "fc_bbsl" },
  ];
  const refVipOnly = [
    { _type: "reference", _ref: CS_VIP, _key: "fc_vip" },
  ];
  const refRideOnOnly = [
    { _type: "reference", _ref: CS_RIDEON, _key: "fc_rideon" },
  ];

  /* ─── homePage ─── */
  const homeId = await findDocId("homePage");
  if (homeId) {
    patches.push({
      id: homeId,
      label: "homePage",
      fields: {
        caseStudiesHeadline: "Proof in the numbers",
        caseStudiesHighlightedWord: "numbers",
        caseStudiesDescription: "Real projects. Real transformations. No fabricated metrics.",
        featuredCaseStudies: refAll3,
        testimonialHeadline: "What clients say",
        testimonialHighlightedWord: "clients",
        testimonialDescription: "From the people who use the work every day.",
        testimonialCtaHeadline: "This could be you",
        testimonialCtaLabel: "Start a project",
        testimonialCtaUrl: "/start",
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
        caseStudiesHeadline: "Sites we've built",
        caseStudiesHighlightedWord: "built",
        caseStudiesDescription: "Real projects with real performance data.",
        featuredCaseStudies: refVipBbsl,
        testimonialsHeadline: "What clients say",
        testimonialsHighlightedWord: "clients",
        testimonialsDescription: "From the people who use the sites every day.",
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
        caseStudiesHeadline: "Results from real campaigns",
        caseStudiesHighlightedWord: "Results",
        caseStudiesDescription: "Anonymized performance data from clients we've managed.",
        featuredCaseStudies: refVipOnly,
        testimonialsHeadline: "What clients say",
        testimonialsHighlightedWord: "clients",
        testimonialsDescription: "From the people who write the checks.",
      },
    });
  }

  /* ─── servicePage: ai ─── */
  const aiId = await findDocId("servicePage", "ai");
  if (aiId) {
    patches.push({
      id: aiId,
      label: "servicePage (ai)",
      fields: {
        caseStudiesHeadline: "Automations we've built",
        caseStudiesHighlightedWord: "built",
        caseStudiesDescription: "Real workflows with real time savings.",
        testimonialsHeadline: "What clients say",
        testimonialsHighlightedWord: "clients",
        testimonialsDescription: "From the teams running these automations daily.",
      },
    });
  }

  /* ─── aboutPage ─── */
  const aboutId = await findDocId("aboutPage");
  if (aboutId) {
    patches.push({
      id: aboutId,
      label: "aboutPage",
      fields: {
        caseStudiesHeadline: "Work I'm proud of",
        caseStudiesHighlightedWord: "proud",
        featuredCaseStudies: refAll3,
      },
    });
  }

  /* ─── industryPage: saas ─── */
  const saasId = await findDocId("industryPage", "saas");
  if (saasId) {
    patches.push({
      id: saasId,
      label: "industryPage (saas)",
      fields: {
        caseStudiesHeadline: "Work in SaaS",
        caseStudiesHighlightedWord: "SaaS",
        caseStudiesDescription: "Real SaaS projects with real growth data.",
        testimonialsHeadline: "SaaS clients",
        testimonialsHighlightedWord: "clients",
        testimonialCtaHeadline: "This could be you",
        testimonialCtaLabel: "Start a project",
        testimonialCtaUrl: "/start",
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
        caseStudiesHeadline: "B2B projects we've shipped",
        caseStudiesHighlightedWord: "shipped",
        caseStudiesDescription: "Real builds, real campaigns, real pipeline.",
        featuredCaseStudies: refVipBbsl,
        testimonialsHeadline: "From B2B teams",
        testimonialsHighlightedWord: "teams",
        testimonialCtaHeadline: "This could be you",
        testimonialCtaLabel: "Start a project",
        testimonialCtaUrl: "/start",
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
        caseStudiesHeadline: "Tech projects we've shipped",
        caseStudiesHighlightedWord: "shipped",
        caseStudiesDescription: "Real builds, real growth, real metrics.",
        featuredCaseStudies: refRideOnOnly,
        testimonialsHeadline: "From founders",
        testimonialsHighlightedWord: "founders",
        testimonialCtaHeadline: "This could be you",
        testimonialCtaLabel: "Start a project",
        testimonialCtaUrl: "/start",
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
        caseStudiesHeadline: "FinTech projects we've shipped",
        caseStudiesHighlightedWord: "shipped",
        caseStudiesDescription: "Real builds, real campaigns, real metrics.",
        featuredCaseStudies: refVipOnly,
        testimonialsHeadline: "From FinTech teams",
        testimonialsHighlightedWord: "teams",
        testimonialCtaHeadline: "This could be you",
        testimonialCtaLabel: "Start a project",
        testimonialCtaUrl: "/start",
      },
    });
  }

  return patches;
}

/* ═══════════════════════════════════════════════════════════
   RUN
   ═══════════════════════════════════════════════════════════ */

async function seed() {
  console.log("Building case study documents...\n");

  const [vip, rideon, bbsl] = await Promise.all([
    buildVIP(),
    buildRideOn(),
    buildBBSL(),
  ]);

  /* Step 1: Create case studies */
  console.log("Step 1 — Seeding 3 case study documents...");
  const tx1 = client.transaction();
  tx1.createOrReplace(vip);
  tx1.createOrReplace(rideon);
  tx1.createOrReplace(bbsl);
  const r1 = await tx1.commit();
  console.log(`  ✓ 3 case studies created (tx: ${r1.transactionId})`);
  console.log(`    - ${CS_VIP} → vip-creative-studio`);
  console.log(`    - ${CS_RIDEON} → rideon-nigeria`);
  console.log(`    - ${CS_BBSL} → baye-business-solutions`);

  /* Step 2: Patch page documents with deferred headings */
  console.log("\nStep 2 — Patching deferred section headings on existing pages...");
  const patches = await patchPages();

  const tx2 = client.transaction();
  for (const p of patches) {
    tx2.patch(p.id, (patch) => patch.set(p.fields));
  }
  const r2 = await tx2.commit();
  console.log(`  ✓ ${patches.length} page documents patched (tx: ${r2.transactionId})`);
  for (const p of patches) {
    const fieldCount = Object.keys(p.fields).length;
    console.log(`    - ${p.label}: ${fieldCount} fields`);
  }

  console.log("\n✅ All done. Content is now editable in Sanity Studio.");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
