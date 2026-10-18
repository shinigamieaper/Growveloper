/* ============================================================
   MailerLite — add or update a subscriber
   ============================================================ */

const API = "https://connect.mailerlite.com/api/subscribers";

export function mailerliteConfigured(): boolean {
  return Boolean(process.env.MAILERLITE_API_KEY);
}

/**
 * Create the subscriber, or update them if the address already exists (MailerLite answers 201 new, 200 existing).
 * `groups` are MailerLite group ids; empty ids are dropped so an unset env var never breaks a sign-up.
 * MailerLite does not re-subscribe someone who unsubscribed; that is left as it is on purpose.
 */
export async function upsertSubscriber(opts: {
  email: string;
  groups?: (string | undefined)[];
  fields?: Record<string, string>;
}): Promise<{ ok: boolean; status: number; existed: boolean; message?: string }> {
  const groups = (opts.groups ?? []).filter((g): g is string => Boolean(g));
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: opts.email,
      ...(groups.length ? { groups } : {}),
      ...(opts.fields ? { fields: opts.fields } : {}),
    }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return { ok: false, status: res.status, existed: false, message: data.message };
  }
  return { ok: true, status: res.status, existed: res.status === 200 };
}
