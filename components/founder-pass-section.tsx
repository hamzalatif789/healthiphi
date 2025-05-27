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

  const getPerks = () => {
    const perks = [t("founder.perk1")]

    if (seats >= 5) perks.push(t("founder.perk2"))
    if (seats >= 10) perks.push(t("founder.perk3"))
    if (seats >= 15) perks.push(t("founder.perk4"))

    return perks
  }

  return (
    <section className="w-full py-12 md:py-24 bg-blue-50">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">{t("founder.title")}</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">{t("founder.subtitle")}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle>{t("founder.pickSeats")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>{t("founder.seats")}</span>
                    <div className="flex items-center">
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        value={seats}
                        onChange={handleInputChange}
                        className="w-16 mr-2"
                      />
                      <Badge variant="outline">{getPlanName()}</Badge>
                    </div>
                  </div>
                  <Slider value={[seats]} min={1} max={20} step={1} onValueChange={handleSliderChange} />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>1</span>
                    <span>5</span>
                    <span>10</span>
                    <span>15</span>
                    <span>20</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-100 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{t("founder.totalMonthly")}</span>
                    <span className="font-bold text-xl">€{getPrice()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t("founder.vatIncluded")}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">{t("founder.whoFits")}</h4>
                  <p className="text-muted-foreground">
                    {seats === 1 && t("founder.solo")}
                    {seats > 1 && seats <= 4 && t("founder.family")}
                    {seats > 4 && seats <= 10 && t("founder.team")}
                    {seats > 10 && t("founder.community")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("founder.rewards")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      ✓
                    </div>
                    <span>{t("founder.badge")}</span>
                  </li>
                  {seats >= 5 && (
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        ✓
                      </div>
                      <span>{t("founder.webinar")}</span>
                    </li>
                  )}
                  {seats >= 10 && (
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        ✓
                      </div>
                      <span>{t("founder.blueLagoon")}</span>
                    </li>
                  )}
                  {seats >= 15 && (
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        ✓
                      </div>
                      <span>{t("founder.engraved")}</span>
                    </li>
                  )}
                </ul>

                <div className="p-4 bg-blue-100 rounded-lg mt-6">
                  <h4 className="font-medium mb-2">{t("founder.zeroRisk")}</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-blue-200 text-blue-600 text-xs">
                        ✓
                      </div>
                      <span>{t("founder.cardVaulted")}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-blue-200 text-blue-600 text-xs">
                        ✓
                      </div>
                      <span>{t("founder.sevenDay")}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-blue-200 text-blue-600 text-xs">
                        ✓
                      </div>
                      <span>{t("founder.failSafe")}</span>
                    </li>
                  </ul>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-800" asChild>
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
