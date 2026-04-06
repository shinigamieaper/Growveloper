# Audit Dynamic Checkout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the link-based CTA in the audit hero with an inline email-capture → Flutterwave checkout, redesign the hero price card to Layout A, and fix the webhook so audit payments email to `/audit/confirmed` instead of a broken resource URL.

**Architecture:** Add three optional CMS fields to the `auditPage` Sanity schema (`heroPriceNote`, `heroCardTagline`, `heroFeatures[]`), wire them through the GROQ query and `AuditHeroData` type, then rewrite `AuditHero` to render Layout A and manage checkout state locally. The webhook fix is a single branch on `meta.product_type`.

**Tech Stack:** Next.js 15 App Router, TypeScript, Sanity CMS, Flutterwave, Resend, Tailwind CSS v4, Framer Motion (`motion/react`), Lucide React

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/types.ts` | Modify | Add `heroPriceNote?`, `heroCardTagline?`, `heroFeatures?` to `AuditHeroData` |
| `src/lib/sanity/schemas/auditPage.ts` | Modify | Add 3 new fields to hero fieldset |
| `src/lib/sanity/queries.ts` | Modify | Add 3 new fields to `getAuditPage()` GROQ projection |
| `src/app/audit/page.tsx` | Modify | Map 3 new fields into the `hero` object |
| `src/components/audit/AuditHero/index.tsx` | Rewrite | Layout A price card + inline checkout state machine |
| `src/app/api/flutterwave/webhook/route.ts` | Modify | Branch on `product_type` for URL + email copy |

---

## Task 1: Data Layer — Types, Schema, Query, Page Mapping

**Files:**
- Modify: `src/lib/types.ts` (line ~492–505, `AuditHeroData` interface)
- Modify: `src/lib/sanity/schemas/auditPage.ts` (hero fieldset, after `heroScrollCueTargetId`)
- Modify: `src/lib/sanity/queries.ts` (GROQ projection, after `heroScrollCueTargetId`)
- Modify: `src/app/audit/page.tsx` (hero mapping, lines ~76–88)

- [ ] **Step 1: Add three optional fields to `AuditHeroData` in `src/lib/types.ts`**

  Find the `AuditHeroData` interface (around line 492). Add the three new fields after `scrollCueTargetId?`:

  ```typescript
  export interface AuditHeroData {
    label?: string;
    headline: string;
    highlightedWord?: string;
    price: string;
    priceLabel?: string;
    subStatement: string;
    primaryCtaLabel: string;
    primaryCtaUrl: string;
    secondaryCtaText?: string;
    secondaryCtaUrl?: string;
    scrollCueText?: string;
    scrollCueTargetId?: string;
    heroPriceNote?: string;
    heroCardTagline?: string;
    heroFeatures?: string[];
  }
  ```

- [ ] **Step 2: Add three fields to `auditPage.ts` schema (hero fieldset)**

  In `src/lib/sanity/schemas/auditPage.ts`, after the `heroScrollCueTargetId` field definition (around line 103), add:

  ```typescript
  defineField({
    name: "heroPriceNote",
    title: "Hero Price Note",
    type: "string",
    fieldset: "hero",
    description: "Small text beneath the price (e.g. 'One-time payment · no subscription')",
  }),
  defineField({
    name: "heroCardTagline",
    title: "Hero Card Tagline",
    type: "string",
    fieldset: "hero",
    description: "Short punchy headline inside the price card (e.g. 'One package. Clear price. No surprises.')",
  }),
  defineField({
    name: "heroFeatures",
    title: "Hero Card Features",
    type: "array",
    fieldset: "hero",
    description: "Feature list shown in the hero price card (displayed in a 2-column grid)",
    of: [defineArrayMember({ type: "string" })],
  }),
  ```

- [ ] **Step 3: Add fields to the GROQ projection in `src/lib/sanity/queries.ts`**

  In `getAuditPage()`, after `heroScrollCueTargetId,` (around line 252), add:

  ```groq
  heroPriceNote,
  heroCardTagline,
  heroFeatures,
  ```

  The relevant block should look like:

  ```typescript
  heroScrollCueText,
  heroScrollCueTargetId,
  heroPriceNote,
  heroCardTagline,
  heroFeatures,

  // Qualifiers
  ```

- [ ] **Step 4: Map the new fields in `src/app/audit/page.tsx`**

  In the `hero` object mapping (around line 76), add the three new fields:

  ```typescript
  const hero: AuditHeroData = {
    headline: page.heroHeadline,
    highlightedWord: page.heroHighlightedWord,
    price: page.heroPrice ?? "",
    priceLabel: page.heroPriceLabel,
    subStatement: page.heroSubStatement,
    primaryCtaLabel: page.heroPrimaryCtaLabel,
    primaryCtaUrl: page.heroPrimaryCtaUrl,
    secondaryCtaText: page.heroSecondaryCtaText,
    secondaryCtaUrl: page.heroSecondaryCtaUrl,
    scrollCueText: page.heroScrollCueText,
    scrollCueTargetId: page.heroScrollCueTargetId,
    heroPriceNote: page.heroPriceNote,
    heroCardTagline: page.heroCardTagline,
    heroFeatures: page.heroFeatures,
  };
  ```

- [ ] **Step 5: Type-check**

  ```bash
  cd c:/Users/facom/CascadeProjects/growveloper && npx tsc --noEmit
  ```

  Expected: zero errors.

- [ ] **Step 6: Commit**

  ```bash
  git add src/lib/types.ts src/lib/sanity/schemas/auditPage.ts src/lib/sanity/queries.ts src/app/audit/page.tsx
  git commit -m "feat: add heroPriceNote, heroCardTagline, heroFeatures to audit hero data layer"
  ```

---

## Task 2: AuditHero — Layout A + Inline Checkout

**Files:**
- Rewrite: `src/components/audit/AuditHero/index.tsx`

This task replaces the entire component file. The new component:
- Renders the heading + subtitle inside `LampContainer` (unchanged from current)
- Renders a Layout A price card **outside** `LampContainer` with `-mt-32` pull-up (same as current)
- Adds local checkout state (email capture → Flutterwave)
- Falls back to `primaryCtaUrl` link if price is not parseable

- [ ] **Step 1: Rewrite `src/components/audit/AuditHero/index.tsx`**

  Replace the entire file with:

  ```tsx
  "use client";

  import { useState } from "react";
  import Link from "next/link";
  import { Check, Loader2 } from "lucide-react";
  import { motion, AnimatePresence } from "motion/react";
  import { cn } from "@/lib/utils";
  import { LampContainer } from "@/components/ui/lamp";
  import { CanvasText } from "@/components/ui/canvas-text";
  import { MovingBorderButton } from "@/components/ui/moving-border";
  import { MagneticElement } from "@/components/animations/MagneticElement";
  import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
  import { ScrollCue } from "@/components/shared/ScrollCue";
  import { trackCTAClick } from "@/lib/analytics";
  import { usePathname } from "next/navigation";
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
      heroFeatures,
      subStatement,
      primaryCtaLabel,
      primaryCtaUrl,
      secondaryCtaText,
      secondaryCtaUrl,
    } = data;

    const parsed = parsePrice(price);
    const isCheckoutEnabled = parsed !== null;

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
        <LampContainer>
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="flex max-w-4xl flex-col items-center gap-6"
          >
            <h1 className="heading-font text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
              {renderHeadline()}
            </h1>
            <p className="max-w-lg text-center text-base text-text-secondary md:text-lg">
              {subStatement}
            </p>
          </motion.div>
        </LampContainer>

        {/* Price card — outside LampContainer, pulled up into glow */}
        <div className="relative z-60 mx-auto -mt-32 flex max-w-md flex-col items-center gap-6 px-6 pb-4">
          <ScrollFadeUp delay={0.35}>
            <div className="w-full rounded-2xl border border-glass-border bg-glass-bg p-6 backdrop-blur-md sm:p-8">

              {/* Badge */}
              {priceLabel && (
                <div className="mb-4 flex justify-center">
                  <span className="rounded-full bg-brand-dark px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-base-white">
                    {priceLabel}
                  </span>
                </div>
              )}

              {/* Price hero */}
              <div className="mb-1 text-center">
                <span className="heading-font text-5xl font-black text-brand-mid sm:text-6xl">
                  {price}
                </span>
              </div>
              {heroPriceNote && (
                <p className="mb-4 text-center text-xs text-text-tertiary">{heroPriceNote}</p>
              )}

              {/* Card tagline */}
              {heroCardTagline && (
                <p className="mb-4 text-center text-sm font-semibold text-text-primary">
                  {heroCardTagline}
                </p>
              )}

              {/* Divider + 2-col features grid */}
              {heroFeatures && heroFeatures.length > 0 && (
                <>
                  <div className="mb-4 border-t border-glass-border" />
                  <div className="mb-5 grid grid-cols-2 gap-x-4 gap-y-2">
                    {heroFeatures.map((feature) => (
                      <div key={feature} className="flex min-w-0 items-start gap-1.5">
                        <Check
                          className="mt-0.5 h-3 w-3 shrink-0 text-brand-mid"
                          strokeWidth={2.5}
                          aria-hidden
                        />
                        <span className="text-[11px] leading-snug text-text-secondary">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* CTA / Email capture */}
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
                  <motion.div key="cta-button" className="flex flex-col items-center gap-3">
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
            </div>
          </ScrollFadeUp>
        </div>

        {scrollCueTargetId && (
          <>
            {/* Mobile: in flow below price card */}
            <div className="relative z-60 flex justify-center pb-10 md:hidden">
              <ScrollCue
                text={data.scrollCueText ?? "VIEW OUR WORK \u00b7 VIEW OUR WORK \u00b7 "}
                targetId={scrollCueTargetId}
                className="py-0"
              />
            </div>
            {/* Desktop: absolute bottom-right */}
            <div className="absolute bottom-8 right-12 z-60 hidden md:block">
              <ScrollCue
                text={data.scrollCueText ?? "VIEW OUR WORK \u00b7 VIEW OUR WORK \u00b7 "}
                targetId={scrollCueTargetId}
                className="py-0"
              />
            </div>
          </>
        )}
      </section>
    );
  }
  ```

- [ ] **Step 2: Type-check**

  ```bash
  cd c:/Users/facom/CascadeProjects/growveloper && npx tsc --noEmit
  ```

  Expected: zero errors.

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/audit/AuditHero/index.tsx
  git commit -m "feat: AuditHero Layout A price card + inline Flutterwave checkout"
  ```

---

## Task 3: Webhook — Audit Routing Fix

**Files:**
- Modify: `src/app/api/flutterwave/webhook/route.ts`

The webhook currently always sends to `/resources/${slug}/confirmed`. Audit payments have no `resource_slug` so that URL is broken. Fix: read `meta.product_type` and branch.

- [ ] **Step 1: Rewrite `src/app/api/flutterwave/webhook/route.ts`**

  Replace the entire file with:

  ```typescript
  /* ============================================================
     POST /api/flutterwave/webhook
     Handles: charge.completed
     Sends confirmation email via Resend on successful payment.
     FLW_SECRET_HASH required in .env
     ============================================================ */

  import { NextRequest, NextResponse } from "next/server";
  import { Resend } from "resend";

  const resend = new Resend(process.env.RESEND_API_KEY);
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://growveloper.com";

  export async function POST(req: NextRequest) {
    const secretHash = process.env.FLW_SECRET_HASH;
    const signature = req.headers.get("verif-hash");

    if (!secretHash || signature !== secretHash) {
      console.error("[flw-webhook] Invalid or missing verif-hash");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let event: Record<string, unknown>;
    try {
      event = (await req.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    if (event.event !== "charge.completed") {
      return NextResponse.json({ received: true });
    }

    const data = event.data as Record<string, unknown> | undefined;
    if (!data || data.status !== "successful") {
      return NextResponse.json({ received: true });
    }

    const customer = data.customer as Record<string, unknown> | undefined;
    const meta = data.meta as Record<string, string> | undefined;

    const customerEmail = customer?.email as string | undefined;
    const customerName = customer?.name as string | undefined;
    const amount = data.amount as number | undefined;
    const currency = data.currency as string | undefined;

    const productType = meta?.product_type;
    const resourceSlug = meta?.resource_slug;

    if (!customerEmail) {
      console.error("[flw-webhook] No customer email");
      return NextResponse.json({ error: "Missing customer email" }, { status: 400 });
    }

    const isAudit = productType === "audit";
    const confirmationUrl = isAudit
      ? `${SITE_URL}/audit/confirmed`
      : `${SITE_URL}/resources/${resourceSlug ?? ""}/confirmed`;

    const amountFormatted =
      amount != null && currency ? `${currency} ${amount.toLocaleString()}` : undefined;

    const greeting = `Hi${customerName ? ` ${customerName}` : ""}`;
    const paymentLine = amountFormatted
      ? ` your payment of <strong>${amountFormatted}</strong> was received.`
      : " your payment was received.";

    const emailHtml = isAudit
      ? `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #0a0a0a;">
          <p style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Your Growth Audit is confirmed.</p>
          <p style="color: #4a4a4a; margin-bottom: 24px;">
            ${greeting},${paymentLine}
            Juwon will be in touch within 1–2 business days to kick things off.
          </p>
          <a href="${confirmationUrl}" style="display: inline-block; background: #2b7575; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 100px; font-weight: 600; font-size: 14px;">
            View confirmation
          </a>
          <p style="margin-top: 32px; font-size: 12px; color: #7a7a7a;">
            GROWVELOPER · Questions? Reply to this email.
          </p>
        </div>
      `
      : `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #0a0a0a;">
          <p style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Payment confirmed.</p>
          <p style="color: #4a4a4a; margin-bottom: 24px;">
            ${greeting},${paymentLine}
            Head to your confirmation page to access your download.
          </p>
          <a href="${confirmationUrl}" style="display: inline-block; background: #2b7575; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 100px; font-weight: 600; font-size: 14px;">
            Get your download
          </a>
          <p style="margin-top: 32px; font-size: 12px; color: #7a7a7a;">
            GROWVELOPER · Questions? Reply to this email.
          </p>
        </div>
      `;

    const emailSubject = isAudit
      ? "Your Growth Audit is confirmed — GROWVELOPER"
      : "Payment confirmed — GROWVELOPER";

    try {
      await resend.emails.send({
        from: "Growveloper <hello@growveloper.com>",
        to: customerEmail,
        subject: emailSubject,
        html: emailHtml,
      });
    } catch (err) {
      console.error("[flw-webhook] Failed to send confirmation email:", err);
    }

    return NextResponse.json({ received: true });
  }
  ```

- [ ] **Step 2: Type-check**

  ```bash
  cd c:/Users/facom/CascadeProjects/growveloper && npx tsc --noEmit
  ```

  Expected: zero errors.

- [ ] **Step 3: Commit**

  ```bash
  git add src/app/api/flutterwave/webhook/route.ts
  git commit -m "fix: branch webhook on product_type — audit to /audit/confirmed, resource unchanged"
  ```

---

## Task 4: Final Verification

- [ ] **Step 1: Full type-check**

  ```bash
  cd c:/Users/facom/CascadeProjects/growveloper && npx tsc --noEmit
  ```

  Expected: zero errors.

- [ ] **Step 2: Dev server smoke test**

  ```bash
  cd c:/Users/facom/CascadeProjects/growveloper && npm run dev
  ```

  Manual checks at `http://localhost:3000/audit`:
  1. Hero price card shows: badge → price → price note → tagline → divider → 2-col features (if fields set in Sanity)
  2. Clicking the primary CTA button expands the email input inline (no page navigation)
  3. Submitting an empty or invalid email shows the inline error message
  4. Submitting a valid email triggers the Flutterwave redirect
  5. `secondaryCtaText`/`secondaryCtaUrl` link renders below the checkout area if set
  6. If `heroPrice` field in Sanity is blank, primary CTA falls back to a link using `primaryCtaUrl`
  7. ScrollCue is in-flow on mobile, absolute bottom-right on desktop

- [ ] **Step 3: Verify no regression on resource checkout**

  The webhook change only affects email routing. Confirm existing resource checkout still works by checking that `meta.product_type === "resource"` paths in `checkout/route.ts` are unchanged (they are — no changes were made to that file).

---

## Sanity Studio Setup (post-implementation)

After deploying, go to Sanity Studio → Audit Page → Hero fieldset and fill in:

| Field | Example value |
|-------|--------------|
| Hero Price Note | One-time payment · no subscription |
| Hero Card Tagline | One package. Clear price. No surprises. |
| Hero Card Features | Full dev review, Marketing audit, AI readiness, 25–40 page report, Loom walkthrough, Live call, 30-60-90 roadmap, Fee credited back |
