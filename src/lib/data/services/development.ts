import type {
  ServicePageHeroData,
  ServiceProblemData,
  SubServicesData,
  ServiceQualifierData,
  AuditProcessData,
  CaseStudyCardData,
  TestimonialData,
  CTABannerData,
  FAQItem,
  BeforeAfterData,
  IndustriesGridData,
  LabContentCard,
  StatsBandItem,
} from "@/lib/types";

export const DEVELOPMENT_HERO: ServicePageHeroData = {
  headline: "Code built to convert, not just to ship",
  highlightedWord: "convert",
  subStatement:
    "Performance-first Next.js development where every millisecond of load time and every GA4 event is treated as a growth lever \u2014 not an afterthought.",
  primaryCtaLabel: "Book a Free Consultation",
  primaryCtaUrl: "/start?service=development",
  secondaryCtaLabel: "View Our Work",
  secondaryCtaUrl: "/work",
  scrollCueText: "SEE WHAT WE BUILD \u00b7 SEE WHAT WE BUILD \u00b7 ",
  scrollCueTargetId: "dev-services",
};

export const DEVELOPMENT_STATS: StatsBandItem[] = [
  { value: 97, suffix: "+", label: "Avg PageSpeed score" },
  { value: 40, suffix: "+", label: "Projects delivered" },
  { value: 1.4, suffix: "s", decimals: 1, label: "Avg LCP achieved" },
  { value: 100, suffix: "%", label: "GA4 setup on every build" },
];

export const DEVELOPMENT_PROBLEM: ServiceProblemData = {
  headline: "Your site is costing you money",
  highlightedWord: "costing you",
  painPoints: [
    "Every second of load time costs 7% in conversions \u2014 and inflates your cost-per-click on every ad you run.",
    "Your developer handed over a \u2018finished\u2019 site with no GTM, no GA4, no attribution. Now you\u2019re flying blind.",
    "Beautiful design, wrong stack. You can\u2019t update content, it doesn\u2019t rank, and adding features takes months.",
  ],
};

export const DEVELOPMENT_SUB_SERVICES: SubServicesData = {
  headline: "What we build",
  highlightedWord: "build",
  description:
    "Six disciplines, one codebase. Every build is performance-optimised, analytics-ready, and built to rank from day one.",
  items: [
    {
      title: "Next.js Performance Builds",
      description:
        "Full-stack Next.js applications with Lighthouse scores above 95. We build fast by default \u2014 not as an afterthought.",
      icon: "monitor",
    },
    {
      title: "Core Web Vitals",
      description:
        "LCP under 2s, CLS below 0.1, INP under 200ms. We target real user metrics, not just lab scores.",
      icon: "gauge",
    },
    {
      title: "CMS Setup (Sanity)",
      description:
        "Headless CMS configured and content-modelled so your team can publish without touching code.",
      icon: "database",
    },
    {
      title: "GTM & GA4 Implementation",
      description:
        "Full data layer setup, event schema design, and GA4 configuration so every conversion is tracked and attributed.",
      icon: "code",
    },
    {
      title: "API Integrations",
      description:
        "Third-party API connections, webhooks, and internal tooling \u2014 cleanly integrated without coupling your architecture.",
      icon: "plug",
    },
    {
      title: "Ongoing Maintenance",
      description:
        "Monthly retainer options: dependency updates, performance monitoring, feature additions, and zero downtime deploys.",
      icon: "shield",
    },
  ],
};

export const DEVELOPMENT_PROCESS: AuditProcessData = {
  headline: "How we build",
  highlightedWord: "build",
  steps: [
    {
      stepNumber: "01",
      title: "Discovery & Architecture",
      description:
        "We map your requirements, agree on the stack, set Lighthouse targets, and design your GTM/GA4 schema before writing a single line.",
    },
    {
      stepNumber: "02",
      title: "Build & Review",
      description:
        "Weekly build reviews with staging previews. No surprises at launch \u2014 you see the work as it develops.",
    },
    {
      stepNumber: "03",
      title: "QA, Launch & Maintain",
      description:
        "Final Lighthouse audit, analytics verification, staging-to-production promotion, then ongoing retainer support.",
    },
  ],
};

export const DEVELOPMENT_BEFORE_AFTER: BeforeAfterData = {
  headline: "The numbers speak for themselves",
  highlightedWord: "numbers",
  description:
    "Real Lighthouse improvements from real client rebuilds \u2014 before and after we touched the codebase.",
  pairs: [
    {
      clientName: "TechFlow",
      beforeImage:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
      afterImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    },
    {
      clientName: "Roommaster",
      beforeImage:
        "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=600&fit=crop",
      afterImage:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
    },
    {
      clientName: "Urban Botanics",
      beforeImage:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
      afterImage:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    },
  ],
};

