import type {
  ServicePageHeroData,
  ServiceProblemData,
  SubServicesData,
  FeaturedAutomationsSection,
  AuditProcessData,
  BeforeAfterData,
  CaseStudyCardData,
  TestimonialData,
  ServiceQualifierData,
  FAQItem,
  CTABannerData,
  IndustriesGridData,
  LabContentCard,
} from "@/lib/types";
import type { StatsBandItem } from "@/components";
import { getFeaturedAutomations } from "@/lib/data/automations";

export const AI_HERO: ServicePageHeroData = {
  headline: "Automate the work your team shouldn\u2019t be doing",
  highlightedWord: "shouldn\u2019t be doing",
  subStatement:
    "Done-for-you automation workflows and custom AI infrastructure \u2014 built by a team that understands your funnel, not just your tech stack.",
  primaryCtaLabel: "Browse Automations",
  primaryCtaUrl: "/automations",
  secondaryCtaLabel: "Book a Free Consultation",
  secondaryCtaUrl: "/start?service=ai",
  scrollCueText: "SEE WHAT WE AUTOMATE \u00b7 SEE WHAT WE AUTOMATE \u00b7 ",
  scrollCueTargetId: "ai-services",
};

export const AI_STATS: StatsBandItem[] = [
  { value: 120, suffix: "+", label: "Automations deployed" },
  { value: 8, suffix: "h", label: "Avg hours saved per week" },
  { value: 2, label: "Days to first automation live" },
  { value: 6, label: "Platforms integrated per build" },
];

export const AI_PROBLEM: ServiceProblemData = {
  headline: "Your team is doing work that should be automated",
  highlightedWord: "automated",
  painPoints: [
    "Your team is copy-pasting data between tools, manually qualifying leads, and sending the same follow-up emails every week \u2014 that\u2019s friction, not work.",
    "You can\u2019t scale without hiring more people, but you can\u2019t hire fast enough \u2014 and the bottlenecks multiply with every new customer.",
    "You have 12 tools that don\u2019t talk to each other, reports no one reads, and signals you never see because no one\u2019s watching.",
  ],
};

export const AI_SUB_SERVICES: SubServicesData = {
  headline: "What we automate",
  highlightedWord: "automate",
  description:
    "Six automation categories, one integrated system. Every workflow is built to connect your tools, eliminate friction, and free your team for decisions that matter.",
  items: [
    {
      title: "Lead Qualification",
      description:
        "Automatically score, enrich, and route new leads from any source \u2014 form, ad, or outbound. Only the right leads reach your sales team.",
      icon: "filter",
    },
    {
      title: "AI Chatbot",
      description:
        "Conversational AI on your site or in your product. Handles FAQs, qualifies prospects, and books meetings \u2014 24/7 with no human needed.",
      icon: "message-circle",
    },
    {
      title: "Automated Reporting",
      description:
        "Pull data from GA4, your ad accounts, and CRM automatically. Weekly reports land in inboxes \u2014 no spreadsheets, no manual exports.",
      icon: "bar-chart-2",
    },
    {
      title: "Content Pipeline",
      description:
        "Brief submitted to content live \u2014 automated drafts, SEO outlines, CMS uploads, and publish schedules without your team touching each step.",
      icon: "git-branch",
    },
    {
      title: "CRM Automation",
      description:
        "Keep HubSpot, Notion, and Sheets in sync. Contacts created, enriched, and updated automatically \u2014 no more manual data entry.",
      icon: "database",
    },
    {
      title: "Analytics Alerts",
      description:
        "Real-time alerts when a metric spikes, drops, or crosses a threshold. Your team acts on signals \u2014 they don\u2019t have to go looking for them.",
      icon: "bell",
    },
  ],
};

export const AI_FEATURED_AUTOMATIONS: FeaturedAutomationsSection = {
  headline: "Ready-made automations",
  highlightedWord: "Ready-made",
  description:
    "Pre-built workflows you can deploy in days. Fixed price. No surprises. Each one ships with full documentation and a 30-day support window.",
  viewAllLabel: "Browse All Automations",
  viewAllUrl: "/automations",
  items: getFeaturedAutomations(),
};

export const AI_PROCESS: AuditProcessData = {
  headline: "How we work",
  highlightedWord: "work",
  steps: [
    {
      stepNumber: "01",
      title: "Map & Design",
      description:
        "We audit your current workflows, identify the highest-impact automation targets, and map the data flow before writing a single line. No surprises at build time.",
    },
    {
      stepNumber: "02",
      title: "Build & Test",
      description:
        "We build in sprints with staging environments. Every automation is stress-tested against edge cases \u2014 invalid data, empty fields, API timeouts \u2014 before it touches your live systems.",
    },
    {
      stepNumber: "03",
      title: "Deploy & Monitor",
      description:
        "We go live, monitor performance for 30 days, and hand over documentation your team can actually follow. No black boxes, no disappearing act post-launch.",
    },
  ],
};

