# About Page Improvement — Design Spec
**Date:** 2026-04-07  
**Approach:** Section Archetypes  
**Scope:** All sections below the hero. Hero is frozen.

---

## Goals

- Every section below the hero has its own visual "personality" — no two sections look alike
- Break the "same GrowveloperCard everywhere" problem at root
- Add editorial feel: reads like a profile, not a template
- Introduce scroll-triggered interaction moments
- Clean, premium — more whitespace and confidence, fewer heavy cards

---

## What Is Not Changing

- `AboutHero` — frozen, no changes
- `CaseStudiesSection` (Featured Work) — already distinct, no changes
- `CTABanner` (inline + section) — CMS-driven, no changes
- `AboutSkillsTools` — already the most interactive section; minor visual consistency polish only
- Page section order — unchanged
- Sanity schema — no changes; all data shapes stay the same

---

## Section Designs

### 01 — Short Version

**Current:** `SectionHeader` component + plain `<p>` paragraph in a `max-w-3xl` container.

**New treatment:**
- Remove `SectionHeader` component usage; write the heading directly as a large typographic pull-quote
- The highlighted word (from `shortVersion.highlightedWord`) gets a teal colour (`text-brand-mid`) treatment, not a gradient/underline
- Body text sits below the pull-quote as a supporting statement
- Layout: left-aligned, `max-w-3xl`, generous vertical padding
- Animation: `motion.div` fade-up on mount (matches hero's entry style)
- No glass background, no border, no card — raw type on page background

**Component affected:** Inline JSX in `page.tsx` (the short version section block). No dedicated component exists for this — it stays inline.

---

### 02 — Story

**Current:** `GlassSection` wrapping `SectionHeader` + staggered `<p>` blocks.

**New treatment:**
- Keep `GlassSection` wrapper
- Remove `SectionHeader` component; write heading directly as a serif display heading with highlighted word in `text-brand-mid`
- Add a teal left-accent bar: a `div` with `w-0.5 bg-gradient-to-b from-brand-mid to-transparent` running the full height of the content area, positioned to the left of the text
- Layout: flex row — accent bar on left, content on right, `max-w-3xl` total
- Each paragraph staggered with `ScrollFadeUp` (already imported) — delay increments per paragraph (0.1s per item, existing pattern)
- Slightly larger paragraph text: `text-lg` base, `md:text-xl`

**Component affected:** Inline JSX in `page.tsx` (the story section block). Stays inline.

---

### 03 — Stat Strip

**Current:** `AboutStatStrip` — grid of glass cards with value + label.

**New treatment — rebuild `AboutStatStrip`:**
- Remove glass card styling (`border border-glass-border bg-glass-bg rounded-2xl backdrop-blur-sm`)
- Each stat is a plain flex column: large value, mono label below, short teal underline accent (`div` with `w-6 h-0.5 bg-brand-mid/60 mx-auto mt-2 rounded`)
- Value: `heading-font text-4xl sm:text-5xl font-extrabold text-brand-mid` — raw typographic, no card container
- Label: `font-mono text-[10px] uppercase tracking-wider text-text-tertiary` — unchanged
- Grid: same responsive column logic, just without the card wrapper
- Animation: count-up on scroll using GSAP `countTo` triggered by `ScrollTrigger` on section entry. Falls back to static value if JS unavailable.
- Section padding: `py-20 md:py-28` — more breathing room than current `py-16 md:py-20`

**Component affected:** `src/components/about/AboutStatStrip/index.tsx` — full restyle.

---

### 04 — Past Companies

**Current:** `AboutCompanies` — `GrowveloperCard variant="diagnosis"` list inside `GlassSection`.

**New treatment — rebuild `AboutCompanies`:**
- Remove `GrowveloperCard` usage entirely
- Each company becomes a horizontal row: `border-b border-glass-border` separator between rows (no box/card)
- Row layout (desktop): `[logo 48px] [name + role flex-1] [insight text-right max-w-xs]`
- Row layout (mobile): `[logo + name + role stacked]` then `[insight below, left-aligned, smaller]`
- Logo: `Image` component, `h-5 w-auto object-contain logo-tint opacity-60`, same as before
- Insight text: `text-sm text-text-secondary leading-relaxed` — always visible (no hover-reveal; simpler and more accessible)
- Role: `font-mono text-xs uppercase tracking-wider text-text-tertiary`
- Animation: `StaggerChildren` wrapping the row list — each row staggers in from `y: 20`
- Keep `GlassSection` wrapper

**Component affected:** `src/components/about/AboutCompanies/index.tsx` — full restyle.

---

### 05 — Principles / How I Work

**Current:** `AboutPrinciples` — `GrowveloperCard variant="diagnosis"` grid with numbered tags.

**New treatment — rebuild `AboutPrinciples`:**
- Remove `GrowveloperCard` usage entirely
- Each principle is a horizontal row: oversized number + title + description
- Number: `font-serif text-5xl font-extrabold text-brand-mid/20 leading-none w-16 flex-shrink-0` — large, ghosted teal, anchors the eye
- Title: `text-lg font-bold text-text-primary`
- Description: `text-sm text-text-secondary leading-relaxed mt-1`
- Layout: flex column with `gap-10` between principles, each principle is `flex gap-6 items-start`
- Max width: `max-w-3xl mx-auto` — full readable width, not a multi-col grid
- Remove grid layout entirely — this is a stacked list
- Animation: `ScrollFadeUp` per principle with `delay={i * 0.1}`
- Keep section wrapper with `py-16 md:py-24`
- Remove `SectionHeader`; write heading directly with highlighted word in `text-brand-mid`

**Component affected:** `src/components/about/AboutPrinciples/index.tsx` — full restyle.

---

### 06 — Skills + Tools

**Current:** Already differentiated — discipline pills + `LogoLoop` marquee.

**Change:** No structural changes. Visual consistency pass only:
- Ensure discipline pill active state uses same `bg-brand-mid` token (already correct)
- Ensure heading uses same pull-quote pattern as other sections (remove `SectionHeader`, write heading directly with highlighted word in `text-brand-mid`)

**Component affected:** `src/components/about/AboutSkillsTools/index.tsx` — heading treatment only.

---

### 07 — Interests

**Current:** `AboutInterests` — `GrowveloperCard variant="diagnosis"` grid.

**New treatment — rebuild `AboutInterests`:**
- Remove `GrowveloperCard` usage entirely
- Each interest is an icon-led row tile: icon container + name + connection text
- Tile layout: `flex gap-4 items-start p-4 rounded-xl border border-brand-dark/15`
- Icon container: `w-9 h-9 rounded-lg bg-brand-mid/15 flex items-center justify-center flex-shrink-0`
- Icon: `h-5 w-5 text-brand-mid` (via `ICON_MAP`, existing pattern)
- Name: `text-sm font-semibold text-text-primary`
- Connection: `text-xs text-text-secondary leading-relaxed mt-0.5`
- Grid: `grid grid-cols-1 sm:grid-cols-2 gap-4` (2-col on desktop, 1-col mobile)
- Lighter border than current glass cards — `border-brand-dark/15` instead of `border-glass-border`
- Animation: `StaggerChildren` wrapping the grid
- Remove `SectionHeader`; write heading directly with highlighted word in `text-brand-mid`

**Component affected:** `src/components/about/AboutInterests/index.tsx` — full restyle.

---

## Animation Rules

All new scroll animations follow the existing project system:
- `ScrollFadeUp` for prose elements (already exists in `@/components`)
- `StaggerChildren` for list/grid elements (already exists in `@/components/animations/StaggerChildren`)
- GSAP `ScrollTrigger` for count-up in stat strip only — uses existing `gsap` + `useGSAP` imports
- No new animation libraries required

Count-up implementation for stat strip:
- Parse numeric prefix from `stat.value` (e.g. `"40+"` → target `40`, suffix `"+"`)
- GSAP `gsap.to({ val: 0 }, { val: target, duration: 1.5, ease: "power2.out", onUpdate })` triggered by `ScrollTrigger` `once: true`
- Non-numeric values (e.g. `"3x"`) animate as a simple fade-in, no count-up

---

## Success Criteria

- [ ] Build compiles, no TypeScript errors
- [ ] No `SectionHeader` used in the short version, story, principles, skills, or interests sections
- [ ] No `GrowveloperCard` used in companies, principles, or interests sections
- [ ] `AboutStatStrip` renders without glass card wrappers; count-up fires once on scroll entry
- [ ] `AboutCompanies` renders as horizontal rows with border-bottom separators
- [ ] `AboutPrinciples` renders as numbered stacked list (not a grid)
- [ ] `AboutInterests` renders as 2-col icon-led tile grid
- [ ] All scroll animations use existing `ScrollFadeUp` / `StaggerChildren` / GSAP — no new animation deps
- [ ] Highlighted words use `text-brand-mid` — no hardcoded hex colours
- [ ] Mobile layout tested: companies rows stack cleanly, principles readable, interests go 1-col
