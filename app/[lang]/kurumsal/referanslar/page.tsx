import { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Building2,
  Home as HomeIcon,
  PaintBucket,
  Users,
  MapPin,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { IstatistikSayaclari, GoogleReviews } from "@/components/sections";
import { generateBreadcrumbSchema } from "@/lib/jsonld";
import { buildLocalizedUrl, buildSeoAlternates, resolveLocale } from "@/lib/seo";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n";

const texts = {
  tr: {
    breadcrumbs: {
      home: "Ana Sayfa",
      corporate: "Kurumsal",
      references: "Referanslar",
    },
    hero: {
      titleHighlight: "Referanslarımız",
      description: "2022'den bu yana Ortaca, Dalyan, Köyceğiz, Dalaman ve Fethiye bölgelerinde tamamladığımız projeler ve hizmet verdiğimiz mutlu müşterilerimiz. 200'den fazla emlak işlemi ve 100'ü aşkın tadilat projesiyle her projemiz, güven ve kalite anlayışımızın bir yansımasıdır.",
    },
    projects: {
      badge: "Proje Kategorileri",
      title: "Tamamladığımız Projeler",
      description: "Farklı kategorilerde tamamladığımız projelerimizle müşterilerimize değer katıyoruz.",
    },
    reviews: {
      badge: "Müşteri Yorumları",
      title: "Müşterilerimiz Ne Diyor?",
      description: "Google'da 4.9 yıldız ortalamasıyla değerlendirilen hizmetlerimiz hakkında müşterilerimizin yorumları.",
    },
    areas: {
      badge: "Hizmet Bölgeleri",
      title: "Nerede Hizmet Veriyoruz?",
      description: "Ortaca merkez olmak üzere çevre ilçe ve beldelerde hizmet veriyoruz.",
    },
    cta: {
      title: "Siz de Referanslarımız Arasında Yerinizi Alın",
      description: "Emlak, tadilat veya inşaat projeleriniz için bizimle iletişime geçin. Kalinda Yapı kalitesini siz de deneyimleyin.",
      contact: "İletişime Geç",
      listings: "İlanları İncele",
    },
    projeler: [
      {
        kategori: "Konut Projeleri",
        sayi: "50+",
        aciklama: "Konut tadilat ve yenileme projesi",
        ornekler: ["Daire renovasyonları", "Villa tadilatları", "Bahçeli ev projeleri"],
      },
      {
        kategori: "Ticari Projeler",
        sayi: "25+",
        aciklama: "Ticari alan düzenlemesi",
        ornekler: ["Ofis dekorasyonları", "Mağaza tadilatları", "Restoran projeleri"],
      },
      {
        kategori: "Tadilat Projeleri",
        sayi: "100+",
        aciklama: "Kapsamlı tadilat projesi",
        ornekler: ["Mutfak yenileme", "Banyo tadilat", "Dış cephe boyama"],
      },
      {
        kategori: "Emlak İşlemleri",
        sayi: "200+",
        aciklama: "Başarılı emlak işlemi",
        ornekler: ["Satış danışmanlığı", "Kiralama hizmetleri", "Yatırım danışmanlığı"],
      },
    ],
    hizmetBolgeleri: [
      "Ortaca Merkez",
      "Dalyan",
      "Köyceğiz",
      "Dalaman",
      "Fethiye",
      "Sarıgerme",
      "Sultaniye",
      "Ekincik",
    ],
  },
  en: {
    breadcrumbs: {
      home: "Home",
      corporate: "Corporate",
      references: "References",
    },
    hero: {
      titleHighlight: "Our References",
      description: "Projects we have completed since 2022 in Ortaca, Dalyan, Köyceğiz, Dalaman, and Fethiye regions, and our satisfied customers. With over 200 real estate transactions and more than 100 renovation projects, each project is a reflection of our commitment to trust and quality.",
    },
    projects: {
      badge: "Project Categories",
      title: "Completed Projects",
      description: "We add value to our customers with projects completed in different categories.",
    },
    reviews: {
      badge: "Customer Reviews",
      title: "What Our Customers Say",
      description: "Reviews from our customers about our services rated 4.9 stars on Google.",
    },
    areas: {
      badge: "Service Areas",
      title: "Where Do We Serve?",
      description: "We serve in Ortaca center and surrounding districts and towns.",
    },
    cta: {
      title: "Join Our References",
      description: "Contact us for your real estate, renovation, or construction projects. Experience the Kalinda Yapı quality.",
      contact: "Contact Us",
      listings: "Browse Listings",
    },
    projeler: [
      {
        kategori: "Residential Projects",
        sayi: "50+",
        aciklama: "Residential renovation and renewal projects",
        ornekler: ["Apartment renovations", "Villa renovations", "Garden house projects"],
      },
      {
        kategori: "Commercial Projects",
        sayi: "25+",
        aciklama: "Commercial space arrangements",
        ornekler: ["Office decorations", "Store renovations", "Restaurant projects"],
      },
      {
        kategori: "Renovation Projects",
        sayi: "100+",
        aciklama: "Comprehensive renovation projects",
        ornekler: ["Kitchen renewal", "Bathroom renovation", "Exterior painting"],
      },
      {
        kategori: "Real Estate Transactions",
        sayi: "200+",
        aciklama: "Successful real estate transactions",
        ornekler: ["Sales consultancy", "Rental services", "Investment consultancy"],
      },
    ],
    hizmetBolgeleri: [
      "Ortaca Center",
      "Dalyan",
      "Köyceğiz",
      "Dalaman",
      "Fethiye",
      "Sarıgerme",
      "Sultaniye",
      "Ekincik",
    ],
  },
  ar: {
    breadcrumbs: {
      home: "الرئيسية",
      corporate: "الشركة",
      references: "المراجع",
    },
    hero: {
      titleHighlight: "مراجعنا",
      description: "المشاريع التي أنجزناها منذ عام 2022 في مناطق أورتاجا ودالان وكويجيز ودالامان وفتحية، وعملاؤنا السعداء. مع أكثر من 200 معاملة عقارية وأكثر من 100 مشروع تجديد، كل مشروع هو انعكاس لالتزامنا بالثقة والجودة.",
    },
    projects: {
      badge: "فئات المشاريع",
      title: "المشاريع المنجزة",
      description: "نضيف قيمة لعملائنا من خلال المشاريع المنجزة في فئات مختلفة.",
    },
    reviews: {
      badge: "آراء العملاء",
      title: "ماذا يقول عملاؤنا؟",
      description: "آراء عملائنا حول خدماتنا المصنفة 4.9 نجوم على جوجل.",
    },
    areas: {
      badge: "مناطق الخدمة",
      title: "أين نقدم خدماتنا؟",
      description: "نقدم خدماتنا في مركز أورتاجا والمناطق والبلدات المحيطة.",
    },
    cta: {
      title: "انضم إلى مراجعنا",
      description: "تواصل معنا لمشاريعك العقارية أو التجديد أو البناء. جرب جودة كاليندا يابي.",
      contact: "تواصل معنا",
      listings: "تصفح القوائم",
    },
    projeler: [
      {
        kategori: "المشاريع السكنية",
        sayi: "+50",
        aciklama: "مشاريع تجديد وتحديث سكنية",
        ornekler: ["تجديد الشقق", "تجديد الفلل", "مشاريع المنازل ذات الحدائق"],
      },
      {
        kategori: "المشاريع التجارية",
        sayi: "+25",
        aciklama: "ترتيبات المساحات التجارية",
        ornekler: ["ديكورات المكاتب", "تجديد المتاجر", "مشاريع المطاعم"],
      },
      {
        kategori: "مشاريع التجديد",
        sayi: "+100",
        aciklama: "مشاريع تجديد شاملة",
        ornekler: ["تجديد المطبخ", "تجديد الحمام", "الطلاء الخارجي"],
      },
      {
        kategori: "المعاملات العقارية",
        sayi: "+200",
        aciklama: "معاملات عقارية ناجحة",
        ornekler: ["استشارات المبيعات", "خدمات التأجير", "استشارات الاستثمار"],
      },
    ],
    hizmetBolgeleri: [
      "مركز أورتاجا",
      "دالان",
      "كويجيز",
      "دالامان",
      "فتحية",
      "ساريغيرمي",
      "سلطانية",
      "إكينجيك",
    ],
  },
};

const iconMap = [HomeIcon, Building2, PaintBucket, Users];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getCachedDictionary(locale);
  const url = buildLocalizedUrl("/kurumsal/referanslar", locale);

  return {
    title: dict.nav.references,
    description: dict.meta.description,
    openGraph: {
      title: dict.nav.references,
      description: dict.meta.description,
      url,
    },
    alternates: buildSeoAlternates("/kurumsal/referanslar", locale),
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function ReferanslarPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = resolveLocale(lang) as Locale;
  const t = texts[locale];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t.breadcrumbs.home, url: `/${locale}` },
    { name: t.breadcrumbs.corporate, url: `/${locale}/hakkimizda` },
    { name: t.breadcrumbs.references, url: `/${locale}/kurumsal/referanslar` },
  ]);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Hero */}
      <section className="bg-[#0B1F3A] pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href={`/${locale}`} className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/hakkimizda`} className="hover:text-[#C9A84C] transition-colors">
              {t.breadcrumbs.corporate}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">{t.breadcrumbs.references}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="text-[#C9A84C]">{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              {t.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <IstatistikSayaclari />

      {/* Project Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              {t.projects.badge}
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              {t.projects.title}
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              {t.projects.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.projeler.map((proje, index) => {
              const Icon = iconMap[index];
              return (
                <Card key={proje.kategori} padding="lg" className="group hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-2xl bg-[#0B1F3A] flex items-center justify-center mb-4 group-hover:bg-[#C9A84C] transition-colors">
                    <Icon className="w-8 h-8 text-[#C9A84C] group-hover:text-[#0B1F3A] transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#0B1F3A] mb-1">{proje.kategori}</h3>
                  <p className="text-3xl font-bold text-[#C9A84C] mb-2">{proje.sayi}</p>
                  <p className="text-sm text-[#666666] mb-4">{proje.aciklama}</p>
                  <ul className="space-y-1">
                    {proje.ornekler.map((ornek, i) => (
                      <li key={i} className="text-xs text-[#666666] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                        {ornek}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              {t.reviews.badge}
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              {t.reviews.title}
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              {t.reviews.description}
            </p>
          </div>

          <GoogleReviews />
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              {t.areas.badge}
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              {t.areas.title}
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              {t.areas.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {t.hizmetBolgeleri.map((bolge) => (
              <div
                key={bolge}
                className="flex items-center gap-2 px-6 py-3 bg-[#F5F5F5] rounded-full hover:bg-[#0B1F3A] hover:text-white transition-colors group"
              >
                <MapPin className="w-4 h-4 text-[#C9A84C]" />
                <span className="font-medium">{bolge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${locale}/iletisim`}>
              <Button variant="accent" size="lg">
                {t.cta.contact}
              </Button>
            </Link>
            <Link href={`/${locale}/ilanlar`}>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                {t.cta.listings}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
