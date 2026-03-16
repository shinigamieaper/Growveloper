---
trigger: always_on
---

efore building any new component, page, or section, Cascade must:

1. **State clearly what it plans to build** — the component name, its purpose, what data it accepts, what it renders
2. **Ask for any missing context** — if the spec is unclear on layout, interaction, or data shape for this specific component, ask before building
3. **Request relevant references** — ask if there are screenshots, competitor examples, or existing code that would improve the output
4. **Confirm the approach** — briefly describe the technical approach (e.g. "I'll use a CSS grid with 2 columns on tablet and 1 on mobile, GSAP fade-up on scroll entry") and wait for confirmation before writing code

This applies to:
- Every new component file
- Every new page
- Every animation implementation
- Every CMS schema or query
- Any integration (Stripe, Mailchimp, Cal.com etc)

**Do not build blind. One clarifying exchange prevents three rebuilds.**

The only exception: simple utility functions and type definitions that have no design decisions — build those without asking.
