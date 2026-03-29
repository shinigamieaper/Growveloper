# VIP Creative Studio — Project Synthesis (Architecture + CMS + Learnings)

This document is a high-context, “how this repo works” guide intended to be reused as a reference when building a similar CMS-driven marketing site.

## 1) What this project is

A CMS-backed marketing website built with **Next.js App Router** and **Sanity**.

- **Public site**
  - Homepage, About, Partnership/Services, Resources/Content Hub, Contact
  - Legal pages (privacy, terms, cookies, accessibility) that can be **CMS-driven** with hardcoded fallbacks
- **CMS**
  - Sanity Studio embedded inside the Next.js app at `/studio`
  - Custom Studio navigation (Structure tool) for “Pages”, “Sections”, “Settings”, etc.
- **Lead capture + marketing ops**
  - Contact form → emails via SMTP + Mailchimp sync
  - Newsletter signup → Mailchimp
  - Resource lead capture → emails + Mailchimp tagging

## 2) Tech stack & key libraries

## Core framework

- **Next.js**: `next@^16.0.7` (App Router)
- **React**: `react@^19.2.1`
- **TypeScript**: `typescript@^5.9.3`

## CMS

- **Sanity**: `sanity@^4.11.0`
- **next-sanity**: `next-sanity@^11.6.2`
- **Sanity Studio** mounted via `next-sanity/studio`

## Styling / UI

- **Tailwind CSS v4**: `tailwindcss@^4` with CSS variables (`src/app/globals.css`)
- **shadcn/ui** configured via `components.json`
  - `style: "new-york"`, `tsx: true`, `rsc: true`
  - aliases: `@/components`, `@/lib/utils`, `@/components/ui`
- Utility helpers
  - `clsx`, `tailwind-merge` (`cn()` in `src/lib/utils.ts`)

## Motion / visuals

