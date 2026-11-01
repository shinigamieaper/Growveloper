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

/** The newest human piece leads. Answer articles are written for AI search, so they are never featured.
 * A pin (`featuredToggle`) counts only when exactly one piece carries it: five old posts still carry the
 * flag from before, and honouring all of them kept an August post on the banner. Exact-time ties go to
 * the slug that sorts first, so the result never depends on the order the CMS returns. */
export function pickFeatured<T extends FeedItem & { slug?: string }>(items: T[]): T | null {
  const candidates = items.filter((item) => item.lane !== "programme");
  if (candidates.length === 0) return null;
  const pinned = candidates.filter((item) => item.featuredToggle);
  if (pinned.length === 1) return pinned[0];
  return candidates.reduce((best, item) => {
    const diff = time(item) - time(best);
    if (diff !== 0) return diff > 0 ? item : best;
    return (item.slug ?? "").localeCompare(best.slug ?? "") < 0 ? item : best;
  });
}

export function labelFor(item: FeedItem): LabLabel {
  if (item.platform === "youtube") return "YouTube";
  if (item.platform === "tiktok") return "TikTok";
  if (item.lane === "programme") return "Answer";
  if (item.tags?.some((tag) => tag.toLowerCase() === NEWSLETTER_TAG)) return "Newsletter";
  return "Article";
}
