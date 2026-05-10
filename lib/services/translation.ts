import { type Locale } from '../i18n';
import translate from 'google-translate-api-x';

interface TranslationResult {
  title: string;
  description: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
  slug?: string;
}

interface TranslationOptions {
  sourceLocale?: Locale;
  targetLocale: Locale;
  contentType: 'listing' | 'service' | 'blog' | 'static';
}

// Dil kodları eşlemesi
const localeToGoogleLang: Record<Locale, string> = {
  tr: 'tr',
  en: 'en',
  ar: 'ar',
  de: 'de',
  ru: 'ru',
};

// Emlak terimleri - çeviri sonrası düzeltme için
const realEstateTerms: Record<string, Record<Locale, string>> = {
  'satılık': { tr: 'satılık', en: 'for sale', ar: 'للبيع', de: 'zu verkaufen', ru: 'продажа' },
  'kiralık': { tr: 'kiralık', en: 'for rent', ar: 'للإيجار', de: 'zu vermieten', ru: 'аренда' },
  'daire': { tr: 'daire', en: 'apartment', ar: 'شقة', de: 'Wohnung', ru: 'квартира' },
  'villa': { tr: 'villa', en: 'villa', ar: 'فيلا', de: 'Villa', ru: 'вилла' },
  'arsa': { tr: 'arsa', en: 'land', ar: 'أرض', de: 'Grundstück', ru: 'участок' },
  'ticari': { tr: 'ticari', en: 'commercial', ar: 'تجاري', de: 'Gewerbe', ru: 'коммерческая' },
  'm²': { tr: 'm²', en: 'sqm', ar: 'م²', de: 'm²', ru: 'м²' },
  'metrekare': { tr: 'metrekare', en: 'square meters', ar: 'متر مربع', de: 'Quadratmeter', ru: 'квадратных метров' },
};

// Konum açıklamaları - uluslararası kitle için
const locationEnhancements: Record<string, Record<Locale, string>> = {
  'Ortaca': {
    tr: 'Ortaca',
    en: 'Ortaca, Turkish Riviera',
    ar: 'أورتاجا، الريفييرا التركية',
    de: 'Ortaca, Türkische Riviera',
    ru: 'Ортаджа, Турецкая Ривьера',
  },
  'Dalyan': {
    tr: 'Dalyan',
    en: 'Dalyan, Mediterranean Turkey',
    ar: 'داليان، البحر المتوسط التركي',
    de: 'Dalyan, Mittelmeer-Türkei',
    ru: 'Далян, Средиземноморская Турция',
  },
  'Köyceğiz': {
    tr: 'Köyceğiz',
    en: 'Köyceğiz, Aegean Turkey',
    ar: 'كويجيز، بحر إيجة التركي',
    de: 'Köyceğiz, Ägäische Türkei',
    ru: 'Кёйджегиз, Эгейская Турция',
  },
  'Muğla': {
    tr: 'Muğla',
    en: 'Muğla Province, Southwest Turkey',
    ar: 'محافظة موغلا، جنوب غرب تركيا',
    de: 'Provinz Muğla, Südwesttürkei',
    ru: 'Провинция Мугла, Юго-Западная Турция',
  },
  'Dalaman': {
    tr: 'Dalaman',
    en: 'Dalaman, near international airport',
    ar: 'دالامان، بالقرب من المطار الدولي',
    de: 'Dalaman, nahe internationalem Flughafen',
    ru: 'Даламан, рядом с международным аэропортом',
  },
  'Fethiye': {
    tr: 'Fethiye',
    en: 'Fethiye, Turquoise Coast',
    ar: 'فتحية، الساحل الفيروزي',
    de: 'Fethiye, Türkisküste',
    ru: 'Фетхие, Бирюзовый берег',
  },
};

// Google Translate ile metin çevir
async function translateText(text: string, targetLocale: Locale): Promise<string> {
  if (!text || text.trim() === '') return '';

  try {
    const result = await translate(text, {
      from: 'tr',
      to: localeToGoogleLang[targetLocale],
    });

    return result.text;
  } catch (error) {
    console.error('Google Translate error:', error);
    return text; // Hata durumunda orijinal metni döndür
  }
}

// Çeviri sonrası iyileştirmeler
function enhanceTranslation(text: string, targetLocale: Locale): string {
  let enhanced = text;

  // Konum iyileştirmeleri
  for (const [location, translations] of Object.entries(locationEnhancements)) {
    // Sadece İngilizce ve Arapça için konum açıklamalarını genişlet
    if (targetLocale !== 'tr') {
      const regex = new RegExp(`\\b${location}\\b`, 'gi');
      enhanced = enhanced.replace(regex, translations[targetLocale]);
    }
  }

  return enhanced;
}

