"use client";

import { useEffect } from "react";
import { THEME_STORAGE_KEY } from "@/lib/constants";

/**
 * /about is designed dark only. The root theme script already sets dark
 * before first paint when /about is the landing page; this covers arriving
 * by client-side navigation, and on leaving it restores whatever the
 * visitor had (their saved choice, else their system setting). It never
 * writes the visitor's saved preference.
 */
export function AboutForceDark() {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", "dark");
    return () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(THEME_STORAGE_KEY);
      } catch {
        saved = null;
      }
      const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.setAttribute("data-theme", saved ?? system);
    };
  }, []);

  return null;
}
