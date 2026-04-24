/**
 * SSS Translation Script
 * Translates FAQ items from Turkish to English and Arabic using Google Translate
 *
 * Usage: npx tsx scripts/translate-sss.ts
 */

import translate from 'google-translate-api-x';
import * as fs from 'fs';
import * as path from 'path';

interface FAQ {
  soru: string;
  cevap: string;
  kategori: string;
}

// Source FAQ data (Turkish)
const sorularTR: FAQ[] = [
  // Genel Sorular
  {
    kategori: "genel",
    soru: "Kalinda Yapı hangi bölgelerde hizmet veriyor?",
    cevap: "Kalinda Yapı olarak Muğla'nın tüm ilçelerinde aktif portföyümüz bulunuyor: Ortaca, Dalyan, Köyceğiz, Dalaman, Fethiye, Marmaris, Bodrum, Milas, Datça, Menteşe, Yatağan, Ula, Kavaklıdere ve Seydikemer. 2022'den bu yana 200+ emlak işlemi ve 100+ tadilat projesi tamamladık.",
  },
  {
    kategori: "genel",
    soru: "Kalinda Yapı'nın çalışma saatleri nedir?",
    cevap: "Hafta içi (Pazartesi - Cuma) 08:00 - 18:00, Cumartesi 09:00 - 14:00 saatleri arasında ofisimiz açıktır. Pazar günleri kapalıyız ancak acil durumlar için WhatsApp üzerinden 7/24 ulaşabilirsiniz.",
  },
  {
    kategori: "genel",
    soru: "Kalinda Yapı'ya nasıl ulaşabilirim?",
    cevap: "Telefon (+90 537 053 07 54 veya +90 532 159 15 56), e-posta (info@kalindayapi.com) veya WhatsApp ile ulaşabilirsiniz. Ofisimiz Ortaca merkezdedir.",
  },
  {
    kategori: "genel",
    soru: "Kalinda Yapı lisanslı bir emlak firması mı?",
    cevap: "Evet, Kalinda Yapı resmi emlak danışmanlığı lisansına sahip, Muğla Ticaret Odası'na kayıtlı yasal bir firmadır.",
  },
  {
    kategori: "genel",
    soru: "Ücretsiz danışmanlık alabilir miyim?",
    cevap: "Evet, emlak alım-satım, kiralama veya tadilat projeleriniz için ilk görüşme ve ön değerlendirme tamamen ücretsizdir.",
  },
  // Emlak
  {
    kategori: "emlak",
    soru: "2026'da Ortaca'da satılık daire fiyatları ne kadar?",
    cevap: "Ortaca'da 2+1 daireler 4-10 milyon TL, 3+1 daireler 7-18 milyon TL aralığındadır. Metrekare fiyatları 25.000-40.000 TL arasında.",
  },
  {
    kategori: "emlak",
    soru: "Dalyan'da villa satın almak için ne kadar bütçe gerekir?",
    cevap: "Dalyan'da villa fiyatları 12 milyon TL'den başlayıp, kanal manzaralı ve havuzlu villalarda 80 milyon TL'ye kadar çıkabiliyor.",
  },
  {
    kategori: "emlak",
    soru: "Emlak danışmanlık hizmeti ücretli mi?",
    cevap: "Ev arayanlar için danışmanlık ücretsizdir. Satış tamamlandığında %2 komisyon, kiralamada 1 aylık kira bedeli komisyon alınır.",
  },
  {
    kategori: "emlak",
    soru: "Yabancılara gayrimenkul satışı yapıyor musunuz?",
    cevap: "Evet, yabancı uyruklu müşterilere tam destek sağlıyoruz: tapu işlemleri, tercümanlık, vergi numarası ve oturma izni danışmanlığı.",
  },
  // Kiralık
  {
    kategori: "kiralik",
    soru: "Ortaca'da kiralık daire bulmak ne kadar sürer?",
    cevap: "Genellikle 1 hafta içinde kriterlerinize uygun kiralık daire bulabiliyoruz. Sezon döneminde süre uzayabilir.",
  },
  {
    kategori: "kiralik",
    soru: "Kiralık ev için hangi belgeler gerekiyor?",
    cevap: "Kiracıdan: Nüfus cüzdanı, gelir belgesi, ikametgah. Ev sahibinden: Tapu, kimlik fotokopisi.",
  },
  {
    kategori: "kiralik",
    soru: "Dalyan'da yazlık kiralama yapıyor musunuz?",
    cevap: "Evet, günlük, haftalık ve aylık yazlık kiralama portföyümüz mevcuttur. Havuzlu villalar ve denize yakın daireler seçenekler arasında.",
  },
  // İnşaat
  {
    kategori: "insaat",
    soru: "Anahtar teslim ev inşaatı ne kadar sürer?",
    cevap: "Tek katlı müstakil ev 8-10 ay, iki katlı villa 12-15 ay, havuzlu projeler 15-18 ay sürmektedir.",
  },
  {
    kategori: "insaat",
    soru: "Tadilat projesi için ücretsiz keşif yapıyor musunuz?",
    cevap: "Evet, tüm Muğla genelinde ücretsiz yerinde keşif yapıyoruz. 3-5 iş günü içinde detaylı maliyet teklifi sunuyoruz.",
  },
  {
    kategori: "insaat",
    soru: "İnşaat ve tadilat işlerinde garanti veriyor musunuz?",
    cevap: "Evet, tüm işçilik için 2 yıl, su yalıtımı ve çatı işlerinde 5 yıl garanti veriyoruz.",
  },
  // Belge
  {
    kategori: "belge",
    soru: "Ev satın alırken hangi belgeler gerekli?",
    cevap: "Alıcı için: Nüfus cüzdanı, vergi numarası, fotoğraf. Mülk için: Tapu, DASK, iskan belgesi.",
  },
  {
    kategori: "belge",
    soru: "Tapu devir işlemleri ne kadar sürer?",
    cevap: "Belgeler tamam ve randevu alınmışsa aynı gün tamamlanır. Randevu alma 3-7 iş günü sürer.",
  },
  // Ödeme
  {
    kategori: "odeme",
    soru: "Konut kredisi kullanabilir miyim?",
    cevap: "Evet, tüm bankalardan konut kredisi kullanabilirsiniz. Kredi karşılaştırması ve evrak desteği sağlıyoruz.",
  },
  {
    kategori: "odeme",
    soru: "Taksitli satış var mı?",
    cevap: "Evet, yeni projelerde %30-40 peşinat, 12-36 ay taksit seçenekleri sunulabiliyor.",
  },
  {
    kategori: "odeme",
    soru: "Döviz ile ödeme kabul ediyor musunuz?",
    cevap: "Türkiye'de gayrimenkul ödemeleri TL cinsinden yapılmak zorundadır. Satış bedeli döviz karşılığı belirlenir, tapu günü TL'ye çevrilir.",
  },
];

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

