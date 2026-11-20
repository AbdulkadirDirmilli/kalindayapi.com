# Kalinda Yapı Emlak — Dönüşüm Çalışma Notları

> Son güncelleme: 19 Kasım 2026
> Durum: **`main`'e merge edildi ve canlıya alındı.** Palet/navbar çalışması,
> danışmanlar modülü ve video düzenlemesi yayında.

Bu dosya, siteyi "emlak odaklı + kurumsal" hale getirme çalışmasının durumunu
ve kaldığımız yeri kaydeder. Yeni oturumda önce bunu okuyun.

---

## 1. Müşteri kararları (onaylanmış)

| Konu | Karar |
|---|---|
| Ortaklar | Zafer Soylu ve Hikmet Karaoğlan sitede **yer almayacak** |
| Tek muhatap | **Arif DAĞDELEN** — `+90 532 159 15 56`, `arif@kalindayapi.com` |
| Faaliyet alanı | **Sadece emlak.** Tadilat / onarım / inşaat taahhüt işleri bırakıldı |
| Eski hizmet sayfaları | Silinmedi, emlak hizmetlerine **dönüştürüldü** + 301 yönlendirme |
| Blog yazıları | Tadilat konulu 4 yazı **kaldı**, sadece yazar adı değişti |
| Referanslar sayfası | Emlak işlem kategorilerine çevrildi |
| Ana sayfa | **Büyük banner yok.** İlan arama kutusu + ilan listesi önde |
| Renk paleti | Zemin/buton **açık mavi `#418FDE`**, başlık **`#0F2742`**, vurgu **altın `#C9A84C`** |
| Referans site | `muglaport.com.tr` (ana sayfa ve iletişim sayfası düzeni) |

---

## 2. Tamamlananlar

### Commit `71af4ea` — Emlak odaklı kurumsal dönüşüm
- Zafer Soylu / Hikmet Karaoğlan tüm sayfalardan, 5 dil sözlüğünden,
  JSON-LD'den ve blog yazarlarından kaldırıldı
- Eski telefonlar (`0537 053 07 54`, `0555 453 12 07`) → `0532 159 15 56` (26 dosya)
- Ekip bölümü tek danışman kartına indirildi
- Hizmetler yenilendi (aşağıdaki tabloya bakın), 4 dile çevrildi
- Öncesi/Sonrası galerisi ve tadilat referansları kaldırıldı
- Google yorumları emlak + danışmanlık ile sınırlandı (tadilat/inşaat yorumları
  `data/google-reviews.ts` içinde arşivde duruyor, `emlakReviews` ile filtreleniyor)

### Commit `908ad98` — Ana sayfa yeniden düzenlendi
- Tam ekran video hero kaldırıldı → `components/sections/HeroArama.tsx`
- Arama kutusu: Satılık/Kiralık, konum, tip, min-maks fiyat, hızlı fiyat aralığı
- Sıralama: Arama → İlanlar → Danışman → Hizmetler → Neden Biz → İstatistik →
  Blog → İletişim → SSS

### Commit'lenmedi — Palet uyarlaması + navbar (19 Kasım 2026)
57 dosya değişti, henüz commit edilmedi.

- **Palet muglaport.com.tr'den uyarlandı**, altın kaldırıldı (Bölüm 4'e bakın).
  211 Tailwind arbitrary value (`text-[#C9A84C]` gibi) semantik token'a taşındı;
  19 ham hex (e-posta şablonları, `manifest.json`, `themeColor`) eşlendi.
  Kaynakta eski palet hex'i **sıfır** kaldı.
- 55 `text-accent` kullanımı zemin bağlamına göre ayrıldı: açık zeminde
  `text-primary`, koyu lacivert zeminde `text-carolina`.
- `Button` accent varyantı ve `Badge` kiralik: `text-ink` → `text-white`
  (mavi dolguda mürekkep rengi okunmuyordu).
- Footer'a referanstaki **4 renkli üst şerit** eklendi
  (`accent / ocean / carolina / slate`, `grid-cols-[4fr_3fr_2fr_1fr]`).
- `HizmetKartlari` kart renkleri palete taşındı: lacivert, accent mavi,
  ocean-ink, slate.
- **Navbar referans düzene çevrildi** (`components/layout/Header.tsx`):
  `fixed` + şeffaf yerine **`sticky top-0`, daima beyaz, 64px (`h-16`)**,
  `max-w-[1320px]`. Linkler pill (`rounded-full`), aktif/hover durumu
  `bg-primary/[0.07] text-primary`. Sağda telefon (`tabular-nums`) +
  accent CTA. Scroll'da yalnızca alt kenarlık + hafif gölge belirir.
  **Hizmetler ve Kurumsal dropdown'ları korundu.**
- Header `sticky` olduğu için sayfa başlık bantlarındaki header boşluğu
  telafisi kaldırıldı: 19 dosyada `pt-32` → `pt-14` (ve `pt-40` → `pt-20`).
- `VisitorCounter` (footer) `text-gray-400/500` → `text-white/65`, `/55`.
- **Lacivert logo varyantları üretildi** (`logo-navy.svg`,
  `logo-wide-navy.svg`) ve beyaz zeminlerde kullanılmaya başlandı —
  Bölüm 4.1. Footer ve admin sidebar altın orijinalde kaldı.
