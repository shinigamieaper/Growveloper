import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  GlassSection,
  CTABanner,
  FAQAccordion,
  SectionHeader,
  ScrollFadeUp,
  StatsBand,
  ServiceProblem,
  ServiceQualifiers,
} from "@/components";
import { SuccessAnimation } from "@/components/home/SuccessAnimation";
import { HomeTestimonials } from "@/components/home/Testimonials";
import { CaseStudiesSection } from "@/components/home/CaseStudies";
import { ServiceHero } from "@/components/shared/ServiceHero";
import { ServicesAlternating } from "@/components/home/ServicesAlternating";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { LiveFeed } from "@/components/home/LiveFeed";
import {
  ALL_INDUSTRIES,
  ALL_INDUSTRY_CARDS,
  getIndustryBySlug,
  INDUSTRY_CTA_SECTION,
} from "@/lib/data/industries";
import {
  getCaseStudyBySlug,
} from "@/lib/data/caseStudies";
import type {
  ServicePageHeroData,
  ServiceProblemData,
  StickyScrollSectionData,
  IndustriesGridData,
  LabContentCard,
  ServiceQualifierData,
  CaseStudyPageData,
  CTABannerData,
} from "@/lib/types";

/* ─── Static params ─── */
export function generateStaticParams() {
  return ALL_INDUSTRIES.map((i) => ({ slug: i.slug }));
}

