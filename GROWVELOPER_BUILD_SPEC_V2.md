# GROWVELOPER — Master Build Specification v2
> Feed this document to Windsurf Cascade before writing any code.
> This is the Single Source of Truth (SSOT) for the entire build.
> Version 2 — complete. Replaces all previous versions.

---

## 1. PROJECT OVERVIEW

**Brand:** GROWVELOPER
**Type:** Personal freelance brand site
**Founder:** Juwon
**Positioning:** The intersection of full-stack development and performance marketing. Not a dev shop. Not a marketing agency. The only option for founders who need both working together.
**Tagline:** "I architect high-performance digital engines where clean code and marketing ROI are inseparable."

---

## 2. CRITICAL BUILD RULES

These rules apply to every single file, component and page in this project. Read before writing any code.

### Rule 1 — Every text string visible to a site visitor comes from Sanity. No exceptions.

This includes but is not limited to:
- Hero headlines and sub-statements
- Section titles and labels
- Body copy in every section
- Button labels and CTA text
- Stat numbers and their labels
- Service names, descriptions, sub-service lists
- Pain point bullets and qualifier bullets
- Process step titles and descriptions
- FAQ questions and answers
- Testimonial quotes, names, roles
- Card titles, excerpts, descriptions
- Banner CTA headlines and sub-copy
- Footer copy and link labels
- 404 page copy
- Confirmation page copy
- Form labels and helper text
- Popup headlines, sub-copy, CTA labels
- Navigation labels and dropdown items
- Social proof pill text
- Newsletter section headline and sub-copy
- Prices — every price on every page is a Sanity field

**If a developer is tempted to write a visible string directly in JSX — that string belongs in Sanity instead.**

The only strings permitted directly in code:
- ARIA labels (`aria-label="Close menu"`)
- Error boundary fallback messages
- Console.log statements for debugging

Everything else is a Sanity field. Juwon must be able to change any headline, any CTA label, any stat, any price at any time from the Sanity Studio without touching code or triggering a deployment.

### Rule 2 — No data = no component.
If a CMS field is empty or a collection has no items, the component renders nothing. No empty states, no placeholder text, no skeleton loaders visible to visitors.

### Rule 3 — Structure first, content later.
Build every component to accept CMS data as props. Content is populated after the build. Never block progress waiting for real content.

### Rule 4 — No hardcoded popup logic.
Popups only fire if explicitly configured in Sanity for that page. Zero assumptions in code.

### Rule 5 — Navigation is CMS-driven.
Adding a new industry or service in Sanity automatically updates the nav dropdown. No code change required.

---

## 3. TECH STACK

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1+ (App Router) |
| Language | TypeScript — strict mode, no `any` |
| Styling | Tailwind CSS |
| Components | Shadcn/UI |
| Animations | GSAP + ScrollTrigger, Aceternity UI, React Bits, Lottie |
| CMS | Sanity.io |
| Deployment | Vercel (Edge) |
| Tracking | Google Tag Manager (Server-Side) + GA4 |
| Error monitoring | Sentry |
| Payments | Stripe (global — works in Nigeria, US, worldwide) |
| Forms | React Hook Form + Zod validation |
| Email delivery | Resend |
| Newsletter | Mailchimp |
| Calendar booking | Cal.com |

### Next.js 16 — Critical breaking changes vs earlier versions

- **`middleware.ts` → `proxy.ts`** — rename the file and the exported function to `proxy`. Do not create a `middleware.ts` file.
- **Async params and searchParams** — every `page.tsx`, `layout.tsx`, `generateMetadata`, and route handler must `await` params and searchParams before using them.
  ```ts
  // CORRECT in Next.js 16
  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
  }
  ```
- **Explicit caching only** — no implicit caching. Use `"use cache"` directive on Sanity fetch functions. Nothing is cached unless you explicitly opt in.
- **`experimental.ppr` flag removed** — do not reference it in `next.config.ts`. Cache Components replace it.
- **Turbopack is default** — no `--turbopack` flag needed. `next dev` and `next build` use Turbopack automatically.
- **Minimum Node.js 20.9.0** — ensure local environment and Vercel build environment are on Node 20.9+.
- **React 19.2** — View Transitions and `useEffectEvent` available.

### Current implementation snapshot — shared systems already built

This document defines the target product, but it must also stay synced with the real implementation state of the repo.

**Core animation registry:**
- `src/lib/gsap.ts`
- Registers `gsap`, `ScrollTrigger`, `SplitText`, `useGSAP`
- Exposes shared `prefersReducedMotion()`, easing presets, duration presets, and stagger presets

**Shared animation components currently implemented:**
- `TextReveal`
- `ScrollFadeUp`
- `StaggerChildren`
- `CountUp`
- `MagneticElement`
- `LineReveal`
- `ParallaxSection`
- `ServiceLottie`

**Shared UI / interaction components currently implemented:**
- `LampContainer`
- `GridBackground`
- `CanvasText`
- `LinkPreview`
- `MovingBorderButton`
- `Navbar` / `resizable-navbar`
- `StickyScroll`
- `ThemeToggle`

**Shared card system (taxonomy):**
- **Shared base card:** `GrowveloperCard`
  - Variants used: `industry`, `diagnosis`, `resource`, `automation`, `sound-like-you`
  - Purpose: one consistent visual + interaction baseline for all non-specialised cards
- **Bespoke cards (intentionally separate):**
  - `CaseStudyCard` (case studies have unique layout/media requirements)
  - `TestimonialCard` (testimonial-specific layout + avatar/rating treatment)
  - `LiveFeedCard` (mixed content types + modal/video behaviour)
- **Legacy (deprecated; do not use for new work):**
  - `DiagnosisCard`, `IndustryCard`, `SoundLikeYouCard` (superseded by `GrowveloperCard`)

**Shared content components currently implemented:**
- `Navigation`
- `Footer`
- `SocialProofPill`
- `ScrollCue`
- `ServiceRow`
- `GrowveloperCard`
- `CaseStudyCard`
- `TestimonialsSection`
- `CTABanner`
- `FAQAccordion`
- `LiveFeedBento`
- `BentoGrid`
- `VideoModal`
- `SectionHeader`

**Current CTA system state:**
- One shared CTA family
- `presentationMode: "inline" | "section"`
- Inline mode is compact, horizontal on desktop, and defaults to headline + button without supporting sub-copy
- Section mode is a standalone conversion block that may include sub-copy
- CTA highlighted words use scheme-aware accent styling to avoid clashes across light and dark banner variants

**Current QA route:**
- `/test` is the active visual QA surface for shared animations, interaction patterns, sticky-scroll sections, CTA banner states, navigation theme review, live feed cards, and modal behavior

**Session B — Proof widgets & content infrastructure (completed):**

*Proof/animation primitives:*
- `MetricsCounter` (`animations/MetricsCounter/`) — wraps existing `CountUp` in a card/label layout. Props: `value`, `label`, `prefix`, `suffix`, `decimals`, `duration`. Used in Section 06, case study metric strips.
- `ChartClimb` (`animations/ChartClimb/`) — pure SVG + GSAP `stroke-dashoffset` path-draw animation. Dark panel, teal line `#5ab1b1`, teal fill at 15% opacity. No recharts dependency.
- `WorkflowAnimation` (`animations/WorkflowAnimation/`) — 5 workflow nodes connected by lines, GSAP timeline lights them up L→R with pulse effect. Reuses `MetricsCounter` for "time saved" counter. Labels hardcoded (animation, not CMS).

*Content infrastructure:*
- `PortableTextRenderer` (`shared/PortableTextRenderer/`) — renders Sanity Portable Text with custom block renderers. General Sans headings, Gambetta body, JetBrains Mono code blocks (local woff2 via `next/font/local` at `public/fonts/JetBrainsMono/`). All styling via CSS variables.
- `ContentFilterBar` (`shared/ContentFilterBar/`) — reusable pill-tab filter bar. Props: `filters`, `activeFilter`, `onFilterChange`. Mobile horizontal scroll with snap. Used on `/lab`, `/resources`, `/work`.
- `ResourceCard` (`shared/ResourceCard/`) — thin wrapper composing `GrowveloperCard` with `variant="resource"`. Adds `resourceType`, `accessType`, `price` props and access badge. Does not modify `GrowveloperCardBaseProps`.
- `FreeResourceBlock` + `PaidResourceBlock` (`shared/ResourceActionBlock/`) — free: email gate → download unlock via newsletter API. Paid: Stripe hosted checkout via `/api/stripe/resource-checkout` route handler. Stripe client lazy-loaded via `getStripe()` in `src/lib/stripe.ts`. `STRIPE_SECRET_KEY` required at runtime.

*New dependencies added:*
- `@portabletext/react` — Portable Text rendering
- `@fontsource/jetbrains-mono` — font source (woff2 files copied to `public/fonts/`)
- `stripe` — Stripe checkout integration (server-side only)
- `shadcn/ui Badge` component installed

*Font addition:*
- JetBrains Mono (Regular 400, Bold 700) registered in `src/app/fonts.ts` as `--font-jetbrains-mono`, applied to `<body>` in root layout.

**Session C — Lab content system (completed):**

- `LabFeaturedCard` (`shared/LabFeaturedCard/`) — hero-sized featured card for `/lab` landing. Horizontal split: 60% thumbnail / 40% content. SpotlightCard wrap with teal glow, GSAP hover scale 1.01 + border brighten. Blog variant uses LinkPreview CTA → `/lab/[slug]`, video variant fires `onVideoClick` → VideoModal. Returns null when no item.
- `LabFeedWrapper` (`shared/LabFeedWrapper/`) — layout composition for `/lab` feed page. Renders ContentFilterBar at top (multi-select), filters items client-side, 3-col CSS grid (2-col tablet, 1-col mobile), each item as LiveFeedCard. LoadMore button shows next 6 items. No data = null.
- `SocialShareButtons` (`shared/SocialShareButtons/`) — share cluster for `/lab/[slug]` post headers. X (Twitter), LinkedIn, Copy link. Web Share API on mobile if available. Glassmorphism pill container, icon-only mobile, icon + label desktop. Copy button shows "Copied!" for 2s.
- `RelatedContentGrid` (`shared/RelatedContentGrid/`) — "You might also like" block for detail pages. Props: `items`, `contentType` ("lab" | "resource"), `label`. Lab items render as LiveFeedCard, resource items render as GrowveloperCard variant="resource". No internal filtering — page controls matching. Empty = null.

*ContentFilterBar updated:*
- Changed from single-select to multi-select with checkmark indicators (Lucide Check icon)
- Bordered/outlined pill style instead of solid fill
- Wrap on desktop (`md:flex-wrap`), horizontal scroll on mobile
- API: `activeFilters: string[]` + `onFilterChange(values: string[])`

*Type addition:*
- `BlogPostCardData` gained `featuredToggle?: boolean` to match `VideoCardData`

**Test page audit (completed):**

