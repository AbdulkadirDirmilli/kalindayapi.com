import { config } from 'dotenv';
config();

import { prisma } from '../lib/prisma';
import translate from 'google-translate-api-x';

async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text || text.trim() === '') return '';

  try {
    const result = await translate(text, {
      from: 'tr',
      to: targetLang,
    });
    return result.text;
  } catch (error) {
    console.error(`Translation error for ${targetLang}:`, error);
    throw error;
  }
}

function generateSlug(text: string): string {
  let slug = text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  if (slug.length > 60) {
    slug = slug.substring(0, 60).replace(/-$/, '');
  }

  return slug;
}

const categoryTranslations: Record<string, Record<string, string>> = {
  konut: { de: 'wohnung', ru: 'zhilye' },
  arsa: { de: 'grundstueck', ru: 'uchastok' },
  isyeri: { de: 'gewerbe', ru: 'kommercheskaya' },
  diger: { de: 'sonstiges', ru: 'drugoe' },
};

const typeTranslations: Record<string, Record<string, string>> = {
  satilik: { de: 'zu-verkaufen', ru: 'prodazha' },
  kiralik: { de: 'zu-vermieten', ru: 'arenda' },
};

async function translateIlan(ilanId: string, targetLang: string) {
  const ilan = await prisma.ilan.findUnique({
    where: { id: ilanId },
    select: {
      id: true,
      baslik: true,
      slug: true,
      aciklama: true,
      kategori: true,
      tip: true,
    },
  });

  if (!ilan) {
    console.log(`  [HATA] Ilan bulunamadi: ${ilanId}`);
    return false;
  }

  const existing = await prisma.ilanTranslation.findUnique({
    where: { ilanId_language: { ilanId, language: targetLang } },
  });

  if (existing && existing.status === 'published') {
    console.log(`  [ATLANDI] ${targetLang.toUpperCase()} zaten mevcut`);
    return true;
  }

  console.log(`  [CEVIRI] ${targetLang.toUpperCase()} cevriliyor...`);

  try {
    const [baslik, aciklama] = await Promise.all([
      translateText(ilan.baslik, targetLang),
      translateText(ilan.aciklama, targetLang),
    ]);

    const slug = generateSlug(baslik);
    const kategori = categoryTranslations[ilan.kategori]?.[targetLang] || ilan.kategori;
    const tip = typeTranslations[ilan.tip]?.[targetLang] || ilan.tip;

    let finalSlug = slug;
    let counter = 1;
    while (true) {
      const existingSlug = await prisma.ilanTranslation.findUnique({
        where: { slug_language: { slug: finalSlug, language: targetLang } },
      });
      if (!existingSlug || existingSlug.ilanId === ilanId) break;
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    await prisma.ilanTranslation.upsert({
      where: { ilanId_language: { ilanId, language: targetLang } },
      create: {
        ilanId,
        language: targetLang,
        baslik,
        slug: finalSlug,
        aciklama,
        kategori,
        tip,
        status: 'published',
        translatedBy: 'google',
      },
      update: {
        baslik,
        slug: finalSlug,
        aciklama,
        kategori,
        tip,
        status: 'published',
        translatedBy: 'google',
      },
    });

    console.log(`  [OK] ${targetLang.toUpperCase()} tamamlandi`);
    return true;
  } catch (error) {
    console.error(`  [HATA] ${targetLang.toUpperCase()}:`, error);
    return false;
  }
}

async function main() {
  console.log('='.repeat(70));
  console.log('ILAN CEVIRISI BASLADI (DE + RU)');
  console.log('='.repeat(70));

  const ilanlar = await prisma.ilan.findMany({
    where: { durum: 'aktif' },
    select: { id: true, baslik: true },
    orderBy: { createdAt: 'desc' },
  });

  console.log(`\nToplam ${ilanlar.length} ilan bulundu.\n`);

  let success = 0;
  let failed = 0;

  for (const ilan of ilanlar) {
    console.log(`\n[ILAN] ${ilan.baslik.substring(0, 50)}`);

    const deResult = await translateIlan(ilan.id, 'de');
    // Delay between translations to avoid rate limiting
    await new Promise((r) => setTimeout(r, 1000));

    const ruResult = await translateIlan(ilan.id, 'ru');
    await new Promise((r) => setTimeout(r, 1000));

    if (deResult && ruResult) success++;
    else failed++;
  }

  console.log('\n' + '='.repeat(70));
  console.log(`TAMAMLANDI: ${success} basarili, ${failed} basarisiz`);
  console.log('='.repeat(70));

  await prisma.$disconnect();
}

main();
