---
trigger: always_on
---

- GTM via `next/script` with `strategy="afterInteractive"`.
- Never call `window.dataLayer` directly — use `/lib/analytics.ts` helper.
- All CTA buttons fire `cta_click` with `{ page, cta_label, destination }`.
- Form steps fire `form_start` on mount, `form_complete` on submit.
