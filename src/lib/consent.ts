/* ============================================================
   Cookie Consent Utility
   Manages consent state cookie, Google Consent Mode v2 updates,
   and conditional Microsoft Clarity loading.
   ============================================================ */

import type { ConsentState } from "@/lib/types";

const COOKIE_NAME = "growveloper_consent";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

/* ── Read / Write consent cookie ── */

export function getConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match.split("=")[1])) as ConsentState;
  } catch {
    return null;
  }
}

export function setConsent(state: ConsentState): void {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(state));
  document.cookie = `${COOKIE_NAME}=${value};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
}

/* ── Google Consent Mode v2 update ── */

function gtag(...args: unknown[]): void {
  const w = window as unknown as {
    gtag?: (...a: unknown[]) => void;
    dataLayer?: unknown[];
  };
  // Tag Manager only recognises a consent command when it is pushed as an
  // `arguments` object, which is what the inline gtag() in layout.tsx does.
  // Pushing a plain array (the previous code) was silently ignored, so every
  // GA4 hit fired with analytics_storage still denied (gcs=G100) even after
  // the visitor accepted cookies, and the property recorded nothing.
  if (typeof w.gtag === "function") {
    w.gtag(...args);
    return;
  }
  w.dataLayer = w.dataLayer || [];
  const dl = w.dataLayer;
  (function () {
    // eslint-disable-next-line prefer-rest-params
    dl.push(arguments);
  }).apply(null, args as []);
}

export function updateGoogleConsent(state: ConsentState): void {
  if (typeof window === "undefined") return;
  gtag("consent", "update", {
    analytics_storage: state.analytics ? "granted" : "denied",
  });
  // Push a custom event so GTM can react to consent changes
  const dl = (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer;
  if (dl) {
    dl.push({ event: "consent_update", consent: state });
  }
}

/* ── Dynamic Clarity loader ── */

let clarityLoaded = false;

export function loadClarity(): void {
  if (typeof window === "undefined") return;
  if (clarityLoaded) return;
  const id = (window as unknown as { __CLARITY_ID__?: string }).__CLARITY_ID__;
  if (!id) return;

  clarityLoaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${id}`;
  document.head.appendChild(script);

  // Initialize Clarity queue
  (window as unknown as Record<string, unknown>).clarity =
    (window as unknown as Record<string, unknown>).clarity ||
    function (...args: unknown[]) {
      ((window as unknown as Record<string, { q: unknown[][] }>).clarity.q =
        (window as unknown as Record<string, { q: unknown[][] }>).clarity.q || []).push(args);
    };
}

/* ── Apply consent (combines all side-effects) ── */

export function applyConsent(state: ConsentState): void {
  setConsent(state);
  updateGoogleConsent(state);
  if (state.clarity) {
    loadClarity();
  }
}

/** Re-apply a returning visitor's saved consent on page load.
 *  Call once from a client component mount. */
export function hydrateConsent(): void {
  const saved = getConsent();
  if (!saved) return;
  updateGoogleConsent(saved);
  if (saved.clarity) {
    loadClarity();
  }
}
