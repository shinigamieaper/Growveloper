# About Page — Industries Grid Design Spec
**Date:** 2026-04-07

---

## Goal

Add the existing `IndustriesGrid` component to the about page between the Interests and Featured Work sections, exactly as it appears on the home page. All Sanity schema fields, GROQ query projections, and TypeScript mappings must be wired end-to-end so the section is fully CMS-driven.

---

## What Is Not Changing

- `IndustriesGrid` component — no edits
- `IndustriesGridData` / `IndustryCardData` types — already correct
- `industryPage` Sanity schema — already exists and registered
- `schemas/index.ts` — no change needed
- All other about page sections — untouched

---

## Changes Required

### 1 — `src/lib/sanity/schemas/aboutPage.ts`

Add a new `industries` fieldset and 7 fields. Pattern matches the home page schema exactly.

**New fieldset** (add to the `fieldsets` array):
```ts
{ name: "industries", title: "Industries", options: { collapsible: true, collapsed: true } },
```

**New fields** (add after the `interests` block, before `caseStudies`):

```ts
/* ── Industries ── */
defineField({ name: "industriesHeadline", title: "Industries Headline", type: "string", fieldset: "industries" }),
defineField({ name: "industriesHighlightedWord", title: "Industries Highlighted Word", type: "string", fieldset: "industries" }),
defineField({ name: "industriesDescription", title: "Industries Description", type: "text", fieldset: "industries" }),
defineField({ name: "industriesCtaHeadline", title: "Industries CTA Headline", type: "string", fieldset: "industries" }),
defineField({ name: "industriesCtaLabel", title: "Industries CTA Label", type: "string", fieldset: "industries" }),
defineField({ name: "industriesCtaUrl", title: "Industries CTA URL", type: "string", fieldset: "industries", description: 'e.g. /start' }),
defineField({
  name: "industryCards",
  title: "Industry Cards",
  type: "array",
  fieldset: "industries",
  of: [defineArrayMember({ type: "reference", to: [{ type: "industryPage" }] })],
}),
```

Also add `"Industries"` as a scroll cue target option in `heroScrollCueTargetId`:
```ts
{ title: "Industries", value: "industries" }
```

---

### 2 — `src/lib/sanity/queries.ts` — `getAboutPage()`

Add the industries projection inside the existing GROQ query, after the `interests` block:

```groq
// Industries
industriesHeadline,
industriesHighlightedWord,
industriesDescription,
industriesCtaHeadline,
industriesCtaLabel,
industriesCtaUrl,
industryCards[]->{ "icon": icon, "name": industryName, hookLine, "slug": slug.current, ctaLabel },
```

---

### 3 — `src/app/about/page.tsx`

**Import:** Add `IndustriesGrid` to imports:
```tsx
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
```

**Type import:** Add `IndustriesGridData` to the type imports block:
```tsx
import type { IndustriesGridData, ... } from "@/lib/types";
```

**Data mapping** (after the `interests` mapping, before the return):
```tsx
const industriesGrid: IndustriesGridData | null = page.industriesHeadline && (page.industryCards?.length ?? 0) > 0
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

**JSX placement** — between Interests and Featured Work, same `GlassSection` pattern as the home page:
```tsx
{/* 07.5 — Industries */}
{industriesGrid && (
  <GlassSection id="industries">
    <IndustriesGrid data={industriesGrid} />
  </GlassSection>
)}
```

---

## Success Criteria

- [ ] `aboutPage.ts` schema has `industries` fieldset and all 7 fields (headline, highlightedWord, description, ctaHeadline, ctaLabel, ctaUrl, industryCards[])
- [ ] `industryCards` field references `industryPage` documents
- [ ] `getAboutPage()` GROQ query includes industries projection with `industryCards[]->{ ... }` dereference
- [ ] `page.tsx` imports `IndustriesGrid` and `IndustriesGridData`
- [ ] `industriesGrid` data mapping present, guarded by `page.industriesHeadline && industryCards.length > 0`
- [ ] `<IndustriesGrid>` rendered inside `<GlassSection id="industries">` between Interests and Featured Work sections
- [ ] Section does not render if no industries data is present (guarded)
- [ ] Build compiles, TypeScript passes
