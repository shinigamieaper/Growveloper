import type { BlogPostCardData, BlogPostPageData, VideoCardData, LabContentCard, CTABannerData } from "@/lib/types";

/* ─── Hero ─── */
export const LAB_HEADLINE = "The Lab";
export const LAB_HIGHLIGHTED_WORD = "Lab";
export const LAB_DESCRIPTION =
  "Blog posts, breakdowns, and video content on development, marketing, and automation.";

/* ─── Content items ─── */
const BLOG_1: BlogPostCardData = {
  title: "Why Your Tech Stack Is a Marketing Decision",
  slug: "tech-stack-marketing-decision",
  excerpt:
    "The tools you build with directly shape what you can measure, test, and optimise. Most developers never consider the downstream marketing implications.",
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop",
  category: "Development",
  tags: ["tech-stack", "marketing", "strategy"],
  publishedAt: "2024-11-15",
  readTime: "6 min read",
  platform: "blog",
  featuredToggle: true,
};

const BLOG_2: BlogPostCardData = {
  title: "Attribution Is Broken — Here\u2019s What to Do Instead",
  slug: "attribution-is-broken",
  excerpt:
    "Last-click attribution is lying to you. Here\u2019s how to build a model that actually reflects how customers make decisions.",
  heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
  category: "Marketing",
  tags: ["attribution", "analytics", "GA4"],
  publishedAt: "2024-10-28",
  readTime: "8 min read",
  platform: "blog",
  featuredToggle: false,
};

const BLOG_3: BlogPostCardData = {
  title: "The Case for Building Your Own Automation Layer",
  slug: "build-your-own-automation-layer",
  excerpt:
    "Off-the-shelf tools will get you 80% of the way there. The last 20% \u2014 the part that compounds \u2014 requires something custom.",
  heroImage: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=500&fit=crop",
  category: "Automation",
  tags: ["automation", "make.com", "n8n", "strategy"],
  publishedAt: "2024-10-10",
  readTime: "5 min read",
  platform: "blog",
  featuredToggle: false,
};

const VIDEO_1: VideoCardData = {
  title: "Full-Stack Marketing Walkthrough",
  platform: "youtube",
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  thumbnail: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800&h=500&fit=crop",
  description: "A full walkthrough of how development and marketing decisions interact in a real project.",
  publishedAt: "2024-09-20",
  featuredToggle: false,
};

const VIDEO_2: VideoCardData = {
  title: "How I Build Landing Pages That Convert",
  platform: "youtube",
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=500&fit=crop",
  description: "The exact process I use to design and build landing pages \u2014 from brief to live in under a week.",
  publishedAt: "2024-09-05",
  featuredToggle: false,
};

const VIDEO_3: VideoCardData = {
  title: "3 Automations Every Small Business Needs",
  platform: "tiktok",
  videoUrl: "https://www.tiktok.com/@growveloper/video/123456789",
  thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
  description: "The three highest-ROI automations I\u2019ve built for clients \u2014 set up once, run forever.",
  publishedAt: "2024-08-18",
  featuredToggle: false,
};

export const LAB_CONTENT: LabContentCard[] = [
  BLOG_1,
  BLOG_2,
  BLOG_3,
  VIDEO_1,
  VIDEO_2,
  VIDEO_3,
];

export function getLabFeatured(): LabContentCard | null {
  return LAB_CONTENT.find((item) => item.featuredToggle) ?? null;
}

/* ─── Blog Post Detail Data ─── */

