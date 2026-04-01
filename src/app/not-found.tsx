import Link from "next/link";
import { ArrowRight, Home, CalendarDays, BookOpen } from "lucide-react";
import { getAllBlogPosts } from "@/lib/sanity/queries";
import { LiveFeedCard } from "@/components/shared/LiveFeedCard";
import ASCIIText from "@/components/ASCIIText";

const quickLinks = [
  {
    icon: Home,
    label: "Homepage",
    description: "Back to the start",
    href: "/",
  },
  {
    icon: CalendarDays,
    label: "Book a consultation",
    description: "Free 30-minute strategy call",
    href: "/start",
  },
  {
    icon: BookOpen,
    label: "Resources",
    description: "Free guides and templates",
    href: "/resources",
  },
];

export default async function NotFound() {
  const posts = await getAllBlogPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-6xl px-6">
          {/* ASCII 404 hero */}
          <div className="relative h-56 w-full md:h-72">
            <ASCIIText
              text="404"
              textFontSize={400}
              asciiFontSize={9}
              textColor="#aeeeee"
              planeBaseHeight={9}
              enableWaves
            />
          </div>

          {/* Headline */}
          <div className="mb-12 max-w-2xl">
            <h1 className="heading-font mb-4 text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-5xl">
              This page doesn&apos;t exist.{" "}
              <span className="text-brand-mid">But your growth problem does.</span>
            </h1>
            <p className="text-lg text-text-secondary">
              The URL you followed may be broken or the page may have moved. Here&apos;s where
              you can go instead.
            </p>
          </div>

          {/* Quick links */}
          <div className="mb-20 grid gap-4 sm:grid-cols-3">
            {quickLinks.map(({ icon: Icon, label, description, href }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 rounded-xl border border-glass-border bg-bg-secondary p-5 transition-all hover:border-brand-mid/50"
              >
                <Icon className="h-5 w-5 shrink-0 text-brand-mid" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text-primary">{label}</p>
                  <p className="text-xs text-text-tertiary">{description}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-text-tertiary transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>

          {/* Latest Lab posts */}
          {latestPosts.length > 0 && (
            <div>
              <p className="mb-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                From The Lab
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latestPosts.map((post) => (
                  <LiveFeedCard key={post.slug} data={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
