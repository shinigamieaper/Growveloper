/**
 * Email Juwon when the AI visibility lane publishes Lab posts, so he can
 * review them and pull any back from Sanity Studio.
 *
 * Usage:
 *   node scripts/notify-lab-publish.mjs <slug> [<slug> ...] [--note "free text"]
 *
 * Sends from the same Resend sender the site uses for lead notifications to
 * NOTIFICATION_EMAIL (falls back to hello@growveloper.com). Prints the Resend
 * message id, or exits non-zero if the send failed.
 */

import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local", quiet: true });

const args = process.argv.slice(2);
const noteIdx = args.indexOf("--note");
const note = noteIdx >= 0 ? args[noteIdx + 1] : "";
const slugs = args.filter((a, i) => !a.startsWith("--") && i !== noteIdx + 1);

if (slugs.length === 0) {
  console.error("usage: node scripts/notify-lab-publish.mjs <slug> [<slug> ...] [--note \"text\"]");
  process.exit(1);
}
if (!process.env.RESEND_API_KEY) {
  console.error("RESEND_API_KEY is not set; nothing sent.");
  process.exit(1);
}

const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://growveloper.com").replace(/\/$/, "");
// NOTIFICATION_EMAIL may hold several addresses separated by commas.
const to = (process.env.NOTIFICATION_EMAIL || "hello@growveloper.com")
  .split(",")
  .map((s) => s.trim().replace(/^["']|["']$/g, ""))
  .filter(Boolean);
const today = new Date().toISOString().slice(0, 10);

const lines = slugs.map((s) => `${site}/lab/${s}`);
const text = [
  `The AI visibility lane published ${slugs.length} Lab ${slugs.length === 1 ? "post" : "posts"} on ${today}.`,
  "",
  ...lines,
  "",
  "They sit in the programme lane, below every editorial post, and are not featured.",
  "To pull one back: open Sanity Studio, find the post, Unpublish. The page disappears at once; llms.txt and the sitemap update on the next deploy.",
  note ? `\nRun note: ${note}` : "",
  "",
  "Ledger: C:\\Users\\facom\\content-ops\\ai-visibility\\ledger.md",
]
  .filter((l) => l !== undefined)
  .join("\n");

const resend = new Resend(process.env.RESEND_API_KEY);
const { data, error } = await resend.emails.send({
  from: "Growveloper <hello@growveloper.com>",
  to,
  subject: `Lab: ${slugs.length} new ${slugs.length === 1 ? "article" : "articles"} published (${today})`,
  text,
});

if (error) {
  console.error("send failed:", error.message || error);
  process.exit(1);
}
console.log(`notified ${to.join(", ")}, id ${data?.id}`);