const BLOG_DETAIL_MAP: Record<string, BlogPostPageData> = {
  "tech-stack-marketing-decision": {
    ...BLOG_1,
    showCTA: true,
    pullQuote:
      "The framework you choose doesn\u2019t just affect your developer experience \u2014 it determines what data you can capture, what you can A/B test, and how fast your pages load for real users on real networks.",
    bodyParagraphs: [
      "Most developers choose a tech stack based on developer experience, ecosystem maturity, and performance benchmarks. These are all valid inputs. But there\u2019s a dimension that almost nobody considers: the downstream marketing implications of that choice.",
      "Your tech stack determines what you can measure. A server-rendered Next.js app gives you access to edge middleware, server-side analytics events, and first-party cookie management that a purely client-rendered SPA simply cannot replicate. If your marketing team relies on accurate attribution data, your rendering strategy isn\u2019t just a technical decision \u2014 it\u2019s a marketing decision.",
      "Consider page speed. Google has published extensive data showing that every 100ms of added load time costs roughly 1% of conversions. If your framework introduces 300ms of client-side hydration overhead, that\u2019s a measurable marketing cost. Not theoretical \u2014 measurable. You can see it in your funnel data if you know where to look.",
      "Then there\u2019s the question of what you can test. If your CMS is tightly coupled to your frontend, running content experiments becomes an engineering ticket. If it\u2019s headless, your marketing team can swap headlines without waiting for a deploy. The architecture either empowers experimentation or gates it behind a sprint cycle.",
      "The same logic applies to analytics infrastructure. If you\u2019re running GA4 with default settings, you\u2019re getting a fraction of the data available to you. Custom events, enhanced e-commerce tracking, and server-side tag management all depend on how your application is structured. A well-architected app makes attribution transparent. A poorly architected one makes it impossible.",
      "This is why I advocate for treating tech stack decisions as growth decisions. Before you choose a framework, ask: what does my marketing team need to measure? What experiments do they need to run? How fast does this need to load for my target audience? The answers to those questions should influence your architecture as much as any technical benchmark.",
    ],
  },
  "attribution-is-broken": {
    ...BLOG_2,
    showCTA: true,
    pullQuote:
      "Last-click attribution is a comforting lie. It tells you that the last thing someone clicked before converting is the thing that caused the conversion. That\u2019s like crediting the final step of a marathon for the entire race.",
    bodyParagraphs: [
      "If you\u2019re running paid acquisition and relying on last-click attribution, you\u2019re making budget decisions based on incomplete data. This isn\u2019t a controversial opinion anymore \u2014 it\u2019s a widely acknowledged reality that most teams still haven\u2019t addressed.",
      "The problem is structural. Modern buying journeys are non-linear. A prospect might see a social ad, read a blog post two weeks later, click a retargeting ad the week after that, and finally convert through a branded search query. Last-click attribution gives 100% of the credit to that branded search \u2014 which is the channel that least needs the credit.",
      "Google\u2019s own data-driven attribution model in GA4 is a step in the right direction, but it\u2019s still a black box. You don\u2019t know the weights, you can\u2019t audit the model, and it\u2019s optimised for Google\u2019s ecosystem. If you\u2019re spending significant money on Meta, TikTok, or organic content, you need a model that gives those channels fair representation.",
      "The practical solution is a blended model. Start by tracking every touchpoint with proper UTM parameters and custom events. Build a first-party data layer that captures the full journey \u2014 not just the conversion event. Then use that data to build your own weighted attribution model, even if it\u2019s simple.",
      "A basic position-based model (40% first touch, 40% last touch, 20% distributed across middle touches) is already more honest than last-click. It acknowledges that awareness and consideration matter, not just the final click.",
      "The point isn\u2019t perfection. The point is moving from a model that\u2019s definitively wrong to one that\u2019s approximately right. The budget decisions you make based on a better model will compound over time \u2014 and that compounding is where real growth lives.",
    ],
  },
  "build-your-own-automation-layer": {
    ...BLOG_3,
    showCTA: true,
    pullQuote:
      "Off-the-shelf automation covers the first 80%. But the last 20% \u2014 the part that creates competitive advantage \u2014 requires something built specifically for how your business operates.",
    bodyParagraphs: [
      "Every business that grows past a certain point hits an inflection where manual processes become the bottleneck. You hire more people, processes slow down, errors multiply, and the cost of coordination starts eating into your margins.",
      "Most founders reach for off-the-shelf tools first \u2014 Zapier, Make.com, or one of the dozens of no-code automation platforms. This is the right first move. These tools are excellent for connecting standard SaaS products together: new Stripe payment \u2192 send Slack notification \u2192 update CRM. Simple, predictable, fast to set up.",
      "But there\u2019s a ceiling. The moment you need conditional logic that spans multiple systems, error handling that routes to different teams based on context, or data transformations that require more than basic field mapping \u2014 the no-code tools start fighting you.",
      "This is where a custom automation layer pays for itself. Not a complete rebuild \u2014 a strategic extension. Keep the simple automations in Zapier or Make.com. But build the complex orchestration logic in something you control: n8n self-hosted, a lightweight Node.js service, or even a set of serverless functions.",
      "The key is knowing which processes to automate custom and which to leave in no-code. The decision framework is simple: if the process is standard (CRM sync, email notifications, data backups), keep it in off-the-shelf tools. If the process is unique to how your business operates (custom scoring algorithms, multi-step approval workflows, context-aware routing), build it custom.",
      "The ROI calculation is straightforward. How many hours per week does this process consume manually? What\u2019s the error rate? What\u2019s the cost per error? A custom automation that saves 10 hours per week and eliminates a 5% error rate typically pays for itself within 6\u20138 weeks. After that, it\u2019s pure margin.",
    ],
  },
};

export function getBlogPostBySlug(slug: string): BlogPostPageData | null {
  return BLOG_DETAIL_MAP[slug] ?? null;
}

export function getRelatedPosts(slug: string, limit = 3): BlogPostCardData[] {
  const current = BLOG_DETAIL_MAP[slug];
  if (!current) return [];
  const blogs = LAB_CONTENT.filter(
    (item): item is BlogPostCardData => "platform" in item && item.platform === "blog" && item.slug !== slug,
  );
  // prefer same category, then most recent
  return blogs
    .sort((a, b) => {
      const sameCatA = a.category === current.category ? 1 : 0;
      const sameCatB = b.category === current.category ? 1 : 0;
      if (sameCatA !== sameCatB) return sameCatB - sameCatA;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .slice(0, limit);
}

/* ─── Newsletter ─── */
export const LAB_NEWSLETTER = {
  headline: "Stay in the loop",
  highlightedWord: "loop",
  subCopy: "No spam. Just builds, breakdowns, and the occasional experiment.",
  ctaLabel: "Subscribe",
};

/* ─── CTAs ─── */

// Inline CTA — after feed, before newsletter
export const LAB_CTA_INLINE: CTABannerData = {
  headline: "Got a project in mind? Let\u2019s talk.",
  highlightedWord: "Let\u2019s talk",
  ctaLabel: "Start a project",
  ctaDestination: "/start",
};

// Section CTA — end of page, after newsletter
export const LAB_CTA_SECTION: CTABannerData = {
  headline: "Ready to build something that compounds?",
  highlightedWord: "compounds",
  ctaLabel: "Work with me",
  ctaDestination: "/start",
};
