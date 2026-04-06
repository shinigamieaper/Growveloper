# SEO Audit — Stage 6 Design

**Goal:** Fix five pages missing `openGraph` image in `generateMetadata()` and add JSON-LD structured data to four pages that have none.

**Architecture:** Pure page-file edits only — no new types, schemas, components, or queries. All JSON-LD follows the existing `<script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={...} />` pattern. All ogImage fixes follow the existing `openGraph: ogImage ? { images: [{ url: ogImage }] } : undefined` pattern.

---

## Part 1 — ogImage fixes in `generateMetadata()`

### 1. `src/app/start/page.tsx`

`getStartPage()` already fetches and returns `ogImage` (added in Stage 4). The `generateMetadata()` function currently ignores it.

**Change:** add `openGraph` to the returned Metadata object:
```typescript
export async function generateMetadata(): Promise<Metadata> {
  const data = await getStartPage();
  return {
    title: data?.seoTitle ?? "Book a Consultation — GROWVELOPER",
    description: data?.seoDescription ?? "Tell us about your project and book a free consultation.",
    openGraph: data?.ogImage ? { images: [{ url: data.ogImage }] } : undefined,
  };
}
```

### 2. `src/app/start/confirmed/page.tsx`

`getStartConfirmedPage()` fetches `ogImage`. Not currently in metadata.

**Change:** add `openGraph` to the returned Metadata object:
```typescript
export async function generateMetadata(): Promise<Metadata> {
  const data = await getStartConfirmedPage();
  return {
    title: data?.seoTitle ?? "Consultation Confirmed — GROWVELOPER",
    description: data?.seoDescription ?? "Your consultation request has been received. Here is what happens next.",
    openGraph: data?.ogImage ? { images: [{ url: data.ogImage }] } : undefined,
  };
}
```

### 3. `src/app/audit/confirmed/page.tsx`

`getAuditConfirmedPage()` fetches `ogImage`. Not currently in metadata.

**Change:**
```typescript
export async function generateMetadata(): Promise<Metadata> {
  const data = await getAuditConfirmedPage();
  return {
    title: data?.seoTitle ?? "Audit Confirmed — GROWVELOPER",
    description: data?.seoDescription ?? "Your growth audit is booked. Complete the intake form and we'll get started.",
    openGraph: data?.ogImage ? { images: [{ url: data.ogImage }] } : undefined,
  };
}
```

### 4. `src/app/privacy/page.tsx`

Already fetches `getSiteSettings()`. Just not using `settings?.ogImage`.

**Change:** add `openGraph` line to the existing return:
```typescript
openGraph: settings?.ogImage ? { images: [{ url: settings.ogImage }] } : undefined,
```

### 5. `src/app/terms/page.tsx`

Same as privacy — already has settings.

**Change:** same one-line addition.

---

## Part 2 — JSON-LD additions

All JSON-LD blocks use this pattern (copied from `/work/page.tsx`):
```tsx
<script
  type="application/ld+json"
  suppressHydrationWarning
  dangerouslySetInnerHTML={{ __html: JSON.stringify({ ... }) }}
/>
```

The script tag goes inside a `<>...</>` fragment wrapping the page's return, before the first component.

### 6. `src/app/page.tsx` — `Organization` schema

The home page has `page` and `settings` already fetched in the default export. Use `page.seoDescription` for description with fallback.

**Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GROWVELOPER",
  "url": "https://growveloper.com",
  "description": "<page.seoDescription ?? settings.seoDescription ?? fallback>"
}
```

The description is dynamic: `page?.seoDescription ?? settings?.seoDescription ?? "Technical growth engineering — where clean code meets marketing ROI."`

### 7. `src/app/automations/page.tsx` — `CollectionPage` schema

`page` (AutomationsPageData) has `seoTitle`, `seoDescription` in scope. Use them.

**Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "<page?.seoTitle ?? 'Automations Catalogue — GROWVELOPER'>",
  "description": "<page?.seoDescription ?? 'Browse our automation templates and tools.'>",
  "url": "https://growveloper.com/automations",
  "provider": { "@type": "Organization", "name": "GROWVELOPER", "url": "https://growveloper.com" }
}
```

### 8. `src/app/audit/confirmed/page.tsx` — `WebPage` schema

Simple static schema. Matches the pattern already used in `/start/confirmed/page.tsx`.

**Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Audit Confirmed — GROWVELOPER",
  "description": "Your growth audit is booked. Complete the intake form and we'll get started.",
  "url": "https://growveloper.com/audit/confirmed"
}
```

### 9. `src/app/resources/[slug]/page.tsx` — `Article` schema

`resource` (ResourcePageData) has: `title`, `description`, `resourceType`, `publishedAt?`. Use these.

**Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "<resource.title>",
  "description": "<resource.description>",
  "datePublished": "<resource.publishedAt ?? undefined>",
  "publisher": { "@type": "Organization", "name": "GROWVELOPER", "url": "https://growveloper.com" },
  "url": "https://growveloper.com/resources/<resource.slug>"
}
```

---

## File Summary

| File | Change |
|------|--------|
| `src/app/start/page.tsx` | Add `openGraph` to `generateMetadata` |
| `src/app/start/confirmed/page.tsx` | Add `openGraph` to `generateMetadata` |
| `src/app/audit/confirmed/page.tsx` | Add `openGraph` to `generateMetadata` + add JSON-LD `WebPage` |
| `src/app/privacy/page.tsx` | Add `openGraph` to `generateMetadata` |
| `src/app/terms/page.tsx` | Add `openGraph` to `generateMetadata` |
| `src/app/page.tsx` | Add JSON-LD `Organization` |
| `src/app/automations/page.tsx` | Add JSON-LD `CollectionPage` |
| `src/app/resources/[slug]/page.tsx` | Add JSON-LD `Article` |

**Total: 8 file edits. No new files. No type changes. No schema changes.**

---

## Error handling

All dynamic values use nullish coalescing or optional chaining. No JSON-LD value can throw — if `resource.publishedAt` is undefined, omit the `datePublished` key via conditional spread or ternary.

## Testing

After implementation: `npx tsc --noEmit` must pass. Manual spot-check: view page source on `/`, `/automations`, `/audit/confirmed`, `/resources/[any-slug]` and confirm the JSON-LD script tag is present. Check `/start`, `/privacy`, `/terms` in browser devtools Network → Response headers to confirm `og:image` meta tags appear in the HTML.
