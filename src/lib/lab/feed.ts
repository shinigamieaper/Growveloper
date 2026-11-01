/* Lab feed decisions, kept pure so they can be tested without React or Sanity.
   - pickFeatured: the item the Lab banner leads with.
   - labelFor: the one label a card shows (said once, in the meta row). */

type FeedItem = {
  publishedAt: string;
  featuredToggle?: boolean;
  lane?: "editorial" | "programme";
  tags?: string[];
  platform?: "blog" | "youtube" | "tiktok";
};

export type LabLabel = "Article" | "Answer" | "Newsletter" | "YouTube" | "TikTok";

const NEWSLETTER_TAG = "nothing after six";

const time = (item: FeedItem) => new Date(item.publishedAt).getTime() || 0;

/** Answer articles are written for AI search, so they are never featured. A pinned item wins (newest pin if
 * several); otherwise the newest human piece leads. */
export function pickFeatured<T extends FeedItem>(items: T[]): T | null {
  const candidates = items.filter((item) => item.lane !== "programme");
  if (candidates.length === 0) return null;
  const pinned = candidates.filter((item) => item.featuredToggle);
  const pool = pinned.length > 0 ? pinned : candidates;
  return pool.reduce((best, item) => (time(item) > time(best) ? item : best));
}

export function labelFor(item: FeedItem): LabLabel {
  if (item.platform === "youtube") return "YouTube";
  if (item.platform === "tiktok") return "TikTok";
  if (item.lane === "programme") return "Answer";
  if (item.tags?.some((tag) => tag.toLowerCase() === NEWSLETTER_TAG)) return "Newsletter";
  return "Article";
}
