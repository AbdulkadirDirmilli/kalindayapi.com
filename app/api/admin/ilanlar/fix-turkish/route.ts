import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { normalizeTurkishJsonArray, normalizeTurkishText } from '@/lib/utils'

// POST - Mevcut ilanlardaki Türkçe karakter hatalarını düzelt
export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const ilanlar = await prisma.ilan.findMany()
    let fixedCount = 0

    for (const ilan of ilanlar) {
      const updates: Record<string, string | null> = {}

      // JSON array alanlarını düzelt
      const jsonFields = [
        'icOzellikler',
        'disOzellikler',
        'muhitOzellikleri',
        'guvenlikOzellikleri',
        'cephe',
        'manzara',
      ] as const

      for (const field of jsonFields) {
        const value = ilan[field]
        if (value) {
          const normalized = normalizeTurkishJsonArray(value)
          if (normalized && normalized !== value) {
            updates[field] = normalized
          }
        }
      }

      // Konum alanlarını düzelt
      const normalizedIl = normalizeTurkishText(ilan.il)
      if (normalizedIl !== ilan.il) {
        updates.il = normalizedIl
      }

      const normalizedIlce = normalizeTurkishText(ilan.ilce)
      if (normalizedIlce !== ilan.ilce) {
        updates.ilce = normalizedIlce
      }

      if (ilan.mahalle) {
        const normalizedMahalle = normalizeTurkishText(ilan.mahalle)
        if (normalizedMahalle !== ilan.mahalle) {
          updates.mahalle = normalizedMahalle
        }
      }

      if (Object.keys(updates).length > 0) {
        await prisma.ilan.update({
          where: { id: ilan.id },
          data: updates,
        })
        fixedCount++
      }
    }

    return NextResponse.json({
      message: `${fixedCount} ilan düzeltildi (toplam ${ilanlar.length} ilan kontrol edildi)`,
      fixedCount,
      totalChecked: ilanlar.length,
    })
  } catch (error) {
    console.error('Türkçe karakter düzeltme hatası:', error)
    return NextResponse.json(
      { error: 'Düzeltme işlemi sırasında hata oluştu' },
      { status: 500 }
    )
  }
}
