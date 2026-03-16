---
trigger: always_on
---

### Every text string visible to a site visitor comes from Sanity. No exceptions.

This includes: hero headlines, hero sub-statements, section titles, body copy, button labels, CTA text, stat numbers, stat labels, service names, sub-service lists, pain point bullets, qualifier bullets, process step copy, FAQ questions and answers, testimonial quotes, card titles and excerpts, banner headlines and sub-copy, footer copy, 404 page copy, confirmation page copy, form labels, popup headlines and sub-copy, nav labels, social proof pill text, newsletter section copy, and every price on every page.

The only strings permitted directly in code:
- ARIA labels (e.g. `aria-label="Close menu"`)
- Error boundary fallback messages
- Console.log debugging statements

**If you are about to write a visible string in JSX — stop. It goes in Sanity.**

Juwon must be able to change any headline, CTA label, stat, or price from Sanity Studio at any time without touching code or triggering a deployment.

### Other critical rules:
- No data = component returns null. No empty states or placeholders visible to visitors.
- No hardcoded popup logic. Popups only fire if Sanity config exists for that page with `enabled: true`.
- Navigation is CMS-driven. New industry or service in Sanity auto-updates the nav. No code change required.
- Structure first, content later. Never block progress waiting for real content.

---