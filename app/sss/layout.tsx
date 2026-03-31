import { Metadata } from "next";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/jsonld";

// SSS için tüm sorular - Schema.org için
const faqData = [
  {
    soru: "Kalinda Yapı hangi bölgelerde hizmet veriyor?",
    cevap: "Kalinda Yapı, Muğla ilinin Ortaca, Dalyan, Köyceğiz, Dalaman, Fethiye, Marmaris, Bodrum, Milas, Datça, Menteşe, Yatağan, Ula, Kavaklıdere ve Seydikemer ilçelerinde emlak danışmanlığı, tadilat ve inşaat taahhüt hizmetleri sunmaktadır.",
  },
  {
    soru: "Kalinda Yapı'nın çalışma saatleri nedir?",
    cevap: "Hafta içi (Pazartesi - Cuma) 08:00 - 18:00, Cumartesi 09:00 - 14:00 saatleri arasında hizmet veriyoruz. Pazar günü kapalıyız. Acil durumlar için WhatsApp üzerinden 7/24 ulaşabilirsiniz.",
  },
  {
    soru: "Ortaca'da satılık daire fiyatları ne kadar?",
    cevap: "Ortaca'da satılık daire fiyatları lokasyon, metrekare ve özelliklere göre değişmektedir. 2024 itibarıyla 2+1 daireler 3-8 milyon TL, 3+1 daireler 5-15 milyon TL aralığındadır.",
  },
  {
    soru: "Dalyan'da villa satın almak için ne kadar bütçe gerekir?",
    cevap: "Dalyan'da villa fiyatları konuma, büyüklüğe ve özelliklere göre 8 milyon TL'den başlayıp 50 milyon TL ve üzerine çıkabilmektedir. Kanal manzaralı ve havuzlu villalar daha yüksek fiyatlara sahiptir.",
  },
  {
    soru: "Emlak danışmanlığı ücreti ne kadar?",
    cevap: "Emlak danışmanlığı hizmeti için satış işlemlerinde satış bedelinin %2-3'ü, kiralama işlemlerinde 1 aylık kira bedeli komisyon alınmaktadır. Danışmanlık görüşmeleri ücretsizdir.",
  },
  {
    soru: "Anahtar teslim ev inşaatı ne kadar sürer?",
    cevap: "Anahtar teslim ev inşaatı, projenin büyüklüğüne göre 8-18 ay arasında sürmektedir. 150-200 m² tek katlı ev yaklaşık 8-10 ay, iki katlı villa 12-18 ay sürebilmektedir.",
  },
  {
    soru: "Tadilat projesi için ücretsiz keşif yapıyor musunuz?",
    cevap: "Evet, tüm tadilat ve inşaat projeleri için ücretsiz yerinde keşif ve fiyat teklifi hizmeti sunuyoruz.",
  },
  {
    soru: "Mutfak ve banyo tadilatı ne kadar sürer?",
    cevap: "Standart bir mutfak tadilatı 2-3 hafta, banyo tadilatı 1-2 hafta sürmektedir. Komple daire tadilatı ise 4-8 hafta arasında tamamlanmaktadır.",
  },
  {
    soru: "İnşaat işlerinde garanti veriyor musunuz?",
    cevap: "Evet, tüm inşaat ve tadilat işlerimizde 2 yıl işçilik garantisi veriyoruz. Kullanılan malzemeler için üretici garantileri de ayrıca geçerlidir.",
  },
  {
    soru: "Ev satın alırken hangi belgeler gerekli?",
    cevap: "Ev satın almak için kimlik belgesi, vergi numarası, DASK poliçesi, güncel tapu kaydı, iskan belgesi (yapı kullanma izni), belediye borcu yoktur yazısı ve satış bedelinin ödeme belgesi gereklidir.",
  },
  {
    soru: "Tapu işlemleri ne kadar sürer?",
    cevap: "Standart tapu devir işlemleri, tüm belgeler tamam olduğunda 1-3 iş günü içinde tamamlanmaktadır.",
  },
  {
    soru: "Konut kredisi kullanabilir miyim?",
    cevap: "Evet, anlaşmalı bankalarımız aracılığıyla uygun koşullarda konut kredisi kullanabilirsiniz. Kredi başvurusu ve evrak süreçlerinde size destek sağlıyoruz.",
  },
  {
    soru: "Tapu masrafları ne kadar tutar?",
    cevap: "Tapu devir harcı, satış bedelinin %4'ü olup genellikle alıcı ve satıcı arasında %2'şer paylaşılır. Ayrıca döner sermaye ücreti ve noter masrafları da eklenmelidir.",
  },
  {
    soru: "Yabancılara gayrimenkul satışı yapıyor musunuz?",
    cevap: "Evet, yabancı uyruklu kişilere gayrimenkul satışı konusunda uzmanız. Tapu işlemleri, oturma izni danışmanlığı ve gerekli belgelerin hazırlanması dahil tam destek sağlıyoruz.",
  },
  {
    soru: "Kalinda Yapı'ya nasıl ulaşabilirim?",
    cevap: "Bize telefon (+90 537 053 07 54 veya +90 532 159 15 56), e-posta (info@kalindayapi.com) veya WhatsApp üzerinden ulaşabilirsiniz. Ofisimiz Ortaca'da Atatürk Mahallesi, 58 Sokak No: 2/B (Belediye Arkası) adresindedir.",
  },
];

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular (SSS) | Kalinda Yapı",
  description:
    "Ortaca'da emlak, tadilat ve inşaat hizmetleri hakkında sıkça sorulan sorular. Ev fiyatları, komisyon oranları, inşaat süreleri ve daha fazlası.",
  keywords: [
    "Ortaca emlak SSS",
    "Dalyan villa fiyatları",
    "emlak danışmanlığı ücreti",
    "tadilat ne kadar sürer",
    "ev satın alma belgeleri",
    "tapu işlemleri",
    "konut kredisi",
    "Muğla gayrimenkul",
    "inşaat taahhüt",
    "ev inşaatı süresi",
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
