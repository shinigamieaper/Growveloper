"use client";

import React, { useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";
import { gsap, prefersReducedMotion, EASE, DURATION } from "@/lib/gsap";
import type { LabContentCard, BlogPostCardData, VideoCardData } from "@/lib/types";

/* ─── Accent variants — same system as CaseStudyCard ─── */
const accentVariants = [
  {
    panel: "bg-case-accent-1",
    heading: "text-case-accent-1-foreground",
    body: "text-case-accent-1-foreground/80",
    pill: "border-case-accent-1-foreground/25 text-case-accent-1-foreground/80",
  },
  {
    panel: "bg-case-accent-2",
    heading: "text-case-accent-2-foreground",
    body: "text-case-accent-2-foreground/80",
    pill: "border-case-accent-2-foreground/25 text-case-accent-2-foreground/80",
  },
  {
    panel: "bg-case-accent-3",
    heading: "text-case-accent-3-foreground",
    body: "text-case-accent-3-foreground/85",
    pill: "border-case-accent-3-foreground/25 text-case-accent-3-foreground/80",
  },
] as const;

/* ─── Type guards ─── */
function isBlogPost(data: LabContentCard): data is BlogPostCardData {
  return !("videoUrl" in data);
}

function isVideo(data: LabContentCard): data is VideoCardData {
  return "videoUrl" in data;
}

interface LabFeaturedCardProps extends React.ComponentPropsWithoutRef<"article"> {
  item: LabContentCard;
  colorIndex?: number;
  onVideoClick?: (url: string, platform: "youtube" | "tiktok") => void;
}

export function LabFeaturedCard({
  item,
  colorIndex = 0,
  onVideoClick,
  className,
  ...props
}: LabFeaturedCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  const reduced = typeof window !== "undefined" ? prefersReducedMotion() : false;
  const variant = accentVariants[colorIndex % accentVariants.length];

  /* ─── GSAP hover (matches CaseStudyCard) ─── */
  const handleMouseEnter = useCallback(() => {
    if (reduced || !cardRef.current) return;
    gsap.to(cardRef.current, { scale: 1.015, duration: DURATION.fast, ease: EASE.smooth });
    if (borderRef.current) gsap.to(borderRef.current, { opacity: 0.8, duration: DURATION.fast, ease: EASE.smooth });
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    if (reduced || !cardRef.current) return;
    gsap.to(cardRef.current, { scale: 1, duration: DURATION.fast, ease: EASE.smooth });
    if (borderRef.current) gsap.to(borderRef.current, { opacity: 0.15, duration: DURATION.fast, ease: EASE.smooth });
  }, [reduced]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || reduced) return;
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseLeave, reduced]);

  if (!item || !item.title) return null;

  const blog = isBlogPost(item);
  const video = isVideo(item);
  const thumbnail = blog ? item.heroImage : item.thumbnail;
  const hasMedia = Boolean(thumbnail);
  const hotspot = blog ? item.heroImageHotspot : undefined;
  const objectPosition = hotspot
    ? `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`
    : undefined;
  const excerpt = blog ? item.excerpt : item.description;
  const contentTypeLabel = blog ? "Blog" : video ? (item.platform === "youtube" ? "YouTube" : "TikTok") : "Blog";
  const meta = blog
    ? [item.publishedAt, item.readTime].filter(Boolean).join(" · ")
    : item.platform === "youtube" ? "YouTube" : "TikTok";

  const handleVideoClick = () => {
    if (video && onVideoClick) onVideoClick(item.videoUrl, item.platform);
  };

  const card = (
    <article
      ref={cardRef}
      className={cn(
        "group relative grid overflow-hidden rounded-2xl border border-glass-border bg-bg-secondary",
        "grid-cols-1 md:grid-cols-[55%_45%]",
        !reduced && "will-change-transform",
        className,
      )}
      {...props}
    >
      {/* ── Border accent overlay ── */}
      <div
        ref={borderRef}
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl border border-brand-mid"
        style={{ opacity: 0.15 }}
        aria-hidden="true"
      />

      {/* ── Arrow affordance ── */}
      <div
        className="pointer-events-none absolute right-5 top-5 z-20 text-brand-mid opacity-70 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      >
        <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      {/* ── Left: Accent content panel ── */}
      <div className={cn("relative flex flex-col justify-between gap-6 rounded-l-2xl p-8 md:p-10 lg:p-12", variant.panel)}>
        <div className="flex flex-col gap-4">
          {/* Content type pill */}
          <span className={cn("w-fit rounded border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider", variant.pill)}>
            {contentTypeLabel}
          </span>

          {/* Title */}
          <h3 className={cn("heading-font text-2xl font-bold uppercase leading-tight md:text-3xl lg:text-[2.5rem] lg:leading-[1.1]", variant.heading)}>
            {item.title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className={cn("max-w-md text-sm leading-relaxed md:text-base", variant.body)}>
              {excerpt}
            </p>
          )}
        </div>

        {/* Meta at bottom */}
        {meta && (
          <p className={cn("text-xs font-medium", variant.body)}>
            {meta}
          </p>
        )}
      </div>

      {/* ── Right: Media panel ── */}
      <div className="relative min-h-[280px] md:min-h-[360px]">
        {hasMedia ? (
          <Image
            src={thumbnail!}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={objectPosition ? { objectPosition } : undefined}
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-brand-dark to-brand-mid" aria-hidden="true" />
        )}

        {/* Play overlay for video */}
        {video && (
          <button
            type="button"
            aria-label={`Play ${item.title}`}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleVideoClick(); }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-base-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-base-black/70 backdrop-blur-sm transition-transform duration-300 hover:scale-110">
              <svg className="ml-1 h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </div>

      {/* ── Clickable overlay ── */}
      {blog ? (
        <Link
          href={`/lab/${item.slug}`}
          className="absolute inset-0 z-20"
          aria-label={`Read: ${item.title}`}
        >
          <span className="sr-only">Read: {item.title}</span>
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleVideoClick}
          className="absolute inset-0 z-15"
          aria-label={`Watch: ${item.title}`}
        >
          <span className="sr-only">Watch: {item.title}</span>
        </button>
      )}
    </article>
  );

  if (reduced) return card;

  return (
    <SpotlightCard spotlightColor="rgba(90, 177, 177, 0.15)" className="rounded-2xl">
      {card}
    </SpotlightCard>
  );
}
