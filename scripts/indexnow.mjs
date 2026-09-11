/**
 * Tell Bing (and every IndexNow partner, which includes the index that feeds
 * Microsoft Copilot) that URLs on growveloper.com are new or changed.
 *
 * Usage:
 *   node scripts/indexnow.mjs <url-or-path> [<url-or-path> ...]
 *   e.g. node scripts/indexnow.mjs /lab/what-is-growth-engineering /sitemap.xml
 *
 * The key is public by design (IndexNow verifies ownership by fetching
 * https://growveloper.com/<key>.txt, which lives in public/). Google does not
 * take part in IndexNow; it discovers new pages through the sitemap and
 * internal links, or through a manual "Request indexing" in Search Console.
 */

const KEY = "317238e8705b571e4dc17aaf211fcb99";
const HOST = "growveloper.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const inputs = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (inputs.length === 0) {
  console.error("usage: node scripts/indexnow.mjs <url-or-path> [...]");
  process.exit(1);
}

const urlList = inputs.map((u) => (u.startsWith("http") ? u : `https://${HOST}${u.startsWith("/") ? "" : "/"}${u}`));

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

// 200 and 202 both mean accepted. 422 means the key file could not be verified.
const ok = res.status === 200 || res.status === 202;
console.log(`${ok ? "accepted" : "rejected"} (${res.status}) ${urlList.length} url${urlList.length === 1 ? "" : "s"}`);
for (const u of urlList) console.log(`  ${u}`);
if (!ok) {
  const body = await res.text().catch(() => "");
  if (body) console.error(body.slice(0, 300));
  process.exit(1);
}
