import { prisma } from '../lib/prisma';

async function checkIlanTranslations() {
  const ilanlar = await prisma.ilan.findMany({
    where: { durum: 'aktif' },
    select: {
      id: true,
      baslik: true,
      slug: true,
      translations: {
        select: { language: true, status: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const targetLangs = ['en', 'ar', 'de', 'ru'];
  let missingCount = 0;
  let draftCount = 0;

  console.log('='.repeat(80));
  console.log('ILAN CEVIRI DURUMU');
  console.log('='.repeat(80));

  for (const ilan of ilanlar) {
    const existingLangs = ilan.translations.map(t => t.language);
    const publishedLangs = ilan.translations.filter(t => t.status === 'published').map(t => t.language);
    const draftLangs = ilan.translations.filter(t => t.status === 'draft').map(t => t.language);
    const missingLangs = targetLangs.filter(l => !existingLangs.includes(l));

    console.log(`\n[ILAN] ${ilan.baslik.substring(0, 60)}`);
    console.log(`   Slug: ${ilan.slug}`);
    console.log(`   Yayinda: ${publishedLangs.length ? publishedLangs.join(', ') : 'YOK'}`);

    if (draftLangs.length > 0) {
      console.log(`   Taslak: ${draftLangs.join(', ')}`);
      draftCount += draftLangs.length;
    }

    if (missingLangs.length > 0) {
      console.log(`   EKSIK: ${missingLangs.join(', ')}`);
      missingCount += missingLangs.length;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`TOPLAM: ${ilanlar.length} aktif ilan`);
  console.log(`  - Eksik ceviri: ${missingCount}`);
  console.log(`  - Taslak (yayinlanmamis): ${draftCount}`);
  console.log('='.repeat(80));

  await prisma.$disconnect();
}

checkIlanTranslations();
