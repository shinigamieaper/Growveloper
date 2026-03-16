---
trigger: always_on
---

**No `middleware.ts`** — use `proxy.ts` with exported function named `proxy`
- **All params and searchParams are async** — always `await` them in pages, layouts, generateMetadata, and route handlers:
  ```ts
  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
  }
  export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
  }
  ```
- **Explicit caching only** — use `"use cache"` directive on Sanity fetch functions. Nothing is cached implicitly.
- **No `experimental.ppr`** — do not add it to `next.config.ts`
- **Turbopack is default** — do not add `--turbopack` to scripts. `next dev` and `next build` use it automatically.
- **URL param pre-fill (qualifying form)** — `searchParams` is now a Promise. Always await before reading:
  ```ts
  const { service } = await searchParams;
