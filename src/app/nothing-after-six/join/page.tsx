import type { Metadata } from "next";
import { Suspense } from "react";
import { JoinButton } from "./JoinButton";

/* One-click join from the invite link in a resource delivery email.
   Opening this page changes nothing; only the button joins (mail scanners open links). */

export const metadata: Metadata = {
  title: "Join Nothing After Six",
  robots: { index: false, follow: false },
};

type JoinSearchParams = Promise<{ t?: string }>;

// The token is request data, so it is read inside Suspense (cacheComponents).
async function Join({ searchParams }: { searchParams: JoinSearchParams }) {
  const { t } = await searchParams;
  return <JoinButton token={t ?? ""} />;
}

export default function JoinPage({ searchParams }: { searchParams: JoinSearchParams }) {
  return (
    <section className="pt-32 pb-24 md:pt-40">
      <div className="mx-auto max-w-xl px-6 text-center">
        <span className="mb-4 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-mid">
          The newsletter
        </span>
        <h1 className="heading-font mb-4 text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-4xl">
          Nothing After Six
        </h1>
        <p className="mb-8 text-base leading-relaxed text-text-secondary">
          One fix a week for people who run their own business. Press the button to join. You can leave at any time.
        </p>
        <Suspense fallback={null}>
          <Join searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
