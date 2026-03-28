import { z } from 'zod'

export const ilanSchema = z.object({
  baslik: z.string().min(5, 'Baslik en az 5 karakter olmali'),
  slug: z.string().min(3, 'Slug en az 3 karakter olmali'),
  kategori: z.enum(['satilik', 'kiralik']),
  tip: z.enum(['daire', 'villa', 'arsa', 'ticari']),
  fiyat: z.number().positive('Fiyat pozitif olmali'),
  paraBirimi: z.string().default('TL'),

  // Konum
  il: z.string().min(2, 'Il zorunlu'),
  ilce: z.string().min(2, 'Ilce zorunlu'),
  mahalle: z.string().optional(),
  koordinatLat: z.number().optional(),
  koordinatLng: z.number().optional(),

  // Ozellikler
  metrekare: z.number().positive().optional(),
  odaSayisi: z.string().optional(),
  banyoSayisi: z.number().nonnegative().optional(),
  kat: z.number().optional(),
  toplamKat: z.number().positive().optional(),
  binaYasi: z.number().nonnegative().optional(),
  isitma: z.string().optional(),

  // Boolean ozellikler
  esyali: z.boolean().default(false),
  balkon: z.boolean().default(false),
  asansor: z.boolean().default(false),
  otopark: z.boolean().default(false),
  guvenlik: z.boolean().default(false),
  havuz: z.boolean().default(false),
  bahce: z.boolean().default(false),
  bahceMetrekare: z.number().optional(),

  // Arsa ozellikleri
  imarDurumu: z.string().optional(),
  gabari: z.string().optional(),
  yolCephesi: z.number().optional(),
  altyapi: z.boolean().default(false),

  aciklama: z.string().min(20, 'Aciklama en az 20 karakter olmali'),
  oneCikan: z.boolean().default(false),
  durum: z.enum(['aktif', 'pasif', 'satildi']).default('aktif'),
  ilanNo: z.string().optional(),

  // Fotograflar (URL array)
  fotograflar: z.array(z.string().url()).optional(),
})

export const ilanUpdateSchema = ilanSchema.partial()

export type IlanInput = z.infer<typeof ilanSchema>
export type IlanUpdateInput = z.infer<typeof ilanUpdateSchema>
