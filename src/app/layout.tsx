import type { Metadata } from "next";
import { generalSans, gambetta } from "./fonts";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "GROWVELOPER — Technical Growth Engine",
  description:
    "I architect high-performance digital engines where clean code and marketing ROI are inseparable.",
};

const THEME_INIT_SCRIPT = `
(function(){
  var t = localStorage.getItem('growveloper-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', t);
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className={`${generalSans.variable} ${gambetta.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
