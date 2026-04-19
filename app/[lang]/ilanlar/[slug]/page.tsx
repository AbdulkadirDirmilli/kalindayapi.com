import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import IlanDetayClient from "./IlanDetayClient";
import { Ilan, getEidsStatusLabel } from "@/lib/utils";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";
import { buildLocalizedUrl, buildSeoAlternates, resolveLocale, SITE_URL } from "@/lib/seo";

const siteUrl = SITE_URL;

interface IlanDetayPageProps {
  params: Promise<{ slug: string; lang: string }>;
}

// Video dosyası olup olmadığını kontrol et
function isVideo(url: string): boolean {
  return url.includes('/videos/') || /\.(mp4|webm|mov|avi)$/i.test(url);
}

// Prisma verisini frontend formatına dönüştür
function formatIlan(ilan: any, locale: Locale = 'tr'): Ilan {
  // Çeviri varsa kullan
  const translation = ilan.translations?.[0];

  return {
    id: ilan.id,
    baslik: translation?.baslik || ilan.baslik,
    slug: translation?.slug || ilan.slug,
    kategori: translation?.kategori || ilan.kategori,
    tip: translation?.tip || ilan.tip,
    fiyat: ilan.fiyat,
    paraBirimi: ilan.paraBirimi,
    konum: {
      il: ilan.il,
      ilce: ilan.ilce,
      mahalle: ilan.mahalle || '',
      koordinatlar: {
        lat: ilan.koordinatLat || 36.8384,
        lng: ilan.koordinatLng || 28.7667,
      },
    },
    ozellikler: {
      metrekare: ilan.metrekare || 0,
      odaSayisi: ilan.odaSayisi,
      banyoSayisi: ilan.banyoSayisi,
      kat: ilan.kat,
      toplamKat: ilan.toplamKat,
      binaYasi: ilan.binaYasi,
      isitma: ilan.isitma,
      esyali: ilan.esyali,
      balkon: ilan.balkon,
      asansor: ilan.asansor,
      otopark: ilan.otopark,
      guvenlik: ilan.guvenlik,
      havuz: ilan.havuz,
      bahce: ilan.bahce,
      bahceMetrekare: ilan.bahceMetrekare,
      imarDurumu: ilan.imarDurumu,
      gabari: ilan.gabari,
      yolCephesi: ilan.yolCephesi,
      altyapi: ilan.altyapi,
      icOzellikler: ilan.icOzellikler ? JSON.parse(ilan.icOzellikler) : undefined,
      disOzellikler: ilan.disOzellikler ? JSON.parse(ilan.disOzellikler) : undefined,
      muhitOzellikleri: ilan.muhitOzellikleri ? JSON.parse(ilan.muhitOzellikleri) : undefined,
      guvenlikOzellikleri: ilan.guvenlikOzellikleri ? JSON.parse(ilan.guvenlikOzellikleri) : undefined,
      cephe: ilan.cephe ? JSON.parse(ilan.cephe) : undefined,
      manzara: ilan.manzara ? JSON.parse(ilan.manzara) : undefined,
      altyapiDetay: ilan.altyapiDetay ? JSON.parse(ilan.altyapiDetay) : undefined,
      tarimOzellikleri: ilan.tarimOzellikleri ? JSON.parse(ilan.tarimOzellikleri) : undefined,
      depoOzellikleri: ilan.depoOzellikleri ? JSON.parse(ilan.depoOzellikleri) : undefined,
      insaatDurumu: ilan.insaatDurumu || undefined,
    },
    insaatDurumu: ilan.insaatDurumu || null,
    aciklama: translation?.aciklama || ilan.aciklama,
    fotograflar: ilan.fotograflar.map((f: any) => f.url),
    videoUrl: ilan.videoUrl,
    oneCikan: ilan.oneCikan,
    yayinTarihi: ilan.yayinTarihi.toISOString(),
    guncellenmeTarihi: ilan.guncellenmeTarihi.toISOString(),
    durum: ilan.durum,
    ilanNo: ilan.ilanNo || '',
    eidsStatus: ilan.eidsStatus || 'pending',
    danisman: ilan.danisman ? {
      id: ilan.danisman.id,
      ad: ilan.danisman.ad,
      unvan: ilan.danisman.unvan,
      telefon: ilan.danisman.telefon,
      whatsapp: ilan.danisman.whatsapp,
      email: ilan.danisman.email,
      foto: ilan.danisman.foto,
    } : null,
  };
}

// İlanı getir - hem orijinal slug hem de çeviri slug'ı ile arar
async function getIlan(slug: string, locale: Locale = 'tr') {
  // Önce orijinal slug ile ara
  let ilan = await prisma.ilan.findUnique({
    where: { slug },
    include: {
      fotograflar: {
        orderBy: { sira: 'asc' },
      },
      danisman: true,
      translations: locale !== 'tr' ? {
        where: { language: locale, status: 'published' },
        take: 1,
      } : false,
    },
  });

  // Bulunamadıysa ve Türkçe değilse, çeviri slug'ı ile ara
  if (!ilan && locale !== 'tr') {
    const translation = await prisma.ilanTranslation.findFirst({
      where: {
        slug: slug,
        language: locale,
        status: 'published',
      },
      select: { ilanId: true },
    });

    if (translation) {
      ilan = await prisma.ilan.findUnique({
        where: { id: translation.ilanId },
        include: {
          fotograflar: {
            orderBy: { sira: 'asc' },
          },
          danisman: true,
          translations: {
            where: { language: locale, status: 'published' },
            take: 1,
          },
        },
      });
    }
  }

  if (!ilan || ilan.durum !== 'aktif') {
    return null;
  }

  return formatIlan(ilan, locale);
}

