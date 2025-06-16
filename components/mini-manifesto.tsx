"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function MiniManifesto() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-16 md:py-24 bg-white relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center relative">
          {/* Elegant title styling matching design system */}
          <div className="mb-12">
            <div className="px-10 py-6 rounded-3xl inline-block mb-6">
              <h2 className="text-3xl md:text-4xl text-black font-semibold tracking-tight">{t("manifesto.title")}</h2>
            </div>
          </div>

          {/* Elegant content card */}
          <div className="bg-white border-2 border-[#f6ecdc] rounded-3xl p-12 mb-12 shadow-lg hover:shadow-xl transition-all duration-300 relative group">
            {/* Subtle decorative accents */}
            <div className="absolute top-6 left-6 w-2 h-8 bg-[#f1be49] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="absolute bottom-6 right-6 w-1 h-6 bg-[#cc4b24] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            
            <div className="space-y-6 mb-10">
              <p className="text-lg text-black opacity-80 font-light leading-relaxed">{t("manifesto.health")}</p>
              <p className="text-lg text-black opacity-80 font-light leading-relaxed">{t("manifesto.ai")}</p>
              <p className="text-lg text-black opacity-80 font-light leading-relaxed">{t("manifesto.data")}</p>
              <p className="text-lg text-black opacity-80 font-light leading-relaxed">{t("manifesto.iceland")}</p>
            </div>

            <div className="bg-[#fefbea] border-2 border-[#f1be49] rounded-2xl px-8 py-6 inline-block shadow-sm">
              <p className="text-xl font-medium text-black">{t("manifesto.join")}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-white border-2 border-[#317039] text-black hover:border-[#f1be49] hover:text-[#cc4b24] font-medium shadow-lg hover:shadow-xl px-10 py-4 rounded-full transition-all duration-300 text-lg" 
              asChild
            >
              <Link href="/founder">{t("manifesto.backLaunch")}</Link>
            </Button>
            <Button 
              size="lg" 
              className="bg-[#f1be49] border-2 border-[#f1be49] text-black hover:bg-[#cc4b24] hover:border-[#cc4b24] hover:text-white font-medium shadow-lg hover:shadow-xl px-10 py-4 rounded-full transition-all duration-300 text-lg" 
              asChild
            >
              <Link href="/apply">{t("manifesto.joinTeam")}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle decorative elements matching the design system */}
      <div className="absolute top-20 right-10 w-px h-20 bg-gradient-to-b from-[#f1be49] to-transparent opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-px h-16 bg-gradient-to-t from-[#cc4b24] to-transparent opacity-15"></div>
      <div className="absolute top-1/2 right-4 w-1 h-8 bg-[#317039] rounded-full opacity-10"></div>
      <div className="absolute top-1/3 left-4 w-2 h-4 bg-[#f1be49] rounded-full opacity-15"></div>
    </section>
  )
}