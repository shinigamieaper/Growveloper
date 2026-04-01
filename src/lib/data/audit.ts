import type {
  AuditHeroData,
  AuditQualifierData,
  AuditScopeData,
  AuditDeliverablesData,
  AuditProcessData,
  AuditFindingsData,
  AuditPricingData,
  FAQItem,
  CTABannerData,
  CaseStudyCardData,
  TestimonialData,
  IndustriesGridData,
} from "@/lib/types";

export const AUDIT_HERO: AuditHeroData = {
  headline: "Find out what\u2019s holding your business back",
  highlightedWord: "holding",
  price: "$500",
  priceLabel: "From",
  subStatement:
    "A comprehensive audit of your development, marketing, and AI infrastructure \u2014 with a clear roadmap to fix it.",
  primaryCtaLabel: "Get the Audit",
  primaryCtaUrl: "/audit#pricing",
  secondaryCtaText: "Not sure? Book a free consultation first.",
  secondaryCtaUrl: "/start",
};

export const AUDIT_QUALIFIERS: AuditQualifierData = {
  headline: "This is for you if\u2026",
  highlightedWord: "you",
  qualifiers: [
    "You have a website or app that isn\u2019t converting the way it should",
    "You\u2019re spending on ads but can\u2019t tell what\u2019s working",
    "You know AI could help but don\u2019t know where to start",
    "You\u2019ve outgrown your current tech stack",
    "You want an unbiased, expert review before making big decisions",
  ],
};

export const AUDIT_SCOPE: AuditScopeData = {
  headline: "What we look at",
  highlightedWord: "look",
  description:
    "This isn\u2019t a single-discipline review. We audit your entire digital operation across three pillars.",
  columns: [
    {
      icon: "code",
      heading: "Development Review",
      bullets: [
        "Codebase architecture & tech debt",
        "Performance & Core Web Vitals",
        "Security vulnerabilities",
        "Scalability bottlenecks",
      ],
      lottiePath: "/lottie/Web Development.lottie",
    },
    {
      icon: "trending-up",
      heading: "Marketing Review",
      bullets: [
        "SEO & organic visibility",
        "Paid campaign efficiency",
        "Conversion funnel analysis",
        "Analytics & tracking setup",
      ],
      lottiePath: "/lottie/Digital Marketing.lottie",
    },
    {
      icon: "bot",
      heading: "AI & Automation Review",
      bullets: [
        "Automation opportunities",
        "AI integration readiness",
        "Workflow inefficiencies",
        "Tool stack evaluation",
      ],
      lottiePath: "/lottie/Chat Bot.lottie",
    },
  ],
};

export const AUDIT_DELIVERABLES: AuditDeliverablesData = {
  headline: "What you get",
  highlightedWord: "get",
  deliverables: [
    {
      icon: "file-text",
      title: "Diagnosis Document",
      description:
        "A detailed breakdown of every issue found across development, marketing, and AI.",
    },
    {
      icon: "presentation",
      title: "Strategy Deck",
      description:
        "Prioritised recommendations with effort vs. impact scoring for each fix.",
    },
    {
      icon: "video",
      title: "Loom Video Walkthrough",
      description:
        "A recorded walkthrough of every finding so you can share it with your team.",
    },
    {
      icon: "map",
      title: "Notion Roadmap",
      description:
        "A ready-to-use project board with tasks, priorities, and timelines.",
    },
  ],
};

export const AUDIT_PROCESS: AuditProcessData = {
  headline: "How it works",
  highlightedWord: "works",
  steps: [
    {
      stepNumber: "01",
      title: "Pay & Complete Intake Form",
      description:
        "Secure your spot with payment. Then fill out a short intake form so we know where to focus.",
    },
    {
      stepNumber: "02",
      title: "We Audit Everything",
      description:
        "Over 3\u20135 business days, we deep-dive into your development, marketing, and AI infrastructure.",
    },
    {
      stepNumber: "03",
      title: "Delivery + Walkthrough Call",
      description:
        "You receive all deliverables plus a live call to walk through every finding and next step.",
    },
  ],
};

export const AUDIT_FINDINGS: AuditFindingsData = {
  headline: "What we\u2019ve found in past audits",
  highlightedWord: "found",
  findings: [
    { text: "A SaaS company\u2019s homepage loaded in 11 seconds \u2014 losing 60% of visitors before they saw the product." },
    { text: "An e-commerce store was spending $4,000/mo on ads with zero conversion tracking installed." },
    { text: "A startup\u2019s codebase had 3 competing state management systems, making every feature take 3x longer." },
    { text: "A services firm had 200+ blog posts with no internal linking strategy \u2014 invisible to Google." },
    { text: "A fintech company\u2019s support team was manually handling 400 tickets/week that could be automated." },
    { text: "An agency was paying for 6 overlapping tools that one platform could replace." },
  ],
  layoutStyle: "grid",
};

