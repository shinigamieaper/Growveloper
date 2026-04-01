import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  GlassSection,
  CTABanner,
  SectionHeader,
  ScrollFadeUp,
} from "@/components";
import { FreeResourceBlock } from "@/components/shared/ResourceActionBlock";
import { PaidResourceBlock } from "@/components/shared/ResourceActionBlock";
import { RelatedContentGrid } from "@/components/shared/RelatedContentGrid";
import {
  getResourceBySlug,
  getAllResources,
  getSiteSettings,
  getResourcesPage,
} from "@/lib/sanity/queries";
import type { CTABannerData } from "@/lib/types";

export async function generateStaticParams() {
  const resources = await getAllResources();
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [resource, settings] = await Promise.all([
    getResourceBySlug(slug),
    getSiteSettings(),
  ]);
  if (!resource) return { title: "Resource Not Found" };
  return {
    title: `${resource.title} — Resources`,
    description: resource.description,
    openGraph: settings?.ogImage
      ? { images: [{ url: settings.ogImage }] }
      : undefined,
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [resource, allResources, resPage] = await Promise.all([
    getResourceBySlug(slug),
    getAllResources(),
    getResourcesPage(),
  ]);
  if (!resource) notFound();

  const related = allResources
    .filter((r) => r.category === resource.category && r.slug !== resource.slug)
    .slice(0, 3);

  const ctaInline: CTABannerData | null =
    resPage?.inlineCtaHeadline && resPage?.inlineCtaLabel
      ? {
          headline: resPage.inlineCtaHeadline,
          highlightedWord: resPage.inlineCtaHighlightedWord ?? undefined,
          ctaLabel: resPage.inlineCtaLabel,
          ctaDestination: resPage.inlineCtaDestination ?? "/start",
        }
      : null;

  const ctaSection: CTABannerData | null =
    resPage?.sectionCtaHeadline && resPage?.sectionCtaLabel
      ? {
          headline: resPage.sectionCtaHeadline,
          highlightedWord: resPage.sectionCtaHighlightedWord ?? undefined,
          ctaLabel: resPage.sectionCtaLabel,
          ctaDestination: resPage.sectionCtaDestination ?? "/start",
        }
      : null;

  return (
    <>
      {/* 01 — Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollFadeUp>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Badge className="rounded-full bg-bg-tertiary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-secondary border-glass-border">
                {resource.resourceType}
              </Badge>
              <Badge className="rounded-full bg-bg-tertiary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-secondary border-glass-border">
                {resource.category}
              </Badge>
              {resource.accessType === "free" ? (
                <Badge className="rounded-full bg-brand-dark px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-base-white border-transparent">
                  Free
                </Badge>
              ) : (
                <Badge className="rounded-full bg-bg-tertiary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-text-primary border-glass-border">
                  {resource.priceUSD ? `$${resource.priceUSD}` : "Paid"}
                </Badge>
              )}
            </div>
            <h1 className="heading-font text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
              {resource.title}
            </h1>
          </ScrollFadeUp>
        </div>
      </section>

      {/* 02 — Cover Image */}
      {resource.coverImage && (
        <section className="pb-12 md:pb-16">
          <div className="mx-auto max-w-3xl px-6">
            <ScrollFadeUp delay={0.1}>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-glass-border">
                <Image
                  src={resource.coverImage}
                  alt={resource.title}
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

      {/* 03 — What It Is */}
      {resource.whatItIs && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-6">
            <SectionHeader
              headline="What it is"
              highlightedWord="is"
              alignment="left"
              label={null}
              description={null}
            />
            <ScrollFadeUp delay={0.1}>
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                {resource.whatItIs}
              </p>
            </ScrollFadeUp>
          </div>
        </section>
      )}

      {/* 04 — What's Inside */}
      {resource.whatsIncluded?.length > 0 && (
        <GlassSection>
          <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
            <SectionHeader
              headline="What's inside"
              highlightedWord="inside"
              alignment="left"
              label={null}
              description={null}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {resource.whatsIncluded.map((item, i) => (
                <ScrollFadeUp key={i} delay={i * 0.06}>
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-mid" strokeWidth={2.5} />
                    <span className="text-sm leading-relaxed text-text-secondary">{item}</span>
                  </div>
                </ScrollFadeUp>
              ))}
            </div>
          </div>
        </GlassSection>
      )}

      {/* 05 — Who It's For */}
      {resource.whoItIsFor?.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-6">
            <SectionHeader
              headline="Who it's for"
              highlightedWord="for"
              alignment="left"
              label={null}
              description={null}
            />
            <div className="space-y-3">
              {resource.whoItIsFor.map((item, i) => (
                <ScrollFadeUp key={i} delay={i * 0.07}>
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-mid" strokeWidth={2.5} />
                    <span className="text-sm leading-relaxed text-text-secondary">{item}</span>
                  </div>
                </ScrollFadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 06 — Action Block */}
      <GlassSection>
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <SectionHeader
            headline={resource.accessType === "free" ? "Get it free" : "Get access"}
            highlightedWord={resource.accessType === "free" ? "free" : "access"}
            alignment="left"
            label={null}
            description={null}
          />
          {resource.accessType === "free" ? (
            <FreeResourceBlock fileUrl={resource.fileUrl ?? "#"} />
          ) : (
            <PaidResourceBlock
              resourceSlug={resource.slug}
              resourceTitle={resource.title}
              priceUSD={resource.priceUSD}
              priceGBP={resource.priceGBP}
              priceNGN={resource.priceNGN}
            />
          )}
        </div>
      </GlassSection>

      {/* 07 — Related Resources */}
      {related.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollFadeUp>
              <RelatedContentGrid
                items={related}
                contentType="resource"
                label="More resources"
              />
            </ScrollFadeUp>
          </div>
        </section>
      )}

      {/* CTA inline */}
      {ctaInline && <CTABanner data={ctaInline} presentationMode="inline" colorScheme="light-teal" />}

      {/* CTA section */}
      {ctaSection && <CTABanner data={ctaSection} presentationMode="section" colorScheme="teal-solid" />}
    </>
  );
}
