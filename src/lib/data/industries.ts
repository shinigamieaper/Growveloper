import type {
  IndustryPageData,
  IndustryCardData,
  CTABannerData,
  FAQItem,
  StatsBandItem,
  TestimonialData,
} from "@/lib/types";

/* ─── Industry card list (matches homepage IndustriesGrid) ─── */
export const ALL_INDUSTRY_CARDS: IndustryCardData[] = [
  { icon: "rocket", name: "SaaS", hookLine: "Ship faster, convert more, retain longer.", slug: "saas" },
  { icon: "target", name: "B2B Lead Gen", hookLine: "Fill your pipeline with qualified leads on autopilot.", slug: "b2b" },
  { icon: "cpu", name: "AI & Tech Startups", hookLine: "Technical builds that match your ambition.", slug: "ai-tech" },
  { icon: "landmark", name: "FinTech", hookLine: "Compliant, fast, and built for trust.", slug: "fintech" },
];

/* ─── SaaS ─── */
const SAAS: IndustryPageData = {
  icon: "rocket",
  name: "SaaS",
  hookLine: "Ship faster, convert more, retain longer.",
  slug: "saas",
  heroHeadline: "The growth stack SaaS founders actually need",
  heroHighlightedWord: "growth stack",
  heroSubStatement:
    "From trial onboarding to paid conversion — engineering and marketing working as one system, not two separate teams.",
  primaryCtaLabel: "Book a free consultation",
  primaryCtaUrl: "/start",
  painPoints: [
    "Trial-to-paid conversion stuck below 10% with no clear path to improvement",
    "Engineering and marketing operate as silos — tech decisions made without understanding the growth implications",
    "Attribution is broken — you can't tell which channels actually drive paying customers",
    "Onboarding flow is leaking users before they reach the \u2018aha moment\u2019",
    "Reporting is manual, delayed, and inconsistent — decisions are always made on stale data",
    "Churn is climbing but you don\u2019t have the instrumentation to know why",
  ],
  serviceCards: [
    {
      title: "Product-Led Growth Engineering",
      description:
        "Onboarding flows, in-app activation sequences, and feature gates built to drive conversion — not just to ship code.",
      link: "/services/development",
    },
    {
      title: "Full-Funnel Marketing",
      description:
        "Paid acquisition, content, and retention campaigns that feed off your product data — not disconnected from it.",
      link: "/services/marketing",
    },
    {
      title: "Automation & Analytics Infrastructure",
      description:
        "The reporting pipelines, attribution models, and automated workflows that turn your data into decisions.",
      link: "/services/ai",
    },
  ],
  outcomeStats: [
    { value: 19, suffix: "%", label: "Trial-to-paid conversion (vs 8% baseline)" },
    { value: 55, suffix: "%", label: "Reduction in onboarding support tickets" },
    { value: 18, suffix: "h", label: "Recovered per week from automated reporting" },
    { value: 3, suffix: "x", label: "Faster exec decision velocity" },
  ],
  caseStudySlugs: ["saas-reporting-pipeline", "saas-onboarding-redesign"],
  testimonials: [
    {
      quote:
        "Monday mornings used to be a scramble. Now I wake up to a clean summary in my inbox with everything I need to make decisions before standup.",
      name: "Priya Sharma",
      role: "CEO",
      company: "MetricLoop",
      rating: 5,
      industry: "SaaS",
    },
    {
      quote:
        "We close more deals with fewer people now. They fundamentally changed how our sales team operates.",
      name: "Alex Rivera",
      role: "Head of Sales",
      company: "FormFlow",
      rating: 5,
      industry: "SaaS",
    },
  ] satisfies TestimonialData[],
  faq: [
    {
      question: "Do you work with early-stage SaaS or only established products?",
      answer:
        "Both. Early-stage founders benefit most from getting the instrumentation right from day one — no bad data to undo later. Established products often have the opposite problem: plenty of data, unclear how to act on it. We\u2019ve worked across both stages and adapt our approach accordingly.",
    },
    {
      question: "How do you improve trial-to-paid conversion without a full redesign?",
      answer:
        "We start with funnel analysis and session recording to identify the exact drop-off points. Usually it\u2019s not the design — it\u2019s the flow logic. We audit the onboarding steps, identify where users fail to reach the \u2018aha moment\u2019, and make surgical changes that move the needle without requiring a six-week rebuild.",
    },
    {
      question: "Can you help with both the product and the marketing side?",
      answer:
        "Yes — that\u2019s the core of what we do. Most agencies are either a dev shop or a marketing agency. We work across both because growth in SaaS depends on them operating as one system. Tech stack decisions affect what you can measure. What you can measure affects where you invest.",
    },
    {
      question: "How long before we see results?",
      answer:
        "Quick wins like reporting automation and attribution fixes typically show results within two to four weeks. Structural improvements like onboarding redesigns and conversion optimisation take six to twelve weeks to reach statistical significance. We\u2019re transparent about timelines before any work starts.",
    },
    {
      question: "Do you charge retainer or project-based?",
      answer:
        "Both structures are available depending on the scope. Short, defined projects are scoped and priced upfront. Ongoing growth partnerships run as monthly retainers with clear deliverables and targets. We don\u2019t do open-ended retainers with vague outputs.",
    },
  ] satisfies FAQItem[],
};

