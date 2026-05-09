import { prisma } from '../lib/prisma';

async function checkBlogTranslations() {
  const posts = await prisma.blogPost.findMany({
    where: { aktif: true },
    select: {
      id: true,
      originalSlug: true,
      translations: {
        select: {
          language: true,
          status: true,
          baslik: true
        }
      }
    },
    orderBy: { yayinTarihi: 'desc' }
  });

  const targetLangs = ['tr', 'en', 'ar', 'de', 'ru'];

  console.log('='.repeat(80));
  console.log('BLOG CEVIRI DURUMU');
  console.log('='.repeat(80));

  let missingCount = 0;
  let draftCount = 0;

  for (const post of posts) {
    const existingLangs = post.translations.map(t => t.language);
    const missingLangs = targetLangs.filter(l => !existingLangs.includes(l));
    const publishedLangs = post.translations.filter(t => t.status === 'published').map(t => t.language);
    const draftLangs = post.translations.filter(t => t.status === 'draft').map(t => t.language);

    console.log(`\n[BLOG] ${post.originalSlug}`);
    console.log(`   Yayinda: ${publishedLangs.join(', ') || 'YOK'}`);
    if (draftLangs.length > 0) {
      console.log(`   Taslak: ${draftLangs.join(', ')}`);
      draftCount += draftLangs.length;
    }
    if (missingLangs.length > 0) {
      console.log(`   Eksik: ${missingLangs.join(', ')}`);
      missingCount += missingLangs.length;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`TOPLAM: ${posts.length} blog`);
  console.log(`  - Eksik ceviri: ${missingCount}`);
  console.log(`  - Taslak (yayinlanmamis): ${draftCount}`);
  console.log('='.repeat(80));

  await prisma.$disconnect();
}

checkBlogTranslations();
