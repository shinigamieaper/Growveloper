 "use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = document.documentElement.getAttribute("data-theme");
    setIsDark(theme === "dark");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary px-6">
      <div className="flex flex-col items-center gap-8">
        {/* Lottie animation */}
        <div className="w-48 md:w-64">
          <DotLottieReact
            src="/lottie/loading.lottie"
            loop
            autoplay
          />
        </div>
        
        {/* Wordmark logo */}
        <div className="relative h-8 w-48 md:h-10 md:w-60">
          <Image
            src={isDark ? "/images/logo/logo-wordmark-dark.png" : "/images/logo/logo-wordmark-light.png"}
            alt="GROWVELOPER"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
