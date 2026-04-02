import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
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
      name: "clientIndustry",
      title: "Client Industry",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Video",
      type: "url",
    }),
    defineField({
      name: "situation",
      title: "Situation",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "approach",
      title: "Approach",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "buildSection",
      title: "Build Section",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "result",
      title: "Result",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
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
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Displayed as pills on the case study hero, e.g. SEO, PPC, React",
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "toolRegistry" }],
        }),
      ],
    }),
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
    }),
    defineField({
      name: "nextCaseStudy",
      title: "Next Case Study",
      type: "reference",
      to: [{ type: "caseStudy" }],
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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "clientIndustry",
      media: "heroImage",
    },
  },
});
