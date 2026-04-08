/**
 * One-off seed script — pushes Start Page, Start Confirmed, and Audit Confirmed
 * content to Sanity. Run with: node scripts/seed-start-pages.mjs
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

/* ═══ 1. Start Page ═══ */
const startPage = {
  _id: "startPage",
  _type: "startPage",
  pageHeadline: "Tell Us About Your Growth Problem",
  pageHighlightedWord: "Growth",
  pageDescription:
    "Two minutes. Four steps. We read every submission and reply within 24 hours.",
  submitButtonLabel: "Get My Free Strategy Call",
  formSteps: [
    {
      _key: "step1",
      _type: "formStep",
      stepTitle: "What can we help with?",
      stepDescription: "Select all that apply.",
      order: 1,
      fields: [
        {
          _key: "f_servicesInterested",
          _type: "formField",
          fieldId: "servicesInterested",
          label: "Which services are you interested in?",
          fieldType: "multiselect",
          required: true,
          order: 1,
          options: [
            { _key: "o_dev", _type: "fieldOption", value: "development", label: "Web Development" },
            { _key: "o_mkt", _type: "fieldOption", value: "marketing", label: "Growth Marketing" },
            { _key: "o_ai", _type: "fieldOption", value: "ai", label: "AI & Automation" },
            { _key: "o_audit", _type: "fieldOption", value: "audit", label: "Growth Audit" },
          ],
        },
      ],
    },
    {
      _key: "step2",
      _type: "formStep",
      stepTitle: "A bit about you",
      stepDescription: "So we know who we're talking to.",
      order: 2,
      fields: [
        {
          _key: "f_name",
          _type: "formField",
          fieldId: "name",
          label: "Your name",
          fieldType: "text",
          placeholder: "Jane Smith",
          required: true,
          order: 1,
        },
        {
          _key: "f_email",
          _type: "formField",
          fieldId: "email",
          label: "Work email",
          fieldType: "email",
          placeholder: "jane@company.com",
          required: true,
          order: 2,
        },
        {
          _key: "f_company",
          _type: "formField",
          fieldId: "company",
          label: "Company",
          fieldType: "text",
          placeholder: "Acme Inc.",
          required: true,
          order: 3,
        },
        {
          _key: "f_website",
          _type: "formField",
          fieldId: "websiteUrl",
          label: "Website URL",
          fieldType: "url",
          placeholder: "https://company.com",
          required: false,
          order: 4,
        },
      ],
    },
    {
      _key: "step3",
      _type: "formStep",
      stepTitle: "What's going on?",
      stepDescription:
        "The more context you give us, the better our reply will be.",
      order: 3,
      fields: [
        {
          _key: "f_problem",
          _type: "formField",
          fieldId: "problemStatement",
          label: "What's your biggest growth challenge right now?",
          fieldType: "textarea",
          placeholder:
            "Tell us about the problem you're trying to solve, what you've already tried, and what success looks like...",
          required: true,
          order: 1,
        },
        {
          _key: "f_budget",
          _type: "formField",
          fieldId: "budgetRange",
          label: "What's your investment range?",
          fieldType: "select",
          required: true,
          order: 2,
          options: [
            { _key: "o_u1k", _type: "fieldOption", value: "under-1k", label: "Under $1,000" },
            { _key: "o_1k5k", _type: "fieldOption", value: "1k-5k", label: "$1,000 - $5,000" },
            { _key: "o_5k10k", _type: "fieldOption", value: "5k-10k", label: "$5,000 - $10,000" },
            { _key: "o_10k25k", _type: "fieldOption", value: "10k-25k", label: "$10,000 - $25,000" },
            { _key: "o_25kp", _type: "fieldOption", value: "25k-plus", label: "$25,000+" },
            { _key: "o_unsure", _type: "fieldOption", value: "not-sure", label: "Not sure yet" },
          ],
        },
        {
          _key: "f_timeline",
          _type: "formField",
          fieldId: "timeline",
          label: "When do you need this done?",
          fieldType: "select",
          required: true,
          order: 3,
          options: [
            { _key: "o_asap", _type: "fieldOption", value: "asap", label: "ASAP" },
            { _key: "o_12m", _type: "fieldOption", value: "1-2-months", label: "1-2 months" },
            { _key: "o_36m", _type: "fieldOption", value: "3-6-months", label: "3-6 months" },
            { _key: "o_6pm", _type: "fieldOption", value: "6-plus-months", label: "6+ months" },
            { _key: "o_expl", _type: "fieldOption", value: "just-exploring", label: "Just exploring" },
          ],
        },
      ],
    },
    {
      _key: "step4",
      _type: "formStep",
      stepTitle: "Almost done",
      stepDescription: "How should we reach you?",
      order: 4,
      fields: [
        {
          _key: "f_contact",
          _type: "formField",
          fieldId: "preferredContact",
          label: "Best way to reach you?",
          fieldType: "radio",
          required: true,
          order: 1,
          options: [
            { _key: "o_email", _type: "fieldOption", value: "email", label: "Email" },
            { _key: "o_wa", _type: "fieldOption", value: "whatsapp", label: "WhatsApp" },
            { _key: "o_call", _type: "fieldOption", value: "call", label: "Phone call" },
          ],
        },
        {
          _key: "f_referral",
          _type: "formField",
          fieldId: "referralSource",
          label: "How did you hear about us?",
          fieldType: "select",
          required: false,
          order: 2,
          options: [
            { _key: "o_google", _type: "fieldOption", value: "google", label: "Google search" },
            { _key: "o_social", _type: "fieldOption", value: "social", label: "Social media" },
            { _key: "o_ref", _type: "fieldOption", value: "referral", label: "Referral" },
            { _key: "o_reddit", _type: "fieldOption", value: "reddit", label: "Reddit" },
            { _key: "o_ai", _type: "fieldOption", value: "ai-search", label: "ChatGPT or AI search" },
            { _key: "o_other", _type: "fieldOption", value: "other", label: "Other" },
          ],
        },
        {
          _key: "f_additional",
          _type: "formField",
          fieldId: "additionalContext",
          label: "Anything else we should know?",
          fieldType: "textarea",
          placeholder:
            "Links, deadlines, existing tools, anything that helps us prepare...",
          required: false,
          order: 3,
        },
      ],
    },
  ],
  seoTitle: "Book a Free Consultation | GROWVELOPER",
  seoDescription:
    "Tell us about your growth problem. Four steps, two minutes. We review every submission and reply within 24 hours with a tailored plan.",
};

