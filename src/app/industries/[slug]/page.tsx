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
  BeforeAfterCompare,
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
  getAllIndustries,
  getIndustryBySlug,
  getCaseStudyBySlug,
  getAllLabContent,
  getSiteSettings,
} from "@/lib/sanity/queries";
import type {
  ServicePageHeroData,
  ServiceProblemData,
  StickyScrollSectionData,
  IndustriesGridData,
  ServiceQualifierData,
  CTABannerData,
  BeforeAfterData,
} from "@/lib/types";

/* ─── Static params ─── */
export async function generateStaticParams() {
  const industries = await getAllIndustries();
  return industries.map((i) => ({ slug: i.slug }));
}

/* ─── Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [industry, settings] = await Promise.all([
    getIndustryBySlug(slug),
    getSiteSettings(),
  ]);
  if (!industry) return { title: "Industry Not Found" };
  return {
    title: `${industry.name}`,
    description: industry.heroSubStatement,
    openGraph: settings?.ogImage
      ? { images: [{ url: settings.ogImage }] }
      : undefined,
  };
}

/* ─── Page ─── */
export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [industry, allIndustries, labContent] = await Promise.all([
    getIndustryBySlug(slug),
    getAllIndustries(),
    getAllLabContent(),
  ]);
  if (!industry) notFound();

  /* Resolve case studies from slugs */
  const caseStudies = (
    await Promise.all(industry.caseStudySlugs.map((s) => getCaseStudyBySlug(s)))
  ).filter((cs): cs is NonNullable<typeof cs> => cs !== null);

  /* Map data into shared component shapes */

  const heroData: ServicePageHeroData = {
    headline: industry.heroHeadline,
    highlightedWord: industry.heroHighlightedWord,
    subStatement: industry.heroSubStatement,
    primaryCtaLabel: industry.primaryCtaLabel ?? "Book a free consultation",
    primaryCtaUrl: industry.primaryCtaUrl ?? "/start",
    secondaryCtaLabel: industry.secondaryCtaLabel ?? "See our work",
    secondaryCtaUrl: industry.secondaryCtaUrl ?? "/work",
    scrollCueText: industry.scrollCueText ?? "Scroll to explore",
    scrollCueTargetId: "pain-points",
  };

  const problemData: ServiceProblemData = {
    headline: industry.problemHeadline ?? "Sound familiar?",
    highlightedWord: industry.problemHighlightedWord ?? "familiar",
    painPoints: industry.painPoints,
  };

  const howWeHelpData: StickyScrollSectionData = {
    headline: industry.howWeHelpHeadline ?? "How we help",
    highlightedWord: industry.howWeHelpHighlightedWord ?? "help",
    description: industry.howWeHelpDescription ?? `Three pillars working together to accelerate ${industry.name} growth.`,
    items: industry.serviceCards.map((card, i) => ({
      stepNumber: String(i + 1).padStart(2, "0"),
      heading: card.title,
      description: card.description,
      ctaLabel: industry.serviceCardCtaLabel ?? "Learn more",
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
    headline: industry.processHeadline ?? "How it works",
    highlightedWord: industry.processHighlightedWord ?? "it works",
    description: industry.processDescription ?? "Four steps from audit to scale. One team, one vision, measurable results at every stage.",
    items: industry.processSteps?.length
      ? industry.processSteps
      : [
          {
            stepNumber: "01",
            heading: "Audit",
            description: `We analyse your current ${industry.name} setup — site speed, SEO health, ad performance, tech stack, and conversion flow. You get a clear picture of what’s working and what’s leaking revenue.`,
            lottiePath: "/lottie/step-audit.lottie",
            fallbackGradient: "linear-gradient(135deg, #1a1a2e, var(--brand-dark))",
          },
          {
            stepNumber: "02",
            heading: "Architect",
            description: "Based on the audit, we design your growth engine — the right tech stack, marketing channels, and automation workflows tailored to your business model and budget.",
            lottiePath: "/lottie/step-architect.lottie",
            fallbackGradient: "linear-gradient(135deg, var(--brand-dark), #1a2a2a)",
          },
          {
            stepNumber: "03",
            heading: "Build",
            description: "We build everything in-house. Development, marketing campaigns, automation flows — one team, one vision, no broken telephone between agencies.",
            lottiePath: "/lottie/step-build.lottie",
            fallbackGradient: "linear-gradient(135deg, #1a2a2a, var(--brand-mid))",
          },
          {
            stepNumber: "04",
            heading: "Scale",
            description: "Once the engine is running, we optimise and scale. Monthly reporting, A/B testing, new automations, and continuous iteration to compound your growth.",
            lottiePath: "/lottie/step-scale.lottie",
            fallbackGradient: "linear-gradient(135deg, var(--brand-mid), var(--brand-dark))",
          },
        ],
  };

  const beforeAfterData: BeforeAfterData | null = industry.beforeAfterHeadline
    ? {
        headline: industry.beforeAfterHeadline,
        highlightedWord: industry.beforeAfterHighlightedWord,
        description: industry.beforeAfterDescription,
        pairs: industry.beforeAfterPairs ?? [],
      }
    :  null;

  const otherIndustries = allIndustries.filter((i) => i.slug !== industry.slug);

  const otherIndustriesData: IndustriesGridData = {
    headline: industry.otherIndustriesHeadline ?? "Industries we accelerate",
    highlightedWord: industry.otherIndustriesHighlightedWord ?? "accelerate",
    description: industry.otherIndustriesDescription ?? "We specialise in high-growth sectors where technical performance and marketing ROI are inseparable.",
    industries: otherIndustries,
    ctaHeadline: industry.otherIndustriesCtaHeadline ?? "Don't see your industry?",
    ctaLabel: industry.otherIndustriesCtaLabel ?? "Let's talk",
    ctaUrl: "/start",
  };

  const qualifierData: ServiceQualifierData = {
    headline: industry.qualifierHeadline ?? "This is for you if…",
    highlightedWord: industry.qualifierHighlightedWord ?? "for you",
    qualifiers: industry.painPoints.slice(0, 4).map((p) =>
      p.replace(/^[A-Z]/, (c) => c.toLowerCase()),
    ),
  };

  const ctaInline: CTABannerData = {
    headline: industry.ctaInlineHeadline ?? `Working in ${industry.name}? Let's talk.`,
    highlightedWord: industry.ctaInlineHighlightedWord ?? industry.name,
    ctaLabel: industry.ctaInlineLabel ?? "Book a free consultation",
    ctaDestination: industry.ctaInlineDestination ?? "/start",
  };

  const ctaSectionData: CTABannerData = {
    headline: industry.ctaSectionHeadline ?? "Ready to accelerate your growth?",
    highlightedWord: industry.ctaSectionHighlightedWord ?? "accelerate",
    ctaLabel: industry.ctaSectionLabel ?? "Book a free consultation",
    ctaDestination: industry.ctaSectionDestination ?? "/start",
  };

  const labItems = labContent.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${industry.name} Growth Services`,
            description: industry.heroSubStatement ?? "",
            provider: { "@type": "Organization", name: "GROWVELOPER", url: "https://growveloper.com" },
            serviceType: industry.name,
            areaServed: "Worldwide",
            url: `https://growveloper.com/industries/${industry.slug}`,
          }),
        }}
      />

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

      {/* 05 — Before & After */}
      {beforeAfterData && beforeAfterData.pairs.length > 0 && (
        <BeforeAfterCompare data={beforeAfterData} />
      )}

      {/* 06 — What Success Looks Like */}
      <SuccessAnimation />

      {/* 06 — Outcome Stats (glass) */}
      {industry.outcomeStats.length > 0 && (
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
      )}

      {/* 07 — Case Studies */}
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

      {/* 08 — Testimonials (glass) */}
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

      {/* 09 — Who It\u2019s For */}
      <ServiceQualifiers data={qualifierData} />

      {/* 10 — Other Industries */}
      {otherIndustries.length > 0 && (
        <GlassSection>
          <IndustriesGrid data={otherIndustriesData} />
        </GlassSection>
      )}

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
      {labItems.length > 0 && (
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
      )}

      {/* 14 — Section CTA */}
      <CTABanner
        data={ctaSectionData}
        presentationMode="section"
        colorScheme="teal-solid"
      />
    </>
  );
}
