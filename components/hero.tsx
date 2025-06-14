"use client"

import { Button } from "@/components/ui/button"
import { PodcastPlayer } from "./podcast-player"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-golden-50 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 relative z-10">
          {/* Title with cream background highlight */}
          <div className="bg-cream-100 px-8 py-6 rounded-2xl shadow-sm border border-cream-200 mb-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl text-forest-800">
              {t("hero.title")}
            </h1>
          </div>

          <p className="text-lg md:text-xl text-forest-700 max-w-[800px]">{t("hero.subtitle")}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {/* Primary CTA - Golden Yellow */}
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 bg-golden-500 hover:bg-golden-600 text-forest-800 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              asChild
            >
              <Link href="/apply">{t("hero.joinTeam")}</Link>
            </Button>

            {/* Secondary CTA - Forest Green */}
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 bg-forest-500 hover:bg-forest-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
              asChild
            >
              <Link href="/founder">{t("hero.backLaunch")}</Link>
            </Button>
          </div>

          <PodcastPlayer />
        </div>
      </div>

      {/* Decorative golden circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-golden-500 rounded-full opacity-10"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-golden-500 rounded-full opacity-10"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-golden-500 rounded-full opacity-10"></div>
    </section>
  )
}