// SEO dostu slug oluştur
export function generateSlug(title: string, locale: Locale): string {
  let slug = title.toLowerCase();

  // Türkçe karakterleri dönüştür
  const turkishChars: Record<string, string> = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u',
  };

  for (const [tr, en] of Object.entries(turkishChars)) {
    slug = slug.replace(new RegExp(tr, 'g'), en);
  }

  // Arapça için özel karakterleri koru
  if (locale === 'ar') {
    slug = slug.replace(/[^\w\s\u0600-\u06FF-]/g, '');
  } else {
    slug = slug.replace(/[^\w\s-]/g, '');
  }

  // Boşlukları tire ile değiştir
  slug = slug.replace(/\s+/g, '-');

  // Birden fazla tireyi tek tireye indir
  slug = slug.replace(/-+/g, '-');

  // Baş ve sondaki tireleri kaldır
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}

// Ana çeviri fonksiyonu
export async function translateContent(
  content: { title: string; description: string; content?: string },
  options: TranslationOptions
): Promise<TranslationResult | null> {
  const { targetLocale } = options;

  // Türkçe'ye çeviri gerekmez
  if (targetLocale === 'tr') {
    return {
      title: content.title,
      description: content.description,
      content: content.content || '',
      seoTitle: content.title,
      seoDescription: content.description,
      slug: generateSlug(content.title, 'tr'),
    };
  }

  try {
    // Paralel çeviri
    const [translatedTitle, translatedDescription, translatedContent] = await Promise.all([
      translateText(content.title, targetLocale),
      translateText(content.description, targetLocale),
      content.content ? translateText(content.content, targetLocale) : Promise.resolve(''),
    ]);

    // İyileştirmeler uygula
    const enhancedTitle = enhanceTranslation(translatedTitle, targetLocale);
    const enhancedDescription = enhanceTranslation(translatedDescription, targetLocale);
    const enhancedContent = enhanceTranslation(translatedContent, targetLocale);

    // SEO başlık (60 karakter limit)
    const seoTitle = enhancedTitle.length > 60
      ? enhancedTitle.substring(0, 57) + '...'
      : enhancedTitle;

    // SEO açıklama (160 karakter limit)
    const seoDescription = enhancedDescription.length > 160
      ? enhancedDescription.substring(0, 157) + '...'
      : enhancedDescription;

    return {
      title: enhancedTitle,
      description: enhancedDescription,
      content: enhancedContent,
      seoTitle,
      seoDescription,
      slug: generateSlug(enhancedTitle, targetLocale),
    };
  } catch (error) {
    console.error('Translation error:', error);
    return null;
  }
}

