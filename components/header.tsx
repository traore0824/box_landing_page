"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/lib/tracking"

const navLinks = [
  { href: "#fonctionnement", label: "Comment ça marche" },
  { href: "#temoignages", label: "Témoignages" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = (label: string) => {
    trackCTAClick(`nav_${label}`)
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://box.api.babilonbg.net/media/logo.png"
              alt="Box Logo"
              width={60}
              height={60}
              className="w-12 h-12 lg:w-16 lg:h-16"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.label)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => trackCTAClick("header_download")}
            >
              <Link
                href="#hero"
                data-track-event="click_download"
                data-track-label="Télécharger"
                data-track-id="header_download_desktop"
                data-track-name="header_download"
              >
                Télécharger
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.label)}
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
                onClick={() => {
                  trackCTAClick("mobile_header_download")
                  setIsMenuOpen(false)
                }}
              >
                <Link
                  href="#hero"
                  data-track-event="click_download"
                  data-track-label="Télécharger"
                  data-track-id="header_download_mobile"
                  data-track-name="header_download_mobile"
                >
                  Télécharger
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
