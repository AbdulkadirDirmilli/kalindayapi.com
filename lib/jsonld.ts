import { Ilan, Hizmet } from "./utils";

const siteConfig = {
  name: "Kalinda Yapı",
  url: "https://www.kalindayapi.com",
  logo: "https://www.kalindayapi.com/logo.svg",
  address: {
    streetAddress: "Atatürk Mahallesi, 58 Sokak No: 2/B (Belediye Arkası)",
    addressLocality: "Ortaca",
    addressRegion: "Muğla",
    postalCode: "48600",
    addressCountry: "TR",
  },
  geo: {
    latitude: 36.8390448,
    longitude: 28.7685417,
  },
  employees: [
    {
      name: "Zafer Soylu",
      jobTitle: "Emlak Danışmanı",
      telephone: "+905370530754",
    },
    {
      name: "Arif Dağdelen",
      jobTitle: "Yapı & Taahhüt Uzmanı",
      telephone: "+905321591556",
    },
  ],
  areaServed: ["Ortaca", "Dalyan", "Köyceğiz", "Dalaman", "Fethiye", "Marmaris", "Bodrum", "Milas", "Datça", "Menteşe", "Yatağan", "Ula", "Kavaklıdere", "Seydikemer"],
};

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: "Kalinda Yapı Emlak & Taahhüt",
    description:
      "Muğla Ortaca'da emlak danışmanlığı, tadilat ve inşaat taahhüt hizmetleri sunan profesyonel firma.",
    url: siteConfig.url,
    logo: siteConfig.logo,
    image: `${siteConfig.url}/og-image.jpg`,
    telephone: ["+905370530754", "+905321591556"],
    email: "info@kalindayapi.com",
    foundingDate: "2012",
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: siteConfig.areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    employee: siteConfig.employees.map((emp) => ({
      "@type": "Person",
      name: emp.name,
      jobTitle: emp.jobTitle,
      telephone: emp.telephone,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    priceRange: "$$",
    sameAs: [
      "https://www.instagram.com/kalindayapi",
      "https://www.facebook.com/kalindayapi",
      "https://www.youtube.com/kalindayapi",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Hizmetlerimiz",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Emlak Danışmanlığı",
            description: "Satılık ve kiralık gayrimenkul danışmanlığı",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tadilat & Dekorasyon",
            description: "İç mekan tadilat ve dekorasyon hizmetleri",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Taahhüt & İnşaat",
            description: "Anahtar teslim inşaat ve taahhüt hizmetleri",
          },
        },
      ],
    },
  };
}

export function generateRealEstateListingSchema(ilan: Ilan) {
  const kategori = ilan.kategori === "satilik" ? "ForSale" : "ForRent";
  const propertyType =
    ilan.tip === "daire"
      ? "Apartment"
      : ilan.tip === "villa"
        ? "House"
        : ilan.tip === "arsa"
          ? "LandPlot"
          : "CommercialBuilding";

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${siteConfig.url}/ilanlar/${ilan.id}`,
    name: ilan.baslik,
    description: ilan.aciklama,
    url: `${siteConfig.url}/ilanlar/${ilan.id}`,
    datePosted: ilan.yayinTarihi,
    dateModified: ilan.guncellenmeTarihi,
    image: ilan.fotograflar,
    offers: {
      "@type": "Offer",
      price: ilan.fiyat,
      priceCurrency: "TRY",
      availability: "https://schema.org/InStock",
      businessFunction: `https://schema.org/${kategori}`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: ilan.konum.ilce,
      addressRegion: ilan.konum.il,
      streetAddress: ilan.konum.mahalle,
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: ilan.konum.koordinatlar.lat,
      longitude: ilan.konum.koordinatlar.lng,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: ilan.ozellikler.metrekare,
      unitCode: "MTK",
    },
    numberOfRooms: ilan.ozellikler.odaSayisi,
    numberOfBathroomsTotal: ilan.ozellikler.banyoSayisi,
    propertyType: propertyType,
    seller: {
      "@type": "RealEstateAgent",
      name: siteConfig.name,
      telephone: "+905370530754",
      url: siteConfig.url,
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generateFAQSchema(
  faqs: { soru: string; cevap: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.soru,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.cevap,
      },
    })),
  };
}

export function generateServiceSchema(hizmet: Hizmet) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/hizmetler/${hizmet.slug}`,
    name: hizmet.baslik,
    description: hizmet.uzunAciklama,
    url: `${siteConfig.url}/hizmetler/${hizmet.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: hizmet.bolge.map((area) => ({
      "@type": "City",
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: hizmet.baslik,
      itemListElement: hizmet.altHizmetler.map((alt) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: alt.baslik,
          description: alt.aciklama,
        },
      })),
    },
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description:
      "Muğla Ortaca'da emlak, tadilat ve taahhüt hizmetleri",
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/ilanlar?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// AI Summary component for GEO optimization
export function generateAISummary(): string {
  return `Kalinda Yapı, Muğla'nın Ortaca ilçesinde faaliyet gösteren lisanslı emlak danışmanlığı, tadilat ve inşaat taahhüt firmasıdır. Zafer Soylu (emlak danışmanı, +90 537 053 07 54) ve Arif Dağdelen (yapı & taahhüt uzmanı, +90 532 159 15 56) ortaklığıyla 2012'den bu yana bölgeye hizmet vermektedir. Muğla'nın tüm ilçelerinde (Ortaca, Dalyan, Köyceğiz, Dalaman, Fethiye, Marmaris, Bodrum, Milas, Datça, Menteşe, Yatağan, Ula, Kavaklıdere, Seydikemer) satılık ve kiralık gayrimenkuller, konut ve ticari inşaat projeleri, iç mekan tadilat ve dekorasyon hizmetleri sunmaktadır. 500'den fazla tamamlanmış proje ve 300'den fazla mutlu aile ile %98 müşteri memnuniyeti oranına sahiptir.`;
}
