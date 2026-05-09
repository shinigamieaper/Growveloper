"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";
import type { LabContentCard, BlogPostCardData, VideoCardData } from "@/lib/types";

/* ─── Accent variants — same system as LiveFeedBento ─── */
const accentVariants = [
  {
    panel: "bg-case-accent-1",
    heading: "text-case-accent-1-foreground",
    body: "text-case-accent-1-foreground/75",
    meta: "text-case-accent-1-foreground/60",
    pill: "bg-case-accent-1-foreground/15 text-case-accent-1-foreground",
    icon: "text-case-accent-1-foreground/70",
  },
  {
    panel: "bg-case-accent-2",
    heading: "text-case-accent-2-foreground",
    body: "text-case-accent-2-foreground/75",
    meta: "text-case-accent-2-foreground/60",
    pill: "bg-case-accent-2-foreground/15 text-case-accent-2-foreground",
    icon: "text-case-accent-2-foreground/70",
  },
  {
    panel: "bg-case-accent-3",
    heading: "text-case-accent-3-foreground",
    body: "text-case-accent-3-foreground/85",
    meta: "text-case-accent-3-foreground/65",
    pill: "bg-case-accent-3-foreground/20 text-case-accent-3-foreground",
    icon: "text-case-accent-3-foreground/70",
  },
] as const;

/* ─── Type guards ─── */
function isBlogPost(data: LabContentCard): data is BlogPostCardData {
  return !("videoUrl" in data);
}

function isVideo(data: LabContentCard): data is VideoCardData {
  return "videoUrl" in data;
}

/* ─── Content type icon ─── */
function ContentIcon({ type, className }: { type: "blog" | "youtube" | "tiktok"; className?: string }) {
  if (type === "blog") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    );
  }
  if (type === "youtube") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
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
  if (!item || !item.title) return null;

  const variant = accentVariants[colorIndex % accentVariants.length];
  const blog = isBlogPost(item);
  const video = isVideo(item);
  const thumbnail = blog ? item.heroImage : item.thumbnail;
  const hasMedia = Boolean(thumbnail);
  const hotspot = blog ? item.heroImageHotspot : undefined;
  const objectPosition = hotspot
    ? `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`
    : undefined;
  const excerpt = isBlogPost(item) ? item.excerpt : item.description;
  const contentType: "blog" | "youtube" | "tiktok" = isBlogPost(item)
    ? "blog"
    : item.platform === "youtube"
      ? "youtube"
      : "tiktok";
  const contentTypeLabel = contentType === "blog" ? "Blog" : contentType === "youtube" ? "YouTube" : "TikTok";

  const handleVideoClick = () => {
    if (isVideo(item) && onVideoClick) onVideoClick(item.videoUrl, item.platform);
  };

  const card = (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-glass-border p-3 md:p-4 transition-shadow duration-300 hover:shadow-xl",
        variant.panel,
        className,
      )}
      {...props}
    >
      {/* ── Media — full-width, aspect-video so 16:9 hero compositions render uncropped ── */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        {hasMedia ? (
          <Image
            src={thumbnail!}
            alt={item.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1024px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            style={objectPosition ? { objectPosition } : undefined}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-bg-tertiary to-bg-secondary">
            <ContentIcon type={contentType} className={cn("h-12 w-12 opacity-30", variant.icon)} />
          </div>
        )}

        {/* Content type pill */}
        <span
          className={cn(
            "absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md",
            variant.pill,
          )}
        >
          {contentTypeLabel}
        </span>

        {/* Arrow affordance — top right */}
        <div
          className={cn(
            "absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-base-black/30 backdrop-blur-md transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            variant.heading,
          )}
          aria-hidden="true"
        >
          <ArrowUpRight className="h-4 w-4" />
        </div>

        {/* Play overlay for video */}
        {video && (
          <button
            type="button"
            aria-label={`Play ${item.title}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleVideoClick();
            }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-base-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-base-black/70 backdrop-blur-sm transition-transform duration-300 hover:scale-110">
              <svg className="ml-1 h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </div>

      {/* ── Content slot — slides on hover, mirrors LiveFeedBento ── */}
      <div className="px-3 pt-5 pb-3 md:px-4 md:pt-6 md:pb-4 transition duration-200 group-hover:translate-x-1.5">
        <ContentIcon type={contentType} className={cn("h-5 w-5", variant.icon)} />
        <h2
          className={cn(
            "heading-font mt-3 mb-3 text-xl font-bold leading-tight tracking-tight md:text-2xl lg:text-3xl",
            variant.heading,
          )}
        >
          {item.title}
        </h2>
        {excerpt && (
          <p className={cn("mb-4 max-w-2xl text-sm leading-relaxed md:text-base", variant.body)}>
            {excerpt}
          </p>
        )}
        <div className={cn("flex flex-wrap items-center gap-4 text-xs font-medium", variant.meta)}>
          {item.publishedAt && (
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden />
              <time dateTime={item.publishedAt}>
                {new Date(item.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </span>
          )}
          {blog && item.readTime && <span>{item.readTime}</span>}
        </div>
      </div>
    </article>
  );

  const wrapped = (
    <SpotlightCard spotlightColor="rgba(90, 177, 177, 0.15)" className="rounded-2xl">
      {card}
    </SpotlightCard>
  );

  if (blog) {
    return (
      <Link href={`/lab/${item.slug}`} aria-label={`Read: ${item.title}`} className="block">
        {wrapped}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleVideoClick}
      aria-label={`Watch: ${item.title}`}
      className="block w-full text-left"
    >
      {wrapped}
    </button>
  );
}