/* ─── B2B Lead Gen ─── */
const B2B: IndustryPageData = {
  icon: "target",
  name: "B2B Lead Gen",
  hookLine: "Fill your pipeline with qualified leads on autopilot.",
  slug: "b2b",
  heroHeadline: "A qualified pipeline that runs while you sleep",
  heroHighlightedWord: "pipeline",
  heroSubStatement:
    "Lead qualification, routing, and follow-up — automated to the point where your sales team only speaks to prospects who are already interested.",
  primaryCtaLabel: "Book a free consultation",
  primaryCtaUrl: "/start",
  painPoints: [
    "Sales team spending 3+ hours a day manually qualifying and routing inbound leads",
    "First contact takes 4+ hours — by which time prospects have already spoken to a competitor",
    "No consistent lead scoring — gut feel decides who gets followed up",
    "CRM data is incomplete, duplicated, and impossible to report from accurately",
    "Marketing campaigns running without knowing which ones actually produce closed deals",
    "High-value leads falling through the cracks in a shared inbox",
  ],
  serviceCards: [
    {
      title: "Lead Automation Infrastructure",
      description:
        "Qualification scoring, intelligent routing, and automated follow-up sequences — built to get the right lead to the right person in under 5 minutes.",
      link: "/services/ai",
    },
    {
      title: "Paid Acquisition & Attribution",
      description:
        "Google and Meta campaigns built on first-party data, with attribution that shows which channels produce closed deals — not just leads.",
      link: "/services/marketing",
    },
    {
      title: "CRM Infrastructure",
      description:
        "Data enrichment, deduplication, and reporting pipelines that make your CRM a source of truth, not a data graveyard.",
      link: "/services/development",
    },
  ],
  outcomeStats: [
    { value: 4, label: "Minutes to first contact (vs 4-hour average)" },
    { value: 340, suffix: "%", label: "Increase in leads processed per week" },
    { value: 0, label: "Headcount added to achieve it" },
    { value: 18, prefix: "\u00a3", suffix: "k", label: "Additional pipeline value per month" },
  ],
  caseStudySlugs: ["ecommerce-lead-automation"],
  testimonials: [
    {
      quote:
        "They didn\u2019t just speed things up \u2014 they fundamentally changed how our sales team operates. We close more deals with fewer people now.",
      name: "Alex Rivera",
      role: "Head of Sales",
      company: "FormFlow",
      rating: 5,
      industry: "B2B",
    },
    {
      quote:
        "They didn\u2019t just build a website \u2014 they built a growth machine. Our leads tripled in two months.",
      name: "Sarah Chen",
      role: "CEO",
      company: "TechFlow",
      rating: 5,
      industry: "B2B",
    },
  ] satisfies TestimonialData[],
  faq: [
    {
      question: "How fast can a lead qualification system be set up?",
      answer:
        "A basic qualification and routing system can typically be live within 2 weeks. More complex setups involving CRM integration, enrichment APIs, and multi-step sequences take 4\u20136 weeks. We always deliver a working version first, then iterate.",
    },
    {
      question: "Do you integrate with our existing CRM?",
      answer:
        "Yes. We\u2019ve integrated with HubSpot, Salesforce, Pipedrive, and custom CRM setups. If your CRM has an API, we can connect to it. We also handle data migration and deduplication as part of the setup.",
    },
    {
      question: "Can you improve attribution for our existing campaigns?",
      answer:
        "Yes. We audit your current tracking, identify what\u2019s broken or missing, and rebuild the attribution infrastructure from the ground up. This includes UTM parameter standardisation, server-side tagging, and a reporting model that connects ad spend to closed deals.",
    },
    {
      question: "What\u2019s your approach to lead scoring?",
      answer:
        "We start by analysing your last 100\u2013200 closed deals and identifying the signals that distinguished them from non-converters. From there we build a weighted scoring model calibrated to your specific data. It\u2019s not a generic template \u2014 it\u2019s calibrated to how your customers actually buy.",
    },
  ] satisfies FAQItem[],
};

