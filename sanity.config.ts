import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/lib/sanity/schemas";

const singletonTypes = new Set([
  "homePage",
  "auditPage",
  "aboutPage",
  "startPage",
  "startConfirmedPage",
  "auditConfirmedPage",
  "siteSettings",
  "navigation",
  "footer",
]);

const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "growveloper",
  title: "GROWVELOPER CMS",
  basePath: "/studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // ── Singletons ──
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .title("Navigation")
              .id("navigation")
              .child(S.document().schemaType("navigation").documentId("navigation")),
            S.listItem()
              .title("Footer")
              .id("footer")
              .child(S.document().schemaType("footer").documentId("footer")),

            S.divider(),

            // ── Page singletons ──
            S.listItem()
              .title("Home Page")
              .id("homePage")
              .child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem()
              .title("Audit Page")
              .id("auditPage")
              .child(S.document().schemaType("auditPage").documentId("auditPage")),
            S.listItem()
              .title("About Page")
              .id("aboutPage")
              .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.listItem()
              .title("Start Page")
              .id("startPage")
              .child(S.document().schemaType("startPage").documentId("startPage")),
            S.listItem()
              .title("Start Confirmed")
              .id("startConfirmedPage")
              .child(S.document().schemaType("startConfirmedPage").documentId("startConfirmedPage")),
            S.listItem()
              .title("Audit Confirmed")
              .id("auditConfirmedPage")
              .child(S.document().schemaType("auditConfirmedPage").documentId("auditConfirmedPage")),

            S.divider(),

            // ── Service pages (3 documents of the same type) ──
            S.listItem()
              .title("Service Pages")
              .child(
                S.documentList()
                  .title("Service Pages")
                  .filter('_type == "servicePage"')
              ),

            S.divider(),

            // ── Collections ──
            ...S.documentTypeListItems().filter(
              (item) =>
                !singletonTypes.has(item.getId()!) &&
                item.getId() !== "servicePage"
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: "2025-03-01" }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
