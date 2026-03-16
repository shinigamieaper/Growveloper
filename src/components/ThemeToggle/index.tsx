"use client";

import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { THEME_STORAGE_KEY } from "@/lib/constants";

interface ThemeToggleProps extends React.ComponentPropsWithoutRef<"button"> {}

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const [theme, setTheme] = useState<string>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = document.documentElement.getAttribute("data-theme") ?? "dark";
    setTheme(stored);
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    setTheme(next);
  }

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        "relative flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-glass-border bg-glass-bg transition-all hover:scale-105",
        className,
      )}
      aria-label="Toggle theme"
      {...props}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-brand-light" />
      ) : (
        <Moon className="h-5 w-5 text-brand-dark" />
      )}
    </button>
  );
}