/* ─── AI & Tech Startups ─── */
const AI_TECH: IndustryPageData = {
  icon: "cpu",
  name: "AI & Tech Startups",
  hookLine: "Technical builds that match your ambition.",
  slug: "ai-tech",
  heroHeadline: "For startups where the tech is the product",
  heroHighlightedWord: "tech is the product",
  heroSubStatement:
    "Engineering built for AI-native companies — from model integration and inference infrastructure to the growth systems that get it in front of the right people.",
  primaryCtaLabel: "Book a free consultation",
  primaryCtaUrl: "/start",
  painPoints: [
    "Inference costs climbing faster than revenue — no strategy for efficient model usage",
    "Prototype is impressive but production infrastructure doesn\u2019t exist yet",
    "Users churn before understanding the product\u2019s core value",
    "No reliable attribution — can\u2019t track which content or channels actually drive signups",
    "Competing with well-funded companies who have 10x your marketing budget",
    "Engineering and go-to-market teams working in parallel with no shared language",
  ],
  serviceCards: [
    {
      title: "AI Infrastructure & Integration",
      description:
        "Model integration, prompt engineering, inference optimisation, and the production architecture to run AI features reliably at scale.",
      link: "/services/ai",
    },
    {
      title: "Developer-Focused Marketing",
      description:
        "Content, community, and paid strategies built for technical audiences \u2014 founders who understand that developers aren\u2019t moved by generic marketing.",
      link: "/services/marketing",
    },
    {
      title: "Product Analytics & Activation",
      description:
        "Instrumentation, activation flows, and reporting that shows you exactly which features drive retention and which ones users ignore.",
      link: "/services/development",
    },
  ],
  outcomeStats: [
    { value: 62, suffix: "%", label: "Reduction in time to activation" },
    { value: 47, suffix: "%", label: "Lift in trial-to-paid conversion" },
    { value: 34, label: "Landing pages created without developer tickets" },
    { value: 98, label: "Average Lighthouse performance score" },
  ],
  caseStudySlugs: ["ai-customer-support-triage", "fintech-landing-page-system"],
  testimonials: [
    {
      quote:
        "The speed difference alone paid for the project. Our Lighthouse score went from 34 to 100.",
      name: "Marcus Johnson",
      role: "CTO",
      company: "Roommaster",
      rating: 5,
      industry: "AI & Tech",
    },
    {
      quote:
        "We were burning \u00a312k a month on campaigns that were actually losing money. We had no idea until they rebuilt our tracking.",
      name: "Marcus Johnson",
      role: "CTO",
      company: "Roommaster",
      rating: 5,
      industry: "AI & Tech",
    },
  ] satisfies TestimonialData[],
  faq: [
    {
      question: "Do you work with AI startups that are pre-revenue?",
      answer:
        "Yes, as long as the product is in a testable state. Pre-revenue is often the best time to get the instrumentation and activation flows right — it\u2019s far cheaper to fix these before you\u2019re running paid acquisition than after.",
    },
    {
      question: "Can you help with AI feature integration into an existing product?",
      answer:
        "Yes. We\u2019ve integrated OpenAI, Anthropic, and open-source models into production Next.js applications. This includes prompt design, streaming UI, context management, error handling, and cost monitoring \u2014 not just the API call.",
    },
    {
      question: "How do you market to technical audiences?",
      answer:
        "Technical audiences are sceptical of vague marketing. What works is specificity: concrete examples, real numbers, working demos, and content that respects their intelligence. We build content and campaigns that lead with depth, not buzzwords.",
    },
    {
      question: "Can you help us position against better-funded competitors?",
      answer:
        "Yes. Positioning is often where technical founders under-invest. We help identify the specific use cases where your product genuinely outperforms the incumbents and build the marketing system around those wins rather than trying to compete on breadth.",
    },
  ] satisfies FAQItem[],
};

