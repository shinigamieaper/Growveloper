import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ExternalLink, Clock, Briefcase } from "lucide-react";
import {
  GlassSection,
  CTABanner,
  SectionHeader,
  ScrollFadeUp,
  StatsBand,
} from "@/components";
import { HomeTestimonials } from "@/components/home/Testimonials";
import { CaseStudiesSection } from "@/components/home/CaseStudies";
import {
  getCaseStudyBySlug,
  getAllCaseStudies,
  getSiteSettings,
  getWorkPage,
} from "@/lib/sanity/queries";
import type { CTABannerData, TestimonialData, StatsBandItem } from "@/lib/types";

/* ─── Static params ─── */
export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies();
  if (caseStudies.length === 0) {
    return [{ slug: "placeholder" }];
  }
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

/* ─── Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [cs, settings] = await Promise.all([
    getCaseStudyBySlug(slug),
    getSiteSettings(),
  ]);
  if (!cs) return { title: "Case Study Not Found" };
  const ogImage = cs.ogImage ?? settings?.ogImage;
  return {
    title: cs.seoTitle ?? `${cs.title} — Case Study`,
    description: cs.seoDescription ?? cs.situation,
    openGraph: ogImage ? { images: [{ url: ogImage }] } : undefined,
  };
}

/* ─── Page ─── */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [cs, allCaseStudies, workPage] = await Promise.all([
    getCaseStudyBySlug(slug),
    getAllCaseStudies(),
    getWorkPage(),
  ]);
  if (!cs) notFound();

  const ctaSection: CTABannerData = {
    headline: workPage?.ctaSectionHeadline ?? "Ready to become the next case study?",
    highlightedWord: workPage?.ctaSectionHighlightedWord ?? "next case study",
    ctaLabel: workPage?.ctaSectionLabel ?? "Start a project",
    ctaDestination: workPage?.ctaSectionDestination ?? "/start",
  };

  const related = allCaseStudies
    .filter((item) => item.slug !== cs.slug)
    .slice(0, 3);

  /* Map metrics to StatsBandItem shape.
     Only use the animated counter for simple numeric values (e.g. "13", "100+", "$16K").
     Anything with spaces, slashes, or words becomes a text-only displayValue. */
  const statItems: StatsBandItem[] = cs.metrics
    .filter((m) => m.value && m.value !== "0")
    .map((m) => {
      const simple = m.value.match(/^([£$€]?)([\d.]+)([%xK+/a-z]*)$/i);
      if (simple) {
        const [, prefix, num, suffix] = simple;
        return {
          value: parseFloat(num),
          prefix: prefix || undefined,
          suffix: suffix || undefined,
          label: m.label,
        };
      }
      return { value: 0, displayValue: m.value, label: m.label };
    });

  /* Testimonial as TestimonialData array */
  const testimonials: TestimonialData[] = cs.testimonial
    ? [{ ...cs.testimonial, rating: 5 }]
    : [];

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: cs.title,
            description: cs.situation ?? "",
            image: cs.heroImage ?? undefined,
            author: { "@type": "Organization", name: "GROWVELOPER", url: "https://growveloper.com" },
            url: `https://growveloper.com/work/${cs.slug}`,
            about: { "@type": "Thing", name: cs.clientIndustry ?? "" },
          }),
        }}
      />

      {/* 01 — Hero */}
      <section className="pt-32 pb-0 md:pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollFadeUp>
            {/* Back nav */}
            <Link
              href="/work"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-text-tertiary transition-colors hover:text-brand-mid"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              All case studies
            </Link>

            {/* Tags */}
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-glass-border bg-bg-secondary px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-mid">
                {cs.clientIndustry}
              </span>
              {cs.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-glass-border bg-bg-secondary px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-text-tertiary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="heading-font mb-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
              {cs.title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-brand-mid font-medium">
              {cs.resultHeadline}
            </p>

            {/* Project metadata */}
            {(cs.clientName || cs.role || cs.duration || cs.liveUrl) && (
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-tertiary">
                {cs.clientName && (
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" aria-hidden />
                    {cs.clientName}
                  </span>
                )}
                {cs.role && (
                  <span>{cs.role}</span>
                )}
                {cs.duration && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {cs.duration}
                  </span>
                )}
                {cs.liveUrl && (
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-brand-mid transition-colors hover:text-brand-light"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    View live site
                  </a>
                )}
              </div>
            )}
          </ScrollFadeUp>
        </div>
      </section>

      {/* 02 — Hero Image */}
      {cs.heroImage && (
        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollFadeUp delay={0.1}>
              <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-glass-border">
                <Image
                  src={cs.heroImage}
                  alt={cs.title}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
            </ScrollFadeUp>
          </div>
        </section>
      )}

      {/* 02b — Gallery */}
      {cs.gallery && cs.gallery.length > 0 && (
        <section className="py-6 md:py-10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {cs.gallery.map((img, i) => (
                <ScrollFadeUp key={i} delay={0.05 * i}>
                  <div className="relative aspect-video w-[320px] shrink-0 overflow-hidden rounded-xl border border-glass-border md:w-[480px]">
                    <Image
                      src={img}
                      alt={`${cs.title} screenshot ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 320px, 480px"
                    />
                  </div>
                </ScrollFadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 03 — Metrics Strip */}
      {statItems.length > 0 && (
        <StatsBand items={statItems} />
      )}

      {/* 04 — The Situation */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeader
            headline="The situation"
            highlightedWord="situation"
            alignment="left"
            label={null}
            description={null}
          />
          <ScrollFadeUp delay={0.1}>
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">
              {cs.situationDetail}
            </p>
          </ScrollFadeUp>
        </div>
      </section>

      {/* 05 — The Approach (glass) */}
      <GlassSection>
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <SectionHeader
            headline="The approach"
            highlightedWord="approach"
            alignment="left"
            label={null}
            description={null}
          />
          <ScrollFadeUp delay={0.1}>
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">
              {cs.approach}
            </p>
          </ScrollFadeUp>
        </div>
      </GlassSection>

      {/* 06 — The Build */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeader
            headline="The build"
            highlightedWord="build"
            alignment="left"
            label={null}
            description={null}
          />
          <ScrollFadeUp delay={0.1}>
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">
              {cs.buildDetail}
            </p>
          </ScrollFadeUp>

          {/* Tech Stack */}
          {cs.techStack.length > 0 && (
            <ScrollFadeUp delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-2">
                {cs.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-glass-border bg-bg-secondary px-3 py-1.5 font-mono text-xs font-medium text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ScrollFadeUp>
          )}
        </div>
      </section>

      {/* 07 — The Result (glass) */}
      <GlassSection>
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <SectionHeader
            headline="The result"
            highlightedWord="result"
            alignment="left"
            label={null}
            description={null}
          />
          <ScrollFadeUp delay={0.1}>
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">
              {cs.resultDetail}
            </p>
          </ScrollFadeUp>

          {/* Key outcomes checklist */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {cs.metrics.map((m, i) => (
              <ScrollFadeUp key={i} delay={0.1 + i * 0.06}>
                <div className="flex items-start gap-3 rounded-xl border border-glass-border bg-glass-bg/50 p-4">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-mid"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <div>
                    <span className="heading-font block text-lg font-bold text-text-primary">
                      {m.value}
                    </span>
                    <span className="text-xs text-text-tertiary">{m.label}</span>
                  </div>
                </div>
              </ScrollFadeUp>
            ))}
          </div>
        </div>
      </GlassSection>

      {/* 08 — Testimonial */}
      {testimonials.length > 0 && (
        <HomeTestimonials
          headline="In their words"
          highlightedWord="words"
          items={testimonials}
          ctaHeadline="Want results like these?"
          ctaLabel="Start a project"
          ctaUrl="/start"
        />
      )}

      {/* 09 — Related Case Studies */}
      {related.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollFadeUp>
              <SectionHeader
                headline="More case studies"
                highlightedWord="More"
                label={null}
                description={null}
              />
            </ScrollFadeUp>
            <CaseStudiesSection items={related} />
          </div>
        </section>
      )}

      {/* Section CTA */}
      <CTABanner
        data={ctaSection}
        presentationMode="section"
        colorScheme="teal-solid"
      />
    </>
  );
}
