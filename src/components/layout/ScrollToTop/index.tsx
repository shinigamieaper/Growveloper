"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating scroll-to-top button.
 * Appears after scrolling past 400px. Smooth scrolls to top on click.
 * Respects prefers-reduced-motion (instant scroll).
 * 44px minimum touch target per mobile rules.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "instant" : "smooth" });
  };

  return (
    <button
      onClick={scrollUp}
      aria-label="Scroll to top"
      className={cn(
        "fixed right-6 bottom-6 z-50 flex min-h-[44px] min-w-[44px] items-center justify-center",
        "rounded-full border border-glass-border bg-glass-bg backdrop-blur-md",
        "text-text-secondary transition-all duration-300 hover:text-brand-mid",
        "focus-visible:ring-2 focus-visible:ring-brand-mid focus-visible:outline-none",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}
