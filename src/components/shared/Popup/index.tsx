"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type PanInfo } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MovingBorderButton } from "@/components/ui/moving-border";
import type { PopupConfig } from "@/lib/types";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const DISMISSAL_KEY = "growveloper-popup-dismissed";
const SUBSCRIBER_KEY = "growveloper-newsletter-subscribed";
const DISMISSAL_DAYS = 7;

interface PopupProps extends React.ComponentPropsWithoutRef<"div"> {
  config: PopupConfig | null;
  /** Controlled open state (for manual triggers like download buttons) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
}

function isDismissed(): boolean {
  if (typeof window === "undefined") return true;
  const raw = localStorage.getItem(DISMISSAL_KEY);
  if (!raw) return false;
  try {
    const ts = JSON.parse(raw) as number;
    const daysSince = (Date.now() - ts) / (1000 * 60 * 60 * 24);
    return daysSince < DISMISSAL_DAYS;
  } catch {
    return false;
  }
}

function setDismissed(): void {
  localStorage.setItem(DISMISSAL_KEY, JSON.stringify(Date.now()));
}

function isSubscriber(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SUBSCRIBER_KEY) === "true";
}

function setSubscriber(): void {
  localStorage.setItem(SUBSCRIBER_KEY, "true");
}

function triggerDownload(url: string): void {
  const link = document.createElement("a");
  link.href = url;
  link.download = "";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return mobile;
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function Popup({ config, open: controlledOpen, onOpenChange, className, ...props }: PopupProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [hasFired, setHasFired] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const lastScrollTime = useRef(Date.now());

  // Use controlled state if provided, otherwise use internal state
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setIsOpen = useCallback((value: boolean) => {
    if (isControlled) {
      onOpenChange?.(value);
    } else {
      setInternalOpen(value);
    }
  }, [isControlled, onOpenChange]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const dismiss = useCallback(() => {
    setIsOpen(false);
    // Only set dismissal for auto-triggered popups, not manual ones
    if (config?.triggerType !== "manual") {
      setDismissed();
    }
  }, [setIsOpen, config?.triggerType]);

  const onNewsletterSubmit = async (data: NewsletterFormData) => {
    setFormStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Something went wrong");
      }

      setFormStatus("success");
      setSubscriber();
      reset();
      window.dispatchEvent(new CustomEvent("newsletter:subscribed"));

      // If this is a download gate, trigger the download
      if (config?.offerType === "download" && config.downloadUrl) {
        setTimeout(() => {
          triggerDownload(config.downloadUrl!);
        }, 500);
      }

      setTimeout(() => {
        dismiss();
      }, 2500);
    } catch (err) {
      setFormStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  /* ─── Trigger logic ─── */
  useEffect(() => {
    if (!config || !config.enabled) return;
    if (hasFired) return;
    // Skip auto-triggers if dismissed, but manual triggers always work
    if (config.triggerType !== "manual" && isDismissed()) return;
    // Manual triggers are handled externally via open prop or imperative call
    if (config.triggerType === "manual") return;

    const { triggerType, triggerValue } = config;
    let cleanup: (() => void) | undefined;

    if (triggerType === "scroll_depth") {
      const onScroll = () => {
        const scrollPercent =
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent >= triggerValue) {
          setIsOpen(true);
          setHasFired(true);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanup = () => window.removeEventListener("scroll", onScroll);
    } else if (triggerType === "time_on_page") {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasFired(true);
      }, triggerValue * 1000);
      cleanup = () => clearTimeout(timer);
    } else if (triggerType === "inactivity") {
      lastScrollTime.current = Date.now();
      const onScroll = () => {
        lastScrollTime.current = Date.now();
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      const interval = setInterval(() => {
        const idleSeconds = (Date.now() - lastScrollTime.current) / 1000;
        if (idleSeconds >= triggerValue) {
          setIsOpen(true);
          setHasFired(true);
        }
      }, 500);

      cleanup = () => {
        window.removeEventListener("scroll", onScroll);
        clearInterval(interval);
      };
    }

    return cleanup;
  }, [config, hasFired]);

  const handleDirectDownload = useCallback(() => {
    if (config?.downloadUrl) {
      triggerDownload(config.downloadUrl);
    }
  }, [config?.downloadUrl]);

  if (!config || !config.enabled) return null;

  const { headline, subCopy, ctaLabel, ctaDestination, offerType, downloadUrl } = config;

  const offerAccentMap: Record<string, string> = {
    newsletter: "border-brand-mid/30",
    lead_magnet: "border-brand-mid/30",
    consultation: "border-brand-light/30",
    audit: "border-brand-dark/50",
    download: "border-brand-mid/30",
  };
  const accentBorder = offerAccentMap[offerType] ?? "border-brand-mid/30";

