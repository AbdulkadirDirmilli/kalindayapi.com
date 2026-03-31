/**
 * Prisma Seed Script
 * JSON verilerini SQLite veritabanina aktarir
 */

import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'
import * as fs from 'fs'
import * as path from 'path'

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
  console.log('Seeding database...')

  // Create admin user
  const password = process.env.ADMIN_DEFAULT_PASSWORD || 'KalindaYapi2024!'
  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.upsert({
    where: { email: 'admin@kalindayapi.com' },
    update: {},
    create: {
      email: 'admin@kalindayapi.com',
      hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  })
  console.log('Admin user created')

  // Seed ilanlar
  const ilanlar: IlanJson[] = ilanlarJson.ilanlar
  for (const ilan of ilanlar) {
    await prisma.ilan.upsert({
      where: { slug: ilan.slug },
      update: {},
      create: {
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
  }
  console.log(`${ilanlar.length} ilanlar seeded`)

  // Seed hizmetler
  const hizmetler: HizmetJson[] = hizmetlerJson.hizmetler
  for (let i = 0; i < hizmetler.length; i++) {
    const hizmet = hizmetler[i]
    await prisma.hizmet.upsert({
      where: { slug: hizmet.slug },
      update: {},
      create: {
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
  }
  console.log(`${hizmetler.length} hizmetler seeded`)

  // Seed ortaklar
  const ortaklar: OrtakJson[] = hizmetlerJson.ortaklar
  for (let i = 0; i < ortaklar.length; i++) {
    const ortak = ortaklar[i]
    await prisma.ortak.upsert({
      where: { slug: ortak.id },
      update: {},
      create: {
        slug: ortak.id,
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
  }
  console.log(`${ortaklar.length} ortaklar seeded`)

  // Seed Oncesi-Sonrasi Galerisi
  const oncesiSonrasiProjeler = [
    {
      baslik: "Villa Projesi - Dalyan",
      kategori: "İnşaat",
      konum: "Dalyan, Ortaca",
      oncesiFoto: "/images/projects/villa-oncesi.jpg",
      sonrasiFoto: "/images/projects/villa-sonrasi.jpg",
      sira: 0,
    },
    {
      baslik: "Mutfak Yenileme - Ortaca",
      kategori: "Tadilat",
      konum: "Ortaca Merkez",
      oncesiFoto: "/images/projects/mutfak-oncesi.jpg",
      sonrasiFoto: "/images/projects/mutfak-sonrasi.jpg",
      sira: 1,
    },
    {
      baslik: "Daire Renovasyonu - Köyceğiz",
      kategori: "Tadilat",
      konum: "Köyceğiz Merkez",
      oncesiFoto: "/images/projects/daire-oncesi.jpg",
      sonrasiFoto: "/images/projects/daire-sonrasi.jpg",
      sira: 2,
    },
    {
      baslik: "Bahçeli Ev - Dalaman",
      kategori: "İnşaat",
      konum: "Dalaman",
      oncesiFoto: "/images/projects/bahce-oncesi.jpg",
      sonrasiFoto: "/images/projects/bahce-sonrasi.jpg",
      sira: 3,
    },
    {
      baslik: "Banyo Yenileme - Ortaca",
      kategori: "Tadilat",
      konum: "Ortaca Merkez",
      oncesiFoto: "/images/projects/banyo-oncesi.jpg",
      sonrasiFoto: "/images/projects/banyo-sonrasi.jpg",
      sira: 4,
    },
  ]

  // Check if any oncesi-sonrasi exists
  const existingCount = await prisma.oncesiSonrasi.count()
  if (existingCount === 0) {
    for (const proje of oncesiSonrasiProjeler) {
      await prisma.oncesiSonrasi.create({
        data: proje,
      })
    }
    console.log(`${oncesiSonrasiProjeler.length} oncesi-sonrasi projeler seeded`)
  } else {
    console.log(`Oncesi-sonrasi projeler already exist (${existingCount}), skipping...`)
  }

  console.log('Database seeded successfully!')
  console.log('')
  console.log('Admin login:')
  console.log('  Email: admin@kalindayapi.com')
  console.log('  Password: Kalindayapi2026+-!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
