import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Her istek için dinamik sitemap oluştur
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Desteklenen diller
const locales = ['tr', 'en', 'ar'] as const
type Locale = (typeof locales)[number]
const defaultLocale: Locale = 'tr'

// NOT: Next.js app router Türkçe route isimleri kullanıyor (app/[lang]/blog, app/[lang]/ilanlar vs.)
// Bu yüzden sitemap'te de aynı route isimlerini kullanıyoruz - lokalize route yok

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

interface SitemapUrl {
  loc: string
  lastmod: string
  changefreq: string
  priority: number
  alternates?: { locale: Locale; href: string }[]
}

function generateUrlXml(url: SitemapUrl): string {
  let xml = `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
`

  // hreflang alternates ekle
  if (url.alternates && url.alternates.length > 0) {
    for (const alt of url.alternates) {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.locale}" href="${escapeXml(alt.href)}" />\n`
    }
    // x-default için varsayılan dil
    const defaultAlt = url.alternates.find((a) => a.locale === defaultLocale)
    if (defaultAlt) {
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(defaultAlt.href)}" />\n`
    }
  }

  xml += `  </url>\n`
  return xml
}

export async function GET() {
  try {
    const baseUrl = 'https://www.kalindayapi.com'
    const urls: SitemapUrl[] = []
    const now = new Date().toISOString()

    // 0. Statik sayfalar
    // Tüm dillerde içerik olan sayfalar
    const multiLangPages = [
      { path: '', priority: 1.0, changefreq: 'daily' },
      { path: 'ilanlar', priority: 0.9, changefreq: 'daily' },
      { path: 'hizmetler', priority: 0.8, changefreq: 'monthly' },
      { path: 'blog', priority: 0.8, changefreq: 'weekly' },
      { path: 'hakkimizda', priority: 0.6, changefreq: 'monthly' },
      { path: 'iletisim', priority: 0.6, changefreq: 'monthly' },
      { path: 'doviz-kurlari', priority: 0.7, changefreq: 'daily' },
      { path: 'sss', priority: 0.5, changefreq: 'monthly' }, // SSS artık çok dilli
      // SEO Landing Pages
      { path: 'ortaca-satilik-daire', priority: 0.9, changefreq: 'daily' },
      { path: 'ortaca-kiralik-daire', priority: 0.9, changefreq: 'daily' },
      { path: 'dalaman-satilik-ev', priority: 0.9, changefreq: 'daily' },
      { path: 'ortaca-ogrenci-kiralik', priority: 0.8, changefreq: 'weekly' },
      { path: 'dalyan-satilik-villa', priority: 0.8, changefreq: 'weekly' },
      { path: 'ortaca-emlak-ofisi', priority: 0.8, changefreq: 'monthly' },
    ]

    // Sadece Türkçe içerik olan sayfalar (çevirisi yok)
    const turkishOnlyPages = [
      { path: 'gizlilik', priority: 0.5, changefreq: 'monthly' },
      { path: 'kullanim-kosullari', priority: 0.5, changefreq: 'monthly' },
      { path: 'rehber', priority: 0.7, changefreq: 'weekly' },
    ]

    // Çok dilli sayfalar - tüm dillerde URL ekle
    for (const page of multiLangPages) {
      const alternates: { locale: Locale; href: string }[] = locales.map((loc) => ({
        locale: loc,
        href: page.path
          ? `${baseUrl}/${loc}/${page.path}`
          : `${baseUrl}/${loc}`,
      }))

      for (const locale of locales) {
        urls.push({
          loc: page.path
            ? `${baseUrl}/${locale}/${page.path}`
            : `${baseUrl}/${locale}`,
          lastmod: now,
          changefreq: page.changefreq,
          priority: page.priority,
          alternates,
        })
      }
    }

    // Sadece Türkçe sayfalar - yalnızca TR URL ekle
    for (const page of turkishOnlyPages) {
      urls.push({
        loc: `${baseUrl}/tr/${page.path}`,
        lastmod: now,
        changefreq: page.changefreq,
        priority: page.priority,
        // Sadece Türkçe olduğu için alternate yok
      })
    }

    // Rehber ilçe sayfaları - sadece Türkçe (çevirisi yok)
    const ilceSlugs = [
      'ortaca', 'dalyan', 'koycegiz', 'dalaman', 'fethiye', 'marmaris',
      'bodrum', 'milas', 'mentese', 'datca', 'ula', 'yatagan',
      'kavaklidere', 'seydikemer',
    ]

    for (const slug of ilceSlugs) {
      urls.push({
        loc: `${baseUrl}/tr/rehber/${slug}`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.6,
        // Sadece Türkçe olduğu için alternate yok
      })
    }

    // 1. Aktif ilanları getir (tüm dillerdeki çevirileriyle)
    const ilanlar = await prisma.ilan.findMany({
      where: { durum: 'aktif' },
      select: {
        slug: true,
        guncellenmeTarihi: true,
        translations: {
          where: { status: 'published' },
          select: {
            language: true,
            slug: true,
          },
        },
      },
      orderBy: { guncellenmeTarihi: 'desc' },
    })

    // İlanları ekle
    for (const ilan of ilanlar) {
      const lastmod = ilan.guncellenmeTarihi.toISOString()

      // Türkçe ana ilan
      const trUrl = `${baseUrl}/tr/ilanlar/${ilan.slug}`

      // Alternates oluştur
      const alternates: { locale: Locale; href: string }[] = [
        { locale: 'tr', href: trUrl },
      ]

      // Çevirileri ekle
      for (const translation of ilan.translations) {
        const locale = translation.language as Locale
        if (locales.includes(locale) && locale !== 'tr') {
          alternates.push({
            locale,
            href: `${baseUrl}/${locale}/ilanlar/${translation.slug}`,
          })
        }
      }

      // Türkçe URL'i ekle
      urls.push({
        loc: trUrl,
        lastmod,
        changefreq: 'weekly',
        priority: 0.8,
        alternates,
      })

      // Diğer dillerdeki çevirileri de ekle
      for (const translation of ilan.translations) {
        const locale = translation.language as Locale
        if (locales.includes(locale) && locale !== 'tr') {
          urls.push({
            loc: `${baseUrl}/${locale}/ilanlar/${translation.slug}`,
            lastmod,
            changefreq: 'weekly',
            priority: 0.8,
            alternates,
          })
        }
      }
    }

    // 2. Aktif hizmetleri getir
    const hizmetler = await prisma.hizmet.findMany({
      where: { aktif: true },
      select: {
        slug: true,
        updatedAt: true,
        translations: {
          where: { status: 'published' },
          select: {
            language: true,
            slug: true,
          },
        },
      },
      orderBy: { sira: 'asc' },
    })

    // Hizmetleri ekle
    for (const hizmet of hizmetler) {
      const lastmod = hizmet.updatedAt.toISOString()

      // Türkçe ana hizmet
      const trUrl = `${baseUrl}/tr/hizmetler/${hizmet.slug}`

      const alternates: { locale: Locale; href: string }[] = [
        { locale: 'tr', href: trUrl },
      ]

      for (const translation of hizmet.translations) {
        const locale = translation.language as Locale
        if (locales.includes(locale) && locale !== 'tr') {
          alternates.push({
            locale,
            href: `${baseUrl}/${locale}/hizmetler/${translation.slug}`,
          })
        }
      }

      urls.push({
        loc: trUrl,
        lastmod,
        changefreq: 'monthly',
        priority: 0.7,
        alternates,
      })

      for (const translation of hizmet.translations) {
        const locale = translation.language as Locale
        if (locales.includes(locale) && locale !== 'tr') {
          urls.push({
            loc: `${baseUrl}/${locale}/hizmetler/${translation.slug}`,
            lastmod,
            changefreq: 'monthly',
            priority: 0.7,
            alternates,
          })
        }
      }
    }

    // 3. Aktif blog yazılarını getir
    const blogPosts = await prisma.blogPost.findMany({
      where: { aktif: true },
      select: {
        originalSlug: true,
        guncellenmeTarihi: true,
        translations: {
          where: { status: 'published' },
          select: {
            language: true,
            slug: true,
          },
        },
      },
      orderBy: { yayinTarihi: 'desc' },
    })

    // Blog yazılarını ekle
    for (const post of blogPosts) {
      const lastmod = post.guncellenmeTarihi.toISOString()

      // Tüm dillerdeki çeviriler için alternates oluştur
      const alternates: { locale: Locale; href: string }[] = []

      for (const translation of post.translations) {
        const locale = translation.language as Locale
        if (locales.includes(locale)) {
          alternates.push({
            locale,
            href: `${baseUrl}/${locale}/blog/${translation.slug}`,
          })
        }
      }

      // Her çeviri için URL ekle
      for (const translation of post.translations) {
        const locale = translation.language as Locale
        if (locales.includes(locale)) {
          urls.push({
            loc: `${baseUrl}/${locale}/blog/${translation.slug}`,
            lastmod,
            changefreq: 'weekly',
            priority: 0.7,
            alternates: alternates.length > 1 ? alternates : undefined,
          })
        }
      }
    }

    // XML oluştur
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`

    for (const url of urls) {
      xml += generateUrlXml(url)
    }

    xml += `</urlset>`

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Server sitemap error:', error)

    // Hata durumunda boş sitemap döndür
    const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`

    return new NextResponse(emptyXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
}
