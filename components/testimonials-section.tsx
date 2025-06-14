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
    <section className="w-full py-12 md:py-24 bg-cream-100">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section title */}
        <div className="text-center mb-12">
          <div className="bg-cream-50 px-6 py-3 rounded-xl inline-block border border-cream-200">
            <h2 className="text-3xl font-bold text-forest-800">{t("testimonials.title")}</h2>
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Soft White card background */}
          <Card className="bg-cream-50 border-cream-200 shadow-lg">
            <CardContent className="p-8">
              <div className="flex justify-center mb-6">
                {/* Golden circle for avatar */}
                <div className="h-16 w-16 rounded-full bg-golden-500 flex items-center justify-center text-2xl border-2 border-forest-500 shadow-sm">
                  {testimonials[currentIndex].isPatient ? "👤" : "👩‍⚕️"}
                </div>
              </div>

              <blockquote className="text-xl md:text-2xl text-center mb-6 text-forest-800">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              <div className="text-center">
                <p className="font-bold text-forest-800">{testimonials[currentIndex].name}</p>
                <p className="text-forest-600">{testimonials[currentIndex].role}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-6 space-x-2">
            {/* Forest green navigation buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full bg-forest-500 text-white border-forest-600 hover:bg-forest-600 shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Golden indicator dots */}
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className={`w-3 h-3 rounded-full p-0 ${
                  index === currentIndex
                    ? "bg-golden-500 border-golden-600"
                    : "bg-cream-200 border-cream-300 hover:bg-cream-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full bg-forest-500 text-white border-forest-600 hover:bg-forest-600 shadow-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
