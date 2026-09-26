/* ============================================================
   /about (v2, 2026-09-26): the combined view and the three sides.

   Static because this rebuild ran with no Sanity writes. Every claim
   traces to career-ops cv.md, cv-dev.md or config/facts.yml, and the
   measured Lighthouse numbers in docs/DEV-SITE-METRICS-2026-09-25.md.
   Left out on purpose: the current paid-media client, the one current
   Growveloper client, "Founder of Growveloper" as an employer line,
   client names Juwon has not cleared for the public page (the credit
   unions stay unnamed), n8n and Make as shipped work, Supabase.
   ============================================================ */

import type {
  ArchitectureLayersData,
  AboutLink,
  AboutTrackKey,
  AboutTrackTab,
  AboutViewData,
  AboutViewKey,
} from "@/lib/types";

/* --- Hero headline: two versions. Juwon picks; version 1 is rendered. --- */

export const ABOUT_HEADLINE_VERSIONS = {
  v1: "A developer who markets, and a marketer who ships code.",
  v2: "A marketer who codes, and a developer who markets.",
} as const;

export const ABOUT_HEADLINE: string = ABOUT_HEADLINE_VERSIONS.v1;

export const ABOUT_HERO = {
  kicker: "Lagos · Remote · US Eastern hours",
  firstName: "Oyekola",
  accentName: "Obajuwon",
  /** The huge faded word behind the portrait: the name people call him. */
  backdropWord: "JUWON",
  summary:
    "I build production web apps in Next.js and TypeScript, and I run the paid media that sends people to them. Four years of it, for clients in the US and Nigeria.",
  portraitAlt:
    "Oyekola Obajuwon, called Juwon, in a black jacket with silver clasps and rimless glasses. Photo by Hotman Visuals.",
} as const;

export const ABOUT_CV: AboutLink = {
  label: "Download CV",
  href: "/cv/oyekola-obajuwon-cv.pdf",
  download: true,
};

export const ABOUT_GITHUB: AboutLink = {
  label: "GitHub",
  href: "https://github.com/shinigamieaper",
  external: true,
};

export const ABOUT_QUIET_LINKS: AboutLink[] = [
  ABOUT_GITHUB,
  { label: "LinkedIn", href: "https://www.linkedin.com/in/obajuwon-oyekola", external: true },
  { label: "hello@growveloper.com", href: "mailto:hello@growveloper.com" },
];

export const ABOUT_BOOKING: AboutLink = {
  label: "Book a 30-minute call",
  href: "https://cal.com/growveloper/30",
  external: true,
};

/* --- The switch --- */

export const ABOUT_TRACK_TABS: AboutTrackTab[] = [
  { key: "dev", label: "Development" },
  { key: "marketing", label: "Marketing" },
  { key: "growth", label: "Growth Engineering" },
];

/* ?track= values. Anything else shows the combined view. */
export const ABOUT_TRACK_PARAM_ALIASES: Record<string, AboutTrackKey> = {
  dev: "dev",
  development: "dev",
  developer: "dev",
  marketing: "marketing",
  marketer: "marketing",
  growth: "growth",
  "growth-engineering": "growth",
};

export function resolveAboutTrack(value: string | string[] | undefined): AboutTrackKey | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return null;
  return ABOUT_TRACK_PARAM_ALIASES[raw.toLowerCase()] ?? null;
}

/* --- Shared links --- */

const RIDEON_CASE = { label: "Case study", href: "/work/rideon-nigeria" };
const RIDEON_ARCH = { label: "How it's built", href: "/work/rideon-nigeria#architecture" };
const RIDEON_LIVE = { label: "Live site", href: "https://www.rideonnigeria.com", external: true };
const VIP_CASE = { label: "Case study", href: "/work/vip-creative-studio" };
const VIP_LIVE = { label: "Live site", href: "https://www.vipcreative.studio", external: true };
const BBSL_CASE = { label: "Case study", href: "/work/baye-business-solutions" };
const BBSL_LIVE = { label: "Live site", href: "https://bayebusinesssolutions.com", external: true };
const GV_CODE = { label: "Code", href: "https://github.com/shinigamieaper/Growveloper", external: true };

