// SSS (FAQ) Data - Multi-language support
import type { Locale } from '@/lib/i18n/config';

export interface FAQ {
  soru: string;
  cevap: string;
  kategori: string;
}

export interface FAQCategory {
  id: string;
  baslik: string;
  ikon: string;
}

// Category translations
export const faqKategorileri: Record<Locale, FAQCategory[]> = {
  tr: [
    { id: "genel", baslik: "Genel Sorular", ikon: "HelpCircle" },
    { id: "emlak", baslik: "Emlak Danışmanlığı", ikon: "Building2" },
    { id: "kiralik", baslik: "Kiralık İşlemleri", ikon: "Key" },
    { id: "insaat", baslik: "İnşaat & Tadilat", ikon: "Hammer" },
    { id: "belge", baslik: "Belgeler & Prosedürler", ikon: "FileText" },
    { id: "odeme", baslik: "Ödeme & Finansman", ikon: "CreditCard" },
  ],
  en: [
    { id: "genel", baslik: "General Questions", ikon: "HelpCircle" },
    { id: "emlak", baslik: "Real Estate Consulting", ikon: "Building2" },
    { id: "kiralik", baslik: "Rental Services", ikon: "Key" },
    { id: "insaat", baslik: "Construction & Renovation", ikon: "Hammer" },
    { id: "belge", baslik: "Documents & Procedures", ikon: "FileText" },
    { id: "odeme", baslik: "Payment & Financing", ikon: "CreditCard" },
  ],
  ar: [
    { id: "genel", baslik: "أسئلة عامة", ikon: "HelpCircle" },
    { id: "emlak", baslik: "استشارات عقارية", ikon: "Building2" },
    { id: "kiralik", baslik: "خدمات الإيجار", ikon: "Key" },
    { id: "insaat", baslik: "البناء والتجديد", ikon: "Hammer" },
    { id: "belge", baslik: "المستندات والإجراءات", ikon: "FileText" },
    { id: "odeme", baslik: "الدفع والتمويل", ikon: "CreditCard" },
  ],
  de: [
    { id: "genel", baslik: "Allgemeine Fragen", ikon: "HelpCircle" },
    { id: "emlak", baslik: "Immobilienberatung", ikon: "Building2" },
    { id: "kiralik", baslik: "Mietdienstleistungen", ikon: "Key" },
    { id: "insaat", baslik: "Bau & Renovierung", ikon: "Hammer" },
    { id: "belge", baslik: "Dokumente & Verfahren", ikon: "FileText" },
    { id: "odeme", baslik: "Zahlung & Finanzierung", ikon: "CreditCard" },
  ],
  ru: [
    { id: "genel", baslik: "Общие вопросы", ikon: "HelpCircle" },
    { id: "emlak", baslik: "Консультации по недвижимости", ikon: "Building2" },
    { id: "kiralik", baslik: "Услуги аренды", ikon: "Key" },
    { id: "insaat", baslik: "Строительство и ремонт", ikon: "Hammer" },
    { id: "belge", baslik: "Документы и процедуры", ikon: "FileText" },
    { id: "odeme", baslik: "Оплата и финансирование", ikon: "CreditCard" },
  ],
};

