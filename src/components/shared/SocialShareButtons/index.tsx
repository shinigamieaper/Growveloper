"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Linkedin, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── X (Twitter) icon — Lucide doesn't have the new X logo ─── */
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface SocialShareButtonsProps extends React.ComponentPropsWithoutRef<"div"> {
  url?: string;
  title: string;
}

export function SocialShareButtons({
  url,
  title,
  className,
  ...props
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [resolvedUrl, setResolvedUrl] = useState(url || "");

  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setResolvedUrl(window.location.href);
    }
    if (typeof navigator !== "undefined" && "share" in navigator) {
      setCanNativeShare(true);
    }
  }, [url]);

  const shareOnX = useCallback(() => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(resolvedUrl)}&text=${encodeURIComponent(title)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }, [resolvedUrl, title]);

  const shareOnLinkedIn = useCallback(() => {
    const shareUrl = `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(resolvedUrl)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }, [resolvedUrl]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(resolvedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = resolvedUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [resolvedUrl]);

  const nativeShare = useCallback(async () => {
    try {
      await navigator.share({ title, url: resolvedUrl });
    } catch {
      /* user cancelled — no-op */
    }
  }, [title, resolvedUrl]);

  if (!title) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-glass-border bg-glass-bg px-2 py-1.5 backdrop-blur-sm",
        className,
      )}
      role="group"
      aria-label="Share this article"
      {...props}
    >
      {canNativeShare ? (
        <button
          onClick={nativeShare}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-text-secondary transition-colors hover:bg-brand-dark/10 hover:text-brand-mid"
          aria-label="Share"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" x2="12" y1="2" y2="15" />
          </svg>
          <span className="hidden md:inline">Share</span>
        </button>
      ) : (
        <>
          {/* Share on X */}
          <button
            onClick={shareOnX}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-text-secondary transition-colors hover:bg-brand-dark/10 hover:text-brand-mid"
            aria-label="Share on X"
          >
            <XIcon className="h-4 w-4" />
            <span className="hidden md:inline">X</span>
          </button>

          {/* Share on LinkedIn */}
          <button
            onClick={shareOnLinkedIn}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-text-secondary transition-colors hover:bg-brand-dark/10 hover:text-brand-mid"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
            <span className="hidden md:inline">LinkedIn</span>
          </button>

          {/* Copy link */}
          <button
            onClick={copyLink}
            className={cn(
              "inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full px-3 text-sm font-medium transition-colors",
              copied
                ? "text-brand-mid"
                : "text-text-secondary hover:bg-brand-dark/10 hover:text-brand-mid",
            )}
            aria-label={copied ? "Link copied" : "Copy link"}
          >
            {copied ? (
              <Check className="h-4 w-4" strokeWidth={2.5} />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="hidden md:inline">
              {copied ? "Copied!" : "Copy"}
            </span>
          </button>
        </>
      )}
    </div>
  );
}
