import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Public ilanlar listesi (veritabanından)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const kategori = searchParams.get('kategori')
    const tip = searchParams.get('tip')
    const konum = searchParams.get('konum')
    const minFiyat = searchParams.get('minFiyat')
    const maxFiyat = searchParams.get('maxFiyat')
    const search = searchParams.get('search')
    const oneCikan = searchParams.get('oneCikan')
    const eidsStatus = searchParams.get('eidsStatus')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      durum: 'aktif', // Sadece aktif ilanları göster
    }

    if (kategori) where.kategori = kategori
    if (tip) where.tip = tip
    if (oneCikan === 'true') where.oneCikan = true
    if (eidsStatus) where.eidsStatus = eidsStatus

    if (konum) {
      where.OR = [
        { ilce: { contains: konum } },
        { mahalle: { contains: konum } },
      ]
    }

    if (minFiyat) {
      where.fiyat = { ...where.fiyat, gte: parseInt(minFiyat) }
    }
    if (maxFiyat) {
      where.fiyat = { ...where.fiyat, lte: parseInt(maxFiyat) }
    }

    if (search) {
      where.AND = [
        {
          OR: [
            { baslik: { contains: search } },
            { aciklama: { contains: search } },
            { ilce: { contains: search } },
            { mahalle: { contains: search } },
          ],
        },
      ]
    }

    const [ilanlar, total] = await Promise.all([
      prisma.ilan.findMany({
        where,
        include: {
          fotograflar: {
            orderBy: { sira: 'asc' },
          },
        },
        orderBy: [
          { oneCikan: 'desc' },
          { createdAt: 'desc' },
        ],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.ilan.count({ where }),
    ])

    // Frontend için veri formatını dönüştür
    const formattedIlanlar = ilanlar.map((ilan) => ({
      id: ilan.id,
      baslik: ilan.baslik,
      slug: ilan.slug,
      kategori: ilan.kategori,
      tip: ilan.tip,
      fiyat: ilan.fiyat,
      paraBirimi: ilan.paraBirimi,
      konum: {
        il: ilan.il,
        ilce: ilan.ilce,
        mahalle: ilan.mahalle || '',
        koordinatlar: {
          lat: ilan.koordinatLat || 36.8384,
          lng: ilan.koordinatLng || 28.7667,
        },
      },
      ozellikler: {
        metrekare: ilan.metrekare || 0,
        odaSayisi: ilan.odaSayisi,
        banyoSayisi: ilan.banyoSayisi,
        kat: ilan.kat,
        toplamKat: ilan.toplamKat,
        binaYasi: ilan.binaYasi,
        isitma: ilan.isitma,
        esyali: ilan.esyali,
        balkon: ilan.balkon,
        asansor: ilan.asansor,
        otopark: ilan.otopark,
        guvenlik: ilan.guvenlik,
        havuz: ilan.havuz,
        bahce: ilan.bahce,
        bahceMetrekare: ilan.bahceMetrekare,
        imarDurumu: ilan.imarDurumu,
        gabari: ilan.gabari,
        yolCephesi: ilan.yolCephesi,
        altyapi: ilan.altyapi,
        insaatDurumu: ilan.insaatDurumu,
      },
      aciklama: ilan.aciklama,
      fotograflar: ilan.fotograflar.map((f) => f.url),
      oneCikan: ilan.oneCikan,
      eidsDogrulanmis: ilan.eidsDogrulanmis,
      yayinTarihi: ilan.yayinTarihi.toISOString(),
      guncellenmeTarihi: ilan.guncellenmeTarihi.toISOString(),
      durum: ilan.durum,
      insaatDurumu: ilan.insaatDurumu || null,
      ilanNo: ilan.ilanNo || '',
      eidsStatus: ilan.eidsStatus,
    }))

    return NextResponse.json({
      ilanlar: formattedIlanlar,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Public ilan listesi hatasi:', error)
    return NextResponse.json(
      { error: 'Ilanlar yuklenirken hata olustu' },
      { status: 500 }
    )
  }
}
