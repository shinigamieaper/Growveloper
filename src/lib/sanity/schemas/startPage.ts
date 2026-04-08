import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "startPage",
  title: "Start Page",
  type: "document",
  groups: [
    { name: "hero", title: "Page Copy" },
    { name: "formConfig", title: "Form Configuration" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "pageHeadline", title: "Page Headline", type: "string", group: "hero" }),
    defineField({ name: "pageHighlightedWord", title: "Highlighted Word", type: "string", group: "hero" }),
    defineField({ name: "pageDescription", title: "Page Description", type: "text", rows: 2, group: "hero" }),
    defineField({
      name: "formSteps",
      title: "Form Steps",
      type: "array",
      group: "formConfig",
      description: "Steps are ordered by the Order field on each step object.",
      of: [
        defineArrayMember({
          type: "object",
          name: "formStep",
          title: "Step",
          fields: [
            defineField({ name: "stepTitle", title: "Step Title", type: "string" }),
            defineField({ name: "stepDescription", title: "Step Description", type: "string" }),
            defineField({ name: "order", title: "Order", type: "number" }),
            defineField({
              name: "fields",
              title: "Fields",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "formField",
                  title: "Field",
                  fields: [
                    defineField({
                      name: "fieldId",
                      title: "Field ID",
                      type: "string",
                      description: "Unique key used as form field name, e.g. 'company', 'budgetRange'",
                    }),
                    defineField({ name: "label", title: "Label", type: "string" }),
                    defineField({
                      name: "fieldType",
                      title: "Field Type",
                      type: "string",
                      options: {
                        list: [
                          { title: "Text", value: "text" },
                          { title: "Email", value: "email" },
                          { title: "URL", value: "url" },
                          { title: "Textarea", value: "textarea" },
                          { title: "Select (dropdown)", value: "select" },
                          { title: "Multi-select (checkboxes)", value: "multiselect" },
                          { title: "Radio buttons", value: "radio" },
                        ],
                      },
                    }),
                    defineField({ name: "placeholder", title: "Placeholder", type: "string" }),
                    defineField({ name: "required", title: "Required", type: "boolean", initialValue: false }),
                    defineField({
                      name: "options",
                      title: "Options",
                      description: "For select, multiselect, and radio field types only",
                      type: "array",
                      of: [
                        defineArrayMember({
                          type: "object",
                          name: "fieldOption",
                          fields: [
                            defineField({ name: "value", title: "Value", type: "string" }),
                            defineField({ name: "label", title: "Label", type: "string" }),
                          ],
                          preview: { select: { title: "label", subtitle: "value" } },
                        }),
                      ],
                    }),
                    defineField({
                      name: "showWhen",
                      title: "Show When (conditional)",
                      description: "Only show this field when another field has a specific value",
                      type: "object",
                      fields: [
                        defineField({
                          name: "dependsOnField",
                          title: "Depends On Field ID",
                          type: "string",
                        }),
                        defineField({
                          name: "hasValue",
                          title: "Has Value(s)",
                          description: "Show when the dependent field contains any of these values",
                          type: "array",
                          of: [defineArrayMember({ type: "string" })],
                        }),
                      ],
                    }),
                    defineField({ name: "order", title: "Order", type: "number" }),
                  ],
                  preview: { select: { title: "label", subtitle: "fieldType" } },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "stepTitle", subtitle: "order" },
            prepare({ title, subtitle }: { title?: string; subtitle?: number }) {
              return { title: title || "Untitled Step", subtitle: `Step ${subtitle}` };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "submitButtonLabel",
      title: "Submit Button Label",
      type: "string",
      group: "formConfig",
      description: 'Custom label for the final submit button, e.g. "Get My Free Strategy Call"',
    }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 2, group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Start Page" };
    },
  },
});
