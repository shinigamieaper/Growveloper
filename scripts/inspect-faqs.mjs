/**
 * Quick read-only inspection — checks copy on lab sections across pages.
 */
import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const home = await client.fetch(
  `*[_type == "homePage"][0]{ liveFeedHeadline, liveFeedHighlightedWord, liveFeedDescription, liveFeedSeeAllLabel }`
);
console.log("\n── homePage liveFeed copy ──");
console.log(home);

const lab = await client.fetch(
  `*[_type == "labPage"][0]{ heroHeadline, heroHighlightedWord, heroSubStatement, postInlineCtaHeadline, postNewsletterHeadline, postSectionCtaHeadline }`
);
console.log("\n── labPage hero + post-section copy ──");
console.log(lab);