/* ═══ 2. Start Confirmed Page ═══ */
const startConfirmedPage = {
  _id: "startConfirmedPage",
  _type: "startConfirmedPage",
  headline: "We got it. Here's what happens next.",
  highlightedWord: "next",
  description:
    "Your consultation request is in. Juwon will review your submission and reach out within 24 hours via your preferred contact method.",
  nextSteps: [
    {
      _key: "ns1",
      _type: "nextStep",
      stepNumber: "01",
      title: "We review your submission",
      description:
        "Every detail you shared gets read. We research your company and prepare a tailored agenda before we reach out.",
    },
    {
      _key: "ns2",
      _type: "nextStep",
      stepNumber: "02",
      title: "You hear from us within 24 hours",
      description:
        "We'll contact you via your preferred method with a link to book your free strategy call.",
    },
    {
      _key: "ns3",
      _type: "nextStep",
      stepNumber: "03",
      title: "30-minute strategy call",
      description:
        "A focused conversation to map your growth opportunities, identify bottlenecks, and outline a clear path forward. No pitch. No pressure.",
    },
  ],
  ctaLabel: "Book a time now",
  ctaUrl: process.env.NEXT_PUBLIC_CALCOM_URL || "https://cal.com/growveloper",
  secondaryCtaLabel: "Message on WhatsApp",
  secondaryCtaUrl: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`
    : "",
  seoTitle: "Consultation Request Received | GROWVELOPER",
  seoDescription:
    "Your consultation request has been received. Here is what happens next.",
};

/* ═══ 3. Audit Confirmed Page ═══ */
const auditConfirmedPage = {
  _id: "auditConfirmedPage",
  _type: "auditConfirmedPage",
  headline: "Your audit is booked.",
  highlightedWord: "booked",
  description:
    "Payment confirmed. Complete the intake form below so we know exactly where to focus. The more detail you give, the sharper the audit.",
  intakeCtaLabel: "Complete the intake form",
  intakeCtaUrl: process.env.NEXT_PUBLIC_AUDIT_INTAKE_URL || "#",
  nextSteps: [
    {
      _key: "ns1",
      _type: "nextStep",
      stepNumber: "01",
      title: "Complete the intake form",
      description:
        "A short form covering your website, goals, and current tools. Takes about 5 minutes. This directly shapes what we audit and what we prioritize.",
    },
    {
      _key: "ns2",
      _type: "nextStep",
      stepNumber: "02",
      title: "We audit your digital presence",
      description:
        "Your full audit package arrives within 2 weeks: a 25-40 page PDF report, a Loom video walkthrough of every finding, and a prioritized 30-60-90 day roadmap.",
    },
    {
      _key: "ns3",
      _type: "nextStep",
      stepNumber: "03",
      title: "Live walkthrough call",
      description:
        "We go through every finding together on a 60-minute call. Ask questions, challenge recommendations, and leave with a clear action plan.",
    },
  ],
  calendarCtaLabel: "Book your walkthrough call",
  calendarCtaUrl:
    process.env.NEXT_PUBLIC_CALCOM_URL || "https://cal.com/growveloper",
  seoTitle: "Audit Confirmed | GROWVELOPER",
  seoDescription:
    "Your growth audit is booked. Complete the intake form and we will get started.",
};

/* ═══ Run ═══ */
async function seed() {
  const tx = client.transaction();
  tx.createOrReplace(startPage);
  tx.createOrReplace(startConfirmedPage);
  tx.createOrReplace(auditConfirmedPage);

  const result = await tx.commit();
  console.log(`Seeded 3 documents (tx: ${result.transactionId})`);
  console.log("  - startPage");
  console.log("  - startConfirmedPage");
  console.log("  - auditConfirmedPage");
  console.log("\nAll content is now editable in Sanity Studio.");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