// Toplu çeviri
export async function translateBatch(
  items: Array<{ id: string; title: string; description: string; content?: string }>,
  options: TranslationOptions
): Promise<Map<string, TranslationResult>> {
  const results = new Map<string, TranslationResult>();

  // Rate limiting için sırayla işle (Google'ın rate limit'i var)
  for (const item of items) {
    const result = await translateContent(
      { title: item.title, description: item.description, content: item.content },
      options
    );

    if (result) {
      results.set(item.id, result);
    }

    // Rate limiting - 500ms bekle
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return results;
}

// Basit terim çevirisi (hızlı kullanım için)
export function translateTerms(text: string, targetLocale: Locale): string {
  let translated = text;

  for (const [term, translations] of Object.entries(realEstateTerms)) {
    const regex = new RegExp(term, 'gi');
    translated = translated.replace(regex, translations[targetLocale]);
  }

  return translated;
}

// =====================================================
// OTOMATİK ÇEVİRİ VE VERİTABANI KAYIT FONKSİYONLARI
// =====================================================

import { prisma } from '../prisma';

const targetLocales = ['en', 'ar', 'de', 'ru'] as const;
type TargetLocale = 'en' | 'ar' | 'de' | 'ru';

const localeNamesMap: Record<TargetLocale, string> = {
  en: 'İngilizce',
  ar: 'Arapça',
  de: 'Almanca',
  ru: 'Rusça',
};

/**
 * Tek bir ilanı belirtilen dile çevir ve veritabanına kaydet
 */
async function translateListingToLocale(
  ilan: { id: string; baslik: string; aciklama: string },
  locale: TargetLocale
): Promise<void> {
  console.log(`  → İlan ${ilan.id}: ${localeNamesMap[locale]} çeviriliyor...`);

  const result = await translateContent(
    { title: ilan.baslik, description: ilan.aciklama },
    { targetLocale: locale, contentType: 'listing' }
  );

  if (!result) {
    console.error(`    ✗ ${localeNamesMap[locale]} çeviri başarısız`);
    return;
  }

  // Veritabanına kaydet
  await prisma.ilanTranslation.upsert({
    where: {
      ilanId_language: {
        ilanId: ilan.id,
        language: locale,
      },
    },
    update: {
      baslik: result.title,
      slug: result.slug || generateSlug(result.title, locale),
      aciklama: result.description,
      seoTitle: result.seoTitle,
      seoDescription: result.seoDescription,
      status: 'published',
      translatedBy: 'google',
      updatedAt: new Date(),
    },
    create: {
      ilanId: ilan.id,
      language: locale,
      baslik: result.title,
      slug: result.slug || generateSlug(result.title, locale),
      aciklama: result.description,
      seoTitle: result.seoTitle,
      seoDescription: result.seoDescription,
      status: 'published',
      translatedBy: 'google',
    },
  });

  console.log(`    ✓ ${localeNamesMap[locale]} tamamlandı`);
}

/**
 * İlanı tüm dillere çevir ve veritabanına kaydet
 * @param ilanId - İlan ID
 * @param baslik - İlan başlığı
 * @param aciklama - İlan açıklaması
 */
export async function translateAndSaveListing(
  ilanId: string,
  baslik: string,
  aciklama: string
): Promise<void> {
  console.log(`🌍 İlan çevirisi başlıyor: ${ilanId}`);

  try {
    for (const locale of targetLocales) {
      await translateListingToLocale({ id: ilanId, baslik, aciklama }, locale);
      // Rate limiting - Google API limitlerini aşmamak için
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log(`✅ İlan çevirisi tamamlandı: ${ilanId}`);
  } catch (error) {
    console.error(`❌ İlan çevirisi başarısız: ${ilanId}`, error);
  }
}

/**
 * Blog yazısını tüm dillere çevir ve veritabanına kaydet
 */
export async function translateAndSaveBlogPost(
  postId: string,
  baslik: string,
  ozet: string,
  icerik: string
): Promise<void> {
  console.log(`🌍 Blog çevirisi başlıyor: ${postId}`);

  try {
    for (const locale of targetLocales) {
      console.log(`  → Blog ${postId}: ${localeNamesMap[locale]} çeviriliyor...`);

      const result = await translateContent(
        { title: baslik, description: ozet, content: icerik },
        { targetLocale: locale, contentType: 'blog' }
      );

      if (!result) {
        console.error(`    ✗ ${localeNamesMap[locale]} çeviri başarısız`);
        continue;
      }

      // Veritabanına kaydet
      await prisma.blogPostTranslation.upsert({
        where: {
          postId_language: {
            postId: postId,
            language: locale,
          },
        },
        update: {
          baslik: result.title,
          slug: result.slug || generateSlug(result.title, locale),
          ozet: result.description,
          icerik: result.content,
          seoTitle: result.seoTitle,
          seoDescription: result.seoDescription,
          status: 'published',
          updatedAt: new Date(),
        },
        create: {
          postId: postId,
          language: locale,
          baslik: result.title,
          slug: result.slug || generateSlug(result.title, locale),
          ozet: result.description,
          icerik: result.content,
          etiketler: '[]',
          seoTitle: result.seoTitle,
          seoDescription: result.seoDescription,
          status: 'published',
        },
      });

      console.log(`    ✓ ${localeNamesMap[locale]} tamamlandı`);

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log(`✅ Blog çevirisi tamamlandı: ${postId}`);
  } catch (error) {
    console.error(`❌ Blog çevirisi başarısız: ${postId}`, error);
  }
}

/**
 * Arka planda çeviri başlat (non-blocking)
 * API yanıtını bekletmeden çeviriyi arka planda yapar
 */
export function translateListingAsync(
  ilanId: string,
  baslik: string,
  aciklama: string
): void {
  // Fire and forget - arka planda çalışır
  translateAndSaveListing(ilanId, baslik, aciklama).catch(console.error);
}

export function translateBlogPostAsync(
  postId: string,
  baslik: string,
  ozet: string,
  icerik: string
): void {
  // Fire and forget - arka planda çalışır
  translateAndSaveBlogPost(postId, baslik, ozet, icerik).catch(console.error);
}
