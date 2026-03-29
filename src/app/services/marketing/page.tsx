import type { Metadata } from "next";
import { ServiceHero } from "@/components/shared/ServiceHero";
import { SubServicesBento } from "@/components/marketing/SubServicesBento";
import { AuditProcess } from "@/components/audit/AuditProcess";
import { CaseStudiesSection } from "@/components/home/CaseStudies";
import { HomeTestimonials } from "@/components/home/Testimonials";
import { BeforeAfterCompare } from "@/components/shared/BeforeAfterCompare";
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
  MARKETING_HERO,
  MARKETING_PROBLEM,
  MARKETING_SUB_SERVICES,
  MARKETING_QUALIFIERS,
  MARKETING_PROCESS,
  MARKETING_CASE_STUDIES,
  MARKETING_TESTIMONIALS,
  MARKETING_BEFORE_AFTER,
  MARKETING_CTA_AUDIT,
  MARKETING_FAQ,
  MARKETING_CTA_FINAL,
  MARKETING_STATS,
  MARKETING_INDUSTRIES,
  MARKETING_LAB_ITEMS,
} from "@/lib/data/services/marketing";

/* ─── SEO ─── */

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Growth Marketing \u2014 GROWVELOPER",
    description:
      "Performance marketing that compounds your growth. AEO, SEO, Paid Ads, Content Strategy, CRO, and Analytics \u2014 all under one roof.",
    openGraph: {
      title: "Growth Marketing \u2014 GROWVELOPER",
      description:
        "Performance marketing that compounds your growth. AEO, SEO, Paid Ads, Content Strategy, CRO, and Analytics.",
      url: "/services/marketing",
    },
  };
}

/* ─── Page ─── */

export default function MarketingPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Growth Marketing",
            description:
              "Performance marketing that compounds your growth. AEO, SEO, Paid Ads, Content Strategy, CRO, and Analytics.",
            provider: {
              "@type": "Organization",
              name: "GROWVELOPER",
              url: "https://growveloper.com",
            },
            serviceType: "Digital Marketing",
            areaServed: "Worldwide",
          }),
        }}
      />

      {/* Section 01 — Hero */}
      <ServiceHero data={MARKETING_HERO} />

      {/* Section 02 — Credibility stats */}
      <StatsBand
        items={MARKETING_STATS}
        headline="Proven growth results"
        highlightedWord="results"
        description="Numbers from real marketing campaigns we've built and scaled."
      />

      {/* Section 03 — The Problem (glass) */}
      <GlassSection>
        <ServiceProblem data={MARKETING_PROBLEM} />
      </GlassSection>

      {/* Section 04 — What's Covered (Bento Grid) */}
      <SubServicesBento data={MARKETING_SUB_SERVICES} id="sub-services" />

      {/* Section 05 — How We Work (glass) */}
      <GlassSection>
        <AuditProcess data={MARKETING_PROCESS} />
      </GlassSection>

      {/* Section 06 — Before vs After */}
      <BeforeAfterCompare data={MARKETING_BEFORE_AFTER} />

      {/* Section 08 — Case Studies */}
      <CaseStudiesSection
        headline="Proof in the numbers"
        highlightedWord="numbers"
        description="Real results from real marketing projects."
        items={MARKETING_CASE_STUDIES}
      />

      {/* Section 09 — Testimonials (glass) */}
      <GlassSection>
        <HomeTestimonials
          headline="What our clients say"
          highlightedWord="clients"
          description="Hear from the founders and marketing leads who hired us."
          items={MARKETING_TESTIMONIALS}
        />
      </GlassSection>

      {/* Section 10 — Who It's For */}
      <ServiceQualifiers data={MARKETING_QUALIFIERS} />

      {/* Section 11 — FAQ (glass) */}
      <GlassSection>
        <FAQAccordion
          sectionHeadline="Frequently Asked Questions"
          sectionDescription="Everything you need to know about our marketing services."
          ctaHeadline="Still Have Questions?"
          ctaDescription="Every business is different. Let\u2019s talk about yours."
          ctaLabel="Book a Consultation"
          ctaUrl="/start"
          items={MARKETING_FAQ}
          highlightedWord="Questions"
        />
      </GlassSection>

      {/* Section 12 — Industries We Accelerate */}
      <GlassSection>
        <IndustriesGrid data={MARKETING_INDUSTRIES} />
      </GlassSection>

      {/* Section 13 — From The Lab */}
      <LiveFeed
        headline="From The Lab"
        highlightedWord="Lab"
        description="The latest insights, experiments, and deep dives from our team."
        items={MARKETING_LAB_ITEMS}
        sectionTitle="Latest from The Lab"
        seeAllLabel="See everything"
        seeAllUrl="/lab"
      />

      {/* Section 14 — Banner CTA → Audit */}
      <CTABanner
        data={MARKETING_CTA_AUDIT}
        presentationMode="inline"
        colorScheme="light-teal"
      />

      {/* Section 15 — Final CTA */}
      <CTABanner
        data={MARKETING_CTA_FINAL}
        presentationMode="section"
        colorScheme="teal-solid"
      />
    </>
  );
}

