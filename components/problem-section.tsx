"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

interface FlipCardProps {
  title: string
  description: string
  stats: string
}

function FlipCard({ title, description, stats }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="relative h-64 w-full perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front */}
        <Card className="absolute w-full h-full backface-hidden">
          <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </CardContent>
        </Card>

        {/* Back */}
        <Card className="absolute w-full h-full backface-hidden rotate-y-180 bg-blue-50">
          <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
            <p className="text-2xl font-bold">{stats}</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export function ProblemSection() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{t("problem.title")}</h2>

        <div className="text-center mb-8">
          <p className="text-xl">{t("problem.subtitle")}</p>
          <p className="text-2xl font-bold mt-4">{t("problem.solution")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <FlipCard
            title={t("problem.ai.title")}
            description={t("problem.ai.description")}
            stats={t("problem.ai.stats")}
          />
          <FlipCard
            title={t("problem.federated.title")}
            description={t("problem.federated.description")}
            stats={t("problem.federated.stats")}
          />
          <FlipCard
            title={t("problem.safeguards.title")}
            description={t("problem.safeguards.description")}
            stats={t("problem.safeguards.stats")}
          />
        </div>
      </div>
    </section>
  )
}
