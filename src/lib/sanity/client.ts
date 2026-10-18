import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-03-01";

// Local review only: SANITY_PREVIEW_DRAFTS=1 in .env.local shows unpublished drafts. Never active in production.
const previewDrafts =
  process.env.SANITY_PREVIEW_DRAFTS === "1" && process.env.NODE_ENV !== "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // We use Next.js "use cache" instead
  ...(previewDrafts
    ? { perspective: "drafts" as const, token: process.env.SANITY_API_READ_TOKEN }
    : {}),
});