// UI Text translations
export const sssTexts: Record<Locale, {
  title: string;
  titleHighlight: string;
  subtitle: string;
  breadcrumb: string;
  categories: string;
  questionsCount: string;
  contactTitle: string;
  contactText: string;
  whatsappText: string;
  popularTitle: string;
  popularSubtitle: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
}> = {
  tr: {
    title: "Sıkça Sorulan",
    titleHighlight: "Sorular",
    subtitle: "Emlak, tadilat ve inşaat hizmetlerimiz hakkında en çok merak edilen soruların cevaplarını burada bulabilirsiniz. Aradığınız cevabı bulamazsanız bize ulaşın.",
    breadcrumb: "Sıkça Sorulan Sorular",
    categories: "Kategoriler",
    questionsCount: "soru",
    contactTitle: "Sorunuz mu var?",
    contactText: "Cevabını bulamadığınız sorular için bize ulaşın.",
    whatsappText: "WhatsApp ile Yazın",
    popularTitle: "En Çok Sorulan Sorular",
    popularSubtitle: "Müşterilerimizin en sık sorduğu soruların kısa özetleri",
    ctaTitle: "Başka Sorularınız mı Var?",
    ctaText: "Cevabını bulamadığınız sorular için bizimle iletişime geçin. Uzman ekibimiz size yardımcı olmaktan mutluluk duyacaktır.",
    ctaButton: "İletişime Geç",
  },
  en: {
    title: "Frequently Asked",
    titleHighlight: "Questions",
    subtitle: "Here you can find answers to the most frequently asked questions about our real estate, renovation, and construction services. If you can't find what you're looking for, contact us.",
    breadcrumb: "Frequently Asked Questions",
    categories: "Categories",
    questionsCount: "questions",
    contactTitle: "Have a question?",
    contactText: "Contact us for questions you couldn't find answers to.",
    whatsappText: "Write on WhatsApp",
    popularTitle: "Most Asked Questions",
    popularSubtitle: "Brief summaries of the questions our customers ask most frequently",
    ctaTitle: "Have More Questions?",
    ctaText: "Contact us for questions you couldn't find answers to. Our expert team will be happy to help you.",
    ctaButton: "Contact Us",
  },
  ar: {
    title: "الأسئلة",
    titleHighlight: "الشائعة",
    subtitle: "يمكنك العثور هنا على إجابات للأسئلة الأكثر شيوعًا حول خدماتنا العقارية والتجديد والبناء. إذا لم تجد ما تبحث عنه، تواصل معنا.",
    breadcrumb: "الأسئلة الشائعة",
    categories: "الفئات",
    questionsCount: "أسئلة",
    contactTitle: "هل لديك سؤال؟",
    contactText: "تواصل معنا للأسئلة التي لم تجد إجاباتها.",
    whatsappText: "اكتب على واتساب",
    popularTitle: "الأسئلة الأكثر شيوعاً",
    popularSubtitle: "ملخصات موجزة للأسئلة التي يطرحها عملاؤنا بشكل متكرر",
    ctaTitle: "هل لديك المزيد من الأسئلة؟",
    ctaText: "تواصل معنا للأسئلة التي لم تجد إجاباتها. سيسعد فريقنا المتخصص بمساعدتك.",
    ctaButton: "تواصل معنا",
  },
  de: {
    title: "Häufig gestellte",
    titleHighlight: "Fragen",
    subtitle: "Hier finden Sie Antworten auf die häufigsten Fragen zu unseren Immobilien-, Renovierungs- und Baudienstleistungen. Wenn Sie nicht finden, was Sie suchen, kontaktieren Sie uns.",
    breadcrumb: "Häufig gestellte Fragen",
    categories: "Kategorien",
    questionsCount: "Fragen",
    contactTitle: "Haben Sie eine Frage?",
    contactText: "Kontaktieren Sie uns für Fragen, auf die Sie keine Antwort gefunden haben.",
    whatsappText: "Auf WhatsApp schreiben",
    popularTitle: "Am häufigsten gestellte Fragen",
    popularSubtitle: "Kurze Zusammenfassungen der Fragen, die unsere Kunden am häufigsten stellen",
    ctaTitle: "Haben Sie weitere Fragen?",
    ctaText: "Kontaktieren Sie uns für Fragen, auf die Sie keine Antwort gefunden haben. Unser Expertenteam hilft Ihnen gerne weiter.",
    ctaButton: "Kontaktieren Sie uns",
  },
  ru: {
    title: "Часто задаваемые",
    titleHighlight: "вопросы",
    subtitle: "Здесь вы найдете ответы на наиболее часто задаваемые вопросы о наших услугах в сфере недвижимости, ремонта и строительства. Если вы не нашли то, что искали, свяжитесь с нами.",
    breadcrumb: "Часто задаваемые вопросы",
    categories: "Категории",
    questionsCount: "вопросов",
    contactTitle: "У вас есть вопрос?",
    contactText: "Свяжитесь с нами по вопросам, на которые вы не нашли ответов.",
    whatsappText: "Написать в WhatsApp",
    popularTitle: "Самые частые вопросы",
    popularSubtitle: "Краткие резюме вопросов, которые наши клиенты задают чаще всего",
    ctaTitle: "Есть еще вопросы?",
    ctaText: "Свяжитесь с нами по вопросам, на которые вы не нашли ответов. Наша команда экспертов будет рада вам помочь.",
    ctaButton: "Связаться с нами",
  },
};

