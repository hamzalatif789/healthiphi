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
    <section className="w-full py-12 md:py-24 bg-cream-100">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="bg-cream-50 px-6 py-3 rounded-xl inline-block mb-4 border border-cream-200">
            <h2 className="text-3xl font-bold text-forest-800">{t("founder.title")}</h2>
          </div>
          <p className="text-lg text-forest-700 max-w-3xl mx-auto">{t("founder.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Card - Soft White background */}
          <Card className="bg-cream-50 border-cream-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-forest-800">{t("founder.pickSeats")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-forest-700">{t("founder.seats")}</span>
                    <div className="flex items-center">
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        value={seats}
                        onChange={handleInputChange}
                        className="w-16 mr-2 border-cream-300 bg-white"
                      />
                      {/* Golden badge */}
                      <Badge className="bg-golden-500 text-forest-800 border-golden-600 font-medium">
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
                    className="[&_[role=slider]]:bg-golden-500 [&_[role=slider]]:border-golden-600"
                  />
                  <div className="flex justify-between text-sm text-forest-600 mt-1">
                    <span>1</span>
                    <span>5</span>
                    <span>10</span>
                    <span>15</span>
                    <span>20</span>
                  </div>
                </div>

                {/* Price highlight box */}
                <div className="bg-golden-500 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-forest-800">{t("founder.totalMonthly")}</span>
                    <span className="font-bold text-2xl text-forest-800">€{getPrice()}</span>
                  </div>
                  <p className="text-sm text-forest-700">{t("founder.vatIncluded")}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-forest-800">{t("founder.whoFits")}</h4>
                  <p className="text-forest-600">
                    {seats === 1 && t("founder.solo")}
                    {seats > 1 && seats <= 4 && t("founder.family")}
                    {seats > 4 && seats <= 10 && t("founder.team")}
                    {seats > 10 && t("founder.community")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Card - Soft White background */}
          <Card className="bg-cream-50 border-cream-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-forest-800">{t("founder.rewards")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    {/* Forest green check circle */}
                    <div className="mr-3 mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-forest-500 text-white text-sm font-bold shadow-sm">
                      ✓
                    </div>
                    <span className="text-forest-700">{t("founder.badge")}</span>
                  </li>
                  {seats >= 5 && (
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-forest-500 text-white text-sm font-bold shadow-sm">
                        ✓
                      </div>
                      <span className="text-forest-700">{t("founder.webinar")}</span>
                    </li>
                  )}
                  {seats >= 10 && (
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-forest-500 text-white text-sm font-bold shadow-sm">
                        ✓
                      </div>
                      <span className="text-forest-700">{t("founder.blueLagoon")}</span>
                    </li>
                  )}
                  {seats >= 15 && (
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-forest-500 text-white text-sm font-bold shadow-sm">
                        ✓
                      </div>
                      <span className="text-forest-700">{t("founder.engraved")}</span>
                    </li>
                  )}
                </ul>

                {/* Guarantee box with cream background */}
                <div className="bg-cream-100 p-4 rounded-lg border border-cream-200">
                  <h4 className="font-medium mb-3 text-forest-800">{t("founder.zeroRisk")}</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-golden-500 text-forest-800 text-xs font-bold">
                        ✓
                      </div>
                      <span className="text-forest-700">{t("founder.cardVaulted")}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-golden-500 text-forest-800 text-xs font-bold">
                        ✓
                      </div>
                      <span className="text-forest-700">{t("founder.sevenDay")}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-golden-500 text-forest-800 text-xs font-bold">
                        ✓
                      </div>
                      <span className="text-forest-700">{t("founder.failSafe")}</span>
                    </li>
                  </ul>
                </div>

                {/* Primary Golden CTA */}
                <Button
                  className="w-full bg-golden-500 hover:bg-golden-600 text-forest-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  asChild
                >
                  <Link href="/founder">{t("founder.reserveSeats")}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