  /* ─── Swipe handler for mobile bottom sheet ─── */
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100) {
      dismiss();
    }
  };

  /* ─── Modal card content (shared between desktop + mobile) ─── */
  const cardContent = (
    <>
      {/* Close button */}
      <button
        onClick={dismiss}
        aria-label="Close popup"
        className="absolute right-3 top-3 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-text-tertiary transition-colors hover:bg-glass-bg hover:text-text-primary"
      >
        <X className="h-5 w-5" strokeWidth={2} />
      </button>

      {/* Offer type badge */}
      <span className="mb-4 inline-flex rounded-full bg-brand-dark/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-mid">
        {offerType.replace("_", " ")}
      </span>

      {/* Headline */}
      <h2 className="heading-font mb-3 text-2xl font-bold text-text-primary md:text-3xl">
        {headline}
      </h2>

      {/* Sub-copy */}
      {subCopy && (
        <p className="mb-6 text-sm text-text-secondary md:text-base">{subCopy}</p>
      )}

      {/* Newsletter/Download form OR CTA button */}
      {(offerType === "newsletter" || offerType === "download") ? (
        <div className="w-full">
          {formStatus === "success" ? (
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start gap-3"
            >
              <div className="flex items-center gap-2 text-brand-mid">
                <Check className="h-5 w-5" strokeWidth={2} />
                <span className="text-sm font-medium">
                  {offerType === "download" ? "Download starting..." : "You're subscribed!"}
                </span>
              </div>
              {offerType === "download" && downloadUrl && (
                <button
                  onClick={handleDirectDownload}
                  className="text-sm text-brand-mid underline underline-offset-2 hover:text-brand-light"
                >
                  Click here if download doesn&apos;t start
                </button>
              )}
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onNewsletterSubmit)} className="flex w-full flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="popup-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="popup-newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  disabled={formStatus === "loading"}
                  className={cn(
                    "min-h-[44px] w-full rounded-full border bg-bg-secondary px-5 py-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-mid",
                    errors.email ? "border-red-500" : "border-glass-border"
                  )}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
                )}
                {formStatus === "error" && errorMessage && (
                  <p className="mt-1.5 text-xs text-red-500">{errorMessage}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="min-h-[44px] rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-base-white transition-all hover:bg-brand-mid hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
              >
                {formStatus === "loading" ? (
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                ) : (
                  ctaLabel
                )}
              </button>
            </form>
          )}
        </div>
      ) : (
        <MovingBorderButton
          as="a"
          href={ctaDestination}
          duration={3000}
          containerClassName="inline-flex"
          className="px-8 py-3 text-sm font-semibold md:px-10 md:text-base"
        >
          {ctaLabel}
        </MovingBorderButton>
      )}
    </>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={cn("fixed inset-0 z-100", className)}
          {...props}
        >
          {/* Backdrop */}
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={dismiss}
            aria-hidden="true"
          />

          {isMobile ? (
            /* ─── Mobile: Bottom Sheet ─── */
            <motion.div
              initial={reducedMotion ? { y: 0 } : { y: "100%" }}
              animate={{ y: 0 }}
              exit={reducedMotion ? { y: "100%" } : { y: "100%" }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { type: "spring", damping: 30, stiffness: 300 }
              }
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className={cn(
                "absolute inset-x-0 bottom-0 z-10 rounded-t-2xl border-t bg-bg-secondary px-6 pb-8 pt-3",
                accentBorder,
                "shadow-[0_-8px_40px_rgba(90,177,177,0.1)]"
              )}
              role="dialog"
              aria-modal="true"
              aria-label={headline}
            >
              {/* Handle bar */}
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-text-tertiary/40" />
              <div className="flex flex-col items-start">
                {cardContent}
              </div>
            </motion.div>
          ) : (
            /* ─── Desktop: Centered Modal ─── */
            <motion.div
              initial={
                reducedMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95, y: 20 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                reducedMotion
                  ? { opacity: 0, scale: 1 }
                  : { opacity: 0, scale: 0.95, y: 20 }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { type: "spring", damping: 25, stiffness: 250 }
              }
              className={cn(
                "absolute left-1/2 top-1/2 z-10 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-glass-bg p-8 shadow-[0_8px_40px_rgba(90,177,177,0.12)] backdrop-blur-xl",
                accentBorder,
              )}
              role="dialog"
              aria-modal="true"
              aria-label={headline}
            >
              <div className="flex flex-col items-start">
                {cardContent}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
