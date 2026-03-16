# GROWVELOPER — Mobile Experience Specification
> Treat mobile as a separate website experience, not a scaled-down desktop.
> This document defines every mobile-specific layout, interaction, and animation decision.
> Feed this to Windsurf Cascade alongside the main build spec.

---

## 1. BREAKPOINTS

```css
--mobile:   0px – 767px      /* phones */
--tablet:   768px – 1023px   /* tablets, large phones landscape */
--desktop:  1024px+          /* laptops, desktops */
```

Tailwind config:
```js
screens: {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}
```

Default: mobile-first. Build mobile layout first, layer up to desktop.

---

## 2. NAVIGATION — MOBILE

**Desktop:** Horizontal nav bar, logo left, links centre, CTA right.

**Mobile:**
- Logo left, hamburger icon right
- Hamburger opens a full-screen drawer overlay
- Drawer slides in from the right
- Inside drawer: stacked nav links, Services accordion (expands inline), Industries accordion (expands inline), CTA button at bottom of drawer — always visible
- Backdrop blur behind drawer
- Close on tap outside drawer or X button
- No bottom nav bar — drawer only

**Tablet:**
- Same as mobile drawer if links don't fit
- If viewport wide enough — compressed horizontal nav with smaller font

**CMS-driven:** All drawer link labels and CTA text from Sanity. Same nav schema as desktop.

---

## 3. HERO — MOBILE

**Desktop:** Full viewport height, text left or centre, scroll cue floating right.

**Mobile:**
- Full viewport height
- Content centred, stacked vertically
- Social proof pill — top, centred
- Headline — large but scaled down (fluid type scale)
- Sub-statement — below headline
- Primary CTA button — full width
- Secondary CTA button — full width, outlined, below primary
- Circular scroll cue — **hidden on mobile.** Replaced by a simple animated down arrow centred below the CTAs
- No horizontal layout — pure vertical stack

**Typography on mobile:**
- Hero headline: clamp(2rem, 8vw, 5rem) — fluid, never overflows
- Sub-statement: clamp(1rem, 3.5vw, 1.25rem)

---

## 4. SECTION 03 — DIAGNOSIS CARDS

**Desktop:** 2×2 card grid.

**Mobile:** Single column stack. Each card full width. Cards animate in one by one on scroll (simple fade up — no complex GSAP, just CSS transition).

**Tablet:** 2 columns.

---

## 5. SECTION 04 — SERVICES (ALTERNATING ROWS)

**Desktop:** Alternating full-width rows — visual left/text right, text left/visual right.

**Mobile:**
- Alternating layout collapses entirely
- Each service becomes a full-width stacked card: visual on top, text below
- Visual/animation simplified — no complex side-by-side layout
- Sub-services list collapses into an expandable accordion per service to save vertical space
- "Learn More" link below each expanded section

**Tablet:**
- Same as mobile stack but with more breathing room

**Animation on mobile:**
- Heavy GSAP animations disabled
- Simple CSS fade-up on scroll entry instead
- Sub-service accordions use CSS transitions only

---

## 6. SECTION 05 — INDUSTRIES GRID

**Desktop:** 2×2 card grid + "Sound like you?" CTA card.

**Mobile:** Single column stack. All 5 cards full width. CTA card last.

**Tablet:** 2×2 grid — same as desktop.

---

## 7. SECTION 06 — WHAT SUCCESS LOOKS LIKE (ANIMATION)

**Desktop:** Full-width sticky dark panel. 5 scroll-triggered transition states via GSAP ScrollTrigger.

**Mobile:** Sticky scroll animation **completely replaced.**

**Mobile replacement:**
- Static dark panel, full width
- Tabbed interface — 3 tabs: Development · Marketing · AI
- Each tab shows a simplified static version of the relevant metric animation
- Metrics shown as large animated counters (CSS counter animation, not GSAP)
- No sticky behaviour — normal scroll
- Tab switching uses CSS transitions

**Why:** Sticky scroll panels on mobile are notoriously unreliable across iOS Safari and Android Chrome. The tab approach delivers the same content with zero compatibility issues and better performance.

