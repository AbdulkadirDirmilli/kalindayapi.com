import { Metadata } from "next";
import Link from "next/link";
import { Home, Paintbrush, HardHat, ChevronRight, ArrowRight, MessageCircle, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FaqSection } from "@/components/sections";
import { generateBreadcrumbSchema } from "@/lib/jsonld";
import { createWhatsAppLink, Hizmet } from "@/lib/utils";
import hizmetlerData from "@/data/hizmetler.json";
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
  const url = buildLocalizedUrl("/hizmetler", locale);

  return {
    title: dict.nav.services,
    description: dict.meta.description,
    openGraph: {
      title: dict.nav.services,
      description: dict.meta.description,
      url,
    },
    alternates: buildSeoAlternates("/hizmetler", locale),
  };
}

const ikonlar: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Home,
  Paintbrush,
  HardHat,
  FileText,
};

export default function HizmetlerPage() {
  const hizmetler = hizmetlerData.hizmetler as Hizmet[];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hizmetler", url: "/hizmetler" },
  ]);

  // Combine all FAQs
  const tumSorular = hizmetler.flatMap((h) => h.sss).slice(0, 6);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Hero */}
      <section className="bg-[#0B1F3A] pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">Hizmetler</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Profesyonel{" "}
              <span className="text-[#C9A84C]">Emlak & Yapı</span> Hizmetleri
            </h1>
            <p className="text-gray-300 text-lg">
              Ortaca ve Muğla bölgesinde emlak danışmanlığı, tadilat ve inşaat
              taahhüt hizmetleri sunuyoruz. Her ihtiyacınız için yanınızdayız.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hizmetler.map((hizmet) => {
              const Icon = ikonlar[hizmet.ikon] || Home;
              return (
                <Card
                  key={hizmet.id}
                  variant="interactive"
                  padding="lg"
                  className="group"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-[#0B1F3A]/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A84C]/20 transition-colors">
                    <Icon className="w-8 h-8 text-[#0B1F3A] group-hover:text-[#C9A84C] transition-colors" />
                  </div>

                  {/* Content */}
                  <h2 className="text-xl font-bold text-[#0B1F3A] mb-3 group-hover:text-[#C9A84C] transition-colors">
                    {hizmet.baslik}
                  </h2>
                  <p className="text-[#666666] mb-6">{hizmet.kisaAciklama}</p>

                  {/* Sub Services */}
                  <div className="space-y-2 mb-6">
                    {hizmet.altHizmetler.slice(0, 3).map((alt) => (
                      <div
                        key={alt.baslik}
                        className="flex items-center gap-2 text-sm text-[#666666]"
                      >
                        <ChevronRight className="w-4 h-4 text-[#C9A84C]" />
                        <span>{alt.baslik}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#e0e0e0]">
                    <div className="flex gap-2">
                      <Link href={`/hizmetler/${hizmet.slug}`} className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                          Detaylar
                        </Button>
                      </Link>
                      <a
                        href={createWhatsAppLink(
                          "905370530754",
                          `Merhaba, ${hizmet.baslik} hakkında bilgi almak istiyorum.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="whatsapp"
                          size="sm"
                          leftIcon={<MessageCircle className="w-4 h-4" />}
                        >
                          WhatsApp
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-4">
              Hizmet Bölgelerimiz
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Ortaca merkez ve çevre bölgelerde profesyonel hizmet sunuyoruz.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Ortaca", "Dalyan", "Köyceğiz", "Dalaman", "Fethiye", "Marmaris", "Bodrum", "Milas", "Datça", "Menteşe", "Yatağan", "Ula", "Kavaklıdere", "Seydikemer"].map((bolge) => (
              <span
                key={bolge}
                className="px-4 py-2 bg-[#0B1F3A] text-white rounded-full font-medium text-sm"
              >
                {bolge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection
        baslik="Hizmetlerimiz Hakkında Sıkça Sorulan Sorular"
        altBaslik="Emlak, tadilat ve taahhüt hizmetlerimiz hakkında merak edilenler."
        sorular={tumSorular}
      />

      {/* CTA Section */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Projeniz İçin Teklif Alın
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Emlak, tadilat veya inşaat projeleriniz için ücretsiz danışmanlık ve
            teklif almak için hemen iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/iletisim">
              <Button variant="accent" size="lg">
                İletişime Geç
              </Button>
            </Link>
            <a
              href={createWhatsAppLink(
                "905370530754",
                "Merhaba, hizmetleriniz hakkında bilgi almak istiyorum."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="whatsapp"
                size="lg"
                leftIcon={<MessageCircle className="w-5 h-5" />}
              >
                WhatsApp ile Yazın
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
