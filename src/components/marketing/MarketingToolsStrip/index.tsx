"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import LogoLoop from "@/components/ui/logo-loop";

export interface MarketingToolItem {
  name: string;
}

interface MarketingToolsStripProps extends React.ComponentPropsWithoutRef<"section"> {
  headline?: string;
  highlightedWord?: string;
  items: MarketingToolItem[];
}

/* ─── Inline SVG logos (monochrome) ─── */

function GoogleAdsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden fill="currentColor">
      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 01-5.279-5.28 5.27 5.27 0 015.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 00-8.934 8.934 8.907 8.907 0 008.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
    </svg>
  );
}

function MetaIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden fill="currentColor">
      <path d="M16.5 8.5c-1.3 0-2.4.7-3.2 1.8L12 12l-1.3-1.7C9.9 9.2 8.8 8.5 7.5 8.5 5 8.5 3 10.7 3 13.5s2 5 4.5 5c1.3 0 2.4-.7 3.2-1.8L12 15l1.3 1.7c.8 1.1 1.9 1.8 3.2 1.8 2.5 0 4.5-2.2 4.5-5s-2-5-4.5-5zm-9 8c-1.4 0-2.5-1.3-2.5-3s1.1-3 2.5-3c.8 0 1.5.5 2 1.3l1 1.7-1 1.7c-.5.8-1.2 1.3-2 1.3zm9 0c-.8 0-1.5-.5-2-1.3l-1-1.7 1-1.7c.5-.8 1.2-1.3 2-1.3 1.4 0 2.5 1.3 2.5 3s-1.1 3-2.5 3z" />
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

function GTMIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden fill="currentColor">
      <path d="M12 0L1.605 6v12L12 24l10.395-6V6zm-1.44 16.348l-3.838-3.838 1.16-1.16 2.678 2.678 5.756-5.756 1.16 1.16z" />
    </svg>
  );
}

function HubSpotIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden fill="currentColor">
      <path d="M22.162 6.254a3.373 3.373 0 00-1.534-2.855 3.37 3.37 0 00-3.264-.177V2.1a1.1 1.1 0 00-2.2 0v2.72a3.384 3.384 0 00-1.386 5.503l-4.478 4.957A3.367 3.367 0 007.4 15a3.384 3.384 0 000 6.768A3.384 3.384 0 0010.784 18a3.369 3.369 0 00-.902-2.299l4.48-4.958a3.38 3.38 0 003.503-.226l1.928 1.928a1.1 1.1 0 001.556-1.556l-1.93-1.929a3.374 3.374 0 00.743-2.706zM7.4 19.7a1.184 1.184 0 110-2.368A1.184 1.184 0 017.4 19.7zm10.264-11.085a1.184 1.184 0 110-2.368 1.184 1.184 0 010 2.368z" />
    </svg>
  );
}

function SemrushIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden fill="currentColor">
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16A8 8 0 0112 20zm1-5.5c0 .83-.67 1.5-1.5 1.5h-2a.5.5 0 010-1h2a.5.5 0 000-1h-1a1.5 1.5 0 010-3h2a.5.5 0 010 1h-2a.5.5 0 000 1h1c.83 0 1.5.67 1.5 1.5z" />
    </svg>
  );
}

function AhrefsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      <path d="M10.5 8H9v1.5H7.5v1H9V12h1.5v-1.5H12v-1h-1.5z" />
    </svg>
  );
}

function ShopifyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden fill="currentColor">
      <path d="M15.337 23.979l6.21-1.347s-2.233-15.07-2.249-15.168c-.017-.099-.099-.165-.181-.165-.083 0-1.654-.033-1.654-.033s-1.099-1.082-1.232-1.198v18.911zM13.786 5.028s-.776-.231-1.719-.231c-2.752 0-4.075 1.719-4.075 3.356 0 1.852 1.164 2.728 2.27 3.505 1.082.759 1.456 1.321 1.456 2.08 0 1.016-.809 1.479-1.726 1.479-1.19 0-1.818-.744-1.818-.744l-.463 2.08s.694.429 1.884.429c2.62 0 4.289-1.736 4.289-3.686 0-1.983-1.24-2.943-2.258-3.654-1.017-.71-1.479-1.214-1.479-2.014 0-.661.479-1.19 1.38-1.19.876 0 1.479.24 1.479.24l.48-2.15zM11.67 2.794A2.099 2.099 0 009.902 4.18l2.876.595c-.215-.843-.826-1.915-1.108-1.981zM8.208 23.98l-5.447-1.347.727-4.091 5.959-.727-.396 5.876-.843.289z" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.ComponentType> = {
  "Google Ads": GoogleAdsIcon,
  "Meta Ads": MetaIcon,
  "GA4": GA4Icon,
  "GTM": GTMIcon,
  "HubSpot": HubSpotIcon,
  "Semrush": SemrushIcon,
  "Ahrefs": AhrefsIcon,
  "Shopify": ShopifyIcon,
};

export function MarketingToolsStrip({
  headline,
  highlightedWord,
  items,
  className,
  ...props
}: MarketingToolsStripProps) {
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
        ariaLabel="Marketing platforms and tools"
      />
    </section>
  );
}
