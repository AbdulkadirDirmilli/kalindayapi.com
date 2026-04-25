import { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Target,
  Eye,
  Compass,
  TrendingUp,
  Users,
  Heart,
  Shield,
  Lightbulb,
  Award,
  MapPin,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { generateBreadcrumbSchema } from "@/lib/jsonld";
import { buildLocalizedUrl, buildSeoAlternates, resolveLocale } from "@/lib/seo";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n";

const texts = {
  tr: {
    breadcrumbs: {
      home: "Ana Sayfa",
      corporate: "Kurumsal",
      visionMission: "Vizyon & Misyon",
    },
    hero: {
      titleHighlight: "Vizyon",
      title: "& Misyon",
      description: "Kalinda Yapı olarak hedefimiz, Ortaca, Dalyan, Köyceğiz ve tüm Muğla bölgesinin en güvenilir ve tercih edilen yapı ve emlak markası olmaktır. 2022'den bu yana edindiğimiz deneyim ve müşteri memnuniyeti odaklı yaklaşımımızla bu hedefe ulaşmak için belirlediğimiz vizyon ve misyon ilkelerimizi sizlerle paylaşıyoruz.",
    },
    mission: {
      title: "Misyonumuz",
      paragraphs: [
        "Ortaca merkez, Dalyan, Köyceğiz, Dalaman ve Fethiye bölgelerinde <strong>güvenilir, şeffaf ve kaliteli</strong> emlak danışmanlığı ile yapı çözümleri sunmak. Her müşterimize bölgenin koşullarına uygun, gerçekçi ve dürüst danışmanlık hizmeti sağlamak.",
        "Müşterilerimizin ev sahibi olma hayallerini gerçeğe dönüştürmelerine yardımcı olmak ve her projede <strong>en yüksek memnuniyeti</strong> sağlamak. İster ilk evinizi arıyor olun, ister yatırım amaçlı gayrimenkul, ihtiyacınıza uygun çözümler sunuyoruz.",
        "Muğla bölgesinin konut ve ticari gayrimenkul ihtiyaçlarına modern, sürdürülebilir ve çevre dostu çözümler sunarak topluma değer katmak. Yerel istihdama katkı sağlamak ve bölge ekonomisini güçlendirmek.",
      ],
    },
    vision: {
      title: "Vizyonumuz",
      paragraphs: [
        "Ortaca, Dalyan, Köyceğiz ve tüm Muğla bölgesinin <strong>en saygın ve tercih edilen</strong> yapı ve emlak markası olmak. Müşteri memnuniyetinde sektör lideri konumuna ulaşmak.",
        "<strong>Yenilikçi yaklaşımlar ve dijital teknoloji</strong> ile sektörde öncü olmak. Sanal turlar, online ilan yönetimi ve hızlı iletişim kanallarıyla müşterilerimize modern deneyim sunmak.",
        "<strong>Sürdürülebilir ve çevre dostu</strong> yapı uygulamalarını benimseyerek geleceğe yatırım yapmak. Enerji verimli konutlar, doğal malzemeler ve yeşil alan projeleriyle bölgenin çevresel değerlerini korumak.",
      ],
    },
    goals: {
      badge: "Stratejik Hedefler",
      title: "2026 ve Sonrası Hedeflerimiz",
      description: "Belirlediğimiz stratejik hedefler doğrultusunda büyümeye ve gelişmeye devam ediyoruz.",
      items: [
        { baslik: "Sürdürülebilir Büyüme", aciklama: "Her yıl %20 büyüme hedefi ile istikrarlı gelişim" },
        { baslik: "Müşteri Memnuniyeti", aciklama: "%95 üzeri müşteri memnuniyeti oranı" },
        { baslik: "Bölgesel Genişleme", aciklama: "Muğla'nın tüm ilçelerinde hizmet ağı" },
        { baslik: "Toplumsal Katkı", aciklama: "Yerel istihdama ve ekonomiye katkı" },
      ],
    },
    values: {
      badge: "Değerlerimiz",
      title: "Bizi Biz Yapan Değerler",
      description: "Her kararımızda ve her projemizde bu değerleri rehber alıyoruz.",
      items: [
        { baslik: "Güven", aciklama: "Müşterilerimizle güvene dayalı ilişkiler kuruyoruz. Şeffaf iletişim ve dürüst hizmet anlayışımızla fark yaratıyoruz." },
        { baslik: "Şeffaflık", aciklama: "Tüm süreçlerde açık ve net bilgi sunuyoruz. Gizli maliyet veya sürpriz olmadan çalışıyoruz." },
        { baslik: "Kalite", aciklama: "Her projede en yüksek kalite standartlarını hedefliyoruz. Kaliteli malzeme ve işçilik garantisi veriyoruz." },
        { baslik: "Bölgesel Bağlılık", aciklama: "Ortaca ve Muğla bölgesinin gelişimine katkıda bulunuyoruz. Yerel topluluğun bir parçası olmaktan gurur duyuyoruz." },
      ],
    },
    cta: {
      title: "Değerlerimizi Paylaşıyor musunuz?",
      description: "Kalinda Yapı ile çalışmak ve güvenilir bir iş ortağı edinmek için bizimle iletişime geçin.",
      contact: "İletişime Geç",
      about: "Hakkımızda",
    },
  },
  en: {
    breadcrumbs: {
      home: "Home",
      corporate: "Corporate",
      visionMission: "Vision & Mission",
    },
    hero: {
      titleHighlight: "Vision",
      title: "& Mission",
      description: "Our goal at Kalinda Yapı is to be the most trusted and preferred construction and real estate brand in Ortaca, Dalyan, Köyceğiz, and the entire Muğla region. We share with you our vision and mission principles that we have set to achieve this goal with our experience and customer satisfaction-focused approach since 2022.",
    },
    mission: {
      title: "Our Mission",
      paragraphs: [
        "To provide <strong>reliable, transparent, and quality</strong> real estate consultancy and construction solutions in Ortaca center, Dalyan, Köyceğiz, Dalaman, and Fethiye regions. To provide realistic and honest consultancy service to each of our customers according to regional conditions.",
        "To help our customers realize their dreams of homeownership and to ensure <strong>the highest satisfaction</strong> in every project. Whether you are looking for your first home or investment property, we offer solutions tailored to your needs.",
        "To add value to society by offering modern, sustainable, and environmentally friendly solutions for the residential and commercial real estate needs of the Muğla region. To contribute to local employment and strengthen the regional economy.",
      ],
    },
    vision: {
      title: "Our Vision",
      paragraphs: [
        "To be <strong>the most respected and preferred</strong> construction and real estate brand in Ortaca, Dalyan, Köyceğiz, and the entire Muğla region. To achieve industry leadership in customer satisfaction.",
        "To be a pioneer in the sector with <strong>innovative approaches and digital technology</strong>. To offer our customers a modern experience with virtual tours, online listing management, and fast communication channels.",
        "To invest in the future by adopting <strong>sustainable and environmentally friendly</strong> building practices. To protect the environmental values of the region with energy-efficient homes, natural materials, and green space projects.",
      ],
    },
    goals: {
      badge: "Strategic Goals",
      title: "Our Goals for 2026 and Beyond",
      description: "We continue to grow and develop in line with our strategic goals.",
      items: [
        { baslik: "Sustainable Growth", aciklama: "Stable development with 20% annual growth target" },
        { baslik: "Customer Satisfaction", aciklama: "Over 95% customer satisfaction rate" },
        { baslik: "Regional Expansion", aciklama: "Service network in all districts of Muğla" },
        { baslik: "Social Contribution", aciklama: "Contribution to local employment and economy" },
      ],
    },
    values: {
      badge: "Our Values",
      title: "The Values That Make Us Who We Are",
      description: "We take these values as a guide in every decision and every project.",
      items: [
        { baslik: "Trust", aciklama: "We build trust-based relationships with our customers. We make a difference with our transparent communication and honest service approach." },
        { baslik: "Transparency", aciklama: "We provide clear and precise information in all processes. We work without hidden costs or surprises." },
        { baslik: "Quality", aciklama: "We aim for the highest quality standards in every project. We guarantee quality materials and workmanship." },
        { baslik: "Regional Commitment", aciklama: "We contribute to the development of Ortaca and Muğla region. We are proud to be part of the local community." },
      ],
    },
    cta: {
      title: "Do You Share Our Values?",
      description: "Contact us to work with Kalinda Yapı and gain a reliable business partner.",
      contact: "Contact Us",
      about: "About Us",
    },
  },
  ar: {
    breadcrumbs: {
      home: "الرئيسية",
      corporate: "الشركة",
      visionMission: "الرؤية والرسالة",
    },
    hero: {
      titleHighlight: "الرؤية",
      title: "والرسالة",
      description: "هدفنا في كاليندا يابي هو أن نكون العلامة التجارية الأكثر ثقة وتفضيلاً في مجال البناء والعقارات في أورتاجا ودالان وكويجيز وجميع أنحاء منطقة موغلا. نشارك معكم مبادئ رؤيتنا ورسالتنا التي حددناها لتحقيق هذا الهدف من خلال خبرتنا ونهجنا الذي يركز على رضا العملاء منذ عام 2022.",
    },
    mission: {
      title: "رسالتنا",
      paragraphs: [
        "تقديم استشارات عقارية وحلول بناء <strong>موثوقة وشفافة وعالية الجودة</strong> في مركز أورتاجا ودالان وكويجيز ودالامان وفتحية. تقديم خدمة استشارية واقعية وصادقة لكل عميل وفقاً للظروف الإقليمية.",
        "مساعدة عملائنا على تحقيق أحلامهم في امتلاك المنازل وضمان <strong>أعلى مستوى من الرضا</strong> في كل مشروع. سواء كنت تبحث عن منزلك الأول أو عقار استثماري، نقدم حلولاً مخصصة لاحتياجاتك.",
        "إضافة قيمة للمجتمع من خلال تقديم حلول حديثة ومستدامة وصديقة للبيئة لاحتياجات العقارات السكنية والتجارية في منطقة موغلا. المساهمة في التوظيف المحلي وتعزيز الاقتصاد الإقليمي.",
      ],
    },
    vision: {
      title: "رؤيتنا",
      paragraphs: [
        "أن نكون العلامة التجارية <strong>الأكثر احتراماً وتفضيلاً</strong> في مجال البناء والعقارات في أورتاجا ودالان وكويجيز وجميع أنحاء منطقة موغلا. تحقيق الريادة في القطاع من حيث رضا العملاء.",
        "أن نكون رواداً في القطاع من خلال <strong>الأساليب المبتكرة والتقنية الرقمية</strong>. تقديم تجربة حديثة لعملائنا من خلال الجولات الافتراضية وإدارة القوائم عبر الإنترنت وقنوات الاتصال السريعة.",
        "الاستثمار في المستقبل من خلال تبني ممارسات البناء <strong>المستدامة والصديقة للبيئة</strong>. حماية القيم البيئية للمنطقة من خلال المنازل الموفرة للطاقة والمواد الطبيعية ومشاريع المساحات الخضراء.",
      ],
    },
    goals: {
      badge: "الأهداف الاستراتيجية",
      title: "أهدافنا لعام 2026 وما بعده",
      description: "نواصل النمو والتطور وفقاً لأهدافنا الاستراتيجية.",
      items: [
        { baslik: "النمو المستدام", aciklama: "تطور مستقر بهدف نمو سنوي 20%" },
        { baslik: "رضا العملاء", aciklama: "معدل رضا العملاء أكثر من 95%" },
        { baslik: "التوسع الإقليمي", aciklama: "شبكة خدمات في جميع مناطق موغلا" },
        { baslik: "المساهمة الاجتماعية", aciklama: "المساهمة في التوظيف المحلي والاقتصاد" },
      ],
    },
    values: {
      badge: "قيمنا",
      title: "القيم التي تجعلنا ما نحن عليه",
      description: "نتخذ هذه القيم دليلاً في كل قرار وكل مشروع.",
      items: [
        { baslik: "الثقة", aciklama: "نبني علاقات قائمة على الثقة مع عملائنا. نحدث فرقاً بنهجنا في التواصل الشفاف والخدمة الصادقة." },
        { baslik: "الشفافية", aciklama: "نقدم معلومات واضحة ودقيقة في جميع العمليات. نعمل بدون تكاليف خفية أو مفاجآت." },
        { baslik: "الجودة", aciklama: "نهدف إلى أعلى معايير الجودة في كل مشروع. نضمن مواد وحرفية عالية الجودة." },
        { baslik: "الالتزام الإقليمي", aciklama: "نساهم في تنمية منطقة أورتاجا وموغلا. نفخر بكوننا جزءاً من المجتمع المحلي." },
      ],
    },
    cta: {
      title: "هل تشاركنا قيمنا؟",
      description: "تواصل معنا للعمل مع كاليندا يابي والحصول على شريك تجاري موثوق.",
      contact: "تواصل معنا",
      about: "من نحن",
    },
  },
};

const goalIcons = [TrendingUp, Users, Compass, Heart];
const valueIcons = [Shield, Lightbulb, Award, MapPin];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getCachedDictionary(locale);
  const url = buildLocalizedUrl("/kurumsal/vizyon-misyon", locale);

  return {
    title: dict.nav.visionMission,
    description: dict.meta.description,
    openGraph: {
      title: dict.nav.visionMission,
      description: dict.meta.description,
      url,
    },
    alternates: buildSeoAlternates("/kurumsal/vizyon-misyon", locale),
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function VizyonMisyonPage({
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
    { name: t.breadcrumbs.visionMission, url: `/${locale}/kurumsal/vizyon-misyon` },
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
            <span className="text-[#C9A84C]">{t.breadcrumbs.visionMission}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="text-[#C9A84C]">{t.hero.titleHighlight}</span> {t.hero.title}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              {t.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card padding="lg" className="border-l-4 border-l-[#0B1F3A]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#0B1F3A] flex items-center justify-center">
                  <Target className="w-8 h-8 text-[#C9A84C]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B1F3A]">{t.mission.title}</h2>
              </div>
              <div className="space-y-4 text-[#666666]">
                {t.mission.paragraphs.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            </Card>

            <Card padding="lg" className="border-l-4 border-l-[#C9A84C]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#C9A84C] flex items-center justify-center">
                  <Eye className="w-8 h-8 text-[#0B1F3A]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B1F3A]">{t.vision.title}</h2>
              </div>
              <div className="space-y-4 text-[#666666]">
                {t.vision.paragraphs.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              {t.goals.badge}
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              {t.goals.title}
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              {t.goals.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.goals.items.map((hedef, index) => {
              const Icon = goalIcons[index];
              return (
                <Card key={hedef.baslik} padding="lg" className="text-center group hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-2xl bg-[#0B1F3A] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C9A84C] transition-colors">
                    <Icon className="w-8 h-8 text-[#C9A84C] group-hover:text-[#0B1F3A] transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#0B1F3A] mb-2">{hedef.baslik}</h3>
                  <p className="text-sm text-[#666666]">{hedef.aciklama}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              {t.values.badge}
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              {t.values.title}
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              {t.values.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.values.items.map((deger, index) => {
              const Icon = valueIcons[index];
              return (
                <Card key={deger.baslik} padding="lg" className="text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-[#0B1F3A]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C9A84C]/20 transition-colors">
                    <Icon className="w-8 h-8 text-[#0B1F3A] group-hover:text-[#C9A84C] transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#0B1F3A] mb-2">{deger.baslik}</h3>
                  <p className="text-sm text-[#666666]">{deger.aciklama}</p>
                </Card>
              );
            })}
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
            <Link href={`/${locale}/hakkimizda`}>
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