- **framer-motion** (`framer-motion`, plus `motion`)
- **GSAP** (`gsap`, `@gsap/react`)
- **3D/Canvas**: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`
- **Particles**: `@tsparticles/*`
- Icons: `lucide-react`, `react-icons`, `@tabler/icons-react`
- Charts: `recharts`

## Email / marketing integrations

- SMTP email: `nodemailer`
- Mailchimp: custom fetch integration (`src/lib/services/mailchimp.ts`)
- `resend` is installed but **not used** in the code paths inspected (the implementation uses Nodemailer + SMTP).

## 3) Project layout (important folders)

- `src/app/`
  - Next.js routes (server components by default)
  - `/studio` route for Sanity Studio
  - `/api/*` routes for forms and Mailchimp integration
  - `robots.ts`, `sitemap.ts`
- `src/components/`
  - Component library (sections, global UI, shared UI, shadcn-style primitives)
  - Barrel exports via `src/components/index.ts`
- `src/lib/`
  - `sanity/`: client + queries + schemas + image helpers
  - `services/`: operational services (mailchimp, email, plus fallback service data)
  - `resources/`: resource taxonomy/types helpers used by the Content Hub
  - `site-config.ts`: global metadata constants

## 4) Routing & page patterns (how pages are built)

## App Router conventions used

- **Server Components** for most pages: data fetched on the server using `getClient().fetch(...)`.
- Pages commonly export `revalidate = 60` to enable **ISR**.
- Pages that need client-side interactivity (filters, animations, modals) are implemented as client components (with `"use client"`).

## Examples

- **Homepage**: `src/app/page.tsx`
  - Fetches multiple CMS documents in parallel.
  - `generateMetadata()` reads SEO fields from CMS and merges into defaults.

- **About**: `src/app/about/page.tsx`
  - CMS data + fallback content for FAQs.

- **Partnership Model (services index)**: `src/app/our-partnership-model/page.tsx`
  - CMS hero content + CMS services list + fallback FAQ items.

- **Service detail**: `src/app/our-partnership-model/[slug]/page.tsx`
  - Fetches service document by slug from Sanity.
  - If CMS is missing, falls back to local definitions in `src/lib/services/data.ts`.
  - Uses a hybrid approach: CMS can override, but strong defaults exist in code.

- **Resources index (Content Hub)**: `src/app/resources/page.tsx` + `ResourcesPageClient.tsx`
  - Server fetches
    - Page config (`resourcesPageQuery`)
    - Resources list (`resourcesQuery`)
  - Client component handles
    - URL-driven filters (`group`, `topic`, `tag`, `q`)
    - pagination (“Load more/less”)
    - featured resource rotation

- **Resource detail**: `src/app/resources/[slug]/page.tsx`
  - Fetches a resource and maps it into a strongly typed UI model.
  - Supports multiple layouts by resource type (insights vs case study vs resources/tools).

## Legal pages are CMS-first, fallback-second

- Routes:
  - `/privacy-policy`, `/terms-of-service`, `/cookie-policy`, `/accessibility`
- Each page attempts to fetch `legalPage` content by key.
- If no CMS body exists, hardcoded fallback content renders.

This is a deliberate resilience pattern: marketing/legal pages can ship even if CMS content is incomplete.

## 5) Global layout, SEO, and analytics

## Root layout

File: `src/app/layout.tsx`

- Sets up global `metadata` using `siteConfig`.
- Fetches `siteSettings` from Sanity on the server and passes footer config into `<Footer />`.
- Injects marketing scripts conditionally:
  - Google Tag Manager via `NEXT_PUBLIC_GTM_ID`
  - Microsoft Clarity via `NEXT_PUBLIC_CLARITY_ID`
- Global navigation is rendered via `<StaggeredMenu />`.

## SEO pages

- Each major route provides either
  - static `metadata`, or
  - `generateMetadata()` that reads CMS `seo` fields and merges into defaults.

## Robots + sitemap

- `src/app/robots.ts`
  - Disallows crawling of `/studio` and `/api`.
  - Special handling for some AI crawlers (allowing `/llms.txt`).

- `src/app/sitemap.ts`
  - Includes static pages + service pages + resource pages.
  - **Resources** are sourced from Sanity (`resourceSlugsQuery`).
  - **Service slugs** are currently hardcoded (note in code suggests intended CMS integration).

## AI metadata file

- `public/llms.txt`
  - Provides a compact business summary for AI assistants.
  - This pairs with robots rules that allow certain bots to crawl `/llms.txt`.

## 6) Sanity CMS integration (how the CMS works)

## Sanity Studio

- Studio config: `sanity.config.ts`
- CLI config: `sanity.cli.ts`
- Studio route: `src/app/studio/[[...tool]]/page.tsx`
  - Uses `NextStudio` from `next-sanity/studio`.

## Studio navigation (Structure Tool)

In `sanity.config.ts`, `structureTool` defines a curated content tree:

- **Pages (singletons)**
  - `homePage` (documentId `homePage`)
  - `aboutPage` (documentId `aboutPage`)
  - `servicesPage` (documentId `servicesPage`)
  - `resourcesPage` (documentId `resourcesPage`)
- **Collections**
  - `service`, `resource`, `testimonial`, `teamMember`, `author`, `faqGroup`, `legalPage`
- **Sections (singletons + lists)**
  - `whyChooseUsSection` (documentId `whyChooseUsSection`)
  - `globalProcess` (documentId `globalProcess`)
  - `faqGroup` list
- **Settings (singleton)**
  - `siteSettings` (documentId `siteSettings`)

This structure makes editing much easier for non-developers because it matches site IA.

## Sanity client

File: `src/lib/sanity/client.ts`

- Published client (`perspective: "published"`) used by default.
- Preview client (`perspective: "previewDrafts"`) exists and requires `SANITY_API_READ_TOKEN`.
- Helper: `getClient(preview = false)` returns correct client.

Important nuance:

- The repo contains a preview client, but **draft-mode plumbing is not wired** (no `draftMode` usage found). To support real preview, you typically add draft mode routes and pass `preview=true` to `getClient()` when draft mode is enabled.

## Queries

File: `src/lib/sanity/queries.ts`

All GROQ queries live centrally.

Notable query patterns:

- **Singleton pages**: `*[_type == "homePage"][0]` etc.
- **Slug-based docs**: `*[_type == "service" && slug.current == $slug][0]`
- **Related resources**: query uses `$group` plus `$category` to select related items.
- **Legal pages**: `legalPageByKeyQuery` fetches by a `key` field.

## Schemas (content model)

Folder: `src/lib/sanity/schemas/`

Key document types:

- `service`
  - title/slug/subtitle/description
  - icon (Lucide icon name)
  - structured fields: approach + process steps
  - per-service FAQs
  - SEO object

- `resource` (largest schema)
  - typed content hub content: Article/Guide/Report/Case Study/Webinar/Template/Tool/Ebook
  - conditional visibility (fields hidden based on resource `type`)
  - Portable Text body `content` using `blockContent`
  - structured case-study sections (challenge/solution/results + metrics)
  - downloadable assets and webinar fields
  - SEO object

- `siteSettings`
  - footer link groups + social icons + bottom text
  - default SEO fields

- `legalPage`
  - key enum maps to site routes
  - intro + PortableText body + SEO

- `blockContent`
  - defines allowed PortableText styles (H2/H3/H4/Quote), lists, and link annotation.
  - also defines inline objects like `callout` and images with alt/caption.

## Portable Text rendering

- Schema: `src/lib/sanity/schemas/block-content.ts`
- Renderer component: `src/components/PortableTextRenderer/index.tsx`
  - Uses `@portabletext/react`.
  - Defines rendering for
    - `normal`, `h2`, `h3`, `h4`, `blockquote`
    - bullet/number lists
    - link marks (with `blank` support)

If you add new block types in schema (e.g. `callout`), ensure the renderer supports them.

## Sanity images

- Helper: `src/lib/sanity/image.ts` exports `urlFor(source)` using `@sanity/image-url`.
- `next.config.ts` allows remote images from `cdn.sanity.io`.

## 7) API routes and operational services

## Contact form

- UI: `src/components/ui/contact-form/index.tsx`
  - Submits to `/api/contact`.
  - Pushes `dataLayer` event: `form_submit`.

- API: `src/app/api/contact/route.ts`
  - Sends
    - internal notification email
    - user confirmation email
  - Also attempts Mailchimp sync (non-blocking; failures are logged).

- Email service: `src/lib/services/email.ts`
  - Uses Nodemailer via SMTP.
  - Fails fast with clear errors when SMTP config is missing.

## Newsletter signup

- UI: `src/components/ui/newsletter-signup/index.tsx`
  - POST `/api/newsletter/subscribe`
  - Pushes `dataLayer` event: `newsletter_subscribe`.

- API: `src/app/api/newsletter/subscribe/route.ts`
  - Syncs Mailchimp contact.
  - Adds tags based on
    - `source`
    - `resourceSlug` (tagged as `article:<slug>`)
  - Special error handling for “invalid email” type responses via `MailchimpApiError`.

## Resource lead capture

- API: `src/app/api/resources/lead/route.ts`
  - Emails internal team + lead
  - Syncs Mailchimp contact with tags
    - `resource_lead`
    - `resource_download` or `resource_webinar`

Mailchimp integration lives in `src/lib/services/mailchimp.ts` and uses fetch to call Mailchimp’s REST API (server-side).

## 8) Styling system / design tokens

## Tailwind v4 + CSS variables

- `src/app/globals.css` defines
  - CSS variables for theme tokens (background, text-primary, accent colors, etc.)
  - typography utility classes (`.h1`, `.h2`, `.h3`, `.body-default`)
  - button utility classes (`.btn`, `.btn-primary`, `.btn-inverted`, etc.)

## Tailwind config

- `tailwind.config.ts` extends
  - semantic colors mapping to CSS vars
  - animations (`shimmer`, `shine`)

## shadcn configuration

- `components.json` indicates this repo uses shadcn conventions and aliases.

## 9) Environment variables (what you need in the new project)

This repo reads configuration from environment variables.

## Sanity

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (defaults to `production`)
- `NEXT_PUBLIC_SANITY_API_VERSION` (defaults to `2024-01-01`)
- `SANITY_API_READ_TOKEN` (required for draft/preview client)

## Site / analytics

- `NEXT_PUBLIC_SITE_URL` (used by SEO, sitemap, robots)
- `NEXT_PUBLIC_GTM_ID` (optional)
- `NEXT_PUBLIC_CLARITY_ID` (optional)

## Email (SMTP)

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM_EMAIL` (or fallback uses `SMTP_USER`)
- `CONTACT_RECIPIENT_EMAIL`

## Mailchimp

- `MAILCHIMP_API_KEY`
- `MAILCHIMP_SERVER_PREFIX`
- `MAILCHIMP_AUDIENCE_ID`

Operational note:

- `.env.local` is gitignored, so for a new project it’s useful to provide an `.env.example` (not present here) and keep env documentation up to date in a repo doc.

## 10) Patterns & learnings worth carrying into the next project

## Pattern: CMS-first with code fallbacks

This repo repeatedly uses a resilient approach:

- Attempt to fetch CMS content.
- If missing, render defaults hardcoded in code.

Where it’s used:

- FAQs (About, Partnership pages)
- Legal pages (PortableText body is optional)
- Services can fall back to local definitions

This prevents “empty CMS” from blocking the site launch.

## Pattern: Singleton documents for top-level pages/sections

Using fixed `documentId`s (e.g. `homePage`, `siteSettings`) gives:

- stable editorial URLs
- simpler queries
- simpler Studio IA

## Pattern: Centralize GROQ queries

All queries live in `src/lib/sanity/queries.ts`, making it easy to audit what the frontend needs and keep data fetching consistent.

## Pattern: Separation of concerns for complex pages

For interactive experiences (filters, pagination, modals):

- server route fetches the data
- client component handles UX

This keeps the App Router model clean and reduces client bundle size where possible.

## Pattern: Mailchimp tagging strategy

Newsletter and forms tag contacts with context:

- `newsletter`, plus `source`, plus `article:<slug>`
- `contact_form` + source
- `resource_lead` + `resource_download`/`resource_webinar`

This is a good foundation for attribution and segmentation.

## Known gaps / gotchas

- **Draft preview is not fully wired**
  - `previewClient` exists, but no `draftMode` integration is present.
  - If you want “Preview drafts” in a new project, add draft mode routes and use `getClient(true)` when draft mode is enabled.

- **Sitemap service slugs are hardcoded**
  - `sitemap.ts` still uses a static list for service slugs.
  - If services are fully CMS-driven, replace with a Sanity `serviceSlugsQuery`.

- **PortableText schema vs renderer**
  - `blockContent` includes object types like `callout`.
  - The current `PortableTextRenderer` only defines blocks/lists/links. If `callout` is used in content, add a renderer for it.

- **Sanity image handling**
  - Queries often select `coverImage.asset->url` to return a raw URL.
  - If you want responsive transformations/cropping, prefer returning the full image object and using `urlFor(...)`.

## 11) If you’re building a similar project (recommended blueprint)

- **Start with the same Sanity content model**
  - singleton page docs
  - `siteSettings` as a global config
  - `resource` as a flexible “content hub” doc
  - `legalPage` keyed to routes

- **Keep the query layer centralized**
  - one `queries.ts` file
  - strongly typed mapping helpers (like `mapSanityResourceToResource`)

- **Implement preview properly (if needed)**
  - add draft mode endpoints
  - use `previewClient` with read token

- **Standardize env requirements early**
  - add `.env.example`
  - keep this doc updated

---

Last updated: 2026-03-15
