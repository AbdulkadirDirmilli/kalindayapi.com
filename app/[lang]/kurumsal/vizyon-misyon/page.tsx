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

const degerler = [
  {
    ikon: Shield,
    baslik: "Güven",
    aciklama:
      "Müşterilerimizle güvene dayalı ilişkiler kuruyoruz. Şeffaf iletişim ve dürüst hizmet anlayışımızla fark yaratıyoruz.",
  },
  {
    ikon: Lightbulb,
    baslik: "Şeffaflık",
    aciklama:
      "Tüm süreçlerde açık ve net bilgi sunuyoruz. Gizli maliyet veya sürpriz olmadan çalışıyoruz.",
  },
  {
    ikon: Award,
    baslik: "Kalite",
    aciklama:
      "Her projede en yüksek kalite standartlarını hedefliyoruz. Kaliteli malzeme ve işçilik garantisi veriyoruz.",
  },
  {
    ikon: MapPin,
    baslik: "Bölgesel Bağlılık",
    aciklama:
      "Ortaca ve Muğla bölgesinin gelişimine katkıda bulunuyoruz. Yerel topluluğun bir parçası olmaktan gurur duyuyoruz.",
  },
];

const stratejikHedefler = [
  {
    ikon: TrendingUp,
    baslik: "Sürdürülebilir Büyüme",
    aciklama: "Her yıl %20 büyüme hedefi ile istikrarlı gelişim",
  },
  {
    ikon: Users,
    baslik: "Müşteri Memnuniyeti",
    aciklama: "%95 üzeri müşteri memnuniyeti oranı",
  },
  {
    ikon: Compass,
    baslik: "Bölgesel Genişleme",
    aciklama: "Muğla'nın tüm ilçelerinde hizmet ağı",
  },
  {
    ikon: Heart,
    baslik: "Toplumsal Katkı",
    aciklama: "Yerel istihdama ve ekonomiye katkı",
  },
];

export default function VizyonMisyonPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Kurumsal", url: "/hakkimizda" },
    { name: "Vizyon & Misyon", url: "/kurumsal/vizyon-misyon" },
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
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/hakkimizda" className="hover:text-[#C9A84C] transition-colors">
              Kurumsal
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">Vizyon & Misyon</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="text-[#C9A84C]">Vizyon</span> & Misyon
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Kalinda Yapı olarak hedefimiz, Ortaca, Dalyan, Köyceğiz ve tüm Muğla bölgesinin en güvenilir ve
              tercih edilen yapı ve emlak markası olmaktır. 2022'den bu yana edindiğimiz deneyim ve
              müşteri memnuniyeti odaklı yaklaşımımızla bu hedefe ulaşmak için belirlediğimiz vizyon ve
              misyon ilkelerimizi sizlerle paylaşıyoruz.
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
                <h2 className="text-2xl font-bold text-[#0B1F3A]">Misyonumuz</h2>
              </div>
              <div className="space-y-4 text-[#666666]">
                <p className="leading-relaxed">
                  Ortaca merkez, Dalyan, Köyceğiz, Dalaman ve Fethiye bölgelerinde <strong>güvenilir, şeffaf ve kaliteli</strong> emlak danışmanlığı ile yapı çözümleri sunmak. Her müşterimize bölgenin koşullarına uygun, gerçekçi ve dürüst danışmanlık hizmeti sağlamak.
                </p>
                <p className="leading-relaxed">
                  Müşterilerimizin ev sahibi olma hayallerini gerçeğe dönüştürmelerine yardımcı olmak ve her projede <strong>en yüksek memnuniyeti</strong> sağlamak. İster ilk evinizi arıyor olun, ister yatırım amaçlı gayrimenkul, ihtiyacınıza uygun çözümler sunuyoruz.
                </p>
                <p className="leading-relaxed">
                  Muğla bölgesinin konut ve ticari gayrimenkul ihtiyaçlarına modern, sürdürülebilir ve çevre dostu çözümler sunarak topluma değer katmak. Yerel istihdama katkı sağlamak ve bölge ekonomisini güçlendirmek.
                </p>
              </div>
            </Card>

            <Card padding="lg" className="border-l-4 border-l-[#C9A84C]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#C9A84C] flex items-center justify-center">
                  <Eye className="w-8 h-8 text-[#0B1F3A]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B1F3A]">Vizyonumuz</h2>
              </div>
              <div className="space-y-4 text-[#666666]">
                <p className="leading-relaxed">
                  Ortaca, Dalyan, Köyceğiz ve tüm Muğla bölgesinin <strong>en saygın ve tercih edilen</strong> yapı ve emlak markası olmak. Müşteri memnuniyetinde sektör lideri konumuna ulaşmak.
                </p>
                <p className="leading-relaxed">
                  <strong>Yenilikçi yaklaşımlar ve dijital teknoloji</strong> ile sektörde öncü olmak. Sanal turlar, online ilan yönetimi ve hızlı iletişim kanallarıyla müşterilerimize modern deneyim sunmak.
                </p>
                <p className="leading-relaxed">
                  <strong>Sürdürülebilir ve çevre dostu</strong> yapı uygulamalarını benimseyerek geleceğe yatırım yapmak. Enerji verimli konutlar, doğal malzemeler ve yeşil alan projeleriyle bölgenin çevresel değerlerini korumak.
                </p>
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
              Stratejik Hedefler
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              2026 ve Sonrası Hedeflerimiz
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Belirlediğimiz stratejik hedefler doğrultusunda büyümeye ve
              gelişmeye devam ediyoruz.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stratejikHedefler.map((hedef) => {
              const Icon = hedef.ikon;
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
              Değerlerimiz
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              Bizi Biz Yapan Değerler
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Her kararımızda ve her projemizde bu değerleri rehber alıyoruz.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {degerler.map((deger) => {
              const Icon = deger.ikon;
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
            Değerlerimizi Paylaşıyor musunuz?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Kalinda Yapı ile çalışmak ve güvenilir bir iş ortağı edinmek için
            bizimle iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/iletisim">
              <Button variant="accent" size="lg">
                İletişime Geç
              </Button>
            </Link>
            <Link href="/hakkimizda">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                Hakkımızda
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
