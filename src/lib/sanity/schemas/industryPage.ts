import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "industryPage",
  title: "Industry Page",
  type: "document",
  fields: [
    defineField({
      name: "industryName",
      title: "Industry Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "industryName" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
    }),
    defineField({
      name: "hookLine",
      title: "Hook Line",
      type: "string",
    }),
    defineField({
      name: "ctaLabel",
      title: "Card CTA Label",
      type: "string",
      description: 'Label shown on the industry card button, e.g. "Learn More"',
    }),
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string" }),
    defineField({ name: "heroHighlightedWord", title: "Hero Highlighted Word", type: "string" }),
    defineField({ name: "heroSubStatement", title: "Hero Sub-Statement", type: "text" }),
    defineField({ name: "primaryCtaLabel", title: "Primary CTA Label", type: "string", description: 'e.g. "Book a free consultation"' }),
    defineField({ name: "primaryCtaUrl", title: "Primary CTA URL", type: "string", description: 'e.g. /start' }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string", description: 'e.g. "See our work"' }),
    defineField({ name: "secondaryCtaUrl", title: "Secondary CTA URL", type: "string", description: 'e.g. /work' }),
    defineField({ name: "scrollCueText", title: "Scroll Cue Text", type: "string", description: 'e.g. "Scroll to explore"' }),
    defineField({ name: "problemHeadline", title: "Problem Section Headline", type: "string", description: 'e.g. "Sound familiar?"' }),
    defineField({ name: "problemHighlightedWord", title: "Problem Highlighted Word", type: "string" }),
    defineField({ name: "howWeHelpHeadline", title: "How We Help Headline", type: "string", description: 'e.g. "How we help"' }),
    defineField({ name: "howWeHelpHighlightedWord", title: "How We Help Highlighted Word", type: "string" }),
    defineField({ name: "howWeHelpDescription", title: "How We Help Description", type: "text" }),
    defineField({ name: "serviceCardCtaLabel", title: "Service Card CTA Label", type: "string", description: 'Shared label for service card links, e.g. "Learn more"' }),
    defineField({ name: "qualifierHeadline", title: "Qualifier Section Headline", type: "string", description: 'e.g. "This is for you if…"' }),
    defineField({ name: "qualifierHighlightedWord", title: "Qualifier Highlighted Word", type: "string" }),
    defineField({ name: "ctaInlineHeadline", title: "Inline CTA Headline", type: "string", description: 'e.g. "Working in SaaS? Let\u2019s talk."' }),
    defineField({ name: "ctaInlineHighlightedWord", title: "Inline CTA Highlighted Word", type: "string" }),
    defineField({ name: "ctaInlineLabel", title: "Inline CTA Label", type: "string" }),
    defineField({ name: "ctaInlineDestination", title: "Inline CTA Destination URL", type: "string" }),
    defineField({ name: "otherIndustriesHeadline", title: "Other Industries Section Headline", type: "string" }),
    defineField({ name: "otherIndustriesHighlightedWord", title: "Other Industries Highlighted Word", type: "string" }),
    defineField({ name: "otherIndustriesDescription", title: "Other Industries Description", type: "text" }),
    defineField({ name: "otherIndustriesCtaHeadline", title: "Other Industries CTA Headline", type: "string" }),
    defineField({ name: "otherIndustriesCtaLabel", title: "Other Industries CTA Label", type: "string" }),
    defineField({
      name: "painPoints",
      title: "Pain Points",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "serviceCards",
      title: "Service Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "linkUrl",
              title: "Link URL",
              type: "string",
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "outcomeStats",
      title: "Outcome Stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "number",
            }),
            defineField({
              name: "prefix",
              title: "Prefix",
              type: "string",
            }),
            defineField({
              name: "suffix",
              title: "Suffix",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "featuredCaseStudies",
      title: "Featured Case Studies",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "caseStudy" }],
        }),
      ],
    }),
    defineField({
      name: "featuredTestimonials",
      title: "Featured Testimonials",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "testimonial" }],
        }),
      ],
    }),
    /* ── Before & After ── */
    defineField({ name: "beforeAfterHeadline", title: "Before & After Headline", type: "string" }),
    defineField({ name: "beforeAfterHighlightedWord", title: "Before & After Highlighted Word", type: "string" }),
    defineField({ name: "beforeAfterDescription", title: "Before & After Description", type: "text" }),
    defineField({
      name: "beforeAfterPairs",
      title: "Before & After Pairs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "clientName", title: "Client Name", type: "string" }),
            defineField({ name: "beforeImage", title: "Before Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "afterImage", title: "After Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "beforeLabel", title: "Before Label", type: "string", description: 'Defaults to "Before"' }),
            defineField({ name: "afterLabel", title: "After Label", type: "string", description: 'Defaults to "After"' }),
          ],
        }),
      ],
    }),

    /* ── Process Steps ── */
    defineField({ name: "processHeadline", title: "Process Headline", type: "string" }),
    defineField({ name: "processHighlightedWord", title: "Process Highlighted Word", type: "string" }),
    defineField({ name: "processDescription", title: "Process Description", type: "text" }),
    defineField({
      name: "processSteps",
      title: "Process Steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "stepNumber", title: "Step Number", type: "string" }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({ name: "lottiePath", title: "Lottie Path", type: "string" }),
            defineField({ name: "fallbackGradient", title: "Fallback Gradient", type: "string" }),
          ],
        }),
      ],
    }),

    /* ── Section CTA ── */
    defineField({ name: "ctaSectionHeadline", title: "Section CTA Headline", type: "string" }),
    defineField({ name: "ctaSectionHighlightedWord", title: "Section CTA Highlighted Word", type: "string" }),
    defineField({ name: "ctaSectionLabel", title: "Section CTA Label", type: "string" }),
    defineField({ name: "ctaSectionDestination", title: "Section CTA Destination URL", type: "string" }),

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "industryName",
      subtitle: "heroHeadline",
    },
  },
});
