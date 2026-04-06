"use client";

import { useState, useMemo } from "react";
import {
  GlassSection,
  CTABanner,
  SectionHeader,
  ContentFilterBar,
  ScrollFadeUp,
  BeforeAfterCompare,
  FAQAccordion,
} from "@/components";
import { CaseStudiesSection } from "@/components/home/CaseStudies";
import { ServicesAlternating } from "@/components/home/ServicesAlternating";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import type {
  CaseStudyCardData,
  StickyScrollSectionData,
  BeforeAfterData,
  IndustriesGridData,
  CTABannerData,
  WorkPageData,
  FAQItem,
} from "@/lib/types";

interface WorkPageClientProps {
  caseStudies: CaseStudyCardData[];
  workPageData: WorkPageData | null;
  faq: FAQItem[];
}

export function WorkPageClient({ caseStudies, workPageData, faq }: WorkPageClientProps) {
  const industries = useMemo(
    () => [...new Set(caseStudies.map((cs) => (cs as CaseStudyCardData & { clientIndustry?: string }).clientIndustry).filter(Boolean) as string[])],
    [caseStudies],
  );

  const filterOptions = industries.map((i) => ({ label: i, value: i }));

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const visible = useMemo(() => {
    if (activeFilters.length === 0) return caseStudies;
    return caseStudies.filter((cs) =>
      activeFilters.includes(
        (cs as CaseStudyCardData & { clientIndustry?: string }).clientIndustry ?? "",
      ),
    );
  }, [activeFilters, caseStudies]);

  const servicesData: StickyScrollSectionData | null = useMemo(() => {
    if (!workPageData?.serviceItems?.length) return null;
    return {
      headline: workPageData.servicesHeadline,
      highlightedWord: workPageData.servicesHighlightedWord,
      description: workPageData.servicesDescription,
      items: workPageData.serviceItems,
    };
  }, [workPageData]);

  const processData: StickyScrollSectionData | null = useMemo(() => {
    if (!workPageData?.processSteps?.length) return null;
    return {
      headline: workPageData.processHeadline,
      highlightedWord: workPageData.processHighlightedWord,
      description: workPageData.processDescription,
      items: workPageData.processSteps,
    };
  }, [workPageData]);

  const beforeAfterData: BeforeAfterData | null = useMemo(() => {
    if (!workPageData?.beforeAfterHeadline) return null;
    return {
      headline: workPageData.beforeAfterHeadline,
      highlightedWord: workPageData.beforeAfterHighlightedWord,
      description: workPageData.beforeAfterDescription,
      pairs: workPageData.beforeAfterPairs ?? [],
    };
  }, [workPageData]);

  const industriesData: IndustriesGridData | null = useMemo(() => {
    if (!workPageData?.industries?.length) return null;
    return {
      headline: workPageData.industriesHeadline ?? "",
      highlightedWord: workPageData.industriesHighlightedWord,
      description: workPageData.industriesDescription,
      industries: workPageData.industries,
      ctaHeadline: workPageData.industriesCtaHeadline ?? "",
      ctaLabel: workPageData.industriesCtaLabel ?? "",
      ctaUrl: workPageData.industriesCtaUrl ?? "",
    };
  }, [workPageData]);

  const ctaInlineData: CTABannerData | null = useMemo(() => {
    if (!workPageData?.ctaInlineHeadline) return null;
    return {
      headline: workPageData.ctaInlineHeadline,
      highlightedWord: workPageData.ctaInlineHighlightedWord,
      ctaLabel: workPageData.ctaInlineLabel ?? "",
      ctaDestination: workPageData.ctaInlineDestination ?? "",
    };
  }, [workPageData]);

  const ctaSectionData: CTABannerData | null = useMemo(() => {
    if (!workPageData?.ctaSectionHeadline) return null;
    return {
      headline: workPageData.ctaSectionHeadline,
      highlightedWord: workPageData.ctaSectionHighlightedWord,
      ctaLabel: workPageData.ctaSectionLabel ?? "",
      ctaDestination: workPageData.ctaSectionDestination ?? "",
    };
  }, [workPageData]);

  if (!workPageData) return null;

  return (
    <>
      {/* 01 — Hero */}
      {workPageData.pageHeadline && (
        <section className="pt-16 pb-16 md:pt-20 md:pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              headline={workPageData.pageHeadline}
              highlightedWord={workPageData.pageHighlightedWord}
              description={workPageData.pageDescription}
            />
          </div>
        </section>
      )}

      {/* 02 — Filter Bar */}
      {filterOptions.length > 1 && (
        <section className="pb-8">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollFadeUp>
              <ContentFilterBar
                filters={filterOptions}
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
              {caseStudies.length === 0
                ? (workPageData.emptyStatePrimary ?? "")
                : (workPageData.emptyStateFiltered ?? "")}
            </p>
          )}
        </div>
      </section>

      {/* 04 — What We Do (3 pillars) */}
      {servicesData && <ServicesAlternating data={servicesData} />}

      {/* 05 — How It Works */}
      {processData && (
        <GlassSection>
          <ProcessSteps data={processData} />
        </GlassSection>
      )}

      {/* 06 — Before & After */}
      {beforeAfterData && <BeforeAfterCompare data={beforeAfterData} />}

      {/* 07 — Industries We Accelerate */}
      {industriesData && (
        <GlassSection>
          <IndustriesGrid data={industriesData} />
        </GlassSection>
      )}

      {/* FAQ */}
      {faq.length > 0 && (
        <GlassSection>
          <FAQAccordion
            items={faq}
            sectionHeadline={workPageData.faqHeadline ?? "Frequently asked questions"}
            highlightedWord={workPageData.faqHighlightedWord ?? "questions"}
            sectionDescription={workPageData.faqDescription}
            ctaHeadline={workPageData.faqCtaHeadline}
            ctaDescription={workPageData.faqCtaDescription}
            ctaLabel={workPageData.faqCtaLabel}
            ctaUrl={workPageData.faqCtaUrl}
          />
        </GlassSection>
      )}

      {/* Inline CTA */}
      {ctaInlineData && (
        <CTABanner
          data={ctaInlineData}
          presentationMode="inline"
          colorScheme="light-teal"
        />
      )}

      {/* Section CTA */}
      {ctaSectionData && (
        <CTABanner
          data={ctaSectionData}
          presentationMode="section"
          colorScheme="teal-solid"
        />
      )}
    </>
  );
}
