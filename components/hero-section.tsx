"use client"


import Image from "next/image"
import Link from "next/link"
import { Apple, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/lib/tracking"
import { useEffect } from "react"
import { trackSectionView } from "@/lib/tracking"

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.babilongroup.box"
const APP_STORE_URL = "https://apps.apple.com/bj/app/box-la-caisse-mobile/id6755318897"

export function HeroSection() {
  useEffect(() => {
    trackSectionView("hero")
  }, [])

  return (
    <section id="hero" className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 text-balance">
              Prenez enfin le contrôle de vos <span className="text-primary">économies</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {/* Rejoignez des milliers d&apos;utilisateurs qui font confiance à <strong>Box</strong> pour simplifier leur épargne. */}
              Que vous soyez entrepreneur, artisan ou particulier, <strong>Box</strong> sécurise votre argent et vous aide à atteindre
              vos objectifs financiers plus vite.
            </p>


            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 h-14 px-6"
                onClick={() => trackCTAClick("hero_app_store", APP_STORE_URL)}
              >
                <Link
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-event="click_appstore"
                  data-track-label="Télécharger sur App Store"
                  data-track-id="hero_app_store"
                  data-track-name="hero_app_store"
                >
                  <Apple className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="text-xs opacity-80">Télécharger sur</div> 
                    <div className="text-sm font-semibold">App Store</div>    
                  </div>
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-6"
                onClick={() => trackCTAClick("hero_play_store", PLAY_STORE_URL)}
              >
                <Link
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-event="click_googleplay"
                  data-track-label="Disponible sur Google Play"
                  data-track-id="hero_play_store"
                  data-track-name="hero_play_store"
                >
                  <Play className="w-6 h-6 mr-3 fill-current" />
                  <div className="text-left">
                    <div className="text-xs opacity-80">Disponible sur</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </Link>
              </Button>
            </div>


            
            
            {/* <p className="text-sm md:text-base text-muted-foreground mt-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Que vous soyez entrepreneur, artisan ou particulier, Box sécurise votre argent et vous aide à atteindre
              vos objectifs financiers plus vite.
            </p> */}
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-xl">
              <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl -z-10" />
              <Image
                src="https://box.api.babilonbg.net/media/000_aWHI7Su.jpeg"
                alt="Box App - Application d'épargne mobile" 
                width={700} 
                height={400} 
                className="w-full h-auto rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
