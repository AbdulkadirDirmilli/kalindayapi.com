/**
 * Google Translate Service (Free, no API key required)
 * Uses google-translate-api-x package
 */

import translate from 'google-translate-api-x';

export type SupportedLanguage = 'tr' | 'en' | 'ar';

interface TranslateOptions {
  text: string;
  targetLang: SupportedLanguage;
  sourceLang?: SupportedLanguage;
}

/**
 * Translate text using Google Translate
 */
export async function translateText({
  text,
  targetLang,
  sourceLang = 'tr'
}: TranslateOptions): Promise<string> {
  if (!text || text.trim().length === 0) {
    return text;
  }

  // Don't translate if source and target are the same
  if (sourceLang === targetLang) {
    return text;
  }

  try {
    const result = await translate(text, {
      from: sourceLang,
      to: targetLang
    });
    return result.text;
  } catch (error) {
    console.error('Google Translate error:', error);
    throw error;
  }
}

/**
 * Translate multiple texts in batch
 */
export async function translateMultiple(
  texts: string[],
  targetLang: SupportedLanguage,
  sourceLang: SupportedLanguage = 'tr'
): Promise<string[]> {
  if (sourceLang === targetLang) {
    return texts;
  }

  const validTexts = texts.filter(t => t && t.trim().length > 0);
  if (validTexts.length === 0) {
    return texts;
  }

  try {
    // Translate in batches to avoid rate limiting
    const results: string[] = [];
    const batchSize = 10;

    for (let i = 0; i < validTexts.length; i += batchSize) {
      const batch = validTexts.slice(i, i + batchSize);
      const translations = await Promise.all(
        batch.map(text => translateText({ text, targetLang, sourceLang }))
      );
      results.push(...translations);

      // Small delay between batches to avoid rate limiting
      if (i + batchSize < validTexts.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    return results;
  } catch (error) {
    console.error('Batch translation error:', error);
    throw error;
  }
}

/**
 * Translate FAQ item
 */
export async function translateFAQ(
  faq: { soru: string; cevap: string; kategori: string },
  targetLang: SupportedLanguage
): Promise<{ soru: string; cevap: string; kategori: string }> {
  const [soru, cevap] = await translateMultiple(
    [faq.soru, faq.cevap],
    targetLang,
    'tr'
  );

  // Category translations (static mapping)
  const categoryTranslations: Record<SupportedLanguage, Record<string, string>> = {
    tr: {
      genel: 'Genel Sorular',
      emlak: 'Emlak Danışmanlığı',
      kiralik: 'Kiralık İşlemleri',
      insaat: 'İnşaat & Tadilat',
      belge: 'Belgeler & Prosedürler',
      odeme: 'Ödeme & Finansman',
    },
    en: {
      genel: 'General Questions',
      emlak: 'Real Estate Consulting',
      kiralik: 'Rental Services',
      insaat: 'Construction & Renovation',
      belge: 'Documents & Procedures',
      odeme: 'Payment & Financing',
    },
    ar: {
      genel: 'أسئلة عامة',
      emlak: 'استشارات عقارية',
      kiralik: 'خدمات الإيجار',
      insaat: 'البناء والتجديد',
      belge: 'المستندات والإجراءات',
      odeme: 'الدفع والتمويل',
    },
  };

  return {
    soru,
    cevap,
    kategori: faq.kategori, // Keep original category ID
  };
}
