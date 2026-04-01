import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "automation",
  title: "Automation",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "problemStatement",
      title: "Problem Statement",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "howItWorks",
      title: "How It Works",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "step",
              title: "Step",
              type: "number",
            }),
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
          ],
        }),
      ],
    }),
    defineField({
      name: "whatsIncluded",
      title: "What's Included",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "whoItIsFor",
      title: "Who It's For",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "toolsUsed",
      title: "Tools Used",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "toolRegistry" }],
        }),
      ],
    }),
    defineField({
      name: "setupTime",
      title: "Setup Time",
      type: "string",
    }),
    defineField({
      name: "accessType",
      title: "Access Type",
      type: "string",
      options: {
        list: [
          { title: "Fixed", value: "fixed" },
          { title: "Custom", value: "custom" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
});
