"use client";

import { useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface VideoModalProps extends React.ComponentPropsWithoutRef<"div"> {
  videoUrl: string | null;
  platform: "youtube" | "tiktok" | null;
  onClose: () => void;
}

function getEmbedUrl(videoUrl: string, platform: "youtube" | "tiktok"): string | null {
  if (platform === "youtube") {
    const match = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
  }
  if (platform === "tiktok") {
    const match = videoUrl.match(/\/video\/(\d+)/);
    if (match) return `https://www.tiktok.com/embed/v2/${match[1]}`;
  }
  return null;
}

function getPlatformLabel(platform: "youtube" | "tiktok"): string {
  return platform === "youtube" ? "YouTube" : "TikTok";
}

export function VideoModal({ videoUrl, platform, onClose, className, ...props }: VideoModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!videoUrl || !platform) return null;

  const embedUrl = getEmbedUrl(videoUrl, platform);

  return (
    <div
      className={cn(
        "fixed inset-0 z-100 flex items-center justify-center bg-base-black/85 backdrop-blur-sm",
        className,
      )}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      {...props}
    >
      <div
        className="relative w-full max-w-3xl px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-4 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-2xl text-base-white transition-colors hover:text-brand-light"
          aria-label="Close video"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Video embed */}
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-base-black">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title={`${getPlatformLabel(platform)} video`}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-text-secondary">
              Unable to load video
            </div>
          )}
        </div>

        {/* Platform link */}
        <div className="mt-4 text-center">
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-brand-light"
          >
            Watch on {getPlatformLabel(platform)}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
