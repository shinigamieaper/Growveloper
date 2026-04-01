"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackScrollDepth } from "@/lib/analytics";

const DEPTHS = [25, 50, 75, 100] as const;

export function ScrollDepthTracker() {
  const pathname = usePathname();
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Reset fired depths on page navigation
    firedRef.current = new Set();
  }, [pathname]);

  useEffect(() => {
    const sentinels: { depth: (typeof DEPTHS)[number]; el: HTMLDivElement }[] = [];
    const observers: IntersectionObserver[] = [];

    DEPTHS.forEach((depth) => {
      const el = document.createElement("div");
      el.style.cssText = "position:absolute;width:1px;height:1px;pointer-events:none;";
      el.style.top = `${depth}%`;
      document.documentElement.style.position = "relative";
      document.documentElement.appendChild(el);
      sentinels.push({ depth, el });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !firedRef.current.has(depth)) {
              firedRef.current.add(depth);
              trackScrollDepth({ page: pathname, depth });
            }
          });
        },
        { threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
      sentinels.forEach(({ el }) => el.parentNode?.removeChild(el));
    };
  }, [pathname]);

  return null;
}
