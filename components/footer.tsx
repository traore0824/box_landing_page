"use client"

import Image from "next/image"
import Link from "next/link"
import { Apple, Play, MapPin, Mail, Phone } from "lucide-react"
import { trackCTAClick } from "@/lib/tracking"

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.babilongroup.box"
const APP_STORE_URL = "https://apps.apple.com/bj/app/box-la-caisse-mobile/id6755318897"
const OFFICIAL_SITE = "https://www.babilonbg.net"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Image
                src="https://box.api.babilonbg.net/media/logo.png"
                alt="Box Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="font-bold text-xl text-background">Box</span>
            </Link>
            <p className="text-background/70 mb-6 max-w-md">
              La caisse mobile au cœur de vos économies. Épargnez facilement et en toute sécurité pour réaliser vos
              projets.
            </p>

            {/* Download buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("footer_app_store", APP_STORE_URL)}
                className="inline-flex items-center gap-2 bg-background/10 hover:bg-background/20 transition-colors rounded-lg px-4 py-2"
              >
                <Apple className="w-5 h-5" />
                <span className="text-sm">App Store</span>
              </Link>
              <Link
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("footer_play_store", PLAY_STORE_URL)}
                className="inline-flex items-center gap-2 bg-background/10 hover:bg-background/20 transition-colors rounded-lg px-4 py-2"
              >
                <Play className="w-5 h-5 fill-current" />
                <span className="text-sm">Google Play</span>
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-background mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#fonctionnement"
                  className="text-background/70 hover:text-background transition-colors"
                  onClick={() => trackCTAClick("footer_nav_fonctionnement")}
                >
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link
                  href="#temoignages"
                  className="text-background/70 hover:text-background transition-colors"
                  onClick={() => trackCTAClick("footer_nav_temoignages")}
                >
                  Témoignages
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-background/70 hover:text-background transition-colors"
                  onClick={() => trackCTAClick("footer_nav_contact")}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href={OFFICIAL_SITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                  onClick={() => trackCTAClick("footer_official_site", OFFICIAL_SITE)}
                >
                  Site officiel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-background mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-background/70">Zogbadjè, Abomey Calavi Bénin</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:contact@babilonbg.net"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  contact@babilonbg.net
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+2290192757655" className="text-background/70 hover:text-background transition-colors">
                    +229 01 92 75 76 55
                  </a>
                  <a href="tel:+2290167061626" className="text-background/70 hover:text-background transition-colors">
                    +229 01 67 06 16 26
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <a
                  href="https://wa.me/2290192757655"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  +229 01 92 75 76 55
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} Babilon Group. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
