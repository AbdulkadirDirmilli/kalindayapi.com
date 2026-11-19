import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/** '["Ortaca","Dalyan"]' seklindeki JSON dizi stringini guvenle parse eder. */
function jsonDizi(deger: string | null | undefined): string[] {
  if (!deger) return []
  try {
    const parsed = JSON.parse(deger)
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

// GET - Yayindaki danismanlar (public)
export async function GET() {
  try {
    const danismanlar = await prisma.ortak.findMany({
      where: { aktif: true },
      orderBy: { sira: 'asc' },
      select: {
        id: true,
        slug: true,
        ad: true,
        unvan: true,
        telefon: true,
        whatsapp: true,
        email: true,
        biyografi: true,
        foto: true,
        cinsiyet: true,
        deneyimYili: true,
        bolgeler: true,
        uzmanlikAlanlari: true,
        sira: true,
        // Yalnizca yayindaki ilanlar sayilir
        _count: { select: { ilanlar: { where: { durum: 'aktif' } } } },
      },
    })

    return NextResponse.json({
      danismanlar: danismanlar.map((d) => ({
        ...d,
        bolgeler: jsonDizi(d.bolgeler),
        uzmanlikAlanlari: jsonDizi(d.uzmanlikAlanlari),
        aktifIlanSayisi: d._count.ilanlar,
        _count: undefined,
      })),
    })
  } catch (error) {
    console.error('Danismanlar alinamadi:', error)
    return NextResponse.json({ error: 'Danismanlar alinamadi' }, { status: 500 })
  }
}
