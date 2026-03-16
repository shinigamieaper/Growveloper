---
trigger: always_on
---

All images via `next/image`. No `<img>` tags ever.
- Always provide explicit `width` and `height` or use `fill` with a sized container.
- `priority` prop only on hero/above-fold images.
- Fonts via `next/font` only.
- Lazy load below-fold heavy components: `dynamic(() => import(...), { ssr: false })`
- Target Lighthouse 100 Performance and SEO.