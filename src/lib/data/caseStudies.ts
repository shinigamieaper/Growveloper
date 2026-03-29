import type {
  CaseStudyPageData,
  CaseStudyCardData,
  CTABannerData,
  TestimonialData,
} from "@/lib/types";

/* ─── Hero ─── */
export const WORK_HEADLINE = "Our Work";
export const WORK_HIGHLIGHTED_WORD = "Work";
export const WORK_DESCRIPTION =
  "Real projects. Real results. See how development and marketing work together to compound growth.";

/* ─── Case Studies ─── */

const CS_1: CaseStudyPageData = {
  title: "E-commerce Lead Automation",
  slug: "ecommerce-lead-automation",
  heroImage:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=675&fit=crop",
  situation:
    "Replaced a manual lead qualification process. Time to first contact dropped from 4 hours to 4 minutes.",
  resultHeadline: "4h \u2192 4min response",
  techStack: ["Make.com", "HubSpot", "OpenAI API", "Slack"],
  tags: ["automation", "lead-gen"],
  featured: true,
  clientIndustry: "B2B SaaS",
  publishedAt: "2024-11-20",
  metrics: [
    { label: "Response time", value: "4min" },
    { label: "Leads processed / week", value: "340%" },
    { label: "Headcount increase", value: "0" },
    { label: "Pipeline value / month", value: "+\u00a318k" },
  ],
  situationDetail:
    "A B2B SaaS startup was drowning in inbound leads but couldn\u2019t process them fast enough. Their sales team of three was manually reviewing every form submission, copying data between HubSpot and Slack, and taking an average of 4 hours to make first contact. By the time they reached out, prospects had already started conversations with competitors.",
  approach:
    "We audited the full lead flow from form submission to first contact and identified six manual steps that could be automated without losing the personal touch. The key insight was that 70% of leads could be auto-qualified using data already available in the form \u2014 company size, budget range, and use case. Only the remaining 30% needed human judgment.",
  buildDetail:
    "We built a three-tier automation layer using Make.com as the orchestration engine. Tier one: instant form data enrichment via the OpenAI API \u2014 classifying lead intent and extracting key signals from the free-text fields. Tier two: automated qualification scoring using a weighted model calibrated against their last 200 closed deals. Tier three: intelligent routing to the right sales rep via Slack, with pre-populated context cards showing the lead\u2019s score, company profile, and suggested talking points.",
  resultDetail:
    "Time to first contact dropped from 4 hours to 4 minutes \u2014 faster than any human-only process could achieve. Lead processing capacity tripled without adding headcount. The sales team reported spending 60% less time on admin and 60% more time on actual conversations. Within 8 weeks, pipeline value per month increased by \u00a318,000.",
  testimonial: {
    quote:
      "They didn\u2019t just speed things up \u2014 they fundamentally changed how our sales team operates. We close more deals with fewer people now.",
    name: "Alex Rivera",
    role: "Head of Sales",
    company: "FormFlow",
  },
};

const CS_2: CaseStudyPageData = {
  title: "SaaS Reporting Pipeline",
  slug: "saas-reporting-pipeline",
  heroImage:
    "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=1200&h=675&fit=crop",
  situation:
    "Replaced 6 weekly manual reports with automated dashboards and email digests. Team saved 18 hours per week.",
  resultHeadline: "18h/week recovered",
  techStack: ["n8n", "GA4", "Google Ads", "Resend"],
  tags: ["automation", "reporting"],
  featured: true,
  clientIndustry: "SaaS",
  publishedAt: "2024-10-15",
  metrics: [
    { label: "Hours saved / week", value: "18" },
    { label: "Reports automated", value: "6" },
    { label: "Data lag", value: "Real-time" },
    { label: "Exec decision speed", value: "3x faster" },
  ],
  situationDetail:
    "A growing SaaS company with \u00a3800k ARR had six separate weekly reports being assembled manually every Monday morning. Marketing compiled ad spend and lead data from Google Ads and GA4. Product pulled usage metrics from their analytics platform. Finance reconciled Stripe revenue with projections in spreadsheets. Each report took 2\u20134 hours to build, and by the time the exec team received them on Tuesday, the data was already stale.",
  approach:
    "We mapped every report\u2019s data sources, transformation logic, and distribution requirements. The goal wasn\u2019t just to automate the assembly \u2014 it was to make the data available in real time so the team could make faster decisions. We chose n8n (self-hosted) for workflow orchestration because it gave us full control over scheduling, error handling, and data transformations without vendor lock-in.",
  buildDetail:
    "We built six automated pipelines in n8n, each pulling from the relevant data sources via API. Ad spend and attribution data from Google Ads and GA4. Revenue and churn data from Stripe. Usage metrics from their internal analytics API. Each pipeline runs on its own schedule \u2014 some hourly, some daily \u2014 and feeds into a shared data layer. From there, two outputs: a live dashboard accessible to the whole team, and a polished Monday morning email digest sent via Resend with key metrics, trends, and anomaly alerts.",
  resultDetail:
    "The team recovered 18 hours per week \u2014 the equivalent of nearly half a full-time hire. More importantly, the exec team went from receiving stale Tuesday reports to having real-time dashboards with Monday morning summaries. Decision velocity increased measurably: the CEO reported making budget reallocation decisions in hours instead of days.",
  testimonial: {
    quote:
      "Monday mornings used to be a scramble. Now I wake up to a clean summary in my inbox with everything I need to make decisions before standup.",
    name: "Priya Sharma",
    role: "CEO",
    company: "MetricLoop",
  },
};

