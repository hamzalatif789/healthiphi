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
    <section className="w-full py-8 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4">
            Progress Dial:{" "}
            <span className="text-blue-600">
              {label} — {progress}%
            </span>
          </h3>

          <div className="relative w-64 h-64">
            {/* Background circle */}
            <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>

            {/* Progress circle */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#e6e6e6" strokeWidth="8" />
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
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{progress}%</span>
            </div>
          </div>

          <p className="text-center mt-6 max-w-md text-muted-foreground">
            Share your unique link after checkout—every successful referral credits <strong>one free month</strong> to
            both you <em>and</em> your friend.
          </p>

          <p className="text-center mt-2 font-medium">
            More seats, more momentum, more healthy years for Iceland. How many will you spark?
          </p>
        </div>
      </div>
    </section>
  )
}
