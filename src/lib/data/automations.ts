import type {
  AutomationFullData,
  AutomationCategory,
  CTABannerData,
} from "@/lib/types";

/* ─── Categories ─── */

export const AUTOMATION_CATEGORIES: AutomationCategory[] = [
  { label: "Lead Gen", value: "Lead Gen" },
  { label: "Reporting", value: "Reporting" },
  { label: "Content", value: "Content" },
  { label: "CRM", value: "CRM" },
  { label: "Support", value: "Support" },
  { label: "Operations", value: "Operations" },
];

/* ─── All automations ─── */

export const ALL_AUTOMATIONS: AutomationFullData[] = [
  {
    title: "Lead Qualification Engine",
    slug: "lead-qualification-engine",
    tagline: "Scores, enriches, and routes new leads from any source to your CRM — automatically.",
    description:
      "Stop manually sorting leads. This automation captures form submissions, enriches contact data via Clearbit, scores leads against your ICP criteria, and routes qualified prospects straight into your CRM with Slack alerts for your sales team.",
    accessType: "fixed",
    price: 497,
    category: "Lead Gen",
    featured: true,
    toolsUsed: [
      { name: "Make.com", iconKey: "Make.com" },
      { name: "HubSpot", iconKey: "HubSpot" },
      { name: "Slack", iconKey: "Slack" },
      { name: "Google Sheets", iconKey: "Google Sheets" },
    ],
    setupTimeDays: 2,
    problemStatement:
      "Your team spends hours every week manually reviewing form submissions, copying data between tools, and deciding which leads are worth pursuing. Half the hot leads go cold before anyone responds.",
    howItWorks: [
      {
        stepNumber: "01",
        title: "Capture & Enrich",
        description:
          "Form submissions from your website are captured in real time. Contact data is enriched with company size, industry, and job title via third-party APIs.",
      },
      {
        stepNumber: "02",
        title: "Score & Qualify",
        description:
          "Each lead is scored against your ICP criteria — budget, company size, industry fit, and engagement signals. Qualified leads are flagged automatically.",
      },
      {
        stepNumber: "03",
        title: "Route & Notify",
        description:
          "Qualified leads are pushed into your CRM with full enrichment data. Your sales team gets an instant Slack notification with a summary and recommended next action.",
      },
    ],
    whatsIncluded: [
      "Make.com scenario with all modules configured",
      "Lead scoring logic customised to your ICP",
      "CRM field mapping and data sync",
      "Slack notification templates",
      "Google Sheets backup log",
      "Documentation and handover walkthrough",
    ],
    whoItIsFor: [
      "Founders manually sorting leads from web forms",
      "Sales teams losing leads to slow response times",
      "Businesses with no lead scoring in place",
      "Anyone using HubSpot or a comparable CRM",
    ],
    faq: [
      {
        question: "Which CRMs does this work with?",
        answer:
          "Out of the box it connects to HubSpot. We can adapt it to Salesforce, Pipedrive, or Notion for a small customisation fee.",
      },
      {
        question: "How long does setup take?",
        answer:
          "Two business days from purchase. We schedule a 30-minute onboarding call to map your ICP criteria and CRM fields.",
      },
      {
        question: "Can I change the scoring criteria later?",
        answer:
          "Yes. The scoring logic lives in a simple spreadsheet you can edit anytime. Changes take effect immediately.",
      },
    ],
    publishedAt: "2025-11-15",
  },
  {
    title: "Weekly Report Bot",
    slug: "weekly-report-bot",
    tagline: "Pulls GA4, Google Ads, and Meta data. Formats a branded PDF report every Monday.",
    description:
      "Stop spending your Monday mornings screenshotting dashboards. This bot pulls performance data from GA4, Google Ads, and Meta, formats it into a clean branded PDF, and delivers it to your inbox or Slack before you finish your coffee.",
    accessType: "fixed",
    price: 297,
    category: "Reporting",
    featured: true,
    toolsUsed: [
      { name: "n8n", iconKey: "n8n" },
      { name: "GA4", iconKey: "GA4" },
      { name: "Google Ads", iconKey: "Google Ads" },
      { name: "Meta Ads", iconKey: "Meta Ads" },
      { name: "Slack", iconKey: "Slack" },
    ],
    setupTimeDays: 3,
    problemStatement:
      "Every week someone on your team spends 2-3 hours pulling numbers from GA4, Google Ads, and Meta, pasting them into a slide deck, and emailing it around. The data is stale by the time anyone reads it.",
    howItWorks: [
      {
        stepNumber: "01",
        title: "Pull Data",
        description:
          "Every Monday at 7am, the bot connects to GA4, Google Ads, and Meta APIs to pull the previous week's performance metrics.",
      },
      {
        stepNumber: "02",
        title: "Format Report",
        description:
          "Data is organised into a branded PDF template with your logo, colour scheme, and KPI commentary sections. Charts are generated automatically.",
      },
      {
        stepNumber: "03",
        title: "Deliver",
        description:
          "The finished report is emailed to your distribution list and posted to your Slack channel. Historical reports are archived in Google Drive.",
      },
    ],
    whatsIncluded: [
      "n8n workflow with API connections configured",
      "Branded PDF report template",
      "GA4, Google Ads, and Meta data connectors",
      "Slack and email delivery setup",
      "Google Drive archive folder",
      "Documentation and walkthrough",
    ],
    whoItIsFor: [
      "Marketing managers tired of manual reporting",
      "Agencies needing automated client reports",
      "Founders who want a weekly performance snapshot",
      "Teams with data scattered across multiple platforms",
    ],
    faq: [
      {
        question: "Can I add more data sources?",
        answer:
          "Yes. We can add LinkedIn Ads, TikTok Ads, Shopify, or any platform with an API for a small customisation fee.",
      },
      {
        question: "Can I change the report schedule?",
        answer:
          "Absolutely. Daily, weekly, bi-weekly, or monthly — the cron schedule is fully configurable.",
      },
      {
        question: "What if an API connection fails?",
        answer:
          "The workflow has built-in error handling. You get a Slack alert if any data source fails, and the report still generates with the available data.",
      },
    ],
    publishedAt: "2025-12-01",
  },
  {
    title: "AI Content Brief Generator",
    slug: "ai-content-brief-generator",
    tagline: "Submit a topic. Get a structured brief, SEO keyword map, and content outline in minutes.",
    description:
      "Turn a single topic idea into a fully structured content brief with target keywords, search intent mapping, competitor analysis, and a section-by-section outline — all generated in under 5 minutes.",
    accessType: "fixed",
    price: 397,
    category: "Content",
    featured: true,
    toolsUsed: [
      { name: "OpenAI API", iconKey: "OpenAI API" },
      { name: "Make.com", iconKey: "Make.com" },
      { name: "Google Sheets", iconKey: "Google Sheets" },
      { name: "Notion", iconKey: "Notion" },
    ],
    setupTimeDays: 2,
    problemStatement:
      "Creating content briefs is tedious. You spend an hour researching keywords, analysing competitors, and structuring an outline before a single word of content is written. Scale that across 10 briefs a month and you've lost a full workday.",
    howItWorks: [
      {
        stepNumber: "01",
        title: "Submit Topic",
        description:
          "Enter a topic idea and target audience via a simple form or Slack command. The system kicks off immediately.",
      },
      {
        stepNumber: "02",
        title: "Research & Analyse",
        description:
          "OpenAI analyses the topic against your brand guidelines, identifies target keywords, maps search intent, and reviews top-ranking competitor content.",
      },
      {
        stepNumber: "03",
        title: "Generate Brief",
        description:
          "A structured brief is generated with headline options, keyword targets, content outline, word count recommendation, and internal linking suggestions. Delivered to Notion or Google Sheets.",
      },
    ],
    whatsIncluded: [
      "Make.com scenario with OpenAI integration",
      "Custom prompt engineering for your brand voice",
      "SEO keyword mapping logic",
      "Notion or Google Sheets output template",
      "Slack command trigger (optional)",
      "Documentation and prompt tuning guide",
    ],
    whoItIsFor: [
      "Content teams producing 5+ pieces per month",
      "SEO agencies scaling brief production",
      "Founders writing their own content",
      "Marketing managers who need consistent quality",
    ],
    faq: [
      {
        question: "Can I customise the brief format?",
        answer:
          "Yes. The output template is fully editable. You can add or remove sections, change the tone guidance, and adjust keyword targets.",
      },
      {
        question: "Does it replace a content strategist?",
        answer:
          "No — it gives your strategist a 90% head start. The brief needs human review and approval, but the research and structuring is done for you.",
      },
      {
        question: "Which AI model does it use?",
        answer:
          "GPT-4o by default. We can switch to Claude or any other provider that fits your preference.",
      },
    ],
    publishedAt: "2025-12-10",
  },
  {
    title: "CRM Sync & Enrichment",
    slug: "crm-sync-enrichment",
    tagline: "Keeps HubSpot, Notion, and Google Sheets in sync automatically — no more copy-pasting.",
    description:
      "Your data lives in three places and none of them agree. This automation syncs contacts, deals, and notes between HubSpot, Notion, and Google Sheets in real time, enriching records with company data along the way.",
    accessType: "fixed",
    price: 597,
    category: "CRM",
    featured: false,
    toolsUsed: [
      { name: "Make.com", iconKey: "Make.com" },
      { name: "HubSpot", iconKey: "HubSpot" },
      { name: "Notion", iconKey: "Notion" },
      { name: "Google Sheets", iconKey: "Google Sheets" },
    ],
    setupTimeDays: 3,
    problemStatement:
      "Your team updates contacts in HubSpot, logs notes in Notion, and tracks deals in Google Sheets. Nothing syncs. Data conflicts pile up, and you waste hours reconciling records every week.",
    howItWorks: [
      {
        stepNumber: "01",
        title: "Map Fields",
        description:
          "We map your CRM fields, Notion properties, and spreadsheet columns so data flows cleanly between all three systems.",
      },
      {
        stepNumber: "02",
        title: "Sync & Enrich",
        description:
          "When a record changes in any system, the update propagates to the others in real time. New contacts are enriched with company data automatically.",
      },
      {
        stepNumber: "03",
        title: "Monitor & Alert",
        description:
          "A dashboard tracks sync health. If a conflict or failure occurs, you get a Slack alert with details and a one-click fix.",
      },
    ],
    whatsIncluded: [
      "Make.com bi-directional sync scenario",
      "Field mapping across HubSpot, Notion, and Google Sheets",
      "Contact enrichment via Clearbit or similar",
      "Conflict resolution rules",
      "Slack alerting for sync failures",
      "Monitoring dashboard in Google Sheets",
    ],
    whoItIsFor: [
      "Teams with data scattered across CRM, Notion, and spreadsheets",
      "Businesses tired of manual data entry and copy-pasting",
      "Sales teams who need a single source of truth",
      "Ops leads managing cross-tool workflows",
    ],
    faq: [
      {
        question: "Which direction does the sync go?",
        answer:
          "Bi-directional. Changes in any of the three systems propagate to the others. You set priority rules for conflict resolution.",
      },
      {
        question: "Will it overwrite my existing data?",
        answer:
          "No. The initial sync runs in preview mode so you can review field mappings before anything is written. Conflicts are flagged, not overwritten.",
      },
      {
        question: "Can I add more systems later?",
        answer:
          "Yes. Salesforce, Airtable, Pipedrive, and others can be added as additional sync targets for a customisation fee.",
      },
    ],
    publishedAt: "2026-01-05",
  },
  {
    title: "Customer Support Triage Bot",
    slug: "customer-support-triage-bot",
    tagline: "Classifies, prioritises, and routes support tickets before a human touches them.",
    description:
      "Incoming support emails and form submissions are classified by urgency and topic using AI, assigned a priority score, and routed to the right team member with a suggested response draft — all within 30 seconds.",
    accessType: "fixed",
    price: 447,
    category: "Support",
    featured: false,
    toolsUsed: [
      { name: "OpenAI API", iconKey: "OpenAI API" },
      { name: "Zapier", iconKey: "Zapier" },
      { name: "Slack", iconKey: "Slack" },
      { name: "Google Sheets", iconKey: "Google Sheets" },
    ],
    setupTimeDays: 3,
    problemStatement:
      "Your support inbox is a bottleneck. Every ticket gets read by a human who decides where to send it. Urgent issues sit unread while someone sorts through password resets. Response times suffer, and customers notice.",
    howItWorks: [
      {
        stepNumber: "01",
        title: "Capture & Classify",
        description:
          "Incoming emails and form submissions are captured and sent to OpenAI for topic classification (billing, technical, feature request, urgent) and sentiment analysis.",
      },
      {
        stepNumber: "02",
        title: "Prioritise & Route",
        description:
          "Each ticket is assigned a priority score and routed to the appropriate team member based on your routing rules. Urgent tickets trigger immediate Slack alerts.",
      },
      {
        stepNumber: "03",
        title: "Draft & Log",
        description:
          "A suggested response is drafted based on your knowledge base. The ticket and classification are logged in Google Sheets for trend tracking.",
      },
    ],
    whatsIncluded: [
      "Zapier workflow with OpenAI classification",
      "Custom topic taxonomy and routing rules",
      "Slack notification templates by priority level",
      "Response draft generation with knowledge base context",
      "Google Sheets ticket log and dashboard",
      "Documentation and tuning guide",
    ],
    whoItIsFor: [
      "Support teams processing 20+ tickets per day",
      "Founders handling support alone and need faster triage",
      "Businesses with no ticket classification system",
      "Teams where urgent issues get lost in the queue",
    ],
    faq: [
      {
        question: "Can it integrate with Zendesk or Intercom?",
        answer:
          "Yes. The default setup uses email and forms, but we can connect Zendesk, Intercom, Freshdesk, or HelpScout for a customisation fee.",
      },
      {
        question: "How accurate is the classification?",
        answer:
          "Typically 90%+ accuracy after the initial tuning session. The system improves over time as you correct misclassifications.",
      },
      {
        question: "Does it reply to customers automatically?",
        answer:
          "No — it drafts a suggested response for your team to review and send. Fully automated replies can be enabled for specific categories if you prefer.",
      },
    ],
    publishedAt: "2026-01-20",
  },
  {
    title: "Invoice & Payment Tracker",
    slug: "invoice-payment-tracker",
    tagline: "Monitors outstanding invoices and chases late payments with automated email sequences.",
    description:
      "Never manually chase an invoice again. This automation monitors your invoicing tool for overdue payments, sends graduated reminder emails, and logs payment status in a central dashboard with Slack alerts for anything over 30 days late.",
    accessType: "fixed",
    price: 347,
    category: "Operations",
    featured: false,
    toolsUsed: [
      { name: "Make.com", iconKey: "Make.com" },
      { name: "Google Sheets", iconKey: "Google Sheets" },
      { name: "Slack", iconKey: "Slack" },
      { name: "Resend", iconKey: "Resend" },
    ],
    setupTimeDays: 2,
    problemStatement:
      "Chasing invoices is awkward and time-consuming. You forget who has paid, who is late, and when to follow up. Revenue leaks because nobody is tracking the gaps.",
    howItWorks: [
      {
        stepNumber: "01",
        title: "Monitor Invoices",
        description:
          "The automation checks your invoicing system daily for overdue and upcoming payments. Statuses are synced to a Google Sheets dashboard.",
      },
      {
        stepNumber: "02",
        title: "Send Reminders",
        description:
          "Graduated email reminders are sent automatically: a gentle nudge at 3 days overdue, a firmer follow-up at 7 days, and an escalation at 14 days.",
      },
      {
        stepNumber: "03",
        title: "Alert & Escalate",
        description:
          "Invoices overdue by 30+ days trigger a Slack alert to you or your finance team with a full payment history summary.",
      },
    ],
    whatsIncluded: [
      "Make.com workflow with invoice monitoring",
      "Three-stage email reminder sequence",
      "Google Sheets payment tracking dashboard",
      "Slack escalation alerts",
      "Email templates (customisable)",
      "Documentation and setup walkthrough",
    ],
    whoItIsFor: [
      "Freelancers and agencies tired of chasing payments",
      "Small businesses with no dedicated finance team",
      "Anyone using Stripe, Xero, or QuickBooks for invoicing",
      "Founders who lose track of outstanding invoices",
    ],
    faq: [
      {
        question: "Which invoicing tools does it support?",
        answer:
          "Stripe Invoicing and Xero out of the box. QuickBooks, FreshBooks, and Wave can be added for a customisation fee.",
      },
      {
        question: "Can I customise the reminder emails?",
        answer:
          "Yes. All three email templates are fully editable — tone, timing, and content. You can also add or remove reminder stages.",
      },
      {
        question: "What happens after the escalation?",
        answer:
          "That's up to you. The automation flags it and stops — it doesn't take legal action or send threatening emails. You decide the next step.",
      },
    ],
    publishedAt: "2026-02-01",
  },
  {
    title: "Custom AI Infrastructure",
    slug: "custom-ai-infrastructure",
    tagline: "Complex, multi-system AI builds designed around your business. No templates — fully bespoke.",
    description:
      "For businesses that need more than a pre-built workflow. We design, build, and maintain custom AI infrastructure — from multi-agent systems to proprietary data pipelines — tailored to your specific operations and growth targets.",
    accessType: "custom",
    category: "Operations",
    featured: false,
    toolsUsed: [
      { name: "OpenAI API", iconKey: "OpenAI API" },
      { name: "n8n", iconKey: "n8n" },
      { name: "Make.com", iconKey: "Make.com" },
      { name: "Voiceflow", iconKey: "Voiceflow" },
    ],
    setupTimeDays: 14,
    problemStatement:
      "You have a use case that doesn't fit a template. Maybe it's a multi-step agent, a proprietary data pipeline, or an internal tool that needs AI at its core. You need someone who understands both the AI and the engineering to build it right.",
    howItWorks: [
      {
        stepNumber: "01",
        title: "Discovery & Scoping",
        description:
          "We run a deep-dive session to understand your operations, data flows, and goals. You get a detailed scope document and architecture proposal.",
      },
      {
        stepNumber: "02",
        title: "Build & Iterate",
        description:
          "We build in weekly sprints with staging demos. You review progress, test in real conditions, and we iterate until it's right.",
      },
      {
        stepNumber: "03",
        title: "Deploy & Maintain",
        description:
          "We deploy to production with monitoring, error alerting, and documentation. Optional retainer for ongoing maintenance and iteration.",
      },
    ],
    whatsIncluded: [
      "Discovery session and architecture document",
      "Custom-built automation infrastructure",
      "Weekly sprint demos and feedback rounds",
      "Production deployment with monitoring",
      "Full documentation and team handover",
      "30 days of post-launch support included",
    ],
    whoItIsFor: [
      "AI & Tech startups building proprietary workflows",
      "Businesses with complex, multi-system operations",
      "Teams that have outgrown Zapier and need custom infrastructure",
      "Anyone who needs AI wired into their core product or service",
    ],
    faq: [
      {
        question: "How much does custom infrastructure cost?",
        answer:
          "Projects typically start at £2,500 and scale with complexity. You'll get a fixed quote after the discovery session — no surprises.",
      },
      {
        question: "How long do custom builds take?",
        answer:
          "Most projects are delivered in 2-4 weeks. Complex multi-agent systems may take 6-8 weeks. Timeline is agreed during scoping.",
      },
      {
        question: "Do I own the code?",
        answer:
          "Yes. Everything we build is yours. Full source code, documentation, and intellectual property transfer on completion.",
      },
      {
        question: "Can you maintain it after launch?",
        answer:
          "Yes. We offer monthly retainers for monitoring, bug fixes, and iterative improvements. Or you can maintain it in-house with our documentation.",
      },
    ],
    publishedAt: "2026-02-15",
  },
];

