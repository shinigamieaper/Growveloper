/**
 * One-off seed script — pushes Work Page content and 5 FAQ documents to Sanity.
 * Run with: node scripts/seed-work-page.mjs
 *
 * Safe to re-run: uses createOrReplace so it overwrites the same documents.
 * All content is editable in Sanity Studio after seeding.
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

/* ── Look up industry page IDs for references ── */

async function resolveIndustryRefs(slugs) {
  const docs = await client.fetch(
    `*[_type == "industryPage" && slug.current in $slugs]{ _id, "slug": slug.current }`,
    { slugs }
  );
  const refs = [];
  for (const slug of slugs) {
    const match = docs.find((d) => d.slug === slug);
    if (match) {
      refs.push({ _type: "reference", _ref: match._id, _key: `ind_${slug}` });
    } else {
      console.warn(`  ⚠ industryPage "${slug}" not found — skipping`);
    }
  }
  return refs;
}

/* ═══ Work Page ═══ */

async function buildWorkPage() {
  const industryCards = await resolveIndustryRefs(["saas", "b2b", "ai-tech", "fintech"]);

  return {
    _id: "workPage",
    _type: "workPage",

    /* Hero */
    pageHeadline: "Selected Work",
    pageHighlightedWord: "Work",
    pageDescription:
      "Three clients. Three transformations. Every project shows the before, the build, and the outcome.",

    /* Empty States */
    emptyStatePrimary:
      "Case studies are on the way. Book a call and I'll walk you through past work directly.",
    emptyStateFiltered:
      "Nothing matches that filter. Try a different combination.",

    /* Services Section */
    servicesHeadline: "What we do",
    servicesHighlightedWord: "do",
    servicesDescription:
      "Web development, growth marketing, and AI automation. Most projects involve all three.",

    /* Process Section */
    processHeadline: "How every project works",
    processHighlightedWord: "works",
    processDescription:
      "Same framework. Different execution. Every engagement follows this structure.",
    processSteps: [
      {
        _key: "ps1",
        _type: "object",
        stepNumber: "1",
        heading: "Audit",
        description:
          "We look at what exists. Site, analytics, marketing, automation. Everything gets reviewed.",
        lottiePath: "/lottie-json/step-audit.json",
      },
      {
        _key: "ps2",
        _type: "object",
        stepNumber: "2",
        heading: "Strategy",
        description:
          "We map the gaps and prioritize. What to build first, what to fix, what to skip.",
        lottiePath: "/lottie-json/step-architect.json",
      },
      {
        _key: "ps3",
        _type: "object",
        stepNumber: "3",
        heading: "Build",
        description:
          "We build it. Site, campaigns, automations, dashboards. You see progress every week.",
        lottiePath: "/lottie-json/step-build.json",
      },
      {
        _key: "ps4",
        _type: "object",
        stepNumber: "4",
        heading: "Measure",
        description:
          "We track what matters. If it's not moving the number, we change the approach.",
        lottiePath: "/lottie-json/step-scale.json",
      },
    ],

    /* Before & After */
    beforeAfterHeadline: "Before and after",
    beforeAfterHighlightedWord: "after",
    beforeAfterDescription: "Same businesses. Different digital presence.",

    /* Industries */
    industriesHeadline: "Industries",
    industriesHighlightedWord: "Industries",
    industriesDescription: "We work best with companies in these spaces.",
    industryCards,
    industriesCtaHeadline: "Don't see your industry?",
    industriesCtaLabel: "Let's talk",
    industriesCtaUrl: "/start",

    /* Inline CTA */
    ctaInlineHeadline: "Want results like these?",
    ctaInlineHighlightedWord: "results",
    ctaInlineLabel: "Book a free consultation",
    ctaInlineDestination: "/start",

    /* Section CTA */
    ctaSectionHeadline: "Ready to become the next case study?",
    ctaSectionHighlightedWord: "next case study",
    ctaSectionLabel: "Start a project",
    ctaSectionDestination: "/start",

    /* FAQ Section */
    faqHeadline: "Common questions",
    faqHighlightedWord: "questions",
    faqCtaHeadline: "Have a different question?",
    faqCtaDescription:
      "Book a call or send a message. I respond to everything.",
    faqCtaLabel: "Get in touch",
    faqCtaUrl: "/start",

    /* SEO */
    seoTitle:
      "Selected Work | Web Development and Growth Marketing Case Studies | GROWVELOPER",
    seoDescription:
      "Real case studies from web development, growth marketing, and AI automation projects. See the before, the build, and the outcome for each client.",
  };
}

