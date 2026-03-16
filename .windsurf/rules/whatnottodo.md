---
trigger: always_on
---


- Never use `<img>` — always `next/image`
- Never hardcode hex colours — always CSS variables or Tailwind brand classes
- Never hardcode content strings — always from Sanity
- Never define types inline — use `/lib/types.ts`
- Never write GROQ queries in page files — use `/lib/sanity/queries.ts`
- Never render empty states when CMS data is missing — return null
- Never add `"use client"` unless absolutely necessary
- Never use relative imports (`../`) — use `@/` aliases
- Never hardcode navigation items — they come from Sanity
- Never skip `generateMetadata` on any page
- Never run animations without checking `prefers-reduced-motion`
- Never fire `window.dataLayer` directly — use analytics helper
- Never hardcode popup logic — always from Sanity config