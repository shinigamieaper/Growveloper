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
  HOME_HERO,
  HOME_DIAGNOSIS,
  HOME_SERVICES,
  HOME_CTA_SERVICES,
  HOME_INDUSTRIES,
  HOME_PROCESS,
  HOME_CASE_STUDIES,
  HOME_BEFORE_AFTER,
  HOME_CTA_AUDIT,
  HOME_TESTIMONIALS,
  HOME_CTA_CONSULTATION,
  HOME_FAQ,
  HOME_LIVE_FEED,
} from "@/lib/data/home";

export default function Home() {
  return (
    <>
      {/* Section 02 — Hero */}
      <Hero data={HOME_HERO} />

      {/* Section 03 — The Diagnosis */}
      <GlassSection>
        <DiagnosisCards id="diagnosis" data={HOME_DIAGNOSIS} />
      </GlassSection>

      {/* Section 04 — What We Can Do For You */}
      <ServicesAlternating data={HOME_SERVICES} />
      <CTABanner
        data={HOME_CTA_SERVICES}
        presentationMode="inline"
        colorScheme="teal-solid"
      />

      {/* Section 05 — Who We Work With */}
      <GlassSection>
        <IndustriesGrid data={HOME_INDUSTRIES} />
      </GlassSection>

      {/* Section 06 — What Success Looks Like (code-driven, no CMS) */}
      <SuccessAnimation />

      {/* Section 07 — How It Works */}
      <GlassSection>
        <ProcessSteps data={HOME_PROCESS} />
      </GlassSection>

      {/* Banner CTA — Growth Audit */}
      <CTABanner
        data={HOME_CTA_AUDIT}
        presentationMode="section"
        colorScheme="teal-solid"
      />

      {/* Section 08 — Case Studies */}
      <CaseStudiesSection
        headline="Proof in the numbers"
        highlightedWord="numbers"
        description="Real results from real projects. Every card links to the full story."
        items={HOME_CASE_STUDIES}
      />

      {/* Before & After */}
      <GlassSection>
        <BeforeAfterCompare data={HOME_BEFORE_AFTER} />
      </GlassSection>

      {/* Section 09 — Testimonials */}
      <HomeTestimonials
        headline="What our clients say"
        highlightedWord="clients"
        description="Social proof from the people who matter most — the ones who hired us."
        items={HOME_TESTIMONIALS}
      />

      {/* Section 10 — FAQ */}
      <FAQAccordion
        sectionHeadline="Frequently Asked Questions"
        sectionDescription="Everything you need to know about working with us. Can't find an answer? Book a call."
        ctaHeadline="Still Have Questions?"
        ctaDescription="We understand every business is unique. Reach out anytime."
        ctaLabel="Book a Consultation"
        ctaUrl="/start"
        items={HOME_FAQ}
        highlightedWord="Questions"
      />

      {/* Section 11 — What We're Up To */}
      <GlassSection>
        <LiveFeed
          headline="What We're Up To"
          highlightedWord="Up To"
          description="The latest from our blog, YouTube, and TikTok — all in one place."
          items={HOME_LIVE_FEED}
          sectionTitle="Latest from The Lab"
          seeAllLabel="See everything"
          seeAllUrl="/lab"
        />
      </GlassSection>

      {/* Section 12 — Newsletter */}
      <NewsletterCapture
        headline="Get smarter about growth"
        highlightedWord="growth"
        subCopy="Weekly breakdowns of what's working in dev, marketing, and automation — straight to your inbox."
        ctaLabel="Subscribe"
      />

      {/* Banner CTA — Free Consultation */}
      <CTABanner
        data={HOME_CTA_CONSULTATION}
        presentationMode="section"
        colorScheme="teal-solid"
      />
    </>
  );
}
