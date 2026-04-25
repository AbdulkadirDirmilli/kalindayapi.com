import Link from "next/link";
import { Home, ChevronRight, Phone, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { IlanKart } from "@/components/ilan";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/jsonld";
import { createWhatsAppLink, Ilan } from "@/lib/utils";
import { type Locale, getLocalizedRoute } from "@/lib/i18n";
import { LandingPageConfig } from "@/lib/seo/landing-pages";

interface LandingPageContentProps {
  config: LandingPageConfig;
  locale: Locale;
  ilanlar: Ilan[];
  dict: {
    nav: { home: string };
    common: { viewAll: string };
  };
}

export default function LandingPageContent({
  config,
  locale,
  ilanlar,
  dict,
}: LandingPageContentProps) {
  const meta = config.meta[locale];
  const content = config.content[locale];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: dict.nav.home, url: `/${locale}` },
    { name: meta.h1, url: `/${locale}/${getLocalizedRoute(config.slug, locale)}` },
  ]);

  const faqSchema = content.faq.length > 0
    ? generateFAQSchema(
        content.faq.map((item) => ({
          soru: item.question,
          cevap: item.answer,
        }))
      )
    : null;

  const ctaTexts = {
    tr: {
      phone: "Hemen Arayın",
      whatsapp: "WhatsApp ile İletişim",
      viewAll: "Tüm İlanları Gör",
      faqTitle: "Sıkça Sorulan Sorular",
      ctaTitle: "Ücretsiz Danışmanlık Alın",
      ctaSubtitle: "Emlak danışmanlarımız size yardımcı olmaya hazır. Hemen iletişime geçin!",
      greeting: "Merhaba, web sitenizden ulaşıyorum.",
    },
    en: {
      phone: "Call Now",
      whatsapp: "Contact via WhatsApp",
      viewAll: "View All Listings",
      faqTitle: "Frequently Asked Questions",
      ctaTitle: "Get Free Consultation",
      ctaSubtitle: "Our real estate consultants are ready to help you. Contact us now!",
      greeting: "Hello, I am contacting you from your website.",
    },
    ar: {
      phone: "اتصل الآن",
      whatsapp: "تواصل عبر واتساب",
      viewAll: "عرض جميع الإعلانات",
      faqTitle: "الأسئلة الشائعة",
      ctaTitle: "احصل على استشارة مجانية",
      ctaSubtitle: "مستشارونا العقاريون مستعدون لمساعدتك. تواصل معنا الآن!",
      greeting: "مرحباً، أتواصل معكم من موقعكم.",
    },
  };

  const texts = ctaTexts[locale];

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      {/* Hero Section */}
      <section className="bg-[#0B1F3A] pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link
              href={`/${locale}`}
              className="hover:text-[#C9A84C] transition-colors"
            >
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">{meta.h1}</span>
          </nav>

          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {meta.h1}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {meta.intro}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+905370530754">
                <Button
                  variant="accent"
                  size="lg"
                  leftIcon={<Phone className="w-5 h-5" />}
                >
                  {texts.phone}
                </Button>
              </a>
              <a
                href={createWhatsAppLink("905370530754", texts.greeting)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="whatsapp"
                  size="lg"
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                >
                  {texts.whatsapp}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {content.sections.map((section, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mb-4">
                  {section.title}
                </h2>
                <p className="text-[#666666] leading-relaxed text-lg">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Listings */}
      {ilanlar.length > 0 && (
        <section className="py-16 bg-[#F5F5F5]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mb-4">
                {meta.h1}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ilanlar.slice(0, 8).map((ilan, index) => (
                <IlanKart
                  key={ilan.id}
                  ilan={ilan}
                  variant="grid"
                  index={index}
                  locale={locale}
                />
              ))}
            </div>

            {ilanlar.length > 8 && (
              <div className="text-center mt-8">
                <Link href={`/${locale}/${getLocalizedRoute("ilanlar", locale)}`}>
                  <Button variant="primary" size="lg">
                    {texts.viewAll}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {content.faq.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mb-8 text-center">
                {texts.faqTitle}
              </h2>

              <div className="space-y-4">
                {content.faq.map((item, index) => (
                  <Card key={index} padding="lg">
                    <h3 className="font-bold text-[#0B1F3A] mb-2">
                      {item.question}
                    </h3>
                    <p className="text-[#666666]">{item.answer}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 bg-[#0B1F3A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {texts.ctaTitle}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            {texts.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+905370530754">
              <Button
                variant="accent"
                size="lg"
                leftIcon={<Phone className="w-5 h-5" />}
              >
                0537 053 07 54
              </Button>
            </a>
            <a
              href={createWhatsAppLink("905370530754", texts.greeting)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="whatsapp"
                size="lg"
                leftIcon={<MessageCircle className="w-5 h-5" />}
              >
                {texts.whatsapp}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
