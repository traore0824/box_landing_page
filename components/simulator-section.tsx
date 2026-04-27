"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  addMonths,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  format
} from "date-fns"
import { fr } from "date-fns/locale"
import { Coins, Calendar as CalendarIcon, Target, TrendingUp, ArrowRight } from "lucide-react"

type Frequency = "daily" | "weekly" | "monthly" | "custom"

export function SimulatorSection({ isModal = false }: { isModal?: boolean }) {
  const [targetAmount, setTargetAmount] = useState<number>(500000)
  const [frequency, setFrequency] = useState<Frequency>("daily")
  const [durationMonths, setDurationMonths] = useState<number>(6)
  const [customDays, setCustomDays] = useState<number[]>([1, 3, 5]) // Mon, Wed, Fri by default
  const [amountPerPayment, setAmountPerPayment] = useState<number>(0)
  const [lastModified, setLastModified] = useState<"target" | "amount">("target")

  // Calculate number of payments based on frequency and duration
  const calculateNumPayments = useCallback(() => {
    const startDate = new Date()
    const endDate = addMonths(startDate, durationMonths)

    if (frequency === "daily") {
      return Math.max(1, differenceInDays(endDate, startDate))
    } else if (frequency === "weekly") {
      return Math.max(1, differenceInWeeks(endDate, startDate))
    } else if (frequency === "monthly") {
      return Math.max(1, durationMonths)
    } else {
      // Custom days logic: count selected days in the period
      let count = 0
      let current = new Date(startDate)
      while (current <= endDate) {
        if (customDays.includes(current.getDay())) {
          count++
        }
        current.setDate(current.getDate() + 1)
      }
      return Math.max(1, count)
    }
  }, [durationMonths, frequency, customDays])

  // Update values based on last modified field
  useEffect(() => {
    const numPayments = calculateNumPayments()

    if (lastModified === "target") {
      const calculated = Math.round(targetAmount / numPayments)
      setAmountPerPayment(calculated)
    } else {
      const calculated = Math.round(amountPerPayment * numPayments)
      setTargetAmount(calculated)
    }
  }, [targetAmount, amountPerPayment, frequency, durationMonths, lastModified, calculateNumPayments])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR").format(value) + " FCFA"
  }

  const handleTargetChange = (val: string) => {
    const num = parseInt(val.replace(/\D/g, "")) || 0
    setTargetAmount(num)
    setLastModified("target")
  }

  const handleAmountChange = (val: string) => {
    const num = parseInt(val.replace(/\D/g, "")) || 0
    setAmountPerPayment(num)
    setLastModified("amount")
  }

  const getFrequencyLabel = () => {
    if (frequency === "daily") return "jour"
    if (frequency === "weekly") return "semaine"
    if (frequency === "monthly") return "mois"
    return "versement"
  }

  const toggleCustomDay = (day: number) => {
    setCustomDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day].sort()
    )
    setLastModified("target")
  }

  const daysOfWeek = [
    { label: "L", value: 1 },
    { label: "M", value: 2 },
    { label: "M", value: 3 },
    { label: "J", value: 4 },
    { label: "V", value: 5 },
    { label: "S", value: 6 },
    { label: "D", value: 0 },
  ]

  return (
    <section className={cn(
      "overflow-hidden relative",
      !isModal ? "py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900" : "py-2 sm:py-4"
    )} id="simulator">
      {/* Background decorations */}
      {!isModal && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 blur-[120px] rounded-full" />
        </div>
      )}

      <div className={cn(!isModal && "container px-4 mx-auto")}>
        <div className={cn("mx-auto", !isModal ? "max-w-4xl" : "max-w-full")}>
          {!isModal && (
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold-dark to-gold">
                Simule ton épargne en quelques clics
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Visualise ton objectif et découvre combien tu dois mettre de côté pour l'atteindre sereinement.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Inputs Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 backdrop-blur-xl">
              <div className="space-y-8">
                {/* Objectif */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <Label className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <Target className="w-4 h-4" /> Ton Objectif Total
                    </Label>
                    <span className="text-2xl font-bold text-gold-dark dark:text-gold">
                      {formatCurrency(targetAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="10000000"
                    step="5000"
                    value={targetAmount}
                    onChange={(e) => handleTargetChange(e.target.value)}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>5 000 FCFA</span>
                    <span>10 000 000 FCFA</span>
                  </div>
                </div>

                {/* Fréquence */}
                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Fréquence des versements
                  </Label>
                  <div className="grid grid-cols-4 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    {(["daily", "weekly", "monthly", "custom"] as Frequency[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => {
                          setFrequency(f)
                          setLastModified("target")
                        }}
                        className={cn(
                          "py-2 px-1 sm:px-2 rounded-lg text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-200",
                          frequency === f
                            ? "bg-white dark:bg-slate-700 text-gold-dark dark:text-gold shadow-sm"
                            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                        )}
                      >
                        {f === "daily" ? "Quotidien" : f === "weekly" ? "Hebdo" : f === "monthly" ? "Mensuel" : "Perso"}
                      </button>
                    ))}
                  </div>

                  {/* Custom Days Picker */}
                  {frequency === "custom" && (
                    <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Jours sélectionnés</Label>
                      <div className="flex justify-between">
                        {daysOfWeek.map((day) => (
                          <button
                            key={day.value}
                            onClick={() => toggleCustomDay(day.value)}
                            className={cn(
                              "w-9 h-9 rounded-full text-xs font-bold transition-all",
                              customDays.includes(day.value)
                                ? "bg-gold text-slate-900 shadow-md shadow-gold/30"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200"
                            )}
                          >
                            {day.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Durée */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <Label className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" /> Durée de l'objectif
                    </Label>
                    <span className="text-xl font-bold text-slate-700 dark:text-slate-300">
                      {durationMonths} mois
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="36"
                    step="1"
                    value={durationMonths}
                    onChange={(e) => {
                      setDurationMonths(parseInt(e.target.value))
                      setLastModified("target")
                    }}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>1 mois</span>
                    <span>3 ans</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Card */}
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-dark to-gold rounded-2xl sm:rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative h-full bg-slate-900 dark:bg-slate-950 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-slate-800 shadow-2xl">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider mb-8">
                    <Coins className="w-3.5 h-3.5" /> Simulation temps réel
                  </div>

                  <div className="space-y-6">
                    <p className="text-slate-400 leading-relaxed text-lg">
                      Pour atteindre <span className="text-white font-bold">{formatCurrency(targetAmount)}</span> en <span className="text-white font-bold">{durationMonths} mois</span> en épargnant chaque {getFrequencyLabel()}, tu dois mettre :
                    </p>

                    <div className="py-6 sm:py-8 border-y border-slate-800/50">
                      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight flex flex-wrap items-baseline gap-2">
                        {formatCurrency(amountPerPayment)}
                        <span className="text-lg sm:text-xl font-medium text-slate-500">/{getFrequencyLabel()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 space-y-4">
                  <a href="https://boxlacaissemobile.babilonbg.net/" target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Button size="lg" className="w-full h-14 text-lg font-bold bg-gold hover:bg-gold-dark text-slate-900 rounded-2xl shadow-lg shadow-gold/20 group">
                      Commencer à épargner
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                  <p className="text-center text-xs text-slate-500 italic">
                    * Calcul basé sur une durée de {durationMonths} mois à partir d'aujourd'hui.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
