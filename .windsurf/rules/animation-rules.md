---
trigger: always_on
---

 GSAP for scroll-triggered animations. Import via `gsap` and `gsap/ScrollTrigger`.
- Always wrap GSAP in `useEffect`. Clean up in return function.
- Always check `prefers-reduced-motion` before running any animation:
```ts
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) { /* run animation */ }
```
- Aceternity UI components from `@/components/ui/aceternity/`
- React Bits for micro-interactions
- Lottie via `lottie-react`