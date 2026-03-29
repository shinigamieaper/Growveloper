import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Clock, ShieldCheck } from "lucide-react";
import {
  GlassSection,
  SectionHeader,
  CTABanner,
  ServiceQualifiers,
} from "@/components";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { AuditProcess } from "@/components/audit/AuditProcess";
import { AutomationHero } from "@/components/automations/AutomationHero";
import { AutomationCard } from "@/components/shared/AutomationCard";
import { AutomationToolIcon } from "@/components/shared/AutomationToolIcons";
import {
  ALL_AUTOMATIONS,
  getAutomationBySlug,
  getRelatedAutomations,
} from "@/lib/data/automations";
import type { AuditProcessData, ServiceQualifierData, CTABannerData } from "@/lib/types";

/* ─── Static params ─── */

export function generateStaticParams() {
  return ALL_AUTOMATIONS.map((a) => ({ slug: a.slug }));
}

/* ─── Metadata ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const automation = getAutomationBySlug(slug);

  if (!automation) {
    return { title: "Automation Not Found — GROWVELOPER" };
  }

  return {
    title: `${automation.title} — Automations — GROWVELOPER`,
    description: automation.tagline,
  };
}

/* ─── Page ─── */

export default async function AutomationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const automation = getAutomationBySlug(slug);

  if (!automation) notFound();

  const isFixed = automation.accessType === "fixed" && automation.price != null;

  /* Map data to shared component shapes */

  const processData: AuditProcessData = {
    headline: "How it works",
    highlightedWord: "works",
    steps: automation.howItWorks,
  };

  const qualifierData: ServiceQualifierData = {
    headline: "Who this is for",
    highlightedWord: "for",
    qualifiers: automation.whoItIsFor,
  };

  const ctaData: CTABannerData = isFixed
    ? {
        headline: `Get ${automation.title} for £${automation.price!.toLocaleString()}`,
        highlightedWord: `£${automation.price!.toLocaleString()}`,
        ctaLabel: "Get This Automation",
        ctaDestination: `/start?service=ai&automation=${automation.slug}`,
        colorScheme: "teal-solid",
        presentationMode: "section",
      }
    : {
        headline: "Ready to discuss your custom build?",
        highlightedWord: "custom",
        ctaLabel: "Book a Free Consultation",
        ctaDestination: "/start?service=ai",
        colorScheme: "teal-solid",
        presentationMode: "section",
      };

  const related = getRelatedAutomations(automation.category, automation.slug, 3);

  return (
    <>
      {/* 01 — Hero */}
      <AutomationHero data={automation} />

      {/* 02 — Problem Statement (glass) */}
      <GlassSection>
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24 text-center">
          <ScrollFadeUp>
            <SectionHeader
              headline="The problem"
              highlightedWord="problem"
            />
          </ScrollFadeUp>
          <ScrollFadeUp>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              {automation.problemStatement}
            </p>
          </ScrollFadeUp>
        </div>
      </GlassSection>

      {/* 03 — How It Works */}
      <AuditProcess data={processData} />

      {/* 04 — What's Included (glass) */}
      <GlassSection id="whats-included">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <SectionHeader
            headline="What's included"
            highlightedWord="included"
          />
          <ScrollFadeUp>
            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {automation.whatsIncluded.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-glass-border bg-glass-bg/50 p-4"
                >
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-mid"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span className="text-sm leading-relaxed text-text-secondary">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollFadeUp>
        </div>
      </GlassSection>

      {/* 05 — Tools Used */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SectionHeader headline="Tools used" highlightedWord="Tools" />
          <ScrollFadeUp>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {automation.toolsUsed.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg/50 px-4 py-2 backdrop-blur-sm"
                >
                  <AutomationToolIcon
                    name={tool.iconKey ?? tool.name}
                    className="h-5 w-5 text-brand-mid"
                  />
                  <span className="font-mono text-sm text-text-secondary">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      {/* 06 — Specs strip (glass) */}
      <GlassSection>
        <ScrollFadeUp>
          <div className="mx-auto max-w-3xl px-6 py-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center gap-2 text-center">
                <Clock className="h-6 w-6 text-brand-mid" aria-hidden />
                <span className="font-mono text-2xl font-bold text-text-primary">
                  {automation.setupTimeDays} {automation.setupTimeDays === 1 ? "day" : "days"}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-text-tertiary">
                  Time to go live
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="font-mono text-lg font-semibold text-brand-mid">&pound;</span>
                <span className="font-mono text-2xl font-bold text-text-primary">
                  {isFixed ? automation.price!.toLocaleString() : "Custom"}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-text-tertiary">
                  {isFixed ? "One-time price" : "Scoped on consultation"}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <ShieldCheck className="h-6 w-6 text-brand-mid" aria-hidden />
                <span className="font-mono text-2xl font-bold text-text-primary">30 days</span>
                <span className="font-mono text-xs uppercase tracking-wider text-text-tertiary">
                  Support window
                </span>
              </div>
            </div>
          </div>
        </ScrollFadeUp>
      </GlassSection>

      {/* 07 — Who It's For */}
      <ServiceQualifiers data={qualifierData} />

      {/* 08 — CTA Block (glass) */}
      <GlassSection>
        <CTABanner data={ctaData} />
      </GlassSection>

      {/* 09 — FAQ */}
      {automation.faq.length > 0 && (
        <FAQAccordion
          items={automation.faq}
          sectionHeadline="Frequently Asked Questions"
          highlightedWord="Questions"
          sectionDescription="Everything you need to know about this automation before you buy."
          ctaHeadline="Still have questions?"
          ctaDescription="Every automation is different. Let's talk about yours."
          ctaLabel="Book a Consultation"
          ctaUrl="/start?service=ai"
        />
      )}

      {/* 10 — Related Automations (glass) */}
      {related.length > 0 && (
        <GlassSection>
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <SectionHeader
              headline="Related automations"
              highlightedWord="Related"
            />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <AutomationCard key={item.slug} data={item} />
              ))}
            </div>
          </div>
        </GlassSection>
      )}
    </>
  );
}
