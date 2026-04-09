import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Home, ChevronRight, MapPin, Users, Plane, Phone, ArrowRight } from "lucide-react";
import { getIlceBySlug, getAllIlceSlugs } from "@/data/ilce-rehber";
import { getMahalleler } from "@/data/konum";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/jsonld";
import ExpandableMahalleler from "@/components/ui/ExpandableMahalleler";

interface PageProps {
  params: Promise<{ ilce: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllIlceSlugs();
  return slugs.map((ilce) => ({ ilce }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ilce: slug } = await params;
  const ilce = getIlceBySlug(slug);

  if (!ilce) return { title: "Sayfa Bulunamadı" };

  return {
    title: `${ilce.ad} Emlak Rehberi | Satılık Ev, Arsa, Villa | Kalinda Yapı`,
    description: ilce.metaDescription,
    keywords: `${ilce.ad}, ${ilce.ad} emlak, ${ilce.ad} satılık ev, ${ilce.ad} arsa, ${ilce.ad} villa, Muğla emlak`,
    openGraph: {
      title: `${ilce.ad} İlçe Rehberi ve Emlak Fırsatları`,
      description: ilce.metaDescription,
      images: [ilce.kapakGorsel],
    },
  };
}

export default async function IlceRehberPage({ params }: PageProps) {
  const { ilce: slug } = await params;
  const ilce = getIlceBySlug(slug);

  if (!ilce) {
    notFound();
  }

  const mahalleler = getMahalleler(ilce.ad);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Rehber", url: "/rehber" },
    { name: ilce.ad, url: `/rehber/${ilce.slug}` },
  ]);

  const faqSchema = generateFAQSchema(
    ilce.sss.map((s) => ({ question: s.soru, answer: s.cevap }))
  );

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-[#0B1F3A] pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0">
          <Image
            src={ilce.kapakGorsel}
            alt={`${ilce.ad} manzarası`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/70 to-[#0B1F3A]/40" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-300 mb-6">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/rehber" className="hover:text-[#C9A84C] transition-colors">
              Rehber
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">{ilce.ad}</span>
          </nav>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {ilce.ad} <span className="text-[#C9A84C]">Rehberi</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mb-8">
            {ilce.kisaTanitim}
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 md:gap-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
              <Users className="w-5 h-5 text-[#C9A84C]" />
              <span className="text-white font-medium">{ilce.nufus} Nüfus</span>
            </div>
            {ilce.ozellikler.havalimanMesafe && (
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                <Plane className="w-5 h-5 text-[#C9A84C]" />
                <span className="text-white font-medium">{ilce.ozellikler.havalimanMesafe}</span>
              </div>
            )}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
              <MapPin className="w-5 h-5 text-[#C9A84C]" />
              <span className="text-white font-medium">{mahalleler.length} Mahalle</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Galeri */}
              <div>
                <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">
                  {ilce.ad} Fotoğrafları
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {ilce.galeriGorseller.map((gorsel, index) => (
                    <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        src={gorsel}
                        alt={`${ilce.ad} görsel ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 33vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Mahalleler */}
              <ExpandableMahalleler mahalleler={mahalleler} ilceAd={ilce.ad} />

              {/* SSS */}
              <div>
                <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">
                  Sıkça Sorulan Sorular
                </h2>
                <div className="space-y-4">
                  {ilce.sss.map((item, index) => (
                    <div key={index} className="bg-[#F5F5F5] rounded-xl p-5">
                      <h3 className="font-bold text-[#0B1F3A] mb-2">{item.soru}</h3>
                      <p className="text-[#666666]">{item.cevap}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="bg-[#0B1F3A] rounded-2xl p-6 text-white sticky top-24">
                <h3 className="text-xl font-bold mb-3">
                  {ilce.ad}'da Emlak mı Arıyorsunuz?
                </h3>
                <p className="text-gray-300 text-sm mb-6">
                  {ilce.ad} ve çevresinde satılık ev, arsa, villa için uzman ekibimizle iletişime geçin.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/iletisim"
                    className="flex items-center justify-center gap-2 w-full bg-[#C9A84C] text-[#0B1F3A] py-3 rounded-lg font-semibold hover:bg-[#a88a3d] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    İletişime Geç
                  </Link>
                  <Link
                    href="/ilanlar"
                    className="flex items-center justify-center gap-2 w-full border border-white/30 text-white py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                  >
                    İlanları İncele
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* SEO Keywords */}
              <div className="bg-[#F5F5F5] rounded-2xl p-6">
                <h3 className="font-bold text-[#0B1F3A] mb-4">İlgili Aramalar</h3>
                <div className="flex flex-wrap gap-2">
                  {ilce.seoBasliklar.slice(0, 5).map((baslik, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white text-[#666666] text-xs rounded-full"
                    >
                      {baslik}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0B1F3A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {ilce.ad}'da Gayrimenkul Danışmanlığı
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Kalinda Yapı olarak {ilce.ad} ve tüm Muğla bölgesinde emlak, tadilat ve inşaat
            hizmetleri sunuyoruz. Profesyonel ekibimizle tanışın.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0B1F3A] px-8 py-3 rounded-lg font-semibold hover:bg-[#a88a3d] transition-colors"
          >
            Ücretsiz Danışmanlık Al
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
