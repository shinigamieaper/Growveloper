import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { NewsletterInline } from "@/components";
import { VideoPlayer } from "@/components/shared/VideoPlayer";
import { RelatedContentGrid } from "@/components/shared/RelatedContentGrid";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildBreadcrumbSchema, buildVideoSchema } from "@/lib/jsonld";
import { parseEmbed } from "@/lib/media/embed";
import type { LabContentCard, VideoPageData } from "@/lib/types";

/* The video page layout: the player, what it covers, the links mentioned in it, and more from the Lab.
   Kept apart from the route so it can be checked with a sample video. */

const PLATFORM_LABEL = { youtube: "YouTube", tiktok: "TikTok" } as const;

export function VideoPageView({ video, slug, allContent }: { video: VideoPageData; slug: string; allContent: LabContentCard[] }) {
  const embed = parseEmbed(video.videoUrl);
  const embedUrl =
    embed?.kind === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${embed.id}`
      : embed?.kind === "tiktok"
        ? `https://www.tiktok.com/embed/v2/${embed.id}`
        : undefined;

  /* More from the Lab: the newest human pieces (answer articles are written for AI search). */
  const related = allContent
    .filter((item) => !("lane" in item && item.lane === "programme") && item.title !== video.title)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        schema={[
          buildVideoSchema({
            name: video.title,
            description: video.description,
            path: `/lab/videos/${slug}`,
            thumbnailUrl: video.thumbnail,
            uploadDate: video.publishedAt,
            duration: video.duration,
            embedUrl,
          }),
          buildBreadcrumbSchema([{ name: "The Lab", path: "/lab" }, { name: video.title }]),
        ]}
      />

      <article className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link href="/lab" className="text-sm text-text-secondary transition-colors hover:text-brand-mid">
            ← The Lab
          </Link>

          <h1 className="heading-font mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            {video.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
            <span className="font-semibold text-brand-mid">{PLATFORM_LABEL[video.platform]}</span>
            {video.publishedAt && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden />
                <time dateTime={video.publishedAt}>
                  {new Date(video.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </span>
            )}
            {video.duration && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden />
                {video.duration}
              </span>
            )}
          </div>

          <VideoPlayer url={video.videoUrl} caption={undefined} />

          {video.description && (
            <p className="whitespace-pre-line text-base leading-relaxed text-text-secondary md:text-lg">
              {video.description}
            </p>
          )}

          {video.links && video.links.length > 0 && (
            <section className="mt-8">
              <h2 className="heading-font text-lg font-bold text-text-primary">Links from the video</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {video.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-brand-mid underline-offset-4 hover:underline"
                    >
                      {link.label}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-brand-mid"
          >
            Watch on {PLATFORM_LABEL[video.platform]}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>

          <NewsletterInline source="article" className="mt-10" />
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-6">
            <RelatedContentGrid items={related} contentType="lab" label="More from The Lab" />
          </div>
        </section>
      )}
    </>
  );
}
