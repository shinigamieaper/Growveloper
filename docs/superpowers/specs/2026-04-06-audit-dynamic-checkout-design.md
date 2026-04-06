# Stage 2 — Audit Dynamic Checkout

**Date:** 2026-04-06  
**Scope:** Audit page hero inline checkout, pricing card Layout A redesign, webhook audit routing fix

---

## Problem

1. **Hero CTA links to a URL** instead of triggering checkout directly. A visitor on `/audit` who wants to buy has to click through to another page. Friction = lost conversions.
2. **Webhook routes all payments to `/resources/${slug}/confirmed`**. Audit payments have no `resource_slug`, so the confirmation email links to a broken URL (`/resources//confirmed`).
3. **Pricing card layout** — current side-by-side layout feels off; user wants price prominent and features in a grid.

---

## Design

### 1. AuditHero — Inline Checkout

**What changes:**  
The primary CTA button no longer navigates to a URL. Clicking it expands an email-capture form inline (identical UX to `AuditPricing`). On submit, it posts to `/api/flutterwave/checkout` with `productType: "audit"` and redirects to Flutterwave.

**State machine** (mirrors `AuditPricing` exactly):
- `idle` → user sees primary CTA button
- `active` → user clicked CTA; email input + confirm button shown (AnimatePresence slide)
- `loading` → spinner, inputs disabled
- `error` → error message shown, user can retry
- On success → `window.location.href = json.url`

**Checkout payload:**
```json
{
  "productType": "audit",
  "tierName": "Growth Audit",
  "currency": "<parsed from heroPrice>",
  "amount": <parsed from heroPrice>,
  "email": "<captured email>"
}
```

`heroPrice` is parsed with the same `parsePrice()` utility already in `AuditPricing`. That function will be extracted to `src/lib/utils.ts` (or a local copy in `AuditHero`) — not duplicated inline. If parsing fails (price not set or non-numeric), the primary CTA falls back to linking `primaryCtaUrl` (graceful degradation).

**`primaryCtaUrl`** — kept in Sanity schema and type for fallback only. Not the primary path when a parseable price is present.

**Secondary CTA** (`secondaryCtaText` / `secondaryCtaUrl`) is unchanged — renders as a link below the checkout area.

---

### 2. Pricing Card — Layout A

The price card in `AuditHero` is redesigned to Layout A. All content sourced from Sanity via `AuditHeroData`.

**Visual structure (top → bottom):**
1. **Badge** — `priceLabel` field (e.g., "Introductory Rate") — centered pill, teal background
2. **Price hero** — `price` field (e.g., "$500") — large, centered, brand-mid teal
3. **Price note** — `heroPriceNote` field (e.g., "One-time payment · no subscription") — small, muted, centered
4. **Card tagline** — `heroCardTagline` field (e.g., "One package. Clear price. No surprises.") — medium weight, centered
5. **Divider** — thin border, shown only if `heroFeatures` has items
6. **2-column features grid** — `heroFeatures[]` — each item has a teal check icon; 2 items per row
7. **Checkout area** — primary CTA or email form (see §1)
8. **Secondary CTA link** — below checkout area (optional)

**Responsive:** 2-col grid with `min-w-0` on items so long feature strings wrap cleanly inside each cell. No breakpoint changes needed — the card is already `max-w-md`.

---

### 3. New Sanity Fields (hero fieldset)

Three fields added to `auditPage` schema, all optional:

| Field | Type | Purpose | Example |
|-------|------|---------|---------|
| `heroPriceNote` | `string` | Small text under price | "One-time payment · no subscription" |
| `heroCardTagline` | `string` | Short punchy card headline | "One package. Clear price. No surprises." |
| `heroFeatures` | `array of string` | 2-col feature list in card | ["Full dev review", "Marketing audit", …] |

These three fields + existing `heroPrice`, `heroPriceLabel`, `heroPrimaryCtaLabel`, `heroSecondaryCtaText/Url` give the card complete CMS control.

---

### 4. Webhook — Audit Routing Fix

**File:** `src/app/api/flutterwave/webhook/route.ts`

**Current behavior:** Always builds `confirmationUrl = ${SITE_URL}/resources/${resourceSlug}/confirmed`

**Fix:** Branch on `meta?.product_type`:

```ts
const productType = meta?.product_type; // "audit" | "resource" | undefined
const resourceSlug = meta?.resource_slug;

const confirmationUrl =
  productType === "audit"
    ? `${SITE_URL}/audit/confirmed`
    : `${SITE_URL}/resources/${resourceSlug ?? ""}/confirmed`;
```

**Email copy:** Two variants based on `productType`:
- **audit** — subject: "Your Growth Audit is confirmed", body: "Your audit is booked. Juwon will be in touch within 1–2 business days to get started."
- **resource** — unchanged existing copy ("Head to your confirmation page to access your download.")

The CTA button in the email:
- **audit** → label "View confirmation", href `${SITE_URL}/audit/confirmed`
- **resource** → label "Get your download", href `${SITE_URL}/resources/${resourceSlug}/confirmed`

---

## Files Modified

| File | Change |
|------|--------|
| `src/lib/sanity/schemas/auditPage.ts` | Add `heroPriceNote`, `heroCardTagline`, `heroFeatures` to hero fieldset |
| `src/lib/types.ts` | Add `heroPriceNote?`, `heroCardTagline?`, `heroFeatures?` to `AuditHeroData` |
| `src/lib/sanity/queries.ts` | Add 3 new fields to `getAuditPage()` GROQ projection |
| `src/app/audit/page.tsx` | Map 3 new fields into `hero` object |
| `src/components/audit/AuditHero/index.tsx` | Inline checkout + Layout A price card |
| `src/app/api/flutterwave/webhook/route.ts` | Branch on `product_type` for URL + email copy |

---

## Success Criteria

1. Clicking "Get the Audit" (or whatever `heroPrimaryCtaLabel` is set to) on the audit hero expands an email input inline — no page navigation.
2. Submitting a valid email redirects to Flutterwave with the correct amount/currency parsed from `heroPrice`.
3. After a successful audit payment, the webhook sends an email with a link to `/audit/confirmed` (not `/resources//confirmed`).
4. After a successful resource payment, the webhook email still links to `/resources/${slug}/confirmed` — no regression.
5. Price, badge, tagline, price note, and features all come from Sanity — no hardcoded strings in the component.
6. If `heroPrice` is blank or non-parseable, primary CTA falls back to linking `primaryCtaUrl`.
7. TypeScript compiles with zero new errors.
