import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "logoDark",
      title: "Logo Dark",
      type: "image",
    }),
    defineField({
      name: "servicesLabel",
      title: "Services Dropdown Label",
      type: "string",
    }),
    defineField({
      name: "industriesLabel",
      title: "Industries Dropdown Label",
      type: "string",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA URL",
      type: "string",
    }),
    defineField({
      name: "serviceLinks",
      title: "Service Links",
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
              name: "url",
              title: "URL",
              type: "string",
            }),
            defineField({
              name: "highlighted",
              title: "Highlighted",
              type: "boolean",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "industryLinks",
      title: "Industry Links",
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
              name: "url",
              title: "URL",
              type: "string",
            }),
            defineField({
              name: "highlighted",
              title: "Highlighted",
              type: "boolean",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "staticLinks",
      title: "Static Links",
      description: "Top-level nav links (e.g. Work, The Lab, Resources, About)",
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
