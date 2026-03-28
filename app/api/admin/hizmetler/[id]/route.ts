import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Get single hizmet
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

    const hizmet = await prisma.hizmet.findUnique({
      where: { id },
      include: {
        altHizmetler: { orderBy: { sira: 'asc' } },
        sss: { orderBy: { sira: 'asc' } },
        bolgeler: true,
      },
    })

    if (!hizmet) {
      return NextResponse.json({ error: 'Hizmet bulunamadi' }, { status: 404 })
    }

    return NextResponse.json(hizmet)
  } catch (error) {
    console.error('Hizmet getirme hatasi:', error)
    return NextResponse.json(
      { error: 'Hizmet yuklenirken hata olustu' },
      { status: 500 }
    )
  }
}

// PUT - Update hizmet
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
    const { altHizmetler, sss, bolgeler, ...hizmetData } = body

    // Check if hizmet exists
    const existingHizmet = await prisma.hizmet.findUnique({
      where: { id },
    })

    if (!existingHizmet) {
      return NextResponse.json({ error: 'Hizmet bulunamadi' }, { status: 404 })
    }

    // Check if slug is already used by another hizmet
    if (hizmetData.slug && hizmetData.slug !== existingHizmet.slug) {
      const slugExists = await prisma.hizmet.findUnique({
        where: { slug: hizmetData.slug },
      })
      if (slugExists) {
        return NextResponse.json(
          { error: 'Bu slug zaten kullaniliyor' },
          { status: 400 }
        )
      }
    }

    // Update hizmet
    const hizmet = await prisma.hizmet.update({
      where: { id },
      data: hizmetData,
    })

    // Update alt hizmetler if provided
    if (altHizmetler !== undefined) {
      await prisma.altHizmet.deleteMany({ where: { hizmetId: id } })
      if (altHizmetler.length > 0) {
        await prisma.altHizmet.createMany({
          data: altHizmetler.map((h: Record<string, unknown>, i: number) => ({
            hizmetId: id,
            baslik: h.baslik as string,
            aciklama: h.aciklama as string,
            ikon: h.ikon as string,
            sira: i,
          })),
        })
      }
    }

    // Update SSS if provided
    if (sss !== undefined) {
      await prisma.hizmetSSS.deleteMany({ where: { hizmetId: id } })
      if (sss.length > 0) {
        await prisma.hizmetSSS.createMany({
          data: sss.map((s: Record<string, unknown>, i: number) => ({
            hizmetId: id,
            soru: s.soru as string,
            cevap: s.cevap as string,
            sira: i,
          })),
        })
      }
    }

    // Update bolgeler if provided
    if (bolgeler !== undefined) {
      await prisma.hizmetBolge.deleteMany({ where: { hizmetId: id } })
      if (bolgeler.length > 0) {
        await prisma.hizmetBolge.createMany({
          data: bolgeler.map((b: string) => ({
            hizmetId: id,
            bolge: b,
          })),
        })
      }
    }

    // Refetch with relations
    const updatedHizmet = await prisma.hizmet.findUnique({
      where: { id },
      include: {
        altHizmetler: { orderBy: { sira: 'asc' } },
        sss: { orderBy: { sira: 'asc' } },
        bolgeler: true,
      },
    })

    return NextResponse.json(updatedHizmet)
  } catch (error) {
    console.error('Hizmet guncelleme hatasi:', error)
    return NextResponse.json(
      { error: 'Hizmet guncellenirken hata olustu' },
      { status: 500 }
    )
  }
}

// DELETE - Delete hizmet
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

    // Check if hizmet exists
    const existingHizmet = await prisma.hizmet.findUnique({
      where: { id },
    })

    if (!existingHizmet) {
      return NextResponse.json({ error: 'Hizmet bulunamadi' }, { status: 404 })
    }

    // Delete hizmet (relations will be cascade deleted)
    await prisma.hizmet.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Hizmet basariyla silindi' })
  } catch (error) {
    console.error('Hizmet silme hatasi:', error)
    return NextResponse.json(
      { error: 'Hizmet silinirken hata olustu' },
      { status: 500 }
    )
  }
}