- `GridBackground` dark mode visibility fixed — line color bumped from `#1a1a1a` to `#2a2a2a`
- `SectionHeader` enhanced with built-in `TextReveal` (word-by-word headline) + `ScrollFadeUp` (label + description) — every section header across the site now animates on scroll automatically
- All card grids wrapped in `StaggerChildren`, all standalone content blocks wrapped in `ScrollFadeUp`
- Strict alternating `bg-bg-primary` / `bg-bg-secondary` backgrounds across all 32 test page sections
- `ParallaxSection` retained as animation showcase section with proper background alternation

**Root layout implementation (completed):**

Root layout (`src/app/layout.tsx`) rebuilt as the global site shell:

- **Navigation** — rendered globally with `data={null}` (Rule 3 — structure first, Sanity wiring later)
- **LayoutGridOverlay** (`layout/LayoutGridOverlay/`) — fixed-position theme-aware grid line overlay with radial edge mask. Covers entire viewport at `z-0`, `pointer-events-none`. Primary sections show the grid texture; `bg-bg-secondary` sections cover it naturally.
- **`<main id="main-content">`** — `relative z-10`, sits above the fixed grid. Pages render their content here.
- **Footer** — rendered globally with `data={null}` (Rule 3)
- **ScrollToTop** (`layout/ScrollToTop/`) — glassmorphism floating button, appears after 400px scroll, respects `prefers-reduced-motion`, 44px minimum touch target
- **GTM** — `next/script` with `strategy="afterInteractive"`, conditional on `NEXT_PUBLIC_GTM_ID` env var
- **Theme init** — inline `<script>` in `<head>` prevents flash of wrong theme (reads `localStorage` → sets `data-theme`)

Layout components live in `src/components/layout/` (separate from `shared/` and `ui/`). All exported from barrel file.

**Root metadata (completed):**

- `metadataBase` reads `NEXT_PUBLIC_SITE_URL` env var, falls back to `localhost:3000`
- `title.template`: `"%s | GROWVELOPER"` — per-page titles append brand name
- `openGraph` + `twitter` fallbacks with OG image at `/images/og/og-default.png` (placeholder path, asset TBD)
- Theme-aware favicons via `prefers-color-scheme` media queries — `logo-icon-light.png` (teal, for light tabs) + `logo-icon-dark.png` (white, for dark tabs)
- Apple touch icon: `logo-icon-light.png`
- Old Vercel `favicon.ico` removed

**Homepage Hero (completed):**

- `Hero` component at `components/home/Hero/` — accepts `HomeHeroData` props (all CMS-driven)
- Uses `LampContainer` for the teal conic gradient glow effect
- `SocialProofPill` rendered above headline (conditional on data)
- Headline supports `highlightedWord` which renders via `CanvasText` (teal gradient + growth underline)
- Dual CTAs: `MovingBorderButton` default variant (primary) + `MovingBorderButton` inverted variant (secondary), both wrapped in `MagneticElement`
- `ScrollCue` positioned absolute right side of hero (ThunderClap-inspired) — spinning text ring with down arrow, scrolls to next section
- No section-level background colors — inherits from layout
- Placeholder data in `page.tsx` — will be replaced with Sanity fetch

**Hero pattern rule:** `LampContainer` is the standard hero treatment across ALL page heroes site-wide. Every page hero uses the same Lamp glow + motion.div fade-up entry pattern.

**MovingBorderButton variants (completed):**

- `variant="default"` — `bg-brand-dark` + `text-base-white` (original style)
- `variant="inverted"` — `bg-bg-secondary` + `text-brand-dark` (light/white bg, teal text, same green moving border)
- Both variants share the same animated teal border, hover lift, and active scale

**Homepage Diagnosis section (completed):**

- `DiagnosisCards` component at `components/home/DiagnosisCards/` — accepts `DiagnosisSectionData` props
- `SectionHeader` with label, headline, description (TextReveal + ScrollFadeUp built in)
- `StaggerChildren` wraps a responsive card grid — GSAP scroll-triggered stagger animation
- Each card is a `GrowveloperCard` with `variant="diagnosis"` and `colorScheme="glass-dark"`
- Grid layout driven by CMS `layoutStyle` field: `grid-2x2` | `grid-3col` | `single-col`
- No section-level background colors — inherits from layout
- Returns null if no data or empty cards array
- Placeholder data in `page.tsx` — 4 pain-point cards in 2×2 layout
- Icons use Lucide React via `ICON_MAP` string→component mapping (CMS stores string keys like `"zap"`, `"bot"`)

**Homepage Services section — Section 04 (completed):**

- `ServicesAlternating` component at `components/home/ServicesAlternating/` — accepts `StickyScrollSectionData` props
- `SectionHeader` with label, headline, description
- Delegates to `StickyScroll` component (Aceternity-derived sticky scroll with Lottie visuals)
- Desktop: left text panel scrolls through service pillars, right visual swaps Lottie per active step
- Mobile: accordion-style stacked cards with inline Lottie per service
- `bottomCta` renders a full-width CTA below services (optional, CMS-driven)
- 3 service items: Web Development, Growth Marketing, AI & Automation
- Each item has stepNumber, heading, description, subItems (pills), CTA, lottiePath, fallbackGradient
- Placeholder data in `page.tsx` — will be replaced with Sanity fetch

**Homepage Industries section — Section 05 (completed):**

- `IndustriesGrid` component at `components/home/IndustriesGrid/` — accepts `IndustriesGridData` props
- `SectionHeader` with label, headline, description
- `ScrollFadeUp` wraps a bordered container (`rounded-2xl border border-glass-border bg-glass-border`)
- Grid with `gap-px` creates 1px border effect between cards (matching test page pattern)
- Each industry card: `GrowveloperCard` variant="industry" colorScheme="dark" with Lucide icon via `ICON_MAP`
- Final card: `GrowveloperCard` variant="sound-like-you" colorScheme="teal-solid" spanning `md:col-span-2`
- Cards have `rounded-none border-0` to merge into the bordered container
- Responsive: 1 col → 2 col (md) → 3 col (lg)
- 4 industries: SaaS, B2B Lead Gen, AI & Tech Startups, FinTech
- Placeholder data in `page.tsx` — will be replaced with Sanity fetch

**Homepage Success section — Section 06 (completed):**

- `SuccessAnimation` component at `components/home/SuccessAnimation/` — code-driven, no CMS data
- Always dark panel (`bg-base-black text-base-white`) regardless of theme
- 5 scroll-triggered states across 3 pillars:
  - State 0 (Development): Lighthouse 100 + Load Time 0.9s — uses `MetricsCounter`
  - State 1 (Development): Core Web Vitals all green — custom inline rows with pass indicators
  - State 2 (Growth Marketing): GA4 chart climbing + ROAS/conversion — uses `ChartClimb` + `MetricsCounter`
  - State 3 (Growth Marketing): AI search citation + JSON-LD schema — custom monospace terminal aesthetic
  - State 4 (AI & Automation): Workflow nodes lighting up — uses `WorkflowAnimation`
- Desktop: tall section (`500vh`) with CSS `position: sticky` inner panel, scroll progress drives active state. Progress dots on left, rotated section label on right.
- Mobile: tabbed interface with horizontal scroll pill tabs, active panel content below
- Animation components rendered with `key={activeState}` to re-trigger their scroll animations on state change
- Monospace font (`font-mono`) for terminal/code aesthetic throughout

**Homepage Process section — Section 07 (completed):**

- `ProcessSteps` component at `components/home/ProcessSteps/` — accepts `StickyScrollSectionData` props
- Composes `SectionHeader` (headline + description, no label) + `StickyScroll`
- Layout: `py-24`, `max-w-6xl` — matches test page exactly
- 4 items: Audit → Architect → Build → Scale (placeholder data in `page.tsx`)
- Same shared sticky-scroll system as Section 04 (GSAP pinning, Lottie playback)
- No section-level background — inherits from layout

**Homepage Case Studies section — Section 08 (completed):**

- `CaseStudiesSection` component at `components/home/CaseStudies/` — accepts headline, description, `items: CaseStudyCardData[]`
- Composes `SectionHeader` + `ScrollFadeUp`-wrapped `CaseStudyCard` stack
- Layout: `py-24`, `max-w-6xl`, `space-y-10` — matches test page exactly
- Cards cycle `colorIndex` (0, 1, 2, 0…) for accent panel variety
- 3 placeholder case studies in `page.tsx` — will be replaced with Sanity fetch
- Returns null if no items
- Exported from barrel file

**Homepage Banner CTA 1 — Growth Audit (completed):**

- `CTABanner` rendered directly in `page.tsx` between Case Studies and Testimonials
- `presentationMode="section"`, `colorScheme="teal-solid"`
- Placeholder data: "Not sure where to start? Get a Growth Audit." with highlighted word, destination `/audit`
- `CTABanner` component gained `"use client"` directive — required because it passes `Link` function to `MovingBorderButton`'s `as` prop

**Homepage Testimonials section — Section 09 (completed):**

- `HomeTestimonials` component at `components/home/Testimonials/` — accepts headline, description, `items: TestimonialData[]`, CTA card config
- Composes `SectionHeader` + `TestimonialsSection` (carousel over foggy background grid)
- Layout: `py-24`, `max-w-6xl` — matches test page exactly
- 2 placeholder testimonials + CTA card ("This could be you…") in `page.tsx`
- Returns null if no items
- Exported from barrel file

**Homepage Banner CTA 2 — Free Consultation (completed):**

- `CTABanner` rendered directly in `page.tsx` between Testimonials and FAQ
- `presentationMode="section"`, `colorScheme="gradient"`
- Placeholder data: "Ready to build your repeatable growth engine?" with highlighted word, destination `/start`

**Homepage FAQ section — Section 10 (completed):**

- `FAQAccordion` shared component rendered directly in `page.tsx`
- Props: `sectionHeadline`, `sectionDescription`, `ctaHeadline`, `ctaDescription`, `ctaLabel`, `ctaUrl`, `items: FAQItem[]`
- 4 placeholder FAQ items + bottom CTA card linking to `/start`
- Component already fully implemented — no home wrapper needed

**Homepage Live Feed section — Section 11 (completed):**

- `LiveFeed` component at `components/home/LiveFeed/` — rewritten from empty stub
- Composes `SectionHeader` + `LiveFeedBento` (BentoGrid with SpotlightCard hover)
- Layout: `py-24`, `max-w-6xl` — matches test page exactly
- 3 placeholder items: 1 blog (featured, 2-col), 1 YouTube, 1 TikTok
- Accepts `onVideoClick` callback for modal integration
- Returns null if no items

**Homepage Newsletter section — Section 12 (completed):**

- `NewsletterCapture` shared component rendered directly in `page.tsx`
- Props: `headline`, `subCopy`, `ctaLabel`
- Already fully implemented with React Hook Form + Zod validation, success/error states, reduced motion support
- No home wrapper needed

**Homepage is now fully wired — all sections 02–12 + both CTA banners are rendering with placeholder data. All content will be swapped to Sanity fetches in Stage 4.**

**Homepage Cohesion Audit (completed):**

A full design consistency pass was applied across all homepage sections to enforce a unified vertical alignment spine, consistent heading treatment, animation rhythm, and CTA button language. Changes:

