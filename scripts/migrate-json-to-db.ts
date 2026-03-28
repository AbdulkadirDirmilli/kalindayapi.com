/**
 * JSON to SQLite Migration Script
 *
 * Bu script mevcut JSON verilerini SQLite veritabanina aktarir.
 * Calistirmak icin: npm run db:migrate
 */

import 'dotenv/config'
import bcrypt from 'bcryptjs'
import * as fs from 'fs'
import * as path from 'path'

// Dynamic import for Prisma client with adapter
async function createPrismaClient() {
  const { PrismaClient } = await import('../lib/generated/prisma/client.js')
  const { PrismaLibSQL } = await import('@prisma/adapter-libsql')
  const { createClient } = await import('@libsql/client')

  const libsql = createClient({
    url: process.env.DATABASE_URL || 'file:./prisma/dev.db',
  })

  const adapter = new PrismaLibSQL(libsql)
  return new PrismaClient({ adapter })
}

// Read JSON files
const dataDir = path.join(process.cwd(), 'data')
const ilanlarJson = JSON.parse(
  fs.readFileSync(path.join(dataDir, 'ilanlar.json'), 'utf-8')
)
const hizmetlerJson = JSON.parse(
  fs.readFileSync(path.join(dataDir, 'hizmetler.json'), 'utf-8')
)

interface IlanJson {
  id: string
  baslik: string
  slug: string
  kategori: string
  tip: string
  fiyat: number
  paraBirimi: string
  konum: {
    il: string
    ilce: string
    mahalle?: string
    koordinatlar?: {
      lat: number
      lng: number
    }
  }
  ozellikler: {
    metrekare?: number
    odaSayisi?: string
    banyoSayisi?: number
    kat?: number
    toplamKat?: number
    binaYasi?: number
    isitma?: string
    esyali?: boolean
    balkon?: boolean
    asansor?: boolean
    otopark?: boolean
    guvenlik?: boolean
    havuz?: boolean
    bahce?: boolean
    bahceMetrekare?: number
    imarDurumu?: string
    gabari?: string
    yolCephesi?: number
    altyapi?: boolean
  }
  aciklama: string
  fotograflar: string[]
  oneCikan: boolean
  yayinTarihi: string
  guncellenmeTarihi: string
  durum: string
  ilanNo: string
}

interface HizmetJson {
  id: string
  slug: string
  baslik: string
  kisaAciklama: string
  uzunAciklama: string
  ikon: string
  altHizmetler: {
    baslik: string
    aciklama: string
    ikon: string
  }[]
  bolge: string[]
  sss: {
    soru: string
    cevap: string
  }[]
}

interface OrtakJson {
  id: string
  ad: string
  unvan: string
  telefon: string
  whatsapp?: string
  email?: string
  biyografi?: string
  uzmanlikAlanlari: string[]
  foto?: string
}

