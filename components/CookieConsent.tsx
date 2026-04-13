"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { useLocale } from "./providers/LocaleProvider";

const COOKIE_CONSENT_KEY = "kalinda-cookie-consent";

type ConsentStatus = "accepted" | "rejected" | null;

export default function CookieConsent() {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { locale, dict } = useLocale();

  // Çeviriler
  const t = dict?.cookie || {
    message: "Web sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz.",
    privacyLink: "Gizlilik Politikamızı",
    privacyText: "inceleyerek detaylı bilgi alabilirsiniz.",
    accept: "Kabul Et",
    reject: "Reddet",
    close: "Kapat"
  };

  useEffect(() => {
    // Check localStorage for existing consent
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent === "accepted" || savedConsent === "rejected") {
      setConsentStatus(savedConsent);
    } else {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setConsentStatus("accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    setConsentStatus("rejected");
    setIsVisible(false);
  };

  // Don't render if consent already given
  if (consentStatus !== null) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-[#0B1F3A] border-t border-[#C9A84C]/20 shadow-2xl">
        <div className="container mx-auto px-4 py-4 md:py-5">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Icon & Text */}
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Cookie className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <div>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  {t.message}{" "}
                  <Link
                    href={`/${locale}/gizlilik`}
                    className="text-[#C9A84C] hover:underline font-medium"
                  >
                    {t.privacyLink}
                  </Link>{" "}
                  {t.privacyText}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleReject}
                className="flex-1 md:flex-none px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition-colors"
              >
                {t.reject}
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none px-5 py-2.5 text-sm font-medium text-[#0B1F3A] bg-[#C9A84C] hover:bg-[#d4b65d] rounded-lg transition-colors"
              >
                {t.accept}
              </button>
            </div>

            {/* Close button for mobile */}
            <button
              onClick={handleReject}
              className="absolute top-3 right-3 md:hidden text-gray-400 hover:text-white"
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
