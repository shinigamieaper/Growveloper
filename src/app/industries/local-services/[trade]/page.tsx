import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  GlassSection,
  CTABanner,
  FAQAccordion,
  SectionHeader,
  ScrollFadeUp,
  StatsBand,
  ServiceProblem,
} from "@/components";
import { ServiceHero } from "@/components/shared/ServiceHero";
import { ServicesAlternating } from "@/components/home/ServicesAlternating";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { LiveFeed } from "@/components/home/LiveFeed";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  getAllLocalServicePages,
  getLocalServicePageBySlug,
  getAllLabContent,
  getSiteSettings,
} from "@/lib/sanity/queries";
import { buildPageMetadata } from "@/lib/seo";
import { buildServiceSchema, buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/jsonld";
import type {
  ServicePageHeroData,
  ServiceProblemData,
  StickyScrollSectionData,
  IndustriesGridData,
  CTABannerData,
  StatsBandItem,
} from "@/lib/types";

const PARENT_PATH = "/industries/local-services";
const PARENT_NAME = "Local Service Businesses";

/* ─── Static params ─── */
export async function generateStaticParams() {
  const trades = await getAllLocalServicePages();
  if (trades.length === 0) {
    return [{ trade: "placeholder" }];
  }
  return trades.map((t) => ({ trade: t.slug }));
}

/* ─── Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ trade: string }>;
}): Promise<Metadata> {
  const { trade } = await params;
  const [page, settings] = await Promise.all([
    getLocalServicePageBySlug(trade),
    getSiteSettings(),
  ]);
  if (!page) return { title: "Page Not Found", robots: { index: false } };
  return buildPageMetadata({
    title: page.seoTitle ?? `Websites and Marketing for ${page.name}`,
    description: page.seoDescription ?? page.heroSubStatement,
    path: `${PARENT_PATH}/${trade}`,
    image: page.ogImage ?? settings?.ogImage,
  });
}

/* ─── Page ─── */
export default async function LocalServiceTradePage({
  params,
}: {
  params: Promise<{ trade: string }>;
}) {
  const { trade } = await params;
  const [page, allTrades, labContent] = await Promise.all([
    getLocalServicePageBySlug(trade),
    getAllLocalServicePages(),
    getAllLabContent(),
  ]);
  if (!page) notFound();

  const path = `${PARENT_PATH}/${page.slug}`;

  const heroData: ServicePageHeroData = {
    headline: page.heroHeadline,
    highlightedWord: page.heroHighlightedWord,
    subStatement: page.heroSubStatement,
    primaryCtaLabel: page.primaryCtaLabel ?? "Book a Free Consultation",
    primaryCtaUrl: page.primaryCtaUrl ?? "/start",
    secondaryCtaLabel: page.secondaryCtaLabel,
    secondaryCtaUrl: page.secondaryCtaUrl,
    scrollCueText: "SCROLL TO EXPLORE · SCROLL TO EXPLORE ·",
    scrollCueTargetId: "pain-points",
  };

  const problemData: ServiceProblemData = {
    headline: page.problemHeadline ?? "Sound familiar?",
    highlightedWord: page.problemHighlightedWord ?? "familiar",
    painPoints: page.painPoints ?? [],
  };

  const howWeHelpData: StickyScrollSectionData = {
    headline: page.howWeHelpHeadline ?? "Three services. One front door.",
    highlightedWord: page.howWeHelpHighlightedWord ?? "front door",
    description:
      page.howWeHelpDescription ??
      "One studio builds the site, brings the right searches to it, and answers the enquiry the moment it lands.",
    items: (page.serviceCards ?? []).map((card, i) => ({
      stepNumber: String(i + 1).padStart(2, "0"),
      heading: card.title,
      description: card.description,
      ctaLabel: page.serviceCardCtaLabel ?? "See how it works",
      ctaUrl: card.link,
      lottiePath:
        i === 0
          ? "/lottie/Web Development.lottie"
          : i === 1
            ? "/lottie/Digital Marketing.lottie"
            : "/lottie/Chat Bot.lottie",
      fallbackGradient:
        i === 0
          ? "linear-gradient(135deg, #1a1a2e, var(--brand-dark))"
          : i === 1
            ? "linear-gradient(135deg, var(--brand-dark), #1a2a2a)"
            : "linear-gradient(135deg, #1a2a2a, var(--brand-mid))",
    })),
  };

  const statItems: StatsBandItem[] = (page.stats ?? []).map((s) => ({
    value: s.value,
    prefix: s.prefix,
    suffix: s.suffix,
    decimals: s.decimals,
    label: s.label,
  }));

  /* Siblings link through the parent path. IndustriesGrid builds hrefs as
     /industries/<slug>, so the slug carries the parent segment. */
  const otherTrades = allTrades.filter((t) => t.slug !== page.slug);
  const otherTradesData: IndustriesGridData = {
    headline: "Other trades we work with",
    highlightedWord: "trades",
    description: "Same front door, different vocabulary. Pick the one closest to your business.",
    industries: otherTrades.map((t) => ({
      icon: t.icon,
      name: t.name,
      hookLine: t.hookLine,
      slug: `local-services/${t.slug}`,
      ctaLabel: "Learn more",
    })),
    ctaHeadline: "Another kind of local business?",
    ctaLabel: "See the local services page",
    ctaUrl: PARENT_PATH,
  };

  const ctaInline: CTABannerData = {
    headline: page.ctaInlineHeadline ?? `Run a ${page.name.toLowerCase()} business? Let's fix the front door.`,
    highlightedWord: page.ctaInlineHighlightedWord ?? "front door",
    ctaLabel: page.ctaInlineLabel ?? "Book a Free Consultation",
    ctaDestination: page.ctaInlineDestination ?? "/start",
  };

  const ctaSection: CTABannerData = {
    headline: page.ctaSectionHeadline ?? "Your next customer is searching right now",
    highlightedWord: page.ctaSectionHighlightedWord ?? "right now",
    ctaLabel: page.ctaSectionLabel ?? "Book a Free Consultation",
    ctaDestination: page.ctaSectionDestination ?? "/start",
  };

  const labItems = labContent.slice(0, 3);
  const description = page.seoDescription ?? page.heroSubStatement ?? "";

  return (
    <>
      <JsonLd
        schema={[
          buildServiceSchema({
            name: `Websites, marketing and automation for ${page.name.toLowerCase()}`,
            description,
            serviceType: "Web development, local search marketing and automation",
            path,
            audience: page.name,
          }),
          buildWebPageSchema({
            name: page.seoTitle ?? `Websites and Marketing for ${page.name}`,
            description,
            path,
            dateModified: page.updatedAt,
          }),
          buildBreadcrumbSchema([
            { name: PARENT_NAME, path: PARENT_PATH },
            { name: page.name, path },
          ]),
        ]}
      />

      {/* 01 — Hero */}
      <ServiceHero data={heroData} />

      {/* 02 — Pain points */}
      {problemData.painPoints.length > 0 && (
        <GlassSection id="pain-points">
          <ServiceProblem data={problemData} />
        </GlassSection>
      )}

      {/* 03 — How we help */}
      {howWeHelpData.items.length > 0 && <ServicesAlternating data={howWeHelpData} />}

      {/* 04 — Stats, each with its source shown */}
      {statItems.length > 0 && (
        <GlassSection>
          <div className="py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-6">
              <ScrollFadeUp>
                <SectionHeader
                  headline={page.statsHeadline ?? "The numbers behind the problem"}
                  highlightedWord={page.statsHighlightedWord ?? "numbers"}
                  description={page.statsDescription}
                />
              </ScrollFadeUp>
            </div>
            <StatsBand items={statItems} className="py-0 md:py-0" />
            <div className="mx-auto mt-8 max-w-6xl px-6">
              <p className="text-xs leading-relaxed text-text-tertiary">
                Sources:{" "}
                {(page.stats ?? []).map((s, i) => (
                  <span key={`${s.sourceUrl}-${i}`}>
                    {i > 0 ? "; " : ""}
                    <a
                      href={s.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-glass-border underline-offset-2 hover:text-text-secondary"
                    >
                      {s.sourceName}
                      {s.year ? ` (${s.year})` : ""}
                    </a>
                  </span>
                ))}
                .
              </p>
            </div>
          </div>
        </GlassSection>
      )}

      {/* 05 — Inline CTA */}
      <CTABanner data={ctaInline} presentationMode="inline" colorScheme="light-teal" />

      {/* 06 — FAQ */}
      {(page.faq ?? []).length > 0 && (
        <GlassSection>
          <FAQAccordion
            items={page.faq ?? []}
            sectionHeadline={page.faqHeadline ?? "Questions from owners"}
            highlightedWord={page.faqHighlightedWord ?? "Questions"}
            sectionDescription={page.faqDescription ?? `Straight answers for ${page.name.toLowerCase()} that run the business and the marketing.`}
            ctaHeadline={page.faqCtaHeadline ?? "Got a question that's not here?"}
            ctaDescription={page.faqCtaDescription ?? "Every engagement starts with a free consultation. Ask us anything."}
            ctaLabel={page.faqCtaLabel ?? "Get in touch"}
            ctaUrl={page.faqCtaUrl ?? "/start"}
          />
        </GlassSection>
      )}

      {/* 07 — Other trades */}
      {otherTrades.length > 0 && (
        <GlassSection>
          <IndustriesGrid data={otherTradesData} />
        </GlassSection>
      )}

      {/* 08 — From The Lab */}
      {labItems.length > 0 && (
        <GlassSection>
          <LiveFeed
            headline="From The Lab"
            highlightedWord="Lab"
            description="What we are building and learning, written for the owner who does everything."
            items={labItems}
            sectionTitle="Latest from The Lab"
            seeAllLabel="See everything"
            seeAllUrl="/lab"
          />
        </GlassSection>
      )}

      {/* 09 — Section CTA */}
      <CTABanner data={ctaSection} presentationMode="section" colorScheme="teal-solid" />
    </>
  );
}
