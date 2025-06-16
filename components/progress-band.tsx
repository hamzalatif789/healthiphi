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
    <section className="w-full py-12 md:py-16 bg-white relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center">
          {/* Elegant title styling matching design system */}
          <div className="bg-white border-2 border-[#317039] px-8 py-4 rounded-full mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#f1be49] group">
            <h3 className="text-xl font-medium text-black group-hover:text-[#cc4b24] transition-colors duration-300">
              Progress Dial:{" "}
              <span className="text-[#f1be49] font-semibold">
                {label} — {progress}%
              </span>
            </h3>
          </div>

          <div className="relative w-64 h-64 mb-8">
            {/* Background circle */}
            <div className="absolute inset-0 rounded-full border-8 border-[#f6ecdc] shadow-inner"></div>

            {/* Progress circle */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#fefbea" strokeWidth="8" />
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
                className="drop-shadow-sm"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#317039" />
                  <stop offset="50%" stopColor="#f1be49" />
                  <stop offset="100%" stopColor="#cc4b24" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center text with elegant styling */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#f1be49] px-6 py-3 rounded-2xl shadow-lg border-2 border-[#317039]">
                <span className="text-3xl font-semibold text-black">{progress}%</span>
              </div>
            </div>

            {/* Subtle decorative accents around the circle */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-[#f1be49] rounded-full opacity-40"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#cc4b24] rounded-full opacity-30"></div>
          </div>

          <div className="max-w-md text-center space-y-4">
            <p className="text-black opacity-80 font-light leading-relaxed">
              Share your unique link after checkout—every successful referral credits{" "}
              <span className="bg-[#f1be49] px-3 py-1 rounded-full text-black font-semibold shadow-sm">one free month</span> to
              both you <em>and</em> your friend.
            </p>

            <p className="text-black font-medium leading-relaxed">
              More seats, more momentum, more healthy years for Iceland. How many will you spark?
            </p>
          </div>
        </div>
      </div>

      {/* Subtle decorative elements matching the design system */}
      <div className="absolute top-16 left-10 w-px h-16 bg-gradient-to-b from-[#f1be49] to-transparent opacity-20"></div>
      <div className="absolute bottom-16 right-10 w-px h-12 bg-gradient-to-t from-[#cc4b24] to-transparent opacity-15"></div>
      <div className="absolute top-1/2 left-4 w-1 h-6 bg-[#317039] rounded-full opacity-10"></div>
      <div className="absolute top-1/3 right-4 w-2 h-3 bg-[#f1be49] rounded-full opacity-15"></div>
    </section>
  )
}