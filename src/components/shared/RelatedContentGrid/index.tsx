"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BentoGrid } from "@/components/ui/bento-grid";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";
import type { LabContentCard, BlogPostCardData, VideoCardData, ResourceCardData } from "@/lib/types";

type RelatedItem = LabContentCard | ResourceCardData;

/* ─── Accent variants — same system as LiveFeedBento / CaseStudyCard ─── */
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

/* ─── Type guards ─── */
function isBlogPost(item: RelatedItem): item is BlogPostCardData {
  return !("videoUrl" in item) && !("resourceType" in item);
}

function isVideo(item: RelatedItem): item is VideoCardData {
  return "videoUrl" in item;
}

function isResource(item: RelatedItem): item is ResourceCardData {
  return "resourceType" in item;
}

interface RelatedContentGridProps extends React.ComponentPropsWithoutRef<"section"> {
  items: RelatedItem[];
  contentType: "lab" | "resource";
  label: string;
  onVideoClick?: (videoUrl: string, platform: "youtube" | "tiktok") => void;
}

export function RelatedContentGrid({
  items,
  contentType,
  label,
  onVideoClick,
  className,
  ...props
}: RelatedContentGridProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className={cn("w-full", className)} {...props}>
      <h2 className="heading-font mb-8 text-2xl font-bold text-text-primary md:text-3xl">
        {label}
      </h2>

      <BentoGrid className="md:auto-rows-[20rem]">
        {items.map((item, i) => {
          const variant = accentVariants[i % accentVariants.length];

          if (contentType === "resource" && isResource(item)) {
            return (
              <div key={item.slug} className="md:col-span-1">
                <Link href={`/resources/${item.slug}`} className="block h-full">
                  <SpotlightCard spotlightColor="rgba(90, 177, 177, 0.12)" className="h-full">
                    <div className={cn(
                      "group/bento row-span-1 flex h-full flex-col justify-between space-y-4 rounded-xl border p-4 shadow-sm transition duration-200 hover:shadow-xl",
                      variant.card, variant.border,
                    )}>
                      {/* Cover image */}
                      <div className="relative w-full flex-1 min-h-[6rem] overflow-hidden rounded-xl">
                        {item.coverImage ? (
                          <Image src={item.coverImage} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover/bento:scale-[1.03]" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bg-tertiary to-bg-secondary">
                            <span className={cn("text-3xl font-bold opacity-20", variant.text)} aria-hidden="true">{item.resourceType[0]}</span>
                          </div>
                        )}
                        <span className={cn("absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm", variant.pill)}>
                          {item.resourceType}
                        </span>
                      </div>
                      {/* Bottom */}
                      <div className="transition duration-200 group-hover/bento:translate-x-2">
                        <h3 className={cn("heading-font mt-2 mb-1 line-clamp-2 font-bold", variant.text)}>{item.title}</h3>
                        <p className={cn("line-clamp-2 text-xs font-normal", variant.textSecondary)}>{item.description}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </div>
            );
          }

          /* Lab content — blog or video */
          const blog = isBlogPost(item) ? item : null;
          const video = isVideo(item) ? item : null;
          const thumbnail = blog?.heroImage ?? video?.thumbnail ?? "";
          const typeLabel = blog ? "Blog" : video?.platform === "youtube" ? "YouTube" : "TikTok";

          const cardInner = (
            <SpotlightCard spotlightColor="rgba(90, 177, 177, 0.12)" className="h-full">
              <div
                className={cn(
                  "group/bento row-span-1 flex h-full flex-col justify-between space-y-4 rounded-xl border p-4 shadow-sm transition duration-200 hover:shadow-xl",
                  variant.card, variant.border,
                  video && "cursor-pointer",
                )}
                role={video ? "button" : undefined}
                tabIndex={video ? 0 : undefined}
                onClick={video ? () => onVideoClick?.(video.videoUrl, video.platform) : undefined}
                onKeyDown={video ? (e) => { if (e.key === "Enter" || e.key === " ") onVideoClick?.(video.videoUrl, video.platform); } : undefined}
              >
                <div className="relative w-full flex-1 min-h-[6rem] overflow-hidden rounded-xl">
                  {thumbnail ? (
                    <Image src={thumbnail} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover/bento:scale-[1.03]" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bg-tertiary to-bg-secondary">
                      <span className={cn("text-3xl font-bold opacity-20", variant.text)} aria-hidden="true">{typeLabel[0]}</span>
                    </div>
                  )}
                  <span className={cn("absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm", variant.pill)}>
                    {typeLabel}
                  </span>
                </div>
                <div className="transition duration-200 group-hover/bento:translate-x-2">
                  <h3 className={cn("heading-font mt-2 mb-1 line-clamp-2 font-bold", variant.text)}>{item.title}</h3>
                  <div className={cn("flex items-center gap-3 text-xs font-normal", variant.textSecondary)}>
                    {(blog?.publishedAt ?? video?.publishedAt) && (
                      <time dateTime={blog?.publishedAt ?? video?.publishedAt ?? ""}>
                        {new Date(blog?.publishedAt ?? video?.publishedAt ?? "").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
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
                <Link href={`/lab/${blog.slug}`} className="block h-full">{cardInner}</Link>
              </div>
            );
          }

          return (
            <div key={`related-${i}`} className="md:col-span-1">
              {cardInner}
            </div>
          );
        })}
      </BentoGrid>
    </section>
  );
}
