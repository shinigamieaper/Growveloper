/* ============================================================
   Analytics Helper — never call window.dataLayer directly.
   All GTM event pushes go through this module.
   ============================================================ */

interface GTMEvent {
  event: string;
  [key: string]: string | number | boolean | undefined;
}

export interface CtaClickEvent {
  page: string;
  ctaLabel: string;
  destination: string;
}

export interface FormEvent {
  formName?: string;
}

export interface PurchaseEvent {
  item: string;
  value: number;
  currency: string;
}

export interface DownloadEvent {
  resourceTitle: string;
  accessType: "free" | "paid";
}

export interface NewsletterEvent {
  source?: string;
}

export interface ScrollDepthEvent {
  page: string;
  depth: 25 | 50 | 75 | 100;
}

export interface VideoEvent {
  title: string;
  platform: "youtube" | "tiktok";
}

export interface PopupEvent {
  page: string;
  offerType: string;
}

function trackEvent(eventData: GTMEvent): void {
  if (typeof window === "undefined") return;
  const dl = (window as unknown as { dataLayer?: GTMEvent[] }).dataLayer;
  if (!dl) return;
  dl.push(eventData);
}

export function trackCTAClick(page: string, ctaLabel: string, destination: string): void {
  trackEvent({ event: "cta_click", page, cta_label: ctaLabel, destination });
}

export function trackFormStart(formName?: string): void {
  trackEvent({ event: "form_start", ...(formName ? { form_name: formName } : {}) });
}

export function trackFormComplete(formName?: string): void {
  trackEvent({ event: "form_complete", ...(formName ? { form_name: formName } : {}) });
}

export function trackPurchase({ item, value, currency }: PurchaseEvent): void {
  trackEvent({ event: "purchase", item, value, currency });
}

export function trackDownload({ resourceTitle, accessType }: DownloadEvent): void {
  trackEvent({ event: "resource_download", resource_title: resourceTitle, access_type: accessType });
}

export function trackNewsletterSignup({ source }: NewsletterEvent = {}): void {
  trackEvent({ event: "newsletter_signup", ...(source ? { source } : {}) });
}

export function trackScrollDepth({ page, depth }: ScrollDepthEvent): void {
  trackEvent({ event: "scroll_depth", page, depth });
}

export function trackVideoPlay({ title, platform }: VideoEvent): void {
  trackEvent({ event: "video_play", title, platform });
}

export function trackPopupShown({ page, offerType }: PopupEvent): void {
  trackEvent({ event: "popup_shown", page, offer_type: offerType });
}

export function trackPopupDismissed({ page, offerType }: PopupEvent): void {
  trackEvent({ event: "popup_dismissed", page, offer_type: offerType });
}

export function trackPopupConverted({ page, offerType }: PopupEvent): void {
  trackEvent({ event: "popup_converted", page, offer_type: offerType });
}
