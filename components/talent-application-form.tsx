"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useRouter } from "next/navigation"

const professions = [
  "Physician",
  "Nurse",
  "Health Coach",
  "Physiotherapist",
  "Nutritionist",
  "Mental Health Counselor",
  "Medical Researcher",
  "Healthcare Administrator",
  "Other Healthcare Professional",
]

export function TalentApplicationForm() {
  const router = useRouter()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    profession: "",
    experience: 5,
    motivation: "",
  })

  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [formStarted, setFormStarted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Start timer when user first interacts with form
  const handleFirstInteraction = () => {
    if (!formStarted) {
      setFormStarted(true)
      // Track analytics event
      if (typeof window !== "undefined") {
        console.log("Analytics: form_start")
      }
    }
  }

  // Timer countdown
  useEffect(() => {
    if (!formStarted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [formStarted])

  const handleInputChange = (field: string, value: string | number) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
    handleFirstInteraction()
  }

  const formatTimeLeft = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    if (minutes > 0) {
      return `≈ ${minutes} min left`
    }
    return `≈ ${remainingSeconds} sec left`
  }

  const isFormValid = () => {
    return (
      formState.name.trim() &&
      formState.email.trim() &&
      formState.profession &&
      formState.motivation.trim().length >= 50
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid()) return

    setIsSubmitting(true)

    try {
      // In production, this would submit to your API
      console.log("Form submitted:", formState)

      // Track analytics
      if (typeof window !== "undefined") {
        console.log("Analytics: form_submit", {
          timeToComplete: 600 - timeLeft,
          profession: formState.profession,
        })
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to success page
      router.push("/apply/success")
    } catch (error) {
      console.error("Submission error:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Application Form</CardTitle>
        {formStarted && <p className="text-sm text-muted-foreground">{formatTimeLeft(timeLeft)}</p>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formState.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              onFocus={handleFirstInteraction}
              required
              className="text-lg"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formState.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onFocus={handleFirstInteraction}
              required
              className="text-lg"
            />
          </div>

          {/* Profession */}
          <div className="space-y-2">
            <Label htmlFor="profession">Profession *</Label>
            <Select
              value={formState.profession}
              onValueChange={(value) => handleInputChange("profession", value)}
              onOpenChange={handleFirstInteraction}
            >
              <SelectTrigger className="text-lg">
                <SelectValue placeholder="Select your profession" />
              </SelectTrigger>
              <SelectContent>
                {professions.map((profession) => (
                  <SelectItem key={profession} value={profession}>
                    {profession}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">e.g., Physician, Nurse, Health Coach</p>
          </div>

          {/* Years of Experience */}
          <div className="space-y-4">
            <Label htmlFor="experience">Years of Experience *</Label>
            <div className="px-2">
              <Slider
                id="experience"
                min={0}
                max={30}
                step={1}
                value={[formState.experience]}
                onValueChange={(value) => handleInputChange("experience", value[0])}
                onPointerDown={handleFirstInteraction}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>0</span>
                <span className="font-medium text-lg text-foreground">{formState.experience} years</span>
                <span>30+</span>
              </div>
            </div>
          </div>

          {/* Motivation */}
          <div className="space-y-2">
            <Label htmlFor="motivation">Why do you want to join Healthiphi? *</Label>
            <Textarea
              id="motivation"
              value={formState.motivation}
              onChange={(e) => handleInputChange("motivation", e.target.value)}
              onFocus={handleFirstInteraction}
              required
              rows={4}
              className="text-lg resize-none"
              placeholder="Tell us what motivates you to be part of Iceland's health revolution..."
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Minimum 50 characters</span>
              <span className={formState.motivation.length >= 50 ? "text-green-600" : ""}>
                {formState.motivation.length}/500
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-800 text-lg py-6"
            disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? "Submitting Application..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