- **Döviz bileşenleri menüden çıkarıldı** — Bölüm 4.2.
- **Koyu zemin kontrast onarımı** — Bölüm 4.3. Palet dönüşümünün yan etkisi
  olarak lacivert bantlarda okunmaz hale gelen 72 kullanım düzeltildi.
- **`cn` artık `twMerge(clsx(...))`** — Bölüm 4.4. `tailwind-merge@^3`
  bağımlılık olarak eklendi (`package.json` değişti).

### Commit `0481eb2` — Renk paleti + iletişim sayfası
- Koyu lacivert `#0B1F3A` sitede **sıfır** referans
- Yeni `ink` token'ı eklendi (başlıklar için); 116 `text-primary` kullanımı taşındı
- Renkli zeminlerdeki soluk gri metinler beyaz alfaya çevrildi (23 dosya)
- İletişim sayfasındaki video banner kaldırıldı, hızlı iletişim kartları eklendi

---

## 3. Yeni hizmet yapısı

| Slug | Başlık | İkon |
|---|---|---|
| `emlak-danismanligi` | Emlak Danışmanlığı | `Home` |
| `gayrimenkul-degerleme` | Gayrimenkul Değerleme | `Calculator` |
| `yatirim-danismanligi` | Yatırım Danışmanlığı | `TrendingUp` |
| `tapu-islemleri` | Tapu & Resmi İşlemler | `FileCheck` |

**Kaldırılan ve 301 ile `/hizmetler`'e yönlendirilenler** (`next.config.ts`):
`tadilat-dekorasyon`, `taahhut-insaat`, `plan-proje` — 5 dilin lokalize
slug'larıyla birlikte.

---

## 4. Renk paleti referansı

> **20 Kasım 2026'da mavi aile tamamen turkuaza çevrildi** — bkz. bölüm 4.9.
> Aşağıdaki tablo güncel paleti gösterir.
>
> Geçmiş: 19 Kasım 2026'da palet muglaport.com.tr'den birebir uyarlanmıştı
> (altın `#C9A84C` kaldırıldı, marka rengi koyu lacivert `#012169` olmuştu).
> Lacivert dönemin token değerleri bölüm 4.9'daki eşleme tablosunda.

`app/globals.css` → `@theme inline`

```
--color-primary        #00767C   KOYU TURKUAZ — marka; link, başlık vurgusu, koyu zemin
--color-primary-light  #00989F   hover
--color-primary-dark   #00494E   basılı / koyu varyant
--color-accent         #00B4BD   PARLAK TURKUAZ — yalnızca CTA butonu, ikon dolgusu
--color-accent-light   #4FD1D9
--color-accent-dark    #00888F
--color-ink            #2D2926   sıcak siyah — BAŞLIKLAR ve gövde metni
--color-ink-light      #4A443F
--color-surface        #EDF0F4   açık yüzey (referans: soft)
--color-surface-dark   #E3E6EB
--color-border         #E3E6EB   kenarlık (referans: line)
--color-border-strong  #C9CED6   (referans: line-strong)
--color-text-light     #5C5651   gövde ikincil metin
--color-text-muted     #8A857F   soluk metin

ikincil vurgular:
--color-ocean          #00B4BD   (artık accent ile aynı — dönüşümün yan etkisi)
--color-ocean-ink      #00767C   (artık primary ile aynı)
--color-slate          #4A9BA3   eski #5C86A0 mavi-gri idi
--color-carolina       #CFF2F7   koyu turkuaz zeminde metin/başlık rengi
                                 (turkuaz icin aciltildi, bkz. 4.9)
--color-cement         #E6DDD1

--color-success        #2F7D4F
--color-warning        #B7791F
--color-error          #C2412D
```

> `ocean` / `ocean-ink` dönüşümden sonra `accent` / `primary` ile birebir
> aynı değere düştü. Silinmedi çünkü kullanımda; ama **yeni kodda
> `primary`/`accent` tercih edin**, `ocean` ayrı bir renk sanılmasın.

`surface`, `border` ve `text-*` tonları hâlâ hafif **mavi-gri** (`#EDF0F4`,
`#E3E6EB`, `#C9CED6`). Bunlar marka mavisi değil nötr yüzey olduğu için
dönüşüme dahil edilmedi. Turkuazla birlikte soğuk durursa sıcak griye
(ör. `#F2F1EE`) çekilebilir — açık karar, bölüm 5.

## 4.1 Logo varyantları

Logo altın/amber gradyanlı; beyaz zeminde soluk kalıyordu. Palete uyumlu
koyu varyantlar üretildi (orijinaller silinmedi).

| Dosya | Renk | Nerede kullanılır |
|---|---|---|
| `public/logo.svg` | altın, kare | **Koyu zemin** — admin sidebar (`bg-primary`) |
| `public/logo-footer.svg` | altın, yatay | **Koyu zemin** — site footer |
| `public/logo-navy.svg` | **turkuaz, kare** | Beyaz zemin — navbar (mobil), admin giriş |
| `public/logo-wide-navy.svg` | **turkuaz, yatay** | Beyaz zemin — navbar (masaüstü) |

