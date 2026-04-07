# About Page — Section Archetypes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle every section below the About hero so each has a visually distinct layout — breaking the repeated GrowveloperCard pattern and adding scroll-triggered interaction throughout.

**Architecture:** 5 existing components are fully restyled in place, 2 inline sections in `page.tsx` are rewritten. No new files created, no Sanity schema changes, no prop interface changes. Each task is independent and can be verified in isolation.

**Tech Stack:** Next.js App Router, Tailwind CSS v4, GSAP + ScrollTrigger (via `@/lib/gsap`), motion/react, TypeScript

---

## File Map

| File | Change |
|---|---|
| `src/components/about/AboutStatStrip/index.tsx` | Full restyle — remove glass cards, add GSAP count-up on scroll |
| `src/components/about/AboutCompanies/index.tsx` | Full restyle — replace GrowveloperCard with horizontal border-row layout |
| `src/components/about/AboutPrinciples/index.tsx` | Full restyle — replace GrowveloperCard grid with numbered stacked list |
| `src/components/about/AboutInterests/index.tsx` | Full restyle — replace GrowveloperCard grid with 2-col icon-led tiles |
| `src/components/about/AboutSkillsTools/index.tsx` | Heading only — replace SectionHeader with TextReveal |
| `src/app/about/page.tsx` | Rewrite Short Version + Story inline sections; swap SectionHeader → TextReveal |

---

## Task 1: Restyle AboutStatStrip — raw typographic numbers with count-up

**Files:**
- Modify: `src/components/about/AboutStatStrip/index.tsx`

- [ ] **Step 1: Replace the full file contents**

