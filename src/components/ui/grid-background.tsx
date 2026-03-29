"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface GridBackgroundProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Grid cell size in pixels — default 40 */
  gridSize?: number;
  /** Show radial mask fade at edges — default true */
  masked?: boolean;
  children?: React.ReactNode;
}

export function GridBackground({
  gridSize = 40,
  masked = true,
  className,
  children,
  ...props
}: GridBackgroundProps) {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") ?? "dark";
    setTheme(current);

    const observer = new MutationObserver(() => {
      setTheme(
        document.documentElement.getAttribute("data-theme") ?? "dark",
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const lineColor = theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)";

  return (
    <div
      className={cn("relative flex w-full items-center justify-center bg-bg-primary", className)}
      {...props}
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 1px), linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
        }}
        aria-hidden="true"
      />

      {/* Radial mask fade */}
      {masked && (
        <div
          className="pointer-events-none absolute inset-0 bg-bg-primary"
          style={{
            maskImage: "radial-gradient(ellipse at center, transparent 20%, black)",
            WebkitMaskImage: "radial-gradient(ellipse at center, transparent 20%, black)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
