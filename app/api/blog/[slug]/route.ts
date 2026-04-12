import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Single blog post by slug (dil destekli)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const searchParams = request.nextUrl.searchParams
    const lang = searchParams.get('lang') || 'tr'

    // Önce slug ile translation'ı bul
    const translation = await prisma.blogPostTranslation.findFirst({
      where: {
        slug: slug,
        language: lang,
        status: 'published',
      },
      include: {
        post: true,
      },
    })

    // Translation bulunamadıysa, originalSlug ile dene
    if (!translation) {
      const post = await prisma.blogPost.findUnique({
        where: { originalSlug: slug },
        include: {
          translations: {
            where: { language: lang, status: 'published' },
            take: 1,
          },
        },
      })

      if (!post || !post.aktif) {
        return NextResponse.json({ error: 'Blog yazısı bulunamadı' }, { status: 404 })
      }

      const postTranslation = post.translations[0]

      // Çeviri yoksa Türkçe'yi dene
      if (!postTranslation && lang !== 'tr') {
        const trTranslation = await prisma.blogPostTranslation.findFirst({
          where: {
            postId: post.id,
            language: 'tr',
            status: 'published',
          },
        })

        if (trTranslation) {
          return NextResponse.json({
            id: post.id,
            slug: trTranslation.slug,
            baslik: trTranslation.baslik,
            ozet: trTranslation.ozet,
            icerik: trTranslation.icerik,
            kategori: post.kategori,
            yazar: post.yazar,
            kapakGorsel: post.kapakGorsel,
            yayinTarihi: post.yayinTarihi.toISOString(),
            etiketler: trTranslation.etiketler ? JSON.parse(trTranslation.etiketler) : [],
            okunmaSuresi: Math.ceil((trTranslation.icerik?.length || 1000) / 1000),
            language: 'tr',
            fallback: true,
          })
        }
      }

      if (!postTranslation) {
        return NextResponse.json({ error: 'Blog yazısı bulunamadı' }, { status: 404 })
      }

      return NextResponse.json({
        id: post.id,
        slug: postTranslation.slug,
        baslik: postTranslation.baslik,
        ozet: postTranslation.ozet,
        icerik: postTranslation.icerik,
        kategori: post.kategori,
        yazar: post.yazar,
        kapakGorsel: post.kapakGorsel,
        yayinTarihi: post.yayinTarihi.toISOString(),
        etiketler: postTranslation.etiketler ? JSON.parse(postTranslation.etiketler) : [],
        okunmaSuresi: Math.ceil((postTranslation.icerik?.length || 1000) / 1000),
        language: lang,
      })
    }

    // Translation bulundu
    const post = translation.post

    if (!post.aktif) {
      return NextResponse.json({ error: 'Blog yazısı bulunamadı' }, { status: 404 })
    }

    return NextResponse.json({
      id: post.id,
      slug: translation.slug,
      baslik: translation.baslik,
      ozet: translation.ozet,
      icerik: translation.icerik,
      kategori: post.kategori,
      yazar: post.yazar,
      kapakGorsel: post.kapakGorsel,
      yayinTarihi: post.yayinTarihi.toISOString(),
      etiketler: translation.etiketler ? JSON.parse(translation.etiketler) : [],
      okunmaSuresi: Math.ceil((translation.icerik?.length || 1000) / 1000),
      language: lang,
    })
  } catch (error) {
    console.error('Blog getirme hatası:', error)

    // Hata durumunda JSON dosyasına fallback
    try {
      const { slug } = await params
      const fs = await import('fs')
      const path = await import('path')
      const jsonPath = path.join(process.cwd(), 'data', 'blog-posts.json')
      const jsonContent = fs.readFileSync(jsonPath, 'utf-8')
      const blogData = JSON.parse(jsonContent)

      const yazi = blogData.yazilar.find((y: { slug: string }) => y.slug === slug)

      if (!yazi) {
        return NextResponse.json({ error: 'Blog yazısı bulunamadı' }, { status: 404 })
      }

      // İçerik array'ini string'e çevir
      const icerikString = yazi.icerik.map((item: { tip: string; metin: string }) => {
        if (item.tip === 'baslik') return `## ${item.metin}`
        if (item.tip === 'altbaslik') return `### ${item.metin}`
        if (item.tip === 'liste') return `- ${item.metin}`
        return item.metin
      }).join('\n\n')

      return NextResponse.json({
        id: yazi.id,
        slug: yazi.slug,
        baslik: yazi.baslik,
        ozet: yazi.ozet,
        icerik: icerikString,
        kategori: yazi.kategori,
        yazar: yazi.yazar,
        kapakGorsel: yazi.kapakGorsel,
        yayinTarihi: yazi.yayinTarihi,
        etiketler: yazi.etiketler,
        okunmaSuresi: yazi.okunmaSuresi,
        language: 'tr',
        source: 'json-fallback',
      })
    } catch {
      return NextResponse.json(
        { error: 'Blog yazısı yüklenirken hata oluştu' },
        { status: 500 }
      )
    }
  }
}
