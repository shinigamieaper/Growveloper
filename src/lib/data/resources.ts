import type { ResourcePageData, ResourceCardData, CTABannerData } from "@/lib/types";

/* ─── Hero ─── */
export const RESOURCES_HEADLINE = "Resources";
export const RESOURCES_HIGHLIGHTED_WORD = "Resources";
export const RESOURCES_DESCRIPTION =
  "Guides, templates, frameworks, and playbooks for founders who build and market.";

/* ─── Categories ─── */
export const RESOURCE_CATEGORIES = ["Marketing", "Development", "Automation"];

/* ─── Content ─── */

const RESOURCE_1: ResourcePageData = {
  title: "The Landing Page Conversion Checklist",
  slug: "landing-page-conversion-checklist",
  description:
    "A battle-tested 42-point checklist covering headline clarity, CTA placement, trust signals, and load speed — everything that moves the needle.",
  resourceType: "Guide",
  category: "Marketing",
  accessType: "free",
  coverImage:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop",
  featuredToggle: true,
  fileUrl: "/downloads/landing-page-conversion-checklist.pdf",
  publishedAt: "2024-11-10",
  whatItIs:
    "A 42-point checklist built from auditing over 80 landing pages across e-commerce, SaaS, and lead-gen. It covers every layer — from headline to footer — so you never ship a page that leaves conversion on the table.",
  whatsIncluded: [
    "42-point checklist across 6 conversion categories",
    "Scoring rubric to prioritise fixes by impact",
    "CTA copywriting principles with real examples",
    "Trust signal placement guide",
    "Mobile-first checklist variant",
    "PDF format, print-ready",
  ],
  whoItIsFor: [
    "Founders building their first landing page",
    "Marketers auditing existing pages for quick wins",
    "Developers who want a marketing lens on their builds",
    "Anyone spending money on paid traffic",
  ],
  showPreview: false,
};

const RESOURCE_2: ResourcePageData = {
  title: "GA4 Attribution Setup Template",
  slug: "ga4-attribution-setup-template",
  description:
    "A ready-to-import Google Analytics 4 configuration with custom events, conversion goals, and UTM tracking built in.",
  resourceType: "Template",
  category: "Marketing",
  accessType: "free",
  coverImage:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop",
  featuredToggle: false,
  fileUrl: "/downloads/ga4-attribution-setup-template.pdf",
  publishedAt: "2024-10-20",
  whatItIs:
    "A plug-and-play GA4 configuration template that gives you proper attribution from day one. Built to surface the data points that actually drive decisions — not vanity metrics.",
  whatsIncluded: [
    "GA4 property setup checklist",
    "Custom event taxonomy (30 pre-mapped events)",
    "UTM parameter naming convention guide",
    "Conversion goal configuration walkthrough",
    "Looker Studio dashboard template link",
  ],
  whoItIsFor: [
    "Founders setting up analytics for the first time",
    "Marketers migrating from Universal Analytics",
    "Agencies onboarding new clients",
  ],
  showPreview: false,
};

const RESOURCE_3: ResourcePageData = {
  title: "Full-Stack Marketing Playbook",
  slug: "full-stack-marketing-playbook",
  description:
    "The complete system for treating development and marketing as one integrated growth engine — from tech stack decisions to attribution modelling.",
  resourceType: "Playbook",
  category: "Marketing",
  accessType: "paid",
  priceUSD: 49,
  coverImage:
    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=675&fit=crop",
  featuredToggle: false,
  publishedAt: "2024-09-15",
  whatItIs:
    "A 60-page playbook distilling five years of building and marketing digital products. It covers the mental models, frameworks, and tactical decisions that separate fast-growing products from technically solid ones that never scale.",
  whatsIncluded: [
    "60-page PDF playbook",
    "Tech stack decision framework (with marketing implications)",
    "Full-funnel attribution architecture guide",
    "Campaign structure templates for Google and Meta",
    "CRO hypothesis prioritisation framework",
    "Real case study walkthroughs (3 anonymised clients)",
  ],
  whoItIsFor: [
    "Founders who want to own both growth and product decisions",
    "Developers moving into growth or product roles",
    "Marketers who want to speak the language of engineering",
    "Small agency founders building scalable delivery systems",
  ],
  showPreview: false,
};