async function translateFAQs(faqs: FAQ[], targetLang: 'en' | 'ar'): Promise<FAQ[]> {
  const translated: FAQ[] = [];

  console.log(`\nTranslating ${faqs.length} FAQs to ${targetLang}...`);

  for (let i = 0; i < faqs.length; i++) {
    const faq = faqs[i];
    console.log(`  [${i + 1}/${faqs.length}] Translating: ${faq.soru.substring(0, 40)}...`);

    const [soru, cevap] = await Promise.all([
      translateText(faq.soru, targetLang),
      translateText(faq.cevap, targetLang),
    ]);

    translated.push({
      kategori: faq.kategori,
      soru,
      cevap,
    });

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  return translated;
}

async function main() {
  console.log('SSS Translation Script');
  console.log('='.repeat(50));

  try {
    // Translate to English
    const sorularEN = await translateFAQs(sorularTR, 'en');
    console.log('\n✓ English translations completed');

    // Translate to Arabic
    const sorularAR = await translateFAQs(sorularTR, 'ar');
    console.log('\n✓ Arabic translations completed');

    // Generate output file
    const output = `// Auto-generated translations - ${new Date().toISOString()}
// Do not edit manually, run scripts/translate-sss.ts to regenerate

import type { FAQ } from './sss';

export const sorularEN: FAQ[] = ${JSON.stringify(sorularEN, null, 2)};

export const sorularAR: FAQ[] = ${JSON.stringify(sorularAR, null, 2)};
`;

    const outputPath = path.join(process.cwd(), 'data', 'sss-translations.ts');
    fs.writeFileSync(outputPath, output, 'utf-8');

    console.log('\n' + '='.repeat(50));
    console.log(`✓ Translations saved to: ${outputPath}`);
    console.log(`  - ${sorularEN.length} English FAQs`);
    console.log(`  - ${sorularAR.length} Arabic FAQs`);

  } catch (error) {
    console.error('Translation failed:', error);
    process.exit(1);
  }
}

main();
