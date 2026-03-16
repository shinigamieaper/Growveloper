---
trigger: manual
---

All GROQ queries in `/lib/sanity/queries.ts` — never inline in page files.
- Always use `sanityFetch` with revalidation.
- CMS components handle empty data gracefully:
```tsx
if (!data || data.length === 0) return null;
```
- Type all Sanity responses. Use generated types from schema.

---