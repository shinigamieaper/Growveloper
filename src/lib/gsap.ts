"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

/* ─── Reduced motion helper ─── */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ─── Shared easing presets ─── */
export const EASE = {
  smooth: "power2.out",
  snap: "power3.out",
  bounce: "back.out(1.4)",
  elastic: "elastic.out(1, 0.5)",
  smoothInOut: "power2.inOut",
} as const;

/* ─── Shared duration constants (seconds) ─── */
export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  reveal: 0.8,
} as const;

/* ─── Shared stagger constants (seconds) ─── */
export const STAGGER = {
  tight: 0.05,
  normal: 0.1,
  relaxed: 0.15,
  words: 0.04,
} as const;
