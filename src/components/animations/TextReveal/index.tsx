"use client";

import React, { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion, EASE, DURATION, STAGGER } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface TextRevealProps extends React.ComponentPropsWithoutRef<"div"> {
  /** HTML tag to render — defaults to "h2" */
  as?: React.ElementType;
  /** Split type: "words" | "chars" | "lines" */
  splitType?: "words" | "chars" | "lines";
  /** Y offset in pixels — default 30 */
  y?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Stagger between elements in seconds */
  stagger?: number;
  /** ScrollTrigger start position — default "top 85%" */
  start?: string;
  /** Words to highlight with teal gradient after split */
  highlightedWord?: string | null;
  /** Children — the text content */
  children: React.ReactNode;
}

export function TextReveal({
  as: Tag = "h2",
  splitType = "words",
  y = 30,
  duration = DURATION.reveal,
  stagger: staggerAmount = STAGGER.words,
  start = "top 85%",
  highlightedWord,
  className,
  children,
  ...props
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!containerRef.current) return;

      const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches;

      const textEl = containerRef.current.querySelector("[data-text-reveal]");
      if (!textEl) return;

      const split = SplitText.create(textEl, {
        type: splitType,
      });

      const targets =
        splitType === "words"
          ? split.words
          : splitType === "chars"
            ? split.chars
            : split.lines;

      (textEl as HTMLElement).style.overflow = "visible";
      const allWrappers = textEl.querySelectorAll<HTMLElement>("div, span");
      allWrappers.forEach((el) => { el.style.overflow = "visible"; });

      if (highlightedWord && splitType === "words" && split.words.length > 0) {
        const hlWords = highlightedWord.toLowerCase().split(/\s+/);
        const wordEls = split.words as HTMLElement[];
        for (let i = 0; i <= wordEls.length - hlWords.length; i++) {
          const slice = wordEls.slice(i, i + hlWords.length);
          const matches = slice.every((el, j) =>
            el.textContent?.toLowerCase().replace(/[^a-z0-9\u2019']/g, "") === hlWords[j].replace(/[^a-z0-9\u2019']/g, "")
          );
          if (matches) {
            slice.forEach((el) => el.classList.add("highlight-text-gradient"));
          }
        }
      }

      gsap.set(targets, { opacity: 0, y: isMobile ? 20 : y });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: isMobile ? duration * 0.75 : duration,
        stagger: staggerAmount,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: "play none none none",
          once: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={cn(className)} {...props}>
      <Tag data-text-reveal>{children}</Tag>
    </div>
  );
}
