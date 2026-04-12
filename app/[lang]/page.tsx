import {
  HeroSection,
  HizmetKartlari,
  OneCikanIlanlar,
  IstatistikSayaclari,
  ReferansGaleri,
  OrtaklarBolumu,
  NedenBiz,
  IletisimFormKisa,
  FaqSection,
  SonYazilar,
} from "@/components/sections";
import { generateOrganizationSchema, generateWebSiteSchema, generateAISummary } from "@/lib/jsonld";
import { locales, defaultLocale, type Locale, generateAlternateUrls } from "@/lib/i18n";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";
import type { Metadata } from "next";

// Statik parametre üretimi
export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

// Dinamik metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getCachedDictionary(locale);
  const alternates = generateAlternateUrls('/', locale);
  const baseUrl = "https://www.kalindayapi.com";

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: alternates,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getCachedDictionary(locale);

  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      {/* AI Summary for GEO (hidden but crawlable) */}
      <section
        data-ai-summary="true"
        className="sr-only"
        aria-hidden="true"
      >
        {generateAISummary()}
      </section>

      {/* Hero Section */}
      <HeroSection lang={locale} dict={dict} />

      {/* Hizmet Kartları */}
      <HizmetKartlari lang={locale} dict={dict} />

      {/* Öne Çıkan İlanlar */}
      <OneCikanIlanlar lang={locale} dict={dict} />

      {/* İstatistik Sayaçları */}
      <IstatistikSayaclari lang={locale} dict={dict} />

      {/* Neden Biz */}
      <NedenBiz lang={locale} dict={dict} />

      {/* Referans Galeri */}
      <ReferansGaleri lang={locale} dict={dict} />

      {/* Ortaklar Bölümü */}
      <OrtaklarBolumu lang={locale} dict={dict} />

      {/* Son Blog Yazıları */}
      <SonYazilar lang={locale} dict={dict} />

      {/* İletişim Formu */}
      <IletisimFormKisa lang={locale} dict={dict} />

      {/* SSS */}
      <FaqSection lang={locale} dict={dict} />
    </>
  );
}