export const AI_BEFORE_AFTER: BeforeAfterData = {
  headline: "Before and after automation",
  highlightedWord: "after",
  description:
    "Real workflow changes from real client projects. The manual process vs. what runs automatically now.",
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

export const AI_CASE_STUDIES: CaseStudyCardData[] = [
  {
    slug: "ecommerce-lead-automation",
    title: "E-commerce Lead Automation",
    heroImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop",
    situation:
      "Replaced a manual lead qualification process. Time to first contact dropped from 4 hours to 4 minutes. 340% more leads processed per week with the same headcount.",
    resultHeadline: "4h \u2192 4min response",
    techStack: ["Make.com", "HubSpot", "OpenAI API", "Slack"],
  },
  {
    slug: "saas-reporting-pipeline",
    title: "SaaS Reporting Pipeline",
    heroImage:
      "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800&h=500&fit=crop",
    situation:
      "Replaced 6 weekly manual reports with automated dashboards and Monday morning email digests. Exec team got real-time visibility. Team saved 18 hours per week.",
    resultHeadline: "18h/week recovered",
    techStack: ["n8n", "GA4", "Google Ads", "Resend"],
  },
];

export const AI_TESTIMONIALS: TestimonialData[] = [
  {
    quote:
      "The lead qualification automation changed our sales process overnight. We went from chasing cold leads to only talking to people who were already a strong fit. The ROI was immediate.",
    name: "Sarah Chen",
    role: "CEO",
    company: "TechFlow",
    rating: 5,
  },
  {
    quote:
      "They didn\u2019t just build a workflow \u2014 they mapped our entire funnel first and showed us where we were losing money manually. The automation they built saves us 3 days of work a month.",
    name: "David Okonkwo",
    role: "Head of Operations",
    company: "Urban Botanics",
    rating: 5,
  },
];

export const AI_QUALIFIERS: ServiceQualifierData = {
  headline: "Who this is for",
  highlightedWord: "for",
  qualifiers: [
    "Teams spending more than 5 hours a week on manual data entry, lead routing, or reporting",
    "Founders whose sales process is bottlenecked by slow lead response times",
    "Businesses running 5+ tools that don\u2019t share data with each other",
    "Agencies needing a white-label automation partner for client projects",
    "AI & Tech startups that need custom infrastructure \u2014 not off-the-shelf workflow templates",
  ],
};

export const AI_FAQ: FAQItem[] = [
  {
    question:
      "What\u2019s the difference between Done-For-You automations and Custom AI Infrastructure?",
    answer:
      "Done-For-You automations are pre-scoped, fixed-price workflows we\u2019ve built before \u2014 you pick one, we deploy it for your stack, and you\u2019re live in days. Custom AI Infrastructure is bespoke: we design, architect, and build a system from scratch for your specific business logic. Custom projects are scoped on a consultation basis.",
  },
  {
    question: "What tools and platforms do you work with?",
    answer:
      "Our primary stack is Make.com, n8n, Voiceflow, OpenAI API, Zapier, and HubSpot \u2014 but we\u2019re not locked to any stack. If you\u2019re already running tools like Notion, Airtable, Slack, GA4, Google Sheets, Salesforce, or Intercom, we connect to those. We\u2019ll always choose the right tool for your workflow, not the one we happen to prefer.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Pre-built automations are typically live within 2\u20135 business days once we have API access to your tools. Custom builds range from 2 to 8 weeks depending on complexity. We always scope clearly upfront so you know exactly what you\u2019re getting and when.",
  },
  {
    question: "What happens if the automation breaks after delivery?",
    answer:
      "Every project ships with a 30-day support window. If something breaks within that period, we fix it at no extra cost. After 30 days, we offer ongoing retainer plans for monitoring, maintenance, and updates.",
  },
  {
    question: "Can you automate something that requires AI decision-making?",
    answer:
      "Yes \u2014 that\u2019s one of our core strengths. We integrate LLMs like GPT-4o and Claude into workflows for tasks like lead scoring, content generation, data classification, and support triage. The AI makes the decision; your team only touches the exceptions.",
  },
];

export const AI_CTA_MID: CTABannerData = {
  headline: "Not sure where to start? Browse pre-built automations.",
  highlightedWord: "pre-built automations",
  ctaLabel: "Browse Automations",
  ctaDestination: "/automations",
};

export const AI_CTA_FINAL: CTABannerData = {
  headline: "Ready to reclaim your team\u2019s time?",
  highlightedWord: "reclaim",
  ctaLabel: "Book a Free Consultation",
  ctaDestination: "/start?service=ai",
};

export const AI_INDUSTRIES: IndustriesGridData = {
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

export const AI_LAB_ITEMS: LabContentCard[] = [
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