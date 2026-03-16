"use client";

import { cn } from "@/lib/utils";

interface NewsletterCaptureProps extends React.ComponentPropsWithoutRef<"section"> {
  headline: string | null;
  subCopy: string | null;
}

export function NewsletterCapture({ headline, subCopy, className, ...props }: NewsletterCaptureProps) {
  if (!headline) return null;

  return (
    <section
      className={cn("bg-bg-tertiary py-16 md:py-20", className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="mb-3 text-2xl font-bold text-text-primary md:text-3xl">{headline}</h2>
        {subCopy && <p className="mb-8 text-text-secondary">{subCopy}</p>}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="your@email.com"
            className="min-h-[44px] flex-1 rounded-full border border-glass-border bg-bg-secondary px-5 py-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-mid"
            required
          />
          <button
            type="submit"
            className="min-h-[44px] rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-base-white transition-all hover:bg-brand-mid hover:scale-105"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