async function main() {
  console.log('='.repeat(50))
  console.log('Kalinda Yapi - JSON to SQLite Migration')
  console.log('='.repeat(50))
  console.log('')

  const prisma = await createPrismaClient()

  try {
    // Migrate Admin User
    console.log('Admin kullanici olusturuluyor...')
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@kalindayapi.com' },
    })

    if (existingAdmin) {
      console.log('  - Admin kullanici zaten mevcut, atlaniyor.')
    } else {
      const password = process.env.ADMIN_DEFAULT_PASSWORD || 'KalindaYapi2024!'
      const hashedPassword = await bcrypt.hash(password, 10)

      await prisma.user.create({
        data: {
          email: 'admin@kalindayapi.com',
          hashedPassword,
          name: 'Admin',
          role: 'admin',
        },
      })
      console.log('  + Admin kullanici olusturuldu: admin@kalindayapi.com')
    }
    console.log('')

    // Migrate Ilanlar
    console.log('Ilanlar migrate ediliyor...')
    const ilanlar: IlanJson[] = ilanlarJson.ilanlar

    for (const ilan of ilanlar) {
      const existingIlan = await prisma.ilan.findUnique({
        where: { slug: ilan.slug },
      })

      if (existingIlan) {
        console.log(`  - ${ilan.baslik} zaten mevcut, atlaniyor.`)
        continue
      }

      await prisma.ilan.create({
        data: {
          baslik: ilan.baslik,
          slug: ilan.slug,
          kategori: ilan.kategori,
          tip: ilan.tip,
          fiyat: ilan.fiyat,
          paraBirimi: ilan.paraBirimi,
          il: ilan.konum.il,
          ilce: ilan.konum.ilce,
          mahalle: ilan.konum.mahalle,
          koordinatLat: ilan.konum.koordinatlar?.lat,
          koordinatLng: ilan.konum.koordinatlar?.lng,
          metrekare: ilan.ozellikler.metrekare,
          odaSayisi: ilan.ozellikler.odaSayisi,
          banyoSayisi: ilan.ozellikler.banyoSayisi,
          kat: ilan.ozellikler.kat,
          toplamKat: ilan.ozellikler.toplamKat,
          binaYasi: ilan.ozellikler.binaYasi,
          isitma: ilan.ozellikler.isitma,
          esyali: ilan.ozellikler.esyali || false,
          balkon: ilan.ozellikler.balkon || false,
          asansor: ilan.ozellikler.asansor || false,
          otopark: ilan.ozellikler.otopark || false,
          guvenlik: ilan.ozellikler.guvenlik || false,
          havuz: ilan.ozellikler.havuz || false,
          bahce: ilan.ozellikler.bahce || false,
          bahceMetrekare: ilan.ozellikler.bahceMetrekare,
          imarDurumu: ilan.ozellikler.imarDurumu,
          gabari: ilan.ozellikler.gabari,
          yolCephesi: ilan.ozellikler.yolCephesi,
          altyapi: ilan.ozellikler.altyapi || false,
          aciklama: ilan.aciklama,
          oneCikan: ilan.oneCikan,
          durum: ilan.durum,
          ilanNo: ilan.ilanNo,
          yayinTarihi: new Date(ilan.yayinTarihi),
          fotograflar: {
            create: ilan.fotograflar.map((url, index) => ({
              url,
              sira: index,
            })),
          },
        },
      })

      console.log(`  + ${ilan.baslik} eklendi.`)
    }
    console.log('')

    // Migrate Hizmetler
    console.log('Hizmetler migrate ediliyor...')
    const hizmetler: HizmetJson[] = hizmetlerJson.hizmetler

    for (let i = 0; i < hizmetler.length; i++) {
      const hizmet = hizmetler[i]

      const existingHizmet = await prisma.hizmet.findUnique({
        where: { slug: hizmet.slug },
      })

      if (existingHizmet) {
        console.log(`  - ${hizmet.baslik} zaten mevcut, atlaniyor.`)
        continue
      }

      await prisma.hizmet.create({
        data: {
          slug: hizmet.slug,
          baslik: hizmet.baslik,
          kisaAciklama: hizmet.kisaAciklama,
          uzunAciklama: hizmet.uzunAciklama,
          ikon: hizmet.ikon,
          sira: i,
          altHizmetler: {
            create: hizmet.altHizmetler.map((alt, index) => ({
              baslik: alt.baslik,
              aciklama: alt.aciklama,
              ikon: alt.ikon,
              sira: index,
            })),
          },
          sss: {
            create: hizmet.sss.map((s, index) => ({
              soru: s.soru,
              cevap: s.cevap,
              sira: index,
            })),
          },
          bolgeler: {
            create: hizmet.bolge.map((b) => ({ bolge: b })),
          },
        },
      })

      console.log(`  + ${hizmet.baslik} eklendi.`)
    }
    console.log('')

    // Migrate Ortaklar
    console.log('Ortaklar migrate ediliyor...')
    const ortaklar: OrtakJson[] = hizmetlerJson.ortaklar

    for (let i = 0; i < ortaklar.length; i++) {
      const ortak = ortaklar[i]
      const slug = ortak.id

      const existingOrtak = await prisma.ortak.findUnique({
        where: { slug },
      })

      if (existingOrtak) {
        console.log(`  - ${ortak.ad} zaten mevcut, atlaniyor.`)
        continue
      }

      await prisma.ortak.create({
        data: {
          slug,
          ad: ortak.ad,
          unvan: ortak.unvan,
          telefon: ortak.telefon,
          whatsapp: ortak.whatsapp,
          email: ortak.email,
          biyografi: ortak.biyografi,
          foto: ortak.foto,
          uzmanlikAlanlari: JSON.stringify(ortak.uzmanlikAlanlari),
          sira: i,
        },
      })

      console.log(`  + ${ortak.ad} eklendi.`)
    }
    console.log('')

    console.log('='.repeat(50))
    console.log('Migrasyon tamamlandi!')
    console.log('='.repeat(50))
    console.log('')
    console.log('Admin giris bilgileri:')
    console.log('  Email: admin@kalindayapi.com')
    console.log('  Sifre: KalindaYapi2024!')
    console.log('')
  } catch (error) {
    console.error('Migrasyon hatasi:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
