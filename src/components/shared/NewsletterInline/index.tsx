"use client";

/* A one-line newsletter sign-up for places the full NewsletterCapture section is too big: under the Lab's
   featured piece and after an article's TL;DR. Same /api/newsletter call and tracking as NewsletterCapture. */

import React, { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackFormComplete, trackNewsletterSignup } from "@/lib/analytics";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

interface NewsletterInlineProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Where the form sits, kept on the element for analytics and testing. */
  source: "lab-top" | "article";
}

export function NewsletterInline({ source, className, ...props }: NewsletterInlineProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const emailId = useId();
  const errorId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      trackFormComplete();
      trackNewsletterSignup();
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const fieldError = errors.email?.message;

  return (
    <div
      data-newsletter-source={source}
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-glass-border bg-glass-bg p-5 backdrop-blur-md md:flex-row md:items-center md:justify-between md:gap-8 md:p-6",
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        <p className="heading-font text-base font-bold text-text-primary md:text-lg">
          One practical growth fix each week.
        </p>
        <p className="text-sm text-text-secondary">The Nothing After Six newsletter. Unsubscribe any time.</p>
      </div>

      {/* Always present so screen readers announce the success message when it appears. */}
      <div role="status" aria-live="polite" className={status === "success" ? undefined : "sr-only"}>
        {status === "success" && (
          <p className="flex items-center gap-2 text-sm font-medium text-text-primary">
            <Check className="h-4 w-4 text-brand-mid" aria-hidden />
            You&apos;re in. The next fix lands in your inbox.
          </p>
        )}
      </div>

      {status !== "success" && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full min-w-0 md:max-w-md">
          <div className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor={emailId} className="sr-only">
              Email address
            </label>
            <input
              id={emailId}
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              aria-invalid={Boolean(fieldError) || status === "error"}
              aria-describedby={fieldError || status === "error" ? errorId : undefined}
              className="min-w-0 flex-1 rounded-full border border-glass-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-brand-mid focus:outline-none"
              {...register("email")}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-dark px-5 py-2.5 text-sm font-semibold text-base-white transition-colors hover:bg-brand-mid disabled:opacity-70"
            >
              {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              Count me in
            </button>
          </div>
          {(fieldError || status === "error") && (
            <p id={errorId} className="mt-2 text-xs text-red-500" role="alert">
              {fieldError || errorMessage}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
