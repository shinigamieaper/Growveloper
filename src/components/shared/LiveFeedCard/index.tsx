"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import type { LabContentCard, BlogPostCardData, VideoCardData } from "@/lib/types";

interface LiveFeedCardProps extends React.ComponentPropsWithoutRef<"article"> {
  data: LabContentCard | null;
  onVideoClick?: (videoUrl: string, platform: "youtube" | "tiktok") => void;
}

function isBlogPost(data: LabContentCard): data is BlogPostCardData {
  return !("videoUrl" in data);
}

function isVideo(data: LabContentCard): data is VideoCardData {
  return "videoUrl" in data;
}

export function LiveFeedCard({ data, onVideoClick, className, ...props }: LiveFeedCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!data) return null;

  const blog = isBlogPost(data) ? data : null;
  const video = isVideo(data) ? data : null;

  const platformLabel = blog ? "Blog" : video?.platform === "youtube" ? "YouTube" : "TikTok";
  const thumbnail = blog?.heroImage ?? video?.thumbnail ?? "";
  const title = data.title;
  const date = data.publishedAt;

  const handleMouseEnter = () => {
    if (video && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (video && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    if (video && onVideoClick) {
      onVideoClick(video.videoUrl, video.platform);
    }
  };

  const cardContent = (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-md transition-all duration-300 hover:border-brand-mid/30 hover:shadow-lg",
        video && "cursor-pointer",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={video ? handleClick : undefined}
      role={video ? "button" : undefined}
      tabIndex={video ? 0 : undefined}
      onKeyDown={video ? (e) => { if (e.key === "Enter" || e.key === " ") handleClick(); } : undefined}
      {...props}
    >
      {/* Thumbnail */}
      <div className="relative aspect-16/10 overflow-hidden">
        {video ? (
          <video
            ref={videoRef}
            poster={thumbnail}
            muted
            loop
            playsInline
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          >
            <source src={video.videoUrl} />
          </video>
        ) : thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-bg-tertiary">
            <span className="text-text-tertiary" aria-hidden="true">No image</span>
          </div>
        )}

        {/* Platform tag */}
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm",
            blog && "bg-brand-mid/90 text-base-white",
            video?.platform === "youtube" && "bg-red-600/90 text-white",
            video?.platform === "tiktok" && "bg-base-black/80 text-white",
          )}
        >
          {platformLabel}
        </span>

        {/* Play icon overlay for video */}
        {video && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-base-black/60 backdrop-blur-sm">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="heading-font line-clamp-2 text-base font-bold text-text-primary md:text-lg">
          {title}
        </h3>
        {blog?.excerpt && (
          <p className="line-clamp-2 text-sm text-text-secondary">{blog.excerpt}</p>
        )}
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-text-tertiary">
          {date && (
            <time dateTime={date}>
              {new Date(date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
          )}
          {blog?.readTime && <span>{blog.readTime}</span>}
        </div>
      </div>
    </article>
  );

  if (blog) {
    return (
      <Link href={`/lab/${blog.slug}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
