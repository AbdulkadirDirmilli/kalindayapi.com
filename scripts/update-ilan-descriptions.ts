/**
 * SEO Ilan Aciklama Guncelleme Script
 *
 * Bu script veritabanindaki ilan aciklamalarini genisletilmis SEO uyumlu iceriklere gunceller.
 * Calistirmak icin: npx tsx scripts/update-ilan-descriptions.ts
 */

import 'dotenv/config'

// Dynamic import for Prisma client with adapter
async function createPrismaClient() {
  const { PrismaClient } = await import('../lib/generated/prisma/client.js')
  const { PrismaLibSql } = await import('@prisma/adapter-libsql')

  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL || 'file:./prisma/dev.db',
  })

  return new PrismaClient({ adapter })
}

// Genisletilmis ilan aciklamalari (400+ kelime)
const ilanAciklamalari: Record<string, string> = {
  'ortaca-merkezde-satilik-3-1-daire': `Ortaca'nın kalbinde, Cumhuriyet Mahallesi'nde konumlanan bu 3+1 daire, merkezi konumu ve geniş yaşam alanı ile aileler için mükemmel bir seçenek sunuyor.

**Daire Özellikleri:**
145 metrekare brüt alana sahip bu daire, 3 yatak odası, geniş bir salon ve Amerikan mutfak düzenlemesi ile fonksiyonel bir yaşam alanı sağlıyor. 2 adet banyo bulunmakta olup, ana yatak odasına ait ebeveyn banyosu konforlu bir kullanım imkanı sunuyor. 5 katlı binanın 3. katında yer alan daire, hem gün ışığından maksimum faydalanıyor hem de sokak gürültüsünden korunuyor.

**Bina ve Site Özellikleri:**
2021 yılında tamamlanan bu modern yapı, doğalgaz kombi ısıtma sistemi ile dört mevsim konforlu yaşam vadediyor. Bina içerisinde asansör mevcut olup, site bünyesinde kapalı otopark ve çocuk oyun alanı bulunuyor. Balkon alanı, sabah kahvenizi güneşle içmenize olanak tanıyor.

**Konum Avantajları:**
Ortaca Cumhuriyet Mahallesi, ilçenin en merkezi ve yaşamın en canlı olduğu bölge. Çevrede market, eczane, banka şubeleri, restoranlar ve kafeler yürüme mesafesinde. Ortaca Devlet Hastanesi'ne 1 km, şehirlerarası otobüs terminaline 800 metre mesafededir. Çocuklar için yakın çevrede anaokulu, ilkokul ve ortaokul seçenekleri mevcut.

**Ulaşım:**
Dalaman Havalimanı'na 25 km, Dalyan'a 12 km, Köyceğiz'e 18 km mesafede. Muğla ve Fethiye'ye düzenli minibüs seferleri bulunuyor. Şehir içi ulaşım oldukça kolay ve araçla her noktaya 5-10 dakikada erişim mümkün.

**Yatırım Potansiyeli:**
Ortaca'da 2026 yılında konut fiyatları istikrarlı bir artış gösteriyor. Merkezi konum ve gelişen altyapı ile bu daire hem kullanım hem yatırım amaçlı değerlendirilebilir. Bölgedeki kiralama talebi, özellikle çalışan profesyoneller ve aileler arasında yüksek.

**Bu Bölgede Yaşam:**
Ortaca, Muğla'nın sakin ama gelişmiş ilçelerinden biri. Dalyan ve İztuzu Plajı'na yakınlık, hafta sonu aktiviteleri için çeşitli seçenekler sunuyor. Yöresel pazar günleri (Çarşamba ve Cumartesi), taze sebze ve meyve için ideal alışveriş imkanı sağlıyor. Kış aylarında ılıman iklim, yazları ise termal turizm ve doğa sporları için elverişli koşullar bulunuyor.

Detaylı bilgi, yerinde gösterim ve kredi hesaplama için Kalinda Yapı Emlak Danışmanlığı ekibiyle iletişime geçebilirsiniz.`,

  'dalyanda-satilik-mustakil-villa': `Dalyan'ın en prestijli lokasyonunda, doğa ile iç içe konumlanan bu 4+1 müstakil villa, lüks yaşam ve yüksek yatırım getirisi arayanlar için eşsiz bir fırsat sunuyor.

**Villa Özellikleri:**
280 metrekare kapalı alana sahip bu iki katlı villa, 4 yatak odası ve 3 banyosu ile geniş ailelere veya misafir ağırlamayı sevenlere ideal yaşam alanı sağlıyor. Yerden ısıtma sistemi, kış aylarında bile ayaklarınızın sıcak kalmasını garantiliyor. Tam eşyalı olarak satışa sunulan villa, hemen taşınmaya hazır durumda.

**Bahçe ve Dış Mekan:**
500 metrekarelik özel bahçe, peyzaj düzenlemesi tamamlanmış halde. Özel yüzme havuzu, sıcak yaz günlerinde serinlemenizi sağlarken, barbekü alanı aile ve arkadaş toplantıları için mükemmel bir atmosfer yaratıyor. Bahçedeki olgun ağaçlar doğal gölgelik alanlar oluşturuyor.

**Güvenlik ve Konfor:**
Site güvenliği mevcut olan bu villa, 7/24 güvenli bir ortam sunuyor. Kapalı otopark alanı, aracınızı güneş ve yağmurdan koruyor. Her odada klima ve geniş pencereler, doğal aydınlatma ve hava sirkülasyonu sağlıyor.

**Konum Avantajları:**
Dalyan, UNESCO Dünya Mirası geçici listesinde yer alan tarihi ve doğal güzellikleriyle ünlü. Antik Kaunos harabeleri, kaya mezarları ve caretta caretta kaplumbağalarının yuvalama alanı İztuzu Plajı'na yakınlık, bu villayı benzersiz kılıyor. Dalyan Çarşı'ya 2 km, Dalyan Kanalı'na yürüme mesafesinde.

**Yatırım Potansiyeli:**
Dalyan villaları, yaz sezonunda günlük ve haftalık kiralama ile yüksek getiri sağlıyor. 2026 yılında günlük villa kiralama fiyatları 3.000-8.000 TL arasında değişiyor. Yabancı turist ilgisi özellikle İngiliz ve Alman ziyaretçiler arasında yoğun. Türkiye'nin en popüler tatil destinasyonlarından biri olan Dalyan'da gayrimenkul değerleri düzenli artış gösteriyor.

**Ulaşım:**
Dalaman Havalimanı'na 20 km (transfer imkanları mevcut), Fethiye'ye 60 km, Marmaris'e 90 km. Ortaca ilçe merkezine 10 km mesafede.

**Bu Bölgede Yaşam:**
Dalyan, huzurlu bir yaşam arayanlar için cennet. Sabah uyandığınızda kuş sesleri, akşamları ise kurbağa konserleri sizi karşılıyor. Çamur banyoları ve Sultaniye Kaplıcaları, sağlıklı yaşam için doğal imkanlar sunuyor. Yaz aylarında teknelerle göl ve deniz turları, kış aylarında doğa yürüyüşleri ve bisiklet turları organize ediliyor.

Yerinde gösterim ve detaylı bilgi için Kalinda Yapı Emlak ekibiyle iletişime geçin.`,

  'koycegiz-golu-manzarali-kiralik-daire': `Köyceğiz Gölü'nün büyüleyici manzarasına sahip bu 2+1 kiralık daire, doğa ile iç içe huzurlu bir yaşam arayanlar için ideal seçenek sunuyor.

**Daire Özellikleri:**
120 metrekare kullanım alanına sahip bu daire, 2 yatak odası, geniş salon ve tam donanımlı mutfaktan oluşuyor. 6 katlı binanın 4. katında yer alması, hem göl manzarasından maksimum faydalanmanızı sağlıyor hem de mahremiyet sunuyor. Tam eşyalı olarak kiraya verilen daire, beyaz eşya, mobilya ve klima dahil hemen yaşanmaya hazır.

**Bina Özellikleri:**
2016 yılında inşa edilen binada asansör mevcut. Doğalgaz kombi ısıtma sistemi ile kış aylarında ekonomik ve konforlu ısınma sağlanıyor. Dairenin geniş balkonu, kahve içerken veya kitap okurken göl manzarasının keyfini çıkarmanıza olanak tanıyor.

**Konum Avantajları:**
Daire, Köyceğiz Gölü kenarındaki yürüyüş yoluna sadece 200 metre mesafede. Sabah koşuları veya akşam yürüyüşleri için ideal bir konumda. Köyceğiz ilçe merkezine 800 metre, tüm temel ihtiyaçlara (market, eczane, banka, sağlık ocağı) yürüme mesafesinde.

**Göl Yaşamı:**
Köyceğiz Gölü, Türkiye'nin en büyük doğal göllerinden biri ve çevresinde benzersiz bir ekosistem barındırıyor. Göl kenarında balık restoranları, çay bahçeleri ve hediyelik eşya dükkanları bulunuyor. Teknelerle Dalyan Kanalı üzerinden İztuzu Plajı'na ulaşmak mümkün.

**Kira Koşulları:**
Aylık 18.000 TL kira bedeli ile sunulan bu daire, yıllık kiralama için uygundur. Depozito 2 aylık kira tutarındadır. Aidat aylık 400 TL olup, ortak alan temizliği ve asansör bakımını kapsamaktadır.

**Çevredeki Aktiviteler:**
Sultaniye Kaplıcaları'na 10 km, çamur banyolarına 15 km mesafede. Köyceğiz'den kalkan teknelerle günübirlik Dalyan ve İztuzu turları düzenleniyor. Bölgede trekking, kuş gözlemciliği ve fotoğraf turları için rehberli organizasyonlar mevcut. Her Pazartesi kurulan Köyceğiz pazarı, yerel ürünler için alışveriş imkanı sunuyor.

**Ulaşım:**
Dalaman Havalimanı'na 35 km, Ortaca'ya 20 km, Fethiye'ye 70 km mesafede. Muğla ve çevre illere düzenli otobüs seferleri bulunuyor.

Detaylı bilgi ve randevu için Kalinda Yapı Emlak Danışmanlığı ile iletişime geçin.`,

  'dalamanda-satilik-ticari-isyeri': `Dalaman'ın en işlek ana caddesinde konumlanan bu 180 metrekarelik ticari işyeri, girişimciler ve yatırımcılar için yüksek potansiyelli bir fırsat sunuyor.

**İşyeri Özellikleri:**
Zemin katta yer alan bu açık plan işyeri, 180 metrekare kullanım alanı ile market, mağaza, showroom veya ofis olarak değerlendirilebilir. Yüksek tavan tasarımı (3.5 metre), ferah bir iç mekan ve asma kat yapabilme imkanı sağlıyor. 2 adet tuvalet ve lavabo mevcut. Geniş vitrin cephesi, ürünlerinizi sergilemeniz veya marka görünürlüğünüz için ideal.

**Altyapı ve Teknik Özellikler:**
Klima altyapısı hazır, elektrik 3 faz çekilmiş durumda. Güvenlik kamerası ve alarm sistemi için gerekli altyapı mevcut. Depremsellik açısından yönetmeliklere uygun inşa edilmiş yapıda konumlanıyor. 10 yıllık bina, bakımlı ve kullanıma hazır durumda.

**Bina ve Çevre:**
4 katlı binanın zemin katında yer alan işyeri, bina içi asansör ile üst katlara erişim imkanı sunuyor. Kapalı otopark alanı müşteri ve çalışan konforu için önemli bir avantaj. Binada güvenlik görevlisi mevcut.

**Konum Avantajları:**
Dalaman ana caddesi, ilçenin en yoğun yaya trafiğine sahip bölgesi. Çevrede bankalar, eczaneler, restoranlar ve diğer ticari işletmeler bulunuyor. Dalaman Belediyesi'ne 300 metre, Dalaman Devlet Hastanesi'ne 1 km mesafede. Yoğun konut alanlarına yakınlık, geniş müşteri potansiyeli anlamına geliyor.

**Yatırım Potansiyeli:**
Dalaman Havalimanı'na sadece 10 km mesafede olması, bölgeye olan ilgiyi sürekli canlı tutuyor. Yaz aylarında turist trafiği artıyor ve ticari faaliyetler canlanıyor. 2026 yılında Dalaman'da ticari gayrimenkul fiyatları %15-20 değer artışı gösterdi. Kiralama durumunda aylık 30.000-40.000 TL kira getirisi potansiyeli bulunuyor.

**Uygun İş Kolları:**
- Market veya süpermarket
- Giyim veya ayakkabı mağazası
- Mobilya veya beyaz eşya showroom'u
- Sigorta veya emlak ofisi
- Kafe veya pastane
- Eczane veya medikal mağaza

**Ulaşım:**
Dalaman Havalimanı'na 10 km, Fethiye'ye 45 km, Ortaca'ya 20 km, Köyceğiz'e 30 km mesafede.

Detaylı bilgi, yerinde inceleme ve yatırım danışmanlığı için Kalinda Yapı ekibiyle iletişime geçin.`,

  'ortacada-satilik-imarli-arsa': `Ortaca'nın gelişen Atatürk Mahallesi'nde, konut imarlı ve 5 kat gabari izinli bu 550 metrekarelik arsa, inşaat firmaları ve bireysel yatırımcılar için değerli bir yatırım fırsatı sunuyor.

**Arsa Özellikleri:**
550 metrekare yüzölçümüne sahip bu köşe parsel, 20 metre yol cephesi ile dikkat çekici görünürlük sağlıyor. Düz ve kullanıma hazır zemin yapısı, inşaat maliyetlerini optimize ediyor. Parsel sınırları net ve tapuda herhangi bir sorun bulunmuyor.

**İmar Durumu:**
Konut imarlı olup, 5 kat gabari izni bulunuyor. TAKS 0.35, KAKS 1.75 oranları geçerli. Bu imar koşullarıyla yaklaşık 10-12 daire içeren bir apartman inşa edilebilir. Ortaca Belediyesi'nden güncel imar durumu belgesi alınabilir.

**Altyapı:**
Elektrik, su ve doğalgaz altyapısı parsel sınırına kadar çekilmiş durumda. Kanalizasyon bağlantısı mevcut. Yol asfalt kaplı ve kaldırımlar düzenlenmiş. Fiber internet altyapısı bölgede mevcut.

**Konum Avantajları:**
Atatürk Mahallesi, Ortaca'nın en hızlı gelişen bölgelerinden biri. Son 3 yılda bölgede çok sayıda yeni konut projesi tamamlandı. Ortaca merkeze 1.5 km, hastaneye 2 km, şehirlerarası terminale 1 km mesafede. Çevrede yeni açılan market zincirleri ve ticari alanlar bulunuyor.

**Yatırım Potansiyeli:**
Ortaca'da 2026 yılında konut imarlı arsa fiyatları metrekare başına 2.500-4.000 TL arasında değişiyor. Bu arsa, konum avantajı ve imar koşulları göz önüne alındığında piyasa ortalamasının üzerinde değer potansiyeline sahip. İnşaat firmaları için anahtar teslim proje geliştirme fırsatı, bireysel yatırımcılar için kat karşılığı anlaşma imkanı bulunuyor.

**Bölgesel Gelişmeler:**
- Ortaca-Dalaman karayolu genişletme projesi devam ediyor
- Yeni devlet hastanesi inşaatı 2027'de tamamlanacak
- Organize Sanayi Bölgesi gelişme alanı olarak ilan edildi
- Belediye tarafından yeni park ve yeşil alan projeleri planlanıyor

**Proje Önerileri:**
- 10-12 daireli konut projesi
- Karma kullanım (zemin kat ticari, üst katlar konut)
- Butik apart otel (turizm bölgesine yakınlık avantajı)

**Yasal Durum:**
Tapu tescili temiz, herhangi bir ipotek veya haciz bulunmuyor. Veraset veya şufa hakkı sorunu yok. Tapu devri aynı gün gerçekleştirilebilir.

Arsa inceleme, proje danışmanlığı ve imar detayları için Kalinda Yapı Taahhüt ekibiyle iletişime geçin.`,

  'dalyan-kanali-yakini-kiralik-villa': `Dalyan Kanalı'na yürüme mesafesinde, özel havuzlu ve geniş bahçeli bu 3+1 kiralık villa, huzurlu bir tatil veya uzun dönem konaklama arayanlar için eşsiz bir seçenek sunuyor.

**Villa Özellikleri:**
200 metrekare kapalı alana sahip bu iki katlı villa, 3 yatak odası ve 2 banyosu ile 4-6 kişilik aileler veya gruplar için ideal kapasitede. Tam eşyalı olarak kiraya verilen villa; çamaşır makinesi, bulaşık makinesi, klima, TV ve WiFi dahil tüm ihtiyaçları karşılıyor. Geniş salon alanı hem yemek hem de oturma grubu için rahat kullanım sağlıyor.

**Dış Mekan ve Havuz:**
300 metrekarelik bahçede özel yüzme havuzu, güneşlenme terasları ve barbekü alanı bulunuyor. Bahçe bakımı ve havuz temizliği kira bedeline dahil olup, profesyonel ekip tarafından düzenli olarak yapılıyor. Bahçede olgun zeytin ve narenciye ağaçları gölgelik alanlar oluşturuyor.

**Konum ve Çevre:**
Dalyan Kanalı'na 500 metre, Dalyan Çarşı'ya 1.5 km mesafede. Yürüyerek kanala ulaşıp tekne turlarına katılabilirsiniz. Çevrede restoranlar, marketler ve hediyelik eşya dükkanları mevcut. Sessiz ve sakin bir sokakta konumlanan villa, gürültüden uzak huzurlu bir ortam sunuyor.

**Kira Seçenekleri:**
- **Yıllık Kiralama:** 45.000 TL/ay (minimum 1 yıl sözleşme)
- **Sezonluk Kiralama:** Mayıs-Ekim arası 60.000 TL/ay
- **Günlük/Haftalık:** Fiyat için iletişime geçin

Tüm kiralama seçeneklerinde elektrik ve su kiracıya ait, doğalgaz ve internet kira bedeline dahildir.

**Villa Olanakları:**
- Özel havuz (8x4 metre)
- Klima (tüm odalarda)
- Tam donanımlı mutfak
- Barbekü ve mangal seti
- Kapalı otopark (1 araç)
- Bahçe mobilyaları
- Şezlong ve güneş şemsiyeleri
- WiFi internet

**Çevredeki Aktiviteler:**
- İztuzu Plajı tekne turu (30 dk)
- Kaya Mezarları ziyareti (1 km)
- Çamur banyosu (tekneyle 20 dk)
- Sultaniye Kaplıcaları (tekneyle 30 dk)
- Köyceğiz Gölü turu (yarım gün)
- Kaunos Antik Kenti (karşı kıyı, sandalla 5 dk)

**Ulaşım:**
Dalaman Havalimanı'ndan transfer hizmeti ayarlanabilir (20 km). Ortaca'ya 10 km, Fethiye'ye 60 km, Marmaris'e 90 km.

Rezervasyon ve detaylı bilgi için Kalinda Yapı ekibiyle iletişime geçin.`,

  'ortacada-satilik-2-1-sifir-daire': `Ortaca'nın saygın Kemaliye Mahallesi'nde, yeni teslim sıfır 2+1 daire, ilk ev sahibi olmak isteyenler ve küçük aileler için ideal bir başlangıç fırsatı sunuyor.

**Daire Özellikleri:**
95 metrekare brüt alana sahip bu daire, 2 yatak odası, ferah salon ve açık mutfak düzenlemesi ile modern yaşam standartları sunuyor. 4 katlı binanın 2. katında yer alan daire, hem güneş ışığından faydalanıyor hem de dış gürültüden korunuyor. Sıfır teslim olduğundan, dekorasyonu ve renk seçimlerini kendi zevkinize göre yapabilirsiniz.

**Yapı Kalitesi:**
2024 yılında tamamlanan bu modern yapı, güncel deprem yönetmeliklerine uygun inşa edilmiş. Doğalgaz kombi ısıtma sistemi ekonomik ve konforlu ısınma sağlıyor. Bina dış cephesi mantolama ile kaplanmış, ısı yalıtımı A sınıfında. Çift cam PVC pencereler ses ve ısı yalıtımı sağlıyor.

**İç Mekan Özellikleri:**
- Açık mutfak konsepti
- Geniş balkon (6 m²)
- Ebeveyn yatak odası
- Ankastre mutfak dolabı (opsiyonel)
- Seramik zemin kaplama
- Kaliteli banyo vitrifiyesi

**Bina Olanakları:**
- Asansör
- Kapalı otopark (1 araç dahil)
- Bebek arabası ve bisiklet alanı
- Düzenli site yönetimi

**Konum Avantajları:**
Kemaliye Mahallesi, Ortaca'nın sakin ve aile dostu semtlerinden biri. İlçe merkezine 5 dakika yürüme mesafesinde. Çevrede anaokulu, ilkokul, ortaokul ve lise bulunuyor. Market, fırın, eczane ve sağlık ocağı 300 metre içinde. Ortaca Devlet Hastanesi'ne 1.5 km mesafede.

**Finansman Seçenekleri:**
Kredi kullanımına uygun olup, bankaların konut kredisi ekspertiz süreçlerini başarıyla tamamlıyor. Peşinat ve vade seçenekleri için banka görüşmeleri koordine edilebilir. Takas değerlendirilebilir.

**Yatırım Değerlendirmesi:**
Ortaca'da 2+1 sıfır daire fiyatları 2.000.000-2.500.000 TL arasında değişiyor. Bu daire, konum ve yapı kalitesi göz önüne alındığında makul bir fiyatlandırmaya sahip. Kiralama durumunda aylık 10.000-12.000 TL kira getirisi potansiyeli bulunuyor.

**Teslimat:**
Tapu devri ve anahtar teslimi aynı gün yapılabilir. İskan belgesi alınmış, oturuma hazır.

Yerinde gösterim, kredi hesaplama ve detaylı bilgi için Kalinda Yapı Emlak Danışmanlığı ekibiyle iletişime geçin.`,

  'koycegiz-merkezde-kiralik-isyeri': `Köyceğiz'in işlek çarşı merkezinde, turistik bölgeye yakın konumuyla dikkat çeken bu 120 metrekarelik kiralık işyeri, girişimciler için cazip bir fırsat sunuyor.

**İşyeri Özellikleri:**
Zemin katta yer alan bu açık plan dükkan, 120 metrekare kullanım alanı ile restoran, kafe, butik mağaza veya turistik hediyelik eşya dükkanı olarak değerlendirilebilir. Geniş vitrin cephesi sokaktan görünürlük sağlıyor. 1 adet tuvalet mevcut. Tavan yüksekliği 3 metre olup, ferah bir atmosfer yaratıyor.

**Teknik Altyapı:**
Klima mevcut ve çalışır durumda. Elektrik altyapısı ticari kullanıma uygun. Su ve kanalizasyon bağlantısı hazır. Restoran veya kafe kullanımı için davlumbaz çıkışı yapılabilir.

**Konum Avantajları:**
Köyceğiz çarşısı, göl kenarına 300 metre mesafede turistlerin yoğun olarak ziyaret ettiği bölge. Pazartesi günleri kurulan halk pazarı, haftalık ziyaretçi trafiği oluşturuyor. Belediye meydanına 200 metre, dolmuş durağına 100 metre mesafede.

**Sezonluk Potansiyel:**
Köyceğiz, yaz aylarında (Mayıs-Ekim) yoğun turist akınına uğruyor. Dalyan tekne turları, çamur banyosu ve Sultaniye Kaplıcaları ziyaretçileri Köyceğiz'de alışveriş ve yemek için duruyor. Kış aylarında ise yerel halkın alışverişi ile işletme sürdürülebilirliği korunuyor.

**Kira Koşulları:**
- Aylık kira: 25.000 TL
- Depozito: 2 aylık kira tutarı
- Kontrat: Minimum 1 yıl
- Aidat: 300 TL/ay (ortak alan temizliği)

Kira bedeli yıllık TÜFE oranında artış içerir. Uzun dönem kiracılara özel indirim görüşülebilir.

**Uygun İş Kolları:**
- Balık restoranı veya meyhane
- Kafe ve pasta salonu
- Turistik hediyelik eşya dükkanı
- Takı ve aksesuar butik
- Yöresel gıda satış mağazası
- Su sporları ve tur acentesi
- Sanat galerisi veya el sanatları atölyesi

**Bölgesel Ekonomi:**
Köyceğiz, son yıllarda eko-turizm ve doğa turizmi ile öne çıkıyor. Kuş gözlemciliği, doğa fotoğrafçılığı ve termal turizm ziyaretçileri bölgeye düzenli akış sağlıyor. Belediye'nin turizm teşvikleri yeni işletmelere destek veriyor.

**Ulaşım:**
Dalaman Havalimanı'na 35 km, Ortaca'ya 20 km, Fethiye'ye 70 km mesafede.

Detaylı bilgi ve yerinde inceleme için Kalinda Yapı ekibiyle iletişime geçin.`,

  'dalaman-havalimani-yakini-satilik-arsa': `Dalaman Havalimanı'na sadece 5 km mesafede, ana yol üzerinde konumlanan bu 1200 metrekarelik ticari imarlı arsa, otel, apart otel veya iş merkezi yatırımcıları için stratejik bir fırsat sunuyor.

**Arsa Özellikleri:**
1200 metrekare yüzölçümüne sahip bu parsel, 30 metre yol cephesi ile maksimum görünürlük ve erişilebilirlik sağlıyor. Düz arazi yapısı, inşaat sürecini kolaylaştırıyor ve ek tesviye maliyeti gerektirmiyor. Köşe parsel olması, mimari tasarımda esneklik sunuyor.

**İmar Durumu:**
Ticari imarlı olup, 3 kat gabari izni bulunuyor. Bu imar koşullarıyla otel, apart otel, iş merkezi, showroom veya lojistik depo gibi ticari yapılar inşa edilebilir. Dalaman Belediyesi'nden güncel imar durumu alınabilir.

**Altyapı:**
Elektrik (3 faz), su ve kanalizasyon altyapısı parsel sınırına kadar getirilmiş. Ana yol asfalt kaplı ve bakımlı. Fiber optik internet altyapısı bölgede mevcut.

**Stratejik Konum Avantajları:**
Dalaman Havalimanı Türkiye'nin en yoğun dördüncü havalimanı olup, yıllık 4 milyonun üzerinde yolcu trafiğine sahip. Yaz sezonunda charter uçuşlarıyla İngiliz, Alman, Rus ve Hollandalı turistler bölgeye akın ediyor. Havalimanından Fethiye, Marmaris, Dalyan ve Köyceğiz'e giden tüm araçlar bu güzergahı kullanıyor.

**Proje Potansiyeli:**
- **Otel/Apart Otel:** Havalimanına yakınlık nedeniyle transit konaklama talebi yüksek
- **Araç Kiralama Şirketi:** Havalimanı çıkışında görünür lokasyon
- **Lojistik/Depo:** Havacılık ve turizm sektörüne hizmet
- **Restoran/Dinlenme Tesisi:** Yol üzeri hizmet alanı
- **İş Merkezi:** Bölgesel firmalar için ofis alanı

**Yatırım Değerlendirmesi:**
Dalaman Havalimanı'nın 2027'de tamamlanacak yeni terminal projesi, bölgedeki gayrimenkul değerlerini yukarı taşıyacak. 2026 yılında ticari imarlı arsa fiyatları metrekare başına 3.000-5.000 TL arasında seyrediyor. Bu arsa, lokasyon avantajıyla piyasa ortalamasının üzerinde değerlenme potansiyeli taşıyor.

**Yasal Durum:**
Tapu tescili temiz ve güncel. Herhangi bir ipotek, haciz veya şufa hakkı bulunmuyor. Hissesiz tek parsel. Tapu devri aynı gün gerçekleştirilebilir.

**Ulaşım:**
- Dalaman Havalimanı: 5 km
- Dalaman ilçe merkezi: 3 km
- Fethiye: 45 km
- Marmaris: 100 km
- Ortaca: 20 km

Arsa inceleme, yatırım fizibilitesi ve proje danışmanlığı için Kalinda Yapı Taahhüt ekibiyle iletişime geçin.`,

  'ortacada-kiralik-genis-3-1-daire': `Ortaca'nın merkezinde, Cumhuriyet Mahallesi'nde konumlanan bu geniş 3+1 kiralık daire, aileler ve uzun süreli kiracılar için konforlu bir yaşam alanı sunuyor.

**Daire Özellikleri:**
130 metrekare kullanım alanına sahip bu daire, 3 geniş yatak odası, ferah salon ve fonksiyonel mutfaktan oluşuyor. 4 katlı binanın 1. katında yer alan daire, merdiven çıkmadan kolay erişim sağlarken, üst kattan gelen gürültüyü de minimize ediyor. 2 banyolu yapısı ile sabah trafiğini ortadan kaldırıyor.

**İç Mekan Detayları:**
- Geniş salon (35 m²)
- Master yatak odası (18 m²)
- İkinci ve üçüncü yatak odaları (12 ve 10 m²)
- Amerikan tipi mutfak
- Giyinme odası/gardırop alanı
- Geniş balkon (8 m²)

**Bina Özellikleri:**
2019 yılında tamamlanan binada asansör mevcut. Doğalgaz kombi ısıtma sistemi ekonomik ve verimli. Kapalı otopark alanında kiracıya 1 araçlık yer tahsis ediliyor. Düzenli site yönetimi hijyen ve güvenliği sağlıyor.

**Boş Teslim:**
Daire boş (eşyasız) olarak kiraya verilmektedir. Beyaz eşya seçenekleri görüşülebilir. Mutfak dolabı ve banyo dolapları mevcuttur.

**Konum Avantajları:**
Cumhuriyet Mahallesi, Ortaca'nın en merkezi bölgesi. Her türlü sosyal olanağa yürüme mesafesinde:
- Ortaca Devlet Hastanesi: 1 km
- İlkokul ve Ortaokul: 500 m
- Ortaca Anadolu Lisesi: 800 m
- Market zincirleri: 200 m
- Belediye ve Hükümet Konağı: 600 m
- Şehirlerarası terminal: 1.2 km

**Kira Koşulları:**
- Aylık kira: 15.000 TL
- Depozito: 2 aylık kira tutarı (30.000 TL)
- Aidat: 450 TL/ay
- Kontrat: Minimum 1 yıl

Kiracı profili: Referanslı, düzenli geliri olan, uzun süreli konaklama planlayan aileler tercih edilmektedir.

**Bu Bölgede Yaşam:**
Ortaca, Muğla'nın en işlevsel ilçelerinden biri. Dalyan'a 12 km, Köyceğiz'e 18 km yakınlıkla hem doğa hem şehir hayatının avantajlarını bir arada sunuyor. Çarşamba ve Cumartesi günleri kurulan halk pazarı, taze ve uygun fiyatlı alışveriş imkanı sağlıyor. Kış aylarında ılıman iklim, yazları ise çevre plajlar ve göller serinleme fırsatı veriyor.

**Ulaşım:**
- Dalaman Havalimanı: 25 km
- Fethiye: 50 km
- Muğla: 90 km

Daire gösterimi ve detaylı bilgi için Kalinda Yapı Emlak Danışmanlığı ekibiyle iletişime geçin.`,
}

async function main() {
  console.log('Ilan aciklamalari guncelleniyor...')
  console.log('')

  const prisma = await createPrismaClient()

  try {
    let updated = 0
    let notFound = 0

    for (const [slug, aciklama] of Object.entries(ilanAciklamalari)) {
      const ilan = await prisma.ilan.findUnique({
        where: { slug },
      })

      if (!ilan) {
        console.log(`✗ ${slug} bulunamadi`)
        notFound++
        continue
      }

      await prisma.ilan.update({
        where: { slug },
        data: { aciklama },
      })

      console.log(`✓ ${ilan.baslik} guncellendi`)
      updated++
    }

    console.log('')
    console.log('='.repeat(50))
    console.log(`Toplam: ${updated} ilan guncellendi, ${notFound} bulunamadi`)
    console.log('='.repeat(50))
  } catch (error) {
    console.error('Hata:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
