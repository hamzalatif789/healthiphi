"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function MiniManifesto() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-12 md:py-24 bg-blue-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">{t("manifesto.title")}</h2>

          <div className="space-y-4 mb-8">
            <p className="text-lg">{t("manifesto.health")}</p>
            <p className="text-lg">{t("manifesto.ai")}</p>
            <p className="text-lg">{t("manifesto.data")}</p>
            <p className="text-lg">{t("manifesto.iceland")}</p>
          </div>

          <p className="text-xl font-bold mb-8">{t("manifesto.join")}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-800" asChild>
              <Link href="/founder">{t("manifesto.backLaunch")}</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/apply">{t("manifesto.joinTeam")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
