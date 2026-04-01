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
  getAllBlogPosts,
  getAllLabContent,
  getSiteSettings,
  getLabPage,
} from "@/lib/sanity/queries";
import type { CTABannerData } from "@/lib/types";

/* ─── Static params — only blog posts have detail pages ─── */
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/* ─── Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getBlogPostBySlug(slug),
    getSiteSettings(),
  ]);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — The Lab`,
    description: post.excerpt,
    openGraph: settings?.ogImage
      ? { images: [{ url: settings.ogImage }] }
      : undefined,
  };
}

/* ─── Page ─── */
export default async function LabPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, allContent, settings, lab] = await Promise.all([
    getBlogPostBySlug(slug),
    getAllLabContent(),
    getSiteSettings(),
    getLabPage(),
  ]);
  if (!post) notFound();

  /* Handle both static bodyParagraphs (Stage 3) and Sanity portable text body (Stage 4) */
  const bodyContent: string[] =
    post.bodyParagraphs ??
    ((post as unknown as Record<string, unknown>).body as Array<{ _type: string; children?: Array<{ text: string }> }> ?? [])
      .filter((b) => b._type === "block")
      .map((b) => b.children?.map((c) => c.text).join("") ?? "")
      .filter(Boolean);

  /* Related posts: same category, exclude self */
  const related = allContent
    .filter(
      (item) =>
        "slug" in item &&
        item.slug !== slug &&
        "category" in item &&
        (item as { category?: string }).category === post.category,
    )
    .slice(0, 3);

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt ?? "",
            image: post.heroImage ?? undefined,
            datePublished: post.publishedAt,
            author: { "@type": "Organization", name: "GROWVELOPER", url: "https://growveloper.com" },
            publisher: { "@type": "Organization", name: "GROWVELOPER", url: "https://growveloper.com" },
            mainEntityOfPage: { "@type": "WebPage", "@id": `https://growveloper.com/lab/${slug}` },
          }),
        }}
      />

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
      {bodyContent.length > 0 && (
        <section className="py-4 md:py-6">
          <div className="mx-auto max-w-3xl px-6">
            <div className="space-y-6">
              {bodyContent.map((paragraph, i) => {
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
      )}

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
      {lab?.postInlineCtaHeadline && lab?.postInlineCtaLabel && (
        <CTABanner
          data={{ headline: lab.postInlineCtaHeadline, highlightedWord: lab.postInlineCtaHighlightedWord ?? undefined, ctaLabel: lab.postInlineCtaLabel, ctaDestination: lab.postInlineCtaDestination ?? "/start" } as CTABannerData}
          presentationMode="inline"
          colorScheme="light-teal"
        />
      )}

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
      {lab?.postNewsletterHeadline && (
        <NewsletterCapture
          headline={lab.postNewsletterHeadline}
          highlightedWord={lab.postNewsletterHighlightedWord}
          subCopy={lab.postNewsletterSubCopy}
          ctaLabel={lab.postNewsletterCtaLabel}
          successHeadline={settings?.newsletterSuccessHeadline}
          successSubCopy={settings?.newsletterSuccessSubCopy}
          emailPlaceholder={settings?.newsletterEmailPlaceholder}
        />
      )}

      {/* 08 — Section CTA */}
      {lab?.postSectionCtaHeadline && lab?.postSectionCtaLabel && (
        <CTABanner
          data={{ headline: lab.postSectionCtaHeadline, highlightedWord: lab.postSectionCtaHighlightedWord ?? undefined, ctaLabel: lab.postSectionCtaLabel, ctaDestination: lab.postSectionCtaDestination ?? "/start" } as CTABannerData}
          presentationMode="section"
          colorScheme="teal-solid"
        />
      )}
    </>
  );
}
