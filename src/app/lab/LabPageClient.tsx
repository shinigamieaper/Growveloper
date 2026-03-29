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
import {
  LAB_HEADLINE,
  LAB_HIGHLIGHTED_WORD,
  LAB_DESCRIPTION,
  LAB_CONTENT,
  LAB_NEWSLETTER,
  LAB_CTA_INLINE,
  LAB_CTA_SECTION,
  getLabFeatured,
} from "@/lib/data/lab";

export function LabPageClient() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoPlatform, setVideoPlatform] = useState<"youtube" | "tiktok" | null>(null);

  const featured = getLabFeatured();

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
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            headline={LAB_HEADLINE}
            highlightedWord={LAB_HIGHLIGHTED_WORD}
            description={LAB_DESCRIPTION}
          />
        </div>
      </section>

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
          <LabFeedWrapper items={LAB_CONTENT} onVideoClick={handleVideoClick} />
        </div>
      </section>

      {/* CTA A — Inline */}
      <CTABanner data={LAB_CTA_INLINE} presentationMode="inline" colorScheme="light-teal" />

      {/* 06 — Newsletter Capture */}
      <NewsletterCapture
        headline={LAB_NEWSLETTER.headline}
        highlightedWord={LAB_NEWSLETTER.highlightedWord}
        subCopy={LAB_NEWSLETTER.subCopy}
        ctaLabel={LAB_NEWSLETTER.ctaLabel}
      />

      {/* CTA B — Section */}
      <CTABanner data={LAB_CTA_SECTION} presentationMode="section" colorScheme="teal-solid" />

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
