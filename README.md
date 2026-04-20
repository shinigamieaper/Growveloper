<div align="center">
  <img src="public/images/logo/logo-wordmark-dark.png#gh-light-mode-only" alt="Growveloper" width="380" />
  <img src="public/images/logo/logo-wordmark-light.png#gh-dark-mode-only" alt="Growveloper" width="380" />

  <h3>The Technical Growth Engine</h3>
  <p><em>Where clean code and marketing ROI are inseparable.</em></p>

  <p>
    <a href="#-live-demo"><img src="https://img.shields.io/badge/status-in%20production-14b8a6?style=flat-square" /></a>
    <img src="https://img.shields.io/badge/Next.js-16-000?style=flat-square&logo=next.js" />
    <img src="https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind-v4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white" />
    <img src="https://img.shields.io/badge/Sanity-CMS-f03e2f?style=flat-square&logo=sanity&logoColor=white" />
    <img src="https://img.shields.io/badge/GSAP-3-88ce02?style=flat-square&logo=greensock&logoColor=white" />
  </p>
</div>

---

## Overview

**Growveloper** is a production marketing site for a premium technical-growth studio — a fully CMS-driven, SEO-tuned, animation-rich Next.js application that doubles as a lead-generation engine.

It's built by a solo engineer as both a working agency platform and a **portfolio statement**: modern App Router architecture, a bespoke motion system, a real Sanity Studio, and end-to-end marketing plumbing (forms → email → Mailchimp → analytics).

> Built for performance. Designed for conversion. Engineered to scale.

---

## Highlights

- **Zero-compromise UX** — GSAP + Framer Motion orchestration, a staggered radial menu, lamp-glow heros, scroll-driven case-study reveals, 3D and Lottie accents.
- **CMS-first, code-fallback architecture** — every page fetches from Sanity with hardcoded safety defaults, so content outages never break the site.
- **Embedded Sanity Studio** at `/studio` — custom Structure tool, singleton pages, content-hub resources, and structured case studies.
- **Conversion plumbing** — contact, audit, and resource-gate forms wired to Resend, Mailchimp tagging/segmentation, and Google Tag Manager / Clarity events.
- **Modern stack, honest engineering** — Next 16 + React 19, Tailwind v4 with CSS-variable theming, shadcn primitives, Zod + React Hook Form, Sentry monitoring, ISR across the board.
- **Accessibility + SEO baked in** — per-page `generateMetadata()` from CMS, OpenGraph, sitemap, robots, `llms.txt`, and semantic HTML throughout.

---

## Tech Stack

| Layer | Tools |
|---|---|
| **Framework** | Next.js 16 (App Router, RSC, ISR), React 19, TypeScript 5 |
| **Styling** | Tailwind CSS v4, CSS variables, shadcn/ui (New York), tailwind-merge |
| **Motion** | GSAP 3 + `@gsap/react`, Framer Motion, Lottie, Three.js, canvas-confetti |
| **CMS** | Sanity 5 + Sanity Studio (embedded), next-sanity, GROQ |
| **Forms** | React Hook Form, Zod, Radix primitives |
| **Marketing** | Resend (email), Mailchimp (tagging + segmentation), GTM, Clarity |
| **Payments** | Lemon Squeezy (audit productization) |
| **Observability** | Sentry (client + server + edge) |
| **Charts / Data** | Recharts |

---

## Architecture at a Glance

```
src/
├── app/                    Next.js App Router — pages, /studio, /api
│   ├── api/                Contact, newsletter, resource-lead routes
│   ├── studio/             Embedded Sanity Studio
│   ├── sitemap.ts          CMS-driven sitemap
│   └── robots.ts           Crawler rules + AI-bot allowlist (llms.txt)
├── components/             Section + shared + UI primitives (barrel export)
└── lib/
    ├── sanity/             client, queries (centralized GROQ), schemas
    ├── services/           mailchimp, email, service fallbacks
    └── site-config.ts      Global metadata
```

**Key patterns**

- **Singleton CMS documents** for top-level pages (`homePage`, `aboutPage`, `siteSettings`)
- **Centralized GROQ queries** in `src/lib/sanity/queries.ts`
- **Hybrid server/client pages** — server fetches data, client components handle filters/modals
- **Resilient rendering** — every CMS fetch has a code-level fallback

See [`PROJECT_SYNTHESIS.md`](PROJECT_SYNTHESIS.md) for a deeper architectural walkthrough.

---

## Getting Started

### Prerequisites

- Node 20+ (Node 24 LTS recommended)
- A Sanity project (free tier is fine)
- SMTP credentials and a Mailchimp audience (optional for local dev)

### Install & run

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site, and [http://localhost:3000/studio](http://localhost:3000/studio) for the embedded CMS.

### Environment variables

```ini
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email (Resend / SMTP)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM_EMAIL=
CONTACT_RECIPIENT_EMAIL=

# Mailchimp
MAILCHIMP_API_KEY=
MAILCHIMP_SERVER_PREFIX=
MAILCHIMP_AUDIENCE_ID=

# Analytics (optional)
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_CLARITY_ID=
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next dev server |
| `npm run build` | Production build (with 4GB heap headroom) |
| `npm start` | Run the production server |
| `npm run lint` | ESLint |

---

## Feature Map

- **Homepage** — Hero, diagnosis grid, sticky-scroll services, industries, process, case studies, testimonials, FAQ, live feed, newsletter
- **Partnership model / services** — CMS-driven service index + detail pages with approach, process, and FAQs per service
- **Resources / content hub** — URL-driven filters (group, topic, tag, q), pagination, case-study and insight layouts
- **Audit productization** — pricing, checkout hand-off, and lead capture
- **Legal suite** — CMS-first privacy, terms, cookies, accessibility pages with hardcoded fallbacks
- **Lab / experiments** — animation and interaction sandbox
- **Industries** — verticalized landing pages

---

## Roadmap

- [ ] Full Sanity draft-mode preview (`previewClient` is wired, draft-mode routes pending)
- [ ] CMS-driven sitemap for service slugs (currently static)
- [ ] Custom PortableText renderers for `callout` and inline objects
- [ ] `.env.example` scaffold
- [ ] Playwright smoke tests for critical CTAs

---

## About the Author

<table>
  <tr>
    <td width="170" valign="top">
      <img src="public/images/potriat/me.png" alt="Juwon Obajuwon" width="150" />
    </td>
    <td valign="top">
      <strong>Juwon Obajuwon</strong> — Technical growth engineer. I build digital engines that sell, not just sites that render.
      <br/><br/>
      This repo is both my agency's product and a live demonstration of how I work: architecture-first, animation-fluent, measurement-obsessed, and written to be handed off without apologies.
      <br/><br/>
      <strong>Open to:</strong> senior frontend / full-stack roles, high-signal contract engagements, and client partnerships that care about the engineering underneath the marketing.
      <br/><br/>
      📬 <a href="mailto:oyekolaobajuwon@gmail.com">oyekolaobajuwon@gmail.com</a>
    </td>
  </tr>
</table>

---

## License

This repository is **source-available for review purposes**. The Growveloper brand, copy, and visual identity are proprietary. Please don't redeploy as-is — fork the engineering, not the brand.

<div align="center">
  <sub>Built with care in Lagos · Shipping globally</sub>
</div>