/* --- The four views --- */

const ALL: AboutViewData = {
  key: "all",
  statement: { lead: "I build the site, run the ads to it, and", accent: "prove it worked." },
  body:
    "Most companies split that across a developer, a media buyer and an analyst who rarely talk. I do all three, so the page is built for the ad that sends people to it and the tracking is planned before launch. Pick a side below to see the proof for the job you're hiring for.",
  howIWork:
    "I work US Eastern hours from Lagos, in writing, and I own a project end to end.",
  stats: [
    { value: "4", label: "Portals on one codebase, built alone", source: "RideOn Nigeria" },
    { value: "$150K+", label: "In ad spend managed", source: "Across ad accounts, cumulative" },
    { value: "$10M+", label: "In managed growth", source: "A credit union's deposit push" },
    { value: "4 yrs", label: "Building for the web and running growth", source: "Since May 2022" },
  ],
  projectsHeading: "Three projects, one from each side",
  projects: [
    {
      id: "rideon",
      client: "RideOn Nigeria",
      period: "Aug 2025 to May 2026",
      title: "A four-portal mobility platform, built alone",
      summary:
        "Customer, driver, fleet partner and admin portals on one Next.js codebase, replacing bookings that ran on WhatsApp and spreadsheets.",
      visual: { kind: "caseStudy", slug: "rideon-nigeria", frame: "phone", alt: "The RideOn Nigeria customer booking screen on a phone" },
      links: [RIDEON_CASE, RIDEON_LIVE],
    },
    {
      id: "credit-union",
      client: "VIP Creative Studio, for a US credit union",
      period: "Aug 2025 to May 2026",
      title: "A credit-union ad account, turned around",
      summary:
        "I inherited a faulty account under NCUA advertising rules and took it to a 99.9% optimisation score, then moved budget to the campaigns that produced applications.",
      visual: {
        kind: "type",
        lines: ["Meta + Google Ads", "NCUA-regulated", "$16,000+ a month", "Every ad reviewed before it ran"],
        caption: "The account, in four lines",
      },
      links: [VIP_CASE],
    },
    {
      id: "bbsl",
      client: "Baye Business Solutions",
      period: "Apr to Oct 2025",
      title: "One person for the site, the tracking and the ads",
      summary:
        "Rebuilt a broken PHP site in Next.js and MongoDB, set up GA4 and Clarity from zero, then designed geo-targeted Google Ads campaigns for it.",
      visual: { kind: "caseStudy", slug: "baye-business-solutions", frame: "screen", alt: "The Baye Business Solutions home page I rebuilt" },
      links: [BBSL_CASE, BBSL_LIVE],
    },
  ],
  tools: [
    { group: "Build", items: ["Next.js", "React", "TypeScript", "Node.js", "Firebase", "Sanity"] },
    { group: "Grow", items: ["Google Ads", "Meta Ads", "GA4", "Tag Manager", "Looker Studio"] },
  ],
};

