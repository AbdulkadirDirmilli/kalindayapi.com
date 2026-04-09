export interface GoogleReview {
  id: number;
  isim: string;
  konum: string;
  yorum: string;
  puan: number;
  tarih: string;
  yapilanIs: "Emlak" | "Tadilat" | "İnşaat" | "Danışmanlık";
}

export const googleReviews: GoogleReview[] = [
  // Emlak Yorumları
  {
    id: 1,
    isim: "Ahmet Yılmaz",
    konum: "Ortaca",
    yorum: "Hayalimdeki evi bulmamda çok yardımcı oldular. Arif Bey'in sabrı ve ilgisi için teşekkürler. İlk görüşmeden anahtarı teslim alana kadar her şey çok profesyoneldi.",
    puan: 5,
    tarih: "1 hafta önce",
    yapilanIs: "Emlak"
  },
  {
    id: 2,
    isim: "Fatma Kaya",
    konum: "Dalyan",
    yorum: "Dalyan'da villa arıyordum, tam istediğim gibi bir yer buldular. Fiyat pazarlığında da çok yardımcı oldular. Kesinlikle tavsiye ederim!",
    puan: 5,
    tarih: "2 hafta önce",
    yapilanIs: "Emlak"
  },
  {
    id: 3,
    isim: "Mehmet Demir",
    konum: "Köyceğiz",
    yorum: "Dairemi satmak için başvurdum. 3 hafta içinde alıcı buldular. Tapu işlemlerinde de yanımdaydılar. Hızlı ve güvenilir hizmet.",
    puan: 5,
    tarih: "3 hafta önce",
    yapilanIs: "Emlak"
  },
  {
    id: 4,
    isim: "Ayşe Çelik",
    konum: "Ortaca",
    yorum: "Yatırım amaçlı arsa bakıyordum. Zafer Bey bölgeyi çok iyi tanıyor, imar durumunu detaylıca anlattı. Güvenle çalışabilirsiniz.",
    puan: 5,
    tarih: "1 ay önce",
    yapilanIs: "Emlak"
  },
  {
    id: 5,
    isim: "Ali Öztürk",
    konum: "Dalaman",
    yorum: "Kiralık daire arayışımda hemen uygun seçenekler sundular. Ev sahibiyle iletişimi de sağladılar. Sorunsuz bir süreç oldu.",
    puan: 5,
    tarih: "1 ay önce",
    yapilanIs: "Emlak"
  },
  {
    id: 6,
    isim: "Zeynep Aksoy",
    konum: "Fethiye",
    yorum: "İstanbul'dan taşınacaktık, uzaktan ev aramak zordu. Video görüşmeyle evleri gezdirdiler, çok pratik oldu. Teşekkürler Kalinda Yapı!",
    puan: 5,
    tarih: "1 ay önce",
    yapilanIs: "Emlak"
  },
  {
    id: 7,
    isim: "Mustafa Şahin",
    konum: "Ortaca",
    yorum: "Babamdan kalan tarla için değerleme yaptırdık. Piyasa fiyatını doğru belirlediler, hızlıca sattık. Dürüst ve şeffaf çalışıyorlar.",
    puan: 5,
    tarih: "2 ay önce",
    yapilanIs: "Emlak"
  },
  {
    id: 8,
    isim: "Elif Yıldırım",
    konum: "Dalyan",
    yorum: "Yazlık ev alacaktık, Dalyan'ı hiç bilmiyorduk. Arif Bey bölgeyi gezdirdi, avantaj dezavantajları anlattı. Sonunda harika bir ev bulduk!",
    puan: 5,
    tarih: "2 ay önce",
    yapilanIs: "Emlak"
  },
  {
    id: 9,
    isim: "Hasan Korkmaz",
    konum: "Köyceğiz",
    yorum: "Göl manzaralı ev hayalimdi. Kalinda Yapı sayesinde gerçek oldu. Komisyon oranı da makul, gizli masraf yok.",
    puan: 5,
    tarih: "2 ay önce",
    yapilanIs: "Emlak"
  },
  {
    id: 10,
    isim: "Seda Arslan",
    konum: "Marmaris",
    yorum: "Marmaris'ten Ortaca'ya taşındık. Hem eski evimizi sattılar hem yeni ev buldular. Tek elden halletmek çok rahattı.",
    puan: 5,
    tarih: "3 ay önce",
    yapilanIs: "Emlak"
  },
  {
    id: 11,
    isim: "Kemal Aydın",
    konum: "Ortaca",
    yorum: "Ticari işyeri arıyordum. İhtiyaçlarımı dinlediler, uygun lokasyonda bir dükkan buldular. İş ortağı gibi çalıştılar.",
    puan: 5,
    tarih: "3 ay önce",
    yapilanIs: "Emlak"
  },
  {
    id: 12,
    isim: "Derya Özkan",
    konum: "Dalyan",
    yorum: "Almanya'dan döndük, Dalyan'a yerleşmek istedik. Tüm süreci uzaktan yönettiler. Güvenilir bir ekip, gözü kapalı çalışılır.",
    puan: 5,
    tarih: "3 ay önce",
    yapilanIs: "Emlak"
  },

  // Tadilat Yorumları
  {
    id: 13,
    isim: "Serkan Başaran",
    konum: "Ortaca",
    yorum: "Mutfak tadilatımızı yaptırdık. Modern ve kullanışlı bir mutfak oldu. İşçilik çok temiz, süre de söyledikleri gibi oldu.",
    puan: 5,
    tarih: "1 hafta önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 14,
    isim: "Gülşen Erdoğan",
    konum: "Dalyan",
    yorum: "Banyo yenilememizi Kalinda Yapı yaptı. Eski dökük banyomuz şimdi otel gibi oldu! Malzeme kalitesi ve işçilik mükemmel.",
    puan: 5,
    tarih: "2 hafta önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 15,
    isim: "Oğuz Kılıç",
    konum: "Ortaca",
    yorum: "Eski evimizi komple yeniledik. Elektrik, sıhhi tesisat, boyadan her şeyi üstlendiler. Ev yeni gibi oldu, çok memnunuz.",
    puan: 5,
    tarih: "3 hafta önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 16,
    isim: "Pınar Güneş",
    konum: "Köyceğiz",
    yorum: "Dış cephe boyası ve mantolama yaptırdık. Hem ısı yalıtımı hem görünüm açısından ev bambaşka oldu. Faturalara da yansıdı!",
    puan: 5,
    tarih: "1 ay önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 17,
    isim: "Emre Çetin",
    konum: "Ortaca",
    yorum: "Balkon kapatma ve cam balkon yaptırdık. Temiz iş çıkardılar, söyledikleri fiyatın dışına çıkmadılar. Teşekkürler.",
    puan: 5,
    tarih: "1 ay önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 18,
    isim: "Nurcan Yılmaz",
    konum: "Dalyan",
    yorum: "Kiracı çıktıktan sonra evi baştan sona yeniledik. Boya, parke, tadilat... Her şeyi çok hızlı ve kaliteli yaptılar.",
    puan: 5,
    tarih: "1 ay önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 19,
    isim: "Burak Demirtaş",
    konum: "Ortaca",
    yorum: "Çatı izolasyonu ve onarımı yaptırdık. Artık kış aylarında su sızmıyor. 5 yıl garanti verdiler, güvence sağladı.",
    puan: 5,
    tarih: "2 ay önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 20,
    isim: "Merve Aktaş",
    konum: "Dalaman",
    yorum: "Dükkan tadilatımızı yaptılar. Müşterilerimiz yeni tasarımı çok beğendi. İş kaybım da olmadı, akşam mesaisinde çalıştılar.",
    puan: 5,
    tarih: "2 ay önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 21,
    isim: "Selim Özer",
    konum: "Ortaca",
    yorum: "Alçı ve boya işleri yaptırdık. Detaylara önem veriyorlar, köşe bucak temizlediler. Eşim çok memnun kaldı.",
    puan: 5,
    tarih: "2 ay önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 22,
    isim: "Canan Koç",
    konum: "Köyceğiz",
    yorum: "Seramik ve fayans döşemesi yaptırdık. Desenli fayansları hizalamak zor, ama çok düzgün geçtiler. Profesyonel iş!",
    puan: 5,
    tarih: "3 ay önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 23,
    isim: "Tuncay Sarı",
    konum: "Ortaca",
    yorum: "Apartman dış cephe boyası için anlaştık. Tüm kat maliklerini koordine ettiler, işi zamanında bitirdiler. Bina yenilendi.",
    puan: 5,
    tarih: "3 ay önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 24,
    isim: "Sibel Doğan",
    konum: "Dalyan",
    yorum: "Havuz çevresini yeniledik. Güvenli malzeme kullandılar, kaymaz zemin döşediler. Çocuklar için güvenli oldu.",
    puan: 5,
    tarih: "3 ay önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 25,
    isim: "Volkan Kaplan",
    konum: "Ortaca",
    yorum: "Kombi ve tesisat yenileme yaptırdık. Eski sistem çok sorun çıkarıyordu. Şimdi her şey düzgün çalışıyor, rahatız.",
    puan: 5,
    tarih: "4 ay önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 26,
    isim: "Deniz Acar",
    konum: "Fethiye",
    yorum: "Yazlık evimizi kış için hazırladılar. Yalıtım, pencere değişimi yaptık. Artık kışın da kullanabiliyoruz.",
    puan: 5,
    tarih: "4 ay önce",
    yapilanIs: "Tadilat"
  },

  // İnşaat Yorumları
  {
    id: 27,
    isim: "Halil Yavuz",
    konum: "Ortaca",
    yorum: "Arsama müstakil ev yaptırdım. Projeden teslimata kadar her aşamada bilgilendirdiler. Anahtar teslim çalıştık, çok memnunum.",
    puan: 5,
    tarih: "2 hafta önce",
    yapilanIs: "İnşaat"
  },
  {
    id: 28,
    isim: "Serap Özdemir",
    konum: "Dalyan",
    yorum: "Ek bina yaptırdık. Ruhsat işlerini de takip ettiler, hiçbir sorun yaşamadık. Temelinden çatısına kadar sağlam iş.",
    puan: 5,
    tarih: "1 ay önce",
    yapilanIs: "İnşaat"
  },
  {
    id: 29,
    isim: "Murat Kara",
    konum: "Ortaca",
    yorum: "Depo ve atölye binası yaptırdık. İş yerimize yakın, çok kullanışlı oldu. İşçilik kaliteli, bütçeyi de aşmadılar.",
    puan: 5,
    tarih: "1 ay önce",
    yapilanIs: "İnşaat"
  },
  {
    id: 30,
    isim: "Esra Tan",
    konum: "Köyceğiz",
    yorum: "Bahçeye bağ evi yaptırdık. Küçük ama her detayı düşünülmüş. Hafta sonları kaçamak yerimiz oldu, teşekkürler!",
    puan: 5,
    tarih: "2 ay önce",
    yapilanIs: "İnşaat"
  },
  {
    id: 31,
    isim: "Cem Tuncer",
    konum: "Ortaca",
    yorum: "İki katlı villa projemizi gerçekleştirdiler. Havuz, garaj, peyzaj dahil komple teslim aldık. Hayal ettiğimiz ev oldu.",
    puan: 5,
    tarih: "2 ay önce",
    yapilanIs: "İnşaat"
  },
  {
    id: 32,
    isim: "Hülya Ateş",
    konum: "Dalyan",
    yorum: "Eski yapıyı yıkıp yerine yeni ev yaptık. Yıkım, hafriyat, inşaat her şeyi üstlendiler. Tek muhatap olmak çok rahat.",
    puan: 5,
    tarih: "3 ay önce",
    yapilanIs: "İnşaat"
  },
  {
    id: 33,
    isim: "Bülent Aslan",
    konum: "Ortaca",
    yorum: "Çelik konstrüksiyon depo yaptırdık. Hızlı kurulum, dayanıklı malzeme. İhtiyacımızı tam karşıladı.",
    puan: 5,
    tarih: "3 ay önce",
    yapilanIs: "İnşaat"
  },
  {
    id: 34,
    isim: "Füsun Yıldız",
    konum: "Dalaman",
    yorum: "Prefabrik ev yaptırdık. Ekonomik ve hızlı çözüm arayanlar için ideal. Kaliteden de ödün verilmemiş.",
    puan: 5,
    tarih: "4 ay önce",
    yapilanIs: "İnşaat"
  },

  // Danışmanlık Yorumları
  {
    id: 35,
    isim: "Levent Polat",
    konum: "Ortaca",
    yorum: "Yatırım danışmanlığı aldık. Hangi bölgede ne tür gayrimenkul alınmalı, detaylıca anlattılar. Bilinçli yatırım yaptık.",
    puan: 5,
    tarih: "1 hafta önce",
    yapilanIs: "Danışmanlık"
  },
  {
    id: 36,
    isim: "Gamze Tekin",
    konum: "Dalyan",
    yorum: "Miras konusunda danışmanlık aldık. Kardeşlerle paylaşım, hisse satışı konularında yol gösterdiler. Çok yardımcı oldular.",
    puan: 5,
    tarih: "2 hafta önce",
    yapilanIs: "Danışmanlık"
  },
  {
    id: 37,
    isim: "Onur Başak",
    konum: "İstanbul",
    yorum: "Uzaktan ev almak istiyordum, güvenemiyordum. Kalinda Yapı tüm süreci şeffaf yürüttü. Artık Dalyan'da yazlığım var!",
    puan: 5,
    tarih: "1 ay önce",
    yapilanIs: "Danışmanlık"
  },
  {
    id: 38,
    isim: "Neslihan Güler",
    konum: "Köyceğiz",
    yorum: "Tarla alacaktık, imar durumu karmaşıktı. Belediye ile görüşmelerde yardımcı oldular, doğru kararı verdik.",
    puan: 5,
    tarih: "1 ay önce",
    yapilanIs: "Danışmanlık"
  },
  {
    id: 39,
    isim: "Tolga Erdem",
    konum: "Almanya",
    yorum: "Almanya'dan ev aldım. Vekalet, vergi, tapu işlemlerinde rehberlik ettiler. Yurtdışından işlem yapmak bu kadar kolay olabilirmiş.",
    puan: 5,
    tarih: "2 ay önce",
    yapilanIs: "Danışmanlık"
  },
  {
    id: 40,
    isim: "Burcu Seven",
    konum: "Ortaca",
    yorum: "Ev satışında fiyatlandırma konusunda tereddütteydik. Piyasa analizi yapıp gerçekçi fiyat belirlediler. Hızlıca sattık.",
    puan: 5,
    tarih: "2 ay önce",
    yapilanIs: "Danışmanlık"
  },

  // Karma Yorumlar (Farklı tonlarda)
  {
    id: 41,
    isim: "İsmail Ünal",
    konum: "Ortaca",
    yorum: "Önce ev aldık, sonra tadilat yaptırdık. İki hizmeti de aynı yerden almak avantajlı oldu. Koordinasyon mükemmeldi.",
    puan: 5,
    tarih: "3 hafta önce",
    yapilanIs: "Emlak"
  },
  {
    id: 42,
    isim: "Aslı Korur",
    konum: "Dalyan",
    yorum: "Annemin evini sattık, ona yakın yeni bir daire aldık. Duygusal bir süreçti, anlayışlı davrandılar. Minnettarım.",
    puan: 5,
    tarih: "1 ay önce",
    yapilanIs: "Emlak"
  },
  {
    id: 43,
    isim: "Kaan Yalçın",
    konum: "Ortaca",
    yorum: "İlk evimi aldım, heyecanlıydım. Her adımı sabırla anlattılar, sorularımı cevapladılar. İlk ev heyecanı güzel geçti!",
    puan: 5,
    tarih: "1 ay önce",
    yapilanIs: "Emlak"
  },
  {
    id: 44,
    isim: "Sevda Duman",
    konum: "Köyceğiz",
    yorum: "Boya badana yaptıracaktım, büyüttüler diye düşündüm ama haklılarmış. Altyapı sorunları varmış, hepsini çözdüler.",
    puan: 5,
    tarih: "2 ay önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 45,
    isim: "Erhan Koçak",
    konum: "Fethiye",
    yorum: "Acil tadilat gerekiyordu, hemen geldiler. Hafta sonu bile çalıştılar. Bu ilgiyi başka yerde görmedim.",
    puan: 5,
    tarih: "2 ay önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 46,
    isim: "Dilek Önen",
    konum: "Ortaca",
    yorum: "Komşuların tavsiyesiyle geldim. Beklentimin üzerinde hizmet aldım. Şimdi ben de herkese tavsiye ediyorum.",
    puan: 5,
    tarih: "3 ay önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 47,
    isim: "Yusuf Aras",
    konum: "Dalyan",
    yorum: "Tadilatta bazı değişiklikler istedim, esnek davrandılar. Müşteri memnuniyetini önemsiyorlar, belli.",
    puan: 5,
    tarih: "3 ay önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 48,
    isim: "Melek Şen",
    konum: "Ortaca",
    yorum: "Ufak bir işti, ilgilenmezler diye düşündüm. Aynı özeni gösterdiler. Büyük küçük demeden çalışıyorlar.",
    puan: 5,
    tarih: "4 ay önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 49,
    isim: "Barış Özcan",
    konum: "Dalaman",
    yorum: "İkinci kez çalışıyoruz. İlkinde emlak, şimdi tadilat. Kalite aynı, güven tam. Uzun vadeli iş ortağı bulduk.",
    puan: 5,
    tarih: "4 ay önce",
    yapilanIs: "Tadilat"
  },
  {
    id: 50,
    isim: "Aylin Kurt",
    konum: "Ortaca",
    yorum: "Kalinda Yapı ile tanışmam çok iyi oldu. Profesyonel, dürüst, işinin ehli bir ekip. Gönül rahatlığıyla çalıştık.",
    puan: 5,
    tarih: "5 ay önce",
    yapilanIs: "Emlak"
  }
];

// Rastgele n adet yorum seçen fonksiyon
export function getRandomReviews(count: number = 4): GoogleReview[] {
  const shuffled = [...googleReviews].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
