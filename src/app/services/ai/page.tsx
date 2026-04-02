import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubServicesBentoAI, BeforeAfterCompareClient } from "@/components/services/ClientDynamicComponents";
import { ServiceHero } from "@/components/shared/ServiceHero";
import { AuditProcess } from "@/components/audit/AuditProcess";
import { CaseStudiesSection } from "@/components/home/CaseStudies";
import { HomeTestimonials } from "@/components/home/Testimonials";
import { FeaturedAutomations } from "@/components/ai/FeaturedAutomations";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { LiveFeed } from "@/components/home/LiveFeed";
import {
  GlassSection,
  CTABanner,
  FAQAccordion,
  StatsBand,
  ServiceProblem,
  ServiceQualifiers,
} from "@/components";
import {
  getServicePage,
  getServiceFAQ,
  getAllLabContent,
  getFeaturedAutomationsCMS,
  getSiteSettings,
} from "@/lib/sanity/queries";
import type {
  ServicePageHeroData,
  ServiceProblemData,
  SubServicesData,
  AuditProcessData,
  ServiceQualifierData,
  CTABannerData,
  IndustriesGridData,
  BeforeAfterData,
  FeaturedAutomationsSection,
} from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "AI & Automation \u2014 GROWVELOPER",
    description:
      settings?.seoDescription ??
      "Done-for-you automation workflows and custom AI infrastructure \u2014 built by a team that understands your funnel, not just your tech stack.",
    openGraph: {
      title: "AI & Automation \u2014 GROWVELOPER",
      url: "/services/ai",
    },
  };
}

