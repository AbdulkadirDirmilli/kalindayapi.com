import { Metadata } from 'next';
import {
  generateDovizWebPageSchema,
  generateDovizFAQSchema,
  generateDovizBreadcrumbSchema,
  generateCurrencyConverterHowToSchema,
  generateSpeakableSchema,
  generateFinanceOrganizationSchema,
  DOVIZ_FAQ_DATA,
} from '@/lib/dovizJsonLd';

export const metadata: Metadata = {
  title: 'Canlı Döviz Kurları 2026 | Anlık USD, EUR, GBP Takibi | Kalinda Yapı',
  description:
    'Güncel döviz kurları anlık takip ✓ 1 dolar kaç TL? ✓ Euro kuru ne kadar? ✓ TCMB kurları ✓ Döviz çevirici ✓ Emlak yatırımı için kur hesaplama. Muğla Ortaca emlak fırsatları.',
  keywords: [
    'dolar kuru',
    'euro kuru',
    'anlık döviz kuru',
    '1 dolar kaç tl',
    'döviz çevirici',
    'tcmb kuru',
    'güncel kur',
    'canlı döviz',
    'dolar euro',
    'döviz hesaplama',
    'sterlin kuru',
    'gbp try',
    'döviz takip',
    'kur takibi',
    'muğla emlak döviz',
    'yabancı yatırımcı türkiye emlak',
  ],
  authors: [{ name: 'Kalinda Yapı' }],
  creator: 'Kalinda Yapı',
  publisher: 'Kalinda Yapı',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://www.kalindayapi.com/doviz-kurlari',
    siteName: 'Kalinda Yapı',
    title: 'Canlı Döviz Kurları | Anlık USD, EUR, GBP | Kalinda Yapı',
    description:
      'Güncel döviz kurları anlık takip. Dolar, Euro, Sterlin kurları. Döviz çevirici ve emlak yatırım fırsatları.',
    images: [
      {
        url: '/og-doviz.jpg',
        width: 1200,
        height: 630,
        alt: 'Kalinda Yapı - Canlı Döviz Kurları',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canlı Döviz Kurları | Kalinda Yapı',
    description: 'Anlık dolar, euro, sterlin kurları. Döviz çevirici ve emlak fırsatları.',
    images: ['/og-doviz.jpg'],
  },
  alternates: {
    canonical: 'https://www.kalindayapi.com/doviz-kurlari',
  },
  other: {
    'revisit-after': '1 day',
    'rating': 'general',
    'distribution': 'global',
  },
};

export default function DovizKurlariLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webPageSchema = generateDovizWebPageSchema(null);
  const faqSchema = generateDovizFAQSchema(DOVIZ_FAQ_DATA);
  const breadcrumbSchema = generateDovizBreadcrumbSchema();
  const howToSchema = generateCurrencyConverterHowToSchema();
  const speakableSchema = generateSpeakableSchema();
  const organizationSchema = generateFinanceOrganizationSchema();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {children}
    </>
  );
}
