import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { translateBlogPostAsync } from '@/lib/services/translation'

// GET - List all blog posts
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const kategori = searchParams.get('kategori')
    const search = searchParams.get('search')

    const where: Record<string, unknown> = {}

    if (kategori) where.kategori = kategori
    if (search) {
      where.translations = {
        some: {
          language: 'tr',
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
            where: { language: 'tr' },
            take: 1,
          },
        },
        orderBy: { yayinTarihi: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ])

    // Formatla
    const formattedPosts = posts.map(post => {
      const trTranslation = post.translations[0]
      return {
        id: post.id,
        slug: post.originalSlug,
        baslik: trTranslation?.baslik || '',
        ozet: trTranslation?.ozet || '',
        kategori: post.kategori,
        yazar: post.yazar,
        kapakGorsel: post.kapakGorsel,
        yayinTarihi: post.yayinTarihi.toISOString(),
        aktif: post.aktif,
      }
    })

    return NextResponse.json({
      posts: formattedPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Blog listesi hatası:', error)
    return NextResponse.json(
      { error: 'Blog yazıları yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// Slug oluştur
function generateSlug(title: string): string {
  let slug = title.toLowerCase()

  const turkishChars: Record<string, string> = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
  }
  for (const [tr, en] of Object.entries(turkishChars)) {
    slug = slug.replace(new RegExp(tr, 'g'), en)
  }

  slug = slug.replace(/[^\w\s-]/g, '')
  slug = slug.replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')
  return slug
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const body = await request.json()
    const { baslik, ozet, icerik, kategori, yazar, kapakGorsel, etiketler, yayinTarihi } = body

    if (!baslik || !ozet || !icerik || !kategori || !yazar) {
      return NextResponse.json(
        { error: 'Zorunlu alanlar eksik: baslik, ozet, icerik, kategori, yazar' },
        { status: 400 }
      )
    }

    const slug = generateSlug(baslik)

    // Slug benzersizliğini kontrol et
    const existingPost = await prisma.blogPost.findUnique({
      where: { originalSlug: slug },
    })

    if (existingPost) {
      return NextResponse.json(
        { error: 'Bu başlıkla bir yazı zaten mevcut' },
        { status: 400 }
      )
    }

    // Blog yazısını oluştur
    const blogPost = await prisma.blogPost.create({
      data: {
        originalSlug: slug,
        kategori,
        yazar,
        kapakGorsel: kapakGorsel || null,
        yayinTarihi: yayinTarihi ? new Date(yayinTarihi) : new Date(),
        aktif: true,
      },
    })

    // Türkçe çeviriyi oluştur
    await prisma.blogPostTranslation.create({
      data: {
        postId: blogPost.id,
        language: 'tr',
        baslik,
        slug,
        ozet,
        icerik,
        etiketler: JSON.stringify(etiketler || []),
        seoTitle: baslik.length > 60 ? baslik.substring(0, 57) + '...' : baslik,
        seoDescription: ozet.length > 160 ? ozet.substring(0, 157) + '...' : ozet,
        status: 'published',
      },
    })

    // Otomatik çeviri başlat (arka planda)
    translateBlogPostAsync(blogPost.id, baslik, ozet, icerik)

    return NextResponse.json({
      id: blogPost.id,
      slug: blogPost.originalSlug,
      baslik,
      message: 'Blog yazısı oluşturuldu. Çeviriler arka planda hazırlanıyor.',
    }, { status: 201 })
  } catch (error) {
    console.error('Blog oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Blog yazısı oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
}
