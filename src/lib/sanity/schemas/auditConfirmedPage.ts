import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "auditConfirmedPage",
  title: "Audit Confirmed Page",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "highlightedWord", title: "Highlighted Word", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "intakeCtaLabel", title: "Intake CTA Label", type: "string" }),
    defineField({ name: "intakeCtaUrl", title: "Intake CTA URL", type: "string" }),
    defineField({
      name: "nextSteps",
      title: "Next Steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "nextStep",
          fields: [
            defineField({ name: "stepNumber", title: "Step Number", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "stepNumber" } },
        }),
      ],
    }),
    defineField({ name: "calendarCtaLabel", title: "Calendar CTA Label", type: "string" }),
    defineField({ name: "calendarCtaUrl", title: "Calendar CTA URL", type: "string" }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 2 }),
  ],
  preview: {
    prepare() {
      return { title: "Audit Confirmed Page" };
    },
  },
});
