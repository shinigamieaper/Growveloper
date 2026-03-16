"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import type { NavigationData, NavDropdownItem, NavLink } from "@/lib/types";

interface NavigationProps extends React.ComponentPropsWithoutRef<"nav"> {
  data: NavigationData | null;
}

export function Navigation({ data, className, ...props }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [theme, setThemeState] = useState<string>("dark");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") ?? "dark";
    setThemeState(current);

    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme") ?? "dark";
      setThemeState(t);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!data) return null;

  const logoSrc = theme === "dark"
    ? "/images/logo/logo-wordmark-dark.png"
    : "/images/logo/logo-wordmark-light.png";

  function toggleDropdown(name: string) {
    setActiveDropdown((prev) => (prev === name ? null : name));
  }

  function renderDropdown(label: string, items: NavDropdownItem[]) {
    if (!items || items.length === 0) return null;
    const isOpen = activeDropdown === label;

    return (
      <div className="relative">
        <button
          onClick={() => toggleDropdown(label)}
          onMouseEnter={() => setActiveDropdown(label)}
          className="flex items-center gap-1 text-sm font-medium text-text-secondary transition-colors hover:text-brand-dark"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {label}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <div
            className="glass absolute left-0 top-full z-50 mt-2 min-w-[220px] rounded-xl p-2 shadow-lg"
            onMouseLeave={() => setActiveDropdown(null)}
          >
            {items.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                onClick={() => { setActiveDropdown(null); setMobileOpen(false); }}
                className={cn(
                  "block rounded-lg px-4 py-2.5 text-sm transition-colors",
                  item.highlighted
                    ? "font-semibold text-brand-dark hover:bg-brand-light/10"
                    : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  function renderStaticLinks(links: NavLink[]) {
    return links.map((link) => (
      <Link
        key={link.url}
        href={link.url}
        onClick={() => setMobileOpen(false)}
        className="text-sm font-medium text-text-secondary transition-colors hover:text-brand-dark"
      >
        {link.label}
      </Link>
    ));
  }

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 z-50 w-full border-b border-glass-border bg-bg-primary/80 backdrop-blur-md",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="relative flex shrink-0 items-center" aria-label="Growveloper home">
          <Image
            src={logoSrc}
            alt="Growveloper"
            width={160}
            height={32}
            priority
            className="h-8 w-auto min-h-[24px]"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {renderDropdown("Services", data.serviceLinks)}
          {renderDropdown("Industries", data.industryLinks)}
          {renderStaticLinks(data.staticLinks)}
          <ThemeToggle />
          <Link
            href={data.ctaUrl}
            className="rounded-full bg-brand-dark px-5 py-2 text-sm font-semibold text-base-white transition-all hover:bg-brand-mid hover:scale-105"
          >
            {data.ctaLabel}
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-primary"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-glass-border bg-bg-primary px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {/* Services dropdown - mobile */}
            {data.serviceLinks.length > 0 && (
              <div>
                <button
                  onClick={() => toggleDropdown("Services-mobile")}
                  className="flex min-h-[44px] w-full items-center justify-between text-base font-medium text-text-secondary"
                  aria-expanded={activeDropdown === "Services-mobile"}
                >
                  Services
                  <ChevronDown className={cn("h-4 w-4 transition-transform", activeDropdown === "Services-mobile" && "rotate-180")} />
                </button>
                {activeDropdown === "Services-mobile" && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {data.serviceLinks.map((item) => (
                      <Link
                        key={item.url}
                        href={item.url}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "min-h-[44px] flex items-center rounded-lg px-3 py-2 text-sm",
                          item.highlighted
                            ? "font-semibold text-brand-dark"
                            : "text-text-secondary"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Industries dropdown - mobile */}
            {data.industryLinks.length > 0 && (
              <div>
                <button
                  onClick={() => toggleDropdown("Industries-mobile")}
                  className="flex min-h-[44px] w-full items-center justify-between text-base font-medium text-text-secondary"
                  aria-expanded={activeDropdown === "Industries-mobile"}
                >
                  Industries
                  <ChevronDown className={cn("h-4 w-4 transition-transform", activeDropdown === "Industries-mobile" && "rotate-180")} />
                </button>
                {activeDropdown === "Industries-mobile" && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {data.industryLinks.map((item) => (
                      <Link
                        key={item.url}
                        href={item.url}
                        onClick={() => setMobileOpen(false)}
                        className="min-h-[44px] flex items-center rounded-lg px-3 py-2 text-sm text-text-secondary"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Static links - mobile */}
            {data.staticLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                onClick={() => setMobileOpen(false)}
                className="min-h-[44px] flex items-center text-base font-medium text-text-secondary"
              >
                {link.label}
              </Link>
            ))}

            {/* CTA - mobile */}
            <Link
              href={data.ctaUrl}
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-full bg-brand-dark px-5 py-2.5 text-center text-sm font-semibold text-base-white transition-all hover:bg-brand-mid"
            >
              {data.ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
