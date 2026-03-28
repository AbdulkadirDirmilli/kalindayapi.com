import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - List all ortaklar
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    const ortaklar = await prisma.ortak.findMany({
      orderBy: { sira: 'asc' },
    })

    return NextResponse.json(ortaklar)
  } catch (error) {
    console.error('Ortak listesi hatasi:', error)
    return NextResponse.json(
      { error: 'Ortaklar yuklenirken hata olustu' },
      { status: 500 }
    )
  }
}

// POST - Create new ortak
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    const body = await request.json()

    // Check if slug already exists
    const existingOrtak = await prisma.ortak.findUnique({
      where: { slug: body.slug },
    })

    if (existingOrtak) {
      return NextResponse.json(
        { error: 'Bu slug zaten kullaniliyor' },
        { status: 400 }
      )
    }

    // Get next sira
    const lastOrtak = await prisma.ortak.findFirst({
      orderBy: { sira: 'desc' },
      select: { sira: true },
    })
    const nextSira = (lastOrtak?.sira || 0) + 1

    const ortak = await prisma.ortak.create({
      data: {
        ...body,
        sira: body.sira ?? nextSira,
        uzmanlikAlanlari:
          typeof body.uzmanlikAlanlari === 'string'
            ? body.uzmanlikAlanlari
            : JSON.stringify(body.uzmanlikAlanlari || []),
      },
    })

    return NextResponse.json(ortak, { status: 201 })
  } catch (error) {
    console.error('Ortak olusturma hatasi:', error)
    return NextResponse.json(
      { error: 'Ortak olusturulurken hata olustu' },
      { status: 500 }
    )
  }
}
