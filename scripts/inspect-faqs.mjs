/**
 * Audit copy on all known "lab/live feed" sections across pages.
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
console.log("\n── homePage.liveFeed (homepage lab section) ──");
console.log(home);

const lab = await client.fetch(
  `*[_type == "labPage"][0]{
    heroHeadline, heroHighlightedWord, heroSubStatement,
    feedHeadline, feedHighlightedWord, feedDescription,
    postInlineCtaHeadline, postNewsletterHeadline, postSectionCtaHeadline
  }`
);
console.log("\n── labPage (the /lab feed page itself) ──");
console.log(lab);

const services = await client.fetch(
  `*[_type == "servicePage"]{ pageId, liveFeedHeadline, liveFeedDescription }`
);
console.log("\n── servicePage liveFeed copy ──");
console.log(services);

const audit = await client.fetch(
  `*[_type == "auditPage"][0]{ liveFeedHeadline, liveFeedDescription }`
);
console.log("\n── auditPage liveFeed copy ──");
console.log(audit);
