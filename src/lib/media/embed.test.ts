import { test } from "node:test";
import assert from "node:assert/strict";
import { parseEmbed } from "./embed.ts";

test("YouTube links in every common form give the video id", () => {
  for (const url of [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://youtube.com/watch?v=dQw4w9WgXcQ&t=42s",
    "https://youtu.be/dQw4w9WgXcQ",
    "https://www.youtube.com/shorts/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://m.youtube.com/watch?v=dQw4w9WgXcQ",
  ]) {
    assert.deepEqual(parseEmbed(url), { kind: "youtube", id: "dQw4w9WgXcQ" }, url);
  }
});

test("TikTok video links give the numeric id; profile links fall back to a link", () => {
  assert.deepEqual(parseEmbed("https://www.tiktok.com/@growveloper/video/7301234567890123456"), {
    kind: "tiktok",
    id: "7301234567890123456",
  });
  assert.deepEqual(parseEmbed("https://www.tiktok.com/@growveloper"), {
    kind: "link",
    href: "https://www.tiktok.com/@growveloper",
  });
});

test("video files play natively", () => {
  assert.deepEqual(parseEmbed("https://cdn.sanity.io/files/rd7o1ewg/production/abc.mp4"), {
    kind: "file",
    src: "https://cdn.sanity.io/files/rd7o1ewg/production/abc.mp4",
  });
  assert.equal(parseEmbed("https://example.com/clip.webm?v=2").kind, "file");
});

test("anything else, or nothing usable, is a plain link or null", () => {
  assert.deepEqual(parseEmbed("https://vimeo.com/12345"), { kind: "link", href: "https://vimeo.com/12345" });
  assert.equal(parseEmbed("not a url"), null);
  assert.equal(parseEmbed(""), null);
  assert.deepEqual(parseEmbed("https://www.youtube.com/watch?v="), {
    kind: "link",
    href: "https://www.youtube.com/watch?v=",
  });
});