- **Container width standardized to `max-w-6xl`** across all sections (Diagnosis, Industries, Success previously used `max-w-5xl`). Hero and Newsletter form content are narrower by design (`max-w-4xl` / `max-w-xl`) but sit inside the standard `max-w-6xl` outer container.
- **`SectionHeader` used everywhere** — FAQ and Newsletter now use the shared `SectionHeader` component instead of custom `<h2>` elements. This ensures all section headings share the same `TextReveal` animation, type scale (`text-3xl md:text-4xl lg:text-5xl`), and spacing (`mb-10 md:mb-14`). LiveFeedBento's internal sub-heading demoted from `<h2>` to `<h3>` since the real `<h2>` comes from the parent `LiveFeed` wrapper's `SectionHeader`.
- **Vertical padding standardized to `py-24`** on all sections. FAQ previously used `py-16 md:py-24`, Newsletter used `py-16 md:py-20`.
- **Horizontal padding standardized to `px-6`** everywhere. FAQ previously used `px-4 md:px-6`.
- **One CTA button system: `MovingBorderButton`** — replaced all plain `bg-brand-dark` / `bg-base-black` link/button CTAs with `MovingBorderButton` + `MagneticElement` in FAQ (CTA card), Newsletter (submit), and Testimonials (CTA carousel card). Every primary action button on the homepage now shares the same animated teal border, hover lift, and active scale.
- **Rogue backgrounds removed** — `SuccessAnimation` had `bg-bg-secondary` on both mobile and desktop views. `NewsletterCapture` had `bg-bg-tertiary`. Both removed. Homepage sections do not set their own backgrounds — backgrounds come from the layout system.
- **Scroll entrance animations added** to FAQ (each accordion item wrapped in `ScrollFadeUp` with staggered delay) and LiveFeed (`ScrollFadeUp` wrapping `LiveFeedBento`). Every content section now has a scroll entrance animation.
- **`SectionLabel`** remains an optional CMS-driven field on `SectionHeader`. No code change needed — when Sanity is wired, editors can add labels to any section. The component handles `label={undefined}` gracefully.

**Cohesion rules (enforce going forward):**

1. All homepage body sections use `max-w-6xl px-6` containers
2. All section headings use `SectionHeader` — never roll custom `<h2>` elements
3. All sections use `py-24` vertical padding (CTABanner is the only exception)
4. All primary CTA buttons use `MovingBorderButton` + `MagneticElement` — no plain links/buttons for primary actions
5. Alternating sections wrapped in `GlassSection` for visual separation (glass bg + backdrop-blur + border)
6. Every content section has a scroll entrance animation (`ScrollFadeUp`, `StaggerChildren`, or `StickyScroll`)

**Homepage Visual Fixes Phase 2 (completed):**

