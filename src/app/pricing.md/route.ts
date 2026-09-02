import { getAuditPage } from "@/lib/sanity/queries";
import { SITE_URL } from "@/lib/seo";

/* /pricing.md — the offer ladder in a form an AI agent can read without
   rendering a page. Numbers mirror the live FAQ answers; the audit price
   comes from the CMS so the two can never drift apart. Approved 2026-09-03. */

const LAST_UPDATED = "2026-09-03";

export async function GET() {
  const audit = await getAuditPage();
  const auditPrice = audit?.heroPrice ?? "$500";

  const body = `# Pricing: GROWVELOPER

Last updated: ${LAST_UPDATED}
Currency: United States dollars unless stated. Nigerian clients can pay in naira.
Every engagement starts with the free consultation. Nothing is sold before it.

## Free consultation

- Price: $0
- Length: 30 minutes, video call
- What happens: you describe the business and the bottleneck. You leave with the problems named,
  the fixes named, and a price for each fix. No pitch deck.
- Book: ${SITE_URL}/start

## Specific request, fixed quote

- Price: quoted per request as one fixed number, agreed before work starts
- Typical requests: instant reply and booking link for every new enquiry, quote and invoice
  follow-up sequences, WhatsApp to CRM sync, Google Business Profile setup, a landing page for
  one service, weekly reporting that reads itself
- Retainer required: no
- Timeline: automations usually go live in one to four weeks per workflow

## Growth Audit

- Price: ${auditPrice} flat
- What you get: a 25 to 40 page diagnostic of the website, search visibility, ads, analytics
  and conversion flow, with a ranked list of what is losing revenue and a walkthrough call
- Credit: the fee is credited against any project signed within 60 days
- Details: ${SITE_URL}/audit

## Website builds

- Price: $2,000 to $10,000 and up, quoted as one fixed number after the consultation
- Includes: design, build on Next.js and Sanity, editable without a developer, performance and
  search fundamentals, analytics and conversion tracking
- Timeline: site rebuilds usually ship in 6 to 10 weeks

## Growth marketing retainers

- Price: from $1,500 per month, rolling monthly, no long contract
- Covers: search engine optimization, answer engine optimization, local search, paid ads,
  content, conversion rate optimization, analytics and reporting
- Scope: one or two channels first, expanded as results are proven

## Who it is for

Owner-run and small to mid-sized businesses: local service businesses, SaaS, B2B lead
generation, AI and tech startups, FinTech. Nigeria, United States, United Kingdom. Remote.

## Contact

- Start: ${SITE_URL}/start
- Email: hello@growveloper.com
- Site: ${SITE_URL}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
