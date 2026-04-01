import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ilanSchema } from '@/lib/validations/ilan'
import { normalizeTurkishJsonArray, normalizeTurkishText } from '@/lib/utils'

// GET - List all ilanlar with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const kategori = searchParams.get('kategori')
    const tip = searchParams.get('tip')
    const durum = searchParams.get('durum')
    const search = searchParams.get('search')

    const where: Record<string, unknown> = {}

    if (kategori) where.kategori = kategori
    if (tip) where.tip = tip
    if (durum) where.durum = durum
    if (search) {
      where.OR = [
        { baslik: { contains: search } },
        { aciklama: { contains: search } },
        { ilanNo: { contains: search } },
      ]
    }

    const [ilanlar, total] = await Promise.all([
      prisma.ilan.findMany({
        where,
        include: {
          fotograflar: {
            orderBy: { sira: 'asc' },
            take: 1,
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.ilan.count({ where }),
    ])

    return NextResponse.json({
      ilanlar,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Ilan listesi hatasi:', error)
    return NextResponse.json(
      { error: 'Ilanlar yuklenirken hata olustu' },
      { status: 500 }
    )
  }
}

// POST - Create new ilan
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    const body = await request.json()
    console.log('Gelen veri:', JSON.stringify(body, null, 2))
    const validatedData = ilanSchema.parse(body)
    console.log('Validated veri:', JSON.stringify(validatedData, null, 2))

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

    // Check if slug already exists
    const existingIlan = await prisma.ilan.findUnique({
      where: { slug: ilanData.slug },
    })

    if (existingIlan) {
      return NextResponse.json(
        { error: 'Bu slug zaten kullaniliyor' },
        { status: 400 }
      )
    }

    // Generate ilanNo
    const lastIlan = await prisma.ilan.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { ilanNo: true },
    })

    let newIlanNo = 'KY-2024-001'
    if (lastIlan?.ilanNo) {
      const lastNumber = parseInt(lastIlan.ilanNo.split('-')[2])
      newIlanNo = `KY-2024-${String(lastNumber + 1).padStart(3, '0')}`
    }

    const ilan = await prisma.ilan.create({
      data: {
        ...ilanData,
        ilanNo: ilanData.ilanNo || newIlanNo,
        fotograflar: fotograflar
          ? {
              create: fotograflar.map((url, index) => ({
                url,
                sira: index,
              })),
            }
          : undefined,
      },
      include: {
        fotograflar: true,
      },
    })

    return NextResponse.json(ilan, { status: 201 })
  } catch (error) {
    console.error('Ilan olusturma hatasi:', error)
    console.error('Hata tipi:', error?.constructor?.name)
    console.error('Hata detay:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2))

    // Zod validation error
    if (error && typeof error === 'object' && 'issues' in error) {
      const zodError = error as { issues?: { path: (string | number)[]; message: string }[] }
      const errorDetails = zodError.issues?.map(e => `${e.path.join('.')}: ${e.message}`).join(', ') || 'Bilinmeyen validasyon hatası'
      return NextResponse.json(
        { error: 'Gecersiz veri', details: errorDetails },
        { status: 400 }
      )
    }

    // Prisma or other errors
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
    return NextResponse.json(
      { error: 'Ilan olusturulurken hata olustu', details: errorMessage },
      { status: 500 }
    )
  }
}
