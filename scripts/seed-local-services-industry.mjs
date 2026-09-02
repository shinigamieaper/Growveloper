/**
 * One-off seed script — publishes the "Local Service Businesses" industry page,
 * its 6 FAQ documents, and links the page everywhere the other four industries
 * already appear (navigation, homepage grid, work page, service pages, about).
 *
 * Run with: node scripts/seed-local-services-industry.mjs
 *
 * Safe to re-run: the page and FAQs use createOrReplace; the link patches
 * skip any document that already references the page. All copy is editable
 * in Sanity Studio after seeding.
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

/* ─── IDs ─── */
const PAGE_ID = "industryPage-local-services";
const SLUG = "local-services";
const NAME = "Local Service Businesses";
const ref = (id, key) => ({ _type: "reference", _ref: id, _key: key });

/* ─── The page ─── */
const page = {
  _id: PAGE_ID,
  _type: "industryPage",

  industryName: NAME,
  slug: { _type: "slug", current: SLUG },
  icon: "map-pin",
  hookLine:
    "Websites, local search and enquiry follow-up for cleaning, solar, roofing, HVAC, clinics, trainers and every business that serves a neighbourhood.",
  ctaLabel: "Learn more",

  /* SEO */
  seoTitle: "Growth Studio for Local Service Businesses",
  seoDescription:
    "Websites that turn searches into calls, local search and ads that bring the right jobs, and automation that answers every enquiry in minutes. Nigeria, US and UK.",

  /* Hero */
  heroHeadline: "Be the business that answers first",
  heroHighlightedWord: "answers first",
  heroSubStatement:
    "Your customers search on their phone, read three reviews, and message the first business that replies. We build the website, run the local search and ads, and automate the follow-up so that business is yours.",
  primaryCtaLabel: "Book a Free Consultation",
  primaryCtaUrl: "/start",
  secondaryCtaLabel: "See the work",
  secondaryCtaUrl: "/work",
  scrollCueText: "SCROLL TO EXPLORE · SCROLL TO EXPLORE ·",
  scrollCueTargetId: "pain-points",

  /* Problem */
  problemHeadline: "Sound familiar?",
  problemHighlightedWord: "familiar",
  painPoints: [
    "Your website is a brochure. It looks fine, but nobody can book, get a quote, or reach you from it in under a minute, so they go back to the search results.",
    "You show up on Google Maps sometimes, for some searches, and you have no idea why. Meanwhile the competitor with worse work has more reviews and a faster reply.",
    "Enquiries arrive on WhatsApp, Instagram, email and a contact form, and you answer them between jobs. Some get answered the next day. Some never do.",
    "You have paid for ads before and cannot say what came out of it, because nothing tracks which calls and messages came from where.",
  ],

  /* How we help */
  howWeHelpHeadline: "Three services. One front door.",
  howWeHelpHighlightedWord: "front door",
  howWeHelpDescription:
    "You do not need three suppliers who never talk to each other. One studio builds the site, brings the right searches to it, and answers the enquiry the moment it lands.",
  serviceCardCtaLabel: "See how it works",
  serviceCards: [
    {
      _key: "sc-site",
      _type: "object",
      title: "A Website Built to Get the Call",
      description:
        "Built for the phone, because that is where your customers meet you. Your services, your area, your prices or price ranges, your reviews, and one obvious next step: call, WhatsApp, or book. It loads fast on a poor connection, and you can update it yourself without a developer.",
      linkUrl: "/services/development",
      icon: "smartphone",
    },
    {
      _key: "sc-search",
      _type: "object",
      title: "Local Search and Ads That Bring the Right Jobs",
      description:
        "Google Business Profile set up and maintained, service and area pages that rank for what people actually type, reviews that arrive on schedule, and paid ads only where the maths works. We also structure your pages so AI answers can quote you, because more searches now end without a click.",
      linkUrl: "/services/marketing",
      icon: "search",
    },
    {
      _key: "sc-followup",
      _type: "object",
      title: "Follow-Up That Happens Without You",
      description:
        "The average business takes over 42 hours to answer a lead, and nearly a quarter never do. We connect your website, WhatsApp, email and calendar so every enquiry gets an instant reply, a quote or a booking link, and a reminder, while you are on the job.",
      linkUrl: "/services/ai",
      icon: "bot",
    },
  ],

  /* Process */
  processHeadline: "How we work with local service businesses",
  processHighlightedWord: "local service businesses",
  processDescription:
    "Four steps. You see progress every week and approve before anything goes live.",
  processSteps: [
    {
      _key: "ps-1",
      _type: "object",
      stepNumber: "01",
      heading: "Diagnose",
      description:
        "We look at your site, your Google Business Profile, your reviews, where your enquiries come from, and how fast they get answered. You get a short list of what is costing you jobs, ranked.",
      lottiePath: "/lottie-json/step-audit.json",
    },
    {
      _key: "ps-2",
      _type: "object",
      stepNumber: "02",
      heading: "Architect",
      description:
        "We map the fix in order: what to change on the site, which searches to go after, which enquiries to automate first. Every step ties back to calls, bookings, or jobs won, not traffic.",
      lottiePath: "/lottie-json/step-architect.json",
    },
    {
      _key: "ps-3",
      _type: "object",
      stepNumber: "03",
      heading: "Build",
      description:
        "Site, listings, campaigns, and follow-up automation ship together. One studio, one conversation, no waiting on a third supplier.",
      lottiePath: "/lottie-json/step-build.json",
    },
    {
      _key: "ps-4",
      _type: "object",
      stepNumber: "04",
      heading: "Scale",
      description:
        "Monthly numbers you can read in five minutes: enquiries, response time, bookings, cost per job. We keep what works and drop what does not.",
      lottiePath: "/lottie-json/step-scale.json",
    },
  ],

  /* Success animation off, same as the other four industry pages */
  showSuccessAnimation: false,

  /* Stats: every number sourced, source named in the description */
  statsHeadline: "The numbers behind the problem",
  statsHighlightedWord: "numbers",
  statsDescription:
    "Sources: Harvard Business Review lead response study of 2,241 companies; SparkToro and Similarweb zero-click study, January to April 2026.",
  outcomeStats: [
    { _key: "st-1", _type: "object", value: 42, label: "Average hours before a business answers a new enquiry" },
    { _key: "st-2", _type: "object", value: 23, suffix: "%", label: "Enquiries that never get a reply" },
    { _key: "st-3", _type: "object", value: 68, suffix: "%", label: "US Google searches that ended without a click, early 2026" },
  ],

  /* Proof */
  caseStudiesHeadline: "Work with owner-run businesses",
  caseStudiesHighlightedWord: "owner-run",
  caseStudiesDescription:
    "Three businesses, three front doors rebuilt: a WhatsApp inbox, a Wix landing page, and a presence built from scratch.",
  featuredCaseStudies: [
    ref("caseStudy-rideon-nigeria", "fc_rideon"),
    ref("caseStudy-vip-creative-studio", "fc_vip"),
    ref("caseStudy-baye-business-solutions", "fc_baye"),
  ],
  testimonialsHeadline: "From the owners",
  testimonialsHighlightedWord: "owners",
  featuredTestimonials: [
    ref("testimonial-femi", "t_femi"),
    ref("testimonial-victor-webdev", "t_victor"),
  ],
  testimonialCtaHeadline: "This could be you",
  testimonialCtaLabel: "Start a project",
  testimonialCtaUrl: "/start",

  /* Qualifiers (derived from pain points on the page) */
  qualifierHeadline: "This is for you if",
  qualifierHighlightedWord: "you",

  /* CTAs */
  ctaInlineHeadline: "Run a local service business? Let's fix the front door.",
  ctaInlineHighlightedWord: "front door",
  ctaInlineLabel: "Book a Free Consultation",
  ctaInlineDestination: "/start",
  ctaSectionHeadline: "Your next customer is searching right now",
  ctaSectionHighlightedWord: "right now",
  ctaSectionLabel: "Book a Free Consultation",
  ctaSectionDestination: "/start",

  /* Other industries */
  otherIndustriesHeadline: "Other industries we work with",
  otherIndustriesHighlightedWord: "industries",
  otherIndustriesDescription: "Same growth studio model. Different sector-specific playbooks.",
  otherIndustriesCtaHeadline: "Don't see yours?",
  otherIndustriesCtaLabel: "Tell us about your business",

  /* FAQ section copy */
  faqHeadline: "Questions from owners",
  faqHighlightedWord: "Questions",
  faqDescription:
    "Straight answers about working with a growth studio when you run the business yourself.",
  faqCtaHeadline: "Got a question that's not here?",
  faqCtaDescription: "Every engagement starts with a free consultation. Ask us anything.",
  faqCtaLabel: "Get in touch",
  faqCtaUrl: "/start",
};

