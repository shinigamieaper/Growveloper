"use client";

import React from "react";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PostCostTable } from "@/components/shared/PostCostTable";
import { PostSimpleTable } from "@/components/shared/PostSimpleTable";
import type { PostCostTableBlock, PostSimpleTableBlock } from "@/lib/types";
import { parseEmbed } from "@/lib/media/embed";

/* A video inside an article: YouTube or TikTok player, a native file, or a plain link when it can't embed. */
function ArticleVideo({ url, caption }: { url?: string; caption?: string }) {
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

interface PortableTextRendererProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Sanity Portable Text value */
  value: PortableTextBlock[];
}

function slugifyHeading(value: PortableTextBlock | undefined): string | undefined {
  if (!value || !Array.isArray(value.children)) return undefined;
  const text = value.children
    .map((c) => (typeof (c as { text?: unknown }).text === "string" ? (c as { text: string }).text : ""))
    .join("")
    .trim();
  if (!text) return undefined;
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children, value }) => (
      <h1 id={slugifyHeading(value)} className="heading-font mb-6 mt-10 text-3xl font-bold text-text-primary md:text-4xl first:mt-0 scroll-mt-32">
        {children}
      </h1>
    ),
    h2: ({ children, value }) => (
      <h2 id={slugifyHeading(value)} className="heading-font mb-4 mt-10 text-2xl font-bold text-text-primary md:text-3xl first:mt-0 scroll-mt-32">
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={slugifyHeading(value)} className="heading-font mb-3 mt-8 text-xl font-semibold text-text-primary md:text-2xl first:mt-0 scroll-mt-32">
        {children}
      </h3>
    ),
    h4: ({ children, value }) => (
      <h4 id={slugifyHeading(value)} className="heading-font mb-2 mt-6 text-lg font-semibold text-text-primary md:text-xl first:mt-0 scroll-mt-32">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-base leading-relaxed text-text-primary" style={{ fontFamily: "var(--font-gambetta)" }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-brand-mid bg-brand-mid/4 py-3 pl-5 pr-4 italic text-text-primary">
        {children}
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-text-primary">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code
        className="rounded-md bg-bg-tertiary px-1.5 py-0.5 text-sm text-brand-mid"
        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
      >
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");
      const isAnchor = href.startsWith("#");
      return (
        <a
          href={href}
          className="text-brand-mid underline-offset-2 transition-colors hover:text-brand-light hover:underline"
          {...(isExternal && !isAnchor ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },

  types: {
    image: ({ value }) => {
      const src: string | undefined = value?.url || value?.asset?.url;
      if (!src) return null;
      const alt: string = value.alt ?? "";
      const caption: string | undefined = value.caption;
      return (
        <figure className="my-8">
          <div className="overflow-hidden rounded-xl border border-glass-border">
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={900}
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 720px"
            />
          </div>
          {caption && (
            <figcaption className="mt-3 px-1 text-xs leading-relaxed text-text-tertiary">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => (
      <pre
        className="my-6 overflow-x-auto rounded-xl bg-[#0d0d0d] p-5 text-sm leading-relaxed text-brand-light"
        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
      >
        <code>{value.code}</code>
      </pre>
    ),
    costTable: ({ value }) => (
      <PostCostTable data={value as PostCostTableBlock} />
    ),
    simpleTable: ({ value }) => (
      <PostSimpleTable data={value as PostSimpleTableBlock} />
    ),
    videoEmbed: ({ value }) => <ArticleVideo url={value?.url} caption={value?.caption} />,
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 ml-5 list-disc space-y-2 text-text-primary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 ml-5 list-decimal space-y-2 text-text-primary">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="text-base leading-relaxed" style={{ fontFamily: "var(--font-gambetta)" }}>
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="text-base leading-relaxed" style={{ fontFamily: "var(--font-gambetta)" }}>
        {children}
      </li>
    ),
  },
};

export function PortableTextRenderer({
  value,
  className,
  ...props
}: PortableTextRendererProps) {
  if (!value || value.length === 0) return null;

  return (
    <div className={cn("portable-text", className)} {...props}>
      <PortableText value={value} components={components} />
    </div>
  );
}
