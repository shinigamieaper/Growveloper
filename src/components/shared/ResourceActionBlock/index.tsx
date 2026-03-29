"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Download, Loader2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Shared schema ─── */
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
type EmailFormData = z.infer<typeof emailSchema>;

/* ─── Reduced motion helper ─── */
function usePrefersReduced(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ════════════════════════════════════════════════════════════
   FreeResourceBlock
   ════════════════════════════════════════════════════════════ */

interface FreeResourceBlockProps extends React.ComponentPropsWithoutRef<"div"> {
  /** URL to the downloadable file from Sanity fileAsset */
  fileUrl: string;
  /** Optional headline override */
  headline?: string;
  /** Optional sub-copy override */
  subCopy?: string;
}

export function FreeResourceBlock({
  fileUrl,
  headline = "This is free. Drop your email and it\u2019s yours.",
  subCopy,
  className,
  ...props
}: FreeResourceBlockProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const reduced = usePrefersReduced();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setStatus("loading");
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

      setStatus("success");
      reset();
      localStorage.setItem("growveloper-newsletter-subscribed", "true");
      window.dispatchEvent(new CustomEvent("newsletter:subscribed"));
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const triggerDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [fileUrl]);

  if (!fileUrl) return null;

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
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 text-brand-mid">
              <Check className="h-5 w-5" strokeWidth={2.5} />
              <span className="text-sm font-semibold">Unlocked!</span>
            </div>
            <button
              onClick={triggerDownload}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-base-white transition-all hover:bg-brand-mid hover:scale-105"
            >
              <Download className="h-4 w-4" />
              Download Now
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 sm:flex-row sm:items-start"
          >
            <div className="flex-1">
              <label htmlFor="free-resource-email" className="sr-only">
                Email address
              </label>
              <input
                id="free-resource-email"
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
              {status === "error" && errorMessage && (
                <p className="mt-1.5 text-xs text-red-500">{errorMessage}</p>
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
                "Get it Free"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PaidResourceBlock
   ════════════════════════════════════════════════════════════ */

interface PaidResourceBlockProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Price in dollars */
  price: number;
  /** Resource title for Stripe line item */
  resourceTitle: string;
  /** Resource slug for redirect URLs */
  slug: string;
}

export function PaidResourceBlock({
  price,
  resourceTitle,
  slug,
  className,
  ...props
}: PaidResourceBlockProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckout = async () => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/stripe/resource-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceTitle, price, slug }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Checkout failed");
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Checkout failed");
    }
  };

  if (!price || !resourceTitle || !slug) return null;

  return (
    <div
      className={cn(
        "rounded-2xl border border-glass-border bg-bg-secondary p-6 md:p-8",
        className,
      )}
      {...props}
    >
      <div className="mb-6">
        <span className="heading-font text-3xl font-bold text-text-primary">
          ${price}
        </span>
        <span className="ml-1 text-sm text-text-tertiary">one-time</span>
      </div>

      <button
        onClick={handleCheckout}
        disabled={status === "loading"}
        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-base-white transition-all hover:bg-brand-mid hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 sm:w-auto"
      >
        {status === "loading" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <ExternalLink className="h-4 w-4" />
            Buy Now
          </>
        )}
      </button>

      {status === "error" && errorMessage && (
        <p className="mt-3 text-xs text-red-500">{errorMessage}</p>
      )}

      <p className="mt-4 text-xs text-text-tertiary">
        Secure checkout via Stripe. You&apos;ll get instant access after payment.
      </p>
    </div>
  );
}
