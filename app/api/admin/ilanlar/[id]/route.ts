import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ilanUpdateSchema } from '@/lib/validations/ilan'
import { normalizeTurkishJsonArray, normalizeTurkishText } from '@/lib/utils'

// GET - Get single ilan
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    const { id } = await params

    const ilan = await prisma.ilan.findUnique({
      where: { id },
      include: {
        fotograflar: {
          orderBy: { sira: 'asc' },
        },
      },
    })

    if (!ilan) {
      return NextResponse.json({ error: 'Ilan bulunamadi' }, { status: 404 })
    }

    return NextResponse.json(ilan)
  } catch (error) {
    console.error('Ilan getirme hatasi:', error)
    return NextResponse.json(
      { error: 'Ilan yuklenirken hata olustu' },
      { status: 500 }
    )
  }
}

// PUT - Update ilan
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const validatedData = ilanUpdateSchema.parse(body)

    const { fotograflar, ...ilanData } = validatedData

    // Türkçe karakter düzeltmesi
    if (ilanData.icOzellikler) ilanData.icOzellikler = normalizeTurkishJsonArray(ilanData.icOzellikler) ?? ilanData.icOzellikler
    if (ilanData.disOzellikler) ilanData.disOzellikler = normalizeTurkishJsonArray(ilanData.disOzellikler) ?? ilanData.disOzellikler
    if (ilanData.muhitOzellikleri) ilanData.muhitOzellikleri = normalizeTurkishJsonArray(ilanData.muhitOzellikleri) ?? ilanData.muhitOzellikleri
    if (ilanData.guvenlikOzellikleri) ilanData.guvenlikOzellikleri = normalizeTurkishJsonArray(ilanData.guvenlikOzellikleri) ?? ilanData.guvenlikOzellikleri
    if (ilanData.cephe) ilanData.cephe = normalizeTurkishJsonArray(ilanData.cephe) ?? ilanData.cephe
    if (ilanData.manzara) ilanData.manzara = normalizeTurkishJsonArray(ilanData.manzara) ?? ilanData.manzara
    if (ilanData.il) ilanData.il = normalizeTurkishText(ilanData.il)
    if (ilanData.ilce) ilanData.ilce = normalizeTurkishText(ilanData.ilce)

    // Check if ilan exists
    const existingIlan = await prisma.ilan.findUnique({
      where: { id },
    })

    if (!existingIlan) {
      return NextResponse.json({ error: 'Ilan bulunamadi' }, { status: 404 })
    }

    // Check if slug is already used by another ilan
    if (ilanData.slug && ilanData.slug !== existingIlan.slug) {
      const slugExists = await prisma.ilan.findUnique({
        where: { slug: ilanData.slug },
      })
      if (slugExists) {
        return NextResponse.json(
          { error: 'Bu slug zaten kullaniliyor' },
          { status: 400 }
        )
      }
    }

    // Update ilan
    const ilan = await prisma.ilan.update({
      where: { id },
      data: ilanData,
      include: {
        fotograflar: {
          orderBy: { sira: 'asc' },
        },
      },
    })

    // If fotograflar provided, update them
    if (fotograflar !== undefined) {
      // Delete existing photos
      await prisma.ilanFoto.deleteMany({
        where: { ilanId: id },
      })

      // Create new photos
      if (fotograflar.length > 0) {
        await prisma.ilanFoto.createMany({
          data: fotograflar.map((url, index) => ({
            ilanId: id,
            url,
            sira: index,
          })),
        })
      }

      // Refetch with updated photos
      const updatedIlan = await prisma.ilan.findUnique({
        where: { id },
        include: {
          fotograflar: {
            orderBy: { sira: 'asc' },
          },
        },
      })

      return NextResponse.json(updatedIlan)
    }

    return NextResponse.json(ilan)
  } catch (error) {
    console.error('Ilan guncelleme hatasi:', error)
    if (error instanceof Error && error.name === 'ZodError') {
      // Zod hatası detaylarını düzgün formatlayalım
      const zodError = error as { errors?: { path: (string | number)[]; message: string }[] }
      const errorDetails = zodError.errors?.map(e => `${e.path.join('.')}: ${e.message}`).join(', ') || 'Bilinmeyen validasyon hatası'
      return NextResponse.json(
        { error: 'Gecersiz veri', details: errorDetails },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Ilan guncellenirken hata olustu' },
      { status: 500 }
    )
  }
}

// DELETE - Delete ilan
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    const { id } = await params

    // Check if ilan exists
    const existingIlan = await prisma.ilan.findUnique({
      where: { id },
    })

    if (!existingIlan) {
      return NextResponse.json({ error: 'Ilan bulunamadi' }, { status: 404 })
    }

    // Delete ilan (photos will be cascade deleted)
    await prisma.ilan.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Ilan basariyla silindi' })
  } catch (error) {
    console.error('Ilan silme hatasi:', error)
    return NextResponse.json(
      { error: 'Ilan silinirken hata olustu' },
      { status: 500 }
    )
  }
}
