import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "meta", title: "Meta / SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "1-line summary used on /lab feed cards.",
      type: "text",
      group: "content",
      rows: 2,
    }),
    defineField({
      name: "tldr",
      title: "TL;DR",
      description:
        "Short summary rendered as a callout above the body. Distinct from the excerpt.",
      type: "text",
      group: "content",
      rows: 4,
    }),
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      description:
        "Optional standout quote rendered between the first two body paragraphs.",
      type: "text",
      group: "content",
      rows: 2,
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context.parent as { asset?: unknown } | undefined;
              if (parent?.asset && !value) return "Alt text is required when an image is set.";
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }),
                  }),
                  defineField({
                    name: "anchorId",
                    title: "Anchor ID (in-page)",
                    description: "If linking to a heading on this same post, set href to '#anchor-id' and leave this empty.",
                    type: "string",
                    hidden: true,
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
        defineArrayMember({
          name: "costTable",
          title: "Cost Breakdown Table",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "headerLow",
              title: "Low Column Header",
              type: "string",
              initialValue: "Low",
            }),
            defineField({
              name: "headerMid",
              title: "Mid Column Header",
              type: "string",
              initialValue: "Mid",
            }),
            defineField({
              name: "headerHigh",
              title: "High Column Header",
              type: "string",
              initialValue: "High",
            }),
            defineField({
              name: "rows",
              title: "Rows",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "label", title: "Line Item", type: "string", validation: (r) => r.required() }),
                    defineField({ name: "low", title: "Low", type: "string" }),
                    defineField({ name: "mid", title: "Mid", type: "string" }),
                    defineField({ name: "high", title: "High", type: "string" }),
                  ],
                  preview: {
                    select: { title: "label", subtitle: "mid" },
                  },
                }),
              ],
              validation: (rule) => rule.min(1),
            }),
            defineField({
              name: "totalLabel",
              title: "Total Label",
              type: "string",
            }),
            defineField({
              name: "totalLow",
              title: "Total Low",
              type: "string",
            }),
            defineField({
              name: "totalMid",
              title: "Total Mid",
              type: "string",
            }),
            defineField({
              name: "totalHigh",
              title: "Total High",
              type: "string",
            }),
            defineField({
              name: "sourcesNote",
              title: "Sources Note",
              description: "Small caption rendered beneath the table.",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "title", rows: "rows" },
            prepare({ title, rows }) {
              const count = Array.isArray(rows) ? rows.length : 0;
              return {
                title: title ?? "Cost Breakdown Table",
                subtitle: `${count} row${count === 1 ? "" : "s"}`,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "content",
    }),
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
      group: "content",
    }),
    defineField({
      name: "author",
      title: "Author",
      description: "Display name used in JSON-LD and any byline rendering.",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "featuredToggle",
      title: "Featured",
      type: "boolean",
      group: "content",
    }),
    defineField({
      name: "showCTA",
      title: "Show CTA",
      type: "boolean",
      group: "content",
    }),
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      description: "Overrides the default <title> tag if set.",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      description: "Overrides the excerpt for <meta name='description'> if set.",
      type: "text",
      group: "meta",
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: "Published Date (Newest)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "heroImage",
    },
  },
});