const RESOURCE_4: ResourcePageData = {
  title: "CRO Funnel Blueprint",
  slug: "cro-funnel-blueprint",
  description:
    "A systematic framework for diagnosing and fixing conversion drop-offs at every stage of your funnel — awareness to purchase.",
  resourceType: "Framework",
  category: "Marketing",
  accessType: "paid",
  priceUSD: 59,
  coverImage:
    "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=1200&h=675&fit=crop",
  featuredToggle: false,
  publishedAt: "2024-08-30",
  whatItIs:
    "A step-by-step CRO framework built from running conversion audits for 12+ clients. It gives you a repeatable process for identifying where people drop off, forming hypotheses, prioritising tests, and reading results correctly.",
  whatsIncluded: [
    "5-stage funnel diagnostic framework",
    "Drop-off analysis templates for each stage",
    "CRO hypothesis bank (40 pre-written hypotheses)",
    "A/B test prioritisation scoring model",
    "Statistical significance calculator (Google Sheets)",
    "Results interpretation guide",
  ],
  whoItIsFor: [
    "Growth marketers running paid acquisition",
    "Founders with traffic but low conversion rates",
    "Product teams iterating on onboarding flows",
  ],
  showPreview: false,
};

const RESOURCE_5: ResourcePageData = {
  title: "Next.js Performance Audit Framework",
  slug: "nextjs-performance-audit-framework",
  description:
    "A structured audit process for diagnosing Core Web Vitals issues in Next.js apps — with fixes prioritised by engineering effort vs. user impact.",
  resourceType: "Framework",
  category: "Development",
  accessType: "paid",
  priceUSD: 29,
  coverImage:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=675&fit=crop",
  featuredToggle: false,
  publishedAt: "2024-10-05",
  whatItIs:
    "A repeatable audit framework for Next.js performance, built from running Lighthouse audits and Core Web Vitals investigations across 20+ production applications. Covers LCP, CLS, INP, and TTFB with actionable fixes for each.",
  whatsIncluded: [
    "Core Web Vitals audit checklist (LCP, CLS, INP, TTFB)",
    "Next.js-specific performance patterns and anti-patterns",
    "Image optimisation decision tree",
    "Font loading strategy guide",
    "Bundle analysis walkthrough (with webpack-bundle-analyzer)",
    "Fix prioritisation matrix",
  ],
  whoItIsFor: [
    "Next.js developers optimising for production",
    "Agencies delivering performance-sensitive client projects",
    "Founders whose SEO is affected by Core Web Vitals",
  ],
  showPreview: false,
};

const RESOURCE_6: ResourcePageData = {
  title: "Component Architecture Guide",
  slug: "component-architecture-guide",
  description:
    "A practical guide to structuring React component libraries for teams — covering naming conventions, composition patterns, and prop API design.",
  resourceType: "Guide",
  category: "Development",
  accessType: "free",
  coverImage:
    "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&h=675&fit=crop",
  featuredToggle: false,
  fileUrl: "/downloads/component-architecture-guide.pdf",
  publishedAt: "2024-09-28",
  whatItIs:
    "A guide to building component libraries that don\u2019t collapse under their own weight. Covers the decisions that matter most: when to split, how to name, what to expose via props, and how to avoid coupling.",
  whatsIncluded: [
    "Component splitting decision framework",
    "Naming convention guide (with real examples)",
    "Prop API design principles",
    "Composition vs. configuration trade-off analysis",
    "Folder structure templates for small and large teams",
  ],
  whoItIsFor: [
    "Frontend developers building shared component libraries",
    "Tech leads setting architecture standards",
    "Solo founders who want their codebase to stay clean as it grows",
  ],
  showPreview: false,
};

