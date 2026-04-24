/**
 * Hizmetler Translation Script
 * Translates service data from Turkish to English and Arabic using Google Translate
 *
 * Usage: npx tsx scripts/translate-hizmetler.ts
 */

import translate from 'google-translate-api-x';
import * as fs from 'fs';
import * as path from 'path';

// Import original data
import hizmetlerData from '../data/hizmetler.json';

interface AltHizmet {
  baslik: string;
  aciklama: string;
  ikon: string;
}

interface HizmetSSS {
  soru: string;
  cevap: string;
}

interface Hizmet {
  id: string;
  slug: string;
  baslik: string;
  kisaAciklama: string;
  uzunAciklama: string;
  ikon: string;
  altHizmetler: AltHizmet[];
  bolge: string[];
  sss: HizmetSSS[];
}

async function translateText(text: string, targetLang: 'en' | 'ar'): Promise<string> {
  if (!text || text.trim().length === 0) return text;

  try {
    const result = await translate(text, { from: 'tr', to: targetLang });
    return result.text;
  } catch (error) {
    console.error(`Translation error for "${text.substring(0, 50)}...":`, error);
    return text; // Return original on error
  }
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateHizmet(hizmet: Hizmet, targetLang: 'en' | 'ar'): Promise<Hizmet> {
  // Translate main service fields
  const [baslik, kisaAciklama, uzunAciklama] = await Promise.all([
    translateText(hizmet.baslik, targetLang),
    translateText(hizmet.kisaAciklama, targetLang),
    translateText(hizmet.uzunAciklama, targetLang),
  ]);

  await delay(500);

  // Translate altHizmetler
  const altHizmetler: AltHizmet[] = [];
  for (const alt of hizmet.altHizmetler) {
    const [altBaslik, altAciklama] = await Promise.all([
      translateText(alt.baslik, targetLang),
      translateText(alt.aciklama, targetLang),
    ]);
    altHizmetler.push({
      baslik: altBaslik,
      aciklama: altAciklama,
      ikon: alt.ikon,
    });
    await delay(300);
  }

  // Translate SSS
  const sss: HizmetSSS[] = [];
  for (const s of hizmet.sss) {
    const [soru, cevap] = await Promise.all([
      translateText(s.soru, targetLang),
      translateText(s.cevap, targetLang),
    ]);
    sss.push({ soru, cevap });
    await delay(300);
  }

  return {
    id: hizmet.id,
    slug: hizmet.slug,
    baslik,
    kisaAciklama,
    uzunAciklama,
    ikon: hizmet.ikon,
    altHizmetler,
    bolge: hizmet.bolge, // Keep region names in Turkish
    sss,
  };
}

async function main() {
  console.log('Hizmetler Translation Script');
  console.log('='.repeat(50));

  const hizmetler = hizmetlerData.hizmetler as Hizmet[];
  const targetLanguages: ('en' | 'ar')[] = ['en', 'ar'];

  const results: Record<string, Hizmet[]> = {
    en: [],
    ar: [],
  };

  console.log(`Translating ${hizmetler.length} services...`);

  for (const lang of targetLanguages) {
    console.log(`\n=== Translating to ${lang.toUpperCase()} ===`);

    for (let i = 0; i < hizmetler.length; i++) {
      const hizmet = hizmetler[i];
      console.log(`\n[${i + 1}/${hizmetler.length}] ${hizmet.baslik}`);

      try {
        const translated = await translateHizmet(hizmet, lang);
        results[lang].push(translated);
        console.log(`  ✓ Translated to: ${translated.baslik}`);
      } catch (error) {
        console.error(`  ✗ Error:`, error);
        // Keep original on error
        results[lang].push(hizmet);
      }

      // Rate limiting between services
      await delay(1000);
    }

    console.log(`\n✓ ${lang.toUpperCase()} translations completed`);
  }

  // Generate TypeScript output file
  const output = `// Auto-generated translations for hizmetler
// Generated on: ${new Date().toISOString()}
// DO NOT EDIT MANUALLY - Run scripts/translate-hizmetler.ts to regenerate

import type { Locale } from '@/lib/i18n/config';

interface AltHizmet {
  baslik: string;
  aciklama: string;
  ikon: string;
}

interface HizmetSSS {
  soru: string;
  cevap: string;
}

export interface TranslatedHizmet {
  id: string;
  slug: string;
  baslik: string;
  kisaAciklama: string;
  uzunAciklama: string;
  ikon: string;
  altHizmetler: AltHizmet[];
  bolge: string[];
  sss: HizmetSSS[];
}

export const hizmetlerEN: TranslatedHizmet[] = ${JSON.stringify(results.en, null, 2)};

export const hizmetlerAR: TranslatedHizmet[] = ${JSON.stringify(results.ar, null, 2)};

// Get translated services by locale
export function getHizmetler(locale: Locale): TranslatedHizmet[] {
  switch (locale) {
    case 'en':
      return hizmetlerEN;
    case 'ar':
      return hizmetlerAR;
    default:
      // Return empty array for TR - use original hizmetler.json
      return [];
  }
}

// Get single service by slug and locale
export function getHizmetBySlug(slug: string, locale: Locale): TranslatedHizmet | null {
  const hizmetler = getHizmetler(locale);
  return hizmetler.find(h => h.slug === slug) || null;
}
`;

  const outputPath = path.join(process.cwd(), 'data', 'hizmetler-translations.ts');
  fs.writeFileSync(outputPath, output, 'utf-8');

  console.log('\n' + '='.repeat(50));
  console.log(`✓ Translations saved to: ${outputPath}`);
  console.log(`  - ${results.en.length} English services`);
  console.log(`  - ${results.ar.length} Arabic services`);
}

main().catch(console.error);
