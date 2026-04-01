import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/", "/start/confirmed"],
      },
    ],
    sitemap: "https://growveloper.com/sitemap.xml",
  };
}
