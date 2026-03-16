# GROWVELOPER — Master Build Specification v2
> Feed this document to Windsurf Cascade before writing any code.
> This is the Single Source of Truth (SSOT) for the entire build.
> Version 2 — complete. Replaces all previous versions.

---

## 1. PROJECT OVERVIEW

**Brand:** GROWVELOPER
**Type:** Personal freelance brand site
**Founder:** Juwon
**Positioning:** The intersection of full-stack development and performance marketing. Not a dev shop. Not a marketing agency. The only option for founders who need both working together.
**Tagline:** "I architect high-performance digital engines where clean code and marketing ROI are inseparable."

---

## 2. CRITICAL BUILD RULES

These rules apply to every single file, component and page in this project. Read before writing any code.

### Rule 1 — Every text string visible to a site visitor comes from Sanity. No exceptions.

This includes but is not limited to:
- Hero headlines and sub-statements
- Section titles and labels
- Body copy in every section
- Button labels and CTA text
- Stat numbers and their labels
- Service names, descriptions, sub-service lists
- Pain point bullets and qualifier bullets
- Process step titles and descriptions
- FAQ questions and answers
- Testimonial quotes, names, roles
- Card titles, excerpts, descriptions
- Banner CTA headlines and sub-copy
- Footer copy and link labels
- 404 page copy
- Confirmation page copy
- Form labels and helper text
- Popup headlines, sub-copy, CTA labels
- Navigation labels and dropdown items
- Social proof pill text
- Newsletter section headline and sub-copy
- Prices — every price on every page is a Sanity field

**If a developer is tempted to write a visible string directly in JSX — that string belongs in Sanity instead.**

The only strings permitted directly in code:
- ARIA labels (`aria-label="Close menu"`)
- Error boundary fallback messages
- Console.log statements for debugging

Everything else is a Sanity field. Juwon must be able to change any headline, any CTA label, any stat, any price at any time from the Sanity Studio without touching code or triggering a deployment.

### Rule 2 — No data = no component.
If a CMS field is empty or a collection has no items, the component renders nothing. No empty states, no placeholder text, no skeleton loaders visible to visitors.

### Rule 3 — Structure first, content later.
Build every component to accept CMS data as props. Content is populated after the build. Never block progress waiting for real content.

### Rule 4 — No hardcoded popup logic.
Popups only fire if explicitly configured in Sanity for that page. Zero assumptions in code.

### Rule 5 — Navigation is CMS-driven.
Adding a new industry or service in Sanity automatically updates the nav dropdown. No code change required.

---

## 3. TECH STACK

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1+ (App Router) |
| Language | TypeScript — strict mode, no `any` |
| Styling | Tailwind CSS |
| Components | Shadcn/UI |
| Animations | GSAP + ScrollTrigger, Aceternity UI, React Bits, Lottie |
| CMS | Sanity.io |
| Deployment | Vercel (Edge) |
| Tracking | Google Tag Manager (Server-Side) + GA4 |
| Error monitoring | Sentry |
| Payments | Stripe (global — works in Nigeria, US, worldwide) |
| Forms | React Hook Form + Zod validation |
| Email delivery | Resend |
| Newsletter | Mailchimp |
| Calendar booking | Cal.com |

### Next.js 16 — Critical breaking changes vs earlier versions

- **`middleware.ts` → `proxy.ts`** — rename the file and the exported function to `proxy`. Do not create a `middleware.ts` file.
- **Async params and searchParams** — every `page.tsx`, `layout.tsx`, `generateMetadata`, and route handler must `await` params and searchParams before using them.
  ```ts
  // CORRECT in Next.js 16
  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
  }
  ```
- **Explicit caching only** — no implicit caching. Use `"use cache"` directive on Sanity fetch functions. Nothing is cached unless you explicitly opt in.
- **`experimental.ppr` flag removed** — do not reference it in `next.config.ts`. Cache Components replace it.
- **Turbopack is default** — no `--turbopack` flag needed. `next dev` and `next build` use Turbopack automatically.
- **Minimum Node.js 20.9.0** — ensure local environment and Vercel build environment are on Node 20.9+.
- **React 19.2** — View Transitions and `useEffectEvent` available.

---

## 4. DESIGN SYSTEM

### Colour Palette — "Aqua Authority"
```css
--color-light:   #aeeeee   /* light teal — backgrounds, subtle fills */
--color-mid:     #5ab1b1   /* mid teal — accents, highlights, secondary CTAs */
--color-dark:    #2b7575   /* deep teal — primary actions, strong headings */
--color-black:   #0a0a0a   /* near-black — dark backgrounds, dark mode base */
--color-white:   #f8f8f8   /* off-white — light mode base */
```

Tailwind config extension:
```js
colors: {
  brand: {
    light: '#aeeeee',
    mid: '#5ab1b1',
    dark: '#2b7575',
  },
  base: {
    black: '#0a0a0a',
    white: '#f8f8f8',
  }
}
```

### Typography
- **Headings:** General Sans
- **Body:** Gambetta
- Both loaded via `next/font` — no Google Fonts `<link>` tags
- **Code/terminal sections:** JetBrains Mono or Fira Code (monospace)
- Clear modular type scale — no arbitrary font sizes

