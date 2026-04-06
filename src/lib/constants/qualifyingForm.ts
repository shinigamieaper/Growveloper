/* ============================================================
   QualifyingForm — Hardcoded fallback constants
   Used when Sanity CMS config fetch fails or is unavailable.
   ============================================================ */
import type { FormStep } from "@/lib/types";

export const SERVICE_OPTIONS = [
  { value: "development", label: "Web Development" },
  { value: "marketing", label: "Growth Marketing" },
  { value: "ai", label: "AI & Automation" },
  { value: "audit", label: "Growth Audit" },
] as const;

export const BUDGET_RANGES = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-5k", label: "$1,000 – $5,000" },
  { value: "5k-10k", label: "$5,000 – $10,000" },
  { value: "10k-25k", label: "$10,000 – $25,000" },
  { value: "25k-plus", label: "$25,000+" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP" },
  { value: "1-2-months", label: "1–2 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "6-plus-months", label: "6+ months" },
  { value: "just-exploring", label: "Just exploring" },
] as const;

export const CONTACT_METHODS = [
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "call", label: "Phone call" },
] as const;

export const FALLBACK_FORM_STEPS: FormStep[] = [
  {
    stepTitle: "About You",
    stepDescription: "Tell us who you are",
    order: 1,
    fields: [
      { fieldId: "name", label: "Full name", fieldType: "text", placeholder: "Jane Smith", required: true, order: 1 },
      { fieldId: "email", label: "Email", fieldType: "email", placeholder: "jane@company.com", required: true, order: 2 },
      { fieldId: "company", label: "Company", fieldType: "text", placeholder: "Acme Inc.", required: true, order: 3 },
      { fieldId: "websiteUrl", label: "Website URL", fieldType: "url", placeholder: "https://company.com", required: false, order: 4 },
    ],
  },
  {
    stepTitle: "What You Need",
    stepDescription: "Select the services you're interested in",
    order: 2,
    fields: [
      {
        fieldId: "servicesInterested",
        label: "Which services are you interested in?",
        fieldType: "multiselect",
        required: true,
        order: 1,
        options: SERVICE_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
      },
    ],
  },
  {
    stepTitle: "Your Situation",
    stepDescription: "Describe your current challenge",
    order: 3,
    fields: [
      {
        fieldId: "problemStatement",
        label: "What's your biggest growth challenge right now?",
        fieldType: "textarea",
        placeholder: "Tell us about the problem you're trying to solve, what you've already tried, and what success looks like...",
        required: true,
        order: 1,
      },
      {
        fieldId: "budgetRange",
        label: "Budget range",
        fieldType: "select",
        required: true,
        order: 2,
        options: BUDGET_RANGES.map((o) => ({ value: o.value, label: o.label })),
      },
      {
        fieldId: "timeline",
        label: "Timeline",
        fieldType: "select",
        required: true,
        order: 3,
        options: TIMELINE_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
      },
    ],
  },
  {
    stepTitle: "Confirm",
    stepDescription: "How should we reach you?",
    order: 4,
    fields: [
      {
        fieldId: "preferredContact",
        label: "How should we reach you?",
        fieldType: "radio",
        required: true,
        order: 1,
        options: CONTACT_METHODS.map((o) => ({ value: o.value, label: o.label })),
      },
      {
        fieldId: "additionalContext",
        label: "Anything else we should know?",
        fieldType: "textarea",
        placeholder: "Links, deadlines, existing tools, anything that helps us prepare...",
        required: false,
        order: 2,
      },
    ],
  },
];
