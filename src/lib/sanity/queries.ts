/* ============================================================
   GROQ Queries — placeholder until Stage 4 (CMS wiring)
   All GROQ queries live here. Never write queries in page files.
   ============================================================ */

export const NAVIGATION_QUERY = `*[_type == "navigation"][0]{
  serviceLinks[]{label, url, highlighted},
  industryLinks[]{label, url},
  ctaLabel,
  ctaUrl,
  socialLinks[]{platform, url}
}`;

export const FOOTER_QUERY = `*[_type == "siteSettings"][0]{
  "navLinks": navigation->navLinks[]{label, url},
  socialLinks[]{platform, url},
  "legalLinks": [
    {"label": "Privacy Policy", "url": "/privacy"},
    {"label": "Terms of Service", "url": "/terms"}
  ],
  "ctaLabel": "Book a Consultation",
  "ctaUrl": "/start",
  copyrightText
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  seoTitle,
  seoDescription,
  ogImage,
  socialLinks[]{platform, url},
  contactEmail,
  whatsappNumber,
  newsletterHeadline,
  newsletterSubCopy
}`;