/* ─── FinTech ─── */
const FINTECH: IndustryPageData = {
  icon: "landmark",
  name: "FinTech",
  hookLine: "Compliant, fast, and built for trust.",
  slug: "fintech",
  heroHeadline: "FinTech products built to convert and comply",
  heroHighlightedWord: "convert and comply",
  heroSubStatement:
    "Development that understands regulated environments, paired with marketing that builds the trust fast-moving FinTech products need to close deals.",
  primaryCtaLabel: "Book a free consultation",
  primaryCtaUrl: "/start",
  painPoints: [
    "Compliance requirements slowing down development cycles with no clear framework to manage them",
    "Landing pages look dated and don\u2019t instil the trust that financial products require",
    "Sales cycle is long — marketing doesn\u2019t give prospects the tools to make the case internally",
    "Can\u2019t move fast enough with paid advertising while waiting for compliance sign-off",
    "No scalable landing page system — every campaign requires a developer ticket",
    "Attribution is poor — can\u2019t trace which campaigns produce qualified financial prospects",
  ],
  serviceCards: [
    {
      title: "Trust-First Engineering",
      description:
        "Performance-optimised, accessible, and security-conscious builds that pass compliance review without sacrificing speed to market.",
      link: "/services/development",
    },
    {
      title: "Financial Services Marketing",
      description:
        "Campaigns and content built around trust signals, compliance-friendly messaging, and the longer sales cycles that financial products require.",
      link: "/services/marketing",
    },
    {
      title: "Scalable Landing Page Systems",
      description:
        "A modular CMS-driven page system that lets your marketing team create campaign pages without developer involvement \u2014 legally reviewed templates, reusable components.",
      link: "/services/development",
    },
  ],
  outcomeStats: [
    { value: 2, label: "Hours to create a new landing page (vs 2 weeks)" },
    { value: 34, suffix: "%", label: "Improvement in paid conversion rates" },
    { value: 98, label: "Average Lighthouse score across all pages" },
    { value: 30, label: "Active campaign pages with zero developer tickets" },
  ],
  caseStudySlugs: ["fintech-landing-page-system", "growth-marketing-overhaul"],
  testimonials: [
    {
      quote:
        "We were burning \u00a312k a month on campaigns that were actually losing money. We had no idea until they rebuilt our tracking. The ROI on this project was insane.",
      name: "Marcus Johnson",
      role: "CTO",
      company: "Roommaster",
      rating: 5,
      industry: "FinTech",
    },
  ] satisfies TestimonialData[],
  faq: [
    {
      question: "Do you have experience with regulated financial products?",
      answer:
        "Yes. We\u2019ve built for clients in regulated environments and understand the constraints around claims, disclaimers, data handling, and approval workflows. We work within your compliance framework, not around it.",
    },
    {
      question: "How do you handle trust signals for FinTech marketing?",
      answer:
        "Trust signals in FinTech are specific: regulatory badges, security certifications, transparent pricing, client case studies with real numbers. We build these into the design and copy from the start \u2014 they\u2019re not an afterthought.",
    },
    {
      question: "Can you build a landing page system our marketing team can manage?",
      answer:
        "Yes. We\u2019ve built modular landing page systems using Next.js and Sanity CMS where marketing teams create and publish pages without any developer involvement. Templates are pre-approved for compliance \u2014 the team fills in the content, not the structure.",
    },
    {
      question: "How fast can you turn around a new campaign page?",
      answer:
        "With a page system in place, your marketing team can create a new landing page in 2\u20133 hours. Initial system setup takes 4\u20136 weeks. After that, it scales indefinitely without engineering resources.",
    },
    {
      question: "Do you work on a project or retainer basis?",
      answer:
        "Both. One-time projects like a landing page system or attribution rebuild are scoped and priced upfront. Ongoing partnerships for paid acquisition management and content run as monthly retainers with agreed deliverables.",
    },
  ] satisfies FAQItem[],
};

/* ─── Exports ─── */

export const ALL_INDUSTRIES: IndustryPageData[] = [SAAS, B2B, AI_TECH, FINTECH];

export function getIndustryBySlug(slug: string): IndustryPageData | null {
  return ALL_INDUSTRIES.find((i) => i.slug === slug) ?? null;
}

export const INDUSTRY_CTA_SECTION: CTABannerData = {
  headline: "Don\u2019t see your industry? Let\u2019s talk.",
  highlightedWord: "Let\u2019s talk",
  ctaLabel: "Book a free consultation",
  ctaDestination: "/start",
};