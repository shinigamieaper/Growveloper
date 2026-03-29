"use client";

import { Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { THEME_STORAGE_KEY } from "@/lib/constants";
import { motion } from "motion/react";

interface ThemeToggleProps extends React.ComponentPropsWithoutRef<"button"> {}

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const [theme, setTheme] = useState<string>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored =
      document.documentElement.getAttribute("data-theme") ?? "dark";
    setTheme(stored);
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    setTheme(next);
  }

  const isDark = theme === "dark";

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        "group relative flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center transition-transform duration-200 hover:scale-110",
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      {...props}
    >
      {/* Neon glow aura — visible only in dark mode */}
      <motion.span
        animate={{
          opacity: isDark ? 1 : 0,
          scale: isDark ? 1 : 0.6,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(174,238,238,0.35) 0%, rgba(90,177,177,0.12) 50%, transparent 70%)",
          filter: "blur(6px)",
        }}
      />

      {/* Bulb icon */}
      <motion.span
        animate={{
          filter: isDark
            ? "drop-shadow(0 0 8px rgba(174,238,238,0.8)) drop-shadow(0 0 20px rgba(90,177,177,0.4))"
            : "drop-shadow(0 0 0px transparent) drop-shadow(0 0 0px transparent)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10"
      >
        <Lightbulb
          className={cn(
            "h-5 w-5 transition-colors duration-300",
            isDark ? "text-brand-light" : "text-text-tertiary",
          )}
          fill={isDark ? "rgba(174,238,238,0.2)" : "none"}
          strokeWidth={1.8}
        />
      </motion.span>
    </button>
  );
}
