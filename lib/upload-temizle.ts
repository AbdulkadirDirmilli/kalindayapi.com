import { unlink } from 'node:fs/promises'
import path from 'node:path'

/** Silinmesine izin verilen alt klasorler. Disindaki hicbir yol silinmez. */
const IZINLI_KLASORLER = ['danismanlar', 'ilanlar', 'videos', 'thumbnails'] as const

/**
 * `/uploads/...` seklindeki public URL'i diskteki guvenli tam yola cevirir.
 * Yol disina cikan, beyaz liste disi klasore isaret eden veya hic dosya adi
 * olmayan girdiler icin `null` doner.
 */
function guvenliYol(publicUrl: string): string | null {
  if (!publicUrl.startsWith('/uploads/')) return null

  // Yuklemede uretilen adlar ASCII; kodlanmis girdi gelirse de cozulur.
  let temiz: string
  try {
    temiz = decodeURIComponent(publicUrl)
  } catch {
    return null
  }

  // Sorgu/fragment eklenmis olabilir.
  temiz = temiz.split(/[?#]/)[0]

  const parcalar = temiz.slice('/uploads/'.length).split('/').filter(Boolean)
  if (parcalar.length !== 2) return null

  const [klasor, dosya] = parcalar
  if (!(IZINLI_KLASORLER as readonly string[]).includes(klasor)) return null

  // '.' ve '..' filter(Boolean)'dan gecer; ayrica ayirici kalmis olabilir.
  if (dosya === '.' || dosya === '..' || dosya.includes('\\')) return null

  const kok = path.join(process.cwd(), 'public', 'uploads')
  const tam = path.resolve(kok, klasor, dosya)

  // Son savunma: cozulen yol gercekten uploads kokunun altinda mi?
  if (tam !== path.join(kok, klasor, dosya)) return null
  if (!tam.startsWith(kok + path.sep)) return null

  return tam
}

/**
 * Yuklenmis bir dosyayi diskten siler.
 *
 * Danisman fotografi degistirildiginde veya kayit silindiginde eski dosya
 * diskte kaliyordu; her duzenlemede bir yetim dosya birikiyordu.
 *
 * **Asla hata firlatmaz.** Dosya silinemezse (yok, izin yok, yol gecersiz)
 * yalnizca `false` doner ve loglar — bir dosya temizligi yuzunden admin
 * kaydetme islemi basarisiz olmamali. Veri zaten DB'de guncellenmis olur.
 */
export async function yuklemeyiSil(publicUrl: string | null | undefined): Promise<boolean> {
  if (!publicUrl) return false

  const yol = guvenliYol(publicUrl)
  if (!yol) {
    console.warn('yuklemeyiSil: guvenli olmayan veya tanimsiz yol, atlandi:', publicUrl)
    return false
  }

  try {
    await unlink(yol)
    return true
  } catch (error) {
    const kod = (error as NodeJS.ErrnoException)?.code
    // Dosya zaten yoksa bu bir hata degil, hedefe ulasilmis sayilir.
    if (kod !== 'ENOENT') {
      console.error('yuklemeyiSil: dosya silinemedi:', publicUrl, kod)
    }
    return false
  }
}
