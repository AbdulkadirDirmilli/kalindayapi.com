import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  ChevronRight,
  Building2,
  Home as HomeIcon,
  PaintBucket,
  Users,
  Star,
  Quote,
  MapPin,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { IstatistikSayaclari } from "@/components/sections";
import { generateBreadcrumbSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.referanslar;

const projeler = [
  {
    kategori: "Konut Projeleri",
    ikon: HomeIcon,
    sayi: "50+",
    aciklama: "Konut tadilat ve yenileme projesi",
    ornekler: ["Daire renovasyonları", "Villa tadilatları", "Bahçeli ev projeleri"],
  },
  {
    kategori: "Ticari Projeler",
    ikon: Building2,
    sayi: "25+",
    aciklama: "Ticari alan düzenlemesi",
    ornekler: ["Ofis dekorasyonları", "Mağaza tadilatları", "Restoran projeleri"],
  },
  {
    kategori: "Tadilat Projeleri",
    ikon: PaintBucket,
    sayi: "100+",
    aciklama: "Kapsamlı tadilat projesi",
    ornekler: ["Mutfak yenileme", "Banyo tadilat", "Dış cephe boyama"],
  },
  {
    kategori: "Emlak İşlemleri",
    ikon: Users,
    sayi: "200+",
    aciklama: "Başarılı emlak işlemi",
    ornekler: ["Satış danışmanlığı", "Kiralama hizmetleri", "Yatırım danışmanlığı"],
  },
];

const musteriYorumlari = [
  {
    isim: "Ahmet Y.",
    konum: "Ortaca",
    yorum:
      "Kalinda Yapı ile villam için tadilat projesi yaptık. Zamanında teslim ettiler ve kalite beklediğimizin üzerindeydi. Kesinlikle tavsiye ediyorum.",
    puan: 5,
    tarih: "Ocak 2025",
  },
  {
    isim: "Fatma K.",
    konum: "Dalyan",
    yorum:
      "Emlak danışmanlığı hizmetlerinden çok memnun kaldım. Zafer Bey'in bölgeyi tanıması ve profesyonel yaklaşımı sayesinde hayalimdeki evi buldum.",
    puan: 5,
    tarih: "Aralık 2024",
  },
  {
    isim: "Mehmet S.",
    konum: "Köyceğiz",
    yorum:
      "Mutfak ve banyo tadilatımızı Kalinda Yapı ile yaptık. İşçilik kalitesi ve malzeme seçimi mükemmeldi. Fiyat-performans açısından çok iyiydi.",
    puan: 5,
    tarih: "Kasım 2024",
  },
  {
    isim: "Ayşe T.",
    konum: "Ortaca",
    yorum:
      "Dairemizin satışında Kalinda Yapı'dan destek aldık. Profesyonel fotoğraf çekimi, doğru fiyatlandırma ve hızlı satış süreci için teşekkürler.",
    puan: 5,
    tarih: "Ekim 2024",
  },
];

const hizmetBolgeleri = [
  "Ortaca Merkez",
  "Dalyan",
  "Köyceğiz",
  "Dalaman",
  "Fethiye",
  "Sarıgerme",
  "Sultaniye",
  "Ekincik",
];

export default function ReferanslarPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Kurumsal", url: "/hakkimizda" },
    { name: "Referanslar", url: "/kurumsal/referanslar" },
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
            <span className="text-[#C9A84C]">Referanslar</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="text-[#C9A84C]">Referanslarımız</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              2022'den bu yana Ortaca ve çevresinde tamamladığımız projeler
              ve hizmet verdiğimiz mutlu müşterilerimiz. Her projemiz, güven
              ve kalite anlayışımızın bir yansımasıdır.
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
              Proje Kategorileri
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              Tamamladığımız Projeler
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Farklı kategorilerde tamamladığımız projelerimizle müşterilerimize
              değer katıyoruz.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projeler.map((proje) => {
              const Icon = proje.ikon;
              return (
                <Card key={proje.kategori} padding="lg" className="group hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-2xl bg-[#0B1F3A] flex items-center justify-center mb-4 group-hover:bg-[#C9A84C] transition-colors">
                    <Icon className="w-8 h-8 text-[#C9A84C] group-hover:text-[#0B1F3A] transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#0B1F3A] mb-1">{proje.kategori}</h3>
                  <p className="text-3xl font-bold text-[#C9A84C] mb-2">{proje.sayi}</p>
                  <p className="text-sm text-[#666666] mb-4">{proje.aciklama}</p>
                  <ul className="space-y-1">
                    {proje.ornekler.map((ornek, index) => (
                      <li key={index} className="text-xs text-[#666666] flex items-center gap-2">
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

      {/* Customer Reviews */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              Müşteri Yorumları
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              Müşterilerimiz Ne Diyor?
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Hizmet verdiğimiz müşterilerimizden gelen değerli geri bildirimler.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {musteriYorumlari.map((yorum, index) => (
              <Card key={index} padding="lg" className="relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-[#C9A84C]/30" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(yorum.puan)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
                  ))}
                </div>
                <p className="text-[#666666] leading-relaxed mb-4 italic">
                  "{yorum.yorum}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#0B1F3A]">{yorum.isim}</p>
                    <p className="text-sm text-[#666666] flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {yorum.konum}
                    </p>
                  </div>
                  <span className="text-xs text-[#666666]">{yorum.tarih}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              Hizmet Bölgeleri
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              Nerede Hizmet Veriyoruz?
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Ortaca merkez olmak üzere çevre ilçe ve beldelerde hizmet veriyoruz.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {hizmetBolgeleri.map((bolge) => (
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
            Siz de Referanslarımız Arasında Yerinizi Alın
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Emlak, tadilat veya inşaat projeleriniz için bizimle iletişime geçin.
            Kalinda Yapı kalitesini siz de deneyimleyin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/iletisim">
              <Button variant="accent" size="lg">
                İletişime Geç
              </Button>
            </Link>
            <Link href="/ilanlar">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                İlanları İncele
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