```tsx
"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { AboutStatItem } from "@/lib/types";

interface AboutStatStripProps {
  items: AboutStatItem[];
  id?: string;
}

function parseStatValue(value: string): { num: number; suffix: string } | null {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return { num: parseFloat(match[1]), suffix: match[2] };
}

function StatItem({ stat }: { stat: AboutStatItem }) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const parsed = parseStatValue(stat.value);

  useGSAP(() => {
    if (!valueRef.current || !parsed) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: parsed.num,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: valueRef.current,
        start: "top 85%",
        once: true,
      },
      onUpdate() {
        if (valueRef.current) {
          const display = Number.isInteger(parsed.num)
            ? Math.round(obj.val).toString()
            : obj.val.toFixed(1);
          valueRef.current.textContent = display + parsed.suffix;
        }
      },
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 px-4 py-6">
      <span
        ref={parsed ? valueRef : undefined}
        className="heading-font text-4xl font-extrabold leading-none text-brand-mid sm:text-5xl"
      >
        {stat.value}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
        {stat.label}
      </span>
      <div className="mt-1 h-0.5 w-6 rounded bg-brand-mid/60" />
    </div>
  );
}

export function AboutStatStrip({ items, id }: AboutStatStripProps) {
  if (!items || items.length === 0) return null;

  const count = items.length;
  const mdCols =
    count <= 2 ? "md:grid-cols-2" :
    count === 3 ? "md:grid-cols-3" :
    count === 4 ? "md:grid-cols-4" :
    "md:grid-cols-5";

  return (
    <section id={id} className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 ${mdCols}`}>
          {items.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors referencing `AboutStatStrip`.

- [ ] **Step 3: Commit**

```bash
git add src/components/about/AboutStatStrip/index.tsx
git commit -m "feat: restyle AboutStatStrip — raw typographic numbers with GSAP count-up"
git push origin main
```

---

## Task 2: Restyle AboutCompanies — horizontal border rows

**Files:**
- Modify: `src/components/about/AboutCompanies/index.tsx`

- [ ] **Step 1: Replace the full file contents**

```tsx
import Image from "next/image";
import { TextReveal } from "@/components/animations/TextReveal";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import type { AboutPastCompaniesData } from "@/lib/types";

interface AboutCompaniesProps {
  data: AboutPastCompaniesData | null;
}

export function AboutCompanies({ data }: AboutCompaniesProps) {
  if (!data) return null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <TextReveal
        as="h2"
        className="heading-font mb-10 md:mb-14 max-w-2xl text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl"
        splitType="words"
        highlightedWord={data.highlightedWord}
      >
        {data.headline}
      </TextReveal>

      <StaggerChildren>
        <div className="flex flex-col">
          {data.companies.map((co) => (
            <div
              key={co.company}
              className="flex flex-col gap-3 border-b border-glass-border py-5 last:border-b-0 sm:flex-row sm:items-center sm:gap-6"
            >
              {/* Logo */}
              <div className="w-14 flex-shrink-0">
                {co.logo ? (
                  <Image
                    src={co.logo}
                    alt={co.company}
                    width={56}
                    height={20}
                    className="h-5 w-auto object-contain logo-tint opacity-60"
                  />
                ) : (
                  <div className="h-5 w-12 rounded bg-brand-mid/20" />
                )}
              </div>

              {/* Name + Role */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-text-primary">{co.company}</p>
                <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-text-tertiary">
                  {co.role}
                </p>
              </div>

              {/* Insight */}
              <p className="text-sm leading-relaxed text-text-secondary sm:max-w-xs sm:text-right">
                {co.insight}
              </p>
            </div>
          ))}
        </div>
      </StaggerChildren>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors referencing `AboutCompanies`.

- [ ] **Step 3: Commit**

```bash
git add src/components/about/AboutCompanies/index.tsx
git commit -m "feat: restyle AboutCompanies — horizontal border rows, remove GrowveloperCard"
git push origin main
```

---

## Task 3: Restyle AboutPrinciples — numbered stacked list

**Files:**
- Modify: `src/components/about/AboutPrinciples/index.tsx`

- [ ] **Step 1: Replace the full file contents**

```tsx
import { ICON_MAP } from "@/lib/icons";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import type { AboutHowIWorkData } from "@/lib/types";

interface AboutPrinciplesProps {
  data: AboutHowIWorkData | null;
  id?: string;
}

export function AboutPrinciples({ data, id }: AboutPrinciplesProps) {
  if (!data) return null;

  return (
    <section id={id} className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <TextReveal
          as="h2"
          className="heading-font mb-12 max-w-2xl text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl"
          splitType="words"
          highlightedWord={data.highlightedWord}
        >
          {data.headline}
        </TextReveal>

        <div className="flex flex-col gap-10">
          {data.principles.map((p, i) => {
            const IconComponent = p.icon ? ICON_MAP[p.icon] : undefined;
            return (
              <ScrollFadeUp key={p.title} delay={i * 0.1}>
                <div className="flex items-start gap-6">
                  <span className="w-14 flex-shrink-0 font-serif text-5xl font-extrabold leading-none text-brand-mid/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      {IconComponent && (
                        <IconComponent
                          className="h-5 w-5 text-brand-mid"
                          strokeWidth={1.8}
                          aria-hidden
                        />
                      )}
                      <h3 className="text-lg font-bold text-text-primary">{p.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {p.description}
                    </p>
                  </div>
                </div>
              </ScrollFadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors referencing `AboutPrinciples`.

- [ ] **Step 3: Commit**

```bash
git add src/components/about/AboutPrinciples/index.tsx
git commit -m "feat: restyle AboutPrinciples — numbered stacked list, remove GrowveloperCard"
git push origin main
```

---

## Task 4: Restyle AboutInterests — 2-col icon-led tiles

**Files:**
- Modify: `src/components/about/AboutInterests/index.tsx`

- [ ] **Step 1: Replace the full file contents**

```tsx
import { ICON_MAP } from "@/lib/icons";
import { TextReveal } from "@/components/animations/TextReveal";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import type { AboutInterestsData } from "@/lib/types";

interface AboutInterestsProps {
  data: AboutInterestsData | null;
  id?: string;
}

export function AboutInterests({ data, id }: AboutInterestsProps) {
  if (!data) return null;

  return (
    <section id={id} className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <TextReveal
          as="h2"
          className="heading-font mb-10 max-w-2xl text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl"
          splitType="words"
          highlightedWord={data.highlightedWord}
        >
          {data.headline}
        </TextReveal>

        <StaggerChildren>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.items.map((item) => {
              const IconComponent = item.icon ? ICON_MAP[item.icon] : undefined;
              return (
                <div
                  key={item.interest}
                  className="flex items-start gap-4 rounded-xl border border-brand-dark/15 p-4"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-mid/15">
                    {IconComponent ? (
                      <IconComponent
                        className="h-5 w-5 text-brand-mid"
                        strokeWidth={1.8}
                        aria-hidden
                      />
                    ) : (
                      <span className="font-mono text-xs font-bold text-brand-mid">
                        {item.interest.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{item.interest}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">
                      {item.connection}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </StaggerChildren>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors referencing `AboutInterests`.

- [ ] **Step 3: Commit**

```bash
git add src/components/about/AboutInterests/index.tsx
git commit -m "feat: restyle AboutInterests — 2-col icon tiles, remove GrowveloperCard"
git push origin main
```

---

## Task 5: Update AboutSkillsTools — heading treatment only

**Files:**
- Modify: `src/components/about/AboutSkillsTools/index.tsx` (lines 1–11 and 63–72 only)

- [ ] **Step 1: Replace the SectionHeader import with TextReveal**

In `src/components/about/AboutSkillsTools/index.tsx`, replace:

```tsx
import { SectionHeader } from "@/components/shared/SectionHeader";
```

With:

```tsx
import { TextReveal } from "@/components/animations/TextReveal";
```

- [ ] **Step 2: Replace the SectionHeader usage in the JSX**

Find this block (around line 65):

```tsx
      <SectionHeader
        headline={data.headline}
        highlightedWord={data.highlightedWord}
        alignment="left"
        label={null}
        description={null}
      />
```

Replace with:

```tsx
      <TextReveal
        as="h2"
        className="heading-font mb-10 md:mb-14 max-w-2xl text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl"
        splitType="words"
        highlightedWord={data.highlightedWord}
      >
        {data.headline}
      </TextReveal>
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors referencing `AboutSkillsTools`.

- [ ] **Step 4: Commit**

```bash
git add src/components/about/AboutSkillsTools/index.tsx
git commit -m "feat: replace SectionHeader with TextReveal in AboutSkillsTools"
git push origin main
```

---

## Task 6: Rewrite Short Version + Story sections in page.tsx

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Update the imports block**

Find:

```tsx
import {
  GlassSection,
  CTABanner,
  SectionHeader,
  ScrollFadeUp,
  LineReveal,
} from "@/components";
```

Replace with:

```tsx
import {
  GlassSection,
  CTABanner,
  ScrollFadeUp,
  LineReveal,
  TextReveal,
} from "@/components";
```

- [ ] **Step 2: Rewrite the Short Version section**

Find this block (around line 156):

```tsx
      {/* 02 — The Short Version */}
      {shortVersion && (
        <section id="short-version" className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <SectionHeader
              headline={shortVersion.headline}
              highlightedWord={shortVersion.highlightedWord}
              alignment="left"
              label={null}
              description={null}
            />
            <ScrollFadeUp delay={0.15}>
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                {shortVersion.body}
              </p>
            </ScrollFadeUp>
          </div>
        </section>
      )}
```

Replace with:

```tsx
      {/* 02 — The Short Version */}
      {shortVersion && (
        <section id="short-version" className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <TextReveal
              as="h2"
              className="heading-font text-3xl font-extrabold leading-snug text-text-primary sm:text-4xl md:text-5xl"
              splitType="words"
              highlightedWord={shortVersion.highlightedWord}
            >
              {shortVersion.headline}
            </TextReveal>
            <ScrollFadeUp delay={0.25}>
              <p className="mt-6 text-base leading-relaxed text-text-secondary md:text-lg">
                {shortVersion.body}
              </p>
            </ScrollFadeUp>
          </div>
        </section>
      )}
```

- [ ] **Step 3: Rewrite the Story section**

Find this block (around line 177):

```tsx
      {/* 03 — The Story (glass) */}
      {story && (
        <GlassSection id="the-story">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            <SectionHeader
              headline={story.headline}
              highlightedWord={story.highlightedWord}
              alignment="left"
              label={null}
              description={null}
            />
            <div className="space-y-5">
              {story.body.map((para, i) => (
                <ScrollFadeUp key={i} delay={i * 0.1}>
                  <p className="text-base leading-relaxed text-text-secondary md:text-lg">{para}</p>
                </ScrollFadeUp>
              ))}
            </div>
          </div>
        </GlassSection>
      )}
```

Replace with:

```tsx
      {/* 03 — The Story (glass) */}
      {story && (
        <GlassSection id="the-story">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            <TextReveal
              as="h2"
              className="heading-font mb-10 max-w-2xl text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl"
              splitType="words"
              highlightedWord={story.highlightedWord}
            >
              {story.headline}
            </TextReveal>
            <div className="flex gap-6">
              <div className="w-0.5 flex-shrink-0 rounded bg-gradient-to-b from-brand-mid to-transparent" />
              <div className="space-y-5">
                {story.body.map((para, i) => (
                  <ScrollFadeUp key={i} delay={i * 0.1}>
                    <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                      {para}
                    </p>
                  </ScrollFadeUp>
                ))}
              </div>
            </div>
          </div>
        </GlassSection>
      )}
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 5: Verify dev build loads the about page**

```bash
npm run dev
```

Open `http://localhost:3000/about` and visually confirm:
- Short Version: large pull-quote heading + body paragraph below
- Story: teal left-accent bar running alongside paragraph stagger
- Stat Strip: plain numbers with teal underline, count-up fires on scroll
- Companies: horizontal rows with border separators, no cards
- Principles: oversized ghosted numbers (01/02/03) + title + description stacked
- Interests: 2-col icon-led tiles with lighter border
- Skills + Tools: heading style matches the rest (TextReveal instead of SectionHeader)
- Mobile (375px): companies stack vertically, interests go 1-col, principles readable

- [ ] **Step 6: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: rewrite Short Version + Story sections — pull-quote heading + teal accent bar"
git push origin main
```

---

## Final: Full build check

- [ ] **Run production build**

```bash
npm run build
```

Expected: build succeeds with no errors. Any TypeScript or import errors surface here if missed earlier.
