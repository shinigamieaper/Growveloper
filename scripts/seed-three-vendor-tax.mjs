/**
 * One-off seed script — creates the "Three-Vendor Tax" blog post,
 * uploads its 3 image assets, and seeds 6 FAQ documents linked to the post.
 *
 * Prep:
 *   Drop hero.png, cost-bar-chart.png, and four-costs-grid.png into
 *   scripts/assets/three-vendor-tax/ before running.
 *
 * Run:
 *   node scripts/seed-three-vendor-tax.mjs
 *
 * Safe to re-run: uses createOrReplace for the post and FAQs.
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config({ path: ".env.local" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.join(__dirname, "assets", "three-vendor-tax");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

/* ─── IDs ─── */
const POST_ID = "blogPost-three-vendor-tax";
const FAQ_IDS = [
  "faq-three-vendor-tax-q1",
  "faq-three-vendor-tax-q2",
  "faq-three-vendor-tax-q3",
  "faq-three-vendor-tax-q4",
  "faq-three-vendor-tax-q5",
  "faq-three-vendor-tax-q6",
];

/* ─── Image upload ─── */
const IMAGE_FILES = {
  hero: "three-vendor-tax-hero.png",
  costBar: "three-vendor-tax-03a-cost-breakdown.png",
  fourCosts: "three-vendor-tax-03b-four-costs.png",
};

