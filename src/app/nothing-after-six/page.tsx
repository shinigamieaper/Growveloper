import type { Metadata } from "next";
import { NewsletterCapture, ScrollFadeUp } from "@/components";
import { getSiteSettings } from "@/lib/sanity/queries";

/* Nothing After Six — the newsletter home and the archive.
   Issue one lives on this page rather than being emailed, because the list is
   empty and sending to nobody is theatre. The launch post links here, people
   read it, and issue two becomes the first real send.
   When issue two ships, move issues to nothing-after-six/[issue] and leave
   this page as the index. */

export const metadata: Metadata = {
  title: "Nothing After Six — one thing you can build this week",
  description:
    "A newsletter for the owner doing everything. Every other week, one thing you can build, specific enough to finish in a sitting, with no tool you do not already own.",
};

const H2 = "heading-font mt-12 mb-4 text-2xl font-bold text-text-primary md:text-3xl";
const P = "mb-5 text-base leading-relaxed text-text-primary";
const SERIF = { fontFamily: "var(--font-gambetta)" } as const;

export default async function NothingAfterSixPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Periodical",
            name: "Nothing After Six",
            description: "One thing you can build this week.",
            publisher: {
              "@type": "Organization",
              name: "GROWVELOPER",
              url: "https://growveloper.com",
            },
            url: "https://growveloper.com/nothing-after-six",
          }),
        }}
      />

      {/* 01 — What it is */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollFadeUp>
            <span className="mb-4 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-mid">
              The newsletter
            </span>
            <h1 className="heading-font mb-6 text-4xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl lg:text-6xl">
              Nothing After Six
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-text-primary" style={SERIF}>
              Every other week, one thing you can build. Not five tips. Not a
              roundup of links. One thing, specific enough to finish in a
              sitting, with no tool you do not already own.
            </p>

            <ul className="mb-2 space-y-3 text-base text-text-primary">
              <li className="flex gap-3">
                <span className="font-mono text-brand-mid">01</span>
                <span>
                  Written for the owner doing everything. You run the business,
                  you also run the marketing, you also fix the website.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-brand-mid">02</span>
                <span>
                  Every issue is one build, not a digest. If you cannot act on
                  it alone, it does not go in.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-brand-mid">03</span>
                <span>
                  Every other week, on purpose. Promising weekly while running a
                  business is how newsletters die at issue four.
                </span>
              </li>
            </ul>
          </ScrollFadeUp>
        </div>
      </section>

      {/* 02 — Signup, before the issue, so it is available without scrolling */}
      <NewsletterCapture
        headline="Get the next one."
        highlightedWord="next"
        subCopy="One thing you can build, every other week. Unsubscribe whenever, no hard feelings."
        ctaLabel="Send it to me"
        successHeadline={settings?.newsletterSuccessHeadline}
        successSubCopy={settings?.newsletterSuccessSubCopy}
        emailPlaceholder={settings?.newsletterEmailPlaceholder}
      />

      {/* 03 — Issue one, readable in full before anyone commits */}
      <article className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollFadeUp>
            <div className="mb-10 border-b border-glass-border pb-6">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-mid">
                Issue 01
              </span>
              <h2 className="heading-font mt-3 text-3xl font-bold text-text-primary md:text-4xl">
                The front door test
              </h2>
            </div>

            <p className={P} style={SERIF}>
              This week: your homepage. Three questions, three changes, and a
              way to check you actually fixed it.
            </p>

            <h3 className={H2}>Why the homepage, when it is the page you look at least</h3>
            <p className={P} style={SERIF}>
              Because it is the page a stranger looks at first, and you stopped
              seeing it about two years ago.
            </p>
            <p className={P} style={SERIF}>
              You know what your business does, so you cannot read your own front
              door the way somebody arriving cold reads it. That is not
              carelessness. It is the curse of knowing your own thing too well.
              Every owner has it, including me.
            </p>
            <p className={P} style={SERIF}>
              So instead of trying to see it fresh, run a test that does not
              depend on you being objective.
            </p>

            <h3 className={H2}>The test, three questions, in this order</h3>
            <p className={P} style={SERIF}>
              Open your homepage on your phone. Not your laptop, your phone,
              because that is where most people meet you. Do not scroll. Just
              look at what is on screen before you touch anything.
            </p>

            <p className="mb-3 mt-8 text-lg font-semibold text-text-primary">
              One. Does it say what you actually do, in the words a stranger
              would use?
            </p>
            <p className={P} style={SERIF}>
              Not your tagline. Not your mission. What you do, for whom. If a
              person who has never heard of you cannot answer &ldquo;what is
              this&rdquo; out loud within about five seconds, the front door is
              shut. The trap is language: you use the words your industry uses,
              your buyer uses the words their problem uses, and yours lose.
            </p>

            <p className="mb-3 mt-8 text-lg font-semibold text-text-primary">
              Two. Do your different buyers get different doors?
            </p>
            <p className={P} style={SERIF}>
              Most small businesses serve two kinds of customer who want
              completely different things. A trainer sells to individuals and to
              companies. A clinic sells to patients and to referrers. If both
              land on the same page and get the same next step, one of them is
              being served badly, and usually it is the more valuable one.
            </p>

            <p className="mb-3 mt-8 text-lg font-semibold text-text-primary">
              Three. Does the first click go to the thing they can buy?
            </p>
            <p className={P} style={SERIF}>
              Or does it go to another page that explains more, which leads to
              another page that explains more. Every page between arriving and
              buying is a place to leave. Count the clicks from your homepage to
              the point where money changes hands. More than two is your number
              to beat.
            </p>

            <h3 className={H2}>What to actually build this week</h3>
            <p className={P} style={SERIF}>
              Not a redesign. Three changes to one page.
            </p>
            <ol className="mb-5 ml-5 list-decimal space-y-3 text-base text-text-primary" style={SERIF}>
              <li>
                Replace whatever is at the top with a plain sentence that says
                what you do and who it is for. Boring is better than clever
                here, because clever needs decoding and nobody decodes on a
                phone.
              </li>
              <li>
                Put two buttons under it, one for each kind of buyer, in their
                language rather than your internal names for them. Not
                &ldquo;Services&rdquo; and &ldquo;About.&rdquo; Closer to
                &ldquo;I want to learn this myself&rdquo; and &ldquo;I want you
                to do it for my team.&rdquo;
              </li>
              <li>
                Point each button at the page where that person can actually
                act. Not a category page. The page with the thing on it.
              </li>
            </ol>
            <p className={P} style={SERIF}>
              A couple of hours in whatever your site is built on, and you do
              not need a developer for any of it.
            </p>

            <h3 className={H2}>How to check you actually fixed it</h3>
            <p className={P} style={SERIF}>
              Send the link to one person who does not know what you do. A
              friend outside your industry, a relative, anyone. Ask them one
              question: what does this business do, and what would you click?
            </p>
            <p className={P} style={SERIF}>
              If they answer both without hesitating, you are done. If they
              pause on either, their pause tells you exactly which of the three
              questions you have not answered yet. It costs one message and it
              is more honest than any tool.
            </p>

            <h3 className={H2}>One number, before you go</h3>
            <p className={P} style={SERIF}>
              Across 2,241 companies audited for how fast they reply to an
              enquiry, the average first response took 42 hours. Nearly a
              quarter never replied at all.
            </p>
            <p className={P} style={SERIF}>
              Fixing your front door means more people knock. Which is only
              useful if somebody answers. That is issue two.
            </p>

            <div className="mt-12 border-t border-glass-border pt-6">
              <p className="text-sm text-text-tertiary">
                Written by{" "}
                <span className="font-semibold text-text-primary">
                  Oyekola Obajuwon
                </span>
                , who builds websites, runs campaigns and automates the boring
                parts for small businesses.
              </p>
              <p className="mt-2 text-sm text-text-tertiary">
                Source for the 42 hours: Harvard Business Review, 2011, Oldroyd,
                McElheran and Elkington, 1.25 million leads across 42 companies.
              </p>
            </div>
          </ScrollFadeUp>
        </div>
      </article>
    </>
  );
}
