import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VideoPageView } from "@/components/lab/VideoPageView";
import { getAllVideos, getVideoBySlug, getAllLabContent } from "@/lib/sanity/queries";
import { buildPageMetadata, snippet } from "@/lib/seo";

/* A page per video at /lab/videos/<slug>. */

export async function generateStaticParams() {
  const videos = (await getAllVideos()).filter((v) => v.slug);
  if (videos.length === 0) return [{ slug: "placeholder" }];
  return videos.map((v) => ({ slug: v.slug as string }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);
  if (!video) return { title: "Video Not Found", robots: { index: false } };
  return buildPageMetadata({
    title: video.title,
    description: snippet(video.description || video.title),
    path: `/lab/videos/${slug}`,
    image: video.thumbnail,
    imageAlt: video.title,
  });
}

export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [video, allContent] = await Promise.all([getVideoBySlug(slug), getAllLabContent()]);
  if (!video) notFound();
  return <VideoPageView video={video} slug={slug} allContent={allContent} />;
}
