import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Paintbrush,
  HardHat,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  Check,
  Building2,
  Key,
  Calculator,
  TrendingUp,
  Ruler,
  ChefHat,
  Bath,
  Palette,
  Building,
  Factory,
  Hammer,
  FileCheck,
  FileText,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FaqSection } from "@/components/sections";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/jsonld";
import { createWhatsAppLink, Hizmet } from "@/lib/utils";
import hizmetlerData from "@/data/hizmetler.json";
import { getHizmetBySlug, getHizmetler, TranslatedHizmet } from "@/data/hizmetler-translations";
import { hizmetlerTexts, formatWhatsAppMessage, whatsappMessages } from "@/data/hizmetler-i18n";
import { buildLocalizedUrl, buildSeoAlternates, resolveLocale, SITE_URL } from "@/lib/seo";
import { locales, type Locale, getOriginalRoute, routeTranslations, getLocalizedRoute } from "@/lib/i18n/config";

// Dinamik sayaç hesaplama - 5 günde 1 artış
function hesaplaDinamikDeger(baslangicDegeri: number): number {
  const baslangicTarihi = new Date("2025-01-01");
  const bugun = new Date();
  const gunFarki = Math.floor((bugun.getTime() - baslangicTarihi.getTime()) / (1000 * 60 * 60 * 24));
  const artis = Math.floor(gunFarki / 5);
  return baslangicDegeri + artis;
}

// Yıl deneyimi hesaplama - 2022'den bu yana
function hesaplaYilDeneyimi(): number {
  const kurulusYili = 2022;
  const bugunYil = new Date().getFullYear();
  return bugunYil - kurulusYili;
}

interface HizmetDetayPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

const ikonlar: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Home,
  Paintbrush,
  HardHat,
  Building2,
  Key,
  Calculator,
  TrendingUp,
  Ruler,
  ChefHat,
  Bath,
  Palette,
  Building,
  Factory,
  Hammer,
  FileCheck,
  FileText,
  Zap,
};

// Ekip bilgileri - tüm hizmetler için ortak
const ekip = [
  {
    ad: "Zafer SOYLU",
    unvan: "Gayrimenkul & Yapı Danışmanı",
    telefon: "+90 537 053 07 54",
    whatsapp: "905370530754",
    foto: "/zafersoylu.png",
  },
  {
    ad: "Arif DAĞDELEN",
    unvan: "Gayrimenkul & Yapı Danışmanı",
    telefon: "+90 532 159 15 56",
    whatsapp: "905321591556",
    foto: "/arifdagdelen.png",
  },
  {
    ad: "Hikmet KARAOĞLAN",
    unvan: "Gayrimenkul & Yapı Danışmanı",
    telefon: "+90 555 453 12 07",
    whatsapp: "905554531207",
    foto: "/hikmetkaraoglan.svg",
  },
];

// Helper to get localized service data
function getLocalizedHizmet(slug: string, locale: Locale): Hizmet | TranslatedHizmet | null {
  // Convert localized slug to original Turkish slug
  const originalSlug = getOriginalRoute(slug, locale);

  // First try translated version using the original slug
  const translated = getHizmetBySlug(originalSlug, locale);
  if (translated) {
    return translated;
  }
  // Fall back to Turkish original
  return (hizmetlerData.hizmetler as Hizmet[]).find((h) => h.slug === originalSlug) || null;
}

function getLocalizedHizmetler(locale: Locale): (Hizmet | TranslatedHizmet)[] {
  const translated = getHizmetler(locale);
  if (translated.length > 0) {
    return translated;
  }
  return hizmetlerData.hizmetler as Hizmet[];
}