### Theme
- Dark mode first
- Glassmorphism aesthetic — frosted glass cards, backdrop blur, transparency layers
- No solid white card backgrounds — use translucent panels
- High contrast text on dark backgrounds
- Teal gradient only where it reinforces brand palette

### Animation Principles
- GSAP ScrollTrigger for scroll-driven reveals and sticky panel transitions
- Aceternity UI for the "What Success Looks Like" section
- React Bits for micro-interactions
- Lottie for icon-level animations
- All animations must respect `prefers-reduced-motion`
- Homepage animations restrained — Section 06 (Success) does the heavy lifting

### Component Philosophy
- Build once, reuse everywhere via CMS
- Shared components live in `/components/shared/`
- CMS drives content — no data = component returns null

---

## 5. SITE ARCHITECTURE

### Navigation Structure
```
Logo | Services ▾ | Industries ▾ | Work | The Lab | Resources | The Brains
                                                          [Book a Consultation]

Services dropdown (CMS-driven):
- Web Development → /services/development
- Growth Marketing → /services/marketing
- AI & Automation → /services/ai
- ── separator ──
- Growth Audit (highlighted) → /audit

Industries dropdown (CMS-driven — auto-updates when new industry added in Sanity):
- SaaS → /industries/saas
- B2B Lead Gen → /industries/b2b
- AI & Tech Startups → /industries/ai-tech
- FinTech → /industries/fintech
```

### Full Page Inventory

| # | Page | Route | Type |
|---|---|---|---|
| 01 | Homepage | `/` | Static + CMS |
| 02 | Growth Audit | `/audit` | Static + CMS |
| 03 | Marketing Service | `/services/marketing` | Static + CMS |
| 04 | Development Service | `/services/development` | Static + CMS |
| 05 | AI & Automation Service | `/services/ai` | Static + CMS |
| 06 | Automations Catalogue | `/automations` | CMS-driven |
| 07 | Individual Automation | `/automations/[slug]` | CMS template |
| 08 | Qualifying Form | `/start` | Static |
| 09 | Consultation Confirmed | `/start/confirmed` | Static |
| 10 | Audit Confirmed | `/audit/confirmed` | Static |
| 11 | Case Study Hub | `/work` | CMS-driven |
| 12 | Individual Case Study | `/work/[slug]` | CMS template |
| 13 | The Lab Hub | `/lab` | CMS-driven |
| 14 | Individual Blog Post | `/lab/[slug]` | CMS template |
| 15 | Resources Hub | `/resources` | CMS-driven |
| 16 | Individual Resource | `/resources/[slug]` | CMS template |
| 17 | Industry: SaaS | `/industries/saas` | CMS template |
| 18 | Industry: B2B Lead Gen | `/industries/b2b` | CMS template |
| 19 | Industry: AI & Tech | `/industries/ai-tech` | CMS template |
| 20 | Industry: FinTech | `/industries/fintech` | CMS template |
| 21 | The Brains (About) | `/about` | Static + CMS |
| 22 | Privacy Policy | `/privacy` | Static |
| 23 | Terms of Service | `/terms` | Static |
| 24 | 404 | `/not-found` | Static |

---

## 6. HOMEPAGE — `/`

**Goal:** Full awareness → consideration → conversion → retention funnel in one page. A visitor who only sees this page must have enough to take action.
**Primary CTA:** Book a Free Consultation → `/start`
**Secondary CTA:** Get a Growth Audit → `/audit`

---

### Section 01 — Navigation
- Logo left, nav links centre, CTA button right
- CTA button: "Book a Consultation" → `/start`
- All nav items and dropdown content CMS-driven

---

### Section 02 — Hero
**Layout:** Full viewport height. Dark background.

**Components (all CMS-driven):**
- Social proof pill — e.g. "5+ years · 3 companies · Dev + Marketing + AI" — text editable in Sanity
- Display headline — large, bold, outcome-led
- Sub-statement — 1–2 lines
- Primary CTA button: "Book a Free Consultation" → `/start`
- Secondary CTA button (outlined): "Get a Growth Audit" → `/audit`
- Circular scroll cue — rotating "EXPLORE OUR WORK" text + down arrow. Decorative only. No decision weight.

**Notes:**
- No photo of founder in hero
- No logo strip in hero — logos appear only inside testimonial and case study cards

---

### Section 03 — The Diagnosis
**Purpose:** Make the visitor feel understood before being sold to.
**Layout:** 2×2 card grid. CMS controls number of cards AND layout style. Sanity field `layoutStyle` allows switching between 2×2 grid, 3-column, or single column without code change.

**CMS fields per card:**
- Icon
- Headline
- Body text

**No hardcoded card content.** All four cards populated from Sanity.

---

### Section 04 — What We Can Do For You
**Layout:** Alternating full-width rows — visual left/text right, text left/visual right.
**Three rows — one per service pillar.**

Each row (CMS-driven):
- Animated visual (GSAP/Aceternity — defined per pillar)
- Pillar name
- Outcome statement
- Sub-services list (array in Sanity)
- "Learn More" link → service page

**Row 1:** Web Development → `/services/development`
**Row 2:** Growth Marketing → `/services/marketing`
**Row 3:** AI & Automation → `/services/ai`

---

### Section 05 — Who We Work With
**Layout:** 2×2 industry cards + 1 "Sound like you?" CTA card (5 total).

