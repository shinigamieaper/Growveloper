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
import { getAboutPage } from "@/lib/sanity/queries";
import type {
  AboutHeroData,
  AboutShortVersionData,
  AboutStoryData,
  AboutStatItem,
  AboutPastCompaniesData,
  AboutHowIWorkData,
  AboutSkillsToolsData,
  AboutInterestsData,
  CTABannerData,
} from "@/lib/types";

export const metadata: Metadata = {
  title: "The Brains \u2014 GROWVELOPER",
  description:
    "Meet Juwon. The intersection of full-stack development and performance marketing.",
};

export default async function AboutPage() {
  const page = await getAboutPage();

  if (!page) return null;

  /* ── Map flat Sanity fields to component interface shapes — CMS only, no static fallbacks ── */

  const hero: AboutHeroData | null = page.heroName
    ? {
        name: page.heroName,
        identity: page.heroIdentity ?? "",
        portraitImage: page.portraitImage ?? "",
        portraitAlt: page.portraitAlt ?? "",
        scrollCueText: page.scrollCueText,
        scrollCueTargetId: "short-version",
        namePrefix: page.heroNamePrefix,
      }
    : null;

  const shortVersion: AboutShortVersionData | null = page.shortVersionHeadline
    ? {
        headline: page.shortVersionHeadline,
        highlightedWord: page.shortVersionHighlightedWord,
        body: page.shortVersionBody ?? "",
      }
    : null;

  const story: AboutStoryData | null = page.storyHeadline
    ? {
        headline: page.storyHeadline,
        highlightedWord: page.storyHighlightedWord,
        body: page.storyBody ?? [],
      }
    : null;

  const stats: AboutStatItem[] = page.stats?.length ? page.stats : [];

  const companies: AboutPastCompaniesData | null = page.companiesHeadline
    ? {
        headline: page.companiesHeadline,
        highlightedWord: page.companiesHighlightedWord,
        companies: (page.companies ?? []).map(
          (c: { company: string; role: string; insight: string; logo?: string }) => ({
            company: c.company,
            role: c.role,
            insight: c.insight,
            logo: c.logo,
          })
        ),
      }
    : null;

  const howIWork: AboutHowIWorkData | null = page.principlesHeadline
    ? {
        headline: page.principlesHeadline,
        highlightedWord: page.principlesHighlightedWord,
        principles: (page.principles ?? []).map(
          (p: { title: string; description: string }) => ({
            title: p.title,
            description: p.description,
          })
        ),
      }
    : null;

  const skillsTools: AboutSkillsToolsData | null = page.skillsHeadline
    ? {
        headline: page.skillsHeadline,
        highlightedWord: page.skillsHighlightedWord,
        disciplines: (page.disciplines ?? []).map(
          (d: { name: string; tools?: { name: string; logo?: string }[] }) => ({
            name: d.name,
            tools: (d.tools ?? []).map((t) => ({ name: t.name, logo: t.logo })),
          })
        ),
      }
    : null;

  const interests: AboutInterestsData | null = page.interestsHeadline
    ? {
        headline: page.interestsHeadline,
        highlightedWord: page.interestsHighlightedWord,
        items: (page.interests ?? []).map(
          (item: { interest: string; connection: string }) => ({
            interest: item.interest,
            connection: item.connection,
          })
        ),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: page.heroName ?? "Juwon",
            url: "https://growveloper.com/about",
            jobTitle: page.heroIdentity ?? "Full-Stack Developer & Growth Marketer",
            worksFor: { "@type": "Organization", name: "GROWVELOPER", url: "https://growveloper.com" },
            image: page.portraitImage ?? undefined,
          }),
        }}
      />

      {/* 01 — Hero */}
      {hero && <AboutHero data={hero} />}

      {/* 02 — The Short Version */}
      {shortVersion && (
        <section id="short-version" className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <SectionHeader
              headline={shortVersion.headline}
              highlightedWord={shortVersion.highlightedWord}
              alignment="left"
              label={null}
              description={null}
            />
            <ScrollFadeUp delay={0.15}>
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                {shortVersion.body}
              </p>
            </ScrollFadeUp>
          </div>
        </section>
      )}

      {shortVersion && <LineReveal />}

      {/* 03 — The Story (glass) */}
      {story && (
        <GlassSection>
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            <SectionHeader
              headline={story.headline}
              highlightedWord={story.highlightedWord}
              alignment="left"
              label={null}
              description={null}
            />
            <div className="space-y-5">
              {story.body.map((para, i) => (
                <ScrollFadeUp key={i} delay={i * 0.1}>
                  <p className="text-base leading-relaxed text-text-secondary md:text-lg">{para}</p>
                </ScrollFadeUp>
              ))}
            </div>
          </div>
        </GlassSection>
      )}

      {/* CTA A — Inline */}
      {page.inlineCta?.headline && (
        <CTABanner
          data={page.inlineCta as CTABannerData}
          presentationMode="inline"
          colorScheme={page.inlineCta.colorScheme ?? "light-teal"}
        />
      )}

      {/* 04 — Stat Strip */}
      {stats.length > 0 && <AboutStatStrip items={stats} />}

      {stats.length > 0 && <LineReveal />}

      {/* 05 — Past Companies (glass) */}
      {companies && (
        <GlassSection>
          <AboutCompanies data={companies} />
        </GlassSection>
      )}

      {/* 06 — How I Work */}
      {howIWork && <AboutPrinciples data={howIWork} />}

      {howIWork && <LineReveal />}

      {/* 07 — Skills + Tools (glass) */}
      {skillsTools && (
        <GlassSection>
          <AboutSkillsTools data={skillsTools} />
        </GlassSection>
      )}

      {/* 08 — Interests */}
      {interests && <AboutInterests data={interests} />}

      {interests && <LineReveal />}

      {/* 09 — Featured Work (glass) */}
      {page.caseStudiesHeadline && (page.featuredCaseStudies?.length ?? 0) > 0 && (
        <GlassSection>
          <CaseStudiesSection
            headline={page.caseStudiesHeadline}
            highlightedWord={page.caseStudiesHighlightedWord}
            items={page.featuredCaseStudies ?? []}
          />
        </GlassSection>
      )}

      {/* CTA C — Section */}
      {page.finalCta?.headline && (
        <CTABanner
          data={page.finalCta as CTABannerData}
          presentationMode="section"
          colorScheme={page.finalCta.colorScheme ?? "teal-solid"}
        />
      )}
    </>
  );
}
