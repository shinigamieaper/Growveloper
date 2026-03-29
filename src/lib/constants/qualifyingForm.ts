/* ============================================================
   QualifyingForm — Hardcoded fallback constants
   Used when Sanity CMS config fetch fails or is unavailable.
   ============================================================ */

export const SERVICE_OPTIONS = [
  { value: "development", label: "Web Development" },
  { value: "marketing", label: "Growth Marketing" },
  { value: "ai", label: "AI & Automation" },
  { value: "audit", label: "Growth Audit" },
] as const;

export const BUDGET_RANGES = [
  { value: "under-5k", label: "Under £5,000" },
  { value: "5k-10k", label: "£5,000 – £10,000" },
  { value: "10k-25k", label: "£10,000 – £25,000" },
  { value: "25k-50k", label: "£25,000 – £50,000" },
  { value: "50k-plus", label: "£50,000+" },
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

export const STEP_META = [
  { title: "About You", description: "Tell us who you are" },
  { title: "What You Need", description: "Select the services you're interested in" },
  { title: "Your Situation", description: "Describe your current challenge" },
  { title: "Confirm", description: "How should we reach you?" },
] as const;