**Tablet:** Same as mobile tab approach.

---

## 8. SECTION 07 — HOW IT WORKS (PROCESS)

**Desktop:** Sticky scroll reveal — 4 steps lock into view as you scroll through.

**Mobile:** Sticky scroll **completely replaced.**

**Mobile replacement:**
- Simple numbered accordion
- Each step collapsed by default, tap to expand
- Step number + title always visible
- Description expands on tap
- All four steps visible in the viewport without scrolling
- Clean, fast, no GSAP dependency

**Tablet:** Same accordion approach.

---

## 9. SECTION 08 — CASE STUDIES

**Desktop:** Large stacked full-width cards — project image left (full bleed), text right.

**Mobile:**
- Image stacks above text, full width
- Image height: 200px fixed, object-fit cover
- Text block below: client situation, result headline, tags, CTA link
- Full width card, border radius, subtle glass border
- Cards stack vertically with consistent gap

**Tablet:**
- Image left 40% / text right 60% — simplified version of desktop layout

---

## 10. BANNER CTAs

**Desktop:** Full-width high-contrast block, text and button side by side.

**Mobile:**
- Text stacked above button
- Button full width
- Same background treatment

---

## 11. SECTION 09 — TESTIMONIALS

**Desktop:** Staggered masonry card grid.

**Mobile:**
- Single column stack — no masonry
- Cards full width
- "This could be you" CTA card last, full width

**Tablet:**
- 2-column grid — simplified masonry

---

## 12. SECTION 10 — FAQ

**Desktop:** Full-width accordion.

**Mobile:** Same accordion — works naturally on mobile. No changes needed.

---

## 13. SECTION 11 — LIVE FEED

**Desktop:** 3-column card grid.

**Mobile:**
- Single column stack
- Or horizontal scroll row (user can swipe) — decision: **horizontal scroll on mobile**
- Cards fixed width (85vw), snap to each card on scroll
- Scroll indicator dots below row
- Shows 1.2 cards to signal there's more to scroll

**Tablet:** 2-column grid.

---

## 14. SECTION 12 — NEWSLETTER

**Desktop:** Single row — text left, input + button right.

**Mobile:**
- Text stacked above input
- Input full width
- Button full width below input

---

## 15. FOOTER

**Desktop:** Multi-column layout — logo, nav columns, social links, CTA.

**Mobile:**
- Single column stack
- Logo top
- Nav links as a simple list (no columns)
- Social icons row
- CTA button full width
- Legal links + copyright bottom

---

## 16. THE LAB — CONTENT FEED

**Desktop:** 3-column card grid.

**Mobile:** Single column stack. Load more button below.

**Filter bar on mobile:**
- Pills scroll horizontally — no wrapping
- `overflow-x: auto`, `scroll-snap-type: x mandatory`
- No scrollbar visible

---

## 17. RESOURCES HUB

**Desktop:** Category sections with card grids.

**Mobile:**
- Category filter bar — horizontal scroll pills (same as Lab)
- Cards stack single column per category
- Category headings full width

---

## 18. INDIVIDUAL CASE STUDY PAGE

**Desktop:** Wide editorial layout — metrics strip, rich text with images.

**Mobile:**
- Metrics strip: 2×2 grid (4 metrics, 2 per row) or horizontal scroll
- All Portable Text sections full width
- Images full width, rounded corners
- Tech stack logos wrap naturally

---

## 19. THE BRAINS — ABOUT PAGE

**Desktop:** Editorial layout — large image, stat strip, two-column skills section.

**Mobile:**
- Hero image full width, portrait crop
- Stat strip: 2×2 grid or horizontal scroll
- Skills section: single column (disciplines then tools stacked)
- Case study cards: single column

---

## 20. QUALIFYING FORM — `/start`

**Desktop:** Multi-step form, centred, max-width container.

**Mobile:**
- Full width, minimal horizontal padding
- Each step full screen height where possible
- Large touch targets on all inputs and checkboxes (min 44px tap area)
- Progress indicator top (step 1 of 4)
- "Next" button fixed to bottom of screen — always reachable without scrolling

