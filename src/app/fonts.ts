import localFont from "next/font/local";

export const generalSans = localFont({
  src: [
    { path: "../../public/GeneralSans_Complete/Fonts/WEB/fonts/GeneralSans-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/GeneralSans_Complete/Fonts/WEB/fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/GeneralSans_Complete/Fonts/WEB/fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/GeneralSans_Complete/Fonts/WEB/fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../../public/GeneralSans_Complete/Fonts/WEB/fonts/GeneralSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export const gambetta = localFont({
  src: [
    { path: "../../public/Gambetta_Complete/Fonts/WEB/fonts/Gambetta-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/Gambetta_Complete/Fonts/WEB/fonts/Gambetta-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/Gambetta_Complete/Fonts/WEB/fonts/Gambetta-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/Gambetta_Complete/Fonts/WEB/fonts/Gambetta-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../../public/Gambetta_Complete/Fonts/WEB/fonts/Gambetta-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-gambetta",
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: [
    { path: "../../public/fonts/JetBrainsMono/JetBrainsMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/JetBrainsMono/JetBrainsMono-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
