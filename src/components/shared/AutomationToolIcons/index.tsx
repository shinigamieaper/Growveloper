import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

/* ─── Shared inline SVG tool icons ─── */

interface IconProps {
  className?: string;
}

export function MakeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden fill="currentColor">
      <rect x="1.5" y="9.5" width="5" height="5" rx="1" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <rect x="17.5" y="9.5" width="5" height="5" rx="1" />
      <rect x="6.5" y="11.5" width="3" height="1" />
      <rect x="14.5" y="11.5" width="3" height="1" />
    </svg>
  );
}

export function N8nIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden fill="currentColor">
      <circle cx="12" cy="12" r="3" />
      <circle cx="4" cy="12" r="2.5" />
      <circle cx="20" cy="12" r="2.5" />
      <circle cx="12" cy="4" r="2.5" />
      <rect x="6.5" y="11.25" width="2.5" height="1.5" />
      <rect x="15" y="11.25" width="2.5" height="1.5" />
      <rect x="11.25" y="6.5" width="1.5" height="2.5" />
    </svg>
  );
}

export function VoiceflowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 13a1 1 0 110-2 1 1 0 010 2zm5 0a1 1 0 110-2 1 1 0 010 2zm5 0a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  );
}

export function OpenAIIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden fill="currentColor">
      <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.981 4.18a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073zm-9.613 13.028h-.026a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.583a4.504 4.504 0 01-4.468 4.494zM3.6 18.304a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.032.067L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 7.896a4.485 4.485 0 012.366-1.973V11.6a.766.766 0 00.388.676l5.815 3.355-2.02 1.168a.076.076 0 01-.071 0L4.01 14.218A4.5 4.5 0 012.34 7.896zm16.597 3.855l-5.843-3.375 2.02-1.164a.076.076 0 01.071 0l4.818 2.782a4.5 4.5 0 01-.692 8.116v-5.677a.79.79 0 00-.374-.682zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 00-.785 0L9.409 9.23V6.897a.066.066 0 01.028-.061l4.807-2.774a4.5 4.5 0 016.65 4.66v.029zm-12.64 4.135l-2.02-1.164a.08.08 0 01-.038-.057V6.075a4.5 4.5 0 017.375-3.453l-.142.08-4.778 2.758a.795.795 0 00-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

export function ZapierIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden fill="currentColor">
      <path d="M13 2L4.09 12.5H11L9 22l12-12h-7L13 2z" />
    </svg>
  );
}

export function HubSpotIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden fill="currentColor">
      <path d="M22.162 6.254a3.373 3.373 0 00-1.534-2.855 3.37 3.37 0 00-3.264-.177V2.1a1.1 1.1 0 00-2.2 0v2.72a3.384 3.384 0 00-1.386 5.503l-4.478 4.957A3.367 3.367 0 007.4 15a3.384 3.384 0 000 6.768A3.384 3.384 0 0010.784 18a3.369 3.369 0 00-.902-2.299l4.48-4.958a3.38 3.38 0 003.503-.226l1.928 1.928a1.1 1.1 0 001.556-1.556l-1.93-1.929a3.374 3.374 0 00.743-2.706zM7.4 19.7a1.184 1.184 0 110-2.368A1.184 1.184 0 017.4 19.7zm10.264-11.085a1.184 1.184 0 110-2.368 1.184 1.184 0 010 2.368z" />
    </svg>
  );
}

export function GoogleAdsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden fill="currentColor">
      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 01-5.279-5.28 5.27 5.27 0 015.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 00-8.934 8.934 8.907 8.907 0 008.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
    </svg>
  );
}

export function MetaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden fill="currentColor">
      <path d="M16.5 8.5c-1.3 0-2.4.7-3.2 1.8L12 12l-1.3-1.7C9.9 9.2 8.8 8.5 7.5 8.5 5 8.5 3 10.7 3 13.5s2 5 4.5 5c1.3 0 2.4-.7 3.2-1.8L12 15l1.3 1.7c.8 1.1 1.9 1.8 3.2 1.8 2.5 0 4.5-2.2 4.5-5s-2-5-4.5-5zm-9 8c-1.4 0-2.5-1.3-2.5-3s1.1-3 2.5-3c.8 0 1.5.5 2 1.3l1 1.7-1 1.7c-.5.8-1.2 1.3-2 1.3zm9 0c-.8 0-1.5-.5-2-1.3l-1-1.7 1-1.7c.5-.8 1.2-1.3 2-1.3 1.4 0 2.5 1.3 2.5 3s-1.1 3-2.5 3z" />
    </svg>
  );
}

