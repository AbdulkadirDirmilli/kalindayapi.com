import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Home, ChevronRight, MapPin, Users, ArrowRight } from "lucide-react";
import { ilceRehberleri } from "@/data/ilce-rehber";
import { getMahalleler } from "@/data/konum";
import { rehberTexts } from "@/data/rehber-i18n";
import { buildLocalizedUrl, buildSeoAlternates, resolveLocale } from "@/lib/seo";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale, getLocalizedRoute } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getCachedDictionary(locale);
  const url = buildLocalizedUrl("/rehber", locale);

  return {
    title: dict.guide.title,
    description: dict.guide.subtitle,
    openGraph: {
      title: dict.guide.title,
      description: dict.guide.subtitle,
      url,
    },
    alternates: buildSeoAlternates("/rehber", locale),
  };
}

export default async function RehberPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : 'tr';
  const texts = rehberTexts[locale];

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0B1F3A] pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href={`/${locale}`} className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">{texts.breadcrumb}</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {texts.heroTitle} <span className="text-[#C9A84C]">{texts.heroTitleHighlight}</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            {texts.heroDescription}
          </p>
        </div>
      </section>

      {/* Districts Grid */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ilceRehberleri.map((ilce) => {
              const mahalleSayisi = getMahalleler(ilce.ad).length;
              return (
                <Link key={ilce.slug} href={`/${locale}/rehber/${ilce.slug}`}>
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group h-full">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={ilce.kapakGorsel}
                        alt={`${ilce.ad} manzarası`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h2 className="text-xl font-bold text-white">{ilce.ad}</h2>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-4 text-sm text-[#666666] mb-3">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-[#C9A84C]" />
                          {ilce.nufus}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-[#C9A84C]" />
                          {mahalleSayisi} {texts.neighborhoods}
                        </span>
                      </div>
                      <p className="text-[#666666] text-sm line-clamp-2 mb-4">
                        {ilce.kisaTanitim}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[#0B1F3A] font-semibold text-sm group-hover:text-[#C9A84C] transition-colors">
                        {texts.viewGuide}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0B1F3A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {texts.ctaTitle}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            {texts.ctaDescription}
          </p>
          <Link
            href={`/${locale}/${getLocalizedRoute('iletisim', locale)}`}
            className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0B1F3A] px-8 py-3 rounded-lg font-semibold hover:bg-[#a88a3d] transition-colors"
          >
            {texts.ctaButton}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
