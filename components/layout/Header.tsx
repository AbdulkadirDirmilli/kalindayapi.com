"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search, Phone, Home, Briefcase, Building2, TrendingUp, Users, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { HeaderExchangeRate, CurrencySwitcher } from "@/components/exchange";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getLocalizedRoute } from "@/lib/i18n";

// Navigation translations
const navTexts = {
  tr: {
    home: "Ana Sayfa",
    services: "Hizmetler",
    listings: "İlanlar",
    exchange: "Döviz",
    blog: "Blog",
    corporate: "Kurumsal",
    about: "Hakkımızda",
    visionMission: "Vizyon & Misyon",
    references: "Referanslar",
    certificates: "Belgeler & Sertifikalar",
    contact: "İletişim",
    realEstate: "Emlak Danışmanlığı",
    renovation: "Tadilat & Dekorasyon",
    construction: "Taahhüt & İnşaat",
    planning: "Plan & Proje",
    searchListings: "İlan Sorgula",
    callNow: "Hemen Arayın",
  },
  en: {
    home: "Home",
    services: "Services",
    listings: "Properties",
    exchange: "Exchange",
    blog: "Blog",
    corporate: "Corporate",
    about: "About Us",
    visionMission: "Vision & Mission",
    references: "References",
    certificates: "Certificates",
    contact: "Contact",
    realEstate: "Real Estate Consulting",
    renovation: "Renovation & Decoration",
    construction: "Construction",
    planning: "Planning & Design",
    searchListings: "Search Properties",
    callNow: "Call Now",
  },
  ar: {
    home: "الرئيسية",
    services: "الخدمات",
    listings: "العقارات",
    exchange: "العملات",
    blog: "المدونة",
    corporate: "الشركة",
    about: "من نحن",
    visionMission: "الرؤية والمهمة",
    references: "المراجع",
    certificates: "الشهادات",
    contact: "اتصل بنا",
    realEstate: "الاستشارات العقارية",
    renovation: "التجديد والديكور",
    construction: "البناء والمقاولات",
    planning: "التخطيط والتصميم",
    searchListings: "البحث",
    callNow: "اتصل الآن",
  },
  de: {
    home: "Startseite",
    services: "Dienstleistungen",
    listings: "Immobilien",
    exchange: "Wechselkurse",
    blog: "Blog",
    corporate: "Unternehmen",
    about: "Über uns",
    visionMission: "Vision & Mission",
    references: "Referenzen",
    certificates: "Zertifikate",
    contact: "Kontakt",
    realEstate: "Immobilienberatung",
    renovation: "Renovierung & Dekoration",
    construction: "Bau & Vertragsarbeit",
    planning: "Planung & Design",
    searchListings: "Immobilien suchen",
    callNow: "Jetzt anrufen",
  },
  ru: {
    home: "Главная",
    services: "Услуги",
    listings: "Недвижимость",
    exchange: "Курсы валют",
    blog: "Блог",
    corporate: "Компания",
    about: "О нас",
    visionMission: "Миссия и видение",
    references: "Рекомендации",
    certificates: "Сертификаты",
    contact: "Контакты",
    realEstate: "Консультации по недвижимости",
    renovation: "Ремонт и декор",
    construction: "Строительство и подряд",
    planning: "Планирование и дизайн",
    searchListings: "Поиск недвижимости",
    callNow: "Позвонить сейчас",
  },
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { locale } = useLocale();
  const t = navTexts[locale];

  // Build localized navigation
  const navigation = [
    { name: t.home, href: `/${locale}`, icon: Home },
    {
      name: t.services,
      href: `/${locale}/${getLocalizedRoute('hizmetler', locale)}`,
      icon: Briefcase,
      children: [
        { name: t.realEstate, href: `/${locale}/${getLocalizedRoute('hizmetler', locale)}/${getLocalizedRoute('emlak-danismanligi', locale)}` },
        { name: t.renovation, href: `/${locale}/${getLocalizedRoute('hizmetler', locale)}/${getLocalizedRoute('tadilat-dekorasyon', locale)}` },
        { name: t.construction, href: `/${locale}/${getLocalizedRoute('hizmetler', locale)}/${getLocalizedRoute('taahhut-insaat', locale)}` },
        { name: t.planning, href: `/${locale}/${getLocalizedRoute('hizmetler', locale)}/${getLocalizedRoute('plan-proje', locale)}` },
      ],
    },
    { name: t.listings, href: `/${locale}/${getLocalizedRoute('ilanlar', locale)}`, icon: Building2 },
    { name: t.exchange, href: `/${locale}/${getLocalizedRoute('doviz-kurlari', locale)}`, icon: TrendingUp },
    { name: t.blog, href: `/${locale}/${getLocalizedRoute('blog', locale)}`, icon: Briefcase },
    {
      name: t.corporate,
      href: `/${locale}/${getLocalizedRoute('hakkimizda', locale)}`,
      icon: Users,
      children: [
        { name: t.about, href: `/${locale}/${getLocalizedRoute('hakkimizda', locale)}` },
        { name: t.visionMission, href: `/${locale}/${getLocalizedRoute('kurumsal', locale)}/${getLocalizedRoute('vizyon-misyon', locale)}` },
        { name: t.references, href: `/${locale}/${getLocalizedRoute('kurumsal', locale)}/${getLocalizedRoute('referanslar', locale)}` },
        { name: t.certificates, href: `/${locale}/${getLocalizedRoute('kurumsal', locale)}/${getLocalizedRoute('belgeler', locale)}` },
      ],
    },
    { name: t.contact, href: `/${locale}/${getLocalizedRoute('iletisim', locale)}`, icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white shadow-lg py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="relative z-10" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* Mobile: küçük logo */}
            <div className="relative w-12 h-12 sm:hidden">
              <Image
                src="/logo.svg"
                alt="Kalinda Yapı Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Desktop: transparent logo */}
            <div className="relative w-48 h-12 hidden sm:block">
              <Image
                src="/logo-footer.svg"
                alt="Kalinda Yapı Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "px-2 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-1",
                    isActive(item.href)
                      ? "text-accent"
                      : isScrolled
                        ? "text-primary hover:text-accent"
                        : "text-white hover:text-accent"
                  )}
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      activeDropdown === item.name && "rotate-180"
                    )} />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl overflow-hidden"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              "block px-4 py-3 text-primary hover:bg-surface hover:text-accent transition-colors",
                              isActive(child.href) && "bg-surface text-accent"
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Exchange Rates & Language - Mobile & Desktop */}
          <div className="flex items-center gap-1 lg:gap-2">
            <Link href={`/${locale}/${getLocalizedRoute('doviz-kurlari', locale)}`} className="lg:pointer-events-none">
              <HeaderExchangeRate isScrolled={isScrolled} />
            </Link>
            <CurrencySwitcher variant="compact" isScrolled={isScrolled} />
            <LanguageSwitcher variant="minimal" isScrolled={isScrolled} />
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href={`/${locale}/${getLocalizedRoute('ilanlar', locale)}`}>
              <Button
                variant="accent"
                size="md"
                leftIcon={<Search className="w-4 h-4" />}
              >
                {t.searchListings}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              isScrolled ? "text-primary" : "text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menü"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === item.name ? null : item.name
                          )
                        }
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 font-medium rounded-lg",
                          isActive(item.href)
                            ? "text-accent bg-surface"
                            : "text-primary"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          {item.name}
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            activeDropdown === item.name && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className={cn(
                                  "block px-4 py-2 text-sm rounded-lg",
                                  isActive(child.href)
                                    ? "text-accent bg-surface"
                                    : "text-text-light"
                                )}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 font-medium rounded-lg",
                        isActive(item.href)
                          ? "text-accent bg-surface"
                          : "text-primary"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <Link href={`/${locale}/${getLocalizedRoute('ilanlar', locale)}`} className="block">
                  <Button variant="accent" size="md" className="w-full">
                    <Search className="w-4 h-4" />
                    {t.searchListings}
                  </Button>
                </Link>
                <a href="tel:+905370530754" className="block">
                  <Button variant="outline" size="md" className="w-full">
                    <Phone className="w-4 h-4" />
                    {t.callNow}
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
