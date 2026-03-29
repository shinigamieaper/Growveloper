import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStatStrip } from "@/components/about/AboutStatStrip";
import { AboutCompanies } from "@/components/about/AboutCompanies";
import { AboutPrinciples } from "@/components/about/AboutPrinciples";
import { AboutSkillsTools } from "@/components/about/AboutSkillsTools";
import { AboutInterests } from "@/components/about/AboutInterests";
import { CaseStudiesSection } from "@/components/home/CaseStudies";
import {
  GlassSection,
  CTABanner,
  SectionHeader,
  ScrollFadeUp,
  LineReveal,
} from "@/components";
import {
  ABOUT_HERO,
  ABOUT_SHORT_VERSION,
  ABOUT_STORY,
  ABOUT_STATS,
  ABOUT_COMPANIES,
  ABOUT_HOW_I_WORK,
  ABOUT_SKILLS_TOOLS,
  ABOUT_INTERESTS,
  ABOUT_CASE_STUDIES,
  ABOUT_CTA_INLINE,
  ABOUT_CTA_SECTION,
} from "@/lib/data/about";

export const metadata: Metadata = {
  title: "The Brains \u2014 GROWVELOPER",
  description:
    "Meet Juwon. The intersection of full-stack development and performance marketing.",
};

export default function AboutPage() {
  return (
    <>
      {/* 01 — Hero */}
      <AboutHero data={ABOUT_HERO} />

      {/* 02 — The Short Version */}
      <section id="short-version" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeader
            headline={ABOUT_SHORT_VERSION.headline}
            highlightedWord={ABOUT_SHORT_VERSION.highlightedWord}
            alignment="left"
            label={null}
            description={null}
          />
          <ScrollFadeUp delay={0.15}>
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">
              {ABOUT_SHORT_VERSION.body}
            </p>
          </ScrollFadeUp>
        </div>
      </section>

      <LineReveal />

      {/* 03 — The Story (glass) */}
      <GlassSection>
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <SectionHeader
            headline={ABOUT_STORY.headline}
            highlightedWord={ABOUT_STORY.highlightedWord}
            alignment="left"
            label={null}
            description={null}
          />
          <div className="space-y-5">
            {ABOUT_STORY.body.map((para, i) => (
              <ScrollFadeUp key={i} delay={i * 0.1}>
                <p className="text-base leading-relaxed text-text-secondary md:text-lg">{para}</p>
              </ScrollFadeUp>
            ))}
          </div>
        </div>
      </GlassSection>

      {/* CTA A — Inline */}
      <CTABanner data={ABOUT_CTA_INLINE} presentationMode="inline" colorScheme="light-teal" />

      {/* 04 — Stat Strip */}
      <AboutStatStrip items={ABOUT_STATS} />

      <LineReveal />

      {/* 05 — Past Companies (glass) */}
      <GlassSection>
        <AboutCompanies data={ABOUT_COMPANIES} />
      </GlassSection>

      {/* 06 — How I Work */}
      <AboutPrinciples data={ABOUT_HOW_I_WORK} />

      <LineReveal />

      {/* 07 — Skills + Tools (glass) */}
      <GlassSection>
        <AboutSkillsTools data={ABOUT_SKILLS_TOOLS} />
      </GlassSection>

      {/* 08 — Interests */}
      <AboutInterests data={ABOUT_INTERESTS} />

      <LineReveal />

      {/* 09 — Featured Work (glass) */}
      <GlassSection>
        <CaseStudiesSection
          headline="Featured work"
          highlightedWord="work"
          items={ABOUT_CASE_STUDIES}
        />
      </GlassSection>

      {/* CTA C — Section */}
      <CTABanner data={ABOUT_CTA_SECTION} presentationMode="section" colorScheme="teal-solid" />
    </>
  );
}
