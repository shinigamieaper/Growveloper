import type { Metadata } from "next";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FileText, Presentation, Video, Map } from "lucide-react";
import { AuditHero } from "@/components/audit/AuditHero";
import { AuditPricing } from "@/components/audit/AuditPricing";
import { AuditFindings } from "@/components/audit/AuditFindings";
import { AuditProcess } from "@/components/audit/AuditProcess";
import { CaseStudiesSection } from "@/components/home/CaseStudies";
import { HomeTestimonials } from "@/components/home/Testimonials";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import {
  SectionHeader,
  GrowveloperCard,
  GlassSection,
  CTABanner,
  FAQAccordion,
  StaggerChildren,
  ServiceLottie,
  NewsletterCapture,
  AnimatedList,
} from "@/components";
import {
  AUDIT_HERO,
  AUDIT_QUALIFIERS,
  AUDIT_SCOPE,
  AUDIT_DELIVERABLES,
  AUDIT_PROCESS,
  AUDIT_FINDINGS,
  AUDIT_PRICING,
  AUDIT_FAQ,
  AUDIT_CTA_FINAL,
  AUDIT_CASE_STUDIES,
  AUDIT_INDUSTRIES,
  AUDIT_TESTIMONIALS,
} from "@/lib/data/audit";
import type {
  AuditQualifierData,
  AuditScopeData,
  AuditDeliverablesData,
} from "@/lib/types";

/* ─── ICON MAP for deliverables (rendering concern, stays in page) ─── */
const ICON_MAP: Record<string, LucideIcon> = {
  "file-text": FileText,
  presentation: Presentation,
  video: Video,
  map: Map,
};

/* ─── METADATA ─── */

export async function generateMetadata(): Promise<Metadata> {
  const seoTitle = "Growth Audit | GROWVELOPER";
  const seoDescription =
    "A comprehensive audit of your development, marketing, and AI infrastructure \u2014 with a clear roadmap to fix it.";

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "website",
    },
  };
}

/* ─── JSON-LD SCHEMA ─── */

