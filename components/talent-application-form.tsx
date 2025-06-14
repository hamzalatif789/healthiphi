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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle2 } from "lucide-react"

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
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

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
    // Clear any previous errors
    if (submitError) setSubmitError(null)
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const formatTimeLeft = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    if (minutes > 0) {
      return `≈ ${minutes} min left`
    }
    return `≈ ${remainingSeconds} sec left`
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isFormValid = () => {
    return (
      formState.name.trim().length >= 2 &&
      formState.email.trim() &&
      validateEmail(formState.email) &&
      formState.profession &&
      formState.motivation.trim().length >= 20
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form before submitting
    const newErrors: Record<string, string> = {}

    if (!formState.name.trim()) {
      newErrors.name = 'Full name is required'
    } else if (formState.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters'
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formState.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formState.profession) {
      newErrors.profession = 'Please select your profession'
    }

    if (!formState.motivation.trim()) {
      newErrors.motivation = 'Please tell us why you want to join'
    } else if (formState.motivation.trim().length < 20) {
      newErrors.motivation = 'Please provide at least 20 characters'
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors)
      setSubmitError('Please fix the errors above before submitting')
      return
    }

    if (!isFormValid()) return

    setIsSubmitting(true)
    setSubmitError(null)
    setFieldErrors({})

    try {
      // Prepare data according to your backend schema
      const submitData = {
        full_name: formState.name.trim(),
        email: formState.email.trim(),
        profession: formState.profession,
        years_experience: formState.experience,
        reason: formState.motivation.trim(),
      }

      console.log("Submitting data:", submitData)

      const response = await fetch(`/api/join-team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`)
      }

      if (result.success) {
        // Track analytics
        if (typeof window !== "undefined") {
          console.log("Analytics: form_submit", {
            timeToComplete: 600 - timeLeft,
            profession: formState.profession,
          })
        }

        setSubmitSuccess(true)

        // Redirect to success page after a short delay
        setTimeout(() => {
          router.push("/apply/success")
        }, 2000)
      } else {
        throw new Error(result.error || 'Submission failed')
      }

    } catch (error) {
      console.error("Submission error:", error)

      // Set user-friendly error message
      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          setSubmitError("Unable to connect to server. Please check your connection and try again.")
        } else if (error.message.includes('Invalid data')) {
          setSubmitError("Please check your form data and try again.")
        } else {
          setSubmitError(error.message || "An unexpected error occurred. Please try again.")
        }
      } else {
        setSubmitError("An unexpected error occurred. Please try again.")
      }

      setIsSubmitting(false)
    }
  }
  return (
    <Card className="w-full bg-cream-50">
      <CardHeader>
        <CardTitle className="text-2xl">Application Form</CardTitle>
        {formStarted && <p className="text-sm text-muted-foreground">{formatTimeLeft(timeLeft)}</p>}
      </CardHeader>
      <CardContent>
        {/* Status Messages */}
        {submitError && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {submitError}
            </AlertDescription>
          </Alert>
        )}

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
              className={`text-lg ${fieldErrors.name ? 'border-red-300 bg-red-50' : ''}`}
              disabled={isSubmitting}
            />
            {fieldErrors.name && (
              <p className="text-red-600 text-sm">{fieldErrors.name}</p>
            )}
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
              className={`text-lg ${fieldErrors.email ? 'border-red-300 bg-red-50' : ''}`}
              disabled={isSubmitting}
            />
            {fieldErrors.email && (
              <p className="text-red-600 text-sm">{fieldErrors.email}</p>
            )}
          </div>

          {/* Profession */}
          <div className="space-y-2">
            <Label htmlFor="profession">Profession *</Label>
            <Select
              value={formState.profession}
              onValueChange={(value) => handleInputChange("profession", value)}
              onOpenChange={handleFirstInteraction}
              disabled={isSubmitting}
            >
              <SelectTrigger className={`text-lg ${fieldErrors.profession ? 'border-red-300 bg-red-50' : ''}`}>
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
            {fieldErrors.profession && (
              <p className="text-red-600 text-sm">{fieldErrors.profession}</p>
            )}
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
                disabled={isSubmitting}
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
              className={`text-lg resize-none ${fieldErrors.motivation ? 'border-red-300 bg-red-50' : ''}`}
              placeholder="Tell us what motivates you to be part of Iceland's health revolution..."
              disabled={isSubmitting}
              maxLength={500}
            />
            {fieldErrors.motivation && (
              <p className="text-red-600 text-sm">{fieldErrors.motivation}</p>
            )}
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Minimum 20 characters</span>
              <span className={formState.motivation.length >= 20 ? "text-emerald-600" : ""}>
                {formState.motivation.length}/500
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-6"
            disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? "Submitting Application..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}