**Industry cards (CMS-driven):**
- Industry name
- Hook line
- Link → industry silo page

**CTA card:**
- "Sound like you?" — brand teal background
- "Book a Consultation" → `/start`

---

### Section 06 — What Success Looks Like
**Layout:** Full-width sticky dark panel. 5 scroll-triggered transition states via GSAP ScrollTrigger. Panel releases after all 5 states.

**States (code-driven animation — no CMS for this section):**
1. Development — Lighthouse score 0 → 100. Load time 8.2s → 0.9s
2. Development — Core Web Vitals turning green one by one
3. Growth Marketing — GA4 chart climbing. ROAS counter up
4. Growth Marketing — Content cited in AI search overview. Schema tag rendering
5. AI & Automation — Workflow nodes lighting up. Time saved counter ticking

**Notes:**
- Dark panel, code/terminal aesthetic, monospace font
- Small pillar label per state
- No real client data — animation is the proof
- Aceternity UI components + custom GSAP

---

### Section 07 — How It Works
**Layout:** Sticky scroll reveal — 4 steps, each locks into view as you scroll.

**Steps (CMS-driven — title + description per step):**
1. Audit
2. Architect
3. Build
4. Scale

---

### Section 08 — Case Studies
**Layout:** Large stacked full-width visual cards.
**CMS-driven — drops completely if no case studies exist.**

**Card components:**
- Client hero image (full bleed)
- Client situation (1 sentence)
- Result headline
- "Development + Marketing" combined service tag — always combined
- Tech stack pills
- Arrow link → individual case study page

---

### Banner CTA 1 — Growth Audit
**Placement:** After case studies.
**Layout:** Full-width high-contrast block.
**CMS-driven:** Headline, sub-copy, CTA label, destination.
**Default destination:** `/audit`

---

### Section 09 — Testimonials
**Layout:** Staggered masonry card grid.
**CMS-driven — drops if no testimonials exist.**

**Card components:**
- Star rating
- Quote
- Avatar
- Name + role
- Company logo

**Final card:** "This could be you" — brand teal, "Book a Consultation" → `/start`

---

### Banner CTA 2 — Free Consultation
**Placement:** After testimonials.
**Visually distinct from Banner CTA 1.**
**CMS-driven:** All copy, CTA label, destination.
**Default destination:** `/start`

---

### Section 10 — FAQ
**Layout:** Accordion.
**CMS-driven** — questions and answers from Sanity. Page field on FAQ schema controls which page each FAQ appears on.

---

### Section 11 — What We're Up To (Live Feed)
**Layout:** Card grid. 3 latest items.
**CMS-driven — drops if no content exists.**

**Content types pulled from Sanity:**
- Blog posts
- YouTube videos (manually added via CMS — URL + thumbnail)
- TikTok videos (manually added via CMS — URL + thumbnail)

**Card components:**
- Thumbnail
- Content type tag (Blog / YouTube / TikTok)
- Title
- Date

**Video cards:** clicking opens a modal with embedded player. "Watch on YouTube/TikTok" link inside modal.

---

### Section 12 — Newsletter
**Layout:** Single full-width row.
**Content (CMS-driven):** Headline + sub-copy.
**Integration:** Mailchimp API.

---

### Section 13 — Footer
**Components (CMS-driven):**
- Logo
- Nav links
- Social links (LinkedIn, X, YouTube, TikTok)
- Legal links (Privacy, Terms)
- Final CTA button: "Book a Consultation" → `/start`
- Copyright line

---

## 7. GROWTH AUDIT PAGE — `/audit`

**Goal:** Get visitor to purchase the audit.
**Purchase flow:**
```
Read page → Click "Get the Audit" → Stripe payment → Intake form → Audit → Delivery → Walkthrough call
```
Payment = qualification. Intake form comes after payment, not before.

### Sections (all CMS-driven unless noted):

**01 — Hero**
- Page name + outcome statement
- "From $500" — price CMS-driven (update anytime)
- Primary CTA: "Get the Audit" → Stripe

**02 — Who It's For**
- Qualifier bullet list — CMS array

**03 — What We Look At**
- Three columns: Development review + Marketing review + AI & Automation review

**04 — What You Get**
- Diagnosis document
- Strategy deck
- Loom video walkthrough
- Notion roadmap
All CMS-driven — add or remove deliverables without code change.

**05 — How It Works**
- 3 steps: Pay & complete intake → We audit (3–5 days) → Delivery + walkthrough call

**06 — What We've Found**
- Anonymous findings from past client work
- CMS array — add new findings over time

**07 — Pricing**
- Price CMS-driven
- CTA: "Get the Audit" → Stripe
- Secondary link: "Not sure? Book a free consultation first." → `/start`

**08 — FAQ**
- CMS-driven accordion

**09 — Final CTA**
- CMS-driven headline + button → Stripe

---

## 8. SERVICE PAGES

All three service pages share identical funnel structure.

### Shared Section Order:
1. Hero — outcome statement. Dual CTA: Book Consultation + Get Audit
2. The problem — 2–3 sharp lines (CMS)
3. What's covered — sub-services with icons (CMS array)
4. Who it's for — qualifier bullets (CMS array)
5. How we work — 3–4 step process (CMS)
6. Results — CMS case study cards (drops if no data)
7. Testimonials — CMS-driven (drops if no data)
8. Banner CTA — "Not sure? Start with a Growth Audit" → `/audit`
9. FAQ — CMS-driven accordion
10. Final CTA — "Book your free consultation" → `/start`

