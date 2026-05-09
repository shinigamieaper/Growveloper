"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { LampContainer } from "@/components/ui/lamp";
import { CanvasText } from "@/components/ui/canvas-text";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { MagneticElement } from "@/components/animations/MagneticElement";
import { ScrollCue } from "@/components/shared/ScrollCue";
import { trackCTAClick } from "@/lib/analytics";
import { usePathname, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const promoCode = searchParams.get("promo");
  const PROMO_DISCOUNT = promoCode === "welcome50" ? 50 : 0;
  const reduced = useReducedMotion();
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
    heroValueLine,
    heroFeatures,
    subStatement,
    primaryCtaLabel,
    primaryCtaUrl,
    secondaryCtaText,
    secondaryCtaUrl,
  } = data;

  const parsed = parsePrice(price);
  const isCheckoutEnabled = parsed !== null;
  const displayPrice = parsed && PROMO_DISCOUNT > 0
    ? `${price.trim().charAt(0)}${parsed.amount - PROMO_DISCOUNT}`
    : price;

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
          amount: parsed.amount - PROMO_DISCOUNT,
          email,
          meta: { tier_name: "Growth Audit", product_type: "audit", promo_code: promoCode || undefined },
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
      <LampContainer className="[@media(orientation:landscape)_and_(max-height:600px)]:overflow-visible">
        <motion.div
          initial={{ opacity: 0.5, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="flex max-w-4xl flex-col items-center gap-4 sm:gap-6"
        >
          <h1 className="heading-font text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl [@media(orientation:landscape)_and_(max-height:600px)]:text-3xl">
            {renderHeadline()}
          </h1>
          <p className="max-w-lg text-center text-base text-text-secondary md:text-lg [@media(orientation:landscape)_and_(max-height:600px)]:hidden">
            {subStatement}
          </p>
        </motion.div>
      </LampContainer>

      {/* Price card — outside LampContainer, pulled up into glow. No scroll trigger — must be visible on load. */}
      <div className="relative z-60 mx-auto -mt-44 flex max-w-xl flex-col items-center gap-6 px-6 pb-4 [@media(orientation:landscape)_and_(max-height:600px)]:-mt-16 [@media(orientation:landscape)_and_(max-height:600px)]:px-4">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16, scale: 0.985 }}
            animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={
              reduced
                ? undefined
                : { type: "spring", stiffness: 110, damping: 18, mass: 0.9, delay: 0.55 }
            }
            className="w-full rounded-2xl border border-glass-border bg-glass-bg px-6 py-7 backdrop-blur-md sm:px-10 sm:py-8"
          >

            {/* Asymmetric header: kicker + price LEFT, value line RIGHT (sm+); stacked on mobile */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              {/* LEFT block — kicker + price (left-aligned on sm+) */}
              <div className="flex flex-col items-start">
                {priceLabel && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-mid">
                    {priceLabel}
                  </p>
                )}
                <div className={cn("flex items-baseline gap-3", priceLabel ? "mt-1.5" : undefined)}>
                  <span className="heading-font text-4xl font-black leading-none text-brand-mid sm:text-5xl">
                    {displayPrice}
                  </span>
                  {PROMO_DISCOUNT > 0 && (
                    <span className="text-lg text-text-tertiary line-through">{price}</span>
                  )}
                </div>
                {heroPriceNote && (
                  <p className="mt-2 text-xs text-text-tertiary">{heroPriceNote}</p>
                )}
                {PROMO_DISCOUNT > 0 && parsed && (
                  <p className="mt-1 text-xs font-semibold text-brand-mid">
                    {price.trim().charAt(0)}{PROMO_DISCOUNT} off applied
                  </p>
                )}
              </div>

              {/* RIGHT block — value line carries the weight (right-aligned on sm+) */}
              {heroValueLine && (
                <p className="heading-font max-w-xs text-left text-base font-semibold leading-snug text-text-primary sm:text-right sm:text-lg">
                  {heroValueLine}
                </p>
              )}
            </div>

            {/* Deliverables block — visible at all viewports, with hairline label + brand-mid left stripe */}
            {heroFeatures && heroFeatures.length > 0 && (
              <div className="mt-6 border-l-2 border-brand-mid pl-4 sm:mt-7 sm:pl-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-mid sm:text-[11px]">
                  What you get
                </p>
                <motion.ul
                  initial={reduced ? false : "hidden"}
                  animate={reduced ? undefined : "visible"}
                  variants={
                    reduced
                      ? undefined
                      : {
                          hidden: {},
                          visible: {
                            transition: { delayChildren: 0.85, staggerChildren: 0.07 },
                          },
                        }
                  }
                  className="mt-3 flex flex-col gap-2 sm:mt-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2"
                >
                  {heroFeatures.map((feature, index) => (
                    <motion.li
                      key={`${feature}-${index}`}
                      variants={
                        reduced
                          ? undefined
                          : {
                              hidden: { opacity: 0, y: 6 },
                              visible: {
                                opacity: 1,
                                y: 0,
                                transition: { type: "spring", stiffness: 220, damping: 24 },
                              },
                            }
                      }
                      className="flex items-start gap-2"
                    >
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-mid sm:mt-1 sm:h-3 sm:w-3"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      <span className="text-sm leading-snug text-text-secondary sm:text-[11px]">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            )}

            {/* Tagline — demoted to small support copy */}
            {heroCardTagline && (
              <p className="mt-5 text-xs text-text-tertiary sm:mt-6">
                {heroCardTagline}
              </p>
            )}

            {/* CTA / Email capture */}
            <div className="mt-5 sm:mt-6" />
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
                  <p className="text-center text-xs text-text-tertiary">
                    By submitting, you agree to our{" "}
                    <Link href="/privacy" className="text-brand-mid underline-offset-4 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
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
          </motion.div>
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
          {/* Desktop: absolute bottom-right — hidden on landscape to avoid overlapping price card */}
          <div className="absolute bottom-8 right-12 z-60 hidden md:block [@media(orientation:landscape)_and_(max-height:600px)]:hidden">
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
