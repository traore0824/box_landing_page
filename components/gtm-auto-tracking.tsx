"use client"

import { useEffect } from "react"
import { initAutoTracking } from "@/lib/gtm-tracking"

/**
 * Composant qui initialise le tracking automatique GTM au chargement de la page
 * Ce composant écoute tous les clics sur les éléments avec data-track-event
 */
export function GTMAutoTracking() {
  useEffect(() => {
    // Initialiser le tracking automatique après le montage du composant
    initAutoTracking()
  }, [])

  return null
}

