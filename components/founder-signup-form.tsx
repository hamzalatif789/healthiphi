"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { loadStripe } from '@stripe/stripe-js'
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { CardElementstrip } from "./cardelementstripe"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

// Initialize Stripe with the correct environment variable name
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Inner form component that uses Stripe hooks
function FounderSignupFormInner() {
  const { t } = useLanguage()
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    seats: 1,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cardValid, setCardValid] = useState(false)
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    card: ""
  })
  const [stripeReady, setStripeReady] = useState(false)

  useEffect(() => {
    // Check when Stripe is fully loaded
    if (stripe && elements) {
      setStripeReady(true)
    }
  }, [stripe, elements])

  const handleInputChange = (field: string, value: string | number) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
    
    // Clear error when user types
    if (field === "name" && formErrors.name) {
      setFormErrors(prev => ({ ...prev, name: "" }))
    }
    if (field === "email" && formErrors.email) {
      setFormErrors(prev => ({ ...prev, email: "" }))
    }
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

  const handleCardChange = (isValid: boolean, error?: string) => {
    setCardValid(isValid)
    setFormErrors(prev => ({
      ...prev,
      card: error ? error : ""
    }))
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

  const validateForm = () => {
    const errors = {
      name: formState.name.trim() ? "" : "Full name is required",
      email: formState.email.trim() ? "" : "Email is required",
      card: cardValid ? "" : "Valid card details are required"
    }
    
    // Additional email validation
    if (formState.email.trim() && !/^\S+@\S+\.\S+$/.test(formState.email)) {
      errors.email = "Please enter a valid email address"
    }
    
    setFormErrors(errors)
    
    return !errors.name && !errors.email && !errors.card
  }

  const isFormValid = () => {
    return formState.name.trim() && formState.email.trim() && cardValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm() || !stripe || !elements) {
      return
    }

    setIsSubmitting(true)

    try {
      // First, create the pledge on your backend
      const response = await fetch('/api/pledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formState.name,
          email: formState.email,
          seats: formState.seats,
        }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to create pledge')
      }

      // Get the card element
      const cardElement = elements.getElement('card')
      if (!cardElement) {
        throw new Error('Card element not found')
      }

      // Confirm the SetupIntent with the payment method
      const { setupIntent, error: stripeError } = await stripe.confirmCardSetup(
        result.client_secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formState.name,
              email: formState.email,
            },
          },
        }
      )

      console.log("Stripe response:", { setupIntent })
      const {data : pledge_data, error : pledge_error} = await supabase.from('pledges')
        .update({
          stripe_setup_intent_id: setupIntent.id,
          stripe_payment_method_id: setupIntent.payment_method,
          payment_method_configuration_id:setupIntent.payment_method_configuration_details.id,
          is_charged: false,
          payment_method_types: setupIntent.payment_method_types,
        })
        .eq('id', result.pledge_id)

        console.log("Pledge update response:", { pledge_data, pledge_error })
      if (pledge_error) {
        throw new Error(pledge_error.message || 'Failed to update pledge with payment method')
      }
       
      if (stripeError) {
        throw new Error(stripeError.message || 'Payment setup failed')
      }

      // Redirect to success page with pledge details
      router.push(`/founder/success?pledge_id=${result.pledge_id}&customer_id=${result.customer_id || ''}&total_seats=${result.total_seats || 0}`)

    } catch (error) {
      console.error("Submission error:", error)
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      
      // Special handling for Stripe errors
      if (errorMessage.includes("card number")) {
        setFormErrors(prev => ({
          ...prev,
          card: "Please check your card details and try again"
        }))
      } else {
        alert(`Error: ${errorMessage}. Please try again or contact support if the problem persists.`)
      }
      
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 bg-[#ffffff]">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-800 transition-colors mb-8"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
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

              <div className="p-4 bg-papaya-100 rounded-lg">
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
                    <span className="text-emerald-600 mr-2">✓</span>
                    <span>Founder badge & 15% lifetime discount</span>
                  </li>
                  {formState.seats >= 5 && (
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2">✓</span>
                      <span>Private onboarding webinar for your group</span>
                    </li>
                  )}
                  {formState.seats >= 10 && (
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2">✓</span>
                      <span>Invite to our Blue Lagoon Longevity Day</span>
                    </li>
                  )}
                  {formState.seats >= 15 && (
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2">✓</span>
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
                    {formErrors.name && (
                      <p className="text-sm text-red-500 mt-1">
                        {formErrors.name}
                      </p>
                    )}
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
                    {formErrors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                   <div className="space-y-2">
                    <Label htmlFor="card" className="font-medium">
                      Payment Method *
                    </Label>
                    <CardElementstrip onCardChange={handleCardChange} />
                    <p className="text-sm text-muted-foreground mt-2">
                      Your card will be securely saved but not charged until we reach 400 pledges.
                    </p>
                    {formErrors.card && (
                      <p className="text-sm text-red-500 mt-1">
                        {formErrors.card}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-cream-100 rounded-lg">
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
                  className="w-full bg-emerald-600 hover:bg-emerald-800 text-lg py-6"
                  disabled={!isFormValid() || isSubmitting || !stripeReady}
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

// Main component wrapped with Elements provider
export function FounderSignupForm() {
  return (
    <Elements stripe={stripePromise}>
      <FounderSignupFormInner />
    </Elements>
  )
}