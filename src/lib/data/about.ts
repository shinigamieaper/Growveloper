import type {
  AboutHeroData,
  AboutShortVersionData,
  AboutStoryData,
  AboutStatItem,
  AboutPastCompaniesData,
  AboutHowIWorkData,
  AboutSkillsToolsData,
  AboutInterestsData,
  CaseStudyCardData,
  CTABannerData,
} from "@/lib/types";

export const ABOUT_HERO: AboutHeroData = {
  name: "Juwon",
  identity: "Full-stack developer. Performance marketer. Builder.",
  portraitImage: "/images/potriat/me.png",
  portraitAlt: "Juwon — founder of GROWVELOPER",
  scrollCueText: "SCROLL TO LEARN MORE \u00b7 SCROLL TO LEARN MORE \u00b7 ",
  scrollCueTargetId: "short-version",
};

export const ABOUT_SHORT_VERSION: AboutShortVersionData = {
  headline: "The short version",
  highlightedWord: "short",
  body: "I build digital engines at the intersection of code and marketing. Most agencies separate these disciplines \u2014 developers who can\u2019t talk attribution, marketers who can\u2019t talk architecture. I don\u2019t, because I\u2019ve lived on both sides and seen what happens when they work together: faster growth, fewer wasted campaigns, and systems that scale without breaking.",
};

export const ABOUT_STORY: AboutStoryData = {
  headline: "The story",
  highlightedWord: "story",
  body: [
    "I started with development. Building things from scratch was the draw \u2014 the satisfaction of seeing something work that didn\u2019t exist before. But I kept running into the same wall: technically solid products that nobody found, or found too late.",
    "So I went deep into marketing. Not surface-level campaign management \u2014 proper performance marketing. Attribution modelling, funnel architecture, paid acquisition that compounds. I wanted to understand why some products grew and others didn\u2019t, even when the code was identical.",
    "GROWVELOPER is the answer to that question. It\u2019s the agency I wished existed when I was building and scaling \u2014 one that treats development and marketing as a single system, not two separate services you stitch together after the fact.",
  ],
};

export const ABOUT_STATS: AboutStatItem[] = [
  { value: "5+", label: "Years in the game" },
  { value: "2020", label: "Growveloper founded" },
  { value: "3", label: "Companies built" },
  { value: "12+", label: "Clients scaled" },
  { value: "2", label: "Disciplines, 1 system" },
];

export const ABOUT_COMPANIES: AboutPastCompaniesData = {
  headline: "Where I\u2019ve worked",
  highlightedWord: "worked",
  companies: [
    {
      company: "GROWVELOPER",
      role: "Founder & Lead Engineer",
      insight:
        "Built a full-service digital agency from zero \u2014 combining custom development with performance marketing into one integrated offer.",
    },
    {
      company: "Freelance",
      role: "Full-Stack Developer & Growth Consultant",
      insight:
        "Worked across e-commerce, SaaS, and content businesses \u2014 building everything from lead funnels to custom data pipelines and analytics infrastructure.",
    },
    {
      company: "In-House",
      role: "Digital Marketing Lead",
      insight:
        "Ran paid acquisition and conversion optimisation for a scaling consumer brand \u2014 where I learned that marketing without engineering is always leaving performance on the table.",
    },
  ],
};

export const ABOUT_HOW_I_WORK: AboutHowIWorkData = {
  headline: "How I work",
  highlightedWord: "work",
  principles: [
    {
      title: "Systems before tactics",
      description:
        "Tactics get you quick wins. Systems get you compounding results. I always start by understanding the full picture before touching a single tool or writing a single line.",
    },
    {
      title: "Data drives decisions",
      description:
        "Opinions are cheap. Every recommendation I make is grounded in actual data \u2014 attribution, funnel metrics, or performance benchmarks. I build the infrastructure to surface it.",
    },
    {
      title: "Build once, scale indefinitely",
      description:
        "I hate rebuilding things. Every system I design is built to grow with you \u2014 from 10 customers to 10,000 \u2014 without architectural rewrites or operational chaos.",
    },
  ],
};

export const ABOUT_SKILLS_TOOLS: AboutSkillsToolsData = {
  headline: "Skills + tools",
  highlightedWord: "tools",
  disciplines: [
    {
      name: "Full-Stack Development",
      tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Sanity CMS"].map((name) => ({ name })),
    },
    {
      name: "Performance Marketing",
      tools: ["Google Ads", "Meta Ads", "GA4", "Google Sheets"].map((name) => ({ name })),
    },
    {
      name: "AI & Automation",
      tools: ["Make.com", "n8n", "OpenAI API", "Zapier", "Voiceflow"].map((name) => ({ name })),
    },
    {
      name: "Analytics & Attribution",
      tools: ["GA4", "Google Ads", "Google Sheets", "Notion"].map((name) => ({ name })),
    },
    {
      name: "CRO & Funnel Design",
      tools: ["Figma", "GA4", "Google Ads", "HubSpot"].map((name) => ({ name })),
    },
    {
      name: "Product Architecture",
      tools: ["Next.js", "TypeScript", "Vercel", "Figma", "Notion"].map((name) => ({ name })),
    },
  ],
};

export const ABOUT_INTERESTS: AboutInterestsData = {
  headline: "Outside the work",
  highlightedWord: "work",
  items: [
    {
      interest: "Systems thinking",
      connection:
        "Understanding how complex systems fail \u2014 from supply chains to organisations \u2014 directly informs how I design software and marketing infrastructure.",
    },
    {
      interest: "Economic history",
      connection:
        "The patterns behind how markets form, grow, and collapse are the same patterns I look for in client growth data. History is the best dataset.",
    },
    {
      interest: "Endurance sport",
      connection:
        "Running and cycling teach you that output is a function of consistent input over time. That mindset is how I approach every client engagement.",
    },
  ],
};

export const ABOUT_CASE_STUDIES: CaseStudyCardData[] = [
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
  {
    slug: "growth-marketing-overhaul",
    title: "Growth Marketing Overhaul",
    heroImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    situation:
      "Rebuilt attribution infrastructure from scratch for a D2C brand spending \u00a340k/month on paid. Identified 3 underperforming campaigns and reallocated budget. ROAS improved 2.4x in 8 weeks.",
    resultHeadline: "2.4x ROAS in 8 weeks",
    techStack: ["GA4", "GTM", "Google Ads", "Meta Ads"],
  },
];

/* ─── CTAs ─── */

// Inline CTA — mid-page, after The Story
export const ABOUT_CTA_INLINE: CTABannerData = {
  headline: "Want to see how this translates into results?",
  highlightedWord: "results",
  ctaLabel: "View case studies",
  ctaDestination: "/lab",
};

// Section CTA — end of page
export const ABOUT_CTA_SECTION: CTABannerData = {
  headline: "Like what you see? Let\u2019s work together.",
  highlightedWord: "work together",
  ctaLabel: "Work with me",
  ctaDestination: "/start",
};

