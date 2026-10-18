"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export function JoinButton({ token }: { token: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "expired" | "error">(
    token ? "idle" : "expired",
  );

  const join = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ t: token }),
      });
      if (res.ok) {
        setStatus("done");
        localStorage.setItem("growveloper-newsletter-subscribed", "true");
        return;
      }
      const json = await res.json().catch(() => ({}));
      setStatus(json.error === "expired" ? "expired" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return <p className="text-base font-semibold text-brand-mid">You are on the list. The next issue comes to your inbox.</p>;
  }
  if (status === "expired") {
    return (
      <p className="text-sm text-text-secondary">
        This link has expired. You can still join from <a href="/nothing-after-six" className="underline">the newsletter page</a>.
      </p>
    );
  }
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={join}
        disabled={status === "loading"}
        className="min-h-[44px] rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-base-white transition-all hover:bg-brand-mid hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "loading" ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : "Yes, send me Nothing After Six"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-500">That did not work. Try again, or write to hello@growveloper.com.</p>
      )}
    </div>
  );
}
