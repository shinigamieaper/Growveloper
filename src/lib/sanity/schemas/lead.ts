import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "lead",
  title: "Lead",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "websiteUrl",
      title: "Website URL",
      type: "url",
      readOnly: true,
    }),
    defineField({
      name: "servicesInterested",
      title: "Services Interested",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      readOnly: true,
    }),
    defineField({
      name: "problemStatement",
      title: "Problem Statement",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "budgetRange",
      title: "Budget Range",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "preferredContact",
      title: "Preferred Contact",
      type: "string",
      options: {
        list: [
          { title: "Email", value: "email" },
          { title: "WhatsApp", value: "whatsapp" },
          { title: "Call", value: "call" },
        ],
      },
      readOnly: true,
    }),
    defineField({
      name: "additionalContext",
      title: "Additional Context",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      email: "email",
      company: "company",
    },
    prepare({ title, email, company }) {
      const subtitleParts = [email, company].filter(Boolean);
      return {
        title: title || "Unnamed Lead",
        subtitle: subtitleParts.join(" — "),
      };
    },
  },
});