// Turkish FAQ data (source)
export const sorularTR: FAQ[] = [
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

// Import translated FAQs
import { sorularEN, sorularAR } from './sss-translations';

// Re-export for direct access if needed
export { sorularEN, sorularAR };

// Get FAQ data by locale
export function getSorular(locale: Locale): FAQ[] {
  switch (locale) {
    case 'en':
      return sorularEN.length > 0 ? sorularEN : sorularTR;
    case 'ar':
      return sorularAR.length > 0 ? sorularAR : sorularTR;
    case 'de':
      return sorularEN.length > 0 ? sorularEN : sorularTR; // Fallback to EN then TR
    case 'ru':
      return sorularEN.length > 0 ? sorularEN : sorularTR; // Fallback to EN then TR
    default:
      return sorularTR;
  }
}

// Popular questions for summary section
export const popularSorular: Record<Locale, Array<{
  soru: string;
  cevap: string;
  ikon: string;
}>> = {
  tr: [
    {
      soru: "2026'da Ortaca'da ev fiyatları ne kadar?",
      cevap: "2+1 daireler 4-10 milyon TL, 3+1 daireler 7-18 milyon TL, m² fiyatı 25-40 bin TL.",
      ikon: "Building2",
    },
    {
      soru: "Ücretsiz keşif yapıyor musunuz?",
      cevap: "Evet, tüm Muğla genelinde ücretsiz yerinde keşif ve detaylı fiyat teklifi sunuyoruz.",
      ikon: "Hammer",
    },
    {
      soru: "Anahtar teslim ev ne kadar sürer?",
      cevap: "Tek katlı ev 8-10 ay, iki katlı villa 12-15 ay, havuzlu projeler 15-18 ay.",
      ikon: "MapPin",
    },
    {
      soru: "Emlak komisyon oranı nedir?",
      cevap: "Satışta %2, kiralamada 1 aylık kira. Danışmanlık ücretsiz, gizli maliyet yok.",
      ikon: "CreditCard",
    },
    {
      soru: "Yabancılara ev satışı yapıyor musunuz?",
      cevap: "Evet, 30+ yabancı müşteriye hizmet verdik. Tapu ve oturma izni desteği sağlıyoruz.",
      ikon: "FileText",
    },
    {
      soru: "Tadilat işlerinde garanti var mı?",
      cevap: "Evet, 2 yıl işçilik garantisi + A sınıfı malzeme üretici garantisi.",
      ikon: "Key",
    },
  ],
  en: [
    {
      soru: "What are the housing prices in Ortaca in 2026?",
      cevap: "2+1 apartments 4-10 million TL, 3+1 apartments 7-18 million TL, price per m² 25-40 thousand TL.",
      ikon: "Building2",
    },
    {
      soru: "Do you provide free inspection?",
      cevap: "Yes, we offer free on-site inspection and detailed price quotes throughout Muğla.",
      ikon: "Hammer",
    },
    {
      soru: "How long does turnkey construction take?",
      cevap: "Single-story house 8-10 months, two-story villa 12-15 months, projects with pool 15-18 months.",
      ikon: "MapPin",
    },
    {
      soru: "What is the real estate commission rate?",
      cevap: "2% for sales, 1 month's rent for rentals. Consultation is free, no hidden costs.",
      ikon: "CreditCard",
    },
    {
      soru: "Do you sell properties to foreigners?",
      cevap: "Yes, we have served 30+ foreign clients. We provide title deed and residence permit support.",
      ikon: "FileText",
    },
    {
      soru: "Is there a warranty on renovation work?",
      cevap: "Yes, 2-year workmanship warranty + A-class material manufacturer warranty.",
      ikon: "Key",
    },
  ],
  ar: [
    {
      soru: "ما هي أسعار المنازل في أورتاجا في 2026؟",
      cevap: "شقق 2+1 من 4-10 مليون ليرة، شقق 3+1 من 7-18 مليون ليرة، سعر المتر 25-40 ألف ليرة.",
      ikon: "Building2",
    },
    {
      soru: "هل تقدمون معاينة مجانية؟",
      cevap: "نعم، نقدم معاينة مجانية في الموقع وعروض أسعار مفصلة في جميع أنحاء موغلا.",
      ikon: "Hammer",
    },
    {
      soru: "كم يستغرق البناء تسليم المفتاح؟",
      cevap: "منزل طابق واحد 8-10 أشهر، فيلا طابقين 12-15 شهراً، مشاريع مع مسبح 15-18 شهراً.",
      ikon: "MapPin",
    },
    {
      soru: "ما هي نسبة عمولة العقارات؟",
      cevap: "2% للمبيعات، إيجار شهر واحد للإيجارات. الاستشارة مجانية، بدون تكاليف خفية.",
      ikon: "CreditCard",
    },
    {
      soru: "هل تبيعون عقارات للأجانب؟",
      cevap: "نعم، خدمنا أكثر من 30 عميلاً أجنبياً. نقدم دعم سند الملكية وتصريح الإقامة.",
      ikon: "FileText",
    },
    {
      soru: "هل يوجد ضمان على أعمال التجديد؟",
      cevap: "نعم، ضمان سنتين على العمالة + ضمان الشركة المصنعة للمواد من الدرجة الأولى.",
      ikon: "Key",
    },
  ],
  de: [
    {
      soru: "Was kosten Wohnungen in Ortaca 2026?",
      cevap: "2+1 Wohnungen 4-10 Mio. TL, 3+1 Wohnungen 7-18 Mio. TL, Preis pro m² 25-40 Tsd. TL.",
      ikon: "Building2",
    },
    {
      soru: "Bieten Sie kostenlose Besichtigungen an?",
      cevap: "Ja, wir bieten kostenlose Vor-Ort-Besichtigungen und detaillierte Preisangebote in ganz Muğla.",
      ikon: "Hammer",
    },
    {
      soru: "Wie lange dauert ein schlüsselfertiger Bau?",
      cevap: "Einstöckiges Haus 8-10 Monate, zweistöckige Villa 12-15 Monate, Projekte mit Pool 15-18 Monate.",
      ikon: "MapPin",
    },
    {
      soru: "Wie hoch ist die Immobilienprovision?",
      cevap: "2% für Verkäufe, 1 Monatsmiete für Vermietungen. Beratung ist kostenlos, keine versteckten Kosten.",
      ikon: "CreditCard",
    },
    {
      soru: "Verkaufen Sie Immobilien an Ausländer?",
      cevap: "Ja, wir haben über 30 ausländische Kunden betreut. Wir bieten Unterstützung bei Grundbuch und Aufenthaltsgenehmigung.",
      ikon: "FileText",
    },
    {
      soru: "Gibt es Garantie auf Renovierungsarbeiten?",
      cevap: "Ja, 2 Jahre Arbeitsgarantie + Herstellergarantie für A-Klasse-Materialien.",
      ikon: "Key",
    },
  ],
  ru: [
    {
      soru: "Какие цены на жилье в Ортадже в 2026 году?",
      cevap: "Квартиры 2+1 от 4-10 млн TL, квартиры 3+1 от 7-18 млн TL, цена за м² 25-40 тыс. TL.",
      ikon: "Building2",
    },
    {
      soru: "Вы проводите бесплатный осмотр?",
      cevap: "Да, мы предлагаем бесплатный осмотр на месте и подробные ценовые предложения по всей Мугле.",
      ikon: "Hammer",
    },
    {
      soru: "Сколько времени занимает строительство под ключ?",
      cevap: "Одноэтажный дом 8-10 месяцев, двухэтажная вилла 12-15 месяцев, проекты с бассейном 15-18 месяцев.",
      ikon: "MapPin",
    },
    {
      soru: "Какая комиссия за недвижимость?",
      cevap: "2% при продаже, 1 месячная аренда при аренде. Консультация бесплатная, без скрытых расходов.",
      ikon: "CreditCard",
    },
    {
      soru: "Вы продаете недвижимость иностранцам?",
      cevap: "Да, мы обслужили более 30 иностранных клиентов. Мы оказываем поддержку с документами на собственность и видом на жительство.",
      ikon: "FileText",
    },
    {
      soru: "Есть ли гарантия на ремонтные работы?",
      cevap: "Да, 2 года гарантии на работу + гарантия производителя на материалы класса А.",
      ikon: "Key",
    },
  ],
};
