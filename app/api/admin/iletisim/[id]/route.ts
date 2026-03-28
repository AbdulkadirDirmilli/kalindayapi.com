import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Get single contact
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

    const contact = await prisma.contactForm.findUnique({
      where: { id },
    })

    if (!contact) {
      return NextResponse.json({ error: 'Mesaj bulunamadi' }, { status: 404 })
    }

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Contact getirme hatasi:', error)
    return NextResponse.json(
      { error: 'Mesaj yuklenirken hata olustu' },
      { status: 500 }
    )
  }
}

// PUT - Update contact status
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
    const { durum, notlar } = body

    const contact = await prisma.contactForm.update({
      where: { id },
      data: {
        durum,
        notlar,
      },
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Contact guncelleme hatasi:', error)
    return NextResponse.json(
      { error: 'Mesaj guncellenirken hata olustu' },
      { status: 500 }
    )
  }
}

// DELETE - Delete contact
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

    await prisma.contactForm.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Mesaj basariyla silindi' })
  } catch (error) {
    console.error('Contact silme hatasi:', error)
    return NextResponse.json(
      { error: 'Mesaj silinirken hata olustu' },
      { status: 500 }
    )
  }
}
