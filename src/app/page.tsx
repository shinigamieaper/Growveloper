import type { Metadata } from "next";
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
import {
  getHomePage,
  getHomeFAQ,
  getAllLabContent,
  getSiteSettings,
} from "@/lib/sanity/queries";
import type {
  HomeHeroData,
  DiagnosisSectionData,
  StickyScrollSectionData,
  IndustriesGridData,
  BeforeAfterData,
} from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getHomePage(), getSiteSettings()]);
  const ogImage = page?.ogImage ?? settings?.ogImage;
  return {
    title: {
      absolute: page?.seoTitle ?? settings?.seoTitle ?? "GROWVELOPER \u2014 Technical Growth Engine",
    },
    description:
      page?.seoDescription ??
      settings?.seoDescription ??
      "I architect high-performance digital engines where clean code and marketing ROI are inseparable.",
    openGraph: ogImage ? { images: [{ url: ogImage }] } : undefined,
  };
}

export default async function Home() {
  const [page, faq, labContent, settings] = await Promise.all([
    getHomePage(),
    getHomeFAQ(),
    getAllLabContent(),
    getSiteSettings(),
  ]);

  if (!page) return null;

  /* ── Map flat Sanity fields to component interface shapes ── */

  const hero: HomeHeroData = {
    headline: page.heroHeadline,
    highlightedWord: page.heroHighlightedWord,
    subStatement: page.heroSubStatement,
    primaryCtaLabel: page.heroPrimaryCtaLabel,
    primaryCtaUrl: page.heroPrimaryCtaUrl,
    secondaryCtaLabel: page.heroSecondaryCtaLabel,
    secondaryCtaUrl: page.heroSecondaryCtaUrl,
    socialProofText: page.heroSocialProofText,
    scrollCueTargetId: page.heroScrollCueTargetId,
    scrollCueText: page.heroScrollCueText,
  };

  const diagnosis: DiagnosisSectionData = {
    headline: page.diagnosisHeadline,
    highlightedWord: page.diagnosisHighlightedWord,
    description: page.diagnosisDescription,
    layoutStyle: "grid-2x2",
    cards: page.diagnosisCards ?? [],
  };

  const services: StickyScrollSectionData = {
    headline: page.servicesHeadline,
    highlightedWord: page.servicesHighlightedWord,
    description: page.servicesDescription,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: page.serviceItems ?? [],
  };

  const industriesData: IndustriesGridData = {
    headline: page.industriesHeadline,
    highlightedWord: page.industriesHighlightedWord,
    description: page.industriesDescription,
    industries: page.industryCards ?? [],
    ctaHeadline: page.industriesCtaHeadline ?? "",
    ctaLabel: page.industriesCtaLabel ?? "",
    ctaUrl: page.industriesCtaUrl ?? "/start",
  };

  const process: StickyScrollSectionData = {
    headline: page.processHeadline,
    highlightedWord: page.processHighlightedWord,
    description: page.processDescription,
    // processSteps use `title` not `heading` — remap
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: (page.processSteps ?? []).map((s: any) => ({ ...s, heading: s.title })),
  };

  const beforeAfter: BeforeAfterData = {
    headline: page.beforeAfterHeadline,
    highlightedWord: page.beforeAfterHighlightedWord,
    description: page.beforeAfterDescription,
    pairs: page.beforeAfterPairs ?? [],
  };

  const caseStudies = page.featuredCaseStudies ?? [];
  const testimonials = page.featuredTestimonials ?? [];
  const liveFeedItems = labContent.slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "GROWVELOPER",
            url: "https://growveloper.com",
            description:
              page.seoDescription ??
              settings?.seoDescription ??
              "Technical growth engineering — where clean code meets marketing ROI.",
          }),
        }}
      />
      {/* Section 02 — Hero */}
      <Hero data={hero} />

      {/* Section 03 — The Diagnosis */}
      {diagnosis.cards.length > 0 && (
        <GlassSection>
          <DiagnosisCards id="diagnosis" data={diagnosis} />
        </GlassSection>
      )}

      {/* Section 04 — What We Can Do For You */}
      {services.items.length > 0 && (
        <>
          <ServicesAlternating data={services} id="services" />
          {page.ctaBanner1 && (
            <CTABanner
              data={page.ctaBanner1}
              presentationMode="inline"
              colorScheme="teal-solid"
            />
          )}
        </>
      )}

      {/* Section 05 — Who We Work With */}
      {industriesData.industries.length > 0 && (
        <GlassSection id="industries">
          <IndustriesGrid data={industriesData} />
        </GlassSection>
      )}

      {/* Section 06 — What Success Looks Like */}
      <SuccessAnimation successMetrics={page.successMetrics ?? []} />

      {/* Section 07 — How It Works */}
      {process.items.length > 0 && (
        <GlassSection id="process">
          <ProcessSteps data={process} />
        </GlassSection>
      )}

      {/* Banner CTA — Growth Audit */}
      {page.ctaBanner2 && (
        <CTABanner
          data={page.ctaBanner2}
          presentationMode="section"
          colorScheme="teal-solid"
        />
      )}

      {/* Section 08 — Case Studies */}
      {caseStudies.length > 0 && (
        <CaseStudiesSection
          id="case-studies"
          headline={page.caseStudiesHeadline ?? "Proof in the numbers"}
          highlightedWord={page.caseStudiesHighlightedWord ?? "numbers"}
          description={page.caseStudiesDescription ?? "Real results from real projects."}
          items={caseStudies}
        />
      )}

      {/* Before & After */}
      {beforeAfter.pairs.length > 0 && (
        <GlassSection>
          <BeforeAfterCompare data={beforeAfter} />
        </GlassSection>
      )}

      {/* Section 09 — Testimonials */}
      {testimonials.length > 0 && (
        <HomeTestimonials
          headline={page.testimonialHeadline ?? "What our clients say"}
          highlightedWord={page.testimonialHighlightedWord ?? "clients"}
          description={page.testimonialDescription ?? "Social proof from the people who matter most."}
          items={testimonials}
          ctaHeadline={page.testimonialCtaHeadline}
          ctaLabel={page.testimonialCtaLabel}
          ctaUrl={page.testimonialCtaUrl}
        />
      )}

      {/* Section 10 — FAQ */}
      {faq.length > 0 && (
        <FAQAccordion
          sectionHeadline={page.faqHeadline}
          sectionDescription={page.faqDescription}
          ctaHeadline={page.faqCtaHeadline}
          ctaDescription={page.faqCtaDescription}
          ctaLabel={page.faqCtaLabel}
          ctaUrl={page.faqCtaUrl}
          items={faq}
          highlightedWord={page.faqHighlightedWord}
        />
      )}

      {/* Section 11 — What We're Up To */}
      {liveFeedItems.length > 0 && (
        <GlassSection>
          <LiveFeed
            headline={page.liveFeedHeadline}
            highlightedWord={page.liveFeedHighlightedWord}
            description={page.liveFeedDescription ?? ""}
            items={liveFeedItems}
            sectionTitle=""
            seeAllLabel={page.liveFeedSeeAllLabel ?? ""}
            seeAllUrl="/lab"
          />
        </GlassSection>
      )}

      {/* Section 12 — Newsletter */}
      {settings?.newsletterHeadline && (
        <NewsletterCapture
          headline={settings.newsletterHeadline}
          highlightedWord={settings.newsletterHighlightedWord}
          subCopy={settings.newsletterSubCopy ?? ""}
          ctaLabel={settings.newsletterCtaLabel ?? ""}
          successHeadline={settings.newsletterSuccessHeadline}
          successSubCopy={settings.newsletterSuccessSubCopy}
          emailPlaceholder={settings.newsletterEmailPlaceholder}
        />
      )}

    </>
  );
}
