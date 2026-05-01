import type { Metadata } from "next";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { locales, localeConfig, type Locale } from "@/lib/i18n";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";
import { buildLocalizedUrl, buildSeoAlternates, resolveLocale } from "@/lib/seo";
import { notFound } from "next/navigation";

// Statik parametre üretimi
export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

// Dinamik metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getCachedDictionary(locale);
  const config = localeConfig[locale];

  const baseUrl = "https://www.kalindayapi.com";
  const homeUrl = buildLocalizedUrl('/', locale);

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: dict.meta.title,
      template: `%s | Kalinda Yapı`,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords.split(", "),
    authors: [{ name: "Kalinda Yapı" }],
    creator: "Kalinda Yapı",
    publisher: "Kalinda Yapı",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: { tr: "tr_TR", en: "en_US", ar: "ar_SA", de: "de_DE", ru: "ru_RU" }[locale] || "en_US",
      url: homeUrl,
      siteName: "Kalinda Yapı",
      title: dict.home.hero.title,
      description: dict.meta.description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Kalinda Yapı - ${dict.home.hero.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "dfjBrBUZiX-2Q860iWmTQyA2wrT5-CchKhyVlCd8BSs",
    },
    alternates: buildSeoAlternates('/', locale),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // Geçerli dil kontrolü
  if (!locales.includes(lang as Locale)) {
    notFound();
  }

  const locale = lang as Locale;
  const config = localeConfig[locale];

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.lang = "${config.hreflang}";
            document.documentElement.dir = "${config.dir}";
          `,
        }}
      />
      <LayoutWrapper locale={locale}>{children}</LayoutWrapper>
    </>
  );
}
