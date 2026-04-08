import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "privacyPage",
  title: "Privacy Policy Page",
  type: "document",
  fieldsets: [
    { name: "seo", title: "SEO", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: "seoTitle", title: "SEO Title", type: "string", fieldset: "seo", description: "Overrides the default page title in search results" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 3, fieldset: "seo", description: "Page description for search engines and social sharing" }),
    defineField({ name: "ogImage", title: "Social Share Image", type: "image", fieldset: "seo", description: "Image shown when the page is shared on social media" }),
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
    defineField({ name: "termsLinkLabel", title: "Terms Link Label", type: "string", description: 'e.g. "Terms of Service →"' }),
    defineField({ name: "homeLinkLabel", title: "Home Link Label", type: "string", description: 'e.g. "Back to homepage"' }),
  ],
  preview: {
    prepare() {
      return { title: "Privacy Policy Page" };
    },
  },
});
