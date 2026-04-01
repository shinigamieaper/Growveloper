"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mx-auto max-w-md">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-glass-border bg-bg-secondary">
            <AlertTriangle className="h-6 w-6 text-text-tertiary" />
          </div>
        </div>

        {/* Copy */}
        <h1 className="heading-font mb-3 text-2xl font-bold text-text-primary">
          Something went wrong
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-text-secondary">
          An unexpected error occurred. If this keeps happening, reach out and we&apos;ll fix it.
          {error.digest && (
            <span className="mt-2 block font-mono text-[10px] text-text-tertiary">
              Error ID: {error.digest}
            </span>
          )}
        </p>

        {/* Actions */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-mid/40 bg-brand-dark/10 px-5 py-2.5 text-sm font-semibold text-brand-mid transition-colors hover:bg-brand-dark/20"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-glass-border bg-bg-secondary px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-brand-mid/40"
          >
            <Home className="h-4 w-4" aria-hidden />
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
