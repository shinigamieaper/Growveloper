"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { X, Settings2 } from "lucide-react";
import { getConsent, applyConsent, hydrateConsent } from "@/lib/consent";
import type { ConsentState } from "@/lib/types";

interface CookieConsentProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Hide the banner on these pathnames (e.g. /privacy, /terms) */
  hideOnPaths?: string[];
}

export function CookieConsent({ hideOnPaths = [] }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [draft, setDraft] = useState<ConsentState>({ analytics: false, clarity: false });
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Rehydrate returning visitor's saved consent (update gtag + load Clarity)
    hydrateConsent();
    // Don't show if consent already given
    if (getConsent()) return;
    // Don't show on excluded paths
    if (hideOnPaths.includes(window.location.pathname)) return;
    setVisible(true);
  }, [hideOnPaths]);

  const accept = useCallback((state: ConsentState) => {
    applyConsent(state);
    setVisible(false);
  }, []);

  const handleAcceptAll = useCallback(() => {
    accept({ analytics: true, clarity: true });
  }, [accept]);

  const handleNecessaryOnly = useCallback(() => {
    accept({ analytics: false, clarity: false });
  }, [accept]);

  const handleSaveSettings = useCallback(() => {
    accept(draft);
  }, [accept, draft]);

  // Close settings on Escape
  useEffect(() => {
    if (!showSettings) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSettings(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showSettings]);

  // Focus trap within settings panel
  useEffect(() => {
    if (!showSettings || !settingsRef.current) return;
    const focusable = settingsRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length > 0) focusable[0].focus();
  }, [showSettings]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal={showSettings}
      className="fixed inset-x-0 bottom-0 z-9999 p-4 md:p-6"
      style={{ animation: "cookieSlideUp 0.3s ease-out" }}
    >
      <style>{`
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateY(1rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes cookieSlideUp {
            from { opacity: 1; transform: none; }
            to { opacity: 1; transform: none; }
          }
        }
      `}</style>

      <div className="mx-auto max-w-2xl rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-md">
        {/* ── Main banner ── */}
        {!showSettings && (
          <div className="flex flex-col gap-4 p-5 sm:p-6">
            <p className="text-sm leading-relaxed text-text-secondary">
              We use cookies to understand how you use our site and improve your
              experience. Analytics cookies are optional.{" "}
              <Link
                href="/privacy"
                className="text-brand-mid underline-offset-4 transition-colors hover:underline"
              >
                Privacy Policy
              </Link>
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="min-h-11 rounded-full bg-brand-dark px-5 py-2.5 text-sm font-semibold text-base-white transition-colors hover:bg-brand-mid"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={handleNecessaryOnly}
                className="min-h-11 rounded-full border border-glass-border px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-brand-mid hover:text-brand-mid"
              >
                Necessary only
              </button>
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="ml-auto inline-flex min-h-11 items-center gap-1.5 text-sm text-text-tertiary transition-colors hover:text-text-secondary"
                aria-expanded={showSettings}
              >
                <Settings2 className="h-4 w-4" aria-hidden />
                Cookie settings
              </button>
            </div>
          </div>
        )}

        {/* ── Settings panel ── */}
        {showSettings && (
          <div ref={settingsRef} className="flex flex-col gap-5 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="heading-font text-base font-bold text-text-primary">
                Cookie settings
              </h2>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-full text-text-tertiary transition-colors hover:text-text-primary"
                aria-label="Close cookie settings"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Necessary — always on */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-text-primary">Necessary</p>
                <p className="text-xs text-text-tertiary">
                  Required for the website to function. Cannot be disabled.
                </p>
              </div>
              <button
                type="button"
                disabled
                aria-label="Necessary cookies are always enabled"
                className="relative h-6 w-11 shrink-0 cursor-not-allowed rounded-full bg-brand-dark opacity-70"
              >
                <span className="absolute top-0.5 left-[calc(100%-1.375rem)] h-5 w-5 rounded-full bg-base-white transition-transform" />
              </button>
            </div>

            {/* Analytics toggle */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-text-primary">Analytics</p>
                <p className="text-xs text-text-tertiary">
                  Google Analytics 4 via GTM. Helps us understand how visitors use the site.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={draft.analytics}
                aria-label="Toggle analytics cookies"
                onClick={() => setDraft((prev) => ({ ...prev, analytics: !prev.analytics }))}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${draft.analytics ? "bg-brand-dark" : "bg-text-tertiary/30"}`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-base-white transition-transform ${draft.analytics ? "left-[calc(100%-1.375rem)]" : "left-0.5"}`}
                />
              </button>
            </div>

            {/* Clarity toggle */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-text-primary">Session recording</p>
                <p className="text-xs text-text-tertiary">
                  Microsoft Clarity. Anonymized session replays to improve UX. No passwords or form inputs captured.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={draft.clarity}
                aria-label="Toggle session recording cookies"
                onClick={() => setDraft((prev) => ({ ...prev, clarity: !prev.clarity }))}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${draft.clarity ? "bg-brand-dark" : "bg-text-tertiary/30"}`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-base-white transition-transform ${draft.clarity ? "left-[calc(100%-1.375rem)]" : "left-0.5"}`}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={handleSaveSettings}
              className="min-h-11 rounded-full bg-brand-dark px-5 py-2.5 text-sm font-semibold text-base-white transition-colors hover:bg-brand-mid"
            >
              Save preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
