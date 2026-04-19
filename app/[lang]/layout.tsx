import type { Metadata } from "next";
import { Inter, Nunito, Noto_Sans_Arabic } from "next/font/google";
import "../globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { locales, localeConfig, defaultLocale, type Locale } from "@/lib/i18n";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";
import { buildLocalizedUrl, buildSeoAlternates, resolveLocale } from "@/lib/seo";
import { notFound } from "next/navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

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
      locale: locale === "tr" ? "tr_TR" : locale === "ar" ? "ar_SA" : "en_US",
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

  const fontClasses = locale === 'ar'
    ? `${inter.variable} ${nunito.variable} ${notoSansArabic.variable}`
    : `${inter.variable} ${nunito.variable}`;

  return (
    <html
      lang={config.hreflang}
      dir={config.dir}
      className={fontClasses}
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0B1F3A" />
      </head>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <LayoutWrapper locale={locale}>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
