import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Get single oncesi-sonrasi
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

    const proje = await prisma.oncesiSonrasi.findUnique({
      where: { id },
    })

    if (!proje) {
      return NextResponse.json({ error: 'Proje bulunamadi' }, { status: 404 })
    }

    return NextResponse.json(proje)
  } catch (error) {
    console.error('Oncesi-sonrasi getirme hatasi:', error)
    return NextResponse.json(
      { error: 'Proje yuklenirken hata olustu' },
      { status: 500 }
    )
  }
}

// PUT - Update oncesi-sonrasi
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

    // Check if proje exists
    const existingProje = await prisma.oncesiSonrasi.findUnique({
      where: { id },
    })

    if (!existingProje) {
      return NextResponse.json({ error: 'Proje bulunamadi' }, { status: 404 })
    }

    const proje = await prisma.oncesiSonrasi.update({
      where: { id },
      data: {
        baslik: body.baslik,
        kategori: body.kategori,
        konum: body.konum,
        oncesiFoto: body.oncesiFoto,
        sonrasiFoto: body.sonrasiFoto,
        sira: body.sira,
        aktif: body.aktif,
      },
    })

    return NextResponse.json(proje)
  } catch (error) {
    console.error('Oncesi-sonrasi guncelleme hatasi:', error)
    return NextResponse.json(
      { error: 'Proje guncellenirken hata olustu' },
      { status: 500 }
    )
  }
}

// DELETE - Delete oncesi-sonrasi
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

    await prisma.oncesiSonrasi.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Proje basariyla silindi' })
  } catch (error) {
    console.error('Oncesi-sonrasi silme hatasi:', error)
    return NextResponse.json(
      { error: 'Proje silinirken hata olustu' },
      { status: 500 }
    )
  }
}
