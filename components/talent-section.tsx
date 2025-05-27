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
    <Card>
      <CardContent className="p-6">
        <div className="text-2xl mb-2">{icon}</div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export function TalentSection() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("talent.title")}</h2>
          <p className="text-xl font-medium">{t("talent.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <TalentTile icon="📊" title={t("talent.purpose.title")} description={t("talent.purpose.description")} />
          <TalentTile icon="⚡" title={t("talent.ai.title")} description={t("talent.ai.description")} />
          <TalentTile icon="💰" title={t("talent.outcome.title")} description={t("talent.outcome.description")} />
          <TalentTile icon="🎯" title={t("talent.panel.title")} description={t("talent.panel.description")} />
        </div>

        <div className="flex justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-800" asChild>
            <Link href="/apply">{t("talent.apply")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
