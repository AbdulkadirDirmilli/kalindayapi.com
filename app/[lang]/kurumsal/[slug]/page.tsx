import { notFound } from "next/navigation";
import { Metadata } from "next";
import { locales, type Locale, getOriginalRoute, routeTranslations } from "@/lib/i18n/config";
import { resolveLocale } from "@/lib/seo";

// Import page components from static pages
import VizyonMisyonPage, {
  generateMetadata as vizyonMisyonMetadata,
} from "../vizyon-misyon/page";
import ReferanslarPage, {
  generateMetadata as referanslarMetadata,
} from "../referanslar/page";
import BelgelerPage, {
  generateMetadata as belgelerMetadata,
} from "../belgeler/page";

// Map of original Turkish slugs to their page components and metadata generators
const pageMap: Record<
  string,
  {
    component: React.ComponentType<{ params: Promise<{ lang: string }> }>;
    generateMetadata: (props: { params: Promise<{ lang: string }> }) => Promise<Metadata>;
  }
> = {
  "vizyon-misyon": {
    component: VizyonMisyonPage,
    generateMetadata: vizyonMisyonMetadata,
  },
  referanslar: {
    component: ReferanslarPage,
    generateMetadata: referanslarMetadata,
  },
  belgeler: {
    component: BelgelerPage,
    generateMetadata: belgelerMetadata,
  },
};

// Valid kurumsal page slugs
const kurumsalSlugs = ["vizyon-misyon", "referanslar", "belgeler"];

interface KurumsalPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];

  // Generate all language/slug combinations
  for (const locale of locales) {
    for (const originalSlug of kurumsalSlugs) {
      // Get the localized slug for this language
      const localizedSlug = routeTranslations[originalSlug]?.[locale] || originalSlug;
      params.push({ lang: locale, slug: localizedSlug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: KurumsalPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);

  // Convert localized slug to original Turkish slug
  const originalSlug = getOriginalRoute(slug, locale);

  const pageConfig = pageMap[originalSlug];
  if (!pageConfig) {
    return {
      title: "Sayfa Bulunamadı",
    };
  }

  // Generate metadata using the original page's metadata function
  return pageConfig.generateMetadata({
    params: Promise.resolve({ lang }),
  });
}

export default async function KurumsalDynamicPage({ params }: KurumsalPageProps) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang) as Locale;

  // Convert localized slug to original Turkish slug
  const originalSlug = getOriginalRoute(slug, locale);

  const pageConfig = pageMap[originalSlug];
  if (!pageConfig) {
    notFound();
  }

  // Render the appropriate page component
  const PageComponent = pageConfig.component;
  return <PageComponent params={Promise.resolve({ lang })} />;
}
