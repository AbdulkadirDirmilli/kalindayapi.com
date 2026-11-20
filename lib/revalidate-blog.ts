import { revalidatePath } from 'next/cache'

/**
 * Blog yazisi degistiginde detay sayfalarini tazeler.
 *
 * `app/[lang]/blog/[slug]/page.tsx` DB'yi sunucuda okuyup statik kaliyordu;
 * mevcut bir yazinin duzenlemesi ancak bir sonraki deploy'da goruneuyordu.
 * (Yeni yazi etkilenmiyordu: `generateStaticParams` disindaki slug'lar istek
 * aninda render ediliyor.) Ayni hata danisman modulunde de vardi, bkz.
 * `lib/revalidate-danismanlar.ts` ve CALISMA-NOTLARI 4.10.
 *
 * Liste sayfasi, ana sayfadaki `SonYazilar` ve `/api/blog` rotalari
 * tazelenmiyor — hepsi calisma aninda veri cekiyor, zaten guncel.
 *
 * Yol `app/` route deseni olarak veriliyor; `[lang]` ve `[slug]` sayesinde
 * tek cagri bes dilin tum yazilarini kapsiyor.
 */
export function revalidateBlogSayfalari() {
  revalidatePath('/[lang]/blog/[slug]', 'page')
}
