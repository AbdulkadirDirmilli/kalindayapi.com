/**
 * Ilan videolari iki sekilde verilebilir:
 *  1) YouTube / Vimeo baglantisi  -> gomulu oynatici (iframe)
 *  2) Panelden yuklenen dosya     -> <video> etiketi
 *
 * Ikisi de ayni `Ilan.videoUrl` alaninda tutulur; ayrim buradaki
 * `videoGomuluUrl` ile yapilir.
 */

/**
 * Harici bir video baglantisini gomulebilir URL'e cevirir.
 * Desteklenmeyen (ornegin yuklenmis dosya) adreslerde null doner.
 */
export function videoGomuluUrl(url: string | null | undefined): string | null {
  if (!url) return null
  const temiz = url.trim()
  if (!temiz) return null

  // youtu.be/VIDEOID
  const kisa = temiz.match(/^https?:\/\/(?:www\.)?youtu\.be\/([\w-]{6,})/i)
  if (kisa) return `https://www.youtube-nocookie.com/embed/${kisa[1]}`

  // youtube.com/watch?v=VIDEOID | /embed/VIDEOID | /shorts/VIDEOID
  const yt = temiz.match(
    /^https?:\/\/(?:www\.|m\.)?youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=([\w-]{6,})|embed\/([\w-]{6,})|shorts\/([\w-]{6,}))/i
  )
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1] || yt[2] || yt[3]}`

  // vimeo.com/123456789
  const vimeo = temiz.match(/^https?:\/\/(?:www\.)?vimeo\.com\/(?:video\/)?(\d{6,})/i)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`

  return null
}

/** Yuklenmis bir video dosyasi mi (harici baglanti degil)? */
export function yuklenmisVideo(url: string | null | undefined): boolean {
  if (!url) return false
  return /\.(mp4|webm|mov|avi)$/i.test(url) || url.includes('/uploads/videos/')
}
