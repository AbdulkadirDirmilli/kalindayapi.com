# Kalinda Yapı Emlak — Dönüşüm Çalışma Notları

> Son güncelleme: 12 Kasım 2026
> Dal: `emlak-odakli-kurumsal` (3 commit, `main`'e merge edilmedi, push yapılmadı)

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

`app/globals.css` → `@theme inline`

```
--color-primary        #418FDE   açık mavi — zemin, buton, şerit, footer
--color-primary-light  #6BA7E7   hover ve gradyan
--color-primary-dark   #2A6FB8   koyu buton / link
--color-ink            #0F2742   BAŞLIKLAR ve koyu metin
--color-ink-light      #1E3A5F   ikincil koyu metin
--color-accent         #C9A84C   altın — rozet, ikon, vurgu (logo ile uyumlu)
--color-surface        #F3F6FA   açık yüzey
--color-border         #DCE3EC   kenarlık
--color-text-light     #5A6572   gövde ikincil metin
--color-text-muted     #8A93A0   soluk metin
```

### Kritik kural
> **Beyaz zeminde başlık için `text-primary` KULLANMAYIN — `text-ink` kullanın.**
> `primary` artık açık mavi; beyaz üzerinde okunmaz.
> Renkli (`bg-primary`) zeminde metin `text-white` / `text-white/85` olmalı,
> `text-gray-300/400/500` **kullanılmamalı**.

---

## 5. Yarım kalan / müşteriye sorulacaklar

### Müşteri onayı bekleyenler
1. **Footer rengi** — muglaport'un footer'ı aslında koyu lacivert (`#012169`);
   açık mavi onların buton rengi. Biz açık mavi yaptık (müşteri öyle istedi).
   Footer'ı koyu laciverde çekme seçeneği masada.
2. **Açık mavi tonu** — `#418FDE` fazla soluk gelirse `#2A6FB8` alternatifi hazır.
3. **İletişim sayfasındaki harita** — muglaport'ta yok, bizde duruyor.
   Kaldırılsın mı?
4. **İçerikteki rakamlar doğrulanmalı**: "200+ emlak işlemi", "300+ mutlu aile",
   "%2 satış komisyonu", bölge m² fiyat aralıkları. Bunlar eski içerikten taşındı.
5. **Öne çıkan ilan sayısı** — şu an 6. muglaport'ta ~8-10 + "Haftanın evi"
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