const CS_3: CaseStudyPageData = {
  title: "Growth Marketing Overhaul",
  slug: "growth-marketing-overhaul",
  heroImage:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop",
  situation:
    "Rebuilt attribution infrastructure for a D2C brand spending \u00a340k/month on paid. ROAS improved 2.4x in 8 weeks.",
  resultHeadline: "2.4x ROAS in 8 weeks",
  techStack: ["GA4", "GTM", "Google Ads", "Meta Ads"],
  tags: ["marketing", "attribution"],
  featured: true,
  clientIndustry: "D2C / E-commerce",
  publishedAt: "2024-09-25",
  metrics: [
    { label: "ROAS improvement", value: "2.4x" },
    { label: "Time to results", value: "8 weeks" },
    { label: "Wasted ad spend cut", value: "\u00a312k/mo" },
    { label: "Conversion rate lift", value: "+47%" },
  ],
  situationDetail:
    "A direct-to-consumer brand was spending \u00a340,000 per month across Google Ads and Meta Ads with diminishing returns. Their ROAS had declined from 4.2x to 1.8x over six months, and they couldn\u2019t identify why. The marketing team was making budget decisions based on platform-reported metrics that contradicted each other \u2014 Google claimed credit for conversions that Meta also claimed, and neither matched the numbers in Stripe.",
  approach:
    "We started with a full attribution audit. Within two days, we identified three critical problems: duplicate conversion tracking (both platforms counting the same sale), missing UTM parameters on 40% of campaigns, and a GA4 implementation that was only capturing 60% of actual transactions due to a broken data layer. The fix wasn\u2019t more spend \u2014 it was better measurement.",
  buildDetail:
    "We rebuilt the attribution infrastructure from scratch. First, we implemented server-side tagging via GTM to eliminate ad blocker data loss. Then we built a unified conversion tracking system that reconciled platform-reported conversions with actual Stripe transactions. We created a custom GA4 event taxonomy that captured the full funnel \u2014 from first touch to purchase \u2014 with consistent UTM parameters across every channel. Finally, we built a weekly attribution report that showed true ROAS by channel, campaign, and creative.",
  resultDetail:
    "Within 8 weeks of launching the rebuilt infrastructure, we identified three campaigns consuming \u00a312,000/month with negative true ROAS (the platform data had made them look profitable). We reallocated that budget to two campaigns that were genuinely compounding. Overall ROAS improved from 1.8x to 4.3x \u2014 a 2.4x improvement \u2014 and conversion rate increased 47% due to the landing page optimisations we made alongside the attribution work.",
  testimonial: {
    quote:
      "We were burning \u00a312k a month on campaigns that were actually losing money. We had no idea until they rebuilt our tracking. The ROI on this project was insane.",
    name: "Marcus Johnson",
    role: "CTO",
    company: "Roommaster",
  },
};

