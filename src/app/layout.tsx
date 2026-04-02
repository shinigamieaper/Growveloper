import type { Metadata } from "next";
import Script from "next/script";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { generalSans, gambetta, jetbrainsMono } from "./fonts";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { LayoutGridOverlay } from "@/components/layout/LayoutGridOverlay";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { getNavigation, getFooter, getAllPopupConfigs, getSiteSettings } from "@/lib/sanity/queries";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/shared/JsonLd";
import type { NavigationData, FooterData } from "@/lib/types";
import "./globals.css";

// Defer these to client-side only to avoid blocking static prerendering with Cache Components enabled
const PopupController = dynamic(() => import("@/components/layout/PopupController").then((m) => ({ default: m.PopupController })), {
  ssr: false,
});
const ScrollDepthTracker = dynamic(() => import("@/components/layout/ScrollDepthTracker").then((m) => ({ default: m.ScrollDepthTracker })), {
  ssr: false,
});

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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "GROWVELOPER — Technical Growth Engine",
    template: "%s | GROWVELOPER",
  },
  description:
    "I architect high-performance digital engines where clean code and marketing ROI are inseparable.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "GROWVELOPER",
    title: "GROWVELOPER — Technical Growth Engine",
    description:
      "I architect high-performance digital engines where clean code and marketing ROI are inseparable.",
    images: [
      {
        url: "/images/og/og-default.png",
        width: 1200,
        height: 630,
        alt: "GROWVELOPER — Technical Growth Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GROWVELOPER — Technical Growth Engine",
    description:
      "I architect high-performance digital engines where clean code and marketing ROI are inseparable.",
    images: ["/images/og/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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

const THEME_INIT_SCRIPT = `
(function(){
  var t = localStorage.getItem('growveloper-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', t);
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [nav, footer, popupConfigs, settings] = await Promise.all([
    getNavigation(),
    getFooter(),
    getAllPopupConfigs(),
    getSiteSettings(),
  ]);

  const navData: NavigationData = nav ?? PLACEHOLDER_NAV;
  const footerData: FooterData = footer ?? PLACEHOLDER_FOOTER;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <JsonLd schema={[buildWebSiteSchema(), buildOrganizationSchema(settings?.seoDescription)]} />
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
        <main id="main-content" className="relative z-10">
          {children}
        </main>

        {/* Global footer */}
        <Footer data={footerData} />

        {/* Floating scroll-to-top button */}
        <ScrollToTop />

        {/* Popup system — single controller reads all enabled configs, matches by pathname */}
        <PopupController configs={popupConfigs} />

        {/* Scroll depth tracker — fires GTM events at 25/50/75/100% */}
        <ScrollDepthTracker />

        {/* Google Tag Manager — loads after page is interactive */}
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

        {/* Microsoft Clarity — loads after page is interactive */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script
            id="clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
