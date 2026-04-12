/**
 * Blog yazılarını JSON'dan veritabanına taşıyan ve çeviren script
 * Kullanım: npx tsx scripts/migrate-blog-posts.ts
 */

import { PrismaClient } from '../lib/generated/prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import translate from 'google-translate-api-x';
import * as fs from 'fs';
import * as path from 'path';

// Prisma client oluştur
const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || 'file:./prisma/dev.db',
});

const prisma = new PrismaClient({ adapter });

// Dil kodları
const targetLocales = ['en', 'ar'] as const;
type TargetLocale = typeof targetLocales[number];

const localeNames: Record<TargetLocale, string> = {
  en: 'İngilizce',
  ar: 'Arapça',
};

// Konum zenginleştirmeleri
const locationEnhancements: Record<string, Record<TargetLocale, string>> = {
  'Ortaca': { en: 'Ortaca, Turkish Riviera', ar: 'أورتاجا، الريفييرا التركية' },
  'Dalyan': { en: 'Dalyan, Mediterranean Turkey', ar: 'داليان، البحر المتوسط التركي' },
  'Köyceğiz': { en: 'Köyceğiz, Aegean Turkey', ar: 'كويجيز، بحر إيجة التركي' },
  'Muğla': { en: 'Muğla Province, Southwest Turkey', ar: 'محافظة موغلا، جنوب غرب تركيا' },
};

// Google Translate ile çevir
async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text || text.trim() === '') return '';

  try {
    const result = await translate(text, { from: 'tr', to: targetLang });
    return result.text;
  } catch (error) {
    console.error(`Çeviri hatası (${targetLang}):`, error);
    return text;
  }
}

// Konum zenginleştirmesi
function enhanceTranslation(text: string, locale: TargetLocale): string {
  let enhanced = text;
  for (const [location, translations] of Object.entries(locationEnhancements)) {
    const regex = new RegExp(`\\b${location}\\b`, 'gi');
    enhanced = enhanced.replace(regex, translations[locale]);
  }
  return enhanced;
}

// Slug oluştur
function generateSlug(title: string, suffix?: string): string {
  let slug = title.toLowerCase();

  // Türkçe karakterleri dönüştür
  const turkishChars: Record<string, string> = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
  };
  for (const [tr, en] of Object.entries(turkishChars)) {
    slug = slug.replace(new RegExp(tr, 'g'), en);
  }

  slug = slug.replace(/[^\w\s-]/g, '');
  slug = slug.replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');

  // Suffix ekle (benzersizlik için)
  if (suffix) {
    slug = `${slug}-${suffix}`;
  }

  return slug.substring(0, 100); // Max 100 karakter
}

// İçerik array'ini string'e çevir
function contentToString(icerik: Array<{ tip: string; metin: string }>): string {
  return icerik.map(item => {
    if (item.tip === 'baslik') {
      return `## ${item.metin}`;
    } else if (item.tip === 'altbaslik') {
      return `### ${item.metin}`;
    } else if (item.tip === 'liste') {
      return `- ${item.metin}`;
    } else {
      return item.metin;
    }
  }).join('\n\n');
}

// Blog yazısını çevir
async function translateBlogPost(
  postId: string,
  originalSlug: string,
  baslik: string,
  ozet: string,
  icerik: string,
  etiketler: string[],
  locale: TargetLocale
): Promise<void> {
  console.log(`  → ${localeNames[locale]} çeviriliyor...`);

  // İçerik çok uzunsa parçala
  const maxLength = 4000;
  let translatedContent = '';

  if (icerik.length > maxLength) {
    // Paragraf paragraf çevir
    const paragraphs = icerik.split('\n\n');
    const translatedParagraphs: string[] = [];

    for (const para of paragraphs) {
      if (para.trim()) {
        const translated = await translateText(para, locale);
        translatedParagraphs.push(translated);
        await new Promise(resolve => setTimeout(resolve, 300)); // Rate limiting
      }
    }
    translatedContent = translatedParagraphs.join('\n\n');
  } else {
    translatedContent = await translateText(icerik, locale);
  }

  // Diğerlerini çevir
  const [translatedTitle, translatedSummary, translatedTags] = await Promise.all([
    translateText(baslik, locale),
    translateText(ozet, locale),
    Promise.all(etiketler.slice(0, 5).map(tag => translateText(tag, locale))), // Max 5 tag
  ]);

  // Zenginleştir
  const enhancedTitle = enhanceTranslation(translatedTitle, locale);
  const enhancedSummary = enhanceTranslation(translatedSummary, locale);
  const enhancedContent = enhanceTranslation(translatedContent, locale);

  // SEO limitleri
  const seoTitle = enhancedTitle.length > 60 ? enhancedTitle.substring(0, 57) + '...' : enhancedTitle;
  const seoDesc = enhancedSummary.length > 160 ? enhancedSummary.substring(0, 157) + '...' : enhancedSummary;

  // Benzersiz slug oluştur (originalSlug + locale)
  const uniqueSlug = `${originalSlug}-${locale}`;

  // Veritabanına kaydet
  await prisma.blogPostTranslation.upsert({
    where: {
      postId_language: {
        postId: postId,
        language: locale,
      },
    },
    update: {
      baslik: enhancedTitle,
      slug: uniqueSlug,
      ozet: enhancedSummary,
      icerik: enhancedContent,
      etiketler: JSON.stringify(translatedTags),
      seoTitle,
      seoDescription: seoDesc,
      status: 'published',
      updatedAt: new Date(),
    },
    create: {
      postId: postId,
      language: locale,
      baslik: enhancedTitle,
      slug: uniqueSlug,
      ozet: enhancedSummary,
      icerik: enhancedContent,
      etiketler: JSON.stringify(translatedTags),
      seoTitle,
      seoDescription: seoDesc,
      status: 'published',
    },
  });

  console.log(`    ✓ ${localeNames[locale]} tamamlandı`);
}

