import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Tek ilan detayı (slug ile)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const ilan = await prisma.ilan.findUnique({
      where: { slug },
      include: {
        fotograflar: {
          orderBy: { sira: 'asc' },
        },
        danisman: true,
      },
    })

    if (!ilan) {
      return NextResponse.json(
        { error: 'Ilan bulunamadi' },
        { status: 404 }
      )
    }

    // Sadece aktif ilanları göster
    if (ilan.durum !== 'aktif') {
      return NextResponse.json(
        { error: 'Bu ilan artik aktif degil' },
        { status: 404 }
      )
    }

    // Frontend formatına dönüştür
    const formattedIlan = {
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
      },
      aciklama: ilan.aciklama,
      fotograflar: ilan.fotograflar.map((f) => f.url),
      videoUrl: ilan.videoUrl,
      oneCikan: ilan.oneCikan,
      yayinTarihi: ilan.yayinTarihi.toISOString(),
      guncellenmeTarihi: ilan.guncellenmeTarihi.toISOString(),
      durum: ilan.durum,
      insaatDurumu: ilan.insaatDurumu || null,
      ilanNo: ilan.ilanNo || '',
      danisman: ilan.danisman ? {
        id: ilan.danisman.id,
        ad: ilan.danisman.ad,
        unvan: ilan.danisman.unvan,
        telefon: ilan.danisman.telefon,
        whatsapp: ilan.danisman.whatsapp,
        email: ilan.danisman.email,
        foto: ilan.danisman.foto,
      } : null,
    }

    return NextResponse.json(formattedIlan)
  } catch (error) {
    console.error('Ilan detay hatasi:', error)
    return NextResponse.json(
      { error: 'Ilan yuklenirken hata olustu' },
      { status: 500 }
    )
  }
}