### Reusable components across all service pages:
- **Micro CTA component** — single line + button. CMS-driven copy. Placed at strategic scroll points.
- **"Sound like you?" card** — brand teal. CMS-driven copy. Used in industries section and elsewhere.

---

### Growth Marketing — `/services/marketing`

**Sub-services (CMS array):**
- AEO (AI Engine Optimisation) — lead this, it's the differentiator
- SEO
- Paid Ads (Google, Meta)
- Content Strategy
- CRO
- Analytics & Tracking (GA4, GTM)

---

### Web Development — `/services/development`

**Sub-services (CMS array):**
- Next.js performance builds
- Performance optimisation (Core Web Vitals, LCP)
- CMS setup (Sanity)
- GTM & GA4 implementation
- API integrations
- Ongoing maintenance

**Additional section unique to dev page:**
Tech stack strip — logos of Next.js, Vercel, Tailwind, Sanity, GTM, GA4, TypeScript.
Placed after "What's Covered." CMS-driven array of tool logos.

---

### AI & Automation — `/services/ai`

**Two offers on one page — visually separated:**

**Offer 1: Done-For-You Automations**
- Pre-built and custom workflows
- Use cases (CMS array): lead scoring + CRM entry, automated reporting, AI chatbots, content pipelines, analytics alerts
- CTA: Browse Automations → `/automations` OR Book Consultation → `/start`

**Offer 2: AI Infrastructure (Custom)**
- For AI & Tech startups — complex builds
- No fixed price — consultation led
- CTA: Book Free Consultation → `/start`

**Tools strip (CMS array):** Make.com, n8n, Voiceflow, OpenAI API, Zapier, HubSpot

**Featured Automations component:**
- Card grid from CMS
- Name + what it does + price + CTA
- "View All Automations" → `/automations`
- Drops completely if no automations in CMS

---

## 9. THE BRAINS — `/about`

**Page name:** "The Brains"
**Tone:** Personal and human. Reads like a conversation not a CV.

### Sections (all CMS-driven):

**01 — Hero**
Full-width editorial photo of Juwon. Name + one-line identity. No CTA — trust first.

**02 — The Short Version**
3–4 sentences. CMS Portable Text.

**03 — The Story**
Narrative — the insight that dev and marketing can't be separated. CMS Portable Text.

**04 — Stat Strip**
CMS array of stat pairs (label + value). e.g. "5+ years / Started 2020 / Dev from 2021 / Marketing from 2022 / 3 companies"

**05 — Past Companies**
CMS array — company name + role + 1-line on what was built/learned.

**06 — How I Work**
3 principles. CMS array.

**07 — Skills + Tools**
Two columns. No skill bars.
Left: Disciplines (CMS array)
Right: Tools (CMS array)

**08 — Interests**
2–3 personal interests that connect to the work. CMS array.

**09 — Featured Work**
2–3 case study cards. Same component as homepage. CMS reference to case study documents.

**10 — CTA**
CMS-driven line + "Work with me" → `/start`

---

## 10. THE LAB — `/lab`

**Purpose:** Live content hub. Blog posts, YouTube videos, TikTok videos.

### Section Map:

**01 — Hero**
Page name + 1-line description. CMS-driven.

**02 — Featured Content**
1 large hero card — manually selected via Sanity `featuredToggle`. Drops if no featured item set.

**03 — Filter Bar**
Three pills: All · Blog · YouTube · TikTok
Active filter: brand teal highlight.
Default: All.
Filters are hardcoded (Blog, YouTube, TikTok) — not CMS-driven. New content types require a code change.

**04 — Content Feed**
Card grid — 3 columns.
CMS-driven. Drops if no content.

Each card:
- Thumbnail
- Platform tag (Blog / YouTube / TikTok)
- Title
- Date
- Read time (blog only)
- 1-line excerpt (blog only)

**Video cards:** clicking opens modal with embedded player + "Watch on YouTube/TikTok" link.
**Blog cards:** clicking → individual blog post page `/lab/[slug]`

**05 — Load More**
Button-triggered pagination. Not infinite scroll. Loads next batch.

**06 — Newsletter Capture**
Same component used site-wide. Mailchimp integration.

### Video content — Sanity schema:
```
title
platform (youtube / tiktok)
videoUrl
thumbnail (uploaded image)
description (short)
publishedAt
featuredToggle
```

Videos are added manually via CMS — no API auto-pull from YouTube or TikTok.

---

## 11. INDIVIDUAL BLOG POST — `/lab/[slug]`

### Section Map:

**01 — Post Header**
Title + Blog tag + publish date + estimated read time + social share buttons (X, LinkedIn, copy link)

**02 — Hero Image**
Full-width. CMS-driven.

**03 — Post Body**
Sanity Portable Text. Supports: headings, bold, links, inline images, blockquotes.

**04 — CTA Block**
CMS toggle (`showCTA` boolean) to show/hide per post.
If shown: "Working on something similar? Book a free consultation." → `/start`

**05 — Related Posts**
3 cards — auto-matched by tags/category. Same card component as Lab feed.
Drops if no related content exists.

**06 — Newsletter Capture**
Same component used site-wide.

