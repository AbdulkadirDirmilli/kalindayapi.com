import {
  HeroArama,
  HizmetKartlari,
  OneCikanIlanlar,
  IstatistikSayaclari,
  OrtaklarBolumu,
  NedenBiz,
  IletisimFormKisa,
  FaqSection,
  SonYazilar,
} from "@/components/sections";
import { generateOrganizationSchema, generateWebSiteSchema, generateAISummary } from "@/lib/jsonld";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";
import { buildSeoAlternates, resolveLocale, resolveOgImage } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
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
  const locale = resolveLocale(lang);
  const dict = await getCachedDictionary(locale);

  // Paylasim gorseli: one cikan aktif bir ilanin kapak fotografi. Ilan yoksa
  // resolveOgImage marka kartina duser, boylece onizleme bos kalmaz.
  let kapakFoto: string | null = null;
  try {
    const oneCikan = await prisma.ilan.findFirst({
      where: { durum: 'aktif', oneCikan: true },
      orderBy: { yayinTarihi: 'desc' },
      select: { fotograflar: { orderBy: { sira: 'asc' }, take: 1, select: { url: true } } },
    });
    kapakFoto = oneCikan?.fotograflar[0]?.url ?? null;
  } catch {
    // Veritabanina ulasilamazsa metadata uretimi engellenmemeli.
  }
  const ogGorsel = resolveOgImage(kapakFoto);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: buildSeoAlternates('/', locale),
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      images: [{ url: ogGorsel, alt: dict.meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: [ogGorsel],
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

      {/* Kompakt başlık + ilan arama kutusu (büyük banner yerine) */}
      <HeroArama lang={locale} dict={dict} />

      {/* Öne Çıkan İlanlar - portföy en önde */}
      <OneCikanIlanlar lang={locale} dict={dict} />

      {/* Danışman Bölümü */}
      <OrtaklarBolumu lang={locale} dict={dict} />

      {/* Hizmet Kartları */}
      <HizmetKartlari lang={locale} dict={dict} />

      {/* Neden Biz */}
      <NedenBiz lang={locale} dict={dict} />

      {/* İstatistik Sayaçları */}
      <IstatistikSayaclari lang={locale} dict={dict} />

      {/* Son Blog Yazıları */}
      <SonYazilar lang={locale} dict={dict} />

      {/* İletişim Formu */}
      <IletisimFormKisa lang={locale} dict={dict} />

      {/* SSS */}
      <FaqSection lang={locale} dict={dict} />
    </>
  );
}
