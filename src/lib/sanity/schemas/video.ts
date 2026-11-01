import { defineType, defineField } from "sanity";

export default defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
          { title: "TikTok", value: "tiktok" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "duration",
      title: "Length",
      type: "string",
      description: "As shown on the card, e.g. 4:26",
      validation: (rule) => rule.regex(/^\d{1,2}(:\d{2}){1,2}$/, { name: "m:ss or h:mm:ss" }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "featuredToggle",
      title: "Featured",
      type: "boolean",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "platform",
      media: "thumbnail",
    },
  },
});