const RESOURCE_7: ResourcePageData = {
  title: "Automation ROI Calculator",
  slug: "automation-roi-calculator",
  description:
    "A Google Sheets template for calculating the real return on automating any business process — hours saved, error reduction, and payback period.",
  resourceType: "Template",
  category: "Automation",
  accessType: "free",
  coverImage:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop",
  featuredToggle: false,
  fileUrl: "/downloads/automation-roi-calculator.pdf",
  publishedAt: "2024-11-02",
  whatItIs:
    "A Google Sheets calculator that quantifies the ROI of any automation project before you build it. Input your current process costs, estimated automation build time, and error rates \u2014 it outputs time-to-ROI and annual savings.",
  whatsIncluded: [
    "Google Sheets ROI calculator (copy to your Drive)",
    "Process cost estimation worksheet",
    "Error rate and rework cost modelling",
    "Build cost estimation guide",
    "Payback period and 3-year projection charts",
  ],
  whoItIsFor: [
    "Founders evaluating automation investments",
    "Operations managers building business cases",
    "Consultants scoping automation projects for clients",
  ],
  showPreview: false,
};

const RESOURCE_8: ResourcePageData = {
  title: "The n8n Workflow Library",
  slug: "n8n-workflow-library",
  description:
    "15 production-ready n8n workflow templates covering lead routing, reporting, CRM sync, and content distribution \u2014 import and run in minutes.",
  resourceType: "Playbook",
  category: "Automation",
  accessType: "paid",
  priceUSD: 39,
  coverImage:
    "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&h=675&fit=crop",
  featuredToggle: false,
  publishedAt: "2024-10-15",
  whatItIs:
    "A library of 15 battle-tested n8n workflows built for real client use cases. Each template is fully documented, import-ready, and comes with setup instructions and customisation notes.",
  whatsIncluded: [
    "15 import-ready n8n workflow JSON files",
    "Lead qualification and routing workflow",
    "CRM sync automation (HubSpot + Notion)",
    "Weekly reporting digest workflow",
    "Social media content distribution workflow",
    "Setup and customisation guide for each workflow",
  ],
  whoItIsFor: [
    "Founders who already use or want to use n8n",
    "Agencies building automation deliverables for clients",
    "Operations teams looking for fast wins",
    "Anyone who wants production-quality automation without building from scratch",
  ],
  showPreview: false,
};

export const RESOURCES: ResourcePageData[] = [
  RESOURCE_1,
  RESOURCE_2,
  RESOURCE_3,
  RESOURCE_4,
  RESOURCE_5,
  RESOURCE_6,
  RESOURCE_7,
  RESOURCE_8,
];

export function getResourceBySlug(slug: string): ResourcePageData | null {
  return RESOURCES.find((r) => r.slug === slug) ?? null;
}

export function getRelatedResources(
  resource: ResourcePageData,
  limit = 3
): ResourceCardData[] {
  return RESOURCES.filter(
    (r) => r.category === resource.category && r.slug !== resource.slug
  ).slice(0, limit);
}

/* ─── Newsletter ─── */
export const RESOURCES_NEWSLETTER = {
  headline: "Get new resources first",
  highlightedWord: "first",
  subCopy: "New guides, templates, and frameworks — straight to your inbox.",
  ctaLabel: "Subscribe",
};

/* ─── CTAs ─── */

// Inline CTA — mid-page, after category sections
export const RESOURCES_CTA_INLINE: CTABannerData = {
  headline: "Need something custom built?",
  highlightedWord: "custom built",
  ctaLabel: "Talk to me",
  ctaDestination: "/start",
};

// Section CTA — end of page
export const RESOURCES_CTA_SECTION: CTABannerData = {
  headline: "Ready to build something that compounds?",
  highlightedWord: "compounds",
  ctaLabel: "Start a project",
  ctaDestination: "/start",
};
