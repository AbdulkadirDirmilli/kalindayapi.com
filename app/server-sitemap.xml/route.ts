import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Her istek için dinamik sitemap oluştur
export const dynamic = 'force-dynamic'
export const revalidate = 0

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  try {
    const baseUrl = 'https://www.kalindayapi.com'

    // Aktif ilanları getir
    const ilanlar = await prisma.ilan.findMany({
      where: { durum: 'aktif' },
      select: {
        slug: true,
        guncellenmeTarihi: true,
        kategori: true,
        tip: true,
      },
      orderBy: { guncellenmeTarihi: 'desc' },
    })

    // XML oluştur
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`

    // İlanları ekle (hizmetler statik sitemap'te zaten mevcut)
    for (const ilan of ilanlar) {
      const lastmod = ilan.guncellenmeTarihi.toISOString()
      xml += `  <url>
    <loc>${baseUrl}/ilanlar/${escapeXml(ilan.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`
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
