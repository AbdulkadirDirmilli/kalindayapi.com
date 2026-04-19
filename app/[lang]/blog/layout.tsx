import { Metadata } from "next";
import { buildLocalizedUrl, buildSeoAlternates, resolveLocale } from "@/lib/seo";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getCachedDictionary(locale);
  const url = buildLocalizedUrl("/blog", locale);

  return {
    title: dict.blog.title,
    description: dict.blog.subtitle,
    openGraph: {
      title: dict.blog.title,
      description: dict.blog.subtitle,
      url,
    },
    alternates: buildSeoAlternates("/blog", locale),
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
