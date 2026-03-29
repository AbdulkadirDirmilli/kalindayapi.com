import { Metadata } from "next";
import { Ilan, Hizmet } from "./utils";

const siteConfig = {
  name: "Kalinda Yapı",
  description: "Muğla Ortaca'da güvenilir emlak danışmanlığı, tadilat ve inşaat taahhüt hizmetleri.",
  url: "https://www.kalindayapi.com",
  ogImage: "/og-image.jpg",
  keywords: [
    "Ortaca emlak",
    "Ortaca satılık daire",
    "Ortaca kiralık ev",
    "Ortaca tadilat",
    "Muğla inşaat taahhüt",
    "Dalyan emlak",
    "Ortaca yapı firması",
    "Köyceğiz kiralık",
    "Dalaman emlak",
    "Fethiye emlak",
    "Marmaris emlak",
    "Bodrum emlak",
    "Milas emlak",
    "Datça emlak",
    "Muğla tadilat",
    "Muğla inşaat",
  ],
};

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = "",
  image?: string
): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title,
    description,
    keywords: siteConfig.keywords,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateIlanMetadata(ilan: Ilan): Metadata {
  const title = `${ilan.baslik} | ${ilan.konum.ilce}`;
  const description = `${ilan.kategori === "satilik" ? "Satılık" : "Kiralık"} ${ilan.ozellikler.metrekare}m² ${ilan.tip} - ${ilan.konum.mahalle}, ${ilan.konum.ilce}. ${ilan.aciklama.slice(0, 100)}...`;
  const path = `/ilanlar/${ilan.id}`;

  return {
    title,
    description,
    keywords: [
      `${ilan.konum.ilce} ${ilan.kategori}`,
      `${ilan.konum.ilce} ${ilan.tip}`,
      `${ilan.konum.mahalle} emlak`,
      `Muğla ${ilan.tip}`,
      ...siteConfig.keywords,
    ],
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      images: [
        {
          url: ilan.fotograflar[0] || siteConfig.ogImage,
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
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ilan.fotograflar[0] || siteConfig.ogImage],
    },
    alternates: {
      canonical: `${siteConfig.url}${path}`,
    },
  };
}

export function generateHizmetMetadata(hizmet: Hizmet): Metadata {
  const title = `${hizmet.baslik} | Ortaca`;
  const description = `${hizmet.kisaAciklama} Muğla Ortaca ve çevresinde profesyonel ${hizmet.baslik.toLowerCase()} hizmetleri.`;
  const path = `/hizmetler/${hizmet.slug}`;

  return {
    title,
    description,
    keywords: [
      `Ortaca ${hizmet.baslik.toLowerCase()}`,
      `Muğla ${hizmet.baslik.toLowerCase()}`,
      ...hizmet.bolge.map((b) => `${b} ${hizmet.baslik.toLowerCase()}`),
      ...siteConfig.keywords,
    ],
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: hizmet.baslik,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: `${siteConfig.url}${path}`,
    },
  };
}

export const pageMetadata = {
  home: generatePageMetadata(
    "Ortaca'nın Güvenilir Yapı & Emlak Ortağı",
    "Muğla Ortaca'da emlak danışmanlığı, tadilat ve inşaat taahhüt hizmetleri. Satılık & kiralık gayrimenkuller, profesyonel yapı çözümleri.",
    "/"
  ),
  ilanlar: generatePageMetadata(
    "Emlak İlanları | Satılık & Kiralık",
    "Muğla'nın tüm ilçelerinde satılık ve kiralık daireler, villalar, arsalar. Ortaca, Fethiye, Marmaris, Bodrum, Dalyan, Köyceğiz, Dalaman ve diğer ilçelerde güncel emlak ilanları.",
    "/ilanlar"
  ),
  hizmetler: generatePageMetadata(
    "Hizmetlerimiz",
    "Emlak danışmanlığı, tadilat & dekorasyon, taahhüt & inşaat hizmetleri. Ortaca ve Muğla bölgesinde profesyonel çözümler.",
    "/hizmetler"
  ),
  hakkimizda: generatePageMetadata(
    "Hakkımızda",
    "Kalinda Yapı, 2022'den bu yana Ortaca ve Muğla bölgesinde emlak ve yapı sektöründe hizmet vermektedir. Zafer Soylu ve Arif Dağdelen ortaklığı.",
    "/hakkimizda"
  ),
  iletisim: generatePageMetadata(
    "İletişim",
    "Kalinda Yapı ile iletişime geçin. Ortaca, Muğla. Emlak için Zafer Soylu, yapı & tadilat için Arif Dağdelen.",
    "/iletisim"
  ),
  vizyonMisyon: generatePageMetadata(
    "Vizyon & Misyon",
    "Kalinda Yapı'nın vizyonu ve misyonu. Muğla bölgesinin en güvenilir yapı ve emlak markası olmak için çalışıyoruz.",
    "/kurumsal/vizyon-misyon"
  ),
  referanslar: generatePageMetadata(
    "Referanslar",
    "Kalinda Yapı'nın tamamladığı projeler ve müşteri referansları. Ortaca ve Muğla bölgesinde güvenilir yapı çözümleri.",
    "/kurumsal/referanslar"
  ),
  belgeler: generatePageMetadata(
    "Belgeler & Sertifikalar",
    "Kalinda Yapı'nın resmi belgeleri ve sertifikaları. Emlak danışmanlığı lisansı, ticaret odası kaydı ve iş güvenliği belgesi.",
    "/kurumsal/belgeler"
  ),
};
