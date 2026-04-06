"use client";

import { useState } from "react";
import {
  GlassSection,
  CTABanner,
  SectionHeader,
  LabFeaturedCard,
  LabFeedWrapper,
  NewsletterCapture,
  VideoModal,
} from "@/components";
import type { CTABannerData, LabContentCard } from "@/lib/types";

interface LabPageClientProps {
  items: LabContentCard[];
  pageHeadline?: string | null;
  pageHighlightedWord?: string | null;
  pageDescription?: string | null;
  newsletterHeadline?: string | null;
  newsletterHighlightedWord?: string | null;
  newsletterSubCopy?: string | null;
  newsletterCtaLabel?: string | null;
  newsletterSuccessHeadline?: string | null;
  newsletterSuccessSubCopy?: string | null;
  newsletterEmailPlaceholder?: string | null;
  inlineCtaHeadline?: string | null;
  inlineCtaHighlightedWord?: string | null;
  inlineCtaLabel?: string | null;
  inlineCtaDestination?: string | null;
  sectionCtaHeadline?: string | null;
  sectionCtaHighlightedWord?: string | null;
  sectionCtaLabel?: string | null;
  sectionCtaDestination?: string | null;
  emptyStateFiltered?: string | null;
}

export function LabPageClient({
  items,
  pageHeadline,
  pageHighlightedWord,
  pageDescription,
  newsletterHeadline,
  newsletterHighlightedWord,
  newsletterSubCopy,
  newsletterCtaLabel,
  newsletterSuccessHeadline,
  newsletterSuccessSubCopy,
  newsletterEmailPlaceholder,
  inlineCtaHeadline,
  inlineCtaHighlightedWord,
  inlineCtaLabel,
  inlineCtaDestination,
  sectionCtaHeadline,
  sectionCtaHighlightedWord,
  sectionCtaLabel,
  sectionCtaDestination,
  emptyStateFiltered,
}: LabPageClientProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoPlatform, setVideoPlatform] = useState<"youtube" | "tiktok" | null>(null);

  const featured =
    items.find((item) => "featuredToggle" in item && item.featuredToggle) ??
    items[0] ??
    null;

  const inlineCta: CTABannerData | null =
    inlineCtaHeadline && inlineCtaLabel
      ? { headline: inlineCtaHeadline, highlightedWord: inlineCtaHighlightedWord ?? undefined, ctaLabel: inlineCtaLabel, ctaDestination: inlineCtaDestination ?? "/start" }
      : null;

  const sectionCta: CTABannerData | null =
    sectionCtaHeadline && sectionCtaLabel
      ? { headline: sectionCtaHeadline, highlightedWord: sectionCtaHighlightedWord ?? undefined, ctaLabel: sectionCtaLabel, ctaDestination: sectionCtaDestination ?? "/start" }
      : null;

  function handleVideoClick(url: string, platform: "youtube" | "tiktok") {
    setVideoUrl(url);
    setVideoPlatform(platform);
  }

  function handleVideoClose() {
    setVideoUrl(null);
    setVideoPlatform(null);
  }

  return (
    <>
      {/* 01 — Hero */}
      {pageHeadline && (
        <section className="pt-16 pb-16 md:pt-20 md:pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              headline={pageHeadline}
              highlightedWord={pageHighlightedWord}
              description={pageDescription}
            />
          </div>
        </section>
      )}

      {/* 02 — Featured Content */}
      {featured && (
        <GlassSection>
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <LabFeaturedCard item={featured} onVideoClick={handleVideoClick} />
          </div>
        </GlassSection>
      )}

      {/* 03–05 — Filter Bar + Content Feed + Load More */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <LabFeedWrapper items={items} onVideoClick={handleVideoClick} emptyStateFiltered={emptyStateFiltered} />
        </div>
      </section>

      {/* CTA A — Inline */}
      {inlineCta && <CTABanner data={inlineCta} presentationMode="inline" colorScheme="light-teal" />}

      {/* 06 — Newsletter Capture */}
      {newsletterHeadline && (
        <NewsletterCapture
          headline={newsletterHeadline}
          highlightedWord={newsletterHighlightedWord}
          subCopy={newsletterSubCopy}
          ctaLabel={newsletterCtaLabel}
          successHeadline={newsletterSuccessHeadline}
          successSubCopy={newsletterSuccessSubCopy}
          emailPlaceholder={newsletterEmailPlaceholder}
        />
      )}

      {/* CTA B — Section */}
      {sectionCta && <CTABanner data={sectionCta} presentationMode="section" colorScheme="teal-solid" />}

      {/* Video Modal */}
      {videoUrl && videoPlatform && (
        <VideoModal
          videoUrl={videoUrl}
          platform={videoPlatform}
          onClose={handleVideoClose}
        />
      )}
    </>
  );
}
