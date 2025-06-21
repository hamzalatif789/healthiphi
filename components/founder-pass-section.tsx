"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

export function FounderPassSection() {
  const { t } = useLanguage()
  const [seats, setSeats] = useState(1)

  const handleSliderChange = (value: number[]) => {
    setSeats(value[0])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= 20) {
      setSeats(value)
    }
  }

  const getPrice = () => {
    if (seats === 1) return 29
    return 29 + (seats - 1) * 20
  }

  const getPlanName = () => {
    if (seats === 1) return "Solo"
    if (seats <= 4) return "Duo/Family"
    if (seats <= 10) return "Small Team"
    return "Community"
  }

  return (
    <section className="w-full py-16 md:py-24 bg-white relative">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section header with luxury spa styling */}
        <div className="text-center mb-16">
          <div className=" px-10 py-6 rounded-3xl inline-block mb-6 border border-[#f6ecdc] shadow-sm">
            <h2 className="text-3xl md:text-4xl font-light text-black tracking-tight">{t("founder.title")}</h2>
          </div>
          <p className="text-xl text-black max-w-3xl mx-auto font-light leading-relaxed opacity-80">
            {t("founder.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Card - Clean white with subtle accents */}
          <Card className="bg-white border-[#f6ecdc] shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-6">
              <CardTitle className="text-black font-light text-2xl tracking-tight">
                {t("founder.pickSeats")}
              </CardTitle>
              <div className="w-12 h-px bg-[#f1be49] mt-4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-4">
                    <span className="text-black font-medium">{t("founder.seats")}</span>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        value={seats}
                        onChange={handleInputChange}
                        className="w-16 border-[#f6ecdc] bg-[#fefbea] focus:border-[#f1be49] focus:ring-[#f1be49] text-center"
                      />
                      <Badge className="bg-[#f1be49] text-black border-[#f1be49] font-medium px-3 py-1 rounded-full">
                        {getPlanName()}
                      </Badge>
                    </div>
                  </div>
                  <Slider
                    value={[seats]}
                    min={1}
                    max={20}
                    step={1}
                    onValueChange={handleSliderChange}
                    className="[&_[role=slider]]:bg-[#f1be49] [&_[role=slider]]:border-[#317039] [&_.slider-track]:bg-[#f6ecdc] [&_.slider-range]:bg-[#f1be49]"
                  />
                  <div className="flex justify-between text-sm text-black opacity-60 mt-3">
                    <span>1</span>
                    <span>5</span>
                    <span>10</span>
                    <span>15</span>
                    <span>20</span>
                  </div>
                </div>

                {/* Price highlight box with luxury styling */}
                <div className="bg-[#fefbea] border-2 border-[#f1be49] p-6 rounded-2xl shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-black">{t("founder.totalMonthly")}</span>
                    <span className="font-light text-3xl text-black">€{getPrice()}</span>
                  </div>
                  <p className="text-sm text-black opacity-75">{t("founder.vatIncluded")}</p>
                </div>

                <div className="bg-[#fff1d4] p-5 rounded-xl border border-[#f6ecdc]">
                  <h4 className="font-medium mb-3 text-black">{t("founder.whoFits")}</h4>
                  <p className="text-black opacity-80 font-light leading-relaxed">
                    {seats === 1 && t("founder.solo")}
                    {seats > 1 && seats <= 4 && t("founder.family")}
                    {seats > 4 && seats <= 10 && t("founder.team")}
                    {seats > 10 && t("founder.community")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Card - Clean white with elegant features */}
          <Card className="bg-white border-[#f6ecdc] shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-6">
              <CardTitle className="text-black font-light text-2xl tracking-tight">
                {t("founder.rewards")}
              </CardTitle>
              <div className="w-12 h-px bg-[#cc4b24] mt-4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-[#317039] text-white text-sm font-medium shadow-sm">
                      ✓
                    </div>
                    <span className="text-black font-light leading-relaxed">{t("founder.badge")}</span>
                  </li>
                  {seats >= 5 && (
                    <li className="flex items-start">
                      <div className="mr-4 mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-[#317039] text-white text-sm font-medium shadow-sm">
                        ✓
                      </div>
                      <span className="text-black font-light leading-relaxed">{t("founder.webinar")}</span>
                    </li>
                  )}
                  {seats >= 10 && (
                    <li className="flex items-start">
                      <div className="mr-4 mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-[#317039] text-white text-sm font-medium shadow-sm">
                        ✓
                      </div>
                      <span className="text-black font-light leading-relaxed">{t("founder.blueLagoon")}</span>
                    </li>
                  )}
                  {seats >= 15 && (
                    <li className="flex items-start">
                      <div className="mr-4 mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-[#317039] text-white text-sm font-medium shadow-sm">
                        ✓
                      </div>
                      <span className="text-black font-light leading-relaxed">{t("founder.engraved")}</span>
                    </li>
                  )}
                </ul>

                {/* Guarantee box with elegant styling */}
                <div className="bg-[#fefbea] p-6 rounded-2xl border border-[#f6ecdc] shadow-sm">
                  <h4 className="font-medium mb-4 text-black">{t("founder.zeroRisk")}</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-white border-2 border-[#f1be49] text-[#317039] text-xs font-medium">
                        ✓
                      </div>
                      <span className="text-black font-light text-sm leading-relaxed">{t("founder.cardVaulted")}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-white border-2 border-[#f1be49] text-[#317039] text-xs font-medium">
                        ✓
                      </div>
                      <span className="text-black font-light text-sm leading-relaxed">{t("founder.sevenDay")}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-white border-2 border-[#f1be49] text-[#317039] text-xs font-medium">
                        ✓
                      </div>
                      <span className="text-black font-light text-sm leading-relaxed">{t("founder.failSafe")}</span>
                    </li>
                  </ul>
                </div>

                {/* Luxury CTA Button */}
                <Button
                  className="w-full bg-[#317039] hover:bg-[#2a5f31] text-white font-medium py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#f1be49] group"
                  asChild
                >
                  <Link href="/founder">
                    <span className="group-hover:text-[#f1be49] transition-colors duration-300">
                      {t("founder.reserveSeats")}
                    </span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute top-24 left-8 w-px h-16 bg-gradient-to-b from-[#f1be49] to-transparent opacity-20"></div>
      <div className="absolute bottom-24 right-8 w-px h-20 bg-gradient-to-t from-[#cc4b24] to-transparent opacity-15"></div>
      <div className="absolute top-1/3 right-12 w-2 h-8 bg-[#317039] rounded-full opacity-10"></div>
      <div className="absolute bottom-1/3 left-12 w-1 h-6 bg-[#f1be49] rounded-full opacity-15"></div>
    </section>
  )
}