/* ─── FAQs: answer first, 40 to 60 words, every number defensible ─── */
const faqs = [
  {
    question: "What does Growveloper do for a local service business?",
    answer:
      "Three things, as one system: a website built to get the call, local search and ads that bring the right jobs, and follow-up automation that answers every enquiry in minutes. One studio owns all of it, so your site, your listings and your inbox finally work together.",
  },
  {
    question: "How much does a website cost for a small service business?",
    answer:
      "Website builds run from $2,000 to $10,000 and up, quoted as one fixed number after a free 30-minute call. Marketing retainers start at $1,500 a month. Single automations, like instant WhatsApp replies or quote follow-ups, are scoped and quoted per request, with no retainer required.",
  },
  {
    question: "Do you work with businesses in Nigeria, the US and the UK?",
    answer:
      "Yes. Growveloper is based in Lagos, keeps US Eastern hours, and works with owner-run businesses in Nigeria, the United States and the United Kingdom. Everything happens remotely: calls, approvals, weekly progress. Payment works in naira or US dollars.",
  },
  {
    question: "What is the fastest thing you can fix?",
    answer:
      "Response time. Most businesses take over 42 hours to answer a new enquiry, and nearly a quarter never do. Connecting your website, WhatsApp and email so every enquiry gets an instant reply and a booking link is usually live within one to four weeks, and it is the change owners notice first.",
  },
  {
    question: "Can you help me show up on Google Maps and in AI answers?",
    answer:
      "Yes. We set up and maintain your Google Business Profile, build service and area pages that match what people type, and structure your content so answer engines like ChatGPT and Google's AI Overviews can quote you. In early 2026, 68% of US Google searches ended without a click, so being the answer matters as much as being the link.",
  },
  {
    question: "I have been burned by an agency before. How is this different?",
    answer:
      "You get one person who builds the site, runs the marketing and wires the automation, so nothing is lost between suppliers. Every engagement starts with a free 30-minute call, work is quoted as a fixed number, there is no long contract, and you see progress every week before anything goes live.",
  },
].map((f, i) => ({
  _id: `faq-local-services-q${i + 1}`,
  _type: "faq",
  question: f.question,
  answer: f.answer,
  order: i + 1,
  page: { _type: "reference", _ref: PAGE_ID },
}));

