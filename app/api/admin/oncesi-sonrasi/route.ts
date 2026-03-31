import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - List all oncesi-sonrasi (admin)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    const projeler = await prisma.oncesiSonrasi.findMany({
      orderBy: { sira: 'asc' },
    })

    return NextResponse.json(projeler)
  } catch (error) {
    console.error('Oncesi-sonrasi listesi hatasi:', error)
    return NextResponse.json(
      { error: 'Projeler yuklenirken hata olustu' },
      { status: 500 }
    )
  }
}

// POST - Create new oncesi-sonrasi
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    const body = await request.json()

    // Get next sira
    const lastProje = await prisma.oncesiSonrasi.findFirst({
      orderBy: { sira: 'desc' },
      select: { sira: true },
    })
    const nextSira = (lastProje?.sira || 0) + 1

    const proje = await prisma.oncesiSonrasi.create({
      data: {
        baslik: body.baslik,
        kategori: body.kategori || null,
        konum: body.konum || null,
        oncesiFoto: body.oncesiFoto,
        sonrasiFoto: body.sonrasiFoto,
        sira: body.sira ?? nextSira,
        aktif: body.aktif ?? true,
      },
    })

    return NextResponse.json(proje, { status: 201 })
  } catch (error) {
    console.error('Oncesi-sonrasi olusturma hatasi:', error)
    return NextResponse.json(
      { error: 'Proje olusturulurken hata olustu' },
      { status: 500 }
    )
  }
}
