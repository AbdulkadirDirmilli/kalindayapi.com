/**
 * Tüm ilanları 4 dile çeviren script (en, ar, de, ru)
 * Kullanım: npx tsx scripts/translate-all-ilanlar.ts
 * Sadece kontrol: npx tsx scripts/translate-all-ilanlar.ts --check-only
 */

import { prisma } from '../lib/prisma';
import translate from 'google-translate-api-x';

const SUPPORTED_LANGUAGES = ['en', 'ar', 'de', 'ru'] as const;
type Language = (typeof SUPPORTED_LANGUAGES)[number];

const languageNames: Record<Language, string> = {
  en: 'İngilizce',
  ar: 'Arapça',
  de: 'Almanca',
  ru: 'Rusça',
};

// Rate limiting delay (ms)
const TRANSLATION_DELAY = 1500;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text || text.trim() === '') return '';

  try {
    const result = await translate(text, { from: 'tr', to: targetLang });
    return result.text;
  } catch (error) {
    console.error(`Çeviri hatası (${targetLang}):`, error);
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

async function checkIlanTranslations(): Promise<{
  ilanId: string;
  baslik: string;
  existing: Language[];
  missing: Language[];
}[]> {
  console.log('\n📊 İlanların çeviri durumu kontrol ediliyor...\n');

  const ilanlar = await prisma.ilan.findMany({
    where: { durum: 'aktif' },
    select: {
      id: true,
      baslik: true,
      translations: {
        select: { language: true, status: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const results: {
    ilanId: string;
    baslik: string;
    existing: Language[];
    missing: Language[];
  }[] = [];

  for (const ilan of ilanlar) {
    const existingLanguages = ilan.translations
      .filter((t) => t.status === 'published')
      .map((t) => t.language as Language);

    const missingLanguages = SUPPORTED_LANGUAGES.filter(
      (lang) => !existingLanguages.includes(lang)
    );

    results.push({
      ilanId: ilan.id,
      baslik: ilan.baslik,
      existing: existingLanguages,
      missing: missingLanguages as Language[],
    });
  }

  return results;
}

async function translateIlan(ilanId: string, targetLang: Language): Promise<boolean> {
  try {
    const ilan = await prisma.ilan.findUnique({
      where: { id: ilanId },
      select: {
        id: true,
        baslik: true,
        aciklama: true,
        kategori: true,
        tip: true,
      },
    });

    if (!ilan) {
      console.log(`  ⚠️ İlan bulunamadı, atlanıyor...`);
      return false;
    }

    // Çevir
    const [baslik, aciklama] = await Promise.all([
      translateText(ilan.baslik, targetLang),
      translateText(ilan.aciklama, targetLang),
    ]);

    const slug = generateSlug(baslik);

    // Slug benzersizliği kontrol et
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

    // Veritabanına kaydet
    await prisma.ilanTranslation.upsert({
      where: {
        ilanId_language: {
          ilanId,
          language: targetLang,
        },
      },
      create: {
        ilanId,
        language: targetLang,
        baslik,
        slug: finalSlug,
        aciklama,
        seoTitle: baslik.length > 60 ? baslik.substring(0, 57) + '...' : baslik,
        seoDescription: aciklama.length > 160 ? aciklama.substring(0, 157) + '...' : aciklama,
        status: 'published',
        translatedBy: 'google',
      },
      update: {
        baslik,
        slug: finalSlug,
        aciklama,
        seoTitle: baslik.length > 60 ? baslik.substring(0, 57) + '...' : baslik,
        seoDescription: aciklama.length > 160 ? aciklama.substring(0, 157) + '...' : aciklama,
        status: 'published',
        translatedBy: 'google',
        updatedAt: new Date(),
      },
    });

    return true;
  } catch (error) {
    console.error(`  ❌ Çeviri hatası:`, error);
    return false;
  }
}

async function main(): Promise<void> {
  const checkOnly = process.argv.includes('--check-only');

  try {
    const results = await checkIlanTranslations();

    // Sonuçları göster
    console.log('═'.repeat(80));
    console.log('İlan Çeviri Durumu');
    console.log('═'.repeat(80));

    let totalMissing = 0;

    for (const result of results) {
      const statusIcon =
        result.missing.length === 0
          ? '✅'
          : result.missing.length <= 2
            ? '⚠️'
            : '❌';

      console.log(`\n${statusIcon} ${result.baslik.substring(0, 60)}`);
      console.log(`   ID: ${result.ilanId}`);
      console.log(`   Mevcut: ${result.existing.join(', ') || 'Yok'}`);
      console.log(
        `   Eksik: ${result.missing.length > 0 ? result.missing.join(', ') : 'Yok'}`
      );

      totalMissing += result.missing.length;
    }

    console.log('\n' + '═'.repeat(80));
    console.log(`Toplam: ${results.length} ilan`);
    console.log(`Eksik çeviri sayısı: ${totalMissing}`);
    console.log('═'.repeat(80));

    if (checkOnly) {
      console.log('\n📋 --check-only modu: Çeviri yapılmadı.\n');
      return;
    }

    // Eksik çevirileri tamamla
    const ilansWithMissing = results.filter((r) => r.missing.length > 0);

    if (ilansWithMissing.length === 0) {
      console.log('\n✅ Tüm ilanların çevirileri tamamlanmış!\n');
      return;
    }

    console.log(
      `\n🔄 ${ilansWithMissing.length} ilan için eksik çeviriler tamamlanıyor...\n`
    );

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < ilansWithMissing.length; i++) {
      const ilan = ilansWithMissing[i];
      console.log(`\n[${i + 1}/${ilansWithMissing.length}] "${ilan.baslik.substring(0, 40)}..." çeviriliyor...`);

      for (const lang of ilan.missing) {
        process.stdout.write(`   → ${languageNames[lang]}: `);

        const success = await translateIlan(ilan.ilanId, lang);

        if (success) {
          console.log('✅');
          successCount++;
        } else {
          console.log('❌');
          failCount++;
        }

        // Rate limiting
        await sleep(TRANSLATION_DELAY);
      }
    }

    console.log('\n' + '═'.repeat(80));
    console.log('Çeviri Tamamlandı');
    console.log('═'.repeat(80));
    console.log(`✅ Başarılı: ${successCount}`);
    console.log(`❌ Başarısız: ${failCount}`);
    console.log('═'.repeat(80) + '\n');
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
