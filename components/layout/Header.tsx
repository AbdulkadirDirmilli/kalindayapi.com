"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search, Phone, Home, Briefcase, Building2, TrendingUp, Users, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
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
    consultants: "Danışmanlar",
    about: "Hakkımızda",
    visionMission: "Vizyon & Misyon",
    references: "Referanslar",
    certificates: "Belgeler & Sertifikalar",
    contact: "İletişim",
    realEstate: "Emlak Danışmanlığı",
    valuation: "Gayrimenkul Değerleme",
    investment: "Yatırım Danışmanlığı",
    titleDeed: "Tapu & Resmi İşlemler",
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
    consultants: "Consultants",
    about: "About Us",
    visionMission: "Vision & Mission",
    references: "References",
    certificates: "Certificates",
    contact: "Contact",
    realEstate: "Real Estate Consulting",
    valuation: "Property Valuation",
    investment: "Investment Consulting",
    titleDeed: "Title Deed & Legal Process",
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
    consultants: "المستشارون",
    about: "من نحن",
    visionMission: "الرؤية والمهمة",
    references: "المراجع",
    certificates: "الشهادات",
    contact: "اتصل بنا",
    realEstate: "الاستشارات العقارية",
    valuation: "تقييم العقارات",
    investment: "الاستشارات الاستثمارية",
    titleDeed: "الطابو والمعاملات الرسمية",
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
    consultants: "Berater",
    about: "Über uns",
    visionMission: "Vision & Mission",
    references: "Referenzen",
    certificates: "Zertifikate",
    contact: "Kontakt",
    realEstate: "Immobilienberatung",
    valuation: "Immobilienbewertung",
    investment: "Anlageberatung",
    titleDeed: "Grundbuch & Behördengänge",
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
    consultants: "Консультанты",
    about: "О нас",
    visionMission: "Миссия и видение",
    references: "Рекомендации",
    certificates: "Сертификаты",
    contact: "Контакты",
    realEstate: "Консультации по недвижимости",
    valuation: "Оценка недвижимости",
    investment: "Инвестиционный консалтинг",
    titleDeed: "Оформление сделки и ТАПУ",
    searchListings: "Поиск недвижимости",
    callNow: "Позвонить сейчас",
  },
};

const PHONE_HREF = "tel:+905321591556";
const PHONE_LABEL = "0532 159 15 56";

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
        { name: t.valuation, href: `/${locale}/${getLocalizedRoute('hizmetler', locale)}/${getLocalizedRoute('gayrimenkul-degerleme', locale)}` },
        { name: t.investment, href: `/${locale}/${getLocalizedRoute('hizmetler', locale)}/${getLocalizedRoute('yatirim-danismanligi', locale)}` },
        { name: t.titleDeed, href: `/${locale}/${getLocalizedRoute('hizmetler', locale)}/${getLocalizedRoute('tapu-islemleri', locale)}` },
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
        { name: t.consultants, href: `/${locale}/${getLocalizedRoute('danismanlar', locale)}` },
        { name: t.visionMission, href: `/${locale}/${getLocalizedRoute('kurumsal', locale)}/${getLocalizedRoute('vizyon-misyon', locale)}` },
        { name: t.references, href: `/${locale}/${getLocalizedRoute('kurumsal', locale)}/${getLocalizedRoute('referanslar', locale)}` },
        { name: t.certificates, href: `/${locale}/${getLocalizedRoute('kurumsal', locale)}/${getLocalizedRoute('belgeler', locale)}` },
      ],
    },
    { name: t.contact, href: `/${locale}/${getLocalizedRoute('iletisim', locale)}`, icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
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
        // Beyaz, sabit yükseklikli şerit. Sayfa kaydırılınca yalnızca alt
        // kenarlık ve hafif gölge belirir (referans: muglaport.com.tr).
        "sticky top-0 z-50 bg-white border-b transition-colors duration-200",
        isScrolled ? "border-border shadow-sm" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {/* Navbar daima beyaz olduğu için lacivert logo varyantı kullanılır.
              Altın orijinaller koyu zeminler içindir (footer). */}
          {/* Mobile: kare logo */}
          <div className="relative w-10 h-10 sm:hidden">
            <Image
              src="/logo-navy.svg"
              alt="Kalinda Yapı Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Desktop: yatay logo */}
          <div className="relative w-44 h-10 hidden sm:block lg:w-48 lg:h-11">
            <Image
              src="/logo-wide-navy.svg"
              alt="Kalinda Yapı Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation — pill linkler */}
        <nav className="hidden flex-1 items-center gap-0.5 lg:flex">
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
                  "flex items-center gap-1 rounded-full px-2.5 py-2 text-[15px] font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary/[0.07] text-primary"
                    : "text-ink hover:bg-primary/[0.05] hover:text-primary"
                )}
              >
                {item.name}
                {item.children && (
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    activeDropdown === item.name && "rotate-180"
                  )} />
                )}
              </Link>

              {/* Dropdown */}
              {item.children && (
                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 pt-2 w-64 max-w-[calc(100vw-2rem)]"
                    >
                      <div className="overflow-hidden rounded-xl border border-border bg-white py-1 shadow-lg">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              "block px-4 py-2.5 text-sm transition-colors",
                              isActive(child.href)
                                ? "bg-primary/[0.07] text-primary font-medium"
                                : "text-ink hover:bg-surface hover:text-primary"
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Sağ küme: dil, telefon, CTA.
            Döviz kuru ve para birimi seçici menüden çıkarıldı — şerit dar
            geliyor ve telefon/CTA ikinci satıra düşüyordu. Kur bilgisi ana
            sayfadaki arama kutusunun altına, para birimi seçici ise fiyatların
            gösterildiği yerlere (ana sayfa arama satırı + ilan sonuç çubuğu)
            taşındı. */}
        <div className="ml-auto flex items-center gap-1 lg:ml-0 lg:gap-1.5">
          <LanguageSwitcher variant="minimal" isScrolled />

          {/* Telefon — referans düzende sağda, kalın ve tabular */}
          {/* 1024–1279px arasında logo + 7 menü + dil + CTA zaten şeridi
              dolduruyor; telefon ancak xl'den itibaren sığıyor. */}
          <a
            href={PHONE_HREF}
            className="ml-1 mr-1 hidden items-center gap-1.5 text-[15px] font-semibold tabular-nums text-primary transition-colors hover:text-primary-light xl:flex"
          >
            <Phone className="w-4 h-4" />
            {PHONE_LABEL}
          </a>

          {/* CTA — Desktop */}
          <Link href={`/${locale}/${getLocalizedRoute('ilanlar', locale)}`} className="hidden lg:block">
            <Button
              variant="accent"
              size="sm"
              leftIcon={<Search className="w-4 h-4" />}
            >
              {t.searchListings}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-ink transition-colors hover:bg-surface"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menü"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
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
                          "w-full flex items-center justify-between px-4 py-3 font-medium rounded-lg transition-colors",
                          isActive(item.href)
                            ? "text-primary bg-primary/[0.07]"
                            : "text-ink"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          {item.name}
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-200",
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
                                  "block px-4 py-2 text-sm rounded-lg transition-colors",
                                  isActive(child.href)
                                    ? "text-primary bg-primary/[0.07]"
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
                        "flex items-center gap-3 px-4 py-3 font-medium rounded-lg transition-colors",
                        isActive(item.href)
                          ? "text-primary bg-primary/[0.07]"
                          : "text-ink"
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
                <a href={PHONE_HREF} className="block">
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
