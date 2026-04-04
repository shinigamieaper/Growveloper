import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubServicesBentoDevelopment, BeforeAfterCompareClient } from "@/components/services/ClientDynamicComponents";
import { ServiceHero } from "@/components/shared/ServiceHero";
import { AuditProcess } from "@/components/audit/AuditProcess";
import { CaseStudiesSection } from "@/components/home/CaseStudies";
import { HomeTestimonials } from "@/components/home/Testimonials";
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
import { getServicePage, getServiceFAQ, getAllLabContent, getSiteSettings } from "@/lib/sanity/queries";
import type {
  ServicePageHeroData,
  ServiceProblemData,
  SubServicesData,
  AuditProcessData,
  ServiceQualifierData,
  CTABannerData,
  IndustriesGridData,
  BeforeAfterData,
} from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getServicePage("development"), getSiteSettings()]);
  const ogImage = page?.ogImage ?? settings?.ogImage;
  return {
    title: page?.seoTitle ?? "Web Development \u2014 GROWVELOPER",
    description:
      page?.seoDescription ??
      "Performance-first Next.js development where every millisecond of load time and every GA4 event is treated as a growth lever.",
    openGraph: {
      title: page?.seoTitle ?? "Web Development \u2014 GROWVELOPER",
      url: "/services/development",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function DevelopmentPage() {
  const [page, faq, labItems] = await Promise.all([
    getServicePage("development"),
    getServiceFAQ("development"),
    getAllLabContent(),
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
    secondaryCtaUrl: page.heroSecondaryCtaUrl ?? "/work",
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
            name: "Web Development",
            description: page.heroSubStatement ?? "",
            provider: { "@type": "Organization", name: "GROWVELOPER", url: "https://growveloper.com" },
            serviceType: "Web Development",
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
      {subServices && <SubServicesBentoDevelopment data={subServices} id="dev-services" />}

      {/* Section 05 — Process */}
      {process && (
        <GlassSection>
          <AuditProcess data={process} />
        </GlassSection>
      )}

      {/* Section 06 — Before vs After */}
      {beforeAfter && <BeforeAfterCompareClient data={beforeAfter} />}

      {/* Section 07 — Mid CTA */}
      {ctaMid && <CTABanner data={ctaMid} presentationMode="inline" colorScheme="light-teal" />}

      {/* Section 08 — Case Studies */}
      {page.caseStudiesHeadline && (page.featuredCaseStudies?.length ?? 0) > 0 && (
        <CaseStudiesSection
          headline={page.caseStudiesHeadline}
          highlightedWord={page.caseStudiesHighlightedWord}
          description={page.caseStudiesDescription}
          items={page.featuredCaseStudies ?? []}
        />
      )}

      {/* Section 09 — Testimonials */}
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

      {/* Section 10 — Qualifiers */}
      {qualifiers && <ServiceQualifiers data={qualifiers} />}

      {/* Section 11 — FAQ */}
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

      {/* Section 12 — Industries */}
      {industriesData && (
        <GlassSection>
          <IndustriesGrid data={industriesData} />
        </GlassSection>
      )}

      {/* Section 13 — From The Lab */}
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

      {/* Section 14 — Final CTA */}
      {ctaFinal && <CTABanner data={ctaFinal} presentationMode="section" colorScheme="teal-solid" />}

    </>
  );
}
