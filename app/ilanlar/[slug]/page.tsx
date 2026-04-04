import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import IlanDetayClient from "./IlanDetayClient";
import Button from "@/components/ui/Button";
import { Ilan, getEidsStatusLabel } from "@/lib/utils";

const siteUrl = "https://www.kalindayapi.com";

interface IlanDetayPageProps {
  params: Promise<{ slug: string }>;
}

// Video dosyası olup olmadığını kontrol et
function isVideo(url: string): boolean {
  return url.includes('/videos/') || /\.(mp4|webm|mov|avi)$/i.test(url);
}

// Prisma verisini frontend formatına dönüştür
function formatIlan(ilan: any): Ilan {
  return {
    id: ilan.id,
    baslik: ilan.baslik,
    slug: ilan.slug,
    kategori: ilan.kategori,
    tip: ilan.tip,
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
      // Detayli ozellikler - JSON string'den array'e cevir
      icOzellikler: ilan.icOzellikler ? JSON.parse(ilan.icOzellikler) : undefined,
      disOzellikler: ilan.disOzellikler ? JSON.parse(ilan.disOzellikler) : undefined,
      muhitOzellikleri: ilan.muhitOzellikleri ? JSON.parse(ilan.muhitOzellikleri) : undefined,
      guvenlikOzellikleri: ilan.guvenlikOzellikleri ? JSON.parse(ilan.guvenlikOzellikleri) : undefined,
      cephe: ilan.cephe ? JSON.parse(ilan.cephe) : undefined,
      manzara: ilan.manzara ? JSON.parse(ilan.manzara) : undefined,
      // Arsa ozellikleri
      altyapiDetay: ilan.altyapiDetay ? JSON.parse(ilan.altyapiDetay) : undefined,
      tarimOzellikleri: ilan.tarimOzellikleri ? JSON.parse(ilan.tarimOzellikleri) : undefined,
      // Ticari ozellikler
      depoOzellikleri: ilan.depoOzellikleri ? JSON.parse(ilan.depoOzellikleri) : undefined,
      // Insaat durumu
      insaatDurumu: ilan.insaatDurumu || undefined,
    },
    insaatDurumu: ilan.insaatDurumu || null,
    aciklama: ilan.aciklama,
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

// İlanı getir
async function getIlan(slug: string) {
  const ilan = await prisma.ilan.findUnique({
    where: { slug },
    include: {
      fotograflar: {
        orderBy: { sira: 'asc' },
      },
      danisman: true,
    },
  });

  if (!ilan || ilan.durum !== 'aktif') {
    return null;
  }

  return formatIlan(ilan);
}

// Benzer ilanları getir
async function getBenzerIlanlar(kategori: string, currentSlug: string) {
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
    },
    take: 3,
    orderBy: { yayinTarihi: 'desc' },
  });

  return ilanlar.map(formatIlan);
}

// Metadata oluştur - WhatsApp ve sosyal medya için OG etiketleri
export async function generateMetadata({ params }: IlanDetayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ilan = await getIlan(slug);

  if (!ilan) {
    return {
      title: "İlan Bulunamadı | Kalinda Yapı",
    };
  }

  const title = `${ilan.baslik} | ${ilan.konum.ilce}`;
  const description = `${ilan.kategori === "satilik" ? "Satılık" : "Kiralık"} ${ilan.ozellikler.metrekare}m² ${ilan.tip} - ${ilan.konum.mahalle ? ilan.konum.mahalle + ", " : ""}${ilan.konum.ilce}. ${ilan.aciklama?.slice(0, 120) || ""}...`;
  const url = `${siteUrl}/ilanlar/${ilan.slug}`;

  // Kapak fotoğrafı - sadece fotoğrafları al (videoları hariç tut)
  const fotograflar = ilan.fotograflar.filter((f: string) => !isVideo(f));
  const kapakFoto = fotograflar[0];

  // Tam URL oluştur
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
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Kalinda Yapı`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function IlanDetayPage({ params }: IlanDetayPageProps) {
  const { slug } = await params;
  const ilan = await getIlan(slug);

  if (!ilan) {
    notFound();
  }

  const benzerIlanlar = await getBenzerIlanlar(ilan.kategori, slug);

  const eidsLabel = getEidsStatusLabel(ilan.eidsStatus);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": ilan.baslik,
    "url": `${siteUrl}/ilanlar/${ilan.slug}`,
    "description": ilan.aciklama?.slice(0, 200),
    "additionalProperty": {
      "@type": "PropertyValue",
      "name": "Listing verification status",
      "value": eidsLabel ? `${eidsLabel} listing on KalindaYapi platform` : "EIDS Pending listing on KalindaYapi platform",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <IlanDetayClient ilan={ilan} benzerIlanlar={benzerIlanlar} />
    </>
  );
}
