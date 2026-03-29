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

export const MARKETING_HERO: ServicePageHeroData = {
  headline: "Marketing that actually moves the needle",
  highlightedWord: "moves the needle",
  subStatement:
    "We build growth engines \u2014 not vanity dashboards. From AI-powered search to paid media and CRO, every channel works together to compound your revenue.",
  primaryCtaLabel: "Book a Free Consultation",
  primaryCtaUrl: "/start",
  secondaryCtaLabel: "Get a Growth Audit",
  secondaryCtaUrl: "/audit",
  scrollCueText: "SEE WHAT WE DO \u00b7 SEE WHAT WE DO \u00b7 ",
  scrollCueTargetId: "sub-services",
};

export const MARKETING_PROBLEM: ServiceProblemData = {
  headline: "You\u2019re spending but not growing",
  highlightedWord: "not growing",
  painPoints: [
    "Your ad spend keeps climbing but your cost per acquisition isn\u2019t coming down.",
    "You\u2019re invisible on Google \u2014 and now AI search engines are eating your traffic too.",
    "Your analytics are a mess: no attribution, no funnel visibility, no idea what\u2019s actually working.",
  ],
};

export const MARKETING_SUB_SERVICES: SubServicesData = {
  headline: "What\u2019s covered",
  highlightedWord: "covered",
  description:
    "Six disciplines, one team. Every channel is optimised together so nothing falls through the cracks.",
  items: [
    {
      title: "AEO",
      description:
        "AI Engine Optimisation \u2014 get your brand cited by ChatGPT, Perplexity, and Gemini. This is the new SEO.",
      icon: "brain",
    },
    {
      title: "SEO",
      description:
        "Technical SEO, content strategy, and link building that compound organic traffic month over month.",
      icon: "search",
    },
    {
      title: "Paid Ads",
      description:
        "Google Ads and Meta Ads managed for ROAS \u2014 not impressions. We cut waste and scale what converts.",
      icon: "megaphone",
    },
    {
      title: "Content Strategy",
      description:
        "Editorial calendars, pillar content, and distribution plans that build authority and drive inbound leads.",
      icon: "pen-tool",
    },
    {
      title: "CRO",
      description:
        "Conversion Rate Optimisation \u2014 A/B testing, funnel analysis, and UX improvements that turn traffic into revenue.",
      icon: "flask",
    },
    {
      title: "Analytics & Tracking",
      description:
        "GA4, GTM, and custom dashboards so you always know what\u2019s working and what to kill.",
      icon: "bar-chart",
    },
  ],
};

export const MARKETING_QUALIFIERS: ServiceQualifierData = {
  headline: "Who this is for",
  highlightedWord: "for",
  qualifiers: [
    "SaaS companies spending \u00a35k+ on ads with no clear attribution",
    "E-commerce brands stuck at a revenue plateau",
    "Startups that need organic growth before they can afford paid",
    "Agencies looking for a white-label marketing partner",
    "Any business invisible to AI search engines like ChatGPT and Perplexity",
  ],
};

export const MARKETING_PROCESS: AuditProcessData = {
  headline: "How we work",
  highlightedWord: "work",
  steps: [
    {
      stepNumber: "01",
      title: "Audit & Strategy",
      description:
        "We audit your current channels, analytics, and competitors. Then we build a 90-day growth plan with clear KPIs.",
    },
    {
      stepNumber: "02",
      title: "Execute & Optimise",
      description:
        "We launch campaigns, publish content, and run experiments. Weekly reporting keeps you in the loop.",
    },
    {
      stepNumber: "03",
      title: "Scale & Compound",
      description:
        "Once we find what works, we double down. Monthly strategy reviews ensure we keep compounding growth.",
    },
  ],
};

