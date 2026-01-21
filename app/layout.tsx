import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/google-analytics"
import { GTMAutoTracking } from "@/components/gtm-auto-tracking"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Box - La caisse mobile au cœur de vos économies",
  description:
    "Box permet aux entrepreneurs, commerçants, artisans, étudiants et particuliers d'épargner facilement et en toute sécurité. Créez des caisses personnalisées avec des objectifs et une fréquence d'épargne.",
  keywords: ["épargne", "mobile", "fintech", "caisse", "économies", "Bénin", "Afrique"],
  authors: [{ name: "Babilon Group" }],
  openGraph: {
    title: "Box - La caisse mobile au cœur de vos économies",
    description: "Épargnez facilement et en toute sécurité avec Box",
    url: "https://www.babilonbg.net",
    siteName: "Box",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Box - La caisse mobile",
    description: "Épargnez facilement et en toute sécurité",
  },
  icons: {
    icon: "/images/box-logo.png",
    shortcut: "/images/box-logo.png",
    apple: "/images/box-logo.png",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#D19E29",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans antialiased`}>
        <GoogleTagManagerNoScript />
        <GoogleTagManager />
        <GTMAutoTracking />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