export const DEVELOPMENT_CASE_STUDIES: CaseStudyCardData[] = [
  {
    slug: "saas-platform-rebuild",
    title: "SaaS Platform Rebuild",
    heroImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop",
    situation:
      "Migrated a legacy WordPress site to Next.js. PageSpeed jumped from 38 to 96. LCP dropped from 4.2s to 0.8s, cutting bounce rate by 34%.",
    resultHeadline: "PageSpeed 38 \u2192 96",
    techStack: ["Next.js", "Sanity", "Vercel", "GA4"],
  },
  {
    slug: "ecommerce-performance",
    title: "E-commerce Performance Fix",
    heroImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
    situation:
      "Core Web Vitals remediation and GTM/GA4 rebuild for an e-commerce brand. Conversion rate increased 18% within 6 weeks of launch.",
    resultHeadline: "+18% conversion rate",
    techStack: ["Next.js", "GTM", "GA4", "Shopify"],
  },
];

export const DEVELOPMENT_TESTIMONIALS: TestimonialData[] = [
  {
    quote:
      "They didn\u2019t just build a site \u2014 they built a performance engine. Our PageSpeed went from 41 to 98 and our ad cost per click dropped within weeks.",
    name: "Marcus Webb",
    role: "Founder",
    company: "TechFlow",
    rating: 5,
  },
  {
    quote:
      "Finally, a developer who understands GTM. Our attribution is actually working for the first time in two years. The ROI tracking alone paid for the project.",
    name: "Priya Nair",
    role: "Head of Growth",
    company: "Urban Botanics",
    rating: 5,
  },
];

export const DEVELOPMENT_QUALIFIERS: ServiceQualifierData = {
  headline: "Who this is for",
  highlightedWord: "for",
  qualifiers: [
    "Founders whose site loads in 4+ seconds and it\u2019s showing up in their ad CPC",
    "Businesses with no GA4, no GTM, and no idea which campaigns are actually converting",
    "Teams stuck on WordPress or an outdated stack that slows down every new feature",
    "Agencies needing a white-label dev partner who understands marketing performance",
    "Any brand that wants a site built to rank and convert \u2014 not just to look good",
  ],
};

export const DEVELOPMENT_FAQ: FAQItem[] = [
  {
    question: "What makes your development different from other agencies?",
    answer:
      "We build with marketing performance in mind from day one. Every build includes GTM/GA4 setup, SEO-ready architecture, and Core Web Vitals as a primary KPI \u2014 not an afterthought. You get a site that ranks, loads fast, and attributes revenue correctly.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects are 6\u201310 weeks from discovery to launch. We scope clearly upfront, deliver weekly staging builds, and don\u2019t disappear at handover.",
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer:
      "Yes. We offer monthly retainers covering dependency updates, performance monitoring, bug fixes, and feature additions. Most clients stay on retainer post-launch.",
  },
  {
    question: "Which CMS do you use?",
    answer:
      "We build primarily with Sanity \u2014 it\u2019s headless, developer-friendly, and gives your team full content control without touching code. We can also work with other headless CMS platforms.",
  },
  {
    question: "Can you work with our existing tech stack?",
    answer:
      "Absolutely. We can build net-new in Next.js, migrate from an existing stack, or drop into your current codebase to fix specific performance issues. We\u2019ll scope to what you actually need.",
  },
];

export const DEVELOPMENT_CTA_MID: CTABannerData = {
  headline: "Not sure if your site is costing you? Get a dev audit.",
  highlightedWord: "dev audit",
  ctaLabel: "Get a Dev Audit",
  ctaDestination: "/audit",
};

export const DEVELOPMENT_CTA_FINAL: CTABannerData = {
  headline: "Ready to build something fast and built to last?",
  highlightedWord: "fast",
  ctaLabel: "Book a Free Consultation",
  ctaDestination: "/start?service=development",
};

export const DEVELOPMENT_INDUSTRIES: IndustriesGridData = {
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

export const DEVELOPMENT_LAB_ITEMS: LabContentCard[] = [
  {
    title: "How We Tripled Conversion Rates for a SaaS Startup",
    slug: "tripled-conversion-saas",
    excerpt:
      "A deep dive into the strategy, design decisions, and technical implementation that led to a 3x increase in signups.",
    heroImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    publishedAt: "2024-12-15",
    readTime: "8 min read",
    category: "Case Study",
    platform: "blog",
  },
  {
    title: "Building a Design System from Scratch",
    platform: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    description: "Watch how we approach design systems for scalable products.",
    publishedAt: "2024-11-28",
  },
  {
    title: "60-Second Website Audit Tips",
    platform: "tiktok",
    videoUrl: "https://www.tiktok.com/@example/video/123",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=700&fit=crop",
    description: "Quick wins you can implement today.",
    publishedAt: "2024-12-01",
  },
];