const DEV: AboutViewData = {
  key: "dev",
  statement: { lead: "I build production web apps,", accent: "end to end." },
  body:
    "Next.js, React and TypeScript on the front; Node, Firebase, MongoDB and Sanity behind it; Vercel and Sentry in production. The biggest thing I've built is RideOn: four portals on one codebase, with the access rules enforced at four layers and six scheduled jobs running the day-to-day. I built all of it on my own.",
  howIWork:
    "I also run paid media, so I build with conversion tracking and page speed in mind from day one.",
  stats: [
    { value: "4", label: "Layers of role-based access, one rule", source: "RideOn Nigeria" },
    { value: "6", label: "Production cron jobs", source: "RideOn Nigeria" },
    { value: "30", label: "Sanity schemas behind this site", source: "growveloper.com" },
    { value: "97", label: "Lighthouse desktop performance", source: "vipcreative.studio, Sept 2026" },
  ],
  projectsHeading: "Selected builds",
  projectsLink: { label: "All my code on GitHub", href: "https://github.com/shinigamieaper", external: true },
  projects: [
    {
      id: "rideon-dev",
      client: "RideOn Nigeria",
      period: "Aug 2025 to May 2026",
      title: "Four portals, one codebase, four layers of access control",
      summary:
        "Edge middleware, route guards, component checks and Firestore security rules all enforce the same roles. Driver assignment runs every five minutes on Firestore transactions, so two drivers can never take one booking. Dojah handles KYC.",
      visual: { kind: "caseStudy", slug: "rideon-nigeria", frame: "phone", alt: "The RideOn Nigeria customer booking screen on a phone" },
      links: [RIDEON_ARCH, RIDEON_LIVE],
    },
    {
      id: "growveloper",
      client: "growveloper.com",
      title: "This site, in the open",
      summary:
        "Next.js 16 with Cache Components, React 19, TypeScript strict and 30 Sanity schemas. A paid audit checkout verifies Flutterwave webhook signatures and returns a safe 200 when a side effect fails, so the provider never retries into a loop.",
      visual: {
        kind: "image",
        src: "/images/about/growveloper-home",
        width: 1140,
        height: 720,
        alt: "The growveloper.com home page",
        frame: "screen",
      },
      links: [GV_CODE, { label: "Live site", href: "/" }],
    },
    {
      id: "career-ops",
      client: "career-ops",
      title: "A multi-agent system on Claude",
      summary:
        "An orchestrator and five specialist agents, each with its own memory, tool limits and safety hooks, with a 30-case evaluation for its screening agent. The public skill edition is on GitHub.",
      visual: {
        kind: "type",
        lines: ["orchestrator", "  scout", "  builder", "  applicator", "  correspondent", "  retro"],
        caption: "The agent roster",
      },
      links: [{ label: "Code", href: "https://github.com/shinigamieaper/career-ops-skill", external: true }],
    },
  ],
  more: [
    {
      name: "VIP Creative Studio",
      detail: "13-page agency site on Next.js and Sanity, 19 schema files, edited by a non-technical team",
      href: "/work/vip-creative-studio",
    },
    {
      name: "Baye Business Solutions",
      detail: "Broken PHP site rebuilt in Next.js and MongoDB, with a Tiptap editor and an admin dashboard",
      href: "/work/baye-business-solutions",
    },
    {
      name: "Dara, Nigerian Languages API",
      detail: "Node, Express and PostgreSQL, dialect-aware data across Hausa, Igbo and Yoruba, OpenAPI docs",
    },
  ],
  tools: [
    { group: "Front end", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Motion"] },
    { group: "Back end and data", items: ["Node.js", "Express", "Firebase Auth and Firestore", "MongoDB", "PostgreSQL", "Sanity"] },
    { group: "Production", items: ["Vercel", "Sentry", "Stripe", "Flutterwave", "Zod"] },
    { group: "Every day", items: ["Git", "Claude Code"] },
  ],
};

const MARKETING: AboutViewData = {
  key: "marketing",
  statement: { lead: "I run paid media and judge it by", accent: "what it brings in." },
  body:
    "I've managed $150,000+ in ad spend, including $16,000+ a month across Meta and Google for two US credit unions at VIP Creative Studio, where every ad was reviewed against financial advertising rules before it ran. I also do the work around the ads, from GA4 and Tag Manager to SEO for search engines and AI answers.",
  howIWork:
    "I judge a campaign by the applications it produces, not the clicks, and I report it in numbers a VP of Marketing can act on.",
  stats: [
    { value: "$150K+", label: "In ad spend managed", source: "Across ad accounts, cumulative" },
    { value: "$10M+", label: "In managed growth", source: "A credit union's deposit push" },
    { value: "250", label: "Credit-card applications in one month", source: "A US credit union" },
    { value: "28,800+", label: "Page views in two months", source: "Same campaigns" },
    { value: "99.9%", label: "Google Ads optimisation score", source: "After the turnaround" },
    { value: "500+", label: "Negative keywords added", source: "Same account" },
    { value: "5,700+", label: "Instagram followers", source: "RideOn Nigeria" },
    { value: "4 yrs", label: "Running Google Ads", source: "Since 2022" },
  ],
  projectsHeading: "Selected campaigns and setups",
  projects: [
    {
      id: "credit-union-mkt",
      client: "VIP Creative Studio, for a US credit union",
      period: "Aug 2025 to May 2026",
      title: "The credit-union turnaround",
      summary:
        "Rewrote and A/B tested the copy, built audience personas and grew the negative-keyword list past 500. Then used the account's GA4 and conversion tracking to move budget from high-click campaigns to the ones that produced applications.",
      visual: {
        kind: "type",
        lines: ["Inherited: a faulty account", "Rebuilt: copy, personas, 500+ negatives", "Moved: budget to applications"],
        caption: "What changed",
      },
      links: [VIP_CASE],
    },
    {
      id: "bbsl-mkt",
      client: "Baye Business Solutions",
      period: "Apr to Oct 2025",
      title: "Analytics from zero, and search that AI can read",
      summary:
        "GA4 and Microsoft Clarity gave the business its first view of traffic and drop-offs. Typed schema, a dynamic sitemap and llms.txt made the site readable to Google and to AI answer engines, backed by a 12-week content calendar.",
      visual: { kind: "caseStudy", slug: "baye-business-solutions", frame: "screen", alt: "The Baye Business Solutions home page" },
      links: [BBSL_CASE, BBSL_LIVE],
    },
    {
      id: "rideon-mkt",
      client: "RideOn Nigeria",
      period: "Aug 2025 to May 2026",
      title: "From ride-hailing to professional mobility",
      summary:
        "Moved the brand out of a price war with Bolt into a different category, then led the social content. The platform grew to 5,700+ Instagram followers with 100% positive Facebook reviews.",
      visual: { kind: "caseStudy", slug: "rideon-nigeria", frame: "phone", alt: "The RideOn Nigeria booking screen" },
      links: [RIDEON_CASE],
    },
  ],
  tools: [
    { group: "Paid media", items: ["Google Ads (Search, Display, YouTube, Performance Max)", "Meta Ads Manager", "LinkedIn Campaign Manager"] },
    { group: "Measurement", items: ["GA4", "Google Tag Manager", "Looker Studio", "Microsoft Clarity", "Search Console"] },
    { group: "Search and AI answers", items: ["SEMrush", "Ahrefs", "Schema markup", "llms.txt"] },
    { group: "Email", items: ["Mailchimp", "HubSpot", "Zoho Marketing Plus"] },
  ],
};

const GROWTH: AboutViewData = {
  key: "growth",
  statement: { lead: "One person for the page, the ads and", accent: "the numbers in between." },
  body:
    "When the ad, the landing page and the tracking belong to three people, nobody owns the result. I build the page for the ad that points to it and set up the events that judge both before launch. When the numbers say something is off, I can change the ad, the page or the tracking the same afternoon.",
  howIWork:
    "I build the campaign, build the landing page it points to, and wire the tracking that proves it worked.",
  stats: [
    { value: "$10M+", label: "In managed growth", source: "A credit union's deposit push" },
    { value: "2", label: "Product launches, from positioning to landing page", source: "VIP Creative Studio" },
    { value: "250", label: "Credit-card applications in one month, tracked end to end", source: "A US credit union" },
  ],
  projectsHeading: "Where I closed the loop",
  projects: [
    {
      id: "bbsl-growth",
      client: "Baye Business Solutions",
      period: "Apr to Oct 2025",
      title: "Site, tracking, ads and nurture emails, one owner",
      summary:
        "Rebuilt the site, set up GA4 and Clarity, designed geo-targeted Google Ads by service line, and wired the contact form into Zoho, so every enquiry landed in the CRM and a nurture sequence.",
      visual: { kind: "caseStudy", slug: "baye-business-solutions", frame: "screen", alt: "The Baye Business Solutions home page" },
      links: [BBSL_CASE, BBSL_LIVE],
    },
    {
      id: "vip-growth",
      client: "VIP Creative Studio",
      period: "Aug 2025 to May 2026",
      title: "Campaigns for the clients, a site for the studio",
      summary:
        "Positioning, ad copy and landing-page funnels for the Share Certificate and Holiday Loan launches. I also built the studio's own 13-page site and set up its GA4.",
      visual: { kind: "caseStudy", slug: "vip-creative-studio", frame: "screen", contain: true, alt: "The VIP Creative Studio home page I built" },
      links: [VIP_CASE, VIP_LIVE],
    },
    {
      id: "gv-growth",
      client: "growveloper.com",
      title: "Tracking built into the code",
      summary:
        "Scroll-depth events at 25, 50, 75 and 100%, typed Tag Manager events for every call to action and form, and Consent Mode v2 set to denied until a visitor agrees.",
      visual: {
        kind: "image",
        src: "/images/about/growveloper-home",
        width: 1140,
        height: 720,
        alt: "The growveloper.com home page",
        frame: "screen",
      },
      links: [GV_CODE],
    },
  ],
  tools: [
    { group: "Build", items: ["Next.js", "React", "TypeScript", "Sanity", "Zod forms"] },
    { group: "Measure", items: ["GA4", "Tag Manager, server and client side", "Consent Mode v2", "Clarity", "Looker Studio"] },
    { group: "Grow", items: ["Google Ads", "Meta Ads", "Technical SEO", "AI search"] },
    { group: "Follow up", items: ["Zoho nurture sequences", "Mailchimp", "Resend"] },
  ],
};

export const ABOUT_VIEWS: Record<AboutViewKey, AboutViewData> = {
  all: ALL,
  dev: DEV,
  marketing: MARKETING,
  growth: GROWTH,
};

/* --- RideOn architecture, rendered on /work/rideon-nigeria (code-side, no Sanity field yet) --- */

export const RIDEON_ARCHITECTURE: ArchitectureLayersData = {
  headline: "How the platform keeps four kinds of user apart",
  intro:
    "Customers, drivers, fleet partners and admins share one Next.js app. The same access rule is enforced four times, so a mistake in one layer is caught by the next.",
  caption: "Customer · Driver · Partner · Admin",
  layers: [
    { name: "Edge middleware", detail: "Checks the session cookie before any page loads and blocks open redirects." },
    { name: "Route guards", detail: "Each portal's routes refuse a user with the wrong role." },
    { name: "Component checks", detail: "Screens and buttons render per role, down to single actions." },
    {
      name: "Firestore security rules",
      detail: "The database enforces it again: per-portal collections, owner-only reads, admin-only writes.",
    },
  ],
  annex: {
    headline: "Six scheduled jobs in production",
    items: [
      {
        name: "Every 5 min",
        detail:
          "Driver assignment on Firestore transactions, so two drivers can't take one booking. Offers widen from 10 to 25 to 60 drivers as a booking waits.",
      },
      { name: "Every 15 min", detail: "Retries failed emails with backoff (5 min, 30 min, 2 hr) and a cap on attempts." },
      { name: "Hourly", detail: "Driver nudges." },
      { name: "Daily", detail: "Scans driver documents for expiry." },
      { name: "Daily", detail: "Purges soft-deleted records." },
      { name: "Monthly", detail: "Generates partner invoices." },
    ],
  },
};
