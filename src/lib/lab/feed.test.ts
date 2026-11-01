import { test } from "node:test";
import assert from "node:assert/strict";
import { pickFeatured, labelFor } from "./feed.ts";

const post = (slug: string, publishedAt: string, extra: Record<string, unknown> = {}) => ({
  title: slug,
  slug,
  publishedAt,
  lane: "editorial" as const,
  ...extra,
});

test("pickFeatured returns the newest editorial post when none is pinned", () => {
  const items = [post("old", "2026-08-27T09:00:00Z"), post("new", "2026-10-18T09:00:00Z")];
  assert.equal(pickFeatured(items)?.slug, "new");
});

test("pickFeatured ignores old featured flags: the newest human piece leads", () => {
  const items = [
    post("pinA", "2026-08-10T09:00:00Z", { featuredToggle: true }),
    post("pinB", "2026-08-27T09:00:00Z", { featuredToggle: true }),
    post("new", "2026-10-18T09:00:00Z"),
  ];
  assert.equal(pickFeatured(items)?.slug, "new");
});

test("pickFeatured never returns an answer article, even if newest or pinned", () => {
  const items = [
    post("answer", "2026-10-30T12:30:00Z", { lane: "programme", featuredToggle: true }),
    post("editorial", "2026-10-18T09:00:00Z"),
  ];
  assert.equal(pickFeatured(items)?.slug, "editorial");
});

test("pickFeatured returns null for an empty list", () => {
  assert.equal(pickFeatured([]), null);
});

test("pickFeatured orders same-day posts by full timestamp", () => {
  const items = [post("morning", "2026-10-18T08:00:00Z"), post("evening", "2026-10-18T19:00:00Z")];
  assert.equal(pickFeatured(items)?.slug, "evening");
});

test("labelFor names each kind of item once", () => {
  assert.equal(labelFor(post("a", "2026-10-18T09:00:00Z")), "Article");
  assert.equal(labelFor(post("b", "2026-10-18T09:00:00Z", { lane: "programme" })), "Answer");
  assert.equal(labelFor(post("c", "2026-10-18T09:00:00Z", { tags: ["nothing after six"] })), "Newsletter");
  assert.equal(
    labelFor({ title: "v", platform: "youtube", videoUrl: "u", thumbnail: "t", publishedAt: "2026-10-18T09:00:00Z" }),
    "YouTube",
  );
  assert.equal(
    labelFor({ title: "v", platform: "tiktok", videoUrl: "u", thumbnail: "t", publishedAt: "2026-10-18T09:00:00Z" }),
    "TikTok",
  );
});
