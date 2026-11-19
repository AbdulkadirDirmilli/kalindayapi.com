import { prisma } from '@/lib/prisma'

export interface Danisman {
  id: string
  slug: string
  ad: string
  unvan: string
  telefon: string
  whatsapp: string | null
  email: string | null
  biyografi: string | null
  foto: string | null
  cinsiyet: string | null
  deneyimYili: number | null
  bolgeler: string[]
  uzmanlikAlanlari: string[]
  sira: number
}

/** '["a","b"]' seklindeki JSON dizi stringini guvenle parse eder. */
export function jsonDizi(deger: string | null | undefined): string[] {
  if (!deger) return []
  try {
    const p = JSON.parse(deger)
    return Array.isArray(p) ? p.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

/**
 * Yayindaki danismanlari `sira` sirasiyla dondurur.
 *
 * Danisman verisi onceden uc ayri bileşende sabit kodluydu
 * (OrtaklarBolumu, SideContactBar, hizmetler/[slug]); hepsi bu tek kaynaga
 * baglandi, boylece admin panelinden eklenen danisman her yerde gorunur.
 */
export async function getDanismanlar(): Promise<Danisman[]> {
  try {
    const kayitlar = await prisma.ortak.findMany({
      where: { aktif: true },
      orderBy: { sira: 'asc' },
      select: {
        id: true, slug: true, ad: true, unvan: true, telefon: true,
        whatsapp: true, email: true, biyografi: true, foto: true,
        cinsiyet: true, deneyimYili: true, bolgeler: true,
        uzmanlikAlanlari: true, sira: true,
      },
    })
    return kayitlar.map((k) => ({
      ...k,
      bolgeler: jsonDizi(k.bolgeler),
      uzmanlikAlanlari: jsonDizi(k.uzmanlikAlanlari),
    }))
  } catch (error) {
    console.error('Danismanlar alinamadi:', error)
    return []
  }
}

/** Sirası en ustte olan danisman (tek muhatap bolumleri icin). */
export async function getAnaDanisman(): Promise<Danisman | null> {
  const hepsi = await getDanismanlar()
  return hepsi[0] ?? null
}
