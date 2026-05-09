import { defineType, defineField } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "page",
      title: "Page",
      type: "reference",
      to: [
        { type: "homePage" },
        { type: "auditPage" },
        { type: "aboutPage" },
        { type: "workPage" },
        { type: "servicePage" },
        { type: "industryPage" },
        { type: "automationsPage" },
        { type: "labPage" },
        { type: "resourcesPage" },
        { type: "blogPost" },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "page._type",
    },
  },
});
