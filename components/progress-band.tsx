"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"

export function ProgressBand() {
  const { t } = useLanguage()
  const [progress, setProgress] = useState(43)
  const [label, setLabel] = useState("Ignition Ready")

  useEffect(() => {
    if (progress < 25) {
      setLabel(t("progress.warming"))
    } else if (progress < 50) {
      setLabel(t("progress.ignition"))
    } else if (progress < 75) {
      setLabel(t("progress.forming"))
    } else {
      setLabel(t("progress.imminent"))
    }
  }, [progress, t])

  return (
    <section className="w-full py-8 bg-golden-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center">
          {/* Title with cream highlight */}
          <div className="bg-cream-100 px-6 py-2 rounded-xl mb-6 border border-cream-200">
            <h3 className="text-xl font-bold text-forest-800">
              Progress Dial:{" "}
              <span className="text-golden-600">
                {label} — {progress}%
              </span>
            </h3>
          </div>

          <div className="relative w-64 h-64">
            {/* Background circle - Cream */}
            <div className="absolute inset-0 rounded-full border-8 border-cream-200"></div>

            {/* Progress circle */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#f8edd9" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeDasharray={`${progress * 2.89} 289`}
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#317039" />
                  <stop offset="50%" stopColor="#f1be49" />
                  <stop offset="100%" stopColor="#cc4a25" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center text with golden highlight */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-golden-500 px-4 py-2 rounded-full shadow-sm">
                <span className="text-3xl font-bold text-forest-800">{progress}%</span>
              </div>
            </div>
          </div>

          <p className="text-center mt-6 max-w-md text-forest-700">
            Share your unique link after checkout—every successful referral credits{" "}
            <span className="bg-golden-500 px-2 py-1 rounded text-forest-800 font-semibold">one free month</span> to
            both you <em>and</em> your friend.
          </p>

          <p className="text-center mt-2 font-medium text-forest-800">
            More seats, more momentum, more healthy years for Iceland. How many will you spark?
          </p>
        </div>
      </div>
    </section>
  )
}
