import { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Target,
  Eye,
  Heart,
  Shield,
  Lightbulb,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Award,
  Users,
  Building2,
  HardHat,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { OrtaklarBolumu, IstatistikSayaclari } from "@/components/sections";
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { createWhatsAppLink } from "@/lib/utils";

export const metadata: Metadata = pageMetadata.hakkimizda;

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

export default function HakkimizdaPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hakkımızda", url: "/hakkimizda" },
  ]);

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
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
            <span className="text-[#C9A84C]">Hakkımızda</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="text-[#C9A84C]">Kalinda Yapı</span> Hakkında
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              2022 yılından bu yana Muğla'nın Ortaca ilçesinde emlak danışmanlığı,
              tadilat ve inşaat taahhüt hizmetleri sunuyoruz. Zafer Soylu ve Arif
              Dağdelen ortaklığıyla kurulan firmamız, bölgenin en güvenilir yapı
              ve emlak markalarından biri olmayı hedeflemektedir.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
                Hikayemiz
              </span>
              <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-6">
                Ortaca'da Doğduk, Ortaca İçin Çalışıyoruz
              </h2>
              <div className="space-y-4 text-[#666666] leading-relaxed">
                <p>
                  Kalinda Yapı, 2022 yılında Zafer Soylu ve Arif Dağdelen'in
                  ortaklığıyla Ortaca'da kurulmuştur. Her iki ortağımız da bu
                  topraklarda doğup büyümüş, bölgenin ihtiyaçlarını yakından
                  tanıyan isimlerdir.
                </p>
                <p>
                  Zafer Soylu, emlak sektöründeki deneyimiyle bölgenin
                  gayrimenkul dinamiklerine hakim bir profesyoneldir. Arif
                  Dağdelen ise inşaat sektöründeki tecrübesiyle sayısız
                  konut, villa ve ticari proje tamamlamıştır.
                </p>
                <p>
                  Bugün, 100'den fazla tamamlanmış proje ve 200'den fazla mutlu
                  aile ile Ortaca ve çevresinin güvenilir yapı ve emlak ortağı
                  olmaya devam ediyoruz.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {[
                { yil: "2022", baslik: "Kuruluş", aciklama: "Kalinda Yapı Ortaca'da faaliyete başladı" },
                { yil: "2023", baslik: "Büyüme", aciklama: "İlk projelerimizi başarıyla tamamladık" },
                { yil: "2024", baslik: "Genişleme", aciklama: "Dalyan ve Köyceğiz'e hizmet alanımızı genişlettik" },
                { yil: "2025", baslik: "Dijitalleşme", aciklama: "AKD Universe ile web sitesi ve dijital dönüşüm" },
              ].map((item, index) => (
                <div key={item.yil} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0B1F3A] font-bold text-sm">
                      {item.yil}
                    </div>
                    {index < 4 && (
                      <div className="w-0.5 h-full bg-[#e0e0e0] my-2" />
                    )}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-[#0B1F3A]">{item.baslik}</h3>
                    <p className="text-sm text-[#666666]">{item.aciklama}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card padding="lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0B1F3A] flex items-center justify-center">
                  <Target className="w-7 h-7 text-[#C9A84C]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B1F3A]">Misyonumuz</h2>
              </div>
              <p className="text-[#666666] leading-relaxed">
                Ortaca ve Muğla bölgesinde güvenilir, şeffaf ve kaliteli emlak
                danışmanlığı ile yapı çözümleri sunmak. Müşterilerimizin
                hayallerini gerçeğe dönüştürmelerine yardımcı olmak ve her
                projede en yüksek memnuniyeti sağlamak.
              </p>
            </Card>

            <Card padding="lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#C9A84C] flex items-center justify-center">
                  <Eye className="w-7 h-7 text-[#0B1F3A]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B1F3A]">Vizyonumuz</h2>
              </div>
              <p className="text-[#666666] leading-relaxed">
                Muğla bölgesinin en saygın ve tercih edilen yapı ve emlak markası
                olmak. Yenilikçi yaklaşımlar ve teknoloji ile sektörde öncü olmak.
                Sürdürülebilir ve çevre dostu yapı uygulamalarını benimsemek.
              </p>
            </Card>
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

      {/* Statistics */}
      <IstatistikSayaclari />

      {/* Team Section */}
      <OrtaklarBolumu />

      {/* Certificates */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              Belgelerimiz
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              Sertifikalar & Belgeler
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Resmi olarak yetkilendirilmiş ve sertifikalı hizmet sunuyoruz.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { baslik: "Emlak Danışmanlığı Lisansı", aciklama: "Resmi emlak danışmanlığı yetki belgesi" },
              { baslik: "Ticaret Odası Kaydı", aciklama: "Muğla Ticaret Odası üyeliği" },
              { baslik: "İş Güvenliği Belgesi", aciklama: "İş sağlığı ve güvenliği sertifikası" },
              { baslik: "ISO 9001 (Hedef)", aciklama: "Kalite yönetim sistemi hedefi" },
            ].map((belge) => (
              <Card key={belge.baslik} padding="lg" className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#C9A84C]" />
                </div>
                <h3 className="font-bold text-[#0B1F3A] mb-1">{belge.baslik}</h3>
                <p className="text-xs text-[#666666]">{belge.aciklama}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Web Design Credit */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-[#666666]">
              Web sitemiz{" "}
              <a
                href="https://www.akduniverse.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A84C] hover:text-[#0B1F3A] font-semibold transition-colors"
              >
                AKD Universe
              </a>
              {" "}tarafından tasarlanmış ve geliştirilmiştir.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bizimle Çalışmak İster misiniz?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Emlak, tadilat veya inşaat projeleriniz için bizimle iletişime geçin.
            Ücretsiz danışmanlık hizmetimizden yararlanın.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/iletisim">
              <Button variant="accent" size="lg">
                İletişime Geç
              </Button>
            </Link>
            <a
              href={createWhatsAppLink(
                "905370530754",
                "Merhaba, Kalinda Yapı hakkında bilgi almak istiyorum."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="whatsapp"
                size="lg"
                leftIcon={<MessageCircle className="w-5 h-5" />}
              >
                WhatsApp ile Yazın
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
