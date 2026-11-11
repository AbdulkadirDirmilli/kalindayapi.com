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
import { locales, type Locale, getLocalizedRoute } from "@/lib/i18n";

const texts = {
  tr: {
    breadcrumbs: {
      home: "Ana Sayfa",
      corporate: "Kurumsal",
      references: "Referanslar",
    },
    hero: {
      titleHighlight: "Referanslarımız",
      description: "2022'den bu yana Ortaca, Dalyan, Köyceğiz, Dalaman ve Fethiye bölgelerinde tamamladığımız emlak işlemleri ve hizmet verdiğimiz mutlu müşterilerimiz. 200'den fazla satış, kiralama ve değerleme işlemiyle her işlem, şeffaflık ve güven anlayışımızın bir yansımasıdır.",
    },
    projects: {
      badge: "İşlem Kategorileri",
      title: "Tamamladığımız İşlemler",
      description: "Satış, kiralama, arsa ve değerleme başlıklarında tamamladığımız işlemlerle müşterilerimize değer katıyoruz.",
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
      description: "Alım, satım veya kiralama planınız için bizimle iletişime geçin. Kalinda Yapı Emlak hizmet kalitesini siz de deneyimleyin.",
      contact: "İletişime Geç",
      listings: "İlanları İncele",
    },
    projeler: [
      {
        kategori: "Satılan Konutlar",
        sayi: "120+",
        aciklama: "Tamamlanan daire ve villa satışı",
        ornekler: ["Ortaca merkez daireler", "Dalyan villalar", "Köyceğiz göl manzaralı konutlar"],
      },
      {
        kategori: "Kiralama İşlemleri",
        sayi: "60+",
        aciklama: "Tamamlanan kiralama işlemi",
        ornekler: ["Uzun dönem konut kiralama", "Öğrenci ve memur kiralamaları", "İşyeri kiralama"],
      },
      {
        kategori: "Arsa & Ticari",
        sayi: "40+",
        aciklama: "Arsa ve ticari gayrimenkul işlemi",
        ornekler: ["İmarlı arsa satışı", "Tarla ve bahçe", "Dükkan ve ofis"],
      },
      {
        kategori: "Değerleme Raporu",
        sayi: "200+",
        aciklama: "Hazırlanan değerleme çalışması",
        ornekler: ["Karşılaştırmalı piyasa analizi", "Satış öncesi fiyat önerisi", "Yatırım getiri analizi"],
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
      description: "Real estate transactions we have completed since 2022 in Ortaca, Dalyan, Köyceğiz, Dalaman and Fethiye, and our satisfied clients. With over 200 sales, rentals and valuations, every transaction reflects our commitment to transparency and trust.",
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
      description: "Contact us about your buying, selling or rental plans. Experience the service quality of Kalinda Yapı Emlak.",
      contact: "Contact Us",
      listings: "Browse Listings",
    },
    projeler: [
      {
        kategori: "Homes Sold",
        sayi: "120+",
        aciklama: "Completed apartment and villa sales",
        ornekler: ["Ortaca centre apartments", "Dalyan villas", "Köyceğiz lake-view homes"],
      },
      {
        kategori: "Rental Transactions",
        sayi: "60+",
        aciklama: "Completed rental transactions",
        ornekler: ["Long-term residential rentals", "Student and civil servant rentals", "Commercial rentals"],
      },
      {
        kategori: "Land & Commercial",
        sayi: "40+",
        aciklama: "Land and commercial property transactions",
        ornekler: ["Zoned land sales", "Fields and orchards", "Shops and offices"],
      },
      {
        kategori: "Valuation Reports",
        sayi: "200+",
        aciklama: "Valuation studies prepared",
        ornekler: ["Comparative market analysis", "Pre-sale price guidance", "Investment yield analysis"],
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
      description: "تواصل معنا بشأن خطط الشراء أو البيع أو التأجير. جرّب جودة خدمة كاليندا يابي العقارية.",
      contact: "تواصل معنا",
      listings: "تصفح القوائم",
    },
    projeler: [
      {
        kategori: "منازل تم بيعها",
        sayi: "+120",
        aciklama: "عمليات بيع شقق وفلل مكتملة",
        ornekler: ["شقق وسط أورتاجا", "فلل داليان", "منازل بإطلالة على بحيرة كويجيز"],
      },
      {
        kategori: "معاملات التأجير",
        sayi: "+60",
        aciklama: "معاملات تأجير مكتملة",
        ornekler: ["تأجير سكني طويل الأمد", "تأجير للطلاب والموظفين", "تأجير تجاري"],
      },
      {
        kategori: "أراضٍ وعقارات تجارية",
        sayi: "+40",
        aciklama: "معاملات أراضٍ وعقارات تجارية",
        ornekler: ["بيع أراضٍ ضمن التنظيم", "حقول وبساتين", "محلات ومكاتب"],
      },
      {
        kategori: "تقارير التقييم",
        sayi: "+200",
        aciklama: "دراسات تقييم تم إعدادها",
        ornekler: ["تحليل مقارن للسوق", "توجيه السعر قبل البيع", "تحليل عائد الاستثمار"],
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
  de: {
    breadcrumbs: {
      home: "Startseite",
      corporate: "Unternehmen",
      references: "Referenzen",
    },
    hero: {
      titleHighlight: "Unsere Referenzen",
      description: "Immobilientransaktionen, die wir seit 2022 in den Regionen Ortaca, Dalyan, Köyceğiz, Dalaman und Fethiye abgeschlossen haben, und unsere zufriedenen Kunden. Mit über 200 Verkäufen, Vermietungen und Bewertungen steht jede Transaktion für Transparenz und Vertrauen.",
    },
    projects: {
      badge: "Projektkategorien",
      title: "Abgeschlossene Projekte",
      description: "Wir schaffen Mehrwert für unsere Kunden mit Projekten in verschiedenen Kategorien.",
    },
    reviews: {
      badge: "Kundenbewertungen",
      title: "Was unsere Kunden sagen",
      description: "Bewertungen unserer Kunden über unsere mit 4,9 Sternen auf Google bewerteten Dienstleistungen.",
    },
    areas: {
      badge: "Servicegebiete",
      title: "Wo bieten wir Dienstleistungen an?",
      description: "Wir bieten Dienstleistungen im Zentrum von Ortaca und in den umliegenden Bezirken und Städten an.",
    },
    cta: {
      title: "Werden Sie Teil unserer Referenzen",
      description: "Kontaktieren Sie uns zu Ihren Kauf-, Verkaufs- oder Mietplänen. Erleben Sie die Servicequalität von Kalinda Yapı Emlak.",
      contact: "Kontaktieren Sie uns",
      listings: "Anzeigen durchsuchen",
    },
    projeler: [
      {
        kategori: "Verkaufte Immobilien",
        sayi: "120+",
        aciklama: "Abgeschlossene Wohnungs- und Villenverkäufe",
        ornekler: ["Wohnungen im Zentrum von Ortaca", "Villen in Dalyan", "Häuser mit Köyceğiz-Seeblick"],
      },
      {
        kategori: "Vermietungen",
        sayi: "60+",
        aciklama: "Abgeschlossene Mietabschlüsse",
        ornekler: ["Langfristige Wohnraumvermietung", "Vermietung an Studenten und Beamte", "Gewerbevermietung"],
      },
      {
        kategori: "Grundstücke & Gewerbe",
        sayi: "40+",
        aciklama: "Grundstücks- und Gewerbetransaktionen",
        ornekler: ["Verkauf bebaubarer Grundstücke", "Felder und Gärten", "Läden und Büros"],
      },
      {
        kategori: "Wertgutachten",
        sayi: "200+",
        aciklama: "Erstellte Bewertungen",
        ornekler: ["Vergleichende Marktanalyse", "Preisempfehlung vor dem Verkauf", "Renditeanalyse"],
      },
    ],
    hizmetBolgeleri: [
      "Ortaca Zentrum",
      "Dalyan",
      "Köyceğiz",
      "Dalaman",
      "Fethiye",
      "Sarıgerme",
      "Sultaniye",
      "Ekincik",
    ],
  },
  ru: {
    breadcrumbs: {
      home: "Главная",
      corporate: "Компания",
      references: "Референсы",
    },
    hero: {
      titleHighlight: "Наши референсы",
      description: "Сделки с недвижимостью, которые мы завершили с 2022 года в регионах Ортаджа, Дальян, Кёйджегиз, Даламан и Фетхие, и наши довольные клиенты. Более 200 продаж, аренд и оценок — каждая сделка отражает нашу приверженность прозрачности и доверию.",
    },
    projects: {
      badge: "Категории проектов",
      title: "Завершенные проекты",
      description: "Мы создаем ценность для наших клиентов проектами в различных категориях.",
    },
    reviews: {
      badge: "Отзывы клиентов",
      title: "Что говорят наши клиенты",
      description: "Отзывы наших клиентов о наших услугах с рейтингом 4,9 звезды в Google.",
    },
    areas: {
      badge: "Районы обслуживания",
      title: "Где мы предоставляем услуги?",
      description: "Мы предоставляем услуги в центре Ортака и окружающих районах и городах.",
    },
    cta: {
      title: "Станьте частью наших референсов",
      description: "Свяжитесь с нами по вопросам покупки, продажи или аренды. Оцените качество сервиса Kalinda Yapı Emlak.",
      contact: "Связаться с нами",
      listings: "Просмотреть объявления",
    },
    projeler: [
      {
        kategori: "Проданные объекты",
        sayi: "120+",
        aciklama: "Завершенные продажи квартир и вилл",
        ornekler: ["Квартиры в центре Ортаджи", "Виллы в Дальяне", "Дома с видом на озеро Кёйджегиз"],
      },
      {
        kategori: "Сделки по аренде",
        sayi: "60+",
        aciklama: "Завершенные сделки по аренде",
        ornekler: ["Долгосрочная аренда жилья", "Аренда для студентов и служащих", "Коммерческая аренда"],
      },
      {
        kategori: "Земля и коммерция",
        sayi: "40+",
        aciklama: "Сделки с землей и коммерческой недвижимостью",
        ornekler: ["Продажа участков под застройку", "Поля и сады", "Магазины и офисы"],
      },
      {
        kategori: "Отчеты об оценке",
        sayi: "200+",
        aciklama: "Подготовленные оценки",
        ornekler: ["Сравнительный анализ рынка", "Рекомендация цены перед продажей", "Анализ доходности"],
      },
    ],
    hizmetBolgeleri: [
      "Центр Ортака",
      "Далян",
      "Кёйджеиз",
      "Даламан",
      "Фетхие",
      "Сарыгерме",
      "Султание",
      "Экинджик",
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
    { name: t.breadcrumbs.corporate, url: `/${locale}/${getLocalizedRoute('hakkimizda', locale)}` },
    { name: t.breadcrumbs.references, url: `/${locale}/${getLocalizedRoute('kurumsal', locale)}/${getLocalizedRoute('referanslar', locale)}` },
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
      <section className="bg-primary pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href={`/${locale}`} className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/${getLocalizedRoute('hakkimizda', locale)}`} className="hover:text-[#C9A84C] transition-colors">
              {t.breadcrumbs.corporate}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">{t.breadcrumbs.references}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="text-[#C9A84C]">{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-white/85 text-lg leading-relaxed">
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
            <h2 className="text-3xl font-bold text-ink mt-2 mb-4">
              {t.projects.title}
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">
              {t.projects.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.projeler.map((proje, index) => {
              const Icon = iconMap[index];
              return (
                <Card key={proje.kategori} padding="lg" className="group hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4 group-hover:bg-[#C9A84C] transition-colors">
                    <Icon className="w-8 h-8 text-white group-hover:text-ink transition-colors" />
                  </div>
                  <h3 className="font-bold text-ink mb-1">{proje.kategori}</h3>
                  <p className="text-3xl font-bold text-[#C9A84C] mb-2">{proje.sayi}</p>
                  <p className="text-sm text-text-light mb-4">{proje.aciklama}</p>
                  <ul className="space-y-1">
                    {proje.ornekler.map((ornek, i) => (
                      <li key={i} className="text-xs text-text-light flex items-center gap-2">
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
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              {t.reviews.badge}
            </span>
            <h2 className="text-3xl font-bold text-ink mt-2 mb-4">
              {t.reviews.title}
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">
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
            <h2 className="text-3xl font-bold text-ink mt-2 mb-4">
              {t.areas.title}
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">
              {t.areas.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {t.hizmetBolgeleri.map((bolge) => (
              <div
                key={bolge}
                className="flex items-center gap-2 px-6 py-3 bg-surface rounded-full hover:bg-primary hover:text-white transition-colors group"
              >
                <MapPin className="w-4 h-4 text-[#C9A84C]" />
                <span className="font-medium">{bolge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-white/85 max-w-2xl mx-auto mb-8">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${locale}/${getLocalizedRoute('iletisim', locale)}`}>
              <Button variant="accent" size="lg">
                {t.cta.contact}
              </Button>
            </Link>
            <Link href={`/${locale}/${getLocalizedRoute('ilanlar', locale)}`}>
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
