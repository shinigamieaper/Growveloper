import { Hero } from "@/components/home/Hero";
import { DiagnosisCards } from "@/components/home/DiagnosisCards";
import { ServicesAlternating } from "@/components/home/ServicesAlternating";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { SuccessAnimation } from "@/components/home/SuccessAnimation";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { CaseStudiesSection } from "@/components/home/CaseStudies";
import { CTABanner } from "@/components/shared/CTABanner";
import { HomeTestimonials } from "@/components/home/Testimonials";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { LiveFeed } from "@/components/home/LiveFeed";
import { NewsletterCapture } from "@/components/shared/NewsletterCapture";
import { GlassSection } from "@/components/shared/GlassSection";
import { BeforeAfterCompare } from "@/components/shared/BeforeAfterCompare";
import type {
  HomeHeroData,
  DiagnosisSectionData,
  StickyScrollSectionData,
  IndustriesGridData,
  CaseStudyCardData,
  CTABannerData,
  TestimonialData,
  FAQItem,
  LabContentCard,
  BeforeAfterData,
} from "@/lib/types";

/* ─── Placeholder CMS data (Rule 3 — structure first, Sanity wiring later) ─── */

const HERO_DATA: HomeHeroData = {
  socialProofText: "5+ years · 3 companies · Dev + Marketing + AI",
  headline: "I build digital engines that drive real growth",
  highlightedWord: "real growth",
  subStatement:
    "I architect high-performance digital engines where clean code and marketing ROI are inseparable.",
  primaryCtaLabel: "Book a Free Consultation",
  primaryCtaUrl: "/start",
  secondaryCtaLabel: "Get a Growth Audit",
  secondaryCtaUrl: "/audit",
  scrollCueText: "EXPLORE OUR WORK · EXPLORE OUR WORK · ",
  scrollCueTargetId: "Case studies",
};

const DIAGNOSIS_DATA: DiagnosisSectionData = {
  headline: "You already know something isn\u2019t working",
  highlightedWord: "isn\u2019t working",
  description:
    "Most founders and marketing leads feel it before they can name it. Here\u2019s what we hear every week.",
  layoutStyle: "grid-2x2",
  cards: [
    {
      icon: "zap",
      headline: "Your site looks good but doesn\u2019t convert",
      body: "Traffic goes up, leads stay flat. The design is polished but the funnel is broken \u2014 no one\u2019s buying what you\u2019re selling online.",
    },
    {
      icon: "trending-down",
      headline: "Marketing spend with nothing to show",
      body: "You\u2019ve thrown money at ads, SEO agencies, and content mills. The reports look busy but revenue hasn\u2019t moved.",
    },
    {
      icon: "puzzle",
      headline: "Dev and marketing don\u2019t talk to each other",
      body: "Your developers build features. Your marketers run campaigns. Neither team knows what the other is doing \u2014 and growth falls through the gap.",
    },
    {
      icon: "bot",
      headline: "AI is everywhere except your workflow",
      body: "You know automation could save hours a week, but you don\u2019t know where to start or who to trust to implement it properly.",
    },
  ],
};

const SERVICES_DATA: StickyScrollSectionData = {
  headline: "Three pillars. One growth engine.",
  highlightedWord: "growth engine",
  description:
    "Scroll through our three service pillars. The visual swaps as each service enters view.",
  items: [
    {
      stepNumber: "01",
      heading: "Web Development",
      description:
        "Performance-obsessed builds that score 100 on Lighthouse and convert visitors into customers.",
      subItems: ["Next.js", "Performance", "CMS Setup", "GTM & GA4", "API Integrations"],
      ctaLabel: "Learn More",
      ctaUrl: "/services/development",
      lottiePath: "/lottie/Web Development.lottie",
      fallbackGradient: "linear-gradient(135deg, var(--brand-dark), var(--brand-mid))",
    },
    {
      stepNumber: "02",
      heading: "Growth Marketing",
      description:
        "AI-first marketing that makes your brand visible where your buyers actually look.",
      subItems: ["AEO", "SEO", "Paid Ads", "Content Strategy", "CRO", "Analytics"],
      ctaLabel: "Learn More",
      ctaUrl: "/services/marketing",
      lottiePath: "/lottie/Digital Marketing.lottie",
      fallbackGradient: "linear-gradient(135deg, var(--brand-mid), var(--brand-light))",
    },
    {
      stepNumber: "03",
      heading: "AI & Automation",
      description:
        "Workflows that eliminate manual busywork and free your team to focus on growth.",
      subItems: ["Make.com", "n8n", "AI Chatbots", "Content Pipelines", "Reporting"],
      ctaLabel: "Learn More",
      ctaUrl: "/services/ai",
      lottiePath: "/lottie/Chat Bot.lottie",
      fallbackGradient: "linear-gradient(135deg, var(--brand-light), var(--brand-dark))",
    },
  ],
};

