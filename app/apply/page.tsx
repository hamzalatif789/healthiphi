import { TalentApplicationForm } from "@/components/talent-application-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-[#f6ecdc] bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-[#317039] transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium text-black">Back to Healthiphi</span>
          </Link>
          <Link href="/" className="text-sm text-black opacity-60 font-light transition-colors">
            Apply later? Save & exit
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="bg-[#fefbea] px-10 py-8 rounded-3xl inline-block mb-8 border border-[#f6ecdc] shadow-sm">
            <h1 className="text-4xl md:text-5xl font-light text-black tracking-tight mb-4">
              Join the Healthiphi Team
            </h1>
            <div className="w-16 h-px bg-[#317039] mx-auto"></div>
          </div>
          
          <div className="space-y-4">
            <p className="text-xl text-black opacity-80 font-light leading-relaxed">
              Apply to be part of Iceland's health revolution.
            </p>
            
            <div className="bg-[#fff1d4] px-6 py-4 rounded-2xl border border-[#f6ecdc] inline-block">
              <p className="text-lg font-medium text-[#317039]">
                It takes just 10 minutes.
              </p>
            </div>
            
            <p className="text-sm text-black opacity-60 font-light mt-4">
              No CV required — just five quick questions.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <TalentApplicationForm />
      </main>

      {/* Subtle decorative elements */}
      <div className="absolute top-32 left-8 w-px h-12 bg-gradient-to-b from-[#317039] to-transparent opacity-20"></div>
      <div className="absolute bottom-32 right-8 w-px h-16 bg-gradient-to-t from-[#cc4b24] to-transparent opacity-15"></div>
      <div className="absolute top-1/4 right-16 w-1 h-6 bg-[#317039] rounded-full opacity-10"></div>
      <div className="absolute bottom-1/4 left-16 w-2 h-4 bg-[#cc4b24] rounded-full opacity-15"></div>
    </div>
  )
}