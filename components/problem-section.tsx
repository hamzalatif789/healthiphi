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
      className="relative h-72 w-full perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front - Clean white card with subtle accents */}
        <Card className="absolute w-full h-full backface-hidden bg-white border-[#f6ecdc] shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center relative">
            {/* <div className="absolute top-4 left-4 w-2 h-8 bg-[#f1be49] rounded-full opacity-30"></div> */}
            <h3 className="text-xl font-light mb-4 text-black leading-tight">{title}</h3>
            <p className="text-black opacity-75 font-light leading-relaxed">{description}</p>
            {/* <div className="absolute bottom-4 right-4 w-1 h-4 bg-[#cc4b24] rounded-full opacity-20"></div> */}
          </CardContent>
        </Card>

        {/* Back - Desert sand background with elegant stats */}
        <Card className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#fefbea] border-[#f6ecdc] shadow-lg">
          <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center relative">
            <div className="bg-white border-2 border-[#f1be49] text-black px-8 py-6 rounded-2xl shadow-sm">
              <p className="text-3xl font-light">{stats}</p>
            </div>
            {/* <div className="absolute top-6 right-6 w-3 h-3 bg-[#f1be49] rounded-full opacity-40"></div> */}
            {/* <div className="absolute bottom-6 left-6 w-2 h-2 bg-[#cc4b24] rounded-full opacity-30"></div> */}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export function ProblemSection() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-16 md:py-24 bg-white relative">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section header with luxury spa styling */}
        <div className="text-center mb-16">
          <div className=" px-10 py-6 rounded-3xl inline-block mb-6 ">
            <h2 className="text-3xl md:text-4xl  text-black font-semibold tracking-tight">{t("problem.title")}</h2>
          </div>
        </div>

        <div className="text-center mb-12">
          <p className="text-xl text-black mb-8 font-light leading-relaxed max-w-3xl mx-auto opacity-80">
            {t("problem.subtitle")}
          </p>
          
          {/* Elegant solution highlight */}
          <div className="bg-white border-2 border-[#317039] text-black px-10 py-4 rounded-full inline-block font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#f1be49] group">
            <p className="text-2xl font-light group-hover:text-[#cc4b24] transition-colors duration-300">
              {t("problem.solution")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 text-black md:grid-cols-3 gap-8 mt-16">
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

      {/* Subtle decorative elements */}
      <div className="absolute top-20 left-10 w-px h-20 bg-gradient-to-b from-[#f1be49] to-transparent opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-px h-16 bg-gradient-to-t from-[#cc4b24] to-transparent opacity-15"></div>
      <div className="absolute top-1/2 left-4 w-1 h-8 bg-[#317039] rounded-full opacity-10"></div>
      <div className="absolute top-1/3 right-4 w-2 h-4 bg-[#f1be49] rounded-full opacity-15"></div>
    </section>
  )
}