> ⚠️ **Dosya adları hâlâ `-navy`** ama içerikleri 20 Kasım 2026'da turkuaza
> boyandı. Yeniden adlandırma yapılmadı: `Header.tsx` ve admin giriş sayfası
> bu adlarla referans veriyor, ayrıca tarayıcı/CDN cache'i karışmasın diye.
> Adları düzeltmek isterseniz `components/layout/Header.tsx` (2 yer) ve
> `app/admin/(auth)/giris/page.tsx` (1 yer) güncellenmeli.

Üretim yöntemi: orijinaldeki her renk jetonu koyu karşılığına eşlendi.
Merkez parlaması (beyaz ve açık sarılar) → `primary-light`, gövde/kenar/kontur
(altın, amber, sarı, ten) → `primary`, gradyan ara tonları → rampa.
**Kontur genişlikleri ve yol verileri değiştirilmedi**, siluet orijinalle
birebir aynı. Turkuaz dönüşümünde aynı eşleme hex-değiştirme ile uygulandı:

```
#012169 → #00767C      #1B3C7E → #00989F
#16386F → #078C92      #10306C → #04868C
#0A2A6A → #028086      #072568 → #017B80
```

> Kural: **beyaz/açık zeminde turkuaz varyantı, koyu turkuaz zeminde altın
> orijinali** kullanın.

Not: JSON-LD'deki kurum logosu (`lib/jsonld.ts`, `lib/dovizJsonLd.ts`) hâlâ
altın `logo.svg`'yi gösteriyor — bilinçli bırakıldı, marka logosu o. Arama
sonuçlarında beyaz zeminde göründüğü için koyu varyanta çevrilmesi
tartışılabilir.

## 4.2 Döviz bileşenlerinin yeri

Navbar'da kur göstergesi + para birimi seçici + dil seçici + telefon + CTA
aynı anda duruyordu; şerit taşıyor, telefon ve CTA ikinci satıra düşüyordu.
İkisi menüden çıkarıldı — **ama aynı yere değil**, çünkü işlevleri farklı:

| Bileşen | Yeni yeri | Gerekçe |
|---|---|---|
| `ExchangeRateTicker` ($/€ kuru) | Ana sayfa, arama kutusunun altındaki hızlı erişim satırı (`HeroArama`) | Salt bilgi. İlk ekranda kalıyor, yeni bölüm gerekmiyor, `/doviz-kurlari`'na link |
| `CurrencySwitcher` (para birimi) | **Hem** aynı satır **hem** `/ilanlar` sonuç çubuğu (`IlanFiltresi`) | İşlevsel: `IlanKart` ve ilan detay fiyatları buna bağlı. Sadece ana sayfaya konsaydı `/ilanlar`'da para birimi değiştirilemezdi |
| `LanguageSwitcher` | Navbar'da kaldı | Her sayfada gerekli |

