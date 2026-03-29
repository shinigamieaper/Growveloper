"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import type { NavigationData } from "@/lib/types";
import {
  Navbar,
  NavBody,
  NavbarLogo,
  NavDropdown,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  MobileAccordion,
} from "@/components/ui/resizable-navbar";
import { MovingBorderButton } from "@/components/ui/moving-border";

interface NavigationProps extends React.ComponentPropsWithoutRef<"div"> {
  data: NavigationData | null;
}

export function Navigation({ data, className, ...props }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setThemeState] = useState<string>("dark");

  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") ?? "dark";
    setThemeState(current);
    const observer = new MutationObserver(() => {
      setThemeState(
        document.documentElement.getAttribute("data-theme") ?? "dark",
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  if (!data) return null;

  const logoSrc =
    theme === "dark"
      ? "/images/logo/logo-wordmark-dark.png"
      : "/images/logo/logo-wordmark-light.png";

  return (
    <div className={cn("relative w-full", className)} {...props}>
      <Navbar>
        {/* ─── Desktop ─── */}
        <NavBody>
          {/* Logo — slides in from left edge of the pill on scroll */}
          <NavbarLogo
            darkSrc="/images/logo/logo-wordmark-dark.png"
            lightSrc="/images/logo/logo-wordmark-light.png"
          />

          {/* Nav links — always visible, flow naturally in the pill */}
          <NavDropdown label="Services" items={data.serviceLinks} />
          <NavDropdown label="Industries" items={data.industryLinks} />
          {data.staticLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              className="whitespace-nowrap px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:text-brand-mid"
            >
              {link.label}
            </a>
          ))}

          {/* CTA + neon bulb on the right */}
          <div className="flex shrink-0 items-center gap-3 pl-2">
            <MovingBorderButton
              as="a"
              href={data.ctaUrl}
              duration={3000}
            >
              {data.ctaLabel}
            </MovingBorderButton>
            <ThemeToggle />
          </div>
        </NavBody>

        {/* ─── Mobile ─── */}
        <MobileNav>
          <MobileNavHeader>
            {/* Mobile logo — always visible */}
            <a
              href="/"
              className="relative z-20 flex items-center"
              aria-label="Growveloper home"
            >
              <Image
                src={logoSrc}
                alt="GRWVLP"
                width={120}
                height={28}
                priority
                className="h-7 w-auto min-h-[24px]"
              />
            </a>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {/* Drawer close button */}
            <div className="mb-4 flex items-center justify-between">
              <a href="/" aria-label="Growveloper home">
                <Image
                  src={logoSrc}
                  alt="GRWVLP"
                  width={100}
                  height={24}
                  className="h-6 w-auto"
                />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-primary"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto">
              <MobileAccordion
                label="Services"
                items={data.serviceLinks}
                onItemClick={() => setIsMobileMenuOpen(false)}
              />
              <MobileAccordion
                label="Industries"
                items={data.industryLinks}
                onItemClick={() => setIsMobileMenuOpen(false)}
              />

              {data.staticLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex min-h-[44px] items-center border-b border-glass-border py-3 text-base font-medium text-text-primary transition-colors hover:text-brand-mid"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA pinned at bottom */}
            <div className="flex shrink-0 justify-center pt-6">
              <MovingBorderButton
                as="a"
                href={data.ctaUrl}
                duration={3000}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {data.ctaLabel}
              </MovingBorderButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