### Sanity schema:
```
title
slug
excerpt
heroImage
body (Portable Text)
category
tags (array — drives related posts)
publishedAt
readTime (manual or auto-calculated)
featuredToggle
showCTA (boolean)
```

**Note on comments:** No comments section. Decision made to keep pages fast and clean. Revisit when there's genuine demand.

---

## 12. RESOURCES HUB — `/resources`

**Purpose:** Evergreen value. Guides, templates, frameworks, playbooks. Gated or paid downloads.

### Section Map:

**01 — Hero**
Page name + 1-line description. CMS-driven.

**02 — Category Filter Bar**
Filter pills — All + each category.
Categories pulled from Sanity — adding a new category automatically adds it to the filter bar.

**03 — Category Sections**
Resources grouped under bold category headings.
Card grid per category.
Drops if category has no resources.

**04 — Newsletter Capture**
Same component used site-wide.

### Resource card components:
- Cover image
- Category tag
- Resource type tag (Template / Guide / Framework / Playbook)
- Title
- 1-line description
- Access badge — "Free" (teal) or "Paid" (dark)
- CTA button: "Get it" (free) or "Buy" (paid) → individual resource page

---

## 13. INDIVIDUAL RESOURCE PAGE — `/resources/[slug]`

### Section Map:

**01 — Header**
Title + type tag + category tag + access badge

**02 — Cover Image**
Full-width.

**03 — What It Is**
2–3 sentences. CMS Portable Text.

**04 — What's Inside**
Bullet list. CMS array.

**05 — Preview**
Optional screenshots. CMS toggle (`showPreview` boolean). Drops if toggled off.

**06 — Who It's For**
Qualifier bullets. CMS array.

**07 — Download / Buy Block**
Design differs by access type:

**Free resource block:**
- "This is free. Drop your email and it's yours."
- Email input + submit button
- On submit → Mailchimp signup fires
- Success state → download button unlocks on same page
- File served from Sanity asset (PDF) or external URL (Notion link)

**Paid resource block:**
- Price displayed clearly (CMS-driven)
- "Buy now" → Stripe hosted checkout
- On payment success → redirect to confirmation page with download link
- Confirmation email sent automatically via Resend
- Download link expires after 48 hours

**08 — Related Resources**
3 cards from same category. Same card component as hub.
Drops if none exist.

### Sanity schema:
```
title
slug
description (Portable Text)
resourceType (Template / Guide / Framework / Playbook)
category
accessType (free / paid)
price (number — paid only)
coverImage
previewImages (array — optional)
whatsIncluded (array of strings)
whoItIsFor (array of strings)
fileAsset (Sanity file asset or external URL)
featuredToggle
publishedAt
showPreview (boolean)
```

---

## 14. CASE STUDY HUB — `/work`

### Section Map:

**01 — Hero**
"Work" or "Our Work" + 1-line. CMS-driven.

**02 — Filter Bar**
Industry pills — All + each industry.
Categories pulled from Sanity automatically.

**03 — Case Study Feed**
Full-width stacked rows. CMS-driven. Drops if no case studies.

**Card — full-width row:**
- Project hero image (full bleed, left)
- Client situation — 1 sentence (the problem before Growveloper)
- Result headline — bold, specific
- Industry tag
- Service tag — always "Development + Marketing"
- Tech stack pills
- "Read the full story" → `/work/[slug]`

**04 — CTA Block**
CMS-driven. "Want results like these?" + "Book a Free Consultation" → `/start`

---

## 15. INDIVIDUAL CASE STUDY — `/work/[slug]`

### Section Map:

**01 — Hero**
Project title + industry tag + service tag + hero image full bleed.

**02 — The Situation**
Client background + the problem. CMS Portable Text.

**03 — Metrics Strip**
3–4 key results. Animated counters on scroll.
CMS array — label + value pairs. e.g. "Conversion rate / 2×"

**04 — The Approach**
What Growveloper diagnosed and decided. Dev decisions + marketing decisions combined.
CMS Portable Text.

**05 — The Build**
What was built or implemented. Screenshots, campaign visuals supported.
CMS Portable Text with image support.

**06 — The Result**
Full outcome. CMS Portable Text.

**07 — Testimonial**
Client quote if available. Same testimonial card component.
Drops if no testimonial linked.

**08 — Tech Stack**
Logo strip — tools used. CMS array.

**09 — Next Case Study**
Single card → next case study. CMS reference.

**10 — CTA Block**
CMS-driven. → `/start`

### Sanity schema:
```
title
slug
clientIndustry
heroImage
situation (Portable Text)
metrics (array — label + value)
approach (Portable Text)
buildSection (Portable Text + images)
result (Portable Text)
testimonial (reference → Testimonial)
techStack (array of tool names/logos)
nextCaseStudy (reference → Case Study)
featured (boolean)
publishedAt
```

---

## 16. INDIVIDUAL AUTOMATION PAGE — `/automations/[slug]`

**Purpose:** Product page. Direct purchase or consultation booking.

### Section Map (all CMS-driven):

**01 — Hero**
Automation name + 1-line tagline + price (if fixed) + primary CTA

**02 — The Problem It Solves**
2–3 sentences. Plain language.

**03 — What It Does**
Numbered steps. CMS array.

**04 — What's Included**
Bullet list. CMS array.

