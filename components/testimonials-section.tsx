"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface Testimonial {
  quote: string
  name: string
  role: string
  isPatient: boolean
}

export function TestimonialsSection() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      quote: t("testimonials.elin"),
      name: "Elín",
      role: "Tech Founder",
      isPatient: true,
    },
    {
      quote: t("testimonials.maria"),
      name: "María",
      role: "PHI Coach",
      isPatient: false,
    },
    {
      quote: t("testimonials.jon"),
      name: "Jón",
      role: "Software Engineer",
      isPatient: true,
    },
    {
      quote: t("testimonials.kristin"),
      name: "Kristín",
      role: "Family Physician",
      isPatient: false,
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="w-full py-12 md:py-24 bg-blue-50">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{t("testimonials.title")}</h2>

        <div className="relative max-w-3xl mx-auto">
          <Card className="bg-white">
            <CardContent className="p-8">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                  {testimonials[currentIndex].isPatient ? "👤" : "👩‍⚕️"}
                </div>
              </div>

              <blockquote className="text-xl md:text-2xl text-center mb-6">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              <div className="text-center">
                <p className="font-bold">{testimonials[currentIndex].name}</p>
                <p className="text-muted-foreground">{testimonials[currentIndex].role}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-6 space-x-2">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className={`w-2 h-2 rounded-full p-0 ${index === currentIndex ? "bg-blue-600" : "bg-gray-200"}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
