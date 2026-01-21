"use client"

import { useEffect } from "react"
import Link from "next/link"
import { UserPlus, PiggyBank, CalendarClock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackSectionView, trackCTAClick } from "@/lib/tracking"

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.babilongroup.box"

const steps = [
  {
    icon: UserPlus,
    title: "Inscription rapide",
    description: "Créez votre compte en quelques secondes avec votre numéro de téléphone.",
    cta: "Créer un compte",
  },
  {
    icon: PiggyBank,
    title: "Créez votre caisse",
    description: 'Définissez un objectif personnalisé (ex: "Achat de moto", "Études").',
    cta: "Créer une caisse",
  },
  {
    icon: CalendarClock,
    title: "Choisissez la fréquence",
    description: "Quotidien, hebdomadaire ou mensuel - vous décidez du rythme d'épargne.",
    cta: "Choisir ma fréquence",
  },
  {
    icon: Sparkles,
    title: "Épargnez automatiquement",
    description: "Activez l'épargne automatique ou faites des dépôts manuels selon vos envies.",
    cta: "Commencer à épargner",
  },
]

export function HowItWorksSection() {
  useEffect(() => {
    trackSectionView("how_it_works")
  }, [])

  return (
    <section id="fonctionnement" className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Comment ça marche ?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            En 4 étapes simples, commencez à épargner pour réaliser vos projets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative group">
              {/* Connector line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border -z-10" />
              )}

              <div className="bg-background rounded-2xl p-6 border border-border hover:border-primary/50 transition-colors h-full flex flex-col">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm font-semibold text-primary mb-2">Étape {index + 1}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{step.description}</p>

                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => trackCTAClick(`step_${index + 1}_cta`, PLAY_STORE_URL)}
                >
                  <Link
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-event={`click_${step.cta.toLowerCase().replace(/\s+/g, "_")}`}
                    data-track-label={step.cta}
                    data-track-id={`step_${index + 1}_cta`}
                    data-track-name={`step_${index + 1}_cta`}
                  >
                    {step.cta}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
