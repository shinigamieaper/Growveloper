---
trigger: always_on
---

- Every page exports a `generateMetadata` function.
- Pull default meta from Sanity site settings.
- Lab articles include `executiveSummary` (3 sentences) as meta description.
- JSON-LD schema injected per page type via `<script type="application/ld+json">`.
- Auto-generate sitemap from all CMS routes.