**05 — Tools Used**
Logo strip. CMS array.

**06 — Setup Time**
Single stat — "Live in X days." CMS field.

**07 — Who It's For**
Qualifier bullets. CMS array.

**08 — CTA Block**
Two paths (controlled by `accessType`):
- Fixed price → Stripe payment
- Custom → "Book a consultation" → `/start`

**09 — FAQ**
3–4 questions. CMS array per automation.

**10 — Related Automations**
3 cards from same category. Drops if none.

### Sanity schema:
```
title
slug
tagline
problemStatement (Portable Text)
howItWorks (array of steps)
whatsIncluded (array)
toolsUsed (array)
setupTime
whoItIsFor (array)
accessType (fixed / custom)
price (number — fixed only)
category
featured (boolean)
faq (array — question + answer)
publishedAt
```

---

## 17. INDUSTRY SILO TEMPLATE — `/industries/[slug]`

**Single template. Four instances:** SaaS, B2B Lead Gen, AI & Tech, FinTech.
Adding a new industry in Sanity creates a new page + nav item automatically.

### Section Map (all CMS-driven):

**01 — Hero**
Industry-specific headline + sub-statement. Primary CTA: Book Consultation → `/start`

**02 — "This Is For You If..."**
4–5 industry-specific pain point bullets. CMS array.

**03 — How We Help**
3 service cards — industry-specific framing per card. CMS-driven copy per card.
Each links to its service page.

**04 — What Success Looks Like**
3 outcome stats for this industry. CMS array — label + value pairs.
Update with real data as it comes in.

**05 — Case Studies**
Filtered by industry tag. Same full-width stacked card component.
Drops completely if no case studies tagged for this industry.

**06 — Testimonials**
Filtered by industry tag. Same testimonial card.
Drops if none.

**07 — "Sound Like You?" Card**
Same reusable component. → `/start`

**08 — Industry FAQ**
4–5 industry-specific questions. CMS array.

**09 — Final CTA**
CMS-driven headline + button → `/start`

### Sanity schema:
```
industryName
slug
heroHeadline
heroSubStatement
painPoints (array)
serviceCards (array — title, description, link)
outcomeStats (array — label + value)
featuredCaseStudies (references — filtered by industry tag)
featuredTestimonials (references — filtered by industry tag)
faq (array — question + answer)
seoTitle
seoDescription
```

---

## 18. QUALIFYING FORM — `/start`

**Purpose:** Intake — not a filter. Payment elsewhere qualifies them. This gives Juwon context to prepare.
**Triggered by:** Every "Book a Consultation" CTA across the entire site.

### URL param pre-fill logic:
```
/start?service=marketing    → pre-selects Growth Marketing in Step 2
/start?service=development  → pre-selects Web Development
/start?service=ai           → pre-selects AI & Automation
/start?service=audit        → pre-selects Growth Audit
```

### Multi-step form:

**Step 1 — About You**
- Name
- Email
- Company / project name
- Website URL (optional)

**Step 2 — What You Need**
- "What are you looking to work on?" (multi-select checkboxes)
  - Web Development
  - Growth Marketing
  - AI & Automation
  - Growth Audit
  - Not sure yet — I need advice

**Step 3 — Your Situation**
- "What's the main problem you're trying to solve?" (text area)
- Monthly budget range (dropdown): Under $500 / $500–$2k / $2k–$5k / $5k+ / Not sure
- Timeline (dropdown): ASAP / 1–3 months / 3–6 months / Just exploring

**Step 4 — Confirm**
- Preferred contact method (Email / WhatsApp / Call)
- Additional context (optional text area)
- "Book my consultation" submit button

**On submit:**
- Form data emailed to Juwon via Resend
- Lead logged as Sanity document (CMS inbox)
- Redirect → `/start/confirmed`

---

## 19. CONSULTATION CONFIRMATION — `/start/confirmed`

**Sections:**

**01 — Success Message**
"You're in. Here's what happens next."

**02 — Next Steps**
1. Check your email for confirmation
2. We'll review your submission within 24 hours
3. You'll receive a calendar link to pick your slot

**03 — Calendar Embed**
Cal.com embed — book a slot immediately without waiting.

**04 — While You Wait**
2–3 resource or article cards from CMS. "Here's something useful while you wait." Drops if no content.

**05 — Soft CTA**
"Prefer to talk now?" WhatsApp or email link.

---

## 20. AUDIT PAYMENT CONFIRMATION — `/audit/confirmed`

**Sections:**

**01 — Success Message**
"Your audit is booked."

**02 — Complete Intake**
Link to intake form — separate from qualifying form. Gives Juwon info needed to conduct the audit.

**03 — What to Expect**
Delivery in 3–5 days. Package: Loom + Notion doc + walkthrough call.

**04 — Book Your Walkthrough**
Cal.com embed to book the walkthrough call in advance.

---

## 21. POPUP SYSTEM

**Critical rules:**
- No popup fires unless explicitly configured in Sanity for that page
- No data in CMS = no popup, ever
- No hardcoded default popup logic in code
- 7-day dismissal stored in localStorage
- One popup component in code — Sanity drives everything

