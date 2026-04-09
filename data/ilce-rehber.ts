// Muğla İlçe Rehberi - SEO Optimizeli İçerikler
// Her ilçe için detaylı tanıtım, mahalleler ve görseller

export interface IlceRehber {
  slug: string;
  ad: string;
  il: string;
  nufus: string;
  koordinatlar: { lat: number; lng: number };
  kapakGorsel: string;
  galeriGorseller: string[];
  metaDescription: string;
  kisaTanitim: string;
  ozellikler: {
    havalimanMesafe?: string;
    sahpiUzunlugu?: string;
    yuzolcumu?: string;
    rakım?: string;
  };
  seoBasliklar: string[];
  sss: { soru: string; cevap: string }[];
}

export const ilceRehberleri: IlceRehber[] = [
  {
    slug: "ortaca",
    ad: "Ortaca",
    il: "Muğla",
    nufus: "42.000",
    koordinatlar: { lat: 36.8384, lng: 28.7667 },
    kapakGorsel: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=630&fit=crop&q=80",
    galeriGorseller: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop&q=80",
    ],
    metaDescription: "Ortaca ilçesi emlak, konut ve arsa yatırımı rehberi. Dalyan'a komşu, havalimanına 20 dk mesafede. Mahalleler, fiyatlar ve yaşam rehberi.",
    kisaTanitim: "Ortaca, Muğla'nın batısında, Dalaman Havalimanı'na sadece 20 dakika mesafede yer alan sakin ve gelişmekte olan bir ilçedir. Dalyan'ın komşusu olan Ortaca, hem doğal güzellikleri hem de uygun emlak fiyatlarıyla yatırımcıların dikkatini çekmektedir.",
    ozellikler: {
      havalimanMesafe: "20 km (Dalaman)",
      yuzolcumu: "470 km²",
    },
    seoBasliklar: [
      "Ortaca'da Satılık Ev ve Arsa Fiyatları 2026",
      "Ortaca Emlak Piyasası Değerlendirmesi",
      "Ortaca'da Yaşam Rehberi",
      "Ortaca Mahallelerinde Yatırım Fırsatları",
      "Ortaca'da Kiralık Daire ve Villa",
    ],
    sss: [
      { soru: "Ortaca'da konut fiyatları ne kadar?", cevap: "2026 yılı itibarıyla Ortaca'da daire fiyatları m² başına 18.000-35.000 TL arasında değişmektedir." },
      { soru: "Ortaca havalimanına ne kadar uzak?", cevap: "Dalaman Havalimanı Ortaca'ya sadece 20 km mesafededir, yaklaşık 20 dakikalık araç yolculuğu." },
      { soru: "Ortaca'da hangi mahalleler yatırım için uygun?", cevap: "Cumhuriyet, Karaburun ve Dalyan yolu üzeri mahalleler yatırım için öne çıkmaktadır." },
    ],
  },
  {
    slug: "dalyan",
    ad: "Dalyan",
    il: "Muğla",
    nufus: "5.500",
    koordinatlar: { lat: 36.8333, lng: 28.6333 },
    kapakGorsel: "https://images.unsplash.com/photo-1562602833-0f4ab2fc46e5?w=1200&h=630&fit=crop&q=80",
    galeriGorseller: [
      "https://images.unsplash.com/photo-1596627116790-af6f46dddbea?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80",
    ],
    metaDescription: "Dalyan rehberi: İztuzu Plajı, Kaunos Antik Kenti, villa ve emlak fırsatları. Caretta caretta'ların yuvası Dalyan'da yaşam ve yatırım.",
    kisaTanitim: "Dalyan, UNESCO koruma altındaki İztuzu Plajı ve caretta caretta deniz kaplumbağalarıyla dünyaca ünlü bir beldedir. Antik Kaunos kenti, çamur banyoları ve eşsiz doğasıyla hem turizm hem de emlak yatırımı için cazip bir destinasyondur.",
    ozellikler: {
      havalimanMesafe: "25 km (Dalaman)",
      sahpiUzunlugu: "4.5 km (İztuzu)",
    },
    seoBasliklar: [
      "Dalyan'da Satılık Villa ve Ev Fiyatları",
      "Dalyan Emlak Yatırım Rehberi 2026",
      "Dalyan'da Yaşam: Avantajlar ve Dezavantajlar",
      "Dalyan Turizm ve Gayrimenkul Potansiyeli",
      "Dalyan'da Kiralık Tatil Villası",
    ],
    sss: [
      { soru: "Dalyan'da villa fiyatları ne kadar?", cevap: "Dalyan'da villa fiyatları konuma göre 4 milyon TL'den başlayıp 20 milyon TL'ye kadar çıkabilmektedir." },
      { soru: "Dalyan'da yabancılar mülk alabilir mi?", cevap: "Evet, yabancı uyruklu kişiler Dalyan'da yasal prosedürlere uygun olarak mülk satın alabilir." },
      { soru: "Dalyan'da en iyi mahalle hangisi?", cevap: "Dalyan Mahallesi merkez konumuyla, kanal manzaralı bölgeler ise doğa severler için idealdir." },
    ],
  },
  {
    slug: "koycegiz",
    ad: "Köyceğiz",
    il: "Muğla",
    nufus: "38.000",
    koordinatlar: { lat: 36.9667, lng: 28.6833 },
    kapakGorsel: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop&q=80",
    galeriGorseller: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop&q=80",
    ],
    metaDescription: "Köyceğiz Gölü manzaralı emlak fırsatları. Sultaniye Kaplıcaları, doğal yaşam ve uygun arsa fiyatları. Köyceğiz yatırım rehberi.",
    kisaTanitim: "Köyceğiz, Türkiye'nin en büyük lagün göllerinden birine ev sahipliği yapan, termal kaynakları ve el değmemiş doğasıyla öne çıkan sakin bir ilçedir. Sultaniye Kaplıcaları ve göl manzaralı mülkler yatırımcıların ilgisini çekmektedir.",
    ozellikler: {
      havalimanMesafe: "30 km (Dalaman)",
      yuzolcumu: "934 km²",
    },
    seoBasliklar: [
      "Köyceğiz'de Satılık Arsa ve Ev",
      "Köyceğiz Gölü Manzaralı Mülkler",
      "Köyceğiz Emlak Piyasası 2026",
      "Köyceğiz'de Yaşam Maliyeti",
      "Köyceğiz Yatırım Potansiyeli",
    ],
    sss: [
      { soru: "Köyceğiz'de arsa fiyatları ne kadar?", cevap: "Köyceğiz'de imarlı arsa fiyatları m² başına 2.000-6.000 TL arasında değişmektedir." },
      { soru: "Köyceğiz'de göl manzaralı ev var mı?", cevap: "Evet, özellikle Ulucami ve Köyceğiz Mahallesi'nde göl manzaralı mülkler bulunmaktadır." },
      { soru: "Köyceğiz kaplıcaları nerede?", cevap: "Sultaniye Kaplıcaları Köyceğiz Gölü kıyısında, teknelerle ulaşılabilen bir konumdadır." },
    ],
  },
  {
    slug: "dalaman",
    ad: "Dalaman",
    il: "Muğla",
    nufus: "45.000",
    koordinatlar: { lat: 36.7667, lng: 28.8000 },
    kapakGorsel: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=630&fit=crop&q=80",
    galeriGorseller: [
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&h=600&fit=crop&q=80",
    ],
    metaDescription: "Dalaman Havalimanı bölgesi emlak rehberi. Stratejik konum, tarım arazileri ve konut yatırımı. Dalaman'da arsa ve ev fiyatları.",
    kisaTanitim: "Dalaman, uluslararası havalimanıyla Muğla'nın hava ulaşım merkezi konumundadır. Verimli tarım arazileri, stratejik konumu ve gelişen altyapısıyla hem tarım hem de gayrimenkul yatırımları için cazip bir ilçedir.",
    ozellikler: {
      havalimanMesafe: "5 km",
      yuzolcumu: "622 km²",
    },
    seoBasliklar: [
      "Dalaman'da Satılık Arsa Fiyatları",
      "Dalaman Havalimanı Çevresi Emlak",
      "Dalaman'da Tarım Arazisi Yatırımı",
      "Dalaman Konut Projeleri 2026",
      "Dalaman'da Yaşam ve Ulaşım",
    ],
    sss: [
      { soru: "Dalaman'da arsa yatırımı mantıklı mı?", cevap: "Havalimanına yakınlığı ve gelişen altyapısıyla Dalaman arsa yatırımı için potansiyel taşımaktadır." },
      { soru: "Dalaman merkezde ev fiyatları ne kadar?", cevap: "Dalaman merkezde daire fiyatları 1.5 milyon TL'den başlamaktadır." },
      { soru: "Dalaman'dan Fethiye ne kadar uzak?", cevap: "Dalaman'dan Fethiye'ye karayoluyla yaklaşık 45 km, 40 dakika mesafededir." },
    ],
  },
  {
    slug: "fethiye",
    ad: "Fethiye",
    il: "Muğla",
    nufus: "180.000",
    koordinatlar: { lat: 36.6220, lng: 29.1160 },
    kapakGorsel: "https://images.unsplash.com/photo-1573790387438-4da905039392?w=1200&h=630&fit=crop&q=80",
    galeriGorseller: [
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800&h=600&fit=crop&q=80",
    ],
    metaDescription: "Fethiye emlak rehberi: Ölüdeniz, Göcek, Çalış mevkileri. Villa, daire ve arsa fiyatları. Fethiye'de yatırım ve yaşam 2026.",
    kisaTanitim: "Fethiye, Türkiye'nin en gözde turizm ve yaşam merkezlerinden biridir. Ölüdeniz'in turkuaz suları, Göcek'in lüks marinaları ve tarihi Kayaköy ile hem yerli hem yabancı yatırımcıların gözdesidir.",
    ozellikler: {
      havalimanMesafe: "45 km (Dalaman)",
      sahpiUzunlugu: "200+ km kıyı",
    },
    seoBasliklar: [
      "Fethiye'de Satılık Villa Fiyatları 2026",
      "Ölüdeniz Emlak Yatırımı",
      "Fethiye Çalış Bölgesi Konut",
      "Göcek'te Lüks Mülk Fırsatları",
      "Fethiye'de Yabancıya Satılık Ev",
    ],
    sss: [
      { soru: "Fethiye'de villa fiyatları ne kadar?", cevap: "Fethiye'de villa fiyatları konuma göre 5 milyon TL'den 50 milyon TL'ye kadar değişmektedir." },
      { soru: "Fethiye'nin en değerli bölgesi neresi?", cevap: "Göcek, Ölüdeniz ve Ovacık bölgeleri Fethiye'nin en değerli emlak bölgeleridir." },
      { soru: "Fethiye'de yabancı mülk alımı kolay mı?", cevap: "Evet, Fethiye yabancı mülk alımında Türkiye'nin en aktif bölgelerinden biridir." },
    ],
  },
  {
    slug: "marmaris",
    ad: "Marmaris",
    il: "Muğla",
    nufus: "95.000",
    koordinatlar: { lat: 36.8510, lng: 28.2741 },
    kapakGorsel: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&h=630&fit=crop&q=80",
    galeriGorseller: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop&q=80",
    ],
    metaDescription: "Marmaris emlak piyasası: İçmeler, Armutalan, Siteler bölgeleri. Deniz manzaralı daire ve villa fiyatları. Marmaris yatırım 2026.",
    kisaTanitim: "Marmaris, muhteşem koyu ve canlı gece hayatıyla Ege'nin incisi olarak anılır. Yat turizmi, uluslararası ziyaretçiler ve gelişmiş altyapısıyla gayrimenkul yatırımı için güçlü bir pazar sunmaktadır.",
    ozellikler: {
      havalimanMesafe: "90 km (Dalaman)",
      sahpiUzunlugu: "10 km koy",
    },
    seoBasliklar: [
      "Marmaris'te Satılık Daire Fiyatları",
      "Marmaris Deniz Manzaralı Konut",
      "İçmeler'de Emlak Yatırımı",
      "Marmaris Marina Bölgesi Mülkleri",
      "Marmaris'te Kiralık Tatil Evi",
    ],
    sss: [
      { soru: "Marmaris'te daire fiyatları ne kadar?", cevap: "Marmaris'te deniz manzaralı daireler 3 milyon TL'den başlamaktadır." },
      { soru: "Marmaris'in en iyi semti hangisi?", cevap: "İçmeler sakin yapısıyla, Siteler merkezi konumuyla öne çıkmaktadır." },
      { soru: "Marmaris'te kira getirisi nasıl?", cevap: "Turistik bölge olması nedeniyle yazlık kiralamalarda yüksek getiri potansiyeli vardır." },
    ],
  },
  {
    slug: "bodrum",
    ad: "Bodrum",
    il: "Muğla",
    nufus: "180.000",
    koordinatlar: { lat: 37.0343, lng: 27.4305 },
    kapakGorsel: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&h=630&fit=crop&q=80",
    galeriGorseller: [
      "https://images.unsplash.com/photo-1568322503652-c2467e71e335?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80",
    ],
    metaDescription: "Bodrum lüks emlak piyasası: Yalıkavak, Türkbükü, Gümüşlük. Villa, rezidans ve yat limanı mülkleri. Bodrum yatırım rehberi 2026.",
    kisaTanitim: "Bodrum, Türkiye'nin en prestijli ve lüks gayrimenkul pazarıdır. Beyaz badanalı evleri, dünyaca ünlü gece hayatı ve marinalarıyla hem yerli hem uluslararası jet-set'in gözdesidir.",
    ozellikler: {
      havalimanMesafe: "35 km (Milas-Bodrum)",
      sahpiUzunlugu: "174 km kıyı",
    },
    seoBasliklar: [
      "Bodrum'da Satılık Lüks Villa",
      "Yalıkavak Marina Emlak Fiyatları",
      "Bodrum Türkbükü Konut Yatırımı",
      "Bodrum'da Denize Sıfır Mülk",
      "Bodrum Gayrimenkul Trendleri 2026",
    ],
    sss: [
      { soru: "Bodrum'da villa fiyatları ne kadar?", cevap: "Bodrum'da villa fiyatları 10 milyon TL'den başlayıp 200 milyon TL'yi aşabilmektedir." },
      { soru: "Bodrum'un en pahalı bölgesi neresi?", cevap: "Yalıkavak, Türkbükü ve Gündoğan Bodrum'un en değerli bölgeleridir." },
      { soru: "Bodrum'da yatırım yapılır mı?", cevap: "Bodrum, Türkiye'de en yüksek değer artışı gösteren emlak pazarlarından biridir." },
    ],
  },
  {
    slug: "milas",
    ad: "Milas",
    il: "Muğla",
    nufus: "140.000",
    koordinatlar: { lat: 37.3167, lng: 27.7833 },
    kapakGorsel: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop&q=80",
    galeriGorseller: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
    ],
    metaDescription: "Milas emlak rehberi: Havalimanı bölgesi, Güllük sahili, tarihi merkez. Uygun fiyatlı arsa ve konut yatırımı. Milas fiyatları 2026.",
    kisaTanitim: "Milas, Bodrum-Milas Havalimanı'na ev sahipliği yapan, tarihi dokusu ve uygun fiyatlarıyla öne çıkan bir ilçedir. Güllük sahil bölgesi ve verimli zeytin bahçeleriyle yatırımcılara çeşitli fırsatlar sunmaktadır.",
    ozellikler: {
      havalimanMesafe: "15 km (Milas-Bodrum)",
      yuzolcumu: "2.167 km²",
    },
    seoBasliklar: [
      "Milas'ta Satılık Arsa Fiyatları",
      "Güllük Sahil Emlak Yatırımı",
      "Milas Merkez Konut Fiyatları",
      "Milas'ta Tarım Arazisi",
      "Milas Bafa Gölü Çevresi Mülkler",
    ],
    sss: [
      { soru: "Milas'ta arsa fiyatları uygun mu?", cevap: "Evet, Milas Bodrum'a göre çok daha uygun fiyatlarla arsa yatırımı imkanı sunmaktadır." },
      { soru: "Güllük'te ev fiyatları ne kadar?", cevap: "Güllük'te denize yakın daireler 2 milyon TL'den başlamaktadır." },
      { soru: "Milas havalimanına yakın mı?", cevap: "Evet, Milas-Bodrum Havalimanı Milas merkezine sadece 15 km mesafededir." },
    ],
  },
  {
    slug: "mentese",
    ad: "Menteşe",
    il: "Muğla",
    nufus: "110.000",
    koordinatlar: { lat: 37.2153, lng: 28.3636 },
    kapakGorsel: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop&q=80",
    galeriGorseller: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop&q=80",
    ],
    metaDescription: "Menteşe (Muğla Merkez) emlak rehberi: Üniversite çevresi, şehir merkezi konut ve arsa fiyatları. Menteşe'de yaşam 2026.",
    kisaTanitim: "Menteşe, Muğla'nın merkez ilçesi ve idari kalbidir. Muğla Sıtkı Koçman Üniversitesi'ne ev sahipliği yapması, şehir merkezine stabil bir konut talebi ve yatırım potansiyeli kazandırmaktadır.",
    ozellikler: {
      havalimanMesafe: "60 km (Dalaman)",
      rakım: "660 m",
    },
    seoBasliklar: [
      "Menteşe'de Satılık Daire Fiyatları",
      "Muğla Merkez Konut Yatırımı",
      "Menteşe Üniversite Çevresi Emlak",
      "Menteşe'de Kiralık Ev",
      "Muğla Şehir Merkezi Arsa",
    ],
    sss: [
      { soru: "Menteşe'de daire fiyatları ne kadar?", cevap: "Menteşe'de daire fiyatları 1.5 milyon TL'den başlamaktadır." },
      { soru: "Menteşe'de öğrenci kirası ne kadar?", cevap: "Üniversiteye yakın bölgelerde 1+1 daire kiraları 8.000-15.000 TL arasındadır." },
      { soru: "Menteşe yatırım için uygun mu?", cevap: "Üniversite varlığı kira garantisi sağladığından Menteşe stabil bir yatırım bölgesidir." },
    ],
  },
  {
    slug: "datca",
    ad: "Datça",
    il: "Muğla",
    nufus: "22.000",
    koordinatlar: { lat: 36.7300, lng: 27.6867 },
    kapakGorsel: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop&q=80",
    galeriGorseller: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=600&fit=crop&q=80",
    ],
    metaDescription: "Datça yarımadası emlak rehberi: Palamutbükü, Knidos, badem bahçeleri. Sakin yaşam arayanlar için villa ve arsa fırsatları 2026.",
    kisaTanitim: "Datça, Ege ile Akdeniz'in buluştuğu benzersiz yarımadada, sakin yaşam arayanların cenneti olarak bilinir. Antik Knidos kalıntıları, badem çiçekleri ve el değmemiş koylarıyla butik turizm ve doğal yaşam odaklı bir ilçedir.",
    ozellikler: {
      havalimanMesafe: "150 km (Dalaman)",
      sahpiUzunlugu: "52 km yarımada",
    },
    seoBasliklar: [
      "Datça'da Satılık Taş Ev",
      "Datça Yarımadası Arsa Yatırımı",
      "Datça'da Doğal Yaşam",
      "Datça Emlak Fiyatları 2026",
      "Datça'da Tatil Evi Yatırımı",
    ],
    sss: [
      { soru: "Datça'da taş ev fiyatları ne kadar?", cevap: "Datça'da restore edilmiş taş evler 3-10 milyon TL arasında değişmektedir." },
      { soru: "Datça'ya ulaşım nasıl?", cevap: "Marmaris'ten feribot veya karayoluyla, Dalaman'dan 2.5 saat araçla ulaşılır." },
      { soru: "Datça'da kış yaşanır mı?", cevap: "Datça ılıman iklimi sayesinde yıl boyu yaşanabilir bir yerleşim yeridir." },
    ],
  },
  {
    slug: "ula",
    ad: "Ula",
    il: "Muğla",
    nufus: "25.000",
    koordinatlar: { lat: 37.1000, lng: 28.4167 },
    kapakGorsel: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=630&fit=crop&q=80",
    galeriGorseller: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&q=80",
    ],
    metaDescription: "Ula ilçesi emlak rehberi: Akyaka (Gökova), Gökova Körfezi manzarası. Doğa içinde yaşam ve uygun arsa fiyatları 2026.",
    kisaTanitim: "Ula, ünlü Akyaka beldesine ev sahipliği yapan, Gökova Körfezi'nin muhteşem manzarasına sahip yeşil bir ilçedir. Cittaslow (Sakin Şehir) unvanlı Akyaka ile doğa sporları ve ekoturizmin merkezidir.",
    ozellikler: {
      havalimanMesafe: "70 km (Dalaman)",
      yuzolcumu: "482 km²",
    },
    seoBasliklar: [
      "Akyaka'da Satılık Ev Fiyatları",
      "Ula Gökova Manzaralı Arsa",
      "Akyaka Cittaslow Yaşamı",
      "Ula'da Doğa İçinde Mülk",
      "Gökova Körfezi Emlak Yatırımı",
    ],
    sss: [
      { soru: "Akyaka'da ev fiyatları ne kadar?", cevap: "Akyaka'da ev fiyatları 3 milyon TL'den başlayıp 15 milyon TL'ye ulaşabilmektedir." },
      { soru: "Akyaka'da inşaat yapılabilir mi?", cevap: "Akyaka'da mimari koruma kuralları nedeniyle geleneksel tarzda yapılaşma zorunludur." },
      { soru: "Ula'dan Muğla merkeze ne kadar?", cevap: "Ula, Muğla Menteşe'ye sadece 12 km mesafededir." },
    ],
  },
  {
    slug: "yatagan",
    ad: "Yatağan",
    il: "Muğla",
    nufus: "45.000",
    koordinatlar: { lat: 37.3392, lng: 28.1358 },
    kapakGorsel: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=630&fit=crop&q=80",
    galeriGorseller: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
    ],
    metaDescription: "Yatağan emlak rehberi: Termik santral bölgesi, uygun arsa fiyatları, Stratonikeia antik kenti. Yatağan yatırım potansiyeli 2026.",
    kisaTanitim: "Yatağan, termik santralleri ve madencilik sektörüyle Muğla'nın sanayi ilçesidir. Antik Stratonikeia kalıntıları ve uygun emlak fiyatlarıyla dikkat çeken ilçe, sanayi çalışanları için konut imkanı sunmaktadır.",
    ozellikler: {
      havalimanMesafe: "70 km (Milas-Bodrum)",
      yuzolcumu: "805 km²",
    },
    seoBasliklar: [
      "Yatağan'da Satılık Ev ve Arsa",
      "Yatağan Emlak Fiyatları 2026",
      "Yatağan'da Uygun Konut",
      "Yatağan Sanayi Bölgesi Çevresi",
      "Stratonikeia Antik Kent Çevresi Mülk",
    ],
    sss: [
      { soru: "Yatağan'da konut fiyatları uygun mu?", cevap: "Evet, Yatağan Muğla'nın en uygun fiyatlı konut piyasalarından birine sahiptir." },
      { soru: "Yatağan'da iş imkanı var mı?", cevap: "Termik santral ve madencilik sektörü önemli istihdam kaynağıdır." },
      { soru: "Yatağan'dan Bodrum'a ne kadar?", cevap: "Yatağan'dan Bodrum'a karayoluyla yaklaşık 70 km, 1 saat mesafededir." },
    ],
  },
  {
    slug: "kavaklidere",
    ad: "Kavaklıdere",
    il: "Muğla",
    nufus: "12.000",
    koordinatlar: { lat: 37.4333, lng: 28.3500 },
    kapakGorsel: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=630&fit=crop&q=80",
    galeriGorseller: [
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80",
    ],
    metaDescription: "Kavaklıdere ilçe rehberi: Orman köyleri, doğal yaşam, uygun arazi fiyatları. Muğla'nın saklı cenneti Kavaklıdere 2026.",
    kisaTanitim: "Kavaklıdere, Muğla'nın kuzeyinde, çam ormanları ve yaylaları ile doğal güzelliklere sahip sakin bir ilçedir. Şehir gürültüsünden uzak, kırsal yaşam arayanlar için ekonomik arazi seçenekleri sunmaktadır.",
    ozellikler: {
      havalimanMesafe: "100 km (Dalaman)",
      rakım: "850 m",
    },
    seoBasliklar: [
      "Kavaklıdere'de Satılık Arazi",
      "Kavaklıdere Köy Evi Fiyatları",
      "Kavaklıdere Doğal Yaşam",
      "Kavaklıdere Orman Arazisi",
      "Muğla Kavaklıdere Emlak",
    ],
    sss: [
      { soru: "Kavaklıdere'de arazi fiyatları ne kadar?", cevap: "Kavaklıdere'de tarım arazileri oldukça uygun fiyatlarla satılmaktadır." },
      { soru: "Kavaklıdere'de yaşam nasıl?", cevap: "Kırsal ve sakin bir yaşam sunan Kavaklıdere, doğa severlerin tercih ettiği bir ilçedir." },
      { soru: "Kavaklıdere'den Muğla'ya ne kadar?", cevap: "Kavaklıdere, Muğla Menteşe'ye 45 km mesafededir." },
    ],
  },
  {
    slug: "seydikemer",
    ad: "Seydikemer",
    il: "Muğla",
    nufus: "70.000",
    koordinatlar: { lat: 36.6333, lng: 29.3500 },
    kapakGorsel: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&h=630&fit=crop&q=80",
    galeriGorseller: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&h=600&fit=crop&q=80",
    ],
    metaDescription: "Seydikemer emlak rehberi: Saklıkent Kanyonu, Eşen Ovası tarım arazileri. Fethiye'ye komşu uygun fiyatlı yatırım fırsatları 2026.",
    kisaTanitim: "Seydikemer, Fethiye'nin hemen yanında, Saklıkent Kanyonu ve verimli Eşen Ovası ile tarım ve doğa turizmine ev sahipliği yapan bir ilçedir. Fethiye'ye alternatif uygun fiyatlı emlak seçenekleri sunmaktadır.",
    ozellikler: {
      havalimanMesafe: "55 km (Dalaman)",
      yuzolcumu: "1.161 km²",
    },
    seoBasliklar: [
      "Seydikemer'de Satılık Arsa",
      "Seydikemer Tarım Arazisi Yatırımı",
      "Saklıkent Çevresi Emlak",
      "Seydikemer Konut Fiyatları 2026",
      "Fethiye Alternatifi Seydikemer",
    ],
    sss: [
      { soru: "Seydikemer'de arsa fiyatları ne kadar?", cevap: "Seydikemer'de imarlı arsalar Fethiye'ye göre %40-50 daha uygun fiyatlıdır." },
      { soru: "Seydikemer'den Fethiye'ye ne kadar?", cevap: "Seydikemer merkez, Fethiye'ye yaklaşık 25 km mesafededir." },
      { soru: "Saklıkent Kanyonu'na yakın mülk var mı?", cevap: "Evet, kanyon çevresinde turistik yatırıma uygun araziler mevcuttur." },
    ],
  },
];

// Helper fonksiyonlar
export function getIlceBySlug(slug: string): IlceRehber | undefined {
  return ilceRehberleri.find((ilce) => ilce.slug === slug);
}

export function getAllIlceSlugs(): string[] {
  return ilceRehberleri.map((ilce) => ilce.slug);
}