export function GA4Icon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden fill="currentColor">
      <path d="M12.001 0C5.373 0 0 5.372 0 12c0 6.628 5.372 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zM4.296 15.108a.96.96 0 01-.96-.96V9.852a.96.96 0 011.92 0v4.296a.96.96 0 01-.96.96zm4.296 2.148a.96.96 0 01-.96-.96V7.704a.96.96 0 011.92 0v8.592a.96.96 0 01-.96.96zm4.296-4.296a.96.96 0 01-.96-.96v-4.296a.96.96 0 011.92 0V12a.96.96 0 01-.96.96zm4.296 2.148a.96.96 0 01-.96-.96V9.852a.96.96 0 011.92 0v4.296a.96.96 0 01-.96.96z" />
    </svg>
  );
}

export function GoogleSheetsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden fill="currentColor">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 9v2H9v-2h4zm0-3v2H9V8h4zm-6 6h4v2H7v-2zm10 2h-4v-2h4v2zm0-3h-4v-2h4v2zm0-3h-4V8h4v2zm-3-6.5L17.5 7H14V3.5z" />
    </svg>
  );
}

export function SlackIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden fill="currentColor">
      <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z" />
    </svg>
  );
}

export function NotionIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden fill="currentColor">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.32 2.164c-.42-.326-.98-.7-2.055-.607l-12.8.932c-.466.046-.56.28-.373.466zM5.252 7.127v13.95c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.933-.56.933-1.167V6.42c0-.606-.233-.933-.747-.886l-15.177.887c-.56.046-.746.326-.746.7zm14.336.42c.094.42 0 .84-.42.887l-.7.14v10.264c-.607.327-1.166.514-1.633.514-.747 0-.933-.234-1.493-.934l-4.573-7.186v6.953l1.446.327s0 .84-1.166.84l-3.22.187c-.093-.187 0-.653.327-.746l.84-.233V9.854l-1.166-.093c-.094-.42.14-1.026.793-1.073l3.453-.233 4.76 7.28V9.527l-1.213-.14c-.094-.514.28-.887.747-.933zm-13.263-4.9l12.847-.933c1.587-.14 1.96-.047 2.94.654l4.06 2.846c.653.467.84.653.84 1.214v15.504c0 1.167-.42 1.867-1.96 1.96l-15.457.934c-1.12.047-1.68-.14-2.287-.84l-3.68-4.759c-.653-.84-.933-1.494-.933-2.24V4.494c0-.934.467-1.774 1.633-1.96z" />
    </svg>
  );
}

export function ResendIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden fill="currentColor">
      <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 0l8 5 8-5H4zm16 1.5l-8 5-8-5V18h16V7.5z" />
    </svg>
  );
}

/* ─── Icon map keyed by tool name ─── */

export const AUTOMATION_TOOL_ICON_MAP: Record<string, ComponentType<IconProps>> = {
  "Make.com": MakeIcon,
  Make: MakeIcon,
  n8n: N8nIcon,
  Voiceflow: VoiceflowIcon,
  "OpenAI API": OpenAIIcon,
  OpenAI: OpenAIIcon,
  Zapier: ZapierIcon,
  HubSpot: HubSpotIcon,
  "Google Ads": GoogleAdsIcon,
  "Meta Ads": MetaIcon,
  GA4: GA4Icon,
  "Google Sheets": GoogleSheetsIcon,
  Slack: SlackIcon,
  Notion: NotionIcon,
  Resend: ResendIcon,
};

/* ─── Wrapper: renders icon by name with text fallback ─── */

interface AutomationToolIconProps {
  name: string;
  className?: string;
  showLabel?: boolean;
}

export function AutomationToolIcon({ name, className, showLabel }: AutomationToolIconProps) {
  const Icon = AUTOMATION_TOOL_ICON_MAP[name];

  if (Icon) {
    return (
      <span className="inline-flex items-center gap-1.5" title={name}>
        <Icon className={className} />
        {showLabel && (
          <span className="font-mono text-xs text-text-secondary">{name}</span>
        )}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center rounded-full bg-bg-tertiary px-2 py-0.5 font-mono text-[10px] text-text-secondary"
      title={name}
    >
      {name}
    </span>
  );
}
