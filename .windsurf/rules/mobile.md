---
trigger: always_on
---

Read GROWVELOPER_MOBILE_SPEC.md for full detail. Summary rules:

- **Mobile-first CSS** — build mobile layout first, layer up to desktop
- **Sticky scroll animations replaced on mobile** — Section 06 (Success) becomes a tabbed interface. Section 07 (Process) becomes an accordion. Do not attempt sticky scroll on mobile.
- **GSAP on desktop only** — detect mobile breakpoint via `window.matchMedia('(max-width: 767px)')` and skip GSAP initialisation on mobile. Use CSS transitions instead.
- **Hover effects disabled on mobile** — use `@media (hover: hover)` to scope all hover styles
- **Touch targets minimum 44px** — `min-h-[44px] min-w-[44px]` on all interactive elements
- **No horizontal overflow** — test every section at 375px width before marking complete
- **Horizontal scroll carousels** — use `overflow-x-auto scroll-smooth snap-x snap-mandatory` for Live Feed and filter bars on mobile
- **Images use `sizes` prop** — always:
  ```tsx
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  ```
- **Form inputs** — set correct `inputmode` and `autocomplete` on all inputs
- **Qualifying form CTA** — fixed to bottom of screen on mobile

**Breakpoints:**
```
mobile:  0–767px
tablet:  768–1023px
desktop: 1024px+
```