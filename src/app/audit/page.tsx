import type { Metadata } from "next";
import { Check } from "lucide-react";
import { AuditHero } from "@/components/audit/AuditHero";
import { AuditPricing } from "@/components/audit/AuditPricing";
import { AuditFindings } from "@/components/audit/AuditFindings";
import { AuditProcess } from "@/components/audit/AuditProcess";
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
import { ICON_MAP } from "@/lib/icons";
import { fluidGrid } from "@/lib/utils";
import { getAuditPage, getAuditFAQ, getSiteSettings } from "@/lib/sanity/queries";
import type {
  AuditHeroData,
  AuditQualifierData,
  AuditScopeData,
  AuditDeliverablesData,
  AuditProcessData,
  AuditFindingsData,
  AuditPricingData,
  CTABannerData,
} from "@/lib/types";

/* ─── METADATA ─── */
export async function generateMetadata(): Promise<Metadata> {
  const [audit, settings] = await Promise.all([getAuditPage(), getSiteSettings()]);
  const ogImage = audit?.ogImage ?? settings?.ogImage;
  return {
    title: audit?.seoTitle ?? "Growth Audit",
    description:
      audit?.seoDescription ??
      "A comprehensive audit of your development, marketing, and AI infrastructure \u2014 with a clear roadmap to fix it.",
    openGraph: ogImage ? { images: [{ url: ogImage }] } : undefined,
  };
}

