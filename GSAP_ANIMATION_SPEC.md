# GROWVELOPER — GSAP Animation Design System

> Reference document for the animation layer. Every pattern, when to use it, and code signatures.
> This is a living document — update as new patterns are added.

---

## 1. SETUP

### Dependencies
```
gsap (includes ScrollTrigger, SplitText, Flip, Observer — all free since v3.12)
@gsap/react (useGSAP hook — safe cleanup in React)
@radix-ui/react-hover-card (LinkPreview)
motion/react (Framer Motion — Lamp, LinkPreview springs)
```

### Central Registry — `src/lib/gsap.ts`
All plugins registered once. Exports: `gsap`, `ScrollTrigger`, `SplitText`, `useGSAP`, `prefersReducedMotion()`, `EASE`, `DURATION`, `STAGGER`.

### Rules
1. **Every animation checks `prefersReducedMotion()`** — if true, show final state immediately.
2. **Every GSAP animation inside React uses `useGSAP()` hook** with `scope` for automatic cleanup.
3. **Interaction animations (click, hover) wrapped in `contextSafe()`** to prevent memory leaks.
4. **Mobile (≤767px):** Skip GSAP ScrollTrigger animations. Use CSS transitions instead. Exception: TextReveal (lighter config).
5. **`will-change: transform`** only during animation, removed after via `onComplete`.
6. **No ScrollSmoother** — native scroll preserved for accessibility and anchor link compatibility.

---

## 2. ANIMATION COMPONENTS

### TextReveal — `animations/TextReveal/index.tsx`
**Purpose:** Split heading into words, stagger fade-up on scroll into view.
**When:** Every section heading site-wide.
**How:** GSAP SplitText splits into words → ScrollTrigger triggers `from({ y: 30, opacity: 0 })` with word stagger.
**Props:** `as`, `stagger`, `duration`, `y`, `start`, `className`, `children`.
**Mobile:** Reduced y offset (20px), faster duration.

### ScrollFadeUp — `animations/ScrollFadeUp/index.tsx`
**Purpose:** Generic fade-up wrapper for any element entering viewport.
**When:** Every section, card grid, content block.
**How:** ScrollTrigger on wrapper div → `from({ y: 40, opacity: 0 })`.
**Props:** `y`, `duration`, `delay`, `start`, `className`, `children`.

### StaggerChildren — `animations/StaggerChildren/index.tsx`
**Purpose:** Animate direct children with stagger (cards entering one after another).
**When:** Card grids (testimonials, case studies, industries, diagnosis).
**How:** `ScrollTrigger.batch()` on children → staggered `from({ y: 30, opacity: 0 })`.
**Props:** `stagger`, `duration`, `y`, `className`, `children`.

### ParallaxSection — `animations/ParallaxSection/index.tsx`
**Purpose:** Background moves slower than scroll for depth.
**When:** Hero backgrounds, CTA banner backgrounds.
**How:** ScrollTrigger scrub on background element → `yPercent: -10` to `10`.
**Props:** `speed` (0-1), `className`, `children`.

### MagneticElement — `animations/MagneticElement/index.tsx`
**Purpose:** Element follows cursor within radius on hover.
**When:** CTA buttons, social icons. Desktop only.
**How:** `gsap.quickTo()` for x/y → spring back on mouseleave.
**Props:** `strength`, `className`, `children`.

### CountUp — `animations/CountUp/index.tsx`
**Purpose:** Animated number counter on scroll.
**When:** Case study metrics, stat strips, homepage success section.
**How:** ScrollTrigger → `gsap.to()` with snap rounding on innerText.
**Props:** `end`, `duration`, `prefix`, `suffix`, `decimals`.

### LineReveal — `animations/LineReveal/index.tsx`
**Purpose:** Decorative lines draw themselves on scroll.
**When:** Section dividers, decorative elements.
**How:** `scaleX: 0 → 1` with ScrollTrigger, `transformOrigin: "left center"`.
**Props:** `direction`, `duration`, `className`.

