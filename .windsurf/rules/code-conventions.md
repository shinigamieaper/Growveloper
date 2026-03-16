---
trigger: always_on
---

### TypeScript
- All files must be TypeScript (.tsx / .ts). No .js files.
- Strict mode enabled. No `any` types.
- Define interfaces for all props and CMS data shapes.
- Export all types from `/lib/types.ts` — never define types inline in component files.

### Components
- Functional components only. No class components.
- Every component must have explicit typed props interface.
- Named exports for all components except page.tsx (Next.js requires default export).
- Server Components by default. Add `"use client"` only when hooks or browser APIs are needed.
- Keep components under 150 lines. Split into sub-components if longer.

### File naming
- Components: PascalCase (e.g. `CTABanner.tsx`)
- Utilities and lib files: camelCase (e.g. `sanityClient.ts`)
- Page files: always `page.tsx`

### Imports
- Use `@/` path aliases — never relative `../` imports.
- Group order: 1) React/Next, 2) third-party, 3) internal components, 4) types, 5) styles.

---