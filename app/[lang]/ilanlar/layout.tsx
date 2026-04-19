import { Metadata } from "next";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";
import { buildLocalizedUrl, buildSeoAlternates, resolveLocale } from "@/lib/seo";

// Dinamik metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getCachedDictionary(locale);
  const url = buildLocalizedUrl('/ilanlar', locale);

  return {
    title: dict.listings.title,
    description: dict.listings.subtitle,
    alternates: buildSeoAlternates('/ilanlar', locale),
    openGraph: {
      title: dict.listings.title,
      description: dict.listings.subtitle,
      url,
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