---

## 3. UI COMPONENTS (Aceternity-derived)

### Lamp — `ui/lamp.tsx`
**Purpose:** Full-section hero wrapper with conic teal gradient glow.
**When:** Homepage hero, audit hero, service page heroes.
**Colors:** Uses `--brand-mid`, `--brand-dark`, `--bg-primary` CSS vars.
**Animation:** Framer Motion `whileInView` — glow expands on enter.

### GridBackground — `ui/grid-background.tsx`
**Purpose:** Subtle grid line overlay with radial mask fade.
**When:** Hero sections, CTA banners, atmospheric backgrounds.
**Colors:** Theme-aware via CSS variables. No `dark:` classes.
**Animation:** None (pure CSS).

### CanvasText — `ui/canvas-text.tsx`
**Purpose:** Animated wavy lines through highlighted words in headings.
**When:** Hero headlines, section headings with CMS-marked key words.
**Colors:** Brand teal palette — `#aeeeee`, `#5ab1b1`, `#2b7575` + opacity steps.

### LinkPreview — `ui/link-preview.tsx`
**Purpose:** Hover card showing preview of linked page.
**When:** Hero subtext industry/service links, body copy inline links.
**Mode:** `isStatic` with CMS images (no external API).

---

## 4. INTERACTION PATTERNS

### Buttons
- **Hover:** `y: -2`, shadow increase (GSAP quickTo)
- **Press:** `scale: 0.95`, shadow decrease (GSAP contextSafe)
- **Focus:** teal ring pulse (CSS)
- **MovingBorderButton:** all above + existing neon border animation

### Links
- **Nav links:** underline draws left→right (CSS `scaleX` transition)
- **Body links:** teal color shift + slight lift
- **Footer links:** opacity 0.6 → 1

### Cards
- **Hover lift:** `y: -4`, shadow increase (GSAP quickTo)
- **Border glow:** glass border opacity increase
- **Image zoom:** inner image `scale: 1.03`
- Desktop only — disabled on touch via `@media (hover: hover)`

---

## 5. PERFORMANCE BUDGET

| Metric | Target |
|---|---|
| ScrollTrigger instances per page | ≤ 20 (use batch() for repeated items) |
| Animation duration | 0.3–1.0s (never over 1.5s) |
| Stagger total | ≤ 0.8s for any group |
| will-change usage | Only during animation |
| Mobile animations | CSS transitions only (except TextReveal) |
| Lighthouse Performance | ≥ 95 |

---

## 6. EASING PRESETS

```ts
EASE.smooth     = "power2.out"       // default for reveals
EASE.snap       = "power3.out"       // for snappy interactions
EASE.bounce     = "back.out(1.4)"    // for playful micro-interactions
EASE.elastic    = "elastic.out(1,0.5)" // for spring-back effects
EASE.smoothInOut = "power2.inOut"    // for parallax scrub
```

---

## 7. FILE MAP

```
src/lib/gsap.ts                              ← Central registry
src/components/animations/TextReveal/        ← SplitText scroll reveal
src/components/animations/ScrollFadeUp/      ← Generic fade-up wrapper
src/components/animations/StaggerChildren/   ← Batch card stagger
src/components/animations/ParallaxSection/   ← Parallax background
src/components/animations/MagneticElement/   ← Magnetic hover (desktop)
src/components/animations/CountUp/           ← Number counter
src/components/animations/LineReveal/        ← Line draw on scroll
src/components/ui/lamp.tsx                   ← Lamp hero (Aceternity)
src/components/ui/grid-background.tsx        ← Grid overlay
src/components/ui/canvas-text.tsx            ← CanvasText highlights
src/components/ui/link-preview.tsx           ← Hover preview cards
src/app/test/page.tsx                        ← Visual QA page
```
