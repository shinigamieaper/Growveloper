/**
 * One-off seed script — pushes Lab Page and Resources Page content to Sanity.
 * Run with: node scripts/seed-lab-resources-pages.mjs
 *
 * Safe to re-run: uses createOrReplace so it overwrites the same singleton docs.
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

/* ═══ 1. Lab Page ═══ */
const labPage = {
  _id: "labPage",
  _type: "labPage",

  /* Page Header */
  pageHeadline: "The Lab",
  pageHighlightedWord: "Lab",
  pageDescription:
    "Breakdowns, case studies, and short-form content on development, marketing, and automation. No theory. Just what's working right now.",

  /* Empty States */
  emptyStateFiltered:
    "Nothing matches that filter. Try a different combination.",

  /* Newsletter Section */
  newsletterHeadline: "Get one growth tactic every week",
  newsletterHighlightedWord: "tactic",
  newsletterSubCopy:
    "Short, practical breakdowns straight to your inbox. No fluff. Unsubscribe anytime.",
  newsletterCtaLabel: "Count me in",

  /* Inline CTA */
  inlineCtaHeadline: "Want us to do this for you?",
  inlineCtaHighlightedWord: "for you",
  inlineCtaLabel: "Book a Free Consultation",
  inlineCtaDestination: "/start",

  /* Section CTA */
  sectionCtaHeadline: "Reading is good. Results are better.",
  sectionCtaHighlightedWord: "Results",
  sectionCtaLabel: "Book a Free Consultation",
  sectionCtaDestination: "/start",

  /* Lab Post CTAs (shown on individual /lab/[slug] pages) */
  postInlineCtaHeadline: "Need help implementing this?",
  postInlineCtaHighlightedWord: "implementing",
  postInlineCtaLabel: "Book a Free Consultation",
  postInlineCtaDestination: "/start",
  postSectionCtaHeadline: "Ready to stop reading and start growing?",
  postSectionCtaHighlightedWord: "growing",
  postSectionCtaLabel: "Book a Free Consultation",
  postSectionCtaDestination: "/start",
  postNewsletterHeadline: "Liked this? Get more every week.",
  postNewsletterHighlightedWord: "more",
  postNewsletterSubCopy: "One growth tactic, every Tuesday. No fluff.",
  postNewsletterCtaLabel: "Subscribe",

  /* SEO */
  seoTitle: "The Lab | GROWVELOPER",
  seoDescription:
    "Blog posts, breakdowns, and video content on web development, growth marketing, and AI automation. Practical tactics for founders who build and market.",
};

/* ═══ 2. Resources Page ═══ */
const resourcesPage = {
  _id: "resourcesPage",
  _type: "resourcesPage",

  /* Page Header */
  pageHeadline: "Resources",
  pageHighlightedWord: "Resources",
  pageDescription:
    "Guides, templates, and playbooks built from real client work. Free and paid.",

  /* Empty States */
  emptyStatePrimary:
    "Resources are coming soon. Subscribe to get notified when the first one drops.",
  emptyStateFiltered:
    "Nothing matches that filter. Try a different combination.",

  /* Newsletter Section */
  newsletterHeadline: "Get notified when new resources drop",
  newsletterHighlightedWord: "notified",
  newsletterSubCopy:
    "Templates, guides, and playbooks straight to your inbox. Plus weekly growth tactics.",
  newsletterCtaLabel: "Notify me",

  /* Inline CTA */
  inlineCtaHeadline: "Need something custom?",
  inlineCtaHighlightedWord: "custom",
  inlineCtaLabel: "Book a Free Consultation",
  inlineCtaDestination: "/start",

  /* Section CTA */
  sectionCtaHeadline: "Templates get you started. We get you results.",
  sectionCtaHighlightedWord: "results",
  sectionCtaLabel: "Book a Free Consultation",
  sectionCtaDestination: "/start",

  /* SEO */
  seoTitle: "Resources | GROWVELOPER",
  seoDescription:
    "Guides, templates, frameworks, and playbooks for founders who build and market. Free and paid resources from real client work.",
};

/* ═══ Run ═══ */
async function seed() {
  const tx = client.transaction();
  tx.createOrReplace(labPage);
  tx.createOrReplace(resourcesPage);

  const result = await tx.commit();
  console.log(`Seeded 2 documents (tx: ${result.transactionId})`);
  console.log("  - labPage");
  console.log("  - resourcesPage");
  console.log("\nAll content is now editable in Sanity Studio.");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
