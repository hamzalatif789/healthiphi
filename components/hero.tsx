"use client"

import { Button } from "@/components/ui/button"
import { PodcastPlayer } from "./podcast-player"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8 relative z-10">
          {/* Title with subtle desert sand background */}
          <div className=" px-12 py-8 rounded-3xl  mb-6 max-w-5xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-black leading-tight">
              {t("hero.title")}
            </h1>
          </div>

          {/* Subtitle with clean typography */}
          <p className="text-lg md:text-xl text-black max-w-[700px] font-light leading-relaxed opacity-80">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons with luxury spa aesthetic */}
          <div className="flex flex-col sm:flex-row gap-6 mt-12">
            {/* Primary CTA - Forest Green with gold accent */}
            <Button
              size="lg"
              className="w-full sm:w-auto px-10 py-4 bg-[#317039] hover:bg-[#2a5f31] text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl rounded-full border-2 border-transparent hover:border-[#f1be49] group"
              asChild
            >
              <Link href="/apply">
                <span className="group-hover:text-[#f1be49] transition-colors duration-300">
                  {t("hero.joinTeam")}
                </span>
              </Link>
            </Button>

            {/* Secondary CTA - Clean white with green accent */}
            <Button
              size="lg"
              className="w-full sm:w-auto px-10 py-4 bg-white hover:bg-[#fefbea] text-[#317039] border-2 border-[#317039] hover:border-[#f1be49] font-medium transition-all duration-300 shadow-lg hover:shadow-xl rounded-full group"
              asChild
            >
              <Link href="/founder">
                <span className="group-hover:text-[#cc4b24] transition-colors duration-300">
                  {t("hero.backLaunch")}
                </span>
              </Link>
            </Button>
          </div>

          {/* Podcast Player with enhanced styling */}
          <div className="mt-12 w-full max-w-2xl ">
            <PodcastPlayer />
          </div>
        </div>
      </div>

      {/* Subtle decorative elements - minimal and clean */}
      {/* <div className="absolute top-32 left-16 w-2 h-16 bg-[#f1be49] rounded-full opacity-20"></div>
      <div className="absolute top-48 left-20 w-1 h-8 bg-[#317039] rounded-full opacity-15"></div>
      
      <div className="absolute bottom-32 right-16 w-3 h-12 bg-[#cc4b24] rounded-full opacity-15"></div>
      <div className="absolute bottom-48 right-20 w-1 h-6 bg-[#f1be49] rounded-full opacity-20"></div>
       */}
      {/* Subtle gradient overlay for depth */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fff1d4] opacity-30 pointer-events-none"></div>
       */}
      {/* Clean geometric accent */}
      {/* <div className="absolute top-1/4 right-8 w-px h-24 bg-gradient-to-b from-[#f1be49] to-transparent opacity-30"></div>
      <div className="absolute bottom-1/4 left-8 w-px h-32 bg-gradient-to-t from-[#317039] to-transparent opacity-20"></div> */}
    </section>
  )
}