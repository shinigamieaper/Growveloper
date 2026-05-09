import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";
import {
  GlassSection,
  CTABanner,
  NewsletterCapture,
  ScrollFadeUp,
  PortableTextRenderer,
  FAQAccordion,
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
import type { CTABannerData, BlogPostBodyBlock } from "@/lib/types";
import type { PortableTextBlock } from "@portabletext/react";

/* ─── Static params — only blog posts have detail pages ─── */
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  if (posts.length === 0) {
    return [{ slug: "placeholder" }];
  }
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
    title: post.metaTitle ?? `${post.title} — The Lab`,
    description: post.metaDescription ?? post.excerpt,
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

  const bodyBlocks: BlogPostBodyBlock[] = post.body ?? [];
  const hasPortableBody = bodyBlocks.length > 0;
  /* Legacy fallback: pre-Sanity-portable-text static bodyParagraphs */
  const legacyParagraphs = !hasPortableBody ? post.bodyParagraphs ?? [] : [];

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

  const faqs = post.faqs ?? [];
  const authorName = post.author ?? "GROWVELOPER";
  const heroAlt = post.heroImageAlt ?? post.title;
  const heroObjectPosition = post.heroImageHotspot
    ? `${Math.round(post.heroImageHotspot.x * 100)}% ${Math.round(post.heroImageHotspot.y * 100)}%`
    : undefined;

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
            author: post.author
              ? { "@type": "Person", name: post.author }
              : { "@type": "Organization", name: "GROWVELOPER", url: "https://growveloper.com" },
            publisher: { "@type": "Organization", name: "GROWVELOPER", url: "https://growveloper.com" },
            mainEntityOfPage: { "@type": "WebPage", "@id": `https://growveloper.com/lab/${slug}` },
          }),
        }}
      />

      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            }),
          }}
        />
      )}

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
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-glass-border">
                <Image
                  src={post.heroImage}
                  alt={heroAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  style={heroObjectPosition ? { objectPosition: heroObjectPosition } : undefined}
                />
              </div>
            </ScrollFadeUp>
          </div>
        </section>
      )}

      {/* 03 — TL;DR */}
      {post.tldr && (
        <section className="pb-8 md:pb-10">
          <div className="mx-auto max-w-3xl px-6">
            <ScrollFadeUp>
              <div className="rounded-2xl border border-brand-mid/30 bg-brand-mid/5 p-6 md:p-8">
                <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-mid">
                  TL;DR
                </p>
                <p className="text-base leading-relaxed text-text-primary md:text-lg">
                  {post.tldr}
                </p>
              </div>
            </ScrollFadeUp>
          </div>
        </section>
      )}

      {/* 04 — Article Body */}
      {(hasPortableBody || legacyParagraphs.length > 0) && (
        <section className="py-4 md:py-6">
          <div className="mx-auto max-w-3xl px-6">
            {hasPortableBody ? (
              <ScrollFadeUp>
                <PortableTextRenderer value={bodyBlocks as unknown as PortableTextBlock[]} />
                {post.pullQuote && (
                  <blockquote className="my-8 border-l-4 border-brand-mid pl-6">
                    <p className="text-lg font-medium italic leading-relaxed text-text-primary md:text-xl">
                      &ldquo;{post.pullQuote}&rdquo;
                    </p>
                  </blockquote>
                )}
              </ScrollFadeUp>
            ) : (
              <div className="space-y-6">
                {legacyParagraphs.map((paragraph, i) => {
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
            )}

            {/* Author byline */}
            <div className="mt-12 border-t border-glass-border pt-6">
              <p className="text-sm text-text-tertiary">
                Written by{" "}
                <span className="font-semibold text-text-primary">{authorName}</span>
              </p>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
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

      {/* 05 — Share + CTA (conditional) */}
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

      {/* 06 — FAQs (conditional) */}
      {faqs.length > 0 && (
        <FAQAccordion
          id="faq"
          className="scroll-mt-32"
          items={faqs}
          sectionHeadline="Frequently asked"
          highlightedWord="asked"
          sectionDescription="Quick answers to the most common follow-up questions."
        />
      )}

      {/* 07 — Inline CTA */}
      {lab?.postInlineCtaHeadline && lab?.postInlineCtaLabel && (
        <CTABanner
          data={{ headline: lab.postInlineCtaHeadline, highlightedWord: lab.postInlineCtaHighlightedWord ?? undefined, ctaLabel: lab.postInlineCtaLabel, ctaDestination: lab.postInlineCtaDestination ?? "/start" } as CTABannerData}
          presentationMode="inline"
          colorScheme="light-teal"
        />
      )}

      {/* 08 — Related Posts */}
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

      {/* 09 — Newsletter */}
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

      {/* 10 — Section CTA */}
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
