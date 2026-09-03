import { defineType, defineField, defineArrayMember } from "sanity";
import { ICON_OPTIONS } from "./iconOptions";

/* One page per trade under /industries/local-services (cleaning companies,
   roofers, clinics, ...). Same shape as an industry page but slimmer, and
   every statistic carries its source so the page never claims a number it
   cannot point at. */
export default defineType({
  name: "localServicePage",
  title: "Local Service Trade Page",
  type: "document",
  groups: [
    { name: "card", title: "Card" },
    { name: "seo", title: "SEO" },
    { name: "hero", title: "Hero" },
    { name: "problem", title: "Pain points" },
    { name: "help", title: "How we help" },
    { name: "stats", title: "Stats" },
    { name: "cta", title: "CTAs" },
    { name: "faq", title: "FAQ section" },
    { name: "research", title: "Research" },
  ],
  fields: [
    defineField({ name: "tradeName", title: "Trade Name", type: "string", group: "card", validation: (rule) => rule.required(), description: 'Plural, as the owner says it, e.g. "Cleaning companies"' }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "card", options: { source: "tradeName" }, validation: (rule) => rule.required(), description: "URL becomes /industries/local-services/<slug>" }),
    defineField({ name: "parent", title: "Parent Industry Page", type: "reference", to: [{ type: "industryPage" }], group: "card" }),
    defineField({ name: "icon", title: "Icon", type: "string", group: "card", options: { list: ICON_OPTIONS } }),
    defineField({ name: "hookLine", title: "Hook Line", type: "string", group: "card", description: "One sentence shown on the trade card" }),

    defineField({ name: "seoTitle", title: "SEO Title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", group: "seo" }),
    defineField({ name: "ogImage", title: "Share Image", type: "image", group: "seo" }),

    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string", group: "hero", validation: (rule) => rule.required() }),
    defineField({ name: "heroHighlightedWord", title: "Hero Highlighted Word", type: "string", group: "hero" }),
    defineField({ name: "heroSubStatement", title: "Hero Sub-Statement", type: "text", group: "hero" }),
    defineField({ name: "primaryCtaLabel", title: "Primary CTA Label", type: "string", group: "hero" }),
    defineField({ name: "primaryCtaUrl", title: "Primary CTA URL", type: "string", group: "hero" }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string", group: "hero" }),
    defineField({ name: "secondaryCtaUrl", title: "Secondary CTA URL", type: "string", group: "hero" }),

    defineField({ name: "problemHeadline", title: "Problem Headline", type: "string", group: "problem" }),
    defineField({ name: "problemHighlightedWord", title: "Problem Highlighted Word", type: "string", group: "problem" }),
    defineField({ name: "painPoints", title: "Pain Points", type: "array", group: "problem", of: [defineArrayMember({ type: "string" })] }),

    defineField({ name: "howWeHelpHeadline", title: "How We Help Headline", type: "string", group: "help" }),
    defineField({ name: "howWeHelpHighlightedWord", title: "How We Help Highlighted Word", type: "string", group: "help" }),
    defineField({ name: "howWeHelpDescription", title: "How We Help Description", type: "text", group: "help" }),
    defineField({ name: "serviceCardCtaLabel", title: "Service Card CTA Label", type: "string", group: "help" }),
    defineField({
      name: "serviceCards",
      title: "Service Cards",
      type: "array",
      group: "help",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({ name: "linkUrl", title: "Link URL", type: "string" }),
            defineField({ name: "icon", title: "Icon", type: "string", options: { list: ICON_OPTIONS } }),
          ],
        }),
      ],
    }),

    defineField({ name: "statsHeadline", title: "Stats Headline", type: "string", group: "stats" }),
    defineField({ name: "statsHighlightedWord", title: "Stats Highlighted Word", type: "string", group: "stats" }),
    defineField({ name: "statsDescription", title: "Stats Description", type: "text", group: "stats" }),
    defineField({
      name: "stats",
      title: "Stats (each with a source)",
      type: "array",
      group: "stats",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "value", title: "Value", type: "number", validation: (rule) => rule.required() }),
            defineField({ name: "prefix", title: "Prefix", type: "string" }),
            defineField({ name: "suffix", title: "Suffix", type: "string" }),
            defineField({ name: "decimals", title: "Decimals", type: "number" }),
            defineField({ name: "sourceName", title: "Source Name", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "sourceUrl", title: "Source URL", type: "url", validation: (rule) => rule.required() }),
            defineField({ name: "year", title: "Year", type: "number" }),
          ],
          preview: { select: { title: "label", subtitle: "sourceName" } },
        }),
      ],
    }),

    defineField({ name: "ctaInlineHeadline", title: "Inline CTA Headline", type: "string", group: "cta" }),
    defineField({ name: "ctaInlineHighlightedWord", title: "Inline CTA Highlighted Word", type: "string", group: "cta" }),
    defineField({ name: "ctaInlineLabel", title: "Inline CTA Label", type: "string", group: "cta" }),
    defineField({ name: "ctaInlineDestination", title: "Inline CTA Destination", type: "string", group: "cta" }),
    defineField({ name: "ctaSectionHeadline", title: "Section CTA Headline", type: "string", group: "cta" }),
    defineField({ name: "ctaSectionHighlightedWord", title: "Section CTA Highlighted Word", type: "string", group: "cta" }),
    defineField({ name: "ctaSectionLabel", title: "Section CTA Label", type: "string", group: "cta" }),
    defineField({ name: "ctaSectionDestination", title: "Section CTA Destination", type: "string", group: "cta" }),

    defineField({ name: "faqHeadline", title: "FAQ Headline", type: "string", group: "faq" }),
    defineField({ name: "faqHighlightedWord", title: "FAQ Highlighted Word", type: "string", group: "faq" }),
    defineField({ name: "faqDescription", title: "FAQ Description", type: "text", group: "faq" }),
    defineField({ name: "faqCtaHeadline", title: "FAQ CTA Headline", type: "string", group: "faq" }),
    defineField({ name: "faqCtaDescription", title: "FAQ CTA Description", type: "text", group: "faq" }),
    defineField({ name: "faqCtaLabel", title: "FAQ CTA Label", type: "string", group: "faq" }),
    defineField({ name: "faqCtaUrl", title: "FAQ CTA URL", type: "string", group: "faq" }),

    defineField({
      name: "targetQueries",
      title: "Target search queries",
      type: "array",
      group: "research",
      description: "Internal. The searches this page is written to answer. Not rendered.",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: {
    select: { title: "tradeName", subtitle: "slug.current" },
  },
});
