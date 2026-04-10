import { Metadata } from "next";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/jsonld";

// SSS için tüm sorular - Schema.org için (2026 SEO Optimized)
const faqData = [
  {
    soru: "Kalinda Yapı hangi bölgelerde hizmet veriyor?",
    cevap: "Kalinda Yapı olarak Muğla'nın tüm ilçelerinde aktif portföyümüz bulunuyor: Ortaca, Dalyan, Köyceğiz, Dalaman, Fethiye, Marmaris, Bodrum, Milas, Datça, Menteşe, Yatağan, Ula, Kavaklıdere ve Seydikemer. 2022'den bu yana 200+ emlak işlemi ve 100+ tadilat projesi tamamladık.",
  },
  {
    soru: "2026'da Ortaca'da satılık daire fiyatları ne kadar?",
    cevap: "Ortaca'da 2026 itibarıyla konut fiyatları: Merkez ve site içi 2+1 daireler 4-10 milyon TL, 3+1 daireler 7-18 milyon TL aralığındadır. Metrekare fiyatları 25.000-40.000 TL arasında seyrediyor.",
  },
  {
    soru: "Dalyan'da villa satın almak için ne kadar bütçe gerekir?",
    cevap: "Dalyan'da 2026 yılında villa fiyatları 12 milyon TL'den başlayıp, kanal manzaralı ve havuzlu villalarda 80 milyon TL'ye kadar çıkabiliyor. Metrekare fiyatları 35.000-60.000 TL aralığında.",
  },
  {
    soru: "Emlak danışmanlık hizmeti ücretli mi?",
    cevap: "Ev arayanlar için danışmanlık görüşmeleri tamamen ücretsizdir. Satış tamamlandığında satış bedelinin %2'si komisyon olarak alınır. Kiralama işlemlerinde 1 aylık kira bedeli komisyon uygulanır. Gizli maliyet yoktur.",
  },
  {
    soru: "Anahtar teslim ev inşaatı ne kadar sürer?",
    cevap: "Anahtar teslim ev inşaatı projenin büyüklüğüne göre değişir: 150-200 m² tek katlı müstakil ev 8-10 ay, iki katlı villa 12-15 ay, havuzlu ve peyzajlı projeler 15-18 ay sürmektedir.",
  },
  {
    soru: "Tadilat projesi için ücretsiz keşif yapıyor musunuz?",
    cevap: "Evet, Ortaca, Dalyan, Köyceğiz ve tüm Muğla genelinde ücretsiz yerinde keşif yapıyoruz. 3-5 iş günü içinde detaylı maliyet teklifi sunuyoruz. Teklif kabul edilmezse hiçbir ücret talep etmiyoruz.",
  },
  {
    soru: "Mutfak ve banyo tadilatı ne kadar sürer?",
    cevap: "Ortalama süreler: Banyo tadilatı 10-15 gün, mutfak tadilatı 15-20 gün, komple daire tadilatı 6-10 hafta. 100+ tamamlanmış projemizde %95 zamanında teslim oranımız var.",
  },
  {
    soru: "İnşaat ve tadilat işlerinde garanti veriyor musunuz?",
    cevap: "Tüm işçilik ve uygulama için 2 yıl garanti veriyoruz. Su yalıtımı, çatı ve dış cephe işlerinde 5 yıl garanti sunuyoruz. Malzemeler için üretici garantisi ayrıca geçerlidir.",
  },
  {
    soru: "Ortaca'da tadilat maliyeti ne kadar?",
    cevap: "2026 güncel fiyatlarıyla: Banyo tadilatı 80.000-150.000 TL, mutfak tadilatı 100.000-200.000 TL, komple daire tadilatı m² başına 8.000-15.000 TL aralığında değişiyor.",
  },
  {
    soru: "Ev satın alırken hangi belgeler gerekli?",
    cevap: "Alıcı için: Nüfus cüzdanı, vergi numarası, 2 adet vesikalık fotoğraf. Mülk için: Güncel tapu kaydı, DASK poliçesi, iskan belgesi, emlak vergisi borcu yoktur yazısı gereklidir.",
  },
  {
    soru: "Tapu devir işlemleri ne kadar sürer?",
    cevap: "Tüm belgeler tamam ve randevu alınmışsa tapu devri aynı gün tamamlanır. Randevu alma süresi 3-7 iş günü arasında değişir. Ortaca ve Dalyan bölgesinde tapu randevularını sizin adınıza alıyoruz.",
  },
  {
    soru: "Tapu harç ve masrafları ne kadar tutar?",
    cevap: "2026 tapu masrafları: Tapu harcı satış bedelinin %4'ü (genellikle %2 alıcı, %2 satıcı öder), döner sermaye ücreti yaklaşık 2.500-3.000 TL, evrak ücreti yaklaşık 500 TL.",
  },
  {
    soru: "Yabancılara gayrimenkul satışı yapıyor musunuz?",
    cevap: "Evet, yabancı uyruklu müşterilere gayrimenkul satışında uzmanız. Askeri yasak bölge kontrolü, tapu işlemleri, tercümanlık ve oturma izni danışmanlığı dahil tam destek sağlıyoruz. 30+ yabancı müşteriye hizmet verdik.",
  },
  {
    soru: "Konut kredisi kullanabilir miyim?",
    cevap: "Evet, Türkiye'deki tüm bankalardan konut kredisi kullanabilirsiniz. Kredi karşılaştırması yapmanıza yardımcı oluyor, evrak süreçlerinde destek sağlıyoruz. Onay süresi genellikle 5-10 iş günüdür.",
  },
  {
    soru: "Kalinda Yapı'ya nasıl ulaşabilirim?",
    cevap: "Telefon: +90 537 053 07 54 (Zafer Soylu), +90 532 159 15 56 (Arif Dağdelen). E-posta: info@kalindayapi.com. Adres: Atatürk Mahallesi, 58 Sokak No: 2/B, Ortaca/Muğla. WhatsApp ile 7/24 ulaşabilirsiniz.",
  },
  {
    soru: "Ortaca'da yatırımlık ev almak mantıklı mı?",
    cevap: "Ortaca ve Dalyan bölgesi, turizm potansiyeli sayesinde yatırım için cazip. Özellikle Dalyan'da yazlık kiralama getirisi yüksek. İztuzu Plajı yakını ve kanal manzaralı mülkler değer kazanmaya devam ediyor.",
  },
];

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular (SSS) | Ortaca Emlak & Tadilat",
  description:
    "2026 güncel Ortaca ve Dalyan emlak fiyatları, tadilat maliyetleri, tapu işlemleri hakkında uzman cevaplar. 200+ emlak işlemi deneyimiyle sorularınızı yanıtlıyoruz.",
  keywords: [
    "Ortaca emlak fiyatları 2026",
    "Dalyan villa fiyatları 2026",
    "Ortaca'da ev almak",
    "Dalyan'da satılık villa",
    "Ortaca tadilat firması",
    "Muğla emlak danışmanlığı",
    "tapu işlemleri nasıl yapılır",
    "ev satın alma belgeleri",
    "tadilat maliyeti 2026",
    "yabancıya ev satışı Türkiye",
    "Köyceğiz emlak",
    "anahtar teslim ev inşaatı",
    "emlak komisyon oranı",
    "konut kredisi başvurusu",
  ],
  openGraph: {
    title: "Sıkça Sorulan Sorular | Kalinda Yapı",
    description:
      "Emlak, tadilat ve inşaat hizmetlerimiz hakkında merak ettikleriniz.",
    url: "https://www.kalindayapi.com/sss",
    siteName: "Kalinda Yapı",
    locale: "tr_TR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.kalindayapi.com/sss",
  },
};

export default function SSSLayout({ children }: { children: React.ReactNode }) {
  const faqSchema = generateFAQSchema(faqData);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Sıkça Sorulan Sorular", url: "/sss" },
  ]);

  return (
    <>
      {/* FAQ Schema - Google Featured Snippets & Voice Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {children}
    </>
  );
}