export async function generateMetadata({
  params,
}: HizmetDetayPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const hizmet = getLocalizedHizmet(slug, locale);

  if (!hizmet) {
    const notFoundTitles: Record<Locale, string> = {
      tr: 'Hizmet Bulunamadı',
      en: 'Service Not Found',
      ar: 'الخدمة غير موجودة',
      de: 'Dienst nicht gefunden',
      ru: 'Услуга не найдена',
    };
    return {
      title: notFoundTitles[locale],
    };
  }

  // Get the original Turkish slug for consistent URLs
  const originalSlug = getOriginalRoute(slug, locale);
  const title = `${hizmet.baslik} | Ortaca`;
  const description = `${hizmet.kisaAciklama}`;
  const url = buildLocalizedUrl(`/hizmetler/${originalSlug}`, locale);

  return {
    title,
    description,
    keywords: [
      `Ortaca ${hizmet.baslik.toLowerCase()}`,
      `Muğla ${hizmet.baslik.toLowerCase()}`,
      ...hizmet.bolge.map((b) => `${b} ${hizmet.baslik.toLowerCase()}`),
    ],
    openGraph: {
      title: `${title} | Kalinda Yapı`,
      description,
      url,
      siteName: "Kalinda Yapı",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: hizmet.baslik,
        },
      ],
      locale: locale === "tr" ? "tr_TR" : locale === "en" ? "en_US" : "ar_SA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Kalinda Yapı`,
      description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
    alternates: buildSeoAlternates(`/hizmetler/${originalSlug}`, locale),
  };
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  const hizmetler = hizmetlerData.hizmetler as Hizmet[];

  // Generate all language/slug combinations
  for (const locale of locales) {
    for (const hizmet of hizmetler) {
      // Get the localized slug for this language
      const localizedSlug = routeTranslations[hizmet.slug]?.[locale] || hizmet.slug;
      params.push({ lang: locale, slug: localizedSlug });
    }
  }

  return params;
}

