"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  const handleLinkClick = () => {
    // Scroll to top when navigating to a new page
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="w-full py-6 bg-forest-500 text-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              {/* Golden logo circle */}
              <div className="h-8 w-8 rounded-full bg-golden-500 flex items-center justify-center shadow-sm">
                <span className="text-forest-800 font-bold">H</span>
              </div>
              <h3 className="text-xl font-bold">{t("header.logo")}</h3>
            </div>
            <p className="text-forest-100">Reykjavík, Iceland</p>
            <p className="text-forest-100 mt-4">{t("footer.tagline")}</p>
          </div>

          <div>
            <h4 className="font-medium mb-4">{t("footer.links")}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-forest-100 hover:text-golden-400 transition-colors"
                  onClick={handleLinkClick}
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-forest-100 hover:text-golden-400 transition-colors"
                  onClick={handleLinkClick}
                >
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-forest-100 hover:text-golden-400 transition-colors"
                  onClick={handleLinkClick}
                >
                  {t("footer.about")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:careers@healthiphi.com"
                  className="text-forest-100 hover:text-golden-400 transition-colors"
                >
                  careers@healthiphi.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:investors@healthiphi.com"
                  className="text-forest-100 hover:text-golden-400 transition-colors"
                >
                  investors@healthiphi.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-forest-400 mt-8 pt-8 text-center text-forest-100">
          <p>
            © {new Date().getFullYear()} Healthiphi. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
