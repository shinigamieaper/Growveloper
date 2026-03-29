"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { FooterData } from "@/lib/types";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";

interface FooterProps extends React.ComponentPropsWithoutRef<"footer"> {
  data: FooterData | null;
}

const SOCIAL_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  x: "X",
  youtube: "YouTube",
  tiktok: "TikTok",
};

export function Footer({ data, className, ...props }: FooterProps) {
  const [theme, setThemeState] = useState<string>("dark");

  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") ?? "dark";
    setThemeState(current);

    const observer = new MutationObserver(() => {
      const t =
        document.documentElement.getAttribute("data-theme") ?? "dark";
      setThemeState(t);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  if (!data) return null;

  const iconSrc =
    theme === "dark"
      ? "/images/logo/logo-icon-dark.png"
      : "/images/logo/logo-icon-light.png";
  const fogWordmarkSrc =
    theme === "dark"
      ? "/images/logo/logo-wordmark-dark.png"
      : "/images/logo/logo-wordmark-light.png";

  const fogOverlayGradient =
    theme === "dark"
      ? "linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.12) 60%, rgba(10,10,10,0.85) 100%)"
      : "linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.12) 60%, rgba(255,255,255,0.9) 100%)";

  const fogOverlayRadial =
    theme === "dark"
      ? "radial-gradient(80% 70% at 50% 60%, rgba(10,10,10,0) 0%, rgba(10,10,10,0.35) 78%, rgba(10,10,10,0.5) 100%)"
      : "radial-gradient(80% 70% at 50% 60%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 78%, rgba(255,255,255,0.52) 100%)";

  return (
    <footer
      className={cn(
        "relative overflow-hidden border-t border-glass-border bg-bg-secondary",
        className,
      )}
      {...props}
    >
      {/* ─── Main content ─── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-16 md:pb-20">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Left column: icon logo + copyright */}
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="Growveloper home">
              <Image
                src={iconSrc}
                alt="Growveloper"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </Link>
            {data.copyrightText && (
              <p className="text-sm text-text-tertiary">
                {data.copyrightText}
              </p>
            )}
          </div>

          {/* Right columns: Nav, Socials, Legal */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-16">
            {/* Pages / Navigation */}
            {data.navLinks.length > 0 && (
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
                  Pages
                </h3>
                <ul className="flex flex-col gap-3">
                  {data.navLinks.map((link) => (
                    <li key={link.url}>
                      <Link
                        href={link.url}
                        className="text-sm text-text-primary transition-colors hover:text-brand-mid"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Socials */}
            {data.socialLinks.length > 0 && (
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
                  Socials
                </h3>
                <ul className="flex flex-col gap-3">
                  {data.socialLinks.map((link) => (
                    <li key={link.platform}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-primary transition-colors hover:text-brand-mid"
                      >
                        {SOCIAL_LABELS[link.platform] ?? link.platform}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Legal */}
            {data.legalLinks.length > 0 && (
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
                  Legal
                </h3>
                <ul className="flex flex-col gap-3">
                  {data.legalLinks.map((link) => (
                    <li key={link.url}>
                      <Link
                        href={link.url}
                        className="text-sm text-text-primary transition-colors hover:text-brand-mid"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        {data.ctaLabel && data.ctaUrl && (
          <div className="mt-12 flex justify-start">
            <MovingBorderButton
              as="a"
              href={data.ctaUrl}
              duration={3000}
              containerClassName="inline-flex"
            >
              {data.ctaLabel}
            </MovingBorderButton>
          </div>
        )}
      </div>

      {/* ─── Fog wordmark logo ─── */}
      <ScrollFadeUp y={20} start="top 95%" delay={0.1}>
      <div
        className="pointer-events-none relative z-0 flex items-center justify-center overflow-hidden"
        style={{
          height: "clamp(180px, 28vw, 400px)",
          marginTop: "-2rem",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.8) 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.8) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <Image
          src={fogWordmarkSrc}
          alt=""
          width={1400}
          height={300}
          className="relative z-0 w-full max-w-[1400px] object-contain opacity-[0.17] blur-[0.5px] saturate-[0.95] contrast-[0.9]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background: fogOverlayGradient,
          }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background: fogOverlayRadial,
          }}
        />
      </div>
      </ScrollFadeUp>
    </footer>
  );
}