export default async function HizmetDetayPage({ params }: HizmetDetayPageProps) {
  const { lang, slug } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : 'tr';
  const texts = hizmetlerTexts[locale];
  const messages = whatsappMessages[locale];

  const hizmet = getLocalizedHizmet(slug, locale);
  const hizmetler = getLocalizedHizmetler(locale);

  if (!hizmet) {
    notFound();
  }

  const Icon = ikonlar[hizmet.ikon] || Home;

  // Get original Turkish slug and service for schema (since schema should be consistent)
  const originalSlug = getOriginalRoute(slug, locale);
  const originalHizmet = (hizmetlerData.hizmetler as Hizmet[]).find((h) => h.slug === originalSlug);
  const serviceSchema = originalHizmet ? generateServiceSchema(originalHizmet) : null;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: locale === 'en' ? 'Home' : locale === 'ar' ? 'الرئيسية' : 'Ana Sayfa', url: `/${locale}` },
    { name: texts.breadcrumb, url: `/${locale}/${getLocalizedRoute('hizmetler', locale)}` },
    { name: hizmet.baslik, url: `/${locale}/${getLocalizedRoute('hizmetler', locale)}/${getLocalizedRoute(originalSlug, locale)}` },
  ]);
  const faqSchema = generateFAQSchema(hizmet.sss);

  // Get other services
  const digerHizmetler = hizmetler.filter((h) => h.id !== hizmet.id);

  return (
    <>
      {/* JSON-LD */}
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Hero */}
      <section className="bg-[#0B1F3A] pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
            <Link href={`/${locale}`} className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/${getLocalizedRoute('hizmetler', locale)}`} className="hover:text-[#C9A84C] transition-colors">
              {texts.breadcrumb}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">{hizmet.baslik}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-[#C9A84C]/20 flex items-center justify-center mb-6">
                <Icon className="w-10 h-10 text-[#C9A84C]" />
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {hizmet.baslik}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                {hizmet.uzunAciklama}
              </p>

              {/* Service Areas */}
              <div className="flex flex-wrap gap-2 mt-6">
                {hizmet.bolge.map((bolge) => (
                  <span
                    key={bolge}
                    className="px-3 py-1 bg-white/10 text-white rounded-full text-sm"
                  >
                    {bolge}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <Card padding="lg" className="bg-white">
              <h3 className="text-lg font-bold text-[#0B1F3A] mb-6">
                {texts.contactTeam}
              </h3>

              {/* Team Members */}
              <div className="space-y-3 mb-6">
                {ekip.map((kisi) => (
                  <div key={kisi.whatsapp} className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-xl">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#C9A84C]">
                      <Image
                        src={kisi.foto}
                        alt={kisi.ad}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#0B1F3A] text-sm truncate">{kisi.ad}</p>
                      <a
                        href={`tel:${kisi.telefon.replace(/\s/g, "")}`}
                        className="text-[#C9A84C] font-medium text-xs hover:underline"
                      >
                        {kisi.telefon}
                      </a>
                    </div>
                    <a
                      href={createWhatsAppLink(
                        kisi.whatsapp,
                        formatWhatsAppMessage(messages.serviceInquiry, hizmet.baslik)
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0"
                    >
                      <Button variant="whatsapp" size="sm">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Link href={`/${locale}/${getLocalizedRoute('iletisim', locale)}`} className="block">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    leftIcon={<Mail className="w-5 h-5" />}
                  >
                    {texts.contactForm}
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Sub Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-4">
              {hizmet.baslik} {texts.servicesScope}
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              {texts.servicesScopeSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hizmet.altHizmetler.map((alt) => {
              const AltIcon = ikonlar[alt.ikon] || Check;
              return (
                <Card key={alt.baslik} padding="lg" className="text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-[#0B1F3A]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C9A84C]/20 transition-colors">
                    <AltIcon className="w-7 h-7 text-[#0B1F3A] group-hover:text-[#C9A84C] transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#0B1F3A] mb-2">{alt.baslik}</h3>
                  <p className="text-sm text-[#666666]">{alt.aciklama}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0B1F3A] mb-6">
                {texts.whyUs}
              </h2>
              <div className="space-y-4">
                {texts.whyUsItems.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[#0B1F3A]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: `${hesaplaDinamikDeger(102)}+`, label: texts.statsLabels.completedProjects },
                { value: `${hesaplaYilDeneyimi()}+`, label: texts.statsLabels.yearsExperience },
                { value: `${hesaplaDinamikDeger(209)}+`, label: texts.statsLabels.happyClients },
                { value: "%98", label: texts.statsLabels.satisfactionRate },
              ].map((stat) => (
                <Card key={stat.label} padding="lg" className="text-center">
                  <p className="text-3xl font-bold text-[#C9A84C] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#666666]">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection
        baslik={`${hizmet.baslik} ${texts.aboutFaq}`}
        altBaslik={`${hizmet.baslik} ${texts.aboutFaqSubtitle}`}
        sorular={hizmet.sss}
      />

      {/* Other Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-4">
              {texts.otherServices}
            </h2>
            <p className="text-[#666666]">
              {texts.otherServicesSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {digerHizmetler.map((diger) => {
              const DigerIcon = ikonlar[diger.ikon] || Home;
              // Get localized slug for the other service
              const digerOriginalSlug = (hizmetlerData.hizmetler as Hizmet[]).find(h => h.id === diger.id)?.slug || diger.slug;
              const digerLocalizedSlug = routeTranslations[digerOriginalSlug]?.[locale] || digerOriginalSlug;
              return (
                <Link key={diger.id} href={`/${locale}/${getLocalizedRoute('hizmetler', locale)}/${digerLocalizedSlug}`}>
                  <Card
                    variant="interactive"
                    padding="lg"
                    className="flex items-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#0B1F3A]/10 flex items-center justify-center flex-shrink-0">
                      <DigerIcon className="w-7 h-7 text-[#0B1F3A]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0B1F3A]">{diger.baslik}</h3>
                      <p className="text-sm text-[#666666] line-clamp-1">
                        {diger.kisaAciklama}
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {hizmet.baslik} {texts.getQuote}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            {texts.getQuoteSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={createWhatsAppLink(
                "905370530754",
                formatWhatsAppMessage(messages.quoteRequest, hizmet.baslik)
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="whatsapp"
                size="lg"
                leftIcon={<MessageCircle className="w-5 h-5" />}
              >
                {texts.whatsappQuote}
              </Button>
            </a>
            <Link href={`/${locale}/${getLocalizedRoute('iletisim', locale)}`}>
              <Button
                variant="accent"
                size="lg"
                leftIcon={<Phone className="w-5 h-5" />}
              >
                {texts.contactButton}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
