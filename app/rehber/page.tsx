import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Home, ChevronRight, MapPin, Users, ArrowRight } from "lucide-react";
import { ilceRehberleri } from "@/data/ilce-rehber";
import { getMahalleler } from "@/data/konum";

export const metadata: Metadata = {
  title: "Muğla İlçe Rehberi | Emlak, Yaşam ve Yatırım | Kalinda Yapı",
  description:
    "Muğla'nın 13 ilçesi için kapsamlı rehber. Bodrum, Fethiye, Marmaris, Dalyan, Ortaca ve diğer ilçelerde emlak, yaşam ve yatırım bilgileri.",
  keywords:
    "Muğla ilçeleri, Muğla emlak, Bodrum, Fethiye, Marmaris, Dalyan, Ortaca, Köyceğiz, Datça, Milas",
};

export default function RehberPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0B1F3A] pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">Rehber</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Muğla <span className="text-[#C9A84C]">İlçe Rehberi</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Muğla'nın 13 ilçesi hakkında detaylı bilgi. Emlak fiyatları, mahalleler,
            yaşam koşulları ve yatırım fırsatları için ilçe rehberlerimizi inceleyin.
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
                <Link key={ilce.slug} href={`/rehber/${ilce.slug}`}>
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
                          {mahalleSayisi} Mahalle
                        </span>
                      </div>
                      <p className="text-[#666666] text-sm line-clamp-2 mb-4">
                        {ilce.kisaTanitim}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[#0B1F3A] font-semibold text-sm group-hover:text-[#C9A84C] transition-colors">
                        Rehberi İncele
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
            Muğla'da Emlak Yatırımı mı Düşünüyorsunuz?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            13 ilçede emlak, tadilat ve inşaat hizmetleri sunuyoruz. Bölgeyi tanıyan
            uzman ekibimizle ücretsiz danışmanlık alın.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0B1F3A] px-8 py-3 rounded-lg font-semibold hover:bg-[#a88a3d] transition-colors"
          >
            İletişime Geçin
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
