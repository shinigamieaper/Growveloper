"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BentoGrid } from "@/components/ui/bento-grid";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ContentFilterBar } from "@/components/shared/ContentFilterBar";
import { LoadMore } from "@/components/shared/LoadMore";
import { cn } from "@/lib/utils";
import type { LabContentCard, BlogPostCardData, VideoCardData } from "@/lib/types";

/* ─── Type guards ─── */
function isBlogPost(data: LabContentCard): data is BlogPostCardData {
  return !("videoUrl" in data);
}

function isVideo(data: LabContentCard): data is VideoCardData {
  return "videoUrl" in data;
}

/* ─── Derive content type string ─── */
function getContentType(item: LabContentCard): string {
  if (isBlogPost(item)) return "blog";
  if (isVideo(item)) return item.platform;
  return "blog";
}

/* ─── Accent variants — same system as LiveFeedBento ─── */
const accentVariants = [
  {
    card: "bg-case-accent-1",
    text: "text-case-accent-1-foreground",
    textSecondary: "text-case-accent-1-foreground/70",
    border: "border-case-accent-1-foreground/20",
    pill: "bg-case-accent-1-foreground/15 text-case-accent-1-foreground",
  },
  {
    card: "bg-case-accent-2",
    text: "text-case-accent-2-foreground",
    textSecondary: "text-case-accent-2-foreground/70",
    border: "border-case-accent-2-foreground/20",
    pill: "bg-case-accent-2-foreground/15 text-case-accent-2-foreground",
  },
  {
    card: "bg-case-accent-3",
    text: "text-case-accent-3-foreground",
    textSecondary: "text-case-accent-3-foreground/70",
    border: "border-case-accent-3-foreground/20",
    pill: "bg-case-accent-3-foreground/15 text-case-accent-3-foreground",
  },
];

/* ─── Content type icon (inline SVG) ─── */
function ContentIcon({ type, className }: { type: "blog" | "youtube" | "tiktok"; className?: string }) {
  if (type === "blog") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

/* ─── Filter options (static) ─── */
const FILTER_OPTIONS = [
  { label: "Blog", value: "blog" },
  { label: "YouTube", value: "youtube" },
  { label: "TikTok", value: "tiktok" },
];

const PAGE_SIZE = 6;

interface LabFeedWrapperProps extends React.ComponentPropsWithoutRef<"div"> {
  items: LabContentCard[];
  onVideoClick?: (videoUrl: string, platform: "youtube" | "tiktok") => void;
  emptyStateFiltered?: string | null;
}

export function LabFeedWrapper({
  items,
  onVideoClick,
  emptyStateFiltered,
  className,
  ...props
}: LabFeedWrapperProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredItems = useMemo(() => {
    if (activeFilters.length === 0) return items;
    return items.filter((item) => activeFilters.includes(getContentType(item)));
  }, [items, activeFilters]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleFilterChange = (values: string[]) => {
    setActiveFilters(values);
    setVisibleCount(PAGE_SIZE);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Filter bar */}
      <ContentFilterBar
        filters={FILTER_OPTIONS}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
      />

      {/* BentoGrid — matches LiveFeedBento visual pattern */}
      <BentoGrid className="mt-8 md:auto-rows-[22rem]">
        {visibleItems.map((data, i) => {
          const blog = isBlogPost(data) ? data : null;
          const video = isVideo(data) ? data : null;
          const contentType: "blog" | "youtube" | "tiktok" = blog
            ? "blog"
            : video?.platform === "youtube"
              ? "youtube"
              : "tiktok";
          const thumbnail = blog?.heroImage ?? video?.thumbnail ?? "";
          const hotspot = blog?.heroImageHotspot;
          const objectPosition = hotspot
            ? `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`
            : undefined;
          const variant = accentVariants[i % accentVariants.length];
          const labels = { blog: "Blog", youtube: "YouTube", tiktok: "TikTok" };

          const cardInner = (
            <SpotlightCard spotlightColor="rgba(90, 177, 177, 0.12)" className="h-full">
              <div
                className={cn(
                  "group/bento row-span-1 flex h-full flex-col justify-between space-y-4 rounded-xl border p-4 shadow-sm transition duration-200 hover:shadow-xl",
                  variant.card,
                  variant.border,
                  video && "cursor-pointer",
                )}
                role={video ? "button" : undefined}
                tabIndex={video ? 0 : undefined}
                onClick={video ? () => onVideoClick?.(video.videoUrl, video.platform) : undefined}
                onKeyDown={video ? (e) => { if (e.key === "Enter" || e.key === " ") onVideoClick?.(video.videoUrl, video.platform); } : undefined}
              >
                {/* Thumbnail */}
                <div className="relative w-full flex-1 min-h-[6rem] overflow-hidden rounded-xl">
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt={data.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover/bento:scale-[1.03]"
                      style={objectPosition ? { objectPosition } : undefined}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bg-tertiary to-bg-secondary">
                      <ContentIcon type={contentType} className={cn("h-10 w-10 opacity-30", variant.text)} />
                    </div>
                  )}

                  {/* Tag pill */}
                  <span className={cn("absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm", variant.pill)}>
                    {labels[contentType]}
                  </span>

                  {/* Play overlay for video */}
                  {(contentType === "youtube" || contentType === "tiktok") && (
                    <button
                      type="button"
                      aria-label={`Play ${data.title}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (onVideoClick && video) onVideoClick(video.videoUrl, video.platform);
                      }}
                      className="absolute inset-0 z-10 flex items-center justify-center bg-base-black/10 opacity-0 transition-opacity duration-300 group-hover/bento:opacity-100"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-base-black/70 backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                        <svg className="ml-1 h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>
                  )}
                </div>

                {/* Bottom — icon + title + meta */}
                <div className="transition duration-200 group-hover/bento:translate-x-2">
                  <ContentIcon type={contentType} className={cn("h-4 w-4", variant.textSecondary)} />
                  <h3 className={cn("heading-font mt-2 mb-1 line-clamp-2 font-bold", variant.text)}>
                    {data.title}
                  </h3>
                  <div className={cn("flex items-center gap-3 text-xs font-normal", variant.textSecondary)}>
                    {data.publishedAt && (
                      <time dateTime={data.publishedAt}>
                        {new Date(data.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </time>
                    )}
                    {blog?.readTime && <span>{blog.readTime}</span>}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          );

          if (blog) {
            return (
              <div key={blog.slug} className="md:col-span-1">
                <Link href={`/lab/${blog.slug}`} className="block h-full">
                  {cardInner}
                </Link>
              </div>
            );
          }

          return (
            <div key={`${video?.platform}-${i}`} className="md:col-span-1">
              {cardInner}
            </div>
          );
        })}
      </BentoGrid>

      {/* Empty after filtering */}
      {filteredItems.length === 0 && activeFilters.length > 0 && emptyStateFiltered && (
        <p className="mt-12 text-center text-sm text-text-tertiary">{emptyStateFiltered}</p>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="mt-10 flex justify-center">
          <LoadMore
            label="Load More"
            onLoadMore={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
          />
        </div>
      )}
    </div>
  );
}
