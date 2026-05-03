"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { locales, localeConfig, type Locale, getOriginalPath, localizePath } from "@/lib/i18n";
import { useLocale } from "./providers/LocaleProvider";
import { cn } from "@/lib/utils";
import FlagIcon from "./ui/FlagIcon";

interface LanguageSwitcherProps {
  variant?: "full" | "compact" | "minimal";
  isScrolled?: boolean;
}

export default function LanguageSwitcher({ variant = "full", isScrolled = false }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { locale: currentLocale, dict } = useLocale();

  const currentConfig = localeConfig[currentLocale];

  // Çeviriler
  const t = dict?.language || {
    select: "Dil Seçin",
    active: "Aktif"
  };

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
    // Tarayıcıdan doğrudan mevcut path'i al
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

    // Önce mevcut path'i orijinal Türkçe'ye çevir
    const originalPath = getOriginalPath(currentPath, currentLocale);

    // Sonra hedef dile çevir
    const newPath = localizePath(originalPath, newLocale);

    // Cookie ayarla
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;

    // Yönlendir
    window.location.href = newPath;
  };

  if (variant === "minimal") {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200",
            isScrolled
              ? "bg-gray-100 hover:bg-gray-200 text-primary hover:scale-105"
              : "bg-white/10 hover:bg-white/20 text-white hover:scale-105"
          )}
          aria-label="Select language"
        >
          <FlagIcon locale={currentLocale} size="md" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 min-w-[160px]"
            >
              {locales.map((locale) => {
                const config = localeConfig[locale];
                const isActive = locale === currentLocale;

                return (
                  <button
                    key={locale}
                    onClick={() => handleLanguageChange(locale)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-150",
                      isActive
                        ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <FlagIcon locale={locale} size="md" />
                    <span className="font-medium">{config.nativeName}</span>
                    {isActive && <Check className="w-4 h-4 ml-auto text-[#C9A84C]" />}
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
            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            isScrolled
              ? "text-primary hover:bg-gray-100 hover:scale-105"
              : "text-white hover:bg-white/10 hover:scale-105"
          )}
          aria-label="Select language"
        >
          <FlagIcon locale={currentLocale} size="sm" />
          <span className="uppercase font-semibold">{currentLocale}</span>
          <ChevronDown className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
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
              className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 min-w-[180px]"
            >
              {locales.map((locale) => {
                const config = localeConfig[locale];
                const isActive = locale === currentLocale;

                return (
                  <button
                    key={locale}
                    onClick={() => handleLanguageChange(locale)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-150",
                      isActive
                        ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <FlagIcon locale={locale} size="md" />
                    <span className="font-medium">{config.nativeName}</span>
                    {isActive && <Check className="w-4 h-4 ml-auto text-[#C9A84C]" />}
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
          "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
          isScrolled
            ? "bg-gray-100 hover:bg-gray-200 text-primary hover:scale-105 hover:shadow-md"
            : "bg-white/10 hover:bg-white/20 text-white hover:scale-105 backdrop-blur-sm"
        )}
        aria-label="Select language"
      >
        <FlagIcon locale={currentLocale} size="md" />
        <span className="hidden sm:inline font-medium">{currentConfig.nativeName}</span>
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform duration-200",
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
            className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 min-w-[200px]"
          >
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t.select}
              </p>
            </div>
            <div className="py-1">
              {locales.map((locale) => {
                const config = localeConfig[locale];
                const isActive = locale === currentLocale;

                return (
                  <button
                    key={locale}
                    onClick={() => handleLanguageChange(locale)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3.5 text-sm transition-all duration-150",
                      isActive
                        ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <FlagIcon locale={locale} size="lg" />
                    <div className="flex-1 text-left">
                      <p className="font-semibold">{config.nativeName}</p>
                      <p className="text-xs text-gray-400">{config.name}</p>
                    </div>
                    {isActive && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-[#C9A84C]">
                          {t.active}
                        </span>
                        <Check className="w-4 h-4 text-[#C9A84C]" />
                      </div>
                    )}
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
