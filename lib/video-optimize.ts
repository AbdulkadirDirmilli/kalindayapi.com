import { spawn } from 'node:child_process'
import { stat, rename, unlink } from 'node:fs/promises'
import path from 'node:path'

/**
 * Yuklenen videoyu arka planda sikistirir ve dosyayi YERINDE degistirir.
 *
 * Neden arka planda: sunucu 2 cekirdekli ve nginx proxy_read_timeout 300s.
 * Senkron sikistirma uzun videolarda istegi zaman asimina ugratirdi. Bu
 * yuzden /api/upload once orijinali kaydedip URL'i hemen donuyor; sikistirma
 * bittiginde ayni ada yazildigi icin URL degismiyor, veritabaninda guncelleme
 * ya da durum takibi gerekmiyor.
 *
 * Sikistirma basarisiz olursa ya da dosya kuculmezse orijinal yerinde kalir.
 */
export function videoSikistirArkaPlanda(dosyaYolu: string): void {
  const dizin = path.dirname(dosyaYolu)
  const ad = path.basename(dosyaYolu, path.extname(dosyaYolu))
  const gecici = path.join(dizin, `${ad}.sikistiriliyor.mp4`)

  const ff = spawn(
    'ffmpeg',
    [
      '-y',
      '-i', dosyaYolu,
      // Uzun kenar 1080'i asmasin, tek sayili boyutlari H.264 icin duzelt
      '-vf', "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2",
      '-c:v', 'libx264',
      '-preset', 'veryfast',
      '-crf', '28',
      '-c:a', 'aac',
      '-b:a', '128k',
      // Web'de ilk kareyi beklemeden oynatma
      '-movflags', '+faststart',
      gecici,
    ],
    { stdio: 'ignore', detached: false }
  )

  ff.on('error', (err) => {
    console.error('ffmpeg baslatilamadi (video orijinal haliyle kaldi):', err.message)
  })

  ff.on('close', async (kod) => {
    try {
      if (kod !== 0) {
        await unlink(gecici).catch(() => {})
        console.error(`ffmpeg ${kod} koduyla bitti; video orijinal haliyle kaldi: ${dosyaYolu}`)
        return
      }

      const [once, sonra] = await Promise.all([stat(dosyaYolu), stat(gecici)])
      if (sonra.size > 0 && sonra.size < once.size) {
        await rename(gecici, dosyaYolu)
        const oran = Math.round((1 - sonra.size / once.size) * 100)
        console.log(
          `Video sikistirildi: ${path.basename(dosyaYolu)} ` +
            `${(once.size / 1048576).toFixed(1)}MB -> ${(sonra.size / 1048576).toFixed(1)}MB (%${oran})`
        )
      } else {
        // Sikistirilmis hali daha buyukse orijinali korumak daha dogru
        await unlink(gecici).catch(() => {})
      }
    } catch (err) {
      console.error('Video sikistirma sonrasi hata:', err)
      await unlink(gecici).catch(() => {})
    }
  })
}
