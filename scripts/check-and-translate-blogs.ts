/**
 * Bu script:
 * 1. Tüm aktif blog yazılarının çeviri durumunu kontrol eder
 * 2. Eksik çevirileri tespit eder
 * 3. Eksik çevirileri otomatik olarak oluşturur
 *
 * Kullanım:
 * npx tsx scripts/check-and-translate-blogs.ts
 *
 * Sadece kontrol için (çeviri yapmadan):
 * npx tsx scripts/check-and-translate-blogs.ts --check-only
 */

import { prisma } from '../lib/prisma';
import { translateContent, generateSlug } from '../lib/services/translation';

const SUPPORTED_LANGUAGES = ['tr', 'en', 'ar', 'de', 'ru'] as const;
type Language = (typeof SUPPORTED_LANGUAGES)[number];

// Delay between translations (ms) - Google Translate rate limiting
const TRANSLATION_DELAY = 2000;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkBlogTranslations(): Promise<{
  postId: string;
  originalSlug: string;
  trTitle: string;
  existing: Language[];
  missing: Language[];
}[]> {
  console.log('\n📊 Blog yazılarının çeviri durumu kontrol ediliyor...\n');

  const posts = await prisma.blogPost.findMany({
    where: { aktif: true },
    select: {
      id: true,
      originalSlug: true,
      translations: {
        select: {
          language: true,
          baslik: true,
          status: true,
        },
      },
    },
    orderBy: { yayinTarihi: 'desc' },
  });

  const results: {
    postId: string;
    originalSlug: string;
    trTitle: string;
    existing: Language[];
    missing: Language[];
  }[] = [];

  for (const post of posts) {
    const existingLanguages = post.translations
      .filter((t) => t.status === 'published')
      .map((t) => t.language as Language);

    const missingLanguages = SUPPORTED_LANGUAGES.filter(
      (lang) => !existingLanguages.includes(lang)
    );

    const trTranslation = post.translations.find((t) => t.language === 'tr');

    results.push({
      postId: post.id,
      originalSlug: post.originalSlug,
      trTitle: trTranslation?.baslik || 'Başlık yok',
      existing: existingLanguages,
      missing: missingLanguages as Language[],
    });
  }

  return results;
}

async function translateBlogPost(
  postId: string,
  targetLanguage: Language
): Promise<boolean> {
  try {
    // Türkçe çeviriyi al (kaynak)
    const trTranslation = await prisma.blogPostTranslation.findFirst({
      where: {
        postId,
        language: 'tr',
        status: 'published',
      },
    });

    if (!trTranslation) {
      console.log(`  ⚠️ Türkçe çeviri bulunamadı, atlanıyor...`);
      return false;
    }

    // Çevir
    const translated = await translateContent(
      {
        title: trTranslation.baslik,
        description: trTranslation.ozet,
        content: trTranslation.icerik,
      },
      targetLanguage
    );

    // Slug oluştur
    const slug = generateSlug(translated.title);
    const uniqueSlug = `${slug}-${postId.substring(0, 8)}`;

    // Etiketleri de çevir (kaynak etiketleri al)
    const etiketler = trTranslation.etiketler || '[]';

    // Veritabanına kaydet
    await prisma.blogPostTranslation.upsert({
      where: {
        postId_language: {
          postId,
          language: targetLanguage,
        },
      },
      create: {
        postId,
        language: targetLanguage,
        baslik: translated.title,
        slug: uniqueSlug,
        ozet: translated.description,
        icerik: translated.content,
        etiketler: etiketler,
        seoTitle: translated.title,
        seoDescription: translated.description,
        status: 'published',
      },
      update: {
        baslik: translated.title,
        slug: uniqueSlug,
        ozet: translated.description,
        icerik: translated.content,
        etiketler: etiketler,
        seoTitle: translated.title,
        seoDescription: translated.description,
        status: 'published',
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
    // Çeviri durumunu kontrol et
    const results = await checkBlogTranslations();

    // Sonuçları göster
    console.log('═'.repeat(80));
    console.log('Blog Yazısı Çeviri Durumu');
    console.log('═'.repeat(80));

    let totalMissing = 0;

    for (const result of results) {
      const statusIcon =
        result.missing.length === 0
          ? '✅'
          : result.missing.length <= 2
            ? '⚠️'
            : '❌';

      console.log(`\n${statusIcon} ${result.trTitle}`);
      console.log(`   ID: ${result.postId}`);
      console.log(`   Slug: ${result.originalSlug}`);
      console.log(`   Mevcut: ${result.existing.join(', ') || 'Yok'}`);
      console.log(
        `   Eksik: ${result.missing.length > 0 ? result.missing.join(', ') : 'Yok'}`
      );

      totalMissing += result.missing.length;
    }

    console.log('\n' + '═'.repeat(80));
    console.log(`Toplam: ${results.length} blog yazısı`);
    console.log(`Eksik çeviri sayısı: ${totalMissing}`);
    console.log('═'.repeat(80));

    if (checkOnly) {
      console.log('\n📋 --check-only modu: Çeviri yapılmadı.\n');
      return;
    }

    // Eksik çevirileri tamamla
    const postsWithMissing = results.filter((r) => r.missing.length > 0);

    if (postsWithMissing.length === 0) {
      console.log('\n✅ Tüm blog yazılarının çevirileri tamamlanmış!\n');
      return;
    }

    console.log(
      `\n🔄 ${postsWithMissing.length} blog yazısı için eksik çeviriler tamamlanıyor...\n`
    );

    let successCount = 0;
    let failCount = 0;

    for (const post of postsWithMissing) {
      console.log(`\n📝 "${post.trTitle}" çeviriliyor...`);

      for (const lang of post.missing) {
        if (lang === 'tr') continue; // Türkçe zaten kaynak

        process.stdout.write(`   → ${lang.toUpperCase()}: `);

        const success = await translateBlogPost(post.postId, lang);

        if (success) {
          console.log('✅ Tamamlandı');
          successCount++;
        } else {
          console.log('❌ Başarısız');
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
  }
}

main();
