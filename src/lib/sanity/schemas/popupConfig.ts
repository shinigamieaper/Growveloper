import { defineType, defineField } from "sanity";

export default defineType({
  name: "popupConfig",
  title: "Popup Config",
  type: "document",
  fields: [
    defineField({
      name: "pageReference",
      title: "Page Reference",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "triggerType",
      title: "Trigger Type",
      type: "string",
      options: {
        list: [
          { title: "Scroll Depth", value: "scroll_depth" },
          { title: "Time on Page", value: "time_on_page" },
          { title: "Inactivity", value: "inactivity" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "triggerValue",
      title: "Trigger Value",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "offerType",
      title: "Offer Type",
      type: "string",
      options: {
        list: [
          { title: "Newsletter", value: "newsletter" },
          { title: "Lead Magnet", value: "lead_magnet" },
          { title: "Consultation", value: "consultation" },
          { title: "Audit", value: "audit" },
          { title: "Download", value: "download" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subCopy",
      title: "Sub Copy",
      type: "text",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaDestination",
      title: "CTA Destination",
      type: "string",
    }),
    defineField({
      name: "downloadUrl",
      title: "Download URL",
      type: "url",
    }),
    defineField({
      name: "resourceTitle",
      title: "Resource Title",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "headline",
      subtitle: "pageReference",
    },
  },
});