export default async function AIPage() {
  const [page, faq, labItems, featuredAutomations] = await Promise.all([
    getServicePage("ai"),
    getServiceFAQ("ai"),
    getAllLabContent(),
    getFeaturedAutomationsCMS(),
  ]);

  if (!page) notFound();

  /* ── Hero ── */
  const hero: ServicePageHeroData = {
    headline: page.heroHeadline ?? "",
    highlightedWord: page.heroHighlightedWord,
    subStatement: page.heroSubStatement ?? "",
    primaryCtaLabel: page.heroPrimaryCtaLabel ?? "",
    primaryCtaUrl: page.heroPrimaryCtaUrl ?? "/start",
    secondaryCtaLabel: page.heroSecondaryCtaLabel ?? "",
    secondaryCtaUrl: page.heroSecondaryCtaUrl ?? "/automations",
    scrollCueText: page.heroScrollCueText,
    scrollCueTargetId: page.heroScrollCueTargetId,
  };

  /* ── Problem ── */
  const problem: ServiceProblemData | null = page.problemHeadline
    ? {
        headline: page.problemHeadline,
        highlightedWord: page.problemHighlightedWord,
        painPoints: page.problemPainPoints ?? [],
      }
    : null;

  /* ── Sub Services ── */
  const subServices: SubServicesData | null = page.subServicesHeadline
    ? {
        headline: page.subServicesHeadline,
        highlightedWord: page.subServicesHighlightedWord,
        description: page.subServicesDescription,
        items: (page.subServiceItems ?? []).map((item) => ({
          title: item.title,
          description: item.description,
          icon: item.icon,
        })),
      }
    : null;

  /* ── Featured Automations ── */
  const automationsSection: FeaturedAutomationsSection | null =
    page.featuredAutomationsHeadline && featuredAutomations.length > 0
      ? {
          headline: page.featuredAutomationsHeadline,
          highlightedWord: page.featuredAutomationsHighlightedWord,
          description: page.featuredAutomationsDescription,
          items: featuredAutomations,
          viewAllLabel: page.featuredAutomationsViewAllLabel ?? "",
          viewAllUrl: page.featuredAutomationsViewAllUrl ?? "/automations",
        }
      : null;

  /* ── Process ── */
  const process: AuditProcessData | null = page.processHeadline
    ? {
        headline: page.processHeadline,
        highlightedWord: page.processHighlightedWord,
        steps: (page.processSteps ?? []).map((s) => ({
          stepNumber: s.stepNumber,
          title: s.title,
          description: s.description,
        })),
      }
    : null;

  /* ── Qualifiers ── */
  const qualifiers: ServiceQualifierData | null = page.qualifiersHeadline
    ? {
        headline: page.qualifiersHeadline,
        highlightedWord: page.qualifiersHighlightedWord,
        qualifiers: page.qualifiers ?? [],
      }
    : null;

  /* ── CTA Banners ── */
  const ctaMid: CTABannerData | null = page.ctaBannerMid?.headline
    ? (page.ctaBannerMid as CTABannerData)
    : null;

  const ctaFinal: CTABannerData | null = page.ctaBannerFinal?.headline
    ? (page.ctaBannerFinal as CTABannerData)
    : null;

  /* ── Before & After ── */
  const beforeAfter: BeforeAfterData | null =
    page.beforeAfterHeadline && (page.beforeAfterPairs?.length ?? 0) > 0
      ? {
          headline: page.beforeAfterHeadline,
          highlightedWord: page.beforeAfterHighlightedWord,
          description: page.beforeAfterDescription,
          pairs: page.beforeAfterPairs ?? [],
        }
      : null;

  /* ── Industries ── */
  const industriesData: IndustriesGridData | null =
    page.industriesHeadline && page.industriesCtaHeadline
      ? {
          headline: page.industriesHeadline,
          highlightedWord: page.industriesHighlightedWord,
          description: page.industriesDescription,
          industries: page.featuredIndustries ?? [],
          ctaHeadline: page.industriesCtaHeadline,
          ctaLabel: page.industriesCtaLabel ?? "",
          ctaUrl: page.industriesCtaUrl ?? "/start",
        }
      : null;

  const labSample = labItems.slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI & Automation",
            description: page.heroSubStatement ?? "",
            provider: { "@type": "Organization", name: "GROWVELOPER", url: "https://growveloper.com" },
            serviceType: "AI Automation",
            areaServed: "Worldwide",
          }),
        }}
      />

      {/* Section 01 — Hero */}
      <ServiceHero data={hero} />

      {/* Section 02 — Stats Band */}
      {page.statsHeadline && (page.statsItems?.length ?? 0) > 0 && (
        <StatsBand
          items={page.statsItems ?? []}
          headline={page.statsHeadline}
          highlightedWord={page.statsHighlightedWord}
          description={page.statsDescription}
        />
      )}

      {/* Section 03 — The Problem */}
      {problem && (
        <GlassSection>
          <ServiceProblem data={problem} />
        </GlassSection>
      )}

      {/* Section 04 — Sub Services */}
      {subServices && <SubServicesBentoAI data={subServices} id="ai-services" />}

      {/* Section 05 — Featured Automations */}
      {automationsSection && (
        <GlassSection>
          <FeaturedAutomations data={automationsSection} />
        </GlassSection>
      )}

      {/* Section 06 — Process */}
      {process && <AuditProcess data={process} />}

      {/* Section 07 — Before vs After */}
      {beforeAfter && (
        <GlassSection>
          <BeforeAfterCompareClient data={beforeAfter} />
        </GlassSection>
      )}

      {/* Section 08 — Mid CTA */}
      {ctaMid && <CTABanner data={ctaMid} presentationMode="inline" colorScheme="light-teal" />}

      {/* Section 09 — Case Studies */}
      {page.caseStudiesHeadline && (page.featuredCaseStudies?.length ?? 0) > 0 && (
        <CaseStudiesSection
          headline={page.caseStudiesHeadline}
          highlightedWord={page.caseStudiesHighlightedWord}
          description={page.caseStudiesDescription}
          items={page.featuredCaseStudies ?? []}
        />
      )}

      {/* Section 10 — Testimonials */}
      {page.testimonialsHeadline && (page.featuredTestimonials?.length ?? 0) > 0 && (
        <GlassSection>
          <HomeTestimonials
            headline={page.testimonialsHeadline}
            highlightedWord={page.testimonialsHighlightedWord}
            description={page.testimonialsDescription}
            items={page.featuredTestimonials ?? []}
          />
        </GlassSection>
      )}

      {/* Section 11 — Qualifiers */}
      {qualifiers && <ServiceQualifiers data={qualifiers} />}

      {/* Section 12 — FAQ */}
      {faq.length > 0 && (
        <GlassSection>
          <FAQAccordion
            sectionHeadline={page.faqSectionHeadline}
            sectionDescription={page.faqSectionDescription}
            ctaHeadline={page.faqCtaHeadline}
            ctaDescription={page.faqCtaDescription}
            ctaLabel={page.faqCtaLabel}
            ctaUrl={page.faqCtaUrl}
            items={faq}
            highlightedWord={page.faqSectionHighlightedWord}
          />
        </GlassSection>
      )}

      {/* Section 13 — Industries */}
      {industriesData && (
        <GlassSection>
          <IndustriesGrid data={industriesData} />
        </GlassSection>
      )}

      {/* Section 14 — From The Lab */}
      {page.labHeadline && labSample.length > 0 && (
        <LiveFeed
          headline={page.labHeadline}
          highlightedWord={page.labHighlightedWord}
          description={page.labDescription ?? ""}
          items={labSample}
          sectionTitle={page.labSectionTitle ?? ""}
          seeAllLabel={page.labSeeAllLabel ?? ""}
          seeAllUrl={page.labSeeAllUrl ?? "/lab"}
        />
      )}

      {/* Section 15 — Final CTA */}
      {ctaFinal && <CTABanner data={ctaFinal} presentationMode="section" colorScheme="teal-solid" />}

    </>
  );
}
