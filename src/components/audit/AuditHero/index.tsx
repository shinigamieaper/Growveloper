"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { LampContainer } from "@/components/ui/lamp";
import { CanvasText } from "@/components/ui/canvas-text";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { MagneticElement } from "@/components/animations/MagneticElement";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import { ScrollCue } from "@/components/shared/ScrollCue";
import { trackCTAClick } from "@/lib/analytics";
import { usePathname } from "next/navigation";
import type { AuditHeroData } from "@/lib/types";

/* ── Price parsing (mirrors AuditPricing) ── */
const CURRENCY_MAP: Record<string, "USD" | "GBP" | "NGN"> = {
  $: "USD",
  "\u00a3": "GBP",
  "\u20a6": "NGN",
};

function parsePrice(priceStr: string): { amount: number; currency: "USD" | "GBP" | "NGN" } | null {
  const firstChar = priceStr.trim().charAt(0);
  const currency = CURRENCY_MAP[firstChar];
  if (!currency) return null;
  const numeric = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  if (isNaN(numeric) || numeric <= 0) return null;
  return { amount: numeric, currency };
}

interface AuditHeroProps extends React.ComponentPropsWithoutRef<"section"> {
  data: AuditHeroData | null;
  scrollCueTargetId?: string;
}

export function AuditHero({ data, scrollCueTargetId, className, ...props }: AuditHeroProps) {
  const pathname = usePathname();
  const [isCheckoutActive, setIsCheckoutActive] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!data) return null;

  const {
    headline,
    highlightedWord,
    price,
    priceLabel,
    heroPriceNote,
    heroCardTagline,
    heroFeatures,
    subStatement,
    primaryCtaLabel,
    primaryCtaUrl,
    secondaryCtaText,
    secondaryCtaUrl,
  } = data;

  const parsed = parsePrice(price);
  const isCheckoutEnabled = parsed !== null;

  const renderHeadline = () => {
    if (!highlightedWord || !headline.includes(highlightedWord)) {
      return headline;
    }
    const parts = headline.split(highlightedWord);
    return (
      <>
        {parts[0]}
        <CanvasText text={highlightedWord} />
        {parts[1]}
      </>
    );
  };

  const handleCheckout = async () => {
    setEmailError("");
    setErrorMessage("");

    if (!email || !email.includes("@")) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!parsed) return;

    setStatus("loading");
    trackCTAClick(pathname, primaryCtaLabel, "/api/flutterwave/checkout");

    try {
      const res = await fetch("/api/flutterwave/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: "audit",
          tierName: "Growth Audit",
          currency: parsed.currency,
          amount: parsed.amount,
          email,
        }),
      });

      const json = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };

      if (!res.ok || !json.url) {
        throw new Error(json.error ?? "Checkout failed");
      }

      setStatus("idle");
      window.location.href = json.url;
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const activateCheckout = () => {
    setIsCheckoutActive(true);
    setEmail("");
    setEmailError("");
    setErrorMessage("");
    setStatus("idle");
  };

  const cancelCheckout = () => {
    setIsCheckoutActive(false);
    setEmailError("");
    setErrorMessage("");
    setStatus("idle");
  };

  return (
    <section className={cn("relative", className)} {...props}>
      <LampContainer>
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="flex max-w-4xl flex-col items-center gap-6"
        >
          <h1 className="heading-font text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            {renderHeadline()}
          </h1>
          <p className="max-w-lg text-center text-base text-text-secondary md:text-lg">
            {subStatement}
          </p>
        </motion.div>
      </LampContainer>

      {/* Price card — outside LampContainer, pulled up into glow */}
      <div className="relative z-60 mx-auto -mt-32 flex max-w-md flex-col items-center gap-6 px-6 pb-4">
        <ScrollFadeUp delay={0.35}>
          <div className="w-full rounded-2xl border border-glass-border bg-glass-bg p-6 backdrop-blur-md sm:p-8">

            {/* Badge */}
            {priceLabel && (
              <div className="mb-4 flex justify-center">
                <span className="rounded-full bg-brand-dark px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-base-white">
                  {priceLabel}
                </span>
              </div>
            )}

            {/* Price hero */}
            <div className="mb-1 text-center">
              <span className="heading-font text-5xl font-black text-brand-mid sm:text-6xl">
                {price}
              </span>
            </div>
            {heroPriceNote && (
              <p className="mb-4 text-center text-xs text-text-tertiary">{heroPriceNote}</p>
            )}

            {/* Card tagline */}
            {heroCardTagline && (
              <p className="mb-4 text-center text-sm font-semibold text-text-primary">
                {heroCardTagline}
              </p>
            )}

            {/* Divider + 2-col features grid */}
            {heroFeatures && heroFeatures.length > 0 && (
              <>
                <div className="mb-4 border-t border-glass-border" />
                <div className="mb-5 grid grid-cols-2 gap-x-4 gap-y-2">
                  {heroFeatures.map((feature, index) => (
                    <div key={`${feature}-${index}`} className="flex min-w-0 items-start gap-1.5">
                      <Check
                        className="mt-0.5 h-3 w-3 shrink-0 text-brand-mid"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      <span className="text-[11px] leading-snug text-text-secondary">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* CTA / Email capture */}
            <AnimatePresence mode="wait">
              {isCheckoutActive && isCheckoutEnabled ? (
                <motion.div
                  key="email-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col gap-3 overflow-hidden"
                >
                  <label htmlFor="audit-hero-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="audit-hero-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className={cn(
                      "min-h-[44px] w-full rounded-full border bg-bg-primary px-5 py-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-mid",
                      emailError ? "border-red-500" : "border-glass-border",
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        void handleCheckout();
                      }
                    }}
                  />
                  {emailError && <p className="text-xs text-red-500">{emailError}</p>}
                  {status === "error" && errorMessage && (
                    <p className="text-xs text-red-500">{errorMessage}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => void handleCheckout()}
                    disabled={status === "loading"}
                    className="min-h-[44px] rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-base-white transition-all hover:bg-brand-mid hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {status === "loading" ? (
                      <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                    ) : (
                      "Proceed to Payment"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={cancelCheckout}
                    className="text-xs text-text-tertiary transition-colors hover:text-text-secondary"
                  >
                    Cancel
                  </button>
                </motion.div>
              ) : (
                <motion.div key="cta-button" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3">
                  <MagneticElement strength={0.4}>
                    {isCheckoutEnabled ? (
                      <MovingBorderButton
                        as="button"
                        type="button"
                        duration={3000}
                        containerClassName="inline-flex w-full sm:w-auto"
                        onClick={activateCheckout}
                      >
                        {primaryCtaLabel}
                      </MovingBorderButton>
                    ) : (
                      <MovingBorderButton
                        as="a"
                        href={primaryCtaUrl}
                        duration={3000}
                        containerClassName="inline-flex w-full sm:w-auto"
                        onClick={() => trackCTAClick(pathname, primaryCtaLabel, primaryCtaUrl)}
                      >
                        {primaryCtaLabel}
                      </MovingBorderButton>
                    )}
                  </MagneticElement>

                  {secondaryCtaText && secondaryCtaUrl && (
                    <Link
                      href={secondaryCtaUrl}
                      className="inline-flex min-h-[44px] items-center text-sm text-brand-mid transition-colors hover:text-brand-light"
                      onClick={() => trackCTAClick(pathname, secondaryCtaText, secondaryCtaUrl)}
                    >
                      {secondaryCtaText}
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollFadeUp>
      </div>

      {scrollCueTargetId && (
        <>
          {/* Mobile: in flow below price card */}
          <div className="relative z-60 flex justify-center pb-10 md:hidden">
            <ScrollCue
              text={data.scrollCueText ?? "VIEW OUR WORK · VIEW OUR WORK · "}
              targetId={scrollCueTargetId}
              className="py-0"
            />
          </div>
          {/* Desktop: absolute bottom-right */}
          <div className="absolute bottom-8 right-12 z-60 hidden md:block">
            <ScrollCue
              text={data.scrollCueText ?? "VIEW OUR WORK · VIEW OUR WORK · "}
              targetId={scrollCueTargetId}
              className="py-0"
            />
          </div>
        </>
      )}
    </section>
  );
}
