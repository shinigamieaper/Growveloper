"use client";

import { cn } from "@/lib/utils";

interface VideoModalProps extends React.ComponentPropsWithoutRef<"div"> {
  videoUrl: string | null;
  platform: "youtube" | "tiktok" | null;
  onClose: () => void;
}

export function VideoModal({ videoUrl, platform, onClose, className, ...props }: VideoModalProps) {
  if (!videoUrl || !platform) return null;

  return (
    <div
      className={cn("fixed inset-0 z-[100] flex items-center justify-center bg-base-black/80 backdrop-blur-sm", className)}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      {...props}
    >
      <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        {/* Stage 6 — Video embed + platform link */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 min-h-[44px] min-w-[44px] text-base-white"
          aria-label="Close video"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