1. **Unicode escapes fixed** — `\u2019` and `\u2014` in JSX props replaced with actual Unicode characters (', —) across LiveFeed, Testimonials, FAQ, Newsletter.
2. **Navbar text visibility** — Nav links upgraded from `text-text-secondary` to `text-text-primary` for crisp contrast in both modes. Hover changed to `text-brand-mid`. Dropdown hover bg changed from opaque `bg-bg-tertiary` to `bg-glass-bg` for glass consistency.
3. **CanvasText simplified** — Removed zigzag SVG underline + arrow marker entirely. Component now renders gradient text only via `.highlight-text-gradient` CSS class. No more `variant` prop. Fixes "G" cut-off issue.
4. **SectionHeader `highlightedWord` prop** — New optional prop that splits the headline and wraps the matched word in `CanvasText` (teal gradient). Ready for Sanity CMS control.
5. **SocialProofPill removed from hero** — The "5+ years, 3 companies" pill is no longer rendered. Component remains in codebase for potential reuse.
6. **Lamp effect pushed below navbar** — Added `pt-20` to the gradient container so the conic gradient glow starts below the fixed navbar area.
7. **Glass alternating section backgrounds** — New `GlassSection` wrapper component (`bg-glass-bg backdrop-blur-sm border-y border-glass-border`). Applied to Diagnosis, Industries, Process, Testimonials, and LiveFeed sections for clear visual separation while keeping background grid visible.
8. **CTA Banner — 3 schemes only** — Removed `gradient` and `glass-light` color schemes. Renamed `glass-dark` to `glass`. Type updated to `"teal-solid" | "light-teal" | "glass"`. Default fallback changed to `glass`.
9. **SuccessAnimation viewport fit** — Desktop sticky panel changed from `items-center` to `items-start` with `pt-24`. Reduced SectionHeader margin, text sizes, and visual area min-height to prevent overflow on laptop screens.
10. **Newsletter glass card** — Content wrapped in a `rounded-3xl border border-glass-border bg-glass-bg backdrop-blur-md` card container, centered at `max-w-2xl` within the section.
11. **Footer text visibility + logo animation** — Column headers upgraded from `text-text-tertiary` to `text-text-secondary`. Links from `text-text-secondary` to `text-text-primary`. Fog wordmark wrapped in `ScrollFadeUp` for scroll-reveal animation.
12. **Sticky scroll spacing** — Pin distance reduced from `items.length * 100` to `items.length * 80` for tighter scroll feel in Services and Process sections.

**Homepage Visual Fixes Phase 3 (completed):**

1. **Highlighted words now visible in all section headers** — `TextReveal` (SplitText) was destroying `CanvasText` wrapper spans. Fix: added `highlightedWord` prop to `TextReveal`. After SplitText creates word spans, matching words get the `highlight-text-gradient` CSS class applied directly. Every section header now correctly shows teal gradient text on the highlighted word.
2. **`highlightedWord` applied to all sections** — Diagnosis ("isn't working"), Services ("growth engine"), Industries ("accelerate"), Success ("Success"), Process ("It Works"), Case Studies ("numbers"), Testimonials ("clients"), FAQ ("Questions"), LiveFeed ("Up To"), Newsletter ("growth"), CTABanners (via `CTABannerData.highlightedWord`).
3. **LinkPreview SVG underline+arrow removed** — The zigzag SVG path and arrow marker inside `LinkPreview` component deleted. Links now render as plain teal text with hover color change only.
4. **"See everything" arrow removed** — The `→` HTML entity removed from the LiveFeedBento "See everything" link.
5. **Testimonials GlassSection removed** — `GlassSection` wrapper caused visible border corners around the testimonial marquee grid, breaking the smoke-cloud blending effect. Wrapper removed; testimonials section now blends seamlessly into background again.
6. **Services bottomCta replaced with CTABanner** — The inline `BottomCtaStrip` text ("Need the right mix…") removed from `SERVICES_DATA.bottomCta`. Replaced with a proper `<CTABanner presentationMode="inline" colorScheme="teal-solid">` after the Services section for consistent CTA treatment.
7. **Arrow SVGs removed from sticky-scroll links** — "Learn More" links in both desktop and mobile StickyScroll panels no longer show arrow icons.
8. **CTABanner scroll animation** — `ScrollFadeUp` added inside `CTABanner` component itself, so every CTA banner on the site gets a scroll entrance animation automatically.
9. **GlassSection simplified** — Removed `backdrop-blur-sm` which created stacking context issues breaking GSAP pinning. Now uses `bg-bg-secondary/50 border-y border-glass-border` for subtle visual separation without blur interference.
10. **CanvasText overflow fix** — Changed from `inline-block` to `inline` to prevent descender clipping on letters like "g", "y", "p".

**Homepage Visual Fixes Phase 3b (completed):**

1. **Inline CTA banner simplified** — Removed `subCopy` from the Services inline CTA. Combined headline+description into single impactful line: "Dev, marketing, and automation in one growth system — built for your stage." with "growth system" highlighted.
2. **CTA banner placement rearranged** — Removed CTA banners from around Testimonials (Testimonials has built-in CTA, FAQ has built-in CTA). New layout: Growth Audit CTA before Case Studies, Consultation CTA after Newsletter (very bottom).
3. **Text clipping fixed globally** — After GSAP SplitText creates word/char/line wrapper divs, `overflow: visible` is now forced on all of them. Fixes "G" cut-off in newsletter and any other letter clipping.
4. **Testimonial grid blending improved** — Grid now renders full-width (no horizontal padding) by breaking out of the `max-w-6xl` container. Fog overlay gradients strengthened: tighter radial gradient, aggressive left/right edge fades (8%/92%), increased backdrop-blur to 3px.

**Homepage Visual Fixes Phase 3c (in progress):**

1. **Text clipping deep fix** — The `overflow: visible` JS fix alone wasn't enough. Root cause: `background-clip: text` on `.highlight-text-gradient` clips the gradient to the text bounding box, which excludes descenders. Multi-layered CSS fix applied:
   - `[data-text-reveal]` and all child `div`/`span`: `overflow: visible !important` + `line-height: 1.2 !important`
   - `.highlight-text-gradient`: `padding-bottom: 0.2em; margin-bottom: -0.2em; box-decoration-break: clone; transform: translateY(0.05em);` — extends gradient background area below baseline for descenders (g, y, p, q)
   - JS runtime: forces `overflow: visible` on the text element itself AND all descendant wrappers after SplitText runs
2. **Testimonial background cards blended** — `GridCard` changed from `border-glass-border bg-bg-secondary` (opaque, visible rectangles through blur) to `border-white/[0.04] bg-white/[0.03]` (nearly invisible, dissolves into fog)

**Updated cohesion rules:**
- `GlassSection` stays on Diagnosis, Industries, Process, LiveFeed — NOT on Testimonials (needs blending)
- All linked text uses plain color styling — no SVG underlines or arrows anywhere
- Every `SectionHeader` should receive `highlightedWord` for the teal gradient accent
- `CTABanner` has built-in `ScrollFadeUp` — no external wrapper needed
- CTA banners should not sandwich sections that already have built-in CTAs
- Inline CTA banners: headline only, no subCopy — keep the text large and impactful
- Text clipping: every `[data-text-reveal]` element gets `overflow: visible` + generous `line-height` globally via CSS; `.highlight-text-gradient` has padding to extend gradient below baseline

**Growth Audit page — `/audit` (completed + visual fixes):**

Full sales page at `src/app/audit/page.tsx` with 13 sections. Page renders as `<>` fragment (no `<main>` wrapper) — layout grid background shows through correctly, matching homepage pattern.

- **Section 01 — Hero** (`components/audit/AuditHero/`) — `LampContainer` glow, headline with `CanvasText` highlighted word ("holding"), sub-statement with `ScrollFadeUp`. Price + primary CTA + secondary link wrapped in glassmorphism card (`border-glass-border bg-glass-bg backdrop-blur-md`). `MovingBorderButton` → Stripe. Secondary link uses `text-brand-mid` inline style. `ScrollCue` bottom-right linking to `#case-studies`. No teal label — removed per feedback.
- **Section 02 — Who It's For** — `SectionHeader` + `AnimatedList` (new `ui/animated-list.tsx`) for scroll-triggered reveal of qualifier items. Each item: glassmorphism pill with teal `Check` icon. Items animate in one-by-one on scroll (motion/react `useInView`).
- **Section 03 — What We Look At** — 3-col grid. `ServiceLottie` replaces Lucide icons in the icon position (`h-12 w-12`). No duplicate icons. Wrapped in `GlassSection`.
- **Section 04 — What You Get** — 2×2 grid. Lucide icons via `ICON_MAP` for deliverables.
- **Section 05 — How It Works** — 3-step timeline. Step circles use `bg-bg-secondary` (correct for GlassSection context). Wrapped in `GlassSection`.
- **Section 06 — What We've Found** — `AnimatedList` for scroll-triggered reveal. Each finding: `blockquote` with glass border, left teal accent border, `hover:scale-[1.02]` interactivity, quote marks wrapping text.
- **Section 07 — Pricing** (`components/audit/AuditPricing/`) — Buttons fixed: `as={Link}`, `variant="default"` for highlighted tier, `variant="inverted"` for others. Matches CTABanner button style exactly.
- **Section 08 — Case Studies** — Reuses `CaseStudiesSection` from homepage with same placeholder data. `id="case-studies"` for ScrollCue target.
- **Section 09 — Industries** — Reuses `IndustriesGrid` from homepage. Wrapped in `GlassSection`.
- **Section 10 — Testimonials** — Reuses `HomeTestimonials` from homepage.
- **Section 11 — FAQ** — `FAQAccordion` with audit-specific Q&A.
- **Section 12 — Newsletter** — Reuses `NewsletterCapture` from homepage.
- **Section 13 — Final CTA** — `CTABanner` teal-solid section.

*New component:* `AnimatedList` (`components/ui/animated-list.tsx`) — scroll-triggered item reveal using `motion/react` `useInView`. Respects `prefers-reduced-motion`. Accepts `items: ReactNode[]`, `staggerDelay`, `className`.

*Types added:* `AuditHeroData`, `AuditQualifierData`, `AuditScopeColumn`, `AuditScopeData`, `AuditDeliverable`, `AuditDeliverablesData`, `AuditProcessStep`, `AuditProcessData`, `AuditFinding`, `AuditFindingsData`, `AuditPricingTier`, `AuditPricingData`, `AuditSeoData`, `AuditPageData` — all in `src/lib/types.ts`.

*Metadata:* `generateMetadata` async export with title/description/openGraph. JSON-LD `Service` schema.

*Components exported from barrel file:* `AuditHero`, `AuditPricing`, `AuditFindings`, `AuditProcess`, `AnimatedList`.

**Growth Marketing page — `/services/marketing` (completed):**

Full 10-section sales funnel at `src/app/services/marketing/page.tsx`. Fragment wrapper (layout provides `<main>`).

- **Section 01 — Hero** (`components/shared/ServiceHero/`) — shared service hero with `LampContainer`, `CanvasText` highlighted word, dual `MovingBorderButton` CTAs (Book Consultation + Get Audit), `ScrollCue` linking to `#sub-services`.
- **Section 02 — The Problem** — 3 pain-point pills with `AnimatedList` scroll-reveal. Narrow `max-w-3xl` layout.
- **Section 03 — What's Covered** (`components/shared/SubServicesGrid/`) — 2×3 responsive card grid. Each card: `ServiceLottie` icon (large, centered), title, description, glassmorphism styling, hover border + shadow. `StaggerChildren` entry. Wrapped in `GlassSection`. Sub-services: AEO, SEO, Paid Ads, Content Strategy, CRO, Analytics & Tracking.
- **Section 04 — Who It's For** — qualifier bullets with teal Check icons in glass pills, `AnimatedList` scroll-reveal.
- **Section 05 — How We Work** — Reuses `AuditProcess` GSAP timeline (3 steps with line-draw, circle pop-in, hover interactivity). Wrapped in `GlassSection`.
- **Section 06 — Results** — Reuses `CaseStudiesSection`. Marketing-filtered case studies.
- **Section 07 — Testimonials** — Reuses `HomeTestimonials`. Marketing-specific quotes.
- **Section 08 — Banner CTA** — `CTABanner` inline, `colorScheme="light-teal"`, → `/audit`.
- **Section 09 — FAQ** — `FAQAccordion` with 5 marketing-specific Q&A including AEO explanation.
- **Section 10 — Final CTA** — `CTABanner` section, `colorScheme="teal-solid"`, → `/start`.

*New shared components:* `ServiceHero` (reusable for all service pages), `SubServicesGrid` (2×3 card grid with Lottie icons).

*Types added:* `ServicePageHeroData`, `ServiceProblemData`, `SubServiceItem`, `SubServicesData`, `ServiceQualifierData`, `ServiceProcessStep`, `ServiceProcessData`, `MarketingPageData` — all in `src/lib/types.ts`.

*Metadata:* `generateMetadata` with title/description/openGraph. JSON-LD `Service` schema.

*Components exported from barrel file:* `ServiceHero`, `SubServicesGrid`.

---

## 4. DESIGN SYSTEM

### Colour Palette — "Aqua Authority"
```css
--color-light:   #aeeeee   /* light teal — backgrounds, subtle fills */
--color-mid:     #5ab1b1   /* mid teal — accents, highlights, secondary CTAs */
--color-dark:    #2b7575   /* deep teal — primary actions, strong headings */
--color-black:   #0a0a0a   /* near-black — dark backgrounds, dark mode base */
--color-white:   #f8f8f8   /* off-white — light mode base */
```

Tailwind config extension:
```js
colors: {
  brand: {
    light: '#aeeeee',
    mid: '#5ab1b1',
    dark: '#2b7575',
  },
  base: {
    black: '#0a0a0a',
    white: '#f8f8f8',
  }
}
```

### Typography
- **Headings:** General Sans
- **Body:** Gambetta
- Both loaded via `next/font` — no Google Fonts `<link>` tags
- **Code/terminal sections:** JetBrains Mono or Fira Code (monospace)
- Clear modular type scale — no arbitrary font sizes

### Theme
- Dark mode first
- Glassmorphism aesthetic — frosted glass cards, backdrop blur, transparency layers
- No solid white card backgrounds — use translucent panels
- High contrast text on dark backgrounds
- Teal gradient only where it reinforces brand palette

### Animation Principles
- GSAP ScrollTrigger for scroll-driven reveals and sticky panel transitions
- Aceternity UI for the "What Success Looks Like" section
- React Bits for micro-interactions
- Lottie for icon-level animations
- All animations must respect `prefers-reduced-motion`
- Homepage animations restrained — Section 06 (Success) does the heavy lifting

### Component Philosophy
- Build once, reuse everywhere via CMS
- Shared components live in `/components/shared/`
- CMS drives content — no data = component returns null

---

## 5. SITE ARCHITECTURE

### Navigation Structure
```
Logo | Services ▾ | Industries ▾ | Work | The Lab | Resources | The Brains
                                                          [Book a Consultation]

Services dropdown (CMS-driven):
- Web Development → /services/development
- Growth Marketing → /services/marketing
- AI & Automation → /services/ai
- ── separator ──
- Growth Audit (highlighted) → /audit

Industries dropdown (CMS-driven — auto-updates when new industry added in Sanity):
- SaaS → /industries/saas
- B2B Lead Gen → /industries/b2b
- AI & Tech Startups → /industries/ai-tech
- FinTech → /industries/fintech
```

### Full Page Inventory

| # | Page | Route | Type |
|---|---|---|---|
| 01 | Homepage | `/` | Static + CMS |
| 02 | Growth Audit | `/audit` | Static + CMS |
| 03 | Marketing Service | `/services/marketing` | Static + CMS |
| 04 | Development Service | `/services/development` | Static + CMS |
| 05 | AI & Automation Service | `/services/ai` | Static + CMS |
| 06 | Automations Catalogue | `/automations` | CMS-driven |
| 07 | Individual Automation | `/automations/[slug]` | CMS template |
| 08 | Qualifying Form | `/start` | Static |
| 09 | Consultation Confirmed | `/start/confirmed` | Static |
| 10 | Audit Confirmed | `/audit/confirmed` | Static |
| 11 | Case Study Hub | `/work` | CMS-driven |
| 12 | Individual Case Study | `/work/[slug]` | CMS template |
| 13 | The Lab Hub | `/lab` | CMS-driven |
| 14 | Individual Blog Post | `/lab/[slug]` | CMS template |
| 15 | Resources Hub | `/resources` | CMS-driven |
| 16 | Individual Resource | `/resources/[slug]` | CMS template |
| 17 | Industry: SaaS | `/industries/saas` | CMS template |
| 18 | Industry: B2B Lead Gen | `/industries/b2b` | CMS template |
| 19 | Industry: AI & Tech | `/industries/ai-tech` | CMS template |
| 20 | Industry: FinTech | `/industries/fintech` | CMS template |
| 21 | The Brains (About) | `/about` | Static + CMS |
| 22 | Privacy Policy | `/privacy` | Static |
| 23 | Terms of Service | `/terms` | Static |
| 24 | 404 | `/not-found` | Static |

---

## 6. HOMEPAGE — `/`

**Goal:** Full awareness → consideration → conversion → retention funnel in one page. A visitor who only sees this page must have enough to take action.
**Primary CTA:** Book a Free Consultation → `/start`
**Secondary CTA:** Get a Growth Audit → `/audit`

---

### Section 01 — Navigation
- Logo left, nav links centre, CTA button right
- CTA button: "Book a Consultation" → `/start`
- All nav items and dropdown content CMS-driven

---

### Section 02 — Hero
**Layout:** Full viewport height. Dark background.

**Components (all CMS-driven):**
- Social proof pill — e.g. "5+ years · 3 companies · Dev + Marketing + AI" — text editable in Sanity
- Display headline — large, bold, outcome-led
- Sub-statement — 1–2 lines
- Primary CTA button: "Book a Free Consultation" → `/start`
- Secondary CTA button (outlined): "Get a Growth Audit" → `/audit`
- Circular scroll cue — rotating "EXPLORE OUR WORK" text + down arrow. Decorative only. No decision weight.

**Notes:**
- No photo of founder in hero
- No logo strip in hero — logos appear only inside testimonial and case study cards

---

### Section 03 — The Diagnosis
**Purpose:** Make the visitor feel understood before being sold to.
**Layout:** 2×2 card grid. CMS controls number of cards AND layout style. Sanity field `layoutStyle` allows switching between 2×2 grid, 3-column, or single column without code change.

**CMS fields per card:**
- Icon
- Headline
- Body text

**No hardcoded card content.** All four cards populated from Sanity.

**Implementation note:** Use shared `GrowveloperCard` (`variant="diagnosis"`) for this section.

---

### Section 04 — What We Can Do For You
**Layout:** Shared sticky-scroll reveal system.
**Behaviour:** Left visual stays pinned while the active service panel on the right drives the visual swap and playback.
**Three service pillars — one per panel.**

Each panel (CMS-driven):
- Step number
- Pillar name
- Outcome statement / description
- Sub-services list (array in Sanity)
- CTA label + destination
- Lottie animation path with fallback gradient

**Implementation note:** This section now uses the same shared sticky-scroll system as Section 07, with GSAP pinning and active-step synchronisation already implemented in the repo.

**Row 1:** Web Development → `/services/development`
**Row 2:** Growth Marketing → `/services/marketing`
**Row 3:** AI & Automation → `/services/ai`

**Bottom CTA:**
- Optional shared bottom CTA block is supported below the sticky panels
- CMS-driven headline, description, CTA label, CTA URL

---

### Section 05 — Who We Work With
**Layout:** 2×2 industry cards + 1 "Sound like you?" CTA card (5 total).

**Industry cards (CMS-driven):**
- Industry name
- Hook line
- Link → industry silo page

**Implementation note:** Use shared `GrowveloperCard` (`variant="industry"`) for all industry cards.

**CTA card:**
- "Sound like you?" — brand teal background
- "Book a Consultation" → `/start`

**Implementation note:** Use shared `GrowveloperCard` (`variant="sound-like-you"`) for the CTA card.

**Responsive grid behaviour:**
- Mobile: single-column stack
- Tablet: 2-column grid
- Desktop: 3-column grid
- The CTA card must not leave dead space when it lands alone on a row
- On tablet, the CTA spans the full row when it would otherwise sit alone (`md:col-span-2`)
- On desktop, it fills the remaining grid space naturally based on how many CMS-driven industry cards exist

---

### Section 06 — What Success Looks Like
**Layout:** Full-width sticky dark panel. 5 scroll-triggered transition states via GSAP ScrollTrigger. Panel releases after all 5 states.

**States (code-driven animation — no CMS for this section):**
1. Development — Lighthouse score 0 → 100. Load time 8.2s → 0.9s
2. Development — Core Web Vitals turning green one by one
3. Growth Marketing — GA4 chart climbing. ROAS counter up
4. Growth Marketing — Content cited in AI search overview. Schema tag rendering
5. AI & Automation — Workflow nodes lighting up. Time saved counter ticking

**Notes:**
- Dark panel, code/terminal aesthetic, monospace font
- Small pillar label per state
- No real client data — animation is the proof
- Aceternity UI components + custom GSAP

---

### Section 07 — How It Works
**Layout:** Sticky scroll reveal — same shared system used in Section 04.
**Behaviour:** 4 steps lock into view as you scroll, with pinned visual area and active-step Lottie playback.

**Steps (CMS-driven):**
1. Audit
2. Architect
3. Build
4. Scale

Each step supports:
- Step number
- Title
- Description
- Optional Lottie animation path
- Optional fallback gradient

**Implementation note:** The earlier non-Lottie version has been replaced. The current build uses the same GSAP + Lottie sticky-scroll behaviour as Section 04.

---

### Section 08 — Case Studies
**Layout:** Full-width stacked cards (almost full-width within `max-w-6xl`). One card per row, vertical scroll. Works with 0, 1, or many cards.
**CMS-driven — section returns null if no case studies exist.**

**Card layout (desktop) — horizontal two-panel split:**
- Left side (55%): **Accent-colored panel** containing:
  - Result headline (large, bold, uppercase, heading font, accent-colored text)
  - Description (situation copy, 1–2 sentences)
  - Tech stack icons at bottom (logo images if CMS provides them, small text pill fallback if not)
- Right side (45%): Screenshot/video from CMS. `object-cover`, full height, subtle hover zoom. Dark teal gradient fallback if no media.
- Mobile: stacks vertically — content on top, media below.

**Card treatment:**
- `bg-bg-secondary` + glass border + subtle teal accent border
- Wrapped in `SpotlightCard` (brand teal radial spotlight on cursor)
- GSAP hover: `scale: 1.015`, teal border brightens to 0.8 opacity
- `prefers-reduced-motion` respected — no SpotlightCard wrapper, no GSAP
- Video plays on hover if `heroVideo` provided
- **Whole card is clickable** via overlay Link → `/work/[slug]`. No visible CTA text.

**Accent palette (theme-aware, code-driven brand system):**
- Use **only** the 3 brand teal variants already established in the design system
- `colorIndex 0` → light teal panel + dark text treatment
- `colorIndex 1` → mid teal panel + light text treatment
- `colorIndex 2` → dark teal panel + light teal text treatment
- Panels cycle by card order to keep variety while staying fully on-brand
- No lilac, gold, rose, slate, or other non-brand accents

**CMS fields per card:**
- Result headline
- Situation / description (1–2 sentences)
- Tech stack — array of tool name strings
- Tech stack logos — optional map of tool name → logo image URL
- Hero image (optional)
- Hero video (optional)
- Slug → `/work/[slug]`

**Implementation note:** Uses bespoke `CaseStudyCard` component (not `GrowveloperCard`). SpotlightCard from `ui/spotlight-card.tsx`.

---

### Banner CTA 1 — Growth Audit
**Placement:** After case studies.
**Presentation mode:** `section`
**Layout:** Full-width standalone conversion section.
**Sizing:** Strong and prominent, but vertically compact. Avoid oversized tall blocks.
**Styling:** Any highlighted word inside the headline must use a contrast-safe accent style based on the selected CTA colour variant. Do not reuse a one-size-fits-all global gradient if it reduces legibility.
**CMS-driven:** Headline, sub-copy, CTA label, destination, colour variant.
**Default destination:** `/audit`

---

### Section 09 — Testimonials
**Layout:** Centered testimonial carousel layered over a foggy testimonial background grid.
**CMS-driven — drops if no testimonials exist.**

**Background layer:**
- 4-column testimonial grid on desktop, 3-column on tablet, 2-column on mobile
- Background cards are intentionally hard to read: heavy radial fog mask + edge fades + subtle blur
- Background always feels dense even with a low CMS count by repeating testimonials to fill the background grid
- If 1 testimonial exists, it repeats to fill the grid
- If 2–3 testimonials exist, they repeat in sequence until the grid is full
- If many testimonials exist, the first set fills the visible background grid while the active card remains the focus

**Foreground carousel:**
- Single active rectangular card centered over the foggy grid
- Auto-advances every 4 seconds
- Pauses on hover
- GSAP slide transitions
- Respects `prefers-reduced-motion`

**Active card content:**
- Star rating
- Quote
- Avatar with initials fallback
- Name + role
- Company name and optional logo

**Navigation:**
- Dots only
- No name-pill navigation
- Active dot must remain clearly visible in both light and dark mode

**Final CTA slide:**
- "This could be you" / consultation CTA as the final carousel item
- Larger headline and larger button than the standard testimonial cards so the conversion target feels intentional

---

### Banner CTA 2 — Free Consultation
**Placement:** After testimonials.
**Presentation mode:** `section`
**Same CTA family as Banner CTA 1** — differentiate via CMS colour variant and copy, not a different component shape.
**Sizing:** Same compact section CTA proportions as Banner CTA 1.
**Styling:** Same contrast-safe highlighted word rule as Banner CTA 1.
**CMS-driven:** All copy, CTA label, destination, colour variant.
**Default destination:** `/start`

---

### Section 10 — FAQ
**Layout:** Accordion.
**CMS-driven** — questions and answers from Sanity. Page field on FAQ schema controls which page each FAQ appears on.

---

### Section 11 — What We're Up To (Live Feed)
**Layout:** Asymmetric bento grid. 3 latest items.
**CMS-driven — drops if no content exists.**

**Content types pulled from Sanity:**
- Blog posts
- YouTube videos (manually added via CMS — URL + thumbnail)
- TikTok videos (manually added via CMS — URL + thumbnail)

**Bento layout:**
- Item 1: featured card spanning 2 columns on desktop/tablet-sized bento layout
- Item 2: standard 1-column card
- Item 3: standard 1-column card
- Mobile: all cards stack in a single column; featured card loses its width advantage

**Card shape and interaction:**
- Uses Aceternity-style `BentoGrid` / `BentoGridItem` structure
- Top "header" region is the thumbnail area
- Bottom content region contains content-type icon, title, and meta row
- Bottom content region shifts horizontally on hover (`group-hover/bento:translate-x-2`)
- Wrapped in `SpotlightCard` with brand teal spotlight glow
- Hover shadow increases for extra depth

**Card styling:**
- Card backgrounds cycle through the same 3 theme-aware brand accent variants used by `CaseStudyCard`
- Matching foreground text is derived from each accent panel
- Content type pill is rendered inside the thumbnail header

**Content by type:**
- **Blog:** landscape thumbnail, Blog pill, title, date + read time, click → `/lab/[slug]`
- **YouTube:** landscape thumbnail, play overlay, YouTube pill, title, date, click → `VideoModal`
- **TikTok:** portrait-leaning thumbnail treatment, play overlay, TikTok pill, title, date, click → `VideoModal`

**Section header:**
- Section title from CMS
- "See everything →" link to `/lab`
- Link uses `LinkPreview` for hover preview treatment

**Video cards:** clicking opens a modal with embedded player. "Watch on YouTube/TikTok" link inside modal.

---

### Section 12 — Newsletter
**Layout:** Single full-width row.
**Content (CMS-driven):** Headline + sub-copy.
**Integration:** Mailchimp API.

---

### Section 13 — Footer
**Components (CMS-driven):**
- Logo
- Nav links
- Social links (LinkedIn, X, YouTube, TikTok)
- Legal links (Privacy, Terms)
- Final CTA button: "Book a Consultation" → `/start`
- Copyright line

---

## 7. GROWTH AUDIT PAGE — `/audit`

**Goal:** Get visitor to purchase the audit.
**Purchase flow:**
```
Read page → Click "Get the Audit" → Stripe payment → Intake form → Audit → Delivery → Walkthrough call
```
Payment = qualification. Intake form comes after payment, not before.

### Sections (all CMS-driven unless noted):

**01 — Hero**
- Page name + outcome statement
- "From $500" — price CMS-driven (update anytime)
- Primary CTA: "Get the Audit" → Stripe

**02 — Who It's For**
- Qualifier bullet list — CMS array

**03 — What We Look At**
- Three columns: Development review + Marketing review + AI & Automation review

**04 — What You Get**
- Diagnosis document
- Strategy deck
- Loom video walkthrough
- Notion roadmap
All CMS-driven — add or remove deliverables without code change.

**05 — How It Works**
- 3 steps: Pay & complete intake → We audit (3–5 days) → Delivery + walkthrough call

**06 — What We've Found**
- Anonymous findings from past client work
- CMS array — add new findings over time

**07 — Pricing**
- Price CMS-driven
- CTA: "Get the Audit" → Stripe
- Secondary link: "Not sure? Book a free consultation first." → `/start`

**08 — FAQ**
- CMS-driven accordion

**09 — Final CTA**
- CMS-driven headline + button → Stripe

---

## 8. SERVICE PAGES

All three service pages share identical funnel structure.

### Shared Section Order:
1. Hero — outcome statement. Dual CTA: Book Consultation + Get Audit
2. The problem — 2–3 sharp lines (CMS)
3. What's covered — sub-services with icons (CMS array)
4. Who it's for — qualifier bullets (CMS array)
5. How we work — 3–4 step process (CMS)
6. Results — CMS case study cards (drops if no data)
7. Testimonials — CMS-driven (drops if no data)
8. Banner CTA — "Not sure? Start with a Growth Audit" → `/audit`
9. FAQ — CMS-driven accordion
10. Final CTA — "Book your free consultation" → `/start`

### Reusable components across all service pages:
- **Micro CTA component** — single line + button. CMS-driven copy. Placed at strategic scroll points.
- **CTA Banner component** — one shared CTA family with 2 presentation modes:
  - `inline` — embeddable inside any section, wide pill-style banner; low-height and horizontal on desktop; default to headline + button without supporting sub-copy
  - `section` — full standalone conversion section between major page blocks
  - both modes should keep a tight vertical rhythm; never let the CTA block become unnecessarily tall
  - highlighted words inside CTA headlines must use scheme-aware accent styling so light and dark variants do not clash
  - colour variant always CMS-driven
- **"Sound like you?" card** — brand teal. CMS-driven copy. Used in industries section and elsewhere.

---

### Growth Marketing — `/services/marketing`

**Sub-services (CMS array):**
- AEO (AI Engine Optimisation) — lead this, it's the differentiator
- SEO
- Paid Ads (Google, Meta)
- Content Strategy
- CRO
- Analytics & Tracking (GA4, GTM)

---

### Web Development — `/services/development` ✅ BUILT (Stage 3 dummy data)

**Sub-services (CMS array):**
- Next.js performance builds
- Performance optimisation (Core Web Vitals, LCP)
- CMS setup (Sanity)
- GTM & GA4 implementation
- API integrations
- Ongoing maintenance

**Section order (13 sections):**
01 Hero → 02 StatsBand → 03 Problem (glass) → 04 SubServicesBento → 05 TechStackStrip (glass) →
06 AuditProcess → 07 BeforeAfterCompare (glass) → 08 CaseStudies → 09 Testimonials (glass) →
10 ServiceQualifiers → 11 FAQ (glass) → 12 CTABanner inline → 13 CTABanner section

**Additional section unique to dev page:**
Tech stack strip — logos of Next.js, Vercel, Tailwind, Sanity, GTM, GA4, TypeScript.
Placed after "What's Covered" (Section 05), wrapped in GlassSection.
Component: `src/components/development/TechStackStrip/index.tsx`

**New shared components created during this build (reusable on AI page and beyond):**
- `src/components/shared/ServiceProblem/index.tsx` — pain point list section (takes `ServiceProblemData`)
- `src/components/shared/ServiceQualifiers/index.tsx` — qualifier grid section (takes `ServiceQualifierData`)

**StatsBand and BeforeAfterCompare are now standard additions to all service pages.**
Glass/no-glass alternation applies across all service page sections.

---

### AI & Automation — `/services/ai`

**Two offers on one page — visually separated:**

**Offer 1: Done-For-You Automations**
- Pre-built and custom workflows
- Use cases (CMS array): lead scoring + CRM entry, automated reporting, AI chatbots, content pipelines, analytics alerts
- CTA: Browse Automations → `/automations` OR Book Consultation → `/start`

**Offer 2: AI Infrastructure (Custom)**
- For AI & Tech startups — complex builds
- No fixed price — consultation led
- CTA: Book Free Consultation → `/start`

**Tools strip (CMS array):** Make.com, n8n, Voiceflow, OpenAI API, Zapier, HubSpot

**Featured Automations component:**
- Card grid from CMS
- Name + what it does + price + CTA
- "View All Automations" → `/automations`
- Drops completely if no automations in CMS

---

## 9. THE BRAINS — `/about`

**Page name:** "The Brains"
**Tone:** Personal and human. Reads like a conversation not a CV.

### Sections (all CMS-driven):

**01 — Hero**
Full-width editorial photo of Juwon. Name + one-line identity. No CTA — trust first.

**02 — The Short Version**
3–4 sentences. CMS Portable Text.

**03 — The Story**
Narrative — the insight that dev and marketing can't be separated. CMS Portable Text.

**04 — Stat Strip**
CMS array of stat pairs (label + value). e.g. "5+ years / Started 2020 / Dev from 2021 / Marketing from 2022 / 3 companies"

**05 — Past Companies**
CMS array — company name + role + 1-line on what was built/learned.

**06 — How I Work**
3 principles. CMS array.

**07 — Skills + Tools**
Two columns. No skill bars.
Left: Disciplines (CMS array)
Right: Tools (CMS array)

**08 — Interests**
2–3 personal interests that connect to the work. CMS array.

**09 — Featured Work**
2–3 case study cards. Same component as homepage. CMS reference to case study documents.

**10 — CTA**
CMS-driven line + "Work with me" → `/start`

---

## 10. THE LAB — `/lab`

**Purpose:** Live content hub. Blog posts, YouTube videos, TikTok videos.

### Section Map:

**01 — Hero**
Page name + 1-line description. CMS-driven.

**02 — Featured Content**
1 large hero card — manually selected via Sanity `featuredToggle`. Drops if no featured item set.

**03 — Filter Bar**
Three pills: All · Blog · YouTube · TikTok
Active filter: brand teal highlight.
Default: All.
Filters are hardcoded (Blog, YouTube, TikTok) — not CMS-driven. New content types require a code change.

**04 — Content Feed**
Card grid — 3 columns.
CMS-driven. Drops if no content.

Each card:
- Thumbnail
- Platform tag (Blog / YouTube / TikTok)
- Title
- Date
- Read time (blog only)
- 1-line excerpt (blog only)

**Video cards:** clicking opens modal with embedded player + "Watch on YouTube/TikTok" link.
**Blog cards:** clicking → individual blog post page `/lab/[slug]`

**05 — Load More**
Button-triggered pagination. Not infinite scroll. Loads next batch.

**06 — Newsletter Capture**
Same component used site-wide. Mailchimp integration.

### Video content — Sanity schema:
```
title
platform (youtube / tiktok)
videoUrl
thumbnail (uploaded image)
description (short)
publishedAt
featuredToggle
```

Videos are added manually via CMS — no API auto-pull from YouTube or TikTok.

---

## 11. INDIVIDUAL BLOG POST — `/lab/[slug]`

### Section Map:

**01 — Post Header**
Title + Blog tag + publish date + estimated read time + social share buttons (X, LinkedIn, copy link)

**02 — Hero Image**
Full-width. CMS-driven.

**03 — Post Body**
Sanity Portable Text. Supports: headings, bold, links, inline images, blockquotes.

**04 — CTA Block**
CMS toggle (`showCTA` boolean) to show/hide per post.
If shown: "Working on something similar? Book a free consultation." → `/start`

**05 — Related Posts**
3 cards — auto-matched by tags/category. Same card component as Lab feed.
Drops if no related content exists.

**06 — Newsletter Capture**
Same component used site-wide.

### Sanity schema:
```
title
slug
excerpt
heroImage
body (Portable Text)
category
tags (array — drives related posts)
publishedAt
readTime (manual or auto-calculated)
featuredToggle
showCTA (boolean)
```

**Note on comments:** No comments section. Decision made to keep pages fast and clean. Revisit when there's genuine demand.

---

## 12. RESOURCES HUB — `/resources`

**Purpose:** Evergreen value. Guides, templates, frameworks, playbooks. Gated or paid downloads.

### Section Map:

**01 — Hero**
Page name + 1-line description. CMS-driven.

**02 — Category Filter Bar**
Filter pills — All + each category.
Categories pulled from Sanity — adding a new category automatically adds it to the filter bar.

**03 — Category Sections**
Resources grouped under bold category headings.
Card grid per category.
Drops if category has no resources.

**04 — Newsletter Capture**
Same component used site-wide.

### Resource card components:
- Cover image
- Category tag
- Resource type tag (Template / Guide / Framework / Playbook)
- Title
- 1-line description
- Access badge — "Free" (teal) or "Paid" (dark)
- CTA button: "Get it" (free) or "Buy" (paid) → individual resource page

---

## 13. INDIVIDUAL RESOURCE PAGE — `/resources/[slug]`

### Section Map:

**01 — Header**
Title + type tag + category tag + access badge

**02 — Cover Image**
Full-width.

**03 — What It Is**
2–3 sentences. CMS Portable Text.

**04 — What's Inside**
Bullet list. CMS array.

**05 — Preview**
Optional screenshots. CMS toggle (`showPreview` boolean). Drops if toggled off.

**06 — Who It's For**
Qualifier bullets. CMS array.

**07 — Download / Buy Block**
Design differs by access type:

**Free resource block:**
- "This is free. Drop your email and it's yours."
- Email input + submit button
- On submit → Mailchimp signup fires
- Success state → download button unlocks on same page
- File served from Sanity asset (PDF) or external URL (Notion link)

**Paid resource block:**
- Price displayed clearly (CMS-driven)
- "Buy now" → Stripe hosted checkout
- On payment success → redirect to confirmation page with download link
- Confirmation email sent automatically via Resend
- Download link expires after 48 hours

**08 — Related Resources**
3 cards from same category. Same card component as hub.
Drops if none exist.

### Sanity schema:
```
title
slug
description (Portable Text)
resourceType (Template / Guide / Framework / Playbook)
category
accessType (free / paid)
price (number — paid only)
coverImage
previewImages (array — optional)
whatsIncluded (array of strings)
whoItIsFor (array of strings)
fileAsset (Sanity file asset or external URL)
featuredToggle
publishedAt
showPreview (boolean)
```

---

## 14. CASE STUDY HUB — `/work`

### Section Map:

**01 — Hero**
"Work" or "Our Work" + 1-line. CMS-driven.

**02 — Filter Bar**
Industry pills — All + each industry.
Categories pulled from Sanity automatically.

**03 — Case Study Feed**
Full-width stacked rows. CMS-driven. Drops if no case studies.

**Card — full-width row:**
- Project hero image (full bleed, left)
- Client situation — 1 sentence (the problem before Growveloper)
- Result headline — bold, specific
- Industry tag
- Service tag — always "Development + Marketing"
- Tech stack pills
- "Read the full story" → `/work/[slug]`

**04 — CTA Block**
CMS-driven. "Want results like these?" + "Book a Free Consultation" → `/start`

---

## 15. INDIVIDUAL CASE STUDY — `/work/[slug]`

### Section Map:

**01 — Hero**
Project title + industry tag + service tag + hero image full bleed.

**02 — The Situation**
Client background + the problem. CMS Portable Text.

**03 — Metrics Strip**
3–4 key results. Animated counters on scroll.
CMS array — label + value pairs. e.g. "Conversion rate / 2×"

**04 — The Approach**
What Growveloper diagnosed and decided. Dev decisions + marketing decisions combined.
CMS Portable Text.

**05 — The Build**
What was built or implemented. Screenshots, campaign visuals supported.
CMS Portable Text with image support.

**06 — The Result**
Full outcome. CMS Portable Text.

**07 — Testimonial**
Client quote if available. Same testimonial card component.
Drops if no testimonial linked.

**08 — Tech Stack**
Logo strip — tools used. CMS array.

**09 — Next Case Study**
Single card → next case study. CMS reference.

**10 — CTA Block**
CMS-driven. → `/start`

### Sanity schema:
```
title
slug
clientIndustry
heroImage
situation (Portable Text)
metrics (array — label + value)
approach (Portable Text)
buildSection (Portable Text + images)
result (Portable Text)
testimonial (reference → Testimonial)
techStack (array of tool names/logos)
nextCaseStudy (reference → Case Study)
featured (boolean)
publishedAt
```

---

## 16. INDIVIDUAL AUTOMATION PAGE — `/automations/[slug]`

**Purpose:** Product page. Direct purchase or consultation booking.

### Section Map (all CMS-driven):

**01 — Hero**
Automation name + 1-line tagline + price (if fixed) + primary CTA

**02 — The Problem It Solves**
2–3 sentences. Plain language.

**03 — What It Does**
Numbered steps. CMS array.

**04 — What's Included**
Bullet list. CMS array.

**05 — Tools Used**
Logo strip. CMS array.

**06 — Setup Time**
Single stat — "Live in X days." CMS field.

**07 — Who It's For**
Qualifier bullets. CMS array.

**08 — CTA Block**
Two paths (controlled by `accessType`):
- Fixed price → Stripe payment
- Custom → "Book a consultation" → `/start`

**09 — FAQ**
3–4 questions. CMS array per automation.

**10 — Related Automations**
3 cards from same category. Drops if none.

### Sanity schema:
```
title
slug
tagline
problemStatement (Portable Text)
howItWorks (array of steps)
whatsIncluded (array)
toolsUsed (array)
setupTime
whoItIsFor (array)
accessType (fixed / custom)
price (number — fixed only)
category
featured (boolean)
faq (array — question + answer)
publishedAt
```

---

## 17. INDUSTRY SILO TEMPLATE — `/industries/[slug]`

**Single template. Four instances:** SaaS, B2B Lead Gen, AI & Tech, FinTech.
Adding a new industry in Sanity creates a new page + nav item automatically.

### Section Map (all CMS-driven):

**01 — Hero**
Industry-specific headline + sub-statement. Primary CTA: Book Consultation → `/start`

**02 — "This Is For You If..."**
4–5 industry-specific pain point bullets. CMS array.

**03 — How We Help**
3 service cards — industry-specific framing per card. CMS-driven copy per card.
Each links to its service page.

**04 — What Success Looks Like**
3 outcome stats for this industry. CMS array — label + value pairs.
Update with real data as it comes in.

**05 — Case Studies**
Filtered by industry tag. Same full-width stacked card component.
Drops completely if no case studies tagged for this industry.

**06 — Testimonials**
Filtered by industry tag. Same testimonial card.
Drops if none.

**07 — "Sound Like You?" Card**
Same reusable component. → `/start`

**08 — Industry FAQ**
4–5 industry-specific questions. CMS array.

**09 — Final CTA**
CMS-driven headline + button → `/start`

### Sanity schema:
```
industryName
slug
heroHeadline
heroSubStatement
painPoints (array)
serviceCards (array — title, description, link)
outcomeStats (array — label + value)
featuredCaseStudies (references — filtered by industry tag)
featuredTestimonials (references — filtered by industry tag)
faq (array — question + answer)
seoTitle
seoDescription
```

---

## 18. QUALIFYING FORM — `/start`

**Purpose:** Intake — not a filter. Payment elsewhere qualifies them. This gives Juwon context to prepare.
**Triggered by:** Every "Book a Consultation" CTA across the entire site.

### URL param pre-fill logic:
```
/start?service=marketing    → pre-selects Growth Marketing in Step 2
/start?service=development  → pre-selects Web Development
/start?service=ai           → pre-selects AI & Automation
/start?service=audit        → pre-selects Growth Audit
```

### Multi-step form:

**Step 1 — About You**
- Name
- Email
- Company / project name
- Website URL (optional)

**Step 2 — What You Need**
- "What are you looking to work on?" (multi-select checkboxes)
  - Web Development
  - Growth Marketing
  - AI & Automation
  - Growth Audit
  - Not sure yet — I need advice

**Step 3 — Your Situation**
- "What's the main problem you're trying to solve?" (text area)
- Monthly budget range (dropdown): Under $500 / $500–$2k / $2k–$5k / $5k+ / Not sure
- Timeline (dropdown): ASAP / 1–3 months / 3–6 months / Just exploring

**Step 4 — Confirm**
- Preferred contact method (Email / WhatsApp / Call)
- Additional context (optional text area)
- "Book my consultation" submit button

**On submit:**
- Form data emailed to Juwon via Resend
- Lead logged as Sanity document (CMS inbox)
- Redirect → `/start/confirmed`

---

## 19. CONSULTATION CONFIRMATION — `/start/confirmed`

**Sections:**

**01 — Success Message**
"You're in. Here's what happens next."

**02 — Next Steps**
1. Check your email for confirmation
2. We'll review your submission within 24 hours
3. You'll receive a calendar link to pick your slot

**03 — Calendar Embed**
Cal.com embed — book a slot immediately without waiting.

**04 — While You Wait**
2–3 resource or article cards from CMS. "Here's something useful while you wait." Drops if no content.

**05 — Soft CTA**
"Prefer to talk now?" WhatsApp or email link.

---

## 20. AUDIT PAYMENT CONFIRMATION — `/audit/confirmed`

**Sections:**

**01 — Success Message**
"Your audit is booked."

**02 — Complete Intake**
Link to intake form — separate from qualifying form. Gives Juwon info needed to conduct the audit.

**03 — What to Expect**
Delivery in 3–5 days. Package: Loom + Notion doc + walkthrough call.

**04 — Book Your Walkthrough**
Cal.com embed to book the walkthrough call in advance.

---

## 21. POPUP SYSTEM

**Critical rules:**
- No popup fires unless explicitly configured in Sanity for that page
- No data in CMS = no popup, ever
- No hardcoded default popup logic in code
- 7-day dismissal stored in localStorage
- One popup component in code — Sanity drives everything

**Sanity popup config schema (per page):**
```
pageReference (which page this config applies to)
enabled (boolean)
triggerType (scroll_depth / time_on_page / inactivity)
triggerValue (number — percentage, seconds, or idle seconds)
offerType (newsletter / lead_magnet / consultation / audit)
headline
subCopy
ctaLabel
ctaDestination (URL or action)
```

**Sanity Studio UX:** When creating a new popup config, the Studio prefills suggested values based on page type. These are suggestions only — fully overridable. Nothing is hardcoded.

**Trigger types:**
- `scroll_depth` — fires after X% scroll (e.g. 60)
- `time_on_page` — fires after X seconds on page
- `inactivity` — fires after X seconds of no scroll activity

---

## 22. LEAD CAPTURE FLOWS

### Flow 1 — Newsletter Signup (inline or popup)
```
Email input → Submit
→ Mailchimp API call
→ Success state: "You're in. Check your inbox."
→ If triggered from resource page → download unlocks immediately
```

### Flow 2 — Free Resource Download
```
Resource page → Click Download
→ Newsletter signup popup fires
→ Email input → Mailchimp signup
→ Success → download button unlocks on same page
→ File served from Sanity asset or external URL
```

### Flow 3 — Paid Resource Purchase
```
Resource page → Click Buy
→ Stripe hosted checkout
→ Payment success → Stripe webhook fires
→ Redirect to confirmation page with download link
→ Confirmation email sent via Resend
→ Download link expires after 48 hours
```

---

## 23. 404 PAGE — `/not-found`

**Sections:**
- Headline: "This page doesn't exist. But your growth problem does."
- 3 quick links: Homepage / Book a Consultation / Resources
- Latest 3 Lab posts from CMS (drops if none)

---

## 24. FULL CMS SCHEMA REFERENCE

### Case Study
```
title, slug, clientIndustry, heroImage, situation (Portable Text),
metrics (array — label + value), approach (Portable Text),
buildSection (Portable Text), result (Portable Text),
testimonial (reference), techStack (array), nextCaseStudy (reference),
featured (boolean), publishedAt
```

### Testimonial
```
quote, name, role, company, companyLogo, avatar, rating,
industry (tag — for industry silo filtering),
service (tag — for service page filtering),
featured (boolean)
```

### Blog Post
```
title, slug, excerpt, heroImage, body (Portable Text),
category, tags (array), publishedAt, readTime,
featuredToggle, showCTA (boolean)
```

### Video (Lab)
```
title, platform (youtube/tiktok), videoUrl,
thumbnail, description, publishedAt, featuredToggle
```

### Resource
```
title, slug, description (Portable Text), resourceType,
category, accessType (free/paid), price, coverImage,
previewImages (array), whatsIncluded (array),
whoItIsFor (array), fileAsset, featuredToggle,
publishedAt, showPreview (boolean)
```

### Automation
```
title, slug, tagline, problemStatement (Portable Text),
howItWorks (array), whatsIncluded (array), toolsUsed (array),
setupTime, whoItIsFor (array), accessType (fixed/custom),
price, category, featured (boolean), faq (array), publishedAt
```

### Industry Page
```
industryName, slug, heroHeadline, heroSubStatement,
painPoints (array), serviceCards (array),
outcomeStats (array), featuredCaseStudies (references),
featuredTestimonials (references), faq (array),
seoTitle, seoDescription
```

### FAQ
```
question, answer, page (which page it appears on — reference or string)
```

### Popup Config
```
pageReference, enabled (boolean), triggerType,
triggerValue (number), offerType, headline,
subCopy, ctaLabel, ctaDestination
```

### Navigation
```
serviceLinks (array — label + url), industryLinks (array — label + url),
ctaLabel, ctaUrl, socialLinks (array — platform + url)
```

### Site Settings
```
seoTitle (default), seoDescription (default),
ogImage (default), socialLinks, contactEmail,
whatsappNumber, newsletterHeadline, newsletterSubCopy
```

### Lead (form submissions inbox)
```
name, email, company, websiteUrl, servicesInterested (array),
problemStatement, budgetRange, timeline,
preferredContact, additionalContext, submittedAt
```

---

## 25. SEO & AEO ARCHITECTURE

- Every article starts with a 3-sentence `executiveSummary` field — optimised for LLM scraping (Perplexity, SearchGPT, ChatGPT)
- `generateMetadata` function required on every page — pulls from Sanity site settings
- Schema markup (JSON-LD) injected per page:
  - `TechnicalArticle` — Lab articles
  - `CaseStudy` — Case study pages
  - `SoftwareApplication` — Automation product pages
  - `Organization` — Site-wide
  - `Person` — The Brains page
  - `Service` — Service pages
- Sitemap auto-generated from all CMS-driven routes
- Open Graph + Twitter card meta on every page
- Canonical URLs on all pages

---

## 26. TRACKING SETUP

- GTM loaded via `next/script` with `strategy="afterInteractive"`
- Never call `window.dataLayer` directly — use `/lib/analytics.ts` helper
- All CTA buttons fire `cta_click` with `{ page, cta_label, destination }`
- Form steps fire `form_start` on mount, `form_complete` on submit
- Stripe payment success fires `purchase` event with `{ item, value, currency }`
- Resource download fires `download` event with `{ resource_title, access_type }`

**GA4 events:**
```
cta_click — every CTA button
form_start — qualifying form opened
form_complete — qualifying form submitted
audit_purchase — Growth Audit payment
resource_purchase — paid resource payment
resource_download — free resource downloaded
newsletter_signup — any Mailchimp signup
scroll_depth — 25/50/75/100% per page
video_play — any video opened in modal
popup_shown — popup displayed
popup_dismissed — popup closed without action
popup_converted — popup CTA clicked
```

---

## 27. PERFORMANCE TARGETS

| Metric | Target |
|---|---|
| LCP | < 1.0s |
| Lighthouse Performance | 100 |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | 95+ |
| Core Web Vitals | All green |

- All images via `next/image` — WebP, lazy loading, explicit dimensions
- `priority` prop only on hero/above-fold images
- Fonts via `next/font` only
- Lazy load below-fold heavy components via `dynamic()`
- Tailwind purge in production
- Edge deployment on Vercel

---

## 28. FOLDER STRUCTURE

```
/app
  /page.tsx
  /audit
    /page.tsx
    /confirmed/page.tsx
  /services
    /marketing/page.tsx
    /development/page.tsx
    /ai/page.tsx
  /automations
    /page.tsx
    /[slug]/page.tsx
  /start
    /page.tsx
    /confirmed/page.tsx
  /work
    /page.tsx
    /[slug]/page.tsx
  /lab
    /page.tsx
    /[slug]/page.tsx
  /resources
    /page.tsx
    /[slug]/page.tsx
  /industries
    /[slug]/page.tsx
  /about/page.tsx
  /privacy/page.tsx
  /terms/page.tsx
  /not-found.tsx

/components
  /shared
    /Navigation.tsx
    /Footer.tsx
    /CTABanner.tsx
    /MicroCTA.tsx
    /SoundLikeYouCard.tsx
    /CaseStudyCard.tsx
    /TestimonialCard.tsx
    /NewsletterCapture.tsx
    /Popup.tsx
    /VideoModal.tsx
    /SectionLabel.tsx
    /LoadMore.tsx
  /home
    /Hero.tsx
    /DiagnosisCards.tsx
    /ServicesAlternating.tsx
    /IndustriesGrid.tsx
    /SuccessAnimation.tsx
    /ProcessSteps.tsx
    /LiveFeed.tsx
  /forms
    /QualifyingForm
      /Step1.tsx
      /Step2.tsx
      /Step3.tsx
      /Step4.tsx
      /index.tsx
  /animations
    /LighthouseCounter.tsx
    /ChartClimb.tsx
    /WorkflowAnimation.tsx
    /MetricsCounter.tsx

/lib
  /sanity
    /client.ts
    /queries.ts
    /schemas/
  /analytics.ts
  /mailchimp.ts
  /stripe.ts
  /types.ts
  /utils.ts
  /constants.ts

/public
  /fonts
  /images

/styles
  /globals.css
```

---

## 29. ENVIRONMENT VARIABLES

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA4_ID=
SENTRY_DSN=
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
MAILCHIMP_API_KEY=
MAILCHIMP_AUDIENCE_ID=
NEXT_PUBLIC_CALCOM_URL=
```

---

## 30. BUILD ORDER

Build in stages. Complete and review each stage before moving to the next.

| Stage | What to build |
|---|---|
| 1 | Foundation — repo, design tokens, typography, layout shell (Nav + Footer), `.windsurfrules` in root |
| 2 | Homepage — all 13 sections, GSAP setup, Success animation, responsive |
| 3 | Core service pages — Audit, Marketing, Development, AI |
| 4 | Sanity CMS — all schemas, Studio config, GROQ queries, wiring to pages |
| 5 | Supporting pages — The Brains, Qualifying form + confirmations, Automations catalogue + product pages |
| 6 | The Lab + Resources — blog post page, video modal, resource page, download flows, Mailchimp + Stripe integration |
| 7 | Case study hub + individual pages |
| 8 | Industry silo template — single template, 4 instances, dynamic routing |
| 9 | Popup system — component + Sanity config wiring |
| 10 | Tracking + performance — GTM/GA4 events, server-side GTM, schema markup, Sentry, Lighthouse 100 |
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

---

## 32. CURRENT QA / TEST PAGE COVERAGE — `/test`

`/test` is the living visual QA route for the shared system. When major shared components or animation patterns change, this route should be kept in sync.

### Current showcased sections

**01 — Navigation preview**
- Shared `Navigation` component mounted at the top of the page
- Used to review fixed navbar behaviour and light/dark theme switching

**02 — Lamp hero**
- `LampContainer`
- `CanvasText`
- `MagneticElement`
- `MovingBorderButton`

**03 — Grid background**
- `GridBackground`
- `TextReveal`
- `ScrollFadeUp`

**04 — Text animation coverage**
- `TextReveal` with word, character, and line splits

**05 — CanvasText coverage**
- Gradient, underline, and combined highlight modes

**06 — Link preview coverage**
- `LinkPreview` hover-card behaviour with static preview images

**07 — Entrance / motion coverage**
- `StaggerChildren`
- `CountUp`
- `ParallaxSection`
- `MagneticElement`
- `LineReveal`

**08 — Hero support components**
- `SocialProofPill`
- `ScrollCue`

**09 — Homepage shared section components**
- `DiagnosisCard`
- `StickyScroll` for Section 04 (`What We Can Do For You`)
- `StickyScroll` for Section 07 (`How It Works`)
- `IndustryCard`
- `SoundLikeYouCard`
- `CaseStudyCard`
- `TestimonialGrid`
- `FAQAccordion`
- `LiveFeedCard`
- `VideoModal`

**10 — CTA banner system**
- `CTABanner` previewed in both current presentation modes:
  - `inline`
  - `section`
- Previewed across all current CTA colour variants:
  - `teal-solid`
  - `light-teal`
  - `glass-dark`
  - `glass-light`
  - `gradient`

**11 — GrowveloperCard matrix**
- All variants × all colour schemes rendered in a grid for visual QA
- Variants: `industry`, `diagnosis`, `resource`, `automation`, `sound-like-you`

**12 — Newsletter capture**
- `NewsletterCapture` with React Hook Form + Zod validation
- Default variant and `downloadUnlocks` variant
- Posts to `/api/newsletter` (Mailchimp integration)
- States: idle → loading → success (animated) or error (inline)

**13 — Popup system**
- `Popup` component with 3 trigger buttons for manual testing
- Offer types: `newsletter` (with inline email form), `consultation`, `audit`
- Desktop: centred glassmorphism modal with backdrop blur
- Mobile (<768px): bottom sheet with swipe-down dismiss
- 7-day localStorage dismissal (cleared on each test trigger)
- Respects `prefers-reduced-motion`

### Qualifying form (`/start`)
- `QualifyingForm` — 4-step multi-step form wired on the `/start` page
- Step 1: About You (name, email, company, website URL)
- Step 2: What You Need (multi-select service checkboxes, URL param pre-fill via `?service=`)
- Step 3: Your Situation (problem statement, budget range, timeline)
- Step 4: Confirm (preferred contact method, additional context)
- Per-step Zod validation blocks advancement until fields pass
- Desktop: numbered stepper; mobile: progress bar
- Submits to `POST /api/qualify` → Resend email + Sanity lead document
- Redirects to `/start/confirmed` on success
- `/start/confirmed` shows next steps, Cal.com booking link, WhatsApp link

### API routes added in Session A
- `POST /api/newsletter` — validates email, calls Mailchimp API (dev mode fallback if not configured)
- `POST /api/qualify` — validates lead payload, sends notification email via Resend, creates Sanity lead document

### Test page purpose

- Visual QA for shared systems before wiring final CMS data
- Review animation timing, theme behaviour, spacing, and interaction states
- Verify sticky-scroll Lottie swapping and CTA banner presentation modes
- Test popup trigger logic, newsletter form submissions, and form validation
- Preserve a single route where the current shared system state can be inspected quickly after large refactors

---

## PAGE COMPOSITION REFACTOR — Session Snapshot

### Accessibility: text-tertiary contrast fix
- Light mode `--text-tertiary`: `#7a7a7a` → `#595959` (~6.6:1 ratio vs `#f8f8f8`)
- Dark mode `--text-tertiary`: `#606060` → `#8a8a8a` (~5.7:1 ratio vs `#0a0a0a`)
- Both now pass WCAG AA minimum 4.5:1 for normal text

### ContentFilterBar redesign
- Replaced glass-border/transparent pills with branded filter buttons
- Active state: `border-brand-mid bg-brand-dark text-brand-light shadow-md`
- Inactive state: `border-brand-mid/25 bg-bg-secondary text-text-secondary` with brand hover
- Check icon now `text-brand-light` for contrast on dark background

### Industry pages (`/industries/[slug]`) — full restructure
- **Removed** `SubServicesGrid` for "How we help"
- **Added** `ServicesAlternating` (StickyScroll 3 pillars) — maps industry service cards to sticky scroll items with CTAs linking to service pages
- **Added** `ProcessSteps` (How It Works) — Audit → Architect → Build → Scale, industry-name aware descriptions
- **Added** `BeforeAfterCompare` — visual transformation proof with placeholder images
- **Added** `IndustriesGrid` — shows other industries (filters out current industry)
- **Added** `LiveFeed` (From The Lab) — blog/YouTube/TikTok content cards at bottom
- Section order: Hero → Pain Points → How We Help (StickyScroll) → How It Works → Before/After → Outcome Stats → Case Studies → Testimonials → Who It's For → Other Industries → Inline CTA → FAQ → Lab → Final CTA

### Work page (`/work`) — enriched from thin listing to full conversion page
- **Added** `ServicesAlternating` (What We Do — 3 pillars) after case study feed
- **Added** `ProcessSteps` (How It Works) in GlassSection
- **Added** `BeforeAfterCompare` — visual proof section
- **Added** `IndustriesGrid` (Industries We Accelerate) in GlassSection
- **Added** `LiveFeed` (From The Lab) — content section
- Section order: Hero + Filter + Case Studies → What We Do → How It Works → Before/After → Testimonials → Industries → Lab → CTAs

### Service pages (`/services/development`, `/services/marketing`, `/services/ai`) — bottom enrichment
- **Added** `IndustriesGrid` (Industries We Accelerate) in GlassSection after FAQ
- **Added** `LiveFeed` (From The Lab) after IndustriesGrid
- Existing CTAs moved below new sections

### Homepage (`/`) — added BeforeAfterCompare
- **Added** `BeforeAfterCompare` in GlassSection between Case Studies and Testimonials
- All other sections unchanged

### Reuse matrix (components now present across pages)

| Component | Homepage | Work | Industry | Dev | Marketing | AI |
|---|---|---|---|---|---|---|
| ServicesAlternating | ✅ | ✅ | ✅ | — | — | — |
| ProcessSteps | ✅ | ✅ | ✅ | — | — | — |
| BeforeAfterCompare | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| IndustriesGrid | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| LiveFeed | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SubServicesBento | — | — | — | ✅ | ✅ | ✅ |
| CaseStudiesSection | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| HomeTestimonials | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| FAQAccordion | ✅ | — | ✅ | ✅ | ✅ | ✅ |

### Build status
- `next build` passes — all 53 pages generated successfully
- CSS lint warnings for `@custom-variant`, `@theme`, `@apply` are false positives (valid Tailwind CSS v4 directives)

---

*This document is the build contract for Growveloper. Every section, component, route, CMS schema and flow is defined here. Do not make assumptions — if something isn't in this document, ask before building it.*