---

## 21. VIDEO MODAL

**Desktop:** Centred modal, 16:9 aspect ratio, max 800px wide.

**Mobile:**
- Full screen modal
- Video fills screen
- Close button top-right, large touch target
- "Watch on YouTube/TikTok" link below video

---

## 22. POPUP

**Desktop:** Centred modal overlay.

**Mobile:**
- Slides up from bottom (bottom sheet pattern)
- Not a centred modal — feels more native on mobile
- Handle bar at top of sheet
- Dismissible by swiping down or tapping backdrop

---

## 23. TYPOGRAPHY SCALE — MOBILE

All font sizes use `clamp()` for fluid scaling between mobile and desktop.

```css
--text-display:  clamp(2.25rem, 8vw, 5rem)      /* hero headlines */
--text-h1:       clamp(1.75rem, 6vw, 3.5rem)     /* page titles */
--text-h2:       clamp(1.5rem, 5vw, 2.5rem)      /* section headings */
--text-h3:       clamp(1.25rem, 4vw, 1.75rem)    /* card titles */
--text-body:     clamp(0.9rem, 2.5vw, 1.125rem)  /* body copy */
--text-small:    clamp(0.8rem, 2vw, 0.9rem)       /* labels, tags */
```

---

## 24. ANIMATION RULES — MOBILE

| Animation type | Desktop | Mobile |
|---|---|---|
| GSAP ScrollTrigger sticky panels | ✅ Full | ❌ Replaced with static/tab alternative |
| GSAP scroll-triggered fade-ups | ✅ Full | ✅ Simplified — CSS only, no GSAP |
| Aceternity UI components | ✅ Full | ⚠️ Reduced complexity |
| Counter animations | ✅ Full | ✅ CSS counter animation |
| Hover effects | ✅ Full | ❌ Disabled — no hover on touch |
| Page transitions | ✅ Full | ✅ Simplified fade only |
| Video autoplay | ❌ Never | ❌ Never |

**Performance rule:** On mobile, Lighthouse Performance target is still 100. Heavy animations are the biggest risk. When in doubt, use CSS over GSAP on mobile.

**Detection:** Use `window.matchMedia('(max-width: 767px)')` to conditionally load GSAP on desktop only.

---

## 25. TOUCH INTERACTION RULES

- All tap targets minimum 44×44px (Apple HIG standard)
- No hover-only interactions — everything accessible by tap
- Swipeable carousels use `scroll-snap-type`
- No double-tap to zoom — set `touch-action: manipulation` on interactive elements
- Forms: set correct `inputmode` and `autocomplete` attributes on all inputs
  ```html
  <input inputmode="email" autocomplete="email" />
  <input inputmode="url" autocomplete="url" />
  <input inputmode="tel" autocomplete="tel" />
  ```

---

## 26. IMAGE HANDLING — MOBILE

- All images via `next/image` with `sizes` prop set correctly:
  ```tsx
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  ```
- Hero images: portrait crop on mobile (`aspect-ratio: 3/4`), landscape on desktop
- Case study hero images: `aspect-ratio: 16/9` on mobile, full bleed on desktop
- All images lazy loaded except hero (which uses `priority`)

---

## 27. LIGHT MODE — MOBILE

Light mode and dark mode work identically across all breakpoints.
Toggle button in navigation — visible on both mobile (inside drawer) and desktop (nav bar).
User preference stored in localStorage and respects `prefers-color-scheme` system setting.

---

## 28. LIGHT MODE — FULL PALETTE

### CSS Variables (both modes defined):

