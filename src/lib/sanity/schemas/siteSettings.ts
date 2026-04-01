import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
    }),
    defineField({
      name: "ogImage",
      title: "OG Image",
      type: "image",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
    }),
    defineField({
      name: "newsletterHeadline",
      title: "Newsletter Headline",
      type: "string",
    }),
    defineField({
      name: "newsletterSubCopy",
      title: "Newsletter Sub Copy",
      type: "text",
    }),
    defineField({
      name: "newsletterCtaLabel",
      title: "Newsletter CTA Label",
      type: "string",
    }),
    defineField({
      name: "newsletterSuccessHeadline",
      title: "Newsletter Success Headline",
      type: "string",
      description: 'Shown after successful signup, e.g. "You\'re in!"',
    }),
    defineField({
      name: "newsletterSuccessSubCopy",
      title: "Newsletter Success Sub Copy",
      type: "string",
      description: 'Shown after successful signup, e.g. "Check your inbox to confirm your subscription."',
    }),
    defineField({
      name: "newsletterEmailPlaceholder",
      title: "Newsletter Email Placeholder",
      type: "string",
      description: 'Input placeholder text, e.g. "your@email.com"',
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
});
