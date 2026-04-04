import type { Metadata } from "next";
import { GlassSection, CTABanner } from "@/components";
import { AutomationsCatalogueHero } from "@/components/automations/AutomationsCatalogueHero";
import { AutomationsCatalogue } from "@/components/automations/AutomationsCatalogue";
import { getAllAutomations, getSiteSettings, getAutomationsPage } from "@/lib/sanity/queries";
import type { CTABannerData } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getAutomationsPage(), getSiteSettings()]);
  const ogImage = page?.ogImage ?? settings?.ogImage;
  return {
    title: page?.seoTitle ?? "Automations Catalogue",
    description:
      page?.seoDescription ??
      "Browse pre-built automation workflows ready to deploy in your business. Lead gen, reporting, content, CRM sync, and more.",
    openGraph: ogImage ? { images: [{ url: ogImage }] } : undefined,
  };
}

export default async function AutomationsPage() {
  const [automations, page] = await Promise.all([
    getAllAutomations(),
    getAutomationsPage(),
  ]);

  const categories = [...new Set(automations.map((a) => a.category))].map((c) => ({
    label: c,
    value: c,
  }));

  const ctaData: CTABannerData = {
    headline: page?.ctaHeadline ?? "Need a custom automation built for your business?",
    highlightedWord: page?.ctaHighlightedWord ?? "custom automation",
    ctaLabel: page?.ctaLabel ?? "Book a free consultation",
    ctaDestination: page?.ctaDestination ?? "/start",
  };

  return (
    <>
      {/* 01 — Hero */}
      <AutomationsCatalogueHero
        headline={page?.heroHeadline ?? "Automations that ship"}
        highlightedWord={page?.heroHighlightedWord ?? "ship"}
        subStatement={page?.heroSubStatement ?? "Pre-built workflows ready to deploy. Pick one, customise it, and go live in days."}
        scrollCueText={page?.heroScrollCueText ?? "Browse the catalogue"}
        scrollCueTargetId={page?.heroScrollCueTargetId ?? "automations-catalogue"}
      />

      {/* 02 — Catalogue (glass) */}
      <GlassSection id="automations-catalogue">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <AutomationsCatalogue items={automations} categories={categories} />
        </div>
      </GlassSection>

      {/* 03 — Final CTA */}
      <CTABanner data={ctaData} />
    </>
  );
}
