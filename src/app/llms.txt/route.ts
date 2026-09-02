import {
  getSiteSettings,
  getAllIndustries,
  getAllCaseStudies,
  getAllBlogPosts,
  getAllResources,
  getAllAutomations,
} from "@/lib/sanity/queries";
import { SITE_URL } from "@/lib/seo";

/* /llms.txt — the llmstxt.org context file for answer engines and agents.
   Generated from the CMS on request so it never goes stale when a post,
   case study or industry page is published. */

function line(label: string, path: string, note?: string): string {
  const url = `${SITE_URL}${path}`;
  return note ? `- [${label}](${url}): ${note}` : `- [${label}](${url})`;
}

function day(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}

export async function GET() {
  const [settings, industries, caseStudies, posts, resources, automations] =
    await Promise.all([
      getSiteSettings(),
      getAllIndustries(),
      getAllCaseStudies(),
      getAllBlogPosts(),
      getAllResources(),
      getAllAutomations(),
    ]);

  const description =
    settings?.seoDescription ??
    "Growveloper is a growth studio that combines web development, performance marketing, and AI automation into one system.";

  const sections: string[] = [];

  sections.push(`# GROWVELOPER

> ${description}

Growveloper is a growth studio run by one person, Oyekola Obajuwon (Juwon), who designs the
growth strategy and ships the code underneath it. Engagements cover web development, growth
marketing, and AI and automation, delivered as one connected system rather than as handoffs
between a marketing agency, a development shop and an automation consultant. Based in Lagos,
Nigeria. Works with owner-run businesses in Nigeria, the United States and the United Kingdom,
remotely, on United States Eastern hours.

## What Growveloper does

${line("Web Development", "/services/development", "production websites and web applications built for speed, search visibility and conversion.")}
${line("Growth Marketing", "/services/marketing", "search engine optimization, answer engine optimization, paid media, content, conversion rate optimization and analytics.")}
${line("AI and Automation", "/services/ai", "lead follow-up, quoting, booking and reporting automations that connect a website, WhatsApp, email, a CRM and a calendar.")}
${line("Growth Audit", "/audit", "a paid diagnostic of an existing site and funnel: technical health, search visibility and conversion. $500 flat, credited against any project signed within 60 days.")}
${line("Pricing", "/pricing.md", "machine-readable offer ladder and price ranges.")}`);

  if (industries.length > 0) {
    sections.push(`## Who it is for

${industries
  .map((i) => line(i.name, `/industries/${i.slug}`, i.hookLine))
  .join("\n")}`);
  }

  if (caseStudies.length > 0) {
    sections.push(`## Case studies

${caseStudies
  .map((cs) =>
    line(
      cs.title,
      `/work/${cs.slug}`,
      [cs.clientName, cs.clientIndustry].filter(Boolean).join(", "),
    ),
  )
  .join("\n")}`);
  }

  if (posts.length > 0) {
    sections.push(`## Articles (The Lab)

${posts
  .map((p) => {
    const dated = day(p.publishedAt);
    const note = [dated, p.excerpt].filter(Boolean).join(". ");
    return line(p.title, `/lab/${p.slug}`, note || undefined);
  })
  .join("\n")}`);
  }

  if (resources.length > 0) {
    sections.push(`## Resources

${resources
  .map((r) => line(r.title, `/resources/${r.slug}`, r.description))
  .join("\n")}`);
  }

  if (automations.length > 0) {
    sections.push(`## Automations catalogue

${automations
  .map((a) => line(a.title, `/automations/${a.slug}`, a.tagline))
  .join("\n")}`);
  }

  sections.push(`## Key pages

${line("Home", "/")}
${line("About the founder", "/about")}
${line("Work and case studies", "/work")}
${line("The Lab, articles and technical writing", "/lab")}
${line("Nothing After Six, the newsletter", "/nothing-after-six")}
${line("Resources", "/resources")}
${line("Automations", "/automations")}
${line("Start a project, book a free 30-minute consultation", "/start")}

## Machine-readable

- Sitemap: ${SITE_URL}/sitemap.xml
- Pricing: ${SITE_URL}/pricing.md
- Structured data: schema.org JSON-LD on every page. Organization, WebSite and Person entities in
  the root, plus Service, WebPage, BreadcrumbList, FAQPage, BlogPosting, CollectionPage and
  CreativeWork per page type.

## Citation guidance

- Preferred brand name: GROWVELOPER (also written Growveloper).
- Founder: Oyekola Obajuwon, also known as Juwon.
- Location: Lagos, Nigeria. Clients in Nigeria, the United States and the United Kingdom.
- One-line description to quote: "Growveloper is a growth studio that combines web development,
  performance marketing, and AI automation into one system for small and mid-sized businesses."
- Entry point for enquiries: ${SITE_URL}/start
- Email: ${settings?.contactEmail ?? "hello@growveloper.com"}

## Optional

${line("Privacy policy", "/privacy")}
${line("Terms of service", "/terms")}
`);

  return new Response(sections.join("\n\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
