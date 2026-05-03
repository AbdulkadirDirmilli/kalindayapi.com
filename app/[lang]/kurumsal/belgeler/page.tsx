import { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Award,
  FileCheck,
  Shield,
  Building2,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { generateBreadcrumbSchema } from "@/lib/jsonld";
import { buildLocalizedUrl, buildSeoAlternates, resolveLocale } from "@/lib/seo";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale, getLocalizedRoute } from "@/lib/i18n";

const texts = {
  tr: {
    breadcrumbs: {
      home: "Ana Sayfa",
      corporate: "Kurumsal",
      certificates: "Belgeler & Sertifikalar",
    },
    hero: {
      title: "Belgeler &",
      titleHighlight: "Sertifikalar",
      description: "Kalinda Yapı olarak Ortaca, Dalyan, Köyceğiz ve tüm Muğla bölgesinde tüm yasal gerekliliklere uygun, resmi belge ve sertifikalarla hizmet veriyoruz. Şeffaflık ilkemiz gereği belgelerimizi sizlerle paylaşıyoruz. Emlak danışmanlığı, tadilat ve inşaat hizmetlerimiz resmi lisans ve sertifikalarla desteklenmektedir.",
    },
    activeCerts: {
      badge: "Aktif Belgeler",
      title: "Mevcut Sertifikalarımız",
      description: "Resmi olarak yetkilendirilmiş ve güncel belgelerimiz.",
      status: "Aktif",
      dateLabel: "Alınış:",
    },
    targetCerts: {
      badge: "Hedef Belgeler",
      title: "Almayı Hedeflediğimiz Sertifikalar",
      description: "Kalite standartlarımızı yükseltmek için çalıştığımız belgeler.",
      progress: "İlerleme",
      target: "Hedef:",
    },
    memberships: {
      badge: "Üyelikler",
      title: "Üyesi Olduğumuz Kuruluşlar",
      description: "Sektörel kuruluşlarda aktif üyeliğimiz bulunmaktadır.",
    },
    trust: {
      title: "Güvenilir ve Şeffaf Hizmet",
      description: "Tüm belgelerimiz güncel ve geçerlidir. Yasal düzenlemelere tam uyum sağlayarak müşterilerimize güvenli hizmet sunmaktayız. Herhangi bir belgemizi görmek isterseniz ofisimizi ziyaret edebilirsiniz.",
    },
    cta: {
      title: "Daha Fazla Bilgi Almak İster misiniz?",
      description: "Belgelerimiz ve hizmetlerimiz hakkında detaylı bilgi için bizimle iletişime geçebilirsiniz.",
      contact: "İletişime Geç",
      about: "Hakkımızda",
    },
    belgeler: [
      {
        baslik: "Emlak Danışmanlığı Yetki Belgesi",
        aciklama: "T.C. Ticaret Bakanlığı onaylı emlak danışmanlığı yetki belgesi",
        tarih: "2022",
        detay: "Resmi emlak alım-satım ve kiralama işlemleri yapma yetkisi",
      },
      {
        baslik: "Ticaret Sicil Belgesi",
        aciklama: "Muğla Ticaret Sicil Müdürlüğü tescil belgesi",
        tarih: "2022",
        detay: "Şirket kuruluş ve faaliyet belgesi",
      },
      {
        baslik: "İş Güvenliği Sertifikası",
        aciklama: "İş Sağlığı ve Güvenliği eğitim sertifikası",
        tarih: "2023",
        detay: "Şantiye ve tadilat işlerinde iş güvenliği standartları",
      },
      {
        baslik: "Vergi Levhası",
        aciklama: "Muğla Vergi Dairesi kayıtlı mükellef belgesi",
        tarih: "2022",
        detay: "Resmi vergi mükellefi kaydı",
      },
    ],
    hedefBelgeler: [
      {
        baslik: "ISO 9001 Kalite Yönetimi",
        aciklama: "Kalite yönetim sistemi sertifikası",
        hedefTarih: "2025",
        ilerleme: 60,
      },
      {
        baslik: "Yeşil Bina Sertifikası",
        aciklama: "Sürdürülebilir yapı uygulamaları belgesi",
        hedefTarih: "2026",
        ilerleme: 30,
      },
    ],
    uyeler: [
      "Muğla Ticaret ve Sanayi Odası",
      "Ortaca Esnaf ve Sanatkarlar Odası",
      "Türkiye Emlak Müşavirleri Federasyonu",
    ],
  },
  en: {
    breadcrumbs: {
      home: "Home",
      corporate: "Corporate",
      certificates: "Certificates & Documents",
    },
    hero: {
      title: "Certificates &",
      titleHighlight: "Documents",
      description: "At Kalinda Yapı, we provide services with official documents and certificates in compliance with all legal requirements in Ortaca, Dalyan, Köyceğiz and the entire Muğla region. In line with our transparency principle, we share our documents with you. Our real estate consultancy, renovation, and construction services are supported by official licenses and certificates.",
    },
    activeCerts: {
      badge: "Active Documents",
      title: "Our Current Certificates",
      description: "Officially authorized and up-to-date documents.",
      status: "Active",
      dateLabel: "Obtained:",
    },
    targetCerts: {
      badge: "Target Documents",
      title: "Certificates We Aim to Obtain",
      description: "Documents we are working on to raise our quality standards.",
      progress: "Progress",
      target: "Target:",
    },
    memberships: {
      badge: "Memberships",
      title: "Organizations We Are Members Of",
      description: "We have active memberships in industry organizations.",
    },
    trust: {
      title: "Reliable and Transparent Service",
      description: "All our documents are current and valid. We provide safe service to our customers by fully complying with legal regulations. If you would like to see any of our documents, you can visit our office.",
    },
    cta: {
      title: "Would You Like More Information?",
      description: "Contact us for detailed information about our documents and services.",
      contact: "Contact Us",
      about: "About Us",
    },
    belgeler: [
      {
        baslik: "Real Estate Consultancy License",
        aciklama: "Real estate consultancy authorization certificate approved by T.R. Ministry of Trade",
        tarih: "2022",
        detay: "Authority to conduct official real estate buying-selling and rental transactions",
      },
      {
        baslik: "Trade Registry Certificate",
        aciklama: "Muğla Trade Registry Directorate registration certificate",
        tarih: "2022",
        detay: "Company establishment and activity certificate",
      },
      {
        baslik: "Occupational Safety Certificate",
        aciklama: "Occupational Health and Safety training certificate",
        tarih: "2023",
        detay: "Occupational safety standards in construction and renovation works",
      },
      {
        baslik: "Tax Certificate",
        aciklama: "Muğla Tax Office registered taxpayer certificate",
        tarih: "2022",
        detay: "Official taxpayer registration",
      },
    ],
    hedefBelgeler: [
      {
        baslik: "ISO 9001 Quality Management",
        aciklama: "Quality management system certificate",
        hedefTarih: "2025",
        ilerleme: 60,
      },
      {
        baslik: "Green Building Certificate",
        aciklama: "Sustainable building practices certificate",
        hedefTarih: "2026",
        ilerleme: 30,
      },
    ],
    uyeler: [
      "Muğla Chamber of Commerce and Industry",
      "Ortaca Chamber of Tradesmen and Craftsmen",
      "Turkey Real Estate Consultants Federation",
    ],
  },
  ar: {
    breadcrumbs: {
      home: "الرئيسية",
      corporate: "الشركة",
      certificates: "الشهادات والوثائق",
    },
    hero: {
      title: "الشهادات و",
      titleHighlight: "الوثائق",
      description: "في كاليندا يابي، نقدم خدماتنا بوثائق وشهادات رسمية متوافقة مع جميع المتطلبات القانونية في أورتاجا ودالان وكويجيز وجميع أنحاء منطقة موغلا. وفقاً لمبدأ الشفافية لدينا، نشارك وثائقنا معكم. خدماتنا في الاستشارات العقارية والتجديد والبناء مدعومة بتراخيص وشهادات رسمية.",
    },
    activeCerts: {
      badge: "الوثائق النشطة",
      title: "شهاداتنا الحالية",
      description: "وثائق معتمدة رسمياً ومحدثة.",
      status: "نشط",
      dateLabel: "تاريخ الحصول:",
    },
    targetCerts: {
      badge: "الوثائق المستهدفة",
      title: "الشهادات التي نهدف للحصول عليها",
      description: "وثائق نعمل عليها لرفع معايير الجودة لدينا.",
      progress: "التقدم",
      target: "الهدف:",
    },
    memberships: {
      badge: "العضويات",
      title: "المنظمات التي نحن أعضاء فيها",
      description: "لدينا عضويات نشطة في منظمات الصناعة.",
    },
    trust: {
      title: "خدمة موثوقة وشفافة",
      description: "جميع وثائقنا حالية وصالحة. نقدم خدمة آمنة لعملائنا من خلال الامتثال الكامل للوائح القانونية. إذا كنت ترغب في رؤية أي من وثائقنا، يمكنك زيارة مكتبنا.",
    },
    cta: {
      title: "هل تريد المزيد من المعلومات؟",
      description: "تواصل معنا للحصول على معلومات مفصلة حول وثائقنا وخدماتنا.",
      contact: "تواصل معنا",
      about: "من نحن",
    },
    belgeler: [
      {
        baslik: "رخصة الاستشارات العقارية",
        aciklama: "شهادة ترخيص الاستشارات العقارية المعتمدة من وزارة التجارة التركية",
        tarih: "2022",
        detay: "صلاحية إجراء معاملات البيع والشراء والتأجير العقاري الرسمية",
      },
      {
        baslik: "شهادة السجل التجاري",
        aciklama: "شهادة تسجيل مديرية السجل التجاري في موغلا",
        tarih: "2022",
        detay: "شهادة تأسيس ونشاط الشركة",
      },
      {
        baslik: "شهادة السلامة المهنية",
        aciklama: "شهادة تدريب الصحة والسلامة المهنية",
        tarih: "2023",
        detay: "معايير السلامة المهنية في أعمال البناء والتجديد",
      },
      {
        baslik: "شهادة الضرائب",
        aciklama: "شهادة دافع الضرائب المسجل في مكتب ضرائب موغلا",
        tarih: "2022",
        detay: "تسجيل دافع الضرائب الرسمي",
      },
    ],
    hedefBelgeler: [
      {
        baslik: "ISO 9001 إدارة الجودة",
        aciklama: "شهادة نظام إدارة الجودة",
        hedefTarih: "2025",
        ilerleme: 60,
      },
      {
        baslik: "شهادة المباني الخضراء",
        aciklama: "شهادة ممارسات البناء المستدام",
        hedefTarih: "2026",
        ilerleme: 30,
      },
    ],
    uyeler: [
      "غرفة التجارة والصناعة في موغلا",
      "غرفة التجار والحرفيين في أورتاجا",
      "اتحاد مستشاري العقارات في تركيا",
    ],
  },
  de: {
    breadcrumbs: {
      home: "Startseite",
      corporate: "Unternehmen",
      certificates: "Zertifikate & Dokumente",
    },
    hero: {
      title: "Zertifikate &",
      titleHighlight: "Dokumente",
      description: "Bei Kalinda Yapı erbringen wir unsere Dienstleistungen mit offiziellen Dokumenten und Zertifikaten in Übereinstimmung mit allen gesetzlichen Anforderungen in Ortaca, Dalyan, Köyceğiz und der gesamten Region Muğla. Gemäß unserem Transparenzprinzip teilen wir unsere Dokumente mit Ihnen. Unsere Immobilienberatung, Renovierungs- und Baudienstleistungen werden durch offizielle Lizenzen und Zertifikate unterstützt.",
    },
    activeCerts: {
      badge: "Aktive Dokumente",
      title: "Unsere aktuellen Zertifikate",
      description: "Offiziell autorisierte und aktuelle Dokumente.",
      status: "Aktiv",
      dateLabel: "Erhalten:",
    },
    targetCerts: {
      badge: "Zieldokumente",
      title: "Zertifikate, die wir anstreben",
      description: "Dokumente, an denen wir arbeiten, um unsere Qualitätsstandards zu erhöhen.",
      progress: "Fortschritt",
      target: "Ziel:",
    },
    memberships: {
      badge: "Mitgliedschaften",
      title: "Organisationen, bei denen wir Mitglied sind",
      description: "Wir haben aktive Mitgliedschaften in Branchenorganisationen.",
    },
    trust: {
      title: "Zuverlässiger und transparenter Service",
      description: "Alle unsere Dokumente sind aktuell und gültig. Wir bieten unseren Kunden sicheren Service durch vollständige Einhaltung gesetzlicher Vorschriften. Wenn Sie eines unserer Dokumente einsehen möchten, können Sie unser Büro besuchen.",
    },
    cta: {
      title: "Möchten Sie mehr Informationen?",
      description: "Kontaktieren Sie uns für detaillierte Informationen über unsere Dokumente und Dienstleistungen.",
      contact: "Kontaktieren Sie uns",
      about: "Über uns",
    },
    belgeler: [
      {
        baslik: "Immobilienberatungslizenz",
        aciklama: "Vom türkischen Handelsministerium genehmigte Immobilienberatungslizenz",
        tarih: "2022",
        detay: "Berechtigung zur Durchführung offizieller Immobilienkauf- und Mietgeschäfte",
      },
      {
        baslik: "Handelsregisterbescheinigung",
        aciklama: "Registrierungsbescheinigung der Handelsregisterdirektion Muğla",
        tarih: "2022",
        detay: "Unternehmensgründungs- und Tätigkeitsbescheinigung",
      },
      {
        baslik: "Arbeitsschutzzertifikat",
        aciklama: "Schulungszertifikat für Arbeitsschutz und Sicherheit",
        tarih: "2023",
        detay: "Arbeitsschutzstandards bei Bau- und Renovierungsarbeiten",
      },
      {
        baslik: "Steuerbescheinigung",
        aciklama: "Registrierter Steuerzahlerbescheinigung des Finanzamts Muğla",
        tarih: "2022",
        detay: "Offizielle Steuerzahlerregistrierung",
      },
    ],
    hedefBelgeler: [
      {
        baslik: "ISO 9001 Qualitätsmanagement",
        aciklama: "Qualitätsmanagementsystem-Zertifikat",
        hedefTarih: "2025",
        ilerleme: 60,
      },
      {
        baslik: "Grünes Gebäude-Zertifikat",
        aciklama: "Zertifikat für nachhaltige Baupraktiken",
        hedefTarih: "2026",
        ilerleme: 30,
      },
    ],
    uyeler: [
      "Industrie- und Handelskammer Muğla",
      "Handwerks- und Gewerbeverein Ortaca",
      "Türkischer Immobilienmaklerverband",
    ],
  },
  ru: {
    breadcrumbs: {
      home: "Главная",
      corporate: "Компания",
      certificates: "Сертификаты и документы",
    },
    hero: {
      title: "Сертификаты и",
      titleHighlight: "Документы",
      description: "В Kalinda Yapı мы предоставляем услуги с официальными документами и сертификатами в соответствии со всеми законодательными требованиями в Ортаке, Даляне, Кёйджеизе и всем регионе Мугла. В соответствии с нашим принципом прозрачности мы делимся с вами нашими документами. Наши услуги по консультированию в сфере недвижимости, ремонту и строительству подкреплены официальными лицензиями и сертификатами.",
    },
    activeCerts: {
      badge: "Действующие документы",
      title: "Наши текущие сертификаты",
      description: "Официально уполномоченные и актуальные документы.",
      status: "Активен",
      dateLabel: "Получено:",
    },
    targetCerts: {
      badge: "Целевые документы",
      title: "Сертификаты, которые мы планируем получить",
      description: "Документы, над которыми мы работаем для повышения стандартов качества.",
      progress: "Прогресс",
      target: "Цель:",
    },
    memberships: {
      badge: "Членства",
      title: "Организации, членами которых мы являемся",
      description: "Мы имеем активное членство в отраслевых организациях.",
    },
    trust: {
      title: "Надежный и прозрачный сервис",
      description: "Все наши документы актуальны и действительны. Мы обеспечиваем безопасный сервис для наших клиентов, полностью соблюдая законодательные нормы. Если вы хотите увидеть любой из наших документов, вы можете посетить наш офис.",
    },
    cta: {
      title: "Хотите получить больше информации?",
      description: "Свяжитесь с нами для получения подробной информации о наших документах и услугах.",
      contact: "Связаться с нами",
      about: "О нас",
    },
    belgeler: [
      {
        baslik: "Лицензия на консультирование по недвижимости",
        aciklama: "Лицензия на консультирование по недвижимости, одобренная Министерством торговли Турции",
        tarih: "2022",
        detay: "Полномочия на проведение официальных операций купли-продажи и аренды недвижимости",
      },
      {
        baslik: "Свидетельство о регистрации в торговом реестре",
        aciklama: "Свидетельство о регистрации Управления торгового реестра Мугла",
        tarih: "2022",
        detay: "Свидетельство о регистрации и деятельности компании",
      },
      {
        baslik: "Сертификат охраны труда",
        aciklama: "Сертификат обучения по охране труда и технике безопасности",
        tarih: "2023",
        detay: "Стандарты охраны труда при строительных и ремонтных работах",
      },
      {
        baslik: "Налоговое свидетельство",
        aciklama: "Свидетельство зарегистрированного налогоплательщика налоговой инспекции Мугла",
        tarih: "2022",
        detay: "Официальная регистрация налогоплательщика",
      },
    ],
    hedefBelgeler: [
      {
        baslik: "ISO 9001 Управление качеством",
        aciklama: "Сертификат системы управления качеством",
        hedefTarih: "2025",
        ilerleme: 60,
      },
      {
        baslik: "Сертификат зеленого здания",
        aciklama: "Сертификат устойчивых строительных практик",
        hedefTarih: "2026",
        ilerleme: 30,
      },
    ],
    uyeler: [
      "Торгово-промышленная палата Мугла",
      "Палата ремесленников и торговцев Ортака",
      "Федерация консультантов по недвижимости Турции",
    ],
  },
};

