"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { CardElement } from "./card-element"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function FounderSignupForm() {
  const { t } = useLanguage()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    seats: 1,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string | number) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSliderChange = (value: number[]) => {
    setFormState((prev) => ({ ...prev, seats: value[0] }))
  }

  const handleSeatsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= 20) {
      setFormState((prev) => ({ ...prev, seats: value }))
    }
  }

  const getPrice = () => {
    if (formState.seats === 1) return 29
    return 29 + (formState.seats - 1) * 20
  }

  const getPlanName = () => {
    if (formState.seats === 1) return "Solo"
    if (formState.seats <= 4) return "Duo/Family"
    if (formState.seats <= 10) return "Small Team"
    return "Community"
  }

  const isFormValid = () => {
    return formState.name.trim() && formState.email.trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid()) return

    setIsSubmitting(true)

    try {
      // In production, this would:
      // 1. Create a Stripe Setup Intent to vault the payment method
      // 2. Store the pledge in your database with status "pending"
      // 3. Send confirmation email
      // 4. Track analytics

      console.log("Founder pledge submitted:", {
        ...formState,
        monthlyAmount: getPrice(),
        planType: getPlanName(),
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to success page
      window.location.href = "/founder/success"
    } catch (error) {
      console.error("Submission error:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">Back to Healthiphi</span>
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Become a Healthiphi Founder</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Reserve your seats and help us reach our goal of 400 pledges to launch Iceland's health revolution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Seat Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Configure Your Founder Pass</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Number of Seats</span>
                  <div className="flex items-center">
                    <Input
                      type="number"
                      min={1}
                      max={20}
                      value={formState.seats}
                      onChange={handleSeatsInputChange}
                      className="w-16 mr-2"
                    />
                    <Badge variant="outline">{getPlanName()}</Badge>
                  </div>
                </div>
                <Slider
                  value={[formState.seats]}
                  min={1}
                  max={20}
                  step={1}
                  onValueChange={handleSliderChange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                  <span>20</span>
                </div>
              </div>

              <div className="p-4 bg-blue-100 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Monthly Total</span>
                  <span className="font-bold text-2xl">€{getPrice()}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  VAT included · Price locked for life · Cancel anytime before activation
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Founder Benefits Include:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Founder badge & 15% lifetime discount</span>
                  </li>
                  {formState.seats >= 5 && (
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Private onboarding webinar for your group</span>
                    </li>
                  )}
                  {formState.seats >= 10 && (
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Invite to our Blue Lagoon Longevity Day</span>
                    </li>
                  )}
                  {formState.seats >= 15 && (
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Name engraved on our launch wall & future clinic app</span>
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Signup Form */}
          <Card>
            <CardHeader>
              <CardTitle>Reserve Your Founder Pass</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formState.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="card">Payment Method</Label>
                    <CardElement />
                    <p className="text-sm text-muted-foreground">
                      Your card will be securely vaulted but not charged until we reach 400 pledges.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Zero-Risk Guarantee</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Card vaulted now, never charged until 400 pledges reached</li>
                    <li>• 7-day email notice before any charges</li>
                    <li>• Automatic refund if we don't reach our goal</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-800 text-lg py-6"
                  disabled={!isFormValid() || isSubmitting}
                >
                  {isSubmitting
                    ? "Processing Your Pledge..."
                    : `Reserve ${formState.seats} Seat${formState.seats > 1 ? "s" : ""} - €${getPrice()}/month`}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By pledging, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
