import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Paintbrush,
  HardHat,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  Check,
  Building2,
  Key,
  Calculator,
  TrendingUp,
  Ruler,
  ChefHat,
  Bath,
  Palette,
  Building,
  Factory,
  Hammer,
  FileCheck,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FaqSection } from "@/components/sections";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/jsonld";
import { generateHizmetMetadata } from "@/lib/metadata";
import { createWhatsAppLink, Hizmet } from "@/lib/utils";
import hizmetlerData from "@/data/hizmetler.json";

interface HizmetDetayPageProps {
  params: Promise<{ slug: string }>;
}

const ikonlar: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Home,
  Paintbrush,
  HardHat,
  Building2,
  Key,
  Calculator,
  TrendingUp,
  Ruler,
  ChefHat,
  Bath,
  Palette,
  Building,
  Factory,
  Hammer,
  FileCheck,
};

export async function generateMetadata({
  params,
}: HizmetDetayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const hizmet = (hizmetlerData.hizmetler as Hizmet[]).find(
    (h) => h.slug === slug
  );

  if (!hizmet) {
    return {
      title: "Hizmet Bulunamadı",
    };
  }

  return generateHizmetMetadata(hizmet);
}

export async function generateStaticParams() {
  return (hizmetlerData.hizmetler as Hizmet[]).map((hizmet) => ({
    slug: hizmet.slug,
  }));
}

