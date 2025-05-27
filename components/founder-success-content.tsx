"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowLeft, Share2, Users } from "lucide-react"
import Link from "next/link"

export function FounderSuccessContent() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join me as a Healthiphi Founder",
        text: "I just became a Healthiphi Founder! Join me in adding 10 healthy years to Iceland.",
        url: window.location.origin,
      })
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.origin)
    }
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-4xl font-bold text-green-800 mb-2">Welcome, Founder!</CardTitle>
            <p className="text-lg text-muted-foreground">Your pledge has been successfully submitted</p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <p className="text-lg">
                Thank you for becoming a <strong>Healthiphi Founder</strong>! You're now part of an exclusive group
                working to add 10 healthy years to Iceland.
              </p>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-800 mb-2">What happens next?</p>
                <div className="text-left space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600 font-bold">1.</span>
                    <span>Your payment method is securely vaulted (no charges yet)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600 font-bold">2.</span>
                    <span>You'll receive a confirmation email with your founder details</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600 font-bold">3.</span>
                    <span>We'll notify you when we reach 400 pledges (7 days before charging)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600 font-bold">4.</span>
                    <span>Launch day: Welcome to the future of healthcare!</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4 flex items-center justify-center">
                <Users className="h-5 w-5 mr-2" />
                Help Us Reach 400 Pledges Faster
              </h3>
              <p className="text-muted-foreground mb-4">
                Share your unique referral link and earn <strong>one free month</strong> for every successful referral
                (they get one too!).
              </p>
              <div className="p-3 bg-gray-100 rounded-lg mb-4 font-mono text-sm">
                https://healthiphi.com/?ref=founder-{Math.random().toString(36).substr(2, 8)}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="flex-1">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Homepage
                </Link>
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share with Friends
              </Button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Questions? Email us at{" "}
                <a href="mailto:founders@healthiphi.com" className="text-blue-600 hover:underline">
                  founders@healthiphi.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
