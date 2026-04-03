import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fieldsets: [
    { name: "hero", title: "Hero", options: { collapsible: true } },
    { name: "diagnosis", title: "Diagnosis", options: { collapsible: true } },
    { name: "services", title: "Services", options: { collapsible: true } },
    { name: "industries", title: "Industries", options: { collapsible: true } },
    { name: "process", title: "Process", options: { collapsible: true } },
    { name: "caseStudies", title: "Case Studies", options: { collapsible: true } },
    { name: "ctaBanners", title: "CTA Banners", options: { collapsible: true } },
    { name: "testimonials", title: "Testimonials", options: { collapsible: true } },
    { name: "faq", title: "FAQ", options: { collapsible: true } },
    { name: "liveFeed", title: "Live Feed", options: { collapsible: true } },
    { name: "beforeAfter", title: "Before & After", options: { collapsible: true } },
    { name: "successMetrics", title: "Success Metrics", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    /* ── Hero ── */
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroHighlightedWord",
      title: "Hero Highlighted Word",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroSubStatement",
      title: "Hero Sub-Statement",
      type: "text",
      fieldset: "hero",
    }),
    defineField({
      name: "heroPrimaryCtaLabel",
      title: "Hero Primary CTA Label",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroPrimaryCtaUrl",
      title: "Hero Primary CTA URL",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaLabel",
      title: "Hero Secondary CTA Label",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaUrl",
      title: "Hero Secondary CTA URL",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroSocialProofText",
      title: "Hero Social Proof Text",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroScrollCueText",
      title: "Hero Scroll Cue Text",
      type: "string",
      fieldset: "hero",
      description: 'Marquee text on the scroll cue button, e.g. "EXPLORE OUR WORK · "',
    }),
    defineField({
      name: "heroScrollCueTargetId",
      title: "Hero Scroll Cue Target ID",
      type: "string",
      fieldset: "hero",
      description: 'ID of the section to scroll to, e.g. "case-studies"',
    }),

    /* ── Diagnosis ── */
    defineField({
      name: "diagnosisHeadline",
      title: "Diagnosis Headline",
      type: "string",
      fieldset: "diagnosis",
    }),
    defineField({
      name: "diagnosisHighlightedWord",
      title: "Diagnosis Highlighted Word",
      type: "string",
      fieldset: "diagnosis",
    }),
    defineField({
      name: "diagnosisDescription",
      title: "Diagnosis Description",
      type: "text",
      fieldset: "diagnosis",
    }),
    defineField({
      name: "diagnosisCards",
      title: "Diagnosis Cards",
      type: "array",
      fieldset: "diagnosis",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Pick the icon that best represents the pain point or problem on this card",
              options: {
                list: [
                  // Performance & Growth
                  { title: "⚡ Zap — Quick wins, speed, energy", value: "zap" },
                  { title: "🚀 Rocket — Growth, launch, momentum", value: "rocket" },
                  { title: "🔥 Flame — Urgency, heat, burning problems", value: "flame" },
                  { title: "📈 Trending Up — Growth going up, positive momentum", value: "trending-up" },
                  { title: "📉 Trending Down — Declining results, lost traction", value: "trending-down" },
                  { title: "↘ Arrow Down Right — Falling numbers, poor performance", value: "arrow-down-right" },
                  { title: "⏱ Gauge — Speed, performance score, load time", value: "gauge" },
                  // Data & Analytics
                  { title: "📊 Bar Chart — Analytics, reporting, data", value: "bar-chart" },
                  { title: "📊 Bar Chart 2 — Comparison data, grouped stats", value: "bar-chart-2" },
                  { title: "📈 Line Chart — Trends over time, growth curves", value: "line-chart" },
                  { title: "🗄 Database — Data storage, CRM, unorganised data", value: "database" },
                  // Tech & Code
                  { title: "💻 Code — Tech debt, custom builds, dev work", value: "code" },
                  { title: "🔧 Wrench — Broken systems, maintenance issues", value: "wrench" },
                  { title: "🗂 Layers — Stack complexity, too many layers", value: "layers" },
                  { title: "🔄 Workflow — Automation gaps, process flow", value: "workflow" },
                  // Marketing & Content
                  { title: "📣 Megaphone — Marketing, ads, broadcasting", value: "megaphone" },
                  { title: "🔍 Search — SEO, discoverability, visibility", value: "search" },
                  { title: "🌐 Globe — Online presence, website, web reach", value: "globe" },
                  { title: "✉ Mail — Email marketing, outreach", value: "mail" },
                  { title: "📥 Inbox — Lead capture, unread messages", value: "inbox" },
                  { title: "🖱 Click — CRO, conversion, user interaction", value: "mouse-pointer-click" },
                  // Automation & AI
                  { title: "🤖 Bot — AI, chatbots, automated responses", value: "bot" },
                  { title: "🧠 Brain — Strategy, thinking, AI intelligence", value: "brain" },
                  { title: "🔁 Repeat — Repetitive tasks, loops, manual work", value: "repeat" },
                  { title: "🔃 Refresh — Updating, rebuilding, fresh start", value: "refresh-cw" },
                  // People & Leads
                  { title: "👥 Users — Team, audience, customer base", value: "users" },
                  { title: "🚫 User X — Churn, lost customers, disconnected leads", value: "user-x" },
                  { title: "🎯 Target — Goals, precision, lead targeting", value: "target" },
                  // Trust & Visibility
                  { title: "🛡 Shield Check — Security, trust, compliance", value: "shield" },
                  { title: "🛡 Shield — Protection, defence, basic security", value: "shield-plain" },
                  { title: "👁 Eye — Visibility, being seen, impressions", value: "eye" },
                  { title: "🙈 Eye Off — Hidden, invisible, no organic reach", value: "eye-off" },
                  { title: "🔒 Lock — Locked growth, barriers, restricted access", value: "lock" },
                  { title: "🔓 Unlock — Unlocking potential, removing blockers", value: "unlock" },
                  // Connectivity & Problems
                  { title: "🧩 Puzzle — Disconnected tools, missing pieces", value: "puzzle" },
                  { title: "🔗 Link — Integrations, connected systems", value: "link" },
                  { title: "🔗 Unlink — Broken integrations, siloed tools", value: "unlink" },
                  { title: "⚠ Alert Triangle — Warnings, critical issues, risk", value: "alert-triangle" },
                  // Time & Cost
                  { title: "🕐 Clock — Time wasted, slow processes, delays", value: "clock" },
                  { title: "💰 Dollar Sign — Budget waste, ROI, revenue problems", value: "dollar-sign" },
                  // Ideas
                  { title: "💡 Lightbulb — Insights, ideas, strategy gaps", value: "lightbulb" },
                ],
              },
            }),
            defineField({ name: "headline", title: "Headline", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text" }),
          ],
        }),
      ],
    }),

    /* ── Services ── */
    defineField({
      name: "servicesHeadline",
      title: "Services Headline",
      type: "string",
      fieldset: "services",
    }),
    defineField({
      name: "servicesHighlightedWord",
      title: "Services Highlighted Word",
      type: "string",
      fieldset: "services",
    }),
    defineField({
      name: "servicesDescription",
      title: "Services Description",
      type: "text",
      fieldset: "services",
    }),
    defineField({
      name: "serviceItems",
      title: "Service Items",
      type: "array",
      fieldset: "services",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "stepNumber", title: "Step Number", type: "string" }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({
              name: "subItems",
              title: "Sub Items",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
            defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
            defineField({ name: "ctaUrl", title: "CTA URL", type: "string" }),
            defineField({ name: "lottiePath", title: "Lottie Animation", type: "string", options: { list: [{ title: "Chat Bot", value: "/lottie-json/Chat Bot.json" }, { title: "Digital Marketing", value: "/lottie-json/Digital Marketing.json" }, { title: "Web Development", value: "/lottie-json/Web Development.json" }, { title: "Step — Architect", value: "/lottie-json/step-architect.json" }, { title: "Step — Audit", value: "/lottie-json/step-audit.json" }, { title: "Step — Build", value: "/lottie-json/step-build.json" }, { title: "Step — Scale", value: "/lottie-json/step-scale.json" }] } }),
            defineField({ name: "fallbackGradient", title: "Fallback Gradient", type: "string" }),
            defineField({ name: "icon", title: "Icon", type: "string" }),
          ],
        }),
      ],
    }),

    /* ── Industries ── */
    defineField({
      name: "industriesHeadline",
      title: "Industries Headline",
      type: "string",
      fieldset: "industries",
    }),
    defineField({
      name: "industriesHighlightedWord",
      title: "Industries Highlighted Word",
      type: "string",
      fieldset: "industries",
    }),
    defineField({
      name: "industriesDescription",
      title: "Industries Description",
      type: "text",
      fieldset: "industries",
    }),
    defineField({
      name: "industryCards",
      title: "Industry Cards",
      type: "array",
      fieldset: "industries",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "industryPage" }],
        }),
      ],
    }),
    defineField({ name: "industriesCtaHeadline", title: "Industries CTA Headline", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesCtaLabel", title: "Industries CTA Label", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesCtaUrl", title: "Industries CTA URL", type: "string", fieldset: "industries" }),

    /* ── Process ── */
    defineField({
      name: "processHeadline",
      title: "Process Headline",
      type: "string",
      fieldset: "process",
    }),
    defineField({
      name: "processHighlightedWord",
      title: "Process Highlighted Word",
      type: "string",
      fieldset: "process",
    }),
    defineField({
      name: "processDescription",
      title: "Process Description",
      type: "text",
      fieldset: "process",
    }),
    defineField({
      name: "processSteps",
      title: "Process Steps",
      type: "array",
      fieldset: "process",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "stepNumber", title: "Step Number", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({ name: "lottiePath", title: "Lottie Animation", type: "string", options: { list: [{ title: "Chat Bot", value: "/lottie-json/Chat Bot.json" }, { title: "Digital Marketing", value: "/lottie-json/Digital Marketing.json" }, { title: "Web Development", value: "/lottie-json/Web Development.json" }, { title: "Step — Architect", value: "/lottie-json/step-architect.json" }, { title: "Step — Audit", value: "/lottie-json/step-audit.json" }, { title: "Step — Build", value: "/lottie-json/step-build.json" }, { title: "Step — Scale", value: "/lottie-json/step-scale.json" }] } }),
            defineField({ name: "fallbackGradient", title: "Fallback Gradient", type: "string" }),
          ],
        }),
      ],
    }),

    /* ── Case Studies ── */
    defineField({
      name: "caseStudiesHeadline",
      title: "Case Studies Headline",
      type: "string",
      fieldset: "caseStudies",
    }),
    defineField({
      name: "caseStudiesHighlightedWord",
      title: "Case Studies Highlighted Word",
      type: "string",
      fieldset: "caseStudies",
    }),
    defineField({
      name: "caseStudiesDescription",
      title: "Case Studies Description",
      type: "text",
      fieldset: "caseStudies",
    }),
    defineField({
      name: "featuredCaseStudies",
      title: "Featured Case Studies",
      type: "array",
      fieldset: "caseStudies",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "caseStudy" }],
        }),
      ],
    }),

    /* ── CTA Banners ── */
    defineField({
      name: "ctaBanner1",
      title: "CTA Banner 1",
      type: "object",
      fieldset: "ctaBanners",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "highlightedWord", title: "Highlighted Word", type: "string" }),
        defineField({ name: "subCopy", title: "Sub Copy", type: "text" }),
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "ctaUrl", title: "CTA URL", type: "string" }),
      ],
    }),
    defineField({
      name: "ctaBanner2",
      title: "CTA Banner 2",
      type: "object",
      fieldset: "ctaBanners",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "highlightedWord", title: "Highlighted Word", type: "string" }),
        defineField({ name: "subCopy", title: "Sub Copy", type: "text" }),
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "ctaUrl", title: "CTA URL", type: "string" }),
      ],
    }),

    /* ── Testimonials ── */
    defineField({
      name: "testimonialHeadline",
      title: "Testimonial Headline",
      type: "string",
      fieldset: "testimonials",
    }),
    defineField({
      name: "testimonialHighlightedWord",
      title: "Testimonial Highlighted Word",
      type: "string",
      fieldset: "testimonials",
    }),
    defineField({
      name: "testimonialDescription",
      title: "Testimonial Description",
      type: "text",
      fieldset: "testimonials",
    }),
    defineField({
      name: "featuredTestimonials",
      title: "Featured Testimonials",
      type: "array",
      fieldset: "testimonials",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "testimonial" }],
        }),
      ],
    }),
    defineField({ name: "testimonialCtaHeadline", title: "Testimonial CTA Headline", type: "string", fieldset: "testimonials" }),
    defineField({ name: "testimonialCtaLabel", title: "Testimonial CTA Label", type: "string", fieldset: "testimonials" }),
    defineField({ name: "testimonialCtaUrl", title: "Testimonial CTA URL", type: "string", fieldset: "testimonials" }),

    /* ── FAQ ── */
    defineField({
      name: "faqHeadline",
      title: "FAQ Headline",
      type: "string",
      fieldset: "faq",
    }),
    defineField({
      name: "faqHighlightedWord",
      title: "FAQ Highlighted Word",
      type: "string",
      fieldset: "faq",
    }),
    defineField({
      name: "faqDescription",
      title: "FAQ Description",
      type: "text",
      fieldset: "faq",
    }),
    defineField({ name: "faqCtaHeadline", title: "FAQ CTA Headline", type: "string", fieldset: "faq" }),
    defineField({ name: "faqCtaDescription", title: "FAQ CTA Description", type: "text", fieldset: "faq" }),
    defineField({ name: "faqCtaLabel", title: "FAQ CTA Label", type: "string", fieldset: "faq" }),
    defineField({ name: "faqCtaUrl", title: "FAQ CTA URL", type: "string", fieldset: "faq" }),

    /* ── Live Feed ── */
    defineField({
      name: "liveFeedHeadline",
      title: "Live Feed Headline",
      type: "string",
      fieldset: "liveFeed",
    }),
    defineField({
      name: "liveFeedHighlightedWord",
      title: "Live Feed Highlighted Word",
      type: "string",
      fieldset: "liveFeed",
    }),
    defineField({
      name: "liveFeedSeeAllLabel",
      title: "Live Feed See All Label",
      type: "string",
      fieldset: "liveFeed",
    }),
    defineField({
      name: "liveFeedDescription",
      title: "Live Feed Description",
      type: "text",
      fieldset: "liveFeed",
    }),

    /* ── Before & After ── */
    defineField({
      name: "beforeAfterHeadline",
      title: "Before & After Headline",
      type: "string",
      fieldset: "beforeAfter",
    }),
    defineField({
      name: "beforeAfterHighlightedWord",
      title: "Before & After Highlighted Word",
      type: "string",
      fieldset: "beforeAfter",
    }),
    defineField({
      name: "beforeAfterDescription",
      title: "Before & After Description",
      type: "text",
      fieldset: "beforeAfter",
    }),
    defineField({
      name: "beforeAfterPairs",
      title: "Before & After Pairs",
      type: "array",
      fieldset: "beforeAfter",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "clientName", title: "Client Name", type: "string" }),
            defineField({
              name: "beforeImage",
              title: "Before Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "afterImage",
              title: "After Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "beforeLabel", title: "Before Label", type: "string" }),
            defineField({ name: "afterLabel", title: "After Label", type: "string" }),
          ],
        }),
      ],
    }),

    /* ── Success Metrics ── */
    defineField({
      name: "successMetrics",
      title: "Success Metrics",
      type: "array",
      fieldset: "successMetrics",
      description: "Metrics shown in the animated Success section. State 0 = Lighthouse (index 0: Score, index 1: Load Time). State 2 = Traffic (index 0: ROAS, index 1: Conversion Rate).",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "stateIndex", title: "State Index (0-4)", type: "number" }),
            defineField({ name: "pillar", title: "Pillar ID", type: "string", description: "e.g. lighthouse-score, load-time, roas, conversion-rate" }),
            defineField({ name: "metricLabel", title: "Label", type: "string" }),
            defineField({ name: "metricValue", title: "Value", type: "number" }),
            defineField({ name: "metricSuffix", title: "Suffix", type: "string", description: "e.g. s, ×, %" }),
            defineField({ name: "metricPrefix", title: "Prefix", type: "string", description: "e.g. +" }),
            defineField({ name: "decimals", title: "Decimal Places", type: "number" }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
