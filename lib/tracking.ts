// Tracking utilities for marketing analytics

export type TrackingEvent = {
  event: string
  category: string
  label?: string
  value?: number
  timestamp: string
  sessionId: string
  page: string
}

// Generate a session ID for tracking
export function getSessionId(): string {
  if (typeof window === "undefined") return ""

  let sessionId = sessionStorage.getItem("box_session_id")
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    sessionStorage.setItem("box_session_id", sessionId)
  }
  return sessionId
}

// Track an event
export function trackEvent(event: string, category: string, label?: string, value?: number): void {
  if (typeof window === "undefined") return

  const trackingData: TrackingEvent = {
    event,
    category,
    label,
    value,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    page: window.location.pathname,
  }

  // Log to console for debugging
  console.log("[Box Tracking]", trackingData)

  // Send to Google Tag Manager via dataLayer (recommandé avec GTM)
  // GTM gérera ensuite l'envoi vers Google Analytics, Google Ads, Facebook Pixel, etc.
  if (typeof window !== "undefined" && "dataLayer" in window) {
    const dataLayer = (window as unknown as { dataLayer: unknown[] }).dataLayer
    dataLayer.push({
      event: event,
      event_category: category,
      event_label: label,
      value: value,
      page: window.location.pathname,
      session_id: getSessionId(),
    })
  }

  // Fallback: Send to Google Analytics directly if gtag is available (sans GTM)
  if (typeof window !== "undefined" && "gtag" in window && !("dataLayer" in window)) {
    ;(window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", event, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }

  // Fallback: Send to Meta Pixel directly if fbq is available (sans GTM)
  if (typeof window !== "undefined" && "fbq" in window && !("dataLayer" in window)) {
    ;(window as unknown as { fbq: (...args: unknown[]) => void }).fbq("trackCustom", event, {
      category,
      label,
      value,
    })
  }

  // Store locally for export/analysis
  storeTrackingEvent(trackingData)
}

// Store tracking events locally
function storeTrackingEvent(event: TrackingEvent): void {
  try {
    const events = JSON.parse(localStorage.getItem("box_tracking_events") || "[]")
    events.push(event)
    // Keep only last 1000 events
    if (events.length > 1000) {
      events.splice(0, events.length - 1000)
    }
    localStorage.setItem("box_tracking_events", JSON.stringify(events))
  } catch {
    console.error("Failed to store tracking event")
  }
}

// Get all tracked events (for CM dashboard)
export function getTrackingEvents(): TrackingEvent[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem("box_tracking_events") || "[]")
  } catch {
    return []
  }
}

// Export tracking data as CSV
export function exportTrackingDataAsCSV(): string {
  const events = getTrackingEvents()
  if (events.length === 0) return ""

  const headers = ["timestamp", "event", "category", "label", "value", "sessionId", "page"]
  const rows = events.map((e) => [
    e.timestamp,
    e.event,
    e.category,
    e.label || "",
    e.value?.toString() || "",
    e.sessionId,
    e.page,
  ])

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
}

// Track section visibility (scroll tracking)
export function trackSectionView(sectionId: string): void {
  trackEvent("section_view", "engagement", sectionId)
}

// Track CTA clicks
export function trackCTAClick(ctaName: string, destination?: string): void {
  trackEvent("cta_click", "conversion", ctaName, undefined)
  if (destination) {
    trackEvent("outbound_click", "navigation", destination)
  }
}

// Track form interactions
export function trackFormStart(formName: string): void {
  trackEvent("form_start", "engagement", formName)
}

export function trackFormSubmit(formName: string): void {
  trackEvent("form_submit", "conversion", formName)
}

export function trackFormError(formName: string, error: string): void {
  trackEvent("form_error", "error", `${formName}: ${error}`)
}
