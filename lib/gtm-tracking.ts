/**
 * Google Tag Manager Tracking Utilities
 * JavaScript vanilla pour le tracking automatique via dataLayer
 */

// Déclaration TypeScript pour dataLayer
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

/**
 * Envoie un événement au dataLayer GTM
 */
export function pushToDataLayer(eventData: Record<string, unknown>): void {
  if (typeof window === "undefined") return

  // Initialiser dataLayer s'il n'existe pas
  window.dataLayer = window.dataLayer || []

  // Ajouter les données de contexte
  const enrichedData = {
    ...eventData,
    page_path: window.location.pathname,
    page_url: window.location.href,
    page_title: document.title,
    timestamp: new Date().toISOString(),
  }

  // Pousser vers dataLayer
  window.dataLayer.push(enrichedData)

  // Log pour debug (supprimer en production si nécessaire)
  if (process.env.NODE_ENV === "development") {
    console.log("[GTM Event]", enrichedData)
  }
}

/**
 * Track un clic sur un bouton
 */
export function trackButtonClick(
  eventName: string,
  buttonText: string,
  buttonId?: string,
  buttonName?: string,
  href?: string
): void {
  pushToDataLayer({
    event: eventName,
    button_text: buttonText,
    button_id: buttonId || "",
    button_name: buttonName || "",
    button_href: href || "",
    event_category: "button_click",
    event_label: buttonText,
  })
}

/**
 * Initialise le tracking automatique des clics sur les boutons avec data-track-*
 * À appeler au chargement de la page
 */
export function initAutoTracking(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return

  // Écouter tous les clics sur les éléments avec data-track-event
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as HTMLElement

      // Trouver l'élément le plus proche avec data-track-event (en remontant dans le DOM)
      let element: HTMLElement | null = target
      let trackedElement: HTMLElement | null = null

      while (element && element !== document.body) {
        if (element.hasAttribute("data-track-event")) {
          trackedElement = element
          break
        }
        element = element.parentElement
      }

      // Si on a trouvé un élément avec data-track-event, tracker le clic
      if (trackedElement) {
        const eventName = trackedElement.getAttribute("data-track-event") || "button_click"
        const buttonText =
          trackedElement.getAttribute("data-track-label") ||
          trackedElement.textContent?.trim() ||
          ""
        const buttonId = trackedElement.getAttribute("data-track-id") || trackedElement.id || ""
        const buttonName = trackedElement.getAttribute("data-track-name") || ""
        const href = trackedElement.getAttribute("href") || ""

        trackButtonClick(eventName, buttonText, buttonId, buttonName, href)
      }
    },
    true // Utiliser la capture pour intercepter avant les autres handlers
  )
}

