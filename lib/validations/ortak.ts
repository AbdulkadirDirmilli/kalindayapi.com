import { z } from 'zod'

/** '["a","b"]' seklinde JSON dizi string'i mi? */
const jsonDiziString = z
  .string()
  .refine(
    (v) => {
      try {
        return Array.isArray(JSON.parse(v))
      } catch {
        return false
      }
    },
    { message: 'JSON dizi formatinda olmali' }
  )

/**
 * Danisman (Ortak) govde dogrulamasi.
 *
 * Onceden API body'yi dogrudan `...body` ile Prisma'ya geciriyordu; bu,
 * istemcinin id/createdAt gibi alanlari da yazabilmesine aciklik birakiyordu.
 * Artik yalnizca burada tanimli alanlar kabul ediliyor.
 */
export const ortakSchema = z.object({
  ad: z.string().trim().min(1, 'Ad zorunlu').max(120),
  slug: z
    .string()
    .trim()
    .min(1, 'Slug zorunlu')
    .max(140)
    .regex(/^[a-z0-9-]+$/, 'Slug yalnizca kucuk harf, rakam ve tire icerebilir'),
  unvan: z.string().trim().min(1, 'Unvan zorunlu').max(160),
  telefon: z.string().trim().min(1, 'Telefon zorunlu').max(40),
  whatsapp: z.string().trim().max(40).nullish(),
  email: z.string().trim().email('Gecersiz e-posta').max(160).nullish().or(z.literal('')),
  biyografi: z.string().trim().max(4000).nullish(),
  foto: z.string().trim().max(500).nullish(),
  cinsiyet: z.enum(['erkek', 'kadin']).nullish(),
  deneyimYili: z.number().int().min(0).max(80).nullish(),
  bolgeler: jsonDiziString.nullish(),
  uzmanlikAlanlari: jsonDiziString.default('[]'),
  sira: z.number().int().min(0).max(9999).optional(),
  aktif: z.boolean().optional(),
})

export const ortakGuncelleSchema = ortakSchema.partial().extend({
  slug: ortakSchema.shape.slug.optional(),
})

export type OrtakGirdi = z.infer<typeof ortakSchema>