export const MARKETING_CASE_STUDIES: CaseStudyCardData[] = [
  {
    slug: "saas-lead-gen",
    title: "SaaS Lead Generation",
    heroImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    situation:
      "Rebuilt their entire paid and organic funnel. Leads tripled in 60 days while CPA dropped 40%.",
    resultHeadline: "3x leads, \u221240% CPA",
    techStack: ["Google Ads", "GA4", "SEO", "CRO"],
  },
  {
    slug: "ecommerce-roas",
    title: "E-commerce ROAS Turnaround",
    heroImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
    situation:
      "Restructured Meta Ads account, launched AEO content, and fixed analytics. ROAS jumped from 2.1 to 8.7.",
    resultHeadline: "ROAS 2.1 \u2192 8.7",
    techStack: ["Meta Ads", "AEO", "GTM", "Shopify"],
  },
];

export const MARKETING_TESTIMONIALS: TestimonialData[] = [
  {
    quote:
      "They didn\u2019t just run ads \u2014 they rebuilt our entire growth engine. The compounding effect is real.",
    name: "Sarah Chen",
    role: "CEO",
    company: "TechFlow",
    rating: 5,
  },
  {
    quote:
      "Our SEO traffic 4x\u2019d in 6 months and we\u2019re now showing up in ChatGPT answers. Game changer.",
    name: "David Okonkwo",
    role: "Head of Marketing",
    company: "Urban Botanics",
    rating: 5,
  },
];

export const MARKETING_BEFORE_AFTER: BeforeAfterData = {
  headline: "The difference is visible",
  highlightedWord: "visible",
  description:
    "Real client sites. Before we touched them vs. after our team rebuilt the strategy, design, and performance.",
  pairs: [
    {
      clientName: "Roommaster",
      beforeImage:
        "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=600&fit=crop",
      afterImage:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
    },
    {
      clientName: "TechFlow",
      beforeImage:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
      afterImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
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

export const MARKETING_CTA_AUDIT: CTABannerData = {
  headline: "Not sure where to start? Get a Growth Audit.",
  ctaLabel: "Get a Growth Audit",
  ctaDestination: "/audit",
  highlightedWord: "Growth Audit",
};

export const MARKETING_FAQ: FAQItem[] = [
  {
    question: "What makes your marketing different from other agencies?",
    answer:
      "We don\u2019t silo channels. Your SEO, ads, content, and analytics are managed by one team with one growth plan. And we lead with AEO \u2014 most agencies haven\u2019t even heard of it yet.",
  },
  {
    question: "What is AEO (AI Engine Optimisation)?",
    answer:
      "AEO is the practice of optimising your content so AI search engines like ChatGPT, Perplexity, and Google AI Overviews cite your brand. Think of it as SEO for the AI era.",
  },
  {
    question: "How long before I see results?",
    answer:
      "Paid channels can show results within 2\u20134 weeks. SEO and AEO compound over 3\u20136 months. We set clear 30/60/90-day milestones so you always know what to expect.",
  },
  {
    question: "Do you require long-term contracts?",
    answer:
      "No. We work on rolling monthly retainers. You stay because the results speak, not because of a contract.",
  },
  {
    question: "Can you work alongside my existing marketing team?",
    answer:
      "Absolutely. We can fill gaps (e.g. just paid ads + analytics), or run the full stack. We\u2019ll scope it to your needs.",
  },
];

export const MARKETING_CTA_FINAL: CTABannerData = {
  headline: "Ready to build a marketing engine that compounds?",
  ctaLabel: "Book a Free Consultation",
  ctaDestination: "/start",
  highlightedWord: "compounds",
};

export const MARKETING_STATS: StatsBandItem[] = [
  { value: 4.2, suffix: "\u00d7", decimals: 1, label: "Avg ROAS delivered" },
  { value: 2.8, prefix: "\u00a3", suffix: "M+", decimals: 1, label: "Ad spend managed" },
  { value: 47, suffix: "+", label: "Brands scaled" },
  { value: 6, label: "Channels, one team" },
];

export const MARKETING_INDUSTRIES: IndustriesGridData = {
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

export const MARKETING_LAB_ITEMS: LabContentCard[] = [
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
