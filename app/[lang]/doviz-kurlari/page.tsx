import { Metadata } from 'next';
import { locales, type Locale } from '@/lib/i18n/config';
import { buildSeoAlternates, resolveLocale } from '@/lib/seo';
import { getCachedDictionary } from '@/lib/i18n/getDictionary';
import { dovizKurlariTexts, dovizFaqData } from '@/data/doviz-kurlari-i18n';
import DovizKurlariClient from './DovizKurlariClient';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getCachedDictionary(locale);
  const texts = dovizKurlariTexts[locale];

  const titles: Record<Locale, string> = {
    tr: 'Canlı Döviz Kurları 2026 | Anlık USD, EUR, GBP Takibi | Kalinda Yapı',
    en: 'Live Exchange Rates 2026 | Real-time USD, EUR, GBP | Kalinda Yapı',
    ar: 'أسعار الصرف المباشرة 2026 | تتبع الدولار واليورو والجنيه | كالينداي يابي',
    de: 'Live Wechselkurse 2026 | Echtzeit USD, EUR, GBP | Kalinda Yapı',
    ru: 'Курсы валют 2026 | USD, EUR, GBP в реальном времени | Kalinda Yapı',
  };

  const descriptions: Record<Locale, string> = {
    tr: 'Güncel döviz kurları anlık takip. 1 dolar kaç TL? Euro kuru ne kadar? TCMB kurları, döviz çevirici ve emlak yatırım fırsatları. Kalinda Yapı güvencesiyle.',
    en: 'Track live exchange rates. How much is 1 dollar in TL? Current Euro rate. TCMB rates, currency converter and real estate investment opportunities.',
    ar: 'تتبع أسعار الصرف المباشرة. كم يساوي الدولار بالليرة؟ سعر اليورو الحالي. أسعار البنك المركزي ومحول العملات وفرص الاستثمار العقاري.',
    de: 'Verfolgen Sie Live-Wechselkurse. Wie viel ist 1 Dollar in TL? Aktueller Euro-Kurs. TCMB-Kurse, Währungsrechner und Immobilien-Investitionsmöglichkeiten.',
    ru: 'Отслеживайте курсы валют в реальном времени. Сколько стоит 1 доллар в TL? Текущий курс евро. Курсы TCMB, конвертер валют и возможности инвестирования в недвижимость.',
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: buildSeoAlternates('/doviz-kurlari', locale),
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      type: 'website',
    },
  };
}

export default async function DovizKurlariPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : 'tr';
  const texts = dovizKurlariTexts[locale];
  const faqs = dovizFaqData[locale];

  return <DovizKurlariClient locale={locale} texts={texts} faqs={faqs} />;
}
