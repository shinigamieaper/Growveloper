import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "auditPage",
  title: "Audit Page",
  type: "document",
  fieldsets: [
    { name: "hero", title: "Hero", options: { collapsible: true } },
    { name: "qualifiers", title: "Qualifiers", options: { collapsible: true } },
    { name: "scope", title: "Scope", options: { collapsible: true } },
    { name: "deliverables", title: "Deliverables", options: { collapsible: true } },
    { name: "process", title: "Process", options: { collapsible: true } },
    { name: "findings", title: "Findings", options: { collapsible: true } },
    { name: "pricing", title: "Pricing", options: { collapsible: true } },
    { name: "finalCta", title: "Final CTA", options: { collapsible: true } },
    { name: "newsletter", title: "Newsletter Section", options: { collapsible: true } },
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
      name: "heroPrice",
      title: "Hero Price",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroPriceLabel",
      title: "Hero Price Label",
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
      name: "heroSecondaryCtaText",
      title: "Hero Secondary CTA Text",
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
      name: "heroScrollCueText",
      title: "Hero Scroll Cue Text",
      type: "string",
      fieldset: "hero",
    }),

    /* ── Qualifiers ── */
    defineField({
      name: "qualifiersHeadline",
      title: "Qualifiers Headline",
      type: "string",
      fieldset: "qualifiers",
    }),
    defineField({
      name: "qualifiersHighlightedWord",
      title: "Qualifiers Highlighted Word",
      type: "string",
      fieldset: "qualifiers",
    }),
    defineField({
      name: "qualifiers",
      title: "Qualifiers",
      type: "array",
      fieldset: "qualifiers",
      of: [defineArrayMember({ type: "string" })],
    }),

    /* ── Scope ── */
    defineField({
      name: "scopeHeadline",
      title: "Scope Headline",
      type: "string",
      fieldset: "scope",
    }),
    defineField({
      name: "scopeHighlightedWord",
      title: "Scope Highlighted Word",
      type: "string",
      fieldset: "scope",
    }),
    defineField({
      name: "scopeDescription",
      title: "Scope Description",
      type: "text",
      fieldset: "scope",
    }),
    defineField({
      name: "scopeColumns",
      title: "Scope Columns",
      type: "array",
      fieldset: "scope",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon", type: "string", options: { list: [{ title: "Zap", value: "zap" }, { title: "Bot", value: "bot" }, { title: "Bar Chart", value: "bar-chart" }, { title: "Code", value: "code" }, { title: "Megaphone", value: "megaphone" }, { title: "Shield", value: "shield" }, { title: "Workflow", value: "workflow" }, { title: "Gauge", value: "gauge" }, { title: "Target", value: "target" }, { title: "Brain", value: "brain" }] } }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({
              name: "bullets",
              title: "Bullets",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
            defineField({ name: "lottiePath", title: "Lottie Animation", type: "string", options: { list: [{ title: "Chat Bot", value: "/lottie-json/Chat Bot.json" }, { title: "Digital Marketing", value: "/lottie-json/Digital Marketing.json" }, { title: "Web Development", value: "/lottie-json/Web Development.json" }, { title: "Step — Architect", value: "/lottie-json/step-architect.json" }, { title: "Step — Audit", value: "/lottie-json/step-audit.json" }, { title: "Step — Build", value: "/lottie-json/step-build.json" }, { title: "Step — Scale", value: "/lottie-json/step-scale.json" }] } }),
          ],
        }),
      ],
    }),

    /* ── Deliverables ── */
    defineField({
      name: "deliverablesHeadline",
      title: "Deliverables Headline",
      type: "string",
      fieldset: "deliverables",
    }),
    defineField({
      name: "deliverablesHighlightedWord",
      title: "Deliverables Highlighted Word",
      type: "string",
      fieldset: "deliverables",
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables",
      type: "array",
      fieldset: "deliverables",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon", type: "string", options: { list: [{ title: "File / Report", value: "file-text" }, { title: "Presentation / Slides", value: "presentation" }, { title: "Video Recording", value: "video" }, { title: "Roadmap / Plan", value: "map" }] } }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
          ],
        }),
      ],
    }),

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
          ],
        }),
      ],
    }),

    /* ── Findings ── */
    defineField({
      name: "findingsHeadline",
      title: "Findings Headline",
      type: "string",
      fieldset: "findings",
    }),
    defineField({
      name: "findingsHighlightedWord",
      title: "Findings Highlighted Word",
      type: "string",
      fieldset: "findings",
    }),
    defineField({
      name: "findings",
      title: "Findings",
      type: "array",
      fieldset: "findings",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "text", title: "Text", type: "string" }),
          ],
        }),
      ],
    }),

    /* ── Pricing ── */
    defineField({
      name: "pricingHeadline",
      title: "Pricing Headline",
      type: "string",
      fieldset: "pricing",
    }),
    defineField({
      name: "pricingHighlightedWord",
      title: "Pricing Highlighted Word",
      type: "string",
      fieldset: "pricing",
    }),
    defineField({
      name: "pricingTiers",
      title: "Pricing Tiers",
      type: "array",
      fieldset: "pricing",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "price", title: "Price", type: "string" }),
            defineField({ name: "priceSubtext", title: "Price Subtext", type: "string" }),
            defineField({
              name: "features",
              title: "Features",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
            defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
            defineField({ name: "ctaUrl", title: "CTA URL", type: "string" }),
            defineField({ name: "highlighted", title: "Highlighted", type: "boolean" }),
            defineField({ name: "badge", title: "Badge", type: "string" }),
          ],
        }),
      ],
    }),

    /* ── Newsletter Section ── */
    defineField({ name: "newsletterHeadline", title: "Newsletter Headline", type: "string", fieldset: "newsletter" }),
    defineField({ name: "newsletterHighlightedWord", title: "Newsletter Highlighted Word", type: "string", fieldset: "newsletter" }),
    defineField({ name: "newsletterSubCopy", title: "Newsletter Sub Copy", type: "text", fieldset: "newsletter" }),
    defineField({ name: "newsletterCtaLabel", title: "Newsletter CTA Label", type: "string", fieldset: "newsletter" }),

    /* ── Final CTA ── */
    defineField({
      name: "finalCtaHeadline",
      title: "Final CTA Headline",
      type: "string",
      fieldset: "finalCta",
    }),
    defineField({
      name: "finalCtaHighlightedWord",
      title: "Final CTA Highlighted Word",
      type: "string",
      fieldset: "finalCta",
    }),
    defineField({
      name: "finalCtaSubCopy",
      title: "Final CTA Sub Copy",
      type: "text",
      fieldset: "finalCta",
    }),
    defineField({
      name: "finalCtaLabel",
      title: "Final CTA Label",
      type: "string",
      fieldset: "finalCta",
    }),
    defineField({
      name: "finalCtaUrl",
      title: "Final CTA URL",
      type: "string",
      fieldset: "finalCta",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Audit Page" };
    },
  },
});
