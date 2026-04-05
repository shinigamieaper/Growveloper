"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn, fluidGrid } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { MagneticElement } from "@/components/animations/MagneticElement";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { trackCTAClick } from "@/lib/analytics";
import type { AuditPricingData } from "@/lib/types";

/* ── Price parsing ── */
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

/* ── Component ── */
interface AuditPricingProps extends React.ComponentPropsWithoutRef<"section"> {
  data: AuditPricingData | null;
}

export function AuditPricing({ data, className, ...props }: AuditPricingProps) {
  const [activeTier, setActiveTier] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!data || data.tiers.length === 0) return null;

  const handleCheckout = async (tierName: string, priceStr: string) => {
    setEmailError("");
    setErrorMessage("");

    if (!email || !email.includes("@")) {
      setEmailError("Please enter a valid email address");
      return;
    }

    const parsed = parsePrice(priceStr);
    if (!parsed) return;

    setStatus("loading");
    trackCTAClick("audit", tierName, "/api/flutterwave/checkout");

    try {
      const res = await fetch("/api/flutterwave/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: "audit",
          tierName,
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

      window.location.href = json.url;
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
        />

        <StaggerChildren className={cn(fluidGrid(data.tiers.length, 3), "gap-6 pt-8")}>
          {data.tiers.map((tier) => {
            const isHighlighted = tier.highlighted === true;
            const parsed = parsePrice(tier.price);
            const isCheckoutTier = parsed !== null;
            const isActive = activeTier === tier.name;

            return (
              <SpotlightCard
                key={tier.name}
                spotlightColor="rgba(90, 177, 177, 0.15)"
                className={cn("h-full", isHighlighted && "!overflow-visible")}
              >
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-2xl border p-6 md:p-8",
                    isHighlighted
                      ? "border-brand-mid/40 bg-glass-bg backdrop-blur-md shadow-lg shadow-brand-mid/5 md:-translate-y-4"
                      : "border-glass-border bg-glass-bg backdrop-blur-md",
                  )}
                >
                  {tier.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-mid px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-base-black">
                      {tier.badge}
                    </span>
                  )}

                  <h3 className="heading-font text-lg font-bold text-text-primary">
                    {tier.name}
                  </h3>

                  <div className="mt-3 flex items-baseline gap-1">
                    <span
                      className={cn(
                        "heading-font text-3xl font-bold md:text-4xl",
                        isHighlighted ? "text-brand-mid" : "text-text-primary",
                      )}
                    >
                      {tier.price}
                    </span>
                    {tier.priceSubtext && (
                      <span className="text-sm text-text-tertiary">
                        {tier.priceSubtext}
                      </span>
                    )}
                  </div>

                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            isHighlighted ? "text-brand-mid" : "text-brand-dark",
                          )}
                          strokeWidth={2.5}
                          aria-hidden
                        />
                        <span className="text-sm leading-relaxed text-text-secondary">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <AnimatePresence mode="wait">
                      {isCheckoutTier && isActive ? (
                        /* ── Email capture form ── */
                        <motion.div
                          key="email-form"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex flex-col gap-3 overflow-hidden"
                        >
                          <label htmlFor={`audit-email-${tier.name}`} className="sr-only">
                            Email address
                          </label>
                          <input
                            id={`audit-email-${tier.name}`}
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
                                handleCheckout(tier.name, tier.price);
                              }
                            }}
                          />
                          {emailError && (
                            <p className="text-xs text-red-500">{emailError}</p>
                          )}
                          {status === "error" && errorMessage && (
                            <p className="text-xs text-red-500">{errorMessage}</p>
                          )}
                          <button
                            type="button"
                            onClick={() => handleCheckout(tier.name, tier.price)}
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
                            onClick={() => {
                              setActiveTier(null);
                              setEmailError("");
                              setErrorMessage("");
                              setStatus("idle");
                            }}
                            className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
                          >
                            Cancel
                          </button>
                        </motion.div>
                      ) : (
                        /* ── CTA button ── */
                        <motion.div key="cta-button">
                          <MagneticElement strength={0.3}>
                            {isCheckoutTier ? (
                              <MovingBorderButton
                                as="button"
                                type="button"
                                duration={isHighlighted ? 3000 : 3500}
                                containerClassName="inline-flex w-full"
                                variant={isHighlighted ? "default" : "inverted"}
                                className={isHighlighted ? undefined : "!bg-base-white !text-brand-dark"}
                                onClick={() => {
                                  setActiveTier(tier.name);
                                  setEmailError("");
                                  setErrorMessage("");
                                  setStatus("idle");
                                }}
                              >
                                {tier.ctaLabel}
                              </MovingBorderButton>
                            ) : (
                              <MovingBorderButton
                                as={Link}
                                href={tier.ctaUrl ?? "/contact"}
                                duration={isHighlighted ? 3000 : 3500}
                                containerClassName="inline-flex w-full"
                                variant={isHighlighted ? "default" : "inverted"}
                                className={isHighlighted ? undefined : "!bg-base-white !text-brand-dark"}
                                onClick={() =>
                                  trackCTAClick("audit", tier.ctaLabel, tier.ctaUrl ?? "/contact")
                                }
                              >
                                {tier.ctaLabel}
                              </MovingBorderButton>
                            )}
                          </MagneticElement>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
