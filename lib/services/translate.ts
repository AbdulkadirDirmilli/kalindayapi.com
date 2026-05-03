/**
 * DeepL API Translation Service
 * Ücretsiz plan: Aylık 500.000 karakter
 * https://www.deepl.com/pro-api
 */

const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

type SupportedLanguage = 'TR' | 'EN' | 'AR' | 'DE' | 'RU';

interface TranslateOptions {
  text: string;
  targetLang: SupportedLanguage;
  sourceLang?: SupportedLanguage;
}

interface DeepLResponse {
  translations: Array<{
    detected_source_language: string;
    text: string;
  }>;
}

/**
 * DeepL API ile metin çevirisi yapar
 */
export async function translateText({ text, targetLang, sourceLang = 'TR' }: TranslateOptions): Promise<string> {
  const apiKey = process.env.DEEPL_API_KEY;

  if (!apiKey) {
    throw new Error('DEEPL_API_KEY environment variable is not set');
  }

  if (!text || text.trim().length === 0) {
    return text;
  }

  try {
    const response = await fetch(DEEPL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: text,
        target_lang: targetLang,
        source_lang: sourceLang,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`DeepL API error: ${response.status} - ${error}`);
    }

    const data: DeepLResponse = await response.json();
    return data.translations[0]?.text || text;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}

/**
 * Birden fazla metni toplu çevirir
 */
export async function translateMultiple(
  texts: string[],
  targetLang: SupportedLanguage,
  sourceLang: SupportedLanguage = 'TR'
): Promise<string[]> {
  const apiKey = process.env.DEEPL_API_KEY;

  if (!apiKey) {
    throw new Error('DEEPL_API_KEY environment variable is not set');
  }

  // Boş metinleri filtrele
  const validTexts = texts.filter(t => t && t.trim().length > 0);
  if (validTexts.length === 0) {
    return texts;
  }

  try {
    const params = new URLSearchParams();
    validTexts.forEach(text => params.append('text', text));
    params.append('target_lang', targetLang);
    params.append('source_lang', sourceLang);

    const response = await fetch(DEEPL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`DeepL API error: ${response.status} - ${error}`);
    }

    const data: DeepLResponse = await response.json();
    return data.translations.map(t => t.text);
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}

/**
 * İlan verilerini çevirir
 */
export async function translateIlan(
  ilan: { baslik: string; aciklama: string; kategori: string; tip: string },
  targetLang: SupportedLanguage
): Promise<{ baslik: string; aciklama: string; kategori: string; tip: string }> {
  // Kategori ve tip için statik çeviriler
  const categoryTranslations: Record<SupportedLanguage, Record<string, string>> = {
    TR: { satilik: 'Satılık', kiralik: 'Kiralık' },
    EN: { satilik: 'For Sale', kiralik: 'For Rent' },
    AR: { satilik: 'للبيع', kiralik: 'للإيجار' },
    DE: { satilik: 'Zu verkaufen', kiralik: 'Zu vermieten' },
    RU: { satilik: 'Продажа', kiralik: 'Аренда' },
  };

  const typeTranslations: Record<SupportedLanguage, Record<string, string>> = {
    TR: { daire: 'Daire', villa: 'Villa', arsa: 'Arsa', ticari: 'Ticari', mustakil: 'Müstakil Ev', tarla: 'Tarla', ofis: 'Ofis', dukkan: 'Dükkan' },
    EN: { daire: 'Apartment', villa: 'Villa', arsa: 'Land', ticari: 'Commercial', mustakil: 'Detached House', tarla: 'Agricultural Land', ofis: 'Office', dukkan: 'Shop' },
    AR: { daire: 'شقة', villa: 'فيلا', arsa: 'أرض', ticari: 'تجاري', mustakil: 'منزل مستقل', tarla: 'أرض زراعية', ofis: 'مكتب', dukkan: 'محل' },
    DE: { daire: 'Wohnung', villa: 'Villa', arsa: 'Grundstück', ticari: 'Gewerbe', mustakil: 'Einfamilienhaus', tarla: 'Ackerland', ofis: 'Büro', dukkan: 'Laden' },
    RU: { daire: 'Квартира', villa: 'Вилла', arsa: 'Участок', ticari: 'Коммерческая', mustakil: 'Частный дом', tarla: 'Сельхозугодья', ofis: 'Офис', dukkan: 'Магазин' },
  };

  // Başlık ve açıklamayı çevir
  const [translatedBaslik, translatedAciklama] = await translateMultiple(
    [ilan.baslik, ilan.aciklama],
    targetLang,
    'TR'
  );

  return {
    baslik: translatedBaslik,
    aciklama: translatedAciklama,
    kategori: categoryTranslations[targetLang]?.[ilan.kategori] || ilan.kategori,
    tip: typeTranslations[targetLang]?.[ilan.tip] || ilan.tip,
  };
}

/**
 * Slug oluşturur (çevrilmiş başlıktan)
 */
export function createSlug(text: string): string {
  // Türkçe, Arapça, Almanca ve Rusça karakterleri translitere et
  const charMap: Record<string, string> = {
    // Türkçe
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ş': 's',
    'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ş': 'S',
    // Almanca
    'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss',
    'Ä': 'Ae', 'Ö': 'Oe', 'Ü': 'Ue',
    // Arapça için basit transliterasyon
    'ا': 'a', 'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'h',
    'خ': 'kh', 'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'س': 's',
    'ش': 'sh', 'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': 'a',
    'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm',
    'ن': 'n', 'ه': 'h', 'و': 'w', 'ي': 'y', 'ى': 'a', 'ة': 'h',
    'أ': 'a', 'إ': 'i', 'آ': 'a', 'ؤ': 'w', 'ئ': 'y',
    // Rusça (Kiril)
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
  };

  let slug = text.toLowerCase();

  // Karakter dönüşümü
  for (const [char, replacement] of Object.entries(charMap)) {
    slug = slug.replace(new RegExp(char, 'g'), replacement);
  }

  // Sadece alfanumerik ve tire bırak
  slug = slug
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return slug;
}
