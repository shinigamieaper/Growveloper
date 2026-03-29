import type { Metadata } from "next";
import { ServiceHero } from "@/components/shared/ServiceHero";
import { AuditProcess } from "@/components/audit/AuditProcess";
import { BeforeAfterCompare } from "@/components/shared/BeforeAfterCompare";
import { CaseStudiesSection } from "@/components/home/CaseStudies";
import { HomeTestimonials } from "@/components/home/Testimonials";
import { SubServicesBento } from "@/components/ai/SubServicesBento";
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
  AI_HERO,
  AI_STATS,
  AI_PROBLEM,
  AI_SUB_SERVICES,
  AI_FEATURED_AUTOMATIONS,
  AI_PROCESS,
  AI_BEFORE_AFTER,
  AI_CASE_STUDIES,
  AI_TESTIMONIALS,
  AI_QUALIFIERS,
  AI_FAQ,
  AI_CTA_MID,
  AI_CTA_FINAL,
  AI_INDUSTRIES,
  AI_LAB_ITEMS,
} from "@/lib/data/services/ai";

/* ─── SEO ─── */

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AI & Automation \u2014 GROWVELOPER",
    description:
      "Done-for-you automation workflows and custom AI infrastructure \u2014 built by a team that understands your funnel, not just your tech stack.",
    openGraph: {
      title: "AI & Automation \u2014 GROWVELOPER",
      description:
        "From lead qualification to content pipelines \u2014 we automate the work your team shouldn\u2019t be doing manually.",
      url: "/services/ai",
    },
  };
}

/* ─── Page ─── */

export default function AIPage() {
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
            name: "AI & Automation",
            description:
              "Done-for-you automation workflows and custom AI infrastructure for growing businesses.",
            provider: {
              "@type": "Organization",
              name: "GROWVELOPER",
              url: "https://growveloper.com",
            },
            serviceType: "AI Automation",
            areaServed: "Worldwide",
          }),
        }}
      />

      {/* Section 01 — Hero */}
      <ServiceHero data={AI_HERO} />

      {/* Section 02 — Credibility stats */}
      <StatsBand
        items={AI_STATS}
        headline="Automation that delivers"
        highlightedWord="delivers"
        description="Numbers from real automation projects we\u2019ve built and deployed."
      />

      {/* Section 03 — The Problem (glass) */}
      <GlassSection>
        <ServiceProblem data={AI_PROBLEM} />
      </GlassSection>

      {/* Section 04 — What We Automate (Bento Grid) */}
      <SubServicesBento data={AI_SUB_SERVICES} id="ai-services" />

      {/* Section 05 — Featured Automations (glass) */}
      <GlassSection>
        <FeaturedAutomations data={AI_FEATURED_AUTOMATIONS} />
      </GlassSection>

      {/* Section 06 — How We Work */}
      <AuditProcess data={AI_PROCESS} />

      {/* Section 07 — Before vs After (glass) */}
      <GlassSection>
        <BeforeAfterCompare data={AI_BEFORE_AFTER} />
      </GlassSection>

      {/* Section 08 — Case Studies */}
      <CaseStudiesSection
        headline="Proof in the numbers"
        highlightedWord="numbers"
        description="Real results from real automation projects."
        items={AI_CASE_STUDIES}
      />

      {/* Section 09 — Testimonials (glass) */}
      <GlassSection>
        <HomeTestimonials
          headline="What our clients say"
          highlightedWord="clients"
          description="Hear from the founders and ops leads who hired us."
          items={AI_TESTIMONIALS}
        />
      </GlassSection>

      {/* Section 10 — Who It\u2019s For */}
      <ServiceQualifiers data={AI_QUALIFIERS} />

      {/* Section 11 — FAQ (glass) */}
      <GlassSection>
        <FAQAccordion
          sectionHeadline="Frequently Asked Questions"
          sectionDescription="Everything you need to know about our automation services."
          ctaHeadline="Still Have Questions?"
          ctaDescription="Every automation is different. Let\u2019s talk about yours."
          ctaLabel="Book a Consultation"
          ctaUrl="/start"
          items={AI_FAQ}
          highlightedWord="Questions"
        />
      </GlassSection>

      {/* Section 12 — Industries We Accelerate */}
      <GlassSection>
        <IndustriesGrid data={AI_INDUSTRIES} />
      </GlassSection>

      {/* Section 13 — From The Lab */}
      <LiveFeed
        headline="From The Lab"
        highlightedWord="Lab"
        description="The latest insights, experiments, and deep dives from our team."
        items={AI_LAB_ITEMS}
        sectionTitle="Latest from The Lab"
        seeAllLabel="See everything"
        seeAllUrl="/lab"
      />

      {/* Section 14 — Mid CTA → Automations Catalogue */}
      <CTABanner
        data={AI_CTA_MID}
        presentationMode="inline"
        colorScheme="light-teal"
      />

      {/* Section 15 — Final CTA */}
      <CTABanner
        data={AI_CTA_FINAL}
        presentationMode="section"
        colorScheme="teal-solid"
      />
    </>
  );
}
