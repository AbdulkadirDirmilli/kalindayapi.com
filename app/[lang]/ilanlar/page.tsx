import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import {
  generateBreadcrumbSchema,
  generatePropertyListSchema,
  generateRealEstateAgentSchema,
} from "@/lib/jsonld";
import { locales, defaultLocale, type Locale, getLocalizedRoute } from "@/lib/i18n";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";
import { buildSeoAlternates, resolveLocale } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import IlanlarClient from "./IlanlarClient";

const ITEMS_PER_PAGE = 12;

// Dil bazlı metinler
const texts = {
  tr: {
    title: "Emlak İlanları",
    metaTitle: "Ortaca Satılık & Kiralık Emlak İlanları 2026 | Kalinda Yapı",
    metaDescription:
      "Ortaca, Dalaman, Dalyan ve Köyceğiz'de satılık ve kiralık daire, villa, arsa ilanları ✓ 150+ güncel ilan ✓ Lisanslı danışman. Hemen inceleyin! ☎ 0537 053 07 54",
    subtitle:
      "Muğla'nın tüm ilçelerinde satılık ve kiralık gayrimenkuller. Ortaca, Dalaman, Dalyan, Köyceğiz bölgelerinde hayalinizdeki evi bulun.",
    breadcrumb: "İlanlar",
    loading: "İlanlar yükleniyor...",
    error: "Hata Oluştu",
    retry: "Tekrar Dene",
    noResults: "İlan Bulunamadı",
    noResultsDesc:
      "Arama kriterlerinize uygun ilan bulunamadı. Filtreleri değiştirmeyi deneyin.",
    clearFilters: "Tüm filtreleri temizle",
  },
  en: {
    title: "Property Listings",
    metaTitle: "Property for Sale & Rent in Ortaca 2026 | Kalinda Yapı",
    metaDescription:
      "Apartments, villas, and land for sale and rent in Ortaca, Dalaman, Dalyan, and Köyceğiz ✓ 150+ listings ✓ Licensed agents. Browse now! ☎ +90 537 053 07 54",
    subtitle:
      "Properties for sale and rent in all districts of Muğla. Find your dream home in Ortaca, Dalaman, Dalyan, Köyceğiz areas.",
    breadcrumb: "Listings",
    loading: "Loading listings...",
    error: "Error Occurred",
    retry: "Try Again",
    noResults: "No Listings Found",
    noResultsDesc:
      "No listings found matching your search criteria. Try changing the filters.",
    clearFilters: "Clear all filters",
  },
  ar: {
    title: "قوائم العقارات",
    metaTitle: "عقارات للبيع والإيجار في أورتاجا 2026 | كالينداي يابي",
    metaDescription:
      "شقق وفلل وأراضي للبيع والإيجار في أورتاجا ودالامان ودالان وكويجيز ✓ 150+ إعلان ✓ وكلاء مرخصون. تصفح الآن! ☎ 00905370530754",
    subtitle:
      "عقارات للبيع والإيجار في جميع مناطق موغلا. اعثر على منزل أحلامك في مناطق أورتاجا ودالامان ودالان وكويجيز.",
    breadcrumb: "العقارات",
    loading: "جاري تحميل العقارات...",
    error: "حدث خطأ",
    retry: "حاول مرة أخرى",
    noResults: "لم يتم العثور على عقارات",
    noResultsDesc:
      "لم يتم العثور على عقارات تطابق معايير البحث. حاول تغيير المرشحات.",
    clearFilters: "مسح جميع المرشحات",
  },
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const t = texts[locale];

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: buildSeoAlternates("/ilanlar", locale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      type: "website",
    },
  };
}

// Fetch initial listings server-side
async function getInitialListings(locale: string) {
  try {
    const [ilanlar, total] = await Promise.all([
      prisma.ilan.findMany({
        where: { durum: "aktif" },
        include: {
          fotograflar: {
            orderBy: { sira: "asc" },
          },
          translations:
            locale !== "tr"
              ? {
                  where: { language: locale, status: "published" },
                  take: 1,
                }
              : false,
        },
        orderBy: [{ oneCikan: "desc" }, { createdAt: "desc" }],
        take: ITEMS_PER_PAGE,
      }),
      prisma.ilan.count({ where: { durum: "aktif" } }),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedIlanlar = ilanlar.map((ilan: any) => {
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
          mahalle: ilan.mahalle || "",
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
        },
        aciklama: translation?.aciklama || ilan.aciklama,
        fotograflar: ilan.fotograflar.map((f: { url: string }) => f.url),
        oneCikan: ilan.oneCikan,
        yayinTarihi: ilan.yayinTarihi.toISOString(),
        guncellenmeTarihi: ilan.guncellenmeTarihi.toISOString(),
        durum: ilan.durum,
        ilanNo: ilan.ilanNo || "",
        eidsStatus: ilan.eidsStatus,
      };
    });

    return { ilanlar: formattedIlanlar, total };
  } catch (error) {
    console.error("Error fetching initial listings:", error);
    return { ilanlar: [], total: 0 };
  }
}