**Sanity popup config schema (per page):**
```
pageReference (which page this config applies to)
enabled (boolean)
triggerType (scroll_depth / time_on_page / inactivity)
triggerValue (number — percentage, seconds, or idle seconds)
offerType (newsletter / lead_magnet / consultation / audit)
headline
subCopy
ctaLabel
ctaDestination (URL or action)
```

**Sanity Studio UX:** When creating a new popup config, the Studio prefills suggested values based on page type. These are suggestions only — fully overridable. Nothing is hardcoded.

**Trigger types:**
- `scroll_depth` — fires after X% scroll (e.g. 60)
- `time_on_page` — fires after X seconds on page
- `inactivity` — fires after X seconds of no scroll activity

---

## 22. LEAD CAPTURE FLOWS

### Flow 1 — Newsletter Signup (inline or popup)
```
Email input → Submit
→ Mailchimp API call
→ Success state: "You're in. Check your inbox."
→ If triggered from resource page → download unlocks immediately
```

### Flow 2 — Free Resource Download
```
Resource page → Click Download
→ Newsletter signup popup fires
→ Email input → Mailchimp signup
→ Success → download button unlocks on same page
→ File served from Sanity asset or external URL
```

### Flow 3 — Paid Resource Purchase
```
Resource page → Click Buy
→ Stripe hosted checkout
→ Payment success → Stripe webhook fires
→ Redirect to confirmation page with download link
→ Confirmation email sent via Resend
→ Download link expires after 48 hours
```

---

## 23. 404 PAGE — `/not-found`

**Sections:**
- Headline: "This page doesn't exist. But your growth problem does."
- 3 quick links: Homepage / Book a Consultation / Resources
- Latest 3 Lab posts from CMS (drops if none)

---

## 24. FULL CMS SCHEMA REFERENCE

### Case Study
```
title, slug, clientIndustry, heroImage, situation (Portable Text),
metrics (array — label + value), approach (Portable Text),
buildSection (Portable Text), result (Portable Text),
testimonial (reference), techStack (array), nextCaseStudy (reference),
featured (boolean), publishedAt
```

### Testimonial
```
quote, name, role, company, companyLogo, avatar, rating,
industry (tag — for industry silo filtering),
service (tag — for service page filtering),
featured (boolean)
```

### Blog Post
```
title, slug, excerpt, heroImage, body (Portable Text),
category, tags (array), publishedAt, readTime,
featuredToggle, showCTA (boolean)
```

### Video (Lab)
```
title, platform (youtube/tiktok), videoUrl,
thumbnail, description, publishedAt, featuredToggle
```

### Resource
```
title, slug, description (Portable Text), resourceType,
category, accessType (free/paid), price, coverImage,
previewImages (array), whatsIncluded (array),
whoItIsFor (array), fileAsset, featuredToggle,
publishedAt, showPreview (boolean)
```

### Automation
```
title, slug, tagline, problemStatement (Portable Text),
howItWorks (array), whatsIncluded (array), toolsUsed (array),
setupTime, whoItIsFor (array), accessType (fixed/custom),
price, category, featured (boolean), faq (array), publishedAt
```

### Industry Page
```
industryName, slug, heroHeadline, heroSubStatement,
painPoints (array), serviceCards (array),
outcomeStats (array), featuredCaseStudies (references),
featuredTestimonials (references), faq (array),
seoTitle, seoDescription
```

### FAQ
```
question, answer, page (which page it appears on — reference or string)
```

### Popup Config
```
pageReference, enabled (boolean), triggerType,
triggerValue (number), offerType, headline,
subCopy, ctaLabel, ctaDestination
```

### Navigation
```
serviceLinks (array — label + url), industryLinks (array — label + url),
ctaLabel, ctaUrl, socialLinks (array — platform + url)
```

### Site Settings
```
seoTitle (default), seoDescription (default),
ogImage (default), socialLinks, contactEmail,
whatsappNumber, newsletterHeadline, newsletterSubCopy
```

### Lead (form submissions inbox)
```
name, email, company, websiteUrl, servicesInterested (array),
problemStatement, budgetRange, timeline,
preferredContact, additionalContext, submittedAt
```

---

## 25. SEO & AEO ARCHITECTURE

- Every article starts with a 3-sentence `executiveSummary` field — optimised for LLM scraping (Perplexity, SearchGPT, ChatGPT)
- `generateMetadata` function required on every page — pulls from Sanity site settings
- Schema markup (JSON-LD) injected per page:
  - `TechnicalArticle` — Lab articles
  - `CaseStudy` — Case study pages
  - `SoftwareApplication` — Automation product pages
  - `Organization` — Site-wide
  - `Person` — The Brains page
  - `Service` — Service pages
- Sitemap auto-generated from all CMS-driven routes
- Open Graph + Twitter card meta on every page
- Canonical URLs on all pages

---

## 26. TRACKING SETUP

- GTM loaded via `next/script` with `strategy="afterInteractive"`
- Never call `window.dataLayer` directly — use `/lib/analytics.ts` helper
- All CTA buttons fire `cta_click` with `{ page, cta_label, destination }`
- Form steps fire `form_start` on mount, `form_complete` on submit
- Stripe payment success fires `purchase` event with `{ item, value, currency }`
- Resource download fires `download` event with `{ resource_title, access_type }`

