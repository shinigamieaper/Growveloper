import { NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";
import { upsertSubscriber, mailerliteConfigured } from "@/lib/mailerlite";
import { makeInviteToken } from "@/lib/newsletterToken";

/* A free resource request. The site only records the person in MailerLite; MailerLite's automation
   ("joins group Resource downloads") sends the designed delivery email with the download buttons.
   The newsletter group is joined only on a ticked box. Everyone else gets a one-click invite link,
   stored in their invite_url field so the delivery email can show it. */

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://growveloper.com";
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;
// Per-instance limit (5 an hour per address and per IP) so the route cannot be used to mail strangers.
const hits = new Map<string, number[]>();

function limited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > LIMIT;
}

export async function POST(request: Request) {
  try {
    const { email, slug, newsletterOptIn, trap } = await request.json();

    // Spam trap: a filled hidden field gets a quiet success and nothing else.
    if (trap) return NextResponse.json({ ok: true, optedIn: false });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || !emailRegex.test(email) || typeof slug !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (limited(`e:${email.toLowerCase()}`) || limited(`i:${ip}`)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const resource = await client.fetch<{ slug: string } | null>(
      `*[_type == "resource" && slug.current == $slug && accessType == "free"][0]{ "slug": slug.current }`,
      { slug }
    );
    if (!resource) {
      console.error("[ResourceRequest] No free resource for slug:", slug);
      return NextResponse.json({ error: "Resource not available" }, { status: 404 });
    }

    if (!mailerliteConfigured()) {
      console.error("[ResourceRequest] MailerLite not configured");
      return NextResponse.json({ error: "Email not configured" }, { status: 503 });
    }

    const optedIn = newsletterOptIn === true;
    const r = await upsertSubscriber({
      email,
      groups: [
        process.env.MAILERLITE_GROUP_RESOURCES,
        optedIn ? process.env.MAILERLITE_GROUP_NEWSLETTER : undefined,
      ],
      fields: {
        last_resource: slug,
        consent: optedIn ? "box-ticked-v1" : "resource-only-v1",
        // Already joined: the email's newsletter line just opens the newsletter page.
        invite_url: optedIn
          ? `${SITE}/nothing-after-six`
          : `${SITE}/nothing-after-six/join?t=${encodeURIComponent(makeInviteToken(email, slug))}`,
      },
    });
    if (!r.ok) {
      console.error("[ResourceRequest] MailerLite error:", r.status, r.message);
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, optedIn });
  } catch (err) {
    console.error("[ResourceRequest] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