// Benzer ilanları getir
async function getBenzerIlanlar(kategori: string, currentSlug: string, locale: Locale = 'tr') {
  const ilanlar = await prisma.ilan.findMany({
    where: {
      kategori,
      durum: 'aktif',
      slug: { not: currentSlug },
    },
    include: {
      fotograflar: {
        orderBy: { sira: 'asc' },
        take: 1,
      },
      danisman: true,
      translations: locale !== 'tr' ? {
        where: { language: locale, status: 'published' },
        take: 1,
      } : false,
    },
    take: 3,
    orderBy: { yayinTarihi: 'desc' },
  });

  return ilanlar.map(ilan => formatIlan(ilan, locale));
}

// Statik parametreleri oluştur - tüm diller için
export async function generateStaticParams() {
  const ilanlar = await prisma.ilan.findMany({
    where: { durum: 'aktif' },
    select: {
      slug: true,
      translations: {
        where: { status: 'published' },
        select: { language: true, slug: true },
      },
    },
  });

  const params: { lang: string; slug: string }[] = [];

  for (const ilan of ilanlar) {
    // Türkçe (orijinal slug)
    params.push({ lang: 'tr', slug: ilan.slug });

    // Çeviri slug'ları
    for (const translation of ilan.translations) {
      params.push({
        lang: translation.language,
        slug: translation.slug,
      });
    }
  }

  return params;
}

// Metadata oluştur
export async function generateMetadata({ params }: IlanDetayPageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getCachedDictionary(locale);
  const ilan = await getIlan(slug, locale);

  if (!ilan) {
    return {
      title: `${dict.common.error} | Kalinda Yapı`,
    };
  }

  const kategoriText = locale === 'tr'
    ? (ilan.kategori === "satilik" ? "Satılık" : "Kiralık")
    : locale === 'en'
      ? (ilan.kategori === "satilik" ? "For Sale" : "For Rent")
      : (ilan.kategori === "satilik" ? "للبيع" : "للإيجار");

  const title = `${ilan.baslik} | ${ilan.konum.ilce}`;
  const description = `${kategoriText} ${ilan.ozellikler.metrekare}m² ${ilan.tip} - ${ilan.konum.mahalle ? ilan.konum.mahalle + ", " : ""}${ilan.konum.ilce}. ${ilan.aciklama?.slice(0, 120) || ""}...`;
  const url = buildLocalizedUrl(`/ilanlar/${ilan.slug}`, locale);

  const fotograflar = ilan.fotograflar.filter((f: string) => !isVideo(f));
  const kapakFoto = fotograflar[0];
  const ogImage = kapakFoto
    ? (kapakFoto.startsWith('http') ? kapakFoto : `${siteUrl}${kapakFoto}`)
    : `${siteUrl}/og-image.jpg`;

  return {
    title: `${title} | Kalinda Yapı`,
    description,
    keywords: [
      `${ilan.konum.ilce} ${ilan.kategori}`,
      `${ilan.konum.ilce} ${ilan.tip}`,
      `${ilan.konum.mahalle || ""} emlak`,
      `Muğla ${ilan.tip}`,
      "Ortaca emlak",
      "Dalyan emlak",
    ],
    openGraph: {
      title: `${title} | Kalinda Yapı`,
      description,
      url,
      siteName: "Kalinda Yapı",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ilan.baslik,
        },
      ],
      locale: locale === "tr" ? "tr_TR" : locale === "en" ? "en_US" : "ar_SA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Kalinda Yapı`,
      description,
      images: [ogImage],
    },
    alternates: buildSeoAlternates(`/ilanlar/${ilan.slug}`, locale),
  };
}

export default async function IlanDetayPage({ params }: IlanDetayPageProps) {
  const { slug, lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getCachedDictionary(locale);
  const ilan = await getIlan(slug, locale);

  if (!ilan) {
    notFound();
  }

  const benzerIlanlar = await getBenzerIlanlar(ilan.kategori, slug, locale);

  const eidsLabel = getEidsStatusLabel(ilan.eidsStatus);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": ilan.baslik,
    "url": `${siteUrl}/${locale}/${getLocalizedRoute('ilanlar', locale)}/${ilan.slug}`,
    "description": ilan.aciklama?.slice(0, 200),
    "additionalProperty": {
      "@type": "PropertyValue",
      "name": "İlan doğrulama durumu",
      "value": eidsLabel ? `KalindaYapi platformunda ${eidsLabel} ilan` : "KalindaYapi platformunda EIDS Beklemede ilan",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <IlanDetayClient ilan={ilan} benzerIlanlar={benzerIlanlar} locale={locale} dict={dict} />
    </>
  );
}
