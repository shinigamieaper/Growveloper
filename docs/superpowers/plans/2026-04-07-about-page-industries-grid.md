# About Page — Industries Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the existing `IndustriesGrid` component into the about page with full Sanity CMS support — schema fields, GROQ query, and page rendering — so it appears between the Interests and Featured Work sections.

**Architecture:** Three targeted edits to three existing files. No new files, no new components. The `IndustriesGrid` component, `IndustriesGridData` type, and `industryPage` schema are already operational and untouched. The about page schema gets a new `industries` fieldset; the GROQ query gets the corresponding projection; the page file gets the import, data mapping, and JSX.

**Tech Stack:** Next.js App Router, Sanity (GROQ + schema), TypeScript

---

## File Map

| File | Change |
|---|---|
| `src/lib/sanity/schemas/aboutPage.ts` | Add `industries` fieldset + 7 fields + scroll cue option |
| `src/lib/sanity/queries.ts` | Add industries projection inside `getAboutPage()` |
| `src/app/about/page.tsx` | Add import, type, data mapping, and JSX section |

---

## Task 1: Add industries fieldset and fields to the aboutPage Sanity schema

**Files:**
- Modify: `src/lib/sanity/schemas/aboutPage.ts`

- [ ] **Step 1: Add the `industries` fieldset to the `fieldsets` array**

Open `src/lib/sanity/schemas/aboutPage.ts`. Find this line in the `fieldsets` array:

```ts
    { name: "caseStudies", title: "Featured Work", options: { collapsible: true, collapsed: true } },
```

Insert the industries fieldset **before** it:

```ts
    { name: "industries", title: "Industries", options: { collapsible: true, collapsed: true } },
    { name: "caseStudies", title: "Featured Work", options: { collapsible: true, collapsed: true } },
```

- [ ] **Step 2: Add the industries fields after the `interests` block**

Find this closing comment in the fields array:

```ts
    /* ── Featured Work ── */
```

Insert the full industries block **immediately before** that comment:

```ts
    /* ── Industries ── */
    defineField({ name: "industriesHeadline", title: "Industries Headline", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesHighlightedWord", title: "Industries Highlighted Word", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesDescription", title: "Industries Description", type: "text", fieldset: "industries" }),
    defineField({ name: "industriesCtaHeadline", title: "Industries CTA Headline", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesCtaLabel", title: "Industries CTA Label", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesCtaUrl", title: "Industries CTA URL", type: "string", fieldset: "industries", description: "e.g. /start" }),
    defineField({
      name: "industryCards",
      title: "Industry Cards",
      type: "array",
      fieldset: "industries",
      of: [defineArrayMember({ type: "reference", to: [{ type: "industryPage" }] })],
    }),

    /* ── Featured Work ── */
```

- [ ] **Step 3: Add "Industries" as a scroll cue target option**

Find the `heroScrollCueTargetId` field options list. It currently ends with:

```ts
          { title: "Featured Work", value: "featured-work" },
```

Add one more entry after it:

```ts
          { title: "Featured Work", value: "featured-work" },
          { title: "Industries", value: "industries" },
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/sanity/schemas/aboutPage.ts
git commit -m "feat(schema): add industries fieldset to aboutPage Sanity schema"
git push origin main
```

---

## Task 2: Add industries projection to the getAboutPage GROQ query

**Files:**
- Modify: `src/lib/sanity/queries.ts`

- [ ] **Step 1: Add the industries projection inside `getAboutPage()`**

Open `src/lib/sanity/queries.ts`. Inside the `getAboutPage()` function, find this line:

```groq
      interests[]{ icon, interest, connection },
```

Add the following block **immediately after** it (before `ctaHeadline`):

```groq
      interests[]{ icon, interest, connection },

      // Industries
      industriesHeadline,
      industriesHighlightedWord,
      industriesDescription,
      industriesCtaHeadline,
      industriesCtaLabel,
      industriesCtaUrl,
      industryCards[]->{ "icon": icon, "name": industryName, hookLine, "slug": slug.current, ctaLabel },
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/sanity/queries.ts
git commit -m "feat(query): add industries projection to getAboutPage GROQ query"
git push origin main
```

---

## Task 3: Render IndustriesGrid on the about page

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Add the `IndustriesGrid` component import**

Find this import line:

```tsx
import { CaseStudiesSection } from "@/components/home/CaseStudies";
```

Add the `IndustriesGrid` import immediately after it:

```tsx
import { CaseStudiesSection } from "@/components/home/CaseStudies";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
```

- [ ] **Step 2: Add `IndustriesGridData` to the type imports**

Find the existing type import block:

```tsx
import type {
  AboutHeroData,
  AboutShortVersionData,
  AboutStoryData,
  AboutStatItem,
  AboutPastCompaniesData,
  AboutHowIWorkData,
  AboutSkillsToolsData,
  AboutInterestsData,
  CTABannerData,
} from "@/lib/types";
```

Replace it with:

```tsx
import type {
  AboutHeroData,
  AboutShortVersionData,
  AboutStoryData,
  AboutStatItem,
  AboutPastCompaniesData,
  AboutHowIWorkData,
  AboutSkillsToolsData,
  AboutInterestsData,
  IndustriesGridData,
  CTABannerData,
} from "@/lib/types";
```

- [ ] **Step 3: Add the data mapping**

Find the closing of the `interests` mapping block — it ends with:

```tsx
    : null;
```

followed by the `return (` statement. Insert the `industriesGrid` mapping **between** the interests mapping and `return (`:

```tsx
  const industriesGrid: IndustriesGridData | null =
    page.industriesHeadline && (page.industryCards?.length ?? 0) > 0
      ? {
          headline: page.industriesHeadline,
          highlightedWord: page.industriesHighlightedWord,
          description: page.industriesDescription,
          industries: page.industryCards ?? [],
          ctaHeadline: page.industriesCtaHeadline ?? "",
          ctaLabel: page.industriesCtaLabel ?? "",
          ctaUrl: page.industriesCtaUrl ?? "/start",
        }
      : null;
```

- [ ] **Step 4: Add the JSX section between Interests and Featured Work**

Find this comment in the JSX:

```tsx
      {/* 09 — Featured Work (glass) */}
```

Insert the industries section **immediately before** it:

```tsx
      {/* 08.5 — Industries */}
      {industriesGrid && (
        <GlassSection id="industries">
          <IndustriesGrid data={industriesGrid} />
        </GlassSection>
      )}

      {/* 09 — Featured Work (glass) */}
```

- [ ] **Step 5: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 6: Verify build compiles**

```bash
npm run build
```

Expected: compiles successfully. A Sanity network timeout during static generation is expected in this environment and is not a code error — only flag TypeScript or import errors.

- [ ] **Step 7: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add IndustriesGrid section to about page between Interests and Featured Work"
git push origin main
```
