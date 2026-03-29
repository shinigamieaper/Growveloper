import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";
import {
  GlassSection,
  CTABanner,
  NewsletterCapture,
  ScrollFadeUp,
} from "@/components";
import { SocialShareButtons } from "@/components/shared/SocialShareButtons";
import { RelatedContentGrid } from "@/components/shared/RelatedContentGrid";
import {
  getBlogPostBySlug,
  getRelatedPosts,
  LAB_CONTENT,
} from "@/lib/data/lab";
import type { CTABannerData } from "@/lib/types";

/* ─── Static params — only blog posts have detail pages ─── */
export function generateStaticParams() {
  return LAB_CONTENT.filter(
    (item): item is import("@/lib/types").BlogPostCardData =>
      "platform" in item && item.platform === "blog",
  ).map((post) => ({ slug: post.slug }));
}

/* ─── Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found — GROWVELOPER" };
  return {
    title: `${post.title} — The Lab — GROWVELOPER`,
    description: post.excerpt,
  };
}

/* ─── CTA data ─── */
const CTA_INLINE: CTABannerData = {
  headline: "Working on something similar? Let\u2019s talk.",
  highlightedWord: "Let\u2019s talk",
  ctaLabel: "Book a free consultation",
  ctaDestination: "/start",
};

const CTA_SECTION: CTABannerData = {
  headline: "Ready to build something that compounds?",
  highlightedWord: "compounds",
  ctaLabel: "Start a project",
  ctaDestination: "/start",
};

/* ─── Page ─── */
export default async function LabPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* 01 — Post Header */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollFadeUp>
            {post.category && (
              <span className="mb-4 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-mid">
                {post.category}
              </span>
            )}
            <h1 className="heading-font mb-6 text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mb-8 text-lg leading-relaxed text-text-secondary">
                {post.excerpt}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-5 text-sm text-text-tertiary">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  {publishedDate}
                </span>
                {post.readTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" aria-hidden />
                    {post.readTime}
                  </span>
                )}
              </div>
              <SocialShareButtons title={post.title} />
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      {/* 02 — Hero Image */}
      {post.heroImage && (
        <section className="pb-12 md:pb-16">
          <div className="mx-auto max-w-3xl px-6">
            <ScrollFadeUp delay={0.1}>
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-glass-border">
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            </ScrollFadeUp>
          </div>
        </section>
      )}

      {/* 03 — Article Body */}
      <section className="py-4 md:py-6">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-6">
            {post.bodyParagraphs.map((paragraph, i) => {
              /* Pull quote — insert after first paragraph if defined */
              const showPullQuote = i === 1 && post.pullQuote;
              return (
                <ScrollFadeUp key={i} delay={i * 0.04}>
                  <p className="text-base leading-[1.85] text-text-secondary md:text-lg">
                    {paragraph}
                  </p>
                  {showPullQuote && (
                    <blockquote className="my-8 border-l-4 border-brand-mid pl-6">
                      <p className="text-lg font-medium italic leading-relaxed text-text-primary md:text-xl">
                        &ldquo;{post.pullQuote}&rdquo;
                      </p>
                    </blockquote>
                  )}
                </ScrollFadeUp>
              );
            })}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-glass-border pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-glass-border bg-bg-secondary px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-text-tertiary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 04 — Share + CTA (conditional) */}
      {post.showCTA && (
        <GlassSection>
          <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-1 text-sm font-semibold text-text-primary">
                  Found this useful?
                </p>
                <p className="text-sm text-text-secondary">
                  Share it with someone who needs to read it.
                </p>
              </div>
              <SocialShareButtons title={post.title} />
            </div>
          </div>
        </GlassSection>
      )}

      {/* 05 — Inline CTA */}
      <CTABanner data={CTA_INLINE} presentationMode="inline" colorScheme="light-teal" />

      {/* 06 — Related Posts */}
      {related.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollFadeUp>
              <RelatedContentGrid
                items={related}
                contentType="lab"
                label="More from The Lab"
              />
            </ScrollFadeUp>
          </div>
        </section>
      )}

      {/* 07 — Newsletter */}
      <NewsletterCapture
        headline="Stay in the loop"
        highlightedWord="loop"
        subCopy="No spam. Just builds, breakdowns, and the occasional experiment."
        ctaLabel="Subscribe"
      />

      {/* 08 — Section CTA */}
      <CTABanner data={CTA_SECTION} presentationMode="section" colorScheme="teal-solid" />
    </>
  );
}