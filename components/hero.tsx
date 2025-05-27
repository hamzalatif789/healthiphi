"use client"

import { Button } from "@/components/ui/button"
import { PodcastPlayer } from "./podcast-player"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 relative z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl">{t("hero.title")}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[800px]">{t("hero.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" className="w-full sm:w-auto px-8 bg-blue-600 hover:bg-blue-800 transition-colors" asChild>
              <Link href="/apply">{t("hero.joinTeam")}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 border-blue-600 text-blue-600 hover:bg-blue-50"
              asChild
            >
              <Link href="/founder">{t("hero.backLaunch")}</Link>
            </Button>
          </div>
          <PodcastPlayer />
        </div>
      </div>

      {/* Ghosted PHI symbol in background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border-[40px] border-blue-500"></div>
      </div>
    </section>
  )
}
