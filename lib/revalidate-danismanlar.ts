import { revalidatePath } from 'next/cache'

/**
 * Danisman verisi degistiginde onu gosteren tum public sayfalari tazeler.
 *
 * Bu sayfalar DB'yi build aninda okuyup statik kaliyordu; admin panelinden
 * eklenen danisman veya yuklenen fotograf ancak bir sonraki deploy'da
 * goruneuyordu. Sayfalarda ayrica `revalidate = 60` emniyet payi var; bu
 * fonksiyon kaydetme aninda etki etmesini sagliyor.
 *
 * Dort tuketici var: danismanlar sayfasi, ana sayfa, hakkimizda ve hizmet
 * detaylari (son ucu `getAnaDanisman()` kullaniyor).
 *
 * Yollar `app/` dizinindeki route desenleri olarak veriliyor; `[lang]`
 * boylece tek cagrida bes dilin tamamini kapsiyor. Lokalize takma adlar
 * (`/de/berater` gibi) gercek route degil, next.config redirect'leriyle
 * Turkce yola donuyor — onlari tazelemek gereksiz.
 */
export function revalidateDanismanSayfalari() {
  revalidatePath('/[lang]', 'page')
  revalidatePath('/[lang]/danismanlar', 'page')
  revalidatePath('/[lang]/hakkimizda', 'page')
  revalidatePath('/[lang]/hizmetler/[slug]', 'page')
}
