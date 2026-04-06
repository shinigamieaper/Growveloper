import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "startConfirmedPage",
  title: "Start Confirmed Page",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "highlightedWord", title: "Highlighted Word", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({
      name: "nextSteps",
      title: "Next Steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "nextStep",
          fields: [
            defineField({ name: "stepNumber", title: "Step Number", type: "string", description: 'e.g. "01"' }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "stepNumber" } },
        }),
      ],
    }),
    defineField({ name: "ctaLabel", title: "Primary CTA Label", type: "string" }),
    defineField({ name: "ctaUrl", title: "Primary CTA URL", type: "string" }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string" }),
    defineField({ name: "secondaryCtaUrl", title: "Secondary CTA URL", type: "string" }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 2 }),
  ],
  preview: {
    prepare() {
      return { title: "Start Confirmed Page" };
    },
  },
});
