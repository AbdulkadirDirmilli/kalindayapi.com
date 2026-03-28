import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - List all hizmetler
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    const hizmetler = await prisma.hizmet.findMany({
      include: {
        altHizmetler: { orderBy: { sira: 'asc' } },
        sss: { orderBy: { sira: 'asc' } },
        bolgeler: true,
      },
      orderBy: { sira: 'asc' },
    })

    return NextResponse.json(hizmetler)
  } catch (error) {
    console.error('Hizmet listesi hatasi:', error)
    return NextResponse.json(
      { error: 'Hizmetler yuklenirken hata olustu' },
      { status: 500 }
    )
  }
}

// POST - Create new hizmet
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    const body = await request.json()
    const { altHizmetler, sss, bolgeler, ...hizmetData } = body

    // Check if slug already exists
    const existingHizmet = await prisma.hizmet.findUnique({
      where: { slug: hizmetData.slug },
    })

    if (existingHizmet) {
      return NextResponse.json(
        { error: 'Bu slug zaten kullaniliyor' },
        { status: 400 }
      )
    }

    // Get next sira number
    const lastHizmet = await prisma.hizmet.findFirst({
      orderBy: { sira: 'desc' },
      select: { sira: true },
    })
    const nextSira = (lastHizmet?.sira || 0) + 1

    const hizmet = await prisma.hizmet.create({
      data: {
        ...hizmetData,
        sira: hizmetData.sira ?? nextSira,
        altHizmetler: altHizmetler
          ? {
              create: altHizmetler.map((h: Record<string, unknown>, i: number) => ({
                ...h,
                sira: i,
              })),
            }
          : undefined,
        sss: sss
          ? {
              create: sss.map((s: Record<string, unknown>, i: number) => ({
                ...s,
                sira: i,
              })),
            }
          : undefined,
        bolgeler: bolgeler
          ? {
              create: bolgeler.map((b: string) => ({ bolge: b })),
            }
          : undefined,
      },
      include: {
        altHizmetler: true,
        sss: true,
        bolgeler: true,
      },
    })

    return NextResponse.json(hizmet, { status: 201 })
  } catch (error) {
    console.error('Hizmet olusturma hatasi:', error)
    return NextResponse.json(
      { error: 'Hizmet olusturulurken hata olustu' },
      { status: 500 }
    )
  }
}
