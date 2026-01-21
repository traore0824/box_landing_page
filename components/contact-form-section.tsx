"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { trackSectionView, trackFormStart, trackFormSubmit, trackFormError } from "@/lib/tracking"

type FormStatus = "idle" | "loading" | "success" | "error"

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "Contact depuis le site web",
    content: "",
  })
  const [status, setStatus] = useState<FormStatus>("idle")
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    trackSectionView("contact_form")
  }, [])

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    if (!hasStarted) {
      setHasStarted(true)
      trackFormStart("contact_form")
    }
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      trackFormError("contact_form", "Invalid email format")
      setStatus("error")
      return
    }

    try {
      const response = await fetch("https://box.api.babilonbg.net/box/box-site-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          fullname: formData.fullname,
          subject: formData.subject,
          content: formData.content,
        }),
      })

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      trackFormSubmit("contact_form")
      setStatus("success")
      setFormData({ fullname: "", email: "", subject: "Contact depuis le site web", content: "" })
      setHasStarted(false)
    } catch (error) {
      trackFormError("contact_form", error instanceof Error ? error.message : "Unknown error")
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-16 lg:py-24 bg-background">
      <div className="px-4 lg:px-8">
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Contactez-nous</h2>
            <p className="text-lg text-muted-foreground">
              Une question ? Une suggestion ? Notre équipe est là pour vous aider.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border">
            {status === "success" ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Message envoyé !</h3>
                <p className="text-muted-foreground mb-6">
                  Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                </p>
                <Button onClick={() => setStatus("idle")} variant="outline">
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Nom complet</Label>
                  <Input
                    id="fullname"
                    type="text"
                    placeholder="Votre nom"
                    value={formData.fullname}
                    onChange={(e) => handleInputChange("fullname", e.target.value)}
                    required
                    disabled={status === "loading"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    disabled={status === "loading"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Message</Label>
                  <Textarea
                    id="content"
                    placeholder="Comment pouvons-nous vous aider ?"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    required
                    disabled={status === "loading"}
                    rows={5}
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-lg">
                    <AlertCircle className="w-5 h-5" />
                    <span>Une erreur est survenue. Veuillez réessayer.</span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={status === "loading"}
                  size="lg"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
