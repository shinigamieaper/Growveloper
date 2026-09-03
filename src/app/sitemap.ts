import type { MetadataRoute } from "next";
import {
  getAllCaseStudies,
  getAllBlogPosts,
  getAllIndustries,
  getAllAutomations,
  getAllResources,
  getAllLocalServicePages,
} from "@/lib/sanity/queries";
import { SITE_URL } from "@/lib/seo";

/* Static routes carry no lastModified on purpose. A date that is always
   "now" tells crawlers nothing and teaches them to ignore the field. CMS
   routes use the document's real _updatedAt. */
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: SITE_URL, changeFrequency: "weekly", priority: 1.0 },
  { url: `${SITE_URL}/services/development`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/services/marketing`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/services/ai`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/audit`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/work`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/lab`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/nothing-after-six`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${SITE_URL}/resources`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${SITE_URL}/automations`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_URL}/start`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
];

function when(...candidates: (string | undefined | null)[]): Date | undefined {
  for (const c of candidates) {
    if (c) {
      const d = new Date(c);
      if (!Number.isNaN(d.getTime())) return d;
    }
  }
  return undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, blogPosts, industries, automations, resources, trades] =
    await Promise.all([
      getAllCaseStudies(),
      getAllBlogPosts(),
      getAllIndustries(),
      getAllAutomations(),
      getAllResources(),
      getAllLocalServicePages(),
    ]);

  const industryRoutes: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${SITE_URL}/industries/${industry.slug}`,
    lastModified: when(industry.updatedAt),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const tradeRoutes: MetadataRoute.Sitemap = trades.map((t) => ({
    url: `${SITE_URL}/industries/local-services/${t.slug}`,
    lastModified: when(t.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE_URL}/work/${cs.slug}`,
    lastModified: when(cs.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/lab/${post.slug}`,
    lastModified: when(post.updatedAt, post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const automationRoutes: MetadataRoute.Sitemap = automations.map((a) => ({
    url: `${SITE_URL}/automations/${a.slug}`,
    lastModified: when(a.updatedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const resourceRoutes: MetadataRoute.Sitemap = resources.map((r) => ({
    url: `${SITE_URL}/resources/${r.slug}`,
    lastModified: when(r.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...STATIC_ROUTES,
    ...industryRoutes,
    ...tradeRoutes,
    ...caseStudyRoutes,
    ...blogRoutes,
    ...automationRoutes,
    ...resourceRoutes,
  ];
}
