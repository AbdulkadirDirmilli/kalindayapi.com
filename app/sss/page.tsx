"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Building2,
  Key,
  Hammer,
  FileText,
  CreditCard,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { createWhatsAppLink } from "@/lib/utils";

interface FAQ {
  soru: string;
  cevap: string;
  kategori: string;
}

const faqKategorileri = [
  { id: "genel", baslik: "Genel Sorular", ikon: HelpCircle },
  { id: "emlak", baslik: "Emlak Danışmanlığı", ikon: Building2 },
  { id: "kiralik", baslik: "Kiralık İşlemleri", ikon: Key },
  { id: "insaat", baslik: "İnşaat & Tadilat", ikon: Hammer },
  { id: "belge", baslik: "Belgeler & Prosedürler", ikon: FileText },
  { id: "odeme", baslik: "Ödeme & Finansman", ikon: CreditCard },
];

const sorular: FAQ[] = [
  // Genel Sorular
  {
    kategori: "genel",
    soru: "Kalinda Yapı hangi bölgelerde hizmet veriyor?",
    cevap: "Kalinda Yapı olarak Muğla'nın tüm ilçelerinde aktif portföyümüz bulunuyor: Ortaca, Dalyan, Köyceğiz, Dalaman, Fethiye, Marmaris, Bodrum, Milas, Datça, Menteşe, Yatağan, Ula, Kavaklıdere ve Seydikemer. 2022'den bu yana 200+ emlak işlemi ve 100+ tadilat projesi tamamladık. Yerinde keşif için mesafe fark etmez, tüm Muğla genelinde ücretsiz ön görüşme yapıyoruz.",
  },
  {
    kategori: "genel",
    soru: "Kalinda Yapı'nın çalışma saatleri nedir?",
    cevap: "Hafta içi (Pazartesi - Cuma) 08:00 - 18:00, Cumartesi 09:00 - 14:00 saatleri arasında ofisimiz açıktır. Pazar günleri kapalıyız ancak acil durumlar ve randevulu gösterimler için WhatsApp üzerinden 7/24 ulaşabilirsiniz. Yoğun sezonlarda (Mayıs-Eylül) hafta sonu randevuları da değerlendiriyoruz.",
  },
  {
    kategori: "genel",
    soru: "Kalinda Yapı'ya nasıl ulaşabilirim?",
    cevap: "Bize üç farklı kanaldan ulaşabilirsiniz: Telefon (+90 537 053 07 54 - Zafer Soylu, +90 532 159 15 56 - Arif Dağdelen), e-posta (info@kalindayapi.com) veya WhatsApp. Ofisimiz Ortaca merkezdedir: Atatürk Mahallesi, 58 Sokak No: 2/B (Belediye Arkası). Google Haritalar'da 'Kalinda Yapı' aratarak yol tarifi alabilirsiniz.",
  },
  {
    kategori: "genel",
    soru: "Kalinda Yapı lisanslı bir emlak firması mı?",
    cevap: "Evet, Kalinda Yapı resmi emlak danışmanlığı lisansına sahip, Muğla Ticaret Odası'na kayıtlı yasal bir firmadır. Zafer Soylu ve Arif Dağdelen ortaklığında 2022'de kurulan firmamız, toplamda 20+ yıllık sektör deneyimine sahip profesyonel bir ekiple hizmet vermektedir. Tüm işlemlerimiz yasal mevzuata uygun şekilde gerçekleştirilir.",
  },
  {
    kategori: "genel",
    soru: "Ücretsiz danışmanlık alabilir miyim?",
    cevap: "Evet, emlak alım-satım, kiralama veya tadilat projeleriniz için ilk görüşme ve ön değerlendirme tamamen ücretsizdir. Telefonla veya yüz yüze ihtiyaçlarınızı dinliyor, size özel çözüm önerileri sunuyoruz. Herhangi bir taahhüt olmadan fikir alabilirsiniz.",
  },

  // Emlak Danışmanlığı
  {
    kategori: "emlak",
    soru: "2026'da Ortaca'da satılık daire fiyatları ne kadar?",
    cevap: "Ortaca'da 2026 itibarıyla konut fiyatları konuma ve özelliklere göre değişmektedir: Merkez ve site içi 2+1 daireler 4-10 milyon TL, 3+1 daireler 7-18 milyon TL aralığındadır. Metrekare fiyatları 25.000-40.000 TL arasında seyrediyor. Denize yakınlık, kat, yapı yaşı ve otopark durumu fiyatı doğrudan etkiliyor. Portföyümüzdeki güncel ilanlar için sitemizi ziyaret edin veya WhatsApp'tan yazın.",
  },
  {
    kategori: "emlak",
    soru: "Dalyan'da villa satın almak için ne kadar bütçe gerekir?",
    cevap: "Dalyan'da 2026 yılında villa fiyatları 12 milyon TL'den başlayıp, kanal manzaralı ve havuzlu villalarda 80 milyon TL'ye kadar çıkabiliyor. Metrekare fiyatları 35.000-60.000 TL aralığında. İztuzu Plajı'na yakın bölgeler, tekne yanaşma imkanı olan kanalboyu villalar ve Köyceğiz Gölü manzaralı yerler prim yapıyor. Size özel villa seçenekleri için ücretsiz danışmanlık alabilirsiniz.",
  },
  {
    kategori: "emlak",
    soru: "Emlak danışmanlık hizmeti ücretli mi, komisyon oranları nedir?",
    cevap: "Ev arayanlar için danışmanlık görüşmeleri tamamen ücretsizdir. Satış tamamlandığında satış bedelinin %2'si komisyon olarak alınır (alıcı ve satıcıdan ayrı ayrı). Kiralama işlemlerinde 1 aylık kira bedeli komisyon uygulanır. Tüm ücretler işlem öncesi yazılı bildirilir. İşlem gerçekleşmezse hiçbir ücret talep etmiyoruz.",
  },
  {
    kategori: "emlak",
    soru: "Gayrimenkul değerleme hizmeti veriyor musunuz?",
    cevap: "Evet, ücretsiz gayrimenkul değerleme hizmeti sunuyoruz. Deneyimli ekibimiz mülkünüzü yerinde inceleyerek konum analizi, emsal karşılaştırması, yapı durumu ve piyasa trendlerini değerlendiriyor. Satış veya kiralama öncesi gerçekçi fiyat belirlemenize yardımcı oluyoruz. Değerleme raporu genellikle 2-3 iş günü içinde hazırlanır.",
  },
  {
    kategori: "emlak",
    soru: "Yabancılara gayrimenkul satışı yapıyor musunuz?",
    cevap: "Evet, yabancı uyruklu müşterilere gayrimenkul satışında uzmanız. Askeri yasak bölge kontrolü, tapu müdürlüğü işlemleri, noter onaylı tercümanlık, potansiyel vergi numarası alımı ve oturma izni danışmanlığı dahil tam destek sağlıyoruz. İngilizce ve Almanca iletişim imkanımız mevcuttur. Bugüne kadar 30+ yabancı müşteriye başarıyla hizmet verdik.",
  },
  {
    kategori: "emlak",
    soru: "Ortaca'da yatırımlık ev almak mantıklı mı?",
    cevap: "Ortaca ve Dalyan bölgesi, turizm potansiyeli ve doğal güzellikleri sayesinde yatırım için cazip bir lokasyon. Özellikle Dalyan'da yazlık kiralama getirisi yüksek, İztuzu Plajı yakını ve kanal manzaralı mülkler değer kazanmaya devam ediyor. Köyceğiz Gölü çevresi de yükselen bir bölge. Yatırım amacınıza uygun portföy önerileri için bizi arayın.",
  },
  {
    kategori: "emlak",
    soru: "Tarla veya arsa alırken nelere dikkat etmeliyim?",
    cevap: "Arsa alımında mutlaka kontrol edilmesi gerekenler: İmar durumu (konut/ticari/tarım), yapılaşma koşulları (TAKS-KAKS), yol cephesi, altyapı (su-elektrik-kanalizasyon), tapu türü (hisseli/müstakil), kadastro sınırları ve belediye/köy sınırları. Tarım arazilerinde tarımsal nitelik kaybı prosedürü gerekebilir. Tüm bu kontrolleri sizin adınıza ücretsiz yapıyoruz.",
  },

  // Kiralık İşlemleri
  {
    kategori: "kiralik",
    soru: "Ortaca'da kiralık daire bulmak ne kadar sürer?",
    cevap: "Aktif portföyümüz sayesinde genellikle 1 hafta içinde kriterlerinize uygun kiralık daire bulabiliyoruz. Sezon döneminde (Haziran-Ağustos) talep yoğunluğu nedeniyle bu süre uzayabilir. Bütçenizi, tercih ettiğiniz bölgeyi ve özel isteklerinizi (eşyalı/eşyasız, kat, otopark vb.) belirtin, size özel seçenekler sunalım.",
  },
  {
    kategori: "kiralik",
    soru: "Kiralık ev için hangi belgeler gerekiyor?",
    cevap: "Kiracıdan: Nüfus cüzdanı fotokopisi, gelir belgesi veya maaş bordrosu (son 3 ay), ikametgah belgesi. Memur ve emekliler için maaş bordrosu yeterli. Ev sahibinden: Tapu fotokopisi, kimlik fotokopisi, yetki belgesi (vekalet varsa). Biz tüm evrak sürecini sizin adınıza koordine ediyoruz.",
  },
  {
    kategori: "kiralik",
    soru: "Kira sözleşmesi ne kadar sürelidir?",
    cevap: "Standart kira sözleşmeleri 1 yıllık olarak düzenlenir ve Türk Borçlar Kanunu'na tabidir. Tarafların mutabakatıyla 2-3 yıllık sözleşmeler de yapılabilir. Kira artış oranı TÜFE'ye endekslidir. Tüm sözleşmeleri detaylı ve tarafları koruyan şekilde hazırlıyoruz.",
  },
  {
    kategori: "kiralik",
    soru: "Depozito ne kadar ödenir ve nasıl iade edilir?",
    cevap: "Depozito genellikle 1-2 aylık kira bedeli kadardır. Eşyalı dairelerde veya lüks konutlarda 3 aya kadar çıkabilir. Kira sözleşmesi bitiminde, demirbaş sayımı yapılır ve hasar yoksa depozito 15 gün içinde iade edilir. Aidat ve fatura borcu olmadığına dair belge istenir.",
  },
  {
    kategori: "kiralik",
    soru: "Dalyan'da yazlık kiralama yapıyor musunuz?",
    cevap: "Evet, Dalyan ve Ortaca'da günlük, haftalık ve aylık yazlık kiralama portföyümüz mevcuttur. Havuzlu villalar, denize yakın daireler ve doğa içinde bungalovlar seçenekler arasında. Sezon rezervasyonları için erken iletişime geçmenizi öneririz. Yüksek sezon (Temmuz-Ağustos) için Nisan'dan itibaren doluluk başlıyor.",
  },

  // İnşaat & Tadilat
  {
    kategori: "insaat",
    soru: "Anahtar teslim ev inşaatı ne kadar sürer?",
    cevap: "Anahtar teslim ev inşaatı projenin büyüklüğüne ve karmaşıklığına göre değişir: 150-200 m² tek katlı müstakil ev 8-10 ay, iki katlı villa 12-15 ay, havuzlu ve peyzajlı projeler 15-18 ay sürmektedir. Proje başlangıcında detaylı iş programı hazırlıyor ve haftalık ilerleme raporlarıyla sizi bilgilendiriyoruz. Hava koşulları ve izin süreçleri takvimi etkileyebilir.",
  },
  {
    kategori: "insaat",
    soru: "Tadilat projesi için ücretsiz keşif yapıyor musunuz?",
    cevap: "Evet, Ortaca, Dalyan, Köyceğiz ve tüm Muğla genelinde ücretsiz yerinde keşif yapıyoruz. Keşif sırasında projenin kapsamını belirliyor, ölçüm alıyor, mevcut durumu fotoğraflıyoruz. 3-5 iş günü içinde detaylı maliyet teklifi sunuyoruz. Teklif kabul edilmezse hiçbir ücret talep etmiyoruz. Randevu için WhatsApp'tan veya telefonla ulaşın.",
  },
  {
    kategori: "insaat",
    soru: "Mutfak ve banyo tadilatı ne kadar sürer?",
    cevap: "Ortalama süreler: Banyo tadilatı (komple yıkım dahil) 10-15 gün, mutfak tadilatı 15-20 gün, komple daire tadilatı 6-10 hafta. Tesisat değişikliği, duvar yıkımı veya özel malzeme tedariki süreyi uzatabilir. Proje başlangıcında kesin takvim belirleniyor ve sözleşmede belirtiliyor. 100+ tamamlanmış projemizde %95 zamanında teslim oranımız var.",
  },
  {
    kategori: "insaat",
    soru: "İnşaat ve tadilat işlerinde garanti veriyor musunuz?",
    cevap: "Evet, tüm işçilik ve uygulama için 2 yıl garanti veriyoruz. Su yalıtımı, çatı ve dış cephe işlerinde 5 yıl garanti sunuyoruz. Malzemeler için üretici garantisi (genellikle 2-10 yıl) ayrıca geçerlidir. Garanti kapsamındaki sorunlar 48 saat içinde yerinde değerlendirilir ve ücretsiz giderilir. Tüm garanti koşulları sözleşmede açıkça belirtilir.",
  },
  {
    kategori: "insaat",
    soru: "Hangi marka malzemeler kullanıyorsunuz?",
    cevap: "Sadece A sınıfı, garantili markalarla çalışıyoruz: Seramik/fayans için Vitra ve Kütahya Seramik, sıhhi tesisat için Eca, Artema ve Grohe, PVC doğrama için Winsa ve Egepen, alüminyum doğrama için Alumil, boya için Jotun ve Marshall, elektrik malzemesi için Legrand ve Viko. Müşteri talebiyle farklı markalar da temin edilebilir.",
  },
  {
    kategori: "insaat",
    soru: "Eski ev yenileme mi yoksa yıkıp yeniden yapma mı daha mantıklı?",
    cevap: "Bu karar yapının durumuna, yaşına ve lokasyona göre değişir. Genel kural: Bina 30 yaşın altında ve taşıyıcı sistem sağlamsa yenileme daha ekonomik. 40+ yaşındaki binalarda veya ciddi yapısal sorunlarda (temel çökmesi, kolon hasarı) yıkıp yapma daha güvenli ve uzun vadede karlı. Ücretsiz keşfimizde mühendis gözüyle değerlendirme yapıp size en uygun seçeneği öneriyoruz.",
  },
  {
    kategori: "insaat",
    soru: "Tadilat için belediyeden izin almak gerekiyor mu?",
    cevap: "Taşıyıcı sisteme dokunmayan iç tadilatlarda (boya, fayans, mutfak dolabı vb.) izin gerekmez. Ancak duvar yıkımı, balkon kapatma, çatı değişikliği, dış cephe değişikliği veya tesisat güzergah değişikliği için belediyeden tadilat ruhsatı alınması zorunludur. Ruhsatsız yapılan değişiklikler cezai işlem ve yıkım kararıyla sonuçlanabilir. Biz tüm izin süreçlerini sizin adınıza takip ediyoruz.",
  },
  {
    kategori: "insaat",
    soru: "Ortaca'da tadilat maliyeti nasıl hesaplanır?",
    cevap: "Tadilat maliyeti işçilik + malzeme + nakliye + KDV'den oluşur. 2026 güncel fiyatlarıyla: Banyo tadilatı 80.000-150.000 TL, mutfak tadilatı 100.000-200.000 TL, komple daire tadilatı m² başına 8.000-15.000 TL aralığında değişiyor. Maliyet; tercih edilen malzeme kalitesi, işin kapsamı ve mülkün durumuna göre belirlenir. Keşif sonrası net fiyat teklifi veriyoruz, sürpriz maliyet çıkmıyor.",
  },

  // Belgeler & Prosedürler
  {
    kategori: "belge",
    soru: "Ev satın alırken hangi belgeler gerekli?",
    cevap: "Alıcı için: Nüfus cüzdanı, vergi numarası, 2 adet vesikalık fotoğraf. Satıcı için: Tapu aslı, nüfus cüzdanı, vekaletname (vekil varsa). Mülk için: Güncel tapu kaydı, DASK poliçesi, iskan belgesi (yapı kullanma izni), emlak vergisi borcu yoktur yazısı, aidat borcu yoktur yazısı (site ise). Biz tüm evrakları kontrol ediyor ve eksikleri sizin adınıza tamamlıyoruz.",
  },
  {
    kategori: "belge",
    soru: "Tapu devir işlemleri ne kadar sürer?",
    cevap: "Tüm belgeler tamam ve randevu alınmışsa tapu devri aynı gün (1-2 saat içinde) tamamlanır. Randevu alma süresi bölgeye göre 3-7 iş günü arasında değişir. Ortaca ve Dalyan bölgesinde tapu müdürlüğü randevularını biz sizin adınıza alıyoruz. Acil işlemler için ek ücretle hızlandırılmış randevu seçeneği de mevcut.",
  },
  {
    kategori: "belge",
    soru: "Emlak vergisi nasıl hesaplanır?",
    cevap: "Emlak vergisi, mülkün beyan edilen değeri üzerinden yıllık olarak hesaplanır. 2026 oranları: Konutlarda binde 2 (büyükşehir), binde 1 (diğer); işyerlerinde binde 4 (büyükşehir), binde 2 (diğer); arsalarda binde 6 (büyükşehir), binde 3 (diğer). Muğla büyükşehir olduğu için yüksek oran uygulanır. Ödeme Mayıs ve Kasım aylarında iki taksitte yapılır.",
  },
  {
    kategori: "belge",
    soru: "İmar durumu sorgulaması nasıl yapılır?",
    cevap: "İmar durumu sorgulaması üç şekilde yapılabilir: 1) Parsel Sorgu (parselsorgu.tkgm.gov.tr) üzerinden ücretsiz, 2) e-Devlet'ten 'İmar Durumu Belgesi' talebi, 3) İlgili belediyenin imar müdürlüğüne dilekçe ile başvuru. Arsa/tarla alımında TAKS (Taban Alanı Kat Sayısı), KAKS (Kat Alanı Kat Sayısı), yapı yüksekliği ve kullanım amacını mutlaka kontrol edin. Biz tüm imar kontrollerini ücretsiz yapıyoruz.",
  },
  {
    kategori: "belge",
    soru: "Tapu harç ve masrafları ne kadar tutar?",
    cevap: "2026 tapu masrafları: Tapu harcı satış bedelinin %4'ü (genellikle %2 alıcı, %2 satıcı öder), döner sermaye ücreti yaklaşık 2.500-3.000 TL, tapu fotokopi ve evrak ücreti yaklaşık 500 TL. Toplam masraf satış bedeline göre değişir. Örnek: 5 milyon TL'lik bir evde toplam masraf yaklaşık 200.000 TL + 3.500 TL civarındadır.",
  },
  {
    kategori: "belge",
    soru: "Tapu kontrolü nasıl yapılır, nelere dikkat etmeliyim?",
    cevap: "Tapu kontrolünde bakılması gerekenler: 1) Tapu türü (kat mülkiyeti/kat irtifakı/hisseli), 2) Şerh ve ipotek durumu, 3) Beyan hanesindeki kısıtlamalar, 4) Metrekare ve ada-parsel bilgisi, 5) İskan (yapı kullanma izni) durumu, 6) Emlak vergisi borcu. Hisseli tapularda diğer hissedarların ön alım hakkı vardır. Biz tüm bu kontrolleri sizin adınıza yapıyor ve riskleri raporluyoruz.",
  },

  // Ödeme & Finansman
  {
    kategori: "odeme",
    soru: "Konut kredisi kullanabilir miyim?",
    cevap: "Evet, Türkiye'deki tüm bankalardan konut kredisi kullanabilirsiniz. Kredi oranları ve vade seçenekleri bankalara göre değişmektedir. Biz kredi karşılaştırması yapmanıza yardımcı oluyor, evrak süreçlerinde destek sağlıyoruz. İkinci el konutlarda ekspertiz raporu gerekir, bu süreci de koordine ediyoruz. Onay süresi genellikle 5-10 iş günüdür.",
  },
  {
    kategori: "odeme",
    soru: "Sıfır ev veya villa projelerinde taksitli satış var mı?",
    cevap: "Evet, yeni proje ve villa satışlarında peşinat + taksit seçenekleri sunulabiliyor. Tipik ödeme planı: %30-40 peşinat, kalan tutar 12-36 ay vade ile taksit. İnşaat aşamasındaki projelerde vade inşaat süresine paralel olabilir. Ödeme planları projeye ve satıcıya göre değişir, size uygun seçenekleri sunuyoruz.",
  },
  {
    kategori: "odeme",
    soru: "Tadilat ve inşaat projelerinde ödeme nasıl yapılır?",
    cevap: "Tadilat projelerinde şeffaf ödeme planı uyguluyoruz: %30 sözleşme imzasında (malzeme temini için), %40 kaba işler tamamlandığında, %30 kesin kabul ve teslimde. İnşaat projelerinde hakediş sistemine göre aylık ödemeler yapılır. Tüm ödemeler makbuz karşılığı alınır ve sözleşmede belirtilir. Nakit ödemelerde %5'e kadar indirim uygulanabilir.",
  },
  {
    kategori: "odeme",
    soru: "Emlak alımında kaparo/kapora nasıl işler?",
    cevap: "Satışa karar verildikten sonra genellikle satış bedelinin %5-10'u kadar kaparo alınır ve karşılığında kaparo makbuzu verilir. Kaparo, tapu devrine kadar mülkün başkasına satılmamasını garanti eder. Alıcı vazgeçerse kaparo iade edilmez, satıcı vazgeçerse kaparo iki katı iade edilir (Türk Borçlar Kanunu). Kaparo tutarı tapu devrinde satış bedelinden düşülür.",
  },
  {
    kategori: "odeme",
    soru: "Yabancı para (döviz) ile ödeme kabul ediyor musunuz?",
    cevap: "Türkiye'de gayrimenkul alım-satımlarında ödeme Türk Lirası cinsinden yapılmak zorundadır (yasal zorunluluk). Ancak satış bedeli döviz karşılığı belirlenir ve tapu günü güncel kur üzerinden TL'ye çevrilir. Döviz transferi veya havale işlemlerinde banka dekontunun saklanması önemlidir.",
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left hover:bg-gray-50 px-4 -mx-4 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-[#0B1F3A] pr-4">{faq.soru}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#C9A84C] flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-5 px-4 -mx-4">
          <p className="text-[#666666] leading-relaxed">{faq.cevap}</p>
        </div>
      )}
    </div>
  );
}

