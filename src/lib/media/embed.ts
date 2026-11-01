/* Works out how to show a video link inside an article: a YouTube or TikTok player, a native video file, or a
   plain link when the address is not something we can embed safely. Pure, so it is tested without React. */

export type Embed =
  | { kind: "youtube"; id: string }
  | { kind: "tiktok"; id: string }
  | { kind: "file"; src: string }
  | { kind: "link"; href: string };

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

export function parseEmbed(raw: string): Embed | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  const host = url.hostname.replace(/^(www|m)\./, "");
  const parts = url.pathname.split("/").filter(Boolean);

  if (host === "youtube.com" || host === "youtu.be") {
    const id =
      host === "youtu.be"
        ? parts[0]
        : parts[0] === "shorts" || parts[0] === "embed"
          ? parts[1]
          : url.searchParams.get("v");
    if (id && YOUTUBE_ID.test(id)) return { kind: "youtube", id };
    return { kind: "link", href: raw };
  }

  if (host === "tiktok.com") {
    const at = parts.indexOf("video");
    const id = at >= 0 ? parts[at + 1] : undefined;
    if (id && /^\d+$/.test(id)) return { kind: "tiktok", id };
    return { kind: "link", href: raw };
  }

  if (/\.(mp4|webm|mov)$/i.test(url.pathname)) return { kind: "file", src: raw };

  return { kind: "link", href: raw };
}
