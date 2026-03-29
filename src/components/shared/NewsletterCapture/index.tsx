"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Loader2 } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

interface NewsletterCaptureProps extends React.ComponentPropsWithoutRef<"section"> {
  headline: string | null;
  highlightedWord?: string | null;
  subCopy?: string | null;
  ctaLabel?: string | null;
  downloadUnlocks?: boolean;
}

export function NewsletterCapture({
  headline,
  highlightedWord,
  subCopy,
  ctaLabel,
  downloadUnlocks = false,
  className,
  ...props
}: NewsletterCaptureProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  if (!headline) return null;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onSubmit = async (data: FormData) => {
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

      if (downloadUnlocks) {
        window.dispatchEvent(new CustomEvent("newsletter:subscribed"));
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section
      className={cn("py-24", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-glass-border bg-glass-bg p-8 backdrop-blur-md md:p-12">
        <SectionHeader
          headline={headline}
          highlightedWord={highlightedWord}
          description={subCopy}
        />

        <div className="mx-auto max-w-xl">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark/15">
                <Check className="h-6 w-6 text-brand-mid" strokeWidth={2.5} />
              </div>
              <p className="text-lg font-semibold text-text-primary">
                You&apos;re in!
              </p>
              <p className="text-sm text-text-secondary">
                {downloadUnlocks
                  ? "Check your inbox — your download is on the way."
                  : "Check your inbox to confirm your subscription."}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 sm:flex-row sm:items-start"
            >
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  disabled={status === "loading"}
                  className={cn(
                    "min-h-[44px] w-full rounded-full border bg-bg-secondary px-5 py-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-mid",
                    errors.email ? "border-red-500" : "border-glass-border"
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
              <MovingBorderButton
                as="button"
                type="submit"
                disabled={status === "loading"}
                borderRadius="9999px"
                containerClassName="inline-flex"
                className="min-h-[44px] px-6 py-3 text-sm font-semibold disabled:opacity-60"
              >
                {status === "loading" ? (
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                ) : (
                  ctaLabel || "Subscribe"
                )}
              </MovingBorderButton>
            </motion.form>
          )}
        </AnimatePresence>
        </div>
        </div>
      </div>
    </section>
  );
}