async function uploadImage(filename) {
  const fullPath = path.join(ASSETS_DIR, filename);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠ ${filename} not found at ${fullPath} — skipping.`);
    return null;
  }
  const buf = fs.readFileSync(fullPath);
  const contentType = filename.endsWith(".jpg") || filename.endsWith(".jpeg") ? "image/jpeg" : "image/png";
  const asset = await client.assets.upload("image", buf, { filename, contentType });
  console.log(`  ✓ uploaded ${filename} → ${asset._id}`);
  return asset._id;
}

/* ─── Portable Text helpers ─── */

let _key = 0;
const k = () => `k${(_key++).toString(36)}`;

/** Plain text span (optionally bold/italic/code). */
const span = (text, marks = []) => ({
  _type: "span",
  _key: k(),
  text,
  marks,
});

/**
 * Build a paragraph (or styled block) from rich parts.
 * parts: Array of:
 *   - string                                 → plain text
 *   - { text, bold?, em?, code? }            → marked span
 *   - { link, href }                         → hyperlink
 *   - { link, href, bold?, em? }             → marked hyperlink
 */
function richBlock(style, parts, listItem = undefined, level = undefined) {
  const markDefs = [];
  const children = [];
  for (const p of parts) {
    if (typeof p === "string") {
      children.push(span(p));
      continue;
    }
    if (p.link && p.href) {
      const linkKey = k();
      markDefs.push({ _type: "link", _key: linkKey, href: p.href });
      const marks = [linkKey];
      if (p.bold) marks.push("strong");
      if (p.em) marks.push("em");
      children.push(span(p.link, marks));
      continue;
    }
    const marks = [];
    if (p.bold) marks.push("strong");
    if (p.em) marks.push("em");
    if (p.code) marks.push("code");
    children.push(span(p.text ?? "", marks));
  }
  const block = {
    _type: "block",
    _key: k(),
    style,
    markDefs,
    children,
  };
  if (listItem) block.listItem = listItem;
  if (level) block.level = level;
  return block;
}

const para = (parts) => richBlock("normal", typeof parts === "string" ? [parts] : parts);
const h2 = (text) => richBlock("h2", [text]);
const h3 = (text) => richBlock("h3", [text]);
const quote = (parts) => richBlock("blockquote", typeof parts === "string" ? [parts] : parts);
const bullet = (parts) => richBlock("normal", typeof parts === "string" ? [parts] : parts, "bullet", 1);

const image = (assetRef, alt, caption) => ({
  _type: "image",
  _key: k(),
  asset: { _type: "reference", _ref: assetRef },
  alt,
  ...(caption ? { caption } : {}),
});

const costTable = (data) => ({
  _type: "costTable",
  _key: k(),
  ...data,
});

/* ─── Build the post body ─── */

function buildBody({ costBarRef, fourCostsRef }) {
  const blocks = [];

  /* Intro paragraphs (after the page's TL;DR field renders) */
  blocks.push(
    para([
      "If you've hired more than one agency in the last 18 months, the three-vendor tax is probably already in your numbers. You haven't seen it because no one invoices for it. It shows up as slipped timelines, dashboards that disagree, and a quarter you spent scheduling instead of selling.",
    ]),
  );
  blocks.push(
    para([
      "This post is for founder-led businesses doing roughly $500K to $3M in revenue, with no in-house marketer, who keep getting handed three quotes when they need one outcome.",
    ]),
  );

  /* Table of contents */
  blocks.push(h3("Table of contents"));
  const toc = [
    ["What is the three-vendor tax?", "#what-is-the-three-vendor-tax"],
    ["How much does it actually cost?", "#how-much-does-it-actually-cost"],
    ["Cost 1: The rebuild tax", "#cost-1-the-rebuild-tax"],
    ["Cost 2: The gap tax", "#cost-2-the-gap-tax"],
    ["Cost 3: The standstill tax", "#cost-3-the-standstill-tax"],
    ["Cost 4: The translation tax", "#cost-4-the-translation-tax"],
    ["Why three vendors became the default", "#why-three-vendors-became-the-default"],
    ["The audit-is-a-sales-pitch trap", "#the-audit-is-a-sales-pitch-trap"],
    ["When three vendors actually win", "#when-three-vendors-actually-win"],
    ["When one studio wins", "#when-one-studio-wins"],
    ["Why 2026 changes the math", "#why-2026-changes-the-math"],
    ["FAQ", "#faq"],
  ];
  for (const [label, href] of toc) {
    blocks.push(bullet([{ link: label, href }]));
  }

  /* §1 — What is the three-vendor tax? */
  blocks.push(h2("What is the three-vendor tax?"));
  blocks.push(
    para([
      "The three-vendor tax is the hidden coordination cost a small business pays to keep a marketing agency, a web development shop, and an AI or automation consultant working on the same business at the same time. It shows up in four buckets: rebuilt work, missing data between handoffs, projects stalled by another vendor's delay, and the founder's calendar.",
    ]),
  );
  blocks.push(para("The retainers are the receipt. The tax is what those receipts don't show."));
  blocks.push(
    para([
      "I noticed this pattern walking into two businesses in different shapes. Baye Business Solutions in Lagos had a marketing strategy from one team and a website built by another that couldn't track any of it. RideOn Nigeria needed a public site, a driver portal, and a corporate booking flow sharing the same auth and data, but no single vendor was scoped to own the seam.",
    ]),
  );
  blocks.push(
    para([
      "Different industries. Same pattern. Multiple vendors paid to look at a piece of the same business, and the seams in between stayed unowned.",
    ]),
  );
  blocks.push(
    para([
      { link: "The RideOn build is here", href: "https://growveloper.com/work/rideon-nigeria" },
      " if you want to see what the integrated version looks like before the math.",
    ]),
  );

  /* §2 — How much does it actually cost? */
  blocks.push(h2("How much does it actually cost?"));
  blocks.push(
    para([
      "For a US-based service business doing about $1.5M in annual revenue, the realistic mid-range three-vendor tax is around $190,000 a year, or roughly 12% of revenue. The low end is $50K. The high end clears $390K once retainer creep, rework, and founder time are priced in.",
    ]),
  );
  blocks.push(
    para([
      "The breakdown sits across six line items — marketing retainer, web dev, AI/automation consulting, tooling and SaaS overlap, year-one rework, and founder coordination time — sourced from public agency pricing data including ",
      { link: "SE Ranking's 2024 SEO pricing study", href: "https://seranking.com/blog/seo-pricing/" },
      " (n=260 agencies, common monthly retainer range $500–$1,000) and Clutch and GoodFirms agency directories for development and AI consulting ranges. The mid case looks like this:",
    ]),
  );

  blocks.push(
    para([
      "Most small businesses I've audited live in this mid column. They're paying about 12% of revenue, and roughly a third of that 12% is buying nothing. It's friction.",
    ]),
  );
  blocks.push(
    para([
      "For a smaller local services business doing $800K, the same shape compresses to about $24K low, $72K mid, $163K high. The percentages stay almost identical because the friction scales with the number of vendors, not the size of the business.",
    ]),
  );

  if (costBarRef) {
    blocks.push(
      image(
        costBarRef,
        "Bar chart showing the $190K annual three-vendor tax broken into six line items, with $58K of friction costs highlighted",
        "About a third of the 12% is friction, not value.",
      ),
    );
  }

  /* §3 — Cost 1: The rebuild tax */
  blocks.push(h2("Cost 1: The rebuild tax"));

  if (fourCostsRef) {
    blocks.push(
      image(
        fourCostsRef,
        "Four-cost framework diagram showing rebuild, gap, standstill, and translation as the four hidden vendor coordination costs",
        "The four costs at a glance: Rebuild, Gap, Standstill, Translation.",
      ),
    );
  }

  blocks.push(
    para([
      "The rebuild tax is what happens when one vendor's deliverable can't be edited, scaled, or instrumented by the next. The marketing team needs landing pages the dev team didn't scope for. The dev team built a site the marketing team can't update without a ticket. The automation team writes flows on top of a CRM the marketing team is about to migrate.",
    ]),
  );
  blocks.push(
    para([
      "The receipts get worse on the consumer side. ",
      { link: "A BBB complaint filed against HighLevel Inc by Lumpung Kalambay", href: "https://www.bbb.org/us/tx/dallas/profile/marketing-software/highlevel-inc-0875-91307159/complaints" },
      " itemised a $7,900 loss across three pieces of work: $2,400 on a campaign rebuild after a botched migration, $1,500 in setup fees redone, and $4,000 in lost revenue while the next vendor reverse-engineered what the previous one had configured. One business. One quarter. Three rebuilds.",
    ]),
  );
  blocks.push(
    para([
      "The most expensive version of this starts on day one. About ",
      { link: "44% of mobile sites pass Google's Core Web Vitals", href: "https://almanac.httparchive.org/en/2024/performance" },
      ", per the 2024 Web Almanac, which means most of the remaining 56% are live businesses whose marketing agencies are buying clicks into pages the dev shop didn't build for speed. ",
      { link: "Deloitte and Google's Milliseconds Make Millions study", href: "https://services.google.com/fh/files/blogs/milliseconds_make_millions_report_hires.pdf" },
      ", sampling 30 million mobile sessions, found a 0.1-second mobile load improvement lifted retail conversion by 8.4%. So the rebuild tax isn't just rework. It's the conversion you never had a chance to earn because the page the marketer is paying to drive traffic to is the page the developer didn't scope to perform.",
    ]),
  );

  /* §4 — Cost 2: The gap tax */
  blocks.push(h2("Cost 2: The gap tax"));
  blocks.push(
    para([
      "The gap tax lives in the analytics and attribution between vendors. The marketer measures campaigns. The developer measures site performance. The automation consultant measures workflow runs. None of them owns the question the founder actually has: what did our money buy this month?",
    ]),
  );
  blocks.push(
    para([
      "Leads pour into a CRM the dev team configured and the automation team triggers off, and somewhere in the seams a chunk of those leads get tagged wrong, attributed to the wrong campaign, or lost in a status field nobody owns. This is the most measurable cost in the whole tax. The ",
      { link: "2024 Intuit QuickBooks Business Solutions Survey", href: "https://quickbooks.intuit.com/r/enterprise/business-solutions-survey-2024/" },
      ", surveying 630 owners and executives at small businesses with 10 to 99 employees, found these companies spend an average of 25 hours a week on manual data entry and reconciling data across apps. Those aren't agency hours. Those are founder hours. A full-time job in unpaid integration labour.",
    ]),
  );
  blocks.push(
    para([
      "Chase Dimond, the e-commerce email marketer, has framed why marketing always gets blamed for this gap: marketing multiplies what already exists in a business. When the dev team's site doesn't pass conversion data into the CRM, the marketer's report shows ad spend with no return, and the founder fires the marketer. The site gap stays. The next marketing agency inherits the same broken plumbing and produces the same report.",
    ]),
  );

  /* §5 — Cost 3: The standstill tax */
  blocks.push(h2("Cost 3: The standstill tax"));
  blocks.push(
    para([
      "The standstill tax is what you pay when one vendor's slip blocks the other two. The marketing campaign waits for the dev team to ship the new landing page. The automation flow waits for the marketing team to define the trigger conditions. The dev team waits for the automation team to confirm the API contract. Everyone is busy. Nobody is delivering.",
    ]),
  );
  blocks.push(
    para([
      "The shape of this cost is asymmetric. A two-day delay from one vendor doesn't add two days to the project. It adds two days plus whatever the next vendor's queue looks like. If the dev team slips on Monday, the marketer doesn't pick the work back up Wednesday. The marketer picks it back up the next time their schedule has space, which might be the following Monday. Slips compound across vendors.",
    ]),
  );
  blocks.push(
    para([
      { link: "Lumpung Kalambay's BBB complaint", href: "https://www.bbb.org/us/tx/dallas/profile/marketing-software/highlevel-inc-0875-91307159/complaints" },
      " priced a single standstill at nine months. Air.ai customers on ",
      { link: "airfraud.com", href: "https://airfraud.com" },
      " reported similar timelines, with founders paying $25K, $15K, even $100K licence fees and watching them sit unimplemented while the integration vendor argued with the platform vendor about whose responsibility a webhook was.",
    ]),
  );
  blocks.push(
    para([
      "The cleanest version I've seen up close was BBSL. The marketing strategy was good. The content calendar was real. But every campaign needed a landing page, every landing page needed analytics, and every analytics implementation needed a developer who could touch the WordPress theme. Each handoff sat in someone else's queue. The campaigns that should have gone live in days went live in weeks. ",
      { link: "The full BBSL writeup is here", href: "https://growveloper.com/work/baye-business-solutions" },
      " if you want to see what the rebuilt version looked like.",
    ]),
  );

  /* §6 — Cost 4: The translation tax */
  blocks.push(h2("Cost 4: The translation tax"));
  blocks.push(
    para([
      "The translation tax is what you pay when you, the founder, become the only person who understands all three vendors at once. You translate the marketer's targeting brief into the developer's page requirements. You translate the developer's tech debt into the automation team's API limits. You re-explain the same business context in three weekly calls because nobody else is in all three rooms.",
    ]),
  );
  blocks.push(
    para([
      "A small business owner on r/smallbusiness, posting under the handle u/human_1st, described it for an 80-person company that had spent three months comparing vendors:",
    ]),
  );
  blocks.push(
    quote(
      "We scoped it, sent out RFPs, got POCs and ended up back where we started just with less money and more frustration. Somewhere along the way I realized our real mistake happened before the RFP. We never had full clarity or even alignment on what problem we were solving. RFP just made that confusion look organized.",
    ),
  );
  blocks.push(
    para([
      "This is the most expensive of the four costs because the founder is the most expensive person on the project. At a $200-an-hour opportunity cost, four hours a week is over $40,000 a year. That's the scale-up hire you're not making, in coordination labour you're not getting paid for.",
    ]),
  );

  /* §7 — Why three vendors became the default */
  blocks.push(h2("Why three vendors became the default"));
  blocks.push(
    para([
      "Three vendors became the default because the marketing tooling stack exploded faster than any one team could keep up with. Scott Brinker's MarTech supergraphic ",
      { link: "tracked over 14,000 logos in the 2024 edition", href: "https://chiefmartec.com/2024/05/2024-martech-landscape/" },
      ", up from 150 in 2011. No single agency could be expert across that surface area, so the market specialised, and small businesses ended up sourcing from specialists.",
    ]),
  );
  blocks.push(
    para([
      "There's a more honest version from inside the agency model. On r/PPC, a contributor under the handle u/LaheyPull put it this way:",
    ]),
  );
  blocks.push(quote("You're not hiring an agency. You're hiring an account manager, representing an agency."));
  blocks.push(
    para([
      "Multiple ex-agency staff in the same threads describe being pitched by the agency owner and then handed off to a junior managing 20 accounts the moment the contract was signed. These are people who used to work inside the agencies their clients were paying.",
    ]),
  );
  blocks.push(
    para([
      "Goodhart's Law explains the rest. The marketer is paid on lead volume, the developer is paid on Lighthouse score, the automation consultant is paid on workflow runs. Three orthogonal KPIs, three orthogonal incentive structures. The founder is the only person whose KPI is the business itself, so the founder ends up reconciling three optimisation gradients pointing in three different directions.",
    ]),
  );

  /* §8 — The audit-is-a-sales-pitch trap */
  blocks.push(h2("The audit-is-a-sales-pitch trap"));
  blocks.push(
    para([
      "If you've read this far, the next move feels obvious: get an outside audit. The trap with that move is that almost every audit is a thinly disguised sales pitch for the auditor's services.",
    ]),
  );
  blocks.push(para("An audit you can trust meets two conditions:"));
  blocks.push(
    richBlock(
      "normal",
      [
        { text: "The auditor is willing to recommend you keep your current vendors.", bold: true },
        " If the only acceptable conclusion of the audit is \"fire your existing team and hire ours,\" you're paying for a sales meeting in audit packaging. Real audits include \"this part is working, leave it alone\" recommendations.",
      ],
      "number",
      1,
    ),
  );
  blocks.push(
    richBlock(
      "normal",
      [
        { text: "The audit produces a written artifact you can take to any other vendor.", bold: true },
        " Verbal reviews and Loom-only deliverables expire the moment the conversation ends. A document that names specific accounts, specific campaigns, specific tracking gaps, and specific next steps survives the call. You can hand it to your existing vendors, or to a different vendor, or to nobody and act on it yourself.",
      ],
      "number",
      1,
    ),
  );
  blocks.push(
    para([
      "If the audit you're being offered fails either filter, walk. The cost isn't just the audit fee. It's the next 30 days you spend defending against follow-up sales calls.",
    ]),
  );

  /* §9 — When three vendors actually win */
  blocks.push(h2("When three vendors actually win"));
  blocks.push(
    para([
      "The honest counter-thesis: for plenty of small businesses, three best-of-breed specialists beat one integrated studio. This isn't a minor caveat. Three live cases prove it.",
    ]),
  );
  blocks.push(
    para([
      { link: "Pilothouse took RUX from a sub-1.0 ROAS to 4.5", href: "https://www.pilothouse.co/clients-success/rux-case-study" },
      " by deploying a Meta ads pod that had run identical brand-stage tests across dozens of similar accounts. ",
      { link: "Pilothouse's CorneaCare engagement", href: "https://www.pilothouse.co/clients-success/corneacare-case-study" },
      " produced a 97% ROAS lift in the first quarter after the brand switched off a generalist team and onto specialists. ",
      { link: "Common Thread Collective held Buff City Soap at 3.5x ROAS", href: "https://clutch.co/profile/common-thread-collective" },
      " for the entire engagement using paid pattern recognition that only comes from running the channel at volume.",
    ]),
  );
  blocks.push(
    para([
      "Worth noting: Pilothouse, CTC, and Demand Curve operate at the upper end of small business and lower end of mid-market. The pattern they prove still applies further down market though. The shape of the businesses where this wins is consistent. They have $5K to $15K in monthly paid budget, paid is the largest single growth lever, the channel is mature enough to have a real best-of-breed (mostly Meta and Google paid, sometimes deep technical SEO), and the founder has either an in-house marketer or enough operational experience to project-manage the seams without burning out.",
    ]),
  );
  blocks.push(
    para([
      "If that's your shape, you don't have a three-vendor problem. You have a three-vendor advantage. The integrated model would give you average performance everywhere instead of elite performance in the channel that drives your revenue, and that's the wrong trade.",
    ]),
  );

  /* §10 — When one studio wins */
  blocks.push(h2("When one studio wins"));
  blocks.push(
    para([
      "The integrated growth-studio model wins for a narrower set of businesses than the marketing for it suggests. Founder-led, $500K to $3M in revenue, no in-house marketer, where the website, the funnel, and the automations need to ship together inside a quarter, and the coordination cost otherwise lands on the founder's calendar.",
    ]),
  );
  blocks.push(
    para([
      "The receipts for this side are publicly available too. ",
      { link: "Wild Fig Marketing's case study with the Electrical Association of Minnesota", href: "https://www.wildfigmarketing.com/blog/doing-better-business-with-fractional-cmo-a-case-study" },
      " reported a 15% lift in enrollments after a single team owned the website rebuild, the campaign, and the conversion infrastructure. ",
      { link: "Demand Curve's engagement with Snitcher", href: "https://www.demandcurve.com/" },
      " took paid revenue from a 2 to 2.5x ROAS to 4.5x by rewriting site copy, ad copy, and the post-click flow as one continuous edit. ",
      { link: "Stackmatix took Verasight to 3,000+ members in two months", href: "https://www.stackmatix.com/case-study/verasight" },
      " at a CPA 21% below historical baseline by integrating funnel and analytics in a single sprint instead of three.",
    ]),
  );
  blocks.push(
    para([
      "The thing that makes these work isn't talent. It's that one team owns the seam. The marketing decision and the page that decision lives on are made by the same person. The page and the analytics that report on it are wired by the same person. Goodhart's Law gets defeated because there's only one optimisation gradient.",
    ]),
  );
  blocks.push(
    para([
      "The smaller-scale version of this is what we built for VIP Creative Studio. Victor, the founder, had stood up the original WordPress site himself early on, fast and functional. As the agency started signing real client work, the site hit its ceiling. We rebuilt it in Next.js with proper content management, marketing-ready landing infrastructure, and analytics wired to the page templates rather than bolted on after the fact. ",
      { link: "The full VIP writeup is here", href: "https://growveloper.com/work/vip-creative-studio" },
      ". One team owned the site, the conversion path, and the supporting tooling, so each piece could move at the speed of the next campaign instead of the speed of the next vendor handoff.",
    ]),
  );
  blocks.push(
    para([
      "That's what ",
      { link: "Growveloper's web development", href: "https://growveloper.com/services/development" },
      ", ",
      { link: "growth marketing", href: "https://growveloper.com/services/marketing" },
      ", and ",
      { link: "AI automation", href: "https://growveloper.com/services/ai" },
      " services are built to deliver as one engagement, not three.",
    ]),
  );

  /* §11 — Why 2026 changes the math */
  blocks.push(h2("Why 2026 changes the math"));
  blocks.push(
    para([
      "The integrated studio model used to be uneconomic at small business scale. One person couldn't credibly do paid media, full-stack development, and workflow automation well enough to charge for all three. So the market unbundled, three specialists emerged for every problem, and small businesses paid the three-vendor tax as the price of accessing real expertise.",
    ]),
  );
  blocks.push(para("That's the part that broke in 2024 and 2025. The signals are converging."));
  blocks.push(
    para([
      { link: "Andreessen Horowitz announced the Growth Engineer Fellowship on April 7, 2026", href: "https://a16z.com/announcing-the-growth-engineer-fellowship/" },
      ", naming the trend in their own words: \"the roles of a growth marketer, PM, and engineer are all collapsing into one.\" Six months earlier, Elena Verna at Lovable told ",
      { link: "Lenny Rachitsky", href: "https://www.lennysnewsletter.com/" },
      " that \"60 to 70% of traditional growth tactics no longer apply\" inside AI-native companies. By February 2026, ",
      { link: "Lovable had hit $400M in annual recurring revenue with just 146 employees", href: "https://techcrunch.com/2026/03/11/lovable-says-it-added-100m-in-revenue-last-month-alone-with-just-146-employees/" },
      ", at roughly $2.7M in ARR per employee versus the $200K to $400K SaaS industry benchmark. The team running that growth doesn't have three siloed roles. It has one role that crosses all three.",
    ]),
  );
  blocks.push(
    para([
      "What changed underneath: AI tooling collapsed the cost of being end-to-end. The same person can ship a Next.js site in a week, write the campaigns that drive traffic to it, and wire the automations that handle the leads, because the tooling now does the parts that used to require three different specialists. The integrated model isn't compromise expertise anymore. It's a real role, and it's the one venture capital is funding for inside startups. Outside venture, it's the model small businesses have been waiting for someone to bring to them.",
    ]),
  );
  blocks.push(
    para([
      { link: "The receipts on what that looks like applied to a small business sit here", href: "https://growveloper.com/work" },
      " across the case studies. If your shape matches the narrowed profile above, the conversation worth having is what your business is currently paying in three-vendor tax and what the move out of it would look like. ",
      { link: "The 30-minute consultation is the cheapest way to find out", href: "https://growveloper.com/start" },
      ". I'll tell you on the call if you don't have a three-vendor problem and walk you through what to do instead.",
    ]),
  );

  /* About the author */
  blocks.push(h2("About the author"));
  blocks.push(
    para([
      { text: "Juwon (Oyekola Obajuwon Abdulsalam)", bold: true },
      " is the founder of Growveloper, a Lagos-based growth studio that builds web platforms, runs paid acquisition, and ships AI automation as a single engagement. Currently managing $16K+/month in Google Ads for US credit union clients, built RideOn Nigeria's full booking and driver platform from scratch, and rebuilt VIP Creative Studio's website in Next.js. Four years across paid media, full-stack development, and AI workflow design.",
    ]),
  );
  blocks.push(
    para([
      { link: "LinkedIn", href: "https://www.linkedin.com/in/juwon-abdulsalam/" },
      " · ",
      { link: "Growveloper.com", href: "https://growveloper.com" },
    ]),
  );
  blocks.push(para([{ text: "Last updated: 5 May 2026", em: true }]));

  return blocks;
}

/* ─── FAQ documents ─── */

function buildFaqs() {
  const items = [
    {
      question: "What is the three-vendor tax in plain English?",
      answer:
        "It's the hidden cost a small business pays when separate agencies handle marketing, web development, and AI automation. It shows up as rebuilt work, missing analytics between vendors, projects blocked by another vendor's slip, and founder time spent translating between teams. For a $1.5M business, the typical mid-range total is about 12% of revenue.",
    },
    {
      question: "How do I know if I'm paying it right now?",
      answer:
        "Three signals. First, your dashboards from different vendors show different numbers for the same week. Second, your last campaign launch was delayed by a vendor different from the one running the campaign. Third, you spend more than four hours a week in vendor calls or Slack channels. Two out of three means you're paying it.",
    },
    {
      question: "Is one studio always cheaper than three vendors?",
      answer:
        "No. For businesses spending $5K to $15K a month on a single dominant channel like Meta or Google paid ads, three best-of-breed specialists usually outperform a generalist studio. The integrated model wins when website, marketing, and automation need to ship together in the same quarter, with no in-house marketer to coordinate three vendors.",
    },
    {
      question: "What's the difference between a growth studio and a fractional CMO?",
      answer:
        "A fractional CMO sets strategy and manages vendors. A growth studio executes across web, marketing, and automation as one team. Hire a fractional CMO when you already have execution capacity and need direction. Hire a growth studio when you have direction and need the execution shipped end to end.",
    },
    {
      question: "Should I trust an audit from someone who wants to sell me their services?",
      answer:
        "Only if two conditions hold. The auditor is willing to recommend you keep your current vendors and not hire them. The audit produces a written deliverable you could take to any other vendor and work from. If either condition fails, you're being sold, not audited. Most agency-sold audits fail at least one of these.",
    },
    {
      question: "How long does it take to switch from three vendors to one studio?",
      answer:
        "Usually one full quarter. Month one is consolidating accounts, ownership, and access. Month two is the first integrated build, typically the website rebuild plus the conversion tracking that should always have been wired to it. Month three is the first integrated campaign running on infrastructure the same team owns end to end.",
    },
  ];
  return items.map((item, i) => ({
    _id: FAQ_IDS[i],
    _type: "faq",
    question: item.question,
    answer: item.answer,
    page: { _type: "reference", _ref: POST_ID },
    order: i + 1,
  }));
}

/* ─── Run ─── */

async function seed() {
  console.log("Step 1 — Uploading 3 image assets...");
  const heroRef = await uploadImage(IMAGE_FILES.hero);
  const costBarRef = await uploadImage(IMAGE_FILES.costBar);
  const fourCostsRef = await uploadImage(IMAGE_FILES.fourCosts);

  console.log("\nStep 2 — Building post body...");
  const body = buildBody({ costBarRef, fourCostsRef });
  console.log(`  ✓ ${body.length} blocks built`);

  console.log("\nStep 3 — Creating blogPost document...");
  const post = {
    _id: POST_ID,
    _type: "blogPost",
    title:
      "The three-vendor tax: why small businesses pay 12% of revenue for three agencies that don't talk to each other",
    slug: { _type: "slug", current: "three-vendor-tax" },
    excerpt:
      "Most small businesses pay roughly 12% of revenue in hidden coordination costs across their marketing, dev, and automation vendors. Here's the math, the four costs, and when one studio actually beats three.",
    tldr:
      "The three-vendor tax is what you pay when you hire one agency for marketing, one for web dev, and one for AI automation. The visible cost is the three retainers. The hidden cost is everything between them: rebuilt work, missing analytics, blocked launches, and the founder turning into a full-time project manager. For a $1.5M business, the realistic mid-range total runs around $190K a year, roughly 12% of top line, before any of the three vendors deliver a result.",
    ...(heroRef
      ? {
          heroImage: {
            _type: "image",
            asset: { _type: "reference", _ref: heroRef },
            alt: "Three vendor dashboards each showing different numbers, contrasted with one integrated dashboard",
          },
        }
      : {}),
    body,
    category: "Founder Operations",
    tags: [
      "vendor-management",
      "agency-coordination",
      "growth-studio",
      "smb-marketing",
      "attribution",
      "2026-trends",
      "audit-frameworks",
      "founder-operations",
    ],
    publishedAt: "2026-05-05T09:00:00.000Z",
    readTime: 16,
    author: "Juwon (Oyekola Obajuwon Abdulsalam)",
    featuredToggle: true,
    showCTA: true,
    metaTitle: "The Three-Vendor Tax: The Hidden Cost of Splitting Agencies | Growveloper",
    metaDescription:
      "Most small businesses hire separate vendors for marketing, web dev, and AI automation. The hidden coordination cost averages 12% of revenue. Here's the breakdown.",
  };

  const r1 = await client.createOrReplace(post);
  console.log(`  ✓ blogPost created (id: ${r1._id})`);

  console.log("\nStep 4 — Seeding 6 FAQ documents...");
  const faqDocs = buildFaqs();
  const tx = client.transaction();
  for (const f of faqDocs) tx.createOrReplace(f);
  const r2 = await tx.commit();
  console.log(`  ✓ ${faqDocs.length} faqs created (tx: ${r2.transactionId})`);

  console.log("\n✅ All done. Visit /lab/three-vendor-tax to verify.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