const CS_4: CaseStudyPageData = {
  title: "SaaS Onboarding Redesign",
  slug: "saas-onboarding-redesign",
  heroImage:
    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=675&fit=crop",
  situation:
    "Rebuilt the onboarding flow for a B2B SaaS platform. Trial-to-paid conversion increased from 8% to 19%.",
  resultHeadline: "8% \u2192 19% conversion",
  techStack: ["Next.js", "Vercel", "GA4", "HubSpot"],
  tags: ["development", "cro"],
  featured: false,
  clientIndustry: "SaaS",
  publishedAt: "2024-08-20",
  metrics: [
    { label: "Trial-to-paid conversion", value: "19%" },
    { label: "Previous conversion", value: "8%" },
    { label: "Time to value", value: "-62%" },
    { label: "Support tickets (onboarding)", value: "-45%" },
  ],
  situationDetail:
    "A B2B SaaS platform with 2,000 monthly trial signups was converting only 8% to paid. Their onboarding flow was a seven-step wizard that asked for too much information upfront and didn\u2019t demonstrate the product\u2019s core value until step five. Users were dropping off at step three, and the ones who made it through weren\u2019t reaching the \u201Caha moment\u201D fast enough.",
  approach:
    "We ran a full-funnel audit combining GA4 event data, Hotjar session recordings, and exit survey responses. The data pointed to three problems: cognitive overload in early steps, unclear value proposition during setup, and a disconnect between the onboarding flow and the user\u2019s actual job-to-be-done. Our approach was to reverse the flow \u2014 show value first, collect details later.",
  buildDetail:
    "We redesigned the onboarding from seven steps to three. Step one: a single-question use case selector that immediately personalised the experience. Step two: a pre-populated workspace with sample data matching their use case, so users saw the product working before configuring anything. Step three: a focused setup completing only the essentials (team invite, integrations). We built the entire flow in Next.js with server-rendered personalisation and instrumented every interaction with custom GA4 events for ongoing optimisation.",
  resultDetail:
    "Trial-to-paid conversion jumped from 8% to 19% within six weeks of launching the new flow. Time to value (the point where users engage with a core feature) dropped by 62%. Onboarding-related support tickets decreased by 45%. The product team estimated the improvement was worth \u00a3180k in annual recurring revenue based on their average contract value.",
};

const CS_5: CaseStudyPageData = {
  title: "FinTech Landing Page System",
  slug: "fintech-landing-page-system",
  heroImage:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop",
  situation:
    "Built a modular landing page system for a FinTech startup running 20+ ad campaigns. Page creation time dropped from 2 weeks to 2 hours.",
  resultHeadline: "2 weeks \u2192 2 hours",
  techStack: ["Next.js", "Sanity CMS", "Vercel", "Tailwind CSS"],
  tags: ["development", "marketing"],
  featured: false,
  clientIndustry: "FinTech",
  publishedAt: "2024-07-15",
  metrics: [
    { label: "Page creation time", value: "2 hours" },
    { label: "Previous creation time", value: "2 weeks" },
    { label: "Active landing pages", value: "34" },
    { label: "Average page speed", value: "98/100" },
  ],
  situationDetail:
    "A FinTech startup running paid acquisition across multiple products needed unique landing pages for each campaign. Their marketing team was requesting new pages through the development team, and each page took an average of two weeks from brief to live \u2014 a turnaround that made rapid testing impossible. They were running 20+ campaigns but only had 4 landing pages, meaning most campaigns pointed to generic pages that didn\u2019t match the ad creative.",
  approach:
    "The bottleneck wasn\u2019t design or development speed \u2014 it was the process. Every landing page was a custom build because there was no reusable system. We proposed a component-based landing page builder: a library of pre-designed, tested, and optimised sections that the marketing team could assemble in a CMS without developer involvement.",
  buildDetail:
    "We built 12 modular landing page sections in Next.js \u2014 heroes, feature grids, social proof strips, comparison tables, pricing blocks, FAQ accordions, and CTA blocks. Each section was fully responsive, performance-optimised (all scoring 95+ on Lighthouse), and configurable via Sanity CMS. The marketing team could create a new landing page by selecting sections, populating content, and publishing \u2014 no code, no deploy, no developer ticket.",
  resultDetail:
    "Page creation time dropped from 2 weeks to 2 hours. Within the first month, the marketing team created 30 new landing pages. Campaign-specific messaging improved ad relevance scores across the board, and overall paid conversion rates increased by 34%. The system continues to scale \u2014 they\u2019re now running 34 active landing pages with zero developer involvement in page creation.",
};

