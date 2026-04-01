import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-03-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // We use Next.js "use cache" instead
});
