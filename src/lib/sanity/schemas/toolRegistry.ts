import { defineType, defineField } from "sanity";

export default defineType({
  name: "toolRegistry",
  title: "Tool Registry",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Development", value: "development" },
          { title: "Marketing", value: "marketing" },
          { title: "AI", value: "ai" },
          { title: "Design", value: "design" },
          { title: "Analytics", value: "analytics" },
        ],
      },
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
