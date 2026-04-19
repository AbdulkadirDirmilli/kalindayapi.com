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
import { buildLocalizedUrl, buildSeoAlternates, resolveLocale } from '@/lib/seo';
import { getCachedDictionary } from '@/lib/i18n/getDictionary';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getCachedDictionary(locale);
  const url = buildLocalizedUrl('/doviz-kurlari', locale);

  return {
    title: dict.exchangePage.title,
    description: dict.exchangePage.subtitle,
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
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : 'ar_SA',
      url,
      siteName: 'Kalinda Yapı',
      title: dict.exchangePage.title,
      description: dict.exchangePage.subtitle,
      images: [
        {
          url: '/og-doviz.jpg',
          width: 1200,
          height: 630,
          alt: dict.exchangePage.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.exchangePage.title,
      description: dict.exchangePage.subtitle,
      images: ['/og-doviz.jpg'],
    },
    alternates: buildSeoAlternates('/doviz-kurlari', locale),
  };
}

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