export default async function IlanlarPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const t = texts[locale];
  const dict = await getCachedDictionary(locale);

  // Fetch initial data server-side
  const { ilanlar, total } = await getInitialListings(locale);

  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: locale === "tr" ? "Ana Sayfa" : locale === "en" ? "Home" : "الرئيسية",
      url: `/${locale}`,
    },
    {
      name: t.breadcrumb,
      url: `/${locale}/${getLocalizedRoute("ilanlar", locale)}`,
    },
  ]);

  const propertyListSchema = generatePropertyListSchema(ilanlar, t.title);
  const realEstateAgentSchema = generateRealEstateAgentSchema();

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(propertyListSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(realEstateAgentSchema),
        }}
      />

      {/* Hero Banner */}
      <section className="bg-[#0B1F3A] pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link
              href={`/${locale}`}
              className="hover:text-[#C9A84C] transition-colors"
            >
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">{t.breadcrumb}</span>
          </nav>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.title}
            </h1>
            <p className="text-gray-300 max-w-2xl">{t.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <IlanlarClient
            initialIlanlar={ilanlar}
            initialTotal={total}
            locale={locale}
            texts={{
              loading: t.loading,
              error: t.error,
              retry: t.retry,
              noResults: t.noResults,
              noResultsDesc: t.noResultsDesc,
              clearFilters: t.clearFilters,
            }}
          />
        </div>
      </section>

      {/* SEO Content Section - Hidden but crawlable */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            {locale === "tr" && (
              <>
                <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">
                  Ortaca ve Çevresinde Emlak İlanları
                </h2>
                <p className="text-[#666666] mb-4">
                  Kalinda Yapı olarak Muğla'nın Ortaca, Dalaman, Dalyan ve Köyceğiz
                  bölgelerinde satılık ve kiralık gayrimenkul hizmetleri sunuyoruz.
                  Portföyümüzde daireler, villalar, arsalar ve ticari gayrimenkuller
                  bulunmaktadır.
                </p>
                <p className="text-[#666666] mb-4">
                  Lisanslı emlak danışmanlarımız ile güvenli alım-satım ve kiralama
                  işlemleri gerçekleştirebilirsiniz. Ücretsiz gayrimenkul değerleme
                  hizmetimizden yararlanmak için bize ulaşın.
                </p>
                <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">
                  Hizmet Verdiğimiz Bölgeler
                </h3>
                <ul className="text-[#666666] list-disc pl-5 mb-4">
                  <li>Ortaca merkez ve tüm mahalleler</li>
                  <li>Dalyan kanal boyu ve çevresi</li>
                  <li>Köyceğiz göl manzaralı bölgeler</li>
                  <li>Dalaman havaalanı yakını</li>
                  <li>Fethiye, Marmaris ve diğer Muğla ilçeleri</li>
                </ul>
              </>
            )}
            {locale === "en" && (
              <>
                <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">
                  Property Listings in Ortaca and Surrounding Areas
                </h2>
                <p className="text-[#666666] mb-4">
                  At Kalinda Yapı, we offer properties for sale and rent in Ortaca,
                  Dalaman, Dalyan, and Köyceğiz regions of Muğla. Our portfolio
                  includes apartments, villas, land, and commercial properties.
                </p>
                <p className="text-[#666666] mb-4">
                  With our licensed real estate consultants, you can safely conduct
                  buying, selling, and rental transactions. Contact us to benefit
                  from our free property valuation service.
                </p>
              </>
            )}
            {locale === "ar" && (
              <>
                <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">
                  قوائم العقارات في أورتاجا والمناطق المحيطة
                </h2>
                <p className="text-[#666666] mb-4">
                  في كالينداي يابي، نقدم عقارات للبيع والإيجار في مناطق أورتاجا
                  ودالامان ودالان وكويجيز في موغلا. تشمل محفظتنا الشقق والفلل
                  والأراضي والعقارات التجارية.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
