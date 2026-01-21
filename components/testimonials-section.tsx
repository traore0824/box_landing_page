"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { trackSectionView } from "@/lib/tracking"

const testimonials = [
  {
    name: "Marie Kouassi",
    role: "Entrepreneure",
    image: "/images/testimonial-1.jpeg",
    content:
      "Avant, j'avais du mal à mettre de l'argent de côté, surtout avec les imprévus. Depuis que j'utilise BOX, j'arrive à épargner petit à petit, sans même m'en rendre compte. Aujourd'hui, j'ai pu acheter un nouveau chariot pour mon activité, et je continue à économiser pour agrandir mon petit commerce. Franchement, je recommande Box BABILON GROUP à toutes celles et ceux qui veulent mieux gérer leur argent, même avec de petits revenus.",
    rating: 5,
  },
  {
    name: "ALASSANE Abdoulaye",
    role: "Commerçant",
    image: "/images/testimonial-3.jpeg",
    content:
      "Avec mes amis, on a utilisé BOX pour organiser un petit voyage entre nous. Chacun cotisait dans la même caisse, petit à petit, et à la fin on a récupéré notre argent pour partir. Franchement, ça nous a trop aidés à rester sérieux et à ne pas dépenser n'importe comment. Je vous conseille ça les gars, surtout si vous préparez un projet à plusieurs.",
    rating: 5,
  },
  {
    name: "OBA Gwladys",
    role: "Utilisatrice",
    image: "/images/testimonial-2.jpeg",
    content:
      "Avant, je dépensais un peu sans trop réfléchir. Depuis que j'utilise Box BABILON GROUP, j'ai appris à mieux gérer mon argent. Je suis plus organisé, et j'arrive même à économiser chaque mois. C'est devenu une habitude maintenant. Franchement, ça m'aide beaucoup.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  useEffect(() => {
    trackSectionView("testimonials")
  }, [])

  return (
    <section id="temoignages" className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ce que disent nos utilisateurs</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des milliers de personnes font confiance à Box pour atteindre leurs objectifs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-background rounded-2xl p-6 lg:p-8 border border-border relative">
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed text-sm lg:text-base">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author - Now using real images */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