const iconMap = [FileCheck, Building2, Shield, Briefcase];
const targetIconMap = [Award, GraduationCap];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getCachedDictionary(locale);
  const url = buildLocalizedUrl("/kurumsal/belgeler", locale);

  return {
    title: dict.nav.certificates,
    description: dict.meta.description,
    openGraph: {
      title: dict.nav.certificates,
      description: dict.meta.description,
      url,
    },
    alternates: buildSeoAlternates("/kurumsal/belgeler", locale),
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function BelgelerPage({
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
    { name: t.breadcrumbs.certificates, url: `/${locale}/${getLocalizedRoute('kurumsal', locale)}/${getLocalizedRoute('belgeler', locale)}` },
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
            <Link href={`/${locale}/${getLocalizedRoute('hakkimizda', locale)}`} className="hover:text-[#C9A84C] transition-colors">
              {t.breadcrumbs.corporate}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">{t.breadcrumbs.certificates}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t.hero.title} <span className="text-[#C9A84C]">{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              {t.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Active Certificates */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              {t.activeCerts.badge}
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              {t.activeCerts.title}
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              {t.activeCerts.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {t.belgeler.map((belge, index) => {
              const Icon = iconMap[index];
              return (
                <Card key={belge.baslik} padding="lg" className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-3 py-1 rounded-bl-lg flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {t.activeCerts.status}
                  </div>
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#0B1F3A] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-[#C9A84C]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#0B1F3A] mb-1">{belge.baslik}</h3>
                      <p className="text-sm text-[#666666] mb-2">{belge.aciklama}</p>
                      <p className="text-xs text-[#666666]">{belge.detay}</p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-[#666666]">
                        <Clock className="w-3 h-3" />
                        {t.activeCerts.dateLabel} {belge.tarih}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Certificates */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              {t.targetCerts.badge}
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              {t.targetCerts.title}
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              {t.targetCerts.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {t.hedefBelgeler.map((belge, index) => {
              const Icon = targetIconMap[index];
              return (
                <Card key={belge.baslik} padding="lg">
                  <div className="flex gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0B1F3A]">{belge.baslik}</h3>
                      <p className="text-sm text-[#666666]">{belge.aciklama}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666666]">{t.targetCerts.progress}</span>
                      <span className="font-medium text-[#0B1F3A]">{belge.ilerleme}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C9A84C] rounded-full transition-all"
                        style={{ width: `${belge.ilerleme}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#666666] text-right">
                      {t.targetCerts.target} {belge.hedefTarih}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              {t.memberships.badge}
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              {t.memberships.title}
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              {t.memberships.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {t.uyeler.map((uye) => (
              <div
                key={uye}
                className="flex items-center gap-3 px-6 py-4 bg-[#F5F5F5] rounded-xl"
              >
                <div className="w-10 h-10 rounded-full bg-[#0B1F3A] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <span className="font-medium text-[#0B1F3A]">{uye}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Message */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-16 h-16 text-[#C9A84C] mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">
              {t.trust.title}
            </h2>
            <p className="text-[#666666] leading-relaxed">
              {t.trust.description}
            </p>
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
            <Link href={`/${locale}/${getLocalizedRoute('iletisim', locale)}`}>
              <Button variant="accent" size="lg">
                {t.cta.contact}
              </Button>
            </Link>
            <Link href={`/${locale}/${getLocalizedRoute('hakkimizda', locale)}`}>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                {t.cta.about}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
