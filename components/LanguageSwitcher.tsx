"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { locales, localeConfig, type Locale, getOriginalPath, localizePath } from "@/lib/i18n";
import { useLocale } from "./providers/LocaleProvider";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "full" | "compact" | "minimal";
  isScrolled?: boolean;
}

export default function LanguageSwitcher({ variant = "full", isScrolled = false }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { locale: currentLocale } = useLocale();

  const currentConfig = localeConfig[currentLocale];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLanguageChange = (newLocale: Locale) => {
    // Get original path (without locale prefix)
    const originalPath = getOriginalPath(pathname, currentLocale);

    // Localize to new locale
    const newPath = localizePath(originalPath, newLocale);

    // Set cookie
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;

    // Navigate
    router.push(newPath);
    setIsOpen(false);
  };

  if (variant === "minimal") {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-center w-9 h-9 rounded-full transition-colors",
            isScrolled
              ? "bg-gray-100 hover:bg-gray-200 text-primary"
              : "bg-white/10 hover:bg-white/20 text-white"
          )}
          aria-label="Select language"
        >
          <span className="text-lg">{currentConfig.flag}</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[120px]"
            >
              {locales.map((locale) => {
                const config = localeConfig[locale];
                const isActive = locale === currentLocale;

                return (
                  <button
                    key={locale}
                    onClick={() => handleLanguageChange(locale)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                      isActive
                        ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <span className="text-lg">{config.flag}</span>
                    <span className="font-medium">{config.nativeName}</span>
                    {isActive && <Check className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm font-medium transition-colors",
            isScrolled
              ? "text-primary hover:bg-gray-100"
              : "text-white hover:bg-white/10"
          )}
          aria-label="Select language"
        >
          <Globe className="w-4 h-4" />
          <span className="uppercase">{currentLocale}</span>
          <ChevronDown className={cn(
            "w-3.5 h-3.5 transition-transform",
            isOpen && "rotate-180"
          )} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[150px]"
            >
              {locales.map((locale) => {
                const config = localeConfig[locale];
                const isActive = locale === currentLocale;

                return (
                  <button
                    key={locale}
                    onClick={() => handleLanguageChange(locale)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                      isActive
                        ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <span className="text-lg">{config.flag}</span>
                    <span className="font-medium">{config.nativeName}</span>
                    {isActive && <Check className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Full variant
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          isScrolled
            ? "bg-gray-100 hover:bg-gray-200 text-primary"
            : "bg-white/10 hover:bg-white/20 text-white"
        )}
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{currentConfig.flag}</span>
        <span className="hidden sm:inline">{currentConfig.nativeName}</span>
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[180px]"
          >
            <div className="p-2">
              <p className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {currentLocale === 'tr' ? 'Dil Seçin' : currentLocale === 'en' ? 'Select Language' : 'اختر اللغة'}
              </p>
            </div>
            <div className="border-t border-gray-100">
              {locales.map((locale) => {
                const config = localeConfig[locale];
                const isActive = locale === currentLocale;

                return (
                  <button
                    key={locale}
                    onClick={() => handleLanguageChange(locale)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors",
                      isActive
                        ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <span className="text-xl">{config.flag}</span>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{config.nativeName}</p>
                      <p className="text-xs text-gray-400">{config.name}</p>
                    </div>
                    {isActive && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