**GA4 events:**
```
cta_click — every CTA button
form_start — qualifying form opened
form_complete — qualifying form submitted
audit_purchase — Growth Audit payment
resource_purchase — paid resource payment
resource_download — free resource downloaded
newsletter_signup — any Mailchimp signup
scroll_depth — 25/50/75/100% per page
video_play — any video opened in modal
popup_shown — popup displayed
popup_dismissed — popup closed without action
popup_converted — popup CTA clicked
```

---

## 27. PERFORMANCE TARGETS

| Metric | Target |
|---|---|
| LCP | < 1.0s |
| Lighthouse Performance | 100 |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | 95+ |
| Core Web Vitals | All green |

- All images via `next/image` — WebP, lazy loading, explicit dimensions
- `priority` prop only on hero/above-fold images
- Fonts via `next/font` only
- Lazy load below-fold heavy components via `dynamic()`
- Tailwind purge in production
- Edge deployment on Vercel

---

## 28. FOLDER STRUCTURE

```
/app
  /page.tsx
  /audit
    /page.tsx
    /confirmed/page.tsx
  /services
    /marketing/page.tsx
    /development/page.tsx
    /ai/page.tsx
  /automations
    /page.tsx
    /[slug]/page.tsx
  /start
    /page.tsx
    /confirmed/page.tsx
  /work
    /page.tsx
    /[slug]/page.tsx
  /lab
    /page.tsx
    /[slug]/page.tsx
  /resources
    /page.tsx
    /[slug]/page.tsx
  /industries
    /[slug]/page.tsx
  /about/page.tsx
  /privacy/page.tsx
  /terms/page.tsx
  /not-found.tsx

/components
  /shared
    /Navigation.tsx
    /Footer.tsx
    /CTABanner.tsx
    /MicroCTA.tsx
    /SoundLikeYouCard.tsx
    /CaseStudyCard.tsx
    /TestimonialCard.tsx
    /NewsletterCapture.tsx
    /Popup.tsx
    /VideoModal.tsx
    /SectionLabel.tsx
    /LoadMore.tsx
  /home
    /Hero.tsx
    /DiagnosisCards.tsx
    /ServicesAlternating.tsx
    /IndustriesGrid.tsx
    /SuccessAnimation.tsx
    /ProcessSteps.tsx
    /LiveFeed.tsx
  /forms
    /QualifyingForm
      /Step1.tsx
      /Step2.tsx
      /Step3.tsx
      /Step4.tsx
      /index.tsx
  /animations
    /LighthouseCounter.tsx
    /ChartClimb.tsx
    /WorkflowAnimation.tsx
    /MetricsCounter.tsx

/lib
  /sanity
    /client.ts
    /queries.ts
    /schemas/
  /analytics.ts
  /mailchimp.ts
  /stripe.ts
  /types.ts
  /utils.ts
  /constants.ts

/public
  /fonts
  /images

/styles
  /globals.css
```

---

## 29. ENVIRONMENT VARIABLES

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA4_ID=
SENTRY_DSN=
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
MAILCHIMP_API_KEY=
MAILCHIMP_AUDIENCE_ID=
NEXT_PUBLIC_CALCOM_URL=
```

---

## 30. BUILD ORDER

Build in stages. Complete and review each stage before moving to the next.

| Stage | What to build |
|---|---|
| 1 | Foundation — repo, design tokens, typography, layout shell (Nav + Footer), `.windsurfrules` in root |
| 2 | Homepage — all 13 sections, GSAP setup, Success animation, responsive |
| 3 | Core service pages — Audit, Marketing, Development, AI |
| 4 | Sanity CMS — all schemas, Studio config, GROQ queries, wiring to pages |
| 5 | Supporting pages — The Brains, Qualifying form + confirmations, Automations catalogue + product pages |
| 6 | The Lab + Resources — blog post page, video modal, resource page, download flows, Mailchimp + Stripe integration |
| 7 | Case study hub + individual pages |
| 8 | Industry silo template — single template, 4 instances, dynamic routing |
| 9 | Popup system — component + Sanity config wiring |
| 10 | Tracking + performance — GTM/GA4 events, server-side GTM, schema markup, Sentry, Lighthouse 100 |
## 31. LOGO ASSETS

All logo files are PNG with transparent background.
Located in /public/images/logo/

Files:
- logo-icon-dark.png     — white G mark, transparent bg (dark mode)
- logo-icon-light.png    — dark teal G mark, transparent bg (light mode)
- logo-wordmark-dark.png — white GRWVLP + teal W arrow, transparent bg (dark mode)
- logo-wordmark-light.png — dark GRWVLP + teal W arrow, transparent bg (light mode)

Usage rules:
- Nav bar: wordmark version. Switch between dark/light variant based on 
  data-theme attribute on <html>
- Favicon: use logo-icon-dark.png at 32×32 and 180×180
- Social profiles / OG image: logo-icon-dark.png on teal #2b7575 background
- Never add a background to the PNG files in code — 
  the page/component background is always behind them
- Never resize logos below 24px height in the nav
- Swap logic in code:
  [data-theme="dark"]  → use logo-*-dark.png
  [data-theme="light"] → use logo-*-light.png
- In Sanity site settings: logo asset field accepts both variants —
  Juwon can swap logo files from the CMS without code changes
---

*This document is the build contract for Growveloper. Every section, component, route, CMS schema and flow is defined here. Do not make assumptions — if something isn't in this document, ask before building it.*