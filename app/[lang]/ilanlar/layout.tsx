import { Metadata } from "next";
import { locales, defaultLocale, type Locale, generateAlternateUrls, getLocalizedRoute } from "@/lib/i18n";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";

// Dinamik metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getCachedDictionary(locale);
  const alternates = generateAlternateUrls('/ilanlar', locale);
  const baseUrl = "https://www.kalindayapi.com";

  return {
    title: dict.listings.title,
    description: dict.listings.subtitle,
    alternates: {
      canonical: `${baseUrl}/${locale}/${getLocalizedRoute('ilanlar', locale)}`,
      languages: alternates,
    },
    openGraph: {
      title: dict.listings.title,
      description: dict.listings.subtitle,
      url: `${baseUrl}/${locale}/${getLocalizedRoute('ilanlar', locale)}`,
    },
  };
}

export default function IlanlarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
