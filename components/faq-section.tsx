"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLanguage } from "@/lib/language-context"

export function FaqSection() {
  const { t } = useLanguage()

  const faqs = [
    {
      question: t("faq.why400.question"),
      answer: t("faq.why400.answer"),
    },
    {
      question: t("faq.charged.question"),
      answer: t("faq.charged.answer"),
    },
    {
      question: t("faq.data.question"),
      answer: t("faq.data.answer"),
    },
    {
      question: t("faq.different.question"),
      answer: t("faq.different.answer"),
    },
    {
      question: t("faq.cancel.question"),
      answer: t("faq.cancel.answer"),
    },
    {
      question: t("faq.qualifications.question"),
      answer: t("faq.qualifications.answer"),
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-white relative">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Elegant title styling matching design system */}
        <div className="text-center mb-16">
          <div className="px-10 py-6 rounded-3xl inline-block mb-6">
            <h2 className="text-3xl md:text-4xl text-black font-semibold tracking-tight">{t("faq.title")}</h2>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="multiple" className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="bg-white border-[#f6ecdc] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2 relative group"
              >
                {/* Subtle decorative accent */}
                {/* <div className="absolute top-4 right-6 w-1 h-6 bg-[#f1be49] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div> */}
                
                <AccordionTrigger className="text-left font-medium text-black hover:text-[#cc4b24] transition-colors duration-300 py-6 pr-8 text-lg leading-relaxed hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-black opacity-80 font-light leading-relaxed pb-6 pt-2 text-base">
                  {faq.answer}
                </AccordionContent>
                
                {/* Bottom decorative accent */}
                {/* <div className="absolute bottom-4 left-6 w-2 h-2 bg-[#cc4b24] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div> */}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Subtle decorative elements matching the design system */}
      <div className="absolute top-20 right-10 w-px h-20 bg-gradient-to-b from-[#f1be49] to-transparent opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-px h-16 bg-gradient-to-t from-[#cc4b24] to-transparent opacity-15"></div>
      <div className="absolute top-1/2 right-4 w-1 h-8 bg-[#317039] rounded-full opacity-10"></div>
      <div className="absolute top-1/3 left-4 w-2 h-4 bg-[#f1be49] rounded-full opacity-15"></div>
    </section>
  )
}