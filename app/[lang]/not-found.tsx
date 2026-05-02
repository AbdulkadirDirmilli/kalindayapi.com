"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Phone, ArrowLeft, Search, HelpCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { locales, type Locale } from "@/lib/i18n/config";

// 404 page texts for all supported languages
const notFoundTexts: Record<Locale, {
  title: string;
  heading: string;
  description: string;
  homeButton: string;
  contactButton: string;
  searchTitle: string;
  backButton: string;
  links: { text: string; href: string }[];
}> = {
  tr: {
    title: "404",
    heading: "Sayfa Bulunamadı",
    description: "Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. Lütfen URL adresini kontrol edin veya ana sayfaya dönün.",
    homeButton: "Ana Sayfaya Dön",
    contactButton: "İletişime Geç",
    searchTitle: "Belki bunlar işinize yarar:",
    backButton: "Geri Dön",
    links: [
      { text: "İlanlar", href: "/ilanlar" },
      { text: "Hizmetler", href: "/hizmetler" },
      { text: "Hakkımızda", href: "/hakkimizda" },
      { text: "İletişim", href: "/iletisim" },
    ],
  },
  en: {
    title: "404",
    heading: "Page Not Found",
    description: "The page you are looking for may have been moved, deleted, or may never have existed. Please check the URL or return to the home page.",
    homeButton: "Return to Home",
    contactButton: "Contact Us",
    searchTitle: "Maybe these will help:",
    backButton: "Go Back",
    links: [
      { text: "Listings", href: "/ilanlar" },
      { text: "Services", href: "/hizmetler" },
      { text: "About Us", href: "/hakkimizda" },
      { text: "Contact", href: "/iletisim" },
    ],
  },
  ar: {
    title: "404",
    heading: "الصفحة غير موجودة",
    description: "الصفحة التي تبحث عنها قد تم نقلها أو حذفها أو ربما لم تكن موجودة. يرجى التحقق من الرابط أو العودة إلى الصفحة الرئيسية.",
    homeButton: "العودة للرئيسية",
    contactButton: "تواصل معنا",
    searchTitle: "ربما يساعدك هذا:",
    backButton: "العودة",
    links: [
      { text: "العقارات", href: "/ilanlar" },
      { text: "الخدمات", href: "/hizmetler" },
      { text: "من نحن", href: "/hakkimizda" },
      { text: "اتصل بنا", href: "/iletisim" },
    ],
  },
  de: {
    title: "404",
    heading: "Seite nicht gefunden",
    description: "Die gesuchte Seite wurde möglicherweise verschoben, gelöscht oder existiert nicht. Bitte überprüfen Sie die URL oder kehren Sie zur Startseite zurück.",
    homeButton: "Zur Startseite",
    contactButton: "Kontaktieren Sie uns",
    searchTitle: "Vielleicht hilft das:",
    backButton: "Zurück",
    links: [
      { text: "Anzeigen", href: "/ilanlar" },
      { text: "Dienstleistungen", href: "/hizmetler" },
      { text: "Über uns", href: "/hakkimizda" },
      { text: "Kontakt", href: "/iletisim" },
    ],
  },
  ru: {
    title: "404",
    heading: "Страница не найдена",
    description: "Страница, которую вы ищете, возможно, была перемещена, удалена или никогда не существовала. Пожалуйста, проверьте URL или вернитесь на главную страницу.",
    homeButton: "Вернуться на главную",
    contactButton: "Связаться с нами",
    searchTitle: "Возможно, это поможет:",
    backButton: "Назад",
    links: [
      { text: "Объявления", href: "/ilanlar" },
      { text: "Услуги", href: "/hizmetler" },
      { text: "О нас", href: "/hakkimizda" },
      { text: "Контакты", href: "/iletisim" },
    ],
  },
};

// Helper function to detect locale from pathname
function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0] as Locale;
  if (locales.includes(firstSegment)) {
    return firstSegment;
  }
  return "tr"; // Default to Turkish
}

export default function NotFound() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const t = notFoundTexts[locale];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1F3A] to-[#1a3a5c] flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Icon/Number */}
        <div className="relative mb-8">
          <div className="text-[180px] md:text-[220px] font-bold text-white/5 leading-none select-none">
            {t.title}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-[#C9A84C]/20 flex items-center justify-center">
              <Search className="w-16 h-16 text-[#C9A84C]" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t.heading}
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto">
          {t.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href={`/${locale}`}>
            <Button
              variant="accent"
              size="lg"
              leftIcon={<Home className="w-5 h-5" />}
            >
              {t.homeButton}
            </Button>
          </Link>
          <Link href={`/${locale}/iletisim`}>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white/30 hover:bg-white/10"
              leftIcon={<Phone className="w-5 h-5" />}
            >
              {t.contactButton}
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-center justify-center gap-2 text-[#C9A84C] mb-4">
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">{t.searchTitle}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {t.links.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className="px-4 py-2 bg-white/10 hover:bg-[#C9A84C] text-white hover:text-[#0B1F3A] rounded-full text-sm font-medium transition-colors"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </Card>

        {/* Back Link */}
        <button
          onClick={() => typeof window !== "undefined" && window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-gray-400 hover:text-[#C9A84C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backButton}</span>
        </button>
      </div>
    </div>
  );
}
