import type { Metadata } from "next";
import { ServiceHero } from "@/components/shared/ServiceHero";
import { AuditProcess } from "@/components/audit/AuditProcess";
import { BeforeAfterCompare } from "@/components/shared/BeforeAfterCompare";
import { CaseStudiesSection } from "@/components/home/CaseStudies";
import { HomeTestimonials } from "@/components/home/Testimonials";
import { SubServicesBento } from "@/components/development/SubServicesBento";
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
  DEVELOPMENT_HERO,
  DEVELOPMENT_STATS,
  DEVELOPMENT_PROBLEM,
  DEVELOPMENT_SUB_SERVICES,
  DEVELOPMENT_PROCESS,
  DEVELOPMENT_BEFORE_AFTER,
  DEVELOPMENT_CASE_STUDIES,
  DEVELOPMENT_TESTIMONIALS,
  DEVELOPMENT_QUALIFIERS,
  DEVELOPMENT_FAQ,
  DEVELOPMENT_CTA_MID,
  DEVELOPMENT_CTA_FINAL,
  DEVELOPMENT_INDUSTRIES,
  DEVELOPMENT_LAB_ITEMS,
} from "@/lib/data/services/development";

/* ─── SEO ─── */

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Web Development \u2014 GROWVELOPER",
    description:
      "Performance-first Next.js development where every millisecond of load time and every GA4 event is treated as a growth lever \u2014 not an afterthought.",
    openGraph: {
      title: "Web Development \u2014 GROWVELOPER",
      description:
        "Performance-first Next.js builds engineered for conversion. Core Web Vitals, GTM, GA4, and CMS setup \u2014 all under one roof.",
      url: "/services/development",
    },
  };
}

/* ─── Page ─── */

export default function DevelopmentPage() {
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
            name: "Web Development",
            description:
              "Performance-first Next.js development with Core Web Vitals, GTM, GA4, and CMS setup.",
            provider: {
              "@type": "Organization",
              name: "GROWVELOPER",
              url: "https://growveloper.com",
            },
            serviceType: "Web Development",
            areaServed: "Worldwide",
          }),
        }}
      />

      {/* Section 01 — Hero */}
      <ServiceHero data={DEVELOPMENT_HERO} />

      {/* Section 02 — Credibility stats */}
      <StatsBand
        items={DEVELOPMENT_STATS}
        headline="Performance you can measure"
        highlightedWord="measure"
        description="Numbers from real builds we\u2019ve shipped and maintained."
      />

      {/* Section 03 — The Problem (glass) */}
      <GlassSection>
        <ServiceProblem data={DEVELOPMENT_PROBLEM} />
      </GlassSection>

      {/* Section 04 — What's Covered (Bento Grid) */}
      <SubServicesBento data={DEVELOPMENT_SUB_SERVICES} id="dev-services" />

      {/* Section 05 — How We Build (glass) */}
      <GlassSection>
        <AuditProcess data={DEVELOPMENT_PROCESS} />
      </GlassSection>

      {/* Section 06 — Before vs After */}
      <BeforeAfterCompare data={DEVELOPMENT_BEFORE_AFTER} />

      {/* Section 08 — Case Studies */}
      <CaseStudiesSection
        headline="Proof in the numbers"
        highlightedWord="numbers"
        description="Real performance improvements from real client projects."
        items={DEVELOPMENT_CASE_STUDIES}
      />

      {/* Section 09 — Testimonials (glass) */}
      <GlassSection>
        <HomeTestimonials
          headline="What our clients say"
          highlightedWord="clients"
          description="Hear from the founders and growth leads who hired us."
          items={DEVELOPMENT_TESTIMONIALS}
        />
      </GlassSection>

      {/* Section 10 — Who It's For */}
      <ServiceQualifiers data={DEVELOPMENT_QUALIFIERS} />

      {/* Section 11 — FAQ (glass) */}
      <GlassSection>
        <FAQAccordion
          sectionHeadline="Frequently Asked Questions"
          sectionDescription="Everything you need to know about our development services."
          ctaHeadline="Still Have Questions?"
          ctaDescription="Every project is different. Let\u2019s talk about yours."
          ctaLabel="Book a Consultation"
          ctaUrl="/start"
          items={DEVELOPMENT_FAQ}
          highlightedWord="Questions"
        />
      </GlassSection>

      {/* Section 12 — Industries We Accelerate */}
      <GlassSection>
        <IndustriesGrid data={DEVELOPMENT_INDUSTRIES} />
      </GlassSection>

      {/* Section 13 — From The Lab */}
      <LiveFeed
        headline="From The Lab"
        highlightedWord="Lab"
        description="The latest insights, experiments, and deep dives from our team."
        items={DEVELOPMENT_LAB_ITEMS}
        sectionTitle="Latest from The Lab"
        seeAllLabel="See everything"
        seeAllUrl="/lab"
      />

      {/* Section 14 — Mid CTA Banner */}
      <CTABanner
        data={DEVELOPMENT_CTA_MID}
        presentationMode="inline"
        colorScheme="light-teal"
      />

      {/* Section 15 — Final CTA */}
      <CTABanner
        data={DEVELOPMENT_CTA_FINAL}
        presentationMode="section"
        colorScheme="teal-solid"
      />
    </>
  );
}