```css
:root {
  /* Light mode — default */
  --bg-primary:        #f8f8f8;
  --bg-secondary:      #ffffff;
  --bg-tertiary:       #f0fafa;
  --text-primary:      #0a0a0a;
  --text-secondary:    #4a4a4a;
  --text-tertiary:     #7a7a7a;
  --brand-light:       #aeeeee;
  --brand-mid:         #5ab1b1;
  --brand-dark:        #2b7575;
  --glass-bg:          rgba(255, 255, 255, 0.7);
  --glass-border:      rgba(43, 117, 117, 0.15);
  --glass-blur:        blur(12px);
  --border-subtle:     rgba(0, 0, 0, 0.08);
  --shadow:            0 2px 20px rgba(0, 0, 0, 0.06);
}

[data-theme="dark"] {
  --bg-primary:        #0a0a0a;
  --bg-secondary:      #111111;
  --bg-tertiary:       #1a1a1a;
  --text-primary:      #f8f8f8;
  --text-secondary:    #a0a0a0;
  --text-tertiary:     #606060;
  --brand-light:       #aeeeee;
  --brand-mid:         #5ab1b1;
  --brand-dark:        #2b7575;
  --glass-bg:          rgba(255, 255, 255, 0.05);
  --glass-border:      rgba(255, 255, 255, 0.1);
  --glass-blur:        blur(12px);
  --border-subtle:     rgba(255, 255, 255, 0.08);
  --shadow:            0 2px 20px rgba(0, 0, 0, 0.4);
}
```

### Light mode specific notes:
- Brand teal (`#5ab1b1`, `#2b7575`) stays identical in both modes — it's the constant
- Glass cards in light mode: white at 70% opacity with teal-tinted border
- Glass cards in dark mode: white at 5% opacity with white border
- Section 06 (Success animation) dark panel: stays dark in light mode — it's intentional contrast
- Code/terminal aesthetic sections: always dark background regardless of mode
- Never invert the teal — it reads well on both white and black backgrounds

### Theme toggle:
- Toggle stored in localStorage as `growveloper-theme`
- On load: check localStorage first, then `prefers-color-scheme`, then default to dark
- Toggle applies `data-theme="dark"` to `<html>` element
- No flash of wrong theme — inline script in `<head>` before any CSS loads:
  ```html
  <script>
    const theme = localStorage.getItem('growveloper-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  </script>
  ```

---

## 29. SECTIONS THAT STAY IDENTICAL ON MOBILE

These sections need no special mobile treatment — they naturally adapt:

- Banner CTAs (stack text above button)
- Newsletter capture (stack input below text)
- FAQ accordion (works natively)
- Footer (single column stack)
- Individual blog post body text
- Resource page content
- Qualifying form (with fixed bottom CTA)

---

## 30. MOBILE BUILD RULES FOR WINDSURF

- Build mobile layout first, desktop second (mobile-first CSS)
- Never use fixed pixel widths on containers — use `w-full`, `max-w-*`, percentages
- Every section must be tested at 375px (iPhone SE), 390px (iPhone 14), 414px (iPhone Plus), 768px (iPad)
- Sticky scroll animations (Sections 06 and 07) must detect mobile breakpoint and render alternative component
- Touch targets minimum 44px — use `min-h-[44px] min-w-[44px]` on all interactive elements
- Horizontal scroll components (Live Feed, filter bars) use `overflow-x-auto scroll-smooth snap-x snap-mandatory`
- No horizontal overflow on any page at any mobile breakpoint
- Test dark mode and light mode at every breakpoint
## 31. LOGO ASSETS

All logo files are PNG with transparent background.
Located in /public/images/logo/

Files:
- logo-icon-dark.png     — white G mark, transparent bg (dark mode)
- logo-icon-light.png    — dark teal G mark, transparent bg (light mode)
- logo-wordmark-dark.png — white GRWVLP + teal W arrow, transparent bg (dark mode)
- logo-wordmark-light.png — dark GRWVLP + teal W arrow, transparent bg (light mode)

Usage rules:
- Nav bar: wordmark version. Switch between dark/light variant based on 
  data-theme attribute on <html>
- Favicon: use logo-icon-dark.png at 32×32 and 180×180
- Social profiles / OG image: logo-icon-dark.png on teal #2b7575 background
- Never add a background to the PNG files in code — 
  the page/component background is always behind them
- Never resize logos below 24px height in the nav
- Swap logic in code:
  [data-theme="dark"]  → use logo-*-dark.png
  [data-theme="light"] → use logo-*-light.png
- In Sanity site settings: logo asset field accepts both variants —
  Juwon can swap logo files from the CMS without code changes