/* ─── Link the page where the other industries are listed ─── */
async function appendRefIfMissing(docId, field, key) {
  const doc = await client.fetch(`*[_id == $id][0]{ _id, ${field} }`, { id: docId });
  if (!doc) {
    console.warn(`  ⚠ ${docId} not found, skipping ${field}`);
    return;
  }
  const existing = doc[field] ?? [];
  if (existing.some((r) => r?._ref === PAGE_ID)) {
    console.log(`  = ${docId}.${field} already links the page`);
    return;
  }
  await client
    .patch(docId)
    .setIfMissing({ [field]: [] })
    .append(field, [ref(PAGE_ID, key)])
    .commit();
  console.log(`  + ${docId}.${field}`);
}

async function appendNavLinkIfMissing() {
  const nav = await client.fetch(`*[_type == "navigation"][0]{ _id, industryLinks }`);
  if (!nav) {
    console.warn("  ⚠ navigation document not found");
    return;
  }
  const url = `/industries/${SLUG}`;
  if ((nav.industryLinks ?? []).some((l) => l?.url === url)) {
    console.log("  = navigation.industryLinks already has the page");
    return;
  }
  await client
    .patch(nav._id)
    .setIfMissing({ industryLinks: [] })
    .append("industryLinks", [{ _key: "ind-local-services", label: NAME, url }])
    .commit();
  console.log("  + navigation.industryLinks");
}

async function main() {
  console.log(`Seeding ${NAME} (${PAGE_ID})…`);

  const tx = client.transaction();
  tx.createOrReplace(page);
  for (const f of faqs) tx.createOrReplace(f);
  await tx.commit();
  console.log(`  ✓ page + ${faqs.length} FAQs`);

  console.log("Linking…");
  await appendNavLinkIfMissing();
  await appendRefIfMissing("homePage", "industryCards", "ind-local-services");
  await appendRefIfMissing("workPage", "industryCards", "ind_local-services");
  await appendRefIfMissing("aboutPage", "industryCards", "ind-local-services");

  const servicePages = await client.fetch(
    `*[_type == "servicePage" && !(_id in path("drafts.**"))]{ _id, pageId }`,
  );
  for (const sp of servicePages) {
    await appendRefIfMissing(sp._id, "featuredIndustries", "ind-local-services");
  }

  console.log("Done. Page: https://growveloper.com/industries/" + SLUG);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
