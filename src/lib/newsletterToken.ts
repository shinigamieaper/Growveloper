/* ============================================================
   Signed invite tokens for the one-click newsletter join page
   ============================================================ */

import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const TTL_MS = 14 * 24 * 60 * 60 * 1000;

// NEWSLETTER_TOKEN_SECRET if set; otherwise a key derived from the MailerLite key, so only one setting is needed.
function secret(): string {
  const s = process.env.NEWSLETTER_TOKEN_SECRET;
  if (s) return s;
  const base = process.env.MAILERLITE_API_KEY;
  if (!base) throw new Error("No secret for newsletter invite tokens");
  return createHash("sha256").update(`newsletter-invite:${base}`).digest("hex");
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** Token = base64url(json{email, slug, exp}).signature */
export function makeInviteToken(email: string, slug: string): string {
  const payload = Buffer.from(JSON.stringify({ email, slug, exp: Date.now() + TTL_MS })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readInviteToken(token: string): { email: string; slug: string } | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof data.email !== "string" || typeof data.slug !== "string" || Date.now() > data.exp) return null;
    return { email: data.email, slug: data.slug };
  } catch {
    return null;
  }
}
