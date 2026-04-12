/**
 * Mevcut ilanları İngilizce ve Arapça'ya çeviren script
 * Kullanım: npx tsx scripts/translate-listings.ts
 */

import { PrismaClient } from '../lib/generated/prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import translate from 'google-translate-api-x';

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
  'Dalaman': { en: 'Dalaman, near international airport', ar: 'دالامان، بالقرب من المطار الدولي' },
  'Fethiye': { en: 'Fethiye, Turquoise Coast', ar: 'فتحية، الساحل الفيروزي' },
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
function generateSlug(title: string, locale: TargetLocale): string {
  let slug = title.toLowerCase();

  // Türkçe karakterleri dönüştür
  const turkishChars: Record<string, string> = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
  };
  for (const [tr, en] of Object.entries(turkishChars)) {
    slug = slug.replace(new RegExp(tr, 'g'), en);
  }

  if (locale === 'ar') {
    slug = slug.replace(/[^\w\s\u0600-\u06FF-]/g, '');
  } else {
    slug = slug.replace(/[^\w\s-]/g, '');
  }

  slug = slug.replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
  return slug;
}

// Ana çeviri fonksiyonu
async function translateListing(
  ilan: { id: string; baslik: string; aciklama: string; slug: string },
  locale: TargetLocale
): Promise<void> {
  console.log(`  → ${localeNames[locale]} çeviriliyor...`);

  // Çevir
  const [translatedTitle, translatedDesc] = await Promise.all([
    translateText(ilan.baslik, locale),
    translateText(ilan.aciklama, locale),
  ]);

  // Zenginleştir
  const enhancedTitle = enhanceTranslation(translatedTitle, locale);
  const enhancedDesc = enhanceTranslation(translatedDesc, locale);

  // SEO limitleri
  const seoTitle = enhancedTitle.length > 60 ? enhancedTitle.substring(0, 57) + '...' : enhancedTitle;
  const seoDesc = enhancedDesc.length > 160 ? enhancedDesc.substring(0, 157) + '...' : enhancedDesc;

  // Veritabanına kaydet
  await prisma.ilanTranslation.upsert({
    where: {
      ilanId_language: {
        ilanId: ilan.id,
        language: locale,
      },
    },
    update: {
      baslik: enhancedTitle,
      slug: generateSlug(enhancedTitle, locale),
      aciklama: enhancedDesc,
      seoTitle,
      seoDescription: seoDesc,
      status: 'published',
      translatedBy: 'google',
      updatedAt: new Date(),
    },
    create: {
      ilanId: ilan.id,
      language: locale,
      baslik: enhancedTitle,
      slug: generateSlug(enhancedTitle, locale),
      aciklama: enhancedDesc,
      seoTitle,
      seoDescription: seoDesc,
      status: 'published',
      translatedBy: 'google',
    },
  });

  console.log(`    ✓ ${localeNames[locale]} tamamlandı`);
}

// Ana fonksiyon
async function main() {
  console.log('🌍 İlan Çeviri İşlemi Başlıyor...\n');

  // Tüm aktif ilanları al
  const ilanlar = await prisma.ilan.findMany({
    where: { durum: 'aktif' },
    select: { id: true, baslik: true, aciklama: true, slug: true },
  });

  console.log(`📋 Toplam ${ilanlar.length} ilan bulundu.\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < ilanlar.length; i++) {
    const ilan = ilanlar[i];
    console.log(`[${i + 1}/${ilanlar.length}] "${ilan.baslik.substring(0, 40)}..."`);

    try {
      // Her iki dile çevir
      for (const locale of targetLocales) {
        await translateListing(ilan, locale);
        // Rate limiting - Google'ın limitlerini aşmamak için
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      success++;
    } catch (error) {
      console.error(`  ✗ Hata: ${error}`);
      failed++;
    }

    console.log('');
  }

  console.log('═'.repeat(50));
  console.log(`✅ Başarılı: ${success} ilan`);
  console.log(`❌ Başarısız: ${failed} ilan`);
  console.log(`📊 Toplam çeviri: ${success * 2} (${success} İngilizce + ${success} Arapça)`);
  console.log('═'.repeat(50));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
