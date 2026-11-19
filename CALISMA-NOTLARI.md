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

> **19 Kasım 2026'da palet muglaport.com.tr'den birebir uyarlandı.** Altın
> (`#C9A84C`) tamamen kaldırıldı. Önceki açık mavi `primary` aslında
> referansın **accent**'iydi; referansın marka rengi koyu lacivert `#012169`.

`app/globals.css` → `@theme inline`

```
--color-primary        #012169   KOYU LACİVERT — marka; link, başlık vurgusu, koyu zemin
--color-primary-light  #1B3C7E   hover
--color-primary-dark   #000F3D   basılı / koyu varyant
--color-accent         #418FDE   AÇIK MAVİ — yalnızca CTA butonu, ikon dolgusu
--color-accent-light   #6BA7E7
--color-accent-dark    #2A6FB8
--color-ink            #2D2926   sıcak siyah — BAŞLIKLAR ve gövde metni
--color-ink-light      #4A443F
--color-surface        #EDF0F4   açık yüzey (referans: soft)
--color-surface-dark   #E3E6EB
--color-border         #E3E6EB   kenarlık (referans: line)
--color-border-strong  #C9CED6   (referans: line-strong)
--color-text-light     #5C5651   gövde ikincil metin
--color-text-muted     #8A857F   soluk metin

ikincil vurgular (referans paletten):
--color-ocean          #00B4BD
--color-ocean-ink      #00767C
--color-slate          #5C86A0
--color-carolina       #89D4E3   koyu lacivert zeminde metin/başlık rengi
--color-cement         #E6DDD1

--color-success        #2F7D4F
--color-warning        #B7791F
--color-error          #C2412D
```

Referansın kendi token'ları (doğrulama için): `--brand:#012169`,
`--accent:#418fde`, `--ink:#2d2926`, `--paper:#fff`; marka tonları
`color-mix(in oklab, var(--brand) N%, black)` ile türetiliyor.

## 4.1 Logo varyantları

Logo altın/amber gradyanlı; beyaz zeminde soluk kalıyordu. Palete uyumlu
**lacivert varyantlar** üretildi (orijinaller silinmedi).

| Dosya | Renk | Nerede kullanılır |
|---|---|---|
| `public/logo.svg` | altın, kare | **Koyu zemin** — admin sidebar (`bg-primary`) |
| `public/logo-footer.svg` | altın, yatay | **Koyu zemin** — site footer |
| `public/logo-navy.svg` | **lacivert, kare** | Beyaz zemin — navbar (mobil), admin giriş |
| `public/logo-wide-navy.svg` | **lacivert, yatay** | Beyaz zemin — navbar (masaüstü) |

Üretim yöntemi: orijinaldeki her renk jetonu lacivert karşılığına eşlendi.
Merkez parlaması (beyaz ve açık sarılar) → `#1B3C7E`, gövde/kenar/kontur
(altın, amber, sarı, ten) → `#012169`, gradyan ara tonları → lacivert rampa
(`#16386F`, `#10306C`, `#0A2A6A`, `#072568`). **Kontur genişlikleri ve yol
verileri değiştirilmedi**, siluet orijinalle birebir aynı.

> Kural: **beyaz/açık zeminde lacivert varyantı, koyu lacivert zeminde altın
> orijinali** kullanın.

Not: JSON-LD'deki kurum logosu (`lib/jsonld.ts`, `lib/dovizJsonLd.ts`) hâlâ
altın `logo.svg`'yi gösteriyor — bilinçli bırakıldı, marka logosu o. Arama
sonuçlarında beyaz zeminde göründüğü için lacivert varyanta çevrilmesi
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
404 verir.** Header'da Kurumsal açılır menüsüne ve footer'a bağlantı kondu —
üst seviyeye eklenmedi, çünkü 1024–1279px'te şerit zaten dolu (bkz. 4.2).

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

1. Bu dosyayı oku
2. `git log --oneline main..HEAD` ile 3 commit'i gör
3. Siteyi ayağa kaldır, müşteri geri bildirimini al
4. Bölüm 5'teki açık soruları netleştir
5. Onay gelirse `main`'e merge + deploy
