import { prisma } from '@/lib/prisma'

export async function GET() {
  const baseUrl = 'https://www.kalindayapi.com'

  // Veritabanından aktif ilanları al
  const ilanlar = await prisma.ilan.findMany({
    where: {
      durum: 'aktif',
    },
    select: {
      slug: true,
      guncellenmeTarihi: true,
    },
    orderBy: {
      guncellenmeTarihi: 'desc',
    },
  })

  // XML sitemap oluştur
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ilanlar
  .map(
    (ilan) => `  <url>
    <loc>${baseUrl}/ilanlar/${ilan.slug}</loc>
    <lastmod>${ilan.guncellenmeTarihi.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
