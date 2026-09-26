import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { generalSans, gambetta, jetbrainsMono } from "./fonts";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { LayoutGridOverlay } from "@/components/layout/LayoutGridOverlay";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { LayoutClients } from "@/components/layout/LayoutClients";
import {
  getNavigation,
  getFooter,
  getAllPopupConfigs,
  getSiteSettings,
  getAboutPage,
  getAllLocalServicePages,
} from "@/lib/sanity/queries";
import { buildSiteGraph } from "@/lib/jsonld";
import { SITE_URL, SITE_NAME, absoluteUrl, snippet } from "@/lib/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import type { NavigationData, FooterData } from "@/lib/types";
import "./globals.css";

/* ─── Placeholder data (Rule 3 — structure first, Sanity wiring later) ─── */
const PLACEHOLDER_NAV: NavigationData = {
  servicesLabel: "Services",
  industriesLabel: "Industries",
  serviceLinks: [
    { label: "Web Development", url: "/services/development" },
    { label: "Growth Marketing", url: "/services/marketing" },
    { label: "AI & Automation", url: "/services/ai" },
    { label: "Growth Audit", url: "/audit", highlighted: true },
  ],
  industryLinks: [
    { label: "SaaS", url: "/industries/saas" },
    { label: "B2B Lead Gen", url: "/industries/b2b" },
    { label: "AI & Tech Startups", url: "/industries/ai-tech" },
    { label: "FinTech", url: "/industries/fintech" },
  ],
  staticLinks: [
    { label: "Work", url: "/work" },
    { label: "The Lab", url: "/lab" },
    { label: "Resources", url: "/resources" },
    { label: "The Brains", url: "/about" },
  ],
  ctaLabel: "Book a Consultation",
  ctaUrl: "/start",
};

const PLACEHOLDER_FOOTER: FooterData = {
  navLinks: [
    { label: "Services", url: "/services/development" },
    { label: "Work", url: "/work" },
    { label: "The Lab", url: "/lab" },
    { label: "Resources", url: "/resources" },
    { label: "The Brains", url: "/about" },
  ],
  socialLinks: [
    { platform: "linkedin", url: "#" },
    { platform: "x", url: "#" },
    { platform: "youtube", url: "#" },
    { platform: "tiktok", url: "#" },
  ],
  legalLinks: [
    { label: "Privacy Policy", url: "/privacy" },
    { label: "Terms of Service", url: "/terms" },
  ],
  ctaLabel: "Book a Consultation",
  ctaUrl: "/start",
  copyrightText: "\u00a9 2025 Growveloper. All rights reserved.",
};

const FALLBACK_TITLE = "GROWVELOPER - Build, Market, and Automate Your Growth";
const FALLBACK_DESCRIPTION =
  "Growveloper is a growth studio that combines web development, performance marketing, and AI automation into one system for small and mid-sized businesses.";

/* Site-wide defaults. Every page overrides title, description and canonical
   through buildPageMetadata; what lives here is the floor a page inherits if
   it sets nothing. metadataBase is the production origin on purpose, so
   share images and canonicals never point at a preview host. */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.seoTitle ?? FALLBACK_TITLE;
  const description = snippet(settings?.seoDescription ?? FALLBACK_DESCRIPTION, 160);
  const image = settings?.ogImage ? absoluteUrl(settings.ogImage) : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    applicationName: SITE_NAME,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title,
      description,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? {
          verification: {
            ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
              ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
              : {}),
            ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
              ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
              : {}),
          },
        }
      : {}),
    icons: {
    icon: [
      {
        url: "/images/logo/logo-icon-light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/logo/logo-icon-dark.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/images/logo/logo-icon-light.png",
  },
  };
}

const THEME_INIT_SCRIPT = `
(function(){
  var t = localStorage.getItem('growveloper-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  /* /about is designed dark only; the visitor's saved choice is left untouched. */
  if (location.pathname === '/about') t = 'dark';
  document.documentElement.setAttribute('data-theme', t);
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [nav, footer, popupConfigs, settings, about, trades] = await Promise.all([
    getNavigation(),
    getFooter(),
    getAllPopupConfigs(),
    getSiteSettings(),
    getAboutPage(),
    getAllLocalServicePages(),
  ]);

  const navData: NavigationData = nav ?? PLACEHOLDER_NAV;
  const footerData: FooterData = footer ?? PLACEHOLDER_FOOTER;
  const tradeLinks = (trades ?? []).map((t) => ({
    label: t.name,
    url: `/industries/local-services/${t.slug}`,
  }));

  /* One entity graph for the whole site: WebSite, Organization, founder.
     Social profiles come from whichever CMS document holds them. */
  const sameAs = [...(settings?.socialLinks ?? []), ...(footerData.socialLinks ?? [])]
    .map((s) => s.url)
    .filter((u): u is string => typeof u === "string" && /^https?:\/\//.test(u));
  const siteGraph = buildSiteGraph({
    description: settings?.seoDescription,
    email: settings?.contactEmail,
    telephone: settings?.whatsappNumber,
    sameAs,
    founderJobTitle: about?.heroIdentity,
    founderImage: about?.portraitImage,
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <JsonLd schema={siteGraph} />
      </head>
      <body
        suppressHydrationWarning
        className={`${generalSans.variable} ${gambetta.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {/* Global navigation - disabled on studio route */}
        <Suspense fallback={null}>
          <Navigation data={navData} suppressOnStudio={true} />
        </Suspense>

        {/* Fixed grid background overlay — subtle texture across entire site */}
        <LayoutGridOverlay />

        {/* Main content area — relative z-10 sits above the fixed grid */}
        <main id="main-content" className="relative z-10" style={{ paddingTop: 'var(--navbar-height)' }}>
          {children}
        </main>

        {/* Global footer */}
        <Footer data={footerData} tradeLinks={tradeLinks} />

        {/* Floating scroll-to-top button */}
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>

        {/* Client-side layout components (popup + analytics) deferred to avoid prerender blocking */}
        <LayoutClients popupConfigs={popupConfigs} />

        {/* Google Consent Mode v2 — defaults to denied BEFORE GTM loads.
            GA4 tag in GTM must be configured to check analytics_storage consent. */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script
            id="consent-defaults"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer=window.dataLayer||[];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent','default',{
                  'analytics_storage':'denied',
                  'ad_storage':'denied',
                  'ad_personalization':'denied',
                  'ad_user_data':'denied',
                  'functionality_storage':'granted',
                  'security_storage':'granted',
                  'wait_for_update':500
                });
              `,
            }}
          />
        )}

        {/* Google Tag Manager — loads after page is interactive.
            NOTE: GA4 tag in GTM must check analytics_storage consent before firing. */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
        )}

        {/* Microsoft Clarity — loaded conditionally by CookieConsent via consent utility.
            Clarity ID is passed to the client so the consent utility can inject the script
            only after the user grants session recording consent. */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script
            id="clarity-id"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.__CLARITY_ID__="${process.env.NEXT_PUBLIC_CLARITY_ID}";`,
            }}
          />
        )}
      </body>
    </html>
  );
}