/* ─── Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Industry Not Found — GROWVELOPER" };
  return {
    title: `${industry.name} — GROWVELOPER`,
    description: industry.heroSubStatement,
  };
}

/* ─── Page ─── */
export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  /* Map data into shared component shapes */

  const heroData: ServicePageHeroData = {
    headline: industry.heroHeadline,
    highlightedWord: industry.heroHighlightedWord,
    subStatement: industry.heroSubStatement,
    primaryCtaLabel: industry.primaryCtaLabel,
    primaryCtaUrl: industry.primaryCtaUrl,
    secondaryCtaLabel: "See our work",
    secondaryCtaUrl: "/work",
    scrollCueText: "Scroll to explore",
    scrollCueTargetId: "pain-points",
  };

  const problemData: ServiceProblemData = {
    headline: "Sound familiar?",
    highlightedWord: "familiar",
    painPoints: industry.painPoints,
  };

  const howWeHelpData: StickyScrollSectionData = {
    headline: "How we help",
    highlightedWord: "help",
    description: `Three pillars working together to accelerate ${industry.name} growth.`,
    items: industry.serviceCards.map((card, i) => ({
      stepNumber: String(i + 1).padStart(2, "0"),
      heading: card.title,
      description: card.description,
      ctaLabel: "Learn more",
      ctaUrl: card.link,
      lottiePath:
        i === 0
          ? "/lottie/Web Development.lottie"
          : i === 1
            ? "/lottie/Digital Marketing.lottie"
            : "/lottie/Chat Bot.lottie",
      fallbackGradient:
        i === 0
          ? "linear-gradient(135deg, #1a1a2e, var(--brand-dark))"
          : i === 1
            ? "linear-gradient(135deg, var(--brand-dark), #1a2a2a)"
            : "linear-gradient(135deg, #1a2a2a, var(--brand-mid))",
    })),
  };

  const processData: StickyScrollSectionData = {
    headline: "How it works",
    highlightedWord: "it works",
    description:
      "Four steps from audit to scale. One team, one vision, measurable results at every stage.",
    items: [
      {
        stepNumber: "01",
        heading: "Audit",
        description: `We analyse your current ${industry.name} setup — site speed, SEO health, ad performance, tech stack, and conversion flow. You get a clear picture of what\u2019s working and what\u2019s leaking revenue.`,
        lottiePath: "/lottie/step-audit.lottie",
        fallbackGradient: "linear-gradient(135deg, #1a1a2e, var(--brand-dark))",
      },
      {
        stepNumber: "02",
        heading: "Architect",
        description:
          "Based on the audit, we design your growth engine — the right tech stack, marketing channels, and automation workflows tailored to your business model and budget.",
        lottiePath: "/lottie/step-architect.lottie",
        fallbackGradient: "linear-gradient(135deg, var(--brand-dark), #1a2a2a)",
      },
      {
        stepNumber: "03",
        heading: "Build",
        description:
          "We build everything in-house. Development, marketing campaigns, automation flows — one team, one vision, no broken telephone between agencies.",
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

  const otherIndustries = ALL_INDUSTRY_CARDS.filter(
    (card) => card.slug !== industry.slug,
  );

  const otherIndustriesData: IndustriesGridData = {
    headline: "Industries we accelerate",
    highlightedWord: "accelerate",
    description:
      "We specialise in high-growth sectors where technical performance and marketing ROI are inseparable.",
    industries: otherIndustries,
    ctaHeadline: "Don\u2019t see your industry?",
    ctaLabel: "Let\u2019s talk",
    ctaUrl: "/start",
  };

  const labItems: LabContentCard[] = [
    {
      title: `How We Approach ${industry.name} Growth`,
      slug: "growth-approach",
      excerpt:
        "A deep dive into the strategy, design decisions, and technical implementation behind our growth methodology.",
      heroImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      publishedAt: "2024-12-15",
      readTime: "8 min read",
      category: "Strategy",
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

  const qualifierData: ServiceQualifierData = {
    headline: "This is for you if\u2026",
    highlightedWord: "for you",
    qualifiers: industry.painPoints.slice(0, 4).map((p) =>
      p.replace(/^[A-Z]/, (c) => c.toLowerCase()),
    ),
  };

  /* Resolve case studies from slugs */
  const caseStudies: CaseStudyPageData[] = industry.caseStudySlugs
    .map((s) => getCaseStudyBySlug(s))
    .filter((cs): cs is CaseStudyPageData => cs !== null);

  const ctaInline: CTABannerData = {
    headline: `Working in ${industry.name}? Let\u2019s talk.`,
    highlightedWord: industry.name,
    ctaLabel: "Book a free consultation",
    ctaDestination: "/start",
  };

  return (
    <>
      {/* 01 — Hero */}
      <ServiceHero data={heroData} />

      {/* 02 — Pain Points (glass) */}
      <GlassSection id="pain-points">
        <ServiceProblem data={problemData} />
      </GlassSection>

      {/* 03 — How We Help (StickyScroll 3 pillars) */}
      <ServicesAlternating data={howWeHelpData} />

      {/* 04 — How It Works */}
      <GlassSection>
        <ProcessSteps data={processData} />
      </GlassSection>

      {/* 05 — What Success Looks Like */}
      <SuccessAnimation />

      {/* 06 — Outcome Stats (glass) */}
      <GlassSection>
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollFadeUp>
              <SectionHeader
                headline="The numbers"
                highlightedWord="numbers"
                description={`Real outcomes from our work in ${industry.name}.`}
              />
            </ScrollFadeUp>
          </div>
          <StatsBand items={industry.outcomeStats} />
        </div>
      </GlassSection>

      {/* 05 — Case Studies */}
      {caseStudies.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollFadeUp>
              <SectionHeader
                headline="Work in this space"
                highlightedWord="Work"
                description="Real projects, real results."
              />
            </ScrollFadeUp>
            <CaseStudiesSection items={caseStudies} />
          </div>
        </section>
      )}

      {/* 06 — Testimonials (glass) */}
      {industry.testimonials.length > 0 && (
        <GlassSection>
          <HomeTestimonials
            headline="Clients in this space"
            highlightedWord="Clients"
            items={industry.testimonials}
            ctaHeadline="This could be you\u2026"
            ctaLabel="Start a project"
            ctaUrl="/start"
          />
        </GlassSection>
      )}

      {/* 07 — Who It\u2019s For */}
      <ServiceQualifiers data={qualifierData} />

      {/* 10 — Other Industries */}
      <GlassSection>
        <IndustriesGrid data={otherIndustriesData} />
      </GlassSection>

      {/* 11 — Inline CTA */}
      <CTABanner
        data={ctaInline}
        presentationMode="inline"
        colorScheme="light-teal"
      />

      {/* 12 — FAQ (glass) */}
      {industry.faq.length > 0 && (
        <GlassSection>
          <FAQAccordion
            items={industry.faq}
            sectionHeadline="Common questions"
            highlightedWord="questions"
            sectionDescription={`Everything you need to know about working with us in ${industry.name}.`}
            ctaHeadline="Still have questions?"
            ctaDescription="Every engagement starts with a free consultation. Let\u2019s talk through your specific situation."
            ctaLabel="Book a Consultation"
            ctaUrl="/start"
          />
        </GlassSection>
      )}

      {/* 13 — From The Lab */}
      <GlassSection>
        <LiveFeed
          headline="From The Lab"
          highlightedWord="Lab"
          description="The latest insights, experiments, and deep dives from our team."
          items={labItems}
          sectionTitle="Latest from The Lab"
          seeAllLabel="See everything"
          seeAllUrl="/lab"
        />
      </GlassSection>

      {/* 14 — Section CTA */}
      <CTABanner
        data={INDUSTRY_CTA_SECTION}
        presentationMode="section"
        colorScheme="teal-solid"
      />
    </>
  );
}