import { z } from 'zod'

export const ilanSchema = z.object({
  baslik: z.string().min(5, 'Başlık en az 5 karakter olmalı'),
  slug: z.string().min(3, 'Slug en az 3 karakter olmalı'),
  kategori: z.enum(['satilik', 'kiralik']),
  tip: z.string().min(2, 'Tip zorunlu'),
  altTip: z.string().optional().nullable(),
  fiyat: z.number().positive('Fiyat pozitif olmalı'),
  paraBirimi: z.string().default('TL'),

  // Konum
  il: z.string().min(2, 'İl zorunlu'),
  ilce: z.string().min(2, 'İlçe zorunlu'),
  mahalle: z.string().optional().nullable(),
  koordinatLat: z.number().optional().nullable(),
  koordinatLng: z.number().optional().nullable(),

  // Konut Ozellikleri
  brutMetrekare: z.number().positive().optional().nullable(),
  netMetrekare: z.number().positive().optional().nullable(),
  metrekare: z.number().positive().optional().nullable(),
  odaSayisi: z.string().optional().nullable(),
  banyoSayisi: z.number().nonnegative().optional().nullable(),
  tuvaletSayisi: z.number().nonnegative().optional().nullable(),
  balkonSayisi: z.number().nonnegative().optional().nullable(),
  kat: z.number().optional().nullable(),
  toplamKat: z.number().positive().optional().nullable(),
  binaYasi: z.number().nonnegative().optional().nullable(),
  binaTipi: z.string().optional().nullable(),
  kullanimDurumu: z.string().optional().nullable(),

  // Isitma ve Enerji
  isitma: z.string().optional().nullable(),
  yakitTipi: z.string().optional().nullable(),
  enerjiSinifi: z.string().optional().nullable(),

  // Boolean ozellikler
  esyali: z.boolean().default(false),
  balkon: z.boolean().default(false),
  asansor: z.boolean().default(false),
  otopark: z.boolean().default(false),
  guvenlik: z.boolean().default(false),
  havuz: z.boolean().default(false),
  bahce: z.boolean().default(false),
  bahceMetrekare: z.number().optional().nullable(),

  // Detayli ozellikler (JSON strings)
  icOzellikler: z.string().optional().nullable(),
  disOzellikler: z.string().optional().nullable(),
  muhitOzellikleri: z.string().optional().nullable(),
  guvenlikOzellikleri: z.string().optional().nullable(),
  cephe: z.string().optional().nullable(),
  manzara: z.string().optional().nullable(),

  // Arsa/Tarla ozellikleri
  imarDurumu: z.string().optional().nullable(),
  emsal: z.string().optional().nullable(),
  gabari: z.string().optional().nullable(),
  taks: z.number().optional().nullable(),
  kaks: z.number().optional().nullable(),
  yolCephesi: z.number().optional().nullable(),
  derinlik: z.number().optional().nullable(),
  arsaTipi: z.string().optional().nullable(),
  egim: z.string().optional().nullable(),
  zemin: z.string().optional().nullable(),
  altyapi: z.boolean().default(false),
  altyapiDetay: z.string().optional().nullable(),
  tarimOzellikleri: z.string().optional().nullable(),
  adaNo: z.string().optional().nullable(),
  parselNo: z.string().optional().nullable(),
  paftaNo: z.string().optional().nullable(),

  // Ticari ozellikler
  ticariTip: z.string().optional().nullable(),
  cepheGenisligi: z.number().optional().nullable(),
  tavanYuksekligi: z.number().optional().nullable(),
  personelKapasitesi: z.number().optional().nullable(),
  depoOzellikleri: z.string().optional().nullable(),

  // Tapu ve yasal
  tapuDurumu: z.string().optional().nullable(),
  krediyeUygun: z.boolean().default(false),
  takasaUygun: z.boolean().default(false),
  isyeriRuhsati: z.boolean().default(false),

  // Insaat durumu
  insaatDurumu: z.string().optional().nullable(),

  // Video
  videoUrl: z.string().optional().nullable(),

  // Sorumlu danisman
  danismanId: z.string().optional().nullable(),

  aciklama: z.string().min(20, 'Açıklama en az 20 karakter olmalı'),
  oneCikan: z.boolean().default(false),
  durum: z.enum(['aktif', 'pasif', 'satildi', 'kiralandi']).default('aktif'),
  ilanNo: z.string().optional().nullable(),

  // Fotograflar (URL array)
  fotograflar: z.array(z.string()).optional(),
})

export const ilanUpdateSchema = ilanSchema.partial()

export type IlanInput = z.infer<typeof ilanSchema>
export type IlanUpdateInput = z.infer<typeof ilanUpdateSchema>
