import { TalentApplicationForm } from "@/components/talent-application-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Healthiphi</span>
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Apply later? Save & exit
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join the Healthiphi Team</h1>
          <p className="text-xl text-muted-foreground mb-2">Apply to be part of Iceland's health revolution.</p>
          <p className="text-lg font-medium text-blue-600">It takes just 10 minutes.</p>
          <p className="text-sm text-muted-foreground mt-2">No CV required — just five quick questions.</p>
        </div>

        {/* Application Form */}
        <TalentApplicationForm />
      </main>
    </div>
  )
}
