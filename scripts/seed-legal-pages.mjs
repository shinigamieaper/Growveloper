/**
 * One-off seed script — pushes Privacy Policy and Terms of Service
 * content to Sanity. Run with: node scripts/seed-legal-pages.mjs
 *
 * Safe to re-run: uses createOrReplace so it overwrites the same singleton docs.
 * All content is editable in Sanity Studio after seeding.
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

/* ── Portable Text helpers ── */

/** Create a block of normal text */
function block(text, key) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
  };
}

/** Create a block with bold segments. boldParts is array of strings to bold. */
function blockWithBold(parts, key) {
  // parts: array of { text, bold? }
  const markDefs = [];
  const children = parts.map((p, i) => ({
    _type: "span",
    _key: `${key}s${i}`,
    text: p.text,
    marks: p.bold ? ["strong"] : [],
  }));
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs,
    children,
  };
}

/* ═══════════════════════════════════════════════════════════
   PAGE 1: Privacy Policy
   ═══════════════════════════════════════════════════════════ */

const privacyPage = {
  _id: "privacyPage",
  _type: "privacyPage",
  pageTitle: "Privacy Policy",
  lastUpdated: "2026-04-08",
  contentsLabel: "Contents",
  termsLinkLabel: "Terms of Service \u2192",
  homeLinkLabel: "Back to homepage",
  sections: [
    /* ── Section 1: Who we are ── */
    {
      _key: "s1",
      heading: "Who we are",
      body: [
        block("Growveloper is a growth studio operated by Oyekola Obajuwon Abdulsalam, based in Lagos, Nigeria. We provide web development, growth marketing, and AI automation services to businesses worldwide.", "s1b1"),
        block("Website: growveloper.com\nEmail: hello@growveloper.com", "s1b2"),
        block('When this policy says "we," "us," or "Growveloper," it refers to this business. When it says "you," it refers to anyone who visits our website, submits a form, makes a purchase, or subscribes to our newsletter.', "s1b3"),
      ],
    },

    /* ── Section 2: What data we collect ── */
    {
      _key: "s2",
      heading: "What data we collect",
      body: [
        block("We collect different types of data depending on how you interact with us.", "s2b1"),
        blockWithBold([{ text: "Information you give us directly:", bold: true }], "s2b2"),
        block("When you fill out our consultation form at /start, we collect your name, email address, company name, website URL (optional), services you're interested in, a description of your growth challenge, your budget range, timeline, preferred contact method, how you heard about us, and any additional context you provide.", "s2b3"),
        block("When you purchase a Growth Audit, Flutterwave (our payment processor) collects your email address and payment details. We receive your email and a transaction reference. We do not store your credit card or bank details.", "s2b4"),
        block("When you subscribe to our newsletter, we collect your email address through Mailchimp.", "s2b5"),
        block("When you book a call through Cal.com, we collect your name, email, and the time slot you select.", "s2b6"),
        blockWithBold([{ text: "Information collected automatically:", bold: true }], "s2b7"),
        block("When you visit our website, we collect usage data through Google Analytics 4 (via Google Tag Manager), including pages visited, time on page, referral source, device type, browser, approximate location (city/country level), and screen resolution.", "s2b8"),
        block("Sentry (our error monitoring tool) collects technical data when errors occur, including browser type, operating system, IP address, and the page where the error happened. This data is used only to fix bugs.", "s2b9"),
        block("Microsoft Clarity may record anonymized session replays (mouse movements, clicks, scrolls) to help us understand how visitors use the site. Clarity does not collect passwords, payment details, or text entered into forms.", "s2b10"),
        block("Vercel (our hosting provider) processes server logs that include IP addresses and request metadata. This is standard web hosting infrastructure.", "s2b11"),
      ],
    },

    /* ── Section 3: Why we collect your data ── */
    {
      _key: "s3",
      heading: "Why we collect your data",
      body: [
        block("We collect and use your data for the following reasons:", "s3b1"),
        block("To respond to your consultation request and prepare for our conversation. Legal basis: your consent (you submitted the form) and our legitimate interest in providing the service you asked for.", "s3b2"),
        block("To process your payment and deliver the Growth Audit. Legal basis: performance of a contract.", "s3b3"),
        block("To send you our newsletter. Legal basis: your consent (you opted in). You can unsubscribe at any time using the link in every email.", "s3b4"),
        block("To understand how people use our website so we can improve it. Legal basis: legitimate interest in improving our services.", "s3b5"),
        block("To detect and fix technical errors. Legal basis: legitimate interest in maintaining a functional website.", "s3b6"),
        block("We do not sell your data. We do not use your data for purposes other than what's listed above.", "s3b7"),
      ],
    },

    /* ── Section 4: Third-party services ── */
    {
      _key: "s4",
      heading: "Third-party services that process your data",
      body: [
        block("We use the following third-party services. Each has its own privacy policy governing how it handles your data:", "s4b1"),
        block("Google Analytics 4 and Google Tag Manager (analytics): Privacy policy at policies.google.com/privacy", "s4b2"),
        block("Mailchimp (newsletter): Privacy policy at mailchimp.com/legal/privacy", "s4b3"),
        block("Resend (transactional emails): Privacy policy at resend.com/legal/privacy-policy", "s4b4"),
        block("Flutterwave (payment processing): Privacy policy at flutterwave.com/ng/privacy-policy", "s4b5"),
        block("Sentry (error monitoring): Privacy policy at sentry.io/privacy", "s4b6"),
        block("Vercel (website hosting): Privacy policy at vercel.com/legal/privacy-policy", "s4b7"),
        block("Cal.com (calendar booking): Privacy policy at cal.com/privacy", "s4b8"),
        block("Microsoft Clarity (session analytics): Privacy policy at privacy.microsoft.com/privacystatement", "s4b9"),
        block("We only share the minimum data each service needs to function. For example, Flutterwave receives your email to process payment. Mailchimp receives your email to send newsletters. We do not share your consultation form responses with any third party.", "s4b10"),
      ],
    },

    /* ── Section 5: Cookies and tracking ── */
    {
      _key: "s5",
      heading: "Cookies and tracking",
      body: [
        block("Our website uses cookies. Here's what they do:", "s5b1"),
        blockWithBold([{ text: "Strictly necessary cookies: ", bold: true }, { text: "Required for the website to function. These cannot be disabled." }], "s5b2"),
        blockWithBold([{ text: "Analytics cookies (Google Analytics 4): ", bold: true }, { text: "Track how visitors use the site. These are loaded through Google Tag Manager and collect anonymized usage data. You can opt out via your browser settings or by using the Google Analytics opt-out browser add-on." }], "s5b3"),
        blockWithBold([{ text: "Session recording (Microsoft Clarity): ", bold: true }, { text: "Records anonymized interactions with the site. No personal data, passwords, or form inputs are captured." }], "s5b4"),
        block("We do not use advertising cookies or retargeting pixels.", "s5b5"),
        block("If you're in the EU/EEA, we will ask for your consent before placing non-essential cookies. You can withdraw consent at any time through your browser settings.", "s5b6"),
      ],
    },

    /* ── Section 6: How long we keep your data ── */
    {
      _key: "s6",
      heading: "How long we keep your data",
      body: [
        blockWithBold([{ text: "Consultation form submissions: ", bold: true }, { text: "We keep these for 24 months from the date of submission. If you become a client, your data is retained for the duration of our working relationship plus 12 months." }], "s6b1"),
        blockWithBold([{ text: "Payment records: ", bold: true }, { text: "Transaction records are kept for 7 years to comply with tax and accounting obligations." }], "s6b2"),
        blockWithBold([{ text: "Newsletter subscribers: ", bold: true }, { text: "Your email is stored until you unsubscribe. After unsubscribing, your email is removed from our mailing list within 30 days." }], "s6b3"),
        blockWithBold([{ text: "Analytics data: ", bold: true }, { text: "Google Analytics retains data for 14 months (our configured retention period). Sentry retains error data for 90 days." }], "s6b4"),
        blockWithBold([{ text: "Session recordings: ", bold: true }, { text: "Microsoft Clarity retains session data for 30 days." }], "s6b5"),
      ],
    },

    /* ── Section 7: Your rights ── */
    {
      _key: "s7",
      heading: "Your rights",
      body: [
        block("Depending on where you are located, you have some or all of the following rights regarding your personal data:", "s7b1"),
        blockWithBold([{ text: "Right to access: ", bold: true }, { text: "You can ask us what data we hold about you." }], "s7b2"),
        blockWithBold([{ text: "Right to correction: ", bold: true }, { text: "You can ask us to fix any incorrect data." }], "s7b3"),
        blockWithBold([{ text: "Right to deletion: ", bold: true }, { text: "You can ask us to delete your data. We will comply unless we have a legal obligation to keep it (such as tax records)." }], "s7b4"),
        blockWithBold([{ text: "Right to object: ", bold: true }, { text: "You can object to our processing of your data for direct marketing or based on legitimate interest." }], "s7b5"),
        blockWithBold([{ text: "Right to data portability: ", bold: true }, { text: "You can ask for a copy of your data in a structured, commonly used format." }], "s7b6"),
        blockWithBold([{ text: "Right to withdraw consent: ", bold: true }, { text: "If you consented to data processing (such as the newsletter), you can withdraw that consent at any time." }], "s7b7"),
        block("These rights apply under the Nigeria Data Protection Act (NDPA) 2023, the EU General Data Protection Regulation (GDPR), the Canadian Personal Information Protection and Electronic Documents Act (PIPEDA), and the California Consumer Privacy Act (CCPA/CPRA), among other applicable laws.", "s7b8"),
        block("To exercise any of these rights, email us at hello@growveloper.com. We will respond within 30 days.", "s7b9"),
      ],
    },

    /* ── Section 8: International data transfers ── */
    {
      _key: "s8",
      heading: "International data transfers",
      body: [
        block("Growveloper is based in Nigeria. Our third-party services operate servers in various countries, including the United States and the European Union. When your data is transferred outside your country of residence, it is protected by the terms of each service provider's data processing agreements, which include Standard Contractual Clauses (SCCs) where applicable.", "s8b1"),
        block("By using our website and services, you acknowledge that your data may be processed in countries with different data protection laws than your own.", "s8b2"),
      ],
    },

    /* ── Section 9: Data security ── */
    {
      _key: "s9",
      heading: "Data security",
      body: [
        block("We take reasonable measures to protect your data:", "s9b1"),
        block("Our website is served over HTTPS with TLS encryption.", "s9b2"),
        block("Access to our Sanity CMS (where form submissions are stored) is restricted to authorized personnel only.", "s9b3"),
        block("Payment processing is handled entirely by Flutterwave. We never see or store your payment card details.", "s9b4"),
        block("Our email (hello@growveloper.com) is hosted on Zoho Mail with two-factor authentication enabled.", "s9b5"),
        block('No system is 100% secure. If a data breach occurs that affects your personal data, we will notify you and the relevant authorities within 72 hours as required by applicable law.', "s9b6"),
      ],
    },

    /* ── Section 10: Children's data ── */
    {
      _key: "s10",
      heading: "Children's data",
      body: [
        block("Our website and services are not directed at anyone under the age of 18. We do not knowingly collect data from minors. If you believe we have collected data from a minor, contact us at hello@growveloper.com and we will delete it promptly.", "s10b1"),
      ],
    },

    /* ── Section 11: Changes to this policy ── */
    {
      _key: "s11",
      heading: "Changes to this policy",
      body: [
        block('We may update this policy from time to time. When we do, we will update the "Last updated" date at the top of this page. If we make significant changes that affect how we handle your data, we will notify you by email (if we have your email address) or by posting a notice on our website.', "s11b1"),
      ],
    },

    /* ── Section 12: Contact us ── */
    {
      _key: "s12",
      heading: "Contact us",
      body: [
        block("If you have questions about this privacy policy or want to exercise your data rights, contact us:", "s12b1"),
        block("Email: hello@growveloper.com\nWebsite: growveloper.com/start", "s12b2"),
        block("We aim to respond to all privacy-related inquiries within 30 days.", "s12b3"),
        block("If you are not satisfied with our response, you may lodge a complaint with the Nigeria Data Protection Commission (NDPC) at ndpc.gov.ng, or with the supervisory authority in your jurisdiction.", "s12b4"),
      ],
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   PAGE 2: Terms of Service
   ═══════════════════════════════════════════════════════════ */

const termsPage = {
  _id: "termsPage",
  _type: "termsPage",
  pageTitle: "Terms of Service",
  lastUpdated: "2026-04-08",
  contentsLabel: "Contents",
  privacyLinkLabel: "Privacy Policy \u2192",
  homeLinkLabel: "Back to homepage",
  sections: [
    /* ── Section 1: Agreement to terms ── */
    {
      _key: "t1",
      heading: "Agreement to terms",
      body: [
        block('By accessing or using growveloper.com ("the Site") or engaging Growveloper for any services, you agree to these Terms of Service. If you do not agree, do not use the Site or our services.', "t1b1"),
        block("Growveloper is operated by Oyekola Obajuwon Abdulsalam, based in Lagos, Nigeria.", "t1b2"),
        block("These terms apply to all visitors, users, and clients.", "t1b3"),
      ],
    },

    /* ── Section 2: Services we provide ── */
    {
      _key: "t2",
      heading: "Services we provide",
      body: [
        block("Growveloper offers web development, growth marketing, AI automation, and growth audit services. The specific scope, deliverables, timeline, and pricing for any project are defined in a separate project proposal or contract agreed upon between you and Growveloper before work begins.", "t2b1"),
        block("These Terms of Service govern your use of the website and general engagement. They do not replace project-specific contracts.", "t2b2"),
      ],
    },

    /* ── Section 3: Consultation requests ── */
    {
      _key: "t3",
      heading: "Consultation requests",
      body: [
        block("When you submit the consultation form at /start, you are requesting a free consultation. Submitting the form does not create a binding agreement or obligation on either party. It is an expression of interest.", "t3b1"),
        block("We review every submission and aim to respond within 24 hours via your preferred contact method. We reserve the right to decline any inquiry at our discretion.", "t3b2"),
      ],
    },

    /* ── Section 4: Growth Audit purchases ── */
    {
      _key: "t4",
      heading: "Growth Audit purchases",
      body: [
        block("When you purchase a Growth Audit through our website, you are entering a service agreement. Payment is processed by Flutterwave. The terms of the Growth Audit are:", "t4b1"),
        blockWithBold([{ text: "Delivery: ", bold: true }, { text: "Within 2 weeks of receiving your completed intake form." }], "t4b2"),
        blockWithBold([{ text: "Deliverables: ", bold: true }, { text: "A comprehensive audit report (PDF), a Loom video walkthrough, and a live 60-minute walkthrough call." }], "t4b3"),
        block("The audit fee is credited toward any project you start with Growveloper within 60 days of the audit delivery date.", "t4b4"),
      ],
    },

    /* ── Section 5: Payments and refunds ── */
    {
      _key: "t5",
      heading: "Payments and refunds",
      body: [
        block("All payments are processed through Flutterwave. We accept payments in USD, GBP, and NGN.", "t5b1"),
        block("Refund policy: If we have not begun work on your audit (i.e., you have not submitted the intake form and we have not started analysis), you may request a full refund by emailing hello@growveloper.com.", "t5b2"),
        block("Once work has begun, refunds are handled on a case-by-case basis. If we fail to deliver the agreed-upon audit within the stated timeline without communication, you are entitled to a full refund.", "t5b3"),
        block("For project-based work (web development, marketing, automation), payment terms, milestones, and refund conditions are defined in the project contract, not these terms.", "t5b4"),
      ],
    },

    /* ── Section 6: Intellectual property ── */
    {
      _key: "t6",
      heading: "Intellectual property",
      body: [
        block("All content on growveloper.com, including text, design, code, animations, and brand assets, is the intellectual property of Growveloper unless otherwise stated. You may not copy, reproduce, or distribute any content from this website without written permission.", "t6b1"),
        block("For client projects: Intellectual property ownership and licensing terms are defined in individual project contracts. Generally, you own the final deliverables after full payment. We retain the right to showcase work in our portfolio unless agreed otherwise in writing.", "t6b2"),
        block("Open-source components and third-party assets used in client projects retain their original licenses.", "t6b3"),
      ],
    },

    /* ── Section 7: Use of the website ── */
    {
      _key: "t7",
      heading: "Use of the website",
      body: [
        block("You agree not to:", "t7b1"),
        block("Use the website for any unlawful purpose.", "t7b2"),
        block("Attempt to gain unauthorized access to any part of the website, server, or database.", "t7b3"),
        block("Interfere with the proper functioning of the website, including through automated scraping, bots, or denial-of-service attacks.", "t7b4"),
        block("Submit false or misleading information through our forms.", "t7b5"),
        block("Use our website content to train AI models without written permission.", "t7b6"),
        block("We reserve the right to block access to anyone who violates these terms.", "t7b7"),
      ],
    },

    /* ── Section 8: Limitation of liability ── */
    {
      _key: "t8",
      heading: "Limitation of liability",
      body: [
        block('Growveloper provides the website and its content on an "as is" basis. We do not guarantee that the website will be available at all times or free from errors.', "t8b1"),
        block("To the maximum extent permitted by law:", "t8b2"),
        block("Growveloper is not liable for any indirect, incidental, or consequential damages arising from your use of the website or our services.", "t8b3"),
        block("Our total liability for any claim related to our services is limited to the amount you paid us for that specific service.", "t8b4"),
        block("This does not affect any rights you may have under applicable consumer protection laws that cannot be excluded by contract.", "t8b5"),
      ],
    },

    /* ── Section 9: Third-party links ── */
    {
      _key: "t9",
      heading: "Third-party links and services",
      body: [
        block("Our website may contain links to third-party websites and services (such as Flutterwave, Cal.com, Mailchimp, and others). We are not responsible for the content, privacy practices, or terms of any third-party service.", "t9b1"),
        block("When you interact with a third-party service through our website (such as making a payment via Flutterwave), you are also subject to that service's terms and conditions.", "t9b2"),
      ],
    },

    /* ── Section 10: Project contracts ── */
    {
      _key: "t10",
      heading: "Project contracts",
      body: [
        block("For any paid engagement beyond the Growth Audit (including web development, marketing campaigns, and automation projects), a separate project contract will be provided. That contract will define:", "t10b1"),
        block("Scope of work and deliverables.", "t10b2"),
        block("Timeline and milestones.", "t10b3"),
        block("Payment schedule and terms.", "t10b4"),
        block("Intellectual property ownership.", "t10b5"),
        block("Confidentiality obligations.", "t10b6"),
        block("Termination conditions.", "t10b7"),
        block("In the event of a conflict between these Terms of Service and a project contract, the project contract takes precedence.", "t10b8"),
      ],
    },

    /* ── Section 11: Confidentiality ── */
    {
      _key: "t11",
      heading: "Confidentiality",
      body: [
        block("Information you share with us through forms, calls, or project work is treated as confidential. We will not share your business information, strategies, data, or project details with any third party without your written consent.", "t11b1"),
        block("Exceptions: We may disclose information if required by law or if necessary to protect our legal rights.", "t11b2"),
        block("This confidentiality obligation survives the end of any engagement.", "t11b3"),
      ],
    },

    /* ── Section 12: Governing law ── */
    {
      _key: "t12",
      heading: "Governing law",
      body: [
        block("These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these terms or your use of our services will be resolved through good-faith negotiation first.", "t12b1"),
        block("If negotiation fails, disputes will be submitted to binding arbitration in Lagos, Nigeria, under the Arbitration and Mediation Act 2023.", "t12b2"),
        block("If you are a consumer in a jurisdiction where mandatory consumer protection laws apply (such as the EU, UK, Canada, or California), nothing in these terms overrides those protections.", "t12b3"),
      ],
    },

    /* ── Section 13: Changes to these terms ── */
    {
      _key: "t13",
      heading: "Changes to these terms",
      body: [
        block('We may update these terms from time to time. When we do, we will update the "Last updated" date at the top of this page. Continued use of the website after changes are posted constitutes acceptance of the updated terms.', "t13b1"),
        block("For existing clients with active project contracts, changes to these Terms of Service do not retroactively affect the terms of your project contract.", "t13b2"),
      ],
    },

    /* ── Section 14: Contact us ── */
    {
      _key: "t14",
      heading: "Contact us",
      body: [
        block("If you have questions about these terms, contact us:", "t14b1"),
        block("Email: hello@growveloper.com\nWebsite: growveloper.com/start", "t14b2"),
      ],
    },
  ],
};

/* ═══ Run ═══ */
async function seed() {
  const tx = client.transaction();
  tx.createOrReplace(privacyPage);
  tx.createOrReplace(termsPage);

  const result = await tx.commit();
  console.log(`Seeded 2 documents (tx: ${result.transactionId})`);
  console.log("  - privacyPage (Privacy Policy — 12 sections)");
  console.log("  - termsPage (Terms of Service — 14 sections)");
  console.log("\nAll content is now editable in Sanity Studio.");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
