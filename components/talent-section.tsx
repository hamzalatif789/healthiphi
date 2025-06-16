"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

interface TalentTileProps {
  icon: string
  title: string
  description: string
}

function TalentTile({ icon, title, description }: TalentTileProps) {
  return (
    <Card className="bg-white border-[#f6ecdc] hover:bg-[#fefbea] hover:border-[#f1be49] transition-all duration-300 shadow-lg hover:shadow-xl group">
      <CardContent className="p-6 relative">
        {/* Subtle decorative accent */}
        <div className="absolute top-4 right-4 w-1 h-6 bg-[#f1be49] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        
        {/* Golden circle for icon */}
        <div className="w-12 h-12 bg-[#f1be49] rounded-full flex items-center justify-center text-2xl mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-black leading-tight">{title}</h3>
        <p className="text-black opacity-75 font-light leading-relaxed">{description}</p>
        
        {/* Bottom accent */}
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-[#cc4b24] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      </CardContent>
    </Card>
  )
}

export function TalentSection() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-16 md:py-24 bg-white relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          {/* Elegant title styling matching ProblemSection */}
          <div className="px-10 py-6 rounded-3xl inline-block mb-6">
            <h2 className="text-3xl md:text-4xl text-black font-semibold tracking-tight">{t("talent.title")}</h2>
          </div>
          <p className="text-xl text-black font-light leading-relaxed max-w-3xl mx-auto opacity-80">{t("talent.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <TalentTile icon="📊" title={t("talent.purpose.title")} description={t("talent.purpose.description")} />
          <TalentTile icon="⚡" title={t("talent.ai.title")} description={t("talent.ai.description")} />
          <TalentTile icon="💰" title={t("talent.outcome.title")} description={t("talent.outcome.description")} />
          <TalentTile icon="🎯" title={t("talent.panel.title")} description={t("talent.panel.description")} />
        </div>

        <div className="flex justify-center">
          {/* Elegant CTA button matching the design system */}
          <Button
            size="lg"
            className="bg-white border-2 border-[#317039] text-black hover:border-[#f1be49] hover:text-[#cc4b24] font-medium shadow-lg hover:shadow-xl px-10 py-4 rounded-full transition-all duration-300 text-lg"
            asChild
          >
            <Link href="/apply">{t("talent.apply")}</Link>
          </Button>
        </div>
      </div>

      {/* Subtle decorative elements matching ProblemSection */}
      <div className="absolute top-20 right-10 w-px h-20 bg-gradient-to-b from-[#f1be49] to-transparent opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-px h-16 bg-gradient-to-t from-[#cc4b24] to-transparent opacity-15"></div>
      <div className="absolute top-1/2 right-4 w-1 h-8 bg-[#317039] rounded-full opacity-10"></div>
      <div className="absolute top-1/3 left-4 w-2 h-4 bg-[#f1be49] rounded-full opacity-15"></div>
    </section>
  )
}