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
  const url = buildLocalizedUrl("/iletisim", locale);

  return {
    title: dict.contact.title,
    description: dict.contact.subtitle,
    openGraph: {
      title: dict.contact.title,
      description: dict.contact.subtitle,
      url,
    },
    alternates: buildSeoAlternates("/iletisim", locale),
  };
}

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