/* ─── Helper functions ─── */

export function getAutomationBySlug(slug: string): AutomationFullData | undefined {
  return ALL_AUTOMATIONS.find((a) => a.slug === slug);
}

export function getRelatedAutomations(
  category: string,
  excludeSlug: string,
  limit = 3,
): AutomationFullData[] {
  return ALL_AUTOMATIONS.filter(
    (a) => a.category === category && a.slug !== excludeSlug,
  ).slice(0, limit);
}

export function getFeaturedAutomations(): AutomationFullData[] {
  return ALL_AUTOMATIONS.filter((a) => a.featured);
}

/* ─── Page-level data ─── */

export const AUTOMATIONS_HERO = {
  headline: "Pre-built automations, ready to deploy",
  highlightedWord: "deploy",
  subStatement:
    "Browse our library of done-for-you automation workflows. Each one is built, tested, and ready to go live in your business within days — not months.",
  scrollCueText: "BROWSE AUTOMATIONS · BROWSE AUTOMATIONS · ",
  scrollCueTargetId: "automations-catalogue",
};

export const AUTOMATIONS_CTA: CTABannerData = {
  headline: "Need something custom? Let's build it together.",
  highlightedWord: "custom",
  ctaLabel: "Book a Free Consultation",
  ctaDestination: "/start?service=ai",
  colorScheme: "teal-solid",
  presentationMode: "section",
};