export default function SSSPage() {
  const [aktifKategori, setAktifKategori] = useState("genel");
  const [acikSorular, setAcikSorular] = useState<Set<number>>(new Set([0]));

  const filtreliSorular = sorular.filter((s) => s.kategori === aktifKategori);

  const toggleSoru = (index: number) => {
    const yeniAcikSorular = new Set(acikSorular);
    if (yeniAcikSorular.has(index)) {
      yeniAcikSorular.delete(index);
    } else {
      yeniAcikSorular.add(index);
    }
    setAcikSorular(yeniAcikSorular);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0B1F3A] pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">Sıkça Sorulan Sorular</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Sıkça Sorulan <span className="text-[#C9A84C]">Sorular</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Emlak, tadilat ve inşaat hizmetlerimiz hakkında en çok merak edilen
              soruların cevaplarını burada bulabilirsiniz. Aradığınız cevabı
              bulamazsanız bize ulaşın.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Kategori Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="font-bold text-[#0B1F3A] mb-4">Kategoriler</h2>
                <div className="space-y-2">
                  {faqKategorileri.map((kat) => {
                    const Icon = kat.ikon;
                    const isActive = aktifKategori === kat.id;
                    return (
                      <button
                        key={kat.id}
                        onClick={() => {
                          setAktifKategori(kat.id);
                          setAcikSorular(new Set([0]));
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? "bg-[#0B1F3A] text-white"
                            : "bg-gray-100 text-[#666666] hover:bg-gray-200"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? "text-[#C9A84C]" : ""}`} />
                        <span className="text-sm font-medium">{kat.baslik}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Quick Contact */}
                <Card className="mt-8" padding="md">
                  <h3 className="font-bold text-[#0B1F3A] mb-3">
                    Sorunuz mu var?
                  </h3>
                  <p className="text-sm text-[#666666] mb-4">
                    Cevabını bulamadığınız sorular için bize ulaşın.
                  </p>
                  <div className="space-y-2">
                    <a
                      href="tel:+905370530754"
                      className="flex items-center gap-2 text-sm text-[#0B1F3A] hover:text-[#C9A84C]"
                    >
                      <Phone className="w-4 h-4" />
                      +90 537 053 07 54
                    </a>
                    <a
                      href={createWhatsAppLink(
                        "905370530754",
                        "Merhaba, SSS sayfasından geliyorum. Bir sorum var:"
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp ile Yazın
                    </a>
                  </div>
                </Card>
              </div>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                {(() => {
                  const aktifKat = faqKategorileri.find((k) => k.id === aktifKategori);
                  const Icon = aktifKat?.ikon || HelpCircle;
                  return (
                    <>
                      <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#C9A84C]" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#0B1F3A]">
                          {aktifKat?.baslik}
                        </h2>
                        <p className="text-sm text-[#666666]">
                          {filtreliSorular.length} soru
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>

              <Card padding="lg">
                {filtreliSorular.map((faq, index) => (
                  <FAQItem
                    key={index}
                    faq={faq}
                    isOpen={acikSorular.has(index)}
                    onToggle={() => toggleSoru(index)}
                  />
                ))}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Questions Summary - GEO Optimized */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mb-4">
              En Çok Sorulan Sorular
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Müşterilerimizin en sık sorduğu soruların kısa özetleri
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                soru: "2026'da Ortaca'da ev fiyatları ne kadar?",
                cevap: "2+1 daireler 4-10 milyon TL, 3+1 daireler 7-18 milyon TL, m² fiyatı 25-40 bin TL.",
                ikon: Building2,
              },
              {
                soru: "Ücretsiz keşif yapıyor musunuz?",
                cevap: "Evet, tüm Muğla genelinde ücretsiz yerinde keşif ve detaylı fiyat teklifi sunuyoruz.",
                ikon: Hammer,
              },
              {
                soru: "Anahtar teslim ev ne kadar sürer?",
                cevap: "Tek katlı ev 8-10 ay, iki katlı villa 12-15 ay, havuzlu projeler 15-18 ay.",
                ikon: MapPin,
              },
              {
                soru: "Emlak komisyon oranı nedir?",
                cevap: "Satışta %2, kiralamada 1 aylık kira. Danışmanlık ücretsiz, gizli maliyet yok.",
                ikon: CreditCard,
              },
              {
                soru: "Yabancılara ev satışı yapıyor musunuz?",
                cevap: "Evet, 30+ yabancı müşteriye hizmet verdik. Tapu ve oturma izni desteği sağlıyoruz.",
                ikon: FileText,
              },
              {
                soru: "Tadilat işlerinde garanti var mı?",
                cevap: "Evet, 2 yıl işçilik garantisi + A sınıfı malzeme üretici garantisi.",
                ikon: Key,
              },
            ].map((item, index) => {
              const Icon = item.ikon;
              return (
                <Card key={index} padding="lg" className="hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0B1F3A] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0B1F3A] mb-2">{item.soru}</h3>
                      <p className="text-sm text-[#666666]">{item.cevap}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0B1F3A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Başka Sorularınız mı Var?
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            Cevabını bulamadığınız sorular için bizimle iletişime geçin.
            Uzman ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
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
                "Merhaba, SSS sayfasından geliyorum. Bir sorum var."
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
