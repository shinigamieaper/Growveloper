import type { Metadata } from "next";
import { GlassSection, CTABanner } from "@/components";
import { AutomationsCatalogueHero } from "@/components/automations/AutomationsCatalogueHero";
import { AutomationsCatalogue } from "@/components/automations/AutomationsCatalogue";
import {
  ALL_AUTOMATIONS,
  AUTOMATION_CATEGORIES,
  AUTOMATIONS_HERO,
  AUTOMATIONS_CTA,
} from "@/lib/data/automations";

export const metadata: Metadata = {
  title: "Automations Catalogue — GROWVELOPER",
  description:
    "Browse pre-built automation workflows ready to deploy in your business. Lead gen, reporting, content, CRM sync, and more.",
};

export default function AutomationsPage() {
  return (
    <>
      {/* 01 — Hero */}
      <AutomationsCatalogueHero
        headline={AUTOMATIONS_HERO.headline}
        highlightedWord={AUTOMATIONS_HERO.highlightedWord}
        subStatement={AUTOMATIONS_HERO.subStatement}
        scrollCueText={AUTOMATIONS_HERO.scrollCueText}
        scrollCueTargetId={AUTOMATIONS_HERO.scrollCueTargetId}
      />

      {/* 02 — Catalogue (glass) */}
      <GlassSection id="automations-catalogue">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <AutomationsCatalogue
            items={ALL_AUTOMATIONS}
            categories={AUTOMATION_CATEGORIES}
          />
        </div>
      </GlassSection>

      {/* 03 — Final CTA */}
      <CTABanner data={AUTOMATIONS_CTA} />
    </>
  );
}
