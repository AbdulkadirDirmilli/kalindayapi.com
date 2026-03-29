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
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.belgeler;

const belgeler = [
  {
    ikon: FileCheck,
    baslik: "Emlak Danışmanlığı Yetki Belgesi",
    aciklama: "T.C. Ticaret Bakanlığı onaylı emlak danışmanlığı yetki belgesi",
    durum: "aktif",
    tarih: "2022",
    detay: "Resmi emlak alım-satım ve kiralama işlemleri yapma yetkisi",
  },
  {
    ikon: Building2,
    baslik: "Ticaret Sicil Belgesi",
    aciklama: "Muğla Ticaret Sicil Müdürlüğü tescil belgesi",
    durum: "aktif",
    tarih: "2022",
    detay: "Şirket kuruluş ve faaliyet belgesi",
  },
  {
    ikon: Shield,
    baslik: "İş Güvenliği Sertifikası",
    aciklama: "İş Sağlığı ve Güvenliği eğitim sertifikası",
    durum: "aktif",
    tarih: "2023",
    detay: "Şantiye ve tadilat işlerinde iş güvenliği standartları",
  },
  {
    ikon: Briefcase,
    baslik: "Vergi Levhası",
    aciklama: "Muğla Vergi Dairesi kayıtlı mükellef belgesi",
    durum: "aktif",
    tarih: "2022",
    detay: "Resmi vergi mükellefi kaydı",
  },
];

const hedefBelgeler = [
  {
    ikon: Award,
    baslik: "ISO 9001 Kalite Yönetimi",
    aciklama: "Kalite yönetim sistemi sertifikası",
    hedefTarih: "2025",
    ilerleme: 60,
  },
  {
    ikon: GraduationCap,
    baslik: "Yeşil Bina Sertifikası",
    aciklama: "Sürdürülebilir yapı uygulamaları belgesi",
    hedefTarih: "2026",
    ilerleme: 30,
  },
];

const uyeler = [
  "Muğla Ticaret ve Sanayi Odası",
  "Ortaca Esnaf ve Sanatkarlar Odası",
  "Türkiye Emlak Müşavirleri Federasyonu",
];

export default function BelgelerPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Kurumsal", url: "/hakkimizda" },
    { name: "Belgeler & Sertifikalar", url: "/kurumsal/belgeler" },
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
            <span className="text-[#C9A84C]">Belgeler & Sertifikalar</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Belgeler & <span className="text-[#C9A84C]">Sertifikalar</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Kalinda Yapı olarak tüm yasal gerekliliklere uygun, resmi belge
              ve sertifikalarla hizmet veriyoruz. Şeffaflık ilkemiz gereği
              belgelerimizi sizlerle paylaşıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Active Certificates */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              Aktif Belgeler
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              Mevcut Sertifikalarımız
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Resmi olarak yetkilendirilmiş ve güncel belgelerimiz.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {belgeler.map((belge) => {
              const Icon = belge.ikon;
              return (
                <Card key={belge.baslik} padding="lg" className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-3 py-1 rounded-bl-lg flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Aktif
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
                        Alınış: {belge.tarih}
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
              Hedef Belgeler
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              Almayı Hedeflediğimiz Sertifikalar
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Kalite standartlarımızı yükseltmek için çalıştığımız belgeler.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {hedefBelgeler.map((belge) => {
              const Icon = belge.ikon;
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
                      <span className="text-[#666666]">İlerleme</span>
                      <span className="font-medium text-[#0B1F3A]">{belge.ilerleme}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C9A84C] rounded-full transition-all"
                        style={{ width: `${belge.ilerleme}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#666666] text-right">
                      Hedef: {belge.hedefTarih}
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
              Üyelikler
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              Üyesi Olduğumuz Kuruluşlar
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Sektörel kuruluşlarda aktif üyeliğimiz bulunmaktadır.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {uyeler.map((uye) => (
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
              Güvenilir ve Şeffaf Hizmet
            </h2>
            <p className="text-[#666666] leading-relaxed">
              Tüm belgelerimiz güncel ve geçerlidir. Yasal düzenlemelere tam uyum
              sağlayarak müşterilerimize güvenli hizmet sunmaktayız. Herhangi bir
              belgemizi görmek isterseniz ofisimizi ziyaret edebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Daha Fazla Bilgi Almak İster misiniz?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Belgelerimiz ve hizmetlerimiz hakkında detaylı bilgi için
            bizimle iletişime geçebilirsiniz.
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