- `HeaderExchangeRate` → **`ExchangeRateTicker`** olarak yeniden adlandırıldı
  (artık header'da değil). `variant: 'inline' | 'badge'` ve `onDark` prop'ları var.
  Borsa tarzı animasyonlar (`animate-ticker-*`, `animate-symbol-flash`) inline
  varyantta kullanılmıyor — arama kutusunun altında dikkat dağıtıyordu.
  Animasyon tanımları `globals.css`'te duruyor, geri istenirse hazır.
- `CurrencySwitcher`'ın `isScrolled` prop'u **`onDark`** oldu (header dışında
  "scrolled" kavramı anlamsızdı).
- Telefon numarası navbar'da `xl:flex` olarak kaldı. 1024–1279px arasında
  logo + 7 menü + dil + CTA şeridi zaten dolduruyor; telefon ancak xl'den
  itibaren sığıyor. **Menü öğesi sayısı artarsa bu yeniden kontrol edilmeli.**

## 4.3 Koyu zemin kontrast onarımı (palet dönüşümünün yan etkisi)

**Sorun:** Palet dönüşümünde `text-[#C9A84C]` → `text-primary` eşlemesi
*özellik duyarlıydı ama zemin duyarlı değildi*. Altın, lacivert bant üzerinde
okunuyordu; lacivert okunmuyor. Sonuç: alt sayfaların `bg-primary` başlık
bantlarındaki breadcrumb, başlık vurgusu ve ikonlar görünmez oldu.
İletişim sayfasındaki "Ortaca ve **Çevresi**" başlığı bu şekilde fark edildi.

**Tespit yöntemi:** Render edilen HTML üzerinde etiket yığını tutup her
elemanın *en yakın* zemin bağlamını belirleyen bir denetim yazıldı
(lacivert bölüm içindeki beyaz kart tekrar açık bağlam yaratır). 15 sayfa
tarandı: **71 bulgu → 0** (kalan 3 bulgu yanlış pozitif, aşağıya bakın).

**Düzeltilenler:**
- Koyu zeminli bölümlerde **58** `text-primary` → `text-carolina` (18 dosya)
- Mavi `bg-accent` dolgu üzerinde **14** `text-ink` → `text-white` (11 dosya).
  Altın dolguda koyu metin okunuyordu, mavide okunmuyor.
- `components/CookieConsent.tsx` — banner `bg-primary`; ikon ve gizlilik
  linki görünmezdi. Kalan son altın hex (`#d4b65d`) da buradaydı.
- `app/[lang]/sss/page.tsx` — aktif kategori butonu `bg-primary text-white`
  iken ikon `text-primary` kalıyordu.

Denetim sonrası durum: **0 bulgu.**

## 4.4 `cn` artık tailwind-merge kullanıyor

**Sorun:** `lib/utils.ts` içindeki `cn` yalnızca `clsx`'ti. Çakışan sınıflar
(ör. `Button`'ın varyant rengi `text-ink` ile çağıranın verdiği `text-white`)
ikisi birden HTML'e basılıyordu; kazananı sınıf sırası değil, **üretilen
CSS'teki sıra** belirliyordu. Doğru görünmesi tesadüftü.

```ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- `tailwind-merge@^3.7.0` eklendi. **Sürüm önemli:** v2 Tailwind v3 içindir,
  proje Tailwind v4 kullanıyor → v3.x gerekli.
- Özel tema token'larımız (`text-ink`, `text-carolina`, `bg-primary`,
  `text-text-light` …) tailwind-merge'ün renk grubuna düşüyor; `text-sm` gibi
  boyut sınıflarıyla karışmıyor (`text-ink text-[15px]` ikisi de korunur).

**Dikkat — arbitrary value'larda tip ipucu şart.** tailwind-merge `bg-[...]`
içeriğinin türünü anlayamazsa **arka plan rengi** varsayar ve `bg-white`'ı
düşürür. `components/ui/Input.tsx` içindeki `Select` tam olarak bunu yaşadı:
`bg-[right_12px_center]` yüzünden select'in beyaz zemini siliniyordu. Düzeltme:

| Önce | Sonra |
|---|---|
| `bg-[url('data:image/svg+xml…')]` | `bg-[image:url('data:image/svg+xml…')]` |
| `bg-[right_12px_center]` | `bg-[position:right_12px_center]` |

> Yeni bir `bg-[...]` / `text-[...]` arbitrary değer yazarken **tip ipucunu
> (`image:`, `position:`, `length:`, `color:`) ekleyin**, yoksa twMerge yanlış
> sınıfı düşürebilir.

**Doğrulama:** `cn` geçici olarak `clsx`'e döndürülüp 8 sayfanın HTML'i
"önce/sonra" olarak yakalandı ve `class` nitelikleri karşılaştırıldı. Tek
davranış farkı referanslar sayfasındaki outline butonda `border-primary`,
`text-ink`, `hover:bg-primary` sınıflarının düşmesi; üçü de **zaten CSS
sırasına göre kaybediyordu**, yani görünüm aynı kaldı — sadece artık
deterministik. Bölüm 4.3 denetimindeki 3 yanlış pozitif de kendiliğinden
kayboldu (ölü sınıflar artık HTML'e basılmıyor).

### Kritik kural
> **Açık zeminde metin için `text-accent` KULLANMAYIN — `text-primary`
> (lacivert) veya `text-ink` kullanın.** `accent` açık mavi; beyaz üzerinde
> küçük metinde kontrastı yetersiz. Accent **yalnızca dolgu/zemin** içindir
> (`bg-accent` + `text-white`).
>
> **Koyu lacivert (`bg-primary`) zeminde** başlık/vurgu `text-carolina`,
> gövde `text-white/85` veya `text-white/65` olmalı.
> `text-gray-300/400/500` renkli zeminde **kullanılmamalı**.

---


## 4.5 Danışmanlar modülü (19 Kasım 2026)

Danışman verisi **üç ayrı yerde sabit koddaydı**; hepsi veritabanına bağlandı.
Artık admin panelinden eklenen her danışman otomatik olarak şurada görünür:
danışmanlar sayfası, ana sayfa danışman bölümü, hizmet detay sayfaları,
iletişim sayfası ve sağ kenar çubuğu.

| Parça | Yer |
|---|---|
| Public sayfa | `app/[lang]/danismanlar/page.tsx` (5 dil) |
| Public API | `app/api/danismanlar/route.ts` (yalnızca `aktif`, aktif ilan sayısıyla) |
| Sunucu yardımcısı | `lib/danismanlar.ts` — `getDanismanlar()`, `getAnaDanisman()` |
| Metinler | `data/danismanlar-i18n.ts` |
| Admin | `app/admin/(dashboard)/ortaklar/page.tsx` — tek formda ekleme + düzenleme |

**Şema eklemeleri** (`Ortak`): `cinsiyet`, `deneyimYili`, `bolgeler` (JSON dizi
string). `Ilan` modeline `@@index([danismanId])`.
Migration: `20261119181338_danisman_alanlari_ve_ilan_index`.

> **Dikkat — deploy akışında migration adımı YOK.** Şema değişikliği yapılırsa
> sunucudaki `prisma/dev.db`'ye elle uygulanmalı. Ayrıca production
> veritabanında `_prisma_migrations` tablosu **hiç yok** (DB `db push`/seed ile
> kurulmuş), bu yüzden `prisma migrate deploy` orada çalışmaz; SQL doğrudan
> uygulanır.

**Admin formunda eklenenler:** fotoğraf yükleme (önceden foto için hiçbir girdi
yoktu), whatsapp, cinsiyet, deneyim yılı, bölgeler, uzmanlık alanları, sıra,
aktif. Yeni paylaşılan bileşen: `components/admin/ui/ImageUploader.tsx`.
`/api/upload` artık `folder` parametresi alıyor (`ilanlar` | `danismanlar`).

**Güvenlik düzeltmeleri:** `/api/admin/ortaklar` gövdeyi doğrudan Prisma'ya
spread ediyordu → `lib/validations/ortak.ts` ile Zod doğrulaması eklendi.
DELETE, bağlı ilan varken FK ihlaliyle 500 dönüyordu → artık önce ilanların
`danismanId` alanı boşaltılıyor.

**Rota:** `danismanlar` hem `lib/i18n/config.ts` hem `proxy.ts`'e eklendi.
Bu iki dosya birbirinin kopyası; **yalnızca birine eklenirse `/en/consultants`
404 verir.**

**Menüdeki yeri:** üst seviyede, İlanlar'dan hemen sonra (+ footer Hızlı
Linkler). Canlıda ölçüldü: 1100px'te menüye 673px yer var, 8 öğe 586px tutuyor.
1024px'e inildiğinde pay ~10px'e düşüyor, yani sığıyor ama dar. Bu yüzden lg
bandında şerit biraz sıkılaştırıldı — pill dolgusu `px-2`, yazı `text-sm`,
öğe aralığı `gap-0`, logo `lg:w-40`; **xl'den itibaren hepsi eski değerine
döner**. Menüye yeni bir üst seviye öğe eklenecekse bu pay yeniden ölçülmeli.

## 4.6 Avatar ve Arif Bey'in fotoğrafı

`components/ui/DanismanAvatar.tsx`: fotoğraf varsa onu, yoksa **cinsiyete göre
ikon** gösterir — erkek `accent` mavisi, kadın `--color-feminine` (`#D6608F`,
globals.css'e eklendi). Projede yedi yerde elle tekrarlanan
`rounded-full + Image` kalıbının yerini aldı.

Arif Bey'in fotoğrafı istek üzerine kaldırıldı; kaydında `cinsiyet: erkek`
olduğu için mavi ikon görünüyor. Silinen dosyalar: `arifdagdelen.png`,
`zafersoylu.png`, `hikmetkaraoglan.svg`.

**Veri:** Zafer SOYLU ve Hikmet KARAOĞLAN kayıtları silindi. Siteden
çıkarılmışlardı ama veritabanında `aktif` duruyorlardı; danışmanlar sayfası
DB'den beslendiği için aksi halde yeniden görünürlerdi.

## 4.7 Video politikası

Fotoğraflar yüklemede optimize ediliyordu, **videolar hiç işlenmiyordu**.
İki yol birden kuruldu:

1. **Bağlantı (tercih edilen).** `Ilan.videoUrl` şemada vardı ama yalnızca
   yüklenen dosyadan türetiliyordu. İlan formuna YouTube/Vimeo alanı eklendi;
   bağlantı varsa yüklenen dosyaya göre önceliklidir. `lib/video.ts` bağlantıyı
   gömülebilir URL'e çevirir.
2. **Yükleme + sıkıştırma.** Dockerfile'a `ffmpeg` eklendi.
   `lib/video-optimize.ts`: H.264 1080p, `-preset veryfast -crf 28`, AAC,
   `+faststart`.

> Sıkıştırma **arka planda** çalışır: sunucu 2 çekirdekli ve nginx
> `proxy_read_timeout 300`. `/api/upload` önce orijinali kaydedip URL'i hemen
> döner; ffmpeg bitince dosya **aynı adla** değiştirilir. URL değişmediği için
> durum takibi gerekmez. Başarısız olursa orijinal yerinde kalır.

## 4.8 Disk temizliği

Tüm ilanlar silindiği için `public/uploads` ölü veriye dönüşmüştü:
**506 MB → 68 KB** (ilanlar 380, thumbnails 375, originals 293, videos 4 dosya).

- `originals/` klasörüne kodda ve veritabanında hiç referans yoktu.
- `videos/` altındaki 4 dosya **aynı 78 MB'lık videonun kopyasıydı** ve hiçbir
  ilana bağlı değildi. `.gitignore`'a rağmen izleniyorlardı (kural sonradan
  eklenmiş); `git rm --cached` ile çıkarıldı, geçmiş değiştirilmedi.
- `public/videos/` **korundu** — iletişim sayfası ve HeroSection kullanıyor.

> Silmeden önce 18 Kasım yedeğindeki 10 ilanın referans verdiği 153 fotoğraf +
> küçük resimleri (301 dosya, 40.8 MB) şuraya arşivlendi:
> `/root/backups/kalindayapi-ilan-fotograflari-2026-11-18.tar.gz`
> Bu arşiv 30 günlük yedek döngüsünün **dışında**, kalıcı.

## 4.9 Mavi → turkuaz dönüşümü (20 Kasım 2026)

**İstek:** "Frontend'de kullandığımız koyu mavi renklerin tamamı turkuaz
yapılmalıdır." Onaylanan kapsam: sadece `primary` değil, **`accent` dahil tüm
mavi aile**; tercih edilen ton paletteki mevcut `ocean` (`#00B4BD`) ailesi.

### Token eşlemesi

| Token | Eski (lacivert dönem) | Yeni (turkuaz) |
|---|---|---|
| `primary` | `#012169` | `#00767C` |
| `primary-light` | `#1B3C7E` | `#00989F` |
| `primary-dark` | `#000F3D` | `#00494E` |
| `accent` | `#418FDE` | `#00B4BD` |
| `accent-light` | `#6BA7E7` | `#4FD1D9` |
| `accent-dark` | `#2A6FB8` | `#00888F` |
| `slate` | `#5C86A0` | `#4A9BA3` |

`primary` koyu/metin-güvenli, `accent` parlak/dolgu ayrımı korundu — bu yüzden
seçilen `#00B4BD`, `accent`'e verildi; `primary-light` onun bir tık altı oldu.

### Değiştirilen dosyalar

- `app/globals.css` — palet, bölüm başı yorumları, `rgba(1,33,105,…)` →
  `rgba(0,118,124,…)` (card-hover gölgesi, input focus ring, hero `.overlay`),
  döviz `symbol-flash` animasyonu
- `app/layout.tsx` — `viewport.themeColor`
- `public/logo-navy.svg`, `public/logo-wide-navy.svg` — bkz. 4.1
- `components/sections/HizmetKartlari.tsx` — 4 kartın `renk` alanı. Kartların
  **birbirinden ayırt edilebilir** olması gerektiği için düz eşleme yapılmadı,
  4 ayrı turkuaz tonuna dağıtıldı: `#00767C`, `#00B4BD`, `#005358`, `#4A9BA3`.
  (Düz eşlemede 1. ve 3. kart aynı renge düşüyordu.)
- `app/error.tsx`, `app/[lang]/error.tsx` — ham `bg-blue-600/700` →
  `bg-primary` / `hover:bg-primary-light`
- `app/[lang]/kurumsal/vizyon-misyon/page.tsx` — `border-l-[#418FDE]` →
  `border-l-accent`
- `lib/email.ts`, `lib/lead-email.ts` — mail şablonu başlık ve badge renkleri
  (frontend dışı; marka tutarlılığı için dahil edildi)

### Bilinçli dokunulmayanlar

- `components/ui/FlagIcon.tsx` içindeki `#012169` — **İngiltere bayrağının
  resmi mavisi**, marka rengi değil. Değiştirilmemeli.
- Admin panelindeki `bg-blue-50` / `text-blue-800` NetGSM bilgi kutusu
  (`app/admin/(dashboard)/sms/ayarlar/page.tsx`) — nötr "info" rengi.
- `components/sections/GoogleReviews.tsx` içindeki `bg-blue-500` — rastgele
  avatar renk havuzunun bir üyesi.
- `app/admin/(dashboard)/sms/page.tsx`, `components/admin/ilan/IlanForm.tsx` —
  admin içi durum renkleri.

### Kontrast onarımı (uygulandı)

Turkuaz, laciverten çok daha açık. Bölüm 4.3'te koyu zemin için kurulan
`text-carolina` çözümü bu yüzden zayıflamıştı:

| Kombinasyon | Lacivert dönemi | Turkuaz (ilk) | Turkuaz (onarım sonrası) |
|---|---|---|---|
| `carolina` / `primary` zemin | 8.9:1 | **3.2:1** ❌ | **~12:1** ✅ |
| beyaz metin / `primary` zemin | 19:1 | 5.4:1 ✅ | 5.4:1 ✅ |
| beyaz metin / `accent` zemin | 3.0:1 | 2.5:1 ⚠️ | 2.5:1 ⚠️ |

**Yapılan:** `carolina` `#89D4E3` → **`#CFF2F7`** açıldı. Tek token
değişikliği, `text-carolina`'nın ~40 kullanım yerine dokunulmadı.
Alternatif olarak `primary`'yi `#005F63`'e koyultmak da düşünülmüştü;
token değiştirmek daha az invaziv olduğu için o seçilmedi.

> `globals.css`'teki `symbol-flash` keyframe'inde `#89D4E3` **bilinçli
> bırakıldı** — döviz sembolünün açık zemindeki parlama tepesi; açılırsa
> beyazda kaybolur. `carolina` token'ıyla ilgisi yok.

**Hâlâ açık:** `btn-accent` ve `badge-kiralik` beyaz metni `accent`
üzerinde 2.5:1. Lacivert dönemde de (3.0:1) AA altıydı, yani yeni bir
gerileme değil ama düzeltilmedi. Seçenekler: zemini `accent-dark`'a almak
ya da metni `text-ink` yapmak.

### Doğrulama durumu

- `npx tsc --noEmit`: dokunulan dosyalarda **0 hata**. Çıkan hatalar
  `lib/i18n/getDictionary.ts` ve `scripts/` altında, bölüm 6'daki önceden
  var olan hatalar.
- Dev server (`npm run dev`, port 1301): `HTTP 200`, servis edilen
  `layout.css` içinde turkuaz token'ları doğrulandı.
- **Görsel kontrol YAPILMADI.** Tarayıcı otomasyonu engellendi: Claude
  hesabına bağlı Chrome'ların tümü macOS'ta, dev server bu Windows
  makinesinde → macOS'taki `localhost` bu makineyi göstermiyor. LAN IP
  (`10.99.62.158:1301`) Windows'tan `200` dönüyor ama mac'ten erişilemedi
  (firewall / farklı ağ). Çözüm: **bu makinedeki Chrome'a Claude in Chrome
  eklentisini kurup hesaba bağlamak**. Sonraki oturumun ilk işi bu.

---

## 4.10 Danışman değişiklikleri sitede görünmüyordu (21 Kasım 2026)

**Belirti:** Admin panelinden Arif DAĞDELEN'e fotoğraf eklenip kaydediliyor,
`/tr/danismanlar` sayfasında fotoğraf görünmüyordu.

**Teşhis — sorun fotoğraf yüklemede DEĞİLDİ.** Sırayla elendi:

| Kontrol | Sonuç |
|---|---|
| DB'ye kaydediliyor mu | ✅ `/api/danismanlar` → `foto: "/uploads/danismanlar/1795207789967-cjzwab.webp"` |
| Dosya sunucuda var mı | ✅ Ham URL `200`, `image/webp`, 4558 bayt |
| `/_next/image` 404 veriyor | ⚠️ İlgisiz — `next.config.ts`'de `images.unoptimized: true`, optimize edici hiç kullanılmıyor |
| Sayfanın HTML'i | ❌ Arif için avatar **ikon yedek dalı** basılmış (`bg-accent/15` + `<svg>`), yani `foto` boş gelmiş |

**Kesin kanıt:** Aynı sayfada ABDULKADİR'in fotoğrafı **görünüyordu**
(`1795128784828`, son build'den önce yüklenmiş), Arif'inki görünmüyordu
(`1795207789967`, build'den **sonra** yüklenmiş). Ana sayfada ise hiç
danışman fotoğrafı yoktu.

**Kök neden:** Danışman verisini gösteren dört sayfanın hiçbirinde
`dynamic` veya `revalidate` yoktu; dördü de Prisma'yı doğrudan okuyup
**build anında statik olarak donuyordu**. Projede `revalidatePath` /
`revalidateTag` **hiç kullanılmıyordu**. İlan sayfaları `force-dynamic`
olduğu için ilan düzenlemeleri anında görünüyordu — bu yüzden sorun
yalnızca danışman modülündeymiş gibi duruyordu.

**Çözüm — iki katmanlı:**

1. **Anında etki:** `lib/revalidate-danismanlar.ts` →
   `revalidateDanismanSayfalari()`. Admin POST / PUT / DELETE sonrası
   çağrılıyor (`app/api/admin/ortaklar/route.ts` ve `[id]/route.ts`).
   Yollar `app/` route deseni olarak veriliyor, `[lang]` sayesinde tek
   çağrı beş dili kapsıyor:
   ```
   /[lang]   /[lang]/danismanlar   /[lang]/hakkimizda   /[lang]/hizmetler/[slug]
   ```
   > Lokalize takma adlar (`/de/berater`) **gerçek route değil** —
   > next.config redirect'leriyle Türkçe yola dönüyor. Onları
   > tazelemek gereksizdi, ilk denemede bu hata yapıldı.

2. **Emniyet payı:** dört sayfaya `export const revalidate = 60`.
   `revalidatePath` bir şekilde çalışmazsa değişiklik en fazla 1 dakikada
   görünür. Build çıktısında dördü de `1m` olarak doğrulandı.

Ana sayfa için `force-dynamic` **bilinçli seçilmedi** — en çok gezilen
sayfa ve sunucu 2 çekirdekli; ISR statik servisi koruyor.

### Bu modülde bulunan diğer şeyler

- **Yetim fotoğraf dosyaları.** Danışmanın fotoğrafı değiştirilince eskisi
  diskten silinmiyor (`unlink` yok). Her değişiklikte bir dosya birikiyor.
  Küçük ama bölüm 4.8 disk temizliğiyle ilgili.
- **API katmanı sağlam.** Auth kontrolü, zod doğrulaması, slug çakışma
  kontrolü, silmede `Ilan.danismanId` boşaltma (FK ihlali önleme) — hepsi
  doğru. Yükleme tarafında `danismanlar` klasörü beyaz listede, dosya
  tipi/boyut kontrolü var.
- **Kod tekrarı.** `app/[lang]/danismanlar/page.tsx` Prisma'yı kendisi
  sorguluyor; oysa `lib/danismanlar.ts` → `getDanismanlar()` tek kaynak
  olarak kurulmuştu (bkz. 4.5). `jsonDizi` üç yerde kopyalanmış
  (`lib/danismanlar.ts`, `app/api/danismanlar/route.ts`, sayfanın içinde).

### ⚠️ Aynı hatanın devam ettiği yer

`app/[lang]/blog/[slug]/page.tsx` de DB okuyor ve `revalidate`/`dynamic`
**yok** → blog yazısı düzenlemeleri de ancak deploy'da görünür. Build
çıktısında revalidate sütunu boş. **Henüz düzeltilmedi** — danışman
modülü kapsamı dışında kaldı, müşteri onayı bekliyor.

### Not: repodaki `nginx.conf` güncel değil

`proxy_pass http://127.0.0.1:3000` ve `alias /var/www/kalindayapi.com/...`
yazıyor; oysa `docker-compose.yml` `PORT=3001` kullanıyor ve kendi
yorumunda nginx'in `172.18.0.1:3001`'e gittiğini söylüyor, deploy da
`/root/kalindayapi.com` altında çalışıyor. Sunucudaki gerçek nginx
yapılandırması repodakinden farklı. Siteyi etkilemiyor ama bu dosyaya
bakıp karar vermeyin.

---

## 5. Yarım kalan / müşteriye sorulacaklar

### Müşteri onayı bekleyenler
1. ~~**Footer rengi**~~ — **çözüldü (19 Kasım 2026).** Referansın footer'ı
   `bg-brand-600` yani koyu lacivert; açık mavi onların CTA rengi. Palet
   uyarlamasıyla footer lacivert oldu.
2. ~~**Açık mavi tonu**~~ — **çözüldü.** Açık mavi artık geniş zeminlerde değil,
   yalnızca CTA/dolguda; `#418FDE` referansla birebir aynı.
3. ~~**Logo ile palet uyumu**~~ — **çözüldü (19 Kasım 2026).** Lacivert logo
   varyantları üretildi, Bölüm 4.1'e bakın. Müşteriye yine de gösterilmeli.
4. **İletişim sayfasındaki harita** — muglaport'ta yok, bizde duruyor.
   Kaldırılsın mı?
5. **İçerikteki rakamlar doğrulanmalı**: "200+ emlak işlemi", "300+ mutlu aile",
   "%2 satış komisyonu", bölge m² fiyat aralıkları. Bunlar eski içerikten taşındı.
6. **Öne çıkan ilan sayısı** — şu an 6. muglaport'ta ~8-10 + "Haftanın evi"
   vurgulu tek kart var. İstenirse eklenir.

### Teknik, yapılabilir ama yapılmadı
- **Oda sayısı filtresi** (1+0 … 5+): `app/api/ilanlar/route.ts` desteklemiyor.
  Ana sayfa arama kutusuna eklenmesi için önce API'ye `oda` parametresi gerekir.
- **Kullanılmayan görseller**: `public/zafersoylu.png`, `public/hikmetkaraoglan.svg`
  artık hiçbir yerde referans edilmiyor, silinebilir.
- **`data/referans-projeler-i18n.ts` ve `ReferansGaleri.tsx` silindi** — geri
  istenirse commit `908ad98` öncesinden alınabilir.

---

## 6. Projede mevcut (bizim açmadığımız) hatalar

Bunlar çalışmadan **önce** de vardı, dokunulmadı:

- `lib/i18n/getDictionary.ts` → `Dictionary` arayüzü sözlük JSON'larıyla uyumsuz
  (`home.whyUs` alanları eksik). `next.config.ts` içinde
  `typescript.ignoreBuildErrors: true` olduğu için build patlamıyor.
- `app/[lang]/doviz-kurlari/layout.tsx` → `exchangePage` tipi tanımsız
- `lib/currencyUtils.ts` → `GBP` eksik
- `app/admin/(dashboard)/ilanlar/[id]/duzenle/page.tsx` → `kategori` tip uyumsuzluğu

### Bizim düzelttiğimiz eski hatalar
- İlanlar sayfası URL parametrelerini okumuyordu → footer'daki
  "Satılık Daireler" gibi linkler filtresiz liste açıyordu. **Düzeltildi.**
- İletişim sayfasının `<h1>`'i "İletişim İletişim" basıyordu. **Düzeltildi.**
- Referanslar sayfası istatistik etiketlerinde yedek metne düşüyordu. **Düzeltildi.**

---

## 7. Nasıl çalıştırılır

```bash
cd "C:/Users/J-17/OneDrive/Belgeler/GitHub/kalindayapi.com"
npm run build
npx next start -p 3100
# http://localhost:3100/tr
```

> `npm start` portu 1301 kullanır. Build alırken sunucu açıksa Windows'ta
> `EPERM unlink` hatası verir — önce sunucuyu kapatın:
> `taskkill /F /IM node.exe`

### Çeviri scriptleri
```bash
npx tsx scripts/translate-hizmetler.ts   # data/hizmetler.json -> hizmetler-translations.ts
npx tsx scripts/translate-sss.ts         # data/sss.ts -> sss-translations.ts
```
Her ikisi de **en, ar, de, ru** üretecek şekilde genişletildi (eskiden sadece en+ar).
Türkçe kaynağı değiştirdikten sonra bunları yeniden çalıştırın.

---

## 8. Sonraki oturumda ilk adım

1. Bu dosyayı oku — özellikle **bölüm 4.9** (turkuaz dönüşümü, görsel
   kontrolü yapılmamış durumda)
2. `git log --oneline -5` ile son commit'leri gör
3. **Turkuaz paletin görsel kontrolünü tamamla.** Bu makinedeki Chrome'a
   Claude in Chrome eklentisi kurulu değilse önce onu kur ve hesaba bağla
   (macOS'taki Chrome'lar bu makinenin `localhost`'unu göremiyor).
   Bakılacak yerler:
   - Ana sayfa: hero, `HizmetKartlari`'nın 4 kart rengi, arama kutusu altı
   - Bir alt sayfa (ör. `/tr/hizmetler`): `bg-primary` başlık bandı +
     breadcrumb + `text-carolina` vurgu → **4.9'daki kontrast riski**
   - `/tr/ilanlar`: "Kiralık" badge'i (beyaz metin / `accent` zemin)
   - Navbar'daki turkuaz logo, beyaz zeminde yeterince okunuyor mu
4. Kontrast kararını al (4.9'un sonundaki 2 seçenek) ve uygula
5. Bölüm 5'teki açık soruları netleştir
6. Onay gelirse deploy