export default async function HizmetDetayPage({ params }: HizmetDetayPageProps) {
  const { slug } = await params;
  const hizmetler = hizmetlerData.hizmetler as Hizmet[];
  const hizmet = hizmetler.find((h) => h.slug === slug);

  if (!hizmet) {
    notFound();
  }

  const Icon = ikonlar[hizmet.ikon] || Home;

  const serviceSchema = generateServiceSchema(hizmet);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hizmetler", url: "/hizmetler" },
    { name: hizmet.baslik, url: `/hizmetler/${hizmet.slug}` },
  ]);
  const faqSchema = generateFAQSchema(hizmet.sss);

  // Get other services
  const digerHizmetler = hizmetler.filter((h) => h.id !== hizmet.id);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Hero */}
      <section className="bg-[#0B1F3A] pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/hizmetler" className="hover:text-[#C9A84C] transition-colors">
              Hizmetler
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">{hizmet.baslik}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-[#C9A84C]/20 flex items-center justify-center mb-6">
                <Icon className="w-10 h-10 text-[#C9A84C]" />
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {hizmet.baslik}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                {hizmet.uzunAciklama}
              </p>

              {/* Service Areas */}
              <div className="flex flex-wrap gap-2 mt-6">
                {hizmet.bolge.map((bolge) => (
                  <span
                    key={bolge}
                    className="px-3 py-1 bg-white/10 text-white rounded-full text-sm"
                  >
                    {bolge}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <Card padding="lg" className="bg-white">
              <h3 className="text-lg font-bold text-[#0B1F3A] mb-6">
                Hemen İletişime Geçin
              </h3>

              {/* Agent Info */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-[#F5F5F5] rounded-xl">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#C9A84C]">
                  <Image
                    src={hizmet.yetkili.ad.includes("Zafer") ? "/zafersoylu.png" : "/arifdagdelen.png"}
                    alt={hizmet.yetkili.ad}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-[#0B1F3A]">{hizmet.yetkili.ad}</p>
                  <p className="text-sm text-[#666666]">{hizmet.yetkili.unvan}</p>
                  <a
                    href={`tel:${hizmet.yetkili.telefon.replace(/\s/g, "")}`}
                    className="text-[#C9A84C] font-medium text-sm hover:underline"
                  >
                    {hizmet.yetkili.telefon}
                  </a>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <a
                  href={createWhatsAppLink(
                    hizmet.yetkili.whatsapp,
                    `Merhaba ${hizmet.yetkili.ad}, ${hizmet.baslik} hakkında bilgi almak istiyorum.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full"
                    leftIcon={<MessageCircle className="w-5 h-5" />}
                  >
                    WhatsApp ile Yazın
                  </Button>
                </a>

                <a
                  href={`tel:${hizmet.yetkili.telefon.replace(/\s/g, "")}`}
                  className="block"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    leftIcon={<Phone className="w-5 h-5" />}
                  >
                    Hemen Arayın
                  </Button>
                </a>

                <Link href="/iletisim" className="block">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    leftIcon={<Mail className="w-5 h-5" />}
                  >
                    E-posta Gönderin
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Sub Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-4">
              {hizmet.baslik} Kapsamında
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Aşağıdaki alanlarda profesyonel hizmet sunuyoruz.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hizmet.altHizmetler.map((alt) => {
              const AltIcon = ikonlar[alt.ikon] || Check;
              return (
                <Card key={alt.baslik} padding="lg" className="text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-[#0B1F3A]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C9A84C]/20 transition-colors">
                    <AltIcon className="w-7 h-7 text-[#0B1F3A] group-hover:text-[#C9A84C] transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#0B1F3A] mb-2">{alt.baslik}</h3>
                  <p className="text-sm text-[#666666]">{alt.aciklama}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0B1F3A] mb-6">
                Neden Kalinda Yapı?
              </h2>
              <div className="space-y-4">
                {[
                  "Lisanslı ve deneyimli uzman kadro",
                  "Şeffaf fiyatlandırma ve sözleşme",
                  "Zamanında teslimat garantisi",
                  "7/24 müşteri desteği",
                  "Bölgesel pazar bilgisi",
                  "Kaliteli malzeme ve işçilik",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[#0B1F3A]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "500+", label: "Tamamlanan Proje" },
                { value: "12+", label: "Yıl Deneyim" },
                { value: "300+", label: "Mutlu Müşteri" },
                { value: "%98", label: "Memnuniyet Oranı" },
              ].map((stat) => (
                <Card key={stat.label} padding="lg" className="text-center">
                  <p className="text-3xl font-bold text-[#C9A84C] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#666666]">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection
        baslik={`${hizmet.baslik} Hakkında SSS`}
        altBaslik={`${hizmet.baslik} hizmetimiz hakkında sıkça sorulan sorular ve cevapları.`}
        sorular={hizmet.sss}
      />

      {/* Other Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-4">
              Diğer Hizmetlerimiz
            </h2>
            <p className="text-[#666666]">
              Tüm emlak ve yapı ihtiyaçlarınız için yanınızdayız.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {digerHizmetler.map((diger) => {
              const DigerIcon = ikonlar[diger.ikon] || Home;
              return (
                <Link key={diger.id} href={`/hizmetler/${diger.slug}`}>
                  <Card
                    variant="interactive"
                    padding="lg"
                    className="flex items-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#0B1F3A]/10 flex items-center justify-center flex-shrink-0">
                      <DigerIcon className="w-7 h-7 text-[#0B1F3A]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0B1F3A]">{diger.baslik}</h3>
                      <p className="text-sm text-[#666666] line-clamp-1">
                        {diger.kisaAciklama}
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {hizmet.baslik} İçin Teklif Alın
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Projeniz için ücretsiz danışmanlık ve teklif almak için hemen
            iletişime geçin. Size en kısa sürede dönüş yapacağız.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={createWhatsAppLink(
                hizmet.yetkili.whatsapp,
                `Merhaba, ${hizmet.baslik} için teklif almak istiyorum.`
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="whatsapp"
                size="lg"
                leftIcon={<MessageCircle className="w-5 h-5" />}
              >
                WhatsApp ile Teklif Al
              </Button>
            </a>
            <a href={`tel:${hizmet.yetkili.telefon.replace(/\s/g, "")}`}>
              <Button
                variant="accent"
                size="lg"
                leftIcon={<Phone className="w-5 h-5" />}
              >
                {hizmet.yetkili.telefon}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
