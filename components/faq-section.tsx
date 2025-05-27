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
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{t("faq.title")}</h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="multiple" className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
