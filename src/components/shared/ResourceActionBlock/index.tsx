"use client";

import React, { useState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Reduced motion helper ─── */
function usePrefersReduced(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ════════════════════════════════════════════════════════════
   FreeResourceBlock
   ════════════════════════════════════════════════════════════ */

interface FreeResourceBlockProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Resource slug; the server looks the file up and emails it, so the file link never reaches the browser */
  resourceSlug: string;
  /** Optional headline override */
  headline?: string;
  /** Optional sub-copy override */
  subCopy?: string;
}

const freeResourceSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  newsletterOptIn: z.boolean().default(false),
  trap: z.string().optional(),
});
type FreeResourceFormData = z.input<typeof freeResourceSchema>;

export function FreeResourceBlock({
  resourceSlug,
  headline = "This is free. Drop your email and it’s yours.",
  subCopy,
  className,
  ...props
}: FreeResourceBlockProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const reduced = usePrefersReduced();
  // The block can appear twice on a resource page (hero and bottom), so each copy needs its own input id.
  const emailId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FreeResourceFormData>({
    resolver: zodResolver(freeResourceSchema),
    defaultValues: { newsletterOptIn: false, trap: "" },
  });

  const onSubmit = async (data: FreeResourceFormData) => {
    setStatus("loading");

    try {
      const res = await fetch("/api/resource-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          slug: resourceSlug,
          newsletterOptIn: data.newsletterOptIn === true,
          trap: data.trap ?? "",
        }),
      });

      if (!res.ok) throw new Error("send failed");

      setStatus("success");
      reset();
      // Only a ticked box counts as a newsletter sign-up.
      if (data.newsletterOptIn === true) {
        localStorage.setItem("growveloper-newsletter-subscribed", "true");
        window.dispatchEvent(new CustomEvent("newsletter:subscribed"));
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-glass-border bg-bg-secondary p-6 md:p-8",
        className,
      )}
      {...props}
    >
      <h3 className="heading-font mb-2 text-lg font-bold text-text-primary">
        {headline}
      </h3>
      {subCopy && (
        <p className="mb-6 text-sm text-text-secondary">{subCopy}</p>
      )}

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-brand-mid">
              <Check className="h-5 w-5" strokeWidth={2.5} />
              <span className="text-sm font-semibold">Check your inbox. The file is on its way.</span>
            </div>
            <p className="text-sm text-text-secondary">
              Not there in two minutes? Check your Promotions tab, and drag it to your main inbox so the next one lands there.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="flex-1">
                <label htmlFor={emailId} className="sr-only">
                  Email address
                </label>
                <input
                  id={emailId}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  disabled={status === "loading"}
                  className={cn(
                    "min-h-[44px] w-full rounded-full border bg-bg-primary px-5 py-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-mid",
                    errors.email ? "border-red-500" : "border-glass-border",
                  )}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="min-h-[44px] rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-base-white transition-all hover:bg-brand-mid hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "loading" ? (
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                ) : (
                  "Email it to me"
                )}
              </button>
            </div>
            {/* Spam trap: people never see or fill this field. */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
              {...register("trap")}
            />
            <label className="flex cursor-pointer items-start gap-3 text-sm text-text-secondary">
              {/* Styled to match the form: same rounded corners and teal as the email field and button. */}
              <span className="relative mt-0.5 flex h-[18px] w-[18px] shrink-0">
                <input
                  type="checkbox"
                  className="peer h-full w-full cursor-pointer appearance-none rounded-[5px] border border-glass-border bg-bg-secondary transition-colors checked:border-brand-mid checked:bg-brand-mid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-mid"
                  {...register("newsletterOptIn")}
                />
                <Check
                  className="pointer-events-none absolute inset-0 m-auto h-3 w-3 text-base-white opacity-0 transition-opacity peer-checked:opacity-100"
                  strokeWidth={3.5}
                  aria-hidden
                />
              </span>
              <span>
                Also send me one practical growth fix each week (the Nothing After Six newsletter). I can unsubscribe at any time.
              </span>
            </label>
            <p className="text-xs text-text-tertiary">
              We will email the file to this address. <a href="/privacy" className="underline">Privacy policy</a>.
            </p>
            {status === "error" && (
              <p className="text-xs text-red-500">
                We could not send the email. Try again, or write to hello@growveloper.com.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PaidResourceBlock
   ════════════════════════════════════════════════════════════ */

const CURRENCIES = [
  { key: "USD" as const, symbol: "$", label: "USD" },
  { key: "GBP" as const, symbol: "£", label: "GBP" },
  { key: "NGN" as const, symbol: "₦", label: "NGN" },
];
type Currency = (typeof CURRENCIES)[number]["key"];

interface PaidResourceBlockProps extends React.ComponentPropsWithoutRef<"div"> {
  resourceSlug: string;
  resourceTitle: string;
  priceUSD?: number;
  priceGBP?: number;
  priceNGN?: number;
}

export function PaidResourceBlock({
  resourceSlug,
  resourceTitle,
  priceUSD,
  priceGBP,
  priceNGN,
  className,
  ...props
}: PaidResourceBlockProps) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  // Appears twice on a resource page (hero and bottom), so each copy needs its own input id.
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const reduced = usePrefersReduced();

  const prices: Record<Currency, number | undefined> = {
    USD: priceUSD,
    GBP: priceGBP,
    NGN: priceNGN,
  };
  const symbols: Record<Currency, string> = { USD: "$", GBP: "£", NGN: "₦" };
  const activePrice = prices[currency];

  if (!priceUSD && !priceGBP && !priceNGN) return null;

  const handleBuy = async () => {
    setEmailError("");
    if (!email || !email.includes("@")) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (activePrice == null) {
      setErrorMessage("Price not available for this currency");
      return;
    }
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/flutterwave/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceSlug,
          resourceTitle,
          currency,
          amount: activePrice,
          email,
        }),
      });

      const json = await res.json().catch(() => ({})) as { url?: string; error?: string };

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
    <div
      className={cn(
        "rounded-2xl border border-glass-border bg-bg-secondary p-6 md:p-8",
        className,
      )}
      {...props}
    >
      {/* Currency selector */}
      <div className="mb-5 flex gap-1.5">
        {CURRENCIES.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setCurrency(key)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
              currency === key
                ? "bg-brand-dark text-base-white"
                : "bg-bg-tertiary text-text-secondary hover:text-text-primary",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Price display */}
      <div className="mb-6">
        {activePrice != null ? (
          <>
            <span className="heading-font text-3xl font-bold text-text-primary">
              {symbols[currency]}{activePrice.toLocaleString()}
            </span>
            <span className="ml-1 text-sm text-text-tertiary">one-time</span>
          </>
        ) : (
          <span className="text-sm text-text-tertiary">
            Price not set for {currency}
          </span>
        )}
      </div>

      {/* Email + buy */}
      <AnimatePresence mode="wait">
        <motion.div
          key="buy-form"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-start"
        >
          <div className="flex-1">
            <label htmlFor={emailId} className="sr-only">
              Email address
            </label>
            <input
              id={emailId}
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
            />
            {emailError && (
              <p className="mt-1.5 text-xs text-red-500">{emailError}</p>
            )}
            {status === "error" && errorMessage && (
              <p className="mt-1.5 text-xs text-red-500">{errorMessage}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleBuy}
            disabled={status === "loading" || activePrice == null}
            className="min-h-[44px] rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-base-white transition-all hover:bg-brand-mid hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
          >
            {status === "loading" ? (
              <Loader2 className="mx-auto h-5 w-5 animate-spin" />
            ) : (
              "Buy Now"
            )}
          </button>
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 text-xs text-text-tertiary">
        Secure checkout via Flutterwave. You&apos;ll receive a confirmation email after payment.
      </p>
    </div>
  );
}
