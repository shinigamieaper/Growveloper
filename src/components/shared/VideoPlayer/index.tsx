/* The video player used inside articles and on video pages: a YouTube or TikTok player, a native file, or a
   plain link when the address cannot be embedded safely. No hooks, so it renders on the server or the client. */

import React from "react";
import { parseEmbed } from "@/lib/media/embed";

export function VideoPlayer({ url, caption }: { url?: string; caption?: string }) {
  const embed = url ? parseEmbed(url) : null;
  if (!embed) return null;

  let media: React.ReactNode;
  if (embed.kind === "youtube") {
    media = (
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-glass-border bg-bg-tertiary">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${embed.id}`}
          title={caption || "YouTube video"}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  } else if (embed.kind === "tiktok") {
    media = (
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[325px] overflow-hidden rounded-2xl border border-glass-border bg-bg-tertiary">
        <iframe
          src={`https://www.tiktok.com/embed/v2/${embed.id}`}
          title={caption || "TikTok video"}
          loading="lazy"
          allow="encrypted-media; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  } else if (embed.kind === "file") {
    media = (
      <video
        src={embed.src}
        controls
        preload="metadata"
        playsInline
        className="w-full rounded-2xl border border-glass-border bg-bg-tertiary"
      />
    );
  } else {
    media = (
      <a href={embed.href} target="_blank" rel="noopener noreferrer" className="text-brand-mid underline">
        {caption || "Watch the video"}
      </a>
    );
  }

  return (
    <figure className="my-8">
      {media}
      {caption && embed.kind !== "link" && (
        <figcaption className="mt-3 text-center text-sm text-text-tertiary">{caption}</figcaption>
      )}
    </figure>
  );
}