// Ana fonksiyon
async function main() {
  console.log('📚 Blog Migration İşlemi Başlıyor...\n');

  // JSON dosyasını oku
  const jsonPath = path.join(__dirname, '../data/blog-posts.json');
  const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
  const { yazilar } = JSON.parse(jsonContent);

  console.log(`📋 Toplam ${yazilar.length} blog yazısı bulundu.\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < yazilar.length; i++) {
    const yazi = yazilar[i];
    console.log(`[${i + 1}/${yazilar.length}] "${yazi.baslik.substring(0, 50)}..."`);

    try {
      // İçeriği string'e çevir
      const icerikString = contentToString(yazi.icerik);

      // Ana blog yazısını veritabanına kaydet
      const blogPost = await prisma.blogPost.upsert({
        where: { originalSlug: yazi.slug },
        update: {
          kategori: yazi.kategori,
          yazar: yazi.yazar,
          kapakGorsel: yazi.kapakGorsel,
          yayinTarihi: new Date(yazi.yayinTarihi),
          aktif: true,
        },
        create: {
          originalSlug: yazi.slug,
          kategori: yazi.kategori,
          yazar: yazi.yazar,
          kapakGorsel: yazi.kapakGorsel,
          yayinTarihi: new Date(yazi.yayinTarihi),
          aktif: true,
        },
      });

      // Türkçe çeviriyi kaydet
      await prisma.blogPostTranslation.upsert({
        where: {
          postId_language: {
            postId: blogPost.id,
            language: 'tr',
          },
        },
        update: {
          baslik: yazi.baslik,
          slug: yazi.slug,
          ozet: yazi.ozet,
          icerik: icerikString,
          etiketler: JSON.stringify(yazi.etiketler),
          seoTitle: yazi.baslik.length > 60 ? yazi.baslik.substring(0, 57) + '...' : yazi.baslik,
          seoDescription: yazi.ozet.length > 160 ? yazi.ozet.substring(0, 157) + '...' : yazi.ozet,
          status: 'published',
        },
        create: {
          postId: blogPost.id,
          language: 'tr',
          baslik: yazi.baslik,
          slug: yazi.slug,
          ozet: yazi.ozet,
          icerik: icerikString,
          etiketler: JSON.stringify(yazi.etiketler),
          seoTitle: yazi.baslik.length > 60 ? yazi.baslik.substring(0, 57) + '...' : yazi.baslik,
          seoDescription: yazi.ozet.length > 160 ? yazi.ozet.substring(0, 157) + '...' : yazi.ozet,
          status: 'published',
        },
      });

      console.log('  → Türkçe kaydedildi');

      // Diğer dillere çevir
      for (const locale of targetLocales) {
        await translateBlogPost(
          blogPost.id,
          yazi.slug, // originalSlug
          yazi.baslik,
          yazi.ozet,
          icerikString,
          yazi.etiketler,
          locale
        );
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      success++;
    } catch (error) {
      console.error(`  ✗ Hata: ${error}`);
      failed++;
    }

    console.log('');
  }

  console.log('═'.repeat(50));
  console.log(`✅ Başarılı: ${success} blog yazısı`);
  console.log(`❌ Başarısız: ${failed} blog yazısı`);
  console.log(`📊 Toplam çeviri: ${success * 3} (${success} TR + ${success} EN + ${success} AR)`);
  console.log('═'.repeat(50));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
