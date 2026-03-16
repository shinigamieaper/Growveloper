/* ============================================================
   Sanity Client — placeholder until Stage 4 (CMS wiring)
   ============================================================ */

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const SANITY_API_VERSION = "2024-01-01";

export const sanityConfig = {
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
} as const;
