"use client"

import { useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { trackSectionView, trackCTAClick } from "@/lib/tracking"

const faqs = [
  {
    question: "Qui a créé Box la caisse mobile ?",
    answer:
      "Box la caisse mobile a été créé par BABILON GROUP, une startup technologique qui se veut être une porte ouverte pour l'innovation et des solutions technologiques qui ont du sens et de la valeur pour la population africaine.",
  },
  {
    question: "C'est quoi Box la caisse mobile ?",
    answer:
      "Box La Caisse Mobile est une application d'épargne qui permet à chacun de mettre de l'argent de côté selon son rythme et ses capacités. Elle offre une gestion simple et sécurisée de vos économies, que ce soit en épargnant seul ou en participant à des projets collectifs.",
  },
  {
    question: "Comment fonctionne Box la caisse mobile ?",
    answer:
      "Box la caisse mobile BABILON GROUP est une solution d'épargne en ligne qui vous permet de cotiser sur une base journalière, hebdomadaire, mensuelle ou annuelle. Vous pouvez gérer vos comptes d'épargne et fixer vos propres objectifs personnalisés via notre application mobile intuitive.",
  },
  {
    question: "Est-ce que je peux retirer mon argent à tout moment ?",
    answer:
      "Oui, vous pouvez retirer vos économies à tout moment via l'application. Box la caisse mobile BABILON GROUP offre une flexibilité totale pour que vous puissiez accéder à vos fonds selon vos besoins.",
  },
  {
    question: "Qui peut utiliser Box la caisse mobile au quotidien ?",
    answer:
      "Toute personne disposant d'une pièce d'identité valide ou de tout autre document officiel d'identification peut utiliser l'application BOX – la caisse mobile.",
  },
  {
    question: "Quels sont les frais associés à l'utilisation de Box la caisse mobile ?",
    answer:
      "Les frais appliqués par BOX la caisse mobile sont de 4 % sur le montant total épargné. Ces frais peuvent atteindre 10 % en cas d'annulation d'une caisse bloquée.",
  },
]

export function FAQSection() {
  useEffect(() => {
    trackSectionView("faq")
  }, [])

  const handleFAQClick = (question: string) => {
    trackCTAClick(`faq_${question.substring(0, 20)}`)
  }

  return (
    <section id="faq" className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Questions fréquentes</h2>
            <p className="text-lg text-muted-foreground">
              Tout ce que vous devez savoir sur Box et l&apos;épargne mobile.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-xl border border-border px-6"
              >
                <AccordionTrigger
                  className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-4"
                  onClick={() => handleFAQClick(faq.question)}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
