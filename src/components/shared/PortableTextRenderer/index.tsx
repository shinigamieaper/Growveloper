"use client";

import React from "react";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PortableTextRendererProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Sanity Portable Text value */
  value: PortableTextBlock[];
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="heading-font mb-6 mt-10 text-3xl font-bold text-text-primary md:text-4xl first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="heading-font mb-4 mt-8 text-2xl font-bold text-text-primary md:text-3xl first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="heading-font mb-3 mt-6 text-xl font-semibold text-text-primary md:text-2xl first:mt-0">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-base leading-relaxed text-text-secondary" style={{ fontFamily: "var(--font-gambetta)" }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-brand-mid py-1 pl-5 italic text-text-tertiary">
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
      return (
        <a
          href={href}
          className="text-brand-mid underline-offset-2 transition-colors hover:text-brand-light hover:underline"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },

  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref && !value?.asset?.url) return null;
      const src = value.asset?.url || "";
      const alt = value.alt || "";
      return (
        <div className="my-8 overflow-hidden rounded-xl">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={675}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 720px"
          />
        </div>
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
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 ml-5 list-disc space-y-2 text-text-secondary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 ml-5 list-decimal space-y-2 text-text-secondary">
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
