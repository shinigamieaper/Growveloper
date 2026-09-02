import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const PRIVATE_PATHS = ["/studio/", "/api/", "/start/confirmed", "/test"];

/* Search and answer engines that cite sources. Named groups ignore the "*"
   group entirely, so the private paths are repeated for them. Training-only
   crawlers are not listed and fall back to the default group. */
const AI_SEARCH_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "cohere-ai",
  "DuckAssistBot",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: AI_SEARCH_AGENTS,
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
