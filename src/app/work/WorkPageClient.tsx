"use client";

import { useState, useMemo } from "react";
import {
  GlassSection,
  CTABanner,
  SectionHeader,
  ContentFilterBar,
  ScrollFadeUp,
  BeforeAfterCompare,
} from "@/components";
import { CaseStudiesSection } from "@/components/home/CaseStudies";
import { HomeTestimonials } from "@/components/home/Testimonials";
import { ServicesAlternating } from "@/components/home/ServicesAlternating";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { LiveFeed } from "@/components/home/LiveFeed";
import {
  ALL_CASE_STUDIES,
  getCaseStudyCards,
  getCaseStudyIndustries,
  WORK_CTA_INLINE,
  WORK_CTA_SECTION,
  WORK_HEADLINE,
  WORK_HIGHLIGHTED_WORD,
  WORK_DESCRIPTION,
  WORK_TESTIMONIALS,
} from "@/lib/data/caseStudies";
import type {
  StickyScrollSectionData,
  BeforeAfterData,
  IndustriesGridData,
  LabContentCard,
} from "@/lib/types";

const ALL_CARDS = getCaseStudyCards();
const INDUSTRIES = getCaseStudyIndustries();
const FILTER_OPTIONS = INDUSTRIES.map((i) => ({ label: i, value: i }));

const SERVICES_DATA: StickyScrollSectionData = {
  headline: "What we do",
  highlightedWord: "we do",
  description:
    "Three disciplines working as one system — not three separate agencies.",
  items: [
    {
      stepNumber: "01",
      heading: "Development",
      description:
        "Performance-optimised web builds, CMS-driven page systems, and the engineering infrastructure that makes growth measurable.",
      ctaLabel: "Learn more",
      ctaUrl: "/services/development",
      lottiePath: "/lottie/Web Development.lottie",
      fallbackGradient: "linear-gradient(135deg, #1a1a2e, var(--brand-dark))",
    },
    {
      stepNumber: "02",
      heading: "Marketing",
      description:
        "Paid acquisition, SEO, AEO, content, and conversion optimisation — all fed by the same data your engineering team uses.",
      ctaLabel: "Learn more",
      ctaUrl: "/services/marketing",
      lottiePath: "/lottie/Digital Marketing.lottie",
      fallbackGradient: "linear-gradient(135deg, var(--brand-dark), #1a2a2a)",
    },
    {
      stepNumber: "03",
      heading: "AI & Automation",
      description:
        "Lead scoring, CRM automation, reporting pipelines, and AI-powered workflows that eliminate manual work.",
      ctaLabel: "Learn more",
      ctaUrl: "/services/ai",
      lottiePath: "/lottie/Chat Bot.lottie",
      fallbackGradient: "linear-gradient(135deg, #1a2a2a, var(--brand-mid))",
    },
  ],
};

const PROCESS_DATA: StickyScrollSectionData = {
  headline: "How it works",
  highlightedWord: "it works",
  description:
    "Four steps from audit to scale. One team, one vision, measurable results at every stage.",
  items: [
    {
      stepNumber: "01",
      heading: "Audit",
      description:
        "We analyse your current digital presence — site speed, SEO health, ad performance, tech stack, and conversion flow.",
      lottiePath: "/lottie/step-audit.lottie",
      fallbackGradient: "linear-gradient(135deg, #1a1a2e, var(--brand-dark))",
    },
    {
      stepNumber: "02",
      heading: "Architect",
      description:
        "Based on the audit, we design your growth engine — the right tech stack, marketing channels, and automation workflows.",
      lottiePath: "/lottie/step-architect.lottie",
      fallbackGradient: "linear-gradient(135deg, var(--brand-dark), #1a2a2a)",
    },
    {
      stepNumber: "03",
      heading: "Build",
      description:
        "We build everything in-house. Development, marketing campaigns, automation flows — one team, one vision.",
      lottiePath: "/lottie/step-build.lottie",
      fallbackGradient: "linear-gradient(135deg, #1a2a2a, var(--brand-mid))",
    },
    {
      stepNumber: "04",
      heading: "Scale",
      description:
        "Once the engine is running, we optimise and scale. Monthly reporting, A/B testing, and continuous iteration.",
      lottiePath: "/lottie/step-scale.lottie",
      fallbackGradient:
        "linear-gradient(135deg, var(--brand-mid), var(--brand-dark))",
    },
  ],
};

const BEFORE_AFTER_DATA: BeforeAfterData = {
  headline: "The difference is visible",
  highlightedWord: "visible",
  description:
    "Real before-and-after transformations from our client projects.",
  pairs: [
    {
      clientName: "Client Dashboard",
      beforeImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80",
      afterImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80",
      beforeLabel: "Before",
      afterLabel: "After",
    },
  ],
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

const LAB_ITEMS: LabContentCard[] = [
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
    description:
      "Watch how we approach design systems for scalable products.",
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

export function WorkPageClient() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const visible = useMemo(() => {
    if (activeFilters.length === 0) return ALL_CARDS;
    return ALL_CASE_STUDIES.filter((cs) =>
      activeFilters.includes(cs.clientIndustry),
    );
  }, [activeFilters]);

  return (
    <>
      {/* 01 — Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            headline={WORK_HEADLINE}
            highlightedWord={WORK_HIGHLIGHTED_WORD}
            description={WORK_DESCRIPTION}
          />
        </div>
      </section>

      {/* 02 — Filter Bar */}
      {FILTER_OPTIONS.length > 1 && (
        <section className="pb-8">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollFadeUp>
              <ContentFilterBar
                filters={FILTER_OPTIONS}
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
              />
            </ScrollFadeUp>
          </div>
        </section>
      )}

      {/* 03 — Case Study Feed */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-6xl px-6">
          {visible.length > 0 ? (
            <CaseStudiesSection items={visible} />
          ) : (
            <p className="py-16 text-center text-text-tertiary">
              No case studies match the selected filter.
            </p>
          )}
        </div>
      </section>

      {/* 04 — What We Do (3 pillars) */}
      <ServicesAlternating data={SERVICES_DATA} />

      {/* 05 — How It Works */}
      <GlassSection>
        <ProcessSteps data={PROCESS_DATA} />
      </GlassSection>

      {/* 06 — Before & After */}
      <BeforeAfterCompare data={BEFORE_AFTER_DATA} />

      {/* 07 — Testimonials (glass) */}
      {WORK_TESTIMONIALS.length > 0 && (
        <GlassSection>
          <HomeTestimonials
            headline="What clients say"
            highlightedWord="clients"
            items={WORK_TESTIMONIALS}
            ctaHeadline="This could be you\u2026"
            ctaLabel="Start a project"
            ctaUrl="/start"
          />
        </GlassSection>
      )}

      {/* 08 — Industries We Accelerate */}
      <GlassSection>
        <IndustriesGrid data={INDUSTRIES_DATA} />
      </GlassSection>

      {/* 09 — From The Lab */}
      <LiveFeed
        headline="From The Lab"
        highlightedWord="Lab"
        description="The latest insights, experiments, and deep dives from our team."
        items={LAB_ITEMS}
        sectionTitle="Latest from The Lab"
        seeAllLabel="See everything"
        seeAllUrl="/lab"
      />

      {/* Inline CTA */}
      <CTABanner
        data={WORK_CTA_INLINE}
        presentationMode="inline"
        colorScheme="light-teal"
      />

      {/* Section CTA */}
      <CTABanner
        data={WORK_CTA_SECTION}
        presentationMode="section"
        colorScheme="teal-solid"
      />
    </>
  );
}