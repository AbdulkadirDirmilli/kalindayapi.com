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
    cevap: "Kalinda Yapı, Muğla ilinin Ortaca, Dalyan, Köyceğiz, Dalaman, Fethiye, Marmaris, Bodrum, Milas, Datça, Menteşe, Yatağan, Ula, Kavaklıdere ve Seydikemer ilçelerinde emlak danışmanlığı, tadilat ve inşaat taahhüt hizmetleri sunmaktadır.",
  },
  {
    kategori: "genel",
    soru: "Kalinda Yapı'nın çalışma saatleri nedir?",
    cevap: "Hafta içi (Pazartesi - Cuma) 08:00 - 18:00, Cumartesi 09:00 - 14:00 saatleri arasında hizmet veriyoruz. Pazar günü kapalıyız. Acil durumlar için WhatsApp üzerinden 7/24 ulaşabilirsiniz.",
  },
  {
    kategori: "genel",
    soru: "Kalinda Yapı'ya nasıl ulaşabilirim?",
    cevap: "Bize telefon (+90 537 053 07 54 veya +90 532 159 15 56), e-posta (info@kalindayapi.com) veya WhatsApp üzerinden ulaşabilirsiniz. Ofisimiz Ortaca'da Atatürk Mahallesi, 58 Sokak No: 2/B (Belediye Arkası) adresindedir.",
  },
  {
    kategori: "genel",
    soru: "Kalinda Yapı lisanslı bir emlak firması mı?",
    cevap: "Evet, Kalinda Yapı resmi emlak danışmanlığı lisansına sahip, Muğla Ticaret Odası'na kayıtlı yasal bir firmadır. 2022'den bu yana profesyonel hizmet vermekteyiz.",
  },

  // Emlak Danışmanlığı
  {
    kategori: "emlak",
    soru: "Ortaca'da satılık daire fiyatları ne kadar?",
    cevap: "Ortaca'da satılık daire fiyatları lokasyon, metrekare ve özelliklere göre değişmektedir. 2024 itibarıyla 2+1 daireler 3-8 milyon TL, 3+1 daireler 5-15 milyon TL aralığındadır. Güncel fiyatlar için ilanlarımızı inceleyebilir veya bizi arayabilirsiniz.",
  },
  {
    kategori: "emlak",
    soru: "Dalyan'da villa satın almak için ne kadar bütçe gerekir?",
    cevap: "Dalyan'da villa fiyatları konuma, büyüklüğe ve özelliklere göre 8 milyon TL'den başlayıp 50 milyon TL ve üzerine çıkabilmektedir. Kanal manzaralı ve havuzlu villalar daha yüksek fiyatlara sahiptir. Size uygun seçenekler için bizi arayın.",
  },
  {
    kategori: "emlak",
    soru: "Emlak danışmanlığı ücreti ne kadar?",
    cevap: "Emlak danışmanlığı hizmeti için satış işlemlerinde satış bedelinin %2-3'ü, kiralama işlemlerinde 1 aylık kira bedeli komisyon alınmaktadır. Danışmanlık görüşmeleri ücretsizdir.",
  },
  {
    kategori: "emlak",
    soru: "Gayrimenkul değerleme hizmeti veriyor musunuz?",
    cevap: "Evet, profesyonel gayrimenkul değerleme hizmeti sunuyoruz. Uzman kadromuz mülkünüzün piyasa değerini konum, metrekare, yaş ve özelliklerine göre belirleyerek size rapor sunar.",
  },
  {
    kategori: "emlak",
    soru: "Yabancılara gayrimenkul satışı yapıyor musunuz?",
    cevap: "Evet, yabancı uyruklu kişilere gayrimenkul satışı konusunda uzmanız. Tapu işlemleri, oturma izni danışmanlığı ve gerekli belgelerin hazırlanması dahil tam destek sağlıyoruz.",
  },

  // Kiralık İşlemleri
  {
    kategori: "kiralik",
    soru: "Kiralık daire bulmak için ne kadar süre gerekiyor?",
    cevap: "Genellikle 1-2 hafta içinde kriterlerinize uygun kiralık daire bulabiliyoruz. Talep yoğunluğuna ve istenen özelliklere göre bu süre değişebilir. Hızlı sonuç için bize ulaşın.",
  },
  {
    kategori: "kiralik",
    soru: "Kiralık ev için hangi belgeler gerekiyor?",
    cevap: "Kiracıdan kimlik fotokopisi, gelir belgesi veya maaş bordrosu, ikametgah belgesi istenmektedir. Ev sahibinden ise tapu fotokopisi ve kimlik fotokopisi gereklidir.",
  },
  {
    kategori: "kiralik",
    soru: "Kira sözleşmesi ne kadar sürelidir?",
    cevap: "Standart kira sözleşmeleri 1 yıllık olarak düzenlenmektedir. Tarafların mutabakatıyla daha uzun süreli sözleşmeler de yapılabilir. Tüm sözleşmeler noter onaylı olarak hazırlanır.",
  },
  {
    kategori: "kiralik",
    soru: "Depozito ne kadar ödenir?",
    cevap: "Depozito genellikle 1-2 aylık kira bedeli kadardır. Eşyalı dairelerde bu miktar artabilir. Depozito, kira sözleşmesi bitiminde şartlara uygun şekilde iade edilir.",
  },

  // İnşaat & Tadilat
  {
    kategori: "insaat",
    soru: "Anahtar teslim ev inşaatı ne kadar sürer?",
    cevap: "Anahtar teslim ev inşaatı, projenin büyüklüğüne göre 8-18 ay arasında sürmektedir. 150-200 m² tek katlı ev yaklaşık 8-10 ay, iki katlı villa 12-18 ay sürebilmektedir.",
  },
  {
    kategori: "insaat",
    soru: "Tadilat projesi için ücretsiz keşif yapıyor musunuz?",
    cevap: "Evet, tüm tadilat ve inşaat projeleri için ücretsiz yerinde keşif ve fiyat teklifi hizmeti sunuyoruz. Randevu almak için bizi arayabilir veya WhatsApp'tan yazabilirsiniz.",
  },
  {
    kategori: "insaat",
    soru: "Mutfak ve banyo tadilatı ne kadar sürer?",
    cevap: "Standart bir mutfak tadilatı 2-3 hafta, banyo tadilatı 1-2 hafta sürmektedir. Komple daire tadilatı ise 4-8 hafta arasında tamamlanmaktadır. İşin kapsamına göre süre değişebilir.",
  },
  {
    kategori: "insaat",
    soru: "İnşaat işlerinde garanti veriyor musunuz?",
    cevap: "Evet, tüm inşaat ve tadilat işlerimizde 2 yıl işçilik garantisi veriyoruz. Kullanılan malzemeler için üretici garantileri de ayrıca geçerlidir. Garanti kapsamı sözleşmede belirtilir.",
  },
  {
    kategori: "insaat",
    soru: "Hangi marka malzemeler kullanıyorsunuz?",
    cevap: "A sınıfı malzemeler kullanıyoruz. Seramik ve fayans için Kütahya ve Vitra, sıhhi tesisat için Eca ve Artema, doğrama için Winsa ve Pimapen, boya için Jotun ve Filli Boya tercih ediyoruz.",
  },

  // Belgeler & Prosedürler
  {
    kategori: "belge",
    soru: "Ev satın alırken hangi belgeler gerekli?",
    cevap: "Ev satın almak için kimlik belgesi, vergi numarası, DASK poliçesi, güncel tapu kaydı, iskan belgesi (yapı kullanma izni), belediye borcu yoktur yazısı ve satış bedelinin ödeme belgesi gereklidir.",
  },
  {
    kategori: "belge",
    soru: "Tapu işlemleri ne kadar sürer?",
    cevap: "Standart tapu devir işlemleri, tüm belgeler tamam olduğunda 1-3 iş günü içinde tamamlanmaktadır. Randevu yoğunluğuna göre bu süre uzayabilir. Biz tüm süreci sizin adınıza takip ediyoruz.",
  },
  {
    kategori: "belge",
    soru: "Emlak vergisi nasıl hesaplanır?",
    cevap: "Emlak vergisi, gayrimenkulün beyan edilen değeri üzerinden hesaplanır. Konutlarda binde 1, işyerlerinde binde 2 oranında vergi uygulanır. Büyükşehirlerde bu oranlar iki katıdır.",
  },
  {
    kategori: "belge",
    soru: "İmar durumu sorgulaması nasıl yapılır?",
    cevap: "İmar durumu, ilgili belediyenin imar müdürlüğünden veya e-devlet üzerinden sorgulanabilir. Arsa alımlarında imar durumu ve yapılaşma koşulları çok önemlidir. Bu konuda size yardımcı oluyoruz.",
  },

  // Ödeme & Finansman
  {
    kategori: "odeme",
    soru: "Konut kredisi kullanabilir miyim?",
    cevap: "Evet, anlaşmalı bankalarımız aracılığıyla uygun koşullarda konut kredisi kullanabilirsiniz. Kredi başvurusu ve evrak süreçlerinde size destek sağlıyoruz.",
  },
  {
    kategori: "odeme",
    soru: "Taksitli satış yapıyor musunuz?",
    cevap: "Evet, bazı projelerimizde peşinat + taksit seçeneği sunuyoruz. Ödeme planları projeye ve satıcıya göre değişmektedir. Detaylı bilgi için bizi arayın.",
  },
  {
    kategori: "odeme",
    soru: "Tapu masrafları ne kadar tutar?",
    cevap: "Tapu devir harcı, satış bedelinin %4'ü olup genellikle alıcı ve satıcı arasında %2'şer paylaşılır. Ayrıca döner sermaye ücreti ve noter masrafları da eklenmelidir.",
  },
  {
    kategori: "odeme",
    soru: "Tadilat için ödeme nasıl yapılır?",
    cevap: "Tadilat projelerinde genellikle %30 başlangıç, %40 ara ödeme (kaba işler bitiminde) ve %30 iş tesliminde olmak üzere 3 taksit halinde ödeme alınmaktadır.",
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
                soru: "Ortaca'da ev fiyatları ne kadar?",
                cevap: "2+1 daireler 3-8 milyon TL, 3+1 daireler 5-15 milyon TL aralığında.",
                ikon: Building2,
              },
              {
                soru: "Tadilat ücretsiz keşif var mı?",
                cevap: "Evet, tüm tadilat projeleri için ücretsiz yerinde keşif yapıyoruz.",
                ikon: Hammer,
              },
              {
                soru: "Ev inşaatı ne kadar sürer?",
                cevap: "Tek katlı ev 8-10 ay, iki katlı villa 12-18 ay sürmektedir.",
                ikon: MapPin,
              },
              {
                soru: "Emlak komisyonu ne kadar?",
                cevap: "Satışta %2-3, kiralamada 1 aylık kira bedeli kadar.",
                ikon: CreditCard,
              },
              {
                soru: "Yabancılara satış yapılıyor mu?",
                cevap: "Evet, yabancı uyruklu kişilere tam destek sağlıyoruz.",
                ikon: FileText,
              },
              {
                soru: "Konut kredisi kullanılabilir mi?",
                cevap: "Evet, anlaşmalı bankalarla uygun koşullarda kredi imkanı.",
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
