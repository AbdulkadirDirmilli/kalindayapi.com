import { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";
import { buildSeoAlternates, resolveLocale } from "@/lib/seo";
import { getLandingPageConfig } from "@/lib/seo/landing-pages";
import { fetchLandingPageIlanlar } from "@/lib/seo/fetch-landing-ilanlar";
import LandingPageContent from "@/components/seo/LandingPageContent";

const LANDING_PAGE_SLUG = "dalyan-satilik-villa";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const config = getLandingPageConfig(LANDING_PAGE_SLUG);

  if (!config) {
    return { title: "Sayfa Bulunamadı" };
  }

  const meta = config.meta[locale];

  return {
    title: meta.title,
    description: meta.description,
    alternates: buildSeoAlternates(`/${LANDING_PAGE_SLUG}`, locale),
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
    },
  };
}

export default async function DalyanSatilikVillaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : "tr";
  const config = getLandingPageConfig(LANDING_PAGE_SLUG);

  if (!config) {
    notFound();
  }

  const [dict, ilanlar] = await Promise.all([
    getCachedDictionary(locale),
    fetchLandingPageIlanlar(config, locale, 12),
  ]);

  return (
    <LandingPageContent
      config={config}
      locale={locale}
      ilanlar={ilanlar}
      dict={dict}
    />
  );
}
