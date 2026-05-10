import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Public blog posts listesi (veritabanından, dil destekli)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const kategori = searchParams.get('kategori')
    const search = searchParams.get('search')
    const lang = searchParams.get('lang') || 'tr'

    const where: Record<string, unknown> = {
      aktif: true,
    }

    if (kategori && kategori !== 'Tümü') {
      where.kategori = kategori
    }

    // Arama için translation tablosunu sorgula
    if (search) {
      where.translations = {
        some: {
          language: lang,
          OR: [
            { baslik: { contains: search } },
            { ozet: { contains: search } },
          ],
        },
      }
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          translations: {
            where: { status: 'published' },
          },
        },
        orderBy: { yayinTarihi: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ])

    // Format posts with fallback to Turkish
    const formattedPosts = posts.map(post => {
      // Önce istenen dili dene, sonra Türkçe'ye fallback yap
      const translation = post.translations.find(t => t.language === lang)
        || post.translations.find(t => t.language === 'tr')

      // Hiç çeviri yoksa bu postu atla
      if (!translation) {
        return null
      }

      return {
        id: post.id,
        slug: translation.slug || post.originalSlug,
        baslik: translation.baslik || '',
        ozet: translation.ozet || '',
        kategori: post.kategori,
        yazar: post.yazar,
        kapakGorsel: post.kapakGorsel,
        yayinTarihi: post.yayinTarihi.toISOString(),
        etiketler: translation.etiketler ? JSON.parse(translation.etiketler) : [],
        okunmaSuresi: Math.ceil((translation.icerik?.length || 1000) / 1000),
      }
    }).filter(Boolean)

    return NextResponse.json({
      yazilar: formattedPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Blog listesi hatası:', error)

    // Hata durumunda JSON dosyasına fallback
    try {
      const fs = await import('fs')
      const path = await import('path')
      const jsonPath = path.join(process.cwd(), 'data', 'blog-posts.json')
      const jsonContent = fs.readFileSync(jsonPath, 'utf-8')
      const blogData = JSON.parse(jsonContent)

      return NextResponse.json({
        yazilar: blogData.yazilar,
        pagination: {
          page: 1,
          limit: 12,
          total: blogData.yazilar.length,
          totalPages: 1,
        },
        source: 'json-fallback',
      })
    } catch {
      return NextResponse.json(
        { error: 'Blog yazıları yüklenirken hata oluştu' },
        { status: 500 }
      )
    }
  }
}
