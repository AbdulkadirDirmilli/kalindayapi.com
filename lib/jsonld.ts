import { Ilan, Hizmet, getIlanBaslik, getIlanAciklama } from "./utils";

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
    foundingDate: "2022",
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

export function generateRealEstateListingSchema(ilan: Ilan, locale: string = 'tr') {
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
    name: getIlanBaslik(ilan, locale),
    description: getIlanAciklama(ilan, locale),
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

// RealEstateAgent Schema for better local SEO
export function generateRealEstateAgentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteConfig.url}/#realestateagent`,
    name: "Kalinda Yapı Emlak",
    alternateName: "Kalinda Yapı Emlak Danışmanlığı",
    description:
      "Ortaca, Dalaman, Dalyan ve Köyceğiz bölgelerinde lisanslı emlak danışmanlığı hizmetleri. Satılık ve kiralık daire, villa, arsa ilanları.",
    url: siteConfig.url,
    logo: siteConfig.logo,
    image: `${siteConfig.url}/og-image.jpg`,
    telephone: "+905370530754",
    email: "info@kalindayapi.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: siteConfig.areaServed.map((area) => ({
      "@type": "City",
      name: area,
      "@id": `https://www.wikidata.org/wiki/Q${area === "Ortaca" ? "1425053" : area === "Dalaman" ? "926661" : ""}`,
    })),
    knowsAbout: [
      "Satılık daire",
      "Kiralık daire",
      "Satılık villa",
      "Arsa satışı",
      "Emlak değerleme",
      "Gayrimenkul danışmanlığı",
      "Residential real estate",
      "Commercial real estate",
      "Property valuation",
    ],
    slogan: "Ortaca'nın Güvenilir Emlak Ortağı",
    foundingDate: "2022",
    founder: [
      {
        "@type": "Person",
        name: "Zafer Soylu",
        jobTitle: "Emlak Danışmanı",
      },
      {
        "@type": "Person",
        name: "Arif Dağdelen",
        jobTitle: "Yapı & Taahhüt Uzmanı",
      },
    ],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 3,
    },
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
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    priceRange: "$$",
    currenciesAccepted: "TRY, USD, EUR, GBP",
    sameAs: [
      "https://www.instagram.com/kalindayapi",
      "https://www.facebook.com/kalindayapi",
      "https://www.youtube.com/kalindayapi",
    ],
  };
}

// ItemList Schema for property listings
export function generatePropertyListSchema(
  ilanlar: Ilan[],
  listName: string = "Emlak İlanları",
  locale: string = 'tr'
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    description: `${listName} - Kalinda Yapı`,
    numberOfItems: ilanlar.length,
    itemListElement: ilanlar.slice(0, 10).map((ilan, index) => {
      const kategori = ilan.kategori === "satilik" ? "ForSale" : "ForRent";
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "RealEstateListing",
          "@id": `${siteConfig.url}/${locale}/ilanlar/${ilan.slug || ilan.id}`,
          name: getIlanBaslik(ilan, locale),
          url: `${siteConfig.url}/${locale}/ilanlar/${ilan.slug || ilan.id}`,
          image: ilan.fotograflar?.[0] || `${siteConfig.url}/og-image.jpg`,
          offers: {
            "@type": "Offer",
            price: ilan.fiyat,
            priceCurrency: ilan.paraBirimi || "TRY",
            availability: "https://schema.org/InStock",
            businessFunction: `https://schema.org/${kategori}`,
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: ilan.konum?.ilce || "Ortaca",
            addressRegion: ilan.konum?.il || "Muğla",
            addressCountry: "TR",
          },
        },
      };
    }),
  };
}

// LocalBusiness with enhanced service area for local SEO
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    description:
      "Ortaca, Dalaman, Dalyan ve Köyceğiz'de emlak danışmanlığı, tadilat ve inşaat taahhüt hizmetleri.",
    url: siteConfig.url,
    telephone: "+905370530754",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: `https://www.google.com/maps?q=${siteConfig.geo.latitude},${siteConfig.geo.longitude}`,
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
    areaServed: [
      {
        "@type": "City",
        name: "Ortaca",
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Muğla",
        },
      },
      {
        "@type": "City",
        name: "Dalaman",
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Muğla",
        },
      },
      {
        "@type": "City",
        name: "Dalyan",
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Muğla",
        },
      },
      {
        "@type": "City",
        name: "Köyceğiz",
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Muğla",
        },
      },
    ],
    priceRange: "$$",
    sameAs: [
      "https://www.instagram.com/kalindayapi",
      "https://www.facebook.com/kalindayapi",
    ],
  };
}

// AI Summary component for GEO optimization
export function generateAISummary(): string {
  return `Kalinda Yapı, Muğla'nın Ortaca ilçesinde faaliyet gösteren lisanslı emlak danışmanlığı, tadilat ve inşaat taahhüt firmasıdır. Zafer Soylu (emlak danışmanı, +90 537 053 07 54) ve Arif Dağdelen (yapı & taahhüt uzmanı, +90 532 159 15 56) ortaklığıyla 2022'den bu yana bölgeye hizmet vermektedir. Muğla'nın tüm ilçelerinde (Ortaca, Dalyan, Köyceğiz, Dalaman, Fethiye, Marmaris, Bodrum, Milas, Datça, Menteşe, Yatağan, Ula, Kavaklıdere, Seydikemer) satılık ve kiralık gayrimenkuller, konut ve ticari inşaat projeleri, iç mekan tadilat ve dekorasyon hizmetleri sunmaktadır. 100'den fazla tamamlanmış proje ve 200'den fazla mutlu aile ile %98 müşteri memnuniyeti oranına sahiptir.`;
}
