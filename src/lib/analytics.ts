/* ============================================================
   Analytics Helper — never call window.dataLayer directly
   ============================================================ */

interface GTMEvent {
  event: string;
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(eventData: GTMEvent): void {
  if (typeof window === "undefined") return;

  const dataLayer = (window as unknown as { dataLayer: GTMEvent[] }).dataLayer;
  if (!dataLayer) return;

  dataLayer.push(eventData);
}

export function trackCTAClick(page: string, ctaLabel: string, destination: string): void {
  trackEvent({
    event: "cta_click",
    page,
    cta_label: ctaLabel,
    destination,
  });
}

export function trackFormStart(): void {
  trackEvent({ event: "form_start" });
}

export function trackFormComplete(): void {
  trackEvent({ event: "form_complete" });
}