/* ─── JSON-LD SCHEMA ─── */
function AuditJsonLd({ price, description }: { price: string; description: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Growth Audit",
    provider: { "@type": "Person", name: "Juwon" },
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
export default async function AuditPage() {
  const [page, faq, settings] = await Promise.all([getAuditPage(), getAuditFAQ(), getSiteSettings()]);

  if (!page) return null;

  /* ── Map flat Sanity fields to component interface shapes ── */

  const hero: AuditHeroData = {
    headline: page.heroHeadline,
    highlightedWord: page.heroHighlightedWord,
    price: page.heroPrice ?? "",
    priceLabel: page.heroPriceLabel,
    subStatement: page.heroSubStatement,
    primaryCtaLabel: page.heroPrimaryCtaLabel,
    primaryCtaUrl: page.heroPrimaryCtaUrl,
    secondaryCtaText: page.heroSecondaryCtaText,
    secondaryCtaUrl: page.heroSecondaryCtaUrl,
    scrollCueText: page.heroScrollCueText,
    scrollCueTargetId: page.heroScrollCueTargetId,
  };

  const qualifiers: AuditQualifierData | null =
    page.qualifiersHeadline
      ? {
          headline: page.qualifiersHeadline,
          highlightedWord: page.qualifiersHighlightedWord,
          qualifiers: page.qualifiers ?? [],
        }
      : null;

  const scope: AuditScopeData | null =
    page.scopeHeadline
      ? {
          headline: page.scopeHeadline,
          highlightedWord: page.scopeHighlightedWord,
          description: page.scopeDescription,
          columns: page.scopeColumns ?? [],
        }
      : null;

  const deliverables: AuditDeliverablesData | null =
    page.deliverablesHeadline
      ? {
          headline: page.deliverablesHeadline,
          highlightedWord: page.deliverablesHighlightedWord,
          deliverables: page.deliverables ?? [],
        }
      : null;

  const process: AuditProcessData | null =
    page.processHeadline
      ? {
          headline: page.processHeadline,
          highlightedWord: page.processHighlightedWord,
          steps: page.processSteps ?? [],
        }
      : null;

  const findings: AuditFindingsData | null =
    page.findingsHeadline
      ? {
          headline: page.findingsHeadline,
          highlightedWord: page.findingsHighlightedWord,
          findings: page.findings ?? [],
        }
      : null;

  const pricing: AuditPricingData | null =
    page.pricingHeadline
      ? {
          headline: page.pricingHeadline,
          highlightedWord: page.pricingHighlightedWord,
          tiers: page.pricingTiers ?? [],
        }
      : null;

  const finalCta: CTABannerData | null =
    page.finalCtaHeadline && page.finalCtaUrl
      ? {
          headline: page.finalCtaHeadline,
          highlightedWord: page.finalCtaHighlightedWord,
          subCopy: page.finalCtaSubCopy,
          ctaLabel: page.finalCtaLabel ?? "",
          ctaDestination: page.finalCtaUrl,
        }
      : null;

  return (
    <>
      <AuditJsonLd
        price={hero.price}
        description="A comprehensive audit of your development, marketing, and AI infrastructure with a clear roadmap to fix it."
      />

      {/* ═══ Section 01 — HERO ═══ */}
      <AuditHero data={hero} scrollCueTargetId={hero.scrollCueTargetId ?? "qualifiers"} />

      {/* ═══ Section 02 — WHO IT'S FOR ═══ */}
      {qualifiers && <AuditQualifiers data={qualifiers} />}

      {/* ═══ Section 03 — WHAT WE LOOK AT ═══ */}
      {scope && (
        <GlassSection id="scope">
          <AuditScope data={scope} />
        </GlassSection>
      )}

      {/* ═══ Section 04 — WHAT YOU GET ═══ */}
      {deliverables && <AuditDeliverables data={deliverables} id="deliverables" />}

      {/* ═══ Section 05 — HOW IT WORKS ═══ */}
      {process && (
        <GlassSection id="process">
          <AuditProcess data={process} />
        </GlassSection>
      )}

      {/* ═══ Section 06 — WHAT WE'VE FOUND ═══ */}
      {findings && <AuditFindings data={findings} id="findings" />}

      {/* ═══ Section 07 — PRICING ═══ */}
      {pricing && (
        <GlassSection id="pricing">
          <AuditPricing data={pricing} />
        </GlassSection>
      )}

      {/* ═══ Section 08 — FAQ ═══ */}
      {faq.length > 0 && (
        <FAQAccordion
          items={faq}
          sectionHeadline="Frequently asked questions"
          highlightedWord="questions"
        />
      )}

      {/* ═══ Section 09 — NEWSLETTER ═══ */}
      {page?.newsletterHeadline && (
        <NewsletterCapture
          headline={page.newsletterHeadline}
          highlightedWord={page.newsletterHighlightedWord}
          subCopy={page.newsletterSubCopy}
          ctaLabel={page.newsletterCtaLabel}
          successHeadline={settings?.newsletterSuccessHeadline}
          successSubCopy={settings?.newsletterSuccessSubCopy}
          emailPlaceholder={settings?.newsletterEmailPlaceholder}
        />
      )}

      {/* ═══ Section 10 — FINAL CTA ═══ */}
      {finalCta && (
        <CTABanner
          data={finalCta}
          colorScheme="teal-solid"
          presentationMode="section"
        />
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   INLINE SECTION COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function AuditQualifiers({ data }: { data: AuditQualifierData }) {
  if (data.qualifiers.length === 0) return null;

  const qualifierItems = data.qualifiers.map((qualifier) => (
    <div
      key={qualifier}
      className="flex items-start gap-3 rounded-xl border border-glass-border bg-glass-bg p-4 backdrop-blur-md"
    >
      <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-mid" strokeWidth={2.5} aria-hidden />
      <span className="text-base leading-relaxed text-text-secondary">{qualifier}</span>
    </div>
  ));

  return (
    <section id="qualifiers" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
        />
        <AnimatedList items={qualifierItems} staggerDelay={0.1} className="mx-auto max-w-2xl" />
      </div>
    </section>
  );
}

function AuditScope({ data }: { data: AuditScopeData }) {
  if (data.columns.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
          description={data.description}
        />
        <StaggerChildren className={`${fluidGrid(data.columns.length, 3)} gap-6`}>
          {data.columns.map((col) => {
            const IconComponent = ICON_MAP[col.icon];
            return (
            <GrowveloperCard
              key={col.heading}
              variant="diagnosis"
              colorScheme="glass-dark"
              headline={col.heading}
              icon={
                IconComponent ? (
                  <IconComponent className="h-6 w-6" strokeWidth={1.8} aria-hidden />
                ) : undefined
              }
              className="items-center text-center"
            >
              {col.lottiePath && (
                <div className="flex items-center justify-center py-3">
                  <ServiceLottie animationPath={col.lottiePath} className="h-28 w-28 md:h-36 md:w-36" />
                </div>
              )}
              <ul className="flex flex-col gap-2 text-left">
                {col.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-mid" aria-hidden />
                    {bullet}
                  </li>
                ))}
              </ul>
            </GrowveloperCard>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}

function AuditDeliverables({ data, id }: { data: AuditDeliverablesData; id?: string }) {
  if (data.deliverables.length === 0) return null;

  return (
    <section id={id} className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader headline={data.headline} highlightedWord={data.highlightedWord} />
        <StaggerChildren className={`${fluidGrid(data.deliverables.length, 2)} gap-6`}>
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
                    <IconComponent className="h-6 w-6" strokeWidth={1.8} aria-hidden />
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
