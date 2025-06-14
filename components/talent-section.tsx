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
    <Card className="bg-cream-50 border-cream-200 hover:bg-cream-100 hover:border-golden-300 transition-all duration-300 shadow-md hover:shadow-lg">
      <CardContent className="p-6">
        {/* Golden circle for icon */}
        <div className="w-12 h-12 bg-golden-500 rounded-full flex items-center justify-center text-2xl mb-4 shadow-sm">
          {icon}
        </div>
        <h3 className="text-lg font-bold mb-2 text-forest-800">{title}</h3>
        <p className="text-forest-600">{description}</p>
      </CardContent>
    </Card>
  )
}

export function TalentSection() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-12 md:py-24 bg-golden-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          {/* Cream highlighted title */}
          <div className="bg-cream-100 px-6 py-3 rounded-xl inline-block mb-4 border border-cream-200">
            <h2 className="text-3xl font-bold text-forest-800">{t("talent.title")}</h2>
          </div>
          <p className="text-xl font-medium text-forest-700">{t("talent.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <TalentTile icon="📊" title={t("talent.purpose.title")} description={t("talent.purpose.description")} />
          <TalentTile icon="⚡" title={t("talent.ai.title")} description={t("talent.ai.description")} />
          <TalentTile icon="💰" title={t("talent.outcome.title")} description={t("talent.outcome.description")} />
          <TalentTile icon="🎯" title={t("talent.panel.title")} description={t("talent.panel.description")} />
        </div>

        <div className="flex justify-center">
          {/* Primary Golden CTA */}
          <Button
            size="lg"
            className="bg-golden-500 hover:bg-golden-600 text-forest-800 font-semibold shadow-lg hover:shadow-xl px-8 transition-all duration-200"
            asChild
          >
            <Link href="/apply">{t("talent.apply")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
