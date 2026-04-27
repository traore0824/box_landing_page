"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { SimulatorSection } from "./simulator-section"
import { cn } from "@/lib/utils"

export function SimulatorModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    // Check if user has already seen the modal in this session
    const hasSeenModal = sessionStorage.getItem("hasSeenSimulatorModal")
    
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        setShouldRender(true)
        sessionStorage.setItem("hasSeenSimulatorModal", "true")
      }, 3000) // 3 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  const closeModal = () => {
    setIsOpen(false)
    // Wait for animation to finish before unmounting
    setTimeout(() => setShouldRender(false), 300)
  }

  if (!shouldRender) return null

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ease-out",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal Content */}
      <div 
        className={cn(
          "relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl transition-all duration-300 ease-out transform",
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        )}
      >
        {/* Close Button */}
        <button 
          onClick={closeModal}
          className="absolute top-6 right-6 z-[110] p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* We reuse the SimulatorSection but we might want to tweak its title for the modal context */}
        <div className="p-0 sm:p-4">
          <div className="pt-10 sm:pt-12 text-center px-4">
             <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-gold-dark uppercase bg-gold/10 rounded-full">
              Offre Spéciale
            </span>
            <h3 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Prêt à réaliser vos projets ?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400">
              Calculez votre épargne idéale en quelques secondes.
            </p>
          </div>
          
          <div className="w-full">
            <SimulatorSection isModal={true} />
          </div>
        </div>
      </div>
    </div>
  )
}
