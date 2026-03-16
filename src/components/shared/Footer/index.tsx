"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { FooterData } from "@/lib/types";

interface FooterProps extends React.ComponentPropsWithoutRef<"footer"> {
  data: FooterData | null;
}

const SOCIAL_ICONS: Record<string, string> = {
  linkedin: "LinkedIn",
  x: "X",
  youtube: "YouTube",
  tiktok: "TikTok",
};

export function Footer({ data, className, ...props }: FooterProps) {
  const [theme, setThemeState] = useState<string>("dark");

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

  if (!data) return null;

  const logoSrc = theme === "dark"
    ? "/images/logo/logo-wordmark-dark.png"
    : "/images/logo/logo-wordmark-light.png";

  return (
    <footer
      className={cn("border-t border-glass-border bg-bg-secondary py-16", className)}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Logo + CTA */}
          <div className="md:col-span-1">
            <Link href="/" aria-label="Growveloper home">
              <Image
                src={logoSrc}
                alt="Growveloper"
                width={140}
                height={28}
                className="h-7 w-auto min-h-[24px]"
              />
            </Link>
            {data.ctaLabel && data.ctaUrl && (
              <Link
                href={data.ctaUrl}
                className="mt-6 inline-flex min-h-[44px] items-center rounded-full bg-brand-dark px-5 py-2.5 text-sm font-semibold text-base-white transition-all hover:bg-brand-mid hover:scale-105"
              >
                {data.ctaLabel}
              </Link>
            )}
          </div>

          {/* Nav links */}
          {data.navLinks.length > 0 && (
            <div className="md:col-span-1">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
                Navigation
              </h3>
              <ul className="flex flex-col gap-3">
                {data.navLinks.map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="text-sm text-text-secondary transition-colors hover:text-brand-mid"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Legal links */}
          {data.legalLinks.length > 0 && (
            <div className="md:col-span-1">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
                Legal
              </h3>
              <ul className="flex flex-col gap-3">
                {data.legalLinks.map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="text-sm text-text-secondary transition-colors hover:text-brand-mid"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social links */}
          {data.socialLinks.length > 0 && (
            <div className="md:col-span-1">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
                Connect
              </h3>
              <ul className="flex flex-col gap-3">
                {data.socialLinks.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-secondary transition-colors hover:text-brand-mid"
                    >
                      {SOCIAL_ICONS[link.platform] ?? link.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Copyright */}
        {data.copyrightText && (
          <div className="mt-12 border-t border-glass-border pt-8">
            <p className="text-center text-sm text-text-tertiary">
              {data.copyrightText}
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
