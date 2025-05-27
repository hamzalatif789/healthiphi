"use client"

import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "./language-switcher"
import Link from "next/link"

export function Header() {
  const { t } = useLanguage()

  return (
    <header className="w-full border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="text-xl font-bold text-gray-900">{t("header.logo")}</span>
        </Link>

        {/* Language Switcher */}
        <LanguageSwitcher />
      </div>
    </header>
  )
}
