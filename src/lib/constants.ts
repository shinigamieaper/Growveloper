/* ============================================================
   Constants — route paths and static config values
   ============================================================ */

export const ROUTES = {
  home: "/",
  audit: "/audit",
  auditConfirmed: "/audit/confirmed",
  marketing: "/services/marketing",
  development: "/services/development",
  ai: "/services/ai",
  automations: "/automations",
  start: "/start",
  startConfirmed: "/start/confirmed",
  work: "/work",
  lab: "/lab",
  resources: "/resources",
  about: "/about",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const THEME_STORAGE_KEY = "growveloper-theme" as const;
