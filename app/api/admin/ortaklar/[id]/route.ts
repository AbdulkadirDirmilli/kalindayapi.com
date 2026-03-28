import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Get single ortak
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

    const ortak = await prisma.ortak.findUnique({
      where: { id },
    })

    if (!ortak) {
      return NextResponse.json({ error: 'Ortak bulunamadi' }, { status: 404 })
    }

    return NextResponse.json(ortak)
  } catch (error) {
    console.error('Ortak getirme hatasi:', error)
    return NextResponse.json(
      { error: 'Ortak yuklenirken hata olustu' },
      { status: 500 }
    )
  }
}

// PUT - Update ortak
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

    // Check if ortak exists
    const existingOrtak = await prisma.ortak.findUnique({
      where: { id },
    })

    if (!existingOrtak) {
      return NextResponse.json({ error: 'Ortak bulunamadi' }, { status: 404 })
    }

    // Check if slug is already used by another ortak
    if (body.slug && body.slug !== existingOrtak.slug) {
      const slugExists = await prisma.ortak.findUnique({
        where: { slug: body.slug },
      })
      if (slugExists) {
        return NextResponse.json(
          { error: 'Bu slug zaten kullaniliyor' },
          { status: 400 }
        )
      }
    }

    const ortak = await prisma.ortak.update({
      where: { id },
      data: {
        ...body,
        uzmanlikAlanlari:
          typeof body.uzmanlikAlanlari === 'string'
            ? body.uzmanlikAlanlari
            : JSON.stringify(body.uzmanlikAlanlari || []),
      },
    })

    return NextResponse.json(ortak)
  } catch (error) {
    console.error('Ortak guncelleme hatasi:', error)
    return NextResponse.json(
      { error: 'Ortak guncellenirken hata olustu' },
      { status: 500 }
    )
  }
}

// DELETE - Delete ortak
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

    await prisma.ortak.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Ortak basariyla silindi' })
  } catch (error) {
    console.error('Ortak silme hatasi:', error)
    return NextResponse.json(
      { error: 'Ortak silinirken hata olustu' },
      { status: 500 }
    )
  }
}
