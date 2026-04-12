import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { translateBlogPostAsync } from '@/lib/services/translation'

// GET - Get single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { id } = await params

    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    })

    if (!post) {
      return NextResponse.json({ error: 'Blog yazısı bulunamadı' }, { status: 404 })
    }

    // Türkçe çeviriyi bul
    const trTranslation = post.translations.find(t => t.language === 'tr')

    return NextResponse.json({
      id: post.id,
      slug: post.originalSlug,
      baslik: trTranslation?.baslik || '',
      ozet: trTranslation?.ozet || '',
      icerik: trTranslation?.icerik || '',
      etiketler: trTranslation?.etiketler ? JSON.parse(trTranslation.etiketler) : [],
      kategori: post.kategori,
      yazar: post.yazar,
      kapakGorsel: post.kapakGorsel,
      yayinTarihi: post.yayinTarihi.toISOString(),
      aktif: post.aktif,
      translations: post.translations.map(t => ({
        language: t.language,
        baslik: t.baslik,
        slug: t.slug,
        status: t.status,
      })),
    })
  } catch (error) {
    console.error('Blog getirme hatası:', error)
    return NextResponse.json(
      { error: 'Blog yazısı yüklenirken hata oluştu' },
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

// PUT - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { baslik, ozet, icerik, kategori, yazar, kapakGorsel, etiketler, yayinTarihi, aktif } = body

    // Mevcut yazıyı kontrol et
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        translations: {
          where: { language: 'tr' },
          take: 1,
        },
      },
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Blog yazısı bulunamadı' }, { status: 404 })
    }

    const oldTranslation = existingPost.translations[0]

    // Blog yazısını güncelle
    await prisma.blogPost.update({
      where: { id },
      data: {
        kategori: kategori || existingPost.kategori,
        yazar: yazar || existingPost.yazar,
        kapakGorsel: kapakGorsel !== undefined ? kapakGorsel : existingPost.kapakGorsel,
        yayinTarihi: yayinTarihi ? new Date(yayinTarihi) : existingPost.yayinTarihi,
        aktif: aktif !== undefined ? aktif : existingPost.aktif,
      },
    })

    // Türkçe çeviriyi güncelle
    if (baslik || ozet || icerik) {
      const newSlug = baslik ? generateSlug(baslik) : existingPost.originalSlug

      await prisma.blogPostTranslation.upsert({
        where: {
          postId_language: {
            postId: id,
            language: 'tr',
          },
        },
        update: {
          baslik: baslik || oldTranslation?.baslik || '',
          slug: newSlug,
          ozet: ozet || oldTranslation?.ozet || '',
          icerik: icerik || oldTranslation?.icerik || '',
          etiketler: etiketler ? JSON.stringify(etiketler) : oldTranslation?.etiketler || '[]',
          seoTitle: baslik ? (baslik.length > 60 ? baslik.substring(0, 57) + '...' : baslik) : oldTranslation?.seoTitle,
          seoDescription: ozet ? (ozet.length > 160 ? ozet.substring(0, 157) + '...' : ozet) : oldTranslation?.seoDescription,
          updatedAt: new Date(),
        },
        create: {
          postId: id,
          language: 'tr',
          baslik: baslik || '',
          slug: newSlug,
          ozet: ozet || '',
          icerik: icerik || '',
          etiketler: JSON.stringify(etiketler || []),
          status: 'published',
        },
      })

      // Başlık, özet veya içerik değiştiyse çevirileri güncelle
      const contentChanged =
        (baslik && baslik !== oldTranslation?.baslik) ||
        (ozet && ozet !== oldTranslation?.ozet) ||
        (icerik && icerik !== oldTranslation?.icerik)

      if (contentChanged) {
        translateBlogPostAsync(
          id,
          baslik || oldTranslation?.baslik || '',
          ozet || oldTranslation?.ozet || '',
          icerik || oldTranslation?.icerik || ''
        )
      }
    }

    return NextResponse.json({
      id,
      message: 'Blog yazısı güncellendi. Çeviriler arka planda güncelleniyor.',
    })
  } catch (error) {
    console.error('Blog güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Blog yazısı güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// DELETE - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { id } = await params

    // Mevcut yazıyı kontrol et
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Blog yazısı bulunamadı' }, { status: 404 })
    }

    // Sil (çeviriler cascade olarak silinecek)
    await prisma.blogPost.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Blog yazısı silindi' })
  } catch (error) {
    console.error('Blog silme hatası:', error)
    return NextResponse.json(
      { error: 'Blog yazısı silinirken hata oluştu' },
      { status: 500 }
    )
  }
}
