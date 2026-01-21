"use client"

import { useEffect } from "react"
import { Shield, Unlock, Zap, Users } from "lucide-react"
import { trackSectionView } from "@/lib/tracking"

const benefits = [
  {
    icon: Shield,
    title: "Sécurité maximale",
    description:
      "Vos économies sont protégées par des protocoles de sécurité avancés. Dormez tranquille, votre argent est en sécurité.",
  },
  {
    icon: Unlock,
    title: "Liberté totale",
    description:
      "Mode libre ou bloqué : choisissez comment gérer votre épargne. Accédez à vos fonds quand vous le souhaitez.",
  },
  {
    icon: Zap,
    title: "Simplicité d'utilisation",
    description:
      "Interface intuitive conçue pour tous. Pas besoin d'être expert en finance pour épargner efficacement.",
  },
  {
    icon: Users,
    title: "Accessible à tous",
    description: "Que vous soyez entrepreneur, étudiant, artisan ou particulier - Box s'adapte à vos besoins.",
  },
]

export function BenefitsSection() {
  useEffect(() => {
    trackSectionView("benefits")
  }, [])

  return (
    <section id="avantages" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pourquoi choisir Box ?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des fonctionnalités pensées pour simplifier votre épargne au quotidien.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