/* ═══ FAQ Documents ═══ */

async function buildFAQs() {
  const workPageId = await client.fetch(`*[_type == "workPage"][0]._id`);
  if (!workPageId) {
    console.warn("  ⚠ workPage not found — FAQs will be created after workPage exists");
    return [];
  }

  const pageRef = { _type: "reference", _ref: workPageId };

  return [
    {
      _id: "faq-work-1",
      _type: "faq",
      question: "What does your process look like from start to finish?",
      answer:
        "Every project starts with an audit of what exists. Then we build a strategy, prioritize the highest-impact work, and start building. You see progress every week. Most projects include a site build, marketing setup, and analytics implementation. Timelines range from 6 weeks to 4 months depending on scope.",
      page: pageRef,
      order: 1,
    },
    {
      _id: "faq-work-2",
      _type: "faq",
      question: "How long does a typical project take?",
      answer:
        "A marketing site with CMS takes 4-8 weeks. A full-stack application with multiple user types takes 3-4 months. Ongoing marketing engagements are month-to-month. I'll give you a specific timeline after the first call.",
      page: pageRef,
      order: 2,
    },
    {
      _id: "faq-work-3",
      _type: "faq",
      question: "How much does a project cost?",
      answer:
        "It depends on scope. A Growth Audit starts at $500. Website builds range from $2,000-$10,000+. Marketing retainers start at $1,500/month. I price based on the value of the outcome, not hours worked. The first call is free and I'll give you a clear number before any commitment.",
      page: pageRef,
      order: 3,
    },
    {
      _id: "faq-work-4",
      _type: "faq",
      question: "Do you work with clients outside of your listed industries?",
      answer:
        "Yes. I specialize in SaaS, B2B, AI/tech, and fintech because I understand those markets well. But the systems I build (sites, funnels, automations) work across industries. If you have a growth problem and a product people want, we can probably work together.",
      page: pageRef,
      order: 4,
    },
    {
      _id: "faq-work-5",
      _type: "faq",
      question: "Can you help with ongoing marketing after the site launches?",
      answer:
        "Yes. Most clients continue with a marketing retainer after the site is live. That includes paid media management, content strategy, SEO, email marketing, and analytics. The site is the foundation. Marketing is what makes it work.",
      page: pageRef,
      order: 5,
    },
  ];
}

/* ═══ Run ═══ */

async function seed() {
  console.log("Building Work Page content...\n");

  /* Step 1: Seed work page */
  console.log("Step 1 — Seeding workPage document...");
  const workPage = await buildWorkPage();
  const tx1 = client.transaction();
  tx1.createOrReplace(workPage);
  const r1 = await tx1.commit();
  console.log(`  ✓ workPage seeded (tx: ${r1.transactionId})`);

  /* Step 2: Seed FAQ documents */
  console.log("\nStep 2 — Seeding 5 FAQ documents...");
  const faqs = await buildFAQs();
  if (faqs.length > 0) {
    const tx2 = client.transaction();
    for (const faq of faqs) {
      tx2.createOrReplace(faq);
    }
    const r2 = await tx2.commit();
    console.log(`  ✓ ${faqs.length} FAQ documents seeded (tx: ${r2.transactionId})`);
    for (const faq of faqs) {
      console.log(`    - ${faq._id}: ${faq.question.slice(0, 50)}...`);
    }
  }

  console.log("\n✅ All done. Content is now editable in Sanity Studio.");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
