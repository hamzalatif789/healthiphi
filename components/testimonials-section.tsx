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
    <section className="w-full py-16 md:py-24 bg-white relative">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section title with elegant styling */}
        <div className="text-center mb-16">
          <div className="px-10 py-6 rounded-3xl inline-block mb-6">
            <h2 className="text-3xl md:text-4xl text-black font-semibold tracking-tight">{t("testimonials.title")}</h2>
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Elegant testimonial card */}
          <Card className="bg-white border-[#f6ecdc] shadow-lg hover:shadow-xl transition-all duration-300 relative">
            <CardContent className="p-12 relative">
              {/* Subtle decorative accents */}
              <div className="absolute top-6 left-6 w-2 h-8 bg-[#f1be49] rounded-full opacity-30"></div>
              <div className="absolute bottom-6 right-6 w-1 h-6 bg-[#cc4b24] rounded-full opacity-20"></div>
              
              <div className="flex justify-center mb-8">
                {/* Golden circle for avatar */}
                <div className="h-16 w-16 rounded-full bg-[#f1be49] flex items-center justify-center text-2xl border-2 border-[#317039] shadow-lg">
                  {testimonials[currentIndex].isPatient ? "👤" : "👩‍⚕️"}
                </div>
              </div>

              <blockquote className="text-xl md:text-2xl text-center mb-8 text-black font-light leading-relaxed italic">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              <div className="text-center">
                <p className="font-semibold text-black text-lg">{testimonials[currentIndex].name}</p>
                <p className="text-black opacity-75 font-light">{testimonials[currentIndex].role}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-8 space-x-3">
            {/* Elegant navigation buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full bg-white border-2 border-[#317039] text-black hover:border-[#f1be49] hover:text-[#cc4b24] shadow-lg hover:shadow-xl transition-all duration-300 w-12 h-12"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Golden indicator dots */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className={`w-3 h-3 rounded-full p-0 transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[#f1be49] border-[#f1be49] shadow-sm"
                      : "bg-white border-[#f6ecdc] hover:bg-[#fefbea] hover:border-[#f1be49]"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full bg-white border-2 border-[#317039] text-black hover:border-[#f1be49] hover:text-[#cc4b24] shadow-lg hover:shadow-xl transition-all duration-300 w-12 h-12"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle decorative elements matching the design system */}
      <div className="absolute top-20 left-10 w-px h-20 bg-gradient-to-b from-[#f1be49] to-transparent opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-px h-16 bg-gradient-to-t from-[#cc4b24] to-transparent opacity-15"></div>
      <div className="absolute top-1/2 left-4 w-1 h-8 bg-[#317039] rounded-full opacity-10"></div>
      <div className="absolute top-1/3 right-4 w-2 h-4 bg-[#f1be49] rounded-full opacity-15"></div>
    </section>
  )
}