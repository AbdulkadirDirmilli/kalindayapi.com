import { Metadata } from "next";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/jsonld";
import { buildLocalizedUrl, buildSeoAlternates, resolveLocale } from "@/lib/seo";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";

// SSS için tüm sorular - Schema.org için (2026 SEO Optimized)
const faqData = [
  {
    soru: "Kalinda Yapı hangi bölgelerde hizmet veriyor?",
    cevap: "Kalinda Yapı Emlak olarak Muğla'nın tüm ilçelerinde aktif portföyümüz bulunuyor: Ortaca, Dalyan, Köyceğiz, Dalaman, Fethiye, Marmaris, Bodrum, Milas, Datça, Menteşe, Yatağan, Ula, Kavaklıdere ve Seydikemer. 2022'den bu yana 200'den fazla emlak işlemi tamamladık.",
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
    soru: "Mülkümün değerini öğrenmek için ne yapmalıyım?",
    cevap: "Ücretsiz ön değerleme için bizimle iletişime geçmeniz yeterli. Mülkü yerinde inceliyor, bölgede son dönemde gerçekleşen benzer satışlarla karşılaştırıyor ve ortalama 2 iş günü içinde yazılı bir değer aralığı sunuyoruz.",
  },
  {
    soru: "Mülkümü portföyünüze nasıl eklerim?",
    cevap: "Bizi arayıp randevu vermeniz yeterli. Mülkü yerinde inceliyor, profesyonel fotoğraflıyor, ilan metnini hazırlıyor ve tüm yayın kanallarında listeliyoruz. Portföye ekleme ücretsizdir; komisyon yalnızca satış veya kiralama gerçekleştiğinde alınır.",
  },
  {
    soru: "Bir ev ortalama ne kadar sürede satılıyor?",
    cevap: "Doğru fiyatlanmış bir daire Ortaca merkezde ortalama 1-3 ay içinde alıcısını buluyor. Dalyan ve Köyceğiz'deki villalarda bu süre hedef kitleye bağlı olarak 3-6 aya çıkabiliyor. Piyasa üzerinde fiyatlanan mülklerde süre belirgin şekilde uzuyor.",
  },
  {
    soru: "İlanlardaki bilgilerin doğruluğunu nasıl güvence altına alıyorsunuz?",
    cevap: "Listelediğimiz her gayrimenkulü satışa sunmadan önce yerinde görüyor, tapu kaydını ve imar durumunu kontrol ediyoruz. Metrekare, kat, ısıtma ve aidat gibi bilgiler sahibinden alınan belgeyle doğrulanır.",
  },
  {
    soru: "Satış sürecinde satıcı olarak hangi masraflar beni bekliyor?",
    cevap: "Satıcı tarafında tapu harcı (satış bedelinin %2'si), varsa emlak vergisi borcu, zorunlu deprem sigortası ve enerji kimlik belgesi masrafları bulunur. Aracılık komisyonumuz satış bedelinin %2'sidir ve yalnızca satış gerçekleştiğinde alınır.",
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
    cevap: "Telefon: +90 532 159 15 56 (Arif Dağdelen). E-posta: info@kalindayapi.com. Adres: Atatürk Mahallesi, 58 Sokak No: 2/B, Ortaca/Muğla. WhatsApp ile 7/24 ulaşabilirsiniz.",
  },
  {
    soru: "Ortaca'da yatırımlık ev almak mantıklı mı?",
    cevap: "Ortaca ve Dalyan bölgesi, turizm potansiyeli sayesinde yatırım için cazip. Özellikle Dalyan'da yazlık kiralama getirisi yüksek. İztuzu Plajı yakını ve kanal manzaralı mülkler değer kazanmaya devam ediyor.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getCachedDictionary(locale);
  const url = buildLocalizedUrl("/sss", locale);

  return {
    title: dict.faq.title,
    description: dict.faq.subtitle,
    openGraph: {
      title: dict.faq.title,
      description: dict.faq.subtitle,
      url,
      siteName: "Kalinda Yapı",
      locale: locale === "tr" ? "tr_TR" : locale === "en" ? "en_US" : "ar_SA",
      type: "website",
    },
    alternates: buildSeoAlternates("/sss", locale),
  };
}

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
