"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import LogoLoop from "@/components/ui/logo-loop";

export interface TechStackItem {
  name: string;
}

interface TechStackStripProps extends React.ComponentPropsWithoutRef<"section"> {
  headline?: string;
  highlightedWord?: string;
  items: TechStackItem[];
}

/* ─── Inline SVG logos (monochrome) ─── */

function NextjsIcon() {
  return (
    <svg viewBox="0 0 180 180" className="h-10 w-10" aria-hidden fill="currentColor">
      <mask id="mask0_408_134" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="white" />
      </mask>
      <g mask="url(#mask0_408_134)">
        <circle cx="90" cy="90" r="90" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1383V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
        <rect x="115" y="54" width="12" height="72" fill="white" />
      </g>
    </svg>
  );
}

function VercelIcon() {
  return (
    <svg viewBox="0 0 116 100" className="h-9 w-9" aria-hidden fill="currentColor">
      <path d="M57.5 0L115 100H0L57.5 0Z" />
    </svg>
  );
}

function TypeScriptIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden fill="currentColor">
      <path d="M0 12v12h24V0H0zm19.341-.956c.61.152 1.074.423 1.501.865.221.236.549.666.575.77.008.03-1.036.73-1.668 1.123-.023.015-.115-.084-.217-.236-.31-.45-.633-.644-1.128-.678-.727-.05-1.196.331-1.192.967a.88.88 0 00.102.45c.16.331.458.53 1.39.933 1.719.74 2.454 1.227 2.911 1.92.51.773.625 2.008.278 2.926-.38.998-1.325 1.676-2.655 1.9-.411.073-1.386.062-1.828-.018-.964-.172-1.878-.648-2.442-1.273-.221-.243-.652-.88-.625-.925.011-.016.11-.077.22-.141.108-.061.511-.294.892-.515l.69-.4.145.214c.202.308.643.731.91.872.766.404 1.817.347 2.335-.118a.883.883 0 00.313-.72c0-.278-.035-.4-.18-.61-.186-.266-.567-.49-1.649-.96-1.238-.533-1.771-.864-2.259-1.39a3.165 3.165 0 01-.659-1.2c-.091-.339-.114-1.189-.042-1.531.255-1.197 1.158-2.03 2.461-2.278.423-.08 1.406-.05 1.821.053zm-5.634 1.002l.008.983H10.59v8.876H8.38v-8.876H5.258v-.964c0-.534.011-.98.026-.99.012-.016 1.913-.024 4.217-.02l4.195.009z" />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  );
}

function SanityIcon() {
  return (
    <svg viewBox="0 0 256 291" className="h-10 w-10" aria-hidden fill="currentColor">
      <path d="M67.092 89.002c0 23.484 14.071 38.752 42.214 46.028l57.281 15.246c25.357 6.87 41.607 22.811 41.607 48.168 0 5.058-.674 9.712-1.887 14.031C197.83 235.01 173.277 249 141.46 249c-33.699 0-59.998-16.584-68.73-44.393l-1.279 1.818H54l5.8-68.15c17.086 29.083 44.192 43.885 73.274 43.885 24.009 0 40.666-11.262 40.666-27.709 0-14.709-9.678-24.421-36.649-31.425l-54.99-14.439c-26.162-7.007-43.11-23.35-43.11-50.384v-.003c0-3.77.354-7.389 1.013-10.845C48.01 22.53 74.16 7 106.542 7c28.675 0 53.94 12.476 63.68 38.12l.918-1.538H187.7L182.067 109c-15.813-29.9-42.107-44.875-70.243-44.875-26.56 0-44.732 10.44-44.732 24.877z" />
    </svg>
  );
}

function GTMIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden fill="currentColor">
      <path d="M12 0L1.605 6v12L12 24l10.395-6V6zm-1.44 16.348l-3.838-3.838 1.16-1.16 2.678 2.678 5.756-5.756 1.16 1.16z" />
    </svg>
  );
}

function GA4Icon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden fill="currentColor">
      <path d="M12.001 0C5.373 0 0 5.372 0 12c0 6.628 5.372 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zM4.296 15.108a.96.96 0 01-.96-.96V9.852a.96.96 0 011.92 0v4.296a.96.96 0 01-.96.96zm4.296 2.148a.96.96 0 01-.96-.96V7.704a.96.96 0 011.92 0v8.592a.96.96 0 01-.96.96zm4.296-4.296a.96.96 0 01-.96-.96v-4.296a.96.96 0 011.92 0V12a.96.96 0 01-.96.96zm4.296 2.148a.96.96 0 01-.96-.96V9.852a.96.96 0 011.92 0v4.296a.96.96 0 01-.96.96z" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.ComponentType> = {
  "Next.js": NextjsIcon,
  "Vercel": VercelIcon,
  "TypeScript": TypeScriptIcon,
  "Tailwind CSS": TailwindIcon,
  "Sanity": SanityIcon,
  "GTM": GTMIcon,
  "GA4": GA4Icon,
};

export function TechStackStrip({
  headline,
  highlightedWord,
  items,
  className,
  ...props
}: TechStackStripProps) {
  if (!items.length) return null;

  const logoItems = items.map((item) => {
    const Icon = ICON_MAP[item.name];
    return {
      node: (
        <div className="flex cursor-default items-center gap-2.5">
          {Icon && (
            <span className="text-brand-mid">
              <Icon />
            </span>
          )}
          <span className="font-mono text-sm font-medium text-text-primary">
            {item.name}
          </span>
        </div>
      ),
      ariaLabel: item.name,
    };
  });

  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      {headline && (
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeader
            headline={headline}
            highlightedWord={highlightedWord}
          />
        </div>
      )}
      <LogoLoop
        logos={logoItems}
        speed={60}
        direction="left"
        pauseOnHover
        logoHeight={56}
        gap={48}
        ariaLabel="Tech stack"
      />
    </section>
  );
}
