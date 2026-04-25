import { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Target,
  Eye,
  Shield,
  Lightbulb,
  MapPin,
  MessageCircle,
  Award,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { OrtaklarBolumu, IstatistikSayaclari } from "@/components/sections";
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/jsonld";
import { createWhatsAppLink } from "@/lib/utils";
import { locales, type Locale } from "@/lib/i18n";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";
import { buildSeoAlternates, resolveLocale } from "@/lib/seo";
import { hakkimizdaTexts, degerler, timeline, sertifikalar } from "@/data/hakkimizda-i18n";

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
  const dict = await getCachedDictionary(locale);

  return {
    title: dict.nav.about,
    description: dict.meta.description,
    alternates: buildSeoAlternates('/hakkimizda', locale),
  };
}

const ikonlar: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Shield,
  Lightbulb,
  Award,
  MapPin,
};

export default async function HakkimizdaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : 'tr';
  const dict = await getCachedDictionary(locale);
  const texts = hakkimizdaTexts[locale];
  const values = degerler[locale];
  const timelineItems = timeline[locale];
  const certificates = sertifikalar[locale];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: dict.nav.home, url: `/${locale}` },
    { name: dict.nav.about, url: `/${locale}/hakkimizda` },
  ]);

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* Hero */}
      <section className="bg-[#0B1F3A] pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href={`/${locale}`} className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">{dict.nav.about}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="text-[#C9A84C]">{texts.heroTitleHighlight}</span> {texts.heroTitle}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              {texts.heroDescription1}
            </p>
            <p className="text-gray-400 text-base leading-relaxed">
              {texts.heroDescription2}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
                {texts.storyBadge}
              </span>
              <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-6">
                {texts.storyTitle}
              </h2>
              <div className="space-y-4 text-[#666666] leading-relaxed">
                <p>{texts.storyParagraph1}</p>
                <p>
                  {locale === 'tr' ? (
                    <>
                      Zafer Soylu, <Link href={`/${locale}/hizmetler/emlak-danismanligi`} className="text-[#C9A84C] hover:underline">emlak danışmanlığı</Link> sektöründeki deneyimiyle Ortaca, Dalyan ve Köyceğiz bölgelerinin gayrimenkul dinamiklerine hakim bir profesyoneldir. Arif Dağdelen ise <Link href={`/${locale}/hizmetler/taahhut-insaat`} className="text-[#C9A84C] hover:underline">inşaat ve taahhüt</Link> sektöründeki tecrübesiyle sayısız konut, villa ve ticari proje tamamlamıştır.
                    </>
                  ) : (
                    texts.storyParagraph2
                  )}
                </p>
                <p>
                  {locale === 'tr' ? (
                    <>
                      <Link href={`/${locale}/hizmetler/tadilat-dekorasyon`} className="text-[#C9A84C] hover:underline">Tadilat</Link> ve <Link href={`/${locale}/hizmetler/plan-proje`} className="text-[#C9A84C] hover:underline">proje hizmetlerimizle</Link> 100'den fazla proje tamamladık. <Link href={`/${locale}/ilanlar`} className="text-[#C9A84C] hover:underline">Emlak portföyümüzde</Link> Ortaca merkez, Dalyan kanal boyu, Köyceğiz göl manzaralı ve Dalaman havalimanı yakını seçenekler bulunuyor.
                    </>
                  ) : (
                    texts.storyParagraph3
                  )}
                </p>
                <p>{texts.storyParagraph4}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {timelineItems.map((item, index) => (
                <div key={item.yil} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0B1F3A] font-bold text-sm">
                      {item.yil}
                    </div>
                    {index < timelineItems.length - 1 && (
                      <div className="w-0.5 h-full bg-[#e0e0e0] my-2" />
                    )}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-[#0B1F3A]">{item.baslik}</h3>
                    <p className="text-sm text-[#666666]">{item.aciklama}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card padding="lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0B1F3A] flex items-center justify-center">
                  <Target className="w-7 h-7 text-[#C9A84C]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B1F3A]">{texts.missionTitle}</h2>
              </div>
              <p className="text-[#666666] leading-relaxed">
                {texts.missionText}
              </p>
            </Card>

            <Card padding="lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#C9A84C] flex items-center justify-center">
                  <Eye className="w-7 h-7 text-[#0B1F3A]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B1F3A]">{texts.visionTitle}</h2>
              </div>
              <p className="text-[#666666] leading-relaxed">
                {texts.visionText}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              {texts.valuesBadge}
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              {texts.valuesTitle}
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              {texts.valuesSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((deger) => {
              const Icon = ikonlar[deger.ikon] || Shield;
              return (
                <Card key={deger.baslik} padding="lg" className="text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-[#0B1F3A]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C9A84C]/20 transition-colors">
                    <Icon className="w-8 h-8 text-[#0B1F3A] group-hover:text-[#C9A84C] transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#0B1F3A] mb-2">{deger.baslik}</h3>
                  <p className="text-sm text-[#666666]">{deger.aciklama}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <IstatistikSayaclari lang={locale} dict={dict} />

      {/* Team Section */}
      <OrtaklarBolumu lang={locale} dict={dict} />

      {/* Certificates */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              {texts.certsBadge}
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              {texts.certsTitle}
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              {texts.certsSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((belge) => (
              <Card key={belge.baslik} padding="lg" className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#C9A84C]" />
                </div>
                <h3 className="font-bold text-[#0B1F3A] mb-1">{belge.baslik}</h3>
                <p className="text-xs text-[#666666]">{belge.aciklama}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Web Design Credit */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-[#666666]">
              {texts.webDesignText}{" "}
              <a
                href="https://www.akduniverse.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A84C] hover:text-[#0B1F3A] font-semibold transition-colors"
              >
                AKD Universe
              </a>
              {texts.webDesignBy && ` ${texts.webDesignBy}`}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {texts.ctaTitle}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            {texts.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${locale}/iletisim`}>
              <Button variant="accent" size="lg">
                {texts.ctaButton}
              </Button>
            </Link>
            <a
              href={createWhatsAppLink(
                "905370530754",
                texts.whatsappMessage
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="whatsapp"
                size="lg"
                leftIcon={<MessageCircle className="w-5 h-5" />}
              >
                {texts.whatsappButton}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
