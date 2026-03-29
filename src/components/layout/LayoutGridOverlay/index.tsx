"use client";

import { useEffect, useState } from "react";

/**
 * Fixed-position grid line overlay for the root layout.
 * Theme-aware — darker lines in dark mode, lighter in light mode.
 * Radial edge mask softens the grid at viewport edges.
 * pointer-events-none so it never blocks interaction.
 */
export function LayoutGridOverlay() {
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

  const lineColor = theme === "dark" ? "#2a2a2a" : "#e4e4e7";
  const gridSize = 40;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 1px), linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
        }}
      />

      {/* Radial mask — fades grid at edges */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 30%, var(--bg-primary) 80%)`,
        }}
      />
    </div>
  );
}