function AuditJsonLd({ price, description }: { price: string; description: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Growth Audit",
    provider: {
      "@type": "Person",
      name: "Juwon",
    },
    description,
    offers: {
      "@type": "Offer",
      price: price.replace(/[^0-9.]/g, "") || "500",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── PAGE ─── */

export default function AuditPage() {
  return (
    <>
      <AuditJsonLd
        price={AUDIT_HERO.price}
        description="A comprehensive audit of your development, marketing, and AI infrastructure with a clear roadmap to fix it."
      />

      {/* ═══ Section 01 — HERO ═══ */}
      <AuditHero data={AUDIT_HERO} scrollCueTargetId="case-studies" />

      {/* ═══ Section 02 — WHO IT'S FOR ═══ */}
      <AuditQualifiers data={AUDIT_QUALIFIERS} />

      {/* ═══ Section 03 — WHAT WE LOOK AT ═══ */}
      <GlassSection>
        <AuditScope data={AUDIT_SCOPE} />
      </GlassSection>

      {/* ═══ Section 04 — WHAT YOU GET ═══ */}
      <AuditDeliverables data={AUDIT_DELIVERABLES} />

      {/* ═══ Section 05 — HOW IT WORKS ═══ */}
      <GlassSection>
        <AuditProcess data={AUDIT_PROCESS} />
      </GlassSection>

      {/* ═══ Section 06 — WHAT WE'VE FOUND ═══ */}
      <AuditFindings data={AUDIT_FINDINGS} />

      {/* ═══ Section 07 — PRICING ═══ */}
      <GlassSection>
        <AuditPricing data={AUDIT_PRICING} />
      </GlassSection>

      {/* ═══ Section 08 — CASE STUDIES ═══ */}
      <CaseStudiesSection
        id="case-studies"
        headline="Proof in the numbers"
        highlightedWord="numbers"
        description="Real results from real projects. Every card links to the full story."
        items={AUDIT_CASE_STUDIES}
      />

      {/* ═══ Section 09 — INDUSTRIES ═══ */}
      <GlassSection>
        <IndustriesGrid data={AUDIT_INDUSTRIES} />
      </GlassSection>

      {/* ═══ Section 10 — TESTIMONIALS ═══ */}
      <HomeTestimonials
        headline="What our clients say"
        highlightedWord="clients"
        description="Social proof from the people who matter most \u2014 the ones who hired us."
        items={AUDIT_TESTIMONIALS}
      />

      {/* ═══ Section 11 — FAQ ═══ */}
      <FAQAccordion
        items={AUDIT_FAQ}
        sectionHeadline="Frequently asked questions"
        highlightedWord="questions"
      />

      {/* ═══ Section 12 — NEWSLETTER ═══ */}
      <NewsletterCapture
        headline="Get smarter about growth"
        highlightedWord="growth"
        subCopy="Weekly breakdowns of what\u2019s working in dev, marketing, and automation \u2014 straight to your inbox."
        ctaLabel="Subscribe"
      />

      {/* ═══ Section 13 — FINAL CTA ═══ */}
      <CTABanner
        data={AUDIT_CTA_FINAL}
        colorScheme="teal-solid"
        presentationMode="section"
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   INLINE SECTION COMPONENTS
   Server-safe compositions of existing shared client components.
   Each returns null if data is missing.
   ═══════════════════════════════════════════════════════════ */

/* --- Section 02: Who It's For --- */
function AuditQualifiers({ data }: { data: AuditQualifierData | null }) {
  if (!data || data.qualifiers.length === 0) return null;

  const qualifierItems = data.qualifiers.map((qualifier) => (
    <div
      key={qualifier}
      className="flex items-start gap-3 rounded-xl border border-glass-border bg-glass-bg p-4 backdrop-blur-md"
    >
      <Check
        className="mt-0.5 h-5 w-5 shrink-0 text-brand-mid"
        strokeWidth={2.5}
        aria-hidden
      />
      <span className="text-base leading-relaxed text-text-secondary">
        {qualifier}
      </span>
    </div>
  ));

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
        />

        <AnimatedList
          items={qualifierItems}
          staggerDelay={0.1}
          className="mx-auto max-w-2xl"
        />
      </div>
    </section>
  );
}

/* --- Section 03: What We Look At --- */
function AuditScope({ data }: { data: AuditScopeData | null }) {
  if (!data || data.columns.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
          description={data.description}
        />

        <StaggerChildren className="grid gap-6 md:grid-cols-3">
          {data.columns.map((col) => (
            <GrowveloperCard
              key={col.heading}
              variant="diagnosis"
              colorScheme="glass-dark"
              headline={col.heading}
              className="items-center text-center"
            >
              {col.lottiePath && (
                <div className="flex items-center justify-center py-3">
                  <ServiceLottie
                    animationPath={col.lottiePath}
                    className="h-28 w-28 md:h-36 md:w-36"
                  />
                </div>
              )}
              <ul className="flex flex-col gap-2 text-left">
                {col.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-mid" aria-hidden />
                    {bullet}
                  </li>
                ))}
              </ul>
            </GrowveloperCard>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* --- Section 04: What You Get --- */
function AuditDeliverables({ data }: { data: AuditDeliverablesData | null }) {
  if (!data || data.deliverables.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
        />

        <StaggerChildren className="grid gap-6 md:grid-cols-2">
          {data.deliverables.map((item) => {
            const IconComponent = ICON_MAP[item.icon];
            return (
              <GrowveloperCard
                key={item.title}
                variant="diagnosis"
                colorScheme="glass-dark"
                headline={item.title}
                subCopy={item.description}
                icon={
                  IconComponent ? (
                    <IconComponent
                      className="h-6 w-6"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  ) : null
                }
              />
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* --- Section 05: How It Works --- now uses client component AuditProcess ---*/

/* --- Section 06: What We've Found --- now uses client component AuditFindings ---*/

