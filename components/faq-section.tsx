"use client"

import { useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { trackSectionView, trackCTAClick } from "@/lib/tracking"

const faqs = [
  {
    question: "Box est-il sécurisé ?",
    answer:
      "Absolument ! Box utilise des protocoles de sécurité avancés pour protéger vos données et vos économies. Toutes les transactions sont cryptées et nous suivons les meilleures pratiques de l'industrie financière.",
  },
  {
    question: "Puis-je retirer mon argent à tout moment ?",
    answer:
      'Cela dépend du mode que vous choisissez. En mode "libre", vous pouvez retirer votre argent quand vous le souhaitez. En mode "bloqué", vos fonds sont verrouillés jusqu\'à l\'atteinte de votre objectif pour vous aider à rester discipliné.',
  },
  {
    question: "Y a-t-il des frais pour utiliser Box ?",
    answer:
      "L'inscription et la création de caisses sont entièrement gratuites. Certaines fonctionnalités premium peuvent avoir des frais minimes, mais l'essentiel de l'application reste accessible à tous sans frais.",
  },
  {
    question: "Comment fonctionne l'épargne automatique ?",
    answer:
      "Vous définissez un montant et une fréquence (quotidien, hebdomadaire, mensuel). Box prélève automatiquement ce montant selon le calendrier choisi. Vous recevez des notifications de rappel pour rester informé.",
  },
  {
    question: "L'application est-elle disponible dans mon pays ?",
    answer:
      "Box est actuellement disponible au Bénin et s'étend progressivement à d'autres pays d'Afrique de l'Ouest. Téléchargez l'application pour vérifier la disponibilité dans votre région.",
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