const CS_6: CaseStudyPageData = {
  title: "AI Customer Support Triage",
  slug: "ai-customer-support-triage",
  heroImage:
    "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&h=675&fit=crop",
  situation:
    "Built an AI triage system that auto-categorises and routes 80% of support tickets. Average resolution time dropped by 55%.",
  resultHeadline: "55% faster resolution",
  techStack: ["OpenAI API", "n8n", "Intercom", "Slack"],
  tags: ["automation", "ai"],
  featured: false,
  clientIndustry: "SaaS",
  publishedAt: "2024-06-10",
  metrics: [
    { label: "Tickets auto-triaged", value: "80%" },
    { label: "Resolution time", value: "-55%" },
    { label: "Mis-routes eliminated", value: "92%" },
    { label: "CSAT improvement", value: "+18pts" },
  ],
  situationDetail:
    "A SaaS company processing 400+ support tickets per week was struggling with routing. Every ticket landed in a single queue, and a support lead spent 2\u20133 hours daily manually reading, categorising, and assigning tickets to the right team member. Mis-routes were common \u2014 roughly 25% of tickets went to the wrong person first \u2014 which added a full day to average resolution time.",
  approach:
    "We proposed an AI-powered triage layer that would sit between ticket creation and assignment. The model would read each ticket, classify its category and urgency, extract key metadata (affected product, customer tier, sentiment), and route it to the best-matched agent \u2014 all within seconds of submission. The goal was 80% automation with full human fallback for edge cases.",
  buildDetail:
    "We built the triage system using n8n for orchestration and OpenAI\u2019s API for classification. When a ticket is created in Intercom, n8n triggers a workflow that sends the ticket content to a fine-tuned prompt. The model returns a structured response: category, urgency level, affected product, and recommended assignee based on current team capacity and expertise. High-confidence classifications (80% of tickets) are auto-routed. Low-confidence tickets are flagged for human review with the model\u2019s suggested classification pre-filled.",
  resultDetail:
    "The system auto-triages 80% of incoming tickets with 95% accuracy. Average resolution time dropped by 55% because tickets reach the right person immediately instead of bouncing between queues. The support lead recovered 2\u20133 hours per day from manual triage. Customer satisfaction scores improved by 18 points, largely driven by faster initial response times.",
};

export const ALL_CASE_STUDIES: CaseStudyPageData[] = [
  CS_1,
  CS_2,
  CS_3,
  CS_4,
  CS_5,
  CS_6,
];

export function getCaseStudyBySlug(slug: string): CaseStudyPageData | null {
  return ALL_CASE_STUDIES.find((cs) => cs.slug === slug) ?? null;
}

export function getCaseStudyCards(): CaseStudyCardData[] {
  return ALL_CASE_STUDIES;
}

export function getFeaturedCaseStudies(): CaseStudyCardData[] {
  return ALL_CASE_STUDIES.filter((cs) => cs.featured);
}

export function getRelatedCaseStudies(
  slug: string,
  limit = 2,
): CaseStudyCardData[] {
  const current = getCaseStudyBySlug(slug);
  if (!current) return [];
  return ALL_CASE_STUDIES.filter(
    (cs) => cs.slug !== slug && cs.clientIndustry === current.clientIndustry,
  )
    .concat(ALL_CASE_STUDIES.filter((cs) => cs.slug !== slug && cs.clientIndustry !== current.clientIndustry))
    .slice(0, limit);
}

export function getCaseStudyIndustries(): string[] {
  return [...new Set(ALL_CASE_STUDIES.map((cs) => cs.clientIndustry))];
}

/* ─── Testimonials from case studies ─── */

export const WORK_TESTIMONIALS: TestimonialData[] = ALL_CASE_STUDIES
  .filter((cs) => cs.testimonial)
  .map((cs) => ({
    quote: cs.testimonial!.quote,
    name: cs.testimonial!.name,
    role: cs.testimonial!.role,
    company: cs.testimonial!.company,
    rating: 5,
    industry: cs.clientIndustry,
  }));

/* ─── CTAs ─── */

export const WORK_CTA_INLINE: CTABannerData = {
  headline: "Want results like these?",
  highlightedWord: "results",
  ctaLabel: "Book a free consultation",
  ctaDestination: "/start",
};

export const WORK_CTA_SECTION: CTABannerData = {
  headline: "Ready to become the next case study?",
  highlightedWord: "next case study",
  ctaLabel: "Start a project",
  ctaDestination: "/start",
};
