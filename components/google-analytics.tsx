"use client"

import { useEffect } from "react"

const GTM_ID = "GTM-P5X9W3ZL"

// Google Tag Manager script component (for head)
export function GoogleTagManagerScript() {
  useEffect(() => {
    // Check if already loaded
    if (typeof window === "undefined" || document.getElementById("gtm-script")) {
      return
    }

    // Google Tag Manager script
    const script = document.createElement("script")
    script.id = "gtm-script"
    script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P5X9W3ZL');`
    document.head.appendChild(script)

    // Cleanup
    return () => {
      const s = document.getElementById("gtm-script")
      if (s) document.head.removeChild(s)
    }
  }, [])

  return null
}

// Google Tag Manager noscript component (for body)
export function GoogleTagManagerNoscript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  )
}

