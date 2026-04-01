import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "resource",
  title: "Resource",
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
      name: "description",
      title: "Description",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "resourceType",
      title: "Resource Type",
      type: "string",
      options: {
        list: [
          { title: "Template", value: "Template" },
          { title: "Guide", value: "Guide" },
          { title: "Framework", value: "Framework" },
          { title: "Playbook", value: "Playbook" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({
      name: "accessType",
      title: "Access Type",
      type: "string",
      options: {
        list: [
          { title: "Free", value: "free" },
          { title: "Paid", value: "paid" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priceUSD",
      title: "Price (USD — $)",
      type: "number",
      hidden: ({ parent }) => parent?.accessType !== "paid",
    }),
    defineField({
      name: "priceGBP",
      title: "Price (GBP — £)",
      type: "number",
      hidden: ({ parent }) => parent?.accessType !== "paid",
    }),
    defineField({
      name: "priceNGN",
      title: "Price (NGN — ₦)",
      type: "number",
      hidden: ({ parent }) => parent?.accessType !== "paid",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "previewImages",
      title: "Preview Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
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
      name: "fileAsset",
      title: "File Asset",
      type: "file",
    }),
    defineField({
      name: "fileUrl",
      title: "File URL",
      type: "url",
    }),
    defineField({
      name: "featuredToggle",
      title: "Featured",
      type: "boolean",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "showPreview",
      title: "Show Preview",
      type: "boolean",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "resourceType",
      media: "coverImage",
    },
  },
});