export const AUDIT_PRICING: AuditPricingData = {
  headline: "Choose your path",
  highlightedWord: "path",
  tiers: [
    {
      name: "Free Consultation",
      price: "Free",
      features: [
        "30-minute discovery call",
        "High-level assessment",
        "Personalised recommendations",
        "No commitment required",
      ],
      ctaLabel: "Book a Call",
      ctaUrl: "/start",
    },
    {
      name: "Growth Audit",
      price: "From $500",
      features: [
        "Full development review",
        "Full marketing review",
        "Full AI & automation review",
        "Diagnosis document",
        "Strategy deck",
        "Loom walkthrough",
        "Notion roadmap",
        "Live walkthrough call",
      ],
      ctaLabel: "Get the Audit",
      ctaUrl: "/audit#pricing",
      highlighted: true,
      badge: "Recommended",
    },
    {
      name: "Custom Engagement",
      price: "Let\u2019s Talk",
      priceSubtext: "scoped to your needs",
      features: [
        "Everything in Growth Audit",
        "Implementation support",
        "Ongoing advisory",
        "Priority scheduling",
      ],
      ctaLabel: "Book a Call",
      ctaUrl: "/start",
    },
  ],
};

export const AUDIT_FAQ: FAQItem[] = [
  {
    question: "How long does the audit take?",
    answer:
      "3\u20135 business days from the moment you complete the intake form. You\u2019ll receive all deliverables at once, followed by a live walkthrough call.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "Access to your website, analytics accounts, and any ad platforms you\u2019re running. We\u2019ll send you a short intake form after payment.",
  },
  {
    question: "Is the price fixed?",
    answer:
      "The Growth Audit starts at $500 for most businesses. Larger or more complex operations may require a custom quote \u2014 book a free consultation to discuss.",
  },
  {
    question: "What if I just want one area reviewed?",
    answer:
      "The audit is designed as a holistic review because problems in one area often stem from another. However, if you only need a specific review, book a free consultation and we\u2019ll scope it together.",
  },
  {
    question: "Do you implement the fixes too?",
    answer:
      "The audit is diagnostic \u2014 it tells you exactly what\u2019s wrong and how to fix it. If you want us to implement, we can discuss a custom engagement after delivery.",
  },
];

export const AUDIT_CTA_FINAL: CTABannerData = {
  headline: "Ready to find out what\u2019s holding you back?",
  subCopy: "One audit. Every answer. A clear path forward.",
  ctaLabel: "Get the Audit",
  ctaDestination: "/audit#pricing",
  highlightedWord: "holding",
  colorScheme: "teal-solid",
  presentationMode: "section",
};

export const AUDIT_CASE_STUDIES: CaseStudyCardData[] = [
  {
    title: "Monaco Supplement Brand",
    slug: "monaco-supplements",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    situation:
      "Since 2021, we scaled Google Ads into a core growth channel, playing a central role in driving the brand\u2019s online revenue and market presence.",
    resultHeadline: "ROAS up to 12 for a Monaco supplement brand",
    techStack: ["Next.js", "Sanity", "Vercel", "GA4"],
  },
  {
    title: "Roommaster SaaS",
    slug: "roommaster",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    situation:
      "Hotel management platform suffering from poor site speed and weak conversion. We rebuilt the frontend and ran targeted paid acquisition.",
    resultHeadline: "100 Lighthouse score, 3.2\u00d7 ROAS",
    techStack: ["Next.js", "Tailwind", "GA4", "GTM"],
  },
  {
    title: "French Luxury Kidswear",
    slug: "luxury-kidswear",
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
    situation:
      "We boosted orders and brand awareness through targeted Meta Ads. Instagram engagement drove ROAS and rapidly increased visibility across key demographics.",
    resultHeadline: "+74% orders & ROAS up to 23",
    techStack: ["Meta Ads", "Instagram", "Shopify"],
  },
];

export const AUDIT_INDUSTRIES: IndustriesGridData = {
  headline: "Industries we accelerate",
  highlightedWord: "accelerate",
  description:
    "We specialise in high-growth sectors where technical performance and marketing ROI are inseparable.",
  industries: [
    { icon: "rocket", name: "SaaS", hookLine: "Ship faster, convert more, retain longer.", slug: "saas" },
    { icon: "target", name: "B2B Lead Gen", hookLine: "Fill your pipeline with qualified leads on autopilot.", slug: "b2b" },
    { icon: "cpu", name: "AI & Tech Startups", hookLine: "Technical builds that match your ambition.", slug: "ai-tech" },
    { icon: "landmark", name: "FinTech", hookLine: "Compliant, fast, and built for trust.", slug: "fintech" },
  ],
  ctaHeadline: "Sound like you?",
  ctaLabel: "Free consultation",
  ctaUrl: "/start",
};

export const AUDIT_TESTIMONIALS: TestimonialData[] = [
  {
    quote:
      "They didn\u2019t just build a website \u2014 they built a growth machine. Our leads tripled in two months.",
    name: "Sarah Chen",
    role: "CEO",
    company: "TechFlow",
    rating: 5,
  },
  {
    quote:
      "The speed difference alone paid for the project. Our Lighthouse score went from 34 to 100.",
    name: "Marcus Johnson",
    role: "CTO",
    company: "Roommaster",
    rating: 5,
  },
];
