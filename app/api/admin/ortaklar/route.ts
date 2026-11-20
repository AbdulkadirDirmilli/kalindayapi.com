import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ortakSchema } from '@/lib/validations/ortak'
import { revalidateDanismanSayfalari } from '@/lib/revalidate-danismanlar'

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

    const parsed = ortakSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Gecersiz veri' },
        { status: 400 }
      )
    }
    const { sira, email, ...veri } = parsed.data

    const mevcut = await prisma.ortak.findUnique({ where: { slug: veri.slug } })
    if (mevcut) {
      return NextResponse.json(
        { error: 'Bu slug zaten kullaniliyor' },
        { status: 400 }
      )
    }

    // Sira verilmediyse listenin sonuna eklenir
    const sonuncu = await prisma.ortak.findFirst({
      orderBy: { sira: 'desc' },
      select: { sira: true },
    })

    const ortak = await prisma.ortak.create({
      data: {
        ...veri,
        email: email || null,
        sira: sira ?? (sonuncu?.sira ?? -1) + 1,
      },
    })

    revalidateDanismanSayfalari()

    return NextResponse.json(ortak, { status: 201 })
  } catch (error) {
    console.error('Ortak olusturma hatasi:', error)
    return NextResponse.json(
      { error: 'Ortak olusturulurken hata olustu' },
      { status: 500 }
    )
  }
}
