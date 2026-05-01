"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Settings,
} from "lucide-react";
import { Instagram, Facebook, Youtube } from "@/components/icons/SocialIcons";
import { createWhatsAppLink } from "@/lib/utils";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getLocalizedRoute } from "@/lib/i18n";

// Footer translations
const footerTexts = {
  tr: {
    description: "Muğla Ortaca'da 2022'den bu yana güvenilir emlak danışmanlığı, tadilat ve inşaat taahhüt hizmetleri sunuyoruz. Hayalinizdeki eve veya projeye bir adım daha yakınsınız.",
    quickLinks: "Hızlı Linkler",
    services: "Hizmetler",
    categories: "İlan Kategorileri",
    contact: "İletişim",
    popularSearches: "Popüler Aramalar",
    home: "Ana Sayfa",
    blog: "Blog",
    about: "Hakkımızda",
    faq: "SSS",
    contactPage: "İletişim",
    realEstate: "Emlak Danışmanlığı",
    renovation: "Tadilat & Dekorasyon",
    construction: "Taahhüt & İnşaat",
    planning: "Plan & Proje",
    saleApartments: "Satılık Daireler",
    rentApartments: "Kiralık Daireler",
    saleVillas: "Satılık Villalar",
    lands: "Arsalar",
    eidsTitle: "İlan Doğrulama Bilgisi",
    eidsDescription: "EIDS durumu, KalindaYapi platformu tarafından sağlanan ilan doğrulama seviyesini belirtir. Bu bilgilendirme amaçlı bir doğrulama durumudur ve resmi bir devlet doğrulamasını temsil etmez. Tam doğrulama detayları için ilan sahibi veya danışmanla iletişime geçiniz.",
    copyright: "Kalinda Yapı — Ortaca, Muğla | Tüm Hakları Saklıdır",
    privacy: "Gizlilik Politikası",
    terms: "Kullanım Koşulları",
    designBy: "Tasarım ve Geliştirme:",
    weekdays: "Pzt - Cum: 08:00 - 18:00",
    saturday: "Cumartesi: 09:00 - 14:00",
    addressLine1: "Atatürk Mah. 58 Sk. No: 2/B",
    addressLine2: "(Belediye Arkası), Ortaca / Muğla",
    zafer: "Zafer Bey",
    arif: "Arif Bey",
    hikmet: "Hikmet Bey",
  },
  en: {
    description: "Since 2022, we have been providing reliable real estate consulting, renovation and construction contracting services in Ortaca, Muğla. You are one step closer to your dream home or project.",
    quickLinks: "Quick Links",
    services: "Services",
    categories: "Property Categories",
    contact: "Contact",
    home: "Home",
    blog: "Blog",
    about: "About Us",
    faq: "FAQ",
    contactPage: "Contact",
    realEstate: "Real Estate Consulting",
    renovation: "Renovation & Decoration",
    construction: "Construction & Contracting",
    planning: "Planning & Project",
    saleApartments: "Apartments for Sale",
    rentApartments: "Apartments for Rent",
    saleVillas: "Villas for Sale",
    lands: "Lands",
    popularSearches: "Popular Searches",
    eidsTitle: "Listing Verification Info",
    eidsDescription: "EIDS status indicates the listing verification level provided by KalindaYapi platform. This is an informational verification status and does not represent official government verification. For full verification details, please contact the listing owner or consultant.",
    copyright: "Kalinda Yapı — Ortaca, Muğla | All Rights Reserved",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    designBy: "Design and Development:",
    weekdays: "Mon - Fri: 08:00 - 18:00",
    saturday: "Saturday: 09:00 - 14:00",
    addressLine1: "Atatürk Mah. 58 Sk. No: 2/B",
    addressLine2: "(Behind Municipality), Ortaca / Muğla, Turkey",
    zafer: "Mr. Zafer",
    arif: "Mr. Arif",
    hikmet: "Mr. Hikmet",
  },
  ar: {
    description: "منذ عام 2022، نقدم خدمات استشارات عقارية موثوقة وخدمات تجديد ومقاولات بناء في أورتاجا، موغلا. أنت على بعد خطوة واحدة من منزل أو مشروع أحلامك.",
    quickLinks: "روابط سريعة",
    services: "الخدمات",
    categories: "فئات العقارات",
    contact: "اتصل بنا",
    home: "الرئيسية",
    blog: "المدونة",
    about: "من نحن",
    faq: "الأسئلة الشائعة",
    contactPage: "اتصل بنا",
    realEstate: "الاستشارات العقارية",
    renovation: "التجديد والديكور",
    construction: "البناء والمقاولات",
    planning: "التخطيط والمشاريع",
    saleApartments: "شقق للبيع",
    rentApartments: "شقق للإيجار",
    saleVillas: "فلل للبيع",
    lands: "أراضي",
    popularSearches: "عمليات البحث الشائعة",
    eidsTitle: "معلومات التحقق من الإعلان",
    eidsDescription: "تشير حالة EIDS إلى مستوى التحقق من الإعلان المقدم من منصة KalindaYapi. هذه حالة تحقق إعلامية ولا تمثل التحقق الحكومي الرسمي. للحصول على تفاصيل التحقق الكاملة، يرجى الاتصال بمالك الإعلان أو المستشار.",
    copyright: "كالينداي يابي — أورتاجا، موغلا | جميع الحقوق محفوظة",
    privacy: "سياسة الخصوصية",
    terms: "شروط الاستخدام",
    designBy: "التصميم والتطوير:",
    weekdays: "الإثنين - الجمعة: 08:00 - 18:00",
    saturday: "السبت: 09:00 - 14:00",
    addressLine1: "أتاتورك ماه. 58 سك. رقم: 2/ب",
    addressLine2: "(خلف البلدية)، أورتاجا / موغلا، تركيا",
    zafer: "السيد ظافر",
    arif: "السيد عارف",
    hikmet: "السيد حكمت",
  },
  de: {
    description: "Seit 2022 bieten wir zuverlässige Immobilienberatung, Renovierungs- und Baudienstleistungen in Ortaca, Muğla. Sie sind Ihrem Traumhaus oder Projekt einen Schritt näher.",
    quickLinks: "Schnelllinks",
    services: "Dienstleistungen",
    categories: "Immobilienkategorien",
    contact: "Kontakt",
    home: "Startseite",
    blog: "Blog",
    about: "Über uns",
    faq: "FAQ",
    contactPage: "Kontakt",
    realEstate: "Immobilienberatung",
    renovation: "Renovierung & Dekoration",
    construction: "Bau & Vertragsarbeit",
    planning: "Planung & Projekt",
    saleApartments: "Wohnungen zu verkaufen",
    rentApartments: "Wohnungen zu vermieten",
    saleVillas: "Villen zu verkaufen",
    lands: "Grundstücke",
    popularSearches: "Beliebte Suchen",
    eidsTitle: "Anzeigenverifizierungsinfo",
    eidsDescription: "Der EIDS-Status gibt den von der KalindaYapi-Plattform bereitgestellten Verifizierungsgrad der Anzeige an. Dies ist ein informativer Verifizierungsstatus und stellt keine offizielle Regierungsverifizierung dar. Für vollständige Verifizierungsdetails wenden Sie sich bitte an den Anzeigeninhaber oder Berater.",
    copyright: "Kalinda Yapı — Ortaca, Muğla | Alle Rechte vorbehalten",
    privacy: "Datenschutzrichtlinie",
    terms: "Nutzungsbedingungen",
    designBy: "Design und Entwicklung:",
    weekdays: "Mo - Fr: 08:00 - 18:00",
    saturday: "Samstag: 09:00 - 14:00",
    addressLine1: "Atatürk Mah. 58 Sk. Nr: 2/B",
    addressLine2: "(Hinter dem Rathaus), Ortaca / Muğla, Türkei",
    zafer: "Herr Zafer",
    arif: "Herr Arif",
    hikmet: "Herr Hikmet",
  },
  ru: {
    description: "С 2022 года мы предоставляем надежные консультации по недвижимости, услуги по ремонту и строительству в Ортадже, Мугла. Вы на шаг ближе к дому или проекту своей мечты.",
    quickLinks: "Быстрые ссылки",
    services: "Услуги",
    categories: "Категории недвижимости",
    contact: "Контакты",
    home: "Главная",
    blog: "Блог",
    about: "О нас",
    faq: "FAQ",
    contactPage: "Контакты",
    realEstate: "Консультации по недвижимости",
    renovation: "Ремонт и декор",
    construction: "Строительство и подряд",
    planning: "Планирование и проект",
    saleApartments: "Квартиры на продажу",
    rentApartments: "Квартиры в аренду",
    saleVillas: "Виллы на продажу",
    lands: "Земельные участки",
    popularSearches: "Популярные запросы",
    eidsTitle: "Информация о верификации объявления",
    eidsDescription: "Статус EIDS указывает на уровень верификации объявления, предоставленный платформой KalindaYapi. Это информационный статус верификации и не представляет официальную государственную верификацию. Для получения полной информации о верификации свяжитесь с владельцем объявления или консультантом.",
    copyright: "Kalinda Yapı — Ортаджа, Мугла | Все права защищены",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    designBy: "Дизайн и разработка:",
    weekdays: "Пн - Пт: 08:00 - 18:00",
    saturday: "Суббота: 09:00 - 14:00",
    addressLine1: "Ататюрк Мах. 58 Ск. №: 2/Б",
    addressLine2: "(За мэрией), Ортаджа / Мугла, Турция",
    zafer: "Г-н Зафер",
    arif: "Г-н Ариф",
    hikmet: "Г-н Хикмет",
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { locale } = useLocale();
  const t = footerTexts[locale];

  const quickLinks = [
    { name: t.home, href: `/${locale}` },
    { name: t.blog, href: `/${locale}/${getLocalizedRoute('blog', locale)}` },
    { name: t.about, href: `/${locale}/${getLocalizedRoute('hakkimizda', locale)}` },
    { name: t.faq, href: `/${locale}/${getLocalizedRoute('sss', locale)}` },
    { name: t.contactPage, href: `/${locale}/${getLocalizedRoute('iletisim', locale)}` },
  ];

  const hizmetler = [
    { name: t.realEstate, href: `/${locale}/${getLocalizedRoute('hizmetler', locale)}/${getLocalizedRoute('emlak-danismanligi', locale)}` },
    { name: t.renovation, href: `/${locale}/${getLocalizedRoute('hizmetler', locale)}/${getLocalizedRoute('tadilat-dekorasyon', locale)}` },
    { name: t.construction, href: `/${locale}/${getLocalizedRoute('hizmetler', locale)}/${getLocalizedRoute('taahhut-insaat', locale)}` },
    { name: t.planning, href: `/${locale}/${getLocalizedRoute('hizmetler', locale)}/${getLocalizedRoute('plan-proje', locale)}` },
  ];

  const ilanKategorileri = [
    { name: t.saleApartments, href: `/${locale}/${getLocalizedRoute('ilanlar', locale)}?kategori=satilik&tip=daire` },
    { name: t.rentApartments, href: `/${locale}/${getLocalizedRoute('ilanlar', locale)}?kategori=kiralik&tip=daire` },
    { name: t.saleVillas, href: `/${locale}/${getLocalizedRoute('ilanlar', locale)}?kategori=satilik&tip=villa` },
    { name: t.lands, href: `/${locale}/${getLocalizedRoute('ilanlar', locale)}?kategori=satilik&tip=arsa` },
  ];

  // Popular searches for SEO internal linking
  const popularSearches = {
    tr: [
      { name: "Ortaca Satılık Daire", href: `/${locale}/${getLocalizedRoute('ortaca-satilik-daire', locale)}` },
      { name: "Ortaca Kiralık Daire", href: `/${locale}/${getLocalizedRoute('ortaca-kiralik-daire', locale)}` },
      { name: "Dalaman Satılık Ev", href: `/${locale}/${getLocalizedRoute('dalaman-satilik-ev', locale)}` },
      { name: "Dalyan Satılık Villa", href: `/${locale}/${getLocalizedRoute('dalyan-satilik-villa', locale)}` },
      { name: "Ortaca Öğrenci Kiralık", href: `/${locale}/${getLocalizedRoute('ortaca-ogrenci-kiralik', locale)}` },
      { name: "Ortaca Emlak Ofisi", href: `/${locale}/${getLocalizedRoute('ortaca-emlak-ofisi', locale)}` },
    ],
    en: [
      { name: "Ortaca Apartments for Sale", href: `/${locale}/${getLocalizedRoute('ortaca-satilik-daire', locale)}` },
      { name: "Ortaca Apartments for Rent", href: `/${locale}/${getLocalizedRoute('ortaca-kiralik-daire', locale)}` },
      { name: "Dalaman Houses for Sale", href: `/${locale}/${getLocalizedRoute('dalaman-satilik-ev', locale)}` },
      { name: "Dalyan Villas for Sale", href: `/${locale}/${getLocalizedRoute('dalyan-satilik-villa', locale)}` },
      { name: "Ortaca Student Rentals", href: `/${locale}/${getLocalizedRoute('ortaca-ogrenci-kiralik', locale)}` },
      { name: "Ortaca Real Estate Office", href: `/${locale}/${getLocalizedRoute('ortaca-emlak-ofisi', locale)}` },
    ],
    ar: [
      { name: "شقق للبيع في أورتاجا", href: `/${locale}/${getLocalizedRoute('ortaca-satilik-daire', locale)}` },
      { name: "شقق للإيجار في أورتاجا", href: `/${locale}/${getLocalizedRoute('ortaca-kiralik-daire', locale)}` },
      { name: "منازل للبيع في دالامان", href: `/${locale}/${getLocalizedRoute('dalaman-satilik-ev', locale)}` },
      { name: "فلل للبيع في دالان", href: `/${locale}/${getLocalizedRoute('dalyan-satilik-villa', locale)}` },
      { name: "إيجار طلاب في أورتاجا", href: `/${locale}/${getLocalizedRoute('ortaca-ogrenci-kiralik', locale)}` },
      { name: "مكتب عقارات أورتاجا", href: `/${locale}/${getLocalizedRoute('ortaca-emlak-ofisi', locale)}` },
    ],
    de: [
      { name: "Ortaca Wohnungen kaufen", href: `/${locale}/${getLocalizedRoute('ortaca-satilik-daire', locale)}` },
      { name: "Ortaca Wohnungen mieten", href: `/${locale}/${getLocalizedRoute('ortaca-kiralik-daire', locale)}` },
      { name: "Dalaman Häuser kaufen", href: `/${locale}/${getLocalizedRoute('dalaman-satilik-ev', locale)}` },
      { name: "Dalyan Villen kaufen", href: `/${locale}/${getLocalizedRoute('dalyan-satilik-villa', locale)}` },
      { name: "Ortaca Studentenwohnungen", href: `/${locale}/${getLocalizedRoute('ortaca-ogrenci-kiralik', locale)}` },
      { name: "Ortaca Immobilienbüro", href: `/${locale}/${getLocalizedRoute('ortaca-emlak-ofisi', locale)}` },
    ],
    ru: [
      { name: "Квартиры на продажу Ортаджа", href: `/${locale}/${getLocalizedRoute('ortaca-satilik-daire', locale)}` },
      { name: "Квартиры в аренду Ортаджа", href: `/${locale}/${getLocalizedRoute('ortaca-kiralik-daire', locale)}` },
      { name: "Дома на продажу Даламан", href: `/${locale}/${getLocalizedRoute('dalaman-satilik-ev', locale)}` },
      { name: "Виллы на продажу Дальян", href: `/${locale}/${getLocalizedRoute('dalyan-satilik-villa', locale)}` },
      { name: "Студенческое жильё Ортаджа", href: `/${locale}/${getLocalizedRoute('ortaca-ogrenci-kiralik', locale)}` },
      { name: "Агентство недвижимости Ортаджа", href: `/${locale}/${getLocalizedRoute('ortaca-emlak-ofisi', locale)}` },
    ],
  };

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="inline-block" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative w-36 h-10 md:w-48 md:h-12">
                <Image
                  src="/logo-footer.svg"
                  alt="Kalinda Yapı Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.description}
            </p>
            {/* Social Media */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/kalindayapiortaca/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/kalindayapi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/kalindayapi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links & Hizmetler */}
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <div>
              <h3 className="text-accent font-bold mb-4">{t.quickLinks}</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-accent transition-colors text-sm flex items-center gap-1"
                    >
                      <ChevronRight className="w-4 h-4" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-accent font-bold mb-4">{t.services}</h3>
              <ul className="space-y-2">
                {hizmetler.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-accent transition-colors text-sm flex items-center gap-1"
                    >
                      <ChevronRight className="w-4 h-4" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* İlan Kategorileri */}
          <div>
            <h3 className="text-accent font-bold mb-4">{t.categories}</h3>
            <ul className="space-y-2">
              {ilanKategorileri.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors text-sm flex items-center gap-1"
                  >
                    <ChevronRight className="w-4 h-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-accent font-bold mb-4">{t.contact}</h3>
            <ul className="space-y-3">
              <li>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">
                    {t.addressLine1}<br />
                    {t.addressLine2}
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                  <div className="text-sm">
                    <a
                      href="tel:+905370530754"
                      className="text-gray-300 hover:text-accent transition-colors block"
                    >
                      +90 537 053 07 54
                    </a>
                    <span className="text-gray-500 text-xs">{t.zafer}</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                  <div className="text-sm">
                    <a
                      href="tel:+905321591556"
                      className="text-gray-300 hover:text-accent transition-colors block"
                    >
                      +90 532 159 15 56
                    </a>
                    <span className="text-gray-500 text-xs">{t.arif}</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                  <div className="text-sm">
                    <a
                      href="tel:+905554531207"
                      className="text-gray-300 hover:text-accent transition-colors block"
                    >
                      +90 555 453 12 07
                    </a>
                    <span className="text-gray-500 text-xs">{t.hikmet}</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                  <a
                    href="mailto:info@kalindayapi.com"
                    className="text-gray-300 hover:text-accent transition-colors text-sm"
                  >
                    info@kalindayapi.com
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                  <div className="text-gray-300 text-sm">
                    <p>{t.weekdays}</p>
                    <p>{t.saturday}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Popular Searches - SEO Internal Linking */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <h3 className="text-accent font-bold mb-4 text-center">{t.popularSearches}</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {popularSearches[locale].map((search) => (
              <Link
                key={search.name}
                href={search.href}
                className="px-3 py-1.5 bg-white/5 hover:bg-accent/20 text-gray-300 hover:text-accent text-sm rounded-full transition-colors"
              >
                {search.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* EIDS Bilgilendirme Bloğu */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start gap-3 bg-white/5 rounded-lg p-4">
            <Image
              src="/images/eids-logo.png"
              alt="EIDS Logo"
              width={40}
              height={40}
              className="flex-shrink-0"
            />
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">
                {t.eidsTitle}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {t.eidsDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} {t.copyright}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/giris"
                className="hover:text-accent transition-colors flex items-center gap-1"
                title="Yönetim Paneli"
              >
                <Settings className="w-4 h-4" />
              </Link>
              <span className="text-gray-600">|</span>
              <Link href={`/${locale}/${getLocalizedRoute('gizlilik', locale)}`} className="hover:text-accent transition-colors">
                {t.privacy}
              </Link>
              <span className="text-gray-600">|</span>
              <Link href={`/${locale}/${getLocalizedRoute('kullanim-kosullari', locale)}`} className="hover:text-accent transition-colors">
                {t.terms}
              </Link>
            </div>
          </div>
          <div className="text-center mt-4 pt-4 border-t border-white/5">
            <p className="text-xs text-gray-500">
              {t.designBy}{" "}
              <a
                href="https://www.akduniverse.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-white transition-colors"
              >
                AKD Universe
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
