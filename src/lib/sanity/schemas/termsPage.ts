import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "termsPage",
  title: "Terms of Service Page",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string" }),
    defineField({ name: "lastUpdated", title: "Last Updated", type: "date" }),
    defineField({ name: "contentsLabel", title: "Contents Label", type: "string", description: 'Label above the table of contents. e.g. "Contents"' }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Section Heading", type: "string" }),
            defineField({
              name: "body",
              title: "Section Body",
              type: "array",
              of: [defineArrayMember({ type: "block" })],
            }),
          ],
          preview: {
            select: { title: "heading" },
          },
        }),
      ],
    }),
    defineField({ name: "privacyLinkLabel", title: "Privacy Link Label", type: "string", description: 'e.g. "Privacy Policy →"' }),
    defineField({ name: "homeLinkLabel", title: "Home Link Label", type: "string", description: 'e.g. "Back to homepage"' }),
  ],
  preview: {
    prepare() {
      return { title: "Terms of Service Page" };
    },
  },
});