const CTA_BANNER_SERVICES: CTABannerData = {
  headline: "Dev, marketing, and automation in one growth system \u2014 built for your stage.",
  highlightedWord: "growth system",
  ctaLabel: "Book a Free Consultation",
  ctaDestination: "/start",
};

const INDUSTRIES_DATA: IndustriesGridData = {
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

const PROCESS_DATA: StickyScrollSectionData = {
  headline: "How It Works",
  highlightedWord: "It Works",
  description:
    "Four steps from audit to scale. One team, one vision, measurable results at every stage.",
  items: [
    {
      stepNumber: "01",
      heading: "Audit",
      description:
        "We analyse your current digital presence \u2014 site speed, SEO health, ad performance, tech stack, and conversion flow. You get a clear picture of what\u2019s working and what\u2019s leaking revenue.",
      lottiePath: "/lottie/step-audit.lottie",
      fallbackGradient: "linear-gradient(135deg, #1a1a2e, var(--brand-dark))",
    },
    {
      stepNumber: "02",
      heading: "Architect",
      description:
        "Based on the audit, we design your growth engine \u2014 the right tech stack, marketing channels, and automation workflows tailored to your business model and budget.",
      lottiePath: "/lottie/step-architect.lottie",
      fallbackGradient: "linear-gradient(135deg, var(--brand-dark), #1a2a2a)",
    },
    {
      stepNumber: "03",
      heading: "Build",
      description:
        "We build everything in-house. Development, marketing campaigns, automation flows \u2014 one team, one vision, no broken telephone between agencies.",
      lottiePath: "/lottie/step-build.lottie",
      fallbackGradient: "linear-gradient(135deg, #1a2a2a, var(--brand-mid))",
    },
    {
      stepNumber: "04",
      heading: "Scale",
      description:
        "Once the engine is running, we optimise and scale. Monthly reporting, A/B testing, new automations, and continuous iteration to compound your growth.",
      lottiePath: "/lottie/step-scale.lottie",
      fallbackGradient: "linear-gradient(135deg, var(--brand-mid), var(--brand-dark))",
    },
  ],
};

const CASE_STUDIES: CaseStudyCardData[] = [
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

const BEFORE_AFTER_DATA: BeforeAfterData = {
  headline: "The difference is visible",
  highlightedWord: "visible",
  description:
    "Real before-and-after transformations from our client projects.",
  pairs: [
    {
      clientName: "Roommaster SaaS",
      beforeImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80",
      afterImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80",
      beforeLabel: "Before",
      afterLabel: "After",
    },
  ],
};

const CTA_BANNER_AUDIT: CTABannerData = {
  headline: "Not sure where to start? Get a Growth Audit.",
  subCopy:
    "A comprehensive review of your site, marketing, and automation stack \u2014 with a clear roadmap to fix what\u2019s broken.",
  ctaLabel: "Get a Growth Audit",
  ctaDestination: "/audit",
  highlightedWord: "Growth Audit",
};

const TESTIMONIALS: TestimonialData[] = [
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

const CTA_BANNER_CONSULTATION: CTABannerData = {
  headline: "Ready to build your repeatable growth engine?",
  subCopy:
    "Book a free consultation and we\u2019ll show you the clearest next move for your brand, funnel, and automation stack.",
  ctaLabel: "Book a Free Consultation",
  ctaDestination: "/start",
  highlightedWord: "growth engine",
};

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is Growveloper?",
    answer:
      "Growveloper is a full-service growth studio that combines web development, marketing, and AI automation under one roof. We build, market, and automate \u2014 so you don\u2019t need three separate agencies.",
  },
  {
    question: "How does it work?",
    answer:
      "Simple: we audit your current setup, architect a growth plan, build the solution, then scale it. Four steps, one team, measurable results.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes. We use enterprise-grade encryption and secure cloud storage. Your data belongs only to you \u2014 always.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. You can upgrade, downgrade, or cancel your retainer anytime \u2014 no hidden fees or contracts.",
  },
];

const LIVE_FEED_ITEMS: LabContentCard[] = [
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

export default function Home() {
  return (
    <>
      {/* Section 02 — Hero */}
      <Hero data={HERO_DATA} />

      {/* Section 03 — The Diagnosis */}
      <GlassSection>
        <DiagnosisCards id="diagnosis" data={DIAGNOSIS_DATA} />
      </GlassSection>

      {/* Section 04 — What We Can Do For You */}
      <ServicesAlternating data={SERVICES_DATA} />
      <CTABanner
        data={CTA_BANNER_SERVICES}
        presentationMode="inline"
        colorScheme="teal-solid"
      />

      {/* Section 05 — Who We Work With */}
      <GlassSection>
        <IndustriesGrid data={INDUSTRIES_DATA} />
      </GlassSection>

      {/* Section 06 — What Success Looks Like (code-driven, no CMS) */}
      <SuccessAnimation />

      {/* Section 07 — How It Works */}
      <GlassSection>
        <ProcessSteps data={PROCESS_DATA} />
      </GlassSection>

      {/* Banner CTA — Growth Audit */}
      <CTABanner
        data={CTA_BANNER_AUDIT}
        presentationMode="section"
        colorScheme="teal-solid"
      />

      {/* Section 08 — Case Studies */}
      <CaseStudiesSection
        headline="Proof in the numbers"
        highlightedWord="numbers"
        description="Real results from real projects. Every card links to the full story."
        items={CASE_STUDIES}
      />

      {/* Before & After */}
      <GlassSection>
        <BeforeAfterCompare data={BEFORE_AFTER_DATA} />
      </GlassSection>

      {/* Section 09 — Testimonials */}
      <HomeTestimonials
        headline="What our clients say"
        highlightedWord="clients"
        description="Social proof from the people who matter most — the ones who hired us."
        items={TESTIMONIALS}
      />

      {/* Section 10 — FAQ */}
      <FAQAccordion
        sectionHeadline="Frequently Asked Questions"
        sectionDescription="Everything you need to know about working with us. Can’t find an answer? Book a call."
        ctaHeadline="Still Have Questions?"
        ctaDescription="We understand every business is unique. Reach out anytime."
        ctaLabel="Book a Consultation"
        ctaUrl="/start"
        items={FAQ_ITEMS}
        highlightedWord="Questions"
      />

      {/* Section 11 — What We're Up To */}
      <GlassSection>
        <LiveFeed
          headline="What We’re Up To"
          highlightedWord="Up To"
          description="The latest from our blog, YouTube, and TikTok — all in one place."
          items={LIVE_FEED_ITEMS}
          sectionTitle="Latest from The Lab"
          seeAllLabel="See everything"
          seeAllUrl="/lab"
        />
      </GlassSection>

      {/* Section 12 — Newsletter */}
      <NewsletterCapture
        headline="Get smarter about growth"
        highlightedWord="growth"
        subCopy="Weekly breakdowns of what's working in dev, marketing, and automation — straight to your inbox."
        ctaLabel="Subscribe"
      />

      {/* Banner CTA — Free Consultation */}
      <CTABanner
        data={CTA_BANNER_CONSULTATION}
        presentationMode="section"
        colorScheme="teal-solid"
      />
    </>
  );
}
